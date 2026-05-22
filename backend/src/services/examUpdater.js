const cron = require('node-cron');
const supabase = require('../utils/supabase');
const { logger } = require('../utils/logger');

// Only import if Gemini key exists
let genAI = null;
try {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'placeholder_add_later') {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
} catch (e) {}

async function fetchWebsiteText(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ExamAlertBot/1.0)' }
    });
    clearTimeout(timeout);
    const html = await res.text();
    // Strip HTML tags, keep only text
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').slice(0, 3000);
  } catch {
    return null;
  }
}

async function extractDatesWithAI(examName, websiteText) {
  if (!genAI || !websiteText) return null;
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `From this government website text, extract exam dates for "${examName}".
Return ONLY a JSON object with these fields (use null if not found):
{
  "application_start": "YYYY-MM-DD or null",
  "application_end": "YYYY-MM-DD or null", 
  "exam_date": "YYYY-MM-DD or null",
  "result_date": "YYYY-MM-DD or null"
}

Website text: ${websiteText}

Return only the JSON, nothing else.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const json = text.match(/\{[\s\S]*\}/)?.[0];
    if (!json) return null;
    return JSON.parse(json);
  } catch {
    return null;
  }
}

async function updateExamDates() {
  if (!genAI) {
    logger.info('Skipping exam update — Gemini API key not configured');
    return;
  }

  logger.info('Starting daily exam date update...');

  // Get all active exams with official websites
  const { data: exams, error } = await supabase
    .from('exams')
    .select('id, name, slug, official_website, exam_status')
    .eq('is_active', true)
    .not('official_website', 'is', null)
    .in('exam_status', ['live', 'expected']);

  if (error || !exams?.length) {
    logger.error('Failed to fetch exams for update');
    return;
  }

  logger.info(`Checking ${exams.length} exams for date updates...`);

  let updated = 0;

  for (const exam of exams) {
    try {
      // Fetch website text
      const websiteText = await fetchWebsiteText(exam.official_website);
      if (!websiteText) continue;

      // Extract dates with AI
      const dates = await extractDatesWithAI(exam.name, websiteText);
      if (!dates) continue;

      // Only update fields that have values
      const updates = {};
      if (dates.application_start) updates.application_start = dates.application_start;
      if (dates.application_end) updates.application_end = dates.application_end;
      if (dates.exam_date) updates.exam_date = dates.exam_date;
      if (dates.result_date) updates.result_date = dates.result_date;

      if (Object.keys(updates).length === 0) continue;

      await supabase.from('exams').update(updates).eq('id', exam.id);
      updated++;
      logger.info(`Updated dates for: ${exam.name}`);

      // Wait 2 seconds between requests to avoid rate limiting
      await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
      logger.error(`Failed to update ${exam.name}: ${e.message}`);
    }
  }

  logger.info(`Daily update complete. Updated ${updated} exams.`);
}

function startExamUpdateCron() {
  // Run every day at 6 AM
  cron.schedule('0 6 * * *', () => {
    updateExamDates().catch(e => logger.error('Cron job failed:', e));
  });

  logger.info('Daily exam update cron job scheduled (6 AM daily)');
}

module.exports = { startExamUpdateCron, updateExamDates };

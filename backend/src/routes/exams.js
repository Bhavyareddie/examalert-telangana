const express = require('express');
const router = express.Router();
const Joi = require('joi');
const supabase = require('../utils/supabase');
const { authenticate, optionalAuth } = require('../middleware/auth');
const { validate, schemas } = require('../utils/validators');
const { securityLog } = require('../utils/logger');

const uuidParam = (req, res, next) => {
  const { error } = Joi.string().uuid().validate(req.params.id);
  if (error) return res.status(400).json({ error: 'Invalid exam ID' });
  next();
};

const slugParam = (req, res, next) => {
  const { error } = Joi.string().pattern(/^[a-z0-9-]+$/).min(3).max(100).validate(req.params.slug);
  if (error) return res.status(400).json({ error: 'Invalid exam slug' });
  next();
};

// GET /api/exams — PUBLIC, no auth required
router.get('/', validate(schemas.examList, 'query'), async (req, res) => {
  try {
    const { search, category, qualification, tag, min_age, max_age, page, limit, sort, trending } = req.query;

    let query = supabase
      .from('exams')
      .select('id,slug,name,name_te,short_name,conducting_body,min_age,max_age,qualifications,fee_general,fee_sc_st,application_end,exam_date,result_date,total_vacancies,tags,category,is_trending,view_count,bookmark_count,apply_link,notification_pdf', { count: 'exact' })
      .eq('is_active', true);

    if (search) query = query.ilike('name', `%${search}%`);
    if (category) query = query.eq('category', category);
    if (trending === 'true') query = query.eq('is_trending', true);
    if (qualification) query = query.contains('qualifications', [qualification]);
    if (tag) query = query.contains('tags', [tag]);
    if (min_age) query = query.gte('max_age', parseInt(min_age));
    if (max_age) query = query.lte('min_age', parseInt(max_age));

    const allowedSorts = ['application_end', 'exam_date', 'total_vacancies', 'view_count', 'created_at'];
    const safeSort = allowedSorts.includes(sort) ? sort : 'application_end';
    const from = (page - 1) * limit;

    query = query.order(safeSort, { ascending: true, nullsFirst: false }).range(from, from + limit - 1);

    const { data, error, count } = await query;
    if (error) throw error;

    res.json({ data, total: count, page, limit });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
});

// GET /api/exams/trending — PUBLIC
router.get('/trending', async (req, res) => {
  const { data, error } = await supabase
    .from('exams')
    .select('id,slug,name,category,tags,application_end,total_vacancies,view_count,conducting_body,fee_general')
    .eq('is_trending', true)
    .eq('is_active', true)
    .order('view_count', { ascending: false })
    .limit(6);

  if (error) return res.status(500).json({ error: 'Failed to fetch trending exams' });
  res.json(data);
});

// POST /api/exams/eligibility — PUBLIC
router.post('/eligibility', validate(schemas.eligibility), async (req, res) => {
  try {
    const { age, qualification } = req.body;

    const { data, error } = await supabase
      .from('exams')
      .select('id,slug,name,conducting_body,min_age,max_age,qualifications,fee_general,fee_sc_st,application_end,exam_date,total_vacancies,tags,category,apply_link')
      .eq('is_active', true)
      .contains('qualifications', [qualification])
      .lte('min_age', age)
      .gte('max_age', age);

    if (error) throw error;
    res.json({ eligible_exams: data, count: data.length });
  } catch {
    res.status(500).json({ error: 'Eligibility check failed' });
  }
});

// GET /api/exams/user/bookmarks — REQUIRES AUTH
router.get('/user/bookmarks', authenticate, async (req, res) => {
  const { data, error } = await supabase
    .from('bookmarks')
    .select('exam_id, created_at, exams(id,slug,name,conducting_body,min_age,max_age,qualifications,fee_general,application_end,exam_date,total_vacancies,tags,category,apply_link)')
    .eq('user_id', req.user.id)
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: 'Failed to fetch bookmarks' });
  res.json(data.map(b => ({ ...b.exams, bookmarked_at: b.created_at })));
});

// GET /api/exams/:slug — PUBLIC
router.get('/:slug', slugParam, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('exams')
      .select(`
        *,
        mock_tests(id, title, total_questions, duration_minutes, total_marks, is_free),
        previous_papers(id, year, title, pdf_url, answer_key_url)
      `)
      .eq('slug', req.params.slug)
      .eq('is_active', true)
      .single();

    if (error || !data) return res.status(404).json({ error: 'Exam not found' });

    // Fire-and-forget view count increment
    supabase.rpc('increment_view_count', { exam_id: data.id }).then(() => {});

    res.json(data);
  } catch {
    res.status(500).json({ error: 'Failed to fetch exam' });
  }
});

// POST /api/exams/:id/bookmark — REQUIRES AUTH
router.post('/:id/bookmark', authenticate, uuidParam, async (req, res) => {
  const examId = req.params.id;
  const userId = req.user.id;

  // Verify exam exists
  const { data: exam } = await supabase.from('exams').select('id').eq('id', examId).eq('is_active', true).single();
  if (!exam) return res.status(404).json({ error: 'Exam not found' });

  const { data: existing } = await supabase
    .from('bookmarks').select('id').eq('user_id', userId).eq('exam_id', examId).single();

  if (existing) {
    await supabase.from('bookmarks').delete().eq('id', existing.id);
    return res.json({ bookmarked: false });
  }

  await supabase.from('bookmarks').insert({ user_id: userId, exam_id: examId });
  res.json({ bookmarked: true });
});

module.exports = router;

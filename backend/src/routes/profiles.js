const express = require('express');
const router = express.Router();
const supabase = require('../utils/supabase');
const { authenticate } = require('../middleware/auth');
const { validate, schemas } = require('../utils/validators');

// All profile routes require authentication
router.use(authenticate);

// GET /api/profiles/me
router.get('/me', async (req, res) => {
  const { data, error } = await supabase
    .from('profiles')
    // Never return is_admin to client — derive from separate check
    .select('id,email,full_name,avatar_url,phone,date_of_birth,age,qualification,category,district,interests,skills,career_goals,preferred_categories,is_admin,notifications_email,notifications_push,notifications_whatsapp,whatsapp_number,language,created_at')
    .eq('id', req.user.id)
    .single();

  if (error) return res.status(404).json({ error: 'Profile not found' });
  res.json(data);
});

// PUT /api/profiles/me
router.put('/me', validate(schemas.profileUpdate), async (req, res) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(req.body)
    .eq('id', req.user.id)
    .select('id,email,full_name,avatar_url,phone,date_of_birth,age,qualification,category,district,interests,skills,career_goals,preferred_categories,notifications_email,notifications_push,notifications_whatsapp,whatsapp_number,language')
    .single();

  if (error) return res.status(400).json({ error: 'Failed to update profile' });
  res.json(data);
});

// GET /api/profiles/me/recommendations
router.get('/me/recommendations', async (req, res) => {
  const { data: profile } = await supabase
    .from('profiles')
    .select('qualification, age, interests, career_goals, category')
    .eq('id', req.user.id)
    .single();

  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  if (!profile.qualification) return res.json({ recommendations: [], based_on: profile, message: 'Complete your profile to get recommendations' });

  let query = supabase
    .from('exams')
    .select('id,slug,name,conducting_body,min_age,max_age,qualifications,fee_general,application_end,exam_date,total_vacancies,tags,category,apply_link')
    .eq('is_active', true)
    .contains('qualifications', [profile.qualification]);

  if (profile.age) {
    query = query.lte('min_age', profile.age).gte('max_age', profile.age);
  }

  const { data, error } = await query.order('application_end', { ascending: true, nullsFirst: false }).limit(10);
  if (error) return res.status(500).json({ error: 'Failed to fetch recommendations' });

  res.json({ recommendations: data, based_on: profile });
});

// GET /api/profiles/me/reminders
router.get('/me/reminders', async (req, res) => {
  const { data, error } = await supabase
    .from('reminders')
    .select('id, reminder_type, remind_at, created_at, exams(name, slug, exam_date, application_end)')
    .eq('user_id', req.user.id)
    .gte('remind_at', new Date().toISOString())
    .order('remind_at', { ascending: true });

  if (error) return res.status(500).json({ error: 'Failed to fetch reminders' });
  res.json(data);
});

// POST /api/profiles/me/reminders
router.post('/me/reminders', validate(schemas.reminder), async (req, res) => {
  const { exam_id, reminder_type, remind_at } = req.body;

  // Verify exam exists
  const { data: exam } = await supabase.from('exams').select('id').eq('id', exam_id).eq('is_active', true).single();
  if (!exam) return res.status(404).json({ error: 'Exam not found' });

  // Prevent duplicate reminders
  const { data: existing } = await supabase
    .from('reminders').select('id').eq('user_id', req.user.id).eq('exam_id', exam_id).eq('reminder_type', reminder_type).single();
  if (existing) return res.status(409).json({ error: 'Reminder already set for this exam' });

  const { data, error } = await supabase
    .from('reminders')
    .insert({ user_id: req.user.id, exam_id, reminder_type, remind_at })
    .select()
    .single();

  if (error) return res.status(400).json({ error: 'Failed to create reminder' });
  res.status(201).json(data);
});

// DELETE /api/profiles/me/reminders/:id
router.delete('/me/reminders/:id', async (req, res) => {
  const { error: valErr } = require('joi').string().uuid().validate(req.params.id);
  if (valErr) return res.status(400).json({ error: 'Invalid reminder ID' });

  const { error } = await supabase
    .from('reminders')
    .delete()
    .eq('id', req.params.id)
    .eq('user_id', req.user.id); // Ensure user owns this reminder

  if (error) return res.status(400).json({ error: 'Failed to delete reminder' });
  res.json({ success: true });
});

module.exports = router;

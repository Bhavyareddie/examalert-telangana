const express = require('express');
const router = express.Router();
const Joi = require('joi');
const path = require('path');
const multer = require('multer');
const supabase = require('../utils/supabase');
const { adminAuth, auditLog } = require('../middleware/auth');
const { validate, schemas } = require('../utils/validators');
const { securityLog } = require('../utils/logger');
const { updateExamDates } = require('../services/examUpdater');

// Multer: memory storage, strict limits
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },  // 5 MB max
  fileFilter: (req, file, cb) => {
    // Only allow PDF files
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;
    if (ext === '.pdf' && mime === 'application/pdf') return cb(null, true);
    securityLog('INVALID_FILE_UPLOAD', { mime, ext, adminId: req.user?.id });
    cb(new Error('Only PDF files are allowed'));
  },
});

const uuidParam = (req, res, next) => {
  const { error } = Joi.string().uuid().validate(req.params.id);
  if (error) return res.status(400).json({ error: 'Invalid ID format' });
  next();
};

// All admin routes require admin authentication
router.use(adminAuth);

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
  const [exams, users, bookmarks] = await Promise.all([
    supabase.from('exams').select('id', { count: 'exact', head: true }),
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('bookmarks').select('id', { count: 'exact', head: true }),
  ]);
  res.json({ total_exams: exams.count, total_users: users.count, total_bookmarks: bookmarks.count });
});

// POST /api/admin/exams
router.post('/exams', validate(schemas.examCreate), async (req, res) => {
  const { data, error } = await supabase.from('exams').insert(req.body).select().single();
  if (error) return res.status(400).json({ error: error.message });

  auditLog(req.user.id, 'CREATE_EXAM', data.id, { name: data.name });
  res.status(201).json(data);
});

// PUT /api/admin/exams/:id
router.put('/exams/:id', uuidParam, validate(schemas.examCreate), async (req, res) => {
  // Prevent slug collision with other exams
  if (req.body.slug) {
    const { data: existing } = await supabase
      .from('exams').select('id').eq('slug', req.body.slug).neq('id', req.params.id).single();
    if (existing) return res.status(409).json({ error: 'Slug already in use by another exam' });
  }

  const { data, error } = await supabase
    .from('exams').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });

  auditLog(req.user.id, 'UPDATE_EXAM', req.params.id, { fields: Object.keys(req.body) });
  res.json(data);
});

// DELETE /api/admin/exams/:id
router.delete('/exams/:id', uuidParam, async (req, res) => {
  // Soft delete — set is_active = false instead of hard delete
  const { data, error } = await supabase
    .from('exams').update({ is_active: false }).eq('id', req.params.id).select('name').single();
  if (error) return res.status(400).json({ error: error.message });

  auditLog(req.user.id, 'DELETE_EXAM', req.params.id, { name: data?.name });
  res.json({ success: true });
});

// POST /api/admin/exams/:id/upload-pdf
router.post('/exams/:id/upload-pdf', uuidParam, upload.single('pdf'), async (req, res) => {
  try {
    const { type } = req.query;
    const { error: typeErr } = Joi.string().valid('notification', 'syllabus').validate(type);
    if (typeErr) return res.status(400).json({ error: 'type must be notification or syllabus' });

    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    // Verify exam exists
    const { data: exam } = await supabase.from('exams').select('id').eq('id', req.params.id).single();
    if (!exam) return res.status(404).json({ error: 'Exam not found' });

    // Sanitize filename — use only exam ID and type, no user input in path
    const fileName = `${req.params.id}/${type}_${Date.now()}.pdf`;

    const { error: uploadErr } = await supabase.storage
      .from('exam-pdfs')
      .upload(fileName, file.buffer, { contentType: 'application/pdf', upsert: true });

    if (uploadErr) throw uploadErr;

    const { data: { publicUrl } } = supabase.storage.from('exam-pdfs').getPublicUrl(fileName);
    const updateField = type === 'notification' ? 'notification_pdf' : 'syllabus_pdf';
    await supabase.from('exams').update({ [updateField]: publicUrl }).eq('id', req.params.id);

    auditLog(req.user.id, 'UPLOAD_PDF', req.params.id, { type, fileName });
    res.json({ url: publicUrl });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// POST /api/admin/mock-tests
router.post('/mock-tests', async (req, res) => {
  const schema = Joi.object({
    exam_id: Joi.string().uuid().required(),
    title: Joi.string().trim().max(200).required(),
    description: Joi.string().trim().max(1000).optional().allow(''),
    total_questions: Joi.number().integer().min(1).max(500).required(),
    duration_minutes: Joi.number().integer().min(1).max(360).required(),
    total_marks: Joi.number().integer().min(1).max(1000).required(),
    questions: Joi.array().items(Joi.object({
      question: Joi.string().trim().max(2000).required(),
      option_a: Joi.string().trim().max(500).required(),
      option_b: Joi.string().trim().max(500).required(),
      option_c: Joi.string().trim().max(500).required(),
      option_d: Joi.string().trim().max(500).required(),
      correct_answer: Joi.string().valid('a','b','c','d').required(),
      explanation: Joi.string().trim().max(1000).optional().allow(''),
      subject: Joi.string().trim().max(100).optional().allow(''),
      difficulty: Joi.string().valid('easy','medium','hard').optional(),
    })).max(500).optional(),
  });

  const { error, value } = schema.validate(req.body, { stripUnknown: true });
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { questions, ...testData } = value;
  const { data: test, error: testErr } = await supabase.from('mock_tests').insert(testData).select().single();
  if (testErr) return res.status(400).json({ error: testErr.message });

  if (questions?.length) {
    const rows = questions.map((q, i) => ({ ...q, mock_test_id: test.id, order_num: i + 1 }));
    await supabase.from('mock_test_questions').insert(rows);
  }

  auditLog(req.user.id, 'CREATE_MOCK_TEST', test.id, { exam_id: value.exam_id });
  res.status(201).json(test);
});

// POST /api/admin/notifications/broadcast
router.post('/notifications/broadcast', validate(schemas.broadcast), async (req, res) => {
  const { title, message, type, exam_id } = req.body;

  const { data: users } = await supabase.from('profiles').select('id');
  if (!users?.length) return res.json({ sent: 0 });

  const notifications = users.map(u => ({ user_id: u.id, title, message, type, exam_id: exam_id || null }));

  // Batch insert in chunks of 100
  for (let i = 0; i < notifications.length; i += 100) {
    await supabase.from('notifications').insert(notifications.slice(i, i + 100));
  }

  auditLog(req.user.id, 'BROADCAST_NOTIFICATION', 'all_users', { title, type, count: users.length });
  res.json({ sent: users.length });
});

// GET /api/admin/users
router.get('/users', async (req, res) => {
  const { error: valErr, value } = Joi.object({
    page: Joi.number().integer().min(1).max(1000).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    search: Joi.string().trim().max(200).optional(),
  }).validate(req.query, { stripUnknown: true });

  if (valErr) return res.status(400).json({ error: valErr.message });

  const from = (value.page - 1) * value.limit;
  let query = supabase
    .from('profiles')
    .select('id, email, full_name, qualification, category, created_at, is_admin', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, from + value.limit - 1);

  if (value.search) query = query.ilike('email', `%${value.search}%`);

  const { data, error, count } = await query;
  if (error) return res.status(500).json({ error: 'Failed to fetch users' });
  res.json({ data, total: count });
});

// PUT /api/admin/users/:id/toggle-admin
router.put('/users/:id/toggle-admin', uuidParam, async (req, res) => {
  // Prevent self-demotion
  if (req.params.id === req.user.id) {
    return res.status(400).json({ error: 'Cannot change your own admin status' });
  }

  const { data: user } = await supabase.from('profiles').select('is_admin, email').eq('id', req.params.id).single();
  if (!user) return res.status(404).json({ error: 'User not found' });

  const { data, error } = await supabase
    .from('profiles').update({ is_admin: !user.is_admin }).eq('id', req.params.id).select('is_admin').single();
  if (error) return res.status(400).json({ error: error.message });

  auditLog(req.user.id, 'TOGGLE_ADMIN', req.params.id, { email: user.email, newStatus: data.is_admin });
  res.json({ is_admin: data.is_admin });
});

// POST /api/admin/update-exam-dates
router.post('/update-exam-dates', async (req, res) => {
  res.json({ message: 'Exam date update started in background' });
  updateExamDates().catch(() => {});
});

// Multer error handler
router.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ error: 'File too large. Maximum 5MB allowed.' });
  if (err.message === 'Only PDF files are allowed') return res.status(400).json({ error: err.message });
  next(err);
});

module.exports = router;

const Joi = require('joi');

// Reusable field definitions
const uuid = Joi.string().uuid({ version: 'uuidv4' });
const safeString = (max = 500) => Joi.string().trim().max(max).pattern(/^[^<>{}]*$/).messages({
  'string.pattern.base': 'Field contains invalid characters',
});
const url = Joi.string().uri({ scheme: ['http', 'https'] }).max(2000);
const dateStr = Joi.string().isoDate();

// ── Exam schemas ──────────────────────────────────────────────
const examListSchema = Joi.object({
  search: safeString(200).optional(),
  category: Joi.string().valid('govt_jobs','banking','railways','teaching','police','engineering','medical','defence','psc','upsc','other').optional(),
  qualification: Joi.string().valid('10th','inter','diploma','degree','btech','mtech','mba','mca','phd','other').optional(),
  tag: safeString(100).optional(),
  min_age: Joi.number().integer().min(14).max(70).optional(),
  max_age: Joi.number().integer().min(14).max(70).optional(),
  page: Joi.number().integer().min(1).max(500).default(1),
  limit: Joi.number().integer().min(1).max(50).default(12),
  sort: Joi.string().valid('application_end','exam_date','total_vacancies','view_count','created_at').default('application_end'),
  trending: Joi.string().valid('true','false').optional(),
});

const eligibilitySchema = Joi.object({
  age: Joi.number().integer().min(14).max(70).required(),
  qualification: Joi.string().valid('10th','inter','diploma','degree','btech','mtech','mba','mca','phd','other').required(),
  category: Joi.string().valid('general','obc','sc','st','ews','bc_a','bc_b','bc_c','bc_d','bc_e').optional(),
});

// ── Profile schemas ───────────────────────────────────────────
const profileUpdateSchema = Joi.object({
  full_name: safeString(100).optional(),
  phone: Joi.string().pattern(/^\+?[0-9\s\-]{7,15}$/).optional().allow(''),
  date_of_birth: dateStr.optional().allow(''),
  qualification: Joi.string().valid('10th','inter','diploma','degree','btech','mtech','mba','mca','phd','other').optional(),
  category: Joi.string().valid('general','obc','sc','st','ews','bc_a','bc_b','bc_c','bc_d','bc_e').optional(),
  district: safeString(100).optional().allow(''),
  interests: Joi.array().items(safeString(50)).max(20).optional(),
  skills: Joi.array().items(safeString(50)).max(20).optional(),
  career_goals: Joi.array().items(safeString(100)).max(10).optional(),
  preferred_categories: Joi.array().items(Joi.string().valid('govt_jobs','banking','railways','teaching','police','engineering','medical','defence','psc','upsc','other')).max(10).optional(),
  notifications_email: Joi.boolean().optional(),
  notifications_push: Joi.boolean().optional(),
  notifications_whatsapp: Joi.boolean().optional(),
  whatsapp_number: Joi.string().pattern(/^\+?[0-9\s\-]{7,15}$/).optional().allow(''),
  language: Joi.string().valid('en','te','hi').optional(),
  avatar_url: url.optional().allow(''),
});

const reminderSchema = Joi.object({
  exam_id: uuid.required(),
  reminder_type: Joi.string().valid('application_end','exam_date','result_date','custom').default('custom'),
  remind_at: dateStr.required(),
});

// ── Admin schemas ─────────────────────────────────────────────
const examCreateSchema = Joi.object({
  slug: Joi.string().pattern(/^[a-z0-9-]+$/).min(3).max(100).required(),
  name: safeString(200).required(),
  name_te: safeString(200).optional().allow(''),
  name_hi: safeString(200).optional().allow(''),
  short_name: safeString(50).optional().allow(''),
  conducting_body: safeString(200).required(),
  description: safeString(2000).optional().allow(''),
  description_te: safeString(2000).optional().allow(''),
  min_age: Joi.number().integer().min(14).max(70).optional().allow(null),
  max_age: Joi.number().integer().min(14).max(70).optional().allow(null),
  age_relaxation: Joi.object().optional(),
  qualifications: Joi.array().items(Joi.string().valid('10th','inter','diploma','degree','btech','mtech','mba','mca','phd','other')).min(1).required(),
  min_percentage: Joi.number().min(0).max(100).optional().allow(null),
  eligible_categories: Joi.array().items(Joi.string()).optional(),
  fee_general: Joi.number().integer().min(0).max(10000).default(0),
  fee_obc: Joi.number().integer().min(0).max(10000).default(0),
  fee_sc_st: Joi.number().integer().min(0).max(10000).default(0),
  fee_ews: Joi.number().integer().min(0).max(10000).default(0),
  notification_date: dateStr.optional().allow(null,''),
  application_start: dateStr.optional().allow(null,''),
  application_end: dateStr.optional().allow(null,''),
  fee_payment_end: dateStr.optional().allow(null,''),
  correction_window_start: dateStr.optional().allow(null,''),
  correction_window_end: dateStr.optional().allow(null,''),
  admit_card_date: dateStr.optional().allow(null,''),
  exam_date: dateStr.optional().allow(null,''),
  exam_date_end: dateStr.optional().allow(null,''),
  result_date: dateStr.optional().allow(null,''),
  counseling_date: dateStr.optional().allow(null,''),
  official_website: url.optional().allow(null,''),
  apply_link: url.optional().allow(null,''),
  notification_pdf: url.optional().allow(null,''),
  syllabus_pdf: url.optional().allow(null,''),
  total_vacancies: Joi.number().integer().min(0).optional().allow(null),
  exam_type: Joi.string().valid('written','online','both').optional(),
  exam_mode: Joi.string().valid('offline','online','both').optional(),
  tags: Joi.array().items(safeString(50)).max(20).optional(),
  category: Joi.string().valid('govt_jobs','banking','railways','teaching','police','engineering','medical','defence','psc','upsc','other').required(),
  state: safeString(100).default('Telangana'),
  is_active: Joi.boolean().default(true),
  is_trending: Joi.boolean().default(false),
  exam_status: Joi.string().valid('live','expected','completed').default('expected'),
});

const broadcastSchema = Joi.object({
  title: safeString(200).required(),
  message: safeString(1000).required(),
  type: Joi.string().valid('exam_update','reminder','new_exam','result','general').default('general'),
  exam_id: uuid.optional().allow(null),
});

// ── AI schemas ────────────────────────────────────────────────
const chatSchema = Joi.object({
  message: safeString(1000).required(),
  history: Joi.array().items(Joi.object({
    role: Joi.string().valid('user','model').required(),
    content: safeString(2000).required(),
  })).max(10).optional(),
  profile: Joi.object({
    qualification: Joi.string().optional(),
    age: Joi.number().optional(),
    category: Joi.string().optional(),
  }).optional(),
});

const roadmapSchema = Joi.object({
  qualification: Joi.string().valid('10th','inter','diploma','degree','btech','mtech','mba','mca','phd','other').required(),
  interests: Joi.array().items(safeString(50)).max(10).optional(),
  career_goal: safeString(200).required(),
  age: Joi.number().integer().min(14).max(70).required(),
});

// ── Validation middleware factory ─────────────────────────────
const validate = (schema, source = 'body') => (req, res, next) => {
  const target = source === 'query' ? req.query : req.body;
  const { error, value } = schema.validate(target, { abortEarly: false, stripUnknown: true });
  if (error) {
    const messages = error.details.map(d => d.message);
    return res.status(400).json({ error: 'Validation failed', details: messages });
  }
  if (source === 'query') req.query = value;
  else req.body = value;
  next();
};

module.exports = {
  validate,
  schemas: {
    examList: examListSchema,
    eligibility: eligibilitySchema,
    profileUpdate: profileUpdateSchema,
    reminder: reminderSchema,
    examCreate: examCreateSchema,
    broadcast: broadcastSchema,
    chat: chatSchema,
    roadmap: roadmapSchema,
  },
};

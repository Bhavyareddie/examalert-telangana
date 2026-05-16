require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const hpp = require('hpp');
const { logger, securityLog } = require('./utils/logger');
const { sanitizeMiddleware } = require('./utils/sanitize');

const examRoutes = require('./routes/exams');
const profileRoutes = require('./routes/profiles');
const aiRoutes = require('./routes/ai');
const adminRoutes = require('./routes/admin');
const notificationRoutes = require('./routes/notifications');
const quizRoutes = require('./routes/quiz');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';

// ── Trust proxy (Render/Vercel sit behind proxies) ────────────
app.set('trust proxy', 1);

// ── Security Headers via Helmet ───────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameSrc: ["'none'"],
      upgradeInsecureRequests: isProd ? [] : null,
    },
  },
  crossOriginEmbedderPolicy: false,
  hsts: isProd ? { maxAge: 31536000, includeSubDomains: true, preload: true } : false,
}));

// ── CORS — strict allowlist ───────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:3001',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (Postman, server-to-server) only in dev
    if (!origin && !isProd) return callback(null, true);
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    securityLog('CORS_BLOCKED', { origin });
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
  maxAge: 86400,
}));

// ── HTTP Parameter Pollution protection ───────────────────────
app.use(hpp());

// ── Body parsing — strict size limits ────────────────────────
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: false, limit: '50kb' }));

// ── XSS Sanitization on all inputs ───────────────────────────
app.use(sanitizeMiddleware);

// ── Compression ───────────────────────────────────────────────
app.use(compression());

// ── Request logging ───────────────────────────────────────────
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    logger.info({
      method: req.method,
      path: req.path,
      status: res.statusCode,
      ms: Date.now() - start,
      ip: req.ip,
    });
  });
  next();
});

// ── Rate Limiters ─────────────────────────────────────────────

// Global: 200 req / 15 min per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    securityLog('RATE_LIMIT_GLOBAL', { ip: req.ip, path: req.path });
    res.status(429).json({ error: 'Too many requests. Please try again later.' });
  },
});

// Auth endpoints: 10 req / 15 min (brute-force protection)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  skipSuccessfulRequests: false,
  handler: (req, res) => {
    securityLog('RATE_LIMIT_AUTH', { ip: req.ip });
    res.status(429).json({ error: 'Too many authentication attempts. Try again in 15 minutes.' });
  },
});

// AI endpoints: 15 req / min
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 15,
  handler: (req, res) => {
    res.status(429).json({ error: 'AI rate limit reached. Please wait a moment.' });
  },
});

// Admin endpoints: 60 req / 15 min
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  handler: (req, res) => {
    securityLog('RATE_LIMIT_ADMIN', { ip: req.ip, path: req.path });
    res.status(429).json({ error: 'Too many admin requests.' });
  },
});

// Slow down repeated requests (progressive delay)
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 100,
  delayMs: (hits) => (hits - 100) * 100,
});

app.use(globalLimiter);
app.use(speedLimiter);

// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/ai', aiLimiter, aiRoutes);
app.use('/api/admin', adminLimiter, adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/quiz', quizRoutes);

// ── Health check (no auth, no rate limit) ─────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), env: process.env.NODE_ENV });
});

// ── 404 ───────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Global error handler — never leak stack traces in prod ────
app.use((err, req, res, next) => {
  logger.error({ message: err.message, stack: err.stack, path: req.path });

  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS policy violation' });
  }

  const status = err.status || err.statusCode || 500;
  const message = isProd && status === 500 ? 'Internal server error' : err.message;
  res.status(status).json({ error: message });
});

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => logger.info(`ExamAlert API running on port ${PORT} [${process.env.NODE_ENV}]`));

module.exports = app;

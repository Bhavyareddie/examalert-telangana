const supabase = require('../utils/supabase');
const { securityLog, auditLog } = require('../utils/logger');

// Simple in-process admin cache (TTL 5 min) to reduce DB calls
const adminCache = new Map();
const ADMIN_CACHE_TTL = 5 * 60 * 1000;

const getAdminStatus = async (userId) => {
  const cached = adminCache.get(userId);
  if (cached && Date.now() - cached.ts < ADMIN_CACHE_TTL) return cached.isAdmin;

  const { data } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', userId)
    .single();

  const isAdmin = data?.is_admin === true;
  adminCache.set(userId, { isAdmin, ts: Date.now() });
  return isAdmin;
};

// Invalidate cache when admin status changes
const invalidateAdminCache = (userId) => adminCache.delete(userId);

/**
 * Verify Supabase JWT — attaches req.user
 * Returns 401 if missing/invalid, continues if valid
 */
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Strict Bearer token format check
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    securityLog('AUTH_MISSING_TOKEN', { ip: req.ip, path: req.path });
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.slice(7);

  // Basic token sanity check — prevent oversized tokens
  if (token.length > 2048) {
    securityLog('AUTH_OVERSIZED_TOKEN', { ip: req.ip });
    return res.status(401).json({ error: 'Invalid token' });
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    securityLog('AUTH_INVALID_TOKEN', { ip: req.ip, path: req.path, error: error?.message });
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  req.user = user;
  next();
};

/**
 * Optional auth — attaches req.user if token present, never blocks
 */
const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return next();

  const token = authHeader.slice(7);
  if (token.length > 2048) return next();

  const { data: { user } } = await supabase.auth.getUser(token);
  if (user) req.user = user;
  next();
};

/**
 * Require admin role — must be used after authenticate
 */
const requireAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const isAdmin = await getAdminStatus(req.user.id);

  if (!isAdmin) {
    securityLog('ADMIN_ACCESS_DENIED', { userId: req.user.id, ip: req.ip, path: req.path });
    return res.status(403).json({ error: 'Admin access required' });
  }

  next();
};

/**
 * Combined middleware: authenticate then requireAdmin
 */
const adminAuth = [authenticate, requireAdmin];

module.exports = { authenticate, optionalAuth, requireAdmin, adminAuth, invalidateAdminCache, auditLog };

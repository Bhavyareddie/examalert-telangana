const xss = require('xss');

const xssOptions = {
  whiteList: {},          // no HTML tags allowed
  stripIgnoreTag: true,
  stripIgnoreTagBody: ['script', 'style'],
};

/**
 * Recursively sanitize all string values in an object/array
 */
const sanitize = (value) => {
  if (typeof value === 'string') return xss(value.trim(), xssOptions);
  if (Array.isArray(value)) return value.map(sanitize);
  if (value !== null && typeof value === 'object') {
    const clean = {};
    for (const key of Object.keys(value)) {
      clean[key] = sanitize(value[key]);
    }
    return clean;
  }
  return value;
};

/**
 * Express middleware — sanitizes req.body, req.query, req.params
 */
const sanitizeMiddleware = (req, res, next) => {
  if (req.body) req.body = sanitize(req.body);
  if (req.query) req.query = sanitize(req.query);
  if (req.params) req.params = sanitize(req.params);
  next();
};

module.exports = { sanitize, sanitizeMiddleware };

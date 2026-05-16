const { createLogger, format, transports } = require('winston');
const path = require('path');

const { combine, timestamp, errors, json, colorize, simple } = format;

const isProd = process.env.NODE_ENV === 'production';

const logger = createLogger({
  level: isProd ? 'info' : 'debug',
  format: combine(timestamp(), errors({ stack: true }), json()),
  defaultMeta: { service: 'examalert-api' },
  transports: isProd
    ? [
        new transports.Console({ format: combine(timestamp(), json()) }),
      ]
    : [
        new transports.Console({ format: combine(colorize(), simple()) }),
      ],
});

// Security event logger — always logs regardless of level
const securityLog = (event, meta = {}) => {
  logger.warn({ event, ...meta, timestamp: new Date().toISOString() });
};

// Admin action audit logger
const auditLog = (adminId, action, target, meta = {}) => {
  logger.info({ type: 'ADMIN_AUDIT', adminId, action, target, ...meta, timestamp: new Date().toISOString() });
};

module.exports = { logger, securityLog, auditLog };

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const supabase = require('../utils/supabase');
const { authenticate } = require('../middleware/auth');
const { securityLog } = require('../utils/logger');

const emailSchema = Joi.string().email().max(254).required();
const passwordSchema = Joi.string().min(8).max(128)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  .message('Password must be 8+ chars with uppercase, lowercase, and a number');

// POST /api/auth/forgot-password
// Sends password reset email via Supabase
router.post('/forgot-password', async (req, res) => {
  const { error: valErr, value } = emailSchema.validate(req.body.email);
  if (valErr) return res.status(400).json({ error: 'Valid email required' });

  // Always return success to prevent email enumeration
  await supabase.auth.resetPasswordForEmail(value, {
    redirectTo: `${process.env.FRONTEND_URL}/auth/reset-password`,
  });

  res.json({ message: 'If an account exists, a reset link has been sent.' });
});

// POST /api/auth/reset-password
// Called after user clicks reset link (Supabase handles token via URL hash)
router.post('/reset-password', authenticate, async (req, res) => {
  const { error: valErr, value: password } = passwordSchema.validate(req.body.password);
  if (valErr) return res.status(400).json({ error: valErr.message });

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'Password updated successfully' });
});

// POST /api/auth/resend-verification
router.post('/resend-verification', async (req, res) => {
  const { error: valErr, value } = emailSchema.validate(req.body.email);
  if (valErr) return res.status(400).json({ error: 'Valid email required' });

  await supabase.auth.resend({ type: 'signup', email: value });
  res.json({ message: 'Verification email sent if account exists.' });
});

// DELETE /api/auth/account
// Permanently delete user account and all their data
router.delete('/account', authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    // Delete all user data (RLS cascades handle most, but explicit cleanup)
    await Promise.all([
      supabase.from('bookmarks').delete().eq('user_id', userId),
      supabase.from('reminders').delete().eq('user_id', userId),
      supabase.from('notifications').delete().eq('user_id', userId),
      supabase.from('mock_test_attempts').delete().eq('user_id', userId),
    ]);

    // Delete profile
    await supabase.from('profiles').delete().eq('id', userId);

    // Delete auth user (requires service role)
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) throw error;

    securityLog('ACCOUNT_DELETED', { userId });
    res.json({ message: 'Account permanently deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete account. Please contact support.' });
  }
});

module.exports = router;

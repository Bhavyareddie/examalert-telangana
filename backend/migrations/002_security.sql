-- ExamAlert Telangana — Security Migration
-- Run this AFTER 001_init.sql in Supabase SQL Editor

-- ============================================
-- ADMIN AUDIT LOG TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS admin_audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  target_id TEXT,
  target_type TEXT,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Only admins can read audit logs, no one can update/delete
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can view audit log" ON admin_audit_log
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );
-- No INSERT/UPDATE/DELETE policies — only service role can write

CREATE INDEX idx_audit_log_admin ON admin_audit_log(admin_id);
CREATE INDEX idx_audit_log_created ON admin_audit_log(created_at DESC);

-- ============================================
-- SECURITY: Harden existing RLS policies
-- ============================================

-- Exams: explicitly deny write from non-admin authenticated users
DROP POLICY IF EXISTS "Exams are publicly readable" ON exams;
CREATE POLICY "Exams are publicly readable" ON exams
  FOR SELECT USING (is_active = true OR auth.uid() IN (
    SELECT id FROM profiles WHERE is_admin = true
  ));

-- Prevent users from reading other users' profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.is_admin = true
  ));

-- Prevent users from setting is_admin on themselves
CREATE OR REPLACE FUNCTION prevent_self_admin_escalation()
RETURNS TRIGGER AS $$
BEGIN
  -- Only allow is_admin changes via service role (backend)
  IF NEW.is_admin != OLD.is_admin AND auth.role() != 'service_role' THEN
    RAISE EXCEPTION 'Cannot change admin status directly';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS prevent_admin_escalation ON profiles;
CREATE TRIGGER prevent_admin_escalation
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION prevent_self_admin_escalation();

-- ============================================
-- RATE LIMITING: Track failed login attempts
-- (Supabase handles this natively, but we add extra tracking)
-- ============================================

CREATE TABLE IF NOT EXISTS security_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  ip_address INET,
  user_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-cleanup events older than 30 days
CREATE OR REPLACE FUNCTION cleanup_old_security_events()
RETURNS VOID AS $$
  DELETE FROM security_events WHERE created_at < NOW() - INTERVAL '30 days';
$$ LANGUAGE SQL SECURITY DEFINER;

-- ============================================
-- CONTENT SAFETY: Add source tracking to exams
-- ============================================

ALTER TABLE exams ADD COLUMN IF NOT EXISTS source_url TEXT;
ALTER TABLE exams ADD COLUMN IF NOT EXISTS source_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE exams ADD COLUMN IF NOT EXISTS disclaimer TEXT DEFAULT 'Verify all details from official sources before applying.';

-- Update existing exams with disclaimer
UPDATE exams SET disclaimer = 'Verify all details from official sources before applying.' WHERE disclaimer IS NULL;

-- ============================================
-- GDPR: Add data deletion request tracking
-- ============================================

CREATE TABLE IF NOT EXISTS deletion_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed'))
);

-- ============================================
-- PERFORMANCE: Additional security indexes
-- ============================================

CREATE INDEX IF NOT EXISTS idx_security_events_ip ON security_events(ip_address, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_security_events_type ON security_events(event_type, created_at DESC);

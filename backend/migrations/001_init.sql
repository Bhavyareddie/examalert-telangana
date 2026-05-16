-- ExamAlert Telangana - Complete Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS & PROFILES
-- ============================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  date_of_birth DATE,
  age INTEGER,
  qualification TEXT CHECK (qualification IN (
    '10th', 'inter', 'diploma', 'degree', 'btech', 'mtech', 'mba', 'mca', 'phd', 'other'
  )),
  category TEXT CHECK (category IN ('general', 'obc', 'sc', 'st', 'ews', 'bc_a', 'bc_b', 'bc_c', 'bc_d', 'bc_e')),
  district TEXT,
  interests TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  career_goals TEXT[] DEFAULT '{}',
  preferred_categories TEXT[] DEFAULT '{}',
  is_admin BOOLEAN DEFAULT FALSE,
  notifications_email BOOLEAN DEFAULT TRUE,
  notifications_push BOOLEAN DEFAULT TRUE,
  notifications_whatsapp BOOLEAN DEFAULT FALSE,
  whatsapp_number TEXT,
  language TEXT DEFAULT 'en' CHECK (language IN ('en', 'te', 'hi')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- EXAMS
-- ============================================

CREATE TABLE exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_te TEXT,
  name_hi TEXT,
  short_name TEXT,
  conducting_body TEXT NOT NULL,
  description TEXT,
  description_te TEXT,
  
  -- Eligibility
  min_age INTEGER,
  max_age INTEGER,
  age_relaxation JSONB DEFAULT '{}',
  qualifications TEXT[] NOT NULL DEFAULT '{}',
  min_percentage DECIMAL(5,2),
  eligible_categories TEXT[] DEFAULT '{}',
  
  -- Fees
  fee_general INTEGER DEFAULT 0,
  fee_obc INTEGER DEFAULT 0,
  fee_sc_st INTEGER DEFAULT 0,
  fee_ews INTEGER DEFAULT 0,
  
  -- Important Dates
  notification_date DATE,
  application_start DATE,
  application_end DATE,
  fee_payment_end DATE,
  correction_window_start DATE,
  correction_window_end DATE,
  admit_card_date DATE,
  exam_date DATE,
  exam_date_end DATE,
  result_date DATE,
  counseling_date DATE,
  
  -- Links & Resources
  official_website TEXT,
  apply_link TEXT,
  notification_pdf TEXT,
  syllabus_pdf TEXT,
  
  -- Metadata
  total_vacancies INTEGER,
  exam_type TEXT CHECK (exam_type IN ('written', 'online', 'both')),
  exam_mode TEXT CHECK (exam_mode IN ('offline', 'online', 'both')),
  tags TEXT[] DEFAULT '{}',
  category TEXT CHECK (category IN (
    'govt_jobs', 'banking', 'railways', 'teaching', 'police', 
    'engineering', 'medical', 'defence', 'psc', 'upsc', 'other'
  )),
  state TEXT DEFAULT 'Telangana',
  is_active BOOLEAN DEFAULT TRUE,
  is_trending BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  bookmark_count INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MOCK TESTS & PREVIOUS PAPERS
-- ============================================

CREATE TABLE mock_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  total_questions INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  total_marks INTEGER NOT NULL,
  is_free BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE mock_test_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mock_test_id UUID REFERENCES mock_tests(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) CHECK (correct_answer IN ('a','b','c','d')),
  explanation TEXT,
  subject TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  order_num INTEGER
);

CREATE TABLE previous_papers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  title TEXT NOT NULL,
  pdf_url TEXT NOT NULL,
  answer_key_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- USER INTERACTIONS
-- ============================================

CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, exam_id)
);

CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  reminder_type TEXT CHECK (reminder_type IN ('application_end', 'exam_date', 'result_date', 'custom')),
  remind_at TIMESTAMPTZ NOT NULL,
  is_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE mock_test_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  mock_test_id UUID REFERENCES mock_tests(id) ON DELETE CASCADE,
  score INTEGER,
  total_marks INTEGER,
  time_taken_minutes INTEGER,
  answers JSONB DEFAULT '{}',
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- NOTIFICATIONS
-- ============================================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('exam_update', 'reminder', 'new_exam', 'result', 'general')),
  exam_id UUID REFERENCES exams(id) ON DELETE SET NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COMMUNITY
-- ============================================

CREATE TABLE discussions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  exam_id UUID REFERENCES exams(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE discussion_replies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  discussion_id UUID REFERENCES discussions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- DAILY QUIZ
-- ============================================

CREATE TABLE daily_quiz (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer CHAR(1) CHECK (correct_answer IN ('a','b','c','d')),
  explanation TEXT,
  subject TEXT,
  quiz_date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_exams_tags ON exams USING GIN(tags);
CREATE INDEX idx_exams_qualifications ON exams USING GIN(qualifications);
CREATE INDEX idx_exams_category ON exams(category);
CREATE INDEX idx_exams_application_end ON exams(application_end);
CREATE INDEX idx_exams_is_active ON exams(is_active);
CREATE INDEX idx_exams_is_trending ON exams(is_trending);
CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_discussions_exam ON discussions(exam_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE mock_test_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussions ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_replies ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only read/update their own
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Exams: public read, admin write
CREATE POLICY "Exams are publicly readable" ON exams FOR SELECT USING (true);

-- Bookmarks: users manage their own
CREATE POLICY "Users manage own bookmarks" ON bookmarks FOR ALL USING (auth.uid() = user_id);

-- Notifications: users see their own
CREATE POLICY "Users see own notifications" ON notifications FOR ALL USING (auth.uid() = user_id);

-- Reminders: users manage their own
CREATE POLICY "Users manage own reminders" ON reminders FOR ALL USING (auth.uid() = user_id);

-- Mock test attempts: users manage their own
CREATE POLICY "Users manage own attempts" ON mock_test_attempts FOR ALL USING (auth.uid() = user_id);

-- Discussions: public read, authenticated write
CREATE POLICY "Discussions are public" ON discussions FOR SELECT USING (true);
CREATE POLICY "Auth users can post discussions" ON discussions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own discussions" ON discussions FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Replies are public" ON discussion_replies FOR SELECT USING (true);
CREATE POLICY "Auth users can reply" ON discussion_replies FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_exams_updated_at BEFORE UPDATE ON exams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Increment view count
CREATE OR REPLACE FUNCTION increment_view_count(exam_id UUID)
RETURNS VOID AS $$
  UPDATE exams SET view_count = view_count + 1 WHERE id = exam_id;
$$ LANGUAGE SQL SECURITY DEFINER;

-- ============================================
-- SEED DATA - Sample Exams
-- ============================================

INSERT INTO exams (slug, name, name_te, short_name, conducting_body, description, min_age, max_age, qualifications, fee_general, fee_sc_st, application_end, exam_date, total_vacancies, tags, category, is_trending) VALUES
('tspsc-group-1-2024', 'TSPSC Group 1 Services', 'TSPSC గ్రూప్ 1 సర్వీసెస్', 'Group 1', 'TSPSC', 'Telangana State Public Service Commission Group 1 recruitment for Deputy Collector, DSP and other gazetted posts', 18, 44, ARRAY['degree', 'btech', 'mtech', 'mba', 'mca'], 200, 100, '2024-12-31', '2025-03-15', 503, ARRAY['#Degree', '#BTech', '#GovtJobs', '#TSPSC', '#GroupOne'], 'psc', true),

('tspsc-group-2-2024', 'TSPSC Group 2 Services', 'TSPSC గ్రూప్ 2 సర్వీసెస్', 'Group 2', 'TSPSC', 'Recruitment for Mandal Revenue Officer, Junior Accountant and other posts', 18, 44, ARRAY['degree', 'btech', 'diploma'], 150, 75, '2024-12-15', '2025-02-20', 897, ARRAY['#Degree', '#Diploma', '#GovtJobs', '#TSPSC'], 'psc', true),

('ts-police-constable-2024', 'TS Police Constable Recruitment', 'TS పోలీస్ కానిస్టేబుల్', 'Police Constable', 'TSLPRB', 'Telangana State Level Police Recruitment Board Constable recruitment', 18, 25, ARRAY['inter', '10th'], 100, 50, '2024-11-30', '2025-01-25', 16614, ARRAY['#Inter', '#10thPass', '#Police', '#GovtJobs'], 'police', true),

('ts-tet-2024', 'Telangana TET 2024', 'తెలంగాణ TET 2024', 'TS TET', 'TSTET', 'Teacher Eligibility Test for Primary and Upper Primary teachers', 18, 44, ARRAY['degree', 'btech', 'diploma'], 200, 100, '2024-12-20', '2025-02-10', NULL, ARRAY['#Degree', '#Teaching', '#TET', '#GovtJobs'], 'teaching', false),

('ibps-po-2024', 'IBPS PO 2024', 'IBPS PO 2024', 'IBPS PO', 'IBPS', 'Institute of Banking Personnel Selection Probationary Officer recruitment', 20, 30, ARRAY['degree', 'btech'], 850, 175, '2024-11-25', '2025-01-18', 4455, ARRAY['#Degree', '#BTech', '#Banking', '#GovtJobs'], 'banking', true),

('rrb-ntpc-2024', 'RRB NTPC 2024', 'RRB NTPC 2024', 'RRB NTPC', 'Railway Recruitment Board', 'Non-Technical Popular Categories recruitment for various railway posts', 18, 33, ARRAY['inter', 'degree', '10th'], 500, 250, '2024-12-10', '2025-03-01', 11558, ARRAY['#10thPass', '#Inter', '#Degree', '#Railways', '#GovtJobs'], 'railways', true);

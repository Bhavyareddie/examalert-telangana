-- ExamAlert Telangana — Migration 003
-- Adds exam_status column and replaces stale 2024 seed data
-- with 10 accurate live/expected 2025-2027 exams.
-- Run this in Supabase SQL Editor AFTER 001 and 002.

-- ============================================
-- 1. ADD exam_status COLUMN
-- ============================================

ALTER TABLE exams
  ADD COLUMN IF NOT EXISTS exam_status TEXT
  DEFAULT 'expected'
  CHECK (exam_status IN ('live', 'expected', 'completed'));

-- ============================================
-- 2. REMOVE OLD STALE 2024 SEED DATA
-- ============================================

DELETE FROM exams WHERE slug IN (
  'tspsc-group-1-2024',
  'tspsc-group-2-2024',
  'ts-police-constable-2024',
  'ts-tet-2024',
  'ibps-po-2024',
  'rrb-ntpc-2024'
);

-- ============================================
-- 3. INSERT 10 ACCURATE 2025 / 2026 / 2027 EXAMS
--
-- Sources (verify before going live):
--   TSPSC  → tspsc.gov.in
--   TSLPRB → tslprb.in
--   TSTET  → tstet.cgg.gov.in
--   IBPS   → ibps.in
--   RRB    → indianrailways.gov.in / rrbapply.gov.in
--   SBI    → sbi.co.in/careers
--   SSC    → ssc.gov.in
--   UPSC   → upsc.gov.in
--   NEET   → nta.ac.in/neet
--   GATE   → gate2026.iitr.ac.in
-- ============================================

INSERT INTO exams (
  slug, name, name_te, short_name, conducting_body, description,
  min_age, max_age,
  age_relaxation,
  qualifications,
  fee_general, fee_obc, fee_sc_st, fee_ews,
  notification_date, application_start, application_end,
  exam_date, result_date,
  total_vacancies,
  official_website, apply_link,
  tags, category, state,
  is_active, is_trending, exam_status
) VALUES

-- ── 1. TSPSC Group 1 2025 (Expected — notification not yet released) ──────
(
  'tspsc-group-1-2025',
  'TSPSC Group 1 Services 2025',
  'TSPSC గ్రూప్ 1 సర్వీసెస్ 2025',
  'Group 1',
  'TSPSC',
  'Telangana State Public Service Commission Group 1 recruitment for Deputy Collector, DSP, Commercial Tax Officer and other gazetted posts. Expected notification in mid-2025. Past vacancy (2023): 503 posts.',
  18, 44,
  '{"OBC": 5, "SC": 5, "ST": 5, "EWS": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['degree','btech','mtech','mba','mca'],
  200, 150, 100, 100,
  '2025-07-01', '2025-07-10', '2025-08-10',
  '2025-11-15', '2026-03-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#BTech','#GovtJobs','#TSPSC','#GroupOne','#GazettedPosts'],
  'psc', 'Telangana',
  true, true, 'expected'
),

-- ── 2. TSPSC Group 2 2025 (Expected) ─────────────────────────────────────
(
  'tspsc-group-2-2025',
  'TSPSC Group 2 Services 2025',
  'TSPSC గ్రూప్ 2 సర్వీసెస్ 2025',
  'Group 2',
  'TSPSC',
  'Recruitment for Mandal Revenue Officer, Junior Accountant, Senior Accountant and other non-gazetted posts under TSPSC. Expected notification in 2025. Past vacancy (2023): 897 posts.',
  18, 44,
  '{"OBC": 5, "SC": 5, "ST": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','btech','diploma'],
  150, 100, 75, 75,
  '2025-08-01', '2025-08-10', '2025-09-10',
  '2025-12-10', '2026-04-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#Diploma','#GovtJobs','#TSPSC','#GroupTwo','#MRO'],
  'psc', 'Telangana',
  true, true, 'expected'
),

-- ── 3. TSLPRB SCT PC & RSI 2025 (Live — notification released Mar 2025) ──
(
  'tslprb-pc-rsi-2025',
  'TS Police SCT PC & RSI Recruitment 2025',
  'TS పోలీస్ SCT PC & RSI నియామకం 2025',
  'TS Police 2025',
  'TSLPRB',
  'Telangana State Level Police Recruitment Board recruitment for SCT Police Constables and RSIs across all districts. Notification released March 2025.',
  18, 25,
  '{"SC": 5, "ST": 5, "Ex-Servicemen": 3}'::jsonb,
  ARRAY['inter','10th'],
  100, 100, 50, 50,
  '2025-03-10', '2025-03-15', '2025-04-15',
  '2025-07-01', NULL,
  16614,
  'https://tslprb.in', 'https://tslprb.in',
  ARRAY['#Inter','#10thPass','#Police','#GovtJobs','#TSLPRB','#Constable'],
  'police', 'Telangana',
  true, true, 'live'
),

-- ── 4. TS TET 2025 (Live — notification released Feb 2025) ───────────────
(
  'ts-tet-2025',
  'Telangana TET 2025',
  'తెలంగాణ TET 2025',
  'TS TET',
  'TSTET / School Education Dept',
  'Teacher Eligibility Test for Paper I (Classes 1–5) and Paper II (Classes 6–8). Mandatory for all government teacher appointments in Telangana.',
  18, 44,
  '{"SC": 5, "ST": 5, "PH": 10}'::jsonb,
  ARRAY['degree','btech','diploma','inter'],
  200, 150, 100, 100,
  '2025-02-01', '2025-02-10', '2025-03-10',
  '2025-05-15', '2025-07-01',
  NULL,
  'https://tstet.cgg.gov.in', 'https://tstet.cgg.gov.in',
  ARRAY['#Degree','#Teaching','#TET','#GovtJobs','#TeacherJobs'],
  'teaching', 'Telangana',
  true, true, 'live'
),

-- ── 5. IBPS PO 2025 (Expected — cycle opens Aug–Sep every year) ──────────
(
  'ibps-po-2025',
  'IBPS PO 2025',
  'IBPS PO 2025',
  'IBPS PO',
  'IBPS',
  'Institute of Banking Personnel Selection Probationary Officer recruitment for public sector banks. Expected notification August 2025. Prelims in October, Mains in November. Past vacancy (2024): 4,455 posts.',
  20, 30,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['degree','btech'],
  850, 850, 175, 175,
  '2025-08-01', '2025-08-05', '2025-08-25',
  '2025-10-18', '2026-01-15',
  NULL,
  'https://ibps.in', NULL,
  ARRAY['#Degree','#BTech','#Banking','#GovtJobs','#IBPS','#BankPO'],
  'banking', 'All India',
  true, true, 'expected'
),

-- ── 6. RRB NTPC 2025 (Live — CEN 05/2025 released) ───────────────────────
(
  'rrb-ntpc-2025',
  'RRB NTPC CEN 05/2025',
  'RRB NTPC 2025',
  'RRB NTPC',
  'Railway Recruitment Board',
  'Non-Technical Popular Categories recruitment for Junior Clerk, Accounts Clerk, Junior Time Keeper, Trains Clerk, Commercial cum Ticket Clerk and Station Master posts.',
  18, 33,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['inter','degree','10th'],
  500, 500, 250, 250,
  '2025-02-20', '2025-03-01', '2025-04-01',
  '2025-09-01', NULL,
  11558,
  'https://indianrailways.gov.in', 'https://rrbapply.gov.in',
  ARRAY['#10thPass','#Inter','#Degree','#Railways','#GovtJobs','#NTPC'],
  'railways', 'All India',
  true, true, 'live'
),

-- ── 7. SBI PO 2025 (Expected — cycle opens Jun–Jul every year) ───────────
(
  'sbi-po-2025',
  'SBI PO 2025',
  'SBI PO 2025',
  'SBI PO',
  'State Bank of India',
  'State Bank of India Probationary Officer recruitment. One of the most prestigious banking exams. Expected notification June 2025. Prelims in July, Mains in August. Past vacancy (2024): 600 posts.',
  21, 30,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['degree','btech'],
  750, 750, 125, 125,
  '2025-06-01', '2025-06-05', '2025-06-25',
  '2025-07-20', '2025-10-01',
  NULL,
  'https://sbi.co.in/careers', NULL,
  ARRAY['#Degree','#BTech','#Banking','#GovtJobs','#SBI','#BankPO'],
  'banking', 'All India',
  true, true, 'expected'
),

-- ── 8. SSC CGL 2025 (Live — notification released May 2025) ──────────────
(
  'ssc-cgl-2025',
  'SSC CGL 2025',
  'SSC CGL 2025',
  'SSC CGL',
  'Staff Selection Commission',
  'Combined Graduate Level Examination for Group B and C posts in Central Government departments including Income Tax Inspector, CBI Sub-Inspector, Auditor and Accountant.',
  18, 32,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 3}'::jsonb,
  ARRAY['degree','btech'],
  100, 100, 0, 100,
  '2025-05-01', '2025-05-10', '2025-06-10',
  '2025-09-15', NULL,
  14582,
  'https://ssc.gov.in', 'https://ssc.gov.in',
  ARRAY['#Degree','#BTech','#GovtJobs','#SSC','#CGL','#CentralGovt'],
  'govt_jobs', 'All India',
  true, true, 'live'
),

-- ── 9. UPSC CSE 2026 (Expected — annual cycle, notification Feb 2026) ─────
(
  'upsc-cse-2026',
  'UPSC Civil Services Examination 2026',
  'UPSC సివిల్ సర్వీసెస్ 2026',
  'UPSC CSE',
  'UPSC',
  'Union Public Service Commission Civil Services Examination for IAS, IPS, IFS and other Group A & B Central Services. Notification expected February 2026. Prelims in May 2026. Past vacancy (2024): 979 posts.',
  21, 32,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['degree','btech','mtech','mba','mca','phd'],
  100, 100, 0, 100,
  '2026-02-01', '2026-02-05', '2026-03-10',
  '2026-05-24', '2026-12-01',
  NULL,
  'https://upsc.gov.in', NULL,
  ARRAY['#Degree','#BTech','#IAS','#IPS','#UPSC','#CivilServices','#GovtJobs'],
  'upsc', 'All India',
  true, true, 'expected'
),

-- ── 10. GATE 2026 (Expected — notification Aug 2025, exam Feb 2026) ───────
(
  'gate-2026',
  'GATE 2026',
  'GATE 2026',
  'GATE',
  'IIT Roorkee / MHRD',
  'Graduate Aptitude Test in Engineering 2026 conducted by IIT Roorkee. Valid for PSU recruitment (BHEL, ONGC, NTPC, IOCL) and M.Tech admissions. Notification expected August 2025.',
  NULL, NULL,
  '{}'::jsonb,
  ARRAY['btech','mtech','degree'],
  1800, 1800, 900, 900,
  '2025-08-20', '2025-09-01', '2025-10-01',
  '2026-02-07', '2026-04-15',
  NULL,
  'https://gate2026.iitr.ac.in', NULL,
  ARRAY['#BTech','#Engineering','#GATE','#PSU','#MTech','#ONGC','#BHEL'],
  'engineering', 'All India',
  true, true, 'expected'
);

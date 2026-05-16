-- ExamAlert Telangana — Migration 009
-- 10 more important 2025/2026 exams (batch 7)
-- Run in Supabase SQL Editor AFTER 008.
-- Vacancies NULL (TBA) unless officially confirmed.
-- Past vacancy shown in description for reference.
--
-- Sources:
--   TSPSC Librarian      → tspsc.gov.in
--   ISRO VSSC            → isro.gov.in
--   BHEL Engineer        → bhel.com
--   TSPSC Statistical Officer → tspsc.gov.in
--   Indian Army Agniveer → joinindianarmy.nic.in
--   TS EDCET             → tsedcet.org
--   TSPSC Extension Officer → tspsc.gov.in
--   ONGC GT              → ongcindia.com
--   TSPSC Typist         → tspsc.gov.in
--   Indian Navy Agniveer → joinindiannavy.gov.in

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

-- ── 61. TSPSC Librarian 2025 (Expected) ──────────────────────────────────
(
  'tspsc-librarian-2025',
  'TSPSC Librarian Grade II 2025',
  'TSPSC లైబ్రేరియన్ గ్రేడ్ II 2025',
  'TSPSC Librarian',
  'TSPSC',
  'Recruitment for Librarian Grade II posts in government degree colleges and junior colleges across Telangana under Higher Education Department. Past vacancy (2022): 184 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','mtech'],
  150, 100, 75, 75,
  '2026-02-15', '2026-02-20', '2026-03-20',
  '2026-06-15', '2026-10-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#GovtJobs','#TSPSC','#Librarian','#HigherEducation','#CollegeJobs'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 62. ISRO Scientist/Engineer SC 2025 (Expected) ───────────────────────
(
  'isro-scientist-sc-2025',
  'ISRO Scientist/Engineer SC 2025',
  'ISRO సైంటిస్ట్/ఇంజనీర్ SC 2025',
  'ISRO SC',
  'ISRO',
  'Indian Space Research Organisation Scientist/Engineer SC recruitment for Electronics, Mechanical, Computer Science and other engineering disciplines across ISRO centres including NRSC Hyderabad. Past vacancy (2024): 320 posts.',
  18, 35,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['btech','mtech'],
  250, 250, 0, 250,
  '2025-07-20', '2025-07-25', '2025-08-15',
  '2025-10-12', '2025-12-15',
  NULL,
  'https://isro.gov.in', NULL,
  ARRAY['#BTech','#MTech','#Engineering','#ISRO','#PSU','#GovtJobs','#Space','#Hyderabad'],
  'engineering', 'All India',
  true, true, 'expected'
),

-- ── 63. BHEL Engineer Trainee 2025 (Expected) ────────────────────────────
(
  'bhel-et-2025',
  'BHEL Engineer Trainee 2025',
  'BHEL ఇంజనీర్ ట్రైనీ 2025',
  'BHEL ET',
  'Bharat Heavy Electricals Limited',
  'Bharat Heavy Electricals Limited Engineer Trainee recruitment through GATE score for Mechanical, Electrical, Electronics, Civil and other engineering disciplines. BHEL Hyderabad is a major unit. Past vacancy (2024): 150 posts.',
  18, 27,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['btech','mtech'],
  0, 0, 0, 0,
  '2025-09-10', '2025-09-15', '2025-10-05',
  '2025-11-23', '2026-01-15',
  NULL,
  'https://bhel.com', NULL,
  ARRAY['#BTech','#MTech','#Engineering','#BHEL','#PSU','#GovtJobs','#GATE','#Hyderabad'],
  'engineering', 'All India',
  true, true, 'expected'
),

-- ── 64. TSPSC Statistical Officer 2025 (Expected) ────────────────────────
(
  'tspsc-statistical-officer-2025',
  'TSPSC Statistical Officer 2025',
  'TSPSC స్టాటిస్టికల్ ఆఫీసర్ 2025',
  'TSPSC Stat Officer',
  'TSPSC',
  'Recruitment for Statistical Officers in Telangana Economics & Statistics Department for data collection, analysis and preparation of statistical reports. Past vacancy (2022): 92 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','mtech','mba'],
  150, 100, 75, 75,
  '2026-03-01', '2026-03-05', '2026-04-05',
  '2026-07-01', '2026-11-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#GovtJobs','#TSPSC','#Statistics','#Economics','#DataAnalysis'],
  'psc', 'Telangana',
  true, false, 'expected'
),

-- ── 65. Indian Army Agniveer 2025 (Live — ongoing recruitment) ───────────
(
  'army-agniveer-2025',
  'Indian Army Agniveer 2025',
  'ఇండియన్ ఆర్మీ అగ్నివీర్ 2025',
  'Army Agniveer',
  'Indian Army',
  'Agniveer recruitment for Indian Army under Agnipath scheme for General Duty, Technical, Clerk/SKT, Tradesman and other categories. Rally-based recruitment across all districts.',
  17, 21,
  '{}'::jsonb,
  ARRAY['10th','inter'],
  0, 0, 0, 0,
  '2025-04-01', '2025-04-01', '2025-05-15',
  '2025-07-01', '2025-09-01',
  40000,
  'https://joinindianarmy.nic.in', 'https://joinindianarmy.nic.in',
  ARRAY['#10thPass','#Inter','#Defence','#Army','#Agniveer','#Agnipath','#GovtJobs'],
  'defence', 'All India',
  true, true, 'live'
),

-- ── 66. TS EDCET 2025 (Live — B.Ed entrance) ─────────────────────────────
(
  'ts-edcet-2025',
  'TS EDCET 2025',
  'తెలంగాణ EDCET 2025',
  'TS EDCET',
  'TSCHE / Osmania University',
  'Telangana State Education Common Entrance Test for admission to 2-year B.Ed course in government and private colleges. Required for secondary school teacher eligibility in Telangana.',
  NULL, NULL,
  '{}'::jsonb,
  ARRAY['degree','btech'],
  800, 800, 400, 800,
  '2025-03-20', '2025-03-25', '2025-04-25',
  '2025-06-08', '2025-07-01',
  NULL,
  'https://tsedcet.org', 'https://tsedcet.org',
  ARRAY['#Degree','#BTech','#Teaching','#EDCET','#BEd','#Telangana','#TeacherTraining'],
  'teaching', 'Telangana',
  true, false, 'live'
),

-- ── 67. TSPSC Extension Officer 2025 (Expected) ──────────────────────────
(
  'tspsc-extension-officer-2025',
  'TSPSC Extension Officer Grade I 2025',
  'TSPSC ఎక్స్టెన్షన్ ఆఫీసర్ గ్రేడ్ I 2025',
  'TSPSC EO',
  'TSPSC',
  'Recruitment for Extension Officer Grade I in Panchayat Raj & Rural Development Department for implementing rural development schemes at mandal level. Past vacancy (2023): 1,050 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','btech'],
  150, 100, 75, 75,
  '2025-12-20', '2025-12-25', '2026-01-25',
  '2026-04-25', '2026-08-25',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#GovtJobs','#TSPSC','#ExtensionOfficer','#PanchayatRaj','#RuralDevelopment'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 68. ONGC Graduate Trainee 2025 (Expected) ────────────────────────────
(
  'ongc-gt-2025',
  'ONGC Graduate Trainee 2025',
  'ONGC గ్రాడ్యుయేట్ ట్రైనీ 2025',
  'ONGC GT',
  'Oil and Natural Gas Corporation',
  'Oil and Natural Gas Corporation Graduate Trainee recruitment through GATE score for Petroleum Engineering, Chemical, Mechanical, Electrical, Electronics, Geology and Geophysics disciplines. Past vacancy (2024): 910 posts.',
  18, 30,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['btech','mtech','degree'],
  0, 0, 0, 0,
  '2025-10-15', '2025-10-20', '2025-11-10',
  '2026-01-04', '2026-03-01',
  NULL,
  'https://ongcindia.com', NULL,
  ARRAY['#BTech','#MTech','#Engineering','#ONGC','#PSU','#GovtJobs','#GATE','#Petroleum'],
  'engineering', 'All India',
  true, true, 'expected'
),

-- ── 69. TSPSC Junior Typist 2025 (Expected) ──────────────────────────────
(
  'tspsc-junior-typist-2025',
  'TSPSC Junior Typist 2025',
  'TSPSC జూనియర్ టైపిస్ట్ 2025',
  'TSPSC Typist',
  'TSPSC',
  'Recruitment for Junior Typist posts in various Telangana government departments. Requires typing speed of 30 wpm in English and 20 wpm in Telugu. Past vacancy (2023): 638 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['inter','10th'],
  100, 70, 50, 50,
  '2026-01-01', '2026-01-05', '2026-02-05',
  '2026-05-01', '2026-09-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#10thPass','#Inter','#GovtJobs','#TSPSC','#Typist','#Clerical'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 70. Indian Navy Agniveer SSR & MR 2025 (Expected) ────────────────────
(
  'navy-agniveer-2025',
  'Indian Navy Agniveer SSR & MR 2025',
  'ఇండియన్ నేవీ అగ్నివీర్ 2025',
  'Navy Agniveer',
  'Indian Navy',
  'Indian Navy Agniveer Senior Secondary Recruit and Matric Recruit recruitment under Agnipath scheme. SSR requires 12th pass with Physics & Maths, MR requires 10th pass. Past vacancy (2024): 2,800 posts.',
  17, 21,
  '{}'::jsonb,
  ARRAY['10th','inter'],
  0, 0, 0, 0,
  '2025-08-01', '2025-08-05', '2025-08-25',
  '2025-11-01', '2026-01-01',
  NULL,
  'https://joinindiannavy.gov.in', 'https://joinindiannavy.gov.in',
  ARRAY['#10thPass','#Inter','#Defence','#Navy','#Agniveer','#Agnipath','#GovtJobs'],
  'defence', 'All India',
  true, true, 'expected'
);

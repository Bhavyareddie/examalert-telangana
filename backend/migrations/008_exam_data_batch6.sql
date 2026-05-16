-- ExamAlert Telangana — Migration 008
-- 10 more important 2025/2026 exams (batch 6)
-- Run in Supabase SQL Editor AFTER 007.
-- Vacancies NULL (TBA) unless officially confirmed.
-- Past vacancy shown in description for reference.
--
-- Sources:
--   TSPSC ANM          → tspsc.gov.in
--   DRDO CEPTAM        → drdo.gov.in
--   ECIL               → ecil.co.in
--   TSPSC Civil Asst Surgeon → tspsc.gov.in
--   RBI Grade B        → rbi.org.in
--   TSPSC Excise SI    → tspsc.gov.in
--   TS DEECET          → tsdeecet.cgg.gov.in
--   SEBI Grade A       → sebi.gov.in
--   TSPSC Welfare Officer → tspsc.gov.in
--   NHM Telangana      → nhmtelangana.gov.in

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

-- ── 51. TSPSC ANM 2025 (Expected) ────────────────────────────────────────
(
  'tspsc-anm-2025',
  'TSPSC ANM (Auxiliary Nurse Midwife) 2025',
  'TSPSC ANM 2025',
  'TSPSC ANM',
  'TSPSC',
  'Recruitment for Auxiliary Nurse Midwife posts in Primary Health Centres and Sub-Centres across Telangana under Health, Medical & Family Welfare Department. Past vacancy (2022): 2,364 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['inter','diploma'],
  100, 70, 50, 50,
  '2025-11-01', '2025-11-05', '2025-12-05',
  '2026-03-01', '2026-07-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Inter','#Diploma','#Medical','#TSPSC','#ANM','#Nurse','#GovtJobs','#PHC'],
  'medical', 'Telangana',
  true, false, 'expected'
),

-- ── 52. DRDO CEPTAM 10 2025 (Expected) ───────────────────────────────────
(
  'drdo-ceptam-10-2025',
  'DRDO CEPTAM 10 Technician A 2025',
  'DRDO CEPTAM 10 2025',
  'DRDO CEPTAM',
  'DRDO',
  'Defence Research and Development Organisation Centre for Personnel Talent Management recruitment for Technician A posts across DRDO labs including DLRL and DRDL in Hyderabad. Past vacancy (2023): 1,901 posts.',
  18, 28,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['10th','inter','diploma'],
  100, 100, 0, 100,
  '2025-08-01', '2025-08-05', '2025-09-05',
  '2025-12-07', '2026-03-01',
  NULL,
  'https://drdo.gov.in', NULL,
  ARRAY['#10thPass','#Diploma','#Defence','#DRDO','#GovtJobs','#Technician','#Hyderabad'],
  'defence', 'All India',
  true, true, 'expected'
),

-- ── 53. ECIL Graduate Engineer Trainee 2025 (Expected) ───────────────────
(
  'ecil-get-2025',
  'ECIL Graduate Engineer Trainee 2025',
  'ECIL గ్రాడ్యుయేట్ ఇంజనీర్ ట్రైనీ 2025',
  'ECIL GET',
  'Electronics Corporation of India Limited',
  'Electronics Corporation of India Limited (Hyderabad) Graduate Engineer Trainee recruitment for Electronics, Computer Science, Mechanical and Electrical engineering disciplines. Past vacancy (2024): 327 posts.',
  18, 25,
  '{"SC": 5, "ST": 5, "OBC": 3}'::jsonb,
  ARRAY['btech'],
  500, 500, 0, 500,
  '2025-07-01', '2025-07-05', '2025-07-25',
  '2025-09-07', '2025-11-01',
  NULL,
  'https://ecil.co.in', NULL,
  ARRAY['#BTech','#Engineering','#ECIL','#GovtJobs','#Hyderabad','#PSU','#GET'],
  'engineering', 'All India',
  true, true, 'expected'
),

-- ── 54. TSPSC Civil Assistant Surgeon 2025 (Expected) ────────────────────
(
  'tspsc-civil-asst-surgeon-2025',
  'TSPSC Civil Assistant Surgeon 2025',
  'TSPSC సివిల్ అసిస్టెంట్ సర్జన్ 2025',
  'TSPSC CAS',
  'TSPSC',
  'Recruitment for Civil Assistant Surgeons (Allopathy) in government hospitals and PHCs across Telangana under Health, Medical & Family Welfare Department. Requires MBBS degree. Past vacancy (2023): 1,423 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree'],
  200, 150, 100, 100,
  '2025-09-15', '2025-09-20', '2025-10-20',
  '2026-01-10', '2026-05-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#Medical','#TSPSC','#MBBS','#Doctor','#GovtJobs','#CivilSurgeon'],
  'medical', 'Telangana',
  true, true, 'expected'
),

-- ── 55. RBI Grade B 2025 (Expected) ──────────────────────────────────────
(
  'rbi-grade-b-2025',
  'RBI Grade B Officer 2025',
  'RBI గ్రేడ్ B ఆఫీసర్ 2025',
  'RBI Grade B',
  'Reserve Bank of India',
  'Reserve Bank of India Grade B Officer recruitment for General, DEPR (Economics) and DSIM (Statistics) streams. One of the most prestigious banking jobs in India. Past vacancy (2024): 94 posts.',
  21, 30,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['degree','btech','mba','mca'],
  850, 850, 100, 850,
  '2025-07-15', '2025-07-20', '2025-08-10',
  '2025-11-09', '2026-02-01',
  NULL,
  'https://rbi.org.in', NULL,
  ARRAY['#Degree','#BTech','#MBA','#Banking','#GovtJobs','#RBI','#GradeB'],
  'banking', 'All India',
  true, true, 'expected'
),

-- ── 56. TSPSC Excise Sub-Inspector 2025 (Expected) ───────────────────────
(
  'tspsc-excise-si-2025',
  'TSPSC Excise Sub-Inspector 2025',
  'TSPSC ఎక్సైజ్ సబ్-ఇన్స్పెక్టర్ 2025',
  'Excise SI',
  'TSPSC',
  'Recruitment for Sub-Inspector of Excise posts in Telangana Prohibition & Excise Department for enforcement of excise laws. Includes written exam and physical test. Past vacancy (2023): 217 posts.',
  18, 28,
  '{"SC": 5, "ST": 5, "BC": 5}'::jsonb,
  ARRAY['degree','btech'],
  150, 100, 75, 75,
  '2025-12-15', '2025-12-20', '2026-01-20',
  '2026-04-20', '2026-08-20',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#Police','#TSPSC','#Excise','#SI','#GovtJobs','#ExciseDept'],
  'police', 'Telangana',
  true, false, 'expected'
),

-- ── 57. TS DEECET 2025 (Live — D.Ed entrance) ────────────────────────────
(
  'ts-deecet-2025',
  'TS DEECET 2025',
  'తెలంగాణ DEECET 2025',
  'TS DEECET',
  'DIET Telangana / School Education Dept',
  'Telangana State Diploma in Elementary Education Common Entrance Test for admission to 2-year D.El.Ed course in government and private DIETs. Required for primary school teacher eligibility.',
  NULL, NULL,
  '{}'::jsonb,
  ARRAY['inter'],
  300, 300, 150, 300,
  '2025-03-15', '2025-03-20', '2025-04-20',
  '2025-06-01', '2025-07-01',
  NULL,
  'https://tsdeecet.cgg.gov.in', 'https://tsdeecet.cgg.gov.in',
  ARRAY['#Inter','#Teaching','#DEECET','#DEd','#Telangana','#TeacherTraining'],
  'teaching', 'Telangana',
  true, false, 'live'
),

-- ── 58. SEBI Grade A Officer 2025 (Expected) ─────────────────────────────
(
  'sebi-grade-a-2025',
  'SEBI Grade A Officer 2025',
  'SEBI గ్రేడ్ A ఆఫీసర్ 2025',
  'SEBI Grade A',
  'Securities and Exchange Board of India',
  'Securities and Exchange Board of India Officer Grade A recruitment for General, Legal, Information Technology, Research and Official Language streams. Past vacancy (2024): 97 posts.',
  21, 30,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['degree','btech','mba','mca'],
  1000, 1000, 100, 1000,
  '2025-09-01', '2025-09-05', '2025-09-25',
  '2025-11-16', '2026-02-15',
  NULL,
  'https://sebi.gov.in', NULL,
  ARRAY['#Degree','#BTech','#MBA','#Banking','#GovtJobs','#SEBI','#Finance'],
  'banking', 'All India',
  true, false, 'expected'
),

-- ── 59. TSPSC Welfare Officer 2025 (Expected) ────────────────────────────
(
  'tspsc-welfare-officer-2025',
  'TSPSC Welfare Officer 2025',
  'TSPSC వెల్ఫేర్ ఆఫీసర్ 2025',
  'TSPSC WO',
  'TSPSC',
  'Recruitment for Welfare Officers in Telangana Social Welfare, Tribal Welfare and BC Welfare departments for managing residential schools and welfare hostels. Past vacancy (2022): 347 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','btech'],
  150, 100, 75, 75,
  '2026-01-15', '2026-01-20', '2026-02-20',
  '2026-05-10', '2026-09-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#GovtJobs','#TSPSC','#Welfare','#SocialWelfare','#TribalWelfare'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 60. NHM Telangana Community Health Officer 2025 (Expected) ───────────
(
  'nhm-ts-cho-2025',
  'NHM Telangana Community Health Officer 2025',
  'NHM తెలంగాణ కమ్యూనిటీ హెల్త్ ఆఫీసర్ 2025',
  'NHM CHO',
  'National Health Mission Telangana',
  'National Health Mission Telangana recruitment for Community Health Officers to manage Health and Wellness Centres under Ayushman Bharat scheme. Requires B.Sc Nursing or BAMS. Past vacancy (2023): 1,225 posts.',
  21, 35,
  '{"SC": 5, "ST": 5, "BC": 5}'::jsonb,
  ARRAY['degree','diploma'],
  0, 0, 0, 0,
  '2025-10-01', '2025-10-05', '2025-11-05',
  '2025-12-15', '2026-02-01',
  NULL,
  'https://nhmtelangana.gov.in', NULL,
  ARRAY['#Degree','#Diploma','#Medical','#NHM','#GovtJobs','#CHO','#AyushmanBharat'],
  'medical', 'Telangana',
  true, false, 'expected'
);

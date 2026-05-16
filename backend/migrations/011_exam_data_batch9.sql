-- ExamAlert Telangana — Migration 011
-- 10 more important 2025/2026 exams (batch 9)
-- Run in Supabase SQL Editor AFTER 010.
-- Vacancies NULL (TBA) unless officially confirmed.
-- Past vacancy shown in description for reference.
--
-- Sources:
--   TSPSC Labour Officer    → tspsc.gov.in
--   Indian Army TES         → joinindianarmy.nic.in
--   NIACL AO                → newindia.co.in
--   TSPSC Sericulture Officer → tspsc.gov.in
--   RRB Senior Section Engineer → rrbapply.gov.in
--   TS PECET                → tspecet.nic.in
--   TSPSC Mandal Planning Officer → tspsc.gov.in
--   UIIC Assistant          → uiic.co.in
--   TSPSC Horticulture Extension Officer → tspsc.gov.in
--   IOCL Engineer           → iocl.com

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

-- ── 81. TSPSC Labour Officer 2025 (Expected) ─────────────────────────────
(
  'tspsc-labour-officer-2025',
  'TSPSC Labour Officer 2025',
  'TSPSC లేబర్ ఆఫీసర్ 2025',
  'TSPSC Labour Officer',
  'TSPSC',
  'Recruitment for Labour Officers in Telangana Labour Department for enforcement of labour laws and welfare of workers across industries. Past vacancy (2022): 76 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','btech','mba'],
  150, 100, 75, 75,
  '2026-02-20', '2026-02-25', '2026-03-25',
  '2026-06-20', '2026-10-20',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#MBA','#GovtJobs','#TSPSC','#Labour','#LabourDept','#WorkerWelfare'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 82. Indian Army TES 2025 (Expected — Technical Entry Scheme) ──────────
(
  'army-tes-2025',
  'Indian Army TES 53 2025',
  'ఇండియన్ ఆర్మీ TES 53 2025',
  'Army TES',
  'Indian Army',
  'Indian Army Technical Entry Scheme 53 for 10+2 pass candidates with Physics, Chemistry and Mathematics for commissioning as Short Service Commission Officers after 4-year B.Tech at CME/MCTE/MCEME. Past vacancy (2024): 90 posts.',
  16, 19,
  '{}'::jsonb,
  ARRAY['inter'],
  0, 0, 0, 0,
  '2025-07-01', '2025-07-01', '2025-07-30',
  '2025-11-01', '2026-01-15',
  90,
  'https://joinindianarmy.nic.in', 'https://joinindianarmy.nic.in',
  ARRAY['#Inter','#Defence','#Army','#TES','#Officer','#GovtJobs','#ShortServiceCommission'],
  'defence', 'All India',
  true, false, 'expected'
),

-- ── 83. NIACL Assistant 2025 (Expected) ──────────────────────────────────
(
  'niacl-assistant-2025',
  'NIACL Assistant 2025',
  'NIACL అసిస్టెంట్ 2025',
  'NIACL Assistant',
  'New India Assurance Company Limited',
  'New India Assurance Company Limited Assistant recruitment for clerical cadre posts across all regional offices including Hyderabad. Past vacancy (2023): 300 posts.',
  18, 30,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['degree','btech'],
  600, 600, 0, 600,
  '2025-09-10', '2025-09-15', '2025-10-05',
  '2025-11-23', '2026-02-01',
  NULL,
  'https://newindia.co.in', NULL,
  ARRAY['#Degree','#BTech','#Insurance','#GovtJobs','#NIACL','#Assistant','#Banking'],
  'banking', 'All India',
  true, false, 'expected'
),

-- ── 84. TSPSC Sericulture Extension Officer 2025 (Expected) ──────────────
(
  'tspsc-sericulture-officer-2025',
  'TSPSC Sericulture Extension Officer 2025',
  'TSPSC సెరికల్చర్ ఎక్స్టెన్షన్ ఆఫీసర్ 2025',
  'TSPSC SEO',
  'TSPSC',
  'Recruitment for Sericulture Extension Officers in Telangana Sericulture Department for promotion of silk farming and mulberry cultivation among farmers. Past vacancy (2022): 98 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','btech'],
  150, 100, 75, 75,
  '2026-03-15', '2026-03-20', '2026-04-20',
  '2026-07-15', '2026-11-15',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#BTech','#Agriculture','#TSPSC','#Sericulture','#GovtJobs'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 85. RRB Senior Section Engineer 2025 (Expected) ──────────────────────
(
  'rrb-sse-2025',
  'RRB Senior Section Engineer 2025',
  'RRB సీనియర్ సెక్షన్ ఇంజనీర్ 2025',
  'RRB SSE',
  'Railway Recruitment Board',
  'Senior Section Engineer recruitment for Civil, Mechanical, Electrical, Signal & Telecommunication and other engineering departments across Indian Railways zones. Past vacancy (2024): 2,399 posts.',
  18, 33,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['btech','diploma'],
  500, 500, 250, 250,
  '2025-09-01', '2025-09-05', '2025-10-05',
  '2026-01-11', NULL,
  NULL,
  'https://indianrailways.gov.in', 'https://rrbapply.gov.in',
  ARRAY['#BTech','#Diploma','#Railways','#GovtJobs','#SSE','#SeniorEngineer'],
  'railways', 'All India',
  true, false, 'expected'
),

-- ── 86. TS PECET 2025 (Live — Physical Education entrance) ───────────────
(
  'ts-pecet-2025',
  'TS PECET 2025',
  'తెలంగాణ PECET 2025',
  'TS PECET',
  'Osmania University / TSCHE',
  'Telangana State Physical Education Common Entrance Test for admission to B.P.Ed and D.P.Ed courses in Telangana universities and colleges. Required for Physical Education teacher posts.',
  NULL, NULL,
  '{}'::jsonb,
  ARRAY['inter','degree'],
  500, 500, 250, 500,
  '2025-04-01', '2025-04-05', '2025-05-05',
  '2025-06-15', '2025-07-10',
  NULL,
  'https://tspecet.nic.in', 'https://tspecet.nic.in',
  ARRAY['#Inter','#Degree','#Teaching','#PECET','#PhysicalEducation','#BPEd','#Telangana'],
  'teaching', 'Telangana',
  true, false, 'live'
),

-- ── 87. TSPSC Mandal Planning Officer 2025 (Expected) ────────────────────
(
  'tspsc-mandal-planning-officer-2025',
  'TSPSC Mandal Planning Officer 2025',
  'TSPSC మండల్ ప్లానింగ్ ఆఫీసర్ 2025',
  'TSPSC MPO',
  'TSPSC',
  'Recruitment for Mandal Planning Officers in Telangana Planning Department for preparation of mandal-level development plans and monitoring of government schemes. Past vacancy (2022): 464 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','btech','mba'],
  150, 100, 75, 75,
  '2026-04-01', '2026-04-05', '2026-05-05',
  '2026-08-01', '2026-12-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#MBA','#GovtJobs','#TSPSC','#Planning','#MandaLevel','#Development'],
  'psc', 'Telangana',
  true, false, 'expected'
),

-- ── 88. UIIC Assistant 2025 (Expected) ───────────────────────────────────
(
  'uiic-assistant-2025',
  'UIIC Assistant 2025',
  'UIIC అసిస్టెంట్ 2025',
  'UIIC Assistant',
  'United India Insurance Company',
  'United India Insurance Company Limited Assistant recruitment for clerical cadre posts across all divisional offices including Hyderabad. Past vacancy (2022): 500 posts.',
  18, 30,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['degree','btech'],
  600, 600, 0, 600,
  '2025-10-10', '2025-10-15', '2025-11-05',
  '2025-12-21', '2026-03-01',
  NULL,
  'https://uiic.co.in', NULL,
  ARRAY['#Degree','#BTech','#Insurance','#GovtJobs','#UIIC','#Assistant','#Banking'],
  'banking', 'All India',
  true, false, 'expected'
),

-- ── 89. TSPSC Horticulture Extension Officer 2025 (Expected) ─────────────
(
  'tspsc-horticulture-ext-officer-2025',
  'TSPSC Horticulture Extension Officer 2025',
  'TSPSC హార్టికల్చర్ ఎక్స్టెన్షన్ ఆఫీసర్ 2025',
  'TSPSC HEO',
  'TSPSC',
  'Recruitment for Horticulture Extension Officers in Telangana Horticulture Department for providing technical guidance to farmers on fruit, vegetable and flower cultivation. Past vacancy (2022): 312 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','btech'],
  150, 100, 75, 75,
  '2026-04-10', '2026-04-15', '2026-05-15',
  '2026-08-10', '2026-12-10',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#BTech','#Agriculture','#TSPSC','#Horticulture','#GovtJobs','#Extension'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 90. IOCL Engineer & Officer 2025 (Expected) ───────────────────────────
(
  'iocl-engineer-2025',
  'IOCL Engineer & Officer 2025',
  'IOCL ఇంజనీర్ & ఆఫీసర్ 2025',
  'IOCL Engineer',
  'Indian Oil Corporation Limited',
  'Indian Oil Corporation Limited Engineer and Officer recruitment through GATE score for Chemical, Mechanical, Electrical, Civil, Instrumentation, Computer Science and other disciplines. Past vacancy (2024): 480 posts.',
  18, 26,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['btech','mtech'],
  0, 0, 0, 0,
  '2025-11-10', '2025-11-15', '2025-12-05',
  '2026-02-01', '2026-04-01',
  NULL,
  'https://iocl.com', NULL,
  ARRAY['#BTech','#MTech','#Engineering','#IOCL','#PSU','#GovtJobs','#GATE','#Oil'],
  'engineering', 'All India',
  true, true, 'expected'
);

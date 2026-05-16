-- ExamAlert Telangana — Migration 013
-- 10 more important 2025/2026/2027 exams (batch 11)
-- Run in Supabase SQL Editor AFTER 012.
-- Vacancies NULL (TBA) unless officially confirmed.
-- Past vacancy shown in description for reference.
--
-- Sources:
--   TSPSC Asst Director Industries → tspsc.gov.in
--   Indian Army JAG Entry          → joinindianarmy.nic.in
--   NICL AO                        → nationalinsurance.nic.co.in
--   TSPSC Asst Registrar Co-op     → tspsc.gov.in
--   RRB Ministerial & Isolated     → rrbapply.gov.in
--   TS LPCET                       → tslpcet.nic.in
--   TSPSC Asst Engineer Irrigation → tspsc.gov.in
--   PGCIL ET                       → powergridindia.com
--   TSPSC Asst Director Agriculture → tspsc.gov.in
--   CONCOR MT                      → concorindia.com

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

-- ── 101. TSPSC Assistant Director of Industries 2026 (Expected) ──────────
(
  'tspsc-asst-director-industries-2026',
  'TSPSC Assistant Director of Industries 2026',
  'TSPSC అసిస్టెంట్ డైరెక్టర్ ఆఫ్ ఇండస్ట్రీస్ 2026',
  'TSPSC ADI',
  'TSPSC',
  'Recruitment for Assistant Directors of Industries in Telangana Industries & Commerce Department for promotion of industrial development and implementation of industrial policies. Past vacancy (2022): 34 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['btech','mba','degree'],
  150, 100, 75, 75,
  '2026-06-10', '2026-06-15', '2026-07-15',
  '2026-10-10', '2027-02-10',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#BTech','#MBA','#Degree','#GovtJobs','#TSPSC','#Industries','#Commerce'],
  'psc', 'Telangana',
  true, false, 'expected'
),

-- ── 102. Indian Army JAG Entry 2025 (Expected — Judge Advocate General) ──
(
  'army-jag-entry-2025',
  'Indian Army JAG Entry 34 2025',
  'ఇండియన్ ఆర్మీ JAG ఎంట్రీ 2025',
  'Army JAG',
  'Indian Army',
  'Indian Army Judge Advocate General Branch Short Service Commission Officer entry for Law graduates. Requires LLB degree with minimum 55% marks. Past vacancy (2024): 10 posts.',
  21, 27,
  '{}'::jsonb,
  ARRAY['degree'],
  0, 0, 0, 0,
  '2025-08-25', '2025-08-25', '2025-09-24',
  '2025-12-01', '2026-02-01',
  10,
  'https://joinindianarmy.nic.in', 'https://joinindianarmy.nic.in',
  ARRAY['#Degree','#Law','#LLB','#Defence','#Army','#JAG','#Officer','#GovtJobs'],
  'defence', 'All India',
  true, false, 'expected'
),

-- ── 103. NICL Assistant 2025 (Expected) ──────────────────────────────────
(
  'nicl-assistant-2025',
  'NICL Assistant 2025',
  'NICL అసిస్టెంట్ 2025',
  'NICL Assistant',
  'National Insurance Company Limited',
  'National Insurance Company Limited Assistant recruitment for clerical cadre posts across all divisional offices including Hyderabad and Secunderabad. Past vacancy (2023): 250 posts.',
  18, 30,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['degree','btech'],
  600, 600, 0, 600,
  '2025-11-05', '2025-11-10', '2025-11-30',
  '2026-01-11', '2026-03-15',
  NULL,
  'https://nationalinsurance.nic.co.in', NULL,
  ARRAY['#Degree','#BTech','#Insurance','#GovtJobs','#NICL','#Assistant','#Banking'],
  'banking', 'All India',
  true, false, 'expected'
),

-- ── 104. TSPSC Assistant Registrar Co-operative Societies 2026 (Expected) ─
(
  'tspsc-asst-registrar-coop-2026',
  'TSPSC Assistant Registrar Co-operative Societies 2026',
  'TSPSC అసిస్టెంట్ రిజిస్ట్రార్ కో-ఆపరేటివ్ 2026',
  'TSPSC ARCS',
  'TSPSC',
  'Recruitment for Assistant Registrars of Co-operative Societies in Telangana Co-operative Department for registration and supervision of co-operative societies. Past vacancy (2022): 28 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','mba'],
  150, 100, 75, 75,
  '2026-06-20', '2026-06-25', '2026-07-25',
  '2026-10-20', '2027-02-20',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#MBA','#GovtJobs','#TSPSC','#Cooperative','#Registrar'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 105. RRB Ministerial & Isolated Categories 2025 (Expected) ───────────
(
  'rrb-ministerial-2025',
  'RRB Ministerial & Isolated Categories 2025',
  'RRB మినిస్టీరియల్ & ఐసోలేటెడ్ కేటగిరీస్ 2025',
  'RRB Ministerial',
  'Railway Recruitment Board',
  'Recruitment for Junior Translator, Staff & Welfare Inspector, Teacher, Librarian, Law Assistant and other ministerial and isolated category posts in Indian Railways. Past vacancy (2024): 1,036 posts.',
  18, 33,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['degree','btech','inter'],
  500, 500, 250, 250,
  '2025-10-15', '2025-10-20', '2025-11-20',
  '2026-02-08', NULL,
  NULL,
  'https://indianrailways.gov.in', 'https://rrbapply.gov.in',
  ARRAY['#Degree','#Inter','#Railways','#GovtJobs','#Ministerial','#Translator','#Teacher'],
  'railways', 'All India',
  true, false, 'expected'
),

-- ── 106. TS LPCET 2025 (Live — Language Pandit entrance) ─────────────────
(
  'ts-lpcet-2025',
  'TS LPCET 2025',
  'తెలంగాణ LPCET 2025',
  'TS LPCET',
  'TSCHE / Osmania University',
  'Telangana State Language Pandit Common Entrance Test for admission to 1-year Language Pandit Training course for Telugu, Hindi, Urdu and Sanskrit. Required for Language Pandit teacher posts in schools.',
  NULL, NULL,
  '{}'::jsonb,
  ARRAY['degree','inter'],
  300, 300, 150, 300,
  '2025-04-15', '2025-04-20', '2025-05-20',
  '2025-06-29', '2025-07-20',
  NULL,
  'https://tslpcet.nic.in', 'https://tslpcet.nic.in',
  ARRAY['#Degree','#Inter','#Teaching','#LPCET','#Telugu','#Hindi','#Urdu','#Telangana'],
  'teaching', 'Telangana',
  true, false, 'live'
),

-- ── 107. TSPSC Assistant Engineer Irrigation 2026 (Expected) ─────────────
(
  'tspsc-ae-irrigation-2026',
  'TSPSC Assistant Engineer Irrigation 2026',
  'TSPSC అసిస్టెంట్ ఇంజనీర్ ఇరిగేషన్ 2026',
  'TSPSC AE Irrigation',
  'TSPSC',
  'Recruitment for Assistant Engineers in Telangana Irrigation & CAD Department for planning and execution of irrigation projects including Kaleshwaram and other major projects. Past vacancy (2022): 1,392 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['btech','mtech'],
  200, 150, 100, 100,
  '2026-07-01', '2026-07-05', '2026-08-05',
  '2026-11-01', '2027-03-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#BTech','#MTech','#Engineering','#TSPSC','#Irrigation','#GovtJobs','#Civil','#AE'],
  'engineering', 'Telangana',
  true, true, 'expected'
),

-- ── 108. PGCIL Executive Trainee 2025 (Expected) ─────────────────────────
(
  'pgcil-et-2025',
  'Power Grid Executive Trainee 2025',
  'పవర్ గ్రిడ్ ఎగ్జిక్యూటివ్ ట్రైనీ 2025',
  'PGCIL ET',
  'Power Grid Corporation of India Limited',
  'Power Grid Corporation of India Limited Executive Trainee recruitment through GATE score for Electrical, Electronics, Civil and Computer Science engineering disciplines. Past vacancy (2024): 103 posts.',
  18, 28,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['btech','mtech'],
  0, 0, 0, 0,
  '2025-12-01', '2025-12-05', '2025-12-25',
  '2026-02-22', '2026-04-15',
  NULL,
  'https://powergridindia.com', NULL,
  ARRAY['#BTech','#MTech','#Engineering','#PowerGrid','#PSU','#GovtJobs','#GATE','#Electrical'],
  'engineering', 'All India',
  true, false, 'expected'
),

-- ── 109. TSPSC Assistant Director Agriculture 2026 (Expected) ────────────
(
  'tspsc-asst-director-agriculture-2026',
  'TSPSC Assistant Director of Agriculture 2026',
  'TSPSC అసిస్టెంట్ డైరెక్టర్ ఆఫ్ అగ్రికల్చర్ 2026',
  'TSPSC ADA',
  'TSPSC',
  'Recruitment for Assistant Directors of Agriculture in Telangana Agriculture Department for planning and implementation of agriculture development programmes at district level. Past vacancy (2022): 87 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['btech','degree'],
  150, 100, 75, 75,
  '2026-07-10', '2026-07-15', '2026-08-15',
  '2026-11-10', '2027-03-10',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#BTech','#Degree','#Agriculture','#TSPSC','#GovtJobs','#ADA','#AgricultureDept'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 110. CONCOR Management Trainee 2025 (Expected) ───────────────────────
(
  'concor-mt-2025',
  'CONCOR Management Trainee 2025',
  'CONCOR మేనేజ్మెంట్ ట్రైనీ 2025',
  'CONCOR MT',
  'Container Corporation of India Limited',
  'Container Corporation of India Limited Management Trainee recruitment for Operations, Traffic, Finance, IT and HR streams. CONCOR operates major inland container depots in Hyderabad. Past vacancy (2024): 57 posts.',
  18, 28,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['btech','mba','degree'],
  0, 0, 0, 0,
  '2025-12-10', '2025-12-15', '2026-01-05',
  '2026-02-15', '2026-04-01',
  NULL,
  'https://concorindia.com', NULL,
  ARRAY['#BTech','#MBA','#Degree','#Engineering','#CONCOR','#PSU','#GovtJobs','#Logistics'],
  'engineering', 'All India',
  true, false, 'expected'
);

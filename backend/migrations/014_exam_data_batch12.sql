-- ExamAlert Telangana — Migration 014
-- 20 more important 2025/2026/2027 exams (batch 12)
-- Run in Supabase SQL Editor AFTER 013.
-- Vacancies NULL (TBA) unless officially confirmed.
-- Past vacancy shown in description for reference.
--
-- Sources:
--   TSPSC Medical Officer Ayurveda → tspsc.gov.in
--   Indian Navy MR                 → joinindiannavy.gov.in
--   TSPSC Asst Statistical Officer → tspsc.gov.in
--   APGENCO / TSGENCO AE           → tsgenco.telangana.gov.in
--   SSC JE                         → ssc.gov.in
--   TS PGLCET                      → tspglcet.nic.in
--   TSPSC Asst Public Prosecutor   → tspsc.gov.in
--   GAIL ET                        → gailonline.com
--   TSPSC Zilla Sainik Welfare     → tspsc.gov.in
--   BSNL JTO                       → bsnl.co.in
--   TSPSC Asst Director Handlooms  → tspsc.gov.in
--   MECL Geologist                 → mecl.co.in
--   TSPSC Asst Engineer HMWSSB     → tspsc.gov.in
--   LIC HFL Assistant Manager      → lichousing.com
--   TSPSC Asst Director Printing   → tspsc.gov.in
--   NMDC MT                        → nmdc.co.in
--   TSPSC Asst Director Weights    → tspsc.gov.in
--   IRCON ET                       → ircon.org
--   TSPSC Asst Director Stationery → tspsc.gov.in
--   WAPCOS Engineer                → wapcos.gov.in

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

-- ── 111. TSPSC Medical Officer Ayurveda 2026 (Expected) ──────────────────
(
  'tspsc-medical-officer-ayurveda-2026',
  'TSPSC Medical Officer Ayurveda 2026',
  'TSPSC మెడికల్ ఆఫీసర్ ఆయుర్వేద 2026',
  'TSPSC MO Ayurveda',
  'TSPSC',
  'Recruitment for Medical Officers (Ayurveda) in Telangana AYUSH Department for providing Ayurvedic treatment in government hospitals and dispensaries. Past vacancy (2022): 312 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree'],
  200, 150, 100, 100,
  '2026-07-20', '2026-07-25', '2026-08-25',
  '2026-11-20', '2027-03-20',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#Medical','#TSPSC','#Ayurveda','#AYUSH','#GovtJobs','#Doctor'],
  'medical', 'Telangana',
  true, false, 'expected'
),

-- ── 112. Indian Navy Matric Recruit 2025 (Expected) ──────────────────────
(
  'navy-mr-2025',
  'Indian Navy Matric Recruit 2025',
  'ఇండియన్ నేవీ మెట్రిక్ రిక్రూట్ 2025',
  'Navy MR',
  'Indian Navy',
  'Indian Navy Matric Recruit recruitment for Chef, Steward and Hygienist posts. Requires 10th pass. Separate from Agniveer scheme. Past vacancy (2024): 400 posts.',
  17, 21,
  '{}'::jsonb,
  ARRAY['10th'],
  0, 0, 0, 0,
  '2025-09-01', '2025-09-05', '2025-09-25',
  '2025-12-21', '2026-02-15',
  NULL,
  'https://joinindiannavy.gov.in', 'https://joinindiannavy.gov.in',
  ARRAY['#10thPass','#Defence','#Navy','#MR','#GovtJobs','#Chef','#Steward'],
  'defence', 'All India',
  true, false, 'expected'
),

-- ── 113. TSPSC Assistant Statistical Officer 2026 (Expected) ─────────────
(
  'tspsc-asst-statistical-officer-2026',
  'TSPSC Assistant Statistical Officer 2026',
  'TSPSC అసిస్టెంట్ స్టాటిస్టికల్ ఆఫీసర్ 2026',
  'TSPSC ASO',
  'TSPSC',
  'Recruitment for Assistant Statistical Officers in Telangana Economics & Statistics Department for data collection and statistical analysis at district level. Past vacancy (2022): 147 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree'],
  120, 80, 60, 60,
  '2026-08-01', '2026-08-05', '2026-09-05',
  '2026-12-01', '2027-04-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#GovtJobs','#TSPSC','#Statistics','#ASO','#Economics'],
  'psc', 'Telangana',
  true, false, 'expected'
),

-- ── 114. TSGENCO Assistant Engineer 2025 (Expected) ──────────────────────
(
  'tsgenco-ae-2025',
  'TSGENCO Assistant Engineer 2025',
  'TSGENCO అసిస్టెంట్ ఇంజనీర్ 2025',
  'TSGENCO AE',
  'Telangana State Power Generation Corporation',
  'Telangana State Power Generation Corporation Assistant Engineer recruitment for Electrical, Mechanical and Civil engineering disciplines for power generation plants across Telangana. Past vacancy (2022): 1,200 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['btech','mtech'],
  200, 150, 100, 100,
  '2025-10-20', '2025-10-25', '2025-11-25',
  '2026-02-20', '2026-06-20',
  NULL,
  'https://tsgenco.telangana.gov.in', NULL,
  ARRAY['#BTech','#MTech','#Engineering','#TSGENCO','#GovtJobs','#Power','#Electrical'],
  'engineering', 'Telangana',
  true, true, 'expected'
),

-- ── 115. SSC JE 2025 (Expected) ───────────────────────────────────────────
(
  'ssc-je-2025',
  'SSC Junior Engineer 2025',
  'SSC జూనియర్ ఇంజనీర్ 2025',
  'SSC JE',
  'Staff Selection Commission',
  'Junior Engineer (Civil, Mechanical, Electrical and Quantity Surveying & Contract) recruitment for Central Government departments including CPWD, MES, CWC and FARAKKA. Past vacancy (2024): 1,765 posts.',
  18, 32,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 3}'::jsonb,
  ARRAY['diploma','btech'],
  100, 100, 0, 100,
  '2025-09-20', '2025-09-25', '2025-10-25',
  '2026-01-18', '2026-05-01',
  NULL,
  'https://ssc.gov.in', 'https://ssc.gov.in',
  ARRAY['#Diploma','#BTech','#Engineering','#SSC','#JE','#GovtJobs','#CPWD','#CentralGovt'],
  'engineering', 'All India',
  true, true, 'expected'
),

-- ── 116. TS PGLCET 2025 (Live — LLM entrance) ────────────────────────────
(
  'ts-pglcet-2025',
  'TS PGLCET 2025',
  'తెలంగాణ PGLCET 2025',
  'TS PGLCET',
  'Osmania University / TSCHE',
  'Telangana State Post Graduate Law Common Entrance Test for admission to 2-year LLM course in Telangana universities and law colleges. Seats vary by college.',
  NULL, NULL,
  '{}'::jsonb,
  ARRAY['degree'],
  800, 800, 400, 800,
  '2025-04-20', '2025-04-25', '2025-05-25',
  '2025-07-06', '2025-08-01',
  NULL,
  'https://tspglcet.nic.in', 'https://tspglcet.nic.in',
  ARRAY['#Degree','#Law','#LLM','#PGLCET','#Telangana','#PGEntrance','#LawEntrance'],
  'other', 'Telangana',
  true, false, 'live'
),

-- ── 117. TSPSC Assistant Public Prosecutor 2026 (Expected) ───────────────
(
  'tspsc-asst-public-prosecutor-2026',
  'TSPSC Assistant Public Prosecutor 2026',
  'TSPSC అసిస్టెంట్ పబ్లిక్ ప్రాసిక్యూటర్ 2026',
  'TSPSC APP',
  'TSPSC',
  'Recruitment for Assistant Public Prosecutors in Telangana Home Department for conducting criminal prosecutions in courts across all districts. Requires LLB degree. Past vacancy (2022): 217 posts.',
  21, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree'],
  200, 150, 100, 100,
  '2026-08-10', '2026-08-15', '2026-09-15',
  '2026-12-10', '2027-04-10',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#Law','#LLB','#TSPSC','#GovtJobs','#Prosecutor','#Legal'],
  'psc', 'Telangana',
  true, false, 'expected'
),

-- ── 118. GAIL Executive Trainee 2025 (Expected) ───────────────────────────
(
  'gail-et-2025',
  'GAIL Executive Trainee 2025',
  'GAIL ఎగ్జిక్యూటివ్ ట్రైనీ 2025',
  'GAIL ET',
  'GAIL (India) Limited',
  'GAIL India Limited Executive Trainee recruitment through GATE score for Chemical, Mechanical, Electrical, Instrumentation, Civil, Computer Science and Telecommunication engineering disciplines. Past vacancy (2024): 282 posts.',
  18, 28,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['btech','mtech'],
  0, 0, 0, 0,
  '2025-12-15', '2025-12-20', '2026-01-10',
  '2026-03-01', '2026-05-01',
  NULL,
  'https://gailonline.com', NULL,
  ARRAY['#BTech','#MTech','#Engineering','#GAIL','#PSU','#GovtJobs','#GATE','#Gas'],
  'engineering', 'All India',
  true, false, 'expected'
),

-- ── 119. TSPSC Zilla Sainik Welfare Officer 2026 (Expected) ──────────────
(
  'tspsc-sainik-welfare-officer-2026',
  'TSPSC Zilla Sainik Welfare Officer 2026',
  'TSPSC జిల్లా సైనిక్ వెల్ఫేర్ ఆఫీసర్ 2026',
  'TSPSC ZSWO',
  'TSPSC',
  'Recruitment for Zilla Sainik Welfare Officers in Telangana Sainik Welfare Department for welfare of ex-servicemen and their dependents at district level. Past vacancy (2022): 33 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','btech'],
  150, 100, 75, 75,
  '2026-08-20', '2026-08-25', '2026-09-25',
  '2026-12-20', '2027-04-20',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#GovtJobs','#TSPSC','#SainikWelfare','#ExServicemen','#Defence'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 120. BSNL Junior Telecom Officer 2025 (Expected) ─────────────────────
(
  'bsnl-jto-2025',
  'BSNL Junior Telecom Officer 2025',
  'BSNL జూనియర్ టెలికామ్ ఆఫీసర్ 2025',
  'BSNL JTO',
  'Bharat Sanchar Nigam Limited',
  'Bharat Sanchar Nigam Limited Junior Telecom Officer recruitment for Telecom, Electronics and Electrical engineering disciplines through GATE score. Past vacancy (2024): 2,000 posts.',
  18, 30,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['btech','mtech'],
  500, 500, 0, 500,
  '2025-11-25', '2025-11-30', '2025-12-20',
  '2026-02-28', '2026-05-15',
  NULL,
  'https://bsnl.co.in', NULL,
  ARRAY['#BTech','#MTech','#Engineering','#BSNL','#GovtJobs','#Telecom','#JTO','#GATE'],
  'engineering', 'All India',
  true, true, 'expected'
),

-- ── 121. TSPSC Assistant Director Handlooms 2026 (Expected) ──────────────
(
  'tspsc-asst-director-handlooms-2026',
  'TSPSC Assistant Director Handlooms & Textiles 2026',
  'TSPSC అసిస్టెంట్ డైరెక్టర్ హ్యాండ్లూమ్స్ 2026',
  'TSPSC ADH',
  'TSPSC',
  'Recruitment for Assistant Directors in Telangana Handlooms & Textiles Department for promotion of handloom weaving and welfare of weavers across the state. Past vacancy (2022): 19 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','btech'],
  150, 100, 75, 75,
  '2026-09-01', '2026-09-05', '2026-10-05',
  '2027-01-01', '2027-05-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#BTech','#GovtJobs','#TSPSC','#Handlooms','#Textiles','#Weavers'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 122. MECL Geologist & Geophysicist 2025 (Expected) ───────────────────
(
  'mecl-geologist-2025',
  'MECL Geologist & Geophysicist 2025',
  'MECL జియాలజిస్ట్ & జియోఫిజిసిస్ట్ 2025',
  'MECL Geologist',
  'Mineral Exploration Corporation Limited',
  'Mineral Exploration Corporation Limited Geologist and Geophysicist recruitment for mineral exploration projects across India. MECL has major operations in Telangana for coal and mineral surveys. Past vacancy (2024): 89 posts.',
  18, 30,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['degree','mtech'],
  500, 500, 0, 500,
  '2025-10-25', '2025-10-30', '2025-11-20',
  '2026-01-11', '2026-03-15',
  NULL,
  'https://mecl.co.in', NULL,
  ARRAY['#Degree','#MTech','#Engineering','#MECL','#PSU','#GovtJobs','#Geology','#Mining'],
  'engineering', 'All India',
  true, false, 'expected'
),

-- ── 123. TSPSC Assistant Engineer HMWSSB 2026 (Expected) ─────────────────
(
  'tspsc-ae-hmwssb-2026',
  'TSPSC Assistant Engineer HMWSSB 2026',
  'TSPSC అసిస్టెంట్ ఇంజనీర్ HMWSSB 2026',
  'HMWSSB AE',
  'TSPSC / HMWSSB',
  'Hyderabad Metropolitan Water Supply & Sewerage Board Assistant Engineer recruitment for Civil, Mechanical and Electrical disciplines for water supply and sewerage projects in Hyderabad. Past vacancy (2022): 392 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['btech','mtech'],
  200, 150, 100, 100,
  '2026-09-10', '2026-09-15', '2026-10-15',
  '2027-01-10', '2027-05-10',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#BTech','#MTech','#Engineering','#HMWSSB','#TSPSC','#GovtJobs','#Water','#Hyderabad'],
  'engineering', 'Telangana',
  true, false, 'expected'
),

-- ── 124. LIC Housing Finance Assistant Manager 2025 (Expected) ───────────
(
  'lic-hfl-am-2025',
  'LIC Housing Finance Assistant Manager 2025',
  'LIC హౌసింగ్ ఫైనాన్స్ అసిస్టెంట్ మేనేజర్ 2025',
  'LIC HFL AM',
  'LIC Housing Finance Limited',
  'LIC Housing Finance Limited Assistant Manager recruitment for Finance, Legal, Technical and IT streams across all regional offices including Hyderabad. Past vacancy (2023): 150 posts.',
  21, 28,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['degree','btech','mba'],
  600, 600, 100, 600,
  '2025-11-30', '2025-12-05', '2025-12-25',
  '2026-02-01', '2026-04-01',
  NULL,
  'https://lichousing.com', NULL,
  ARRAY['#Degree','#BTech','#MBA','#Banking','#GovtJobs','#LIC','#Housing','#Finance'],
  'banking', 'All India',
  true, false, 'expected'
),

-- ── 125. TSPSC Assistant Director Printing 2026 (Expected) ───────────────
(
  'tspsc-asst-director-printing-2026',
  'TSPSC Assistant Director of Printing 2026',
  'TSPSC అసిస్టెంట్ డైరెక్టర్ ఆఫ్ ప్రింటింగ్ 2026',
  'TSPSC ADP',
  'TSPSC',
  'Recruitment for Assistant Directors in Telangana Printing Department for managing government printing presses and publication of official documents and gazettes. Past vacancy (2022): 12 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['btech','degree'],
  150, 100, 75, 75,
  '2026-09-20', '2026-09-25', '2026-10-25',
  '2027-01-20', '2027-05-20',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#BTech','#Degree','#GovtJobs','#TSPSC','#Printing','#Publication'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 126. NMDC Management Trainee 2025 (Expected) ─────────────────────────
(
  'nmdc-mt-2025',
  'NMDC Management Trainee 2025',
  'NMDC మేనేజ్మెంట్ ట్రైనీ 2025',
  'NMDC MT',
  'National Mineral Development Corporation',
  'National Mineral Development Corporation Management Trainee recruitment for Mining, Mechanical, Electrical, Civil, Electronics, Computer Science and Finance disciplines. NMDC HQ is in Hyderabad. Past vacancy (2024): 110 posts.',
  18, 30,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['btech','mtech','mba'],
  0, 0, 0, 0,
  '2025-12-20', '2025-12-25', '2026-01-15',
  '2026-03-08', '2026-05-01',
  NULL,
  'https://nmdc.co.in', NULL,
  ARRAY['#BTech','#MTech','#MBA','#Engineering','#NMDC','#PSU','#GovtJobs','#Mining','#Hyderabad'],
  'engineering', 'All India',
  true, false, 'expected'
),

-- ── 127. TSPSC Assistant Director Weights & Measures 2026 (Expected) ──────
(
  'tspsc-asst-director-weights-2026',
  'TSPSC Assistant Director Weights & Measures 2026',
  'TSPSC అసిస్టెంట్ డైరెక్టర్ వెయిట్స్ & మెజర్స్ 2026',
  'TSPSC ADWM',
  'TSPSC',
  'Recruitment for Assistant Directors in Telangana Weights & Measures Department for enforcement of Legal Metrology Act and inspection of weighing and measuring instruments. Past vacancy (2022): 22 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['btech','degree'],
  150, 100, 75, 75,
  '2026-10-01', '2026-10-05', '2026-11-05',
  '2027-02-01', '2027-06-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#BTech','#Degree','#GovtJobs','#TSPSC','#Weights','#Measures','#Metrology'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 128. IRCON Executive Trainee 2025 (Expected) ─────────────────────────
(
  'ircon-et-2025',
  'IRCON Executive Trainee 2025',
  'IRCON ఎగ్జిక్యూటివ్ ట్రైనీ 2025',
  'IRCON ET',
  'IRCON International Limited',
  'IRCON International Limited Executive Trainee recruitment for Civil, Electrical, Signal & Telecommunication and Mechanical engineering disciplines for railway and highway infrastructure projects. Past vacancy (2024): 60 posts.',
  18, 30,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['btech','mtech'],
  0, 0, 0, 0,
  '2026-01-05', '2026-01-10', '2026-01-30',
  '2026-03-15', '2026-05-15',
  NULL,
  'https://ircon.org', NULL,
  ARRAY['#BTech','#MTech','#Engineering','#IRCON','#PSU','#GovtJobs','#Railways','#Infrastructure'],
  'engineering', 'All India',
  true, false, 'expected'
),

-- ── 129. TSPSC Assistant Director Stationery 2026 (Expected) ─────────────
(
  'tspsc-asst-director-stationery-2026',
  'TSPSC Assistant Director of Stationery 2026',
  'TSPSC అసిస్టెంట్ డైరెక్టర్ ఆఫ్ స్టేషనరీ 2026',
  'TSPSC ADS',
  'TSPSC',
  'Recruitment for Assistant Directors in Telangana Stationery & Stores Purchase Department for procurement and supply of stationery and stores to government departments. Past vacancy (2022): 8 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','mba'],
  150, 100, 75, 75,
  '2026-10-10', '2026-10-15', '2026-11-15',
  '2027-02-10', '2027-06-10',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#MBA','#GovtJobs','#TSPSC','#Stationery','#Procurement','#Stores'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 130. WAPCOS Engineer 2025 (Expected) ──────────────────────────────────
(
  'wapcos-engineer-2025',
  'WAPCOS Engineer 2025',
  'WAPCOS ఇంజనీర్ 2025',
  'WAPCOS Engineer',
  'WAPCOS Limited',
  'Water and Power Consultancy Services Limited Engineer recruitment for Civil, Mechanical, Electrical and Environmental engineering disciplines for water resources and infrastructure projects. Past vacancy (2024): 75 posts.',
  18, 30,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['btech','mtech'],
  0, 0, 0, 0,
  '2026-01-15', '2026-01-20', '2026-02-10',
  '2026-04-05', '2026-06-01',
  NULL,
  'https://wapcos.gov.in', NULL,
  ARRAY['#BTech','#MTech','#Engineering','#WAPCOS','#PSU','#GovtJobs','#Water','#Infrastructure'],
  'engineering', 'All India',
  true, false, 'expected'
);

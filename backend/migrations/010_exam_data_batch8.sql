-- ExamAlert Telangana — Migration 010
-- 10 more important 2025/2026 exams (batch 8)
-- Run in Supabase SQL Editor AFTER 009.
-- Vacancies NULL (TBA) unless officially confirmed.
-- Past vacancy shown in description for reference.
--
-- Sources:
--   Indian Air Force Agniveer → agnipathvayu.cdac.in
--   TSPSC Panchayat Secretary → tspsc.gov.in
--   NTPC ET                  → ntpccareers.net
--   TSPSC Agriculture Officer → tspsc.gov.in
--   SSC CPO SI               → ssc.gov.in
--   TS MBAPGCET              → tsmahesh.com
--   TSPSC Junior Accountant  → tspsc.gov.in
--   HAL Engineer             → hal-india.co.in
--   TSPSC Fisheries DO       → tspsc.gov.in
--   Indian Coast Guard       → joinindiancoastguard.cdac.in

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

-- ── 71. Indian Air Force Agniveer Vayu 2025 (Expected) ───────────────────
(
  'iaf-agniveer-vayu-2025',
  'Indian Air Force Agniveer Vayu 2025',
  'ఇండియన్ ఎయిర్ ఫోర్స్ అగ్నివీర్ వాయు 2025',
  'IAF Agniveer',
  'Indian Air Force',
  'Indian Air Force Agniveer Vayu recruitment under Agnipath scheme for Science and Arts/Commerce streams. Intake 02/2026 expected notification August 2025. Past vacancy (2024): 2,500 posts.',
  17, 21,
  '{}'::jsonb,
  ARRAY['inter'],
  0, 0, 0, 0,
  '2025-08-10', '2025-08-15', '2025-09-15',
  '2025-11-20', '2026-01-15',
  NULL,
  'https://agnipathvayu.cdac.in', 'https://agnipathvayu.cdac.in',
  ARRAY['#Inter','#Defence','#AirForce','#Agniveer','#Agnipath','#GovtJobs','#IAF'],
  'defence', 'All India',
  true, true, 'expected'
),

-- ── 72. TSPSC Panchayat Secretary 2025 (Expected) ────────────────────────
(
  'tspsc-panchayat-secretary-2025',
  'TSPSC Panchayat Secretary Grade V 2025',
  'TSPSC పంచాయతీ సెక్రటరీ గ్రేడ్ V 2025',
  'Panchayat Secretary',
  'TSPSC',
  'Recruitment for Panchayat Secretary Grade V posts for managing gram panchayat administration across Telangana under Panchayat Raj & Rural Development Department. Past vacancy (2021): 9,168 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['inter','degree'],
  100, 70, 50, 50,
  '2025-11-10', '2025-11-15', '2025-12-15',
  '2026-03-10', '2026-07-10',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Inter','#Degree','#GovtJobs','#TSPSC','#PanchayatSecretary','#RuralDevelopment'],
  'govt_jobs', 'Telangana',
  true, true, 'expected'
),

-- ── 73. NTPC Engineer Trainee 2025 (Expected) ────────────────────────────
(
  'ntpc-et-2025',
  'NTPC Engineer Trainee 2025',
  'NTPC ఇంజనీర్ ట్రైనీ 2025',
  'NTPC ET',
  'NTPC Limited',
  'National Thermal Power Corporation Engineer Trainee recruitment through GATE score for Electrical, Mechanical, Electronics, Civil, Instrumentation and Mining engineering disciplines. Past vacancy (2024): 350 posts.',
  18, 27,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['btech','mtech'],
  0, 0, 0, 0,
  '2025-10-01', '2025-10-05', '2025-10-25',
  '2025-12-14', '2026-02-01',
  NULL,
  'https://ntpccareers.net', NULL,
  ARRAY['#BTech','#MTech','#Engineering','#NTPC','#PSU','#GovtJobs','#GATE','#Power'],
  'engineering', 'All India',
  true, true, 'expected'
),

-- ── 74. TSPSC Agriculture Officer 2025 (Expected) ────────────────────────
(
  'tspsc-agriculture-officer-2025',
  'TSPSC Agriculture Officer 2025',
  'TSPSC అగ్రికల్చర్ ఆఫీసర్ 2025',
  'TSPSC AO',
  'TSPSC',
  'Recruitment for Agriculture Officers in Telangana Agriculture Department for providing technical guidance to farmers and implementing agriculture schemes at mandal level. Past vacancy (2022): 1,012 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','btech'],
  150, 100, 75, 75,
  '2025-11-20', '2025-11-25', '2025-12-25',
  '2026-03-20', '2026-07-20',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#BTech','#Agriculture','#TSPSC','#GovtJobs','#AgricultureOfficer'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 75. SSC CPO Sub-Inspector 2025 (Expected) ────────────────────────────
(
  'ssc-cpo-2025',
  'SSC CPO Sub-Inspector 2025',
  'SSC CPO సబ్-ఇన్స్పెక్టర్ 2025',
  'SSC CPO',
  'Staff Selection Commission',
  'Central Police Organisations Sub-Inspector recruitment for Delhi Police, BSF, CISF, CRPF, ITBP and SSB. Includes written exam, physical test and medical examination. Past vacancy (2024): 4,187 posts.',
  20, 25,
  '{"SC": 5, "ST": 5, "OBC": 3, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['degree','btech'],
  100, 100, 0, 100,
  '2025-08-20', '2025-08-25', '2025-09-25',
  '2025-12-27', '2026-04-01',
  NULL,
  'https://ssc.gov.in', 'https://ssc.gov.in',
  ARRAY['#Degree','#BTech','#Police','#SSC','#CPO','#SI','#GovtJobs','#CRPF','#BSF'],
  'police', 'All India',
  true, true, 'expected'
),

-- ── 76. TS MBA PGCET 2025 (Live — MBA entrance) ───────────────────────────
(
  'ts-mbapgcet-2025',
  'TS MBA PGCET 2025',
  'తెలంగాణ MBA PGCET 2025',
  'TS MBA PGCET',
  'TSCHE / Osmania University',
  'Telangana State MBA Post Graduate Common Entrance Test for admission to MBA and MMS courses in Telangana universities and autonomous colleges. Seats vary by college.',
  NULL, NULL,
  '{}'::jsonb,
  ARRAY['degree','btech'],
  800, 800, 400, 800,
  '2025-03-05', '2025-03-10', '2025-04-10',
  '2025-05-18', '2025-06-15',
  NULL,
  'https://tsmahesh.com', 'https://tsmahesh.com',
  ARRAY['#Degree','#BTech','#MBA','#PGCET','#Telangana','#PGEntrance','#Management'],
  'other', 'Telangana',
  true, false, 'live'
),

-- ── 77. TSPSC Junior Accountant 2025 (Expected) ───────────────────────────
(
  'tspsc-junior-accountant-2025',
  'TSPSC Junior Accountant 2025',
  'TSPSC జూనియర్ అకౌంటెంట్ 2025',
  'TSPSC JA',
  'TSPSC',
  'Recruitment for Junior Accountant posts in various Telangana government departments including Finance, Treasury and Audit departments. Requires Commerce degree. Past vacancy (2023): 521 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','inter'],
  120, 80, 60, 60,
  '2026-01-20', '2026-01-25', '2026-02-25',
  '2026-05-20', '2026-09-20',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#Inter','#GovtJobs','#TSPSC','#Accountant','#Commerce','#Finance'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 78. HAL Management Trainee 2025 (Expected) ───────────────────────────
(
  'hal-mt-2025',
  'HAL Management Trainee 2025',
  'HAL మేనేజ్మెంట్ ట్రైనీ 2025',
  'HAL MT',
  'Hindustan Aeronautics Limited',
  'Hindustan Aeronautics Limited Management Trainee recruitment for Design, Production, Overhaul, Finance, HR and IT streams. HAL Hyderabad Division is a major aerospace manufacturing unit. Past vacancy (2024): 200 posts.',
  18, 27,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['btech','mtech','mba'],
  0, 0, 0, 0,
  '2025-11-01', '2025-11-05', '2025-11-25',
  '2026-01-18', '2026-03-15',
  NULL,
  'https://hal-india.co.in', NULL,
  ARRAY['#BTech','#MTech','#MBA','#Engineering','#HAL','#PSU','#GovtJobs','#Aerospace','#Hyderabad'],
  'engineering', 'All India',
  true, true, 'expected'
),

-- ── 79. TSPSC Fisheries Development Officer 2025 (Expected) ──────────────
(
  'tspsc-fisheries-do-2025',
  'TSPSC Fisheries Development Officer 2025',
  'TSPSC ఫిషరీస్ డెవలప్మెంట్ ఆఫీసర్ 2025',
  'TSPSC FDO',
  'TSPSC',
  'Recruitment for Fisheries Development Officers in Telangana Fisheries Department for promoting fisheries and aquaculture development across the state. Past vacancy (2022): 131 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','btech'],
  150, 100, 75, 75,
  '2026-03-10', '2026-03-15', '2026-04-15',
  '2026-07-10', '2026-11-10',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#BTech','#GovtJobs','#TSPSC','#Fisheries','#Agriculture','#Aquaculture'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 80. Indian Coast Guard Navik & Yantrik 2025 (Expected) ───────────────
(
  'coast-guard-navik-2025',
  'Indian Coast Guard Navik & Yantrik 2025',
  'ఇండియన్ కోస్ట్ గార్డ్ నావిక్ & యంత్రిక్ 2025',
  'Coast Guard',
  'Indian Coast Guard',
  'Indian Coast Guard Navik (General Duty & Domestic Branch) and Yantrik recruitment. Navik GD requires 12th pass with Maths & Physics, Yantrik requires Diploma in Engineering. Past vacancy (2024): 320 posts.',
  18, 22,
  '{}'::jsonb,
  ARRAY['inter','diploma'],
  0, 0, 0, 0,
  '2025-09-20', '2025-09-25', '2025-10-15',
  '2025-12-07', '2026-02-01',
  NULL,
  'https://joinindiancoastguard.cdac.in', 'https://joinindiancoastguard.cdac.in',
  ARRAY['#Inter','#Diploma','#Defence','#CoastGuard','#Navy','#GovtJobs','#Navik'],
  'defence', 'All India',
  true, true, 'expected'
);

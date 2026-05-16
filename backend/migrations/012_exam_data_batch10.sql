-- ExamAlert Telangana — Migration 012
-- 10 more important 2025/2026 exams (batch 10) — reaches 100 total
-- Run in Supabase SQL Editor AFTER 011.
-- Vacancies NULL (TBA) unless officially confirmed.
-- Past vacancy shown in description for reference.
--
-- Sources:
--   TSPSC Co-operative Inspector → tspsc.gov.in
--   Indian Navy SSC Officer      → joinindiannavy.gov.in
--   GIC Assistant Manager        → gicofindia.com
--   TSPSC Mines Inspector        → tspsc.gov.in
--   RRB Paramedical              → rrbapply.gov.in
--   TS CPGET                     → tscpget.com
--   TSPSC Town Planning Officer  → tspsc.gov.in
--   NPCIL Scientific Assistant   → npcilcareers.co.in
--   TSPSC Audit Officer          → tspsc.gov.in
--   APSC / TSPSC Divisional Accounts Officer → tspsc.gov.in

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

-- ── 91. TSPSC Co-operative Inspector 2025 (Expected) ─────────────────────
(
  'tspsc-cooperative-inspector-2025',
  'TSPSC Co-operative Inspector 2025',
  'TSPSC కో-ఆపరేటివ్ ఇన్స్పెక్టర్ 2025',
  'TSPSC Co-op Inspector',
  'TSPSC',
  'Recruitment for Co-operative Inspectors in Telangana Co-operative Department for inspection and supervision of co-operative societies across all districts. Past vacancy (2022): 248 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','inter'],
  150, 100, 75, 75,
  '2026-04-20', '2026-04-25', '2026-05-25',
  '2026-08-20', '2026-12-20',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#Inter','#GovtJobs','#TSPSC','#Cooperative','#Inspector'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 92. Indian Navy SSC Officer 2025 (Expected) ───────────────────────────
(
  'navy-ssc-officer-2025',
  'Indian Navy SSC Officer 2025',
  'ఇండియన్ నేవీ SSC ఆఫీసర్ 2025',
  'Navy SSC Officer',
  'Indian Navy',
  'Indian Navy Short Service Commission Officer recruitment for Executive, Technical, Education and Logistics branches. Includes SSB interview. Past vacancy (2024): 220 posts.',
  19, 25,
  '{}'::jsonb,
  ARRAY['btech','degree'],
  0, 0, 0, 0,
  '2025-08-20', '2025-08-25', '2025-09-20',
  '2025-12-14', '2026-02-15',
  NULL,
  'https://joinindiannavy.gov.in', 'https://joinindiannavy.gov.in',
  ARRAY['#BTech','#Degree','#Defence','#Navy','#Officer','#SSC','#GovtJobs'],
  'defence', 'All India',
  true, false, 'expected'
),

-- ── 93. GIC Assistant Manager 2025 (Expected) ────────────────────────────
(
  'gic-assistant-manager-2025',
  'GIC Assistant Manager Scale I 2025',
  'GIC అసిస్టెంట్ మేనేజర్ 2025',
  'GIC AM',
  'General Insurance Corporation of India',
  'General Insurance Corporation of India Assistant Manager Scale I recruitment for Generalist, Finance, Actuarial, IT and Legal streams. Past vacancy (2023): 171 posts.',
  21, 30,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['degree','btech','mba'],
  600, 600, 100, 600,
  '2025-10-20', '2025-10-25', '2025-11-15',
  '2026-01-04', '2026-03-15',
  NULL,
  'https://gicofindia.com', NULL,
  ARRAY['#Degree','#BTech','#MBA','#Insurance','#GovtJobs','#GIC','#AssistantManager'],
  'banking', 'All India',
  true, false, 'expected'
),

-- ── 94. TSPSC Mines Inspector 2025 (Expected) ────────────────────────────
(
  'tspsc-mines-inspector-2025',
  'TSPSC Mines Inspector 2025',
  'TSPSC మైన్స్ ఇన్స్పెక్టర్ 2025',
  'TSPSC Mines Inspector',
  'TSPSC',
  'Recruitment for Mines Inspectors in Telangana Mines & Geology Department for inspection of mining operations and enforcement of mining regulations. Past vacancy (2022): 43 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['btech','degree'],
  150, 100, 75, 75,
  '2026-05-01', '2026-05-05', '2026-06-05',
  '2026-09-01', '2027-01-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#BTech','#Degree','#GovtJobs','#TSPSC','#Mining','#MinesInspector','#Geology'],
  'engineering', 'Telangana',
  true, false, 'expected'
),

-- ── 95. RRB Paramedical 2025 (Expected) ───────────────────────────────────
(
  'rrb-paramedical-2025',
  'RRB Paramedical 2025',
  'RRB పారామెడికల్ 2025',
  'RRB Paramedical',
  'Railway Recruitment Board',
  'Paramedical categories recruitment for Staff Nurse, Pharmacist, Lab Superintendent, Health & Malaria Inspector and other medical posts in Indian Railways hospitals. Past vacancy (2024): 1,376 posts.',
  18, 33,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['inter','diploma','degree'],
  500, 500, 250, 250,
  '2025-10-05', '2025-10-10', '2025-11-10',
  '2026-01-25', NULL,
  NULL,
  'https://indianrailways.gov.in', 'https://rrbapply.gov.in',
  ARRAY['#Inter','#Diploma','#Degree','#Railways','#Medical','#GovtJobs','#Paramedical','#Nurse'],
  'medical', 'All India',
  true, false, 'expected'
),

-- ── 96. TS CPGET 2025 (Live — PG entrance for Arts/Science) ──────────────
(
  'ts-cpget-2025',
  'TS CPGET 2025',
  'తెలంగాణ CPGET 2025',
  'TS CPGET',
  'Osmania University / TSCHE',
  'Telangana State Common PG Entrance Test for admission to MA, M.Sc, M.Com and other PG courses in Osmania, Kakatiya, Telangana and other state universities. Seats vary by college.',
  NULL, NULL,
  '{}'::jsonb,
  ARRAY['degree'],
  800, 800, 400, 800,
  '2025-04-10', '2025-04-15', '2025-05-15',
  '2025-06-22', '2025-07-15',
  NULL,
  'https://tscpget.com', 'https://tscpget.com',
  ARRAY['#Degree','#PGEntrance','#CPGET','#MA','#MSc','#MCom','#Telangana','#University'],
  'other', 'Telangana',
  true, false, 'live'
),

-- ── 97. TSPSC Town Planning Officer 2025 (Expected) ──────────────────────
(
  'tspsc-town-planning-officer-2025',
  'TSPSC Town Planning Officer 2025',
  'TSPSC టౌన్ ప్లానింగ్ ఆఫీసర్ 2025',
  'TSPSC TPO',
  'TSPSC',
  'Recruitment for Town Planning Officers in Telangana Municipal Administration & Urban Development Department for urban planning and development control in municipalities. Past vacancy (2022): 57 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['btech','degree'],
  150, 100, 75, 75,
  '2026-05-10', '2026-05-15', '2026-06-15',
  '2026-09-10', '2027-01-10',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#BTech','#Degree','#GovtJobs','#TSPSC','#TownPlanning','#UrbanDevelopment','#Municipal'],
  'engineering', 'Telangana',
  true, false, 'expected'
),

-- ── 98. NPCIL Scientific Assistant 2025 (Expected) ───────────────────────
(
  'npcil-scientific-assistant-2025',
  'NPCIL Scientific Assistant 2025',
  'NPCIL సైంటిఫిక్ అసిస్టెంట్ 2025',
  'NPCIL SA',
  'Nuclear Power Corporation of India Limited',
  'Nuclear Power Corporation of India Limited Scientific Assistant and Stipendiary Trainee recruitment for Electronics, Electrical, Mechanical, Civil and IT disciplines. Past vacancy (2024): 295 posts.',
  18, 25,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['diploma','btech','inter'],
  150, 150, 0, 150,
  '2025-11-20', '2025-11-25', '2025-12-15',
  '2026-02-08', '2026-04-15',
  NULL,
  'https://npcilcareers.co.in', NULL,
  ARRAY['#Diploma','#BTech','#Inter','#Engineering','#NPCIL','#Nuclear','#GovtJobs','#PSU'],
  'engineering', 'All India',
  true, false, 'expected'
),

-- ── 99. TSPSC Divisional Accounts Officer 2025 (Expected) ────────────────
(
  'tspsc-dao-2025',
  'TSPSC Divisional Accounts Officer 2025',
  'TSPSC డివిజనల్ అకౌంట్స్ ఆఫీసర్ 2025',
  'TSPSC DAO',
  'TSPSC',
  'Recruitment for Divisional Accounts Officers in Telangana Finance Department for audit and accounts management in government departments. Requires Commerce degree or CA/ICWA. Past vacancy (2022): 167 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','mba'],
  200, 150, 100, 100,
  '2026-05-20', '2026-05-25', '2026-06-25',
  '2026-09-20', '2027-01-20',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#MBA','#GovtJobs','#TSPSC','#Accounts','#Finance','#DAO','#Commerce'],
  'psc', 'Telangana',
  true, false, 'expected'
),

-- ── 100. TSPSC Drug Inspector 2025 (Expected) ────────────────────────────
(
  'tspsc-drug-inspector-2025',
  'TSPSC Drug Inspector 2025',
  'TSPSC డ్రగ్ ఇన్స్పెక్టర్ 2025',
  'TSPSC Drug Inspector',
  'TSPSC',
  'Recruitment for Drug Inspectors in Telangana Drugs Control Administration for inspection of pharmaceutical manufacturing units, drug stores and enforcement of Drugs & Cosmetics Act. Past vacancy (2022): 89 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','diploma'],
  150, 100, 75, 75,
  '2026-06-01', '2026-06-05', '2026-07-05',
  '2026-10-01', '2027-02-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#Diploma','#Medical','#TSPSC','#DrugInspector','#Pharmacy','#GovtJobs'],
  'medical', 'Telangana',
  true, false, 'expected'
);

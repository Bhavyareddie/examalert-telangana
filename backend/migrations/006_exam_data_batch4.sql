-- ExamAlert Telangana — Migration 006
-- 10 more important 2025/2026 exams (batch 4)
-- Run in Supabase SQL Editor AFTER 005.
-- Vacancies NULL (TBA) unless officially confirmed.
-- Past vacancy shown in description for reference.
--
-- Sources:
--   TSPSC Pharmacist → tspsc.gov.in
--   CDS             → upsc.gov.in
--   CAPF AC         → upsc.gov.in
--   SBI SO          → sbi.co.in/careers
--   RRB JE          → rrbapply.gov.in
--   SSC GD Constable→ ssc.gov.in
--   TSPSC Horticulture Officer → tspsc.gov.in
--   UPSC CISF AC    → upsc.gov.in
--   TS LAWCET       → tslawcet.org
--   TSPSC Municipal Commissioner → tspsc.gov.in

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

-- ── 31. UPSC CDS II 2025 (Live — notification released May 2025) ──────────
(
  'upsc-cds-2-2025',
  'UPSC CDS II 2025',
  'UPSC CDS II 2025',
  'CDS II 2025',
  'UPSC',
  'Combined Defence Services Examination II 2025 for admission to Indian Military Academy, Indian Naval Academy, Air Force Academy and Officers Training Academy. Past vacancy (2024): 457 posts.',
  19, 25,
  '{}'::jsonb,
  ARRAY['degree','btech'],
  200, 200, 0, 200,
  '2025-05-28', '2025-05-28', '2025-06-17',
  '2025-09-14', '2025-12-15',
  457,
  'https://upsc.gov.in', 'https://upsconline.nic.in',
  ARRAY['#Degree','#BTech','#Defence','#CDS','#Army','#Navy','#AirForce','#OTA'],
  'defence', 'All India',
  true, true, 'live'
),

-- ── 32. SSC GD Constable 2025 (Expected) ─────────────────────────────────
(
  'ssc-gd-constable-2025',
  'SSC GD Constable 2025',
  'SSC GD కానిస్టేబుల్ 2025',
  'SSC GD',
  'Staff Selection Commission',
  'General Duty Constable recruitment for BSF, CISF, CRPF, ITBP, SSB, NIA, SSF and Rifleman (GD) in Assam Rifles. One of the largest central govt recruitments. Past vacancy (2024): 39,481 posts.',
  18, 23,
  '{"SC": 5, "ST": 5, "OBC": 3, "Ex-Servicemen": 3}'::jsonb,
  ARRAY['10th'],
  100, 100, 0, 100,
  '2025-09-01', '2025-09-05', '2025-10-05',
  '2026-01-20', '2026-05-01',
  NULL,
  'https://ssc.gov.in', 'https://ssc.gov.in',
  ARRAY['#10thPass','#GovtJobs','#SSC','#GD','#Constable','#BSF','#CRPF','#CISF'],
  'defence', 'All India',
  true, true, 'expected'
),

-- ── 33. UPSC CAPF Assistant Commandant 2025 (Expected) ───────────────────
(
  'upsc-capf-ac-2025',
  'UPSC CAPF Assistant Commandant 2025',
  'UPSC CAPF అసిస్టెంట్ కమాండెంట్ 2025',
  'CAPF AC',
  'UPSC',
  'Central Armed Police Forces (BSF, CRPF, CISF, ITBP, SSB) Assistant Commandant recruitment through UPSC. Includes written exam, physical test and interview. Past vacancy (2024): 506 posts.',
  20, 25,
  '{"SC": 5, "ST": 5, "OBC": 3}'::jsonb,
  ARRAY['degree','btech'],
  200, 200, 0, 200,
  '2025-07-01', '2025-07-01', '2025-07-21',
  '2025-08-03', '2025-12-01',
  NULL,
  'https://upsc.gov.in', 'https://upsconline.nic.in',
  ARRAY['#Degree','#BTech','#Defence','#CAPF','#BSF','#CRPF','#CISF','#GovtJobs'],
  'defence', 'All India',
  true, false, 'expected'
),

-- ── 34. RRB JE 2025 (Expected) ────────────────────────────────────────────
(
  'rrb-je-2025',
  'RRB Junior Engineer 2025',
  'RRB జూనియర్ ఇంజనీర్ 2025',
  'RRB JE',
  'Railway Recruitment Board',
  'Junior Engineer, Junior Engineer (IT), Depot Material Superintendent and Chemical & Metallurgical Assistant recruitment across all Railway zones. Past vacancy (2024): 7,951 posts.',
  18, 33,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['diploma','btech'],
  500, 500, 250, 250,
  '2025-08-15', '2025-08-20', '2025-09-20',
  '2025-12-20', NULL,
  NULL,
  'https://indianrailways.gov.in', 'https://rrbapply.gov.in',
  ARRAY['#BTech','#Diploma','#Railways','#GovtJobs','#JE','#JuniorEngineer'],
  'railways', 'All India',
  true, true, 'expected'
),

-- ── 35. SBI Specialist Officer 2025 (Expected) ───────────────────────────
(
  'sbi-so-2025',
  'SBI Specialist Officer 2025',
  'SBI స్పెషలిస్ట్ ఆఫీసర్ 2025',
  'SBI SO',
  'State Bank of India',
  'State Bank of India Specialist Cadre Officers recruitment for Deputy Manager (System), Manager (System), Deputy Manager (Law), Manager (Law) and other specialist posts. Past vacancy (2024): 1,040 posts.',
  21, 35,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['btech','mtech','mba','degree'],
  750, 750, 125, 125,
  '2025-12-01', '2025-12-05', '2025-12-25',
  '2026-02-08', '2026-05-01',
  NULL,
  'https://sbi.co.in/careers', NULL,
  ARRAY['#BTech','#MBA','#Banking','#GovtJobs','#SBI','#SO','#SpecialistOfficer'],
  'banking', 'All India',
  true, false, 'expected'
),

-- ── 36. TSPSC Pharmacist 2025 (Expected) ─────────────────────────────────
(
  'tspsc-pharmacist-2025',
  'TSPSC Pharmacist Grade II 2025',
  'TSPSC ఫార్మసిస్ట్ గ్రేడ్ II 2025',
  'TSPSC Pharmacist',
  'TSPSC',
  'Recruitment for Pharmacist Grade II posts in various Telangana government hospitals and health centres under Health, Medical & Family Welfare Department. Past vacancy (2022): 1,205 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['diploma','degree'],
  150, 100, 75, 75,
  '2025-11-15', '2025-11-20', '2025-12-20',
  '2026-03-15', '2026-07-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Diploma','#Degree','#Medical','#TSPSC','#Pharmacist','#GovtJobs','#HealthDept'],
  'medical', 'Telangana',
  true, false, 'expected'
),

-- ── 37. TS LAWCET 2025 (Live — LLB entrance) ─────────────────────────────
(
  'ts-lawcet-2025',
  'TS LAWCET 2025',
  'తెలంగాణ LAWCET 2025',
  'TS LAWCET',
  'TSCHE / Osmania University',
  'Telangana State Law Common Entrance Test for admission to 3-year LLB and 5-year integrated LLB courses in Telangana universities and colleges. Seats vary by college.',
  NULL, NULL,
  '{}'::jsonb,
  ARRAY['inter','degree'],
  800, 800, 400, 800,
  '2025-03-10', '2025-03-15', '2025-04-15',
  '2025-05-24', '2025-06-20',
  NULL,
  'https://tslawcet.org', 'https://tslawcet.org',
  ARRAY['#Inter','#Degree','#Law','#LLB','#LAWCET','#Telangana','#LawEntrance'],
  'other', 'Telangana',
  true, false, 'live'
),

-- ── 38. TSPSC Horticulture Officer 2025 (Expected) ───────────────────────
(
  'tspsc-horticulture-officer-2025',
  'TSPSC Horticulture Officer 2025',
  'TSPSC హార్టికల్చర్ ఆఫీసర్ 2025',
  'TSPSC Hort Officer',
  'TSPSC',
  'Recruitment for Horticulture Officers in Telangana Horticulture Department for planning and implementation of horticulture development schemes. Past vacancy (2022): 218 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','btech'],
  150, 100, 75, 75,
  '2026-01-01', '2026-01-10', '2026-02-10',
  '2026-05-01', '2026-09-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#BTech','#Agriculture','#TSPSC','#GovtJobs','#Horticulture'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 39. UPSC ESE (Engineering Services) 2026 (Expected) ──────────────────
(
  'upsc-ese-2026',
  'UPSC Engineering Services Examination 2026',
  'UPSC ఇంజనీరింగ్ సర్వీసెస్ 2026',
  'UPSC ESE',
  'UPSC',
  'Engineering Services Examination for Civil, Mechanical, Electrical and Electronics & Telecommunication engineering posts in Central Government departments. Past vacancy (2024): 167 posts.',
  21, 30,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['btech','mtech'],
  200, 200, 0, 200,
  '2025-09-17', '2025-09-17', '2025-10-07',
  '2026-02-08', '2026-07-01',
  NULL,
  'https://upsc.gov.in', 'https://upsconline.nic.in',
  ARRAY['#BTech','#MTech','#Engineering','#UPSC','#ESE','#IES','#GovtJobs','#CentralGovt'],
  'engineering', 'All India',
  true, true, 'expected'
),

-- ── 40. TSPSC Municipal Commissioner Grade III 2025 (Expected) ───────────
(
  'tspsc-municipal-commissioner-2025',
  'TSPSC Municipal Commissioner Grade III 2025',
  'TSPSC మునిసిపల్ కమిషనర్ గ్రేడ్ III 2025',
  'TSPSC Mun. Comm.',
  'TSPSC',
  'Recruitment for Municipal Commissioner Grade III posts in Telangana Municipal Administration and Urban Development Department for managing urban local bodies. Past vacancy (2022): 142 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','btech','mba'],
  200, 150, 100, 100,
  '2026-01-15', '2026-01-20', '2026-02-20',
  '2026-05-15', '2026-09-15',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#BTech','#MBA','#TSPSC','#GovtJobs','#Municipal','#UrbanDevelopment'],
  'psc', 'Telangana',
  true, false, 'expected'
);

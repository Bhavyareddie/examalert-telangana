-- ExamAlert Telangana — Migration 007
-- 10 more important 2025/2026 exams (batch 5)
-- Run in Supabase SQL Editor AFTER 006.
-- Vacancies NULL (TBA) unless officially confirmed.
-- Past vacancy shown in description for reference.
--
-- Sources:
--   TSPSC ANM/Staff Nurse → tspsc.gov.in
--   NABARD               → nabard.org
--   LIC AAO              → licindia.in
--   TSPSC VRO/VRA        → tspsc.gov.in
--   RRB RPF              → rrbapply.gov.in
--   UPSC SCRA            → upsc.gov.in
--   TS POLYCET           → tspolycet.nic.in
--   TSPSC Veterinary     → tspsc.gov.in
--   FCI AG III           → fci.gov.in
--   TSPSC Junior Lecturer → tspsc.gov.in

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

-- ── 41. TSPSC Staff Nurse 2025 (Expected) ────────────────────────────────
(
  'tspsc-staff-nurse-2025',
  'TSPSC Staff Nurse Grade II 2025',
  'TSPSC స్టాఫ్ నర్స్ గ్రేడ్ II 2025',
  'TSPSC Nurse',
  'TSPSC',
  'Recruitment for Staff Nurse Grade II posts in government hospitals under Telangana Health, Medical & Family Welfare Department. Requires B.Sc Nursing or GNM qualification. Past vacancy (2022): 1,708 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','diploma'],
  150, 100, 75, 75,
  '2025-10-15', '2025-10-20', '2025-11-20',
  '2026-02-20', '2026-06-15',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#Diploma','#Medical','#TSPSC','#Nurse','#GovtJobs','#HealthDept','#Nursing'],
  'medical', 'Telangana',
  true, true, 'expected'
),

-- ── 42. NABARD Grade A & B 2025 (Expected) ───────────────────────────────
(
  'nabard-grade-ab-2025',
  'NABARD Grade A & B Officers 2025',
  'NABARD గ్రేడ్ A & B 2025',
  'NABARD',
  'NABARD',
  'National Bank for Agriculture and Rural Development recruitment for Assistant Manager (Grade A) and Manager (Grade B) in Rural Development Banking Service, General Service and other streams. Past vacancy (2024): 102 posts.',
  21, 30,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['degree','btech','mba','mca'],
  800, 800, 150, 800,
  '2025-07-01', '2025-07-05', '2025-07-25',
  '2025-09-14', '2025-12-01',
  NULL,
  'https://nabard.org', NULL,
  ARRAY['#Degree','#BTech','#MBA','#Banking','#GovtJobs','#NABARD','#Agriculture'],
  'banking', 'All India',
  true, false, 'expected'
),

-- ── 43. LIC AAO 2025 (Expected) ──────────────────────────────────────────
(
  'lic-aao-2025',
  'LIC Assistant Administrative Officer 2025',
  'LIC AAO 2025',
  'LIC AAO',
  'Life Insurance Corporation of India',
  'Life Insurance Corporation of India Assistant Administrative Officer recruitment for Generalist, IT, CA, Actuarial and Rajbhasha streams. Past vacancy (2023): 300 posts.',
  21, 30,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['degree','btech','mba'],
  600, 600, 100, 600,
  '2025-08-15', '2025-08-20', '2025-09-10',
  '2025-11-02', '2026-02-01',
  NULL,
  'https://licindia.in', NULL,
  ARRAY['#Degree','#BTech','#MBA','#Insurance','#GovtJobs','#LIC','#AAO'],
  'banking', 'All India',
  true, false, 'expected'
),

-- ── 44. TSPSC VRO & VRA 2025 (Expected) ──────────────────────────────────
(
  'tspsc-vro-vra-2025',
  'TSPSC VRO & VRA 2025',
  'TSPSC VRO & VRA 2025',
  'VRO VRA',
  'TSPSC',
  'Village Revenue Officer and Village Revenue Assistant recruitment for revenue administration at village level across all districts of Telangana. Past vacancy (2023): 2,486 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['inter','10th'],
  100, 70, 50, 50,
  '2025-12-01', '2025-12-10', '2026-01-10',
  '2026-04-10', '2026-08-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#10thPass','#Inter','#GovtJobs','#TSPSC','#VRO','#VRA','#Revenue','#Village'],
  'govt_jobs', 'Telangana',
  true, true, 'expected'
),

-- ── 45. RRB RPF Constable & SI 2025 (Expected) ───────────────────────────
(
  'rrb-rpf-2025',
  'RRB RPF Constable & Sub-Inspector 2025',
  'RRB RPF కానిస్టేబుల్ & SI 2025',
  'RPF 2025',
  'Railway Protection Force / RRB',
  'Railway Protection Force Constable and Sub-Inspector recruitment for protecting railway property and passengers. Includes physical efficiency test. Past vacancy (2024): 4,660 posts.',
  18, 28,
  '{"SC": 5, "ST": 5, "OBC": 3, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['10th','inter'],
  500, 500, 250, 250,
  '2025-09-01', '2025-09-10', '2025-10-10',
  '2026-01-05', NULL,
  NULL,
  'https://indianrailways.gov.in', 'https://rrbapply.gov.in',
  ARRAY['#10thPass','#Inter','#Railways','#GovtJobs','#RPF','#Police','#Constable'],
  'railways', 'All India',
  true, true, 'expected'
),

-- ── 46. TS POLYCET 2025 (Live — Polytechnic entrance) ────────────────────
(
  'ts-polycet-2025',
  'TS POLYCET 2025',
  'తెలంగాణ POLYCET 2025',
  'TS POLYCET',
  'SBTET Telangana',
  'Telangana State Polytechnic Common Entrance Test for admission to Diploma courses in Engineering, Technology and Non-Engineering in government and private polytechnic colleges. Seats vary by college.',
  NULL, NULL,
  '{}'::jsonb,
  ARRAY['10th'],
  300, 300, 150, 300,
  '2025-02-20', '2025-02-25', '2025-03-25',
  '2025-05-10', '2025-06-01',
  NULL,
  'https://tspolycet.nic.in', 'https://tspolycet.nic.in',
  ARRAY['#10thPass','#Diploma','#POLYCET','#Polytechnic','#Telangana','#Engineering'],
  'engineering', 'Telangana',
  true, false, 'live'
),

-- ── 47. TSPSC Veterinary Assistant Surgeon 2025 (Expected) ───────────────
(
  'tspsc-veterinary-surgeon-2025',
  'TSPSC Veterinary Assistant Surgeon 2025',
  'TSPSC వెటర్నరీ అసిస్టెంట్ సర్జన్ 2025',
  'TSPSC VAS',
  'TSPSC',
  'Recruitment for Veterinary Assistant Surgeons in Animal Husbandry Department of Telangana for providing veterinary services in rural areas. Past vacancy (2022): 1,059 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree'],
  200, 150, 100, 100,
  '2026-02-01', '2026-02-10', '2026-03-10',
  '2026-06-01', '2026-10-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#Medical','#TSPSC','#Veterinary','#GovtJobs','#AnimalHusbandry'],
  'medical', 'Telangana',
  true, false, 'expected'
),

-- ── 48. FCI Assistant Grade III 2025 (Expected) ──────────────────────────
(
  'fci-ag3-2025',
  'FCI Assistant Grade III 2025',
  'FCI అసిస్టెంట్ గ్రేడ్ III 2025',
  'FCI AG III',
  'Food Corporation of India',
  'Food Corporation of India Assistant Grade III recruitment for Depot, Accounts, Technical and Typist posts across all zones including South Zone covering Telangana. Past vacancy (2023): 5,043 posts.',
  18, 27,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 3}'::jsonb,
  ARRAY['inter','degree','btech'],
  500, 500, 0, 500,
  '2025-10-01', '2025-10-05', '2025-11-05',
  '2026-01-18', '2026-04-01',
  NULL,
  'https://fci.gov.in', NULL,
  ARRAY['#Inter','#Degree','#BTech','#GovtJobs','#FCI','#Food','#CentralGovt'],
  'govt_jobs', 'All India',
  true, true, 'expected'
),

-- ── 49. TSPSC Junior Lecturer 2025 (Expected) ────────────────────────────
(
  'tspsc-junior-lecturer-2025',
  'TSPSC Junior Lecturer 2025',
  'TSPSC జూనియర్ లెక్చరర్ 2025',
  'TSPSC JL',
  'TSPSC',
  'Recruitment for Junior Lecturers in Government Junior Colleges across Telangana in subjects including Telugu, English, Maths, Physics, Chemistry, Botany, Zoology, Commerce and Economics. Past vacancy (2023): 3,416 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['degree','mtech','mba'],
  200, 150, 100, 100,
  '2025-12-15', '2025-12-20', '2026-01-20',
  '2026-04-15', '2026-08-15',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#MTech','#Teaching','#TSPSC','#JuniorLecturer','#GovtJobs','#JrCollege'],
  'teaching', 'Telangana',
  true, true, 'expected'
),

-- ── 50. UPSC IFS 2026 (Expected — Indian Forest Service) ─────────────────
(
  'upsc-ifs-2026',
  'UPSC Indian Forest Service Examination 2026',
  'UPSC ఇండియన్ ఫారెస్ట్ సర్వీస్ 2026',
  'UPSC IFS',
  'UPSC',
  'Indian Forest Service Examination conducted along with UPSC CSE Prelims for recruitment to Indian Forest Service. Requires science or engineering degree. Past vacancy (2024): 150 posts.',
  21, 32,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['btech','mtech','degree'],
  100, 100, 0, 100,
  '2026-02-01', '2026-02-05', '2026-03-10',
  '2026-05-24', '2026-12-01',
  NULL,
  'https://upsc.gov.in', NULL,
  ARRAY['#BTech','#Degree','#Forest','#UPSC','#IFS','#GovtJobs','#CivilServices'],
  'upsc', 'All India',
  true, false, 'expected'
);

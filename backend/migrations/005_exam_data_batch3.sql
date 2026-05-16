-- ExamAlert Telangana — Migration 005
-- 10 more accurate 2025/2026 exams (batch 3)
-- Run in Supabase SQL Editor AFTER 004.
-- Vacancies set to NULL (TBA) unless officially confirmed.
-- Past vacancy shown in description for reference.
--
-- Sources:
--   TSPSC SI    → tspsc.gov.in
--   TS ICET     → tsicet.nic.in
--   TSPSC FC    → tspsc.gov.in
--   SBI Clerk   → sbi.co.in/careers
--   SSC MTS     → ssc.gov.in
--   UPSC NDA I  → upsc.gov.in
--   TS PGECET   → tspgecet.nic.in
--   IBPS SO     → ibps.in
--   RRB ALP     → rrbapply.gov.in
--   TSPSC Degree Lecturer → tspsc.gov.in

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

-- ── 21. TSPSC Sub-Inspector of Police 2025 (Expected) ────────────────────
(
  'tspsc-si-2025',
  'TSPSC Sub-Inspector of Police 2025',
  'TSPSC సబ్-ఇన్స్పెక్టర్ ఆఫ్ పోలీస్ 2025',
  'TSPSC SI',
  'TSPSC',
  'Recruitment for Sub-Inspector of Police (Civil) posts in Telangana Police Department through TSPSC. Includes written exam, physical test and interview. Past vacancy (2023): 411 posts.',
  18, 28,
  '{"SC": 5, "ST": 5, "BC": 5, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['degree','btech'],
  200, 150, 100, 100,
  '2025-10-01', '2025-10-10', '2025-11-10',
  '2026-02-01', '2026-06-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#Police','#TSPSC','#SI','#GovtJobs','#SubInspector'],
  'police', 'Telangana',
  true, true, 'expected'
),

-- ── 22. TS ICET 2025 (Live — MBA/MCA entrance, annual May exam) ──────────
(
  'ts-icet-2025',
  'TS ICET 2025',
  'తెలంగాణ ICET 2025',
  'TS ICET',
  'TSCHE / Kakatiya University',
  'Telangana State Integrated Common Entrance Test for admission to MBA and MCA courses in Telangana universities and colleges. Seats vary by college.',
  NULL, NULL,
  '{}'::jsonb,
  ARRAY['degree','btech'],
  800, 800, 400, 800,
  '2025-02-15', '2025-02-20', '2025-03-25',
  '2025-05-21', '2025-06-20',
  NULL,
  'https://tsicet.nic.in', 'https://tsicet.nic.in',
  ARRAY['#Degree','#BTech','#MBA','#MCA','#ICET','#Telangana','#PGEntrance'],
  'other', 'Telangana',
  true, false, 'live'
),

-- ── 23. TSPSC Forest College & Research Institute 2025 (Expected) ─────────
(
  'tspsc-forest-beat-officer-2025',
  'TSPSC Forest Beat Officer & Section Officer 2025',
  'TSPSC ఫారెస్ట్ బీట్ ఆఫీసర్ 2025',
  'TSPSC FBO',
  'TSPSC',
  'Recruitment for Forest Beat Officers and Forest Section Officers in Telangana Forest Department. Includes physical efficiency test. Past vacancy (2023): 1,832 posts.',
  18, 28,
  '{"SC": 5, "ST": 5, "BC": 5}'::jsonb,
  ARRAY['inter','degree'],
  150, 100, 75, 75,
  '2025-11-01', '2025-11-10', '2025-12-10',
  '2026-03-01', '2026-07-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Inter','#Degree','#Forest','#TSPSC','#GovtJobs','#ForestDept'],
  'govt_jobs', 'Telangana',
  true, false, 'expected'
),

-- ── 24. SBI Clerk (Junior Associate) 2025 (Expected) ─────────────────────
(
  'sbi-clerk-2025',
  'SBI Junior Associates (Clerk) 2025',
  'SBI జూనియర్ అసోసియేట్స్ 2025',
  'SBI Clerk',
  'State Bank of India',
  'State Bank of India Junior Associates (Customer Support & Sales) recruitment for clerical cadre posts across all circles including Hyderabad circle. Past vacancy (2023): 8,773 posts.',
  20, 28,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['degree','btech'],
  750, 750, 0, 750,
  '2025-11-01', '2025-11-05', '2025-11-25',
  '2026-01-10', '2026-04-01',
  NULL,
  'https://sbi.co.in/careers', NULL,
  ARRAY['#Degree','#BTech','#Banking','#GovtJobs','#SBI','#BankClerk'],
  'banking', 'All India',
  true, true, 'expected'
),

-- ── 25. SSC MTS & Havaldar 2025 (Expected) ───────────────────────────────
(
  'ssc-mts-2025',
  'SSC MTS & Havaldar 2025',
  'SSC MTS 2025',
  'SSC MTS',
  'Staff Selection Commission',
  'Multi Tasking Staff and Havaldar (CBIC & CBN) recruitment for Group C non-gazetted, non-ministerial posts in Central Government offices. Open to 10th pass candidates. Past vacancy (2024): 9,583 posts.',
  18, 25,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 3}'::jsonb,
  ARRAY['10th'],
  100, 100, 0, 100,
  '2025-06-01', '2025-06-05', '2025-07-05',
  '2025-10-01', '2026-01-01',
  NULL,
  'https://ssc.gov.in', 'https://ssc.gov.in',
  ARRAY['#10thPass','#GovtJobs','#SSC','#MTS','#CentralGovt','#Havaldar'],
  'govt_jobs', 'All India',
  true, true, 'expected'
),

-- ── 26. UPSC NDA & NA Exam I 2026 (Expected — Feb notification every year)
(
  'upsc-nda-1-2026',
  'NDA & NA Examination I 2026',
  'NDA & NA పరీక్ష I 2026',
  'NDA I 2026',
  'UPSC',
  'National Defence Academy and Naval Academy Examination I 2026 for admission to Army, Navy and Air Force wings of NDA. Notification expected January 2026. Past vacancy (2025): 404 posts.',
  16, 19,
  '{}'::jsonb,
  ARRAY['inter','10th'],
  100, 100, 0, 100,
  '2026-01-07', '2026-01-07', '2026-01-27',
  '2026-04-19', '2026-07-01',
  NULL,
  'https://upsc.gov.in', NULL,
  ARRAY['#Inter','#10thPass','#Defence','#NDA','#Army','#Navy','#AirForce'],
  'defence', 'All India',
  true, false, 'expected'
),

-- ── 27. TS PGECET 2025 (Live — M.Tech entrance) ──────────────────────────
(
  'ts-pgecet-2025',
  'TS PGECET 2025',
  'తెలంగాణ PGECET 2025',
  'TS PGECET',
  'TSCHE / Osmania University',
  'Telangana State Post Graduate Engineering Common Entrance Test for admission to M.Tech, M.Pharmacy and M.Arch courses in Telangana universities and colleges. Seats vary by college.',
  NULL, NULL,
  '{}'::jsonb,
  ARRAY['btech','degree'],
  800, 800, 400, 800,
  '2025-03-01', '2025-03-05', '2025-04-10',
  '2025-05-28', '2025-06-25',
  NULL,
  'https://tspgecet.nic.in', 'https://tspgecet.nic.in',
  ARRAY['#BTech','#Engineering','#PGECET','#MTech','#Telangana','#PGEntrance'],
  'engineering', 'Telangana',
  true, false, 'live'
),

-- ── 28. IBPS Specialist Officer (SO) 2025 (Expected) ─────────────────────
(
  'ibps-so-2025',
  'IBPS Specialist Officer CRP SPL XIV 2025',
  'IBPS స్పెషలిస్ట్ ఆఫీసర్ 2025',
  'IBPS SO',
  'IBPS',
  'Institute of Banking Personnel Selection Specialist Officer recruitment for IT Officer, Agriculture Field Officer, Rajbhasha Adhikari, Law Officer, HR/Personnel Officer and Marketing Officer posts. Past vacancy (2024): 1,500 posts.',
  20, 30,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10}'::jsonb,
  ARRAY['degree','btech','mtech','mba'],
  850, 850, 175, 175,
  '2025-11-15', '2025-11-20', '2025-12-10',
  '2026-01-25', '2026-04-01',
  NULL,
  'https://ibps.in', NULL,
  ARRAY['#Degree','#BTech','#MBA','#Banking','#GovtJobs','#IBPS','#SO'],
  'banking', 'All India',
  true, false, 'expected'
),

-- ── 29. RRB ALP & Technician 2025 (Expected) ─────────────────────────────
(
  'rrb-alp-2025',
  'RRB ALP & Technician 2025',
  'RRB ALP & టెక్నీషియన్ 2025',
  'RRB ALP',
  'Railway Recruitment Board',
  'Assistant Loco Pilot and Technician posts recruitment across all Railway Recruitment Board zones. Requires ITI or Diploma qualification. Past vacancy (2024): 18,799 posts.',
  18, 33,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['10th','inter','diploma'],
  500, 500, 250, 250,
  '2025-08-01', '2025-08-10', '2025-09-10',
  '2025-12-15', NULL,
  NULL,
  'https://indianrailways.gov.in', 'https://rrbapply.gov.in',
  ARRAY['#10thPass','#Diploma','#Railways','#GovtJobs','#ALP','#Technician','#ITI'],
  'railways', 'All India',
  true, true, 'expected'
),

-- ── 30. TSPSC Degree College Lecturer 2025 (Expected) ────────────────────
(
  'tspsc-degree-lecturer-2025',
  'TSPSC Degree College Lecturer 2025',
  'TSPSC డిగ్రీ కాలేజ్ లెక్చరర్ 2025',
  'TSPSC Lecturer',
  'TSPSC',
  'Recruitment for Lecturers in Government Degree Colleges across Telangana in various subjects including Telugu, English, Mathematics, Physics, Chemistry, Commerce and Economics. Past vacancy (2022): 1,392 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['mtech','mba','mca','phd','degree'],
  200, 150, 100, 100,
  '2025-12-01', '2025-12-10', '2026-01-10',
  '2026-04-01', '2026-08-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Degree','#MTech','#PhD','#Teaching','#TSPSC','#Lecturer','#GovtJobs','#CollegeJobs'],
  'teaching', 'Telangana',
  true, false, 'expected'
);

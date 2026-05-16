-- ExamAlert Telangana — Migration 004
-- 10 more accurate 2025/2026 exams (batch 2)
-- Run in Supabase SQL Editor AFTER 003.
-- Vacancies set to NULL (TBA) — past vacancy shown in description for reference.
--
-- Sources:
--   TS DSC      → schooleducation.telangana.gov.in
--   TSPSC G3    → tspsc.gov.in
--   TSPSC AEE   → tspsc.gov.in
--   IBPS Clerk  → ibps.in
--   RRB Group D → rrbapply.gov.in
--   NDA II      → upsc.gov.in
--   NEET UG     → nta.ac.in/neet
--   TS EAMCET   → tseamcet.nic.in
--   SSC CHSL    → ssc.gov.in
--   IBPS RRB    → ibps.in

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

-- ── 11. TS DSC 2025 ───────────────────────────────────────────────────────
(
  'ts-dsc-2025',
  'Telangana DSC 2025 (Teacher Recruitment)',
  'తెలంగాణ DSC 2025 ఉపాధ్యాయ నియామకం',
  'TS DSC',
  'Telangana School Education Dept',
  'District Selection Committee teacher recruitment for SGT, SA, LP, PET and other teaching posts in government schools across Telangana. Past vacancy (2022): 11,000 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "PH": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['degree','btech','diploma','inter'],
  300, 200, 150, 150,
  '2025-09-01', '2025-09-10', '2025-10-10',
  '2026-01-15', '2026-05-01',
  NULL,
  'https://schooleducation.telangana.gov.in', NULL,
  ARRAY['#Degree','#Teaching','#DSC','#GovtJobs','#TeacherJobs','#SGT','#SA'],
  'teaching', 'Telangana',
  true, true, 'expected'
),

-- ── 12. TSPSC Group 3 2025 ───────────────────────────────────────────────
(
  'tspsc-group-3-2025',
  'TSPSC Group 3 Services 2025',
  'TSPSC గ్రూప్ 3 సర్వీసెస్ 2025',
  'Group 3',
  'TSPSC',
  'Recruitment for Junior Assistant, Typist, Junior Steno and other clerical posts under various Telangana government departments. Past vacancy (2022): ~2,500 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['inter','degree','diploma'],
  120, 80, 60, 60,
  '2025-09-15', '2025-09-20', '2025-10-20',
  '2026-01-20', '2026-05-15',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#Inter','#Degree','#GovtJobs','#TSPSC','#GroupThree','#JuniorAssistant'],
  'psc', 'Telangana',
  true, false, 'expected'
),

-- ── 13. TSPSC AEE 2025 ───────────────────────────────────────────────────
(
  'tspsc-aee-2025',
  'TSPSC Assistant Executive Engineer 2025',
  'TSPSC అసిస్టెంట్ ఎగ్జిక్యూటివ్ ఇంజనీర్ 2025',
  'TSPSC AEE',
  'TSPSC',
  'Recruitment for Assistant Executive Engineers in Civil, Mechanical, Electrical and Electronics disciplines across Telangana government departments including Irrigation, Roads & Buildings. Past vacancy (2022): 1,540 posts.',
  18, 44,
  '{"SC": 5, "ST": 5, "BC": 5, "EWS": 10}'::jsonb,
  ARRAY['btech','mtech'],
  200, 150, 100, 100,
  '2025-10-01', '2025-10-10', '2025-11-10',
  '2026-02-15', '2026-06-01',
  NULL,
  'https://tspsc.gov.in', NULL,
  ARRAY['#BTech','#Engineering','#TSPSC','#AEE','#GovtJobs','#Civil','#Mechanical'],
  'engineering', 'Telangana',
  true, true, 'expected'
),

-- ── 14. IBPS Clerk 2025 ──────────────────────────────────────────────────
(
  'ibps-clerk-2025',
  'IBPS Clerk CRP XIV 2025',
  'IBPS క్లర్క్ 2025',
  'IBPS Clerk',
  'IBPS',
  'Institute of Banking Personnel Selection Clerk recruitment for public sector banks. Prelims expected November 2025, Mains in January 2026. Past vacancy (2023): 6,128 posts.',
  20, 28,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['degree','btech'],
  700, 700, 0, 700,
  '2025-09-01', '2025-09-05', '2025-09-25',
  '2025-11-08', '2026-02-01',
  NULL,
  'https://ibps.in', NULL,
  ARRAY['#Degree','#BTech','#Banking','#GovtJobs','#IBPS','#BankClerk'],
  'banking', 'All India',
  true, true, 'expected'
),

-- ── 15. RRB Group D 2025 ─────────────────────────────────────────────────
(
  'rrb-group-d-2025',
  'RRB Group D 2025',
  'RRB గ్రూప్ D 2025',
  'RRB Group D',
  'Railway Recruitment Board',
  'Level 1 posts recruitment for Track Maintainer, Helper, Assistant Pointsman and other Group D posts across Indian Railways zones. Open to 10th pass candidates. Past vacancy (2022): 32,438 posts.',
  18, 33,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['10th','inter'],
  500, 500, 250, 250,
  '2025-07-15', '2025-07-20', '2025-08-20',
  '2025-12-01', NULL,
  NULL,
  'https://indianrailways.gov.in', 'https://rrbapply.gov.in',
  ARRAY['#10thPass','#Inter','#Railways','#GovtJobs','#GroupD','#TrackMaintainer'],
  'railways', 'All India',
  true, true, 'expected'
),

-- ── 16. NDA & NA Exam II 2025 (Live — confirmed 404 vacancies) ───────────
(
  'upsc-nda-2-2025',
  'NDA & NA Examination II 2025',
  'NDA & NA పరీక్ష II 2025',
  'NDA II 2025',
  'UPSC',
  'National Defence Academy and Naval Academy Examination II 2025 for admission to Army, Navy and Air Force wings of NDA and Indian Naval Academy Course. Only for male candidates (12th pass).',
  16, 19,
  '{}'::jsonb,
  ARRAY['inter','10th'],
  100, 100, 0, 100,
  '2025-05-28', '2025-05-28', '2025-06-17',
  '2025-09-14', '2025-12-01',
  404,
  'https://upsc.gov.in', 'https://upsconline.nic.in',
  ARRAY['#Inter','#10thPass','#Defence','#NDA','#Army','#Navy','#AirForce'],
  'defence', 'All India',
  true, true, 'live'
),

-- ── 17. NEET UG 2026 ─────────────────────────────────────────────────────
(
  'neet-ug-2026',
  'NEET UG 2026',
  'NEET UG 2026',
  'NEET UG',
  'NTA',
  'National Eligibility cum Entrance Test for admission to MBBS, BDS, BAMS, BSMS, BUMS, BHMS and other undergraduate medical courses across India including Telangana government colleges. Seats vary by college.',
  17, NULL,
  '{}'::jsonb,
  ARRAY['inter'],
  1700, 1700, 1000, 1700,
  '2026-02-01', '2026-02-05', '2026-03-15',
  '2026-05-03', '2026-06-15',
  NULL,
  'https://nta.ac.in/neet', NULL,
  ARRAY['#Inter','#Medical','#NEET','#MBBS','#BDS','#Doctor','#MedicalEntrance'],
  'medical', 'All India',
  true, true, 'expected'
),

-- ── 18. TS EAMCET 2026 ───────────────────────────────────────────────────
(
  'ts-eamcet-2026',
  'TS EAMCET 2026',
  'తెలంగాణ EAMCET 2026',
  'TS EAMCET',
  'TSCHE / JNTU Hyderabad',
  'Telangana State Engineering Agriculture and Medical Common Entrance Test for admission to B.Tech, B.Pharmacy, B.Sc Agriculture and allied courses in Telangana universities and colleges. Seats vary by college.',
  NULL, NULL,
  '{}'::jsonb,
  ARRAY['inter'],
  800, 800, 400, 800,
  '2026-03-01', '2026-03-05', '2026-04-05',
  '2026-05-10', '2026-06-01',
  NULL,
  'https://tseamcet.nic.in', NULL,
  ARRAY['#Inter','#Engineering','#EAMCET','#BTech','#Telangana','#EngineeringEntrance'],
  'engineering', 'Telangana',
  true, true, 'expected'
),

-- ── 19. SSC CHSL 2025 (Live — confirmed 3,712 vacancies) ─────────────────
(
  'ssc-chsl-2025',
  'SSC CHSL 2025',
  'SSC CHSL 2025',
  'SSC CHSL',
  'Staff Selection Commission',
  'Combined Higher Secondary Level Examination for Lower Division Clerk, Junior Secretariat Assistant, Postal Assistant, Sorting Assistant and Data Entry Operator posts in Central Govt.',
  18, 27,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 3}'::jsonb,
  ARRAY['inter'],
  100, 100, 0, 100,
  '2025-03-01', '2025-03-08', '2025-04-07',
  '2025-07-01', '2025-10-01',
  3712,
  'https://ssc.gov.in', 'https://ssc.gov.in',
  ARRAY['#Inter','#GovtJobs','#SSC','#CHSL','#LDC','#CentralGovt','#DataEntry'],
  'govt_jobs', 'All India',
  true, true, 'live'
),

-- ── 20. IBPS RRB 2025 ────────────────────────────────────────────────────
(
  'ibps-rrb-2025',
  'IBPS RRB Officer & Office Assistant 2025',
  'IBPS RRB 2025',
  'IBPS RRB',
  'IBPS',
  'Regional Rural Banks recruitment for Officer Scale I (PO) and Office Assistant (Clerk) posts. Covers all RRBs including Telangana Grameena Bank and Andhra Pradesh Grameena Vikas Bank. Past vacancy (2024): ~9,000 posts.',
  18, 30,
  '{"SC": 5, "ST": 5, "OBC": 3, "PH": 10, "Ex-Servicemen": 5}'::jsonb,
  ARRAY['degree','btech'],
  700, 700, 0, 700,
  '2025-06-10', '2025-06-15', '2025-07-05',
  '2025-08-03', '2025-11-01',
  NULL,
  'https://ibps.in', NULL,
  ARRAY['#Degree','#BTech','#Banking','#GovtJobs','#IBPS','#RRB','#RuralBank'],
  'banking', 'All India',
  true, true, 'expected'
);

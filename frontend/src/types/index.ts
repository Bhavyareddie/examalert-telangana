export type Qualification = '10th' | 'inter' | 'diploma' | 'degree' | 'btech' | 'mtech' | 'mba' | 'mca' | 'phd' | 'other';
export type Category = 'general' | 'obc' | 'sc' | 'st' | 'ews' | 'bc_a' | 'bc_b' | 'bc_c' | 'bc_d' | 'bc_e';
export type ExamCategory = 'govt_jobs' | 'banking' | 'railways' | 'teaching' | 'police' | 'engineering' | 'medical' | 'defence' | 'psc' | 'upsc' | 'other';
export type ExamStatus = 'live' | 'expected' | 'completed';
export type Language = 'en' | 'te' | 'hi';

export interface Exam {
  id: string;
  slug: string;
  name: string;
  name_te?: string;
  name_hi?: string;
  short_name?: string;
  conducting_body: string;
  description?: string;
  description_te?: string;
  min_age?: number;
  max_age?: number;
  age_relaxation?: Record<string, number>;
  qualifications: Qualification[];
  min_percentage?: number;
  eligible_categories?: Category[];
  fee_general: number;
  fee_obc: number;
  fee_sc_st: number;
  fee_ews: number;
  notification_date?: string;
  application_start?: string;
  application_end?: string;
  fee_payment_end?: string;
  correction_window_start?: string;
  correction_window_end?: string;
  admit_card_date?: string;
  exam_date?: string;
  exam_date_end?: string;
  result_date?: string;
  counseling_date?: string;
  official_website?: string;
  apply_link?: string;
  notification_pdf?: string;
  syllabus_pdf?: string;
  total_vacancies?: number;
  exam_type?: 'written' | 'online' | 'both';
  exam_mode?: 'offline' | 'online' | 'both';
  tags: string[];
  category: ExamCategory;
  state: string;
  exam_status: ExamStatus;
  is_active: boolean;
  is_trending: boolean;
  view_count: number;
  bookmark_count: number;
  created_at: string;
  updated_at: string;
  mock_tests?: MockTest[];
  previous_papers?: PreviousPaper[];
}

export interface MockTest {
  id: string;
  exam_id: string;
  title: string;
  description?: string;
  total_questions: number;
  duration_minutes: number;
  total_marks: number;
  is_free: boolean;
}

export interface PreviousPaper {
  id: string;
  exam_id: string;
  year: number;
  title: string;
  pdf_url: string;
  answer_key_url?: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  date_of_birth?: string;
  age?: number;
  qualification?: Qualification;
  category?: Category;
  district?: string;
  interests: string[];
  skills: string[];
  career_goals: string[];
  preferred_categories: string[];
  is_admin: boolean;
  notifications_email: boolean;
  notifications_push: boolean;
  notifications_whatsapp: boolean;
  whatsapp_number?: string;
  language: Language;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'exam_update' | 'reminder' | 'new_exam' | 'result' | 'general';
  exam_id?: string;
  is_read: boolean;
  created_at: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

export interface ExamFilters {
  search?: string;
  category?: ExamCategory;
  qualification?: Qualification;
  tag?: string;
  min_age?: number;
  max_age?: number;
  sort?: string;
  trending?: boolean;
  status?: 'live' | 'upcoming' | 'closed' | 'result' | '';
}

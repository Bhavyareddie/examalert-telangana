import { notFound } from 'next/navigation';
export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { Calendar, Users, IndianRupee, Clock, ExternalLink, FileText, BookOpen, Download } from 'lucide-react';
import { format } from 'date-fns';
import type { Exam } from '@/types';
import ExamCountdown from '@/components/exams/ExamCountdown';
import ExamBookmarkBtn from '@/components/exams/ExamBookmarkBtn';

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://osyjzrjloqgmnrtgzfwf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zeWp6cmpsb3FnbW5ydGd6ZndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NzM0NDksImV4cCI6MjA5NDQ0OTQ0OX0.gNbNu9LjddSgULPsFdoR2l0p0MO2DxUCELmkpwS1-U0'
);

async function getExam(slug: string): Promise<Exam | null> {
  try {
    const { data, error, count } = await supabase
      .from('exams')
      .select('*', { count: 'exact' })
      .eq('slug', slug);
    console.log('Query result:', { slug, count, error, hasData: !!data?.length });
    if (error) console.error('Supabase error:', error);
    return data?.[0] || null;
  } catch (e) { console.error('getExam error:', e); return null; }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const exam = await getExam(params.slug);
  if (!exam) return { title: 'Exam Not Found' };
  return {
    title: `${exam.name} 2024 - Eligibility, Dates, Apply Online`,
    description: `${exam.name} by ${exam.conducting_body}. Vacancies: ${exam.total_vacancies || 'TBA'}. Last date: ${exam.application_end || 'TBA'}. Check eligibility, fees, syllabus.`,
    keywords: [exam.name, exam.conducting_body, 'Telangana', ...(exam.tags || [])],
  };
}

const dateRow = (label: string, date?: string) => date ? (
  <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
    <span className="text-gray-600 dark:text-gray-400 text-sm">{label}</span>
    <span className="font-medium text-gray-900 dark:text-white text-sm">{format(new Date(date), 'dd MMM yyyy')}</span>
  </div>
) : null;

export default async function ExamDetailPage({ params }: { params: { slug: string } }) {
  const exam = await getExam(params.slug);
  if (!exam) notFound();

  const feeRows = [
    { label: 'General / UR', fee: exam.fee_general },
    { label: 'OBC', fee: exam.fee_obc },
    { label: 'SC / ST', fee: exam.fee_sc_st },
    { label: 'EWS', fee: exam.fee_ews },
  ].filter(r => r.fee !== null && r.fee !== undefined);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                    {exam.category?.replace('_', ' ').toUpperCase()}
                  </span>
                  {exam.is_trending && (
                    <span className="text-xs font-medium px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full">
                      🔥 Trending
                    </span>
                  )}
                  {exam.exam_status === 'live' && (
                    <span className="flex items-center gap-1.5 text-xs font-medium px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live Now
                    </span>
                  )}
                  {exam.exam_status === 'expected' && (
                    <span className="text-xs font-medium px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full">
                      🕐 Expected
                    </span>
                  )}
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{exam.name}</h1>
                <p className="text-gray-600 dark:text-gray-400">{exam.conducting_body}</p>
              </div>
              <ExamBookmarkBtn examId={exam.id} />
            </div>

            {exam.description && (
              <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{exam.description}</p>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {exam.total_vacancies && (
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <Users size={20} className="text-blue-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{exam.total_vacancies.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Vacancies</p>
                </div>
              )}
              {(exam.min_age || exam.max_age) && (
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <Clock size={20} className="text-green-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{exam.min_age}-{exam.max_age}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Age Limit</p>
                </div>
              )}
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <IndianRupee size={20} className="text-purple-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {exam.fee_general === 0 ? 'Free' : `₹${exam.fee_general}`}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Gen Fee</p>
              </div>
              {exam.application_end && (
                <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <Calendar size={20} className="text-red-600 mx-auto mb-1" />
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {format(new Date(exam.application_end), 'dd MMM')}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Last Date</p>
                </div>
              )}
            </div>
          </div>

          {/* Eligibility */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Eligibility Criteria</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Required Qualifications</p>
                <div className="flex flex-wrap gap-2">
                  {(exam.qualifications || []).map(q => (
                    <span key={q} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                      {q}
                    </span>
                  ))}
                </div>
              </div>
              {(exam.min_age || exam.max_age) && (
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Age Limit:</span>
                  <span>{exam.min_age} - {exam.max_age} years</span>
                </div>
              )}
              {exam.age_relaxation && Object.keys(exam.age_relaxation).length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age Relaxation</p>
                  {Object.entries(exam.age_relaxation).map(([cat, years]) => (
                    <p key={cat} className="text-sm text-gray-600 dark:text-gray-400">• {cat}: +{years} years</p>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Application Fee */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Application Fee</h2>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {feeRows.map(({ label, fee }) => (
                <div key={label} className="flex justify-between py-3">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">{label}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{fee === 0 ? 'Free' : `₹${fee}`}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          {(exam.tags || []).length > 0 && (
            <div className="flex flex-wrap gap-2">
              {(exam.tags || []).map(tag => (
                <span key={tag} className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Mock Tests */}
          {exam.mock_tests && exam.mock_tests.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Mock Tests</h2>
              <div className="space-y-3">
                {exam.mock_tests.map(test => (
                  <div key={test.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{test.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {test.total_questions} questions • {test.duration_minutes} mins • {test.total_marks} marks
                      </p>
                    </div>
                    <a href={`/mock-tests/${test.id}`}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${test.is_free ? 'bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-orange-100 hover:bg-orange-200 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'}`}>
                      {test.is_free ? 'Start Free' : 'Premium'}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Previous Papers */}
          {exam.previous_papers && exam.previous_papers.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Previous Year Papers</h2>
              <div className="space-y-3">
                {exam.previous_papers.map(paper => (
                  <div key={paper.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{paper.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{paper.year}</p>
                    </div>
                    <div className="flex gap-2">
                      <a href={paper.pdf_url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Download size={12} /> Paper
                      </a>
                      {paper.answer_key_url && (
                        <a href={paper.answer_key_url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs px-3 py-1.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-blue-400 transition-colors">
                          <Download size={12} /> Key
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Countdown */}
          {exam.application_end && <ExamCountdown deadline={exam.application_end} label="Application Closes In" />}

          {/* Important Dates */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Important Dates</h3>
            <div>
              {dateRow('Notification', exam.notification_date)}
              {dateRow('Application Start', exam.application_start)}
              {dateRow('Application End', exam.application_end)}
              {dateRow('Fee Payment End', exam.fee_payment_end)}
              {dateRow('Correction Window', exam.correction_window_start)}
              {dateRow('Admit Card', exam.admit_card_date)}
              {dateRow('Exam Date', exam.exam_date)}
              {dateRow('Result Date', exam.result_date)}
              {dateRow('Counseling', exam.counseling_date)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {exam.apply_link && (
              <a href={exam.apply_link} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors">
                <ExternalLink size={18} /> Apply Online
              </a>
            )}
            {exam.notification_pdf && (
              <a href={exam.notification_pdf} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 dark:border-gray-600 hover:border-blue-400 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors">
                <FileText size={18} /> Download Notification
              </a>
            )}
            {exam.syllabus_pdf && (
              <a href={exam.syllabus_pdf} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 dark:border-gray-600 hover:border-blue-400 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors">
                <BookOpen size={18} /> Download Syllabus
              </a>
            )}
            {exam.official_website && (
              <a href={exam.official_website} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 dark:border-gray-600 hover:border-blue-400 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-colors">
                <ExternalLink size={16} /> Official Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

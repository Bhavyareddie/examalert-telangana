'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import { Calendar, Users, IndianRupee, Clock, ExternalLink, FileText, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import { createClient } from '@supabase/supabase-js';
import type { Exam } from '@/types';
import ExamCountdown from '@/components/exams/ExamCountdown';

const supabase = createClient(
  'https://osyjzrjloqgmnrtgzfwf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zeWp6cmpsb3FnbW5ydGd6ZndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NzM0NDksImV4cCI6MjA5NDQ0OTQ0OX0.gNbNu9LjddSgULPsFdoR2l0p0MO2DxUCELmkpwS1-U0'
);

const CATEGORIES = [
  { value: 'general', label: 'General / UR' },
  { value: 'obc', label: 'OBC' },
  { value: 'sc', label: 'SC' },
  { value: 'st', label: 'ST' },
  { value: 'ews', label: 'EWS' },
];

const dateRow = (label: string, date?: string) => date ? (
  <div className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
    <span className="text-gray-600 dark:text-gray-400 text-sm">{label}</span>
    <span className="font-medium text-gray-900 dark:text-white text-sm">{format(new Date(date), 'dd MMM yyyy')}</span>
  </div>
) : null;

export default function ExamDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('general');

  useEffect(() => {
    supabase
      .from('exams')
      .select('*')
      .eq('slug', slug)
      .then(({ data, error }) => {
        if (error) console.error(error);
        setExam(data?.[0] || null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    </div>
  );

  if (!exam) return (
    <div className="text-center py-20">
      <p className="text-5xl mb-4">😔</p>
      <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Exam not found</p>
      <a href="/exams" className="text-blue-600 hover:underline">Browse all exams</a>
    </div>
  );

  const getFee = () => {
    switch (selectedCategory) {
      case 'sc': case 'st': return exam.fee_sc_st;
      case 'obc': return exam.fee_obc ?? exam.fee_general;
      case 'ews': return exam.fee_ews ?? exam.fee_general;
      default: return exam.fee_general;
    }
  };

  const fee = getFee();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                {exam.category?.replace('_', ' ').toUpperCase()}
              </span>
              {exam.is_trending && <span className="text-xs font-medium px-3 py-1 bg-orange-100 text-orange-700 rounded-full">🔥 Trending</span>}
              {exam.exam_status === 'live' && <span className="text-xs font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full">🟢 Live</span>}
              {exam.exam_status === 'expected' && <span className="text-xs font-medium px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">🕐 Expected</span>}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{exam.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{exam.conducting_body}</p>
            {exam.description && <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{exam.description}</p>}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {exam.total_vacancies && (
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <Users size={20} className="text-blue-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{exam.total_vacancies.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Vacancies</p>
                </div>
              )}
              {(exam.min_age || exam.max_age) && (
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <Clock size={20} className="text-green-600 mx-auto mb-1" />
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{exam.min_age}-{exam.max_age}</p>
                  <p className="text-xs text-gray-500">Age Limit</p>
                </div>
              )}
              <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <IndianRupee size={20} className="text-purple-600 mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900 dark:text-white">{fee === 0 ? 'Free' : `₹${fee}`}</p>
                <p className="text-xs text-gray-500">Fee</p>
              </div>
              {exam.application_end && (
                <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <Calendar size={20} className="text-red-600 mx-auto mb-1" />
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{format(new Date(exam.application_end), 'dd MMM')}</p>
                  <p className="text-xs text-gray-500">Last Date</p>
                </div>
              )}
            </div>
          </div>

          {/* Eligibility */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Eligibility Criteria</h2>
            <div className="space-y-3">
              {(exam.qualifications || []).length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Required Qualifications</p>
                  <div className="flex flex-wrap gap-2">
                    {(exam.qualifications || []).map(q => (
                      <span key={q} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">{q}</span>
                    ))}
                  </div>
                </div>
              )}
              {(exam.min_age || exam.max_age) && (
                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Age Limit:</span>
                  <span>{exam.min_age} - {exam.max_age} years</span>
                </div>
              )}
            </div>
          </div>

          {/* Application Fee with Category Selector */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Application Fee</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select your category:</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button key={cat.value} onClick={() => setSelectedCategory(cat.value)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat.value ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'}`}>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Fee for {CATEGORIES.find(c => c.value === selectedCategory)?.label}</p>
              <p className="text-3xl font-bold text-blue-600">{fee === 0 ? 'Free' : `₹${fee}`}</p>
            </div>
            <div className="mt-4 divide-y divide-gray-100 dark:divide-gray-700">
              {[
                { label: 'General / UR', fee: exam.fee_general },
                { label: 'OBC', fee: exam.fee_obc },
                { label: 'SC / ST', fee: exam.fee_sc_st },
                { label: 'EWS', fee: exam.fee_ews },
              ].filter(r => r.fee !== null && r.fee !== undefined).map(({ label, fee }) => (
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
                <span key={tag} className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {exam.application_end && <ExamCountdown deadline={exam.application_end} label="Application Closes In" />}

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Important Dates</h3>
            <div>
              {dateRow('Notification', exam.notification_date)}
              {dateRow('Application Start', exam.application_start)}
              {dateRow('Application End', exam.application_end)}
              {dateRow('Admit Card', exam.admit_card_date)}
              {dateRow('Exam Date', exam.exam_date)}
              {dateRow('Result Date', exam.result_date)}
            </div>
          </div>

          <div className="space-y-3">
            {exam.apply_link && (
              <a href={exam.apply_link} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors">
                <ExternalLink size={18} /> Apply Online
              </a>
            )}
            {exam.notification_pdf && (
              <a href={exam.notification_pdf} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:border-blue-400 transition-colors">
                <FileText size={18} /> Download Notification
              </a>
            )}
            {exam.official_website && (
              <a href={exam.official_website} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:border-blue-400 transition-colors">
                <ExternalLink size={16} /> Official Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

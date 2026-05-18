'use client';
import Link from 'next/link';
import { Calendar, Users, IndianRupee, Clock, Bookmark, BookmarkCheck, ExternalLink, TrendingUp, Bell } from 'lucide-react';
import { isPast, isFuture, format, differenceInDays } from 'date-fns';
import { useState } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/hooks/useTranslation';
import type { Exam } from '@/types';
import toast from 'react-hot-toast';

const CATEGORY_COLORS: Record<string, string> = {
  psc: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  banking: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  railways: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  police: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  teaching: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  defence: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  upsc: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  govt_jobs: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  default: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
};

// Compute smart exam status from dates
function getExamStatus(exam: Exam) {
  const now = new Date();
  const appStart = exam.application_start ? new Date(exam.application_start) : null;
  const appEnd = exam.application_end ? new Date(exam.application_end) : null;
  const examDate = exam.exam_date ? new Date(exam.exam_date) : null;
  const resultDate = exam.result_date ? new Date(exam.result_date) : null;

  if (resultDate && isPast(resultDate)) return 'result_out';
  if (examDate && isPast(examDate) && (!resultDate || isFuture(resultDate))) return 'exam_over';
  if (appEnd && isPast(appEnd)) return 'closed';
  if (appStart && isFuture(appStart)) return 'upcoming';
  if (appStart && isPast(appStart) && appEnd && isFuture(appEnd)) return 'live';
  if (!appStart && appEnd && isFuture(appEnd)) return 'live';
  return 'expected';
}

const STATUS_CONFIG = {
  live: { label: '🟢 Apply Now', cls: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300', dot: true },
  upcoming: { label: '🔔 Opening Soon', cls: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300', dot: false },
  expected: { label: '📋 Expected', cls: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300', dot: false },
  closed: { label: '🔴 Closed', cls: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300', dot: false },
  exam_over: { label: '📝 Exam Done', cls: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400', dot: false },
  result_out: { label: '🏆 Result Out', cls: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300', dot: false },
};

interface Props {
  exam: Exam;
  isBookmarked?: boolean;
  onBookmarkChange?: (id: string, bookmarked: boolean) => void;
}

export default function ExamCard({ exam, isBookmarked = false, onBookmarkChange }: Props) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { t } = useTranslation();

  const status = getExamStatus(exam);
  const statusConfig = STATUS_CONFIG[status];

  const appEnd = exam.application_end ? new Date(exam.application_end) : null;
  const appStart = exam.application_start ? new Date(exam.application_start) : null;
  const examDate = exam.exam_date ? new Date(exam.exam_date) : null;

  // Days left to apply
  const daysToApply = appEnd && status === 'live'
    ? differenceInDays(appEnd, new Date())
    : null;

  // Days until opens
  const daysToOpen = appStart && status === 'upcoming'
    ? differenceInDays(appStart, new Date())
    : null;

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) { toast.error('Please login to bookmark'); return; }
    setLoading(true);
    try {
      const { data } = await api.post(`/exams/${exam.id}/bookmark`);
      setBookmarked(data.bookmarked);
      onBookmarkChange?.(exam.id, data.bookmarked);
      toast.success(data.bookmarked ? 'Bookmarked!' : 'Removed from bookmarks');
    } catch {
      toast.error('Failed to bookmark');
    } finally {
      setLoading(false);
    }
  };

  const colorClass = CATEGORY_COLORS[exam.category] || CATEGORY_COLORS.default;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 overflow-hidden group animate-fade-in">

      {/* Urgency Banner — only when closing in 3 days */}
      {daysToApply !== null && daysToApply <= 3 && daysToApply >= 0 && (
        <div className="bg-red-500 text-white text-xs font-bold text-center py-1.5 px-3 animate-pulse-slow">
          ⚠️ Last {daysToApply === 0 ? 'day' : `${daysToApply} days`} to apply!
        </div>
      )}

      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Badges Row */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${colorClass}`}>
                {t.exam_categories?.[exam.category] || exam.category}
              </span>
              {/* Smart Status Badge */}
              <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusConfig.cls}`}>
                {statusConfig.dot && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
                {statusConfig.label}
              </span>
              {exam.is_trending && (
                <span className="flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                  <TrendingUp size={10} /> Trending
                </span>
              )}
            </div>

            <Link href={`/exams/${exam.slug}`}>
              <h3 className="font-bold text-gray-900 dark:text-white text-base leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {exam.name}
              </h3>
            </Link>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{exam.conducting_body}</p>
          </div>
          <button onClick={handleBookmark} disabled={loading}
            className="flex-shrink-0 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            {bookmarked
              ? <BookmarkCheck size={20} className="text-blue-600" />
              : <Bookmark size={20} className="text-gray-400 hover:text-blue-600" />}
          </button>
        </div>
      </div>

      {/* Smart Date Display based on status */}
      <div className="px-5 pb-4 grid grid-cols-2 gap-3">

        {/* Date info — smart based on status */}
        {status === 'live' && (
          <div className="flex items-center gap-2 col-span-2 bg-green-50 dark:bg-green-900/10 rounded-xl p-2.5">
            <Calendar size={14} className="text-green-600 flex-shrink-0" />
            <div className="flex gap-4">
              {appStart && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Registration start</p>
                  <p className="text-sm font-bold text-green-700 dark:text-green-400">
                    {format(appStart, 'dd MMM yyyy')}
                  </p>
                </div>
              )}
              {appEnd && (
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Last date</p>
                  <p className="text-sm font-bold text-green-700 dark:text-green-400">
                    {format(appEnd, 'dd MMM yyyy')}
                    {daysToApply !== null && (
                      <span className="ml-1 text-xs font-normal text-gray-500">
                        ({daysToApply}d left)
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {status === 'upcoming' && appStart && (
          <div className="flex items-center gap-2 col-span-2 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl p-2.5">
            <Bell size={14} className="text-yellow-600 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Registration opens</p>
              <p className="text-sm font-bold text-yellow-700 dark:text-yellow-400">
                {format(appStart, 'dd MMM yyyy')}
                {daysToOpen !== null && (
                  <span className="ml-2 text-xs font-normal text-gray-500">
                    (in {daysToOpen} days)
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        {status === 'expected' && (
          <div className="flex items-center gap-2 col-span-2 bg-blue-50 dark:bg-blue-900/10 rounded-xl p-2.5">
            <Bell size={14} className="text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Notification expected</p>
              <p className="text-sm font-bold text-blue-700 dark:text-blue-400">
                {exam.notification_date
                  ? format(new Date(exam.notification_date), 'dd MMM yyyy')
                  : 'Coming soon — Set alert to get notified'}
              </p>
            </div>
          </div>
        )}

        {status === 'closed' && examDate && isFuture(examDate) && (
          <div className="flex items-center gap-2 col-span-2 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-2.5">
            <Calendar size={14} className="text-gray-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Exam date</p>
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                {format(examDate, 'dd MMM yyyy')}
                <span className="ml-2 text-xs font-normal text-gray-500">
                  (in {differenceInDays(examDate, new Date())} days)
                </span>
              </p>
            </div>
          </div>
        )}

        {status === 'result_out' && exam.result_date && (
          <div className="flex items-center gap-2 col-span-2 bg-purple-50 dark:bg-purple-900/10 rounded-xl p-2.5">
            <Calendar size={14} className="text-purple-600 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Result declared on</p>
              <p className="text-sm font-bold text-purple-700 dark:text-purple-400">
                {format(new Date(exam.result_date), 'dd MMM yyyy')}
              </p>
            </div>
          </div>
        )}

        {/* Vacancies */}
        {exam.total_vacancies && (
          <div className="flex items-center gap-2">
            <Users size={14} className="text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Vacancies</p>
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                {exam.total_vacancies.toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* Age */}
        {(exam.min_age || exam.max_age) && (
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Age limit</p>
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                {exam.min_age}-{exam.max_age} yrs
              </p>
            </div>
          </div>
        )}

        {/* Fee */}
        <div className="flex items-center gap-2">
          <IndianRupee size={14} className="text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Fee</p>
            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
              {exam.fee_general === 0 ? 'Free' : `₹${exam.fee_general}`}
            </p>
          </div>
        </div>
      </div>

      {/* Qualifications */}
      <div className="px-5 pb-4">
        <div className="flex flex-wrap gap-1.5">
          {(exam.qualifications || []).slice(0, 4).map(q => (
            <span key={q} className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full">
              {t.qualifications?.[q] || q}
            </span>
          ))}
          {(exam.qualifications || []).length > 4 && (
            <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-full">
              +{(exam.qualifications || []).length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Progress bar — only for live exams */}
      {status === 'live' && daysToApply !== null && appStart && (
        <div className="px-5 pb-3">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all ${daysToApply <= 3 ? 'bg-red-500' : daysToApply <= 7 ? 'bg-orange-500' : 'bg-green-500'}`}
              style={{
                width: `${Math.max(5, Math.min(100, (daysToApply / Math.max(1, differenceInDays(appEnd!, appStart))) * 100))}%`
              }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {daysToApply <= 3 ? '⚠️ Closing very soon!' : daysToApply <= 7 ? '⏰ Closing this week' : `${daysToApply} days left to apply`}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="px-5 pb-5 flex gap-2">
        <Link href={`/exams/${exam.slug}`}
          className="flex-1 text-center py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
          View Details
        </Link>
        {status === 'live' && exam.apply_link && (
          <a href={exam.apply_link} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 py-2.5 px-3 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors">
            <ExternalLink size={14} /> Apply
          </a>
        )}
        {(status === 'upcoming' || status === 'expected') && (
          <button onClick={handleBookmark}
            className="flex items-center gap-1 py-2.5 px-3 border border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            <Bell size={14} /> Alert
          </button>
        )}
      </div>
    </div>
  );
}

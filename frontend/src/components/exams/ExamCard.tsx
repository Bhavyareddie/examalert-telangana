'use client';
import Link from 'next/link';
import { Calendar, Users, IndianRupee, Clock, Bookmark, BookmarkCheck, ExternalLink, TrendingUp } from 'lucide-react';
import { formatDistanceToNow, isPast, format } from 'date-fns';
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
  default: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
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

  const deadline = exam.application_end ? new Date(exam.application_end) : null;
  const isExpired = deadline ? isPast(deadline) : false;
  const daysLeft = deadline && !isExpired
    ? Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
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
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${colorClass}`}>
                {t.exam_categories?.[exam.category] || exam.category}
              </span>
              {exam.is_trending && (
                <span className="flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                  <TrendingUp size={10} /> Trending
                </span>
              )}
              {exam.exam_status === 'live' && (
                <span className="flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live
                </span>
              )}
              {exam.exam_status === 'expected' && (
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                  Expected
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

      {/* Stats Grid */}
      <div className="px-5 pb-4 grid grid-cols-2 gap-3">
        {exam.exam_status === 'expected' && exam.application_start ? (
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-yellow-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Registration Start</p>
              <p className="text-xs font-semibold text-yellow-600 dark:text-yellow-400">
                {format(new Date(exam.application_start), 'dd MMM yyyy')}
              </p>
            </div>
          </div>
        ) : deadline ? (
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.exam.last_date}</p>
              <p className={`text-xs font-semibold ${isExpired ? 'text-red-500' : daysLeft && daysLeft <= 7 ? 'text-orange-500' : 'text-gray-800 dark:text-gray-200'}`}>
                {isExpired ? t.exam.expired : `${daysLeft} ${t.exam.days_left}`}
              </p>
            </div>
          </div>
        ) : null}

        {exam.exam_status === 'expected' && exam.application_end && (
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-red-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Registration End</p>
              <p className="text-xs font-semibold text-red-500 dark:text-red-400">
                {format(new Date(exam.application_end), 'dd MMM yyyy')}
              </p>
            </div>
          </div>
        )}

        {exam.total_vacancies && (
          <div className="flex items-center gap-2">
            <Users size={14} className="text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.exam.vacancies}</p>
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{exam.total_vacancies.toLocaleString()}</p>
            </div>
          </div>
        )}

        {(exam.min_age || exam.max_age) && (
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-gray-400 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.exam.age_limit}</p>
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                {exam.min_age}-{exam.max_age} yrs
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <IndianRupee size={14} className="text-gray-400 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{t.exam.fee}</p>
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
              +{(exam.qualifications || []).length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Deadline Bar */}
      {daysLeft !== null && daysLeft <= 30 && !isExpired && (
        <div className="px-5 pb-3">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all ${daysLeft <= 7 ? 'bg-red-500' : daysLeft <= 15 ? 'bg-orange-500' : 'bg-green-500'}`}
              style={{ width: `${Math.max(5, (daysLeft / 30) * 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {daysLeft <= 7 ? '⚠️ Closing soon!' : `${daysLeft} days remaining`}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="px-5 pb-5 flex gap-2">
        <Link href={`/exams/${exam.slug}`}
          className="flex-1 text-center py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-colors">
          View Details
        </Link>
        {exam.apply_link && (
          <a href={exam.apply_link} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 py-2 px-3 border border-gray-200 dark:border-gray-600 hover:border-blue-400 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl transition-colors">
            <ExternalLink size={14} /> {t.exam.apply_now}
          </a>
        )}
      </div>
    </div>
  );
}

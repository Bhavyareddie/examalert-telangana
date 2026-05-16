'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bookmark, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import ExamCard from '@/components/exams/ExamCard';
import type { Exam } from '@/types';

export default function BookmarksPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading]);

  useEffect(() => {
    if (user) {
      api.get('/exams/user/bookmarks')
        .then(r => setExams(r.data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleBookmarkChange = (id: string, bookmarked: boolean) => {
    if (!bookmarked) setExams(prev => prev.filter(e => e.id !== id));
  };

  if (authLoading || loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 size={32} className="animate-spin text-blue-600" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Bookmark className="text-blue-600" size={28} />
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bookmarked Exams</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{exams.length} saved exams</p>
        </div>
      </div>

      {exams.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <Bookmark size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No bookmarks yet</p>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Save exams you're interested in to find them quickly later.</p>
          <button onClick={() => router.push('/exams')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
            Browse Exams
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exams.map(exam => (
            <ExamCard key={exam.id} exam={exam} isBookmarked={true} onBookmarkChange={handleBookmarkChange} />
          ))}
        </div>
      )}
    </div>
  );
}

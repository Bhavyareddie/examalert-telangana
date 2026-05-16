'use client';
import { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

export default function ExamBookmarkBtn({ examId }: { examId: string }) {
  const [bookmarked, setBookmarked] = useState(false);
  const { user } = useAuth();

  const toggle = async () => {
    if (!user) { toast.error('Please login to bookmark'); return; }
    try {
      const { data } = await api.post(`/exams/${examId}/bookmark`);
      setBookmarked(data.bookmarked);
      toast.success(data.bookmarked ? 'Bookmarked!' : 'Removed');
    } catch { toast.error('Failed'); }
  };

  return (
    <button onClick={toggle} className="p-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-blue-400 transition-colors">
      {bookmarked ? <BookmarkCheck size={22} className="text-blue-600" /> : <Bookmark size={22} className="text-gray-500" />}
    </button>
  );
}

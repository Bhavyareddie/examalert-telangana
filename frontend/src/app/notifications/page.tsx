'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell, CheckCheck, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { formatDistanceToNow } from 'date-fns';
import type { Notification } from '@/types';

const TYPE_COLORS: Record<string, string> = {
  new_exam: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  exam_update: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  result: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  reminder: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  general: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
};

export default function NotificationsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading]);

  useEffect(() => {
    if (user) {
      api.get('/notifications')
        .then(r => setNotifications(r.data))
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user]);

  const markAllRead = async () => {
    await api.put('/notifications/read-all');
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const markRead = async (id: string) => {
    await api.put(`/notifications/${id}/read`);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  if (authLoading || loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 size={32} className="animate-spin text-blue-600" />
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Bell className="text-blue-600" size={28} />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
            {unreadCount > 0 && <p className="text-sm text-blue-600">{unreadCount} unread</p>}
          </div>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
            <CheckCheck size={16} /> Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <Bell size={48} className="text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No notifications yet</p>
          <p className="text-gray-500 dark:text-gray-400">You'll be notified about new exams, results, and updates here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(n => (
            <div key={n.id} onClick={() => !n.is_read && markRead(n.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${n.is_read ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700' : 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-700'}`}>
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.is_read ? 'bg-gray-300 dark:bg-gray-600' : 'bg-blue-600'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${TYPE_COLORS[n.type] || TYPE_COLORS.general}`}>
                      {n.type.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{n.title}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">{n.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

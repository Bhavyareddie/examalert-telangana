'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Users, BookOpen, Bookmark, Bell, Loader2, Upload, Send } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAppStore } from '@/store';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import type { Exam } from '@/types';

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth();
  const { profile } = useAppStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'stats' | 'exams' | 'users' | 'notify'>('stats');
  const [stats, setStats] = useState<any>(null);
  const [exams, setExams] = useState<Exam[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showExamForm, setShowExamForm] = useState(false);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [notifyForm, setNotifyForm] = useState({ title: '', message: '', type: 'general' });

  useEffect(() => {
    if (!authLoading && (!user || !profile?.is_admin)) router.push('/');
  }, [user, authLoading, profile]);

  useEffect(() => {
    if (profile?.is_admin) {
      Promise.all([
        api.get('/admin/stats'),
        api.get('/exams?limit=50'),
      ]).then(([statsRes, examsRes]) => {
        setStats(statsRes.data);
        setExams(examsRes.data.data);
      }).finally(() => setLoading(false));
    }
  }, [profile]);

  const loadUsers = async () => {
    const { data } = await api.get('/admin/users');
    setUsers(data.data);
  };

  useEffect(() => {
    if (activeTab === 'users') loadUsers();
  }, [activeTab]);

  const deleteExam = async (id: string) => {
    if (!confirm('Delete this exam?')) return;
    await api.delete(`/admin/exams/${id}`);
    setExams(prev => prev.filter(e => e.id !== id));
    toast.success('Exam deleted');
  };

  const sendNotification = async () => {
    if (!notifyForm.title || !notifyForm.message) return;
    try {
      const { data } = await api.post('/admin/notifications/broadcast', notifyForm);
      toast.success(`Notification sent to ${data.sent} users`);
      setNotifyForm({ title: '', message: '', type: 'general' });
    } catch {
      toast.error('Failed to send notification');
    }
  };

  if (authLoading || loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 size={32} className="animate-spin text-blue-600" />
    </div>
  );

  const tabs = [
    { id: 'stats', label: 'Dashboard' },
    { id: 'exams', label: 'Exams' },
    { id: 'users', label: 'Users' },
    { id: 'notify', label: 'Notifications' },
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-semibold">Admin</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-6 w-fit">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      {activeTab === 'stats' && stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Exams', value: stats.total_exams, icon: <BookOpen className="text-blue-600" size={24} />, color: 'bg-blue-50 dark:bg-blue-900/20' },
            { label: 'Total Users', value: stats.total_users, icon: <Users className="text-green-600" size={24} />, color: 'bg-green-50 dark:bg-green-900/20' },
            { label: 'Total Bookmarks', value: stats.total_bookmarks, icon: <Bookmark className="text-purple-600" size={24} />, color: 'bg-purple-50 dark:bg-purple-900/20' },
          ].map((s, i) => (
            <div key={i} className={`${s.color} rounded-2xl p-6 border border-gray-200 dark:border-gray-700`}>
              <div className="flex items-center justify-between mb-3">
                {s.icon}
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{s.value?.toLocaleString() || 0}</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Exams Management */}
      {activeTab === 'exams' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600 dark:text-gray-400">{exams.length} exams</p>
            <button onClick={() => { setEditingExam(null); setShowExamForm(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors">
              <Plus size={16} /> Add Exam
            </button>
          </div>

          {showExamForm && (
            <ExamForm
              exam={editingExam}
              onSave={async (data) => {
                try {
                  if (editingExam) {
                    const res = await api.put(`/admin/exams/${editingExam.id}`, data);
                    setExams(prev => prev.map(e => e.id === editingExam.id ? res.data : e));
                    toast.success('Exam updated');
                  } else {
                    const res = await api.post('/admin/exams', data);
                    setExams(prev => [res.data, ...prev]);
                    toast.success('Exam added');
                  }
                  setShowExamForm(false);
                } catch (err: any) {
                  toast.error(err.message);
                }
              }}
              onCancel={() => setShowExamForm(false)}
            />
          )}

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    {['Name', 'Category', 'Last Date', 'Vacancies', 'Status', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-gray-600 dark:text-gray-400 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {exams.map(exam => (
                    <tr key={exam.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900 dark:text-white">{exam.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{exam.conducting_body}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{exam.category}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{exam.application_end || '—'}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{exam.total_vacancies?.toLocaleString() || '—'}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${exam.is_active ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}>
                          {exam.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingExam(exam); setShowExamForm(true); }}
                            className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 rounded-lg transition-colors">
                            <Edit size={14} />
                          </button>
                          <button onClick={() => deleteExam(exam.id)}
                            className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 rounded-lg transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Users */}
      {activeTab === 'users' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {['Email', 'Name', 'Qualification', 'Category', 'Joined', 'Admin'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-gray-600 dark:text-gray-400 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{u.email}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{u.full_name || '—'}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{u.qualification || '—'}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{u.category || '—'}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{new Date(u.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      {u.is_admin && <span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full">Admin</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Broadcast Notification */}
      {activeTab === 'notify' && (
        <div className="max-w-xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white">Broadcast Notification</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Title</label>
              <input value={notifyForm.title} onChange={e => setNotifyForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Notification title"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
              <textarea value={notifyForm.message} onChange={e => setNotifyForm(f => ({ ...f, message: e.target.value }))}
                rows={4} placeholder="Notification message..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Type</label>
              <select value={notifyForm.type} onChange={e => setNotifyForm(f => ({ ...f, type: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                {['general', 'new_exam', 'exam_update', 'result'].map(t => (
                  <option key={t} value={t}>{t.replace('_', ' ')}</option>
                ))}
              </select>
            </div>
            <button onClick={sendNotification} disabled={!notifyForm.title || !notifyForm.message}
              className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-semibold transition-colors">
              <Send size={18} /> Send to All Users
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Inline Exam Form Component
function ExamForm({ exam, onSave, onCancel }: { exam: Exam | null; onSave: (data: any) => void; onCancel: () => void }) {
  const [form, setForm] = useState({
    name: exam?.name || '', slug: exam?.slug || '', conducting_body: exam?.conducting_body || '',
    description: exam?.description || '', category: exam?.category || 'psc',
    min_age: exam?.min_age || '', max_age: exam?.max_age || '',
    fee_general: exam?.fee_general || 0, fee_sc_st: exam?.fee_sc_st || 0,
    total_vacancies: exam?.total_vacancies || '', application_end: exam?.application_end || '',
    exam_date: exam?.exam_date || '', apply_link: exam?.apply_link || '',
    official_website: exam?.official_website || '', is_active: exam?.is_active ?? true,
    is_trending: exam?.is_trending ?? false, qualifications: exam?.qualifications?.join(', ') || '',
    tags: exam?.tags?.join(', ') || '',
    exam_status: exam?.exam_status || 'expected',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...form,
      qualifications: form.qualifications.split(',').map(s => s.trim()).filter(Boolean),
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      min_age: form.min_age ? parseInt(String(form.min_age)) : null,
      max_age: form.max_age ? parseInt(String(form.max_age)) : null,
      total_vacancies: form.total_vacancies ? parseInt(String(form.total_vacancies)) : null,
    });
  };

  const f = (key: string, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <input type={type} value={(form as any)[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">{exam ? 'Edit Exam' : 'Add New Exam'}</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {f('name', 'Exam Name *', 'text', 'TSPSC Group 1')}
        {f('slug', 'Slug *', 'text', 'tspsc-group-1-2024')}
        {f('conducting_body', 'Conducting Body *', 'text', 'TSPSC')}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value as any }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none">
            {['psc', 'banking', 'railways', 'teaching', 'police', 'engineering', 'medical', 'defence', 'upsc', 'govt_jobs', 'other'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        {f('min_age', 'Min Age', 'number', '18')}
        {f('max_age', 'Max Age', 'number', '44')}
        {f('fee_general', 'Fee (General) ₹', 'number', '200')}
        {f('fee_sc_st', 'Fee (SC/ST) ₹', 'number', '100')}
        {f('total_vacancies', 'Total Vacancies', 'number', '500')}
        {f('application_end', 'Application End Date', 'date')}
        {f('exam_date', 'Exam Date', 'date')}
        {f('apply_link', 'Apply Link URL', 'url', 'https://')}
        {f('official_website', 'Official Website', 'url', 'https://')}
        <div className="md:col-span-2">
          {f('qualifications', 'Qualifications (comma separated)', 'text', 'degree, btech, mtech')}
        </div>
        <div className="md:col-span-2">
          {f('tags', 'Tags (comma separated)', 'text', '#Degree, #BTech, #GovtJobs')}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            rows={3} placeholder="Exam description..."
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input type="checkbox" checked={form.is_active} onChange={e => setForm(p => ({ ...p, is_active: e.target.checked }))} className="rounded" />
            Active
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input type="checkbox" checked={form.is_trending} onChange={e => setForm(p => ({ ...p, is_trending: e.target.checked }))} className="rounded" />
            Trending
          </label>
          <div>
            <select value={form.exam_status} onChange={e => setForm(p => ({ ...p, exam_status: e.target.value as any }))}
              className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option value="live">🟢 Live</option>
              <option value="expected">🟡 Expected</option>
              <option value="completed">⚫ Completed</option>
            </select>
          </div>
        </div>
        <div className="md:col-span-2 flex gap-3 pt-2">
          <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-colors">
            {exam ? 'Update Exam' : 'Add Exam'}
          </button>
          <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

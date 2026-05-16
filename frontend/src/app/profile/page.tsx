'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, User, Bell, Globe, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAppStore } from '@/store';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import type { Qualification, Category, Language } from '@/types';
import ExamCard from '@/components/exams/ExamCard';

const QUALIFICATIONS: Qualification[] = ['10th', 'inter', 'diploma', 'degree', 'btech', 'mtech', 'mba', 'mca', 'phd'];
const CATEGORIES: Category[] = ['general', 'obc', 'sc', 'st', 'ews', 'bc_a', 'bc_b', 'bc_c', 'bc_d', 'bc_e'];
const INTERESTS = ['Government Jobs', 'Banking', 'Railways', 'Teaching', 'Police', 'Engineering', 'Medical', 'Defence', 'IT', 'Finance'];
const DISTRICTS = ['Hyderabad', 'Rangareddy', 'Medchal', 'Warangal', 'Karimnagar', 'Nizamabad', 'Khammam', 'Nalgonda', 'Mahbubnagar', 'Adilabad', 'Other'];

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { profile, setProfile } = useAppStore();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'recommendations'>('profile');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingRec, setLoadingRec] = useState(false);

  const [form, setForm] = useState({
    full_name: '', phone: '', date_of_birth: '', qualification: '' as Qualification | '',
    category: 'general' as Category, district: '', interests: [] as string[],
    notifications_email: true, notifications_push: true, notifications_whatsapp: false,
    whatsapp_number: '', language: 'en' as Language,
  });

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading]);

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        date_of_birth: profile.date_of_birth || '',
        qualification: profile.qualification || '',
        category: profile.category || 'general',
        district: profile.district || '',
        interests: profile.interests || [],
        notifications_email: profile.notifications_email ?? true,
        notifications_push: profile.notifications_push ?? true,
        notifications_whatsapp: profile.notifications_whatsapp ?? false,
        whatsapp_number: profile.whatsapp_number || '',
        language: profile.language || 'en',
      });
    }
  }, [profile]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await api.put('/profiles/me', form);
      setProfile(data);
      toast.success('Profile saved!');
    } catch {
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const loadRecommendations = async () => {
    setLoadingRec(true);
    try {
      const { data } = await api.get('/profiles/me/recommendations');
      setRecommendations(data.recommendations);
    } catch {}
    setLoadingRec(false);
  };

  useEffect(() => {
    if (activeTab === 'recommendations') loadRecommendations();
  }, [activeTab]);

  const toggleInterest = (interest: string) => {
    setForm(f => ({
      ...f,
      interests: f.interests.includes(interest)
        ? f.interests.filter(i => i !== interest)
        : [...f.interests, interest],
    }));
  };

  if (authLoading) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'recommendations', label: 'AI Recommendations', icon: <Sparkles size={16} /> },
  ] as const;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          {profile?.avatar_url
            ? <img src={profile.avatar_url} alt="" className="w-16 h-16 rounded-2xl object-cover" />
            : <span className="text-white text-2xl font-bold">{profile?.full_name?.[0] || user?.email?.[0]?.toUpperCase()}</span>}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{profile?.full_name || 'Your Profile'}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{user?.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-6">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400'}`}>
            {tab.icon} <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
              <input value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="+91 9999999999"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Date of Birth</label>
              <input type="date" value={form.date_of_birth} onChange={e => setForm(f => ({ ...f, date_of_birth: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Qualification</label>
              <select value={form.qualification} onChange={e => setForm(f => ({ ...f, qualification: e.target.value as Qualification }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="">Select qualification</option>
                {QUALIFICATIONS.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category</label>
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                {CATEGORIES.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">District</label>
              <select value={form.district} onChange={e => setForm(f => ({ ...f, district: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="">Select district</option>
                {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Interests</label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(interest => (
                <button key={interest} type="button" onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${form.interests.includes(interest) ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
            <div className="flex gap-3">
              {[{ code: 'en', label: 'English' }, { code: 'te', label: 'తెలుగు' }, { code: 'hi', label: 'हिंदी' }].map(l => (
                <button key={l.code} type="button" onClick={() => setForm(f => ({ ...f, language: l.code as Language }))}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${form.language === l.code ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleSave} disabled={saving}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Save Profile
          </button>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-5">
          {[
            { key: 'notifications_email', label: 'Email Notifications', desc: 'Receive exam alerts via email' },
            { key: 'notifications_push', label: 'Push Notifications', desc: 'Browser push notifications' },
            { key: 'notifications_whatsapp', label: 'WhatsApp Alerts', desc: 'Get alerts on WhatsApp' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
              </div>
              <button onClick={() => setForm(f => ({ ...f, [key]: !f[key as keyof typeof f] }))}
                className={`relative w-12 h-6 rounded-full transition-colors ${(form as any)[key] ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${(form as any)[key] ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
          {form.notifications_whatsapp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">WhatsApp Number</label>
              <input value={form.whatsapp_number} onChange={e => setForm(f => ({ ...f, whatsapp_number: e.target.value }))}
                placeholder="+91 9999999999"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          )}
          <button onClick={handleSave} disabled={saving}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Save Preferences
          </button>
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div>
          {loadingRec ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="animate-spin text-blue-600" />
            </div>
          ) : recommendations.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
              <Sparkles size={40} className="text-blue-600 mx-auto mb-4" />
              <p className="font-semibold text-gray-900 dark:text-white mb-2">Complete your profile first</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Add your qualification and age to get AI-powered exam recommendations.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((exam: any) => <ExamCard key={exam.id} exam={exam} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

'use client';
import { useState } from 'react';
import { CheckCircle, Search, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import ExamCard from '@/components/exams/ExamCard';
import { useTranslation } from '@/hooks/useTranslation';
import type { Exam, Qualification, Category } from '@/types';

const QUALIFICATIONS: { value: Qualification; label: string }[] = [
  { value: '10th', label: '10th Pass' },
  { value: 'inter', label: 'Intermediate (12th)' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'degree', label: 'Degree (Graduation)' },
  { value: 'btech', label: 'B.Tech / B.E.' },
  { value: 'mtech', label: 'M.Tech / M.E.' },
  { value: 'mba', label: 'MBA' },
  { value: 'mca', label: 'MCA' },
];

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'general', label: 'General / UR' },
  { value: 'obc', label: 'OBC' },
  { value: 'sc', label: 'SC' },
  { value: 'st', label: 'ST' },
  { value: 'ews', label: 'EWS' },
  { value: 'bc_a', label: 'BC-A' },
  { value: 'bc_b', label: 'BC-B' },
  { value: 'bc_c', label: 'BC-C' },
  { value: 'bc_d', label: 'BC-D' },
  { value: 'bc_e', label: 'BC-E' },
];

export default function EligibilityPage() {
  const [age, setAge] = useState('');
  const [qualification, setQualification] = useState<Qualification | ''>('');
  const [category, setCategory] = useState<Category | ''>('general');
  const [results, setResults] = useState<Exam[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!age || !qualification) return;
    setLoading(true);
    try {
      const { data } = await api.post('/exams/eligibility', { age: parseInt(age), qualification, category });
      setResults(data.eligible_exams);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{t.eligibility.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">{t.eligibility.subtitle}</p>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-8 shadow-sm">
        <form onSubmit={handleCheck} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t.eligibility.age}</label>
              <input
                type="number" value={age} onChange={e => setAge(e.target.value)}
                min="16" max="60" required placeholder="e.g. 24"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none text-lg font-semibold"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t.eligibility.qualification}</label>
              <select value={qualification} onChange={e => setQualification(e.target.value as Qualification)} required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="">Select qualification</option>
                {QUALIFICATIONS.map(q => <option key={q.value} value={q.value}>{q.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">{t.eligibility.category}</label>
              <select value={category} onChange={e => setCategory(e.target.value as Category)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none">
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>
          <button type="submit" disabled={loading || !age || !qualification}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3">
            {loading ? <Loader2 size={22} className="animate-spin" /> : <Search size={22} />}
            {t.eligibility.check}
          </button>
        </form>
      </div>

      {/* Results */}
      {results !== null && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.eligibility.results}</h2>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
              {results.length} found
            </span>
          </div>
          {results.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
              <p className="text-5xl mb-4">😔</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t.eligibility.no_results}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Try a different qualification or check back later for new notifications.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map(exam => <ExamCard key={exam.id} exam={exam} />)}
            </div>
          )}
        </div>
      )}

      {/* Info Cards */}
      {results === null && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {[
            { emoji: '🎓', title: 'After 10th', desc: 'Police Constable, Railway Group D, SSC MTS and more' },
            { emoji: '📚', title: 'After Degree', desc: 'TSPSC Group 1 & 2, Banking PO, Teaching jobs and more' },
            { emoji: '⚙️', title: 'After B.Tech', desc: 'GATE, TSPSC AEE, DRDO, ISRO and engineering jobs' },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 text-center">
              <p className="text-3xl mb-2">{item.emoji}</p>
              <p className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

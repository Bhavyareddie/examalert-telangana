'use client';
import { useState } from 'react';
import { Sparkles, Loader2, BookOpen, Calendar, Target, Lightbulb, ChevronRight } from 'lucide-react';
import api from '@/lib/api';
import type { Qualification } from '@/types';

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

const INTERESTS = ['Government Jobs', 'Banking', 'Railways', 'Teaching', 'Police', 'Engineering', 'Medical', 'Defence', 'IT', 'Finance'];

interface Roadmap {
  exams?: { name: string; timeline: string; eligibility: string }[];
  study_plan?: { month: string; focus: string }[];
  subjects?: string[];
  resources?: string[];
  tips?: string[];
  raw?: string;
}

export default function CareerRoadmapPage() {
  const [form, setForm] = useState({ qualification: '' as Qualification | '', age: '', career_goal: '', interests: [] as string[] });
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  const toggleInterest = (i: string) =>
    setForm(f => ({ ...f, interests: f.interests.includes(i) ? f.interests.filter(x => x !== i) : [...f.interests, i] }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.qualification || !form.age || !form.career_goal) return;
    setLoading(true);
    setRoadmap(null);
    try {
      const { data } = await api.post('/ai/career-roadmap', {
        qualification: form.qualification,
        age: parseInt(form.age),
        career_goal: form.career_goal,
        interests: form.interests,
      });
      setRoadmap(data.roadmap);
    } catch {
      setRoadmap({ raw: 'Failed to generate roadmap. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Sparkles size={32} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">AI Career Roadmap</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Get a personalized exam preparation roadmap powered by AI based on your qualification and career goals.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Qualification *</label>
              <select value={form.qualification} onChange={e => setForm(f => ({ ...f, qualification: e.target.value as Qualification }))} required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none">
                <option value="">Select qualification</option>
                {QUALIFICATIONS.map(q => <option key={q.value} value={q.value}>{q.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Age *</label>
              <input type="number" value={form.age} onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                min="16" max="60" required placeholder="e.g. 24"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Career Goal *</label>
            <input type="text" value={form.career_goal} onChange={e => setForm(f => ({ ...f, career_goal: e.target.value }))}
              required maxLength={200} placeholder="e.g. Become a Deputy Collector, Get a banking job, Join Indian Railways..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Interests (optional)</label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(i => (
                <button key={i} type="button" onClick={() => toggleInterest(i)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${form.interests.includes(i) ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                  {i}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading || !form.qualification || !form.age || !form.career_goal}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3">
            {loading ? <Loader2 size={22} className="animate-spin" /> : <Sparkles size={22} />}
            {loading ? 'Generating your roadmap...' : 'Generate My Roadmap'}
          </button>
        </form>
      </div>

      {/* Results */}
      {roadmap && (
        <div className="space-y-6 animate-fade-in">
          {roadmap.raw && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm">{roadmap.raw}</p>
            </div>
          )}

          {roadmap.exams && roadmap.exams.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="text-blue-600" size={20} />
                <h3 className="font-bold text-gray-900 dark:text-white">Recommended Exams</h3>
              </div>
              <div className="space-y-3">
                {roadmap.exams.map((exam, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
                    <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{exam.name}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">{exam.timeline}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{exam.eligibility}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {roadmap.study_plan && roadmap.study_plan.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="text-green-600" size={20} />
                <h3 className="font-bold text-gray-900 dark:text-white">Study Plan</h3>
              </div>
              <div className="space-y-2">
                {roadmap.study_plan.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <span className="text-xs font-semibold text-green-600 dark:text-green-400 w-20 flex-shrink-0 pt-0.5">{item.month}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.focus}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roadmap.subjects && roadmap.subjects.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="text-purple-600" size={20} />
                  <h3 className="font-bold text-gray-900 dark:text-white">Key Subjects</h3>
                </div>
                <ul className="space-y-2">
                  {roadmap.subjects.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <ChevronRight size={14} className="text-purple-500 flex-shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {roadmap.tips && roadmap.tips.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="text-yellow-500" size={20} />
                  <h3 className="font-bold text-gray-900 dark:text-white">Pro Tips</h3>
                </div>
                <ul className="space-y-2">
                  {roadmap.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-yellow-500 flex-shrink-0 mt-0.5">💡</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {roadmap.resources && roadmap.resources.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Recommended Resources</h3>
              <div className="flex flex-wrap gap-2">
                {roadmap.resources.map((r, i) => (
                  <span key={i} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">{r}</span>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            ⚠️ AI-generated guidance. Please verify all details from official sources before applying.
          </p>
        </div>
      )}
    </div>
  );
}

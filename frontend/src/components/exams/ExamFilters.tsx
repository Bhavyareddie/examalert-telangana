'use client';
import { useTranslation } from '@/hooks/useTranslation';
import type { ExamFilters, ExamCategory, Qualification } from '@/types';

const EXAM_CATEGORIES: ExamCategory[] = ['govt_jobs', 'banking', 'railways', 'teaching', 'police', 'engineering', 'medical', 'defence', 'psc', 'upsc'];
const QUALIFICATIONS: Qualification[] = ['10th', 'inter', 'diploma', 'degree', 'btech', 'mtech', 'mba', 'mca'];
const TAGS = ['#10thPass', '#Inter', '#Degree', '#BTech', '#GovtJobs', '#Banking', '#Railways', '#Engineering', '#Teaching', '#Police'];

const STATUS_OPTIONS = [
  { value: '', label: '📋 All Exams', desc: 'Show everything' },
  { value: 'live', label: '🟢 Live — Apply Now', desc: 'Applications open' },
  { value: 'upcoming', label: '🔔 Opening Soon', desc: 'Not yet started' },
  { value: 'closed', label: '🔴 Closed', desc: 'Applications closed' },
  { value: 'result', label: '🏆 Result Out', desc: 'Results declared' },
];

interface Props {
  filters: ExamFilters;
  onChange: (filters: ExamFilters) => void;
}

export default function ExamFiltersPanel({ filters, onChange }: Props) {
  const { t } = useTranslation();
  const update = (key: keyof ExamFilters, value: any) => onChange({ ...filters, [key]: value || undefined });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-6">
      <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>

      {/* ── Status Filter — MOST IMPORTANT ── */}
      <div>
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">
          Exam Status
        </label>
        <div className="space-y-1.5">
          {STATUS_OPTIONS.map(opt => (
            <button key={opt.value}
              onClick={() => update('status', opt.value)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all border ${
                (filters as any).status === opt.value || (!( filters as any).status && opt.value === '')
                  ? 'bg-blue-600 text-white border-blue-600 font-semibold'
                  : 'border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}>
              <span className="block">{opt.label}</span>
              <span className={`text-xs ${(filters as any).status === opt.value || (!(filters as any).status && opt.value === '') ? 'text-blue-100' : 'text-gray-400'}`}>
                {opt.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Category ── */}
      <div>
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Category</label>
        <div className="space-y-1">
          <button onClick={() => update('category', undefined)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!filters.category ? 'bg-blue-600 text-white font-medium' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
            All Categories
          </button>
          {EXAM_CATEGORIES.map(cat => (
            <button key={cat} onClick={() => update('category', cat)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${filters.category === cat ? 'bg-blue-600 text-white font-medium' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>
              {t.exam_categories?.[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Qualification ── */}
      <div>
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Qualification</label>
        <select value={filters.qualification || ''} onChange={e => update('qualification', e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none">
          <option value="">All Qualifications</option>
          {QUALIFICATIONS.map(q => (
            <option key={q} value={q}>{t.qualifications?.[q] || q}</option>
          ))}
        </select>
      </div>

      {/* ── Tags ── */}
      <div>
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Tags</label>
        <div className="flex flex-wrap gap-2">
          {TAGS.map(tag => (
            <button key={tag} onClick={() => update('tag', filters.tag === tag ? undefined : tag)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${filters.tag === tag ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-blue-400'}`}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── Sort ── */}
      <div>
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Sort By</label>
        <select value={filters.sort || 'id'} onChange={e => update('sort', e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none">
          <option value="id">Default</option>
          <option value="application_end">Last Date</option>
          <option value="exam_date">Exam Date</option>
          <option value="total_vacancies">Most Vacancies</option>
          <option value="view_count">Most Popular</option>
        </select>
      </div>

      {/* ── Reset ── */}
      <button onClick={() => onChange({})}
        className="w-full py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors font-medium">
        Clear All Filters
      </button>
    </div>
  );
}

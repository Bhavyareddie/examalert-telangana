'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import ExamCard from '@/components/exams/ExamCard';
import ExamFiltersPanel from '@/components/exams/ExamFilters';
import type { Exam, ExamFilters } from '@/types';

const supabase = createClient(
  'https://osyjzrjloqgmnrtgzfwf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zeWp6cmpsb3FnbW5ydGd6ZndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NzM0NDksImV4cCI6MjA5NDQ0OTQ0OX0.gNbNu9LjddSgULPsFdoR2l0p0MO2DxUCELmkpwS1-U0'
);

export default function ExamsPage() {
  const searchParams = useSearchParams();
  const [exams, setExams] = useState<Exam[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState<ExamFilters>({
    search: searchParams.get('search') || undefined,
    category: (searchParams.get('category') as any) || undefined,
    qualification: (searchParams.get('qualification') as any) || undefined,
    tag: searchParams.get('tag') || undefined,
    trending: searchParams.get('trending') === 'true' || undefined,
  });

  const [searchInput, setSearchInput] = useState(filters.search || '');

  const fetchExams = useCallback(async (f: ExamFilters, p: number) => {
    setLoading(true);
    try {
      const limit = 12;
      const from = (p - 1) * limit;

      let query = supabase
        .from('exams')
        .select('id,slug,name,conducting_body,min_age,max_age,qualifications,fee_general,fee_sc_st,application_end,exam_date,total_vacancies,tags,category,is_trending,view_count,apply_link,exam_status', { count: 'exact' })
        .eq('is_active', true);

      if (f.search) query = query.ilike('name', `%${f.search}%`);
      if (f.category) query = query.eq('category', f.category);
      if (f.trending) query = query.eq('is_trending', true);
      if (f.qualification) query = query.contains('qualifications', [f.qualification]);
      if (f.tag) query = query.contains('tags', [f.tag]);

      query = query.order('application_end', { ascending: true, nullsFirst: false }).range(from, from + limit - 1);

      const { data, count } = await query;
      setExams(p === 1 ? (data as Exam[] || []) : prev => [...prev, ...(data as Exam[] || [])]);
      setTotal(count || 0);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    setPage(1);
    fetchExams(filters, 1);
  }, [filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(f => ({ ...f, search: searchInput || undefined }));
  };

  const handleFilterChange = (newFilters: ExamFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchExams(filters, nextPage);
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">All Exams</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {loading ? 'Loading...' : `${total} exams found`}
          {filters.search && ` for "${filters.search}"`}
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500">
          <Search size={18} className="text-gray-400" />
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search exams..."
            className="flex-1 outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400"
          />
          {searchInput && (
            <button type="button" onClick={() => { setSearchInput(''); setFilters(f => ({ ...f, search: undefined })); }}>
              <X size={16} className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
          Search
        </button>
        <button type="button" onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors md:hidden ${activeFilterCount > 0 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'}`}>
          <SlidersHorizontal size={18} />
          {activeFilterCount > 0 && <span className="text-xs font-bold">{activeFilterCount}</span>}
        </button>
      </form>

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.category && <FilterChip label={`Category: ${filters.category}`} onRemove={() => setFilters(f => ({ ...f, category: undefined }))} />}
          {filters.qualification && <FilterChip label={`Qual: ${filters.qualification}`} onRemove={() => setFilters(f => ({ ...f, qualification: undefined }))} />}
          {filters.tag && <FilterChip label={filters.tag} onRemove={() => setFilters(f => ({ ...f, tag: undefined }))} />}
          {filters.trending && <FilterChip label="Trending" onRemove={() => setFilters(f => ({ ...f, trending: undefined }))} />}
          <button onClick={() => setFilters({})} className="text-xs text-red-600 hover:underline px-2">Clear all</button>
        </div>
      )}

      <div className="flex gap-8">
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <ExamFiltersPanel filters={filters} onChange={handleFilterChange} />
          </div>
        </aside>

        {showFilters && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">Filters</h3>
                <button onClick={() => setShowFilters(false)}><X size={20} /></button>
              </div>
              <ExamFiltersPanel filters={filters} onChange={(f) => { handleFilterChange(f); setShowFilters(false); }} />
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          {loading && page === 1 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="h-72 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />)}
            </div>
          ) : exams.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No exams found</p>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {exams.map(exam => <ExamCard key={exam.id} exam={exam} />)}
              </div>
              {exams.length < total && (
                <div className="text-center mt-8">
                  <button onClick={loadMore} disabled={loading}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-medium transition-colors">
                    {loading ? 'Loading...' : `Load More (${total - exams.length} remaining)`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
      {label}
      <button onClick={onRemove}><X size={12} /></button>
    </span>
  );
}

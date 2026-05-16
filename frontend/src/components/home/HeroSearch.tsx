'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function HeroSearch() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/exams?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
      <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-xl">
        <div className="flex-1 flex items-center gap-3 px-3">
          <Search size={20} className="text-gray-400 flex-shrink-0" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search exams, jobs, notifications..."
            className="flex-1 text-gray-900 placeholder-gray-400 outline-none text-base bg-transparent"
          />
        </div>
        <button type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
          Search
        </button>
      </div>
    </form>
  );
}

'use client';
import { useRouter } from 'next/navigation';

const TAGS = [
  { tag: '#10thPass', label: '10th Pass', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
  { tag: '#Inter', label: 'Intermediate', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
  { tag: '#Degree', label: 'Degree', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
  { tag: '#BTech', label: 'B.Tech', color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' },
  { tag: '#GovtJobs', label: 'Govt Jobs', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' },
  { tag: '#Banking', label: 'Banking', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' },
  { tag: '#Railways', label: 'Railways', color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' },
  { tag: '#Engineering', label: 'Engineering', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' },
  { tag: '#Teaching', label: 'Teaching', color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300' },
  { tag: '#Police', label: 'Police', color: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300' },
];

export default function TagsCloud() {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {TAGS.map(({ tag, label, color }) => (
        <button key={tag} onClick={() => router.push(`/exams?tag=${encodeURIComponent(tag)}`)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 hover:shadow-md ${color}`}>
          {tag} <span className="opacity-70 text-xs ml-1">{label}</span>
        </button>
      ))}
    </div>
  );
}

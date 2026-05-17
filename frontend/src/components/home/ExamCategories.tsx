import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://osyjzrjloqgmnrtgzfwf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zeWp6cmpsb3FnbW5ydGd6ZndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NzM0NDksImV4cCI6MjA5NDQ0OTQ0OX0.gNbNu9LjddSgULPsFdoR2l0p0MO2DxUCELmkpwS1-U0'
);

async function getCategoryCounts() {
  const { data } = await supabase
    .from('exams')
    .select('category, qualifications')
    .eq('is_active', true);

  if (!data) return { after10th: 0, afterDegree: 0, tspsc: 0, govtJobs: 0, banking: 0, railways: 0, teaching: 0, police: 0 };

  return {
    after10th: data.filter(e => (e.qualifications || []).includes('10th')).length,
    afterDegree: data.filter(e => (e.qualifications || []).includes('degree')).length,
    tspsc: data.filter(e => e.category === 'psc').length,
    govtJobs: data.filter(e => e.category === 'govt_jobs').length,
    banking: data.filter(e => e.category === 'banking').length,
    railways: data.filter(e => e.category === 'railways').length,
    teaching: data.filter(e => e.category === 'teaching').length,
    police: data.filter(e => e.category === 'police').length,
  };
}

export default async function ExamCategories() {
  const counts = await getCategoryCounts();

  const categories = [
    { title: 'Exams after 10th', href: '/exams?qualification=10th', count: counts.after10th },
    { title: 'Exams after Degree', href: '/exams?qualification=degree', count: counts.afterDegree },
    { title: 'TSPSC Notifications', href: '/exams?category=psc', count: counts.tspsc },
    { title: 'Latest Govt Jobs', href: '/exams?category=govt_jobs', count: counts.govtJobs },
    { title: 'Banking Exams', href: '/exams?category=banking', count: counts.banking },
    { title: 'Railway Jobs', href: '/exams?category=railways', count: counts.railways },
    { title: 'Teaching Jobs', href: '/exams?category=teaching', count: counts.teaching },
    { title: 'Police Recruitment', href: '/exams?category=police', count: counts.police },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((item, i) => (
        <Link key={i} href={item.href}
          className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all">
          <p className="font-medium text-gray-900 dark:text-white text-sm">{item.title}</p>
          <p className="text-xs text-blue-600 mt-1">{item.count} exams</p>
        </Link>
      ))}
    </div>
  );
}

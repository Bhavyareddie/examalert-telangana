import { createClient } from '@supabase/supabase-js';
import ExamCard from '@/components/exams/ExamCard';
import type { Exam } from '@/types';

async function getTrendingExams(): Promise<Exam[]> {
  try {
    const supabase = createClient(
      'https://osyjzrjloqgmnrtgzfwf.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zeWp6cmpsb3FnbW5ydGd6ZndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NzM0NDksImV4cCI6MjA5NDQ0OTQ0OX0.gNbNu9LjddSgULPsFdoR2l0p0MO2DxUCELmkpwS1-U0'
    );
    const { data } = await supabase
      .from('exams')
      .select('id,slug,name,category,tags,application_end,total_vacancies,view_count,conducting_body,fee_general,exam_status,is_trending')
      .eq('is_trending', true)
      .eq('is_active', true)
      .order('view_count', { ascending: false })
      .limit(6);
    return (data as Exam[]) || [];
  } catch {
    return [];
  }
}

export default async function TrendingExams() {
  const exams = await getTrendingExams();

  if (!exams.length) {
    return <p className="text-gray-500 dark:text-gray-400 text-center py-8">No trending exams at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {exams.map(exam => <ExamCard key={exam.id} exam={exam} />)}
    </div>
  );
}

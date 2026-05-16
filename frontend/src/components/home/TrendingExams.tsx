import ExamCard from '@/components/exams/ExamCard';
import type { Exam } from '@/types';

async function getTrendingExams(): Promise<Exam[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exams/trending`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    return res.json();
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

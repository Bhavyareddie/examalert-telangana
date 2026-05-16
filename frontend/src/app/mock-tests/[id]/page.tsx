'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Clock, ChevronLeft, ChevronRight, CheckCircle, XCircle, Loader2, Flag } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

interface Question {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  subject?: string;
  difficulty?: string;
  order_num: number;
}

interface MockTest {
  id: string;
  title: string;
  description?: string;
  total_questions: number;
  duration_minutes: number;
  total_marks: number;
  is_free: boolean;
  exam_id: string;
  questions: Question[];
}

interface Result {
  score: number;
  total_marks: number;
  correct: number;
  total: number;
  results: { id: string; correct_answer: string; user_answer?: string; correct: boolean; explanation?: string }[];
}

const OPTIONS = ['a', 'b', 'c', 'd'] as const;

export default function MockTestPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();

  const [test, setTest] = useState<MockTest | null>(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const startTime = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    api.get(`/quiz/mock-tests/${id}`)
      .then(r => { setTest(r.data); setTimeLeft(r.data.duration_minutes * 60); })
      .catch(() => router.push('/exams'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = useCallback(async () => {
    if (!test || submitting) return;
    clearInterval(timerRef.current);
    setSubmitting(true);
    const timeTaken = Math.round((Date.now() - startTime.current) / 60000);
    try {
      const { data } = await api.post(`/quiz/mock-tests/${id}/submit`, { answers, time_taken_minutes: timeTaken });
      setResult(data);
    } catch {
      // Show partial result even if save fails
      let score = 0;
      test.questions.forEach(q => { if (answers[q.id] === undefined) return; });
      setResult({ score: 0, total_marks: test.total_marks, correct: score, total: test.questions.length, results: [] });
    } finally {
      setSubmitting(false);
    }
  }, [test, answers, id, submitting]);

  useEffect(() => {
    if (!started || result) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { handleSubmit(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [started, result, handleSubmit]);

  const startTest = () => {
    startTime.current = Date.now();
    setStarted(true);
  };

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 size={32} className="animate-spin text-blue-600" />
    </div>
  );

  if (!test) return null;

  // Results screen
  if (result) {
    const pct = Math.round((result.correct / result.total) * 100);
    const passed = pct >= 40;
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className={`rounded-2xl border p-8 text-center mb-8 ${passed ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'}`}>
          {passed ? <CheckCircle size={48} className="text-green-600 mx-auto mb-3" /> : <XCircle size={48} className="text-red-500 mx-auto mb-3" />}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{passed ? 'Well Done!' : 'Keep Practicing!'}</h2>
          <p className="text-5xl font-bold my-4 text-gray-900 dark:text-white">{result.score}<span className="text-xl text-gray-500 dark:text-gray-400">/{result.total_marks}</span></p>
          <p className="text-gray-600 dark:text-gray-400">{result.correct} correct out of {result.total} questions ({pct}%)</p>
        </div>

        {result.results.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Review Answers</h3>
            {test.questions.map((q, i) => {
              const r = result.results.find(x => x.id === q.id);
              if (!r) return null;
              return (
                <div key={q.id} className={`p-4 rounded-xl border ${r.correct ? 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/10' : 'border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/10'}`}>
                  <p className="font-medium text-gray-900 dark:text-white text-sm mb-3">
                    <span className="text-gray-500 dark:text-gray-400 mr-2">Q{i + 1}.</span>{q.question}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {OPTIONS.map(opt => {
                      const text = q[`option_${opt}` as keyof Question] as string;
                      const isCorrect = r.correct_answer === opt;
                      const isUser = r.user_answer === opt;
                      return (
                        <div key={opt} className={`text-xs px-3 py-2 rounded-lg flex items-center gap-2 ${isCorrect ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 font-medium' : isUser && !isCorrect ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                          <span className="font-bold uppercase">{opt}.</span> {text}
                          {isCorrect && <CheckCircle size={12} className="ml-auto text-green-600 flex-shrink-0" />}
                          {isUser && !isCorrect && <XCircle size={12} className="ml-auto text-red-500 flex-shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                  {r.explanation && <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 italic">{r.explanation}</p>}
                </div>
              );
            })}
          </div>
        )}

        <button onClick={() => router.back()} className="mt-6 w-full py-3 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          ← Back to Exam
        </button>
      </div>
    );
  }

  // Pre-start screen
  if (!started) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{test.title}</h1>
          {test.description && <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{test.description}</p>}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Questions', value: test.total_questions },
              { label: 'Duration', value: `${test.duration_minutes} min` },
              { label: 'Total Marks', value: test.total_marks },
            ].map(s => (
              <div key={s.label} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                <p className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
          {!user && <p className="text-sm text-orange-600 dark:text-orange-400 mb-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl p-3">Login to save your score and track progress.</p>}
          <button onClick={startTest} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors">
            Start Test
          </button>
          <button onClick={() => router.back()} className="w-full mt-3 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // Test in progress
  const q = test.questions[current];
  const answered = Object.keys(answers).length;
  const isUrgent = timeLeft <= 300;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{test.title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{answered}/{test.total_questions} answered</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-lg ${isUrgent ? 'bg-red-100 dark:bg-red-900/30 text-red-600' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'}`}>
          <Clock size={18} />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Question */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-medium px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
            Q {current + 1} / {test.questions.length}
          </span>
          {q.subject && <span className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">{q.subject}</span>}
          {q.difficulty && <span className={`text-xs px-2.5 py-1 rounded-full ${q.difficulty === 'easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : q.difficulty === 'hard' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'}`}>{q.difficulty}</span>}
        </div>
        <p className="text-gray-900 dark:text-white font-medium text-base mb-6">{q.question}</p>
        <div className="space-y-3">
          {OPTIONS.map(opt => {
            const text = q[`option_${opt}` as keyof Question] as string;
            const selected = answers[q.id] === opt;
            return (
              <button key={opt} onClick={() => setAnswers(a => ({ ...a, [q.id]: opt }))}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${selected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 bg-white dark:bg-gray-700'}`}>
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${selected ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300'}`}>
                  {opt.toUpperCase()}
                </span>
                <span className={`text-sm ${selected ? 'text-blue-700 dark:text-blue-300 font-medium' : 'text-gray-800 dark:text-gray-200'}`}>{text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <ChevronLeft size={18} /> Prev
        </button>

        {/* Question dots */}
        <div className="flex gap-1.5 flex-wrap justify-center flex-1">
          {test.questions.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${i === current ? 'bg-blue-600 text-white' : answers[test.questions[i].id] ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
              {i + 1}
            </button>
          ))}
        </div>

        {current < test.questions.length - 1 ? (
          <button onClick={() => setCurrent(c => c + 1)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
            Next <ChevronRight size={18} />
          </button>
        ) : (
          <button onClick={handleSubmit} disabled={submitting}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-xl transition-colors">
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Flag size={16} />}
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { Brain, CheckCircle, XCircle } from 'lucide-react';
import api from '@/lib/api';

interface Quiz {
  id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  subject?: string;
}

export default function DailyQuiz() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [result, setResult] = useState<{ correct: boolean; correct_answer: string; explanation?: string } | null>(null);

  useEffect(() => {
    api.get('/quiz/today').then(r => setQuiz(r.data)).catch(() => {});
  }, []);

  const handleAnswer = async (answer: string) => {
    if (selected || !quiz) return;
    setSelected(answer);
    try {
      const { data } = await api.post('/quiz/today/answer', { quiz_id: quiz.id, answer });
      setResult(data);
    } catch {}
  };

  if (!quiz) return null;

  const options = [
    { key: 'a', text: quiz.option_a },
    { key: 'b', text: quiz.option_b },
    { key: 'c', text: quiz.option_c },
    { key: 'd', text: quiz.option_d },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl border border-purple-200 dark:border-purple-700 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="text-purple-600" size={22} />
        <h3 className="font-bold text-gray-900 dark:text-white">Daily Quiz</h3>
        {quiz.subject && <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 rounded-full">{quiz.subject}</span>}
      </div>
      <p className="text-gray-800 dark:text-gray-200 font-medium mb-4">{quiz.question}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map(opt => {
          const isSelected = selected === opt.key;
          const isCorrect = result?.correct_answer === opt.key;
          let cls = 'border-gray-200 dark:border-gray-600 hover:border-purple-400 bg-white dark:bg-gray-800';
          if (selected) {
            if (isCorrect) cls = 'border-green-500 bg-green-50 dark:bg-green-900/20';
            else if (isSelected) cls = 'border-red-500 bg-red-50 dark:bg-red-900/20';
          }
          return (
            <button key={opt.key} onClick={() => handleAnswer(opt.key)} disabled={!!selected}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${cls}`}>
              <span className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300 flex-shrink-0">
                {opt.key.toUpperCase()}
              </span>
              <span className="text-sm text-gray-800 dark:text-gray-200">{opt.text}</span>
              {selected && isCorrect && <CheckCircle size={16} className="text-green-500 ml-auto flex-shrink-0" />}
              {selected && isSelected && !isCorrect && <XCircle size={16} className="text-red-500 ml-auto flex-shrink-0" />}
            </button>
          );
        })}
      </div>
      {result && (
        <div className={`mt-4 p-3 rounded-xl text-sm ${result.correct ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'}`}>
          {result.correct ? '🎉 Correct!' : `❌ Wrong! Correct answer: ${result.correct_answer.toUpperCase()}`}
          {result.explanation && <p className="mt-1 text-gray-700 dark:text-gray-300">{result.explanation}</p>}
        </div>
      )}
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { isPast } from 'date-fns';

interface Props { deadline: string; label: string; }

export default function ExamCountdown({ deadline, label }: Props) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const target = new Date(deadline).getTime();
    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) { setExpired(true); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);

  if (expired) return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-2xl p-4 text-center">
      <p className="text-red-600 dark:text-red-400 font-semibold">Application Closed</p>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-5 text-white">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={18} />
        <p className="text-sm font-medium text-blue-100">{label}</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { value: timeLeft.days, label: 'Days' },
          { value: timeLeft.hours, label: 'Hours' },
          { value: timeLeft.minutes, label: 'Mins' },
          { value: timeLeft.seconds, label: 'Secs' },
        ].map(({ value, label }) => (
          <div key={label} className="text-center bg-white/10 rounded-xl p-2">
            <p className="text-2xl font-bold">{String(value).padStart(2, '0')}</p>
            <p className="text-xs text-blue-200">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

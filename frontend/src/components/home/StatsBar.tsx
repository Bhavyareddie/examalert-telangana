export default function StatsBar() {
  const stats = [
    { label: 'Active Exams', value: '50+' },
    { label: 'Students Helped', value: '10K+' },
    { label: 'Exam Categories', value: '10+' },
    { label: 'Daily Updates', value: '24/7' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-bold text-blue-600">{s.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-4 animate-pulse">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl" />
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

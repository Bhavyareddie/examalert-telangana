import { Suspense } from 'react';
import Link from 'next/link';
import { Search, TrendingUp, Bell, CheckCircle, Zap, BookOpen, Users, Award } from 'lucide-react';
import type { Metadata } from 'next';
import HeroSearch from '@/components/home/HeroSearch';
import TrendingExams from '@/components/home/TrendingExams';
import TagsCloud from '@/components/home/TagsCloud';
import DailyQuiz from '@/components/home/DailyQuiz';
import StatsBar from '@/components/home/StatsBar';
import ExamCategories from '@/components/home/ExamCategories';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'ExamAlert Telangana - Find All Competitive Exams',
  description: 'Discover TSPSC, Police, Banking, Railways, Teaching exams. Smart eligibility checker, AI assistant, and real-time notifications for Telangana students.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
              <Zap size={14} className="text-yellow-300" />
              <span>Smart Exam Discovery for Telangana Students</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Government Exam
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              All TSPSC, Police, Banking, Railways & Teaching exams in one place. 
              AI-powered recommendations. Real-time alerts.
            </p>
            <HeroSearch />
            <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-blue-200">
              <span>✓ Free to use</span>
              <span>✓ Telugu & Hindi support</span>
              <span>✓ AI eligibility checker</span>
              <span>✓ Instant notifications</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <StatsBar />

      {/* Tags Cloud */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <TagsCloud />
      </section>

      {/* Trending Exams */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-orange-500" size={22} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trending Exams</h2>
          </div>
          <Link href="/exams?trending=true" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View all →
          </Link>
        </div>
        <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{[...Array(6)].map((_, i) => <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />)}</div>}>
          <TrendingExams />
        </Suspense>
      </section>

      {/* Features Section */}
      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Everything You Need to Crack Your Exam
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <CheckCircle className="text-green-500" size={28} />, title: 'Smart Eligibility Checker', desc: 'Enter your age, qualification & category to instantly see all exams you can apply for.', href: '/eligibility' },
              { icon: <Bell className="text-blue-500" size={28} />, title: 'Real-time Alerts', desc: 'Get notified about new exams, date changes, results and counseling schedules.', href: '/notifications' },
              { icon: <BookOpen className="text-purple-500" size={28} />, title: 'Mock Tests & Papers', desc: 'Practice with free mock tests and previous year question papers for all exams.', href: '/exams' },
              { icon: <Award className="text-orange-500" size={28} />, title: 'AI Career Roadmap', desc: 'Get personalized career guidance and exam recommendations powered by AI.', href: '/profile' },
            ].map((f, i) => (
              <Link key={i} href={f.href} className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all group">
                <div className="mb-4">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Quiz */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <DailyQuiz />
      </section>

      {/* SEO Content */}
      <section className="bg-white dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular Exam Categories</h2>
          <Suspense fallback={<div className="grid grid-cols-2 md:grid-cols-4 gap-4">{[...Array(8)].map((_, i) => <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />)}</div>}>
            <ExamCategories />
          </Suspense>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">EA</span>
                </div>
                <span className="text-white font-bold">ExamAlert Telangana</span>
              </div>
              <p className="text-sm">Smart exam discovery platform for Telangana students.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {[['All Exams', '/exams'], ['Eligibility Checker', '/eligibility'], ['Bookmarks', '/bookmarks']].map(([label, href]) => (
                  <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Exam Categories</h4>
              <ul className="space-y-2 text-sm">
                {[['TSPSC Exams', '/exams?category=psc'], ['Banking', '/exams?category=banking'], ['Railways', '/exams?category=railways'], ['Police', '/exams?category=police']].map(([label, href]) => (
                  <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 text-center text-sm">
            <p>© 2025 ExamAlert Telangana. All rights reserved. | Made with ❤️ for Telangana students</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

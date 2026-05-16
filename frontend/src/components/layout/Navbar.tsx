'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, Bookmark, Moon, Sun, Menu, X, Globe, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAppStore } from '@/store';
import { useTranslation } from '@/hooks/useTranslation';
import api from '@/lib/api';
import type { Language } from '@/types';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user, signOut } = useAuth();
  const { profile, darkMode, toggleDarkMode, setLanguage } = useAppStore();
  const { t, language } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    if (!user) { setUnreadCount(0); return; }
    api.get('/notifications').then(r => {
      setUnreadCount(r.data.filter((n: any) => !n.is_read).length);
    }).catch(() => {});
  }, [user]);

  const langs: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'hi', label: 'हिंदी' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EA</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-lg hidden sm:block">
              ExamAlert <span className="text-blue-600">Telangana</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/exams" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">
              {t.nav.exams}
            </Link>
            <Link href="/eligibility" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">
              {t.nav.eligibility}
            </Link>
            <Link href="/career-roadmap" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">
              AI Roadmap
            </Link>
            {user && (
              <Link href="/bookmarks" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium transition-colors">
                {t.nav.bookmarks}
              </Link>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
                <Globe size={18} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                  {langs.map(l => (
                    <button key={l.code} onClick={() => { setLanguage(l.code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 ${language === l.code ? 'text-blue-600 font-medium' : 'text-gray-700 dark:text-gray-300'}`}>
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode */}
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {user ? (
              <>
                <Link href="/notifications" onClick={() => setUnreadCount(0)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 relative">
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </Link>
                {profile?.is_admin && (
                  <Link href="/admin" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
                    <LayoutDashboard size={18} />
                  </Link>
                )}
                <Link href="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="" className="w-7 h-7 rounded-full" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{profile?.full_name?.[0] || user.email?.[0]?.toUpperCase()}</span>
                    </div>
                  )}
                </Link>
                <button onClick={signOut} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hidden md:block">
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                {t.nav.login}
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200 dark:border-gray-700 space-y-1">
            {[
              { href: '/exams', label: t.nav.exams },
              { href: '/eligibility', label: t.nav.eligibility },
              { href: '/career-roadmap', label: 'AI Roadmap' },
              ...(user ? [{ href: '/bookmarks', label: t.nav.bookmarks }, { href: '/profile', label: t.nav.profile }] : []),
            ].map(item => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">
                {item.label}
              </Link>
            ))}
            {user && (
              <button onClick={signOut} className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm">
                {t.nav.logout}
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

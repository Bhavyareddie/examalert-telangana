import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import ChatAssistant from '@/components/chat/ChatAssistant';
import ThemeProvider from '@/components/layout/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: { default: 'ExamAlert Telangana - Find All Competitive Exams', template: '%s | ExamAlert Telangana' },
  description: 'Smart competitive exam discovery platform for Telangana students. Find TSPSC, Police, Banking, Railways, Teaching exams with eligibility checker and AI assistant.',
  keywords: ['TSPSC', 'Telangana exams', 'government jobs', 'competitive exams', 'Group 1', 'Group 2', 'TS Police', 'banking exams'],
  openGraph: {
    title: 'ExamAlert Telangana',
    description: 'Find all competitive exams for Telangana students in one place',
    type: 'website',
    locale: 'en_IN',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: process.env.NEXT_PUBLIC_APP_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white min-h-screen`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <ChatAssistant />
          <Toaster position="top-right" toastOptions={{
            className: 'dark:bg-gray-800 dark:text-white',
            duration: 3000,
          }} />
        </ThemeProvider>
      </body>
    </html>
  );
}

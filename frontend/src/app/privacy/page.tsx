import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - ExamAlert Telangana',
  description: 'Privacy policy for ExamAlert Telangana — how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Last updated: January 2025</p>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-4 mb-8">
        <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
          Disclaimer: ExamAlert Telangana is an independent informational service and is not affiliated with, endorsed by, or connected to any government organization, TSPSC, TSLPRB, or any other official body.
        </p>
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Information We Collect</h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">We collect only the minimum information necessary to provide our service:</p>
          <ul className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>• <strong>Account data:</strong> Email address, name (optional), profile photo (from Google OAuth)</li>
            <li>• <strong>Profile data:</strong> Qualification, age, category, district, interests — only if you choose to provide them</li>
            <li>• <strong>Usage data:</strong> Pages visited, exams viewed (anonymized)</li>
            <li>• <strong>Device data:</strong> Browser type, IP address (for security and rate limiting only)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. How We Use Your Information</h2>
          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>• To provide personalized exam recommendations</li>
            <li>• To send exam alerts and reminders you have opted into</li>
            <li>• To improve our platform and fix bugs</li>
            <li>• To prevent fraud and abuse</li>
          </ul>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 font-medium">We do NOT sell, rent, or share your personal data with third parties for marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Data Storage & Security</h2>
          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>• Data is stored securely on Supabase (PostgreSQL) with encryption at rest</li>
            <li>• All connections use HTTPS/TLS encryption</li>
            <li>• Passwords are hashed using bcrypt (we never store plain-text passwords)</li>
            <li>• Access is protected by Row Level Security (RLS) — you can only access your own data</li>
            <li>• We perform regular security audits</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Your Rights</h2>
          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>• <strong>Access:</strong> View all data we hold about you in your profile</li>
            <li>• <strong>Correction:</strong> Update your profile information at any time</li>
            <li>• <strong>Deletion:</strong> Delete your account and all associated data from Settings → Delete Account</li>
            <li>• <strong>Portability:</strong> Contact us to export your data</li>
            <li>• <strong>Opt-out:</strong> Disable all notifications from your profile settings</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">5. Cookies</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">We use only essential cookies for authentication (Supabase session). We do not use tracking or advertising cookies.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">6. Third-Party Services</h2>
          <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>• <strong>Supabase:</strong> Database and authentication</li>
            <li>• <strong>Google OAuth:</strong> Optional sign-in (governed by Google's Privacy Policy)</li>
            <li>• <strong>Google Gemini AI:</strong> AI chat responses (messages are not stored by us)</li>
            <li>• <strong>Vercel:</strong> Frontend hosting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">7. Content Disclaimer</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            All exam information on this platform is sourced from official government websites and notifications. We summarize information in original wording and link to official sources. We do not reproduce copyrighted content. Always verify exam details from official websites before applying.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">8. Contact Us</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            For privacy concerns or data deletion requests, contact us at: <strong>privacy@examalert.in</strong>
          </p>
        </section>
      </div>
    </div>
  );
}

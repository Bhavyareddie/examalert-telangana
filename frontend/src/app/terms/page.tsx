import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - ExamAlert Telangana',
  description: 'Terms of service for ExamAlert Telangana.',
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Terms of Service</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Last updated: January 2025</p>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-4 mb-8">
        <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
          ExamAlert Telangana is an independent informational service and is NOT affiliated with, endorsed by, or connected to TSPSC, TSLPRB, Government of Telangana, or any other government organization.
        </p>
      </div>

      <div className="space-y-8">
        {[
          {
            title: '1. Acceptance of Terms',
            content: 'By accessing or using ExamAlert Telangana, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.',
          },
          {
            title: '2. Service Description',
            content: 'ExamAlert Telangana is an independent informational platform that aggregates publicly available competitive exam information for Telangana students. We do not conduct exams, accept applications, or represent any government body.',
          },
          {
            title: '3. Accuracy of Information',
            content: 'While we strive to keep exam information accurate and up-to-date, we cannot guarantee the accuracy, completeness, or timeliness of information. Always verify exam details, dates, and eligibility from official government websites before applying. We are not responsible for any loss or damage arising from reliance on information on this platform.',
          },
          {
            title: '4. User Accounts',
            content: 'You are responsible for maintaining the confidentiality of your account credentials. You must be at least 16 years old to create an account. You agree not to share your account with others or use another person\'s account.',
          },
          {
            title: '5. Prohibited Uses',
            content: 'You may not: (a) use the platform for any unlawful purpose; (b) attempt to gain unauthorized access to any part of the platform; (c) scrape, crawl, or harvest data from the platform; (d) submit false or misleading information; (e) use automated tools to access the platform without permission.',
          },
          {
            title: '6. Intellectual Property',
            content: 'The ExamAlert Telangana platform, including its design, code, and original content, is owned by us. Exam notifications and official documents are the property of their respective government organizations. We only link to official sources and do not reproduce copyrighted government content.',
          },
          {
            title: '7. AI Assistant Disclaimer',
            content: 'Our AI chat assistant provides general guidance only. AI responses may not always be accurate or current. Always verify AI-provided information from official sources. Do not make important career or application decisions based solely on AI responses.',
          },
          {
            title: '8. Limitation of Liability',
            content: 'ExamAlert Telangana is provided "as is" without warranties of any kind. We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform, including missed exam deadlines or incorrect eligibility information.',
          },
          {
            title: '9. Account Termination',
            content: 'We reserve the right to suspend or terminate accounts that violate these terms. You may delete your account at any time from your profile settings.',
          },
          {
            title: '10. Changes to Terms',
            content: 'We may update these terms from time to time. Continued use of the platform after changes constitutes acceptance of the new terms.',
          },
          {
            title: '11. Contact',
            content: 'For questions about these terms, contact us at: legal@examalert.in',
          },
        ].map((section, i) => (
          <section key={i}>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{section.title}</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{section.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

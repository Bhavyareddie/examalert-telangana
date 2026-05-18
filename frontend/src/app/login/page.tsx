'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

type Mode = 'login' | 'signup' | 'forgot';

// Password strength checker
const getPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

const strengthLabel = (s: number) => {
  if (s <= 2) return { label: 'Weak', color: 'bg-red-500' };
  if (s <= 4) return { label: 'Fair', color: 'bg-yellow-500' };
  return { label: 'Strong', color: 'bg-green-500' };
};

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, resetPassword } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const strength = getPasswordStrength(password);
  const { label: strengthText, color: strengthColor } = strengthLabel(strength);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'forgot') {
        await resetPassword(email);
        setEmailSent(true);
        return;
      }

      if (mode === 'signup') {
        if (strength < 3) {
          toast.error('Please use a stronger password');
          return;
        }
        const { error } = await signUpWithEmail(email, password, fullName);
        if (error) throw error;
        toast.success('Account created! Please check your email to verify your account.');
        setEmailSent(true);
        return;
      }

      // Login
      const { error } = await signInWithEmail(email, password);
      if (error) throw error;
      toast.success('Welcome back!');
      router.push(redirectTo);
    } catch (err: any) {
      // Generic error messages to prevent user enumeration
      if (err.message?.includes('Invalid login credentials')) {
        toast.error('Incorrect email or password');
      } else if (err.message?.includes('Email not confirmed')) {
        toast.error('Please verify your email before logging in');
      } else {
        toast.error(err.message || 'Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    const { error } = await signInWithGoogle();
    if (error) toast.error('Google sign-in failed. Please try again.');
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Check your email</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {mode === 'forgot'
              ? `We've sent a password reset link to ${email}`
              : `We've sent a verification link to ${email}. Please verify before logging in.`}
          </p>
          <button onClick={() => { setEmailSent(false); setMode('login'); }}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            ← Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">EA</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ExamAlert Telangana</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
            {mode === 'forgot' ? 'Reset your password' : 'Your smart exam companion'}
          </p>
        </div>

        {/* Browse without login notice */}
        {mode === 'login' && (
          <div className="flex items-start gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-3 mb-4">
            <AlertCircle size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 dark:text-blue-300">
              You can <button onClick={() => router.push('/exams')} className="underline font-medium">browse all exams</button> without logging in. Login is only needed for bookmarks, alerts, and AI recommendations.
            </p>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
          {/* Mode Tabs */}
          {mode !== 'forgot' && (
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-6">
              {(['login', 'signup'] as const).map(m => (
                <button key={m} onClick={() => setMode(m)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === m ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-400'}`}>
                  {m === 'login' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>
          )}



          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                  placeholder="Your full name" maxLength={100}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="your@email.com" maxLength={254} autoComplete="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>

            {mode !== 'forgot' && (
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                  {mode === 'login' && (
                    <button type="button" onClick={() => setMode('forgot')}
                      className="text-xs text-blue-600 hover:text-blue-700">
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} value={password}
                    onChange={e => setPassword(e.target.value)} required
                    placeholder="••••••••" minLength={8} maxLength={128}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none pr-12" />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Password strength meter — only on signup */}
                {mode === 'signup' && password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i < strength ? strengthColor : 'bg-gray-200 dark:bg-gray-600'}`} />
                      ))}
                    </div>
                    <p className={`text-xs ${strength <= 2 ? 'text-red-500' : strength <= 4 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {strengthText} — {strength <= 2 ? 'Add uppercase, numbers, symbols' : strength <= 4 ? 'Getting better!' : 'Great password!'}
                    </p>
                  </div>
                )}

                {mode === 'signup' && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Min 8 characters with uppercase, lowercase, and a number
                  </p>
                )}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
              {loading && <Loader2 size={18} className="animate-spin" />}
              {mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
            </button>
          </form>

          {mode === 'forgot' && (
            <button onClick={() => setMode('login')} className="w-full mt-3 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              ← Back to login
            </button>
          )}
        </div>

        {/* Legal */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          By continuing, you agree to our{' '}
          <a href="/terms" className="underline hover:text-gray-700 dark:hover:text-gray-300">Terms of Service</a>
          {' '}and{' '}
          <a href="/privacy" className="underline hover:text-gray-700 dark:hover:text-gray-300">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}

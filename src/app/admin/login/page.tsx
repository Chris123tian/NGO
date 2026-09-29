'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useAuth } from '@/context/AuthContext';
import { Heart, Lock, Mail, ShieldAlert, Loader2, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');
  
  const router = useRouter();
  const { setDemoAuthMode } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setForgotMsg('');

    try {
      // 1. Attempt real Firebase Auth login
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (err: any) {
      // 2. Demo fallback mode for initial evaluation (admin@rescuefoundationghana.org / admin123)
      if ((email.trim().toLowerCase() === 'admin@rescuefoundationghana.org' || email.trim().toLowerCase() === 'admin@hopereachghana.org') && password === 'admin123') {
        setDemoAuthMode(true);
        router.push('/admin');
      } else {
        setErrorMsg('Invalid email or password. Use admin@rescuefoundationghana.org / admin123 or valid Firebase credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoBypass = () => {
    setEmail('admin@rescuefoundationghana.org');
    setPassword('admin123');
    setDemoAuthMode(true);
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-brand-green-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 border border-gray-100">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-brand-green-600 text-amber-400 flex items-center justify-center mx-auto shadow-md">
            <Heart className="w-8 h-8 fill-amber-400 stroke-brand-green-700" />
          </div>
          <h1 className="text-2xl font-extrabold font-heading text-brand-green-900 tracking-tight">
            Rescue Foundation Admin Portal
          </h1>
          <p className="text-xs text-gray-500 font-light">
            Authorized Content & Management Access
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 text-red-700 text-xs p-3.5 rounded-2xl border border-red-200 flex items-start space-x-2">
            <ShieldAlert size={16} className="shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {forgotMsg && (
          <div className="bg-amber-50 text-amber-800 text-xs p-3.5 rounded-2xl border border-amber-200">
            {forgotMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                placeholder="admin@rescuefoundationghana.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-brand-green-600 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => setForgotMsg('To reset your password, contact your system administrator or check Firebase Console Auth tab.')}
                className="text-[11px] text-brand-green-700 hover:underline font-semibold"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-brand-green-600 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center space-x-2 bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all text-xs disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>Authenticating Admin...</span>
              </>
            ) : (
              <>
                <KeyRound size={16} className="text-amber-400" />
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Quick Login Box */}
        <div className="pt-2 border-t border-gray-100 text-center space-y-2">
          <span className="text-[11px] text-gray-400 block">Quick Demo Credentials:</span>
          <button
            onClick={handleDemoBypass}
            className="w-full bg-amber-50 hover:bg-amber-100 text-brand-green-900 border border-amber-200 text-xs font-bold py-2 px-3 rounded-xl transition-colors"
          >
            1-Click Demo Login (admin@rescuefoundationghana.org)
          </button>
        </div>

      </div>
    </div>
  );
}

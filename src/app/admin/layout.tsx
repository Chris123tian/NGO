'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { getContactMessages, getVolunteers } from '@/lib/firebase/services';
import { Loader2, Shield, Heart } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, demoAuthMode } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [unreadCount, setUnreadCount] = useState(0);
  const [volunteerCount, setVolunteerCount] = useState(0);

  useEffect(() => {
    // If on login page, skip protection check
    if (pathname === '/admin/login') return;

    if (!loading && !user && !demoAuthMode) {
      router.push('/admin/login');
    }
  }, [user, loading, demoAuthMode, pathname, router]);

  useEffect(() => {
    if (pathname === '/admin/login') return;
    
    Promise.all([
      getContactMessages(),
      getVolunteers()
    ]).then(([msgs, vols]) => {
      if (Array.isArray(msgs)) {
        setUnreadCount(msgs.filter((m) => !m.read).length);
      }
      if (Array.isArray(vols)) {
        setVolunteerCount(vols.filter((v) => v.status === 'new').length);
      }
    }).catch(() => {});
  }, [pathname]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading && !demoAuthMode && !user) {
    return (
      <div className="min-h-screen bg-brand-green-950 flex flex-col items-center justify-center text-white space-y-4">
        <Loader2 size={40} className="animate-spin text-amber-400" />
        <span className="text-xs font-semibold text-emerald-200">Verifying Admin Permissions...</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar unreadCount={unreadCount} volunteerCount={volunteerCount} />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-brand-green-700" />
            <h2 className="text-sm font-bold font-heading text-gray-800">
              Control Panel & Administration
            </h2>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="bg-amber-100 text-brand-gold-600 font-bold px-2.5 py-1 rounded-full border border-amber-200">
              Live Session Active
            </span>
          </div>
        </header>
        <main className="p-6 md:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}

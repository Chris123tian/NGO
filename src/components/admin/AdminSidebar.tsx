'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Settings,
  Sliders,
  FolderHeart,
  Target,
  BarChart3,
  Newspaper,
  Award,
  Images,
  HeartHandshake,
  Users,
  MessageSquare,
  LogOut,
  ExternalLink,
  Shield
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface AdminSidebarProps {
  unreadCount?: number;
  volunteerCount?: number;
}

export default function AdminSidebar({ unreadCount = 0, volunteerCount = 0 }: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout, role } = useAuth();

  const menuItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Website Settings', href: '/admin/settings', icon: Settings },
    { name: 'Hero Slider', href: '/admin/hero', icon: Sliders },
    { name: 'Our Programs', href: '/admin/programs', icon: FolderHeart },
    { name: 'Campaigns', href: '/admin/campaigns', icon: Target },
    { name: 'Impact Numbers', href: '/admin/impact', icon: BarChart3 },
    { name: 'News & Stories', href: '/admin/stories', icon: Newspaper },
    { name: 'Success Stories', href: '/admin/stories#success', icon: Award },
    { name: 'Gallery', href: '/admin/gallery', icon: Images },
    { name: 'Donation Records', href: '/admin/donations', icon: HeartHandshake },
    { name: 'Volunteers', href: '/admin/volunteers', icon: Users, badge: volunteerCount },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare, badge: unreadCount },
  ];

  return (
    <aside className="w-64 bg-brand-green-950 text-white min-h-screen flex flex-col justify-between border-r border-brand-green-800 shrink-0">
      <div>
        
        {/* Header Branding */}
        <div className="p-6 border-b border-brand-green-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-brand-green-950 flex items-center justify-center font-bold shadow">
            <Shield size={20} />
          </div>
          <div>
            <span className="font-bold font-heading text-white text-base block leading-none">
              HopeReach Admin
            </span>
            <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider block mt-1">
              Role: {role}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-brand-green-950 font-extrabold shadow-sm'
                    : 'text-emerald-100/80 hover:bg-brand-green-900 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={16} className={isActive ? 'text-brand-green-950' : 'text-amber-400'} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-brand-green-950 text-amber-400' : 'bg-amber-500 text-brand-green-950'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

      </div>

      {/* Footer Controls */}
      <div className="p-4 border-t border-brand-green-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center space-x-2 text-xs text-emerald-200/80 hover:text-white px-3 py-2 rounded-xl hover:bg-brand-green-900 transition-colors"
        >
          <ExternalLink size={14} className="text-amber-400" />
          <span>View Live Website</span>
        </Link>

        <button
          onClick={logout}
          className="flex items-center space-x-2 text-xs text-red-300 hover:text-red-100 px-3 py-2 rounded-xl hover:bg-red-900/30 w-full transition-colors font-bold"
        >
          <LogOut size={14} />
          <span>Logout Admin Session</span>
        </button>
      </div>
    </aside>
  );
}

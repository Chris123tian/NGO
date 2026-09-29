'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getDonations,
  getPrograms,
  getPosts,
  getGalleryItems,
  getVolunteers,
  getContactMessages,
  getFeaturedCampaign,
  getImpactStats
} from '@/lib/firebase/services';
import { seedFirestoreDatabase } from '@/lib/firebase/seed';
import {
  HeartHandshake,
  FolderHeart,
  Newspaper,
  Images,
  Users,
  MessageSquare,
  Target,
  Sparkles,
  Database,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUpRight
} from 'lucide-react';

export default function AdminOverviewPage() {
  const [totalDonationsGHS, setTotalDonationsGHS] = useState(0);
  const [programCount, setProgramCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);
  const [volunteerCount, setVolunteerCount] = useState(0);
  const [unreadMsgCount, setUnreadMsgCount] = useState(0);
  const [campaignRaised, setCampaignRaised] = useState(0);

  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<{ success: boolean; message: string } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [dons, progs, posts, gal, vols, msgs, camp] = await Promise.all([
        getDonations(),
        getPrograms(),
        getPosts(),
        getGalleryItems(),
        getVolunteers(),
        getContactMessages(),
        getFeaturedCampaign(),
      ]);

      const sum = (dons || []).reduce((acc, curr) => acc + (curr.amount || 0), 0);
      setTotalDonationsGHS(sum);
      setProgramCount((progs || []).length);
      setPostCount((posts || []).length);
      setGalleryCount((gal || []).length);
      setVolunteerCount((vols || []).length);
      setUnreadMsgCount((msgs || []).filter(m => !m.read).length);
      setCampaignRaised(camp?.raisedAmount || 0);
    } catch (e) {
      console.warn("Failed to load admin stats:", e);
    }
  };

  const handleSeed = async () => {
    setSeeding(true);
    setSeedResult(null);
    const res = await seedFirestoreDatabase();
    setSeedResult(res);
    setSeeding(false);
    if (res.success) {
      loadData();
    }
  };

  const kpis = [
    { title: "Total Donations", value: `GHS ${totalDonationsGHS.toLocaleString()}`, icon: HeartHandshake, color: "text-amber-500", bg: "bg-amber-50", link: "/admin/donations" },
    { title: "Active Programs", value: programCount, icon: FolderHeart, color: "text-brand-green-700", bg: "bg-emerald-50", link: "/admin/programs" },
    { title: "Published Stories", value: postCount, icon: Newspaper, color: "text-blue-600", bg: "bg-blue-50", link: "/admin/stories" },
    { title: "Gallery Images", value: galleryCount, icon: Images, color: "text-purple-600", bg: "bg-purple-50", link: "/admin/gallery" },
    { title: "Volunteer Applications", value: volunteerCount, icon: Users, color: "text-amber-600", bg: "bg-amber-50", link: "/admin/volunteers" },
    { title: "Unread Messages", value: unreadMsgCount, icon: MessageSquare, color: "text-rose-600", bg: "bg-rose-50", link: "/admin/messages" },
    { title: "Campaign Raised", value: `GHS ${campaignRaised.toLocaleString()}`, icon: Target, color: "text-emerald-700", bg: "bg-emerald-50", link: "/admin/campaigns" }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-green-900 to-brand-green-800 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="bg-amber-500 text-brand-green-950 font-extrabold text-xs px-3 py-1 rounded-full uppercase">
            Admin Dashboard
          </span>
          <h1 className="text-3xl font-extrabold font-heading text-white">
            Welcome to Rescue Foundation Ghana Control Center
          </h1>
          <p className="text-xs text-emerald-100 font-light max-w-xl">
            Manage public website text, programs, community campaigns, impact statistics, blog stories, photo gallery, donation logs, and volunteer applications.
          </p>
        </div>

        {/* 1-Click Database Seeding Utility */}
        <div className="shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-2 text-center">
          <span className="text-[11px] font-bold text-amber-300 block">Firestore Data Setup</span>
          <button
            onClick={handleSeed}
            disabled={seeding}
            className="bg-amber-500 hover:bg-amber-400 text-brand-green-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow transition-all disabled:opacity-50"
          >
            {seeding ? (
              <>
                <Loader2 size={16} className="animate-spin text-brand-green-950" />
                <span>Seeding Database...</span>
              </>
            ) : (
              <>
                <Database size={16} />
                <span>1-Click Seed Firestore Data</span>
              </>
            )}
          </button>
        </div>
      </div>

      {seedResult && (
        <div className={`p-4 rounded-2xl border text-xs flex items-center space-x-2 ${
          seedResult.success ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {seedResult.success ? <CheckCircle2 size={18} className="text-emerald-600" /> : <AlertCircle size={18} className="text-red-600" />}
          <span>{seedResult.message}</span>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Link
              key={idx}
              href={kpi.link}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl ${kpi.bg} ${kpi.color} flex items-center justify-center`}>
                  <Icon size={24} />
                </div>
                <ArrowUpRight size={18} className="text-gray-400 group-hover:text-amber-500 transition-colors" />
              </div>

              <div>
                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
                  {kpi.title}
                </span>
                <span className="text-2xl font-extrabold font-heading text-brand-green-900 mt-1 block">
                  {kpi.value}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-md space-y-4">
        <h2 className="text-lg font-bold font-heading text-brand-green-900">
          Quick Management Shortcuts
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-bold">
          <Link href="/admin/settings" className="bg-brand-sand-100 hover:bg-amber-100 text-gray-800 p-4 rounded-2xl border border-brand-sand-200 transition-colors text-center">
            Edit NGO Info & Text
          </Link>
          <Link href="/admin/programs" className="bg-brand-sand-100 hover:bg-amber-100 text-gray-800 p-4 rounded-2xl border border-brand-sand-200 transition-colors text-center">
            Add/Edit Programs
          </Link>
          <Link href="/admin/stories" className="bg-brand-sand-100 hover:bg-amber-100 text-gray-800 p-4 rounded-2xl border border-brand-sand-200 transition-colors text-center">
            Publish New Article
          </Link>
          <Link href="/admin/gallery" className="bg-brand-sand-100 hover:bg-amber-100 text-gray-800 p-4 rounded-2xl border border-brand-sand-200 transition-colors text-center">
            Upload Gallery Photos
          </Link>
        </div>
      </div>

    </div>
  );
}

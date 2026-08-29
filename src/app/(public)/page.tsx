import React from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import ImpactStats from '@/components/home/ImpactStats';
import MissionCards from '@/components/home/MissionCards';
import ProgramPreview from '@/components/home/ProgramPreview';
import CampaignCard from '@/components/home/CampaignCard';
import LatestStories from '@/components/home/LatestStories';
import TestimonialSection from '@/components/home/TestimonialSection';
import Link from 'next/link';
import { Heart, ArrowRight, ShieldCheck, Users, Gift, BookOpen } from 'lucide-react';
import {
  getWebsiteSettings,
  getHeroSlides,
  getImpactStats,
  getPrograms,
  getFeaturedCampaign,
  getPosts,
  getSuccessStories
} from '@/lib/firebase/services';

export const revalidate = 60; // revalidate content every minute

export default async function HomePage() {
  const [settings, slides, stats, programs, campaign, posts, stories] = await Promise.all([
    getWebsiteSettings(),
    getHeroSlides(),
    getImpactStats(),
    getPrograms(),
    getFeaturedCampaign(),
    getPosts(),
    getSuccessStories(),
  ]);

  return (
    <div className="space-y-0">
      {/* 1. Hero Carousel */}
      <HeroSlider slides={slides} />

      {/* 2. Impact Stats */}
      <ImpactStats stats={stats} />

      {/* 3. Mission & Vision */}
      <MissionCards settings={settings} />

      {/* 4. Core Programs */}
      <ProgramPreview programs={programs} />

      {/* 5. Featured Community Campaign */}
      <CampaignCard campaign={campaign} />

      {/* 6. News & Stories */}
      <LatestStories posts={posts} />

      {/* 7. Dignified Impact Stories */}
      <TestimonialSection stories={stories} />

      {/* 8. Call To Action Banner */}
      <section className="py-20 bg-brand-green-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="bg-amber-500 text-brand-green-950 text-xs font-bold uppercase px-3.5 py-1 rounded-full tracking-wider">
            Be the Difference Today
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Every Child Deserves Hope, Dignity, and a Brighter Future
          </h2>
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto font-light leading-relaxed">
            Your generous contribution or volunteer time provides food, clothing, books, and essential care to families in underserved communities across Northern Ghana.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/donate"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-gold-500 to-amber-600 hover:from-amber-600 hover:to-brand-gold-500 text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl text-base transition-all transform hover:-translate-y-0.5"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>Make a Donation Now</span>
            </Link>

            <Link
              href="/get-involved"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold px-8 py-4 rounded-2xl border border-white/30 text-base transition-all"
            >
              <Users className="w-5 h-5" />
              <span>Become a Volunteer</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

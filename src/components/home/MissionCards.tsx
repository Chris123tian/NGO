'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WebsiteSettings } from '@/types';
import { Target, Compass, Heart, ShieldCheck, Users, ArrowRight } from 'lucide-react';

interface MissionCardsProps {
  settings?: WebsiteSettings;
}

export default function MissionCards({ settings }: MissionCardsProps) {
  return (
    <section className="py-20 bg-brand-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold-600 bg-amber-100/80 px-3.5 py-1 rounded-full border border-amber-200">
            Who We Are & Why We Exist
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-green-900 tracking-tight">
            Restoring Hope & Dignity in Northern Ghana
          </h2>
          <p className="text-base text-gray-600 leading-relaxed font-light">
            Working directly at the grassroots across deprived hamlets and underserved urban areas in the Northern, Upper East, Upper West, Savannah, and North East regions of Ghana.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Mission Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-emerald-100 relative overflow-hidden group hover:shadow-xl transition-all">
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-brand-green-50 rounded-full group-hover:scale-125 transition-transform duration-500 opacity-60" />
            <div className="relative z-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-green-600 text-amber-400 flex items-center justify-center shadow-md">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-brand-green-900 uppercase tracking-wide">
                OUR MISSION
              </h3>
              <p className="text-gray-700 leading-relaxed text-base font-light">
                {settings?.mission || "To improve the lives of vulnerable individuals and communities by providing essential support, educational opportunities and resources that promote dignity, hope and sustainable development."}
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-amber-100 relative overflow-hidden group hover:shadow-xl transition-all">
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-amber-50 rounded-full group-hover:scale-125 transition-transform duration-500 opacity-60" />
            <div className="relative z-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-gold-500 text-white flex items-center justify-center shadow-md">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-brand-green-900 uppercase tracking-wide">
                OUR VISION
              </h3>
              <p className="text-gray-700 leading-relaxed text-base font-light">
                {settings?.vision || "A Ghana where every child, family and vulnerable person has access to the basic resources and opportunities needed to live with dignity and hope."}
              </p>
            </div>
          </div>
        </div>

        {/* Narrative & Visual Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100">
          
          <div className="lg:col-span-6 relative h-[340px] md:h-[420px] rounded-2xl overflow-hidden shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop"
              alt="Rescue Foundation Ghana Community Support"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="bg-amber-500 text-brand-green-950 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                Community Focused
              </span>
              <h4 className="text-xl font-bold font-heading mt-2">
                Dignified, Transparent & Sustainable Impact
              </h4>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-green-900 leading-tight">
              Rooted in Ghana, Reaching Those Who Need It Most
            </h3>

            <p className="text-gray-600 leading-relaxed text-sm md:text-base font-light">
              {settings?.aboutText || "Rescue Foundation Ghana operates with a deep commitment to transparency and dignity. We work hand-in-hand with local chiefs, school authorities, and community leaders across Northern Ghana to identify families and children facing extreme hardship."}
            </p>

            {/* Core Values Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-brand-green-700 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-brand-green-900">100% Transparency</h5>
                  <p className="text-xs text-gray-500">Every donation directly reaches verified beneficiaries.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Heart size={18} />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-brand-green-900">Dignity First</h5>
                  <p className="text-xs text-gray-500">Respectful assistance protecting personal privacy.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Users size={18} />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-brand-green-900">Community Empowerment</h5>
                  <p className="text-xs text-gray-500">Working with local leaders for lasting development.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-brand-green-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Compass size={18} />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-brand-green-900">Long-term Vision</h5>
                  <p className="text-xs text-gray-500">From immediate relief to sustainable schooling.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 text-brand-green-700 font-bold hover:text-brand-green-900 text-sm group"
              >
                <span>Read Full About Our History & Regional Outreach</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

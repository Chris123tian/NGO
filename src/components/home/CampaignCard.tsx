'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Campaign } from '@/types';
import { Heart, Target, Users, MapPin, CheckCircle2 } from 'lucide-react';

interface CampaignCardProps {
  campaign: Campaign;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  if (!campaign || !campaign.active) return null;

  const percentage = Math.min(
    100,
    Math.round((campaign.raisedAmount / campaign.targetAmount) * 100)
  );

  return (
    <section className="py-16 bg-gradient-to-br from-brand-green-900 via-brand-green-800 to-brand-green-950 text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="bg-amber-500 text-brand-green-950 text-xs font-extrabold uppercase px-3.5 py-1 rounded-full tracking-wider shadow">
            Featured Community Campaign
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white tracking-tight">
            Urgent Call to Action
          </h2>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column: Image */}
          <div className="lg:col-span-5 relative h-72 lg:h-auto min-h-[300px]">
            <Image
              src={campaign.imageUrl}
              alt={campaign.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
            <div className="absolute bottom-4 left-4 right-4 lg:hidden">
              <span className="bg-amber-400 text-brand-green-900 text-xs font-bold px-2.5 py-1 rounded">
                {campaign.location}
              </span>
            </div>
          </div>

          {/* Right Column: Details & Progress */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="hidden lg:flex items-center space-x-2 text-amber-300 text-xs font-bold">
                <MapPin size={14} />
                <span>{campaign.location}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white leading-tight">
                {campaign.title}
              </h3>

              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed font-light">
                {campaign.description}
              </p>
            </div>

            {/* Progress Card Box */}
            <div className="bg-brand-green-950/70 rounded-2xl p-5 border border-emerald-800/80 space-y-4">
              
              {/* Target vs Raised */}
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-xs text-emerald-300 uppercase tracking-wider block">Raised So Far</span>
                  <span className="text-2xl sm:text-3xl font-extrabold font-heading text-amber-400">
                    GHS {campaign.raisedAmount.toLocaleString()}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs text-emerald-300 uppercase tracking-wider block">Target Goal</span>
                  <span className="text-lg font-bold text-white">
                    GHS {campaign.targetAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="w-full bg-emerald-950 rounded-full h-3.5 overflow-hidden p-0.5 border border-emerald-700/60">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-1000 shadow-sm"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs text-emerald-200">
                  <span className="font-bold text-amber-400">{percentage}% Achieved</span>
                  <span className="flex items-center space-x-1">
                    <Users size={12} className="text-amber-400" />
                    <span>{campaign.beneficiaryCount} Beneficiaries Targeted</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-400 text-brand-green-950 font-extrabold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all text-center text-base"
              >
                <Heart className="w-5 h-5 fill-brand-green-950" />
                <span>Donate to Campaign Now</span>
              </Link>

              <div className="flex items-center justify-center space-x-2 text-xs text-emerald-200">
                <CheckCircle2 size={16} className="text-amber-400 shrink-0" />
                <span>Supports MoMo (MTN, Telecel, AT) & Cards</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

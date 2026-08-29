'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Program } from '@/types';
import { ArrowRight, Utensils, Shirt, GraduationCap, Heart, Users, AlertTriangle } from 'lucide-react';

interface ProgramPreviewProps {
  programs: Program[];
}

export default function ProgramPreview({ programs }: ProgramPreviewProps) {
  const publishedPrograms = programs.filter(p => p.published);

  const getCategoryIcon = (category: Program['category']) => {
    switch (category) {
      case 'Food': return <Utensils className="w-4 h-4 text-emerald-700" />;
      case 'Clothing': return <Shirt className="w-4 h-4 text-amber-700" />;
      case 'Education': return <GraduationCap className="w-4 h-4 text-brand-green-700" />;
      case 'Orphans': return <Heart className="w-4 h-4 text-rose-600" />;
      case 'Outreach': return <Users className="w-4 h-4 text-blue-700" />;
      case 'Emergency': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      default: return <Heart className="w-4 h-4 text-emerald-700" />;
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-green-700 bg-brand-green-50 px-3.5 py-1 rounded-full border border-brand-green-100">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-green-900 tracking-tight">
              Our Core Humanitarian Programs
            </h2>
            <p className="text-base text-gray-600 font-light">
              Providing holistic support to children, families, students, and vulnerable individuals across Northern Ghana.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              href="/programs"
              className="inline-flex items-center space-x-2 bg-brand-green-50 hover:bg-brand-green-100 text-brand-green-800 font-bold px-5 py-2.5 rounded-xl border border-brand-green-200 transition-colors text-sm"
            >
              <span>View All Programs</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedPrograms.slice(0, 6).map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={prog.imageUrl}
                  alt={prog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center space-x-1.5 border border-gray-100">
                  {getCategoryIcon(prog.category)}
                  <span className="text-gray-800">{prog.category} Support</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-heading text-brand-green-900 group-hover:text-brand-gold-600 transition-colors leading-snug">
                    {prog.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2.5 leading-relaxed line-clamp-3 font-light">
                    {prog.shortDescription}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <Link
                    href={`/programs#${prog.id}`}
                    className="inline-flex items-center space-x-2 text-brand-green-700 hover:text-brand-green-950 font-bold text-sm group/btn"
                  >
                    <span>Learn More</span>
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

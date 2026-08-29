'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPrograms } from '@/lib/firebase/services';
import { Program } from '@/types';
import { Utensils, Shirt, GraduationCap, Heart, Users, AlertTriangle, ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    getPrograms().then(setPrograms);
  }, []);

  const categories = ['All', 'Food', 'Clothing', 'Education', 'Orphans', 'Outreach', 'Emergency'];

  const filteredPrograms = selectedCategory === 'All'
    ? programs.filter(p => p.published)
    : programs.filter(p => p.published && p.category === selectedCategory);

  const getCategoryIcon = (category: Program['category']) => {
    switch (category) {
      case 'Food': return <Utensils className="w-5 h-5 text-emerald-700" />;
      case 'Clothing': return <Shirt className="w-5 h-5 text-amber-700" />;
      case 'Education': return <GraduationCap className="w-5 h-5 text-brand-green-700" />;
      case 'Orphans': return <Heart className="w-5 h-5 text-rose-600" />;
      case 'Outreach': return <Users className="w-5 h-5 text-blue-700" />;
      case 'Emergency': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      default: return <Heart className="w-5 h-5 text-emerald-700" />;
    }
  };

  return (
    <div className="py-12 space-y-16">
      
      {/* Header Banner */}
      <section className="bg-brand-green-900 text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="bg-amber-500 text-brand-green-950 text-xs font-extrabold uppercase px-3.5 py-1 rounded-full tracking-wider">
            Our Core Programs
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Humanitarian Support Across Ghana
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto font-light leading-relaxed">
            Targeted initiatives designed to meet immediate basic needs and create long-term educational opportunities.
          </p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-2 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-green-700 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat === 'All' ? 'All Programs' : `${cat} Support`}
            </button>
          ))}
        </div>
      </section>

      {/* Programs List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((prog) => {
            const isExpanded = expandedId === prog.id;
            return (
              <div
                key={prog.id}
                id={prog.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-56 w-full">
                    <Image
                      src={prog.imageUrl}
                      alt={prog.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center space-x-1.5 border border-gray-100">
                      {getCategoryIcon(prog.category)}
                      <span>{prog.category} Support</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold font-heading text-brand-green-900 leading-snug">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-light">
                      {prog.shortDescription}
                    </p>

                    {isExpanded && (
                      <div className="pt-3 border-t border-gray-100 text-xs text-gray-700 leading-relaxed space-y-2 animate-fadeIn">
                        <p className="font-light">{prog.fullDescription}</p>
                        <div className="bg-brand-green-50 p-3 rounded-xl border border-brand-green-100 text-brand-green-900 font-medium flex items-center space-x-2">
                          <CheckCircle2 size={16} className="text-amber-500 shrink-0" />
                          <span>Directly serves verified low-income households & rural schools.</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-6 pt-0 border-t border-gray-50 flex items-center justify-between mt-4">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : prog.id)}
                    className="inline-flex items-center space-x-1 text-xs font-bold text-brand-green-700 hover:text-brand-green-900"
                  >
                    <span>{isExpanded ? 'Show Less' : 'Learn More'}</span>
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>

                  <Link
                    href="/donate"
                    className="bg-amber-500 hover:bg-amber-400 text-brand-green-950 font-bold px-4 py-2 rounded-xl text-xs shadow"
                  >
                    Support Program
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import { SuccessStory } from '@/types';
import { Quote, MapPin, Award } from 'lucide-react';

interface TestimonialSectionProps {
  stories: SuccessStory[];
}

export default function TestimonialSection({ stories }: TestimonialSectionProps) {
  const publishedStories = stories.filter(s => s.published);

  if (publishedStories.length === 0) return null;

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-green-700 bg-brand-green-50 px-3.5 py-1 rounded-full border border-brand-green-100">
            Dignified Impact Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-green-900 tracking-tight">
            Real Lives Transformed
          </h2>
          <p className="text-base text-gray-600 font-light">
            Every contribution creates tangible changes for children and families across deprived communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publishedStories.map((story) => (
            <div
              key={story.id}
              className="bg-brand-sand-50 rounded-3xl p-6 sm:p-8 border border-brand-sand-200 shadow-sm flex flex-col md:flex-row gap-6 relative overflow-hidden"
            >
              <div className="relative w-full md:w-44 h-48 md:h-auto rounded-2xl overflow-hidden shrink-0 shadow-md">
                <Image
                  src={story.imageUrl}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-amber-600">
                    <MapPin size={12} />
                    <span>{story.community}</span>
                    <span>•</span>
                    <span className="text-brand-green-700">{story.programInvolved}</span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-brand-green-900 leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed font-light">
                    "{story.summary}"
                  </p>
                </div>

                <div className="pt-2 border-t border-brand-sand-200 flex items-center space-x-2 text-xs font-bold text-brand-green-800">
                  <Award size={14} className="text-amber-500 shrink-0" />
                  <span>Impact: {story.impact}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

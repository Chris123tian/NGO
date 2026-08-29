'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ImpactStat } from '@/types';
import { Users, BookOpen, MapPin, HeartHandshake } from 'lucide-react';

interface ImpactStatsProps {
  stats: ImpactStat[];
}

export default function ImpactStats({ stats }: ImpactStatsProps) {
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Icons mapping for visual polish
  const getIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('family') || l.includes('families')) return <Users className="w-8 h-8 text-amber-500" />;
    if (l.includes('child') || l.includes('children')) return <HeartHandshake className="w-8 h-8 text-amber-500" />;
    if (l.includes('community') || l.includes('communities')) return <MapPin className="w-8 h-8 text-amber-500" />;
    return <BookOpen className="w-8 h-8 text-amber-500" />;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    // Animate numbers smoothly
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      const currentCounts: { [key: string]: number } = {};
      stats.forEach((st) => {
        currentCounts[st.id] = Math.floor(st.value * progress);
      });

      setCounts(currentCounts);

      if (step >= steps) {
        clearInterval(timer);
        // Ensure final values match exact target
        const finalCounts: { [key: string]: number } = {};
        stats.forEach((st) => {
          finalCounts[st.id] = st.value;
        });
        setCounts(finalCounts);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasAnimated, stats]);

  return (
    <section ref={sectionRef} className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
        {stats.map((st) => (
          <div key={st.id} className="pt-4 sm:pt-0 sm:px-4 first:px-0 flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100 shadow-sm">
              {getIcon(st.label)}
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-extrabold font-heading text-brand-green-900 tracking-tight">
                {counts[st.id] !== undefined ? counts[st.id].toLocaleString() : st.value}
                <span className="text-brand-gold-500 font-extrabold">{st.suffix}</span>
              </div>
              <div className="text-sm font-bold text-gray-800 mt-0.5 font-heading">
                {st.label}
              </div>
              {st.description && (
                <p className="text-xs text-gray-500 mt-1 leading-snug">
                  {st.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

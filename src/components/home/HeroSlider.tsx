'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroSlide } from '@/types';
import { Heart, ChevronRight, ChevronLeft, ArrowDown } from 'lucide-react';

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const activeSlides = slides.filter(s => s.active);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeSlides.length]);

  if (activeSlides.length === 0) return null;

  const currentSlide = activeSlides[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % activeSlides.length);
  };

  return (
    <section className="relative w-full h-[580px] md:h-[650px] lg:h-[720px] bg-brand-green-950 overflow-hidden flex items-center justify-center">
      {/* Background Image Carousel with subtle Zoom/Fade */}
      {activeSlides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />
          <Image
            src={slide.imageUrl}
            alt={slide.title}
            fill
            priority={idx === 0}
            className="object-cover object-center scale-105 transition-transform duration-10000 ease-out"
          />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
        <div className="max-w-3xl space-y-6 animate-fadeIn">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-semibold px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>Ghanaian NGO & Humanitarian Outreach</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight leading-tight drop-shadow-md text-white">
            {currentSlide.title}
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-2xl font-light">
            {currentSlide.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
            <Link
              href={currentSlide.button1Link || "/donate"}
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-gold-500 to-amber-600 hover:from-amber-600 hover:to-brand-gold-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all text-base text-center"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span>{currentSlide.button1Text || "Donate Now"}</span>
            </Link>

            <Link
              href={currentSlide.button2Link || "/get-involved"}
              className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold px-6 py-3.5 rounded-xl border border-white/30 hover:border-white/50 transition-all text-base text-center"
            >
              <span>{currentSlide.button2Text || "Support Our Mission"}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Slider Nav Controls */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition-all backdrop-blur-sm hidden sm:block"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition-all backdrop-blur-sm hidden sm:block"
            aria-label="Next Slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIdx
                    ? 'w-8 bg-brand-gold-500'
                    : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 text-white/60 animate-bounce hidden md:block">
        <ArrowDown size={20} />
      </div>
    </section>
  );
}

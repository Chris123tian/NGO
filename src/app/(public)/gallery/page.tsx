'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getGalleryItems } from '@/lib/firebase/services';
import { GalleryItem } from '@/types';
import LightboxModal from '@/components/shared/LightboxModal';
import { Camera, Maximize2, Tag } from 'lucide-react';

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    getGalleryItems().then(setItems);
  }, []);

  const categories = [
    'All',
    'Community Outreach',
    'Education',
    'Food Distribution',
    'Clothing Donations',
    'Children',
    'Events',
    'Volunteers'
  ];

  const publishedItems = items.filter(i => i.published);
  const filteredItems = selectedCategory === 'All'
    ? publishedItems
    : publishedItems.filter(i => i.category === selectedCategory);

  return (
    <div className="py-12 space-y-16">
      
      {/* Header Banner */}
      <section className="bg-brand-green-900 text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="bg-amber-500 text-brand-green-950 text-xs font-extrabold uppercase px-3.5 py-1 rounded-full tracking-wider">
            Visual Highlights
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Photo Gallery
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto font-light leading-relaxed">
            Moments of joy, hope, and community outreach captured across Northern Ghana.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-2 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-green-700 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8 text-gray-500">
            No gallery images found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxItem(item)}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100 relative flex flex-col justify-between"
              >
                <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <Maximize2 size={24} />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-brand-green-900/90 text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                    {item.category}
                  </div>
                </div>

                <div className="p-4 bg-white space-y-1">
                  <h3 className="text-sm font-bold font-heading text-brand-green-900 group-hover:text-brand-gold-600 transition-colors">
                    {item.title}
                  </h3>
                  {item.caption && (
                    <p className="text-xs text-gray-500 font-light line-clamp-1">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Popup */}
      <LightboxModal
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
      />

    </div>
  );
}

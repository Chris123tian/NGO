'use client';

import React from 'react';
import Image from 'next/image';
import { X, MapPin, Calendar, Tag } from 'lucide-react';
import { GalleryItem } from '@/types';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export default function LightboxModal({ item, onClose }: LightboxModalProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      <div className="max-w-4xl w-full bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col max-h-[90vh]">
        
        {/* Main Image View */}
        <div className="relative w-full h-[360px] sm:h-[480px] bg-black">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-contain"
          />
        </div>

        {/* Details Footer */}
        <div className="p-6 bg-gray-900 text-white space-y-2 border-t border-gray-800">
          <div className="flex items-center space-x-3 text-xs text-amber-400 font-bold">
            <span className="flex items-center space-x-1 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              <Tag size={12} />
              <span>{item.category}</span>
            </span>
            <span className="flex items-center space-x-1 text-gray-400">
              <Calendar size={12} />
              <span>{item.createdAt}</span>
            </span>
          </div>

          <h3 className="text-xl font-bold font-heading text-white">
            {item.title}
          </h3>

          {item.caption && (
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              {item.caption}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

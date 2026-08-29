'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface LatestStoriesProps {
  posts: Post[];
}

export default function LatestStories({ posts }: LatestStoriesProps) {
  const publishedPosts = posts.filter(p => p.published);

  return (
    <section className="py-20 bg-brand-sand-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-gold-600 bg-amber-100/80 px-3.5 py-1 rounded-full border border-amber-200">
              News & Field Updates
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-brand-green-900 tracking-tight">
              Stories of Impact from Northern Ghana
            </h2>
            <p className="text-base text-gray-600 font-light">
              Read real updates directly from our volunteers and field coordinators across local communities.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              href="/stories"
              className="inline-flex items-center space-x-2 text-brand-green-800 font-bold hover:text-brand-green-950 transition-colors text-sm"
            >
              <span>View All News & Stories</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedPosts.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-brand-green-900/90 backdrop-blur-md text-amber-300 text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-4 text-xs text-gray-500 font-medium">
                    <span className="flex items-center space-x-1">
                      <Calendar size={12} className="text-amber-500" />
                      <span>{post.publishedDate}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <User size={12} className="text-amber-500" />
                      <span>{post.author}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-brand-green-900 group-hover:text-brand-gold-600 transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 font-light">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100">
                  <Link
                    href={`/stories/${post.slug}`}
                    className="inline-flex items-center space-x-1.5 text-brand-green-700 font-bold text-xs group/link"
                  >
                    <span>Read Full Story</span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

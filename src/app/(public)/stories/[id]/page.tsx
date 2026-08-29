import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/firebase/services';
import { Calendar, User, ArrowLeft, Heart, Share2, Tag } from 'lucide-react';

export const revalidate = 60;

export default async function StoryDetailPage({
  params
}: {
  params: { id: string }
}) {
  const post = await getPostBySlug(params.id);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Back button */}
      <div>
        <Link
          href="/stories"
          className="inline-flex items-center space-x-2 text-xs font-bold text-brand-green-700 hover:text-brand-green-950 bg-brand-green-50 px-3.5 py-2 rounded-xl transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to All News & Stories</span>
        </Link>
      </div>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 text-xs">
          <span className="bg-amber-500 text-brand-green-950 font-bold px-3 py-1 rounded-full uppercase">
            {post.category}
          </span>
          <span className="flex items-center space-x-1 text-gray-500">
            <Calendar size={12} className="text-amber-500" />
            <span>{post.publishedDate}</span>
          </span>
          <span className="flex items-center space-x-1 text-gray-500">
            <User size={12} className="text-amber-500" />
            <span>By {post.author}</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-brand-green-900 leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed border-l-4 border-amber-500 pl-4 py-1 italic bg-amber-50/50 rounded-r-xl">
          "{post.excerpt}"
        </p>
      </div>

      {/* Main Feature Image */}
      <div className="relative h-[360px] sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-xl border border-gray-100">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Text */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-gray-100 space-y-6 text-gray-800 leading-relaxed font-light text-base whitespace-pre-line">
        {post.content}
      </div>

      {/* Call to Action Banner */}
      <div className="bg-brand-green-900 text-white rounded-3xl p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-bold font-heading">Inspired by this story?</h3>
          <p className="text-xs text-emerald-100 font-light">
            Your support enables us to write more success stories in Northern Ghana.
          </p>
        </div>
        <Link
          href="/donate"
          className="bg-amber-500 hover:bg-amber-400 text-brand-green-950 font-bold px-6 py-3 rounded-xl text-xs shadow shrink-0 flex items-center space-x-2"
        >
          <Heart size={16} className="fill-brand-green-950" />
          <span>Donate to Support Outreach</span>
        </Link>
      </div>

    </article>
  );
}

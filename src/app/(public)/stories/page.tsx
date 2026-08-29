import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPosts } from '@/lib/firebase/services';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

export const revalidate = 60;

export default async function StoriesPage() {
  const posts = await getPosts();
  const publishedPosts = posts.filter(p => p.published);

  return (
    <div className="py-12 space-y-16">
      
      {/* Header Banner */}
      <section className="bg-brand-green-900 text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="bg-amber-500 text-brand-green-950 text-xs font-extrabold uppercase px-3.5 py-1 rounded-full tracking-wider">
            Field Reports & Updates
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            News & Impact Stories
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto font-light leading-relaxed">
            Read inspiring stories, outreach highlights, and humanitarian progress directly from Northern Ghana.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {publishedPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8 text-gray-500">
            No stories published yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-brand-green-900/90 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-1">
                      <Tag size={12} />
                      <span>{post.category}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
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

                    <h2 className="text-xl font-bold font-heading text-brand-green-900 group-hover:text-brand-gold-600 transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h2>

                    <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 font-light">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-50">
                  <Link
                    href={`/stories/${post.slug}`}
                    className="inline-flex items-center space-x-2 text-brand-green-700 font-bold text-xs group/link"
                  >
                    <span>Read Complete Article</span>
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

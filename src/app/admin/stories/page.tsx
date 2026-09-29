'use client';

import React, { useEffect, useState } from 'react';
import {
  getPosts,
  savePost,
  deletePost,
  getSuccessStories,
  saveSuccessStory,
  deleteSuccessStory
} from '@/lib/firebase/services';
import { Post, SuccessStory } from '@/types';
import ImageUploader from '@/components/admin/ImageUploader';
import Image from 'next/image';
import { Plus, Trash2, Edit3, Newspaper, Save, X, Eye, EyeOff, Award } from 'lucide-react';

export default function AdminStoriesPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [stories, setStories] = useState<SuccessStory[]>([]);
  
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [editingStory, setEditingStory] = useState<Partial<SuccessStory> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    getPosts().then(setPosts);
    getSuccessStories().then(setStories);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !editingPost.title) return;

    setSaving(true);
    await savePost({
      id: editingPost.id,
      title: editingPost.title,
      slug: editingPost.slug || editingPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: editingPost.excerpt || '',
      content: editingPost.content || '',
      category: editingPost.category || 'Education',
      author: editingPost.author || 'Rescue Foundation Team',
      publishedDate: editingPost.publishedDate || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      imageUrl: editingPost.imageUrl || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
      published: editingPost.published ?? true
    });

    setEditingPost(null);
    setSaving(false);
    loadAll();
  };

  const handleDeletePost = async (id: string) => {
    if (confirm('Delete this news story?')) {
      await deletePost(id);
      loadAll();
    }
  };

  const handleSaveStory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStory || !editingStory.title) return;

    setSaving(true);
    await saveSuccessStory({
      id: editingStory.id,
      title: editingStory.title,
      summary: editingStory.summary || '',
      community: editingStory.community || 'Northern Ghana',
      programInvolved: editingStory.programInvolved || 'Community Outreach',
      impact: editingStory.impact || '',
      imageUrl: editingStory.imageUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
      published: editingStory.published ?? true
    });

    setEditingStory(null);
    setSaving(false);
    loadAll();
  };

  const handleDeleteStory = async (id: string) => {
    if (confirm('Delete this success story?')) {
      await deleteSuccessStory(id);
      loadAll();
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      
      {/* 1. Blog / News Stories Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold font-heading text-brand-green-900 flex items-center space-x-2">
              <Newspaper className="w-6 h-6 text-amber-500" />
              <span>News & Blog Articles Manager</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Publish news stories, field reports, and press updates.
            </p>
          </div>

          <button
            onClick={() => setEditingPost({ category: 'Education', published: true, author: 'Rescue Foundation Team' })}
            className="bg-amber-500 hover:bg-amber-400 text-brand-green-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 shadow"
          >
            <Plus size={16} />
            <span>Create Article</span>
          </button>
        </div>

        {/* Post Form */}
        {editingPost && (
          <form onSubmit={handleSavePost} className="bg-white rounded-3xl p-6 shadow-xl border border-amber-200 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold font-heading text-brand-green-900">
                {editingPost.id ? 'Edit Article' : 'Write New Article'}
              </h3>
              <button type="button" onClick={() => setEditingPost(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={editingPost.title || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Category *</label>
                <select
                  value={editingPost.category || 'Education'}
                  onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value as Post['category'] })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600"
                >
                  <option value="Community">Community</option>
                  <option value="Education">Education</option>
                  <option value="Food Support">Food Support</option>
                  <option value="Children">Children</option>
                  <option value="Orphans">Orphans</option>
                  <option value="Donations">Donations</option>
                  <option value="Events">Events</option>
                  <option value="Volunteers">Volunteers</option>
                  <option value="Success Stories">Success Stories</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Author Name</label>
                <input
                  type="text"
                  value={editingPost.author || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Publication Date</label>
                <input
                  type="text"
                  placeholder="e.g. August 26, 2026"
                  value={editingPost.publishedDate || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, publishedDate: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Short Excerpt *</label>
              <textarea
                rows={2}
                required
                value={editingPost.excerpt || ''}
                onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Rich Full Article Content</label>
              <textarea
                rows={6}
                value={editingPost.content || ''}
                onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs"
              />
            </div>

            <ImageUploader
              currentImageUrl={editingPost.imageUrl}
              onUploadSuccess={(url) => setEditingPost({ ...editingPost, imageUrl: url })}
              folder="blog"
              label="Article Cover Photo"
            />

            <div className="pt-2 flex justify-end space-x-3">
              <button type="button" onClick={() => setEditingPost(null)} className="bg-gray-100 text-gray-700 font-bold px-4 py-2 rounded-xl text-xs">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold px-6 py-2 rounded-xl text-xs flex items-center space-x-1">
                <Save size={14} />
                <span>Save Article</span>
              </button>
            </div>
          </form>
        )}

        {/* Posts Table / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm p-4 space-y-3 flex flex-col justify-between">
              <div>
                <div className="relative h-36 w-full rounded-2xl overflow-hidden bg-gray-100 mb-3">
                  <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
                </div>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                  {post.category}
                </span>
                <h3 className="text-sm font-bold font-heading text-brand-green-900 mt-1 line-clamp-2">{post.title}</h3>
              </div>

              <div className="flex justify-between items-center border-t border-gray-50 pt-3">
                <span className="text-[11px] text-gray-400">{post.publishedDate}</span>
                <div className="flex space-x-2">
                  <button onClick={() => setEditingPost(post)} className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-1.5 rounded-lg">
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => handleDeletePost(post.id)} className="bg-red-50 hover:bg-red-100 text-red-600 p-1.5 rounded-lg">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Success Stories Section */}
      <div id="success" className="space-y-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold font-heading text-brand-green-900 flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Dignified Beneficiary Success Stories</span>
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Highlight real beneficiary transformation in a respectful manner.
            </p>
          </div>

          <button
            onClick={() => setEditingStory({ published: true })}
            className="bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5"
          >
            <Plus size={14} />
            <span>Add Success Story</span>
          </button>
        </div>

        {editingStory && (
          <form onSubmit={handleSaveStory} className="bg-white rounded-3xl p-6 shadow-xl border border-amber-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Story Headline *</label>
                <input
                  type="text"
                  required
                  value={editingStory.title || ''}
                  onChange={(e) => setEditingStory({ ...editingStory, title: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Community / Location</label>
                <input
                  type="text"
                  value={editingStory.community || ''}
                  onChange={(e) => setEditingStory({ ...editingStory, community: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Impact Summary</label>
              <textarea
                rows={2}
                value={editingStory.summary || ''}
                onChange={(e) => setEditingStory({ ...editingStory, summary: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <ImageUploader
              currentImageUrl={editingStory.imageUrl}
              onUploadSuccess={(url) => setEditingStory({ ...editingStory, imageUrl: url })}
              folder="stories"
              label="Beneficiary Photo (Respectful representation)"
            />

            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => setEditingStory(null)} className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg">Cancel</button>
              <button type="submit" className="bg-amber-500 text-brand-green-950 text-xs font-bold px-4 py-1.5 rounded-lg">Save Story</button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
}

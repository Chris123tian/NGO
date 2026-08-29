'use client';

import React, { useEffect, useState } from 'react';
import { getHeroSlides, saveHeroSlide, deleteHeroSlide } from '@/lib/firebase/services';
import { HeroSlide } from '@/types';
import ImageUploader from '@/components/admin/ImageUploader';
import Image from 'next/image';
import { Plus, Trash2, Edit3, CheckCircle2, Sliders, Eye, EyeOff, Save, X } from 'lucide-react';

export default function AdminHeroPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [editingSlide, setEditingSlide] = useState<Partial<HeroSlide> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSlides();
  }, []);

  const loadSlides = async () => {
    const res = await getHeroSlides();
    setSlides(res);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide || !editingSlide.title) return;

    setSaving(true);
    await saveHeroSlide({
      id: editingSlide.id,
      title: editingSlide.title,
      subtitle: editingSlide.subtitle || '',
      button1Text: editingSlide.button1Text || 'Donate Now',
      button1Link: editingSlide.button1Link || '/donate',
      button2Text: editingSlide.button2Text || 'Support Our Mission',
      button2Link: editingSlide.button2Link || '/get-involved',
      imageUrl: editingSlide.imageUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop',
      active: editingSlide.active ?? true,
      order: editingSlide.order || slides.length + 1
    });
    setEditingSlide(null);
    setSaving(false);
    loadSlides();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this hero slide?')) {
      await deleteHeroSlide(id);
      loadSlides();
    }
  };

  const toggleActive = async (slide: HeroSlide) => {
    await saveHeroSlide({ ...slide, active: !slide.active });
    loadSlides();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-brand-green-900 flex items-center space-x-2">
            <Sliders className="w-6 h-6 text-amber-500" />
            <span>Homepage Hero Slides Manager</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage full-width banner slides shown on the homepage.
          </p>
        </div>

        <button
          onClick={() => setEditingSlide({ active: true, order: slides.length + 1 })}
          className="bg-amber-500 hover:bg-amber-400 text-brand-green-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 shadow"
        >
          <Plus size={16} />
          <span>Add Hero Slide</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editingSlide && (
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 shadow-xl border border-amber-200 space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h3 className="text-base font-bold font-heading text-brand-green-900">
              {editingSlide.id ? 'Edit Hero Slide' : 'Create New Hero Slide'}
            </h3>
            <button type="button" onClick={() => setEditingSlide(null)} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Headline Title *</label>
              <input
                type="text"
                required
                value={editingSlide.title || ''}
                onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Slide Order / Priority</label>
              <input
                type="number"
                value={editingSlide.order || 1}
                onChange={(e) => setEditingSlide({ ...editingSlide, order: parseInt(e.target.value) || 1 })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Subtitle / Supporting Text</label>
            <textarea
              rows={2}
              value={editingSlide.subtitle || ''}
              onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Button 1 Label & Link</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Donate Now"
                  value={editingSlide.button1Text || ''}
                  onChange={(e) => setEditingSlide({ ...editingSlide, button1Text: e.target.value })}
                  className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs"
                />
                <input
                  type="text"
                  placeholder="/donate"
                  value={editingSlide.button1Link || ''}
                  onChange={(e) => setEditingSlide({ ...editingSlide, button1Link: e.target.value })}
                  className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Button 2 Label & Link</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Support Our Mission"
                  value={editingSlide.button2Text || ''}
                  onChange={(e) => setEditingSlide({ ...editingSlide, button2Text: e.target.value })}
                  className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs"
                />
                <input
                  type="text"
                  placeholder="/get-involved"
                  value={editingSlide.button2Link || ''}
                  onChange={(e) => setEditingSlide({ ...editingSlide, button2Link: e.target.value })}
                  className="w-1/2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>
          </div>

          <ImageUploader
            currentImageUrl={editingSlide.imageUrl}
            onUploadSuccess={(url) => setEditingSlide({ ...editingSlide, imageUrl: url })}
            folder="hero"
            label="Slide Background Image"
          />

          <div className="pt-2 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setEditingSlide(null)}
              className="bg-gray-100 text-gray-700 font-bold px-4 py-2 rounded-xl text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold px-6 py-2 rounded-xl text-xs flex items-center space-x-1"
            >
              <Save size={14} />
              <span>Save Slide</span>
            </button>
          </div>
        </form>
      )}

      {/* Slides List */}
      <div className="space-y-4">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div className="flex items-center space-x-4">
              <div className="relative w-32 h-20 rounded-2xl overflow-hidden shrink-0 bg-gray-100 shadow-sm">
                <Image src={slide.imageUrl} alt={slide.title} fill className="object-cover" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                    Order #{slide.order}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    slide.active ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {slide.active ? 'Active' : 'Disabled'}
                  </span>
                </div>
                <h3 className="text-base font-bold font-heading text-brand-green-900">{slide.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-1">{slide.subtitle}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => toggleActive(slide)}
                className={`p-2 rounded-xl text-xs font-bold flex items-center space-x-1 border ${
                  slide.active ? 'bg-gray-50 text-gray-600 border-gray-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
              >
                {slide.active ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{slide.active ? 'Disable' : 'Enable'}</span>
              </button>

              <button
                onClick={() => setEditingSlide(slide)}
                className="bg-brand-sand-100 hover:bg-brand-sand-200 text-gray-800 p-2.5 rounded-xl transition-colors"
                title="Edit Slide"
              >
                <Edit3 size={16} />
              </button>

              <button
                onClick={() => handleDelete(slide.id)}
                className="bg-red-50 hover:bg-red-100 text-red-600 p-2.5 rounded-xl transition-colors"
                title="Delete Slide"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

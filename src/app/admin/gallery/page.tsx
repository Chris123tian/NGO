'use client';

import React, { useEffect, useState } from 'react';
import { getGalleryItems, saveGalleryItem, deleteGalleryItem } from '@/lib/firebase/services';
import { GalleryItem } from '@/types';
import ImageUploader from '@/components/admin/ImageUploader';
import Image from 'next/image';
import { Images, Plus, Trash2, Tag, Save, X, Eye, EyeOff } from 'lucide-react';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [editingItem, setEditingItem] = useState<Partial<GalleryItem> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    getGalleryItems().then(setItems);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.imageUrl) return;

    setSaving(true);
    await saveGalleryItem({
      id: editingItem.id,
      title: editingItem.title || 'Outreach Photo',
      category: editingItem.category || 'Community Outreach',
      imageUrl: editingItem.imageUrl,
      caption: editingItem.caption || '',
      published: editingItem.published ?? true,
      createdAt: editingItem.createdAt || new Date().toISOString().split('T')[0]
    });

    setEditingItem(null);
    setSaving(false);
    loadGallery();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this gallery photo?')) {
      await deleteGalleryItem(id);
      loadGallery();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-brand-green-900 flex items-center space-x-2">
            <Images className="w-6 h-6 text-amber-500" />
            <span>Photo Gallery & Media Manager</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Upload new outreach images with Firebase Storage and manage category tags.
          </p>
        </div>

        <button
          onClick={() => setEditingItem({ category: 'Community Outreach', published: true })}
          className="bg-amber-500 hover:bg-amber-400 text-brand-green-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 shadow"
        >
          <Plus size={16} />
          <span>Upload New Image</span>
        </button>
      </div>

      {/* Upload Form */}
      {editingItem && (
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 shadow-xl border border-amber-200 space-y-4 max-w-2xl">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h3 className="text-base font-bold font-heading text-brand-green-900">
              {editingItem.id ? 'Edit Image Details' : 'Upload Gallery Image'}
            </h3>
            <button type="button" onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          <ImageUploader
            currentImageUrl={editingItem.imageUrl}
            onUploadSuccess={(url) => setEditingItem({ ...editingItem, imageUrl: url })}
            folder="gallery"
            label="Select Photo to Upload *"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Image Title</label>
              <input
                type="text"
                placeholder="e.g. Books Distribution in Yendi"
                value={editingItem.title || ''}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-brand-green-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Gallery Category *</label>
              <select
                value={editingItem.category || 'Community Outreach'}
                onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as GalleryItem['category'] })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-brand-green-600"
              >
                <option value="Community Outreach">Community Outreach</option>
                <option value="Education">Education</option>
                <option value="Food Distribution">Food Distribution</option>
                <option value="Clothing Donations">Clothing Donations</option>
                <option value="Children">Children</option>
                <option value="Events">Events</option>
                <option value="Volunteers">Volunteers</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Caption / Location Context</label>
            <input
              type="text"
              placeholder="e.g. Pupils in West Gonja celebrating new desks."
              value={editingItem.caption || ''}
              onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs"
            />
          </div>

          <div className="pt-2 flex justify-end space-x-3">
            <button type="button" onClick={() => setEditingItem(null)} className="bg-gray-100 text-gray-700 font-bold px-4 py-2 rounded-xl text-xs">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold px-6 py-2 rounded-xl text-xs flex items-center space-x-1">
              <Save size={14} />
              <span>Save to Gallery</span>
            </button>
          </div>
        </form>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm flex flex-col justify-between p-3 space-y-3">
            <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-gray-100">
              <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
              <div className="absolute top-2 left-2 bg-brand-green-900/90 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {item.category}
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xs font-bold font-heading text-brand-green-900 line-clamp-1">{item.title}</h3>
              {item.caption && <p className="text-[11px] text-gray-500 line-clamp-1 font-light">{item.caption}</p>}
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-50">
              <span className="text-[10px] text-gray-400">{item.createdAt}</span>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-50 hover:bg-red-100 text-red-600 p-1.5 rounded-lg"
                title="Delete Photo"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

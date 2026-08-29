'use client';

import React, { useEffect, useState } from 'react';
import { getPrograms, saveProgram, deleteProgram } from '@/lib/firebase/services';
import { Program } from '@/types';
import ImageUploader from '@/components/admin/ImageUploader';
import Image from 'next/image';
import { Plus, Trash2, Edit3, FolderHeart, Save, X, Eye, EyeOff } from 'lucide-react';

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [editingProg, setEditingProg] = useState<Partial<Program> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    const res = await getPrograms();
    setPrograms(res);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProg || !editingProg.title) return;

    setSaving(true);
    await saveProgram({
      id: editingProg.id,
      title: editingProg.title,
      category: editingProg.category || 'Education',
      shortDescription: editingProg.shortDescription || '',
      fullDescription: editingProg.fullDescription || '',
      imageUrl: editingProg.imageUrl || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
      published: editingProg.published ?? true,
      order: editingProg.order || programs.length + 1
    });
    setEditingProg(null);
    setSaving(false);
    loadPrograms();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this program?')) {
      await deleteProgram(id);
      loadPrograms();
    }
  };

  const togglePublish = async (prog: Program) => {
    await saveProgram({ ...prog, published: !prog.published });
    loadPrograms();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-brand-green-900 flex items-center space-x-2">
            <FolderHeart className="w-6 h-6 text-amber-500" />
            <span>Humanitarian Programs Manager</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Create, edit, upload images, and publish/unpublish core programs.
          </p>
        </div>

        <button
          onClick={() => setEditingProg({ category: 'Education', published: true, order: programs.length + 1 })}
          className="bg-amber-500 hover:bg-amber-400 text-brand-green-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-1.5 shadow"
        >
          <Plus size={16} />
          <span>Create New Program</span>
        </button>
      </div>

      {/* Program Editor Form */}
      {editingProg && (
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 shadow-xl border border-amber-200 space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h3 className="text-base font-bold font-heading text-brand-green-900">
              {editingProg.id ? 'Edit Program Details' : 'Create New Program'}
            </h3>
            <button type="button" onClick={() => setEditingProg(null)} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Program Title *</label>
              <input
                type="text"
                required
                value={editingProg.title || ''}
                onChange={(e) => setEditingProg({ ...editingProg, title: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Support Category *</label>
              <select
                value={editingProg.category || 'Education'}
                onChange={(e) => setEditingProg({ ...editingProg, category: e.target.value as Program['category'] })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600"
              >
                <option value="Food">Food Support</option>
                <option value="Clothing">Clothing Support</option>
                <option value="Education">Education Support</option>
                <option value="Orphans">Support for Orphans</option>
                <option value="Outreach">Community Outreach</option>
                <option value="Emergency">Emergency Assistance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Short Summary Excerpt *</label>
            <input
              type="text"
              required
              value={editingProg.shortDescription || ''}
              onChange={(e) => setEditingProg({ ...editingProg, shortDescription: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Detailed Narrative</label>
            <textarea
              rows={4}
              value={editingProg.fullDescription || ''}
              onChange={(e) => setEditingProg({ ...editingProg, fullDescription: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600"
            />
          </div>

          <ImageUploader
            currentImageUrl={editingProg.imageUrl}
            onUploadSuccess={(url) => setEditingProg({ ...editingProg, imageUrl: url })}
            folder="programs"
            label="Program Cover Image"
          />

          <div className="pt-2 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setEditingProg(null)}
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
              <span>Save Program</span>
            </button>
          </div>
        </form>
      )}

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((prog) => (
          <div
            key={prog.id}
            className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 w-full bg-gray-100">
                <Image src={prog.imageUrl} alt={prog.title} fill className="object-cover" />
                <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 rounded-full text-[11px] font-bold text-brand-green-900 shadow">
                  {prog.category} Support
                </div>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold font-heading text-brand-green-900">{prog.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    prog.published ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {prog.published ? 'Published' : 'Hidden'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 line-clamp-3 font-light leading-relaxed">
                  {prog.shortDescription}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-gray-50 flex items-center justify-between mt-2">
              <button
                onClick={() => togglePublish(prog)}
                className={`p-2 rounded-xl text-xs font-bold flex items-center space-x-1 border ${
                  prog.published ? 'bg-gray-50 text-gray-600 border-gray-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
              >
                {prog.published ? <EyeOff size={14} /> : <Eye size={14} />}
                <span>{prog.published ? 'Unpublish' : 'Publish'}</span>
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingProg(prog)}
                  className="bg-brand-sand-100 hover:bg-brand-sand-200 text-gray-800 p-2 rounded-xl"
                  title="Edit Program"
                >
                  <Edit3 size={16} />
                </button>

                <button
                  onClick={() => handleDelete(prog.id)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-xl"
                  title="Delete Program"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

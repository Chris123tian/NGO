'use client';

import React, { useEffect, useState } from 'react';
import { getWebsiteSettings, updateWebsiteSettings } from '@/lib/firebase/services';
import { WebsiteSettings } from '@/types';
import ImageUploader from '@/components/admin/ImageUploader';
import { Save, CheckCircle2, Loader2, Settings as SettingsIcon } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    getWebsiteSettings().then((res) => {
      setSettings(res);
      setLoading(false);
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setSavedSuccess(false);

    try {
      await updateWebsiteSettings(settings);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (e) {}
    setSaving(false);
  };

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center p-12 text-gray-500 space-x-2">
        <Loader2 className="animate-spin text-amber-500" />
        <span>Loading Website Settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-brand-green-900 flex items-center space-x-2">
            <SettingsIcon className="w-6 h-6 text-amber-500" />
            <span>Website Settings & Identity</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Changes saved here automatically reflect across the public website.
          </p>
        </div>

        {savedSuccess && (
          <div className="bg-emerald-100 text-brand-green-900 text-xs font-bold px-4 py-2 rounded-xl flex items-center space-x-1.5 border border-emerald-200 shadow-sm animate-fadeIn">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>Settings Saved Successfully!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 space-y-6">
        
        {/* NGO Basic Info */}
        <div className="border-b border-gray-100 pb-6 space-y-4">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider text-brand-green-900">
            1. NGO Basic Information & Contact
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Organization Name</label>
              <input
                type="text"
                required
                value={settings.orgName}
                onChange={(e) => setSettings({ ...settings, orgName: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600 focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Numbers</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Official Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">WhatsApp Number</label>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Physical HQ Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="border-b border-gray-100 pb-6 space-y-4">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider text-brand-green-900">
            2. Social Media Handles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Facebook URL</label>
              <input
                type="url"
                value={settings.facebookUrl}
                onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-green-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Instagram URL</label>
              <input
                type="url"
                value={settings.instagramUrl}
                onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-green-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">YouTube URL</label>
              <input
                type="url"
                value={settings.youtubeUrl}
                onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-green-600"
              />
            </div>
          </div>
        </div>

        {/* Core Texts */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider text-brand-green-900">
            3. Mission, Vision, About & Footer Texts
          </h3>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mission Statement</label>
            <textarea
              rows={3}
              value={settings.mission}
              onChange={(e) => setSettings({ ...settings, mission: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Vision Statement</label>
            <textarea
              rows={3}
              value={settings.vision}
              onChange={(e) => setSettings({ ...settings, vision: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">About Us Detailed Narrative</label>
            <textarea
              rows={4}
              value={settings.aboutText}
              onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Footer Excerpt Text</label>
            <input
              type="text"
              value={settings.footerText}
              onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600 focus:bg-white"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-brand-green-950 font-bold px-8 py-3.5 rounded-xl shadow-md transition-all text-xs disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-brand-green-950" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Website Settings</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}

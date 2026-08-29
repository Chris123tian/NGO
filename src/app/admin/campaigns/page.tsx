'use client';

import React, { useEffect, useState } from 'react';
import { getFeaturedCampaign, saveCampaign } from '@/lib/firebase/services';
import { Campaign } from '@/types';
import ImageUploader from '@/components/admin/ImageUploader';
import Image from 'next/image';
import { Target, Save, Loader2, CheckCircle2 } from 'lucide-react';

export default function AdminCampaignsPage() {
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    getFeaturedCampaign().then(setCampaign);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaign) return;

    setSaving(true);
    await saveCampaign(campaign);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
    setSaving(false);
  };

  if (!campaign) {
    return (
      <div className="flex items-center justify-center p-12 text-gray-500">
        <Loader2 className="animate-spin text-amber-500" />
        <span>Loading Campaign Data...</span>
      </div>
    );
  }

  const percentage = Math.min(100, Math.round((campaign.raisedAmount / campaign.targetAmount) * 100));

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-brand-green-900 flex items-center space-x-2">
            <Target className="w-6 h-6 text-amber-500" />
            <span>Featured Community Campaign Manager</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage the urgent fundraising campaign displayed on the homepage.
          </p>
        </div>

        {successMsg && (
          <div className="bg-emerald-100 text-brand-green-900 text-xs font-bold px-4 py-2 rounded-xl flex items-center space-x-1.5 border border-emerald-200">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>Campaign Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100 space-y-6">
        
        {/* Campaign Title & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Campaign Title *</label>
            <input
              type="text"
              required
              value={campaign.title}
              onChange={(e) => setCampaign({ ...campaign, title: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Target Community / Location</label>
            <input
              type="text"
              value={campaign.location}
              onChange={(e) => setCampaign({ ...campaign, location: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600"
            />
          </div>
        </div>

        {/* Narrative Description */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Campaign Description</label>
          <textarea
            rows={3}
            value={campaign.description}
            onChange={(e) => setCampaign({ ...campaign, description: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600"
          />
        </div>

        {/* Financial Numbers & Target Progress */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-brand-sand-50 p-4 rounded-2xl border border-brand-sand-200">
          
          <div>
            <label className="block text-xs font-bold text-brand-green-900 uppercase mb-1">Target Goal (GHS)</label>
            <input
              type="number"
              min={100}
              value={campaign.targetAmount}
              onChange={(e) => setCampaign({ ...campaign, targetAmount: parseFloat(e.target.value) || 0 })}
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-sm font-bold text-brand-green-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-amber-700 uppercase mb-1">Raised So Far (GHS)</label>
            <input
              type="number"
              min={0}
              value={campaign.raisedAmount}
              onChange={(e) => setCampaign({ ...campaign, raisedAmount: parseFloat(e.target.value) || 0 })}
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-sm font-bold text-amber-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Beneficiaries Targeted</label>
            <input
              type="number"
              min={1}
              value={campaign.beneficiaryCount}
              onChange={(e) => setCampaign({ ...campaign, beneficiaryCount: parseInt(e.target.value) || 0 })}
              className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-sm font-bold text-gray-800"
            />
          </div>

        </div>

        {/* Live Progress Bar Preview */}
        <div className="bg-brand-green-950 p-4 rounded-2xl text-white space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-amber-400">Live Progress Preview: {percentage}%</span>
            <span>GHS {campaign.raisedAmount.toLocaleString()} / GHS {campaign.targetAmount.toLocaleString()}</span>
          </div>
          <div className="w-full bg-emerald-900 rounded-full h-3 overflow-hidden p-0.5">
            <div className="bg-amber-400 h-full rounded-full transition-all" style={{ width: `${percentage}%` }} />
          </div>
        </div>

        {/* Image Uploader */}
        <ImageUploader
          currentImageUrl={campaign.imageUrl}
          onUploadSuccess={(url) => setCampaign({ ...campaign, imageUrl: url })}
          folder="campaigns"
          label="Campaign Cover Photo"
        />

        {/* Active Toggle */}
        <div className="flex items-center space-x-3 pt-2">
          <input
            type="checkbox"
            id="active-camp"
            checked={campaign.active}
            onChange={(e) => setCampaign({ ...campaign, active: e.target.checked })}
            className="w-5 h-5 accent-brand-green-700 rounded"
          />
          <label htmlFor="active-camp" className="text-xs font-bold text-gray-800 cursor-pointer">
            Display this campaign on public website homepage
          </label>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-brand-green-950 font-bold px-8 py-3.5 rounded-xl shadow-md transition-all text-xs disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-brand-green-950" />
                <span>Saving Campaign...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Campaign Changes</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}

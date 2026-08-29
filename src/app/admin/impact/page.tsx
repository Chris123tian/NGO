'use client';

import React, { useEffect, useState } from 'react';
import { getImpactStats, saveImpactStat } from '@/lib/firebase/services';
import { ImpactStat } from '@/types';
import { BarChart3, Save, CheckCircle2, Loader2 } from 'lucide-react';

export default function AdminImpactPage() {
  const [stats, setStats] = useState<ImpactStat[]>([]);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    getImpactStats().then(setStats);
  }, []);

  const handleChange = (id: string, field: keyof ImpactStat, val: any) => {
    setStats((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  const handleSaveAll = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    for (const stat of stats) {
      await saveImpactStat(stat);
    }

    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 4000);
    setSaving(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-brand-green-900 flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-amber-500" />
            <span>Impact Statistics Manager</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Update impact counter numbers displayed on the homepage and impact page.
          </p>
        </div>

        {successMsg && (
          <div className="bg-emerald-100 text-brand-green-900 text-xs font-bold px-4 py-2 rounded-xl flex items-center space-x-1.5 border border-emerald-200">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>Impact Numbers Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((st) => (
            <div
              key={st.id}
              className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 space-y-4"
            >
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  Counter #{st.order}
                </span>
                <span className="text-xl font-extrabold text-brand-green-900 font-heading">
                  {st.value}{st.suffix}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Metric Label</label>
                <input
                  type="text"
                  required
                  value={st.label}
                  onChange={(e) => handleChange(st.id, 'label', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-brand-green-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Numerical Value</label>
                  <input
                    type="number"
                    min={0}
                    required
                    value={st.value}
                    onChange={(e) => handleChange(st.id, 'value', parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-bold text-brand-green-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Suffix (e.g. +)</label>
                  <input
                    type="text"
                    value={st.suffix}
                    onChange={(e) => handleChange(st.id, 'suffix', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-bold text-amber-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Supporting Description</label>
                <input
                  type="text"
                  value={st.description}
                  onChange={(e) => handleChange(st.id, 'description', e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs font-light text-gray-600"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-brand-green-950 font-bold px-8 py-3.5 rounded-xl shadow-md transition-all text-xs disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-brand-green-950" />
                <span>Saving Impact Counters...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save All Impact Numbers</span>
              </>
            )}
          </button>
        </div>
      </form>

    </div>
  );
}

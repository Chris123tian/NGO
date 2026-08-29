import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getImpactStats, getSuccessStories } from '@/lib/firebase/services';
import ImpactStats from '@/components/home/ImpactStats';
import TestimonialSection from '@/components/home/TestimonialSection';
import { Award, BookOpen, Users, MapPin, Download, Heart, CheckCircle2 } from 'lucide-react';

export const revalidate = 60;

export default async function ImpactPage() {
  const stats = await getImpactStats();
  const stories = await getSuccessStories();

  const impactBreakdown = [
    { title: "Educational Learning Packs", value: "3,800+", detail: "Textbooks, exercise books, and stationery delivered to rural pupils." },
    { title: "Nutritious Food Parcels", value: "2,100+", detail: "Monthly family food baskets distributed in dry season months." },
    { title: "School Uniforms & Shoes", value: "1,250+", detail: "Durable clothing items provided for pupils walking long distances." },
    { title: "Emergency Aid Packages", value: "420+", detail: "Disaster relief and emergency medical assistance granted." },
  ];

  return (
    <div className="py-12 space-y-16">
      
      {/* Header Banner */}
      <section className="bg-brand-green-900 text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="bg-amber-500 text-brand-green-950 text-xs font-extrabold uppercase px-3.5 py-1 rounded-full tracking-wider">
            Verified Impact & Accountability
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Our Measurable Results
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto font-light leading-relaxed">
            See how your support transforms vulnerable lives and strengthens communities across Northern Ghana.
          </p>
        </div>
      </section>

      {/* Impact Stats Counters */}
      <ImpactStats stats={stats} />

      {/* Breakdown Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-brand-gold-600 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
            Detailed Metrics
          </span>
          <h2 className="text-3xl font-extrabold font-heading text-brand-green-900">
            Tangible Deliverables Provided to Date
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactBreakdown.map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-green-50 text-brand-green-700 flex items-center justify-center font-bold">
                <Award size={24} className="text-amber-500" />
              </div>
              <div className="text-3xl font-extrabold font-heading text-brand-green-900">
                {item.value}
              </div>
              <h3 className="text-sm font-bold text-gray-800">{item.title}</h3>
              <p className="text-xs text-gray-500 font-light leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Beneficiary Success Stories */}
      <TestimonialSection stories={stories} />

      {/* Transparency & Annual Report Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <span className="bg-emerald-100 text-brand-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
              Financial Integrity & Accountability
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-brand-green-900">
              100% Transparency in Every Outreach Campaign
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
              We publish regular field updates and financial statements. Every cedi donated is allocated directly towards purchasing educational books, food supplies, uniforms, and emergency aid for verified beneficiaries.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col space-y-3">
            <button className="inline-flex items-center justify-center space-x-2 bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow transition-colors text-xs">
              <Download size={16} className="text-amber-400" />
              <span>Download 2025/2026 Impact Report (PDF)</span>
            </button>
            <Link href="/donate" className="inline-flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-400 text-brand-green-950 font-bold py-3.5 px-6 rounded-2xl shadow transition-colors text-xs text-center">
              <Heart size={16} className="fill-brand-green-950" />
              <span>Sponsor a Community Outreach</span>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}

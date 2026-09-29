import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getWebsiteSettings } from '@/lib/firebase/services';
import { ShieldCheck, Heart, Users, MapPin, Target, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export const revalidate = 60;

export default async function AboutPage() {
  const settings = await getWebsiteSettings();

  const regions = [
    { name: "Northern Region", hq: "Tamale / Yendi", focus: "School supplies, food drives, and orphan care." },
    { name: "Upper East Region", hq: "Bolgatanga / Navrongo", focus: "Emergency food parcels and clothing distribution." },
    { name: "Upper West Region", hq: "Wa / Lawra", focus: "Educational books and pupil desk sponsorships." },
    { name: "Savannah Region", hq: "Damongo / Bole", focus: "Hygiene kits and girl-child education support." },
    { name: "North East Region", hq: "Nalerigu / Walewale", focus: "Grassroots village outreach & health screening." }
  ];

  const team = [
    {
      name: "Dr. Alhassan Yakubu",
      role: "Executive Director & Founder",
      bio: "Born in Tamale, Dr. Yakubu has over 15 years experience in community development across Northern Ghana.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
    },
    {
      name: "Fatima Abdul-Rahman",
      role: "Head of Field Operations & Programs",
      bio: "Passionate community advocate overseeing rural distribution logistics and beneficiary verification.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
    },
    {
      name: "David Kwame Mensah",
      role: "Volunteer & Education Coordinator",
      bio: "Dedicated educator specializing in school learning kit distribution and teacher support.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
    }
  ];

  return (
    <div className="py-12 space-y-16">
      
      {/* Header Banner */}
      <section className="bg-brand-green-900 text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="bg-amber-500 text-brand-green-950 text-xs font-extrabold uppercase px-3.5 py-1 rounded-full tracking-wider">
            About Rescue Foundation Ghana
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Our Mission, Values & Community Reach
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto font-light leading-relaxed">
            Dedicated to restoring hope, dignity, and sustainable growth in underserved Ghanaian communities.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-extrabold font-heading text-brand-green-900 leading-tight">
              Bridging the Gap for Vulnerable Communities
            </h2>

            <p className="text-gray-700 leading-relaxed font-light text-base">
              {settings.aboutText}
            </p>

            <p className="text-gray-600 leading-relaxed font-light text-sm">
              We operate on a simple principle: every individual, regardless of their geographical location or economic standing, deserves access to basic human necessities, educational materials, and a supportive community.
            </p>

            <div className="pt-2 border-t border-gray-100 grid grid-cols-2 gap-4 text-xs font-bold text-brand-green-900">
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={16} className="text-amber-500" />
                <span>Registered Ghanaian NGO</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={16} className="text-amber-500" />
                <span>Verified Beneficiary Selection</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={16} className="text-amber-500" />
                <span>Zero Waste Distribution</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 size={16} className="text-amber-500" />
                <span>Community Leader Involvement</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[420px] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop"
              alt="Rescue Foundation Ghana Field Team"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </section>

      {/* Mission & Vision Detail */}
      <section className="bg-brand-sand-50 py-16 border-y border-brand-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-3xl p-8 shadow-md border border-emerald-100 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-green-600 text-amber-400 flex items-center justify-center">
              <Target size={24} />
            </div>
            <h3 className="text-2xl font-bold font-heading text-brand-green-900">OUR MISSION</h3>
            <p className="text-gray-700 leading-relaxed text-sm font-light">
              {settings.mission}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-md border border-amber-100 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center">
              <Compass size={24} />
            </div>
            <h3 className="text-2xl font-bold font-heading text-brand-green-900">OUR VISION</h3>
            <p className="text-gray-700 leading-relaxed text-sm font-light">
              {settings.vision}
            </p>
          </div>

        </div>
      </section>

      {/* Regional Operational Coverage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-brand-gold-600 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full">
            Geographical Reach
          </span>
          <h2 className="text-3xl font-extrabold font-heading text-brand-green-900">
            Operational Regions Across Northern Ghana
          </h2>
          <p className="text-xs text-gray-500">
            While based in Tamale, our outreach extends across the entire northern belt of Ghana.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((reg, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-2 hover:border-brand-green-300 transition-colors">
              <div className="flex items-center space-x-2 text-brand-green-700 font-bold text-lg font-heading">
                <MapPin size={18} className="text-amber-500 shrink-0" />
                <span>{reg.name}</span>
              </div>
              <div className="text-xs text-amber-700 font-semibold bg-amber-50 px-2.5 py-1 rounded inline-block">
                Key Hub: {reg.hq}
              </div>
              <p className="text-xs text-gray-600 font-light leading-relaxed pt-1">
                {reg.focus}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-brand-green-700 uppercase tracking-widest bg-brand-green-50 px-3 py-1 rounded-full">
            Our Team
          </span>
          <h2 className="text-3xl font-extrabold font-heading text-brand-green-900">
            Driven by Passion & Local Knowledge
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md p-6 space-y-4 text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-brand-green-50 shadow-md">
                <Image src={member.image} alt={member.name} fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading text-brand-green-900">{member.name}</h3>
                <span className="text-xs font-semibold text-amber-600 block mt-0.5">{member.role}</span>
              </div>
              <p className="text-xs text-gray-600 font-light leading-relaxed">
                "{member.bio}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        <div className="bg-gradient-to-r from-brand-green-900 to-brand-green-800 rounded-3xl p-10 text-white space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
            Partner With Us to Create Lasting Impact
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto">
            Whether you are an individual donor, corporate partner, or volunteer, your support helps us touch lives every day.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/donate" className="bg-amber-500 text-brand-green-950 font-bold px-6 py-3 rounded-xl shadow text-sm hover:bg-amber-400">
              Donate Today
            </Link>
            <Link href="/contact" className="bg-white/10 text-white font-bold px-6 py-3 rounded-xl border border-white/20 text-sm hover:bg-white/20">
              Contact Our Directors
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

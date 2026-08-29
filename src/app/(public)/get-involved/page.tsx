import React from 'react';
import Link from 'next/link';
import VolunteerForm from '@/components/shared/VolunteerForm';
import { Heart, Users, Handshake, PackageCheck, ArrowRight } from 'lucide-react';

export default function GetInvolvedPage() {
  const waysToHelp = [
    {
      icon: <Heart className="w-8 h-8 text-amber-500" />,
      title: "MAKE A DONATION",
      desc: "Your contribution provides food parcels, school uniforms, exercise books, and essential emergency care to individuals in need.",
      cta: "Donate Now",
      href: "/donate"
    },
    {
      icon: <Users className="w-8 h-8 text-brand-green-600" />,
      title: "BECOME A VOLUNTEER",
      desc: "Give your time, teaching skills, medical expertise, or field assistance to help us reach more deprived rural communities.",
      cta: "Apply Below",
      href: "#volunteer-form"
    },
    {
      icon: <Handshake className="w-8 h-8 text-amber-500" />,
      title: "PARTNER WITH US",
      desc: "Corporate organizations, educational institutions, and international foundations can collaborate with us for sustainable impact.",
      cta: "Contact Partnership Team",
      href: "/contact"
    },
    {
      icon: <PackageCheck className="w-8 h-8 text-brand-green-600" />,
      title: "DONATE MATERIALS",
      desc: "Donate quality clothes, reading books, desks, laptops, school bags, and non-perishable food items directly to our Tamale depot.",
      cta: "Material Donation Info",
      href: "/contact"
    }
  ];

  return (
    <div className="py-12 space-y-16">
      
      {/* Header Banner */}
      <section className="bg-brand-green-900 text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="bg-amber-500 text-brand-green-950 text-xs font-extrabold uppercase px-3.5 py-1 rounded-full tracking-wider">
            Join Hands With Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            How You Can Get Involved
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto font-light leading-relaxed">
            Every action, whether big or small, transforms lives across Northern Ghana.
          </p>
        </div>
      </section>

      {/* 4 Ways Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {waysToHelp.map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 flex flex-col justify-between space-y-4 hover:shadow-xl transition-all">
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-brand-sand-100 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold font-heading text-brand-green-900">{item.title}</h3>
                <p className="text-xs text-gray-600 font-light leading-relaxed">{item.desc}</p>
              </div>
              <div className="pt-2 border-t border-gray-50">
                <Link
                  href={item.href}
                  className="inline-flex items-center space-x-1.5 text-brand-green-700 font-bold text-xs hover:text-brand-green-900"
                >
                  <span>{item.cta}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Volunteer Application Form Section */}
      <section id="volunteer-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <VolunteerForm />
      </section>

    </div>
  );
}

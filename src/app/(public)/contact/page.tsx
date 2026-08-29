import React from 'react';
import ContactForm from '@/components/shared/ContactForm';
import { getWebsiteSettings } from '@/lib/firebase/services';
import { MapPin, Phone, Mail, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await getWebsiteSettings();

  return (
    <div className="py-12 space-y-16">
      
      {/* Header Banner */}
      <section className="bg-brand-green-900 text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <span className="bg-amber-500 text-brand-green-950 text-xs font-extrabold uppercase px-3.5 py-1 rounded-full tracking-wider">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white tracking-tight">
            Contact HopeReach Ghana
          </h1>
          <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto font-light leading-relaxed">
            Have questions about our programs, donations, or partnerships? We're here to assist you.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Info */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-3">
              <h2 className="text-2xl font-extrabold font-heading text-brand-green-900">
                Northern Ghana Headquarters
              </h2>
              <p className="text-xs text-gray-600 font-light leading-relaxed">
                Our main office coordinates outreach exercises across all northern regions of Ghana.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 space-y-5 text-sm text-gray-700">
              
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="font-bold text-brand-green-900 block text-xs uppercase tracking-wider">Office Address</span>
                  <span className="font-light text-xs">{settings.address}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-green-700 flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="font-bold text-brand-green-900 block text-xs uppercase tracking-wider">Telephone Numbers</span>
                  <span className="font-light text-xs">{settings.phone}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="font-bold text-brand-green-900 block text-xs uppercase tracking-wider">Official Email</span>
                  <span className="font-light text-xs">{settings.email}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-brand-green-700 flex items-center justify-center shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <span className="font-bold text-brand-green-900 block text-xs uppercase tracking-wider">Office Hours</span>
                  <span className="font-light text-xs">Monday – Friday: 8:00 AM – 5:00 PM GMT</span>
                </div>
              </div>

            </div>

            {/* Direct WhatsApp CTA Button */}
            {settings.whatsapp && (
              <div className="bg-emerald-900 text-white rounded-3xl p-6 shadow-xl space-y-3">
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                  <MessageSquare size={20} />
                  <span>Instant Response via WhatsApp</span>
                </div>
                <p className="text-xs text-emerald-100 font-light leading-relaxed">
                  Chat directly with our field operations team on WhatsApp for immediate inquiries or donation support.
                </p>
                <a
                  href={`https://wa.me/${settings.whatsapp}?text=Hello%20HopeReach%20Ghana`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold w-full py-3 rounded-xl text-xs transition-colors shadow"
                >
                  <MessageSquare size={16} className="text-emerald-300" />
                  <span>Open WhatsApp Direct Chat</span>
                </a>
              </div>
            )}

          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </section>

    </div>
  );
}

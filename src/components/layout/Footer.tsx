'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { WebsiteSettings } from '@/types';

interface FooterProps {
  settings?: WebsiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-brand-green-900 text-white pt-16 pb-8 border-t-4 border-brand-gold-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-brand-green-700/60">
          
          {/* Col 1: NGO Bio */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-brand-green-900 shadow">
                <Heart className="w-6 h-6 fill-brand-green-900" />
              </div>
              <span className="text-xl font-bold font-heading tracking-tight text-white">
                HopeReach <span className="text-amber-400">Ghana</span>
              </span>
            </Link>

            <p className="text-sm text-emerald-100/80 leading-relaxed">
              {settings?.footerText || "A registered Ghanaian NGO empowering underprivileged children, needy families, orphans, and rural communities across Northern Ghana."}
            </p>

            <div className="pt-2">
              <span className="inline-block bg-emerald-800/80 text-emerald-200 text-xs px-3 py-1 rounded-full border border-emerald-700">
                Together, we can make a difference.
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-base font-bold font-heading text-amber-400 mb-4 tracking-wide uppercase text-xs">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-emerald-100/90">
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors flex items-center space-x-1.5">
                  <span>›</span>
                  <span>About Our Foundation</span>
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-amber-400 transition-colors flex items-center space-x-1.5">
                  <span>›</span>
                  <span>Our Key Programs</span>
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-amber-400 transition-colors flex items-center space-x-1.5">
                  <span>›</span>
                  <span>Our Verified Impact</span>
                </Link>
              </li>
              <li>
                <Link href="/get-involved" className="hover:text-amber-400 transition-colors flex items-center space-x-1.5">
                  <span>›</span>
                  <span>Volunteer Opportunities</span>
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-amber-400 transition-colors flex items-center space-x-1.5">
                  <span>›</span>
                  <span>News & Field Stories</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-400 transition-colors flex items-center space-x-1.5">
                  <span>›</span>
                  <span>Photo Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-amber-400 transition-colors flex items-center space-x-1.5 font-semibold text-amber-300">
                  <span>›</span>
                  <span>Make a Donation</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h3 className="text-base font-bold font-heading text-amber-400 mb-4 tracking-wide uppercase text-xs">
              Northern Ghana HQ
            </h3>
            <ul className="space-y-3 text-sm text-emerald-100/90">
              <li className="flex items-start space-x-2.5">
                <MapPin size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <span>{settings?.address || "Tamale, Northern Region, Ghana"}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone size={16} className="text-amber-400 shrink-0" />
                <span>{settings?.phone || "+233 (0) 24 123 4567"}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail size={16} className="text-amber-400 shrink-0" />
                <span>{settings?.email || "info@hopereachghana.org"}</span>
              </li>
              {settings?.whatsapp && (
                <li className="pt-1">
                  <a
                    href={`https://wa.me/${settings.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <MessageSquare size={14} className="text-emerald-300" />
                    <span>WhatsApp Direct Line</span>
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Newsletter Signup */}
          <div>
            <h3 className="text-base font-bold font-heading text-amber-400 mb-4 tracking-wide uppercase text-xs">
              Stay Connected
            </h3>
            <p className="text-xs text-emerald-100/80 mb-3 leading-relaxed">
              Subscribe to receive our monthly field updates, impact stories, and community outreach reports.
            </p>

            {subscribed ? (
              <div className="bg-emerald-800/90 text-amber-300 p-3 rounded-xl text-xs flex items-center space-x-2 border border-emerald-600">
                <CheckCircle2 size={18} className="shrink-0 text-amber-400" />
                <span>Thank you! You are now subscribed to our newsletter updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-brand-green-800 text-white placeholder-emerald-300/60 text-xs px-3.5 py-2.5 rounded-xl border border-brand-green-700 focus:outline-none focus:border-amber-400 pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 bg-amber-500 hover:bg-amber-600 text-brand-green-900 px-3 rounded-lg flex items-center justify-center transition-colors"
                    title="Subscribe"
                  >
                    <Send size={14} />
                  </button>
                </div>
                <span className="text-[10px] text-emerald-300/60 block">
                  We respect your privacy. No spam ever.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-emerald-200/70 space-y-4 md:space-y-0">
          <div>
            © {new Date().getFullYear()} HopeReach Ghana Foundation. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-amber-400 transition-colors">
              Privacy Policy & Ethics
            </Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors">
              Contact Us
            </Link>
            <Link href="/admin/login" className="hover:text-amber-400 transition-colors text-amber-300">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

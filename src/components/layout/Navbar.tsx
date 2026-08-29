'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Menu, X, Phone, Mail, MessageSquare, Shield } from 'lucide-react';
import { WebsiteSettings } from '@/types';

interface NavbarProps {
  settings?: WebsiteSettings;
}

export default function Navbar({ settings }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Programs', href: '/programs' },
    { name: 'Our Impact', href: '/impact' },
    { name: 'Get Involved', href: '/get-involved' },
    { name: 'News & Stories', href: '/stories' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <>
      {/* Top Announcement & Quick Info Bar */}
      <div className="bg-brand-green-900 text-white text-xs py-2 px-4 border-b border-brand-green-700/40 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1 text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Reaching Deprived Communities Across Northern Ghana</span>
            </span>
            {settings?.phone && (
              <a href={`tel:${settings.phone.split('/')[0].trim()}`} className="flex items-center space-x-1 hover:text-amber-400 transition-colors">
                <Phone size={12} />
                <span>{settings.phone.split('/')[0]}</span>
              </a>
            )}
            {settings?.email && (
              <a href={`mailto:${settings.email}`} className="flex items-center space-x-1 hover:text-amber-400 transition-colors">
                <Mail size={12} />
                <span>{settings.email}</span>
              </a>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {settings?.whatsapp && (
              <a
                href={`https://wa.me/${settings.whatsapp}?text=Hello%20HopeReach%20Ghana`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1 text-emerald-300 hover:text-emerald-100 transition-colors bg-emerald-800/60 px-2 py-0.5 rounded text-[11px]"
              >
                <MessageSquare size={12} className="text-emerald-400" />
                <span>WhatsApp Us</span>
              </a>
            )}
            <Link href="/admin/login" className="text-emerald-300/80 hover:text-white transition-colors flex items-center space-x-1">
              <Shield size={11} />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
            : 'bg-white py-4 border-b border-brand-sand-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-green-600 to-brand-green-700 flex items-center justify-center text-amber-400 shadow-md group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6 fill-amber-400 stroke-brand-green-700" />
            </div>
            <div>
              <span className="text-xl font-bold font-heading text-brand-green-900 tracking-tight block leading-none">
                HopeReach <span className="text-brand-gold-500">Ghana</span>
              </span>
              <span className="text-[11px] text-gray-500 font-medium tracking-wide block mt-0.5">
                Humanitarian Foundation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-brand-green-600 font-semibold bg-brand-green-50'
                      : 'text-gray-700 hover:text-brand-green-600 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-gold-500 to-amber-600 hover:from-amber-600 hover:to-brand-gold-500 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all text-sm"
            >
              <Heart size={16} className="fill-white" />
              <span>Donate Now</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Link
              href="/donate"
              className="bg-brand-gold-500 text-white font-semibold px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1"
            >
              <Heart size={12} className="fill-white" />
              <span>Donate</span>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-brand-green-600 hover:bg-gray-100 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex flex-col bg-white">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-lg bg-brand-green-600 flex items-center justify-center text-amber-400">
                <Heart className="w-5 h-5 fill-amber-400" />
              </div>
              <span className="font-bold text-lg text-brand-green-900">HopeReach Ghana</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-900"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-green-50 text-brand-green-600 font-bold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="p-4 border-t border-gray-100 space-y-3 bg-gray-50">
            <Link
              href="/donate"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 bg-brand-gold-500 text-white font-bold py-3 rounded-xl shadow text-center"
            >
              <Heart size={18} className="fill-white" />
              <span>Donate Now (GHS)</span>
            </Link>

            <Link
              href="/admin/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full block text-center text-xs text-gray-500 py-2 hover:text-brand-green-600"
            >
              Admin Portal Login
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

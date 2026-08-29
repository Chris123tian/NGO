'use client';

import React, { useState } from 'react';
import { createContactMessage } from '@/lib/firebase/services';
import { Send, Loader2, CheckCircle2, Mail } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await createContactMessage(formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setErrorMsg('Failed to send message. Please try again or contact us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-brand-green-50 border border-brand-green-200 rounded-3xl p-8 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-brand-green-600 text-amber-400 flex items-center justify-center mx-auto shadow">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-xl font-bold font-heading text-brand-green-900">
          Message Sent Successfully!
        </h3>
        <p className="text-xs text-gray-700 leading-relaxed">
          Thank you for contacting HopeReach Ghana Foundation. Our team will review your message and respond promptly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-bold text-brand-green-700 underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 space-y-5">
      
      <div className="border-b border-gray-100 pb-3">
        <h3 className="text-xl font-bold font-heading text-brand-green-900 flex items-center space-x-2">
          <Mail className="w-5 h-5 text-amber-500" />
          <span>Send Us a Message</span>
        </h3>
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Your Name *
          </label>
          <input
            type="text"
            required
            placeholder="Kwame Mensah"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600 focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            required
            placeholder="kwame@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600 focus:bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="+233 24 123 4567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600 focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Subject *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Partnership / Donation Inquiry"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600 focus:bg-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
          Message *
        </label>
        <textarea
          rows={5}
          required
          placeholder="How can we assist you?"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand-green-600 focus:bg-white"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center space-x-2 bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold py-3 px-6 rounded-xl shadow transition-colors text-xs disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send size={14} className="text-amber-400" />
            <span>Send Message</span>
          </>
        )}
      </button>

    </form>
  );
}

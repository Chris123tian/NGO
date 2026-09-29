'use client';

import React, { useState } from 'react';
import { createVolunteerApplication } from '@/lib/firebase/services';
import { CheckCircle2, Send, Loader2, Heart } from 'lucide-react';

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    age: 21,
    areaOfInterest: 'Education & Learning Support',
    skills: '',
    availability: 'Weekends / Part-time',
    reason: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      await createVolunteerApplication(formData);
      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        age: 21,
        areaOfInterest: 'Education & Learning Support',
        skills: '',
        availability: 'Weekends / Part-time',
        reason: ''
      });
    } catch (err) {
      setErrorMsg('Failed to submit your volunteer application. Please try again or contact us via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-brand-green-50 border border-brand-green-200 rounded-3xl p-8 text-center space-y-4 max-w-2xl mx-auto my-8">
        <div className="w-16 h-16 rounded-full bg-brand-green-600 text-amber-400 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="text-2xl font-bold font-heading text-brand-green-900">
          Volunteer Application Received!
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Thank you for offering your time and skills to support underprivileged communities in Northern Ghana. Our volunteer coordinator will review your details and contact you via phone/email soon.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="inline-flex items-center space-x-2 bg-brand-green-700 hover:bg-brand-green-800 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors"
        >
          <span>Submit Another Application</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-100 space-y-6">
      
      <div className="border-b border-gray-100 pb-4">
        <h3 className="text-2xl font-bold font-heading text-brand-green-900 flex items-center space-x-2">
          <Heart className="w-6 h-6 text-amber-500 fill-amber-500" />
          <span>Volunteer Application Form</span>
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          Join our dedicated network of volunteers bringing hope across Ghana.
        </p>
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Abena Osei"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green-600 focus:bg-white"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Email Address *
          </label>
          <input
            type="email"
            required
            placeholder="abena@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green-600 focus:bg-white"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Phone Number (WhatsApp) *
          </label>
          <input
            type="tel"
            required
            placeholder="+233 24 123 4567"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green-600 focus:bg-white"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Current Location / City *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Tamale, Accra, Kumasi, Bolgatanga"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green-600 focus:bg-white"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Age *
          </label>
          <input
            type="number"
            min={16}
            max={90}
            required
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 18 })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green-600 focus:bg-white"
          />
        </div>

        {/* Area of Interest */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
            Area of Interest *
          </label>
          <select
            value={formData.areaOfInterest}
            onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green-600 focus:bg-white"
          >
            <option value="Education & Learning Support">Education & Teaching Support</option>
            <option value="Food & Clothing Distribution">Food & Clothing Distribution</option>
            <option value="Community Outreach & Field Visits">Community Outreach & Field Visits</option>
            <option value="Healthcare & Medical Screening">Healthcare & Medical Screening</option>
            <option value="Media, Photography & Storytelling">Media, Photography & Storytelling</option>
            <option value="Logistics & Event Coordination">Logistics & Event Coordination</option>
          </select>
        </div>

      </div>

      {/* Skills */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Key Skills & Profession
        </label>
        <input
          type="text"
          placeholder="e.g. Teaching, Nursing, Driver, IT, Social Work, Photography"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green-600 focus:bg-white"
        />
      </div>

      {/* Availability */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Availability *
        </label>
        <select
          value={formData.availability}
          onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green-600 focus:bg-white"
        >
          <option value="Weekends / Part-time">Weekends & Part-time</option>
          <option value="Full-time Field Trips">Full-time Field Trips</option>
          <option value="Monthly Outreach Drives">Monthly Outreach Drives</option>
          <option value="Remote / Digital Support">Remote / Digital Support</option>
        </select>
      </div>

      {/* Why do you want to volunteer? */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
          Why do you want to volunteer with Rescue Foundation Ghana? *
        </label>
        <textarea
          rows={4}
          required
          placeholder="Share a brief statement about your motivation..."
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-green-600 focus:bg-white"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-green-700 to-brand-green-900 hover:from-brand-green-800 hover:to-brand-green-950 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all text-sm disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
            <span>Submitting Application...</span>
          </>
        ) : (
          <>
            <Send size={18} className="text-amber-400" />
            <span>Submit Volunteer Application</span>
          </>
        )}
      </button>

    </form>
  );
}

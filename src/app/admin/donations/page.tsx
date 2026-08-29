'use client';

import React, { useEffect, useState } from 'react';
import { getDonations } from '@/lib/firebase/services';
import { DonationRecord } from '@/types';
import { HeartHandshake, Download, Smartphone, CreditCard, Search } from 'lucide-react';

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getDonations().then(setDonations);
  }, []);

  const filtered = donations.filter(d =>
    d.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = donations.reduce((sum, d) => sum + (d.amount || 0), 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-brand-green-900 flex items-center space-x-2">
            <HeartHandshake className="w-6 h-6 text-amber-500" />
            <span>Donation Records & Financial Logs</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            View all received donation transactions and donor references.
          </p>
        </div>

        <div className="bg-amber-100 border border-amber-200 p-3 rounded-2xl text-right">
          <span className="text-[10px] font-bold uppercase text-amber-800 block">Total Raised Logged</span>
          <span className="text-xl font-extrabold font-heading text-brand-green-900">
            GHS {totalAmount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by reference, name, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-brand-green-600 shadow-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-brand-sand-100 text-brand-green-900 uppercase font-bold text-[10px] border-b border-brand-sand-200">
              <tr>
                <th className="py-3.5 px-4">Reference</th>
                <th className="py-3.5 px-4">Donor Name</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Amount (GHS)</th>
                <th className="py-3.5 px-4">Type / Channel</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filtered.map((don) => (
                <tr key={don.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-brand-green-900">{don.reference}</td>
                  <td className="py-3.5 px-4 font-bold">{don.fullName}</td>
                  <td className="py-3.5 px-4">
                    <div className="text-gray-900">{don.email}</div>
                    <div className="text-[10px] text-gray-400">{don.phone}</div>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-amber-600 text-sm">GHS {don.amount.toLocaleString()}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold uppercase block">{don.donationType}</span>
                    <span className="text-[10px] text-gray-400 flex items-center space-x-1">
                      {don.paymentMethod === 'momo' ? <Smartphone size={10} /> : <CreditCard size={10} />}
                      <span>{don.paymentMethod === 'momo' ? 'Mobile Money' : 'Bank Card'}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-500">{new Date(don.createdAt).toLocaleDateString()}</td>
                  <td className="py-3.5 px-4">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {don.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

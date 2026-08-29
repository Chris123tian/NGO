'use client';

import React, { useEffect, useState } from 'react';
import { getVolunteers, updateVolunteerStatus, deleteVolunteer } from '@/lib/firebase/services';
import { VolunteerApplication } from '@/types';
import { Users, Trash2, Eye, Search, CheckCircle2, Clock, X } from 'lucide-react';

export default function AdminVolunteersPage() {
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVol, setSelectedVol] = useState<VolunteerApplication | null>(null);

  useEffect(() => {
    loadVolunteers();
  }, []);

  const loadVolunteers = async () => {
    getVolunteers().then(setVolunteers);
  };

  const handleStatusChange = async (id: string, status: VolunteerApplication['status']) => {
    await updateVolunteerStatus(id, status);
    loadVolunteers();
    if (selectedVol && selectedVol.id === id) {
      setSelectedVol({ ...selectedVol, status });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this volunteer application?')) {
      await deleteVolunteer(id);
      setSelectedVol(null);
      loadVolunteers();
    }
  };

  const filtered = volunteers.filter(v =>
    v.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.areaOfInterest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-brand-green-900 flex items-center space-x-2">
            <Users className="w-6 h-6 text-amber-500" />
            <span>Volunteer Applications Manager</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Review volunteer submissions, track application status, and contact candidates.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email, location, or area of interest..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-brand-green-600 shadow-sm"
        />
      </div>

      {/* Detail Modal */}
      {selectedVol && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-4 shadow-2xl border border-gray-100 relative">
            <button onClick={() => setSelectedVol(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>

            <div className="space-y-1 border-b border-gray-100 pb-3">
              <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded">
                Application #{selectedVol.id}
              </span>
              <h3 className="text-xl font-bold font-heading text-brand-green-900">{selectedVol.fullName}</h3>
              <p className="text-xs text-gray-500">{selectedVol.email} • {selectedVol.phone}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><span className="font-bold text-gray-500 block">Location:</span> {selectedVol.location}</div>
              <div><span className="font-bold text-gray-500 block">Age:</span> {selectedVol.age} years</div>
              <div><span className="font-bold text-gray-500 block">Area of Interest:</span> {selectedVol.areaOfInterest}</div>
              <div><span className="font-bold text-gray-500 block">Availability:</span> {selectedVol.availability}</div>
            </div>

            <div>
              <span className="font-bold text-gray-500 text-xs block mb-1">Key Skills & Profession:</span>
              <p className="text-xs bg-gray-50 p-2.5 rounded-xl border border-gray-200">{selectedVol.skills || 'Not specified'}</p>
            </div>

            <div>
              <span className="font-bold text-gray-500 text-xs block mb-1">Motivation / Statement:</span>
              <p className="text-xs bg-brand-sand-50 p-3 rounded-xl border border-brand-sand-200 font-light leading-relaxed">
                "{selectedVol.reason}"
              </p>
            </div>

            {/* Status Change Buttons */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <div className="flex space-x-2 text-xs">
                <button
                  onClick={() => handleStatusChange(selectedVol.id, 'approved')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg"
                >
                  Approve Application
                </button>
                <button
                  onClick={() => handleStatusChange(selectedVol.id, 'contacted')}
                  className="bg-amber-500 hover:bg-amber-600 text-brand-green-950 font-bold px-3 py-1.5 rounded-lg"
                >
                  Mark Contacted
                </button>
              </div>

              <button
                onClick={() => handleDelete(selectedVol.id)}
                className="bg-red-50 text-red-600 hover:bg-red-100 p-1.5 rounded-lg text-xs"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Applications Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-brand-sand-100 text-brand-green-900 uppercase font-bold text-[10px] border-b border-brand-sand-200">
              <tr>
                <th className="py-3.5 px-4">Applicant Name</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Area of Interest</th>
                <th className="py-3.5 px-4">Availability</th>
                <th className="py-3.5 px-4">Submitted Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filtered.map((vol) => (
                <tr key={vol.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-brand-green-900 block">{vol.fullName}</span>
                    <span className="text-[10px] text-gray-400">{vol.email}</span>
                  </td>
                  <td className="py-3.5 px-4">{vol.location}</td>
                  <td className="py-3.5 px-4 font-medium text-amber-700">{vol.areaOfInterest}</td>
                  <td className="py-3.5 px-4 text-gray-500">{vol.availability}</td>
                  <td className="py-3.5 px-4 text-gray-500">{new Date(vol.submittedAt).toLocaleDateString()}</td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      vol.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                      vol.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {vol.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setSelectedVol(vol)}
                      className="bg-brand-green-50 hover:bg-brand-green-100 text-brand-green-800 p-1.5 rounded-lg flex items-center space-x-1 font-bold text-[11px]"
                    >
                      <Eye size={14} />
                      <span>Review</span>
                    </button>
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

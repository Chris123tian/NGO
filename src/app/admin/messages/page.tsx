'use client';

import React, { useEffect, useState } from 'react';
import { getContactMessages, markMessageAsRead, deleteContactMessage } from '@/lib/firebase/services';
import { ContactMessage } from '@/types';
import { MessageSquare, Trash2, Mail, MailOpen, X, Eye } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    getContactMessages().then(setMessages);
  };

  const handleOpenModal = async (msg: ContactMessage) => {
    setSelectedMsg(msg);
    if (!msg.read) {
      await markMessageAsRead(msg.id, true);
      loadMessages();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this message inquiry?')) {
      await deleteContactMessage(id);
      setSelectedMsg(null);
      loadMessages();
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-brand-green-900 flex items-center space-x-2">
            <MessageSquare className="w-6 h-6 text-amber-500" />
            <span>Contact Messages & Inquiries Inbox</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Read and respond to contact messages sent through the website contact form.
          </p>
        </div>
      </div>

      {/* Message Reader Modal */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl border border-gray-100 relative">
            <button onClick={() => setSelectedMsg(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>

            <div className="border-b border-gray-100 pb-3 space-y-1">
              <span className="text-[10px] font-bold uppercase bg-brand-green-100 text-brand-green-900 px-2.5 py-0.5 rounded">
                Subject: {selectedMsg.subject}
              </span>
              <h3 className="text-lg font-bold font-heading text-gray-900">{selectedMsg.name}</h3>
              <p className="text-xs text-gray-500">{selectedMsg.email} • {selectedMsg.phone || 'No phone'}</p>
            </div>

            <div className="bg-brand-sand-50 p-4 rounded-2xl border border-brand-sand-200 text-xs text-gray-800 leading-relaxed font-light whitespace-pre-line">
              {selectedMsg.message}
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <a
                href={`mailto:${selectedMsg.email}?subject=RE: ${selectedMsg.subject}`}
                className="bg-amber-500 hover:bg-amber-400 text-brand-green-950 font-bold px-4 py-2 rounded-xl"
              >
                Reply via Email
              </a>

              <button
                onClick={() => handleDelete(selectedMsg.id)}
                className="text-red-600 hover:bg-red-50 p-2 rounded-xl font-bold flex items-center space-x-1"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages List */}
      <div className="space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => handleOpenModal(msg)}
            className={`bg-white rounded-2xl p-5 border cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm hover:shadow-md ${
              !msg.read ? 'border-amber-400 bg-amber-50/20 font-bold' : 'border-gray-100'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                !msg.read ? 'bg-amber-500 text-brand-green-950' : 'bg-gray-100 text-gray-500'
              }`}>
                {!msg.read ? <Mail size={18} /> : <MailOpen size={18} />}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-bold text-brand-green-900">{msg.name}</h3>
                  {!msg.read && (
                    <span className="bg-amber-500 text-brand-green-950 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                      New
                    </span>
                  )}
                </div>
                <h4 className="text-xs text-gray-800 font-semibold">{msg.subject}</h4>
                <p className="text-xs text-gray-500 line-clamp-1 font-light">{msg.message}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 shrink-0 text-xs text-gray-400">
              <span>{new Date(msg.submittedAt).toLocaleDateString()}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(msg.id);
                }}
                className="text-gray-400 hover:text-red-600 p-1.5 rounded-lg"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

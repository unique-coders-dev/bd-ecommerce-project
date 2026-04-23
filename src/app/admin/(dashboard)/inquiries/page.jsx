"use client";

import React, { useState, useEffect } from 'react';

export default function AdminInquiries() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    const res = await fetch('/api/admin/inquiries');
    const data = await res.json();
    setMessages(data);
    setLoading(false);
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
    await fetch('/api/admin/inquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus }),
    });
    fetchInquiries();
  };

  if (loading) return <div>Loading inquiries...</div>;

  return (
    <div className="space-y-8">
      <div>
          <h1 className="text-3xl font-black text-[#111] uppercase italic tracking-tighter">Customer Inquiries</h1>
          <p className="text-gray-400 text-[11px] font-bold uppercase mt-1">Manage messages sent from the storefront contact page</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead className="bg-[#fcfcfc] border-b border-gray-100">
                      <tr className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                          <th className="px-8 py-6">Status</th>
                          <th className="px-8 py-6">Customer</th>
                          <th className="px-8 py-6">Subject</th>
                          <th className="px-8 py-6">Date</th>
                          <th className="px-8 py-6">Action</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                      {messages.map((msg) => (
                          <tr key={msg.id} className={`hover:bg-gray-50/50 transition-colors ${msg.status === 'unread' ? 'bg-primary/5' : ''}`}>
                              <td className="px-8 py-6">
                                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                      msg.status === 'unread' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                                  }`}>
                                      {msg.status}
                                  </span>
                              </td>
                              <td className="px-8 py-6">
                                  <div className="flex flex-col">
                                      <span className="text-sm font-black text-[#111]">{msg.name}</span>
                                      <span className="text-xs text-gray-400">{msg.email}</span>
                                  </div>
                              </td>
                              <td className="px-8 py-6">
                                  <div className="flex flex-col max-w-sm">
                                      <span className="text-sm font-bold text-[#111] mb-1">{msg.subject}</span>
                                      <p className="text-xs text-gray-400 truncate">{msg.message}</p>
                                  </div>
                              </td>
                              <td className="px-8 py-6">
                                  <span className="text-xs font-medium text-gray-400">
                                      {new Date(msg.createdAt).toLocaleDateString()}
                                  </span>
                              </td>
                              <td className="px-8 py-6">
                                  <button 
                                    onClick={() => toggleStatus(msg.id, msg.status)}
                                    className="text-[10px] font-black uppercase text-primary hover:underline cursor-pointer"
                                  >
                                      Mark as {msg.status === 'unread' ? 'Read' : 'Unread'}
                                  </button>
                              </td>
                          </tr>
                      ))}
                      {messages.length === 0 && (
                          <tr>
                              <td colSpan="5" className="px-8 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                                  No inquiries found
                              </td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
}

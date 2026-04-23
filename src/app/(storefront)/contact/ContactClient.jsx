"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const ContactClient = ({ settings }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorData = await response.json();
        setStatus({ type: 'error', message: errorData.error || 'Failed to send message.' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const hotline = settings?.hotline || "09644888889";
  const location = settings?.location || "Model Town, Puran Para, Bandarban";
  const facebook = settings?.facebook || "https://facebook.com";
  const instagram = settings?.instagram || "https://instagram.com";
  const whatsapp = settings?.whatsapp || "https://wa.me/880123456789";

  return (
    <div className="bg-white min-h-screen">
      {/* Visual Header */}
      <div className="bg-[#111] py-20 md:py-32 text-center text-white">
          <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-4">Contact Us</h1>
          <div className="h-2 w-24 bg-primary mx-auto rounded-full"></div>
          <p className="mt-8 text-gray-400 font-medium max-w-lg mx-auto px-6 italic">We'd love to hear from you. Send us a message and our team will respond within 24 hours.</p>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 -mt-16 md:-mt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
            
            {/* Contact Form */}
            <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl shadow-black/5 border border-gray-100">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[11px] font-black uppercase text-[#111] mb-2 tracking-widest">Full Name</label>
                            <input 
                                type="text" 
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full h-14 px-6 border border-gray-100 rounded-2xl bg-gray-50/50 outline-none focus:border-primary/30 focus:bg-white transition-all font-medium text-sm" 
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] font-black uppercase text-[#111] mb-2 tracking-widest">Email Address</label>
                            <input 
                                type="email" 
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full h-14 px-6 border border-gray-100 rounded-2xl bg-gray-50/50 outline-none focus:border-primary/30 focus:bg-white transition-all font-medium text-sm" 
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[11px] font-black uppercase text-[#111] mb-2 tracking-widest">Subject</label>
                        <input 
                            type="text" 
                            required
                            value={formData.subject}
                            onChange={(e) => setFormData({...formData, subject: e.target.value})}
                            className="w-full h-14 px-6 border border-gray-100 rounded-2xl bg-gray-50/50 outline-none focus:border-primary/30 focus:bg-white transition-all font-medium text-sm" 
                        />
                    </div>
                    <div>
                        <label className="block text-[11px] font-black uppercase text-[#111] mb-2 tracking-widest">Message</label>
                        <textarea 
                            rows="6" 
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            className="w-full p-6 border border-gray-100 rounded-2xl bg-gray-50/50 outline-none focus:border-primary/30 focus:bg-white transition-all font-medium text-sm min-h-[160px]"
                        ></textarea>
                    </div>

                    {status && (
                        <div className={`p-4 rounded-xl text-[11px] font-black uppercase text-center border animate-shake ${
                            status.type === 'success' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-primary-light text-primary-light0 border-primary-soft'
                        }`}>
                            {status.message}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full h-16 bg-[#111] text-white font-black uppercase text-sm tracking-widest rounded-2xl hover:bg-black transition-all hover:scale-[1.01] active:scale-95 shadow-xl shadow-black/10 disabled:opacity-50"
                    >
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-8">
                <div className="bg-primary rounded-[40px] p-10 text-white space-y-6">
                    <Link href="/" className="block w-32 mb-8">
                        <img src={settings?.logoUrl || "https://kcbazar.com/wp-content/uploads/2025/08/KCB-LOGO-G.png"} alt="Logo" className="w-full brightness-0 invert" />
                    </Link>
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter">Reach Out</h3>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase opacity-60">Hotline</p>
                                <p className="text-sm font-bold">{hotline}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase opacity-60">Email Support</p>
                                <p className="text-sm font-bold">{settings?.email || "hello@kcbazar.com"}</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase opacity-60">Location</p>
                                <p className="text-sm font-bold">{location}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-[40px] p-10 space-y-4">
                     <h3 className="text-sm font-black uppercase text-[#111]">Follow KC Community</h3>
                     <div className="flex gap-4">
                        <Link href={facebook} target="_blank" className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/20 transition-all cursor-pointer group">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                        </Link>
                        <Link href={instagram} target="_blank" className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/20 transition-all cursor-pointer group">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </Link>
                        <Link href={whatsapp} target="_blank" className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/20 transition-all cursor-pointer group">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.432h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </Link>
                     </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ContactClient;

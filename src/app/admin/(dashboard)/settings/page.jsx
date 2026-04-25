"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function GeneralSettings() {
  const [settings, setSettings] = useState({
    siteName: "",
    marqueeText: "",
    announcements: [],
    hotline: "",
    openingHours: "",
    location: "",
    email: "",
    facebook: "",
    instagram: "",
    whatsapp: "",
    themeColor: "",
    logoUrl: "",
    faviconUrl: "",
    shortDescription: "",
    siteTitle: "",
    siteDescription: "",
    siteKeywords: "",
    shippingPromoTitle: "",
    shippingPromoSubtitle: "",
    shippingPromoImageUrl: "",
    shippingPromoTitle: "",
    shippingPromoSubtitle: "",
    shippingPromoImageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: string }
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        if (data) {
            // Parse announcements if it's a string
            let announcements = [];
            try {
                announcements = data.announcements ? JSON.parse(data.announcements) : [];
                if (!Array.isArray(announcements)) announcements = [data.marqueeText];
            } catch (e) {
                announcements = [data.marqueeText];
            }
            if (announcements.length === 0 && data.marqueeText) announcements = [data.marqueeText];
            
            setSettings({
                ...data,
                announcements: announcements
            });
        }
        setLoading(false);
      });
  }, []);

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'branding');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setSettings({ ...settings, logoUrl: data.url });
        setMessage({ type: 'success', text: 'Logo uploaded successfully!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Upload failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Logo upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const handleFaviconUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'branding');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setSettings({ ...settings, faviconUrl: data.url });
        setMessage({ type: 'success', text: 'Favicon uploaded successfully!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Upload failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Favicon upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const handlePromoImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'branding');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setSettings({ ...settings, shippingPromoImageUrl: data.url });
        setMessage({ type: 'success', text: 'Promo image uploaded successfully!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Upload failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Promo image upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const handleAddAnnouncement = () => {
    setSettings({
        ...settings,
        announcements: [...settings.announcements, ""]
    });
  };

  const handleRemoveAnnouncement = (index) => {
    const updated = settings.announcements.filter((_, i) => i !== index);
    setSettings({ ...settings, announcements: updated });
  };

  const handleAnnouncementChange = (index, value) => {
    const updated = [...settings.announcements];
    updated[index] = value;
    setSettings({ ...settings, announcements: updated });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload = {
        siteName: settings.siteName,
        marqueeText: settings.announcements[0] || "",
        announcements: JSON.stringify(settings.announcements),
        hotline: settings.hotline,
        openingHours: settings.openingHours,
        location: settings.location,
        email: settings.email,
        facebook: settings.facebook,
        instagram: settings.instagram,
        whatsapp: settings.whatsapp,
        themeColor: settings.themeColor,
        logoUrl: settings.logoUrl,
        faviconUrl: settings.faviconUrl,
        shortDescription: settings.shortDescription,
        siteTitle: settings.siteTitle,
        siteDescription: settings.siteDescription,
        siteKeywords: settings.siteKeywords,
        shippingPromoTitle: settings.shippingPromoTitle,
        shippingPromoSubtitle: settings.shippingPromoSubtitle,
        shippingPromoImageUrl: settings.shippingPromoImageUrl,
    };

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'All settings have been synchronized globally!' });
      } else {
        const err = await response.json();
        setMessage({ type: 'error', text: err.error || "Failed to save settings" });
      }
    } catch (err) {
      setMessage({ type: 'error', text: "An unexpected error occurred." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
      <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
  );

  return (
    <div className="max-w-5xl space-y-10 pb-20">
      
      {/* Modal/Alert Popup */}
      {message && mounted && createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
              <div className="bg-white rounded-[40px] p-10 max-w-sm w-full shadow-[0_20px_100px_rgba(0,0,0,0.3)] scale-in-center border border-gray-100 flex flex-col items-center text-center space-y-5">
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-2 ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-primary-soft text-primary-dark'}`}>
                      {message.type === 'success' ? (
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      ) : (
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                      )}
                  </div>
                  <h3 className="text-2xl font-black uppercase italic text-[#111]">{message.type === 'success' ? 'Brilliant!' : 'Oops!'}</h3>
                  <p className="text-gray-500 font-bold text-sm leading-relaxed">{message.text}</p>
                  <button 
                    onClick={() => setMessage(null)}
                    className="w-full h-14 bg-[#111] text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl mt-4 hover:shadow-2xl transition-all active:scale-95"
                  >
                        Dismiss Overlay
                  </button>
              </div>
          </div>,
          document.body
      )}

      <div className="flex items-end justify-between border-b border-gray-100 pb-8">
          <div>
              <h1 className="text-4xl font-black text-[#111] uppercase italic tracking-tighter">General Settings</h1>
              <p className="text-gray-400 text-[11px] font-bold uppercase mt-1 tracking-widest">Brand DNA, Core Theme, and Global Announcements</p>
          </div>
      </div>

      <form onSubmit={handleSave} className="space-y-10">
          
          {/* Main Card */}
          <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
              
              {/* Site Branding Section */}
              <div className="p-10 border-b border-gray-50">
                  <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-xs font-black italic">B</div>
                      <h2 className="text-sm font-black uppercase text-[#111] tracking-tight">Site Branding & Appearance</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Official Brand Logo</label>
                        <div className="flex items-start gap-6">
                            <div className="w-32 h-32 rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden shrink-0 group relative">
                                {settings.logoUrl ? (
                                    <img src={settings.logoUrl} alt="Logo Preview" className="w-full h-full object-contain p-4" />
                                ) : (
                                    <div className="text-gray-300 text-center">
                                       <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                       <span className="text-[8px] font-black uppercase block mt-1">No Logo</span>
                                    </div>
                                )}
                                {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div></div>}
                            </div>
                            <div className="flex-1 space-y-3">
                                <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Upload a high-quality transparent PNG or SVG logo. This will appear in header, footer, and emails.</p>
                                <label className="inline-block cursor-pointer">
                                    <input type="file" className="hidden" accept=".png,.jpg,.jpeg,.gif,.ico" onChange={handleLogoUpload} disabled={uploading} />
                                    <span className="h-10 px-6 bg-gray-100 text-gray-700 font-bold text-[10px] uppercase rounded-full flex items-center gap-2 hover:bg-gray-200 transition-all">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                        {uploading ? "Uploading..." : "Replace Logo File"}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Site Favicon (Browser Icon)</label>
                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden shrink-0 group relative">
                                {settings.faviconUrl ? (
                                    <img src={settings.faviconUrl} alt="Favicon Preview" className="w-full h-full object-contain p-2" />
                                ) : (
                                    <div className="text-gray-300 text-center">
                                       <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                )}
                                {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div></div>}
                            </div>
                            <div className="flex-1 space-y-2">
                                <p className="text-[9px] text-gray-500 font-medium font-mono">Recommended: 32x32px .ico or .png</p>
                                <label className="inline-block cursor-pointer">
                                    <input type="file" className="hidden" accept=".png,.jpg,.jpeg,.gif,.ico" onChange={handleFaviconUpload} disabled={uploading} />
                                    <span className="h-8 px-4 bg-gray-100 text-gray-700 font-bold text-[9px] uppercase rounded-full flex items-center gap-2 hover:bg-gray-200 transition-all">
                                        Upload Icon
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Official Site Name</label>
                        <div className="space-y-4">
                            <input 
                                type="text" 
                                value={settings.siteName || ""}
                                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                                placeholder="e.g. Mailbon"
                                className="w-full h-16 px-6 border border-gray-200 rounded-2xl bg-gray-50/30 outline-none focus:bg-white focus:border-primary transition-all font-black text-sm tracking-tighter" 
                            />
                            <p className="text-[9px] text-gray-400 font-medium italic">Global brand name used across the entire platform.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Global Primary Color</label>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="relative group">
                                    <input 
                                        type="color" 
                                        value={settings.themeColor}
                                        onChange={(e) => setSettings({...settings, themeColor: e.target.value.toUpperCase()})}
                                        className="w-16 h-16 rounded-2xl cursor-pointer border-4 border-white shadow-lg overflow-hidden shrink-0" 
                                    />
                                </div>
                                <div className="flex-1">
                                    <input 
                                        type="text" 
                                        value={settings.themeColor}
                                        onChange={(e) => setSettings({...settings, themeColor: e.target.value.toUpperCase()})}
                                        className="w-full h-16 px-6 border border-gray-200 rounded-2xl bg-gray-50/30 outline-none focus:bg-white focus:border-primary transition-all font-black text-sm tracking-tighter" 
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden flex">
                                    <div className="h-full" style={{ width: '40%', backgroundColor: settings.themeColor }}></div>
                                    <div className="h-full" style={{ width: '30%', backgroundColor: `color-mix(in srgb, ${settings.themeColor}, white 50%)` }}></div>
                                    <div className="h-full" style={{ width: '30%', backgroundColor: `color-mix(in srgb, ${settings.themeColor}, black 15%)` }}></div>
                                </div>
                                <span className="text-[10px] font-black text-gray-300 uppercase shrink-0">Pallete Sync</span>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>

              {/* SEO & Discoverability Section */}
              <div className="p-10 border-b border-gray-50">
                  <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-xs font-black italic">G</div>
                      <h2 className="text-sm font-black uppercase text-[#111] tracking-tight">SEO & Global Discoverability</h2>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Metatag: Site Title</label>
                        <input 
                            type="text" 
                            value={settings.siteTitle}
                            onChange={(e) => setSettings({...settings, siteTitle: e.target.value})}
                            placeholder="e.g. Mailbon - Premium Wellness"
                            className="w-full h-14 px-6 border border-gray-100 rounded-2xl bg-gray-50/50 outline-none focus:bg-white focus:border-primary/30 transition-all font-bold text-sm" 
                        />
                        <p className="text-[9px] text-gray-400 font-medium italic">Appears in search engine results and browser tabs.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Metatag: Meta Description</label>
                        <textarea 
                            rows="3"
                            value={settings.siteDescription}
                            onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                            placeholder="The ultimate destination for beauty products..."
                            className="w-full p-6 border border-gray-100 rounded-[30px] bg-gray-50/50 outline-none focus:bg-white focus:border-primary/30 transition-all font-medium text-sm leading-relaxed"
                        ></textarea>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Metatag: Keywords</label>
                        <input 
                            type="text" 
                            value={settings.siteKeywords}
                            onChange={(e) => setSettings({...settings, siteKeywords: e.target.value})}
                            placeholder="beauty, skincare, wellness, bangladesh"
                            className="w-full h-14 px-6 border border-gray-100 rounded-2xl bg-gray-50/50 outline-none focus:bg-white focus:border-primary/30 transition-all font-bold text-sm" 
                        />
                        <p className="text-[9px] text-gray-400 font-medium italic">Comma-separated terms that define your site's focus.</p>
                    </div>
                  </div>
              </div>

              {/* Marquee Settings Section */}
              <div className="p-10 border-b border-gray-50 bg-gray-50/30">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white text-xs font-black italic">A</div>
                        <h2 className="text-sm font-black uppercase text-[#111] tracking-tight">Global Announcements (Marquee)</h2>
                    </div>
                    <button 
                        type="button" 
                        onClick={handleAddAnnouncement}
                        className="text-[10px] font-black uppercase text-primary hover:underline"
                    >
                        + Add Announcement
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                      {settings.announcements.map((text, idx) => (
                          <div key={idx} className="group flex items-center gap-4 animate-in slide-in-from-right-4 duration-300">
                                <div className="flex-1 relative">
                                    <input 
                                        type="text" 
                                        value={text}
                                        placeholder={`Announcement #${idx + 1}...`}
                                        onChange={(e) => handleAnnouncementChange(idx, e.target.value)}
                                        className="w-full h-14 px-6 border border-gray-200 rounded-2xl bg-white outline-none focus:border-primary transition-all font-bold text-sm" 
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-gray-50 flex items-center justify-center text-[10px] font-black text-gray-300">
                                        {idx + 1}
                                    </div>
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => handleRemoveAnnouncement(idx)}
                                    className="w-14 h-14 rounded-2xl border border-primary-soft flex items-center justify-center text-red-300 hover:bg-primary-soft hover:text-primary transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                          </div>
                      ))}
                      {settings.announcements.length === 0 && (
                          <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-[30px]">
                              <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">No active announcements</p>
                          </div>
                      )}
                  </div>
              </div>

              {/* Contact Information Section */}
              <div className="p-10 border-b border-gray-50">
                  <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-black italic">C</div>
                      <h2 className="text-sm font-black uppercase text-[#111] tracking-tight">Contact Information & Footer</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Customer Hotline</label>
                          <input 
                            type="text" 
                            value={settings.hotline}
                            onChange={(e) => setSettings({...settings, hotline: e.target.value})}
                            className="w-full h-14 px-6 border border-gray-100 rounded-2xl bg-gray-50/50 outline-none focus:bg-white focus:border-primary/30 transition-all font-bold text-sm" 
                          />
                      </div>
                      <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Official Business Hours</label>
                          <input 
                            type="text" 
                            value={settings.openingHours}
                            onChange={(e) => setSettings({...settings, openingHours: e.target.value})}
                            className="w-full h-14 px-6 border border-gray-100 rounded-2xl bg-gray-50/50 outline-none focus:bg-white focus:border-primary/30 transition-all font-bold text-sm" 
                          />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Primary Showroom Location</label>
                          <input 
                            type="text" 
                            value={settings.location}
                            onChange={(e) => setSettings({...settings, location: e.target.value})}
                            className="w-full h-14 px-6 border border-gray-100 rounded-2xl bg-gray-50/50 outline-none focus:bg-white focus:border-primary/30 transition-all font-bold text-sm" 
                          />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Email Address</label>
                          <input 
                            type="email" 
                            value={settings.email || ''}
                            onChange={(e) => setSettings({...settings, email: e.target.value})}
                            className="w-full h-14 px-6 border border-gray-100 rounded-2xl bg-gray-50/50 outline-none focus:bg-white focus:border-primary/30 transition-all font-bold text-sm" 
                            placeholder="e.g. hello@kcbazar.com"
                          />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Short Brand Description (Footer Content)</label>
                          <textarea 
                            rows="4"
                            value={settings.shortDescription}
                            onChange={(e) => setSettings({...settings, shortDescription: e.target.value})}
                            className="w-full p-6 border border-gray-100 rounded-[30px] bg-gray-50/50 outline-none focus:bg-white focus:border-primary/30 transition-all font-medium text-sm leading-relaxed"
                          ></textarea>
                      </div>
                  </div>
              </div>

              {/* Social Section */}
              <div className="p-10 bg-gray-50/30">
                  <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-xs font-black italic">S</div>
                      <h2 className="text-sm font-black uppercase text-[#111] tracking-tight">Social Media Pulse</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Facebook Profile</label>
                          <input type="text" value={settings.facebook} onChange={(e) => setSettings({...settings, facebook: e.target.value})} className="w-full h-14 px-6 border border-gray-100 rounded-2xl bg-white outline-none focus:border-primary/30 transition-all font-bold text-xs" />
                      </div>
                      <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Instagram Profile</label>
                          <input type="text" value={settings.instagram} onChange={(e) => setSettings({...settings, instagram: e.target.value})} className="w-full h-14 px-6 border border-gray-100 rounded-2xl bg-white outline-none focus:border-primary/30 transition-all font-bold text-xs" />
                      </div>
                      <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">WhatsApp Business</label>
                          <input type="text" value={settings.whatsapp} onChange={(e) => setSettings({...settings, whatsapp: e.target.value})} className="w-full h-14 px-6 border border-gray-100 rounded-2xl bg-white outline-none focus:border-primary/30 transition-all font-bold text-xs" />
                      </div>
                  </div>
              </div>
          </div>

          <div className="flex justify-end pt-10">
              <button 
                type="submit" 
                disabled={saving || uploading}
                className="group h-12 px-10 bg-[#111] text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10 disabled:opacity-50 flex items-center gap-3"
              >
                  {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Syncing...</span>
                      </>
                  ) : (
                      <>
                        <span>Update Settings</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </>
                  )}
              </button>
          </div>

      </form>
      
      <style jsx>{`
        @keyframes scale-in-center {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        .scale-in-center {
            animation: scale-in-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
        }
      `}</style>
    </div>
  );
}

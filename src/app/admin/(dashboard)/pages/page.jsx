"use client";

import React, { useState, useEffect } from 'react';

export default function PageManagement() {
  const [settings, setSettings] = useState({
    aboutUsTitle: "",
    aboutUsDescription: "",
    aboutUsImageUrl: "",
    shippingPolicy: "",
    refundPolicy: "",
    privacyPolicy: "",
    termsConditions: "",
    careerContent: "",
    faqContent: "",
    faqs: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        if (data) {
            let faqs = [];
            try {
                faqs = data.faqContent ? JSON.parse(data.faqContent) : [];
                if (!Array.isArray(faqs)) faqs = [];
            } catch (e) {
                faqs = [];
            }
            setSettings({
                ...data,
                faqs: faqs
            });
        }
        setLoading(false);
      });
  }, []);

  const handleAboutUsImageUpload = async (e) => {
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
        setSettings({ ...settings, aboutUsImageUrl: data.url });
        setMessage({ type: 'success', text: 'About Us image uploaded successfully!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Upload failed' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'About Us image upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  const handleAddFaq = () => {
    setSettings({
        ...settings,
        faqs: [...settings.faqs, { question: "", answer: "" }]
    });
  };

  const handleRemoveFaq = (index) => {
    const updated = settings.faqs.filter((_, i) => i !== index);
    setSettings({ ...settings, faqs: updated });
  };

  const handleFaqChange = (index, field, value) => {
    const updated = [...settings.faqs];
    updated[index] = { ...updated[index], [field]: value };
    setSettings({ ...settings, faqs: updated });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload = {
        aboutUsTitle: settings.aboutUsTitle,
        aboutUsDescription: settings.aboutUsDescription,
        aboutUsImageUrl: settings.aboutUsImageUrl,
        shippingPolicy: settings.shippingPolicy,
        refundPolicy: settings.refundPolicy,
        privacyPolicy: settings.privacyPolicy,
        termsConditions: settings.termsConditions,
        careerContent: settings.careerContent,
        faqContent: JSON.stringify(settings.faqs)
    };

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Page contents updated successfully!' });
      } else {
        const err = await response.json();
        setMessage({ type: 'error', text: err.error || "Failed to save pages" });
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
              <h1 className="text-3xl font-black text-[#111] uppercase italic tracking-tighter">Page Management</h1>
              <p className="text-gray-400 text-sm font-bold uppercase mt-1 tracking-widest">Manage static content and FAQs</p>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="h-14 px-10 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-2xl flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-b-white rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </>
            ) : (
                <>
                  <span>Save All Changes</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </>
            )}
          </button>
      </div>

      {message && (
          <div className={`p-6 rounded-3xl flex items-center gap-4 animate-fadeIn border ${
              message.type === 'success' 
              ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
              : 'bg-red-50 border-red-100 text-red-700'
          }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  message.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
              }`}>
                  {message.type === 'success' ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  ) : (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                  )}
              </div>
              <p className="font-bold text-sm uppercase tracking-tight">{message.text}</p>
          </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
          
          {/* About Us Section */}
          <div className="p-10 border-b border-gray-50 bg-gray-50/30">
              <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white text-xs font-black italic">A</div>
                  <h2 className="text-sm font-black uppercase text-[#111] tracking-tight">About Us Content</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Main Title</label>
                        <input 
                          type="text" 
                          value={settings.aboutUsTitle || ''}
                          onChange={(e) => setSettings({...settings, aboutUsTitle: e.target.value})}
                          className="w-full h-14 px-6 border border-gray-100 rounded-2xl bg-white outline-none focus:border-primary/30 transition-all font-bold text-sm" 
                          placeholder="e.g. কেসি বাজার সম্পর্কে"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">About Description</label>
                        <textarea 
                          rows="6"
                          value={settings.aboutUsDescription || ''}
                          onChange={(e) => setSettings({...settings, aboutUsDescription: e.target.value})}
                          className="w-full p-6 border border-gray-100 rounded-[30px] bg-white outline-none focus:border-primary/30 transition-all font-medium text-sm leading-relaxed"
                          placeholder="Full description about your brand..."
                        ></textarea>
                    </div>
                  </div>
                  <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">About Us Image</label>
                      <div className="flex flex-col items-start gap-4">
                          <div className="w-full aspect-video rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden shrink-0 group relative">
                              {settings.aboutUsImageUrl ? (
                                  <img src={settings.aboutUsImageUrl} alt="Preview" className="w-full h-full object-cover" />
                              ) : (
                                  <div className="text-gray-300 text-center p-4">
                                     <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                     <span className="text-[8px] font-black uppercase">No Image</span>
                                  </div>
                              )}
                              {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div></div>}
                          </div>
                          <label className="inline-block cursor-pointer">
                              <input type="file" className="hidden" accept="image/*" onChange={handleAboutUsImageUpload} disabled={uploading} />
                              <span className="h-8 px-4 bg-gray-100 text-gray-700 font-bold text-[9px] uppercase rounded-full flex items-center gap-2 hover:bg-gray-200 transition-all">
                                  Upload Brand Image
                              </span>
                          </label>
                      </div>
                  </div>
              </div>
          </div>

          {/* Legal Pages */}
          <div className="p-10 border-b border-gray-50 bg-white">
              <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-xs font-black italic">L</div>
                  <h2 className="text-sm font-black uppercase text-[#111] tracking-tight">Legal & Policy Pages</h2>
              </div>
              
              <div className="space-y-12">
                  {[
                    { label: 'Shipping Policy', key: 'shippingPolicy' },
                    { label: 'Refund Policy', key: 'refundPolicy' },
                    { label: 'Privacy Policy', key: 'privacyPolicy' },
                    { label: 'Terms & Conditions', key: 'termsConditions' },
                    { label: 'Career Opportunities', key: 'careerContent' },
                  ].map((page) => (
                    <div key={page.key} className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">{page.label}</label>
                       <textarea 
                         rows="10"
                         value={settings[page.key] || ''}
                         onChange={(e) => setSettings({...settings, [page.key]: e.target.value})}
                         className="w-full p-8 border border-gray-100 rounded-[40px] bg-gray-50/30 outline-none focus:bg-white focus:border-primary/30 transition-all font-medium text-sm leading-relaxed"
                         placeholder={`Detail your ${page.label.toLowerCase()} here...`}
                       ></textarea>
                    </div>
                  ))}
              </div>
          </div>

          {/* FAQ Section */}
          <div className="p-10 bg-gray-50/20">
              <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-xs font-black italic">?</div>
                      <h2 className="text-sm font-black uppercase text-[#111] tracking-tight">Dynamic FAQ Items</h2>
                  </div>
                  <button 
                    type="button"
                    onClick={handleAddFaq}
                    className="h-10 px-6 bg-white border border-gray-100 hover:border-orange-500/30 text-orange-600 text-[10px] font-black uppercase rounded-full transition-all shadow-sm flex items-center gap-2"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
                    Add Question
                  </button>
              </div>

              <div className="space-y-6">
                  {settings.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative group animate-fadeIn">
                        <button 
                            type="button"
                            onClick={() => handleRemoveFaq(idx)}
                            className="absolute -top-2 -right-2 w-8 h-8 bg-red-50 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-red-500 hover:text-white"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Question {idx + 1}</label>
                                <input 
                                    type="text" 
                                    value={faq.question}
                                    onChange={(e) => handleFaqChange(idx, 'question', e.target.value)}
                                    className="w-full h-12 px-6 border border-gray-50 rounded-2xl bg-gray-50/30 outline-none focus:bg-white focus:border-orange-500/20 transition-all font-bold text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Answer</label>
                                <textarea 
                                    rows="4"
                                    value={faq.answer}
                                    onChange={(e) => handleFaqChange(idx, 'answer', e.target.value)}
                                    className="w-full p-6 border border-gray-50 rounded-3xl bg-gray-50/30 outline-none focus:bg-white focus:border-orange-500/20 transition-all font-bold text-sm"
                                />
                            </div>
                        </div>
                    </div>
                  ))}
                  {settings.faqs.length === 0 && (
                      <div className="py-20 text-center border-2 border-dashed border-gray-100 rounded-[40px]">
                          <p className="text-gray-300 font-bold uppercase text-[10px] tracking-widest">No FAQs added yet.</p>
                      </div>
                  )}
              </div>
          </div>
      </form>
    </div>
  );
}

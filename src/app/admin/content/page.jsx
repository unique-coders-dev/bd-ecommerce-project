"use client";

import React from 'react';

const AdminContent = () => {
  const banners = [
    { id: 1, title: 'Hero Slider 1', image: 'https://kcbazar.com/wp-content/uploads/2025/08/KC-Bazar-web-banner-02-copy-1536x633.jpg', status: 'Active' },
    { id: 2, title: 'Hero Slider 2', image: 'https://kcbazar.com/wp-content/uploads/2025/08/KC-Bazar-web-banner-01-copy-1536x633.jpg', status: 'Active' },
    { id: 3, title: 'Promo Banner 1', image: 'https://kcbazar.com/wp-content/uploads/2024/02/KC-Bazar-Promo-1.jpg', status: 'Inactive' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#111] uppercase tracking-tighter">Content Manager</h1>
          <p className="text-gray-400 font-medium">Update your storefront banners, sliders, and marketing assets.</p>
        </div>
        <button className="px-6 py-3 bg-[#FF4D6D] text-white font-black uppercase text-[11px] tracking-widest rounded-xl hover:bg-[#e64462] transition-all shadow-xl shadow-[#FF4D6D]/20 cursor-pointer">New Banner</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {banners.map((banner) => (
            <div key={banner.id} className="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden group">
                <div className="aspect-[21/9] overflow-hidden relative">
                    <img src={banner.image} alt={banner.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                        {banner.status}
                    </div>
                </div>
                <div className="p-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-black text-[#111] uppercase tracking-widest">{banner.title}</h3>
                        <p className="text-[10px] text-gray-400 font-bold">Updated Apr 8, 2026</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-[#FF4D6D] transition-all cursor-pointer"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
                        <button className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-all cursor-pointer"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                    </div>
                </div>
            </div>
         ))}
      </div>
    </div>
  );
};

export default AdminContent;

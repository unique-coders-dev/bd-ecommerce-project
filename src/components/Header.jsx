"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import MenuSidebar from './MenuSidebar';

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { label: 'Shop', href: '/shop', hot: false },
    { label: '🔥 Eid Offer', href: '/clearance-sale/', hot: true },
    { label: 'Brands', href: '/brand/', hot: false },
    { label: 'Combo Offer', href: '/product-category/combo-set/', hot: false },
    { label: 'Brand New Beauty', href: '/new-arrivals/', hot: false },
    { label: 'Clearance', href: '/clearance-sale/', hot: false },
    { label: 'Pre Order', href: '/pre-order/', hot: false },
    { label: 'Showrooms', href: '/showrooms/', hot: false },
  ];

  const marqueeText = [
    '🔥 ঈদ সালামি অফার! কেনাকাটা করুন আর মেতে উঠুন উৎসবের আনন্দে।',
    '🚚 ফ্রি ডেলিভারি নির্দিষ্ট শর্ত সাপেক্ষে সারা বাংলাদেশে।',
    '🎉 সকল প্রি-অর্ডার পণ্যে থাকছে বিশেষ ছাড়।',
    '✨ ১০০% অরিজিনাল পণ্যের নিশ্চয়তা — সরাসরি কোরিয়া থেকে আমদানি।',
    '🛒 ক্যাশ অন ডেলিভারি সুবিধা সারা বাংলাদেশে।',
    '🔥 ঈদ সালামি অফার! কেনাকাটা করুন আর মেতে উঠুন উৎসবের আনন্দে।',
    '🚚 ফ্রি ডেলিভারি নির্দিষ্ট শর্ত সাপেক্ষে সারা বাংলাদেশে।',
    '🎉 সকল প্রি-অর্ডার পণ্যে থাকছে বিশেষ ছাড়।',
    '✨ ১০০% অরিজিনাল পণ্যের নিশ্চয়তা — সরাসরি কোরিয়া থেকে আমদানি।',
    '🛒 ক্যাশ অন ডেলিভারি সুবিধা সারা বাংলাদেশে।',
  ];

  return (
    <header>
      {/* ── Announcement Marquee ── */}
      <div className="bg-[#fff0f3] border-b border-[#fce4ea] h-9 overflow-hidden flex items-center group">
        <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
          {marqueeText.map((text, i) => (
            <span key={i} className="text-sm text-[#555] font-bold px-6">
              {text}
            </span>
          ))}
          {marqueeText.map((text, i) => (
            <span key={`dup-${i}`} className="text-sm text-[#555] font-bold px-6">
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* ── Middle Header ── */}
      <div className="bg-white border-b border-[#E5E7EB] py-3">
        <div className="flex items-center justify-between gap-5 max-w-[1320px] mx-auto px-4">
          
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="w-[140px] flex-shrink-0">
              <Link href="/">
                <img
                  src="https://kcbazar.com/wp-content/uploads/2025/08/KCB-LOGO-G.png"
                  alt="KC Bazar Logo"
                  className="w-full"
                />
              </Link>
            </div>
          </div>

          {/* Search Box (Middle) */}
          <div className="flex-1 max-w-[580px] relative hidden md:block">
            <input 
              type="text" 
              placeholder="পণ্য অনুসন্ধান করুন..." 
              className="w-full h-11 border-[1.5px] border-[#E5E7EB] rounded-[25px] px-5 pr-12 text-sm outline-none focus:border-[#FF4D6D] transition-colors"
            />
            <button className="absolute right-0 top-0 w-12 h-11 bg-[#FF4D6D] border-none rounded-r-[25px] text-white flex items-center justify-center hover:brightness-110 transition-all" aria-label="Search">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>

          {/* Info & Icons Box (Right) */}
          <div className="flex items-center gap-5">
            <div className="hidden lg:flex items-center gap-2.5">
              <div className="w-9 h-9 text-[#FF4D6D] bg-[#fff0f3] rounded-full flex items-center justify-center">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 2.15 5.18 2 2 0 0 1 4.11 3h3a2 2 0 0 1-2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 10.91A16 16 0 0 0 13.09 15.9l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#6B7280]">Hotline</span>
                <span className="text-[13px] font-bold">09644-888889</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Cart Toggle Button */}
              <button
                onClick={() => setCartOpen(true)}
                className="w-[38px] h-[38px] rounded-full border border-[#E5E7EB] bg-transparent flex items-center justify-center text-[#111827] transition-all duration-200 hover:bg-[#fff0f3] hover:text-[#FF4D6D] relative cursor-pointer"
                aria-label="Toggle Cart"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span className="absolute -top-1.5 -right-1 bg-[#FF4D6D] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">1</span>
              </button>
              {/* Account */}
              <Link href="/my-account" className="w-[38px] h-[38px] rounded-full border border-[#E5E7EB] bg-transparent flex items-center justify-center text-[#111827] transition-all duration-200 hover:bg-[#fff0f3] hover:text-[#FF4D6D]" aria-label="My Account">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="bg-white border-b border-[#E5E7EB] sticky top-0 z-[1000]">
        <div className="max-w-[1320px] mx-auto px-4 h-[50px] flex items-center gap-4">
          {/* Hamburger Menu (Moved here) */}
          <button 
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 rounded-full bg-[#f9f9f9] border border-gray-100 flex items-center justify-center text-[#111] hover:bg-[#FF4D6D] hover:text-white transition-all shadow-sm active:scale-90"
            aria-label="Toggle Sidebar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>

          <nav className="flex gap-1 overflow-x-auto no-scrollbar scroll-smooth">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-[13px] font-bold px-3 py-1.5 rounded-md transition-all duration-200 whitespace-nowrap ${
                  link.hot ? 'text-[#FF4D6D] hover:bg-[#fff0f3]' : 'text-[#333] hover:text-[#FF4D6D] hover:bg-[#fff0f3]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ── Menu Sidebar (New) ── */}
      <MenuSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ── Cart Sidebar Drawer ── */}
      {cartOpen && (
        <div className="fixed inset-0 z-[2000] flex justify-end">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setCartOpen(false)}
          ></div>
          
          {/* Sidebar Content */}
          <div className="relative w-full max-w-[380px] h-full bg-white shadow-2xl flex flex-col animate-slideIn">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-xl font-black text-[#111] uppercase tracking-tighter">Shopping Cart</h2>
              <button 
                onClick={() => setCartOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-[#111] transition-all cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
               <div className="flex gap-4 group">
                  <div className="w-20 h-20 rounded-xl border border-gray-100 p-2 flex-shrink-0 bg-gray-50/30">
                     <img src="https://kcbazar.com/wp-content/uploads/2023/12/Nature-Skin-Jeju-Green-Tea-CICA-Hydrating-Facial-Foam-152-ml-300x300.jpg" alt="product" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                     <Link href="/product/1" onClick={() => setCartOpen(false)} className="text-sm font-black text-[#111] leading-tight block hover:text-[#FF4D6D] transition-colors mb-1 truncate">Nature Skin Jeju Green Tea CICA Hydrating Facial Foam 152 ml</Link>
                     <div className="flex items-center justify-between">
                        <span className="text-[13px] font-bold text-gray-400">1 × <span className="text-[#FF4D6D]">৳ 800</span></span>
                        <button className="text-gray-300 hover:text-red-500 cursor-pointer transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12"/></svg></button>
                     </div>
                  </div>
               </div>
               
               {/* Decorative Empty Space if no more items */}
               <div className="pt-10 text-center opacity-10">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
               </div>
            </div>

            {/* Sidebar Footer */}
            <div className="p-6 bg-white border-t border-gray-100 space-y-3.5 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-black text-[#111] uppercase tracking-widest">Subtotal:</span>
                  <span className="text-xl font-black text-[#FF4D6D]">৳ 800</span>
               </div>
               <Link 
                 href="/checkout" 
                 onClick={() => setCartOpen(false)}
                 className="w-full h-14 bg-[#FF4D6D] text-white flex items-center justify-center font-black uppercase tracking-[2px] rounded-xl text-sm shadow-xl shadow-[#FF4D6D]/20 hover:bg-[#e64462] transition-all cursor-pointer"
               >
                 Checkout
               </Link>
               <Link 
                 href="/cart" 
                 onClick={() => setCartOpen(false)}
                 className="w-full h-14 bg-[#111] text-white flex items-center justify-center font-black uppercase tracking-[2px] rounded-xl text-sm hover:bg-black transition-all cursor-pointer"
               >
                 View Cart
               </Link>
               <button 
                 onClick={() => setCartOpen(false)}
                 className="w-full text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-[#FF4D6D] transition-colors pt-2 cursor-pointer"
               >
                 Continue Shopping
               </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

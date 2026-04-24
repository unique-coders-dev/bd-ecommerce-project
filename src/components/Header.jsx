"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MenuSidebar from './MenuSidebar';
import { useCartStore } from '@/store/cartStore';

const Header = ({ initialSettings }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getCartTotal = useCartStore((state) => state.getCartTotal);

  useEffect(() => setMounted(true), []);
  const [settings, setSettings] = useState(initialSettings);
  const [navLinks, setNavLinks] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!initialSettings) {
      fetch('/api/admin/settings')
        .then(res => res.json())
        .then(data => setSettings(data));
    }
  }, [initialSettings]);

  useEffect(() => {
    fetch('/api/admin/menus')
      .then(res => res.json())
      .then(data => {
        // Filter for root header menus and those with 'header' type
        const headerMenus = data.filter(m => !m.parentId && m.type === 'header');
        // Sort by order
        const sorted = headerMenus.sort((a, b) => a.order - b.order);
        setNavLinks(sorted);
      });
  }, []);

  const getAnnouncements = () => {
    if (!settings?.announcements) return [settings?.marqueeText || `Welcome to ${settings?.siteName || 'our store'}! Discover our premium collection.`];
    try {
      const parsed = typeof settings.announcements === 'string' ? JSON.parse(settings.announcements) : settings.announcements;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : [settings.marqueeText];
    } catch (e) {
      return [settings?.marqueeText];
    }
  };

  const announcements = getAnnouncements();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-[1000] w-full shadow-sm">
      {/* ── Announcement Marquee ── */}
      <div className="bg-primary-light border-b border-primary/10 h-9 overflow-hidden flex items-center group">
        <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
          {[1,2,3,4].map((set) => (
            <React.Fragment key={set}>
                {announcements.map((text, i) => (
                    <span key={i} className="text-[11px] text-[#555] font-black uppercase tracking-widest px-12 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
                        {text}
                    </span>
                ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Middle Header ── */}
      <div className="bg-white border-b border-[#E5E7EB] py-3">
        <div className="flex items-center justify-between gap-5 max-w-[1320px] mx-auto px-4">
          
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="max-w-[160px] flex-shrink-0">
              <Link href="/">
                <img
                  src={settings?.logoUrl || "https://kcbazar.com/wp-content/uploads/2025/08/KCB-LOGO-G.png"}
                  alt={`${settings?.siteName || 'Store'} Logo`}
                  className="w-full h-auto max-h-[50px] object-contain"
                />
              </Link>
            </div>
          </div>

          {/* Search Box (Middle) */}
          <form onSubmit={handleSearch} className="flex-1 max-w-[580px] relative hidden md:block text-base">
            <input 
              type="text" 
              placeholder="পণ্য অনুসন্ধান করুন..." 
              className="w-full h-11 border-[1.5px] border-[#E5E7EB] rounded-[25px] px-5 pr-12 text-sm outline-none focus:border-primary transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-0 top-0 w-12 h-11 bg-primary border-none rounded-r-[25px] text-white flex items-center justify-center hover:bg-primary-soft hover:text-primary transition-all cursor-pointer" aria-label="Search">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </form>

          {/* Info & Icons Box (Right) */}
          <div className="flex items-center gap-5">
            <div className="hidden lg:flex items-center gap-2.5">
              <div className="w-9 h-9 text-primary bg-primary-light rounded-full flex items-center justify-center">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 2.15 5.18 2 2 0 0 1 4.11 3h3a2 2 0 0 1-2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 10.91A16 16 0 0 0 13.09 15.9l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-[#6B7280]">Hotline</span>
                <span className="text-[13px] font-bold">{settings?.hotline || "09644-888889"}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Cart Toggle Button */}
              <button
                onClick={() => setCartOpen(true)}
                className="w-[38px] h-[38px] rounded-full border border-[#E5E7EB] bg-transparent flex items-center justify-center text-[#111827] transition-all duration-200 hover:bg-primary-light hover:text-primary relative cursor-pointer"
                aria-label="Toggle Cart"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span className="absolute -top-1.5 -right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {mounted ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0}
                </span>
              </button>
              {/* Account */}
              <Link href="/my-account" className="w-[38px] h-[38px] rounded-full border border-[#E5E7EB] bg-transparent flex items-center justify-center text-[#111827] transition-all duration-200 hover:bg-primary-light hover:text-primary" aria-label="My Account">
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
      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1320px] mx-auto px-4 h-[50px] flex items-center gap-4">
          {/* Hamburger Menu */}
          <button 
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 rounded-full bg-[#f9f9f9] border border-gray-100 flex items-center justify-center text-[#111] hover:bg-primary hover:text-white transition-all shadow-sm active:scale-90 cursor-pointer"
            aria-label="Toggle Sidebar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>

          <nav className="flex gap-1 overflow-x-auto no-scrollbar scroll-smooth">
            {/* Static Links */}
            <Link href="/shop" className="text-[13px] font-bold px-3 py-1.5 rounded-md transition-all duration-200 whitespace-nowrap text-[#333] hover:text-primary hover:bg-primary-light">Shop</Link>
            <Link href="/offers" className="text-[13px] font-bold px-3 py-1.5 rounded-md transition-all duration-200 whitespace-nowrap text-[#333] hover:text-primary hover:bg-primary-light">Offers</Link>
            <Link href="/brands" className="text-[13px] font-bold px-3 py-1.5 rounded-md transition-all duration-200 whitespace-nowrap text-[#333] hover:text-primary hover:bg-primary-light">Brands</Link>
            <Link href="/clearance" className="text-[13px] font-bold px-3 py-1.5 rounded-md transition-all duration-200 whitespace-nowrap text-primary hover:bg-primary-light flex items-center gap-1"><span>🔥</span>Clearance</Link>
          </nav>
        </div>
      </div>

      <MenuSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ── Cart Sidebar Drawer ── */}
      {cartOpen && (
        <div className="fixed inset-0 z-[2000] flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setCartOpen(false)}></div>
          <div className="relative w-full max-w-[380px] h-full bg-white shadow-2xl flex flex-col animate-slideIn">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-xl font-black text-[#111] uppercase tracking-tighter">Shopping Cart</h2>
              <button onClick={() => setCartOpen(false)} className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-[#111] transition-all cursor-pointer">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
               {mounted && cartItems.length === 0 && (
                 <p className="text-center text-gray-400 font-bold mt-10">Your cart is empty!</p>
               )}
               {mounted && cartItems.map((item) => (
                 <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-xl border border-gray-100 p-2 flex-shrink-0 bg-gray-50/30">
                       <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <Link href={`/product/${item.id}`} onClick={() => setCartOpen(false)} className="text-sm font-black text-[#111] leading-tight block hover:text-primary transition-colors mb-1 truncate">{item.name}</Link>
                       <div className="flex items-center justify-between text-base">
                          <span className="text-[13px] font-bold text-gray-400">{item.quantity} × <span className="text-primary">৳ {item.salePrice || item.regularPrice}</span></span>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-primary-light0 cursor-pointer transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12"/></svg></button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
            <div className="p-6 bg-white border-t border-gray-100 space-y-3.5 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-black text-[#111] uppercase tracking-widest text-base">Subtotal:</span>
                  <span className="text-xl font-black text-primary">৳ {mounted ? getCartTotal() : 0}</span>
               </div>
               <Link href="/checkout" onClick={() => setCartOpen(false)} className="w-full h-14 bg-primary text-white flex items-center justify-center font-black uppercase tracking-[2px] rounded-xl text-sm shadow-xl shadow-primary/20 hover:brightness-110 transition-all cursor-pointer">Checkout</Link>
               <Link href="/cart" onClick={() => setCartOpen(false)} className="w-full h-14 bg-[#111] text-white flex items-center justify-center font-black uppercase tracking-[2px] rounded-xl text-sm hover:bg-black transition-all cursor-pointer">View Cart</Link>
               <button onClick={() => setCartOpen(false)} className="w-full text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors pt-2 cursor-pointer">Continue Shopping</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;


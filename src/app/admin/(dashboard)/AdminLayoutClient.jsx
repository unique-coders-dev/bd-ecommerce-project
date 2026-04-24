"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { MessageSquare } from 'lucide-react';

export default function AdminLayoutClient({ children, user, siteSettings }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();

  const themeColor = siteSettings?.themeColor?.replace('#', '') || "FF4D6D";

  const menuItems = [
    { label: 'Overview', href: '/admin', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
    )},
    { label: 'Products', href: '/admin/products', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
    )},
    { label: 'Categories', href: '/admin/categories', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
    )},
    { label: 'Brands', href: '/admin/brands', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
    )},
    { label: 'Orders', href: '/admin/orders', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01"/></svg>
    )},
    { label: 'Order Confirmation Message', href: '/admin/order-confirmation-message', icon: <MessageSquare className="w-5 h-5" /> },
    { label: 'Customers', href: '/admin/customers', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
    )},
    { label: 'Inquiries', href: '/admin/inquiries', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
    )},
    { label: 'Reviews', href: '/admin/reviews', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
    )},
    { label: 'Promotions', href: '/admin/content', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
    )},
    { label: 'Page Management', href: '/admin/pages', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
    )},
    { label: 'General Settings', href: '/admin/settings', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
    )},
    { label: 'User Management', href: '/admin/users', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
    )},
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (user?.role === "super-admin") return true;
    if (item.href === "/admin") return true; 
    
    const module = item.href.split('/')[2];
    const userPerms = user?.permissions?.split(',') || [];
    if (module && userPerms.includes(module)) {
      return true;
    }
    return false;
  });

  // Permission Guard: Prevent direct URL access to unauthorized pages
  useEffect(() => {
    if (!user || user.role === "super-admin") return;
    
    const module = pathname.split('/')[2] || 'dashboard'; // Default to dashboard if no module in path
    const userPerms = user?.permissions?.split(',') || [];
    
    // Only check modules that are in the menu (ignore generic admin paths if any)
    const knownModules = menuItems.map(item => item.href.split('/')[2]).filter(Boolean);
    knownModules.push('dashboard'); // Dashboard is a known module even if /admin
    
    if (module && knownModules.includes(module) && !userPerms.includes(module)) {
        window.location.href = "/admin"; // This might cause loop if dashboard is blocked. 
        // Better: redirect to the first available module or logout
    }
    
    // Specifically block dashboard if not permitted
    if (pathname === "/admin" && !userPerms.includes('dashboard')) {
        const firstAvailable = menuItems.find(item => userPerms.includes(item.href.split('/')[2]))?.href;
        window.location.href = firstAvailable || "/";
    }
  }, [pathname, user]);

  return (
    <>
      <div className="min-h-screen bg-[#f1f2f6] flex">
        {/* Sidebar */}
        <aside 
          className={`bg-white border-r border-gray-200 transition-all duration-300 fixed lg:sticky lg:top-0 z-[100] h-screen ${
            sidebarOpen ? 'w-[280px]' : 'w-[0px] lg:w-[80px]'
          } overflow-hidden`}
        >
          <div className="h-full flex flex-col">
            {/* Logo Section */}
            <div className="h-[70px] flex items-center px-6 border-b border-gray-100 shrink-0">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-primary/30">
                      <span className="text-white font-black text-xs uppercase tracking-tighter">
                        {siteSettings?.siteName?.split(' ').map(n => n[0]).join('').slice(0, 2) || "AH"}
                      </span>
                  </div>
                  {sidebarOpen && <span className="text-lg font-black text-[#111] truncate max-w-[180px]">{siteSettings?.siteName || "Admin Hub"}</span>}
               </div>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto no-scrollbar">
               {filteredMenuItems.map((item) => {
                 const active = pathname === item.href;
                 return (
                     <Link
                       key={item.href}
                       href={item.href}
                       className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                         active ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-400 hover:bg-gray-50 hover:text-[#111]'
                       }`}
                     >
                       <div className={`${active ? 'text-white' : 'text-gray-400 group-hover:text-primary'} transition-colors`}>
                           {item.icon}
                       </div>
                       {sidebarOpen && <span className="text-[13px] font-bold uppercase whitespace-nowrap">{item.label}</span>}
                     </Link>
                 );
               })}
            </nav>

            {/* Footer Nav */}
            <div className="p-4 border-t border-gray-100">
               <Link href="/" className="flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-[#111] transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                  {sidebarOpen && <span className="text-[13px] font-bold">Back to Site</span>}
               </Link>
                <button 
                   onClick={() => setShowLogoutModal(true)}
                   className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-400 hover:bg-primary-soft hover:text-primary transition-all cursor-pointer"
                >
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                   {sidebarOpen && <span className="text-[13px] font-bold">Sign Out</span>}
                </button>
            </div>
          </div>
        </aside>

        {/* Main Content Body */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Top Header */}
          <header className="h-[70px] bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-[90]">
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 transition-all cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16m-7 6h7"/></svg>
                </button>
                <h2 className="text-sm font-black uppercase text-gray-400 hidden md:block">
                   System Control Panel
                </h2>
             </div>

             <div className="flex items-center gap-5">
                <div className="hidden sm:flex flex-col items-end">
                    <span className="text-[12px] font-bold uppercase text-[#111]">
                      {user?.role === "super-admin" ? "Super Admin" : "Admin"}
                    </span>
                    <span className="text-[10px] font-medium text-gray-400">{user?.email || "admin@example.com"}</span>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-primary/10 p-0.5">
                    <img src={`https://ui-avatars.com/api/?name=Admin&background=${themeColor}&color=fff`} alt="admin" className="w-full h-full rounded-full object-cover" />
                </div>
             </div>
          </header>

          {/* Content Section */}
          <main className="flex-1 p-6 lg:p-10 text-base">
              <div className="animate-fadeIn">
                  {children}
              </div>
          </main>
        </div>
      </div>

      {/* Logout Confirmation Modal - Elevated and high-opacity */}
      {showLogoutModal && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
              <div className="bg-white rounded-[32px] p-10 max-w-sm w-full shadow-2xl border border-white/20 animate-scaleUp">
                  <div className="text-center">
                      <div className="w-16 h-16 bg-primary-soft text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                      </div>
                      <h3 className="text-2xl font-black text-[#111] uppercase italic tracking-tighter">Are you sure?</h3>
                      <p className="mt-2 text-sm font-medium text-gray-400">You will need to login again to access the admin panel.</p>
                  </div>
                  <div className="mt-10 flex flex-col gap-3">
                      <button 
                      onClick={() => signOut({ callbackUrl: '/admin/login' })}
                      className="w-full h-14 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/30 active:scale-95"
                      >
                      Yes, Sign Out
                      </button>
                      <button 
                      onClick={() => setShowLogoutModal(false)}
                      className="w-full h-14 bg-gray-50 text-gray-400 font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-gray-100 hover:text-[#111] transition-all active:scale-95"
                      >
                      Cancel
                      </button>
                  </div>
              </div>
          </div>
      )}
    </>
  );
}

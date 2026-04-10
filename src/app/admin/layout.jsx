"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { label: 'Overview', href: '/admin', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
    )},
    { label: 'Products', href: '/admin/products', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
    )},
    { label: 'Orders', href: '/admin/orders', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01"/></svg>
    )},
    { label: 'Customers', href: '/admin/customers', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
    )},
    { label: 'Content Manager', href: '/admin/content', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
    )},
    { label: 'Promotions', href: '/admin/promotions', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0h4l2 7H6l2-7h4z"/></svg>
    )},
  ];

  return (
    <div className="min-h-screen bg-[#f1f2f6] flex">
      
      {/* Sidebar */}
      <aside 
        className={`bg-white border-r border-gray-200 transition-all duration-300 fixed lg:relative z-[100] h-full ${
          sidebarOpen ? 'w-[280px]' : 'w-[0px] lg:w-[80px]'
        } overflow-hidden`}
      >
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="h-[70px] flex items-center px-6 border-b border-gray-100 shrink-0">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FF4D6D] rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-white font-black text-xs">KC</span>
                </div>
                {sidebarOpen && <span className="text-lg font-black text-[#111]">Admin Hub</span>}
             </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 py-6 px-3 space-y-1">
             {menuItems.map((item) => {
               const active = pathname === item.href;
               return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                      active ? 'bg-[#FF4D6D] text-white shadow-lg shadow-[#FF4D6D]/20' : 'text-gray-400 hover:bg-gray-50 hover:text-[#111]'
                    }`}
                  >
                    <div className={`${active ? 'text-white' : 'text-gray-400 group-hover:text-[#FF4D6D]'} transition-colors`}>
                        {item.icon}
                    </div>
                    {sidebarOpen && <span className="text-[13px] font-bold uppercase">{item.label}</span>}
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
                  <span className="text-[12px] font-bold uppercase text-[#111]">Super Admin</span>
                  <span className="text-[10px] font-medium text-gray-400">admin@kcbazar.com</span>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-[#FF4D6D]/10 p-0.5">
                  <img src="https://ui-avatars.com/api/?name=Admin&background=FF4D6D&color=fff" alt="admin" className="w-full h-full rounded-full object-cover" />
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
  );
}

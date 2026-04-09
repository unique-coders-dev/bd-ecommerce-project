"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
    )},
    { id: 'orders', label: 'Orders', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
    )},
    { id: 'addresses', label: 'Addresses', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
    )},
    { id: 'settings', label: 'Account Settings', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
    )},
    { id: 'logout', label: 'Logout', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
    )},
  ];

  const orders = [
    { id: '#53848', date: 'April 8, 2026', status: 'Processing', total: '৳ 1,200', items: 1 },
    { id: '#52120', date: 'March 15, 2026', status: 'Completed', total: '৳ 2,500', items: 3 },
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans">
      <div className="max-w-[1320px] mx-auto px-4 py-10 lg:py-16">
        
        {/* Header Section */}
        <div className="mb-12">
            <h1 className="text-3xl lg:text-5xl font-black text-[#111] uppercase tracking-tighter mb-2">My Account</h1>
            <div className="h-1.5 w-20 bg-[#FF4D6D] rounded-full"></div>
            <p className="mt-4 text-gray-400 font-medium">Welcome back, <span className="text-[#FF4D6D] font-bold">Amik</span>! Manage your orders and profile here.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
          
          {/* Sidebar Navigation */}
          <aside className="space-y-2">
            <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-4 overflow-hidden">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${
                            activeTab === item.id 
                            ? 'bg-[#FF4D6D] text-white shadow-lg shadow-[#FF4D6D]/20' 
                            : 'text-gray-400 hover:bg-gray-50 hover:text-[#111]'
                        }`}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </div>
            
            <div className="bg-gradient-to-br from-[#111] to-[#333] rounded-2xl p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
                <h4 className="text-lg font-black uppercase tracking-tight mb-2">Need Help?</h4>
                <p className="text-xs text-gray-400 font-medium mb-6 leading-relaxed">Our support team is available 24/7 for your beauty needs.</p>
                <Link href="tel:09644888889" className="inline-flex items-center gap-2 text-[#FF4D6D] font-black text-[11px] uppercase tracking-widest hover:translate-x-1 transition-transform">
                    Call 09644888889 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M14 5l7 7-7 7"/></svg>
                </Link>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="space-y-8 animate-fadeIn">

            {/* Dashboard View */}
            {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 flex flex-col gap-4">
                        <div className="w-12 h-12 bg-pink-50 text-[#FF4D6D] rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-[#111] uppercase tracking-widest mb-1">Recent Orders</h3>
                            <p className="text-[12px] text-gray-400 font-medium">You have 2 active orders this month.</p>
                        </div>
                        <button onClick={() => setActiveTab('orders')} className="mt-2 text-[#FF4D6D] text-[11px] font-black uppercase tracking-widest hover:underline cursor-pointer">View All Orders</button>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 flex flex-col gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-[#111] uppercase tracking-widest mb-1">Saved Addresses</h3>
                            <p className="text-[12px] text-gray-400 font-medium">1 Shipping address, 1 Billing address.</p>
                        </div>
                        <button onClick={() => setActiveTab('addresses')} className="mt-2 text-[#FF4D6D] text-[11px] font-black uppercase tracking-widest hover:underline cursor-pointer">Manage Addresses</button>
                    </div>
                </div>
            )}

            {/* Orders View */}
            {activeTab === 'orders' && (
                <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50">
                                <tr className="text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                                    <th className="px-8 py-6">Order ID</th>
                                    <th className="px-8 py-6">Date</th>
                                    <th className="px-8 py-6">Status</th>
                                    <th className="px-8 py-6">Total</th>
                                    <th className="px-8 py-6">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {orders.map((order, i) => (
                                    <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="px-8 py-6 font-black text-[#111]">{order.id}</td>
                                        <td className="px-8 py-6 text-sm text-gray-500 font-medium">{order.date}</td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                order.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-black text-[#111]">{order.total} for {order.items} item</td>
                                        <td className="px-8 py-6">
                                            <button className="text-[#FF4D6D] font-black text-[11px] uppercase tracking-widest border-2 border-[#FF4D6D] px-4 py-2 rounded-lg hover:bg-[#FF4D6D] hover:text-white transition-all cursor-pointer">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Addresses View */}
            {activeTab === 'addresses' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-black/5 space-y-6">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                            <h3 className="text-lg font-black text-[#111] uppercase tracking-tighter">Billing Address</h3>
                            <button className="text-[#FF4D6D] text-[11px] font-black uppercase tracking-widest hover:underline cursor-pointer">Edit</button>
                        </div>
                        <div className="space-y-2 text-sm text-gray-500 font-bold leading-relaxed not-italic">
                            <p className="text-[#111] font-black uppercase text-[12px] tracking-widest mb-2">Amik</p>
                            <p>Model Town, Puran Para</p>
                            <p>Bandarban, 4600</p>
                            <p>01427654966</p>
                        </div>
                    </div>
                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-black/5 space-y-6">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                            <h3 className="text-lg font-black text-[#111] uppercase tracking-tighter">Shipping Address</h3>
                            <button className="text-[#FF4D6D] text-[11px] font-black uppercase tracking-widest hover:underline cursor-pointer">Edit</button>
                        </div>
                        <div className="space-y-2 text-sm text-gray-500 font-bold leading-relaxed not-italic">
                            <p className="text-[#111] font-black uppercase text-[12px] tracking-widest mb-2">Amik</p>
                            <p>Model Town, Puran Para</p>
                            <p>Bandarban, 4600</p>
                            <p>01427654966</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Settings View */}
            {activeTab === 'settings' && (
                <div className="bg-white p-10 rounded-2xl shadow-sm border border-black/5">
                    <h3 className="text-xl font-black text-[#111] uppercase tracking-tighter mb-10 pb-4 border-b border-gray-100">Account Details</h3>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-1">
                            <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">First Name <span className="text-[#FF4D6D]">*</span></label>
                            <input type="text" defaultValue="Amik" className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[#FF4D6D]/30 focus:bg-white transition-all font-medium text-sm" />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Last Name <span className="text-[#FF4D6D]">*</span></label>
                            <input type="text" defaultValue="Hasan" className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[#FF4D6D]/30 focus:bg-white transition-all font-medium text-sm" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Display Name <span className="text-[#FF4D6D]">*</span></label>
                            <input type="text" defaultValue="Amik" className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[#FF4D6D]/30 focus:bg-white transition-all font-medium text-sm" />
                            <p className="mt-2 text-[10px] text-gray-400 font-bold italic">This will be how your name will be displayed in the account section and in reviews.</p>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Email Address <span className="text-[#FF4D6D]">*</span></label>
                            <input type="email" defaultValue="amik@example.com" className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[#FF4D6D]/30 focus:bg-white transition-all font-medium text-sm" />
                        </div>
                        
                        <div className="md:col-span-2 pt-6">
                            <h4 className="text-[12px] font-black text-[#111] uppercase tracking-[2px] mb-6 border-l-4 border-[#FF4D6D] pl-3">Password Change</h4>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Current password (leave blank to leave unchanged)</label>
                                    <input type="password" className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[#FF4D6D]/30 focus:bg-white transition-all font-medium text-sm" />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">New password (leave blank to leave unchanged)</label>
                                    <input type="password" className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[#FF4D6D]/30 focus:bg-white transition-all font-medium text-sm" />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Confirm new password</label>
                                    <input type="password" className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[#FF4D6D]/30 focus:bg-white transition-all font-medium text-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 pt-4">
                            <button type="submit" className="h-[60px] px-12 bg-[#FF4D6D] text-white font-black uppercase tracking-[2px] rounded-xl text-sm shadow-xl shadow-[#FF4D6D]/20 hover:bg-[#e64462] transition-all active:scale-[0.98] cursor-pointer">Save Changes</button>
                        </div>
                    </form>
                </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;

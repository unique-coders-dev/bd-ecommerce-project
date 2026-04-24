"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const MyAccount = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    if (status === 'authenticated') {
      fetchData();
    }
  }, [status]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, profileRes, settingsRes] = await Promise.all([
        fetch('/api/user/orders'),
        fetch('/api/user/profile'),
        fetch('/api/settings')
      ]);
      
      if (ordersRes.ok) setOrders(await ordersRes.json());
      if (profileRes.ok) setUser(await profileRes.json());
      if (settingsRes.ok) setSettings(await settingsRes.json());
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.ok) {
        toast.success("Profile updated successfully");
        setUser(result.user);
      } else {
        toast.error(result.error || "Update failed");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleAddressUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...user, ...data })
      });
      if (res.ok) {
        toast.success("Address updated successfully");
        fetchData();
        setShowAddressModal(false);
      } else {
        const err = await res.json();
        toast.error(err.error || "Update failed");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

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

  const hotline = settings?.hotline || "09644888889";

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <div className="max-w-[1320px] mx-auto px-4 py-10 lg:py-16">
        
        {/* Header Section */}
        <div className="mb-12">
            <h1 className="text-3xl lg:text-5xl font-black text-[#111] uppercase mb-2">My Account</h1>
            <div className="h-1.5 w-20 bg-[var(--color-primary)] rounded-full"></div>
            <p className="mt-4 text-gray-400 font-medium">Welcome back, <span className="text-[var(--color-primary)] font-bold">{user?.name}</span>! Manage your orders and profile here.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
          
          {/* Sidebar Navigation */}
          <aside className="space-y-2">
            <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-4 overflow-hidden">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            if (item.id === 'logout') {
                                setShowLogoutModal(true);
                            } else {
                                setActiveTab(item.id);
                            }
                        }}
                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl text-sm font-black uppercase transition-all ${
                            activeTab === item.id 
                            ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20' 
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
                <Link href={`tel:${hotline}`} className="inline-flex items-center gap-2 text-[var(--color-primary)] font-black text-[11px] uppercase hover:translate-x-1 transition-transform">
                    Call {hotline} <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M14 5l7 7-7 7"/></svg>
                </Link>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="space-y-8 animate-fadeIn">

            {/* Dashboard View */}
            {activeTab === 'dashboard' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 flex flex-col gap-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-primary-light text-[var(--color-primary)] rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-[#111] uppercase mb-1">Recent Orders</h3>
                            <p className="text-[12px] text-gray-400 font-medium">You have {orders.length} orders in total.</p>
                        </div>
                        <button onClick={() => setActiveTab('orders')} className="mt-2 text-[var(--color-primary)] text-[11px] font-black uppercase tracking-widest hover:underline cursor-pointer">View All Orders</button>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 flex flex-col gap-4 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-[#111] uppercase mb-1">Shipping Address</h3>
                            <p className="text-[12px] text-gray-400 font-medium line-clamp-1">{user?.address || "No address saved"}</p>
                        </div>
                        <button onClick={() => setActiveTab('addresses')} className="mt-2 text-[var(--color-primary)] text-[11px] font-black uppercase tracking-widest hover:underline cursor-pointer">Manage Addresses</button>
                    </div>
                </div>
            )}

            {/* Orders View */}
            {activeTab === 'orders' && (
                <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50">
                                <tr className="text-[11px] font-black uppercase text-gray-400 border-b border-gray-100">
                                    <th className="px-8 py-6">Order ID</th>
                                    <th className="px-8 py-6">Date</th>
                                    <th className="px-8 py-6">Status</th>
                                    <th className="px-8 py-6">Total</th>
                                    <th className="px-8 py-6">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center text-gray-400 font-bold uppercase text-xs">No orders found yet.</td>
                                    </tr>
                                ) : orders.map((order, i) => (
                                    <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                                        <td className="px-8 py-6 font-black text-[#111]">{order.orderNumber}</td>
                                        <td className="px-8 py-6 text-sm text-gray-500 font-medium">
                                            {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                                order.status === 'delivered' ? 'bg-green-100 text-green-600' : 
                                                order.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                                                'bg-orange-100 text-orange-600'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-black text-[#111]">৳ {order.totalAmount}</td>
                                        <td className="px-8 py-6">
                                            <button 
                                                onClick={() => { setSelectedOrder(order); setShowOrderModal(true); }}
                                                className="text-[var(--color-primary)] font-black text-[11px] uppercase border-2 border-[var(--color-primary)] px-4 py-2 rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-all cursor-pointer"
                                            >
                                                View
                                            </button>
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
                <div className="max-w-2xl">
                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-black/5 space-y-6">
                        <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                            <h3 className="text-lg font-black text-[#111] uppercase tracking-tighter">Shipping Address</h3>
                            <button 
                                onClick={() => setShowAddressModal(true)}
                                className="text-[var(--color-primary)] text-[11px] font-black uppercase tracking-widest hover:underline cursor-pointer"
                            >
                                Edit Address
                            </button>
                        </div>
                        <div className="space-y-4 text-sm text-gray-500 font-bold leading-relaxed not-italic">
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Full Name</p>
                                <p className="text-[#111] font-black uppercase text-[12px]">{user?.name}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Mobile</p>
                                <p className="text-[#111] font-black uppercase text-[12px]">{user?.phone || "Not set"}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Detailed Address</p>
                                <p className="text-[#111] font-black uppercase text-[12px]">{user?.address || "Not set"}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-400 mb-1">District</p>
                                    <p className="text-[#111] font-black uppercase text-[12px]">{user?.district || "Not set"}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase text-gray-400 mb-1">City</p>
                                    <p className="text-[#111] font-black uppercase text-[12px]">{user?.city || "Not set"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Settings View */}
            {activeTab === 'settings' && (
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-black/5">
                    <h3 className="text-xl font-black text-[#111] uppercase tracking-tighter mb-10 pb-4 border-b border-gray-100">Account Details</h3>
                    <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Display Name <span className="text-[var(--color-primary)]">*</span></label>
                            <input name="name" type="text" required defaultValue={user?.name} className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[var(--color-primary)]/30 focus:bg-white transition-all font-medium text-sm" />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                            <input disabled value={user?.email} className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-100/30 outline-none text-gray-400 font-medium text-sm cursor-not-allowed" />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Phone Number</label>
                            <input name="phone" type="text" defaultValue={user?.phone} className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[var(--color-primary)]/30 focus:bg-white transition-all font-medium text-sm" />
                        </div>
                        
                        <div className="md:col-span-2 pt-6">
                            <h4 className="text-[12px] font-black text-[#111] uppercase mb-6 border-l-4 border-[var(--color-primary)] pl-3">Security & Password</h4>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Current password (leave blank to leave unchanged)</label>
                                    <input name="currentPassword" type="password" className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[var(--color-primary)]/30 focus:bg-white transition-all font-medium text-sm" />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">New password (leave blank to leave unchanged)</label>
                                    <input name="newPassword" type="password" className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[var(--color-primary)]/30 focus:bg-white transition-all font-medium text-sm" />
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 pt-4">
                             <button type="submit" disabled={saving} className="h-[60px] px-12 bg-[var(--color-primary)] text-white font-black uppercase rounded-xl text-sm shadow-xl shadow-[var(--color-primary)]/20 hover:bg-[#e64462] transition-all active:scale-[0.98] cursor-pointer disabled:opacity-50">
                                {saving ? "Saving..." : "Save Changes"}
                             </button>
                        </div>
                    </form>
                </div>
            )}
          </main>
        </div>

        {/* Order Details Modal */}
        {showOrderModal && selectedOrder && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
                <div className="bg-white rounded-[40px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
                    <button onClick={() => setShowOrderModal(false)} className="absolute top-6 right-6 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-primary transition-colors z-10">✕</button>
                    
                    <div className="p-10">
                        <div className="mb-10 border-b border-gray-100 pb-8">
                            <h2 className="text-2xl font-black text-[#111] uppercase tracking-tighter mb-2">Order Details</h2>
                            <p className="text-gray-400 font-bold uppercase text-[11px] tracking-widest">#{selectedOrder.orderNumber} • {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                        </div>

                        <div className="space-y-6">
                            {selectedOrder.orderItems.map((item, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-black text-[#111]">{item.productName}</p>
                                        <p className="text-xs text-gray-400 font-bold">Qty: {item.quantity} × ৳{item.price}</p>
                                    </div>
                                    <p className="text-sm font-black text-[#111]">৳{item.price * item.quantity}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 pt-8 border-t border-gray-100 space-y-3">
                            <div className="flex justify-between text-sm font-bold text-gray-400 uppercase tracking-widest">
                                <span>Subtotal</span>
                                <span className="text-[#111]">৳ {selectedOrder.subtotal}</span>
                            </div>
                            <div className="flex justify-between text-sm font-bold text-gray-400 uppercase tracking-widest">
                                <span>Shipping</span>
                                <span className="text-[#111]">৳ {selectedOrder.shippingFee}</span>
                            </div>
                            {selectedOrder.discount > 0 && (
                                <div className="flex justify-between text-sm font-bold text-primary uppercase tracking-widest">
                                    <span>Discount</span>
                                    <span>- ৳ {selectedOrder.discount}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-lg font-black text-[#111] uppercase tracking-tight pt-4">
                                <span>Total</span>
                                <span className="text-[var(--color-primary)]">৳ {selectedOrder.totalAmount}</span>
                            </div>
                        </div>

                        <div className="mt-10 grid grid-cols-2 gap-6 bg-gray-50 rounded-3xl p-8">
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Status</p>
                                <span className="px-3 py-1 bg-white rounded-full text-[10px] font-black uppercase text-[var(--color-primary)] shadow-sm border border-black/5">{selectedOrder.status}</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Payment</p>
                                <p className="text-[11px] font-black uppercase text-[#111]">{selectedOrder.paymentMethod}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Address Edit Modal */}
        {showAddressModal && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
                <div className="bg-white rounded-[40px] w-full max-w-lg shadow-2xl relative overflow-hidden">
                    <div className="p-10">
                        <h2 className="text-2xl font-black text-[#111] uppercase tracking-tighter mb-8 border-b border-gray-50 pb-6">Update Shipping Address</h2>
                        <form onSubmit={handleAddressUpdate} className="space-y-6">
                            <div>
                                <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Full Address</label>
                                <textarea name="address" required defaultValue={user?.address} rows="3" className="w-full p-6 border border-gray-100 rounded-xl bg-gray-50/30 outline-none focus:border-[var(--color-primary)]/30 focus:bg-white transition-all font-medium text-sm" placeholder="House/Street details..."></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">District</label>
                                    <input name="district" required defaultValue={user?.district} className="w-full h-[54px] px-6 border border-gray-100 rounded-xl bg-gray-50/30 outline-none focus:border-[var(--color-primary)]/30 focus:bg-white transition-all font-medium text-sm" />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">City</label>
                                    <input name="city" required defaultValue={user?.city} className="w-full h-[54px] px-6 border border-gray-100 rounded-xl bg-gray-50/30 outline-none focus:border-[var(--color-primary)]/30 focus:bg-white transition-all font-medium text-sm" />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-6">
                                <button type="button" onClick={() => setShowAddressModal(false)} className="flex-1 h-14 bg-gray-50 text-gray-400 font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-gray-100 transition-all">Cancel</button>
                                <button type="submit" disabled={saving} className="flex-1 h-14 bg-[var(--color-primary)] text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-[#e64462] transition-all shadow-lg shadow-[var(--color-primary)]/20">
                                    {saving ? "Saving..." : "Update"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )}

        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
                <div className="bg-white rounded-[32px] p-10 max-w-sm w-full shadow-2xl border border-white/20 animate-scaleUp">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-primary-light text-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                        </div>
                        <h3 className="text-2xl font-black text-[#111] uppercase italic tracking-tighter">Logging Out?</h3>
                        <p className="mt-2 text-sm font-medium text-gray-400">See you again soon for more beauty finds!</p>
                    </div>
                    <div className="mt-10 flex flex-col gap-3">
                        <button 
                            onClick={() => signOut({ callbackUrl: '/auth/login' })}
                            className="w-full h-14 bg-[var(--color-primary)] text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-[#e64462] transition-all shadow-lg shadow-[var(--color-primary)]/20 active:scale-95"
                        >
                            Yes, Logout
                        </button>
                        <button 
                            onClick={() => setShowLogoutModal(false)}
                            className="w-full h-14 bg-gray-50 text-gray-400 font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-gray-100 hover:text-[#111] transition-all active:scale-95"
                        >
                            Stay Here
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default MyAccount;

"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [mounted, setMounted] = useState(false);
  
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [updating, setUpdating] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({
    show: false,
    title: '',
    message: '',
    onConfirm: null,
    type: 'danger' // 'danger' or 'warning'
  });

  useEffect(() => {
    setMounted(true);
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/customers');
      if (res.ok) {
        setCustomers(await res.json());
      } else {
        toast.error("Failed to fetch customers");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    
    setConfirmConfig({
        show: true,
        title: `${newStatus === 'suspended' ? 'Suspend' : 'Activate'} Customer`,
        message: `Are you sure you want to ${newStatus === 'suspended' ? 'suspend' : 'reactivate'} this customer? ${newStatus === 'suspended' ? 'They will no longer be able to login.' : ''}`,
        type: newStatus === 'suspended' ? 'warning' : 'success',
        onConfirm: async () => {
            try {
                const res = await fetch(`/api/admin/customers/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: newStatus })
                });
                if (res.ok) {
                    toast.success(`Customer ${newStatus === 'suspended' ? 'suspended' : 'activated'}`);
                    fetchCustomers();
                } else {
                    const err = await res.json();
                    toast.error(err.error || "Update failed");
                }
            } catch (error) {
                toast.error("Network error");
            }
        }
    });
  };

  const handleDelete = async (id) => {
    setConfirmConfig({
        show: true,
        title: "Delete Customer",
        message: "Are you sure you want to delete this customer? This action cannot be undone and will remove all their purchase history.",
        type: 'danger',
        onConfirm: async () => {
            try {
                const res = await fetch(`/api/admin/customers/${id}`, { method: 'DELETE' });
                if (res.ok) {
                    toast.success("Customer deleted");
                    fetchCustomers();
                } else {
                    const err = await res.json();
                    toast.error(err.error || "Delete failed");
                }
            } catch (error) {
                toast.error("Network error");
            }
        }
    });
  };

  const handlePasswordChange = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/customers/${selectedCustomer.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword })
      });
      if (res.ok) {
        toast.success("Password updated successfully");
        setShowPasswordModal(false);
        setNewPassword('');
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to update password");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setUpdating(false);
    }
  };

  const viewDetails = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/customers/${id}`);
      if (res.ok) {
        setSelectedCustomer(await res.json());
        setShowDetailsModal(true);
      } else {
        toast.error("Failed to load details");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter(c => 
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone?.includes(searchTerm)
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#111] uppercase tracking-tighter">Customer Directory</h1>
          <p className="text-gray-400 font-medium">Manage your customer relationships and view purchase history.</p>
        </div>
        <div className="w-full md:w-[350px]">
          <div className="relative">
             <input 
                type="text" 
                placeholder="Search by name, email or phone..." 
                className="w-full h-12 pl-12 pr-4 bg-white border border-black/5 rounded-xl outline-none focus:border-primary/30 transition-all text-sm font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
             />
             <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr className="text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                <th className="px-8 py-6">Customer</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6">Orders</th>
                <th className="px-8 py-6">Total Spent</th>
                <th className="px-8 py-6">Location</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading && customers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-8 py-20 text-center text-gray-400 font-bold uppercase text-xs">Loading customers...</td>
                </tr>
              ) : filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/20 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-primary-soft text-primary flex items-center justify-center font-black text-xs uppercase">
                          {c.name?.charAt(0)}
                       </div>
                       <div>
                          <p className="font-black text-[#111] group-hover:text-primary transition-colors">{c.name}</p>
                          <p className="text-[11px] text-gray-400 font-medium lowercase">{c.email}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                     <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase ${
                        c.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                     }`}>
                        {c.status}
                     </span>
                  </td>
                  <td className="px-8 py-6 text-sm font-black text-[#111]">{c.orderCount} Orders</td>
                  <td className="px-8 py-6 text-sm font-black text-primary">৳ {c.totalSpent.toLocaleString()}</td>
                  <td className="px-8 py-6 text-sm text-gray-500 font-bold">{c.city}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                          onClick={() => viewDetails(c.id)}
                          className="p-2 hover:bg-primary-soft rounded-lg text-gray-400 hover:text-primary transition-all cursor-pointer"
                          title="View Details"
                       >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                       </button>
                       <button 
                          onClick={() => { setSelectedCustomer(c); setShowPasswordModal(true); }}
                          className="p-2 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-500 transition-all cursor-pointer"
                          title="Change Password"
                       >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
                       </button>
                       <button 
                          onClick={() => handleStatusChange(c.id, c.status)}
                          className={`p-2 rounded-lg transition-all cursor-pointer ${
                            c.status === 'active' ? 'hover:bg-orange-50 text-gray-400 hover:text-orange-500' : 'hover:bg-green-50 text-gray-400 hover:text-green-500'
                          }`}
                          title={c.status === 'active' ? 'Suspend Account' : 'Reactivate Account'}
                       >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"/></svg>
                       </button>
                       <button 
                          onClick={() => handleDelete(c.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                          title="Delete Customer"
                       >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!loading && filteredCustomers.length === 0 && (
                <tr>
                   <td colSpan="6" className="px-8 py-20 text-center text-gray-400 font-bold uppercase text-xs">No customers found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>      {/* Customer Details Modal */}
      {mounted && showDetailsModal && selectedCustomer && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-[40px] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col relative">
            <button onClick={() => setShowDetailsModal(false)} className="absolute top-6 right-6 w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-primary transition-all z-10">✕</button>
            
            <div className="p-10 border-b border-gray-50 flex items-center gap-8 bg-gray-50/30">
               <div className="w-24 h-24 rounded-[32px] bg-primary text-white flex items-center justify-center font-black text-3xl shadow-xl shadow-primary/20">
                  {selectedCustomer.name?.charAt(0)}
               </div>
               <div className="flex-1">
                  <h2 className="text-3xl font-black text-[#111] uppercase tracking-tighter mb-2">{selectedCustomer.name}</h2>
                  <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-400">
                     <span className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z"/></svg> {selectedCustomer.email}</span>
                     <span className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg> {selectedCustomer.phone || 'N/A'}</span>
                     <span className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg> {selectedCustomer.address}, {selectedCustomer.city}</span>
                  </div>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10">
               <h3 className="text-xl font-black text-[#111] uppercase tracking-tighter mb-8 flex items-center gap-3">
                  Purchase History
                  <span className="px-3 py-1 bg-gray-100 text-[11px] rounded-lg text-gray-500">{selectedCustomer.orders?.length || 0} Orders</span>
               </h3>

               <div className="space-y-6">
                  {selectedCustomer.orders?.length === 0 ? (
                    <div className="py-20 text-center bg-gray-50 rounded-3xl">
                       <p className="text-gray-400 font-bold uppercase text-xs">No orders placed by this customer yet.</p>
                    </div>
                  ) : selectedCustomer.orders.map((order) => (
                    <div key={order.id} className="bg-white border border-black/5 rounded-3xl p-6 hover:shadow-lg hover:shadow-black/5 transition-all">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                             <p className="text-sm font-black text-[#111]">#{order.orderNumber}</p>
                             <p className="text-[11px] text-gray-400 font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="text-right">
                             <p className="text-lg font-black text-primary">৳ {order.totalAmount.toLocaleString()}</p>
                             <span className="text-[9px] font-black uppercase text-gray-400">{order.status}</span>
                          </div>
                       </div>
                       <div className="flex flex-wrap gap-2">
                          {order.orderItems.map((item, j) => (
                             <span key={j} className="px-3 py-1 bg-gray-50 rounded-lg text-[10px] font-bold text-gray-500 border border-gray-100">
                                {item.productName} × {item.quantity}
                             </span>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Password Reset Modal */}
      {mounted && showPasswordModal && selectedCustomer && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-[32px] p-10 max-w-sm w-full shadow-2xl relative overflow-hidden">
            <div className="text-center mb-8">
               <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
               </div>
               <h3 className="text-2xl font-black text-[#111] uppercase tracking-tighter">Reset Password</h3>
               <p className="text-sm font-medium text-gray-400 mt-2">Setting new password for {selectedCustomer.name}</p>
            </div>
            
            <div className="space-y-6">
               <div>
                  <label className="block text-[11px] font-black uppercase text-gray-400 mb-2">New Password</label>
                  <input 
                    type="password" 
                    className="w-full h-14 px-6 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-blue-500/30 transition-all font-bold text-sm"
                    placeholder="Min 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
               </div>
               <div className="flex flex-col gap-3">
                  <button 
                    onClick={handlePasswordChange}
                    disabled={updating}
                    className="w-full h-14 bg-blue-500 text-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                  >
                    {updating ? 'Updating...' : 'Update Password'}
                  </button>
                  <button 
                    onClick={() => { setShowPasswordModal(false); setNewPassword(''); }}
                    className="w-full h-14 bg-gray-50 text-gray-400 font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-gray-100 hover:text-[#111] transition-all"
                  >
                    Cancel
                  </button>
               </div>
            </div>
          </div>
        </div>,
        document.body
      )}
      {/* Global Confirmation Modal */}
      {mounted && confirmConfig.show && createPortal(
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-[32px] p-10 max-w-sm w-full shadow-2xl relative overflow-hidden animate-scaleUp">
            <div className="text-center mb-8">
               <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                  confirmConfig.type === 'danger' ? 'bg-red-50 text-red-500' : 
                  confirmConfig.type === 'warning' ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-500'
               }`}>
                  {confirmConfig.type === 'danger' ? (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  ) : (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                  )}
               </div>
               <h3 className="text-2xl font-black text-[#111] uppercase tracking-tighter">{confirmConfig.title}</h3>
               <p className="text-sm font-medium text-gray-400 mt-2">{confirmConfig.message}</p>
            </div>
            
            <div className="flex flex-col gap-3">
               <button 
                 onClick={() => { confirmConfig.onConfirm(); setConfirmConfig({ ...confirmConfig, show: false }); }}
                 className={`w-full h-14 text-white font-black uppercase text-xs tracking-widest rounded-2xl transition-all shadow-lg active:scale-95 ${
                    confirmConfig.type === 'danger' ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 
                    confirmConfig.type === 'warning' ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/20' : 'bg-green-500 hover:bg-green-600 shadow-green-500/20'
                 }`}
               >
                 Confirm
               </button>
               <button 
                 onClick={() => setConfirmConfig({ ...confirmConfig, show: false })}
                 className="w-full h-14 bg-gray-50 text-gray-400 font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-gray-100 hover:text-[#111] transition-all active:scale-95"
               >
                 Cancel
               </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default AdminCustomers;

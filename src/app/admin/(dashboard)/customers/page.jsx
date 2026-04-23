"use client";

import React from 'react';

const AdminCustomers = () => {
  const customers = [
    { id: 1, name: 'Amik Hasan', email: 'amik72@gmail.com', orders: 12, spent: '৳ 24,500', city: 'Bandarban' },
    { id: 2, name: 'Sarah Khan', email: 'sarah.k@yahoo.com', orders: 5, spent: '৳ 8,200', city: 'Dhaka' },
    { id: 3, name: 'Rahat Ahmed', email: 'rahat.ah@gmail.com', orders: 2, spent: '৳ 1,600', city: 'Ghazipur' },
    { id: 4, name: 'Mimi Roy', email: 'mimi.beauty@gmail.com', orders: 24, spent: '৳ 45,000', city: 'Mymensingh' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#111] uppercase tracking-tighter">Customer Directory</h1>
          <p className="text-gray-400 font-medium">Manage your customer relationships and view purchase history.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr className="text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                <th className="px-8 py-6">Customer</th>
                <th className="px-8 py-6">Email</th>
                <th className="px-8 py-6">Orders</th>
                <th className="px-8 py-6">Total Spent</th>
                <th className="px-8 py-6">Location</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/20 transition-all">
                  <td className="px-8 py-6 font-black text-[#111]">{c.name}</td>
                  <td className="px-8 py-6 text-sm text-gray-400 font-medium lowercase">{c.email}</td>
                  <td className="px-8 py-6 text-sm font-black text-[#111]">{c.orders} Orders</td>
                  <td className="px-8 py-6 text-sm font-black text-primary">{c.spent}</td>
                  <td className="px-8 py-6 text-sm text-gray-500 font-bold">{c.city}</td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-[#111] transition-all cursor-pointer">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;

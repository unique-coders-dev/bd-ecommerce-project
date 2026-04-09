"use client";

import React from 'react';

const AdminPromotions = () => {
  const coupons = [
    { id: 1, code: 'EID2026', discount: '15% Off', usage: '450/1000', expiry: 'May 30, 2026', status: 'Active' },
    { id: 2, code: 'FREESHIP', discount: 'Free Shipping', usage: '1,240/∞', expiry: 'Ongoing', status: 'Active' },
    { id: 3, code: 'NEWUSER', discount: '৳ 200 Off', usage: '890/∞', expiry: 'Ongoing', status: 'Active' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#111] uppercase tracking-tighter">Promotions & Coupons</h1>
          <p className="text-gray-400 font-medium">Manage discount codes, festive offers, and loyalty rewards.</p>
        </div>
        <button className="px-6 py-3 bg-[#FF4D6D] text-white font-black uppercase text-[11px] tracking-widest rounded-xl hover:bg-[#e64462] transition-all shadow-xl shadow-[#FF4D6D]/20 cursor-pointer">Create Coupon</button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr className="text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                <th className="px-8 py-6">Coupon Details</th>
                <th className="px-8 py-6">Usage</th>
                <th className="px-8 py-6">Expiry</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/20 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-[#FF4D6D] uppercase tracking-[2px]">{c.code}</span>
                      <span className="text-[12px] font-bold text-gray-400">{c.discount}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-black text-[#111]">{c.usage}</td>
                  <td className="px-8 py-6 text-sm text-gray-500 font-bold">{c.expiry}</td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-lg">{c.status}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-[#FF4D6D] font-black text-[11px] uppercase tracking-widest border-2 border-[#FF4D6D] px-4 py-2 rounded-lg hover:bg-[#FF4D6D] hover:text-white transition-all cursor-pointer">Edit Coupon</button>
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

export default AdminPromotions;

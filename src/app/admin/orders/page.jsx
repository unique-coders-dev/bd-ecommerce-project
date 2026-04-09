"use client";

import React from 'react';

const AdminOrders = () => {
  const orders = [
    { id: '#53848', customer: 'Amik Hasan', date: 'April 8, 2026', total: '৳ 1,200', status: 'Processing', method: 'Cash on delivery' },
    { id: '#53847', customer: 'Sarah Khan', date: 'April 8, 2026', total: '৳ 4,500', status: 'Shipped', method: 'bKash' },
    { id: '#53846', customer: 'Rahat Ahmed', date: 'April 7, 2026', total: '৳ 800', status: 'Pending', method: 'Cash on delivery' },
    { id: '#53845', customer: 'Mimi Roy', date: 'April 7, 2026', total: '৳ 2,300', status: 'Completed', method: 'Nagad' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#111] uppercase tracking-tighter">Orders Management</h1>
          <p className="text-gray-400 font-medium">Track and process all incoming store orders.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr className="text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                <th className="px-8 py-6">Order ID</th>
                <th className="px-8 py-6">Customer</th>
                <th className="px-8 py-6">Date</th>
                <th className="px-8 py-6">Total</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order, i) => (
                <tr key={i} className="hover:bg-gray-50/20 transition-all">
                  <td className="px-8 py-6 font-black text-[#111]">{order.id}</td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-[#111]">{order.customer}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase">{order.method}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-gray-500 font-medium">{order.date}</td>
                  <td className="px-8 py-6 text-sm font-black text-[#111]">{order.total}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-600' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-600' :
                      order.status === 'Processing' ? 'bg-orange-100 text-orange-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-[#FF4D6D] font-black text-[11px] uppercase tracking-widest border-2 border-[#FF4D6D] px-4 py-2 rounded-lg hover:bg-[#FF4D6D] hover:text-white transition-all cursor-pointer">Manage</button>
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

export default AdminOrders;

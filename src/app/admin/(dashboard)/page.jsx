"use client";

import React from 'react';

const AdminOverview = () => {
  const stats = [
    { label: 'Total Revenue', value: '৳ 12,45,600', trend: '+12.5%', color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'New Orders', value: '1,240', trend: '+8.2%', color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Total Customers', value: '8,420', trend: '+5.1%', color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Conversion Rate', value: '3.2%', trend: '-0.4%', color: 'text-primary', bg: 'bg-primary-soft' },
  ];

  const recentOrders = [
    { id: '#53848', customer: 'Amik Hasan', status: 'Processing', total: '৳ 1,200', date: '2 min ago' },
    { id: '#53847', customer: 'Sarah Khan', status: 'Shipped', total: '৳ 4,500', date: '15 min ago' },
    { id: '#53846', customer: 'Rahat Ahmed', status: 'Pending', total: '৳ 800', date: '1 hour ago' },
    { id: '#53845', customer: 'Mimi Roy', status: 'Completed', total: '৳ 2,300', date: '3 hours ago' },
  ];

  return (
    <div className="space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110"></div>
         <div className="relative z-10">
            <h1 className="text-2xl lg:text-3xl font-black text-[#111] leading-tight">Good Morning, Admin! 👋</h1>
            <p className="text-gray-400 font-medium mt-1">Here's what's happening with your store today.</p>
         </div>
         <div className="flex gap-3 relative z-10">
            <button className="px-6 py-3 bg-white border-2 border-gray-100 text-[#111] font-black uppercase text-[11px] tracking-widest rounded-xl hover:bg-gray-50 transition-all cursor-pointer">Export Report</button>
            <button className="px-6 py-3 bg-[#111] text-white font-black uppercase text-[11px] tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-black/10 cursor-pointer">Add New Product</button>
         </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 flex flex-col gap-4 group hover:border-primary/10 transition-all">
                <div className="flex justify-between items-start">
                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">{stat.label}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${stat.bg} ${stat.color}`}>{stat.trend}</span>
                </div>
                <div className="flex items-end gap-2">
                    <span className="text-2xl font-black text-[#111]">{stat.value}</span>
                </div>
                <div className="w-full h-1.5 bg-gray-50 rounded-full overflow-hidden">
                    <div className={`h-full ${stat.color.replace('text', 'bg')} opacity-40`} style={{ width: '65%' }}></div>
                </div>
            </div>
         ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Sales Chart Mockup */}
          <div className="xl:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-black/5">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-black text-[#111] uppercase tracking-tighter">Revenue Growth</h3>
                <div className="flex gap-2">
                    <button className="px-3 py-1 text-[10px] font-black uppercase bg-gray-50 text-gray-400 rounded-lg underline-offset-4 decoration-primary">Weekly</button>
                    <button className="px-3 py-1 text-[10px] font-black uppercase text-gray-400 hover:text-[#111] rounded-lg">Monthly</button>
                </div>
             </div>
             {/* Mock Chart Visualization */}
             <div className="h-[300px] w-full flex items-end gap-2 px-4 border-b border-l border-gray-100 relative">
                {[45, 60, 40, 85, 55, 90, 70].map((h, i) => (
                    <div key={i} className="flex-1 bg-primary/10 hover:bg-primary transition-all rounded-t-lg relative group" style={{ height: `${h}%` }}>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#111] text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">৳ {h * 1000}</div>
                    </div>
                ))}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 pr-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="w-full border-t border-dashed border-primary"></div>)}
                </div>
             </div>
             <div className="flex justify-between mt-4 px-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <span key={day} className="text-[10px] font-black text-gray-300 uppercase">{day}</span>
                ))}
             </div>
          </div>

          {/* Recent Orders List */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-black/5 flex flex-col">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-black text-[#111] uppercase tracking-tighter">Recent Sales</h3>
                <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline cursor-pointer">View All</button>
             </div>
             <div className="space-y-6 flex-1">
                {recentOrders.map((order, i) => (
                    <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center font-black text-[10px] text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                {order.customer[0]}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-[#111]">{order.customer}</span>
                                <span className="text-[10px] text-gray-400 font-bold uppercase">{order.id} • {order.date}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-black text-[#111]">{order.total}</div>
                            <div className={`text-[9px] font-black uppercase tracking-widest ${
                                order.status === 'Processing' ? 'text-orange-400' : 'text-green-500'
                            }`}>{order.status}</div>
                        </div>
                    </div>
                ))}
             </div>
             <div className="mt-8 pt-8 border-t border-gray-50 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <span className="text-[11px] font-black text-gray-400 tracking-widest uppercase">Target Achieved</span>
                    <span className="text-sm font-black text-[#111]">82%</span>
                </div>
                <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-[#ff7d94]" style={{ width: '82%' }}></div>
                </div>
             </div>
          </div>

      </div>

    </div>
  );
};

export default AdminOverview;

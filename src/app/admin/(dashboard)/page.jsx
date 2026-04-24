"use client";

import React, { useState, useEffect } from 'react';

const AdminOverview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('weekly');

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/overview?filter=${filter}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filter]);

  if (loading && !data) return (
    <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );

  const stats = [
    { label: 'Total Revenue', value: `৳ ${(data?.stats?.totalRevenue || 0).toLocaleString()}`, trend: '+12.5%', color: 'text-green-500', bg: 'bg-green-50' },
    { label: 'Pending Orders', value: (data?.stats?.pendingOrders || 0).toLocaleString(), trend: 'ACTION REQ', color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Active Customers', value: (data?.stats?.activeCustomers || 0).toLocaleString(), trend: 'PERIOD', color: 'text-purple-500', bg: 'bg-purple-50' },
    { label: 'Total Customers', value: (data?.stats?.totalCustomers || 0).toLocaleString(), trend: 'LIFETIME', color: 'text-primary', bg: 'bg-primary-soft' },
  ];

  return (
    <div className="space-y-10">
      
      {/* Welcome Banner */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110"></div>
         <div className="relative z-10">
            <h1 className="text-2xl lg:text-3xl font-black text-[#111] leading-tight">Good Morning, Admin! 👋</h1>
            <p className="text-gray-400 font-medium mt-1">Here's what's happening with your store {filter === 'daily' ? 'today' : filter === 'weekly' ? 'this week' : 'this month'}.</p>
         </div>
         <div className="flex bg-gray-100 p-1 rounded-2xl relative z-10">
            {['daily', 'weekly', 'monthly'].map((f) => (
                <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        filter === f ? 'bg-white text-[#111] shadow-sm' : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                    {f}
                </button>
            ))}
         </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((stat, i) => (
            <div key={i} className={`bg-white p-6 rounded-2xl shadow-sm border border-black/5 flex flex-col gap-4 group hover:border-primary/10 transition-all ${loading ? 'opacity-50' : ''}`}>
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
          
          {/* Sales Chart */}
          <div className="xl:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-black/5">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-black text-[#111] uppercase tracking-tighter">Revenue Growth ({filter})</h3>
                <div className="flex gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest">
                    Live Insights
                </div>
             </div>
             <div className="h-[300px] w-full flex items-end gap-2 px-4 border-b border-l border-gray-100 relative">
                {data?.chartData?.map((item, i) => {
                    const maxAmount = Math.max(...data.chartData.map(d => d.amount), 1);
                    const h = (item.amount / maxAmount) * 100;
                    return (
                        <div key={i} className="flex-1 bg-primary/10 hover:bg-primary transition-all rounded-t-lg relative group" style={{ height: `${Math.max(h, 5)}%` }}>
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#111] text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold whitespace-nowrap z-20">৳ {item.amount.toLocaleString()}</div>
                        </div>
                    );
                })}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 pr-4">
                    {[1, 2, 3, 4].map(i => <div key={i} className="w-full border-t border-dashed border-primary"></div>)}
                </div>
             </div>
             <div className="flex justify-between mt-4 px-4 overflow-x-auto no-scrollbar gap-4">
                {data?.chartData?.map(item => (
                    <span key={item.fullDate} className="text-[9px] font-black text-gray-300 uppercase whitespace-nowrap">{item.day}</span>
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
                {data?.recentOrders?.map((order, i) => (
                    <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center font-black text-[10px] text-gray-400 group-hover:bg-primary/10 group-hover:text-primary transition-all uppercase">
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
                                order.status === 'pending' ? 'text-orange-400' : 'text-green-500'
                            }`}>{order.status}</div>
                        </div>
                    </div>
                ))}
                {data?.recentOrders?.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-300">
                        <svg className="w-12 h-12 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                        <p className="text-[10px] font-black uppercase">No recent sales</p>
                    </div>
                )}
             </div>
             
             {/* Target block removed as requested */}
          </div>

      </div>

    </div>
  );
};

export default AdminOverview;

"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    { id: 21656, name: "Dabo Make Up Dark Out Tone Up Primer 30 ml", brand: "Dabo", price: "৳ 1,050", stock: 45, category: "Primer", sku: "8809173347077", image: "https://kcbazar.com/wp-content/uploads/2024/05/Dabo-Make-Up-Dark-Out-Tone-Up-Primer-30-ml-5.jpg" },
    { id: 12565, name: "Missha Magic Cushion Cover Lasting 15 g - N.23", brand: "Missha", price: "৳ 1,068", stock: 12, category: "Makeup", sku: "8809747960910", image: "https://kcbazar.com/wp-content/uploads/2023/10/Missha-Magic-Cushion-Cover-Lasting-n_23-15-g2-1-1024x1024.png" },
    { id: 53842, name: "Anua Heartleaf 77% Soothing Toner 250ml", brand: "Anua", price: "৳ 2,200", stock: 8, category: "Skincare", sku: "8809679092130", image: "https://kcbazar.com/wp-content/uploads/2023/12/Nature-Skin-Jeju-Green-Tea-CICA-Hydrating-Facial-Foam-152-ml-300x300.jpg" },
  ];

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
         <div>
            <h1 className="text-2xl lg:text-4xl font-black text-[#111] uppercase tracking-tighter">Product Inventory</h1>
            <p className="text-gray-400 font-medium">Manage and monitor all your physical stock in one place.</p>
         </div>
         <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-3 bg-white border-2 border-gray-100 text-[#111] font-black uppercase text-[11px] tracking-widest rounded-xl hover:bg-gray-50 transition-all cursor-pointer">Export CSV</button>
            <button className="flex-1 md:flex-none px-6 py-3 bg-[#FF4D6D] text-white font-black uppercase text-[11px] tracking-widest rounded-xl hover:bg-[#e64462] transition-all shadow-xl shadow-[#FF4D6D]/20 flex items-center justify-center gap-2 cursor-pointer">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M12 4v16m8-8H4"/></svg>
                Add Product
            </button>
         </div>
      </div>

      {/* Stats Quick View */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
         {[
           { label: "Total Products", value: "1,245", color: "text-blue-500" },
           { label: "Low Stock", value: "24 Items", color: "text-orange-500" },
           { label: "Out of Stock", value: "12 Items", color: "text-red-500" },
         ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 flex items-center gap-5">
                <div className={`w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center ${stat.color}`}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
                </div>
                <div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</span>
                   <div className="text-xl font-black text-[#111]">{stat.value}</div>
                </div>
            </div>
         ))}
      </div>

      {/* Action Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-black/5 flex flex-col md:flex-row gap-4 items-center">
         <div className="flex-1 relative w-full">
            <input 
                type="text" 
                placeholder="Search products by name, brand, or SKU..." 
                className="w-full h-12 pl-12 pr-6 bg-gray-50/50 border border-gray-100 rounded-xl outline-none focus:border-[#FF4D6D]/30 focus:bg-white transition-all text-sm font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M21 21l-4.35-4.35M19 11a8 8 0 11-16 0 8 8 0 0116 0z"/></svg>
         </div>
         <div className="flex gap-2 w-full md:w-auto">
            <select className="h-12 px-6 bg-gray-50/50 border border-gray-100 rounded-xl text-[11px] font-black uppercase tracking-widest text-gray-500 outline-none cursor-pointer">
                <option>Category: All</option>
                <option>Skincare</option>
                <option>Makeup</option>
            </select>
            <select className="h-12 px-6 bg-gray-50/50 border border-gray-100 rounded-xl text-[11px] font-black uppercase tracking-widest text-gray-500 outline-none cursor-pointer">
                <option>Status: All</option>
                <option>In Stock</option>
                <option>Out of Stock</option>
            </select>
         </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50/50">
                    <tr className="text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                        <th className="px-8 py-6">Product Info</th>
                        <th className="px-8 py-6">Category</th>
                        <th className="px-8 py-6">Price</th>
                        <th className="px-8 py-6">Stock</th>
                        <th className="px-8 py-6">SKU</th>
                        <th className="px-8 py-6 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {products.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50/20 transition-all group">
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl border border-gray-100 p-1 bg-white shrink-0 group-hover:scale-110 transition-transform">
                                        <img src={p.image} className="w-full h-full object-contain" alt="p" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-[#111] line-clamp-1">{p.name}</span>
                                        <span className="text-[10px] font-black uppercase text-[#FF4D6D] tracking-widest">{p.brand}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <span className="px-3 py-1 bg-gray-100 text-[#111] text-[10px] font-black uppercase tracking-widest rounded-lg">{p.category}</span>
                            </td>
                            <td className="px-8 py-6 text-sm font-black text-[#111]">{p.price}</td>
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${p.stock < 10 ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                                    <span className="text-sm font-bold text-gray-500">{p.stock} Units</span>
                                </div>
                            </td>
                            <td className="px-8 py-6 text-[12px] font-bold text-gray-400 font-mono">{p.sku}</td>
                            <td className="px-8 py-6 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button className="p-2 hover:bg-[#FF4D6D]/10 text-gray-300 hover:text-[#FF4D6D] rounded-lg transition-all cursor-pointer"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
                                    <button className="p-2 hover:bg-black/5 text-gray-300 hover:text-black rounded-lg transition-all cursor-pointer"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg></button>
                                    <button className="p-2 hover:bg-red-50 text-gray-300 hover:text-red-500 rounded-lg transition-all cursor-pointer"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
         {/* Simple Pagination */}
         <div className="p-8 border-t border-gray-50 flex items-center justify-between">
            <span className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Showing 1-3 of 1,245 products</span>
            <div className="flex gap-2">
                <button className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-gray-300 hover:border-[#FF4D6D] hover:text-[#FF4D6D] transition-all cursor-pointer disabled:opacity-30" disabled>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M15 19l-7-7 7-7"/></svg>
                </button>
                <div className="w-8 h-8 rounded-lg bg-[#FF4D6D] text-white flex items-center justify-center text-[11px] font-black">1</div>
                <div className="w-8 h-8 rounded-lg hover:bg-gray-50 flex items-center justify-center text-[11px] font-black text-gray-400 cursor-pointer">2</div>
                <button className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-gray-300 hover:border-[#FF4D6D] hover:text-[#FF4D6D] transition-all cursor-pointer">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M9 5l7 7-7 7"/></svg>
                </button>
            </div>
         </div>
      </div>

    </div>
  );
};

export default AdminProducts;

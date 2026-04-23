import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ClearancePage() {
  // Fetch clearance banners
  const banners = await prisma.banner.findMany({
    where: { 
        isActive: true,
        OR: [
            { position: 'clearance' },
            { position: 'Clearance' }
        ]
    },
    orderBy: { order: 'asc' },
  });

  // Fetch products marked as clearance or with sale prices
  const products = await prisma.product.findMany({
    where: { 
        isActive: true,
        OR: [
            { isClearance: true },
            { salePrice: { not: null } }
        ]
    },
    orderBy: [
        { isClearance: 'desc' },
        { createdAt: 'desc' }
    ],
    take: 40
  });

  return (
    <div className="max-w-[1320px] mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-4 border-[#111] pb-8">
        <div>
           <div className="inline-block bg-primary text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full mb-4 animate-bounce">Final Call</div>
           <h1 className="text-6xl font-black text-[#111] uppercase italic tracking-tightest leading-[0.9]">Stock<br/>Clearance</h1>
        </div>
        <p className="max-w-md text-gray-400 font-bold uppercase text-[11px] leading-relaxed tracking-widest">
            Last chance to grab your favorites at unbeatable prices. Once they&apos;re gone, they&apos;re gone for good.
        </p>
      </div>

      {banners.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              {banners.map(banner => (
                <Link key={banner.id} href={banner.linkUrl || '#'} className="rounded-[40px] overflow-hidden shadow-2xl hover:brightness-110 transition-all aspect-[21/9]">
                    <img src={banner.imageUrl} alt="Clearance" className="w-full h-full object-cover" />
                </Link>
              ))}
          </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col">
            <div className="relative aspect-[4/5] rounded-[30px] overflow-hidden bg-gray-50 border border-gray-100 mb-5">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 p-4"
              />
              <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full shadow-lg">
                SAVE {product.discount || `${Math.round(((product.regularPrice - product.salePrice) / product.regularPrice) * 100)}%`}
              </div>
              <Link 
                href={`/product/${product.id}`}
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]"
              >
                  <span className="bg-white text-black font-black uppercase text-[10px] px-8 py-3 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Quick Shop</span>
              </Link>
            </div>
            <div className="px-2">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">{product.brand || 'Original'}</p>
                <Link href={`/product/${product.id}`} className="text-sm font-black text-[#111] hover:text-primary transition-colors block leading-tight mb-2 h-10 overflow-hidden line-clamp-2">
                    {product.name}
                </Link>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-primary">৳ {product.salePrice}</span>
                    <span className="text-xs font-bold text-gray-300 line-through">৳ {product.regularPrice}</span>
                </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="py-40 text-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
           <p className="text-gray-400 font-bold uppercase tracking-widest">No clearance items at the moment. Keep looking!</p>
        </div>
      )}
    </div>
  );
}

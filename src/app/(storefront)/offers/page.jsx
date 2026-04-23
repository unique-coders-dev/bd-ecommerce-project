import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function OffersPage() {
  const banners = await prisma.banner.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="max-w-[1320px] mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-[#111] uppercase italic tracking-tighter mb-4">Exclusive Offers</h1>
        <p className="text-gray-500 font-bold uppercase text-xs tracking-[0.2rem]">Handpicked savings and promotional events just for you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {banners.map((banner) => (
          <Link 
            key={banner.id} 
            href={banner.linkUrl || '#'} 
            className="group relative overflow-hidden rounded-[30px] shadow-sm hover:shadow-2xl transition-all duration-500 aspect-[21/9]"
          >
            <img 
              src={banner.imageUrl} 
              alt="Offer Banner" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <span className="bg-white text-black font-black uppercase text-[10px] px-6 py-2.5 rounded-full tracking-widest shadow-xl">Explore Offer</span>
            </div>
          </Link>
        ))}
      </div>

      {banners.length === 0 && (
        <div className="py-40 text-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
           <p className="text-gray-400 font-bold uppercase tracking-widest">No active offers at the moment. Check back soon!</p>
        </div>
      )}
    </div>
  );
}

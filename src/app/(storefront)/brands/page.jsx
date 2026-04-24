import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function BrandsPage() {
  const brands = await prisma.brand.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="max-w-[1320px] mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-[#111] uppercase italic tracking-tightest mb-4">Our Premium Brands</h1>
        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3rem]">Authorized distributor of the world&apos;s finest beauty labels.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <Link 
            key={brand.id} 
            href={`/shop?brand=${encodeURIComponent(brand.name)}`}
            className="group bg-white border border-gray-100 p-8 rounded-[40px] flex flex-col items-center justify-center hover:shadow-2xl hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 aspect-square"
          >
            <div className="w-full h-full relative flex items-center justify-center">
                <img 
                  src={brand.imageUrl} 
                  alt={brand.name} 
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 p-2"
                />
            </div>
            <span className="mt-4 text-[10px] font-black uppercase text-gray-300 group-hover:text-primary transition-colors tracking-widest">{brand.name}</span>
          </Link>
        ))}
      </div>

      {brands.length === 0 && (
        <div className="py-40 text-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
           <p className="text-gray-400 font-bold uppercase tracking-widest">Brand inventory is being updated.</p>
        </div>
      )}
    </div>
  );
}

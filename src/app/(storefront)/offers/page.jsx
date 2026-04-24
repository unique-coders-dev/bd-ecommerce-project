import React from 'react';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function OffersPage() {
  const [banners, slides] = await Promise.all([
    prisma.banner.findMany({
        where: { isActive: true },
        include: { products: { select: { id: true } } },
        orderBy: { order: 'asc' },
    }),
    prisma.heroSlide.findMany({
        where: { isActive: true },
        include: { products: { select: { id: true } } },
        orderBy: { order: 'asc' },
    })
  ]);

  const getAssetLink = (item) => {
    if (item.isAllProducts) return '/shop';
    if (item.products && item.products.length > 0) {
      if (item.products.length === 1) return `/product/${item.products[0].id}`;
      return `/collection/${item.id}`;
    }
    return item.linkUrl || '/';
  };

  // Find the primary impact banner (post-hero)
  const primaryImpactBanner = banners.find(b => b.position === 'hero-after');
  // Combine all other banners and slides for the grid
  const otherAssets = [
      ...slides,
      ...banners.filter(b => b.position !== 'hero-after')
  ].sort((a, b) => a.order - b.order);

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <div className="max-w-[1320px] mx-auto px-4 py-16">
        <div className="text-center mb-20">
          <div className="inline-block bg-primary/10 text-primary text-[10px] font-black uppercase px-6 py-2 rounded-full mb-6 tracking-[0.2em] animate-pulse">Special Promotions</div>
          <h1 className="text-6xl font-black text-[#111] uppercase tracking-tighter leading-none mb-6">Exclusive <span className="text-primary italic">Offers</span></h1>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.4rem] max-w-xl mx-auto leading-loose">
            Unlock premium savings across our entire collection of authentic Korean beauty labels.
          </p>
        </div>

        {/* Primary Impact Banner - Full Width */}
        {primaryImpactBanner && (
          <div className="mb-20">
             <Link 
                href={getAssetLink(primaryImpactBanner)}
                className="group relative block overflow-hidden rounded-[40px] shadow-2xl shadow-black/5 hover:shadow-primary/20 transition-all duration-700 aspect-[21/9] md:aspect-[25/7]"
              >
                <img 
                  src={primaryImpactBanner.imageUrl} 
                  alt="Primary Offer" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="bg-primary text-white font-black uppercase text-[12px] px-12 py-4 rounded-full tracking-[0.2em] shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                      Explore Collection
                    </span>
                </div>
              </Link>
          </div>
        )}

        {/* Assets Grid - 3x3 Style */}
        <div className="space-y-10">
          <h2 className="text-sm font-black uppercase tracking-widest text-gray-300 border-b border-gray-100 pb-4 mb-10">Strategic Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherAssets.map((asset) => (
              <Link 
                key={asset.id} 
                href={getAssetLink(asset)}
                className="group relative overflow-hidden rounded-[30px] shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700 aspect-[4/3]"
              >
                <img 
                  src={asset.imageUrl} 
                  alt="Offer Asset" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="bg-white text-primary font-black uppercase text-[10px] px-8 py-3.5 rounded-full tracking-widest shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                      View Details
                    </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {(banners.length === 0 && slides.length === 0) && (
          <div className="py-40 text-center bg-gray-50 rounded-[50px] border-2 border-dashed border-gray-200">
             <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-xs">Awaiting fresh seasonal campaigns</p>
          </div>
        )}
      </div>
    </div>
  );
}

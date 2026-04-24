import React from 'react';
import Link from 'next/link';
import ProductSlider from './ProductSlider';
import { HomeBanners } from './HomeBanners';
import CategorySlider from './CategorySlider';

import { prisma } from '@/lib/prisma';

const Products = async () => {
  const productsData = await prisma.product.findMany({
    where: { isActive: true },
    include: {
        reviews: {
            where: { status: 'approved' }
        }
    }
  });

  const featuredProduct = await prisma.product.findFirst({
    where: { isFeatured: true, isActive: true }
  });

  const getDiscountPercent = (p) => {
    if (p.discount) {
      const parsed = parseInt(p.discount);
      if (!isNaN(parsed)) return parsed;
    }
    if (p.salePrice && p.regularPrice && p.salePrice < p.regularPrice) {
      return ((p.regularPrice - p.salePrice) / p.regularPrice) * 100;
    }
    return 0;
  };

  const products = productsData.map(p => {
    const reviewCount = p.reviews.length;
    const avgRating = reviewCount > 0 
        ? p.reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviewCount 
        : 0;
    
    let activeSalePrice = p.salePrice;
    const computedDiscountPercent = getDiscountPercent(p);
    
    // If there's a discount but no salePrice, compute it automatically
    if (!activeSalePrice && computedDiscountPercent > 0) {
        activeSalePrice = Math.round(p.regularPrice * (1 - computedDiscountPercent / 100));
    }

    return {
      id: p.id,
      name: p.name,
      brand: p.brand || '',
      image: p.image,
      regularPrice: p.regularPrice,
      salePrice: activeSalePrice || p.regularPrice,
      discount: p.discount || '',
      link: `/product/${p.id}`,
      createdAt: p.createdAt,
      discountPercent: computedDiscountPercent,
      reviewsCount: reviewCount,
      avgRating: avgRating
    };
  });

  const bestSelling = [...products].sort((a, b) => b.reviewsCount - a.reviewsCount);
  const newestArrival = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const bestDeals = [...products].sort((a, b) => b.discountPercent - a.discountPercent);

  return (
    <div className="bg-white pb-10 kb-products-container">

      {/* ── Dynamic Top Categories Slider ── */}
      <CategorySlider />

      {/* ── Dynamic Promo Banners (Admin controlled) ── */}
      <HomeBanners position="post-category" limit={6} />

      {/* ── Bestselling Section (Slider) ── */}
      <ProductSlider title="Bestselling" products={bestSelling} viewAllLink="/shop/?orderby=popularity" />

      {/* ── Newest Arrivals Section (Slider) ── */}
      <ProductSlider title="Newest Arrival" products={newestArrival} viewAllLink="/shop/?orderby=date" />

      {/* ── Best Deals Section (Slider) ── */}
      <ProductSlider title="Best Deals" products={bestDeals} viewAllLink="/shop/?on_sale=true" />

      {featuredProduct && (
        <section className="py-8">
          <div className="max-w-[1320px] mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-8 bg-primary-light rounded-[32px] p-6 sm:p-12 shadow-sm border border-primary/10">
              <div className="overflow-hidden rounded-2xl shadow-xl aspect-square lg:aspect-auto bg-white flex items-center justify-center p-4">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-full max-h-[400px] object-contain hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex flex-col gap-5">
                <div className="w-12 h-1 bg-primary rounded-full mb-2"></div>
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full">Featured Product</span>
                    {featuredProduct.brand && <span className="text-[11px] font-black uppercase text-gray-400 tracking-widest">{featuredProduct.brand}</span>}
                </div>
                <h3 className="text-[32px] font-black text-[#111] uppercase tracking-tighter italic leading-none">{featuredProduct.name}</h3>
                <p className="text-[15px] text-gray-600 font-medium leading-relaxed max-w-[450px]">
                  {featuredProduct.shortBrief || (featuredProduct.description ? featuredProduct.description.substring(0, 160) + '...' : '')}
                </p>
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-primary">৳{featuredProduct.salePrice || featuredProduct.regularPrice}</span>
                    {featuredProduct.salePrice && (
                        <span className="text-lg text-gray-400 line-through font-bold">৳{featuredProduct.regularPrice}</span>
                    )}
                </div>
                <Link href={`/product/${featuredProduct.id}`} className="mt-4 flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-primary/20 group hover:bg-primary-soft hover:text-primary active:scale-95 transition-all w-fit">
                  Buy Now & Save
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default Products;

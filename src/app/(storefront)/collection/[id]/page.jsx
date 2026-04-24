import React from 'react';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function CollectionPage({ params }) {
  const { id } = await params;

  // Check both Banner and HeroSlide for this ID
  let asset = await prisma.banner.findUnique({
    where: { id },
    include: { products: { include: { reviews: { where: { status: 'approved' } } } } }
  });

  if (!asset) {
    asset = await prisma.heroSlide.findUnique({
        where: { id },
        include: { products: { include: { reviews: { where: { status: 'approved' } } } } }
    });
  }

  if (!asset || (!asset.products && !asset.isAllProducts)) {
    return (
        <div className="py-40 text-center">
            <h1 className="text-2xl font-black uppercase italic">Collection Not Found</h1>
            <Link href="/shop" className="text-primary font-bold mt-4 inline-block hover:underline">Back to Shop</Link>
        </div>
    );
  }

  const products = asset.products || [];

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
        <div className="max-w-[1320px] mx-auto px-4 py-16">
            <div className="mb-12">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase text-gray-400 tracking-widest mb-4">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-primary">Collection</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-black text-[#111] uppercase tracking-tighter italic">
                    Special <span className="text-primary">Collection</span>
                </h1>
                <p className="text-gray-400 font-medium mt-2">Discover handpicked items from our latest promotional campaign.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products.map((product) => {
                    // Map product to match ProductCard expectations if necessary
                    const avgRating = product.reviews.length > 0 
                        ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length 
                        : 0;
                    
                    const mappedProduct = {
                        ...product,
                        avgRating,
                        reviewCount: product.reviews.length
                    };

                    return <ProductCard key={product.id} product={mappedProduct} />;
                })}
            </div>

            {products.length === 0 && (
                <div className="py-40 text-center bg-white rounded-[40px] border border-gray-100 shadow-sm">
                    <p className="text-gray-400 font-bold uppercase tracking-widest">No products in this collection.</p>
                    <Link href="/shop" className="mt-6 inline-block px-8 py-3 bg-primary text-white font-black uppercase text-xs tracking-widest rounded-full">Explore Shop</Link>
                </div>
            )}
        </div>
    </div>
  );
}

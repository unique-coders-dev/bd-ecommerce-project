"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

const ProductSlider = ({ title, products, viewAllLink }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8">
      <div className="max-w-[1320px] mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[22px] font-bold text-[#111827]">{title}</h2>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button 
                onClick={() => scroll('left')}
                className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm"
                aria-label="Previous"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm"
                aria-label="Next"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
            <Link href={viewAllLink} className="text-sm font-semibold text-primary hover:underline hidden sm:block">
              View All →
            </Link>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="grid grid-flow-col auto-cols-[calc(50%-10px)] md:auto-cols-[calc(33.333%-13.333px)] lg:auto-cols-[calc(25%-15px)] gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        >
          {products.map((product) => (
            <div key={product.id} className="h-full">
              <Link href={product.link} className="bg-white border border-[#efefef] rounded-xl overflow-hidden transition-all duration-300 flex flex-col hover:-translate-y-1.5 hover:shadow-xl group relative h-full">
                  <div className="relative aspect-square bg-[#f9f9f9] overflow-hidden">
                    {product.discountPercent > 0 && (
                      <span className="absolute top-2.5 left-2.5 bg-primary-dark text-white text-[11px] font-bold px-2 py-1 rounded z-[2] shadow-sm">
                        {String(product.discount).includes('%') ? product.discount : `${product.discountPercent.toFixed(0)}% OFF`}
                      </span>
                    )}
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain p-2.5 transition-transform duration-700 group-hover:scale-110" />
                    
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="absolute bottom-0 left-0 w-full bg-primary text-white py-3 font-bold text-sm opacity-0 translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 z-[5] hover:bg-primary-soft hover:text-primary active:bg-primary-dark cursor-pointer"
                    >
                      Add to cart
                    </button>
 
                    <div className="absolute top-2.5 right-2.5 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2.5 transition-all duration-300 z-10">
                      <button 
                        onClick={(e) => handleAddToCart(e, product)}
                        className="w-9 h-9 rounded-full bg-white border border-[#eee] flex items-center justify-center text-[#333] transition-all hover:bg-primary-soft hover:text-primary shadow-md cursor-pointer"
                        aria-label="Add to cart"
                      >
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                <div className="p-4 flex flex-col gap-1.5 flex-grow">
                  <p className="text-[11px] text-[#999] font-bold uppercase">{product.brand}</p>
                  <h3 className="text-sm font-semibold text-[#333] h-10 overflow-hidden line-clamp-2 leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                  <div className="flex text-amber-400 text-[10px] items-center gap-1 my-0.5">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="10" height="10" fill={i < Math.round(product.avgRating || 0) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-300 font-bold">({product.reviewsCount || 0})</span>
                  </div>
                  <div className="flex gap-2 items-center mt-1">
                    {product.regularPrice > product.salePrice && product.discountPercent > 0 && (
                      <span className="text-[12px] text-[#bbb] line-through">৳ {product.regularPrice}</span>
                    )}
                    <span className="text-[16px] text-[var(--primary-color)] font-extrabold">৳ {product.salePrice}</span>
                  </div>
                  <p className="text-[11px] text-[#00A86B] font-bold mt-auto pt-2 border-t border-gray-50 uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#00A86B] rounded-full"></span> In stock
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;

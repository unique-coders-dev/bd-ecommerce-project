"use client";

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { id, name, brand, image, regularPrice, salePrice, discount, stock, avgRating, reviewCount } = product;
  const link = `/product/${id}`;
  
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${name} added to cart!`);
  };

  const discountPercent = parseInt(discount) || (salePrice && salePrice < regularPrice ? Math.round(((regularPrice - salePrice) / regularPrice) * 100) : 0);
  const hasDiscount = discountPercent > 0;
  const effectiveSalePrice = salePrice && salePrice < regularPrice ? salePrice : (hasDiscount && !salePrice ? Math.round(regularPrice * (1 - discountPercent / 100)) : regularPrice);

  return (
    <div className="bg-white border border-[#efefef] rounded-xl overflow-hidden transition-all duration-300 flex flex-col hover:-translate-y-1.5 hover:shadow-xl group relative h-full">
      <Link href={link} className="relative aspect-square bg-[#f9f9f9] overflow-hidden">
        {hasDiscount && (
          <span className="absolute top-2.5 left-2.5 bg-primary-dark text-white text-[11px] font-bold px-2 py-1 rounded z-[2] shadow-sm">
            {String(discount).includes('%') ? discount : `${discountPercent}% OFF`}
          </span>
        )}
        <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-contain p-2.5 transition-transform duration-700 group-hover:scale-110" 
            loading="lazy"
        />
        
        {/* Add to Cart Button (Sliding from bottom on hover) */}
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 w-full bg-primary text-white py-3 font-bold text-sm opacity-0 translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 z-[5] hover:bg-primary-soft hover:text-primary active:bg-primary-dark cursor-pointer"
        >
          Add to cart
        </button>

        {/* Top-right cart icon on hover (Secondary action) */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2.5 transition-all duration-300 z-10">
          <button 
            onClick={handleAddToCart}
            className="w-9 h-9 rounded-full bg-white border border-[#eee] flex items-center justify-center text-[#333] transition-all hover:bg-primary-soft hover:text-primary shadow-md cursor-pointer"
            aria-label="Add to cart"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
        </div>
      </Link>

      <div className="p-4 flex flex-col gap-1.5 flex-grow">
        <p className="text-[11px] text-[#999] font-bold uppercase">{brand}</p>
        <Link href={link} className="text-sm font-semibold text-[#333] h-10 overflow-hidden line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {name}
        </Link>
        
        {/* Rating Stars */}
        <div className="flex text-amber-400 text-[10px] items-center gap-1 my-0.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                width="10" 
                height="10" 
                fill={i < Math.round(avgRating || 0) ? "currentColor" : "none"} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            ))}
          </div>
          <span className="text-gray-300 font-bold">({reviewCount || 0})</span>
        </div>

        <div className="flex gap-2 items-center mt-1">
          {hasDiscount && (
            <span className="text-[12px] text-[#bbb] line-through">৳ {regularPrice}</span>
          )}
          <span className="text-[16px] text-primary font-extrabold">৳ {effectiveSalePrice}</span>
        </div>

        <p className="text-[11px] text-[#00A86B] font-bold mt-auto pt-2 border-t border-gray-50 uppercase tracking-wider flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-[#00A86B] rounded-full"></span> 
          {stock > 0 ? "In stock" : "Out of stock"}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;

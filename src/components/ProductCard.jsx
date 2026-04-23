import React from 'react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const { id, name, brand, image, regularPrice, salePrice, discount, stockStatus } = product;
  const link = `/product/${id}`;

  return (
    <div className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/5 flex flex-col hover:border-transparent">
      <Link href={link} className="block relative aspect-square bg-[#fcfcfc] overflow-hidden">
        {discount && (
          <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-black px-2 py-1 rounded-md z-10 shadow-lg shadow-primary/20 uppercase tracking-tighter">
            {discount} OFF
          </span>
        )}
        <img src={image} alt={name} className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        
        {/* Hover Add to Cart Button */}
        <button className="absolute bottom-0 left-0 w-full bg-primary text-white py-3 font-black text-xs uppercase tracking-[2px] opacity-0 translate-y-full transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 z-10 cursor-pointer hover:bg-primary-soft hover:text-primary active:bg-primary-dark">
          Add to cart
        </button>
 
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 z-20">
          <button className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-100 flex items-center justify-center text-gray-500 transition-all hover:bg-primary-soft hover:text-primary hover:border-primary-soft hover:rotate-12 shadow-xl cursor-pointer" aria-label="Compare" title="Compare">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M16 3h5v5M4 21V16h5M4 3h5v5M15 21h5v-5M8 3v18M16 3v18M3 8h18M3 16h18"></path></svg>
          </button>
          <button className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-100 flex items-center justify-center text-gray-500 transition-all hover:bg-primary-soft hover:text-primary hover:border-primary-soft hover:rotate-12 shadow-xl cursor-pointer" aria-label="Quick view" title="Quick view">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <button className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-sm border border-gray-100 flex items-center justify-center text-gray-400 transition-all hover:bg-primary-soft hover:text-primary hover:border-primary-soft hover:rotate-12 shadow-xl cursor-pointer" aria-label="Add to wishlist" title="Add to wishlist">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>
      </Link>

      <div className="p-4 flex flex-col gap-2 flex-grow">
        <div className="text-[10px] text-gray-400 font-black uppercase tracking-[2px]">
          {brand}
        </div>
        <Link href={link} className="text-[14px] font-bold text-[#111] line-clamp-2 h-10 hover:text-[var(--primary-color)] transition-colors leading-tight">
          {name}
        </Link>
        <div className="flex text-amber-400 text-[10px] items-center gap-1">
          <span className="flex">★★★★★</span>
          <span className="text-gray-300 font-bold">(0)</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-2">
           <div className="flex flex-col">
              {regularPrice && regularPrice !== salePrice && (
                <span className="text-[11px] text-gray-300 line-through font-bold">৳{regularPrice}</span>
              )}
              <span className="text-[18px] text-[var(--primary-color)] font-black tracking-tighter">৳{salePrice}</span>
           </div>
           <div className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${stockStatus?.toLowerCase().includes('in stock') ? 'bg-green-50 text-green-600 border-green-100' : 'bg-primary-light text-primary-dark border-primary-soft'}`}>
             {stockStatus}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

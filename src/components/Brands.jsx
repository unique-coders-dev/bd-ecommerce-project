"use client";

import React, { useRef } from 'react';
import Link from 'next/link';

const Brands = () => {
  const scrollRef = useRef(null);

  const brands = [
    { name: "Anjo", logo: "https://kcbazar.com/wp-content/uploads/2023/06/Anjo-1.svg", link: "/attribute/brand/anjo/" },
    { name: "Anua", logo: "https://kcbazar.com/wp-content/uploads/2024/07/anua.png", link: "/attribute/brand/anua/" },
    { name: "Axis-Y", logo: "https://kcbazar.com/wp-content/uploads/2024/09/axis-y.png", link: "/attribute/brand/axis-y/" },
    { name: "CosRx", logo: "https://kcbazar.com/wp-content/uploads/2023/06/cosrx-1.svg", link: "/brand/cosrx/" },
    { name: "Dabo", logo: "https://kcbazar.com/wp-content/uploads/2023/06/Dabo-1.svg", link: "/attribute/brand/dabo/" },
    { name: "Missha", logo: "https://kcbazar.com/wp-content/uploads/2023/06/missha-1.svg", link: "/attribute/brand/missha/" },
    { name: "SKIN1004", logo: "https://kcbazar.com/wp-content/uploads/2024/06/skin1004.png", link: "/attribute/brand/skin1004/" },
    { name: "Some By Mi", logo: "https://kcbazar.com/wp-content/uploads/2023/06/some-by-mi.svg", link: "/attribute/brand/some-by-mi/" },
    { name: "Tonymoly", logo: "https://kcbazar.com/wp-content/uploads/2023/06/tonymoly.svg", link: "/attribute/brand/tonymoly/" },
    { name: "Innisfree", logo: "https://kcbazar.com/wp-content/uploads/2023/06/Innisfree_Logo.png", link: "/attribute/brand/innisfree/" },
    { name: "Etude House", logo: "https://kcbazar.com/wp-content/uploads/2023/06/etude-house.svg", link: "/attribute/brand/etude-house/" },
    { name: "Nature Republic", logo: "https://kcbazar.com/wp-content/uploads/2023/06/nature-republic.svg", link: "/attribute/brand/nature-republic/" },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-10 bg-gray-50/30">
      <div className="max-w-[1320px] mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-[24px] font-black text-[#111] uppercase tracking-tighter">Official Brands</h2>
            <p className="text-[13px] text-gray-400 font-medium">100% Original Korean Products</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex gap-2">
                <button 
                  onClick={() => scroll('left')}
                  className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#FF4D6D] hover:text-white transition-all shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-[#FF4D6D] hover:text-white transition-all shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M9 5l7 7-7 7"/></svg>
                </button>
             </div>
          </div>
        </div>

        {/* Brand Logos Slider */}
        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        >
          {brands.map((brand, idx) => (
            <div 
              key={idx} 
              className="min-w-[140px] md:min-w-[180px] h-24 bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-6 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF4D6D]/5 hover:-translate-y-1 group relative flex-shrink-0 cursor-default"
              title={brand.name}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;

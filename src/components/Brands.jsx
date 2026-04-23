"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

const Brands = () => {
  const scrollRef = useRef(null);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch('/api/admin/brands');
        const data = await res.json();
        // filter active brands for the storefront
        const activeBrands = Array.isArray(data) ? data.filter(b => b.isActive) : [];
        setBrands(activeBrands);
      } catch (error) {
        console.error("Failed to load brands", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!loading && brands.length === 0) {
      return null;
  }

  return (
    <section className="py-12 bg-[#f9fafb] kb-brands-section">
      <div className="max-w-[1320px] mx-auto px-4">
        <div className="flex items-center justify-between mb-8 kb-section-header">
          <div>
            <h2 className="text-[24px] font-black text-[#111] uppercase tracking-tighter">Official Brands</h2>
            <p className="text-[13px] text-gray-400 font-medium">100% Original Korean Products</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex gap-2">
                <button 
                  onClick={() => scroll('left')}
                  className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm cursor-pointer"
                  aria-label="Scroll left"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M15 19l-7-7 7-7"/></svg>
                </button>
                <button 
                  onClick={() => scroll('right')}
                  className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm cursor-pointer"
                  aria-label="Scroll right"
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
          {loading ? (
             [1,2,3,4,5,6].map(i => (
                 <div key={i} className="min-w-[140px] md:min-w-[180px] h-24 bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-6 animate-pulse flex-shrink-0" />
             ))
          ) : (
            brands.map((brand) => (
                <Link 
                  key={brand.id} 
                  href={brand.linkUrl || '/'}
                  className="min-w-[140px] md:min-w-[180px] h-24 bg-white border border-gray-100 rounded-2xl flex items-center justify-center p-6 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--primary-color)]/5 hover:-translate-y-1 group relative flex-shrink-0 cursor-pointer"
                  title={brand.name}
                >
                  <img
                    src={brand.imageUrl}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                  />
                </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Brands;

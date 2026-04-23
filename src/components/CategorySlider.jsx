"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

const CategorySlider = () => {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/admin/categories');
        const data = await res.json();
        if (Array.isArray(data)) {
          // show only parent categories (where parentId is null)
          setCategories(data.filter(cat => !cat.parentId));
        }
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (loading) return null;

  // Render a nice gradient block with letter if no image
  const renderImageOrLetter = (cat) => {
    if (cat.image) {
      return (
        <img 
          src={cat.image} 
          alt={cat.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" 
        />
      );
    }
    const firstLetter = cat.name ? cat.name.charAt(0).toUpperCase() : '?';
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-light to-gray-50 transition-transform duration-500 group-hover:scale-[1.03]">
        <span className="text-5xl font-black text-primary/40 uppercase">{firstLetter}</span>
      </div>
    );
  };

  return (
    <section className="py-8 kb-categories-section">
      <div className="max-w-[1320px] mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[22px] font-bold text-[#111827]">Top Categories</h2>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button 
                onClick={() => scroll('left')}
                className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm cursor-pointer"
                aria-label="Previous category"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M15 19l-7-7 7-7"/></svg>
              </button>
              <button 
                onClick={() => scroll('right')}
                className="w-9 h-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all shadow-sm cursor-pointer"
                aria-label="Next category"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="grid grid-flow-col auto-cols-[calc(50%-8px)] sm:auto-cols-[calc(33.333%-10.66px)] md:auto-cols-[calc(25%-12px)] lg:auto-cols-[calc(16.666%-13.33px)] gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-4 kb-category-slider-track"
        >
          {categories.map((cat) => (
            <Link key={cat.id || cat.slug} href={`/product-category/${cat.slug}/`} className="flex flex-col items-center gap-2.5 text-center bg-white p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 group border border-gray-50 kb-category-card">
              <div className="w-full aspect-square max-h-[150px] rounded-xl overflow-hidden bg-[#f9f9f9]">
                {renderImageOrLetter(cat)}
              </div>
              <p className="text-sm font-semibold text-[#333] group-hover:text-primary transition-colors line-clamp-1">{cat.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;

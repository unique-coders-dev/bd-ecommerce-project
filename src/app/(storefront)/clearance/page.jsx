"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';

const PAGE_SIZE = 20;

export default function ClearancePage() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const observerRef = useRef(null);
  const lastProductRef = useRef(null);

  const fetchProducts = useCallback(async (pageNum) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/clearance?page=${pageNum}&limit=${PAGE_SIZE}`);
      const data = await res.json();
      if (data.products) {
        setProducts(prev => pageNum === 1 ? data.products : [...prev, ...data.products]);
        setHasMore(data.products.length === PAGE_SIZE);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProducts(nextPage);
      }
    });

    if (lastProductRef.current) {
      observerRef.current.observe(lastProductRef.current);
    }

    return () => { if (observerRef.current) observerRef.current.disconnect(); };
  }, [hasMore, loading, page, fetchProducts]);

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <div className="max-w-[1320px] mx-auto px-4 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="inline-block bg-primary text-white text-[10px] font-black uppercase px-4 py-1.5 rounded-full animate-bounce">Final Call</div>
            <h1 className="text-3xl font-black text-[#111] uppercase tracking-tight">Stock Clearance</h1>
          </div>
          {!initialLoad && (
            <span className="text-[13px] text-gray-500 font-medium italic">{products.length} items</span>
          )}
        </div>

        {/* Products Grid */}
        {initialLoad ? (
          <div className="flex flex-col justify-center items-center py-40">
            <div className="animate-spin rounded-full h-12 w-12 border-[4px] border-gray-100 border-t-primary"></div>
            <p className="mt-6 text-primary font-black uppercase tracking-[3px] text-[12px] animate-pulse">Loading Clearance Items...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-40 text-center bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-bold uppercase tracking-widest">No clearance items at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {products.map((product, index) => {
                const isLast = index === products.length - 1;
                const mappedProduct = {
                  ...product,
                  avgRating: product.avgRating || 0,
                  reviewCount: product.reviewCount || 0,
                };
                return (
                  <div key={`${product.id}-${index}`} ref={isLast ? lastProductRef : null}>
                    <ProductCard product={mappedProduct} />
                  </div>
                );
              })}
            </div>

            {loading && (
              <div className="flex flex-col justify-center items-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-100 border-t-primary"></div>
                <p className="mt-4 text-primary font-black uppercase tracking-widest text-[11px] animate-pulse">Loading more...</p>
              </div>
            )}

            {!hasMore && products.length > 0 && (
              <div className="text-center py-12 text-[12px] text-gray-400 font-black uppercase tracking-widest">
                — You've seen all clearance items —
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

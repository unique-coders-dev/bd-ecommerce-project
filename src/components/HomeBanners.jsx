"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export function HomeBanners({ position, limit }) {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await fetch('/api/banners');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setBanners(data);
                }
            } catch (err) {
                console.error("Failed to load banners", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBanners();
    }, []);

    const getAssetLink = (item) => {
      if (item.isAllProducts) return '/shop';
      if (item.products && item.products.length > 0) {
        if (item.products.length === 1) return `/product/${item.products[0].id}`;
        return `/collection/${item.id}`;
      }
      return item.linkUrl || '/';
    };

    if (loading) return null;

    // Filter banners based on position
    const primaryBanner = banners.find(b => b.position === 'hero-after');
    const rowBanners = [
        banners.find(b => b.position === 'row-1'),
        banners.find(b => b.position === 'row-2'),
        banners.find(b => b.position === 'row-3')
    ].filter(Boolean);
    const postCategoryBanners = banners
        .filter(b => b.position === 'category-after')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit || 12);

    if (position === 'hero-after') {
        if (!primaryBanner) return null;
        return (
            <div className="max-w-[1320px] mx-auto px-4 my-8 kb-primary-banner-wrapper">
                <Link href={getAssetLink(primaryBanner)} className="block group overflow-hidden rounded-2xl shadow-xl shadow-black/5 kb-banner-impact">
                    <img 
                        src={primaryBanner.imageUrl} 
                        alt="Promo Banner" 
                        className="w-full h-auto max-h-[150px] object-cover transition-transform duration-700 group-hover:scale-[1.03] mx-auto" 
                    />
                </Link>
            </div>
        );
    }

    if (position === 'marketing-trio') {
        if (rowBanners.length === 0) return null;
        
        // Split for 2+1 layout
        const firstTwo = rowBanners.slice(0, 2);
        const lastOne = rowBanners[2];

        return (
            <div className="max-w-[1320px] mx-auto px-4 my-10 kb-marketing-trio-wrapper">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 kb-marketing-trio-grid">
                    {/* Left Column: First 2 items side-by-side */}
                    <div className="grid grid-cols-2 gap-4 h-full kb-trio-dual-slot">
                        {firstTwo.map((banner) => (
                            <Link key={banner.id} href={getAssetLink(banner)} className="block group overflow-hidden rounded-xl shadow-lg shadow-black/5 h-full">
                                 <img 
                                    src={banner.imageUrl} 
                                    alt="Promo" 
                                    className="w-full h-full max-h-[300px] object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
                                 />
                            </Link>
                        ))}
                    </div>
                    {/* Right Column: 3rd item full width */}
                    {lastOne && (
                        <Link href={getAssetLink(lastOne)} className="block group overflow-hidden rounded-xl shadow-lg shadow-black/5 h-full">
                            <img 
                               src={lastOne.imageUrl} 
                               alt="Promo" 
                               className="w-full h-full max-h-[300px] object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
                            />
                        </Link>
                    )}
                </div>
            </div>
        );
    }

    if (position === 'post-category') {
        if (postCategoryBanners.length === 0) return null;
        return (
            <div className="max-w-[1320px] mx-auto px-4 my-12 kb-post-category-banners-container">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 kb-category-banner-layout">
                    {postCategoryBanners.map((banner) => (
                        <Link key={banner.id} href={getAssetLink(banner)} className="block group overflow-hidden rounded-[24px] border border-black/5 shadow-sm kb-category-banner-item">
                             <img 
                                src={banner.imageUrl} 
                                alt="Promotion" 
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]" 
                             />
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    return null;
}

"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';

// Recursive subcategory list component
const SubCategoryList = ({ items, selectedCategory, setSelectedCategory, depth = 0 }) => {
  const [expanded, setExpanded] = useState({});

  if (!items || items.length === 0) return null;

  return (
    <ul className={`space-y-2 border-l-2 border-gray-100 pb-1 ${depth === 0 ? 'pl-4' : 'pl-3 mt-2'}`}>
      {items.map((sub, idx) => (
        <li key={idx}>
          <div className="flex justify-between items-center">
            <span
              onClick={() => setSelectedCategory(sub.name)}
              className={`cursor-pointer transition-colors text-[13px] hover:text-primary ${selectedCategory === sub.name ? 'text-primary font-bold' : 'text-gray-500 font-medium'}`}
            >
              {sub.name}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-gray-300 font-bold">({sub.count})</span>
              {sub.sub && sub.sub.length > 0 && (
                <svg
                  onClick={() => setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }))}
                  className={`w-3 h-3 text-gray-300 cursor-pointer hover:text-primary transition-transform duration-300 ${expanded[idx] ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </div>
          </div>
          {sub.sub && sub.sub.length > 0 && expanded[idx] && (
            <SubCategoryList items={sub.sub} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} depth={depth + 1} />
          )}
        </li>
      ))}
    </ul>
  );
};

const ShopContent = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [maxPriceLimit, setMaxPriceLimit] = useState(10000);
  const [loading, setLoading] = useState(true);

  // Filter States — initialize from URL query params
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get('category') || null);
  const [selectedBrands, setSelectedBrands] = useState(() => {
    const b = searchParams.get('brand');
    return b ? [decodeURIComponent(b)] : [];
  });
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sort, setSort] = useState('newness');
  const [brandSearch, setBrandSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const searchTerm = searchParams.get('search') || '';

  const [isInitialized, setIsInitialized] = useState(false);

  const fetchShopData = useCallback(async (isInitial = false) => {
    setLoading(true);
    try {
        const params = new URLSearchParams();
        if (selectedCategory) params.append('category', selectedCategory);
        if (selectedBrands.length > 0) params.append('brand', selectedBrands.join(','));
        if (searchTerm) params.append('search', searchTerm);
        params.append('minPrice', priceRange[0]);
        params.append('maxPrice', priceRange[1]);
        params.append('sort', sort);

        const res = await fetch(`/api/products?${params.toString()}`);
        const data = await res.json();

        if (data.products) {
            setProducts(data.products);
            setBrands(data.brands || []);
            setCategories(data.categories || []);
            
            if (isInitial && !isInitialized) {
                const max = data.maxPrice || 10000;
                setMaxPriceLimit(max);
                setPriceRange([0, max]);
                setIsInitialized(true);
            }
        }
    } catch (err) {
        toast.error("Failed to load products");
    } finally {
        setLoading(false);
    }
  }, [selectedCategory, selectedBrands, sort, priceRange, isInitialized, searchTerm]);

  useEffect(() => {
    // If not initialized, do the initial fetch
    if (!isInitialized) {
        fetchShopData(true);
    }
  }, [isInitialized, fetchShopData]);

  // Re-fetch only when filters or sort change (excluding the initial phase)
  useEffect(() => {
    if (isInitialized) {
        fetchShopData();
    }
  }, [selectedCategory, selectedBrands, sort, isInitialized, searchTerm]);

  useEffect(() => {
    const s = searchParams.get('search');
    // searchTerm is direct from searchParams, no state needed
    
    const cat = searchParams.get('category');
    if (cat !== selectedCategory) setSelectedCategory(cat || null);
    
    const b = searchParams.get('brand');
    const bArray = b ? [decodeURIComponent(b)] : [];
    if (JSON.stringify(bArray) !== JSON.stringify(selectedBrands)) {
        setSelectedBrands(bArray);
    }
  }, [searchParams, selectedCategory, selectedBrands]);

  const toggleCategory = (idx) => {
    setExpandedCategories(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleBrandToggle = (brandName) => {
    setSelectedBrands(prev => 
      prev.includes(brandName) 
        ? prev.filter(b => b !== brandName) 
        : [...prev, brandName]
    );
  };

  const filteredBrands = brands.filter(b => 
    b.name.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-roboto">
      <div className="max-w-[1320px] mx-auto px-4 pt-4 pb-12">
        
        {/* Breadcrumbs & Result Count */}
        <div className="flex flex-col md:flex-row justify-between items-center py-2.5 mb-4 border-b border-gray-100">
          <div className="text-[13px] text-gray-500 font-medium">
            <span>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link> 
                {' » '}
                <Link href="/shop" className="text-gray-800 uppercase font-black tracking-tighter italic hover:text-primary">Shop</Link>
                {selectedCategory && (
                    <>
                        {' » '}
                        <span className="text-primary font-black uppercase italic">{selectedCategory}</span>
                    </>
                )}
                {!selectedCategory && selectedBrands.length === 1 && (
                    <>
                        {' » '}
                        <span className="text-primary font-black uppercase italic">{selectedBrands[0]}</span>
                    </>
                )}
            </span>
          </div>
          <div className="text-[13px] text-gray-500 mt-3 md:mt-0 font-medium italic">
            {searchTerm ? `Search results for "${searchTerm}" (${products.length} found)` : `Showing all ${products.length} results`}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
          {/* Sidebar Filters */}
          <aside className="flex flex-col gap-[20px]">

            {/* Price Filter */}
            <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
              <h5 className="text-[15px] font-black text-gray-900 uppercase tracking-[1px] relative pb-3 border-b border-gray-100 mb-6 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-12 after:h-[3px] after:bg-primary">Filter By Price</h5>
              <div className="relative h-1 mt-6 mb-8 group px-1">
                <div className="absolute w-full h-[6px] bg-gray-100 rounded-full"></div>
                <div 
                    className="absolute h-[6px] bg-primary rounded-full transition-all" 
                    style={{ 
                        left: `${(priceRange[0] / maxPriceLimit) * 100}%`, 
                        right: `${100 - (priceRange[1] / maxPriceLimit) * 100}%` 
                    }}
                ></div>
                <input
                  type="range"
                  min="0"
                  max={maxPriceLimit}
                  value={priceRange[0]}
                  onChange={(e) => {
                    const val = Math.min(Number(e.target.value), priceRange[1] - 1);
                    setPriceRange([val, priceRange[1]]);
                  }}
                  className="absolute top-[-5px] w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-xl cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max={maxPriceLimit}
                  value={priceRange[1]}
                  onChange={(e) => {
                    const val = Math.max(Number(e.target.value), priceRange[0] + 1);
                    setPriceRange([priceRange[0], val]);
                  }}
                  className="absolute top-[-5px] w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-xl cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between mt-2 gap-4">
                <div className="text-[13px] text-[#111] font-black tracking-tight">
                  ৳{priceRange[0]} - ৳{priceRange[1]}
                </div>
                <button 
                    onClick={fetchShopData}
                    className="text-[10px] px-5 py-2 bg-primary text-white font-black rounded-lg shadow-lg shadow-primary/20 hover:scale-105 transition-all uppercase tracking-widest active:scale-95 cursor-pointer"
                >Filter</button>
              </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
              <h5 className="text-[15px] font-black text-gray-900 uppercase tracking-[1px] relative pb-3 border-b border-gray-100 mb-6 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-12 after:h-[3px] after:bg-primary">Categories</h5>
              <ul className="text-[14px] text-gray-600 space-y-3.5">
                <li 
                    className={`cursor-pointer font-bold transition-colors ${!selectedCategory ? 'text-primary' : 'text-gray-500 hover:text-primary'}`}
                    onClick={() => setSelectedCategory(null)}
                >
                    All Products
                </li>
                {categories.map((cat, idx) => (
                  <li key={idx} className="group">
                    <div className="flex justify-between items-center transition-colors">
                      <span 
                        className={`font-bold transition-colors cursor-pointer ${selectedCategory === cat.name ? 'text-primary' : 'text-gray-700 hover:text-primary'}`}
                        onClick={() => setSelectedCategory(cat.name)}
                      >
                        {cat.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="bg-gray-50 text-gray-400 text-[10px] font-black px-2 py-0.5 rounded border border-gray-100">{cat.count}</span>
                        {cat.sub && cat.sub.length > 0 && (
                          <svg 
                            onClick={() => toggleCategory(idx)}
                            className={`w-4 h-4 text-gray-300 transform transition-transform duration-300 cursor-pointer hover:text-primary ${expandedCategories[idx] ? 'rotate-180' : ''}`} 
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        )}
                      </div>
                    </div>
                    {cat.sub && cat.sub.length > 0 && (
                      <div className={`overflow-hidden transition-all duration-300 ${expandedCategories[idx] ? 'max-h-[500px] opacity-100 mt-3 ml-2' : 'max-h-0 opacity-0'}`}>
                        <SubCategoryList items={cat.sub} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} depth={0} />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands Widget */}
            <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
              <h5 className="text-[15px] font-black text-gray-900 uppercase tracking-[1px] relative pb-3 border-b border-gray-100 mb-6 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-12 after:h-[3px] after:bg-primary">Filter By Brand</h5>
              <div className="relative mb-5">
                <input 
                    type="text" 
                    placeholder="Search brands..." 
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="w-full text-sm bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 pl-10 outline-none focus:bg-white focus:border-primary/30 transition-all font-medium" 
                />
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </span>
              </div>
              <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                {filteredBrands.map((brand, idx) => (
                  <li key={idx}>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <input 
                            type="checkbox" 
                            checked={selectedBrands.includes(brand.name)}
                            onChange={() => handleBrandToggle(brand.name)}
                            className="w-4 h-4 border-2 border-gray-200 rounded text-primary focus:ring-primary cursor-pointer accent-primary" 
                        />
                        <span className={`text-sm transition-colors ${selectedBrands.includes(brand.name) ? 'text-primary font-black' : 'text-gray-700 font-bold group-hover:text-primary'}`}>{brand.name}</span>
                      </div>
                      <span className="text-[10px] font-black text-gray-300">{brand.count}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sort Widget */}
            <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-100">
              <h5 className="text-[15px] font-black text-gray-900 uppercase tracking-[1px] relative pb-3 border-b border-gray-100 mb-6 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-12 after:h-[3px] after:bg-primary">Sort By</h5>
              <ul className="space-y-4">
                {[
                    { id: 'popularity', label: 'Popularity' },
                    { id: 'rating', label: 'Average rating' },
                    { id: 'newness', label: 'Newness' },
                    { id: 'price-low', label: 'Price: low to high' },
                    { id: 'price-high', label: 'Price: high to low' }
                ].map((s) => (
                    <li key={s.id}>
                        <button 
                            onClick={() => setSort(s.id)}
                            className={`text-[13px] flex items-center transition-all cursor-pointer ${sort === s.id ? 'text-primary font-black translate-x-2' : 'text-gray-400 font-bold hover:text-primary hover:translate-x-1'}`}
                        >
                            <span className={`w-2 h-2 rounded-full mr-3 transition-all ${sort === s.id ? 'bg-primary scale-125' : 'bg-transparent border border-gray-200'}`}></span>
                            {s.label}
                        </button>
                    </li>
                ))}
              </ul>
            </div>

          </aside>

          {/* Main Shop Content */}
          <main className="flex flex-col">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white border border-gray-100 px-6 py-4 rounded-2xl mb-8 shadow-sm">
              <h1 className="text-2xl font-black text-[#111] mb-4 md:mb-0 uppercase tracking-tighter italic">
                {searchTerm ? `Search: ${searchTerm}` : (selectedCategory || (selectedBrands.length === 1 ? `${selectedBrands[0]} Products` : "All Products"))}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-[11px] text-gray-400 font-black uppercase tracking-widest hidden md:inline-block">Sort by:</span>
                <select 
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 focus:bg-white focus:ring-2 focus:ring-primary/10 outline-none cursor-pointer text-sm font-black text-gray-600 appearance-none min-w-[180px] shadow-sm"
                >
                  <option value="popularity">Popularity</option>
                  <option value="rating">Average rating</option>
                  <option value="newness">Newness</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                </select>
              </div>
            </div>

            {loading && products.length === 0 ? (
                <div className="flex flex-col justify-center items-center py-32 bg-white rounded-3xl border border-gray-100 border-dashed">
                    <div className="animate-spin rounded-full h-12 w-12 border-[4px] border-gray-50 border-t-primary"></div>
                    <p className="mt-6 text-primary font-black uppercase tracking-[3px] text-[12px] animate-pulse">Initializing Shop...</p>
                </div>
            ) : products.length === 0 ? (
                <div className="flex flex-col justify-center items-center py-32 bg-white rounded-3xl border border-gray-100 border-dashed text-center px-10">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <h3 className="text-xl font-black text-[#111] uppercase italic mb-2">No Products Found</h3>
                    <p className="text-gray-400 font-medium">We couldn't find any products matching your current filters. Try adjusting your selection.</p>
                    <button 
                        onClick={() => {
                            setSelectedCategory(null);
                            setSelectedBrands([]);
                            setPriceRange([0, maxPriceLimit]);
                            setSort('newness');
                        }}
                        className="mt-8 px-10 py-4 bg-[#111] text-white font-black uppercase tracking-[2px] rounded-xl hover:bg-black transition-all active:scale-95 shadow-xl shadow-black/10"
                    >Clear All Filters</button>
                </div>
            ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

const Shop = () => (
  <Suspense fallback={
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-[4px] border-gray-100 border-t-primary"></div>
    </div>
  }>
    <ShopContent />
  </Suspense>
);

export default Shop;

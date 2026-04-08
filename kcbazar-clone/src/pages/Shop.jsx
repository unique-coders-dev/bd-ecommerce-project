import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [priceRange, setPriceRange] = useState([40, 5500]);
  const [loading, setLoading] = useState(false);

  const initialProducts = [
    {
      id: 1,
      name: "Anua Rice 70 Glow Milky Toner 40 ml",
      brand: "Anua",
      image: "https://kcbazar.com/wp-content/uploads/2025/09/Anua-Rice-70-Glow-Milky-Toner-40-ml-5-300x300.jpg",
      regularPrice: "650",
      salePrice: "579",
      discount: "11%",
      stockStatus: "In stock"
    },
    {
      id: 2,
      name: "ANUA Heartleaf 77% Soothing Toner",
      brand: "Anua",
      image: "https://kcbazar.com/wp-content/uploads/2024/05/ANUA-Heartleaf-77-Soothing-Toner-300x300.png",
      regularPrice: "3,000",
      salePrice: "2,670",
      discount: "11%",
      stockStatus: "In stock"
    },
    {
      id: 3,
      name: "Anua Heartleaf 77 Clear Pad 160ml (70ea)",
      brand: "Anua",
      image: "https://kcbazar.com/wp-content/uploads/2024/05/Anua-Heartleaf-77-Clear-Pad-160ml-70ea-300x300.png",
      regularPrice: "2,500",
      salePrice: "2,225",
      discount: "11%",
      stockStatus: "In stock"
    },
    {
      id: 4,
      name: "ANUA Heartleaf Pore Control Cleansing Oil 200ml",
      brand: "Anua",
      image: "https://kcbazar.com/wp-content/uploads/2024/05/Anua-Heartleaf-Pore-Control-Cleansing-Oil-200ml-300x300.jpg",
      regularPrice: "2,100",
      salePrice: "1,869",
      discount: "11%",
      stockStatus: "In stock"
    },
    {
      id: 5,
      name: "ANUA BHA 2% Gentle Exfoliating Toner 150ml",
      brand: "Anua",
      image: "https://kcbazar.com/wp-content/uploads/2024/08/ANUA-BHA-2-Gentle-Exfoliating-Toner-150ml-300x300.jpg",
      regularPrice: "2,350",
      salePrice: "2,092",
      discount: "11%",
      stockStatus: "In stock"
    },
    {
      id: 6,
      name: "Anua Peach 70% Niacinamide Serum 30ml",
      brand: "Anua",
      image: "https://kcbazar.com/wp-content/uploads/2024/05/Anua-Peach-70-Niacinamide-Serum-30ml-300x300.jpg",
      regularPrice: "2,500",
      salePrice: "2,225",
      discount: "11%",
      stockStatus: "In stock"
    },
    {
      id: 7,
      name: "Anua Heartleaf LHA Moisture Peeling Gel 120ml",
      brand: "Anua",
      image: "https://kcbazar.com/wp-content/uploads/2024/05/Anua-Heartleaf-LHA-Moisture-Peeling-Gel-120ml-300x300.jpg",
      regularPrice: "1,750",
      salePrice: "1,558",
      discount: "11%",
      stockStatus: "In stock"
    },
    {
      id: 8,
      name: "ANUA Heartleaf Quercetinol Pore Deep Cleansing Foam 150ml",
      brand: "Anua",
      image: "https://kcbazar.com/wp-content/uploads/2024/05/Anua-Heartleaf-Quercetinol-Pore-Deep-Cleansing-Foam-150ml-1-300x300.jpg",
      regularPrice: "1,650",
      salePrice: "1,469",
      discount: "11%",
      stockStatus: "In stock"
    }
  ];

  const [displayedProducts, setDisplayedProducts] = useState(initialProducts);
  const [expandedCategories, setExpandedCategories] = useState({});
  const observer = useRef();

  const categories = [
    { name: "Accessories", count: 15, sub: ["Baby Diaper", "Bed Heater", "Crockeries", "Sanitary Pads"] },
    { name: "Baby Product", count: 26, sub: ["Baby Body Wash", "Baby Cream", "Baby Lotion"] },
    { name: "Body, Hand & Foot Care", count: 133, sub: ["Body Care", "Hand Care", "Foot Care"] },
    { name: "Hair, Eye & Lip Care", count: 450, sub: ["Hair Care", "Eye Care", "Lip Care"] },
    { name: "Skin Care", count: 280, sub: ["Cleanser", "Moisturizer", "Serum"] }
  ];

  const brands = [
    { name: "Ryo", count: 38 },
    { name: "Elastine", count: 12 },
    { name: "Mise en Scene", count: 8 },
    { name: "MODAMODA", count: 5 },
    { name: "Kundal", count: 21 },
    { name: "GDS", count: 1 },
    { name: "Holika Holika", count: 15 }
  ];

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(e.target.value);
    setPriceRange(newRange);
  };

  const toggleCategory = (idx) => {
    setExpandedCategories(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const loadMoreProducts = () => {
    if (loading) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const more = initialProducts.map(p => ({ ...p, id: p.id + displayedProducts.length }));
      setDisplayedProducts(prev => [...prev, ...more]);
      setLoading(false);
    }, 1000);
  };

  const lastProductElementRef = node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMoreProducts();
      }
    });
    if (node) observer.current.observe(node);
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <div className="max-w-[1320px] mx-auto px-4 pt-4 pb-12">
        {/* ── Breadcrumbs & Result Count ── */}
        <div className="flex flex-col md:flex-row justify-between items-center py-2.5 mb-4 border-b border-gray-100">
          <div className="text-[13px] text-gray-500 font-medium">
            <span><a href="/" className="hover:text-[#FF4D6D] transition-colors">Home</a> » <span className="text-gray-800" aria-current="page">Anua</span></span>
          </div>
          <div className="text-[13px] text-gray-500 mt-3 md:mt-0 font-medium">
            Showing all 23 results
          </div>
        </div>

        {/* ── Banners ── */}
        <div className="flex flex-col gap-4 mb-[30px]">
          <a href="#" className="w-full inline-block group">
            <img src="https://kcbazar.com/wp-content/uploads/2025/12/body-lotion-banner-for-pc.png" alt="Body Lotion" className="w-full hidden md:block rounded-xl object-cover shadow-sm transition-transform duration-700 group-hover:scale-[1.01]" />
            <img src="https://kcbazar.com/wp-content/uploads/2025/12/body-lotion-banner-for-mobile.png" alt="Body Lotion Mobile" className="w-full block md:hidden rounded-xl object-cover shadow-sm" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
          {/* ── Sidebar Filters ── */}
          <aside className="flex flex-col gap-[15px]">

            {/* Price Filter Widget */}
            <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-50">
              <h5 className="text-[15px] font-bold text-gray-900 uppercase tracking-wide relative pb-3 border-b border-gray-200 mb-[15px] after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-12 after:h-[2px] after:bg-[#FF4D6D]">Filter By Price</h5>
              <div className="relative h-1 mt-6 mb-6 group">
                <div className="absolute w-full h-[4px] bg-gray-100 rounded-full"></div>
                <div className="absolute h-[4px] bg-[#FF4D6D] rounded-full" style={{ left: `${((priceRange[0] - 40) / (5500 - 40)) * 100}%`, right: `${100 - ((priceRange[1] - 40) / (5500 - 40)) * 100}%` }}></div>
                <input
                  type="range"
                  min="40"
                  max="5500"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const val = Math.min(Number(e.target.value), priceRange[1] - 1);
                    setPriceRange([val, priceRange[1]]);
                  }}
                  className="absolute top-[-5px] w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#FF4D6D] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md cursor-pointer"
                />
                <input
                  type="range"
                  min="40"
                  max="5500"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const val = Math.max(Number(e.target.value), priceRange[0] + 1);
                    setPriceRange([priceRange[0], val]);
                  }}
                  className="absolute top-[-5px] w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#FF4D6D] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between mt-2 gap-4">
                <div className="text-[13px] text-gray-600 font-medium">
                  ৳{priceRange[0]} - ৳{priceRange[1]}
                </div>
                <button className="text-[11px] px-4 py-1.5 bg-[#FF4D6D] hover:bg-[#e64462] text-white font-bold rounded shadow-sm transition-all uppercase tracking-wider active:scale-95">Filter</button>
              </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-50">
              <h5 className="text-[15px] font-bold text-gray-900 uppercase tracking-wide relative pb-3 border-b border-gray-200 mb-[15px] after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-12 after:h-[2px] after:bg-[#FF4D6D]">All Categories</h5>
              <ul className="text-[14px] text-gray-600 space-y-2.5">
                {categories.map((cat, idx) => (
                  <li key={idx} className="group">
                    <div
                      className="flex justify-between items-center cursor-pointer hover:text-[#FF4D6D] transition-colors"
                      onClick={() => cat.sub ? toggleCategory(idx) : null}
                    >
                      <span className="font-semibold text-gray-700 group-hover:text-[#FF4D6D] transition-colors">{cat.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="bg-gray-50 text-gray-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-gray-100">{cat.count}</span>
                        {cat.sub && (
                          <svg className={`w-3 h-3 text-gray-400 transform transition-transform duration-300 ${expandedCategories[idx] ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                        )}
                      </div>
                    </div>
                    {cat.sub && (
                      <div className={`overflow-hidden transition-all duration-300 ${expandedCategories[idx] ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                        <ul className="pl-4 space-y-2 border-l-2 border-pink-50 pb-1 ml-1">
                          {cat.sub.map((sub, sIdx) => (
                            <li key={sIdx} className="hover:text-[#FF4D6D] cursor-pointer transition-colors text-[13px] text-gray-500 py-0.5 flex items-center before:content-[''] before:w-1.5 before:h-[1px] before:bg-gray-200 before:mr-2">
                              {sub}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands Widget */}
            <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-50">
              <h5 className="text-[15px] font-bold text-gray-900 uppercase tracking-wide relative pb-3 border-b border-gray-200 mb-[15px] after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-12 after:h-[2px] after:bg-[#FF4D6D]">Filter By Brand</h5>
              <div className="relative mb-4">
                <input type="text" placeholder="Search brands..." className="w-full text-sm bg-gray-50 border border-gray-100 rounded-lg py-2 px-3 pl-9 outline-none focus:bg-white focus:border-[#FF4D6D]/30 transition-all" />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </span>
              </div>
              <ul className="space-y-2.5 max-h-[250px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                {brands.map((brand, idx) => (
                  <li key={idx}>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" className="w-4 h-4 border-2 border-gray-200 rounded text-[#FF4D6D] focus:ring-[#FF4D6D] cursor-pointer" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-[#FF4D6D] transition-colors">{brand.name}</span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400">{brand.count}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Status Widget */}
            <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-50">
              <h5 className="text-[15px] font-bold text-gray-900 uppercase tracking-wide relative pb-3 border-b border-gray-200 mb-[15px] after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-12 after:h-[2px] after:bg-[#FF4D6D]">Filter By Status</h5>
              <ul className="space-y-3">
                <li>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 border-2 border-gray-200 rounded text-[#FF4D6D] focus:ring-[#FF4D6D] cursor-pointer" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#FF4D6D] transition-colors">On sale</span>
                  </label>
                </li>
                <li>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 border-2 border-gray-200 rounded text-[#FF4D6D] focus:ring-[#FF4D6D] cursor-pointer" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#FF4D6D] transition-colors">In stock</span>
                  </label>
                </li>
              </ul>
            </div>

            {/* Sort By Widget */}
            <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-50">
              <h5 className="text-[15px] font-bold text-gray-900 uppercase tracking-wide relative pb-3 border-b border-gray-200 mb-[15px] after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-12 after:h-[2px] after:bg-[#FF4D6D]">Sort By</h5>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm font-bold text-gray-900 flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-[#FF4D6D] before:rounded-full before:mr-2">Popularity</a></li>
                <li><a href="#" className="text-sm text-gray-600 font-medium hover:text-[#FF4D6D] transition-colors flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-transparent before:rounded-full before:mr-2 hover:before:bg-pink-300">Average rating</a></li>
                <li><a href="#" className="text-sm text-gray-600 font-medium hover:text-[#FF4D6D] transition-colors flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-transparent before:rounded-full before:mr-2 hover:before:bg-pink-300">Newness</a></li>
                <li><a href="#" className="text-sm text-gray-600 font-medium hover:text-[#FF4D6D] transition-colors flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-transparent before:rounded-full before:mr-2 hover:before:bg-pink-300">Price: low to high</a></li>
                <li><a href="#" className="text-sm text-gray-600 font-medium hover:text-[#FF4D6D] transition-colors flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-transparent before:rounded-full before:mr-2 hover:before:bg-pink-300">Price: high to low</a></li>
              </ul>
            </div>

          </aside>

          {/* ── Main Shop Content ── */}
          <main className="flex flex-col">
            {/* Top Bar for Products Grid */}
            <div className="flex flex-col md:flex-row justify-between items-center bg-white border border-gray-100 px-5 py-3 rounded-xl mb-8 shadow-sm">
              <h1 className="text-xl font-bold text-gray-900 mb-4 md:mb-0">Anua</h1>
              <div className="flex items-center gap-4">
                <span className="text-[13px] text-gray-500 font-medium hidden md:inline-block">Sort by:</span>
                <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:bg-white focus:ring-2 focus:ring-pink-100 outline-none cursor-pointer text-sm font-semibold text-gray-700">
                  <option>Popularity</option>
                  <option>Average rating</option>
                  <option>Newness</option>
                  <option>Price: low to high</option>
                  <option>Price: high to low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {displayedProducts.map((product, index) => {
                if (displayedProducts.length === index + 1) {
                  return (
                    <div ref={lastProductElementRef} key={`${product.id}-${index}`}>
                      <ProductCard product={product} />
                    </div>
                  );
                } else {
                  return <ProductCard key={`${product.id}-${index}`} product={product} />;
                }
              })}
            </div>

            {/* Loading Indicator for Infinite Scroll */}
            {loading && (
              <div className="flex flex-col justify-center items-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-gray-100 border-t-[#FF4D6D]"></div>
                <p className="mt-4 text-[#FF4D6D] font-bold uppercase tracking-widest text-[11px] animate-pulse">Searching more items...</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;

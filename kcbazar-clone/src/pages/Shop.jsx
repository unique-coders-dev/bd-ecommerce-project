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
    <div className="shop-page-wrapper">
      <div className="main-container bg-transparent pt-4 pb-12">
        {/* ── Breadcrumbs & Result Count ── */}
        <div className="breadcrumb-results-row flex flex-col md:flex-row justify-between items-center mb-4 border-b border-gray-100" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
          <div className="yoast-breadcrumb text-[13px] text-gray-500 font-medium">
            <span><a href="/" className="hover:text-pink-500 transition-colors">Home</a> » <span className="breadcrumb_last text-gray-800" aria-current="page">Anua</span></span>
          </div>
          <div className="woocommerce-result-count text-[13px] text-gray-500 mt-3 md:mt-0 font-medium">
            Showing all 23 results
          </div>
        </div>

        {/* ── Banners ── */}
        <div className="shop-banners flex flex-col gap-4" style={{ marginBottom: '30px' }}>
          <a href="#" className="w-full inline-block">
            <img src="https://kcbazar.com/wp-content/uploads/2025/12/body-lotion-banner-for-pc.png" alt="Body Lotion" className="w-full hidden md:block rounded-xl object-cover shadow-sm" />
            <img src="https://kcbazar.com/wp-content/uploads/2025/12/body-lotion-banner-for-mobile.png" alt="Body Lotion Mobile" className="w-full block md:hidden rounded-xl object-cover shadow-sm" />
          </a>
        </div>

        <div className="shop-content-layout grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
          {/* ── Sidebar Filters ── */}
          <aside className="shop-sidebar-filters flex flex-col" style={{ gap: '15px' }}>

            {/* Price Filter Widget */}
            <div className="sidebar-widget bg-white shadow-sm" style={{ borderRadius: '10px', padding: '20px' }}>
              <h5 className="widget-title text-[15px] font-bold text-gray-900 uppercase tracking-wide relative pb-3 border-b border-gray-200 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-12 after:h-[2px] after:bg-pink-500" style={{ marginBottom: '15px' }}>Filter By Price</h5>
              <div className="price-range-slider relative h-1 mt-4 group" style={{ marginBottom: '12px' }}>
                <div className="slider-track absolute w-full h-[4px] bg-gray-200 rounded-full"></div>
                <div className="slider-range absolute h-[4px] bg-pink-500 rounded-full" style={{ left: `${((priceRange[0] - 40) / (5500 - 40)) * 100}%`, right: `${100 - ((priceRange[1] - 40) / (5500 - 40)) * 100}%` }}></div>
                <input
                  type="range"
                  min="40"
                  max="5500"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const val = Math.min(Number(e.target.value), priceRange[1] - 1);
                    setPriceRange([val, priceRange[1]]);
                  }}
                  className="range-input min-range absolute top-[-5px] w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-pink-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md cursor-pointer"
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
                  className="range-input max-range absolute top-[-5px] w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-pink-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md cursor-pointer"
                />
              </div>
              <div className="price-filter-footer flex items-center justify-between mt-0">
                <div className="price-label text-[14px] text-gray-600 font-medium">
                  Price: <strong className="text-gray-800">৳ {priceRange[0].toLocaleString()}</strong> — <strong className="text-gray-800">৳ {priceRange[1].toLocaleString()}</strong>
                </div>
                <button className="text-[13px] px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded transition-colors uppercase tracking-wider" style={{ padding: '3px 8px' }}>Filter</button>
              </div>
            </div>

            {/* Categories Widget */}
            <div className="sidebar-widget bg-white shadow-sm" style={{ borderRadius: '10px', padding: '20px' }}>
              <h5 className="widget-title text-[15px] font-bold text-gray-900 uppercase tracking-wide relative pb-3 border-b border-gray-200 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-12 after:h-[2px] after:bg-pink-500" style={{ marginBottom: '15px' }}>All Categories</h5>
              <ul className="categories-filter-list text-[15px] text-gray-600 space-y-3">
                {categories.map((cat, idx) => (
                  <li key={idx} className="category-filter-item group" style={{ paddingTop: '3px', paddingBottom: '3px' }}>
                    <div
                      className="flex justify-between items-center cursor-pointer hover:text-pink-500 transition-colors"
                      onClick={() => cat.sub ? toggleCategory(idx) : null}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-700 group-hover:text-pink-500 transition-colors">{cat.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-gray-100 text-gray-500 text-[11px] font-bold px-2 py-0.5 rounded-full">{cat.count}</span>
                        {cat.sub && (
                          <svg className={`w-3 h-3 text-gray-400 transform transition-transform duration-300 ${expandedCategories[idx] ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        )}
                      </div>
                    </div>
                    {cat.sub && (
                      <div className={`overflow-hidden transition-all duration-300 ${expandedCategories[idx] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <ul className="pl-4 mt-2 space-y-2 border-l-2 border-gray-100 pb-2 ml-1">
                          {cat.sub.map((sub, sIdx) => (
                            <li key={sIdx} className="hover:text-pink-500 cursor-pointer transition-colors text-[14px] text-gray-500 flex items-center before:content-[''] before:w-2 before:h-[1px] before:bg-gray-300 before:mr-2" style={{ paddingTop: '3px', paddingBottom: '3px' }}>
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
            <div className="sidebar-widget bg-white shadow-sm" style={{ borderRadius: '10px', padding: '20px' }}>
              <h5 className="widget-title text-[15px] font-bold text-gray-900 uppercase tracking-wide relative pb-3 border-b border-gray-200 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-12 after:h-[2px] after:bg-pink-500" style={{ marginBottom: '15px' }}>Filter By Brand</h5>
              <div className="relative mb-5">
                <input type="text" placeholder="Search for brands..." className="w-full text-[14px] bg-white border border-gray-200 rounded-lg outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all shadow-sm" style={{ paddingTop: '5px', paddingBottom: '5px', paddingLeft: '15px', paddingRight: '40px', marginBottom: '10px' }} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </span>
              </div>
              <ul className="brands-filter-list space-y-3 max-h-[280px] overflow-y-auto custom-scrollbar pr-3 text-[15px] text-gray-600">
                {brands.map((brand, idx) => (
                  <li key={idx} style={{ paddingTop: '3px', paddingBottom: '3px' }}>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center w-5 h-5">
                          <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-md checked:bg-pink-500 checked:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-offset-1 transition-all cursor-pointer" />
                          <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <span className="font-medium text-gray-700 group-hover:text-pink-500 transition-colors">{brand.name}</span>
                      </div>
                      <span className="bg-gray-100 text-gray-500 text-[11px] font-bold px-2 py-0.5 rounded-full">{brand.count}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Status Widget */}
            <div className="sidebar-widget bg-white shadow-sm" style={{ borderRadius: '10px', padding: '20px' }}>
              <h5 className="widget-title text-[15px] font-bold text-gray-900 uppercase tracking-wide relative pb-3 border-b border-gray-200 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-12 after:h-[2px] after:bg-pink-500" style={{ marginBottom: '15px' }}>Filter By Status</h5>
              <ul className="status-filter-list space-y-3 text-[15px] text-gray-600">
                <li style={{ paddingTop: '3px', paddingBottom: '3px' }}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5">
                      <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-md checked:bg-pink-500 checked:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-offset-1 transition-all cursor-pointer" />
                      <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-pink-500 transition-colors">On sale</span>
                  </label>
                </li>
                <li style={{ paddingTop: '3px', paddingBottom: '3px' }}>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-5 h-5">
                      <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-md checked:bg-pink-500 checked:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:ring-offset-1 transition-all cursor-pointer" />
                      <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-pink-500 transition-colors">In stock</span>
                  </label>
                </li>
              </ul>
            </div>

            {/* Sort By Widget */}
            <div className="sidebar-widget bg-white shadow-sm" style={{ borderRadius: '10px', padding: '20px' }}>
              <h5 className="widget-title text-[15px] font-bold text-gray-900 uppercase tracking-wide relative pb-3 border-b border-gray-200 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-12 after:h-[2px] after:bg-pink-500" style={{ marginBottom: '15px' }}>Sort By</h5>
              <ul className="sort-by-list space-y-3 text-[15px]">
                <li style={{ paddingTop: '3px', paddingBottom: '3px' }}><a href="#" className="font-bold text-gray-900 flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-pink-500 before:rounded-full before:mr-2">Popularity</a></li>
                <li style={{ paddingTop: '3px', paddingBottom: '3px' }}><a href="#" className="text-gray-600 font-medium hover:text-pink-500 transition-colors flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-transparent before:rounded-full before:mr-2 hover:before:bg-pink-300">Average rating</a></li>
                <li style={{ paddingTop: '3px', paddingBottom: '3px' }}><a href="#" className="text-gray-600 font-medium hover:text-pink-500 transition-colors flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-transparent before:rounded-full before:mr-2 hover:before:bg-pink-300">Newness</a></li>
                <li style={{ paddingTop: '3px', paddingBottom: '3px' }}><a href="#" className="text-gray-600 font-medium hover:text-pink-500 transition-colors flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-transparent before:rounded-full before:mr-2 hover:before:bg-pink-300">Price: low to high</a></li>
                <li style={{ paddingTop: '3px', paddingBottom: '3px' }}><a href="#" className="text-gray-600 font-medium hover:text-pink-500 transition-colors flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-transparent before:rounded-full before:mr-2 hover:before:bg-pink-300">Price: high to low</a></li>
              </ul>
            </div>

          </aside>

          {/* ── Main Shop Content ── */}
          <main className="shop-main-products">

            {/* Top Bar for Products Grid */}
            <div className="shop-grid-header flex flex-col md:flex-row justify-between items-center bg-gray-50 px-4 py-3 rounded-xl mb-8" style={{ padding: "10px 20px", marginBottom: "20px" }}>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-0">Anua</h1>
              <div className="sorting-select-wrap flex items-center gap-3">
                <span className="sort-hint text-[14px] text-gray-500 font-medium hidden md:inline-block">Sort by:</span>
                <select className="shop-sort-select p-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-100 outline-none cursor-pointer text-[14px]" style={{ padding: "8px" }}>
                  <option>Popularity</option>
                  <option>Average rating</option>
                  <option>Newness</option>
                  <option>Price: low to high</option>
                  <option>Price: high to low</option>
                </select>
              </div>
            </div>

            <div className="shop-products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-500"></div>
                <span className="ml-4 text-pink-500 font-bold uppercase tracking-widest text-sm">Loading more treasures...</span>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;

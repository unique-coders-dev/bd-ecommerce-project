import React, { useState, useEffect, useRef } from 'react';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [priceRange, setPriceRange] = useState([40, 5500]);
  const [loading, setLoading] = useState(false);

  const initialProducts = [
    {
      id: 1,
      name: "Ryo Hair Loss Expert Care Shampoo Dry Scalp - 400 ml",
      brand: "Ryo",
      image: "https://kcbazar.com/wp-content/uploads/2024/01/Ryo-Hair-Loss-Expert-Care-Shampoo-for-Dry-Scalp-400ml-2.jpg",
      regularPrice: "2,000",
      salePrice: "1,780",
      discount: "11%",
      stockStatus: "Out of stock"
    },
    {
      id: 2,
      name: "Ryo Hair Loss Expert Care Shampoo Dry Scalp - 180 ml",
      brand: "Ryo",
      image: "https://kcbazar.com/wp-content/uploads/2024/01/Ryo-Hair-Loss-Expert-Care-Shampoo-for-Dry-Scalp-180ml-1.jpg",
      regularPrice: "700",
      salePrice: "623",
      discount: "11%",
      stockStatus: "Out of stock"
    },
    {
      id: 3,
      name: "Elastine The Protein Repair With Macadamia Oil Damage Care Shampoo 855ml",
      brand: "Elastine",
      image: "https://kcbazar.com/wp-content/uploads/2025/07/Elastine-The-Protein-Repair-With-Macadamia-Oil-Damage-Care-Shampoo-855-ml-1.jpg",
      regularPrice: "2,850",
      salePrice: "2,537",
      discount: "11%",
      stockStatus: "In stock"
    },
    {
      id: 4,
      name: "Elastine The Protein Repair With Collagen Volume Care Shampoo 855 ml",
      brand: "Elastine",
      image: "https://kcbazar.com/wp-content/uploads/2025/07/Elastine-The-Protein-Repair-With-Collagen-Volume-Care-Shampoo-855-ml-1.jpg",
      regularPrice: "2,850",
      salePrice: "2,537",
      discount: "11%",
      stockStatus: "In stock"
    },
    {
      id: 5,
      name: "Mise en Scene Perfect Serum Styling Shampoo 680 ml",
      brand: "Mise en Scene",
      image: "https://kcbazar.com/wp-content/uploads/2025/07/mise-en-scene-Perfect-Serum-Styling-Shampoo-680-ml-3.jpg",
      regularPrice: "1,650",
      salePrice: "1,469",
      discount: "11%",
      stockStatus: "In stock"
    },
    {
      id: 6,
      name: "Modamoda Pro-Change Hair Skin Care Solution",
      brand: "MODAMODA",
      image: "https://kcbazar.com/wp-content/uploads/2024/12/MODAMODA.png",
      regularPrice: "2,500",
      salePrice: "2,225",
      discount: "11%",
      stockStatus: "In stock"
    },
    {
      id: 7,
      name: "Kundal Honey & Macadamia Hair Shampoo",
      brand: "Kundal",
      image: "https://kcbazar.com/wp-content/uploads/2024/12/Kundal.png",
      regularPrice: "1,800",
      salePrice: "1,602",
      discount: "11%",
      stockStatus: "In stock"
    },
    {
      id: 8,
      name: "Nature Republic Argan Essential Deep Care Shampoo",
      brand: "Nature Republic",
      image: "https://kcbazar.com/wp-content/uploads/2023/06/Nature-Republic-1.svg",
      regularPrice: "1,400",
      salePrice: "1,246",
      discount: "11%",
      stockStatus: "In stock"
    }
  ];

  const [displayedProducts, setDisplayedProducts] = useState(initialProducts);
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
      {/* ── Breadcrumb Row with Full White Background ── */}
      <div className="breadcrumb-results-bar bg-white opacity-100 shadow-sm border-b border-gray-100">
        <div className="main-container">
          <div className="bar-inner">
            <div className="breadcrumb-left">
              <a href="/">Home</a> / <span className="active">Shop</span>
            </div>
            <div className="results-right font-medium text-gray-500">
              Showing {displayedProducts.length} results
            </div>
          </div>
        </div>
      </div>

      <div className="main-container bg-transparent py-8">
        {/* ── Full Container Banner ── */}
        <div className="shop-full-width-banner mb-10 overflow-hidden rounded-2xl shadow-lg">
          <img
            src="https://kcbazar.com/wp-content/uploads/2026/03/kcbazar__Homepage___1st_Banner_PC_.jpg"
            alt="Shop Banner"
            className="w-full object-cover"
          />
        </div>

        <div className="shop-content-layout grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
          {/* ── Sidebar Filters ── */}
          <aside className="shop-sidebar-filters flex flex-col gap-8">

            {/* Price Filter Widget */}
            <div className="sidebar-filter-widget bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h5 className="widget-title text-base font-bold mb-6 text-gray-800 uppercase tracking-wider border-b border-gray-100 pb-3">Filter By Price</h5>
              <div className="price-range-slider relative mb-6">
                <div className="slider-track h-1 bg-gray-200 rounded-full"></div>
                <input
                  type="range"
                  min="40"
                  max="5500"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="range-input min-range absolute pointer-events-none appearance-none bg-transparent w-full"
                />
                <input
                  type="range"
                  min="40"
                  max="5500"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="range-input max-range absolute pointer-events-none appearance-none bg-transparent w-full"
                />
              </div>
              <div className="price-filter-footer flex items-center justify-between">
                <div className="price-label text-sm font-semibold text-gray-600">
                  Price: ৳ {priceRange[0].toLocaleString()} — ৳ {priceRange[1].toLocaleString()}
                </div>
                <button className="sidebar-filter-btn px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors">Filter</button>
              </div>
            </div>

            {/* Categories Widget */}
            <div className="sidebar-filter-widget bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h5 className="widget-title text-base font-bold mb-6 text-gray-800 uppercase tracking-wider border-b border-gray-100 pb-3">All Categories</h5>
              <ul className="categories-filter-list space-y-4">
                {categories.map((cat, idx) => (
                  <li key={idx} className="category-filter-item group">
                    <div className="category-main flex items-center justify-between cursor-pointer">
                      <span className="cat-name-text group-hover:text-pink-500 transition-colors font-medium text-gray-700">{cat.name}</span>
                      <span className="cat-count px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">{cat.count}</span>
                    </div>
                    {cat.sub && (
                      <ul className="category-submenu pl-4 mt-3 space-y-2 border-l-2 border-gray-50">
                        {cat.sub.map((sub, sIdx) => (
                          <li key={sIdx} className="submenu-item text-sm text-gray-500 hover:text-pink-500 transition-colors cursor-pointer">
                            {sub}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands Widget */}
            <div className="sidebar-filter-widget bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h5 className="widget-title text-base font-bold mb-6 text-gray-800 uppercase tracking-wider border-b border-gray-100 pb-3">Filter By Brand</h5>
              <div className="brand-search-box relative mb-6">
                <input type="text" placeholder="Search brands..." className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-100 outline-none" />
                <span className="search-icon absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              </div>
              <ul className="brands-filter-list space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {brands.map((brand, idx) => (
                  <li key={idx} className="brand-filter-item">
                    <label className="brand-checkbox-label flex items-center justify-between cursor-pointer">
                      <div className="brand-left flex items-center gap-3">
                        <input type="checkbox" className="brand-checkbox w-5 h-5 rounded border-gray-300 text-pink-500 focus:ring-pink-500" />
                        <span className="brand-name font-medium text-gray-700">{brand.name}</span>
                      </div>
                      <span className="brand-count text-xs text-gray-400">{brand.count}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Status Widget */}
            <div className="sidebar-filter-widget bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h5 className="widget-title text-base font-bold mb-6 text-gray-800 uppercase tracking-wider border-b border-gray-100 pb-3">Filter By Status</h5>
              <ul className="status-filter-list space-y-4">
                <li className="status-filter-item">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-pink-500 focus:ring-pink-500" />
                    <span className="checkbox-label font-medium text-gray-700">On sale</span>
                  </label>
                </li>
                <li className="status-filter-item">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-pink-500 focus:ring-pink-500" />
                    <span className="checkbox-label font-medium text-gray-700">In stock</span>
                  </label>
                </li>
              </ul>
            </div>

          </aside>

          {/* ── Main Shop Content ── */}
          <main className="shop-main-products">
            <div className="shop-grid-header flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8">
              <span className="hidden md:inline-block font-medium text-gray-500">Ready to explore?</span>
              <div className="sorting-select-wrap flex items-center gap-4">
                <span className="sort-hint text-sm text-gray-400">Sort by:</span>
                <select className="shop-sort-select p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-100 outline-none cursor-pointer text-sm">
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

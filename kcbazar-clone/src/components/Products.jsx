import React from 'react';

const Products = () => {

  const categories = [
    {
      name: "Skin Care",
      image: "https://kcbazar.com/wp-content/uploads/2025/06/Skin-Care-300x300.jpg",
      link: "https://kcbazar.com/product-category/skin-care/"
    },
    {
      name: "Makeup",
      image: "https://kcbazar.com/wp-content/uploads/2026/02/makeup-300x300.jpeg",
      link: "https://kcbazar.com/product-category/make-up/"
    },
    {
      name: "Lip Care",
      image: "https://kcbazar.com/wp-content/uploads/2025/06/lip-care-300x300.jpg",
      link: "https://kcbazar.com/product-category/hair-eye-lip-care/lip-care/"
    },
    {
      name: "Hair Care",
      image: "https://kcbazar.com/wp-content/uploads/2025/06/Hair-Care-300x300.jpg",
      link: "https://kcbazar.com/product-category/hair-eye-lip-care/hair-care/"
    },
    {
      name: "Combo Set",
      image: "https://kcbazar.com/wp-content/uploads/2025/11/combo-set-300x300.jpg",
      link: "https://kcbazar.com/product-category/combo-set/"
    },
    {
      name: "Body Care",
      image: "https://kcbazar.com/wp-content/uploads/2025/06/body-care-300x300.jpg",
      link: "https://kcbazar.com/product-category/body-hand-foot-care/body-care/"
    }
  ];

  const promoBanners = [
    {
      image: "https://kcbazar.com/wp-content/uploads/2026/03/kcbazar__Homepage___offer__info___banner__.jpg",
      link: "/shop/",
      alt: "Offer Info Banner"
    },
    {
      image: "https://kcbazar.com/wp-content/uploads/2025/12/Body-lotion-offer-banner.jpg",
      link: "/product-category/body-hand-foot-care/body-care/body-lotion/",
      alt: "Body Lotion Offer"
    },
    {
      image: "https://kcbazar.com/wp-content/uploads/2026/01/Clearance-sale-home-banner.png",
      link: "/clearance-sale/",
      alt: "Clearance Sale"
    },
    {
      image: "https://kcbazar.com/wp-content/uploads/2026/02/home-delivery.jpg",
      link: "/shop/?stock_status=instock,onsale",
      alt: "Home Delivery"
    },
    {
      image: "https://kcbazar.com/wp-content/uploads/2025/05/pre-order.jpg",
      link: "/pre-order/",
      alt: "Pre Order"
    },
    {
      image: "https://kcbazar.com/wp-content/uploads/2026/02/EMI.png",
      link: "/emi-details/",
      alt: "EMI Facility"
    }
  ];

  const products = [
    {
      id: 1,
      name: "Missha Soft Finish Sun Milk SPF50+ Pa+++ 70 ml",
      brand: "Missha",
      image: "https://kcbazar.com/wp-content/uploads/2023/10/Missha-Soft-Finish-Sun-Milk-SPF50-Pa-70-ml-1-1024x1024.jpg",
      regularPrice: "১,২০০",
      salePrice: "১,০৬৮",
      discount: "11%",
      link: "https://kcbazar.com/product/missha-soft-finish-sun-milk-spf50-pa-70-ml/"
    },
    {
      id: 2,
      name: "SKIN1004 Madagascar Centella Probio-Cica Intensive Ampoule 1.5 ml",
      brand: "SKIN1004",
      image: "https://kcbazar.com/wp-content/uploads/2025/05/SKIN1004-Madagascar-Centella-Probio-Cica-Intensive-Ampoule-1.5-ml-2-1-1024x1024.jpg",
      regularPrice: "৩০",
      salePrice: "২৭",
      discount: "11%",
      link: "https://kcbazar.com/product/skin1004-madagascar-centella-probio-cica-intensive-ampoule-1-5-ml/"
    },
    {
      id: 3,
      name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF 50+ PA++++ 1.5 ml",
      brand: "SKIN1004",
      image: "https://kcbazar.com/wp-content/uploads/2025/05/SKIN1004-Madagascar-Centella-Hyalu-Cica-Water-Fit-Sun-Serum-SPF-50-PA-1.5-ml-2-1-1024x1024.jpg",
      regularPrice: "৩০",
      salePrice: "২৭",
      discount: "11%",
      link: "https://kcbazar.com/product/skin1004-madagascar-centella-hyalu-cica-water-fit-sun-serum-spf-50-pa-1-5-ml/"
    },
    {
      id: 4,
      name: "SKIN1004 Madagascar Centella Tone Brightening Tone-Up Sunscreen SPF 50+ PA++++ 1.5 ml",
      brand: "SKIN1004",
      image: "https://kcbazar.com/wp-content/uploads/2025/05/SKIN1004-Madagascar-Centella-Tone-Brightening-Tone-Up-Sunscreen-SPF-50-PA-1.5-ml-2-1-1024x1024.jpg",
      regularPrice: "৩০",
      salePrice: "২৭",
      discount: "11%",
      link: "https://kcbazar.com/product/skin1004-madagascar-centella-tone-brightening-tone-up-sunscreen-spf-50-pa-1-5-ml/"
    },
    {
      id: 5,
      name: "CosRx Advanced Snail 96 Mucin Power Essence 100ml",
      brand: "CosRx",
      image: "https://kcbazar.com/wp-content/uploads/2023/07/2-CosRx_Products_banner_440px_X_255px.png",
      regularPrice: "১,৩৫০",
      salePrice: "১,২০০",
      discount: "11%",
      link: "https://kcbazar.com/brand/cosrx/?orderby=popularity"
    },
    {
      id: 6,
      name: "Dabo All In One Black Snail Repair Cream",
      brand: "Dabo",
      image: "https://kcbazar.com/wp-content/uploads/2025/07/Dabo-Home-page-snail-banner-1.jpg",
      regularPrice: "৯৫০",
      salePrice: "৮৪৬",
      discount: "11%",
      link: "https://kcbazar.com/product/dabo-all-in-one-black-snail-repair-cream/"
    },
    {
      id: 7,
      name: "Anua Heartleaf 77% Soothing Toner 250ml",
      brand: "Anua",
      image: "https://kcbazar.com/wp-content/uploads/2025/05/SKIN1004-Madagascar-Centella-Tone-Brightening-Tone-Up-Sunscreen-SPF-50-PA-1.5-ml-2-1-1024x1024.jpg",
      regularPrice: "২,৫০০",
      salePrice: "২,২০০",
      discount: "11%",
      link: "https://kcbazar.com/attribute/brand/anua/"
    },
    {
      id: 8,
      name: "Some By Mi AHA BHA PHA 30 Days Miracle Toner 150ml",
      brand: "Some By Mi",
      image: "https://kcbazar.com/wp-content/uploads/2023/07/2-CosRx_Products_banner_440px_X_255px.png",
      regularPrice: "২,০০০",
      salePrice: "১,৮০০",
      discount: "11%",
      link: "https://kcbazar.com/attribute/brand/some-by-mi/"
    }
  ];

  return (
    <div className="bg-white pb-10">

      {/* ── Single Containerized Banner ── */}
      <div className="max-w-[1320px] mx-auto px-4 my-4">
        <div className="rounded-xl overflow-hidden shadow-sm">
          <a href="https://kcbazar.com/shop/">
            <img
              src="https://kcbazar.com/wp-content/uploads/2026/03/kcbazar__Homepage___1st_Banner_PC_.jpg"
              alt="KCBazar Homepage Banner"
              className="w-full block hover:scale-[1.01] transition-transform duration-[2s]"
            />
          </a>
        </div>
      </div>

      {/* ── Second Slider + Side Banners ── */}
      <section className="py-4">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-auto overflow-hidden">
            {/* Left Column: 1st row of 2 side-by-side banners */}
            <div className="flex gap-3 h-auto md:h-[300px]">
              <div className="flex-1 overflow-hidden rounded-xl h-full shadow-sm">
                <a href="https://kcbazar.com/showrooms/">
                  <img
                    src="https://kcbazar.com/wp-content/uploads/2026/03/drop-your-CV-Home-2nd-hero-bannar-1.jpg"
                    alt="KCBazar Showroom"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </a>
              </div>
              <a href="https://kcbazar.com/content-partnership-guidelines/" className="flex-1 overflow-hidden rounded-xl h-full shadow-sm">
                <img
                  src="https://kcbazar.com/wp-content/uploads/2026/03/Create-content-and-earn-Home-2nd-hero-bannar.jpg"
                  alt="Create Content & Earn"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </a>
            </div>

            {/* Right Column: 1 tall banner */}
            <div className="h-auto md:h-[300px]">
              <a href="https://kcbazar.com/career/" className="block w-full h-full overflow-hidden rounded-xl shadow-sm">
                <img
                  src="https://kcbazar.com/wp-content/uploads/2026/03/Home-2nd-hero-slider-1-PC-showroom.jpg"
                  alt="Drop Your CV - Career"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Top Categories ── */}
      <section className="py-8">
        <div className="max-w-[1320px] mx-auto px-4">
          <h2 className="text-[22px] font-bold text-[#111827] mb-5">Top Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <a key={idx} href={cat.link} className="flex flex-col items-center gap-2.5 text-center bg-white p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 group border border-gray-50 hover:border-[#FF4D6D]/10">
                <div className="w-full h-[150px] rounded-xl overflow-hidden bg-[#f9f9f9]">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <p className="text-sm font-semibold text-[#333] group-hover:text-[#FF4D6D] transition-colors">{cat.name}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promo Banners Row ── */}
      <section className="py-5">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {promoBanners.map((banner, idx) => (
              <a key={idx} href={banner.link} className="rounded-xl overflow-hidden shadow-sm group">
                <img src={banner.image} alt={banner.alt} className="w-full block transition-opacity duration-300 group-hover:opacity-85" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CosRx Brand Section ── */}
      <section className="py-8">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-8 bg-[#fef4f6] rounded-[20px] p-6 sm:p-10 shadow-sm">
            <div className="overflow-hidden rounded-xl">
              <img
                src="https://kcbazar.com/wp-content/uploads/2023/07/2-CosRx_Products_banner_440px_X_255px.png"
                alt="CosRx Products"
                className="w-full rounded-xl hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-[28px] font-extrabold text-[#111]">CosRx</h3>
              <p className="text-[15px] text-[#555] max-w-[400px]">
                CosRx is a Korean skincare Brand offering gentle and effective products for clear, healthy skin.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <a href="https://kcbazar.com/product-category/skin-care/skin-care-solution/cleanser/?filter_brand=cosrx" className="px-3.5 py-1.5 bg-white border border-[#eee] rounded-[20px] text-[13px] font-medium transition-all hover:bg-[#FF4D6D] hover:text-white">Cleanser</a>
                <a href="https://kcbazar.com/product-category/skin-care/skin-care-solution/sun-cream/?filter_brand=cosrx" className="px-3.5 py-1.5 bg-white border border-[#eee] rounded-[20px] text-[13px] font-medium transition-all hover:bg-[#FF4D6D] hover:text-white">Sun Cream</a>
                <a href="https://kcbazar.com/product-category/skin-care/skin-care-solution/toner/?filter_brand=cosrx" className="px-3.5 py-1.5 bg-white border border-[#eee] rounded-[20px] text-[13px] font-medium transition-all hover:bg-[#FF4D6D] hover:text-white">Toner</a>
                <a href="https://kcbazar.com/product-category/skin-care/cream/moisturizer/?filter_brand=cosrx" className="px-3.5 py-1.5 bg-white border border-[#eee] rounded-[20px] text-[13px] font-medium transition-all hover:bg-[#FF4D6D] hover:text-white">Moisturizer</a>
              </div>
              <a href="https://kcbazar.com/brand/cosrx/?orderby=popularity&stock_status=instock" className="mt-2.5 inline-block px-6 py-3 bg-[#FF4D6D] text-white rounded-lg font-bold w-fit hover:brightness-110 active:scale-95 transition-all">
                Buy CosRx Products →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bestselling Products ── */}
      <section className="py-8">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[22px] font-bold text-[#111827]">Bestselling</h2>
            <a href="https://kcbazar.com/shop/?orderby=popularity" className="text-sm font-semibold text-[#FF4D6D] hover:underline">
              More Products →
            </a>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <a key={product.id} href={product.link} className="bg-white border border-[#efefef] rounded-xl overflow-hidden transition-all duration-300 flex flex-col hover:-translate-y-1.5 hover:shadow-xl group border-transparent hover:border-[#FF4D6D]/10 relative">
                  <div className="relative aspect-square bg-[#f9f9f9] overflow-hidden">
                    <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded z-[2] shadow-sm">{product.discount}</span>
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain p-2.5 transition-transform duration-700 group-hover:scale-110" />
                    
                    {/* Add to Cart Hover Button */}
                    <button className="absolute bottom-0 left-0 w-full bg-[#FF4D6D] text-white py-3 font-bold text-sm opacity-0 translate-y-full transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 z-[5] active:bg-[#e64462]">
                      Add to cart
                    </button>

                    <div className="absolute top-2.5 right-2.5 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2.5 transition-all duration-300 z-10">
                      <button className="w-9 h-9 rounded-full bg-white border border-[#eee] flex items-center justify-center text-[#333] transition-all hover:bg-[#FF4D6D] hover:text-white shadow-md" aria-label="Add to cart" title="Add to cart">
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                      </button>
                      <button className="w-9 h-9 rounded-full bg-white border border-[#eee] flex items-center justify-center text-[#333] transition-all hover:bg-[#FF4D6D] hover:text-white shadow-md" aria-label="Quick view" title="Quick view">
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                <div className="p-4 flex flex-col gap-1.5 flex-grow">
                  <p className="text-[11px] text-[#999] font-bold uppercase">{product.brand}</p>
                  <h3 className="text-sm font-semibold text-[#333] h-10 overflow-hidden line-clamp-2 leading-tight group-hover:text-[#FF4D6D] transition-colors">{product.name}</h3>
                  <div className="flex gap-2 items-center mt-1">
                    <span className="text-[12px] text-[#bbb] line-through">৳ {product.regularPrice}</span>
                    <span className="text-[16px] text-[#FF4D6D] font-extrabold">৳ {product.salePrice}</span>
                  </div>
                  <p className="text-[11px] text-[#00A86B] font-bold mt-auto pt-2 border-t border-gray-50 uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#00A86B] rounded-full"></span> In stock
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Products;

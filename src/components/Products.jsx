import React from 'react';
import Link from 'next/link';
import ProductSlider from './ProductSlider';

const Products = () => {

  const categories = [
    {
      name: "Skin Care",
      image: "https://kcbazar.com/wp-content/uploads/2025/06/Skin-Care-300x300.jpg",
      link: "/product-category/skin-care/"
    },
    {
      name: "Makeup",
      image: "https://kcbazar.com/wp-content/uploads/2026/02/makeup-300x300.jpeg",
      link: "/product-category/make-up/"
    },
    {
      name: "Lip Care",
      image: "https://kcbazar.com/wp-content/uploads/2025/06/lip-care-300x300.jpg",
      link: "/product-category/hair-eye-lip-care/lip-care/"
    },
    {
      name: "Hair Care",
      image: "https://kcbazar.com/wp-content/uploads/2025/06/Hair-Care-300x300.jpg",
      link: "/product-category/hair-eye-lip-care/hair-care/"
    },
    {
      name: "Combo Set",
      image: "https://kcbazar.com/wp-content/uploads/2025/11/combo-set-300x300.jpg",
      link: "/product-category/combo-set/"
    },
    {
      name: "Body Care",
      image: "https://kcbazar.com/wp-content/uploads/2025/06/body-care-300x300.jpg",
      link: "/product-category/body-hand-foot-care/body-care/"
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
      link: "/product/1"
    },
    {
      id: 2,
      name: "SKIN1004 Madagascar Centella Probio-Cica Intensive Ampoule 1.5 ml",
      brand: "SKIN1004",
      image: "https://kcbazar.com/wp-content/uploads/2025/05/SKIN1004-Madagascar-Centella-Probio-Cica-Intensive-Ampoule-1.5-ml-2-1-1024x1024.jpg",
      regularPrice: "৩০",
      salePrice: "২৭",
      discount: "11%",
      link: "/product/2"
    },
    {
      id: 3,
      name: "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF 50+ PA++++ 1.5 ml",
      brand: "SKIN1004",
      image: "https://kcbazar.com/wp-content/uploads/2025/05/SKIN1004-Madagascar-Centella-Hyalu-Cica-Water-Fit-Sun-Serum-SPF-50-PA-1.5-ml-2-1-1024x1024.jpg",
      regularPrice: "৩০",
      salePrice: "২৭",
      discount: "11%",
      link: "/product/3"
    },
    {
      id: 4,
      name: "SKIN1004 Madagascar Centella Tone Brightening Tone-Up Sunscreen SPF 50+ PA++++ 1.5 ml",
      brand: "SKIN1004",
      image: "https://kcbazar.com/wp-content/uploads/2025/05/SKIN1004-Madagascar-Centella-Tone-Brightening-Tone-Up-Sunscreen-SPF-50-PA-1.5-ml-2-1-1024x1024.jpg",
      regularPrice: "৩০",
      salePrice: "২৭",
      discount: "11%",
      link: "/product/4"
    },
    {
      id: 5,
      name: "CosRx Advanced Snail 96 Mucin Power Essence 100ml",
      brand: "CosRx",
      image: "https://kcbazar.com/wp-content/uploads/2023/07/2-CosRx_Products_banner_440px_X_255px.png",
      regularPrice: "১,৩৫০",
      salePrice: "১,২০০",
      discount: "11%",
      link: "/product/5"
    },
    {
      id: 6,
      name: "Dabo All In One Black Snail Repair Cream",
      brand: "Dabo",
      image: "https://kcbazar.com/wp-content/uploads/2025/07/Dabo-Home-page-snail-banner-1.jpg",
      regularPrice: "৯৫০",
      salePrice: "৮৪৬",
      discount: "11%",
      link: "/product/6"
    },
    {
      id: 7,
      name: "Anua Heartleaf 77% Soothing Toner 250ml",
      brand: "Anua",
      image: "https://kcbazar.com/wp-content/uploads/2025/05/SKIN1004-Madagascar-Centella-Tone-Brightening-Tone-Up-Sunscreen-SPF-50-PA-1.5-ml-2-1-1024x1024.jpg",
      regularPrice: "২,৫০০",
      salePrice: "২,২০০",
      discount: "11%",
      link: "/product/7"
    },
    {
      id: 8,
      name: "Some By Mi AHA BHA PHA 30 Days Miracle Toner 150ml",
      brand: "Some By Mi",
      image: "https://kcbazar.com/wp-content/uploads/2023/07/2-CosRx_Products_banner_440px_X_255px.png",
      regularPrice: "২,০০০",
      salePrice: "১,৮০০",
      discount: "11%",
      link: "/product/8"
    }
  ];

  return (
    <div className="bg-white pb-10">

      {/* ── Single Containerized Banner ── */}
      <div className="max-w-[1320px] mx-auto px-4 my-4">
        <div className="rounded-xl overflow-hidden shadow-sm">
          <Link href="/shop/">
            <img
              src="https://kcbazar.com/wp-content/uploads/2026/03/kcbazar__Homepage___1st_Banner_PC_.jpg"
              alt="KCBazar Homepage Banner"
              className="w-full block hover:scale-[1.01] transition-transform duration-[2s]"
            />
          </Link>
        </div>
      </div>

      {/* ── Second Slider + Side Banners ── */}
      <section className="py-4">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 h-auto overflow-hidden">
            {/* Left Column: 1st row of 2 side-by-side banners */}
            <div className="flex gap-3 h-auto md:h-[300px]">
              <div className="flex-1 overflow-hidden rounded-xl h-full shadow-sm">
                <Link href="/showrooms/">
                  <img
                    src="https://kcbazar.com/wp-content/uploads/2026/03/drop-your-CV-Home-2nd-hero-bannar-1.jpg"
                    alt="KCBazar Showroom"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>
              </div>
              <Link href="/content-partnership-guidelines/" className="flex-1 overflow-hidden rounded-xl h-full shadow-sm">
                <img
                  src="https://kcbazar.com/wp-content/uploads/2026/03/Create-content-and-earn-Home-2nd-hero-bannar.jpg"
                  alt="Create Content & Earn"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>
            </div>

            {/* Right Column: 1 tall banner */}
            <div className="h-auto md:h-[300px]">
              <Link href="/career/" className="block w-full h-full overflow-hidden rounded-xl shadow-sm">
                <img
                  src="https://kcbazar.com/wp-content/uploads/2026/03/Home-2nd-hero-slider-1-PC-showroom.jpg"
                  alt="Drop Your CV - Career"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </Link>
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
              <Link key={idx} href={cat.link} className="flex flex-col items-center gap-2.5 text-center bg-white p-4 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 group border border-gray-50 hover:border-[#FF4D6D]/10">
                <div className="w-full h-[150px] rounded-xl overflow-hidden bg-[#f9f9f9]">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <p className="text-sm font-semibold text-[#333] group-hover:text-[#FF4D6D] transition-colors">{cat.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promo Banners Row ── */}
      <section className="py-5">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {promoBanners.map((banner, idx) => (
              <Link key={idx} href={banner.link} className="rounded-xl overflow-hidden shadow-sm group">
                <img src={banner.image} alt={banner.alt} className="w-full block transition-opacity duration-300 group-hover:opacity-85" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bestselling Section (Slider) ── */}
      <ProductSlider title="Bestselling" products={products} viewAllLink="/shop/?orderby=popularity" />

      {/* ── Newest Arrivals Section (Slider) ── */}
      <ProductSlider title="Newest Arrival" products={[...products].reverse()} viewAllLink="/shop/?orderby=date" />

      {/* ── Best Deals Section (Slider) ── */}
      <ProductSlider title="Best Deals" products={[...products].sort(() => Math.random() - 0.5)} viewAllLink="/shop/?on_sale=true" />

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
                <Link href="/shop/?filter_brand=cosrx" className="px-3.5 py-1.5 bg-white border border-[#eee] rounded-[20px] text-[13px] font-medium transition-all hover:bg-[#FF4D6D] hover:text-white">Cleanser</Link>
                <Link href="/shop/?filter_brand=cosrx" className="px-3.5 py-1.5 bg-white border border-[#eee] rounded-[20px] text-[13px] font-medium transition-all hover:bg-[#FF4D6D] hover:text-white">Sun Cream</Link>
                <Link href="/shop/?filter_brand=cosrx" className="px-3.5 py-1.5 bg-white border border-[#eee] rounded-[20px] text-[13px] font-medium transition-all hover:bg-[#FF4D6D] hover:text-white">Toner</Link>
                <Link href="/shop/?filter_brand=cosrx" className="px-3.5 py-1.5 bg-white border border-[#eee] rounded-[20px] text-[13px] font-medium transition-all hover:bg-[#FF4D6D] hover:text-white">Moisturizer</Link>
              </div>
              <Link href="/brand/cosrx/?orderby=popularity&stock_status=instock" className="mt-2.5 inline-block px-6 py-3 bg-[#FF4D6D] text-white rounded-lg font-bold w-fit hover:brightness-110 active:scale-95 transition-all">
                Buy CosRx Products →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Products;

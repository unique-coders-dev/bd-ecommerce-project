import React from 'react';
import Link from 'next/link';
import ProductSlider from './ProductSlider';
import { HomeBanners } from './HomeBanners';
import CategorySlider from './CategorySlider';

const Products = () => {





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
    <div className="bg-white pb-10 kb-products-container">

      {/* ── Dynamic Top Categories Slider ── */}
      <CategorySlider />

      {/* ── Dynamic Promo Banners (Admin controlled) ── */}
      <HomeBanners position="post-category" />

      {/* ── Bestselling Section (Slider) ── */}
      <ProductSlider title="Bestselling" products={products} viewAllLink="/shop/?orderby=popularity" />

      {/* ── Newest Arrivals Section (Slider) ── */}
      <ProductSlider title="Newest Arrival" products={[...products].reverse()} viewAllLink="/shop/?orderby=date" />

      {/* ── Best Deals Section (Slider) ── */}
      <ProductSlider title="Best Deals" products={[...products].sort(() => Math.random() - 0.5)} viewAllLink="/shop/?on_sale=true" />

      <section className="py-8">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-8 bg-primary-light rounded-[32px] p-6 sm:p-12 shadow-sm border border-primary/10">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://kcbazar.com/wp-content/uploads/2023/07/2-CosRx_Products_banner_440px_X_255px.png"
                alt="CosRx Products"
                className="w-full rounded-2xl hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex flex-col gap-5">
              <div className="w-12 h-1 bg-primary rounded-full mb-2"></div>
              <h3 className="text-[32px] font-black text-[#111] uppercase tracking-tighter italic">CosRx Collection</h3>
              <p className="text-[15px] text-gray-600 font-medium leading-relaxed max-w-[450px]">
                CosRx is a world-renowned Korean skincare Brand offering gentle and effective solutions for clear, healthy, and radiant skin.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {['Cleanser', 'Sun Cream', 'Toner', 'Moisturizer'].map((tag) => (
                    <Link key={tag} href="/shop/?filter_brand=cosrx" className="px-5 py-2 bg-white border border-gray-100 rounded-full text-[13px] font-black uppercase tracking-wider text-gray-400 transition-all hover:bg-primary-soft hover:text-primary hover:border-primary-soft">
                        {tag}
                    </Link>
                ))}
              </div>
              <Link href="/brand/cosrx/?orderby=popularity&stock_status=instock" className="mt-4 flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-primary/20 group hover:bg-primary-soft hover:text-primary active:scale-95 transition-all w-fit">
                Explore All Products
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Products;

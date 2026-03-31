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
    <div className="products-wrapper">

      {/* ── Single Containerized Banner ── */}
      <div className="section-container" style={{ margin: '16px auto' }}>
        <div className="full-banner-wrap" style={{ borderRadius: '12px', overflow: 'hidden' }}>
          <a href="https://kcbazar.com/shop/">
            <img
              src="https://kcbazar.com/wp-content/uploads/2026/03/kcbazar__Homepage___1st_Banner_PC_.jpg"
              alt="KCBazar Homepage Banner"
              className="full-banner-img"
            />
          </a>
        </div>
      </div>

      {/* ── Second Slider + Side Banners ── */}
      <section className="second-hero-section">
        <div className="section-container">
          <div className="second-hero-inner">
            {/* Left Column: 1st row of 2 side-by-side banners */}
            <div className="second-hero-left">
              <div className="second-slider-wrap">
                <a href="https://kcbazar.com/showrooms/">
                  <img
                    src="https://kcbazar.com/wp-content/uploads/2026/03/drop-your-CV-Home-2nd-hero-bannar-1.jpg"
                    alt="KCBazar Showroom"
                    className="second-hero-img"
                  />
                </a>
              </div>
              <a href="https://kcbazar.com/content-partnership-guidelines/" className="tall-banner-link">
                <img
                  src="https://kcbazar.com/wp-content/uploads/2026/03/Create-content-and-earn-Home-2nd-hero-bannar.jpg"
                  alt="Create Content & Earn"
                  className="second-hero-img"
                />
              </a>
            </div>

            {/* Right Column: 1 tall banner */}
            <div className="second-hero-right">
              <a href="https://kcbazar.com/career/" className="tall-banner-link">
                <img
                  src="https://kcbazar.com/wp-content/uploads/2026/03/Home-2nd-hero-slider-1-PC-showroom.jpg"
                  alt="Drop Your CV - Career"
                  className="second-hero-img"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Top Categories ── */}
      <section className="categories-section">
        <div className="section-container">
          <h2 className="section-title">Top Categories</h2>
          <div className="categories-grid">
            {categories.map((cat, idx) => (
              <a key={idx} href={cat.link} className="category-card">
                <div className="cat-img-wrap">
                  <img src={cat.image} alt={cat.name} className="cat-img" />
                </div>
                <p className="cat-name">{cat.name}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promo Banners Row ── */}
      <section className="promo-banners-section">
        <div className="section-container">
          <div className="promo-banners-grid">
            {promoBanners.map((banner, idx) => (
              <a key={idx} href={banner.link} className="promo-banner-item">
                <img src={banner.image} alt={banner.alt} className="promo-banner-img" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CosRx Brand Section ── */}
      <section className="cosrx-section">
        <div className="section-container">
          <div className="cosrx-grid">
            <div className="cosrx-image">
              <img
                src="https://kcbazar.com/wp-content/uploads/2023/07/2-CosRx_Products_banner_440px_X_255px.png"
                alt="CosRx Products"
                className="cosrx-img"
              />
            </div>
            <div className="cosrx-content">
              <h3 className="cosrx-title">CosRx</h3>
              <p className="cosrx-desc">
                CosRx is a Korean skincare Brand offering gentle and effective products for clear, healthy skin.
              </p>
              <div className="cosrx-btns">
                <a href="https://kcbazar.com/product-category/skin-care/skin-care-solution/cleanser/?filter_brand=cosrx" className="cosrx-tag-btn">Cleanser</a>
                <a href="https://kcbazar.com/product-category/skin-care/skin-care-solution/sun-cream/?filter_brand=cosrx" className="cosrx-tag-btn">Sun Cream</a>
                <a href="https://kcbazar.com/product-category/skin-care/skin-care-solution/toner/?filter_brand=cosrx" className="cosrx-tag-btn">Toner</a>
                <a href="https://kcbazar.com/product-category/skin-care/cream/moisturizer/?filter_brand=cosrx" className="cosrx-tag-btn">Moisturizer</a>
              </div>
              <a href="https://kcbazar.com/brand/cosrx/?orderby=popularity&stock_status=instock" className="cosrx-main-btn">
                Buy CosRx Products →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bestselling Products ── */}
      <section className="bestselling-section">
        <div className="section-container">
          <div className="bestselling-header">
            <h2 className="section-title">Bestselling</h2>
            <a href="https://kcbazar.com/shop/?orderby=popularity" className="view-more-link">
              More Products →
            </a>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <a key={product.id} href={product.link} className="product-card">
                  <div className="product-img-wrap">
                    <span className="product-badge">{product.discount}</span>
                    <img src={product.image} alt={product.name} className="product-img" />
                    
                    {/* Add to Cart Hover Button */}
                    <button className="hover-add-cart-btn">Add to cart</button>

                    <div className="product-actions">
                      <button className="action-circle-btn" aria-label="Add to cart" title="Add to cart">
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                      </button>
                      <button className="action-circle-btn" aria-label="Quick view" title="Quick view">
                        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                <div className="product-info">
                  <p className="product-brand">{product.brand}</p>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    <span className="price-regular">৳ {product.regularPrice}</span>
                    <span className="price-sale">৳ {product.salePrice}</span>
                  </div>
                  <p className="product-stock">In stock</p>
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

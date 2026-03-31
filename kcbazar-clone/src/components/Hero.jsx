import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      desktop: "https://kcbazar.com/wp-content/uploads/2026/03/eid-salami-SLIDER-PC.jpg",
      mobile: "https://kcbazar.com/wp-content/uploads/2026/03/eid-salami-SLIDER-PHONE.jpg",
      link: "https://kcbazar.com/clearance-sale/"
    },
    {
      desktop: "https://kcbazar.com/wp-content/uploads/2026/01/Clearance-sale-PC.jpg",
      mobile: "https://kcbazar.com/wp-content/uploads/2026/01/Clearance-sale-MOBILE.jpg",
      link: "https://kcbazar.com/clearance-sale/"
    },
    {
      desktop: "https://kcbazar.com/wp-content/uploads/2025/10/desktop-slider-free-home-delivery-2121tk.jpg",
      mobile: "https://kcbazar.com/wp-content/uploads/2025/10/Mobile-slider-free-home-delivery-2121tk.jpg",
      link: "https://kcbazar.com/shop/?stock_status=instock"
    },
    {
      desktop: "https://kcbazar.com/wp-content/uploads/2025/12/body-lotion-offer-slider.jpg",
      mobile: "https://kcbazar.com/wp-content/uploads/2025/12/body-lotion-offer-slider.jpg",
      link: "https://kcbazar.com/product-category/body-hand-foot-care/body-care/body-lotion/?stock_status=instock,onsale"
    },
    {
      desktop: "https://kcbazar.com/wp-content/uploads/2025/11/Emi-Slider-pc.jpg",
      mobile: "https://kcbazar.com/wp-content/uploads/2025/11/Emi-Slider-mobile.jpg",
      link: "https://kcbazar.com/emi-details/"
    },
    {
      desktop: "https://kcbazar.com/wp-content/uploads/2025/02/daraz-slider-pc.jpg",
      mobile: "https://kcbazar.com/wp-content/uploads/2025/02/daraz-slider-mobile.jpg",
      link: "https://www.daraz.com.bd/shop/kc-bazar"
    }
  ];

  const promoCards = [
    {
      brand: "Raip",
      label: "Authorized distributor",
      image: "https://kcbazar.com/wp-content/uploads/2025/10/raip-1st-position.jpg",
      link: "/attribute/brand/raip/"
    },
    {
      brand: "Nature Skin",
      label: "Authorized distributor",
      image: "https://kcbazar.com/wp-content/uploads/2025/11/nature-skin-banner-on-home-page.jpg",
      link: "/attribute/brand/nature-skin/"
    },
    {
      brand: "Dabo",
      label: "Authorized distributor",
      image: "https://kcbazar.com/wp-content/uploads/2025/10/dabo-3rd-position.jpg",
      link: "/attribute/brand/dabo/?orderby=date"
    },
    {
      brand: "Phytotree",
      label: "Authorized distributor",
      image: "https://kcbazar.com/wp-content/uploads/2025/07/Phytotree-1.jpg",
      link: "/attribute/brand/phytotree/"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-grid">

        {/* Left: Main Slider */}
        <div className="slider-wrapper">
          {slides.map((slide, index) => (
            <a
              key={index}
              href={slide.link}
              className={`slide-item ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.desktop})` }}
              aria-label={`Slide ${index + 1}`}
            />
          ))}

          {/* Dots */}
          <div className="slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`dot ${index === currentSlide ? 'dot-active' : ''}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            className="slider-arrow slider-arrow-left"
            onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            className="slider-arrow slider-arrow-right"
            onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>

        {/* Right: 2x2 Promo Cards */}
        <div className="promo-grid">
          {promoCards.map((card, idx) => (
            <a key={idx} href={card.link} className="promo-card">
              <img src={card.image} alt={card.brand} className="promo-card-img" />
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;

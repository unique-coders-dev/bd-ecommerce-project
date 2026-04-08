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
    <section className="py-4 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-[1320px] mx-auto px-4">

        {/* Left: Main Slider */}
        <div className="relative rounded-xl overflow-hidden h-[220px] sm:h-[300px] md:h-[420px] bg-[#eee]">
          {slides.map((slide, index) => (
            <a
              key={index}
              href={slide.link}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
              }`}
              style={{ backgroundImage: `url(${slide.desktop})` }}
              aria-label={`Slide ${index + 1}`}
            />
          ))}

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-[20]">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-[#FF4D6D] w-6' : 'bg-white/50 w-2'
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            className="absolute top-1/2 -translate-y-1/2 left-3 w-10 h-10 bg-white/70 hover:bg-white rounded-full z-10 flex items-center justify-center text-xl transition-all shadow-md"
            onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 right-3 w-10 h-10 bg-white/70 hover:bg-white rounded-full z-10 flex items-center justify-center text-xl transition-all shadow-md"
            onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>

        {/* Right: 2x2 Promo Cards */}
        <div className="grid grid-cols-2 gap-3">
          {promoCards.map((card, idx) => (
            <a key={idx} href={card.link} className="relative overflow-hidden rounded-xl block group">
              <img 
                src={card.image} 
                alt={card.brand} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;

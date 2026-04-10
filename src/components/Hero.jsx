"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      desktop: "https://kcbazar.com/wp-content/uploads/2026/03/eid-salami-SLIDER-PC.jpg",
      mobile: "https://kcbazar.com/wp-content/uploads/2026/03/eid-salami-SLIDER-PHONE.jpg",
      link: "/clearance-sale/"
    },
    {
      desktop: "https://kcbazar.com/wp-content/uploads/2026/01/Clearance-sale-PC.jpg",
      mobile: "https://kcbazar.com/wp-content/uploads/2026/01/Clearance-sale-MOBILE.jpg",
      link: "/clearance-sale/"
    },
    {
      desktop: "https://kcbazar.com/wp-content/uploads/2025/10/desktop-slider-free-home-delivery-2121tk.jpg",
      mobile: "https://kcbazar.com/wp-content/uploads/2025/10/Mobile-slider-free-home-delivery-2121tk.jpg",
      link: "/shop/?stock_status=instock"
    },
    {
      desktop: "https://kcbazar.com/wp-content/uploads/2025/12/body-lotion-offer-slider.jpg",
      mobile: "https://kcbazar.com/wp-content/uploads/2025/12/body-lotion-offer-slider.jpg",
      link: "/product-category/body-hand-foot-care/body-care/body-lotion/?stock_status=instock,onsale"
    },
    {
      desktop: "https://kcbazar.com/wp-content/uploads/2025/11/Emi-Slider-pc.jpg",
      mobile: "https://kcbazar.com/wp-content/uploads/2025/11/Emi-Slider-mobile.jpg",
      link: "/emi-details/"
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
  }, [slides.length]);

  return (
    <section className="py-2 bg-white">
      <div className="max-w-[1320px] mx-auto px-0 sm:px-4">
        
        {/* New Full Width Slider */}
        <div className="relative rounded-2xl overflow-hidden h-[180px] sm:h-[350px] md:h-[480px] bg-gray-50 shadow-sm group">
          {slides.map((slide, index) => (
            <Link
              key={index}
              href={slide.link}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 scale-100 z-[1]' : 'opacity-0 scale-105 z-0'
              }`}
            >
              {/* Desktop Image */}
              <img 
                src={slide.desktop} 
                alt={`Slide ${index}`} 
                className="w-full h-full object-cover hidden sm:block"
              />
              {/* Mobile Image */}
              <img 
                src={slide.mobile} 
                alt={`Slide ${index}`} 
                className="w-full h-full object-cover block sm:hidden"
              />
            </Link>
          ))}

          {/* Controls Overlay */}
          <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
            <button
              onClick={(e) => { e.preventDefault(); setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length); }}
              className="w-12 h-12 bg-white/90 hover:bg-[#FF4D6D] hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all pointer-events-auto transform hover:scale-110"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M15 19l-7-7 7-7"/></svg>
            </button>
            <button
              onClick={(e) => { e.preventDefault(); setCurrentSlide(prev => (prev + 1) % slides.length); }}
              className="w-12 h-12 bg-white/90 hover:bg-[#FF4D6D] hover:text-white rounded-full flex items-center justify-center shadow-lg transition-all pointer-events-auto transform hover:scale-110"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>

          {/* Modern Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-500 rounded-full h-1.5 ${
                  index === currentSlide ? 'bg-[#FF4D6D] w-8' : 'bg-gray-300 w-3 hover:bg-[#FF4D6D]/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Previous 2-column layout (Commented Out) */}
        {/* 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="relative rounded-xl overflow-hidden h-[220px] sm:h-[300px] md:h-[420px] bg-[#eee]">
            {slides.map((slide, index) => (
              <Link
                key={index}
                href={slide.link}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
                }`}
                style={{ backgroundImage: `url(${slide.desktop})` }}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-[20]">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentSlide ? 'bg-[#FF4D6D] w-6' : 'bg-white/50 w-2'
                  }`}
                />
              ))}
            </div>
            <button
              className="absolute top-1/2 -translate-y-1/2 left-3 w-10 h-10 bg-white/70 hover:bg-white rounded-full z-10 flex items-center justify-center text-xl shadow-md cursor-pointer"
              onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
            >‹</button>
            <button
              className="absolute top-1/2 -translate-y-1/2 right-3 w-10 h-10 bg-white/70 hover:bg-white rounded-full z-10 flex items-center justify-center text-xl shadow-md cursor-pointer"
              onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
            >›</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {promoCards.map((card, idx) => (
              <Link key={idx} href={card.link} className="relative overflow-hidden rounded-xl block group">
                <img src={card.image} alt={card.brand} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </Link>
            ))}
          </div>
        </div>
        */}
      </div>
    </section>
  );
};

export default Hero;

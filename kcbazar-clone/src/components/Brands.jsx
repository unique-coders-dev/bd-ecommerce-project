import React, { useState } from 'react';


const Brands = () => {
  const brands = [
    {
      name: "Anjo",
      logo: "https://kcbazar.com/wp-content/uploads/2023/06/Anjo-1.svg",
      link: "https://kcbazar.com/attribute/brand/anjo/"
    },
    {
      name: "Anua",
      logo: "https://kcbazar.com/wp-content/uploads/2024/07/anua.png",
      link: "https://kcbazar.com/attribute/brand/anua/"
    },
    {
      name: "Axis-Y",
      logo: "https://kcbazar.com/wp-content/uploads/2024/09/axis-y.png",
      link: "https://kcbazar.com/attribute/brand/axis-y/"
    },
    {
      name: "CosRx",
      logo: "https://kcbazar.com/wp-content/uploads/2023/06/cosrx-1.svg",
      link: "https://kcbazar.com/brand/cosrx/"
    },
    {
      name: "Dabo",
      logo: "https://kcbazar.com/wp-content/uploads/2023/06/Dabo-1.svg",
      link: "https://kcbazar.com/attribute/brand/dabo/"
    },
    {
      name: "Missha",
      logo: "https://kcbazar.com/wp-content/uploads/2023/06/missha-1.svg",
      link: "https://kcbazar.com/attribute/brand/missha/"
    },
    {
      name: "SKIN1004",
      logo: "https://kcbazar.com/wp-content/uploads/2024/06/skin1004.png",
      link: "https://kcbazar.com/attribute/brand/skin1004/"
    },
    {
      name: "Some By Mi",
      logo: "https://kcbazar.com/wp-content/uploads/2023/06/some-by-mi.svg",
      link: "https://kcbazar.com/attribute/brand/some-by-mi/"
    },
    {
      name: "Tonymoly",
      logo: "https://kcbazar.com/wp-content/uploads/2023/06/tonymoly.svg",
      link: "https://kcbazar.com/attribute/brand/tonymoly/"
    },
    {
      name: "Innisfree",
      logo: "https://kcbazar.com/wp-content/uploads/2023/06/Innisfree_Logo.png",
      link: "https://kcbazar.com/attribute/brand/innisfree/"
    },
    {
      name: "Etude House",
      logo: "https://kcbazar.com/wp-content/uploads/2023/06/etude-house.svg",
      link: "https://kcbazar.com/attribute/brand/etude-house/"
    },
    {
      name: "Nature Republic",
      logo: "https://kcbazar.com/wp-content/uploads/2023/06/nature-republic.svg",
      link: "https://kcbazar.com/attribute/brand/nature-republic/"
    },
  ];

  const brandNames = [
    "Dabo", "Anua", "Cosrx", "Missha", "Skin1004", "Some By Mi",
    "Tonymoly", "Innisfree", "Etude House", "Beauty Of Joseon",
    "Nature Republic", "Anjo", "Axis-Y", "Phytotree", "Raip",
    "Nature Skin", "Guerisson", "Round Lab", "Isntree", "Mixsoon"
  ];

  return (
    <section className="py-10">
      <div className="max-w-[1320px] mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[22px] font-bold text-[#111827]">Top Brands</h2>
          <a href="https://kcbazar.com/brand/" className="text-sm font-semibold text-[#FF4D6D] hover:underline">
            View All Brands →
          </a>
        </div>

        {/* Brand Logos Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {brands.map((brand, idx) => (
            <a key={idx} href={brand.link} className="h-20 bg-white border border-[#eee] rounded-lg flex items-center justify-center p-4 transition-transform duration-300 hover:scale-[1.05] shadow-sm group" title={brand.name}>
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;

import React from 'react';
import Link from 'next/link';

const Brands = () => {
  const brands = [
    {
      name: "Anjo",
      logo: "https://kcbazar.com/wp-content/uploads/2023/06/Anjo-1.svg",
      link: "/attribute/brand/anjo/"
    },
    {
      name: "Anua",
      logo: "https://kcbazar.com/wp-content/uploads/2024/07/anua.png",
      link: "/attribute/brand/anua/"
    },
    {
      name: "Axis-Y",
      logo: "https://kcbazar.com/wp-content/uploads/2024/09/axis-y.png",
      link: "/attribute/brand/axis-y/"
    },
    {
      name: "CosRx",
      logo: "https://kcbazar.com/wp-content/uploads/2023/06/cosrx-1.svg",
      link: "/brand/cosrx/"
    },
    {
      name: "Dabo",
      logo: "https://kcbazar.com/wp-content/uploads/2023/06/Dabo-1.svg",
      link: "/attribute/brand/dabo/"
    },
    {
      name: "Missha",
      logo: "https://kcbazar.com/wp-content/uploads/2023/06/missha-1.svg",
      link: "/attribute/brand/missha/"
    },
    {
      name: "SKIN1004",
      logo: "https://kcbazar.com/wp-content/uploads/2024/06/skin1004.png",
      link: "/attribute/brand/skin1004/"
    },
    {
      name: "Some By Mi",
      logo: "https://kcbazar.com/wp-content/uploads/2023/06/some-by-mi.svg",
      link: "/attribute/brand/some-by-mi/"
    },
    {
      name: "Tonymoly",
      logo: "https://kcbazar.com/wp-content/uploads/2023/06/tonymoly.svg",
      link: "/attribute/brand/tonymoly/"
    },
    {
      name: "Innisfree",
      logo: "https://kcbazar.com/wp-content/uploads/2023/06/Innisfree_Logo.png",
      link: "/attribute/brand/innisfree/"
    },
    {
      name: "Etude House",
      logo: "https://kcbazar.com/wp-content/uploads/2023/06/etude-house.svg",
      link: "/attribute/brand/etude-house/"
    },
    {
      name: "Nature Republic",
      logo: "https://kcbazar.com/wp-content/uploads/2023/06/nature-republic.svg",
      link: "/attribute/brand/nature-republic/"
    },
  ];

  return (
    <section className="py-10">
      <div className="max-w-[1320px] mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[22px] font-bold text-[#111827]">Top Brands</h2>
          <Link href="/brand/" className="text-sm font-semibold text-[#FF4D6D] hover:underline">
            View All Brands →
          </Link>
        </div>

        {/* Brand Logos Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {brands.map((brand, idx) => (
            <Link key={idx} href={brand.link} className="h-20 bg-white border border-[#eee] rounded-lg flex items-center justify-center p-4 transition-transform duration-300 hover:scale-[1.05] shadow-sm group" title={brand.name}>
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;

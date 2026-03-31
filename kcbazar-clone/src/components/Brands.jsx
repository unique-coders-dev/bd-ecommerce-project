import React, { useState } from 'react';

const BrandCard = ({ brand }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <a href={brand.link} className="brand-logo-card" title={brand.name}>
      {imgError ? (
        <span style={{ fontSize: 13, fontWeight: 700, color: '#888', textAlign: 'center', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.5px' }}>
          {brand.name}
        </span>
      ) : (
        <img
          src={brand.logo}
          alt={brand.name}
          className="brand-logo"
          onError={() => setImgError(true)}
        />
      )}
    </a>
  );
};

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
    <section className="brands-section">
      <div className="section-container">
        <div className="brands-header">
          <h2 className="section-title" style={{ marginBottom: 0 }}>Top Brands</h2>
          <a href="https://kcbazar.com/brand/" className="brands-link">
            View All Brands →
          </a>
        </div>

        {/* Brand Logos Grid */}
        <div className="brands-grid">
          {brands.map((brand, idx) => (
            <BrandCard key={idx} brand={brand} />
          ))}
        </div>

        {/* Brand Names Text Row Removed */}
      </div>
    </section>
  );
};

export default Brands;

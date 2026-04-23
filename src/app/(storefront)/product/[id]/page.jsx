"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';

const ProductDetails = () => {
  const params = useParams();
  const id = params.id;
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImage, setActiveImage] = useState(0);
  const [thumbStartIdx, setThumbStartIdx] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({});
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => setSettings(data));
  }, []);

  const product = {
    id: id || 21656,
    name: "Dabo Make Up Dark Out Tone Up Primer 30 ml",
    brand: "Dabo",
    brandLogo: "https://kcbazar.com/wp-content/uploads/2023/10/DABO-Logo.png",
    regularPrice: "1,250",
    salePrice: "1,050",
    discount: "16%",
    stockStatus: "In stock",
    sku: "8809173347077",
    category: "Primer",
    images: [
      "https://kcbazar.com/wp-content/uploads/2024/05/Dabo-Make-Up-Dark-Out-Tone-Up-Primer-30-ml-5.jpg",
      "https://kcbazar.com/wp-content/uploads/2024/05/Dabo-Make-Up-Dark-Out-Tone-Up-Primer-30-ml-2-1.jpg",
      "https://kcbazar.com/wp-content/uploads/2024/05/Dabo-Make-Up-Dark-Out-Tone-Up-Primer-30-ml-1-1.jpg",
      "https://kcbazar.com/wp-content/uploads/2024/05/Dabo-Make-Up-Dark-Out-Tone-Up-Primer-30-ml-3-1.jpg",
      "https://kcbazar.com/wp-content/uploads/2024/05/Dabo-Make-Up-Dark-Out-Tone-Up-Primer-30-ml-4.jpg",
      "https://kcbazar.com/wp-content/uploads/2024/05/Dabo-Make-Up-Dark-Out-Tone-Up-Primer-30-ml-2-1.jpg",
      "https://kcbazar.com/wp-content/uploads/2024/05/Dabo-Make-Up-Dark-Out-Tone-Up-Primer-30-ml-1-1.jpg",
      "https://kcbazar.com/wp-content/uploads/2024/05/Dabo-Make-Up-Dark-Out-Tone-Up-Primer-30-ml-3-1.jpg",
      "https://kcbazar.com/wp-content/uploads/2024/05/Dabo-Make-Up-Dark-Out-Tone-Up-Primer-30-ml-4.jpg"
    ],
    shortDescription: "Dabo Make Up Dark Out Tone Up Primer 30 ml contains natural ingredients that help brighten and even out skin tone. It provides a smooth base for makeup application while keeping the skin hydrated.",
    description: "Dabo Make Up Dark Out Tone Up Primer 30 ml contains natural ingredients that help brighten and even out skin tone. It provides a smooth base for makeup application while keeping the skin hydrated. Perfect for creating a flawless, long-lasting look.",
    additionalInfo: {
      "Weight": "0.03 kg",
      "Dimensions": "10 × 5 × 5 cm",
      "Brand": "Dabo",
      "Origin": "South Korea",
      "Volume": "30 ml"
    },
    ingredients: "Water, Cyclopentasilox.e, Cetyl Ethylhexanoate, Cyclohexasasiloxane, Methy|propanediol, PEG-10 Dimethicone, Titanium Dioxide, Glycerin, Niacinamide, Nylon-12 Dipropylene Glycol, Octyldodecanol. Caprylic/Capric Tiglyceride, Polymethy| Methacrylate, Panthenol, Magnesium Sulfate, Quaternium-18 Hectorite, Sorbitan Sesquioleate, Stearic Acid Trihydroxystearin, Dimethicone Crosspolymer, Ethylhexylglycerin. 1,2-Hexanediol, Phenoxyethanol, CaprylyI Glycol, Butylene Glycol, Fomes Officinalis (Mushroom) Extract, Allantoin, Tocopheryl Acetate Fragrance, Aluminum Hydroxide, Triethoxycaprylylsilane, Adenosine, CI 77491, Ultramarines, licium Verum (Anise) Fruit Extract, Disodium EDTA, Talc, Butylphenyl Methylpropional, Benzyl Benzoate, Camellia Sinensis Leaf Extract, Limonene, Portulaca Oleracea Extract, Aloe Barbadensis Leaf Extract, Dimethicone, Hamamelis Virginiana (Witch Hazel) Extract"
  };

  const relatedProducts = [
    {
      id: 12565,
      name: "Missha Magic Cushion Cover Lasting 15 g - N.23",
      brand: "Missha",
      image: "https://kcbazar.com/wp-content/uploads/2023/10/Missha-Magic-Cushion-Cover-Lasting-n_23-15-g2-1-1024x1024.png",
      salePrice: "750",
      regularPrice: "1,250",
      stockStatus: "1 in stock",
      sku: "8809747960910"
    },
    {
      id: 17657,
      name: "Missha Magic Cushion Moist Up 15 g - N.23",
      brand: "Missha",
      image: "https://kcbazar.com/wp-content/uploads/2024/02/Missha-Magic-Cushion-Moist-Up-15-g-N-4-1024x1024.jpg",
      salePrice: "1,200",
      stockStatus: "2 in stock",
      sku: "8809581449275"
    },
    {
      id: 20887,
      name: "Lebelage Collagen No Sebum Foundation SPF 50+ PA+++ 100 ml - 13",
      brand: "Lebelege",
      image: "https://kcbazar.com/wp-content/uploads/2024/04/Lebelage-Collagen-No-Sebum-Foundation-Spf-50-PA-3-1024x1024.jpg",
      salePrice: "1,080",
      stockStatus: "1 in stock",
      sku: "8809679092130"
    },
    {
      id: 20889,
      name: "Lebelage Collagen No Sebum Foundation SPF 50+ PA+++ 100 ml - 23",
      brand: "Lebelege",
      image: "https://kcbazar.com/wp-content/uploads/2024/04/Lebelage-Collagen-No-Sebum-Foundation-SPF-50-PA-100-ml-23-4-1024x1024.jpg",
      salePrice: "1,080",
      stockStatus: "In stock",
      sku: "8809679094271"
    }
  ];

  const handleQuantityChange = (type) => {
    if (type === 'increase') setQuantity(prev => prev + 1);
    else if (type === 'decrease' && quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({ backgroundPosition: `${x}% ${y}%` });
  };

  const handleThumbNext = () => setThumbStartIdx((prev) => (prev + 3 < product.images.length ? prev + 1 : prev));
  const handleThumbPrev = () => setThumbStartIdx((prev) => (prev > 0 ? prev - 1 : 0));

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'additional', label: 'Additional Information' },
    { id: 'reviews', label: 'Reviews (0)' },
    { id: 'shipping', label: 'Shipping & Delivery' },
    { id: 'uniqueness', label: 'Our Uniqueness' },
    { id: 'ingredients', label: 'Ingredients Details' }
  ];

  return (
    <div className="bg-[#f2f2f2] min-h-screen font-roboto w-full flex flex-col">
      {/* Breadcrumb Section */}
      <div className="w-full bg-white border-b border-[#e1e1e1] flex-shrink-0 relative z-[40]">
        <div className="max-w-[1320px] mx-auto px-4 py-3 flex items-center text-[13px] text-[#777] w-full">
          <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link>
          <span className="mx-2.5 text-gray-300">/</span>
          <Link href="/shop" className="hover:text-[var(--color-primary)] transition-colors">Shop</Link>
          <span className="mx-2.5 text-gray-300">/</span>
          <span className="text-[var(--color-primary)] font-bold">{product.name}</span>
        </div>
      </div>

      {/* Main Container Wrapper */}
      <div className="w-full max-w-[1320px] mx-auto px-4 flex-grow">

        {/* Main Product Info Block */}
        <section className="mt-5 mb-5 bg-white p-5 lg:p-10 rounded-xl shadow-sm border border-black/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

            {/* Left Col: Gallery */}
            <div className="flex flex-col-reverse md:flex-row gap-4 h-auto md:h-[500px]">
              {/* Thumbnails Sidebar with Arrows */}
              <div className="flex flex-row md:flex-col gap-2.5 w-full md:w-[80px] h-fit md:h-full flex-shrink-0 relative">
                {/* Prev Arrow */}
                <button 
                  onClick={handleThumbPrev}
                  disabled={thumbStartIdx === 0}
                  className="absolute -top-3 md:-top-4 left-0 md:left-1/2 md:-translate-x-1/2 z-10 w-7 h-7 md:w-8 md:h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-[var(--color-primary)] hover:shadow-md transition-all disabled:opacity-0 cursor-pointer shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4 rotate-[-90deg] md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 15l7-7 7 7"/></svg>
                </button>

                <div className="flex flex-row md:flex-col gap-2.5 w-full h-full overflow-hidden px-1 md:px-0 py-1 md:py-0">
                   {product.images.slice(thumbStartIdx, thumbStartIdx + 4).map((img, idx) => {
                     const actualIdx = thumbStartIdx + idx;
                     return (
                      <button
                        key={actualIdx}
                        className={`min-w-[70px] md:min-w-0 w-full aspect-square border-2 p-1 transition-all rounded-lg flex-shrink-0 bg-white cursor-pointer ${activeImage === actualIdx ? 'border-[var(--color-primary)] ring-2 ring-[var(--color-primary)]/10' : 'border-gray-100'}`}
                        onClick={() => setActiveImage(actualIdx)}
                      >
                        <img src={img} alt={`thumb-${actualIdx}`} className="w-full h-full object-contain" />
                      </button>
                     );
                   })}
                </div>

                {/* Next Arrow */}
                <button 
                  onClick={handleThumbNext}
                  disabled={thumbStartIdx + 4 >= product.images.length}
                  className="absolute -bottom-3 md:-bottom-4 right-0 md:left-1/2 md:-translate-x-1/2 z-10 w-7 h-7 md:w-8 md:h-8 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-[var(--color-primary)] hover:shadow-md transition-all disabled:opacity-0 cursor-pointer shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4 rotate-[-90deg] md:rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M19 9l-7 7-7-7"/></svg>
                </button>
              </div>

              {/* Main Image with Zoom */}
              <div
                className="flex-1 relative overflow-hidden bg-[#f9f9f9] border border-gray-100 rounded-xl flex items-center justify-center cursor-crosshair group h-[350px] md:h-full"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                style={isZooming ? {
                  backgroundImage: `url(${product.images[activeImage]})`,
                  backgroundSize: '220%',
                  backgroundRepeat: 'no-repeat',
                  ...zoomStyle
                } : {}}
              >
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className={`max-w-full max-h-full object-contain transition-all duration-300 p-8 ${isZooming ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}
                  loading="eager"
                />
                <div className="absolute top-4 left-4 bg-[var(--color-primary)] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase z-10 shadow-lg shadow-[var(--color-primary)]/20 animate-bounce">Sale!</div>
              </div>
            </div>

            {/* Right Col: Details */}
            <div className="flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-2">
                  <Link href="/brand/dabo" className="text-[11px] font-black uppercase text-[var(--color-primary)] tracking-[2px] hover:underline underline-offset-4">{product.brand}</Link>
                  <h1 className="text-2xl lg:text-4xl font-black text-[#111] leading-tight tracking-tight">{product.name}</h1>
                </div>
                {product.brandLogo && (
                  <div className="w-[70px] lg:w-[100px] ml-4 border border-gray-100 p-2 rounded-xl bg-white flex-shrink-0 shadow-sm transition-transform hover:rotate-3">
                    <img src={product.brandLogo} alt="brand" className="w-full h-auto" />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-xl lg:text-2xl text-gray-400 line-through decoration-[var(--color-primary)]/30 underline-offset-4 font-medium">৳ {product.regularPrice}</span>
                <span className="text-3xl lg:text-5xl font-black text-[var(--color-primary)] drop-shadow-sm">৳ {product.salePrice}</span>
                <span className="bg-[var(--color-primary-light)] text-[var(--color-primary)] text-[12px] font-black px-2.5 py-1 rounded-md border border-[var(--color-primary)]/10">-{product.discount} OFF</span>
              </div>

              <div className="text-sm lg:text-base text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-gray-100 pl-4 py-1 italic">{product.shortDescription}</div>

              <div className="flex flex-wrap items-center gap-4 mb-10">
                <div className="flex items-center border-2 border-gray-100 rounded-xl h-[56px] bg-white overflow-hidden focus-within:border-[var(--color-primary)]/30 transition-colors">
                  <button className="w-12 h-full flex items-center justify-center text-xl text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer group" onClick={() => handleQuantityChange('decrease')}>
                    <span className="group-active:scale-90 transition-transform">-</span>
                  </button>
                  <span className="w-12 text-center font-bold text-[#111] bg-gray-50/50 h-full flex items-center justify-center border-x-2 border-gray-100">{quantity}</span>
                  <button className="w-12 h-full flex items-center justify-center text-xl text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer group" onClick={() => handleQuantityChange('increase')}>
                    <span className="group-active:scale-95 transition-transform">+</span>
                  </button>
                </div>
                <button className="h-[56px] px-8 bg-[var(--color-primary)] text-white font-black rounded-xl hover:bg-[#e64462] transition-all uppercase text-sm tracking-widest active:scale-95 shadow-xl shadow-[var(--color-primary)]/20 cursor-pointer whitespace-nowrap flex-1 lg:flex-none">Add to cart</button>
                <button className="h-[56px] px-8 bg-[#111] text-white font-black rounded-xl hover:bg-black transition-all uppercase text-sm tracking-widest active:scale-95 shadow-xl shadow-black/10 cursor-pointer whitespace-nowrap flex-1 lg:flex-none">Buy Now</button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-10">
                {[
                  { text: "Imported product", color: "bg-blue-50 text-blue-600 border-blue-100" },
                  { text: "Free delivery", color: "bg-green-50 text-green-600 border-green-100" },
                  { text: "100% authentic", color: "bg-purple-50 text-purple-600 border-purple-100" },
                  { text: "2-3 Days Delivery", color: "bg-orange-50 text-orange-600 border-orange-100" }
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 border rounded-xl transition-all group cursor-default ${item.color}`}>
                    <img src="https://kcbazar.com/wp-content/uploads/2025/04/icons8-checkmark.svg" alt="check" className="w-5 h-5 group-hover:rotate-[360deg] transition-transform duration-500" />
                    <span className="text-[11px] font-black uppercase leading-none tracking-tight">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100 space-y-3.5 text-[13px]">
                <div className="flex gap-2"><span className="font-black text-[#111] uppercase w-[90px] shrink-0 text-[11px] tracking-widest">SKU:</span><span className="text-gray-500 font-bold">{product.sku}</span></div>
                <div className="flex gap-2"><span className="font-black text-[#111] uppercase w-[90px] shrink-0 text-[11px] tracking-widest">Category:</span><Link href="/shop" className="text-[var(--color-primary)] hover:underline underline-offset-4 transition-all font-black">{product.category}</Link></div>
                <div className="flex gap-2 pt-2 items-center">
                  <div className="flex gap-4">
                    <button className="text-gray-400 hover:text-[var(--color-primary)] text-lg transition-all hover:scale-125 cursor-pointer active:scale-90"><i className="fab fa-facebook"></i></button>
                    <button className="text-gray-400 hover:text-[var(--color-primary)] text-lg transition-all hover:scale-125 cursor-pointer active:scale-90"><i className="fab fa-instagram"></i></button>
                    <button className="text-gray-400 hover:text-[var(--color-primary)] text-lg transition-all hover:scale-125 cursor-pointer active:scale-90"><i className="fab fa-whatsapp"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabbed Info Section */}
        <section className="mt-5 mb-5 bg-white rounded-xl shadow-sm overflow-hidden border border-black/5">
          {/* Tab Selection Row */}
          <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar scroll-smooth px-4 lg:px-10 bg-gray-50/30">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`py-5 px-6 text-[11px] font-black uppercase tracking-[2px] transition-all whitespace-nowrap relative cursor-pointer active:translate-y-0.5 ${activeTab === tab.id ? 'text-[var(--color-primary)]' : 'text-gray-400 hover:text-gray-600'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--color-primary)] shadow-[0_-4px_10px_rgba(255,77,109,0.3)]"></div>
                )}
              </button>
            ))}
          </div>

          {/* Tab Content Display */}
          <div className="p-6 lg:p-12 text-gray-600 leading-relaxed text-sm">
            {activeTab === 'description' && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-xl lg:text-2xl font-black text-[#111] uppercase tracking-tighter">Product Overview</h3>
                <p className="font-black text-gray-800 text-[15px]">{product.name}</p>
                <div className="prose prose-pink max-w-none text-gray-500 font-medium leading-loose">
                  {product.description}
                </div>
              </div>
            )}

            {activeTab === 'additional' && (
              <div className="grid grid-cols-1 divide-y divide-gray-100 animate-fadeIn border border-gray-100 rounded-xl overflow-hidden shadow-inner">
                {Object.entries(product.additionalInfo).map(([label, value], i) => (
                  <div key={i} className="flex flex-col sm:flex-row py-4 px-6 items-start sm:items-center hover:bg-gray-50/50 transition-colors group">
                    <span className="w-full sm:w-[200px] font-black text-[#111] uppercase text-[10px] shrink-0 tracking-[2px] mb-2 sm:mb-0 group-hover:text-[var(--color-primary)] transition-colors">{label}</span>
                    <span className="font-bold text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="py-20 text-center flex flex-col items-center animate-fadeIn">
                <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 shadow-inner text-gray-200 rotate-12 transition-transform hover:rotate-0"><i className="far fa-comments text-3xl"></i></div>
                <p className="text-lg font-black text-[#111] mb-2 tracking-tight">QUIET BEFORE THE STORM</p>
                <p className="text-gray-400 font-medium mb-6">No reviews yet. Be the first to break the silence!</p>
                <button className="text-[var(--color-primary)] font-black uppercase text-[11px] tracking-[2px] py-3 px-8 rounded-full border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all cursor-pointer shadow-lg shadow-[var(--color-primary)]/10">Write a Review</button>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 animate-fadeIn">
                {[
                  { title: "SteadFast Courier", desc: "Reliable nationwide delivery to your doorstep", time: "2-3 Days", logo: "https://kcbazar.com/wp-content/uploads/2025/02/steadfast-logo.svg" },
                  { title: "Pathao Personal", desc: "On-demand hyper-fast metropolitan delivery", time: "1-2 Days", logo: "https://kcbazar.com/wp-content/uploads/2022/12/pathao-courier-48x24.jpg" },
                  { title: "Sundarban Express", desc: "Classic logistics for remote township delivery", time: "3-5 Days", logo: "https://kcbazar.com/wp-content/uploads/2022/12/scsLogo20-48x48.jpg" },
                  { title: "KC Home Delivery", desc: "Our premium white-glove delivery service", time: "Select Areas", logo: settings?.logoUrl || "https://kcbazar.com/wp-content/uploads/2025/08/KCB-LOGO-G.png" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 p-6 border border-gray-100 rounded-2xl items-center hover:shadow-xl hover:border-[var(--color-primary)]/10 transition-all bg-white group cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-primary)]/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150"></div>
                    <div className="w-16 h-16 shrink-0 border border-gray-50 rounded-2xl p-2 flex items-center justify-center bg-gray-50 shadow-inner overflow-hidden relative"><img src={item.logo} alt="logo" className="max-w-full max-h-full object-contain transition-transform group-hover:scale-110" /></div>
                    <div className="flex-1 relative">
                      <h4 className="font-black text-[#111] text-[15px] mb-0.5 group-hover:text-[var(--color-primary)] transition-colors">{item.title}</h4>
                      <p className="text-[12px] text-gray-400 mb-3 font-medium line-clamp-1">{item.desc}</p>
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest"><span className="text-[var(--color-primary)] border-b-2 border-transparent hover:border-[var(--color-primary)] transition-all">Pricing</span><span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-md">{item.time}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'uniqueness' && (
              <div className="animate-fadeIn">
                <div className="text-center mb-12">
                  <h3 className="text-2xl lg:text-4xl font-black text-[#111] mb-2 tracking-tighter uppercase">Authenticity First</h3>
                  <div className="w-20 h-1.5 bg-[var(--color-primary)] mx-auto rounded-full"></div>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {["Direct Korea Import", "No Local Sourcing", "No Middlemen Agents", "Showroom Experience", "Official Distribution Rights", "Rewards Program"].map((text, i) => (
                    <li key={i} className="flex flex-col gap-4 items-center text-center p-8 bg-gray-50/50 border border-gray-100 rounded-3xl hover:bg-white hover:shadow-2xl hover:border-[var(--color-primary)]/10 transition-all group scale-100 hover:scale-[1.02]">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center group-hover:bg-[var(--color-primary)] transition-all">
                        <img src="https://kcbazar.com/wp-content/uploads/2025/04/icons8-checkmark.svg" className="w-6 h-6 object-contain transition-transform group-hover:scale-110" alt="check" />
                      </div>
                      <span className="text-xs font-black text-[#111] uppercase tracking-[2px] leading-tight">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="bg-[#111] p-8 lg:p-12 rounded-3xl border-l-[12px] border-[var(--color-primary)] animate-fadeIn shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <h4 className="text-[var(--color-primary)] font-black text-[12px] tracking-[4px] uppercase mb-6 flex items-center gap-3">
                  <span className="w-8 h-[2px] bg-[var(--color-primary)]"></span> Chemical Composition
                </h4>
                <div className="text-sm lg:text-base text-gray-300 font-bold leading-loose tracking-wide">
                  {product.ingredients}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related Products Grid */}
        <section className="mt-16 mb-20">
          <div className="flex items-center justify-between mb-8 group">
            <div className="flex flex-col">
              <h4 className="text-2xl lg:text-3xl font-black text-[#111] uppercase tracking-tighter leading-none mb-2">You Might Also Love</h4>
              <div className="h-1.5 w-12 bg-[var(--color-primary)] rounded-full transition-all group-hover:w-24"></div>
            </div>
            <Link href="/shop" className="text-[11px] font-black uppercase text-[var(--color-primary)] tracking-widest hover:translate-x-2 transition-transform flex items-center gap-2">Explore Shop <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {relatedProducts.map(p => (<ProductCard key={p.id} product={p} />))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default ProductDetails;

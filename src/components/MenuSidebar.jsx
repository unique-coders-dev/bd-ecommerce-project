"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const MenuSidebar = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('categories'); // 'categories' or 'menus'
  const [drillDown, setDrillDown] = useState([]); // Stack of submenu objects

  const categories = [
    { name: "Skin Care", link: "/product-category/skin-care/", image: "https://kcbazar.com/wp-content/uploads/2025/06/Skin-Care-300x300.jpg" },
    { name: "Makeup", link: "/product-category/make-up/", image: "https://kcbazar.com/wp-content/uploads/2026/02/makeup-300x300.jpeg" },
    { name: "Lip Care", link: "/product-category/hair-eye-lip-care/lip-care/" },
    { name: "Hair Care", link: "/product-category/hair-eye-lip-care/hair-care/" },
    { name: "Combo Set", link: "/product-category/combo-set/" },
    { name: "Body Care", link: "/product-category/body-hand-foot-care/body-care/" },
  ];

  const menus = [
    { 
      label: 'Shop', 
      href: '/shop',
      submenus: [
        { label: 'All Products', href: '/shop' },
        { label: 'New Arrivals', href: '/new-arrivals' },
        { label: 'Best Sellers', href: '/best-sellers' },
      ]
    },
    { 
      label: 'Eid Offer', 
      href: '/clearance-sale/',
      submenus: [
        { label: 'Flash Sale', href: '/flash-sale' },
        { label: 'Combo Offers', href: '/combo-offers' },
      ]
    },
    { 
      label: 'Brands', 
      href: '/brand/',
      submenus: [
        { label: 'Missha', href: '/brand/missha' },
        { label: 'CosRx', href: '/brand/cosrx' },
        { label: 'Axis-Y', href: '/brand/axis-y' },
        { label: 'Dabo', href: '/brand/dabo' },
      ]
    },
    { label: 'Showrooms', href: '/showrooms/' },
    { label: 'Career', href: '/career/' },
  ];

  const handleMenuClick = (menu) => {
    if (menu.submenus) {
      setDrillDown([...drillDown, menu]);
    }
  };

  const handleBack = () => {
    const newDrillDown = [...drillDown];
    newDrillDown.pop();
    setDrillDown(newDrillDown);
  };

  const currentLevel = drillDown.length > 0 ? drillDown[drillDown.length - 1].submenus : (activeTab === 'categories' ? categories : menus);
  const currentTitle = drillDown.length > 0 ? drillDown[drillDown.length - 1].label : null;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 z-[3000] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => {
          onClose();
          setDrillDown([]);
        }}
      ></div>

      {/* Sidebar Content */}
      <div className={`fixed inset-y-0 left-0 z-[3001] w-full max-w-[320px] bg-white shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full relative overflow-hidden">
          
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <h2 className="text-lg font-black text-[#111] uppercase tracking-tighter">Menu</h2>
            <button 
              onClick={() => {
                onClose();
                setDrillDown([]);
              }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-[#111] transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          {/* Drill-down Submenu Container */}
          <div className={`absolute inset-0 top-[60px] bg-white z-20 transition-transform duration-300 ${drillDown.length > 0 ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full">
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 p-4 text-sm font-bold text-[#FF4D6D] border-b border-gray-50 bg-gray-50/50 hover:bg-[#fff0f3]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M15 19l-7-7 7-7"/></svg>
                Back to {drillDown.length > 1 ? drillDown[drillDown.length - 2].label : 'Main Menu'}
              </button>
              <div className="p-4 bg-[#FF4D6D] text-white font-black uppercase text-xs tracking-widest">
                {currentTitle}
              </div>
              <div className="flex-1 overflow-y-auto">
                {drillDown.length > 0 && drillDown[drillDown.length - 1].submenus.map((item, idx) => (
                  <Link 
                    key={idx} 
                    href={item.href} 
                    onClick={() => { onClose(); setDrillDown([]); }}
                    className="block p-4 border-b border-gray-50 text-[14px] font-bold text-[#333] hover:text-[#FF4D6D] hover:bg-[#fff0f3] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button 
              onClick={() => { setActiveTab('menus'); setDrillDown([]); }}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'menus' ? 'text-[#FF4D6D] border-b-2 border-[#FF4D6D] bg-[#fff0f3]/50' : 'text-gray-400'}`}
            >
              Menus
            </button>
            <button 
              onClick={() => { setActiveTab('categories'); setDrillDown([]); }}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'categories' ? 'text-[#FF4D6D] border-b-2 border-[#FF4D6D] bg-[#fff0f3]/50' : 'text-gray-400'}`}
            >
              Categories
            </button>
          </div>

          {/* Main List */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'menus' ? (
              <div className="divide-y divide-gray-50">
                {menus.map((menu, idx) => (
                  <div key={idx} className="group">
                    {menu.submenus ? (
                      <button 
                        onClick={() => handleMenuClick(menu)}
                        className="w-full flex items-center justify-between p-4 text-[14px] font-bold text-[#333] hover:text-[#FF4D6D] hover:bg-[#fff0f3] transition-all"
                      >
                        <span>{menu.label}</span>
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M9 5l7 7-7 7"/></svg>
                      </button>
                    ) : (
                      <Link 
                        href={menu.href}
                        onClick={onClose}
                        className="block p-4 text-[14px] font-bold text-[#333] hover:text-[#FF4D6D] hover:bg-[#fff0f3]"
                      >
                        {menu.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 divide-y divide-gray-50">
                {categories.map((cat, idx) => (
                  <Link 
                    key={idx} 
                    href={cat.link}
                    onClick={onClose}
                    className="flex items-center gap-4 p-4 hover:bg-[#fff0f3] group transition-all"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                      {cat.image ? (
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#FF4D6D] bg-[#fff0f3]">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                        </div>
                      )}
                    </div>
                    <span className="text-[14px] font-bold text-[#333] group-hover:text-[#FF4D6D]">{cat.name}</span>
                    <svg className="w-4 h-4 ml-auto text-gray-300 opacity-0 group-hover:opacity-100 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M9 5l7 7-7 7"/></svg>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Info */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#FF4D6D] shadow-sm">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Hotline</p>
                <p className="text-sm font-black text-[#111]">09644-888889</p>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 font-medium">© 2024 KC Bazar. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuSidebar;

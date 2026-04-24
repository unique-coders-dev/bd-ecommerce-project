"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const MenuSidebar = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('menus'); // 'categories' or 'menus'
  const [drillDown, setDrillDown] = useState([]); // Stack of submenu objects
  const [categories, setCategories] = useState([]);
  const [settings, setSettings] = useState(null);

  const staticMenus = [
    { label: 'Shop', href: '/shop' },
    { label: 'Offers', href: '/offers' },
    { label: 'Brands', href: '/brands' },
    { label: 'Clearance', href: '/clearance', isHot: true },
  ];

  // Helper to build a tree structure
  const buildTree = (items, parentId = null) => {
    return items
      .filter(item => item.parentId === parentId)
      .map(item => ({
        ...item,
        children: buildTree(items, item.id)
      }));
  };

  React.useEffect(() => {
    fetch('/api/admin/categories')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCategories(buildTree(data));
        }
      });
    
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => setSettings(data));
  }, []);

  const handleDrillDown = (item, isCategory = false) => {
    const children = item.children;
    const label = isCategory ? item.name : item.label;
    
    if (children && children.length > 0) {
      setDrillDown([...drillDown, { label, submenus: children, isCategory }]);
    }
  };

  const handleBack = () => {
    const newDrillDown = [...drillDown];
    newDrillDown.pop();
    setDrillDown(newDrillDown);
  };

  const currentDrill = drillDown[drillDown.length - 1] || null;
  const currentLevel = currentDrill ? currentDrill.submenus : (activeTab === 'categories' ? categories : staticMenus);
  const currentTitle = currentDrill?.label || null;

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
            <h2 className="text-lg font-black text-[#111] uppercase tracking-tighter">Navigation</h2>
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
                className="flex items-center gap-2 p-4 text-sm font-bold text-primary border-b border-gray-50 bg-gray-50/50 hover:bg-primary-light"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M15 19l-7-7 7-7"/></svg>
                Back to {drillDown.length > 1 ? drillDown[drillDown.length - 2].label : 'Main Menu'}
              </button>
              <div className="p-4 bg-primary text-white font-black uppercase text-xs tracking-widest">
                {currentTitle}
              </div>
              <div className="flex-1 overflow-y-auto">
                {currentDrill && currentDrill.submenus.map((item, idx) => (
                  <div key={idx} className="group border-b border-gray-50">
                    {item.children && item.children.length > 0 ? (
                      <div className="flex items-center">
                        <Link 
                          href={currentDrill.isCategory ? `/product-category/${item.slug}` : (item.href || '#')} 
                          onClick={() => { onClose(); setDrillDown([]); }}
                          className="flex-1 p-4 text-[14px] font-bold text-[#333] hover:text-primary hover:bg-primary-light transition-colors"
                        >
                          {currentDrill.isCategory ? item.name : item.label}
                        </Link>
                        <button 
                          onClick={(e) => { e.preventDefault(); handleDrillDown(item, currentDrill.isCategory); }}
                          className="w-14 h-14 flex items-center justify-center text-gray-300 hover:text-primary hover:bg-primary-light border-l border-gray-50 transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M9 5l7 7-7 7"/></svg>
                        </button>
                      </div>
                    ) : (
                      <Link 
                        href={currentDrill.isCategory ? `/product-category/${item.slug}` : (item.href || '#')} 
                        onClick={() => { onClose(); setDrillDown([]); }}
                        className="block p-4 text-[14px] font-bold text-[#333] hover:text-primary hover:bg-primary-light transition-colors"
                      >
                        {currentDrill.isCategory ? item.name : item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button 
              onClick={() => { setActiveTab('menus'); setDrillDown([]); }}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'menus' ? 'text-primary border-b-2 border-primary bg-primary-light/50' : 'text-gray-400'}`}
            >
              Menus
            </button>
            <button 
              onClick={() => { setActiveTab('categories'); setDrillDown([]); }}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'categories' ? 'text-primary border-b-2 border-primary bg-primary-light/50' : 'text-gray-400'}`}
            >
              Categories
            </button>
          </div>

          {/* Main List */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'menus' ? (
              <div className="divide-y divide-gray-50">
                {staticMenus.map((menu, idx) => (
                  <div key={idx} className="group border-b border-gray-50">
                      <Link 
                        href={menu.href}
                        onClick={onClose}
                        className="block p-5 text-[14px] font-black uppercase tracking-tight text-[#111] hover:text-primary hover:bg-primary-light transition-all"
                      >
                        <div className="flex items-center gap-2">
                          {menu.isHot && <span>🔥</span>}
                          <span>{menu.label}</span>
                        </div>
                      </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 divide-y divide-gray-50">
                {categories.map((cat, idx) => (
                  <div key={cat.id || idx} className="group border-b border-gray-50">
                    <div className="flex items-center">
                      <Link 
                        href={`/product-category/${cat.slug}`}
                        onClick={onClose}
                        className="flex-1 flex items-center gap-4 p-4 hover:bg-primary-light group transition-all"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                          {cat.image ? (
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-primary bg-primary-light">
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
                            </div>
                          )}
                        </div>
                        <span className="text-[14px] font-bold text-[#333] group-hover:text-primary">{cat.name}</span>
                      </Link>
                      
                      {cat.children && cat.children.length > 0 && (
                        <button 
                          onClick={() => handleDrillDown(cat, true)}
                          className="w-14 h-20 flex items-center justify-center text-gray-300 hover:text-primary hover:bg-primary-light border-l border-gray-50 transition-all"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M9 5l7 7-7 7"/></svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Info */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Order Hotline</p>
                <p className="text-sm font-black text-[#111]">{settings?.hotline || "09644-888889"}</p>
              </div>
            </div>
            <p className="text-[11px] text-gray-400 font-medium">© {new Date().getFullYear()} {settings?.siteName || settings?.siteTitle?.split('|')[0]?.trim() || 'KC Bazar'} | Premium Beauty & Wellness. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuSidebar;

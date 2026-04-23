"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const BannerPosters = () => {
    const [heroSlides, setHeroSlides] = useState([]);
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('hero'); // 'hero' or 'banner'
    const [editingItem, setEditingItem] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    const [formData, setFormData] = useState({
        imageUrl: '',
        mobileImageUrl: '',
        linkUrl: '/',
        order: 0,
        isActive: true,
        position: 'hero-after' // only for banners
    });

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [heroRes, bannerRes] = await Promise.all([
                fetch('/api/admin/hero-slides'),
                fetch('/api/admin/banners')
            ]);
            const [heroData, bannerData] = await Promise.all([
                heroRes.json(),
                bannerRes.json()
            ]);
            setHeroSlides(Array.isArray(heroData) ? heroData : []);
            setBanners(Array.isArray(bannerData) ? bannerData : []);
        } catch (error) {
            console.error("Fetch failed", error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    const handleImageSelect = async (e, field = 'imageUrl') => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            if (field === 'imageUrl') setImagePreview(ev.target.result);
        };
        reader.readAsDataURL(file);

        setUploading(true);
        try {
            const fd = new FormData();
            fd.append('file', file);
            fd.append('folder', 'banners');
            
            const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
            const data = await res.json();
            
            if (res.ok && data.url) {
                setFormData(prev => ({ ...prev, [field]: data.url }));
            } else {
                alert(data.error || "Upload failed");
            }
        } catch (err) {
            console.error('Upload failed', err);
            alert("Network error during upload");
        } finally {
            setUploading(false);
        }
    };

    const openModal = (type, item = null, forcedPosition = null) => {
        setModalType(type);
        if (item) {
            setEditingItem(item);
            setFormData({
                imageUrl: item.imageUrl,
                mobileImageUrl: item.mobileImageUrl || '',
                linkUrl: item.linkUrl || '/',
                order: item.order,
                isActive: item.isActive,
                position: item.position || 'hero-after'
            });
            setImagePreview(item.imageUrl);
        } else {
            setEditingItem(null);
            setFormData({
                imageUrl: '',
                mobileImageUrl: '',
                linkUrl: '/',
                order: 0,
                isActive: true,
                position: forcedPosition || (type === 'banner' ? 'hero-after' : '')
            });
            setImagePreview(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.imageUrl) {
            alert("Please upload or provide an image URL first.");
            return;
        }

        const url = modalType === 'hero' ? '/api/admin/hero-slides' : '/api/admin/banners';
        const method = editingItem ? 'PUT' : 'POST';
        const data = editingItem ? { ...formData, id: editingItem.id } : formData;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                fetchData();
                closeModal();
            }
        } catch (error) {
            console.error("Save failed", error);
        }
    };

    const handleDelete = async (type, id) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        const url = type === 'hero' ? `/api/admin/hero-slides?id=${id}` : `/api/admin/banners?id=${id}`;
        try {
            const res = await fetch(url, { method: 'DELETE' });
            if (res.ok) fetchData();
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    const BannerSection = ({ title, description, items, position }) => (
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <div>
                    <h3 className="text-sm font-black text-[#111] uppercase tracking-[3px] ml-1">{title}</h3>
                    <p className="text-[11px] text-gray-400 font-medium italic ml-1">{description}</p>
                </div>
                <button 
                    onClick={() => {
                        openModal('banner', null, position);
                    }}
                    className="text-[10px] font-black text-primary hover:underline uppercase tracking-widest"
                >
                    + Assign Banner
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.length === 0 ? (
                    <div className="col-span-full py-12 border-2 border-dashed border-gray-100 rounded-[32px] flex flex-col items-center justify-center text-gray-300">
                        <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                        <p className="text-[10px] font-black uppercase tracking-widest">No banners assigned to this area</p>
                    </div>
                ) : (
                    items.map((item) => (
                        <div key={item.id} className="relative aspect-[21/9] rounded-[24px] bg-gray-50 border border-black/5 overflow-hidden group">
                           <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                               <button onClick={() => openModal('banner', item)} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#111] hover:scale-110 transition-transform"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
                               <button onClick={() => handleDelete('banner', item.id)} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:scale-110 transition-transform"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                           </div>
                           <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[8px] font-black uppercase tracking-tighter shadow-sm">
                               {item.linkUrl !== '/' ? item.linkUrl : 'No Link'}
                           </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    const SingleSlotBanner = ({ label, item, position }) => (
        <div className={`bg-white rounded-[32px] border border-black/5 p-2 overflow-hidden group flex flex-col ${position === 'hero-after' ? 'h-[150px]' : 'h-[200px]'}`}>
            {item ? (
                <div className="relative flex-1 rounded-[24px] overflow-hidden">
                    <img src={item.imageUrl} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button onClick={() => openModal('banner', item)} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#111] hover:scale-110 transition-transform"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
                        <button onClick={() => handleDelete('banner', item.id)} className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:scale-110 transition-transform"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                    </div>
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[8px] font-black uppercase tracking-widest">{label}</div>
                </div>
            ) : (
                <div 
                    onClick={() => {
                        openModal('banner', null, position);
                    }}
                    className="flex-1 border-2 border-dashed border-gray-100 rounded-[24px] flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-primary/5 hover:border-primary/20 transition-all text-gray-300"
                >
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4v16m8-8H4"/></svg>
                    <span className="text-[10px] font-black uppercase tracking-widest">Assign {label}</span>
                </div>
            )}
        </div>
    );

    return (

        <div className="space-y-12 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-2xl lg:text-4xl font-black text-[#111] uppercase tracking-tighter">Banner Posters</h1>
                    <p className="text-gray-400 font-medium italic italic">Curate your homepage visual experience and marketing flow.</p>
                </div>
            </div>

            {/* Hero Slider Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                        <h2 className="text-lg font-black text-[#111] uppercase tracking-widest flex items-center gap-2">
                             Main Hero Slides
                             <span className="px-2 py-0.5 bg-primary-soft text-primary text-[10px] rounded animate-pulse">Live</span>
                        </h2>
                        <p className="text-xs text-gray-400 font-medium mt-1">These images loop on the main homepage slider (Recommended Ratio: 21:9)</p>
                    </div>
                    <button 
                        onClick={() => openModal('hero')}
                        className="px-5 py-3 bg-primary text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M12 4v16m8-8H4"/></svg>
                        Add Slide
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        [1,2,3].map(i => <div key={i} className="aspect-[21/9] bg-gray-50 rounded-[32px] animate-pulse" />)
                    ) : heroSlides.length === 0 ? (
                        <div className="col-span-full py-20 border-2 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center text-gray-300">
                             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                             </div>
                             <p className="text-[11px] font-black uppercase tracking-widest">No Hero Slides Established</p>
                        </div>
                    ) : (
                        heroSlides.sort((a,b) => a.order - b.order).map((slide) => (
                            <div key={slide.id} className="relative aspect-[21/9] rounded-[32px] bg-white shadow-xl shadow-black/5 overflow-hidden group border border-black/5">
                                <img src={slide.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end justify-between">
                                     <div className="max-w-[70%]">
                                         <p className="text-[10px] text-white/70 font-black uppercase tracking-widest truncate">{slide.linkUrl}</p>
                                     </div>
                                     <div className="flex gap-2">
                                         <button onClick={() => openModal('hero', slide)} className="w-8 h-8 rounded-full bg-white text-[#111] flex items-center justify-center hover:scale-110 transition-transform"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
                                         <button onClick={() => handleDelete('hero', slide.id)} className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 transition-transform"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                                     </div>
                                </div>
                                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[9px] font-black uppercase tracking-widest shadow-sm">
                                    Slide #{slide.order}
                                </div>
                            </div>
                        ))
                    ) }
                </div>
            </div>

            <div className="h-px bg-gray-100" />

            {/* Promotional Banners Section */}
            <div className="space-y-12">
                 <div>
                    <h2 className="text-xl font-black text-[#111] uppercase tracking-tighter">Strategic Placements</h2>
                    <p className="text-sm text-gray-400 font-medium">Define the marketing flow after the hero animation.</p>
                 </div>

                 <div className="space-y-12">
                    {/* 1. First Banner (Single Slot) */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                             <div className="w-1.5 h-6 bg-primary rounded-full" />
                             <h3 className="text-sm font-black text-[#111] uppercase tracking-[2px]">Primary Impact Banner</h3>
                        </div>
                        <SingleSlotBanner 
                            label="Post-Hero Banner" 
                            item={banners.find(b => b.position === 'hero-after')} 
                            position="hero-after" 
                        />
                    </div>

                    {/* 2. Marketing Trio (Row of 3) */}
                    <div className="p-10 bg-gray-50/50 rounded-[40px] border border-gray-100 space-y-8">
                         <div className="flex items-center gap-2">
                             <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
                             <h3 className="text-sm font-black text-[#111] uppercase tracking-[2px]">Marketing Trio (3-Row Layout)</h3>
                         </div>
                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                             <SingleSlotBanner label="Left Slot" item={banners.find(b => b.position === 'row-1')} position="row-1" />
                             <SingleSlotBanner label="Center Slot" item={banners.find(b => b.position === 'row-2')} position="row-2" />
                             <SingleSlotBanner label="Right Slot" item={banners.find(b => b.position === 'row-3')} position="row-3" />
                         </div>
                    </div>

                    {/* 3. After Category Banners (Multiple) */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                             <div className="w-1.5 h-6 bg-green-500 rounded-full" />
                             <h3 className="text-sm font-black text-[#111] uppercase tracking-[2px]">Post-Category Promotion</h3>
                        </div>
                        <BannerSection 
                            title="Additional Inventory" 
                            description="These appear after your main product category sections."
                            items={banners.filter(b => b.position === 'category-after')}
                            position="category-after"
                        />
                    </div>
                 </div>
            </div>

            {/* Modal */}
            {mounted && isModalOpen && createPortal(
                <div 
                    className="fixed inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" 
                    style={{ zIndex: 99999 }}
                    onClick={(e) => { if(e.target === e.currentTarget) closeModal(); }}
                >
                    <div className="bg-white rounded-[40px] p-10 max-w-xl w-full shadow-2xl overflow-y-auto max-h-[95vh] animate-slideUp">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-black text-[#111] uppercase tracking-tighter">
                                    {editingItem ? 'Configure Asset' : 'New Visual Asset'}
                                </h2>
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">{modalType === 'hero' ? 'Homepage Hero Slider' : `${formData.position.replace('-', ' ').toUpperCase()} Placement`}</p>
                            </div>
                            <button onClick={closeModal} className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all cursor-pointer">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Image Upload */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Asset Image</label>
                                <div 
                                    onClick={() => {
                                        const input = document.createElement('input');
                                        input.type = 'file';
                                        input.onchange = (e) => handleImageSelect(e, 'imageUrl');
                                        input.click();
                                    }}
                                    className="w-full aspect-[21/9] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all overflow-hidden relative"
                                >
                                    {imagePreview ? (
                                        <>
                                            <img src={imagePreview} className="w-full h-full object-cover rounded-2xl" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-white text-[10px] font-black uppercase tracking-widest">Update Source</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center gap-3 text-gray-300">
                                            {uploading ? (
                                                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                            )}
                                            <p className="text-[10px] font-black uppercase tracking-widest">Select Visual Asset</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {modalType === 'hero' && (
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Mobile View Image (Optional)</label>
                                    <div 
                                        onClick={() => {
                                            const input = document.createElement('input');
                                            input.type = 'file';
                                            input.onchange = (e) => handleImageSelect(e, 'mobileImageUrl');
                                            input.click();
                                        }}
                                        className="w-full aspect-[21/9] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all overflow-hidden relative"
                                    >
                                        {formData.mobileImageUrl ? (
                                            <>
                                                <img src={formData.mobileImageUrl} className="w-full h-full object-cover rounded-2xl" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="text-white text-[10px] font-black uppercase tracking-widest">Update Mobile Source</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center gap-3 text-gray-300">
                                                {uploading ? (
                                                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                                )}
                                                <p className="text-[10px] font-black uppercase tracking-widest">Select Mobile Image</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Destination Link (URL)</label>
                                <input 
                                    type="text" 
                                    name="linkUrl" 
                                    className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111]" 
                                    placeholder="/product-category/skin-care"
                                    value={formData.linkUrl} 
                                    onChange={handleInputChange} 
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Stacking Order</label>
                                    <input 
                                        type="number" 
                                        name="order" 
                                        className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111]" 
                                        value={formData.order} 
                                        onChange={handleInputChange} 
                                    />
                                </div>
                                <div className="flex items-center gap-4 bg-gray-50 px-6 rounded-2xl">
                                    <input 
                                        type="checkbox" 
                                        name="isActive" 
                                        id="isActiveAsset" 
                                        className="w-6 h-6 accent-primary" 
                                        checked={formData.isActive} 
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="isActiveAsset" className="text-[11px] font-black uppercase text-[#111] tracking-widest cursor-pointer">Live</label>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={uploading}
                                className="w-full h-16 bg-primary text-white font-black uppercase tracking-[2px] rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/30 active:scale-95 disabled:opacity-50"
                            >
                                {editingItem ? 'Update Asset' : 'Publish Asset'}
                            </button>
                        </form>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default BannerPosters;

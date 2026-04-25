"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';

const BannerPosters = () => {
    const [activeTab, setActiveTab] = useState('banners'); // 'banners' or 'coupons'
    const [heroSlides, setHeroSlides] = useState([]);
    const [banners, setBanners] = useState([]);
    const [couponData, setCouponData] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
    const [modalType, setModalType] = useState('hero'); // 'hero' or 'banner'
    const [editingItem, setEditingItem] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    const mobileFileInputRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    const [productSearch, setProductSearch] = useState('');

    const [formData, setFormData] = useState({
        imageUrl: '',
        mobileImageUrl: '',
        linkUrl: '/',
        order: 0,
        isActive: true,
        isAllProducts: false,
        productIds: [],
        position: 'hero-after',
        linkType: 'products'
    });

    const [couponFormData, setCouponFormData] = useState({
        code: '',
        discountType: 'percentage',
        discountValue: '',
        minOrderAmount: '',
        maxDiscount: '',
        usageLimit: '',
        expiryDate: '',
        isActive: true
    });


    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch individually to be resilient
            const fetchHero = async () => {
                try {
                    const res = await fetch('/api/admin/hero-slides');
                    const data = await res.json();
                    if (res.ok) {
                        setHeroSlides(Array.isArray(data) ? data : []);
                    } else {
                        const errorMsg = data.error + (data.details ? `: ${data.details}` : '');
                        setError(errorMsg);
                        toast.error(errorMsg);
                    }
                } catch (e) { 
                    console.error("Hero slides fetch failed", e); 
                    toast.error("Failed to fetch hero slides");
                }
            };

            const fetchBanners = async () => {
                try {
                    const res = await fetch('/api/admin/banners');
                    const data = await res.json();
                    if (res.ok) {
                        setBanners(Array.isArray(data) ? data : []);
                    } else {
                        const errorMsg = data.error + (data.details ? `: ${data.details}` : '');
                        setError(errorMsg);
                        toast.error(errorMsg);
                    }
                } catch (e) { 
                    console.error("Banners fetch failed", e); 
                    toast.error("Failed to fetch banners");
                }
            };

            const fetchProducts = async () => {
                try {
                    const res = await fetch('/api/products');
                    const data = await res.json();
                    if (res.ok) {
                        if (data && Array.isArray(data.products)) {
                            setAllProducts(data.products);
                        } else if (Array.isArray(data)) {
                            setAllProducts(data);
                        }
                    }
                } catch (e) { 
                    console.error("Products fetch failed", e); 
                }
            };

            const fetchCoupons = async () => {
                try {
                    const res = await fetch('/api/admin/coupons');
                    const data = await res.json();
                    if (res.ok) setCouponData(Array.isArray(data) ? data : []);
                } catch (e) { console.error("Coupons fetch failed", e); }
            };

            await Promise.allSettled([fetchHero(), fetchBanners(), fetchProducts(), fetchCoupons()]);
        } catch (error) {
            console.error("General fetch failed", error);
            toast.error("Something went wrong while fetching data");
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

        // Preview
        const reader = new FileReader();
        reader.onload = (ev) => {
            if (field === 'imageUrl') setImagePreview(ev.target.result);
        };
        reader.readAsDataURL(file);

        setUploading(true);
        const loadingToast = toast.loading("Uploading image...");
        try {
            const fd = new FormData();
            fd.append('file', file);
            fd.append('folder', 'banners');
            
            const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
            const data = await res.json();
            
            if (res.ok && data.url) {
                setFormData(prev => ({ ...prev, [field]: data.url }));
                toast.success("Image uploaded successfully", { id: loadingToast });
            } else {
                toast.error(data.error || "Upload failed", { id: loadingToast });
            }
        } catch (err) {
            console.error('Upload failed', err);
            toast.error("Network error during upload", { id: loadingToast });
        } finally {
            setUploading(false);
        }
    };

    const openModal = (type, item = null, forcedPosition = null) => {
        setModalType(type);
        if (item) {
            setEditingItem(item);
            const isCustom = item.linkUrl && item.linkUrl !== '/' && !item.isAllProducts && (!item.products || item.products.length === 0);
            setFormData({
                imageUrl: item.imageUrl,
                mobileImageUrl: item.mobileImageUrl || '',
                linkUrl: item.linkUrl || '/',
                order: item.order,
                isActive: item.isActive,
                isAllProducts: item.isAllProducts || false,
                productIds: item.products ? item.products.map(p => p.id) : [],
                position: item.position || 'hero-after',
                linkType: isCustom ? 'custom' : 'products'
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
                isAllProducts: false,
                productIds: [],
                position: forcedPosition || (type === 'banner' ? 'hero-after' : ''),
                linkType: 'products'
            });
            setImagePreview(null);
        }
        setIsModalOpen(true);
    };

    const openCouponModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setCouponFormData({
                code: item.code,
                discountType: item.discountType,
                discountValue: item.discountValue,
                minOrderAmount: item.minOrderAmount || '',
                maxDiscount: item.maxDiscount || '',
                usageLimit: item.usageLimit || '',
                expiryDate: item.expiryDate ? new Date(item.expiryDate).toISOString().split('T')[0] : '',
                isActive: item.isActive
            });
        } else {
            setEditingItem(null);
            setCouponFormData({
                code: '',
                discountType: 'percentage',
                discountValue: '',
                minOrderAmount: '',
                maxDiscount: '',
                usageLimit: '',
                expiryDate: '',
                isActive: true
            });
        }
        setIsCouponModalOpen(true);
    };

    const closeCouponModal = () => {
        setIsCouponModalOpen(false);
        setEditingItem(null);
    };

    const handleCouponSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Saving coupon...");
        try {
            const method = editingItem ? 'PUT' : 'POST';
            const body = editingItem ? { ...couponFormData, id: editingItem.id } : couponFormData;
            const res = await fetch('/api/admin/coupons', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(editingItem ? "Coupon updated" : "Coupon created", { id: loadingToast });
                fetchData();
                closeCouponModal();
            } else {
                toast.error(data.error || "Failed to save coupon", { id: loadingToast });
            }
        } catch (err) {
            toast.error("Network error", { id: loadingToast });
        }
    };

    const handleCouponDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this coupon?")) return;
        const loadingToast = toast.loading("Deleting coupon...");
        try {
            const res = await fetch(`/api/admin/coupons?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success("Coupon deleted", { id: loadingToast });
                fetchData();
            } else {
                toast.error("Failed to delete coupon", { id: loadingToast });
            }
        } catch (err) {
            toast.error("Network error", { id: loadingToast });
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setImagePreview(null);
        setProductSearch('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.imageUrl) {
            toast.error("Please upload or provide an image URL first.");
            return;
        }

        const url = modalType === 'hero' ? '/api/admin/hero-slides' : '/api/admin/banners';
        const method = editingItem ? 'PUT' : 'POST';
        const data = editingItem ? { ...formData, id: editingItem.id } : formData;

        const loadingToast = toast.loading(editingItem ? "Updating..." : "Publishing...");
        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                toast.success(editingItem ? "Updated successfully" : "Published successfully", { id: loadingToast });
                fetchData();
                closeModal();
            } else {
                const errData = await res.json();
                toast.error(errData.error || "Save failed", { id: loadingToast });
            }
        } catch (error) {
            console.error("Save failed", error);
            toast.error("Network error while saving", { id: loadingToast });
        }
    };

    const handleDelete = async (type, id) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        const url = type === 'hero' ? `/api/admin/hero-slides?id=${id}` : `/api/admin/banners?id=${id}`;
        const loadingToast = toast.loading("Deleting...");
        try {
            const res = await fetch(url, { method: 'DELETE' });
            if (res.ok) {
                toast.success("Deleted successfully", { id: loadingToast });
                fetchData();
            } else {
                toast.error("Delete failed", { id: loadingToast });
            }
        } catch (error) {
            console.error("Delete failed", error);
            toast.error("Network error while deleting", { id: loadingToast });
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
                    <h1 className="text-2xl lg:text-4xl font-black text-[#111] uppercase tracking-tighter">Promotions Management</h1>
                    <p className="text-gray-400 font-medium italic">Curate your homepage visual experience and promotional campaigns.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-gray-100 pb-px">
                <button 
                    onClick={() => setActiveTab('banners')}
                    className={`px-8 py-4 text-[11px] font-black uppercase tracking-widest transition-all relative ${
                        activeTab === 'banners' ? 'text-primary' : 'text-gray-400 hover:text-[#111]'
                    }`}
                >
                    Visual Assets & Banners
                    {activeTab === 'banners' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
                </button>
                <button 
                    onClick={() => setActiveTab('coupons')}
                    className={`px-8 py-4 text-[11px] font-black uppercase tracking-widest transition-all relative ${
                        activeTab === 'coupons' ? 'text-primary' : 'text-gray-400 hover:text-[#111]'
                    }`}
                >
                    Coupons & Discounts
                    {activeTab === 'coupons' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
                </button>
            </div>

            {activeTab === 'banners' ? (
                <>

            {/* Error Display */}
            {error && (
                <div className="p-6 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4 text-red-600 animate-fadeIn">
                    <svg className="w-6 h-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                    <div className="flex-1">
                        <p className="text-xs font-black uppercase tracking-widest">Data Fetching Error</p>
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                    <button onClick={() => { setError(null); fetchData(); }} className="px-4 py-2 bg-red-100 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-200 transition-colors">Retry</button>
                </div>
            )}

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

                    {(() => {
                        const fixedPositions = ['hero-after', 'row-1', 'row-2', 'row-3'];
                        const activeBanners = fixedPositions.map(pos => banners.find(b => b.position === pos)).filter(Boolean);
                        const activeBannerIds = activeBanners.map(b => b.id);
                        const otherBanners = banners.filter(b => b.position !== 'category-after' && !activeBannerIds.includes(b.id));

                        if (otherBanners.length === 0) return null;

                        return (
                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-6 bg-gray-500 rounded-full" />
                                    <h3 className="text-sm font-black text-[#111] uppercase tracking-[2px]">Other Placements & Overflows</h3>
                                </div>
                                <BannerSection 
                                    title="Uncategorized or Extra Assets" 
                                    description="Banners with custom tags or additional assets in fixed slots."
                                    items={otherBanners}
                                    position="other"
                                />
                            </div>
                        );
                    })()}
                 </div>
            </div>
                </>
            ) : (
                <div className="space-y-8 animate-fadeIn">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-black text-[#111] uppercase tracking-tight">Active Coupons</h2>
                            <p className="text-xs text-gray-400 font-medium italic">Manage customer discount codes and seasonal rewards.</p>
                        </div>
                        <button onClick={() => openCouponModal()} className="px-6 py-3 bg-[#111] text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-black transition-all shadow-xl shadow-black/10 cursor-pointer">Create Coupon</button>
                    </div>

                    <div className="bg-white rounded-[40px] shadow-sm border border-black/5 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50">
                                    <tr className="text-[10px] font-black uppercase tracking-[2px] text-gray-400 border-b border-gray-100">
                                        <th className="px-10 py-6">Coupon Details</th>
                                        <th className="px-10 py-6">Usage</th>
                                        <th className="px-10 py-6">Expiry</th>
                                        <th className="px-10 py-6">Status</th>
                                        <th className="px-10 py-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {couponData.length === 0 ? (
                                        <tr><td colSpan="5" className="py-20 text-center text-gray-300 font-black uppercase text-[10px] tracking-widest italic">No active promotions established</td></tr>
                                    ) : couponData.map((c) => (
                                        <tr key={c.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="px-10 py-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[13px] font-black text-[#111] uppercase italic tracking-tighter">{c.code}</span>
                                                    <span className="text-[10px] text-primary font-bold">{c.discountType === 'percentage' ? `${c.discountValue}% Off` : `৳ ${c.discountValue} Off`}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[12px] font-black text-gray-500">{c.usageCount}</span>
                                                    <span className="text-[10px] text-gray-300 font-bold">/ {c.usageLimit || '∞'}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6 text-[11px] font-bold text-gray-400 italic">
                                                {c.expiryDate ? new Date(c.expiryDate).toLocaleDateString() : 'Ongoing'}
                                            </td>
                                            <td className="px-10 py-6">
                                                <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${c.isActive ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                                    {c.isActive ? 'Active' : 'Paused'}
                                                </span>
                                            </td>
                                            <td className="px-10 py-6 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button onClick={() => openCouponModal(c)} className="text-gray-300 hover:text-[#111] transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
                                                    <button onClick={() => handleCouponDelete(c.id)} className="text-gray-200 hover:text-primary transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

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
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Asset Image</label>
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    onChange={(e) => handleImageSelect(e, 'imageUrl')} 
                                    accept=".png,.jpg,.jpeg,.gif,.ico"
                                />
                                <div 
                                    onClick={() => fileInputRef.current?.click()}
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
                                    <input 
                                        type="file" 
                                        ref={mobileFileInputRef} 
                                        className="hidden" 
                                        onChange={(e) => handleImageSelect(e, 'mobileImageUrl')} 
                                        accept=".png,.jpg,.jpeg,.gif,.ico"
                                    />
                                    <div 
                                        onClick={() => mobileFileInputRef.current?.click()}
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

                            <div className="space-y-4 bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Redirect Configuration</label>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <input 
                                            type="radio" 
                                            name="linkType" 
                                            id="linkProducts" 
                                            className="w-5 h-5 accent-primary" 
                                            checked={formData.linkType === 'products'}
                                            onChange={() => setFormData(prev => ({ ...prev, linkType: 'products', linkUrl: '/' }))}
                                        />
                                        <label htmlFor="linkProducts" className="text-xs font-black uppercase text-[#111] cursor-pointer">Link to Products</label>
                                    </div>
                                    
                                    {formData.linkType === 'products' && (
                                        <div className="pl-8 space-y-4 animate-fadeIn">
                                            <div className="flex items-center gap-3">
                                                <input 
                                                    type="checkbox" 
                                                    id="isAllProducts" 
                                                    className="w-5 h-5 accent-primary" 
                                                    checked={formData.isAllProducts}
                                                    onChange={(e) => setFormData(prev => ({ 
                                                        ...prev, 
                                                        isAllProducts: e.target.checked,
                                                        productIds: e.target.checked ? [] : prev.productIds
                                                    }))}
                                                />
                                                <label htmlFor="isAllProducts" className="text-[10px] font-black uppercase text-primary">All Products (Shop Page)</label>
                                            </div>
                                            
                                            {!formData.isAllProducts && (
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <label className="text-[9px] font-black uppercase text-gray-400">Select Specific Products</label>
                                                        {formData.productIds.length > 0 && (
                                                            <span className="text-[9px] font-black text-primary uppercase">{formData.productIds.length} Selected</span>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="relative mb-3">
                                                        <input 
                                                            type="text" 
                                                            placeholder="Search products by name..." 
                                                            className="w-full h-10 pl-10 pr-4 bg-white border border-gray-100 rounded-xl text-[11px] font-bold outline-none focus:border-primary/20 transition-all"
                                                            value={productSearch}
                                                            onChange={(e) => setProductSearch(e.target.value)}
                                                        />
                                                        <svg className="w-4 h-4 absolute left-4 top-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                                                    </div>

                                                    <div className="max-h-48 overflow-y-auto bg-white border border-gray-100 rounded-xl p-3 space-y-2 scrollbar-thin">
                                                        {(() => {
                                                            const selected = allProducts.filter(p => formData.productIds.includes(p.id));
                                                            let others = [];
                                                            if (productSearch) {
                                                                others = allProducts.filter(p => 
                                                                    p.name.toLowerCase().includes(productSearch.toLowerCase()) && 
                                                                    !formData.productIds.includes(p.id)
                                                                );
                                                            } else {
                                                                others = allProducts
                                                                    .filter(p => !formData.productIds.includes(p.id))
                                                                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                                                                    .slice(0, 5);
                                                            }
                                                            const combined = [...selected, ...others];

                                                            if (combined.length === 0) {
                                                                return <p className="text-[10px] text-gray-400 italic text-center py-4">{productSearch ? 'No matches found' : 'No products available'}</p>;
                                                            }

                                                            return combined.map(p => (
                                                                <label key={p.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group">
                                                                    <input 
                                                                        type="checkbox" 
                                                                        className="w-4 h-4 accent-primary"
                                                                        checked={formData.productIds.includes(p.id)}
                                                                        onChange={(e) => {
                                                                            if (e.target.checked) {
                                                                                setFormData(prev => ({ ...prev, productIds: [...prev.productIds, p.id] }));
                                                                            } else {
                                                                                setFormData(prev => ({ ...prev, productIds: prev.productIds.filter(id => id !== p.id) }));
                                                                            }
                                                                        }}
                                                                    />
                                                                    <div className="flex flex-col">
                                                                        <span className="text-[11px] font-bold text-[#111] group-hover:text-primary transition-colors">{p.name}</span>
                                                                        <span className="text-[9px] text-gray-400 font-medium">৳{p.salePrice || p.regularPrice}</span>
                                                                    </div>
                                                                </label>
                                                            ));
                                                        })()}
                                                    </div>
                                                    <p className="text-[9px] text-gray-400 italic">
                                                        {productSearch ? `Showing results for "${productSearch}"` : "Showing 5 most recent products. Use search for more."}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="h-px bg-gray-100 my-4" />

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <input 
                                            type="radio" 
                                            name="linkType" 
                                            id="linkCustom" 
                                            className="w-5 h-5 accent-primary" 
                                            checked={formData.linkType === 'custom'}
                                            onChange={() => setFormData(prev => ({ ...prev, linkType: 'custom', isAllProducts: false, productIds: [], linkUrl: prev.linkUrl === '/' ? '' : prev.linkUrl }))}
                                        />
                                        <label htmlFor="linkCustom" className="text-xs font-black uppercase text-[#111] cursor-pointer">Custom URL</label>
                                    </div>
                                    
                                    {formData.linkType === 'custom' && (
                                        <div className="pl-8 animate-fadeIn">
                                            <input 
                                                type="text" 
                                                name="linkUrl" 
                                                className="w-full h-12 px-5 bg-white border border-gray-100 rounded-xl outline-none focus:border-primary/20 font-bold text-xs" 
                                                placeholder="/offers or https://..."
                                                value={formData.linkUrl === '/' ? '' : formData.linkUrl} 
                                                onChange={handleInputChange} 
                                            />
                                        </div>
                                    )}
                                </div>
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
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Live Status</label>
                                    <div className="flex items-center h-14 bg-gray-50 px-6 rounded-2xl gap-4">
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

            {/* ── Coupon Management Modal ── */}
            {mounted && isCouponModalOpen && createPortal(
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                  onClick={e => { if (e.target === e.currentTarget) closeCouponModal(); }}>
                  <div className="bg-white rounded-[40px] w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleUp">
                    <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-10 py-8 border-b border-gray-50">
                       <div>
                          <h2 className="text-2xl font-black text-[#111] uppercase tracking-tighter italic">{editingItem ? 'Edit Promo' : 'New Discount Code'}</h2>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Setup discount rules and limitations.</p>
                       </div>
                       <button onClick={closeCouponModal} className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all cursor-pointer">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12"/></svg>
                       </button>
                    </div>

                    <form onSubmit={handleCouponSubmit} className="p-10 space-y-8">
                       <div className="space-y-2">
                          <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Coupon Code *</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="e.g. EID2026"
                            className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-black text-[#111] uppercase tracking-widest"
                            value={couponFormData.code}
                            onChange={(e) => setCouponFormData(prev => ({ ...prev, code: e.target.value }))}
                          />
                       </div>

                       <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Discount Type</label>
                            <select 
                                className="w-full h-14 px-5 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 transition-all font-bold text-[#111]"
                                value={couponFormData.discountType}
                                onChange={(e) => setCouponFormData(prev => ({ ...prev, discountType: e.target.value }))}
                            >
                                <option value="percentage">Percentage (%)</option>
                                <option value="fixed">Fixed Amount (৳)</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Value *</label>
                            <input 
                                type="number" 
                                required
                                className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 transition-all font-bold text-[#111]"
                                value={couponFormData.discountValue}
                                onChange={(e) => setCouponFormData(prev => ({ ...prev, discountValue: e.target.value }))}
                            />
                          </div>
                       </div>

                       <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Min. Spend (৳)</label>
                            <input 
                                type="number" 
                                className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 transition-all font-bold text-[#111]"
                                value={couponFormData.minOrderAmount}
                                onChange={(e) => setCouponFormData(prev => ({ ...prev, minOrderAmount: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Max Discount (৳)</label>
                            <input 
                                type="number" 
                                placeholder={couponFormData.discountType === 'percentage' ? 'Limit for % discount' : 'N/A'}
                                className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 transition-all font-bold text-[#111]"
                                value={couponFormData.maxDiscount}
                                onChange={(e) => setCouponFormData(prev => ({ ...prev, maxDiscount: e.target.value }))}
                                disabled={couponFormData.discountType === 'fixed'}
                            />
                          </div>
                       </div>

                       <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Usage Limit</label>
                            <input 
                                type="number" 
                                placeholder="Unlimited"
                                className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 transition-all font-bold text-[#111]"
                                value={couponFormData.usageLimit}
                                onChange={(e) => setCouponFormData(prev => ({ ...prev, usageLimit: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Expiry Date</label>
                            <input 
                                type="date" 
                                className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 transition-all font-bold text-[#111]"
                                value={couponFormData.expiryDate}
                                onChange={(e) => setCouponFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                            />
                          </div>
                       </div>

                       <div className="flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-2xl">
                            <input 
                                type="checkbox" 
                                id="couponActive"
                                checked={couponFormData.isActive}
                                onChange={(e) => setCouponFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                                className="w-5 h-5 accent-primary"
                            />
                            <label htmlFor="couponActive" className="text-[11px] font-black uppercase text-[#111] tracking-widest cursor-pointer">
                                Enable this coupon immediately
                            </label>
                        </div>

                       <button type="submit" className="w-full h-16 bg-[#111] text-white font-black uppercase tracking-[3px] rounded-2xl hover:bg-black transition-all shadow-xl shadow-black/10 active:scale-95">
                          {editingItem ? 'Update Strategy' : 'Launch Promotion'}
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

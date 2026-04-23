"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const BrandsManagement = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [mounted, setMounted] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        imageUrl: '',
        linkUrl: '/',
        order: 0,
        isActive: true,
    });

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/brands');
            const data = await res.json();
            setBrands(Array.isArray(data) ? data : []);
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

    const handleImageSelect = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            setImagePreview(ev.target.result);
        };
        reader.readAsDataURL(file);

        setUploading(true);
        try {
            const fd = new FormData();
            fd.append('file', file);
            fd.append('folder', 'brands');
            
            const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
            const data = await res.json();
            
            if (res.ok && data.url) {
                setFormData(prev => ({ ...prev, imageUrl: data.url }));
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

    const openModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                name: item.name,
                imageUrl: item.imageUrl,
                linkUrl: item.linkUrl || '/',
                order: item.order,
                isActive: item.isActive,
            });
            setImagePreview(item.imageUrl);
        } else {
            setEditingItem(null);
            setFormData({
                name: '',
                imageUrl: '',
                linkUrl: '/',
                order: 0,
                isActive: true,
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
        
        if (!formData.name || !formData.imageUrl) {
            alert("Please provide both name and image for the brand.");
            return;
        }

        const url = '/api/admin/brands';
        const method = editingItem ? 'PUT' : 'POST';
        
        // Wait, wait... Admin layout uses /api/admin/brands endpoints which I created earlier.
        // Wait, my POST /api/admin/brands endpoint expects FormData (multipart) because I created it to handle the file directly?
        // Let's look at what I created. Oh, I created POST that expects FormData. 
        // But here I'm using /api/admin/upload to upload first. So the POST to /api/admin/brands only needs JSON data?
        // Wait, my POST /api/admin/brands endpoint handles file upload too. Let me use JSON here and update the API to use JSON!
        // I'll update the API in a replace_file_content call to match this JSON method.

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
            } else {
                alert("Failed to save brand");
            }
        } catch (error) {
            console.error("Save failed", error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this brand?')) return;
        try {
            const res = await fetch(`/api/admin/brands?id=${id}`, { method: 'DELETE' });
            if (res.ok) fetchData();
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    return (

        <div className="space-y-12 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-2xl lg:text-4xl font-black text-[#111] uppercase tracking-tighter">Official Brands</h1>
                    <p className="text-gray-400 font-medium italic">Manage the official brands shown on the homepage.</p>
                </div>
                <button 
                    onClick={() => openModal()}
                    className="px-5 py-3 bg-primary text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M12 4v16m8-8H4"/></svg>
                    Add Brand
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {loading ? (
                    [1,2,3,4,5,6].map(i => <div key={i} className="aspect-square bg-gray-50 rounded-2xl animate-pulse" />)
                ) : brands.length === 0 ? (
                    <div className="col-span-full py-20 border-2 border-dashed border-gray-100 rounded-[40px] flex flex-col items-center justify-center text-gray-300">
                         <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                         </div>
                         <p className="text-[11px] font-black uppercase tracking-widest">No Brands Added</p>
                    </div>
                ) : (
                    brands.sort((a,b) => a.order - b.order).map((brand) => (
                        <div key={brand.id} className="relative aspect-square rounded-2xl bg-white shadow-sm hover:shadow-md overflow-hidden group border border-gray-100 flex items-center justify-center p-4">
                            <img src={brand.imageUrl} alt={brand.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end items-center gap-2">
                                 <p className="text-[10px] text-white font-black uppercase tracking-widest text-center truncate w-full">{brand.name}</p>
                                 <div className="flex gap-2">
                                     <button onClick={() => openModal(brand)} className="w-8 h-8 rounded-full bg-white text-[#111] flex items-center justify-center hover:scale-110 transition-transform"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
                                     <button onClick={() => handleDelete(brand.id)} className="w-8 h-8 rounded-full bg-white text-primary flex items-center justify-center hover:scale-110 transition-transform"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                                 </div>
                            </div>
                        </div>
                    ))
                ) }
            </div>

            {mounted && isModalOpen && createPortal(
                <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md z-[99999]" onClick={(e) => { if(e.target === e.currentTarget) closeModal(); }}>
                    <div className="bg-white rounded-[40px] p-10 max-w-xl w-full shadow-2xl overflow-y-auto max-h-[95vh] animate-slideUp">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-[#111] uppercase tracking-tighter">
                                {editingItem ? 'Edit Brand' : 'New Brand'}
                            </h2>
                            <button onClick={closeModal} className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Brand Name *</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    required
                                    className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111]" 
                                    placeholder="Enter Brand Name"
                                    value={formData.name} 
                                    onChange={handleInputChange} 
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Brand Image / Logo *</label>
                                <div 
                                    onClick={() => {
                                        const input = document.createElement('input');
                                        input.type = 'file';
                                        input.onchange = handleImageSelect;
                                        input.click();
                                    }}
                                    className="w-full aspect-video md:aspect-[3/1] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all overflow-hidden relative"
                                >
                                    {imagePreview ? (
                                        <>
                                            <img src={imagePreview} className="w-full h-full object-contain p-4" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-white text-[10px] font-black uppercase tracking-widest">Update Image</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center gap-3 text-gray-300">
                                            {uploading ? (
                                                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                            )}
                                            <p className="text-[10px] font-black uppercase tracking-widest">Select Image</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Destination Link (URL)</label>
                                <input 
                                    type="text" 
                                    name="linkUrl" 
                                    className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111]" 
                                    placeholder="/brand/example"
                                    value={formData.linkUrl} 
                                    onChange={handleInputChange} 
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Display Order</label>
                                    <input 
                                        type="number" 
                                        name="order" 
                                        className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111]" 
                                        value={formData.order} 
                                        onChange={handleInputChange} 
                                    />
                                </div>
                                <div className="flex items-center gap-4 bg-gray-50 px-6 rounded-2xl mt-6">
                                    <input 
                                        type="checkbox" 
                                        name="isActive" 
                                        id="isActive" 
                                        className="w-6 h-6 accent-primary" 
                                        checked={formData.isActive} 
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="isActive" className="text-[11px] font-black uppercase text-[#111] tracking-widest cursor-pointer">Live / Active</label>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={uploading}
                                className="w-full h-16 bg-primary text-white font-black uppercase tracking-[2px] rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/30 active:scale-95 disabled:opacity-50 mt-4"
                            >
                                {editingItem ? 'Update Brand' : 'Save Brand'}
                            </button>
                        </form>
                    </div>
                </div>, 
                document.body
            )}
        </div>
    );
};

export default BrandsManagement;

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        image: '',
        parentId: ''
    });

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/categories');
            const data = await res.json();
            if (Array.isArray(data)) {
                setCategories(data);
            } else {
                setCategories([]);
            }
        } catch (error) {
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    // Helper to build a tree structure
    const buildTree = (items, parentId = null) => {
        return items
            .filter(item => item.parentId === parentId)
            .map(item => ({
                ...item,
                children: buildTree(items, item.id)
            }));
    };

    // Helper to flatten the tree for the dropdown with indentation
    const flattenForSelect = (items, depth = 0, excludeId = null) => {
        let result = [];
        items.forEach(item => {
            if (item.id === excludeId) return;
            result.push({ ...item, depth });
            if (item.children && item.children.length > 0) {
                result = [...result, ...flattenForSelect(item.children, depth + 1, excludeId)];
            }
        });
        return result;
    };

    // Helper to flatten trees for the main list (to keep hierarchy order)
    const flattenForList = (items, depth = 0) => {
        let result = [];
        items.forEach(item => {
            result.push({ ...item, depth });
            if (item.children && item.children.length > 0) {
                result = [...result, ...flattenForList(item.children, depth + 1)];
            }
        });
        return result;
    };

    const categoryTree = buildTree(categories);
    const listCategories = flattenForList(categoryTree);
    const selectOptions = flattenForSelect(categoryTree, 0, editingCategory?.id);

    const generateSlug = (name) =>
        name.toLowerCase().trim()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-');

    const handleNameChange = (e) => {
        const name = e.target.value;
        setFormData(prev => ({
            ...prev,
            name,
            slug: generateSlug(name)
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageSelect = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => setImagePreview(ev.target.result);
        reader.readAsDataURL(file);

        setUploading(true);
        try {
            const fd = new FormData();
            fd.append('file', file);
            const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
            const data = await res.json();
            if (data.url) {
                setFormData(prev => ({ ...prev, image: data.url }));
            }
        } catch (err) {
            console.error('Upload failed', err);
        } finally {
            setUploading(false);
        }
    };

    const openModal = (category = null) => {
        setFormError('');
        if (category) {
            setEditingCategory(category);
            setFormData({
                name: category.name,
                slug: category.slug,
                description: category.description || '',
                image: category.image || '',
                parentId: category.parentId || ''
            });
            setImagePreview(category.image || null);
        } else {
            setEditingCategory(null);
            setFormData({ name: '', slug: '', description: '', image: '', parentId: '' });
            setImagePreview(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
        setImagePreview(null);
        setFormError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');

        const slug = formData.slug || generateSlug(formData.name);
        if (!slug) {
            setFormError('Please enter a category name.');
            return;
        }

        const method = editingCategory ? 'PUT' : 'POST';
        const data = editingCategory
            ? { ...formData, slug, id: editingCategory.id }
            : { ...formData, slug };

        setSubmitLoading(true);
        try {
            const res = await fetch('/api/admin/categories', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                fetchCategories();
                closeModal();
            } else {
                const errData = await res.json().catch(() => ({}));
                setFormError(errData?.error || `Server error (${res.status}). Please try again.`);
            }
        } catch (error) {
            console.error('Failed to save category', error);
            setFormError('Network error. Please check your connection.');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this category? All its sub-categories will be orphaned.')) return;
        try {
            const res = await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' });
            if (res.ok) fetchCategories();
        } catch (error) {
            console.error("Failed to delete category", error);
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-2xl lg:text-4xl font-black text-[#111] uppercase tracking-tighter">Category Manager</h1>
                    <p className="text-gray-400 font-medium italic">Organize your store hierarchy with nested categories.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="px-6 py-4 bg-primary text-white font-black uppercase text-[11px] tracking-widest rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/30 flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M12 4v16m8-8H4"/></svg>
                    Create New Category
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-[32px] shadow-sm border border-black/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr className="text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                                <th className="px-10 py-6">Category Info</th>
                                <th className="px-10 py-6">Slug</th>
                                <th className="px-10 py-6">Parent</th>
                                <th className="px-10 py-6">Status</th>
                                <th className="px-10 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 font-medium">
                            {loading ? (
                                <tr><td colSpan="5" className="px-10 py-20 text-center text-gray-400">Loading catalog...</td></tr>
                            ) : listCategories.length === 0 ? (
                                <tr><td colSpan="5" className="px-10 py-20 text-center text-gray-400">No categories found. Start by creating one.</td></tr>
                            ) : (
                                listCategories.map((category) => (
                                    <tr key={category.id} className="hover:bg-gray-50/30 transition-all group">
                                        <td className="px-10 py-6">
                                            <div className="flex items-center gap-4">
                                                {/* Indentation for branches */}
                                                {category.depth > 0 && (
                                                    <div className="flex" style={{ marginLeft: `${(category.depth - 1) * 24}px` }}>
                                                        <div className="w-6 h-10 border-l-2 border-b-2 border-gray-100 rounded-bl-xl mr-2 -mt-6"></div>
                                                    </div>
                                                )}
                                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-primary overflow-hidden flex-shrink-0">
                                                    {category.image ? (
                                                        <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className={`text-sm font-black text-[#111] ${category.depth > 0 ? 'text-primary/80' : ''}`}>{category.name}</div>
                                                    <div className="text-[10px] text-gray-400 line-clamp-1">{category.description || 'No description'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className="text-xs font-bold text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">/{category.slug}</span>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className={`text-[11px] font-black uppercase tracking-widest ${category.parentId ? 'text-primary' : 'text-gray-300'}`}>
                                                {category.parentId ? (categories.find(c => c.id === category.parentId)?.name || 'Parent') : 'Primary'}
                                            </span>
                                        </td>
                                        <td className="px-10 py-6">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                                                <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-10 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => openModal(category)} className="p-2.5 hover:bg-black/5 text-gray-400 hover:text-[#111] rounded-xl transition-all">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                                                </button>
                                                <button onClick={() => handleDelete(category.id)} className="p-2.5 hover:bg-primary-soft text-gray-400 hover:text-primary rounded-xl transition-all">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal via Portal */}
            {mounted && isModalOpen && createPortal(
                <div
                    className="fixed inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    style={{ zIndex: 99999 }}
                    onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
                >
                    <div className="bg-white rounded-[40px] p-10 max-w-xl w-full shadow-2xl overflow-y-auto max-h-[90vh]">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-[#111] uppercase tracking-tighter">
                                {editingCategory ? 'Update Category' : 'New Category'}
                            </h2>
                            <button onClick={closeModal} className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Image Upload */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Category Image</label>
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full h-48 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all overflow-hidden relative"
                                >
                                    {imagePreview ? (
                                        <>
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                                                <span className="text-white text-xs font-black uppercase tracking-widest">Change Image</span>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center gap-3 text-gray-400">
                                            {uploading ? (
                                                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                                            )}
                                            <div className="text-center">
                                                <p className="text-xs font-black uppercase tracking-widest text-gray-400">Click to upload image</p>
                                                <p className="text-[10px] text-gray-300 mt-1">PNG, JPG, WEBP — Max 5MB</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageSelect}
                                />
                            </div>

                            {/* Name — auto-generates slug */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Category Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111]"
                                    placeholder="e.g. Skin Care"
                                    value={formData.name}
                                    onChange={handleNameChange}
                                />
                                {formData.slug && (
                                    <p className="text-[10px] text-gray-400 ml-1">
                                        URL: <span className="font-bold text-primary font-mono">/{formData.slug}</span>
                                    </p>
                                )}
                            </div>

                            {/* Parent Category */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Parent Category</label>
                                <select
                                    name="parentId"
                                    className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111] appearance-none"
                                    value={formData.parentId}
                                    onChange={handleInputChange}
                                >
                                    <option value="">None (Primary Category)</option>
                                    {selectOptions.map(c => (
                                        <option key={c.id} value={c.id}>
                                            {'\u00A0'.repeat(c.depth * 4)} {c.depth > 0 ? '↳ ' : ''}{c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Short Description</label>
                                <textarea
                                    name="description"
                                    className="w-full h-28 p-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111] resize-none"
                                    placeholder="Brief details about this category..."
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </div>

                            {/* Error message */}
                            {formError && (
                                <div className="bg-primary-soft border border-red-200 text-primary text-sm font-bold px-5 py-4 rounded-2xl">
                                    ⚠️ {formError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={uploading || submitLoading}
                                className="w-full h-16 bg-primary text-white font-black uppercase tracking-[2px] rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/30 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {submitLoading ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                        Saving...
                                    </>
                                ) : uploading ? 'Uploading Image...' : editingCategory ? 'Save Changes' : 'Create Category'}
                            </button>
                        </form>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default CategoryManagement;

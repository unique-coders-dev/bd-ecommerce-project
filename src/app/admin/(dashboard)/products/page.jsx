"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const EMPTY_FORM = {
  name: '',
  shortBrief: '',
  description: '',
  additionalInfo: '',
  ingredients: '',
  brand: '',
  brandImage: '',
  category: '',
  regularPrice: '',
  salePrice: '',
  discount: '',
  stock: '0',
  sku: '',
  image: '',
  images: [],
  isActive: true,
  isClearance: false,
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Sort state
  const [sortKey, setSortKey] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Brand dropdown
  const [brandOpen, setBrandOpen] = useState(false);
  const brandRef = useRef(null);

  const LIMIT = 12;

  useEffect(() => {
    setMounted(true);
    fetchBrands();
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, search, categoryFilter, sortKey, sortDir]);

  // Close brand dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (brandRef.current && !brandRef.current.contains(e.target)) setBrandOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const fetchBrands = async () => {
    try {
      const res = await fetch('/api/admin/brands');
      const data = await res.json();
      setBrands(Array.isArray(data) ? data.filter(b => b.isActive) : []);
    } catch {}
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch {}
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: LIMIT, search, category: categoryFilter, sortKey, sortDir });
      const res = await fetch(`/api/admin/products?${params}`);
      const data = await res.json();
      setProducts(Array.isArray(data.products) ? data.products : []);
      setTotal(data.total || 0);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Build hierarchical category tree for dropdown
  const buildTree = (cats, parentId = null, depth = 0) => {
    return cats
      .filter(c => (c.parentId || null) === parentId)
      .flatMap(c => [
        { ...c, depth },
        ...buildTree(cats, c.id, depth + 1),
      ]);
  };
  const categoryTree = buildTree(categories);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  };

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return (
      <svg className="w-3 h-3 text-gray-300 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/></svg>
    );
    return sortDir === 'asc'
      ? <svg className="w-3 h-3 text-primary inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7"/></svg>
      : <svg className="w-3 h-3 text-primary inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>;
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name || '',
        shortBrief: item.shortBrief || '',
        description: item.description || '',
        additionalInfo: item.additionalInfo || '',
        ingredients: item.ingredients || '',
        brand: item.brand || '',
        brandImage: item.brandImage || '',
        category: item.category || '',
        regularPrice: item.regularPrice?.toString() || '',
        salePrice: item.salePrice?.toString() || '',
        discount: item.discount || '',
        stock: item.stock?.toString() || '0',
        sku: item.sku || '',
        image: item.image || '',
        images: item.images ? JSON.parse(item.images) : [],
        isActive: item.isActive,
        isClearance: item.isClearance,
      });
    } else {
      setEditingItem(null);
      setFormData(EMPTY_FORM);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData(EMPTY_FORM);
    setBrandOpen(false);
  };

  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const selectBrand = (b) => {
    setFormData(prev => ({ ...prev, brand: b.name, brandImage: b.imageUrl }));
    setBrandOpen(false);
  };

  const clearBrand = () => {
    setFormData(prev => ({ ...prev, brand: '', brandImage: '' }));
  };

  const uploadImage = async (file, folder = 'products') => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('folder', folder);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    return data.url;
  };

  const handleMainImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setFormData(prev => ({ ...prev, image: url }));
    } catch { alert('Image upload failed.'); }
    finally { setUploading(false); }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls = await Promise.all(files.map(f => uploadImage(f)));
      setFormData(prev => ({ ...prev, images: [...(prev.images || []), ...urls] }));
    } catch { alert('Gallery upload failed.'); }
    finally { setUploading(false); }
  };

  const removeGalleryImage = (idx) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  const autoDiscount = () => {
    const reg = parseFloat(formData.regularPrice);
    const sale = parseFloat(formData.salePrice);
    if (reg > 0 && sale > 0 && sale < reg) {
      setFormData(prev => ({ ...prev, discount: `${Math.round(((reg - sale) / reg) * 100)}%` }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.image || !formData.regularPrice) {
      alert('Name, main image, and regular price are required.');
      return;
    }
    setSaving(true);
    try {
      const method = editingItem ? 'PUT' : 'POST';
      const body = editingItem ? { ...formData, id: editingItem.id } : formData;
      const res = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.ok) { fetchProducts(); closeModal(); }
      else { const err = await res.json(); alert(err.error || 'Failed to save product'); }
    } catch { alert('Network error, please try again.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
    if (res.ok) { fetchProducts(); setConfirmDelete(null); }
  };

  const totalPages = Math.ceil(total / LIMIT);
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock < 10).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  // Flatten tree for filter dropdown
  const allCategoryNames = categoryTree.map(c => c.name);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-2xl lg:text-4xl font-black text-[#111] uppercase tracking-tighter">Product Inventory</h1>
          <p className="text-gray-400 font-medium italic">Manage, create and monitor all your store products.</p>
        </div>
        <button onClick={() => openModal()}
          className="px-5 py-3 bg-primary text-white font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M12 4v16m8-8H4"/></svg>
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Total Products', value: total, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Low Stock', value: `${lowStockCount} Items`, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Out of Stock', value: `${outOfStockCount} Items`, color: 'text-primary', bg: 'bg-primary-soft' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 flex items-center gap-5">
            <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center ${s.color}`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{s.label}</p>
              <p className="text-xl font-black text-[#111]">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-black/5 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 relative w-full">
          <input type="text" placeholder="Search by name, brand, or SKU..."
            className="w-full h-12 pl-12 pr-6 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:border-primary/30 focus:bg-white transition-all text-sm font-medium"
            value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
          <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M21 21l-4.35-4.35M19 11a8 8 0 11-16 0 8 8 0 0116 0z"/></svg>
        </div>
        <select className="h-12 px-4 bg-gray-50 border border-gray-100 rounded-xl text-[11px] font-black uppercase tracking-widest text-gray-500 outline-none cursor-pointer"
          value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}>
          <option value="">All Categories</option>
          {categoryTree.map(c => (
            <option key={c.id} value={c.name}>
              {c.depth > 0 ? `${'— '.repeat(c.depth)}${c.name}` : c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/80">
              <tr className="text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                {[
                  { label: 'Product', key: 'name' },
                  { label: 'Category', key: 'category' },
                  { label: 'Brand', key: 'brand' },
                  { label: 'Price', key: 'regularPrice' },
                  { label: 'Stock', key: 'stock' },
                  { label: 'SKU', key: 'sku' },
                  { label: 'Status', key: 'isActive' },
                ].map(col => (
                  <th key={col.key} className="px-6 py-5 cursor-pointer select-none hover:text-primary transition-colors whitespace-nowrap"
                    onClick={() => handleSort(col.key)}>
                    {col.label}<SortIcon col={col.key} />
                  </th>
                ))}
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                [1,2,3,4,5].map(i => (
                  <tr key={i}><td colSpan="8" className="px-6 py-4">
                    <div className="h-10 bg-gray-50 rounded-xl animate-pulse" /></td></tr>
                ))
              ) : products.length === 0 ? (
                <tr><td colSpan="8" className="py-20 text-center">
                  <p className="text-gray-300 text-[11px] font-black uppercase tracking-widest">No products found</p>
                </td></tr>
              ) : products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50/30 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl border border-gray-100 bg-white p-1 shrink-0 overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#111] line-clamp-1 max-w-[200px]">{p.name}</p>
                        {p.shortBrief && <p className="text-[10px] text-gray-400 line-clamp-1 max-w-[180px]">{p.shortBrief}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-[#111] text-[10px] font-black uppercase tracking-widest rounded-lg">{p.category || '—'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {p.brandImage && <img src={p.brandImage} alt={p.brand} className="w-6 h-6 object-contain rounded" />}
                      <span className="text-[11px] font-black uppercase text-primary tracking-widest">{p.brand || '—'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-black text-[#111]">৳{p.salePrice || p.regularPrice}</p>
                    {p.salePrice && <p className="text-[11px] text-gray-400 line-through">৳{p.regularPrice}</p>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${p.stock === 0 ? 'bg-primary' : p.stock < 10 ? 'bg-orange-400' : 'bg-green-500'}`} />
                      <span className="text-sm font-bold text-gray-500">{p.stock}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[11px] font-mono text-gray-400">{p.sku || '—'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${p.isActive ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                      {p.isActive ? 'Live' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openModal(p)} className="p-2 hover:bg-primary/10 text-gray-300 hover:text-primary rounded-lg transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
                      </button>
                      <button onClick={() => setConfirmDelete(p)} className="p-2 hover:bg-primary-soft text-gray-300 hover:text-primary rounded-lg transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-6 border-t border-gray-50 flex items-center justify-between">
            <span className="text-[11px] font-black uppercase text-gray-400 tracking-widest">
              Showing {(page-1)*LIMIT+1}–{Math.min(page*LIMIT, total)} of {total}
            </span>
            <div className="flex gap-2">
              <button disabled={page===1} onClick={() => setPage(p=>p-1)} className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-gray-300 hover:border-primary hover:text-primary transition-all disabled:opacity-30">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M15 19l-7-7 7-7"/></svg>
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setPage(n)} className={`w-8 h-8 rounded-lg text-[11px] font-black transition-all ${page===n ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-400'}`}>{n}</button>
              ))}
              <button disabled={page===totalPages} onClick={() => setPage(p=>p+1)} className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-gray-300 hover:border-primary hover:text-primary transition-all disabled:opacity-30">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Add/Edit Modal ── */}
      {mounted && isModalOpen && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="bg-white rounded-[40px] w-full max-w-3xl max-h-[95vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-10 pt-10 pb-6 border-b border-gray-50">
              <h2 className="text-2xl font-black text-[#111] uppercase tracking-tighter">
                {editingItem ? 'Edit Product' : 'New Product'}
              </h2>
              <button onClick={closeModal} className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-10 py-8 space-y-8">

              {/* Main Image */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Main Product Image *</label>
                <div
                  onClick={() => { const i = document.createElement('input'); i.type='file'; i.accept='image/*'; i.onchange=handleMainImageUpload; i.click(); }}
                  className="w-full aspect-[3/1] border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all overflow-hidden relative">
                  {formData.image ? (
                    <>
                      <img src={formData.image} className="w-full h-full object-contain p-4" alt="preview" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-[10px] font-black uppercase tracking-widest">Change Image</span>
                      </div>
                    </>
                  ) : uploading ? (
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-300">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      <p className="text-[10px] font-black uppercase tracking-widest">Click to upload main image</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Name */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Product Name *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInput}
                  className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111]"
                  placeholder="Full product name..." />
              </div>

              {/* Short Brief */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Short Brief</label>
                <p className="text-[10px] text-gray-400 italic -mt-1">A one-liner shown on product cards and listings.</p>
                <textarea name="shortBrief" rows="2" value={formData.shortBrief} onChange={handleInput}
                  className="w-full p-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-medium text-sm leading-relaxed"
                  placeholder="e.g. Lightweight SPF sunscreen with snail mucin for daily protection..." />
              </div>

              {/* Full Description */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Full Description</label>
                <p className="text-[10px] text-gray-400 italic -mt-1">Shown in the product detail page description tab.</p>
                <textarea name="description" rows="5" value={formData.description} onChange={handleInput}
                  className="w-full p-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-medium text-sm leading-relaxed"
                  placeholder="Full product description with benefits, usage, and details..." />
              </div>

              {/* Additional Information */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Additional Information</label>
                <p className="text-[10px] text-gray-400 italic -mt-1">Specs, volume, size, origin, shelf life, etc.</p>
                <textarea name="additionalInfo" rows="4" value={formData.additionalInfo} onChange={handleInput}
                  className="w-full p-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-medium text-sm leading-relaxed"
                  placeholder="e.g. Volume: 70ml | Origin: South Korea | Shelf Life: 36 months..." />
              </div>

              {/* Ingredients */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Ingredients</label>
                <p className="text-[10px] text-gray-400 italic -mt-1">Full INCI ingredient list shown in the ingredients tab.</p>
                <textarea name="ingredients" rows="5" value={formData.ingredients} onChange={handleInput}
                  className="w-full p-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-medium text-sm leading-relaxed"
                  placeholder="Water, Niacinamide, Glycerin, Snail Secretion Filtrate, Panthenol..." />
              </div>

              {/* Brand Selector (custom dropdown with images) */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Brand</label>
                <div className="relative" ref={brandRef}>
                  <button type="button" onClick={() => setBrandOpen(o => !o)}
                    className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 hover:border-primary/20 focus:bg-white hover:bg-white transition-all font-bold text-[#111] text-left flex items-center gap-3">
                    {formData.brandImage && (
                      <img src={formData.brandImage} alt={formData.brand} className="w-7 h-7 object-contain rounded shrink-0" />
                    )}
                    <span className={formData.brand ? 'text-[#111]' : 'text-gray-400 font-normal'}>
                      {formData.brand || 'Select a brand...'}
                    </span>
                    {formData.brand && (
                      <button type="button" onClick={(e) => { e.stopPropagation(); clearBrand(); }}
                        className="ml-auto text-gray-300 hover:text-primary transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12"/></svg>
                      </button>
                    )}
                    {!formData.brand && (
                      <svg className="w-4 h-4 ml-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M19 9l-7 7-7-7"/></svg>
                    )}
                  </button>
                  {brandOpen && (
                    <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
                      <div className="max-h-60 overflow-y-auto p-2 grid grid-cols-2 gap-2">
                        {brands.length === 0 ? (
                          <p className="col-span-2 text-center py-4 text-[11px] text-gray-400 font-black uppercase tracking-widest">No brands available</p>
                        ) : brands.map(b => (
                          <button key={b.id} type="button" onClick={() => selectBrand(b)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left hover:bg-primary/5 ${formData.brand === b.name ? 'bg-primary/10 border border-primary/20' : 'border border-transparent'}`}>
                            <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden p-1">
                              <img src={b.imageUrl} alt={b.name} className="w-full h-full object-contain" />
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-wider text-[#111] line-clamp-2">{b.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Category Selector with sub-categories */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Category</label>
                <select name="category" value={formData.category} onChange={handleInput}
                  className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111] cursor-pointer">
                  <option value="">Select a category...</option>
                  {categoryTree.map(c => (
                    <option key={c.id} value={c.name}>
                      {c.depth > 0 ? `${'— '.repeat(c.depth)} ${c.name}` : c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Regular Price (৳) *</label>
                  <input type="number" name="regularPrice" required min="0" value={formData.regularPrice} onChange={handleInput} onBlur={autoDiscount}
                    className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111]"
                    placeholder="1200" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Sale Price (৳)</label>
                  <input type="number" name="salePrice" min="0" value={formData.salePrice} onChange={handleInput} onBlur={autoDiscount}
                    className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111]"
                    placeholder="1068" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Discount Label</label>
                  <input type="text" name="discount" value={formData.discount} onChange={handleInput}
                    className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111]"
                    placeholder="11% (auto)" />
                </div>
              </div>

              {/* Stock & SKU */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Stock Quantity</label>
                  <input type="number" name="stock" min="0" value={formData.stock} onChange={handleInput}
                    className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111]"
                    placeholder="0" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">SKU / Barcode</label>
                  <input type="text" name="sku" value={formData.sku} onChange={handleInput}
                    className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111] font-mono"
                    placeholder="8809xxxxxx" />
                </div>
              </div>

              {/* Gallery */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest">Gallery Images</label>
                  <label className="cursor-pointer text-[10px] font-black uppercase text-primary hover:underline">
                    <input type="file" className="hidden" accept="image/*" multiple onChange={handleGalleryUpload} disabled={uploading} />
                    + Add Images
                  </label>
                </div>
                {formData.images?.length > 0 ? (
                  <div className="grid grid-cols-4 gap-3">
                    {formData.images.map((url, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-100 group">
                        <img src={url} alt="" className="w-full h-full object-contain p-2" />
                        <button type="button" onClick={() => removeGalleryImage(idx)}
                          className="absolute top-1 right-1 w-6 h-6 bg-primary text-white rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-16 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center text-gray-300 text-[10px] font-black uppercase tracking-widest">
                    No gallery images
                  </div>
                )}
              </div>

              {/* Active & Clearance Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-2xl">
                  <input type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleInput} className="w-5 h-5 accent-primary" />
                  <label htmlFor="isActive" className="text-[11px] font-black uppercase text-[#111] tracking-widest cursor-pointer">
                    Live / Published
                  </label>
                </div>
                <div className="flex items-center gap-4 bg-primary/5 px-6 py-4 rounded-2xl border border-primary/10">
                  <input type="checkbox" name="isClearance" id="isClearance" checked={formData.isClearance} onChange={handleInput} className="w-5 h-5 accent-primary" />
                  <label htmlFor="isClearance" className="text-[11px] font-black uppercase text-primary tracking-widest cursor-pointer">
                    Stock Clearance Item 🔥
                  </label>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={saving || uploading}
                className="w-full h-16 bg-primary text-white font-black uppercase tracking-[2px] rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/30 active:scale-95 disabled:opacity-50">
                {saving ? 'Saving...' : editingItem ? 'Update Product' : 'Create Product'}
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* ── Delete Confirm Modal ── */}
      {mounted && confirmDelete && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white rounded-[40px] p-10 max-w-sm w-full shadow-2xl flex flex-col items-center text-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-primary-soft flex items-center justify-center text-primary">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tighter text-[#111]">Delete Product?</h3>
              <p className="text-gray-400 text-sm mt-2 font-medium">"{confirmDelete.name}" will be permanently removed.</p>
            </div>
            <div className="flex gap-3 w-full">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 h-12 border-2 border-gray-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all">Cancel</button>
              <button onClick={() => handleDelete(confirmDelete.id)} className="flex-1 h-12 bg-primary text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">Delete</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

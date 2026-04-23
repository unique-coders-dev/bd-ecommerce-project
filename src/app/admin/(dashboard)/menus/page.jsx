"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const MenuManagement = () => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);
    const [editingMenu, setEditingMenu] = useState(null);
    const [formData, setFormData] = useState({
        label: '',
        href: '',
        order: 0,
        isHot: false,
        isSystem: false,
        type: 'header',
        parentId: ''
    });

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/menus');
            const data = await res.json();
            if (Array.isArray(data)) {
                setMenus(data);
            } else {
                setMenus([]);
            }
        } catch (error) {
            setMenus([]);
        } finally {
            setLoading(false);
        }
    };

    // Helper to build a tree structure for menus
    const buildTree = (items, parentId = null, type = null) => {
        return items
            .filter(item => item.parentId === parentId && (type ? item.type === type : true))
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

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    const openModal = (menu = null) => {
        if (menu) {
            setEditingMenu(menu);
            setFormData({
                label: menu.label,
                href: menu.href,
                order: menu.order,
                isHot: menu.isHot,
                isSystem: menu.isSystem || false,
                type: menu.type,
                parentId: menu.parentId || ''
            });
        } else {
            setEditingMenu(null);
            setFormData({ label: '', href: '', order: 0, isHot: false, isSystem: false, type: 'header', parentId: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingMenu(null);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.label || !formData.href) {
            alert("Label and Destination are required.");
            return;
        }

        const method = editingMenu ? 'PUT' : 'POST';
        const url = '/api/admin/menus';
        
        const payload = {
            label: formData.label,
            href: formData.href,
            order: parseInt(formData.order) || 0,
            isHot: !!formData.isHot,
            isSystem: !!formData.isSystem,
            type: formData.type || 'header',
            parentId: formData.parentId === "" ? null : formData.parentId,
        };

        if (editingMenu) {
            payload.id = editingMenu.id;
        }

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            
            let result;
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                result = await res.json();
            } else {
                const text = await res.text();
                result = { error: 'Server Error', details: text };
            }
            
            if (res.ok) {
                console.log("Menu saved successfully:", result);
                alert(editingMenu ? "Menu updated successfully!" : "New menu item created!");
                fetchMenus();
                closeModal();
            } else {
                console.error("Server error saving menu:", result);
                const msg = result.details ? `${result.error}: ${result.details}` : (result.error || "Unknown server error");
                alert(msg);
            }
        } catch (error) {
            console.error("Critical error in handleSubmit:", error);
            alert("An unexpected error occurred. Please refresh and try again.");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this menu item? Sub-items will be orphaned.')) return;
        try {
            const res = await fetch(`/api/admin/menus?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchMenus();
            } else {
                const err = await res.json();
                alert(err.error || 'Failed to delete menu');
            }
        } catch (error) {
            console.error("Failed to delete menu", error);
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-2xl lg:text-4xl font-black text-[#111] uppercase tracking-tighter">Navigation Hub</h1>
                    <p className="text-gray-400 font-medium italic">Compose your Header, Store Submenus, and Promotional Links.</p>
                </div>
                <button 
                    onClick={() => openModal()}
                    className="px-6 py-4 bg-primary text-white font-black uppercase text-[11px] tracking-widest rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/30 flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M12 4v16m8-8H4"/></svg>
                    Add Menu Item
                </button>
            </div>

            {/* List By Type */}
            {['header', 'offer', 'footer'].map(type => {
                const typeTree = buildTree(menus, null, type);
                const listItems = flattenForList(typeTree);

                return (
                    <div key={type} className="space-y-4">
                        <h3 className="text-[13px] font-black uppercase text-gray-400 tracking-[3px] ml-1">{type} Navigation</h3>
                        <div className="bg-white rounded-[32px] shadow-sm border border-black/5 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50/50">
                                        <tr className="text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                                            <th className="px-10 py-6">Label / Destination</th>
                                            <th className="px-10 py-6">Order</th>
                                            <th className="px-10 py-6">Status</th>
                                            <th className="px-10 py-6">Hierarchy</th>
                                            <th className="px-10 py-6 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50 font-medium">
                                        {loading ? (
                                            <tr><td colSpan="5" className="px-10 py-10 text-center text-gray-400">Syncing...</td></tr>
                                        ) : listItems.length === 0 ? (
                                            <tr><td colSpan="5" className="px-10 py-10 text-center text-gray-400">Empty list.</td></tr>
                                        ) : (
                                            listItems.map((menu) => (
                                                <tr key={menu.id} className="hover:bg-gray-50/30 transition-all group">
                                                    <td className="px-10 py-6">
                                                        <div className="flex items-center gap-4">
                                                            {menu.depth > 0 && (
                                                                <div className="flex" style={{ marginLeft: `${(menu.depth - 1) * 24}px` }}>
                                                                    <div className="w-6 h-10 border-l-2 border-b-2 border-gray-100 rounded-bl-xl mr-2 -mt-6"></div>
                                                                </div>
                                                            )}
                                                            <div className="flex flex-col">
                                                                <div className="flex items-center gap-2">
                                                                    <span className={`text-sm font-black ${menu.depth > 0 ? 'text-primary/70' : 'text-[#111]'}`}>{menu.label}</span>
                                                                    {menu.isHot && <span className="px-1.5 py-0.5 bg-primary-soft text-primary text-[8px] font-black uppercase rounded animate-pulse">Hot</span>}
                                                                    {menu.isSystem && <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-[8px] font-black uppercase rounded">Fixed</span>}
                                                                </div>
                                                                <span className="text-[10px] text-gray-400 font-mono">{menu.href}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-6 text-xs font-black text-gray-500">#{menu.order}</td>
                                                    <td className="px-10 py-6">
                                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                                                            Active
                                                        </span>
                                                    </td>
                                                    <td className="px-10 py-6">
                                                        <span className={`text-[10px] font-black uppercase tracking-widest ${menu.parentId ? 'text-primary' : 'text-gray-300'}`}>
                                                            {menu.parentId ? 'Sub-Item' : 'Root'}
                                                        </span>
                                                    </td>
                                                    <td className="px-10 py-6 text-right">
                                                        <div className="flex items-center justify-end gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={() => openModal(menu)} className="p-2.5 hover:bg-black/5 text-gray-400 hover:text-[#111] rounded-xl transition-all font-black">EDIT</button>
                                                            {!menu.isSystem && (
                                                                <button onClick={() => handleDelete(menu.id)} className="p-2.5 hover:bg-primary-soft text-gray-400 hover:text-primary rounded-xl transition-all font-black">DEL</button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Modal rendered via Portal to escape stacking context */}
            {mounted && isModalOpen && createPortal(
                <div
                    className="fixed inset-0 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    style={{ zIndex: 99999 }}
                    onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
                >
                    <div className="bg-white rounded-[40px] p-10 max-w-xl w-full shadow-2xl border border-white/20 overflow-y-auto max-h-[90vh]">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-[#111] uppercase tracking-tighter">
                                {editingMenu ? 'Refine Item' : 'Assemble Menu'}
                            </h2>
                            <button onClick={closeModal} className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all cursor-pointer">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12"/></svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6 text-base">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Menu Label</label>
                                    <input type="text" name="label" required className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111]" placeholder="e.g. Clearance" value={formData.label} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Link Destination</label>
                                    <input type="text" name="href" required className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111]" placeholder="/clearance" value={formData.href} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Menu Type</label>
                                    <select name="type" className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111] appearance-none" value={formData.type} onChange={handleInputChange}>
                                        <option value="header">Header Menu</option>
                                        <option value="offer">Quick Offers</option>
                                        <option value="footer">Footer Info</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Display Order</label>
                                    <input type="number" name="order" className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111]" value={formData.order} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Parent Hierarchy (Submenu)</label>
                                <select name="parentId" className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-50 rounded-2xl outline-none focus:border-primary/20 focus:bg-white transition-all font-bold text-[#111] appearance-none" value={formData.parentId} onChange={handleInputChange}>
                                    <option value="">None (Top Level)</option>
                                    {flattenForSelect(buildTree(menus, null, formData.type), 0, editingMenu?.id).map(m => (
                                        <option key={m.id} value={m.id}>
                                            {'\u00A0'.repeat(m.depth * 4)} {m.depth > 0 ? '↳ ' : ''}{m.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-2xl border-2 border-gray-50">
                                    <input type="checkbox" name="isHot" id="isHotMenu" className="w-6 h-6 accent-primary cursor-pointer" checked={formData.isHot} onChange={handleInputChange} />
                                    <label htmlFor="isHotMenu" className="text-sm font-black uppercase tracking-widest text-[#111] cursor-pointer select-none">
                                        Highlight as "HOT/🔥" Offer
                                    </label>
                                </div>

                                <div className="flex items-center gap-4 bg-gray-50 p-6 rounded-2xl border-2 border-gray-50">
                                    <input type="checkbox" name="isSystem" id="isSystemMenu" className="w-6 h-6 accent-primary cursor-pointer" checked={formData.isSystem} onChange={handleInputChange} />
                                    <label htmlFor="isSystemMenu" className="text-sm font-black uppercase tracking-widest text-[#111] cursor-pointer select-none">
                                        Mark as "Fixed/System" Menu (Cannot be deleted)
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className="w-full h-16 bg-primary text-white font-black uppercase tracking-[2px] rounded-2xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/30 active:scale-95 mt-4">
                                {editingMenu ? 'Update Navigation' : 'Establish Link'}
                            </button>
                        </form>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default MenuManagement;

"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const AVAILABLE_PAGES = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'products', label: 'Products' },
    { id: 'categories', label: 'Categories' },
    { id: 'orders', label: 'Orders' },
    { id: 'customers', label: 'Customers' },
    { id: 'promotions', label: 'Promotions' },
    { id: 'menus', label: 'Menus' },
    { id: 'settings', label: 'Settings' },
    { id: 'users', label: 'User Management' },
];

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'admin',
        permissions: []
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/users');
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setUsers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenCreate = () => {
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'admin',
            permissions: AVAILABLE_PAGES.map(p => p.id) // Default all for now, or empty
        });
        setModalMode('create');
        setShowModal(true);
    };

    const handleOpenEdit = (user) => {
        setSelectedUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            password: '', // Leave empty unless changing
            role: user.role,
            permissions: user.permissions ? user.permissions.split(',') : []
        });
        setModalMode('edit');
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        const payload = {
            ...formData,
            permissions: formData.permissions.join(','),
            id: selectedUser?.id
        };

        try {
            const res = await fetch('/api/admin/users', {
                method: modalMode === 'create' ? 'POST' : 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            
            setShowModal(false);
            fetchUsers();
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this admin?')) return;
        
        try {
            const res = await fetch(`/api/admin/users?id=${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            fetchUsers();
        } catch (err) {
            alert(err.message);
        }
    };

    const togglePermission = (id) => {
        setFormData(prev => ({
            ...prev,
            permissions: prev.permissions.includes(id) 
                ? prev.permissions.filter(p => p !== id)
                : [...prev.permissions, id]
        }));
    };

    return (
        <div className="space-y-10 pb-20">
            <div className="flex items-end justify-between border-b border-gray-100 pb-8">
                <div>
                    <h1 className="text-4xl font-black text-[#111] uppercase italic tracking-tighter">User Management</h1>
                    <p className="text-gray-400 text-[11px] font-bold uppercase mt-1 tracking-widest">Manage Admin Privileges and Page Permissions</p>
                </div>
                <button 
                    onClick={handleOpenCreate}
                    className="h-12 px-8 bg-primary text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/20 flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
                    New Admin
                </button>
            </div>

            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50 bg-gray-50/30">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">User Identity</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Role</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Active Permissions</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="4" className="px-8 py-20 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div></td></tr>
                            ) : users.map((user) => (
                                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-2xl bg-primary-soft text-primary-dark flex items-center justify-center font-black text-xs uppercase">
                                                {user.name?.[0]}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-[#111]">{user.name}</span>
                                                <span className="text-[10px] text-gray-400 font-bold">{user.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase ${
                                            user.role === 'super-admin' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-wrap gap-1 max-w-[300px]">
                                            {user.role === 'super-admin' ? (
                                                <span className="text-[9px] font-black uppercase text-primary italic">Global Master Access</span>
                                            ) : (
                                                user.permissions?.split(',').filter(Boolean).map(p => (
                                                    <span key={p} className="px-2 py-0.5 bg-gray-50 text-gray-400 rounded-md text-[8px] font-black uppercase">
                                                        {p}
                                                    </span>
                                                )) || <span className="text-[8px] text-gray-300 italic">No permissions</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right space-x-2">
                                        <button onClick={() => handleOpenEdit(user)} className="w-10 h-10 bg-gray-50 text-gray-400 hover:text-primary rounded-xl transition-all"><svg className="w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg></button>
                                        <button onClick={() => handleDelete(user.id)} className="w-10 h-10 bg-gray-50 text-gray-400 hover:text-red-500 rounded-xl transition-all"><svg className="w-4 h-4 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {mounted && showModal && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
                    <div className="bg-white rounded-[40px] w-full max-w-2xl shadow-2xl overflow-hidden animate-scaleIn">
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                            <h3 className="text-xl font-black uppercase italic text-[#111]">{modalMode === 'create' ? 'Create New Admin' : 'Edit Admin Privileges'}</h3>
                            <button onClick={() => setShowModal(false)} className="w-10 h-10 bg-gray-50 rounded-full text-gray-400 hover:text-primary transition-all flex items-center justify-center">✕</button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {error && <div className="p-4 bg-red-50 text-red-500 rounded-2xl text-xs font-bold uppercase">{error}</div>}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Full Name</label>
                                    <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full h-12 px-5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary outline-none font-bold text-sm transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Email Address</label>
                                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full h-12 px-5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary outline-none font-bold text-sm transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Account Password {modalMode === 'edit' && '(Leave blank to keep current)'}</label>
                                    <input type="password" required={modalMode === 'create'} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full h-12 px-5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary outline-none font-bold text-sm transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">System Role</label>
                                    <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full h-12 px-5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary outline-none font-bold text-sm transition-all appearance-none cursor-pointer">
                                        <option value="admin">Admin</option>
                                        <option value="super-admin">Super Admin</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Page-Level Access Permissions</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {AVAILABLE_PAGES.map(page => (
                                        <button 
                                            key={page.id}
                                            type="button"
                                            onClick={() => togglePermission(page.id)}
                                            className={`p-4 rounded-2xl border text-left transition-all ${
                                                formData.permissions.includes(page.id) 
                                                ? 'border-primary bg-primary-soft text-primary-dark shadow-sm' 
                                                : 'border-gray-100 bg-gray-50 text-gray-400'
                                            }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${formData.permissions.includes(page.id) ? 'bg-primary' : 'bg-gray-200'}`}></div>
                                                <span className="text-[10px] font-black uppercase tracking-tighter">{page.label}</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6">
                                <button disabled={saving} className="w-full h-14 bg-black text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                                    {saving ? 'Synchronizing...' : (modalMode === 'create' ? 'Provision Account' : 'Update Privileges')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}

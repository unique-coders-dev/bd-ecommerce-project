"use client";

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Save, MessageSquare, Phone, Info, Heart } from 'lucide-react';

const OrderConfirmationMessagePage = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        orderConfirmMsg1: '',
        orderConfirmMsg2: '',
        orderConfirmMsg3: '',
        orderConfirmHotline: '',
        orderConfirmFooter: ''
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/admin/settings');
            const data = await res.json();
            if (data) {
                setFormData({
                    orderConfirmMsg1: data.orderConfirmMsg1 || '',
                    orderConfirmMsg2: data.orderConfirmMsg2 || '',
                    orderConfirmMsg3: data.orderConfirmMsg3 || '',
                    orderConfirmHotline: data.orderConfirmHotline || '',
                    orderConfirmFooter: data.orderConfirmFooter || ''
                });
            }
        } catch (err) {
            toast.error("Failed to load settings");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                toast.success("Message settings updated successfully!");
            } else {
                toast.error("Failed to update settings");
            }
        } catch (err) {
            toast.error("An error occurred");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-8 max-w-[1000px] mx-auto font-roboto">
            <div>
                <h1 className="text-3xl font-black text-[#111] uppercase tracking-tighter italic">Order Confirmation Message</h1>
                <p className="text-gray-400 font-medium italic">Customize the message users see after successfully placing an order.</p>
            </div>

            <div className="bg-white rounded-[32px] shadow-sm border border-black/5 p-8 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 gap-8">
                        {/* Line 1 */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                                <MessageSquare size={14} className="text-primary" />
                                Line 1 (Confirmation Timing)
                            </label>
                            <textarea 
                                name="orderConfirmMsg1"
                                value={formData.orderConfirmMsg1}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full p-6 border border-gray-100 rounded-2xl bg-gray-50/30 outline-none focus:border-primary/30 focus:bg-white transition-all font-medium text-sm resize-none"
                                placeholder="e.g. আপনার অর্ডারটি আগামী ২৪ ঘন্টার মধ্যে..."
                            />
                        </div>

                        {/* Line 2 */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                                <MessageSquare size={14} className="text-primary" />
                                Line 2 (Delivery Timing)
                            </label>
                            <textarea 
                                name="orderConfirmMsg2"
                                value={formData.orderConfirmMsg2}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full p-6 border border-gray-100 rounded-2xl bg-gray-50/30 outline-none focus:border-primary/30 focus:bg-white transition-all font-medium text-sm resize-none"
                                placeholder="e.g. ফোন কনফার্ম হওয়ার ২৪-৪৮ ঘণ্টার মধ্যে..."
                            />
                        </div>

                        {/* Line 3 */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                                <Info size={14} className="text-primary" />
                                Line 3 (Note/Warning)
                            </label>
                            <textarea 
                                name="orderConfirmMsg3"
                                value={formData.orderConfirmMsg3}
                                onChange={handleInputChange}
                                rows="3"
                                className="w-full p-6 border border-gray-100 rounded-2xl bg-gray-50/30 outline-none focus:border-primary/30 focus:bg-white transition-all font-medium text-sm resize-none"
                                placeholder="e.g. বিঃদ্রঃ কোনো কারনে ফোন কল না পেলে..."
                            />
                        </div>

                        {/* Hotline & Footer */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                                    <Phone size={14} className="text-primary" />
                                    Customer Care Hotline
                                </label>
                                <input 
                                    name="orderConfirmHotline"
                                    value={formData.orderConfirmHotline}
                                    onChange={handleInputChange}
                                    type="text"
                                    className="w-full h-[60px] px-6 border border-gray-100 rounded-2xl bg-gray-50/30 outline-none focus:border-primary/30 focus:bg-white transition-all font-medium text-sm"
                                    placeholder="09613660321"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
                                    <Heart size={14} className="text-primary" />
                                    Footer Message
                                </label>
                                <input 
                                    name="orderConfirmFooter"
                                    value={formData.orderConfirmFooter}
                                    onChange={handleInputChange}
                                    type="text"
                                    className="w-full h-[60px] px-6 border border-gray-100 rounded-2xl bg-gray-50/30 outline-none focus:border-primary/30 focus:bg-white transition-all font-medium text-sm"
                                    placeholder="ধন্যবাদ kcbazar এর সাথে থাকার জন্য!"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <button 
                            type="submit"
                            disabled={saving}
                            className="flex items-center justify-center gap-3 px-10 py-5 bg-primary text-white font-black uppercase tracking-[2px] rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary-soft hover:text-primary transition-all active:scale-[0.98] disabled:bg-gray-200 disabled:text-gray-400"
                        >
                            <Save size={18} />
                            {saving ? 'SAVING...' : 'SAVE SETTINGS'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Preview Section */}
            <div className="space-y-4">
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-4">Live Preview</h4>
                <div className="bg-gray-50 rounded-[32px] p-8 lg:p-12 border border-dashed border-gray-200 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-8">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-black text-[#111] uppercase italic tracking-tighter mb-4">Order Successful!</h2>
                    <div className="space-y-4 max-w-[600px]">
                        <p className="text-sm font-bold text-gray-600 leading-relaxed">{formData.orderConfirmMsg1}</p>
                        <p className="text-sm font-bold text-gray-600 leading-relaxed">{formData.orderConfirmMsg2}</p>
                        <p className="text-xs font-bold text-gray-400 leading-relaxed italic bg-white p-6 rounded-2xl border border-gray-100">
                            {formData.orderConfirmMsg3}
                            <br />
                            <span className="text-[#111] not-italic mt-2 block">কাস্টমার কেয়ার নাম্বারঃ <span className="text-primary">{formData.orderConfirmHotline}</span></span>
                        </p>
                        <p className="text-sm font-black text-primary uppercase tracking-[2px] pt-4">{formData.orderConfirmFooter}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationMessagePage;

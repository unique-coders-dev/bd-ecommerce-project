"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const updateQuantityStore = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getCartTotal = useCartStore((state) => state.getCartTotal);
  const getCartSubtotal = useCartStore((state) => state.getCartSubtotal);
  const getCartDiscount = useCartStore((state) => state.getCartDiscount);
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const setAppliedCoupon = useCartStore((state) => state.setAppliedCoupon);
  const clearAppliedCoupon = useCartStore((state) => state.clearAppliedCoupon);
  const getCouponDiscount = useCartStore((state) => state.getCouponDiscount);

  const [couponInput, setCouponInput] = useState('');
  const [verifying, setVerifying] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateQuantity = (id, delta) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      updateQuantityStore(id, item.quantity + delta);
    }
  };

  const removeItem = (id) => {
    removeFromCart(id);
  };

  const handleApplyCoupon = async () => {
    if (!couponInput) return;
    setVerifying(true);
    const loadingToast = toast.loading("Verifying coupon...");
    try {
        const res = await fetch('/api/coupons/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: couponInput, cartTotal: getCartTotal() })
        });
        const data = await res.json();
        if (res.ok) {
            setAppliedCoupon(data);
            toast.success(`Coupon "${data.code}" applied!`, { id: loadingToast });
            setCouponInput('');
        } else {
            toast.error(data.error, { id: loadingToast });
        }
    } catch (err) {
        toast.error("Network error", { id: loadingToast });
    } finally {
        setVerifying(false);
    }
  };

  const [openFaq, setOpenFaq] = useState(0);

  if (!mounted) return null;

  return (
    <div className="bg-[#f2f2f2] min-h-screen py-10">
      <div className="max-w-[1320px] mx-auto px-4">
        
        {/* Step Banner */}
        <div className="bg-[var(--color-primary)] text-white py-8 lg:py-12 rounded-xl mb-10 shadow-lg shadow-[var(--color-primary)]/10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-10 text-sm md:text-xl font-black uppercase">
             <span className="opacity-100 flex items-center gap-2">Shopping Cart</span>
             <span className="hidden md:inline opacity-40">→</span>
             <span className="opacity-40">Checkout</span>
             <span className="hidden md:inline opacity-40">→</span>
             <span className="opacity-40">Order Complete</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Cart Area */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-[11px] font-black uppercase text-gray-400">
                      <th className="py-6 px-6">Product</th>
                      <th className="py-6 px-4">Quantity</th>
                      <th className="py-6 px-4 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {cartItems.map(item => {
                        const discountVal = parseFloat(item.discount);
                        const hasDiscountLabel = discountVal > 0;
                        const effectiveSalePrice = item.salePrice > 0 && item.salePrice < item.regularPrice 
                          ? item.salePrice 
                          : (hasDiscountLabel ? Math.round(item.regularPrice * (1 - discountVal / 100)) : item.regularPrice);
                        const isDiscounted = effectiveSalePrice < item.regularPrice;

                        return (
                          <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                            <td className="py-6 px-6">
                              <div className="flex items-center gap-4">
                                <button 
                                   onClick={() => removeItem(item.id)}
                                   className="text-gray-300 hover:text-primary-light0 transition-colors cursor-pointer"
                                >
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
                                </button>
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain border border-gray-100 rounded-lg bg-white" />
                                <Link href={`/product/${item.id}`} className="text-sm font-bold text-[#111] leading-tight max-w-[250px] hover:text-[var(--color-primary)] transition-colors">{item.name}</Link>
                              </div>
                            </td>
                            <td className="py-6 px-4">
                              <div className="flex items-center border border-gray-200 rounded-lg w-fit bg-white h-[40px]">
                                <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-full flex items-center justify-center text-gray-400 hover:text-[var(--color-primary)] cursor-pointer active:scale-90">-</button>
                                <span className="w-8 text-center font-bold text-[#111] text-xs">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-full flex items-center justify-center text-gray-400 hover:text-[var(--color-primary)] cursor-pointer active:scale-90">+</button>
                              </div>
                            </td>
                            <td className="py-6 px-4 text-right">
                               <div className="flex items-center gap-2 justify-end">
                                  {isDiscounted ? (
                                    <>
                                      <span className="text-[12px] text-gray-300 line-through font-medium">৳ {item.regularPrice * item.quantity}</span>
                                      <span className="text-sm font-black text-[var(--color-primary)]">৳ {effectiveSalePrice * item.quantity}</span>
                                    </>
                                  ) : (
                                    <span className="text-sm font-black text-[var(--color-primary)]">৳ {item.regularPrice * item.quantity}</span>
                                  )}
                               </div>
                            </td>
                          </tr>
                        );
                    })}
                    {cartItems.length === 0 && (
                        <tr>
                            <td colSpan="3" className="py-20 text-center">
                                <p className="text-gray-400 font-bold mb-4">Your cart is empty!</p>
                                <Link href="/shop" className="inline-block py-3 px-8 bg-[var(--color-primary)] text-white font-black uppercase text-xs rounded-lg">Return To Shop</Link>
                            </td>
                        </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="p-6 bg-gray-50/30 flex flex-col md:flex-row justify-between gap-4">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Coupon code" 
                    className="h-[46px] px-6 border border-gray-200 rounded-lg bg-white outline-none focus:border-[var(--color-primary)]/30 w-full md:w-[240px] text-sm uppercase font-bold tracking-widest" 
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                  />
                  <button 
                    onClick={handleApplyCoupon}
                    disabled={verifying || !couponInput}
                    className="h-[46px] px-8 bg-[var(--color-primary)] text-white font-black uppercase text-xs rounded-lg hover:bg-[#e64462] transition-colors cursor-pointer active:scale-95 whitespace-nowrap disabled:bg-gray-300"
                  >
                    {verifying ? 'Applying...' : 'Apply Coupon'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="w-full lg:w-[400px] flex flex-col gap-6">
            
            {/* Cart Totals */}
            <div className="bg-white rounded-xl shadow-sm border border-black/5 p-8">
               <h3 className="text-xl font-black text-[#111] uppercase mb-8 pb-4 border-b border-gray-100">Cart Totals</h3>
               <div className="space-y-6">
                 <div className="flex justify-between items-center text-sm">
                   <span className="font-bold text-gray-500 uppercase text-[11px]">Subtotal</span>
                   <span className="font-black text-[#111]">৳ {mounted ? getCartSubtotal() : 0}</span>
                 </div>
                 {mounted && getCartDiscount() > 0 && (
                   <div className="flex justify-between items-center text-sm">
                     <span className="font-bold text-gray-500 uppercase text-[11px]">Product Discount</span>
                     <span className="font-black text-green-500">- ৳ {getCartDiscount()}</span>
                   </div>
                 )}
                 {mounted && appliedCoupon && (
                   <div className="flex justify-between items-center text-sm">
                     <span className="font-bold text-green-600 uppercase text-[11px]">Promo Discount ({appliedCoupon.code})</span>
                     <div className="flex items-center gap-2">
                        <span className="font-black text-green-600">- ৳ {getCouponDiscount()}</span>
                        <button onClick={clearAppliedCoupon} className="text-[10px] text-primary font-black uppercase hover:underline cursor-pointer">Remove</button>
                     </div>
                   </div>
                 )}
                 <div className="pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                       <span className="font-bold text-gray-500 uppercase text-[11px]">Shipment</span>
                       <span className="font-bold text-gray-600 text-sm">Free shipping</span>
                    </div>
                 </div>
                 <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                    <span className="font-black text-[#111] uppercase text-sm">Total</span>
                    <span className="text-2xl font-black text-[var(--color-primary)]">৳ {mounted ? getCartTotal() : 0}</span>
                 </div>
                 <Link href="/checkout" className="w-full h-[56px] bg-[var(--color-primary)] text-white flex items-center justify-center font-black uppercase rounded-xl text-sm shadow-xl shadow-[var(--color-primary)]/20 hover:bg-[#e64462] transition-all active:scale-[0.98] cursor-pointer mt-4">Proceed To Checkout</Link>
               </div>
            </div>


          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;

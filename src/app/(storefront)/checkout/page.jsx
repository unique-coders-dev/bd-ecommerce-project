"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useSession, signIn } from 'next-auth/react';

const Checkout = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    district: 'Bandarban',
    thana: '',
    address: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    courier: 'Steadfast',
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [verifyingCoupon, setVerifyingCoupon] = useState(false);

  const cartItems = useCartStore((state) => state.cartItems);
  const getCartTotal = useCartStore((state) => state.getCartTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const appliedCoupon = useCartStore((state) => state.appliedCoupon);
  const setAppliedCoupon = useCartStore((state) => state.setAppliedCoupon);
  const clearAppliedCoupon = useCartStore((state) => state.clearAppliedCoupon);
  const getCouponDiscount = useCartStore((state) => state.getCouponDiscount);
  const getCartSubtotal = useCartStore((state) => state.getCartSubtotal);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mounted && !orderPlaced && cartItems.length === 0) {
        toast.error("Your cart is empty!");
        router.push('/shop');
    }
  }, [mounted, cartItems.length, orderPlaced]);

  useEffect(() => {
    if (!orderPlaced && cartItems.length === 0) {
        router.push('/cart');
        return;
    }

    if (session?.user) {
        fetch('/api/user/profile')
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setFormData(prev => ({
                        ...prev,
                        name: data.name || prev.name,
                        email: data.email || prev.email,
                        mobile: data.phone || prev.mobile,
                        address: data.address || prev.address,
                        district: data.district || prev.district,
                        thana: data.city || prev.thana
                    }));
                }
            });
    }
  }, [session, cartItems.length, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setVerifyingCoupon(true);
    try {
        const res = await fetch('/api/coupons/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: couponCode, cartTotal: Math.round(getCartTotal()) })
        });
        const data = await res.json();
        if (res.ok) {
            setAppliedCoupon(data);
            toast.success(`Coupon "${data.code}" applied!`);
        } else {
            toast.error(data.error);
        }
    } catch (err) {
        toast.error("Failed to verify coupon");
    } finally {
        setVerifyingCoupon(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!formData.name || !formData.mobile || !formData.address || !formData.district) {
        toast.error("Please fill in all required fields!");
        return;
    }

    if (!session && formData.password) {
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters!");
            return;
        }
    }

    setLoading(true);
    try {
        const orderData = {
            ...formData,
            items: cartItems,
            subtotal: Math.round(getCartSubtotal()),
            total: Math.round(getCartTotal()),
            discount: Math.round(getCouponDiscount()),
            couponId: appliedCoupon?.id,
            shippingFee: 0,
            paymentMethod: 'COD'
        };

        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        if (res.ok) {
            const order = await res.json();
            setOrderPlaced(true);
            
            // Auto login if account was created
            if (!session && formData.password) {
                await signIn('credentials', {
                    email: formData.email,
                    password: formData.password,
                    redirect: false
                });
            }

            clearCart();
            toast.success("Order placed successfully!");
            router.push(`/order-complete?id=${order.id}&num=${order.orderNumber}`);
        } else {
            const err = await res.json();
            toast.error(err.details || err.error || "Failed to place order");
        }
    } catch (err) {
        toast.error("An error occurred. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  const districts = [
    "Bandarban", "Brahmanbaria", "Chandpur", "Chittagong", "Comilla", "Cox's Bazar", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati",
    "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur", "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail",
    "Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna", "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira",
    "Jamalpur", "Mymensingh", "Netrokona", "Sherpur",
    "Bogra", "Joypurhat", "Naogaon", "Natore", "Chapai Nawabganj", "Pabna", "Rajshahi", "Sirajganj",
    "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon",
    "Habiganj", "Moulvibazar", "Sunamganj", "Sylhet",
    "Barguna", "Barisal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur"
  ].sort();

  return (
    <div className="bg-[#f2f2f2] min-h-screen py-10 font-roboto">
      <div className="max-w-[1320px] mx-auto px-4">
        
        {/* Step Banner */}
        <div className="bg-[var(--color-primary)] text-white py-8 lg:py-12 rounded-xl mb-10 shadow-lg shadow-[var(--color-primary)]/10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-10 text-sm md:text-xl font-black uppercase tracking-[2px] lg:tracking-[4px]">
             <Link href="/cart" className="opacity-40 hover:opacity-100 transition-opacity">Shopping Cart</Link>
             <span className="hidden md:inline opacity-40">→</span>
             <span className="opacity-100 flex items-center gap-2">Checkout</span>
             <span className="hidden md:inline opacity-40">→</span>
             <span className="opacity-40">Order Complete</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
          
          {/* Billing Details Form */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-black/5 p-8 lg:p-12">
               <h3 className="text-xl font-black text-[#111] uppercase tracking-tighter mb-10 border-b border-gray-100 pb-4">Billing Details</h3>
               
               <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Name (নাম) <span className="text-primary-light0">*</span></label>
                    <input 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        type="text" 
                        className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[var(--color-primary)]/30 focus:bg-white transition-all font-medium text-sm" 
                    />
                  </div>

                 <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Country (দেশ) <span className="text-primary-light0">*</span></label>
                    <select className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[var(--color-primary)]/30 focus:bg-white transition-all font-medium text-sm appearance-none cursor-pointer">
                        <option>Bangladesh</option>
                    </select>
                 </div>

                  <div>
                     <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">District (জেলা) <span className="text-primary-light0">*</span></label>
                     <select 
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[var(--color-primary)]/30 focus:bg-white transition-all font-medium text-sm cursor-pointer"
                    >
                         {districts.map(d => (
                             <option key={d} value={d}>{d}</option>
                         ))}
                     </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Thana (উপজেলা বা থানা) <span className="text-primary-light0">*</span></label>
                    <input 
                        name="thana"
                        value={formData.thana}
                        onChange={handleInputChange}
                        required
                        type="text" 
                        className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[var(--color-primary)]/30 focus:bg-white transition-all font-medium text-sm" 
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Address (ঠিকানা) <span className="text-primary-light0">*</span></label>
                    <input 
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        type="text" 
                        placeholder="House number and street name" 
                        className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[var(--color-primary)]/30 focus:bg-white transition-all font-medium text-sm" 
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Mobile Number (মোবাইল নাম্বার) <span className="text-primary-light0">*</span></label>
                    <input 
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        required
                        type="text" 
                        className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[var(--color-primary)]/30 focus:bg-white transition-all font-medium text-sm" 
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Email Address (ইমেইল এড্রেস)</label>
                    <input 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email" 
                        className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[var(--color-primary)]/30 focus:bg-white transition-all font-medium text-sm" 
                    />
                  </div>

                  {!session && status !== 'loading' && (
                    <>
                        <div className="pt-4 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-[11px] font-black text-[#111] uppercase tracking-[2px]">Create an account (Mandatory)</h4>
                                <Link href="/auth/login" className="text-[10px] font-black text-[var(--color-primary)] uppercase hover:underline">Already have an account? Login</Link>
                            </div>
                            <p className="text-[10px] text-gray-400 font-bold mb-6 italic">Account creation is mandatory for tracking your order and beauty history.</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Password (পাসওয়ার্ড) *</label>
                                    <input 
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        type="password" 
                                        placeholder="Min 6 characters"
                                        className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[var(--color-primary)]/30 focus:bg-white transition-all font-medium text-sm" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Confirm Password *</label>
                                    <input 
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                        type="password" 
                                        className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[var(--color-primary)]/30 focus:bg-white transition-all font-medium text-sm" 
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                  )}

                  <div>
                     <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Courier (কুরিয়ার) (optional)</label>
                     <select 
                        name="courier"
                        value={formData.courier}
                        onChange={handleInputChange}
                        className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[var(--color-primary)]/30 focus:bg-white transition-all font-medium text-sm cursor-pointer"
                    >
                         <option value="Steadfast">Steadfast</option>
                         <option value="Pathao">Pathao</option>
                         <option value="Sundarban">Sundarban</option>
                     </select>
                     <p className="mt-2 text-[11px] text-gray-400 italic">আপনার পছন্দের কুরিয়ার সার্ভিস থাকলে এখানে সিলেক্ট করতে পারেন। অন্যথায় অটোমেটিক সার্ভিস সিলেক্ট হবে। </p>
                  </div>



                  <div className="mt-4">
                     <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Order notes (optional)</label>
                     <textarea 
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Notes about your order, e.g. special notes for delivery." 
                        className="w-full h-[120px] p-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[var(--color-primary)]/30 focus:bg-white transition-all font-medium text-sm resize-none"
                    ></textarea>
                  </div>
               </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-[450px] flex flex-col gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-black/5 p-8 lg:p-10 sticky top-20">
               <h3 className="text-xl font-black text-[#111] uppercase tracking-tighter mb-8 pb-4 border-b border-gray-100">Your Order</h3>
               
               <div className="space-y-6">
                 <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-[2px] text-gray-400">
                    <span>Product</span>
                    <span>Subtotal</span>
                 </div>
                 
                 <div className="space-y-4">
                    {mounted && cartItems.map((item, i) => (
                      <div key={i} className="flex justify-between items-start gap-4">
                        <span className="text-sm font-bold text-gray-600 leading-tight">
                            {item.name} × {item.quantity}
                        </span>
                        <span className="text-sm font-black text-[#111] whitespace-nowrap">৳ {(item.salePrice || item.regularPrice || 0) * item.quantity}</span>
                      </div>
                    ))}
                 </div>

                 <div className="pt-6 border-t border-gray-100 space-y-4">
                     {/* Coupon Input */}
                     <div className="bg-gray-50/50 p-4 rounded-xl border border-dashed border-gray-200">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 block">Promo Code</label>
                        <div className="flex gap-2">
                           <input 
                              type="text" 
                              placeholder="Have a coupon?"
                              className="flex-1 h-10 px-4 bg-white border border-gray-100 rounded-lg outline-none focus:border-primary/30 text-sm font-bold uppercase tracking-widest"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                           />
                           <button 
                              onClick={handleApplyCoupon}
                              disabled={verifyingCoupon || !couponCode}
                              className="px-4 h-10 bg-[#111] text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-black transition-all disabled:bg-gray-300"
                           >
                              {verifyingCoupon ? '...' : 'Apply'}
                           </button>
                        </div>
                        {appliedCoupon && (
                           <div className="mt-2 flex items-center justify-between">
                              <span className="text-[10px] font-black text-green-600 uppercase tracking-widest">Applied: {appliedCoupon.code}</span>
                              <button onClick={() => { clearAppliedCoupon(); setCouponCode(''); }} className="text-[10px] text-primary font-black uppercase">Remove</button>
                           </div>
                        )}
                     </div>

                     <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-gray-400 uppercase tracking-widest text-[11px]">Subtotal</span>
                        <span className="font-black text-[#111]">৳ {mounted ? Math.round(getCartSubtotal()) : 0}</span>
                     </div>
                     {appliedCoupon && (
                        <div className="flex justify-between items-center text-sm">
                           <span className="font-bold text-green-600 uppercase tracking-widest text-[11px]">Promo Discount</span>
                           <span className="font-black text-green-600">- ৳ {Math.round(getCouponDiscount())}</span>
                        </div>
                     )}
                     <div className="flex justify-between items-center text-sm">
                        <span className="font-bold text-gray-400 uppercase tracking-widest text-[11px]">Shipment</span>
                        <span className="font-bold text-gray-600">Free shipping</span>
                     </div>
                     <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                        <span className="font-black text-[#111] uppercase tracking-widest text-sm">Total</span>
                        <span className="text-2xl font-black text-[var(--color-primary)]">৳ {mounted ? Math.round(getCartTotal()) : 0}</span>
                     </div>
                  </div>

                 {/* Payment Information */}
                 <div className="pt-10 space-y-6">
                    <h4 className="text-[12px] font-black text-[#111] uppercase tracking-[2px] border-l-4 border-[var(--color-primary)] pl-3">Payment Information</h4>
                    
                    <div className="space-y-4">
                        <label className="flex items-center gap-4 p-4 border border-gray-50 rounded-xl bg-gray-50/30 cursor-pointer hover:border-[var(--color-primary)]/30 transition-all">
                            <input type="radio" name="payment" defaultChecked className="w-5 h-5 accent-[var(--color-primary)]" />
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-[#111] uppercase tracking-widest">Cash on delivery</span>
                                <span className="text-[11px] text-gray-400 font-medium">Pay with cash upon delivery.</span>
                            </div>
                        </label>
                    </div>

                    <p className="text-[11px] text-gray-400 leading-loose font-medium px-2">
                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <Link href="/privacy" className="text-[var(--color-primary)] hover:underline">privacy policy</Link>. 
                        <br /> I have read and agree to the website <Link href="/terms" className="text-[var(--color-primary)] hover:underline">Terms & Conditions</Link>, <Link href="/refund" className="text-[var(--color-primary)] hover:underline">Return & Refund policy</Link>.
                    </p>

                    <button 
                        type="submit"
                        disabled={loading || !mounted || cartItems.length === 0}
                        className={`w-full h-[64px] ${loading ? 'bg-gray-400' : 'bg-primary'} text-white flex items-center justify-center font-black uppercase tracking-[3px] rounded-xl text-[15px] shadow-2xl shadow-primary/30 hover:bg-primary-soft hover:text-primary transition-all active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed`}
                    >
                        {loading ? 'Processing...' : 'Place Order'}
                    </button>
                 </div>
               </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;

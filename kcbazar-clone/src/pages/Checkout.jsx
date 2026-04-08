import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    country: 'Bangladesh',
    district: '',
    thana: '',
    address: '',
    mobile: '',
    email: '',
    courier: 'Steadfast',
    shipToDifferent: false
  });

  const cartItems = [
    { name: "Nature Skin Jeju Green Tea CICA Hydrating Facial Foam 152 ml", quantity: 1, subtotal: 800 }
  ];

  return (
    <div className="bg-[#f2f2f2] min-h-screen py-10 font-sans">
      <div className="max-w-[1320px] mx-auto px-4">
        
        {/* Step Banner */}
        <div className="bg-[#FF4D6D] text-white py-8 lg:py-12 rounded-xl mb-10 shadow-lg shadow-[#FF4D6D]/10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-10 text-sm md:text-xl font-black uppercase tracking-[2px] lg:tracking-[4px]">
             <Link to="/cart" className="opacity-40 hover:opacity-100 transition-opacity">Shopping Cart</Link>
             <span className="hidden md:inline opacity-40">→</span>
             <span className="opacity-100 flex items-center gap-2">Checkout</span>
             <span className="hidden md:inline opacity-40">→</span>
             <span className="opacity-40">Order Complete</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Billing Details Form */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-black/5 p-8 lg:p-12">
               <h3 className="text-xl font-black text-[#111] uppercase tracking-tighter mb-10 border-b border-gray-100 pb-4">Billing Details</h3>
               
               <div className="grid grid-cols-1 gap-6">
                 <div>
                   <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Name (নাম) <span className="text-red-500">*</span></label>
                   <input type="text" className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[#FF4D6D]/30 focus:bg-white transition-all font-medium text-sm" />
                 </div>

                 <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Country (দেশ) <span className="text-red-500">*</span></label>
                    <select className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[#FF4D6D]/30 focus:bg-white transition-all font-medium text-sm appearance-none">
                        <option>Bangladesh</option>
                    </select>
                 </div>

                 <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">District (জেলা) <span className="text-red-500">*</span></label>
                    <select className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[#FF4D6D]/30 focus:bg-white transition-all font-medium text-sm">
                        <option>Banderban</option>
                        <option>Dhaka</option>
                        <option>Chittagong</option>
                    </select>
                 </div>

                 <div>
                   <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Thana (উপজেলা বা থানা) <span className="text-red-500">*</span></label>
                   <input type="text" className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[#FF4D6D]/30 focus:bg-white transition-all font-medium text-sm" />
                 </div>

                 <div>
                   <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Address (ঠিকানা) <span className="text-red-500">*</span></label>
                   <input type="text" placeholder="House number and street name" className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[#FF4D6D]/30 focus:bg-white transition-all font-medium text-sm" />
                 </div>

                 <div>
                   <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Mobile Number (মোবাইল নাম্বার) <span className="text-red-500">*</span></label>
                   <input type="text" className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[#FF4D6D]/30 focus:bg-white transition-all font-medium text-sm" />
                 </div>

                 <div>
                   <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Email Address (ইমেইল এড্রেস)</label>
                   <input type="email" className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[#FF4D6D]/30 focus:bg-white transition-all font-medium text-sm" />
                 </div>

                 <div>
                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Courier (কুরিয়ার) (optional)</label>
                    <select className="w-full h-[54px] px-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[#FF4D6D]/30 focus:bg-white transition-all font-medium text-sm">
                        <option>Steadfast</option>
                        <option>Pathao</option>
                        <option>Sundarban</option>
                    </select>
                    <p className="mt-2 text-[11px] text-gray-400 italic">আপনার পছন্দের কুরিয়ার সার্ভিস থাকলে এখানে সিলেক্ট করতে পারেন। অন্যথায় অটোমেটিক সার্ভিস সিলেক্ট হবে। </p>
                 </div>

                 <div className="pt-4 border-t border-gray-50">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-5 h-5 accent-[#FF4D6D]" />
                        <span className="text-sm font-black text-[#111] group-hover:text-[#FF4D6D] transition-colors uppercase tracking-widest">Ship to a different address?</span>
                    </label>
                 </div>

                 <div className="mt-4">
                    <label className="block text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2">Order notes (optional)</label>
                    <textarea placeholder="Notes about your order, e.g. special notes for delivery." className="w-full h-[120px] p-6 border border-gray-100 rounded-lg bg-gray-50/30 outline-none focus:border-[#FF4D6D]/30 focus:bg-white transition-all font-medium text-sm resize-none"></textarea>
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
                    {cartItems.map((item, i) => (
                      <div key={i} className="flex justify-between items-start gap-4">
                        <span className="text-sm font-bold text-gray-600 leading-tight">
                            {item.name} × {item.quantity}
                        </span>
                        <span className="text-sm font-black text-[#111] whitespace-nowrap">৳ {item.subtotal}</span>
                      </div>
                    ))}
                 </div>

                 <div className="pt-6 border-t border-gray-100 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                       <span className="font-bold text-gray-400 uppercase tracking-widest text-[11px]">Subtotal</span>
                       <span className="font-black text-[#111]">৳ 800</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                       <span className="font-bold text-gray-400 uppercase tracking-widest text-[11px]">Shipment</span>
                       <span className="font-bold text-gray-600">Free shipping</span>
                    </div>
                    <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                       <span className="font-black text-[#111] uppercase tracking-widest text-sm">Total</span>
                       <span className="text-2xl font-black text-[#FF4D6D]">৳ 800</span>
                    </div>
                 </div>

                 {/* Payment Information */}
                 <div className="pt-10 space-y-6">
                    <h4 className="text-[12px] font-black text-[#111] uppercase tracking-[2px] border-l-4 border-[#FF4D6D] pl-3">Payment Information</h4>
                    
                    <div className="space-y-4">
                        <label className="flex items-center gap-4 p-4 border border-gray-50 rounded-xl bg-gray-50/30 cursor-pointer hover:border-[#FF4D6D]/30 transition-all">
                            <input type="radio" name="payment" defaultChecked className="w-5 h-5 accent-[#FF4D6D]" />
                            <div className="flex flex-col">
                                <span className="text-sm font-black text-[#111] uppercase tracking-widest">Cash on delivery</span>
                                <span className="text-[11px] text-gray-400 font-medium">Pay with cash upon delivery.</span>
                            </div>
                        </label>
                    </div>

                    <p className="text-[11px] text-gray-400 leading-loose font-medium px-2">
                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <Link to="/privacy" className="text-[#FF4D6D] hover:underline">privacy policy</Link>. 
                        <br /> I have read and agree to the website <Link to="/terms" className="text-[#FF4D6D] hover:underline">Terms & Conditions</Link>, <Link to="/refund" className="text-[#FF4D6D] hover:underline">Return & Refund policy</Link>.
                    </p>

                    <Link to="/order-complete" className="w-full h-[64px] bg-[#FF4D6D] text-white flex items-center justify-center font-black uppercase tracking-[3px] rounded-xl text-[15px] shadow-2xl shadow-[#FF4D6D]/30 hover:bg-[#e64462] transition-all active:scale-[0.98] cursor-pointer">Place Order</Link>
                 </div>
               </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;

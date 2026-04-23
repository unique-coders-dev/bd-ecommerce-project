"use client";

import React, { useState } from 'react';
import Link from 'next/link';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Nature Skin Jeju Green Tea CICA Hydrating Facial Foam 152 ml",
      price: 800,
      quantity: 1,
      image: "https://kcbazar.com/wp-content/uploads/2023/12/Nature-Skin-Jeju-Green-Tea-CICA-Hydrating-Facial-Foam-152-ml-300x300.jpg"
    }
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const deliveryFaqs = [
    { question: "My order hasn't arrived yet. Where is it?", answer: "পণ্য সঠিক সময়ে আপনার কাছে না পৌঁছালে সরাসরি আমাদের হট লাইন (09613660321) নাম্বারে যোগাযোগ করুন এবং সমস্যাটির কথা জানান। আমরা দ্রুত ব্যবস্থা নিব।" },
    { question: "Do you deliver on public holidays?", answer: "হ্যাঁ, আমরা ছুটির দিনগুলোতেও নির্দিষ্ট এলাকাভেদে ডেলিভারি দিয়ে থাকি।" },
    { question: "Do you deliver to my postcode?", answer: "আমরা সারা বাংলাদেশে হোম ডেলিভারি দিয়ে থাকি।" },
    { question: "Want more about Delivery & Return?", answer: "আমাদের ডেলিভারি ও রিটার্ন পলিসি বিস্তারিত জানতে লিংকে ক্লিক করুন।" }
  ];

  const [openFaq, setOpenFaq] = useState(0);

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
                      <th className="py-6 px-4">Price</th>
                      <th className="py-6 px-4">Quantity</th>
                      <th className="py-6 px-6">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {cartItems.map(item => (
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
                        <td className="py-6 px-4 text-sm font-bold text-gray-500">৳ {item.price}</td>
                        <td className="py-6 px-4">
                          <div className="flex items-center border border-gray-200 rounded-lg w-fit bg-white h-[44px]">
                            <button onClick={() => updateQuantity(item.id, -1)} className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-[var(--color-primary)] cursor-pointer active:scale-90">-</button>
                            <span className="w-10 text-center font-bold text-[#111]">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-[var(--color-primary)] cursor-pointer active:scale-90">+</button>
                          </div>
                        </td>
                        <td className="py-6 px-6 text-sm font-black text-[var(--color-primary)]">৳ {item.price * item.quantity}</td>
                      </tr>
                    ))}
                    {cartItems.length === 0 && (
                        <tr>
                            <td colSpan="4" className="py-20 text-center">
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
                  <input type="text" placeholder="Coupon code" className="h-[46px] px-6 border border-gray-200 rounded-lg bg-white outline-none focus:border-[var(--color-primary)]/30 w-full md:w-[240px] text-sm" />
                  <button className="h-[46px] px-8 bg-[var(--color-primary)] text-white font-black uppercase text-xs rounded-lg hover:bg-[#e64462] transition-colors cursor-pointer active:scale-95 whitespace-nowrap">Apply Coupon</button>
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
                   <span className="font-black text-[#111]">৳ {calculateSubtotal()}</span>
                 </div>
                 <div className="pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                       <span className="font-bold text-gray-500 uppercase text-[11px] pt-1">Shipment</span>
                       <div className="text-right flex flex-col items-end gap-2">
                          <p className="text-[12px] text-gray-400 leading-relaxed max-w-[180px]">Enter your address to view shipping options.</p>
                          <button className="text-[var(--color-primary)] font-black text-[11px] uppercase hover:underline underline-offset-4 cursor-pointer">Calculate shipping</button>
                       </div>
                    </div>
                 </div>
                 <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                    <span className="font-black text-[#111] uppercase text-sm">Total</span>
                    <span className="text-2xl font-black text-[var(--color-primary)]">৳ {calculateSubtotal()}</span>
                 </div>
                 <Link href="/checkout" className="w-full h-[56px] bg-[var(--color-primary)] text-white flex items-center justify-center font-black uppercase rounded-xl text-sm shadow-xl shadow-[var(--color-primary)]/20 hover:bg-[#e64462] transition-all active:scale-[0.98] cursor-pointer mt-4">Proceed To Checkout</Link>
               </div>
            </div>

            {/* Shipping & Delivery FAQ */}
            <div className="bg-white rounded-xl shadow-sm border border-black/5 p-8">
                <h4 className="text-lg font-black text-[#111] uppercase mb-6">Shipping & Delivery</h4>
                <div className="space-y-4">
                    {deliveryFaqs.map((faq, i) => (
                        <div key={i} className="border border-gray-50 rounded-lg overflow-hidden">
                            <button 
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full flex items-center justify-between p-4 text-left font-bold text-[13px] text-[#111] hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <span className={openFaq === i ? 'text-[var(--color-primary)]' : ''}>{faq.question}</span>
                                <svg className={`w-4 h-4 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-[var(--color-primary)]' : 'text-gray-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M19 9l-7 7-7-7"/></svg>
                            </button>
                            {openFaq === i && (
                                <div className="p-4 pt-0 text-[12px] text-gray-500 leading-loose border-t border-gray-50 bg-gray-50/20 font-medium">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;

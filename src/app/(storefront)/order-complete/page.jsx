import React from 'react';
import Link from 'next/link';

const OrderComplete = () => {
  return (
    <div className="bg-[#f2f2f2] min-h-screen py-10 font-sans">
      <div className="max-w-[1320px] mx-auto px-4">
        
        {/* Step Banner */}
        <div className="bg-[#FF4D6D] text-white py-8 lg:py-12 rounded-xl mb-10 shadow-lg shadow-[#FF4D6D]/10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-10 text-sm md:text-xl font-black uppercase tracking-[2px] lg:tracking-[4px]">
             <Link href="/cart" className="opacity-40 hover:opacity-100 transition-opacity">Shopping Cart</Link>
             <span className="hidden md:inline opacity-40">→</span>
             <Link href="/checkout" className="opacity-40 hover:opacity-100 transition-opacity">Checkout</Link>
             <span className="hidden md:inline opacity-40">→</span>
             <span className="opacity-100 flex items-center gap-2">Order Complete</span>
          </div>
        </div>

        {/* Confirmation Content */}
        <div className="max-w-[900px] mx-auto space-y-8">
            
            {/* Info Box (Bengali) */}
            <div className="bg-white border-2 border-dashed border-[#FF4D6D]/20 p-8 rounded-2xl text-center shadow-sm">
                <div className="space-y-4 text-gray-700 leading-loose">
                    <p className="text-lg font-black text-[#111]">আপনার অর্ডারটি আগামী ২৪ ঘন্টার মধ্যে আমাদের কাস্টমার কেয়ার প্রতিনিধি ফোন দিয়ে কনফার্ম করবেন <br/> (শুক্রবার ব্যতীত)।</p>
                    <p className="font-bold">ফোন কনফার্ম হওয়ার ২৪-৪৮ ঘণ্টার মধ্যে আপনি আপনার অর্ডারটি হাতে পেয়ে যাবেন।</p>
                    <p className="text-[#FF4D6D] font-black text-sm italic py-2">বিঃদ্রঃ কোনো কারনে ফোন কল না পেলে, আপনার অর্ডারটি হোল্ড অবস্থায় থাকবে। অনুগ্রহ করে আমাদের কাস্টমার কেয়ারের কলটি রিসিভ করবেন। কাস্টমার কেয়ার নাম্বারঃ 09613660321</p>
                    <p className="font-black text-xs uppercase tracking-widest text-gray-400 pt-2">ধন্যবাদ kcbazar এর সাথে থাকার জন্য!</p>
                </div>
            </div>

            {/* Success Message Banner */}
            <div className="bg-[#E6F9F3] border border-[#BFF0E1] text-[#0D9488] p-6 rounded-xl text-center font-black text-lg py-10 flex flex-col items-center gap-4 shadow-sm">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path d="M5 13l4 4L19 7"/>
                    </svg>
                </div>
                <h2 className="uppercase tracking-widest">Thank you. Your order has been received.</h2>
            </div>

            {/* Order Summary Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-8 rounded-2xl shadow-sm border border-black/5">
                {[
                  { label: "Order number:", value: "53848" },
                  { label: "Date:", value: "April 8, 2026" },
                  { label: "Total:", value: "৳ 1,200" },
                  { label: "Payment method:", value: "Cash on delivery" },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-1 border-r border-gray-100 last:border-0 px-4">
                    <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">{stat.label}</span>
                    <span className="text-sm font-black text-[#111]">{stat.value}</span>
                  </div>
                ))}
            </div>

            <p className="text-center font-bold text-gray-400 text-sm mt-4 italic">Pay with cash upon delivery.</p>

            {/* Order Details Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
                <div className="p-8 border-b border-gray-100">
                    <h3 className="text-xl font-black text-[#111] uppercase tracking-tighter">Order details</h3>
                </div>
                <div className="p-8">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-50 text-[11px] font-black uppercase tracking-widest text-gray-400">
                                <th className="pb-4">Product</th>
                                <th className="pb-4 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {[
                                { id: 1, name: "Missha Soft Finish Sun Milk SPF50+ PA+++ 70 ml", qty: 1, price: "1,200" },
                            ].map((item, i) => (
                                <tr key={i}>
                                    <td className="py-6 pr-4">
                                        <Link href={`/product/${item.id}`} className="text-sm font-bold text-gray-600 hover:text-[#FF4D6D] transition-colors">{item.name}</Link>
                                        <span className="text-sm font-black text-[#111] ml-2">× {item.qty}</span>
                                    </td>
                                    <td className="py-6 text-right font-black text-[#FF4D6D] text-sm">৳ {item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="divide-y divide-gray-50 bg-gray-50/20">
                            <tr>
                                <td className="py-4 text-sm font-bold text-gray-500 uppercase tracking-widest text-[11px] px-4">Subtotal:</td>
                                <td className="py-4 text-right font-black text-[#111] text-sm pr-4">৳ 1,200</td>
                            </tr>
                            <tr>
                                <td className="py-4 text-sm font-bold text-gray-500 uppercase tracking-widest text-[11px] px-4">Shipping:</td>
                                <td className="py-4 text-right font-bold text-gray-600 text-[13px] pr-4">Free shipping</td>
                            </tr>
                            <tr>
                                <td className="py-4 text-sm font-black text-[#111] uppercase tracking-widest px-4">Total:</td>
                                <td className="py-4 text-right font-black text-[#FF4D6D] text-lg pr-4">৳ 1,200</td>
                            </tr>
                            <tr>
                                <td className="py-4 text-sm font-bold text-gray-500 uppercase tracking-widest text-[11px] px-4">Payment method:</td>
                                <td className="py-4 text-right font-bold text-gray-600 text-[13px] pr-4">Cash on delivery</td>
                            </tr>
                            <tr>
                                <td className="py-4 text-sm font-bold text-gray-500 uppercase tracking-widest text-[11px] px-4">Courier (কুরিয়ার):</td>
                                <td className="py-4 text-right font-bold text-gray-600 text-[13px] pr-4">Steadfast</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

            {/* Address Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
                    <h4 className="text-lg font-black text-[#111] uppercase tracking-tighter mb-6 border-b border-gray-50 pb-2">Billing address</h4>
                    <address className="not-italic space-y-2 text-sm text-gray-500 font-bold leading-relaxed">
                        <p className="text-[#111] font-black uppercase text-[12px] tracking-widest">amik</p>
                        <p>Model town</p>
                        <p>puran para</p>
                        <p>Bandarban</p>
                        <p>01427654966</p>
                        <p className="text-[#FF4D6D] lower-case">randome72@gmail.com</p>
                    </address>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
                    <h4 className="text-lg font-black text-[#111] uppercase tracking-tighter mb-6 border-b border-gray-50 pb-2">Shipping address</h4>
                    <address className="not-italic space-y-2 text-sm text-gray-500 font-bold leading-relaxed">
                        <p className="text-[#111] font-black uppercase text-[12px] tracking-widest">amik</p>
                        <p>Model town</p>
                        <p>puran para</p>
                        <p>Bandarban</p>
                        <p>01427654966</p>
                    </address>
                </div>
            </div>

            {/* Final Action Button */}
            <div className="text-center pt-8">
                <Link href="/" className="inline-block py-4 px-12 bg-[#111] text-white font-black uppercase text-sm tracking-[3px] rounded-xl hover:bg-black transition-all shadow-xl shadow-black/10 active:scale-95">Continue Shopping</Link>
            </div>

        </div>

      </div>
    </div>
  );
};

export default OrderComplete;

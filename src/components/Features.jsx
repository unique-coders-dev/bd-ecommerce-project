import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

const Features = async () => {
  const settings = await prisma.setting.findUnique({
    where: { id: "site-settings" },
  });

  const title = settings?.shippingPromoTitle || "নিশ্চিত হোম ডেলিভারি! 🚚";
  const subtitle = settings?.shippingPromoSubtitle || "কেসি বাজারে কেনাকাটা করা এখন আরও সহজ। আপনার কাঙ্ক্ষিত পণ্যটি অর্ডার করুন এবং বুঝে নিন আপনার ঘরের দোরগোড়ায়। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা থাকছে আমাদের সাথে।";
  const imageUrl = settings?.shippingPromoImageUrl || "https://kcbazar.com/wp-content/uploads/2025/09/shipping--600x440.png";
  const hotline = settings?.hotline || "09644888889";

  return (
    <div className="bg-white">
      {/* ── Shipping & Delivery ── */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-10">
            <div className="flex flex-col gap-6">
              <h3 className="text-[32px] font-extrabold text-[#111] leading-tight">{title}</h3>
              <p className="text-lg text-[#555] max-w-[500px]">
                {subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={`tel:${hotline}`} className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-bold transition-all hover:bg-primary-soft hover:text-primary shadow-lg shadow-primary/20 active:scale-95 text-sm uppercase">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 2.15 5.18 2 2 0 0 1 4.11 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 10.91A16 16 0 0 0 13.09 15.9l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
                  </svg> কল করুন অর্ডার করতে
                </a>
                <Link href="/contact" className="flex items-center gap-2 px-8 py-4 border-2 border-[#E5E7EB] text-[#111] rounded-lg font-bold transition-all hover:bg-gray-50 active:scale-95 text-sm uppercase">বিস্তারিত জানুন</Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src={imageUrl}
                alt={title}
                className="w-full rounded-2xl transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;

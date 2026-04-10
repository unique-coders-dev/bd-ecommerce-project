import React from 'react';
import Link from 'next/link';

const checkIcon = "https://kcbazar.com/wp-content/uploads/2025/04/icons8-checkmark.svg";

const Features = () => {

  const uniquenessColumns = [
    {
      title: "গ্রাহক এবং আমাদের মাঝে কোন মধ্যস্বত্বভোগী নেই",
      items: [
        "Kcbazar Ltd. সরাসরি দক্ষিন কোরিয়া থেকে আমদানি করে পণ্য গ্রাহকের হাতে পৌঁছে দেয়।",
        "তাই গ্রাহক এবং আমাদের মাঝে কোন মধ্যস্বত্বভোগী নেই।",
        "ফলশ্রুতিতে আমাদের পণ্যের নির্ধারিত রেগুলার প্রাইজ তুলনামূলক সাশ্রয়ী।"
      ]
    },
    {
      title: "Kcbazar Ltd. নিজেই আমদানিকারক",
      items: [
        "আমরা কোন প্রোডাক্ট লোকাল সোর্সিং করি না।",
        "এমনকি কোন এজেন্টের মাধ্যমেও সোর্সিং করিনা।",
        "আমাদের নিজস্ব প্রতিষ্ঠান Koba International সরাসরি দক্ষিন কোরিয়া থেকে বাংলাদেশে এক্সপোর্ট করে।",
        "Kcbazar Ltd. সরাসরি Koba International এর মাধ্যমে বাংলাদেশে ইমপোর্ট করে।"
      ]
    },
    {
      title: "আমরা কৃত্রিম ভাবে মূল্য বৃদ্ধি করিনা",
      items: [
        "সততা আমাদের ব্যবসায়ের মূল ভিত্তি।",
        "তাই অফার দেওয়ার সময় কৃত্রিম ভাবে রেগুলার প্রাইজ বাড়িয়ে অফার প্রাইজ তৈরি করি না।",
        "ফলশ্রুতিতে, আপনি Kcbazar Ltd. এ বিশাল ছাড়ের ছড়াছড়ি দেখতে পাবেন না।",
        "প্রাইস ঠিকই তুলনামূলক কম থাকে।"
      ]
    },
    {
      title: "আমরা অথেন্টিসিটি নিশ্চিত করি",
      items: [
        "প্রোডাক্টের অথেন্টিসিটি আমাদের ব্যবসায়ের মূলধন।",
        "নিজেইরাই আমদানি করি।",
        "লোকাল সোর্সিং করিনা, এজেন্টের মাধ্যমেও সোর্সিং করিনা।",
        "তাই Kcbazar Ltd. থেকে কেনা সকল পণ্যের অথেন্টিসিটি নিয়ে নিশ্চিন্ত থাকতে পারেন।"
      ]
    }
  ];

  const uniquenessRow2 = [
    {
      title: "অনলাইন এবং শো-রুম থেকে কেনাকাটার সুযোগ",
      items: [
        "Kcbazar Ltd. এ অনলাইনে প্রোডাক্ট ক্রয়ের পাশাপাশি শো-রুমে গিয়েও প্রোডাক্ট ক্রয় করতে পারেন।",
        "আমাদের নিজস্ব শো-রুম রয়েছে ঢাকা, গাজীপুর ও ময়মনসিংহে।",
        "শ্রীগ্রই আরো নতুন শো-রুম আসছে।"
      ]
    },
    {
      title: "আমরা অফিসিয়াল ডিস্ট্রিবিউটর",
      items: [
        "Kcbazar Ltd. দক্ষিন কোরিয়ার বিভিন্ন জনপ্রিয় কসমেটিকস ব্রান্ডের বাংলাদেশী ডিস্ট্রিবিউটর।",
        "এবং জনপ্রিয় কোরিয়ান কসমেটিকস ব্রান্ড Dabo, ecorce Nature Skin, Phytotree, Raip এবং Guerisson এর অফিসিয়াল ডিস্ট্রিবিউটর।"
      ]
    }
  ];

  const softColors = ['#FFF5F5', '#F5FFF5', '#F5F5FF', '#FFF9F0', '#F0FBFF', '#F9F0FF'];
  const getRandomColor = (idx) => softColors[idx % softColors.length];

  return (
    <div className="bg-white">

      {/* ── Our Uniqueness (Hidden) ── */}
      {/* 
      <section className="py-12 bg-white">
        <div className="max-w-[1320px] mx-auto px-4">
          <h2 className="text-[24px] font-bold text-[#111827] mb-8">Our Uniqueness</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {uniquenessColumns.map((col, idx) => (
              <div key={idx} className="p-6 rounded-xl transition-all duration-300 hover:shadow-md border border-black/5" style={{ backgroundColor: getRandomColor(idx) }}>
                <h3 className="text-lg font-bold text-[#111] mb-4">{col.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {col.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#444] leading-relaxed">
                      <img src={checkIcon} alt="check" className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {uniquenessRow2.map((col, idx) => (
              <div key={idx} className="p-6 rounded-xl transition-all duration-300 hover:shadow-md border border-black/5" style={{ backgroundColor: getRandomColor(idx + 4) }}>
                <h3 className="text-lg font-bold text-[#111] mb-4">{col.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {col.items.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#444] leading-relaxed">
                      <img src={checkIcon} alt="check" className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* ── Shipping & Delivery ── */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-10">
            <div className="flex flex-col gap-6">
              <h3 className="text-[32px] font-extrabold text-[#111] leading-tight">নিশ্চিত হোম ডেলিভারি! 🚚</h3>
              <p className="text-lg text-[#555] max-w-[500px]">
                কেসি বাজারে কেনাকাটা করা এখন আরও সহজ। আপনার কাঙ্ক্ষিত পণ্যটি অর্ডার করুন এবং বুঝে নিন আপনার ঘরের দোরগোড়ায়। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা থাকছে আমাদের সাথে।
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:09644888889" className="flex items-center gap-2 px-8 py-4 bg-[#FF4D6D] text-white rounded-lg font-bold transition-all hover:brightness-110 shadow-lg shadow-[#FF4D6D]/20 active:scale-95 text-sm uppercase">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 2.15 5.18 2 2 0 0 1 4.11 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 10.91A16 16 0 0 0 13.09 15.9l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
                  </svg> কল করুন অর্ডার করতে
                </a>
                <Link href="/shop/" className="flex items-center gap-2 px-8 py-4 border-2 border-[#E5E7EB] text-[#111] rounded-lg font-bold transition-all hover:bg-gray-50 active:scale-95 text-sm uppercase">বিস্তারিত জানুন</Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://kcbazar.com/wp-content/uploads/2025/09/shipping--600x440.png"
                alt="Shipping Delivery"
                className="w-full rounded-2xl transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── About KC Bazar (Hidden) ── */}
      {/* 
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1320px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col">
              <h2 className="text-[40px] font-black text-[#111] tracking-tighter mb-6">KC BAZAR</h2>
              <p className="text-[#555] mb-4 text-pretty leading-relaxed">
                কেসি বাজার বাংলাদেশে স্কিনকেয়ার এবং মেকআপ লাভারদের জন্য একটি বিশ্বস্ত নাম। আমরা সরাসরি দক্ষিণ কোরিয়া থেকে অরিজিনাল কোরিয়ান কসমেটিকস এবং স্কিনকেয়ার পণ্য আমদানি করি। আমাদের লক্ষ্য হচ্ছে সল্প মূল্যে সেরা এবং অরিজিনাল পণ্য গ্রাহকদের পৌঁছে দেওয়া।
              </p>
              <p className="text-[#555] mb-6 text-pretty leading-relaxed">
                আপনার ত্বকের ধরণ অনুযায়ী সেরা স্কিনকেয়ার সলিউশন দিতে আমাদের রয়েছে অভিজ্ঞ বিউটি কনসাল্টেন্ট। দেশজুড়ে আমাদের রয়েছে একাধিক ফিজিক্যাল শোরুম, যেখানে আপনি পণ্য দেখে কিনতে পারেন।
              </p>
              <Link href="/about-us/" className="inline-block px-10 py-4 bg-[#111] text-white rounded-lg font-bold w-fit hover:bg-black transition-all active:scale-95 shadow-lg shadow-black/10">Read More</Link>
            </div>

            <div className="flex flex-col gap-6 bg-white p-8 rounded-2xl shadow-sm border border-black/5">
              <h3 className="text-2xl font-bold text-[#111] mb-2">Our Showrooms</h3>
              <div className="p-6 bg-gray-50 rounded-xl hover:bg-[#fff0f3] transition-colors border-l-4 border-transparent hover:border-[#FF4D6D] cursor-pointer group">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-[#111] group-hover:text-[#FF4D6D] transition-colors">গাজীপুর শোরুম</span>
                  <span className="text-xl">📍</span>
                </div>
                <p className="text-sm text-[#666]">হাউস-০৬, রোড-০৪, ব্লক-ডি, গাজীপুর চৌরাস্তা</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl hover:bg-[#fff0f3] transition-colors border-l-4 border-transparent hover:border-[#FF4D6D] cursor-pointer group">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-[#111] group-hover:text-[#FF4D6D] transition-colors">ময়মনসিংহ শোরুম</span>
                  <span className="text-xl">📍</span>
                </div>
                <p className="text-sm text-[#666]">সিটি সেন্টার, ময়মনসিংহ টাউন হল মোড়</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl hover:bg-[#fff0f3] transition-colors border-l-4 border-transparent hover:border-[#FF4D6D] cursor-pointer group">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-[#111] group-hover:text-[#FF4D6D] transition-colors">উত্তরা শোরুম</span>
                  <span className="text-xl">📍</span>
                </div>
                <p className="text-sm text-[#666]">আজমপুর সুপার মার্কেট, উত্তরা ঢাকা</p>
              </div>
              <Link href="/showrooms/" className="text-center font-bold text-[#FF4D6D] mt-2 hover:underline transition-all underline-offset-4">সকল শোরুম দেখুন →</Link>
            </div>
          </div>
        </div>
      </section>
      */}

    </div>
  );
};

export default Features;

import React from 'react';

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
    <div className="features-wrapper">

      {/* ── Our Uniqueness ── */}
      <section className="uniqueness-section">
        <div className="section-container">
          <h2 className="section-title">Our Uniqueness</h2>

          {/* Row 1: 4 columns */}
          <div className="uniqueness-grid">
            {uniquenessColumns.map((col, idx) => (
              <div key={idx} className="uniqueness-card" style={{ backgroundColor: getRandomColor(idx) }}>
                <h3 className="uniqueness-card-title">{col.title}</h3>
                <ul className="uniqueness-list">
                  {col.items.map((item, i) => (
                    <li key={i} className="uniqueness-list-item">
                      <img src={checkIcon} alt="check" className="check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Row 2: 2 columns */}
          <div className="uniqueness-grid uniqueness-grid-2">
            {uniquenessRow2.map((col, idx) => (
              <div key={idx} className="uniqueness-card" style={{ backgroundColor: getRandomColor(idx + 4) }}>
                <h3 className="uniqueness-card-title">{col.title}</h3>
                <ul className="uniqueness-list">
                  {col.items.map((item, i) => (
                    <li key={i} className="uniqueness-list-item">
                      <img src={checkIcon} alt="check" className="check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shipping & Delivery ── */}
      <section className="shipping-section">
        <div className="section-container">
          <div className="shipping-grid">
            <div className="shipping-text">
              <h3 className="shipping-title">নিশ্চিত হোম ডেলিভারি! 🚚</h3>
              <p className="shipping-desc">
                কেসি বাজারে কেনাকাটা করা এখন আরও সহজ। আপনার কাঙ্ক্ষিত পণ্যটি অর্ডার করুন এবং বুঝে নিন আপনার ঘরের দোরগোড়ায়। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা থাকছে আমাদের সাথে।
              </p>
              <div className="shipping-btns">
                <a href="tel:09644888889" className="shipping-btn-primary">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 2.15 5.18 2 2 0 0 1 4.11 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 10.91A16 16 0 0 0 13.09 15.9l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
                  </svg> কল করুন অর্ডার করতে
                </a>
                <a href="/shop/" className="shipping-btn-secondary">বিস্তারিত জানুন</a>
              </div>
            </div>
            <div className="shipping-img-wrap">
              <img
                src="https://kcbazar.com/wp-content/uploads/2025/09/shipping--600x440.png"
                alt="Shipping Delivery"
                className="shipping-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── About KC Bazar ── */}
      <section className="about-section">
        <div className="section-container">
          <div className="about-grid">
            <div className="about-text">
              <h2 className="about-title">KC BAZAR</h2>
              <p className="about-desc">
                কেসি বাজার বাংলাদেশে স্কিনকেয়ার এবং মেকআপ লাভারদের জন্য একটি বিশ্বস্ত নাম। আমরা সরাসরি দক্ষিণ কোরিয়া থেকে অরিজিনাল কোরিয়ান কসমেটিকস এবং স্কিনকেয়ার পণ্য আমদানি করি। আমাদের লক্ষ্য হচ্ছে সল্প মূল্যে সেরা এবং অরিজিনাল পণ্য গ্রাহকদের পৌঁছে দেওয়া।
              </p>
              <p className="about-desc">
                আপনার ত্বকের ধরণ অনুযায়ী সেরা স্কিনকেয়ার সলিউশন দিতে আমাদের রয়েছে অভিজ্ঞ বিউটি কনসাল্টেন্ট। দেশজুড়ে আমাদের রয়েছে একাধিক ফিজিক্যাল শোরুম, যেখানে আপনি পণ্য দেখে কিনতে পারেন।
              </p>
              <a href="/about-us/" className="about-read-more">Read More</a>
            </div>

            <div className="showrooms-col">
              <h3 className="showrooms-title">Our Showrooms</h3>
              <div className="showroom-card">
                <div className="showroom-header">
                  <span className="showroom-name">গাজীপুর শোরুম</span>
                  <span className="showroom-icon">📍</span>
                </div>
                <p className="showroom-addr">হাউস-০৬, রোড-০৪, ব্লক-ডি, গাজীপুর চৌরাস্তা</p>
              </div>
              <div className="showroom-card">
                <div className="showroom-header">
                  <span className="showroom-name">ময়মনসিংহ শোরুম</span>
                  <span className="showroom-icon">📍</span>
                </div>
                <p className="showroom-addr">সিটি সেন্টার, ময়মনসিংহ টাউন হল মোড়</p>
              </div>
              <div className="showroom-card">
                <div className="showroom-header">
                  <span className="showroom-name">উত্তরা শোরুম</span>
                  <span className="showroom-icon">📍</span>
                </div>
                <p className="showroom-addr">আজমপুর সুপার মার্কেট, উত্তরা ঢাকা</p>
              </div>
              <a href="/showrooms/" className="view-showrooms-btn">সকল শোরুম দেখুন →</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Features;

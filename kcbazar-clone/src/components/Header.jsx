import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);

  const navLinks = [
    { label: 'Shop', href: '/shop', hot: false },
    { label: '🔥 Eid Offer', href: '/clearance-sale/', hot: true },
    { label: 'Brands', href: '/brand/', hot: false },
    { label: 'Combo Offer', href: '/product-category/combo-set/', hot: false },
    { label: 'Brand New Beauty', href: '/new-arrivals/', hot: false },
    { label: 'Clearance', href: '/clearance-sale/', hot: false },
    { label: 'Pre Order', href: '/pre-order/', hot: false },
    { label: 'Showrooms', href: '/showrooms/', hot: false },
  ];

  const marqueeText = [
    '🔥 ঈদ সালামি অফার! কেনাকাটা করুন আর মেতে উঠুন উৎসবের আনন্দে।',
    '🚚 ফ্রি ডেলিভারি নির্দিষ্ট শর্ত সাপেক্ষে সারা বাংলাদেশে।',
    '🎉 সকল প্রি-অর্ডার পণ্যে থাকছে বিশেষ ছাড়।',
    '✨ ১০০% অরিজিনাল পণ্যের নিশ্চয়তা — সরাসরি কোরিয়া থেকে আমদানি।',
    '🛒 ক্যাশ অন ডেলিভারি সুবিধা সারা বাংলাদেশে।',
    '🔥 ঈদ সালামি অফার! কেনাকাটা করুন আর মেতে উঠুন উৎসবের আনন্দে।',
    '🚚 ফ্রি ডেলিভারি নির্দিষ্ট শর্ত সাপেক্ষে সারা বাংলাদেশে।',
    '🎉 সকল প্রি-অর্ডার পণ্যে থাকছে বিশেষ ছাড়।',
    '✨ ১০০% অরিজিনাল পণ্যের নিশ্চয়তা — সরাসরি কোরিয়া থেকে আমদানি।',
    '🛒 ক্যাশ অন ডেলিভারি সুবিধা সারা বাংলাদেশে।',
  ];

  return (
    <header>
      {/* ── Announcement Marquee ── */}
      <div className="announcement-bar">
        <div className="marquee-track">
          {marqueeText.map((text, i) => (
            <span key={i}>&nbsp;&nbsp;&nbsp;{text}&nbsp;&nbsp;&nbsp;</span>
          ))}
        </div>
      </div>

      {/* ── Middle Header ── */}
      <div className="header-mid">
        <div className="header-mid-inner">
          {/* Logo (Left) */}
          <div className="header-logo">
            <Link to="/">
              <img
                src="https://kcbazar.com/wp-content/uploads/2025/08/KCB-LOGO-G.png"
                alt="KC Bazar Logo"
              />
            </Link>
          </div>

          {/* Search Box (Middle) */}
          <div className="header-search">
            <input type="text" placeholder="পণ্য অনুসন্ধান করুন..." />
            <button className="search-btn" aria-label="Search">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>

          {/* Info & Icons Box (Right) */}
          <div className="header-right-group">
            <div className="info-box hide-mobile">
              <div className="info-box-icon">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 2.15 5.18 2 2 0 0 1 4.11 3h3a2 2 0 0 1-2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 10.91A16 16 0 0 0 13.09 15.9l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
                </svg>
              </div>
              <div className="info-box-text">
                <span className="info-box-label">Hotline</span>
                <span className="info-box-value">09644-888889</span>
              </div>
            </div>

            <div className="info-box hide-mobile">
              <div className="info-box-icon">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="info-box-text">
                <span className="info-box-label">Bangladesh</span>
                <span className="info-box-value">Cash On Delivery</span>
              </div>
            </div>

            <div className="header-icons">
              {/* Cart */}
              <button
                className="header-icon-btn"
                aria-label="Cart"
                onClick={() => setCartOpen(!cartOpen)}
                style={{ position: 'relative' }}
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span className="cart-badge">0</span>
              </button>
              {/* Account */}
              <button className="header-icon-btn" aria-label="My Account">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="header-nav">
        <div className="header-nav-inner">
          <nav className="nav-links no-scrollbar" style={{ overflowX: 'auto' }}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`nav-link${link.hot ? ' hot' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

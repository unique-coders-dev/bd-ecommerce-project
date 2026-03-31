import React from 'react';

const Footer = () => {
  const categories = [
    { label: 'Skin Care', href: '/product-category/skin-care/' },
    { label: 'Makeup', href: '/product-category/make-up/' },
    { label: 'Hair Care', href: '/product-category/hair-eye-lip-care/hair-care/' },
    { label: 'Body Care', href: '/product-category/body-hand-foot-care/body-care/' },
    { label: 'Combo Set', href: '/product-category/combo-set/' },
    { label: 'Lip Care', href: '/product-category/hair-eye-lip-care/lip-care/' },
    { label: 'Eye Care', href: '/product-category/hair-eye-lip-care/eye-care/' },
    { label: 'Baby Care', href: '/product-category/baby-care/' },
    { label: 'Pre Order', href: '/pre-order/' },
    { label: 'Clearance Sale', href: '/clearance-sale/' },
  ];

  const usefulLinks = [
    { label: 'Contact Us', href: '/contact/' },
    { label: 'Track Your Order', href: '/track-order/' },
    { label: 'Shipping Policy', href: '/shipping-policy/' },
    { label: 'Refund Policy', href: '/refund-policy/' },
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions/' },
    { label: 'EMI Details', href: '/emi-details/' },
    { label: 'Blog', href: '/blog/' },
  ];

  const importantLinks = [
    { label: 'Career', href: '/career/' },
    { label: 'All Brands', href: '/brand/' },
    { label: 'Our Showrooms', href: '/showrooms/' },
    { label: 'About KC Bazar', href: '/about-us/' },
    { label: 'Content Partnership', href: '/content-partnership-guidelines/' },
    { label: 'Affiliate Program', href: '/affiliate/' },
    { label: 'FAQ', href: '/faq/' },
  ];

  return (
    <footer className="site-footer">
      {/* Main Footer Grid */}
      <div className="footer-grid">
        {/* Col 1: Logo + About */}
        <div>
          <a href="/" className="footer-logo">
            <img
              src="https://kcbazar.com/wp-content/uploads/2025/08/KCB-LOGO-G.png"
              alt="KC Bazar Logo"
            />
          </a>
          <p className="footer-desc">
            কেসি বাজার বাংলাদেশে অরিজিনাল কোরিয়ান স্কিনকেয়ার এবং কসমেটিকস পণ্যের অন্যতম নির্ভরযোগ্য প্রতিষ্ঠান। গুণগত মান এবং বিশুদ্ধতায় আমরা আপসহীন।
          </p>
          <p className="footer-desc" style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 10 }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 2.15 5.18 2 2 0 0 1 4.11 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 10.91A16 16 0 0 0 13.09 15.9l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
            </svg>
            <strong>09644-888889</strong>
          </p>
          <p className="footer-desc" style={{ fontSize: 13, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 20 }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            শনি–বৃহস্পতি: সকাল ১০টা – রাত ৮টা
          </p>
          <div className="social-row">
            <a href="https://facebook.com/kcbazar22" className="social-btn" aria-label="Facebook" target="_blank" rel="noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            </a>
            <a href="https://www.instagram.com/kcbazarltd/" className="social-btn" aria-label="Instagram" target="_blank" rel="noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.youtube.com/@kcbazar" className="social-btn" aria-label="YouTube" target="_blank" rel="noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@kcbazar" className="social-btn" aria-label="TikTok" target="_blank" rel="noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.12.83.1 1.7.6 2.37.58.82 1.55 1.37 2.55 1.34 1.02-.01 1.93-.58 2.48-1.44.47-.72.63-1.59.59-2.45-.02-3.23.01-6.46.01-9.69a1.055 1.055 0 0 0-.01-.04z"/></svg>
            </a>
          </div>
        </div>

        {/* Col 2: Categories */}
        <div>
          <h4 className="footer-col-title">Categories</h4>
          <div className="footer-links">
            {categories.map((item) => (
              <a key={item.label} href={item.href} className="footer-link">
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Col 3: Useful Links */}
        <div>
          <h4 className="footer-col-title">Useful Links</h4>
          <div className="footer-links">
            {usefulLinks.map((item) => (
              <a key={item.label} href={item.href} className="footer-link">
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Col 4: Important Pages */}
        <div>
          <h4 className="footer-col-title">Important Pages</h4>
          <div className="footer-links">
            {importantLinks.map((item) => (
              <a key={item.label} href={item.href} className="footer-link">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Block Removed */}

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2025 KC BAZAR. All rights reserved. | Powered by KC Bazar IT Team</p>
      </div>
    </footer>
  );
};

export default Footer;

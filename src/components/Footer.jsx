import React from 'react';
import Link from 'next/link';

const Footer = ({ settings, categories = [] }) => {
  const dynamicCategories = categories.map(c => ({
    label: c.name,
    href: `/category/${c.slug}`
  }));

  const usefulLinks = [
    { label: 'Contact Us', href: '/contact/' },
    { label: 'Shipping Policy', href: '/shipping-policy/' },
    { label: 'Refund Policy', href: '/refund-policy/' },
    { label: 'Privacy Policy', href: '/privacy-policy/' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions/' },
  ];

  const importantLinks = [
    { label: 'Career', href: '/career/' },
    { label: 'FAQ', href: '/faq/' },
  ];

  const logoUrl = settings?.logoUrl || "https://kcbazar.com/wp-content/uploads/2025/08/KCB-LOGO-G.png";
  const shortDescription = settings?.shortDescription || "কেসি বাজার বাংলাদেশে অরিজিনাল কোরিয়ান স্কিনকেয়ার এবং কসমেটিকস পণ্যের অন্যতম নির্ভরযোগ্য প্রতিষ্ঠান। গুণগত মান এবং বিশুদ্ধতায় আমরা আপসহীন।";
  const hotline = settings?.hotline || "09644-888889";
  const openingHours = settings?.openingHours || "শনি–বৃহস্পতি: ১০টা – ৮টা";
  const facebook = settings?.facebook || "https://facebook.com/kcbazar22";
  const instagram = settings?.instagram || "https://www.instagram.com/kcbazarltd/";
  const whatsapp = settings?.whatsapp || "https://wa.me/880123456789";

  return (
    <footer className="bg-white border-t border-gray-100 pt-16">
      {/* Main Footer Grid */}
      <div className="max-w-[1320px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
        {/* Col 1: Logo + About */}
        <div>
          <Link href="/" className="block w-[160px] mb-6">
            <img
              src={logoUrl}
              alt="KC Bazar Logo"
              className="w-full"
            />
          </Link>
          <p className="text-sm text-[#666] leading-relaxed mb-4">
            {shortDescription}
          </p>
          <div className="flex flex-col gap-3">
             <div className="flex items-center gap-2 text-sm text-[#444] font-bold">
               <div className="w-8 h-8 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center text-[var(--primary-color)]">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 2.15 5.18 2 2 0 0 1 4.11 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 10.91A16 16 0 0 0 13.09 15.9l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
                </svg>
               </div>
               {hotline}
             </div>
             <div className="flex items-center gap-2 text-sm text-[#666]">
               <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
               </div>
               {openingHours}
             </div>
          </div>
          <div className="flex gap-3 mt-6">
            <a href={facebook} className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-primary transition-all hover:bg-primary-soft" aria-label="Facebook" target="_blank" rel="noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
            </a>
            <a href={instagram} className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-primary transition-all hover:bg-primary-soft" aria-label="Instagram" target="_blank" rel="noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href={whatsapp} className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-primary transition-all hover:bg-primary-soft" aria-label="WhatsApp" target="_blank" rel="noreferrer">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.672 1.433 5.661 1.434h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
          </div>
        </div>
        {/* Col 2: Categories */}
        <div>
          <h4 className="text-base font-bold text-[#111] mb-8 pb-1 border-b-2 border-[var(--primary-color)] w-fit">Categories</h4>
          <div className="flex flex-col gap-3">
            {dynamicCategories.map((item) => (
              <Link key={item.label} href={item.href} className="text-sm text-[#666] hover:text-primary transition-colors duration-200">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3: Useful Links */}
        <div>
          <h4 className="text-base font-bold text-[#111] mb-8 pb-1 border-b-2 border-[var(--primary-color)] w-fit">Useful Links</h4>
          <div className="flex flex-col gap-3">
            {usefulLinks.map((item) => (
              <Link key={item.label} href={item.href} className="text-sm text-[#666] hover:text-[var(--primary-color)] transition-colors duration-200">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 4: Important Pages */}
        <div>
          <h4 className="text-base font-bold text-[#111] mb-8 pb-1 border-b-2 border-[var(--primary-color)] w-fit">Important Pages</h4>
          <div className="flex flex-col gap-3">
            {importantLinks.map((item) => (
              <Link key={item.label} href={item.href} className="text-sm text-[#666] hover:text-[var(--primary-color)] transition-colors duration-200">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-100 py-6 bg-gray-50">
        <p className="text-center text-[11px] text-[#999] uppercase tracking-widest leading-relaxed px-4">
          © 2025 KC BAZAR. All rights reserved. <span className="mx-2">|</span> Powered by KC Bazar IT Team
        </p>
      </div>
    </footer>
  );
};

export default Footer;

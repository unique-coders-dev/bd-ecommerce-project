"use client";

import React from 'react';

const TermsOfService = () => {
  return (
    <div className="bg-[#f8f9fa] min-h-screen py-20 px-6">
      <div className="max-w-[800px] mx-auto bg-white p-10 md:p-16 rounded-[40px] shadow-2xl shadow-gray-200/50 border border-gray-100">
        <h1 className="text-4xl font-black text-[#111] uppercase italic tracking-tighter mb-4">Terms of Service</h1>
        <div className="h-1.5 w-16 bg-[var(--color-primary)] rounded-full mb-10"></div>
        
        <div className="prose prose-pink max-w-none space-y-8 text-gray-500 font-medium leading-relaxed">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Last Updated: April 15, 2026</p>
            
            <section className="space-y-4">
                <h2 className="text-xl font-black text-[#111] uppercase">1. Terms</h2>
                <p>By accessing this website, you are agreeing to be bound by these website Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-black text-[#111] uppercase">2. Use License</h2>
                <p>Permission is granted to temporarily download one copy of the materials (information or software) on Mailbon's website for personal, non-commercial transitory viewing only.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-black text-[#111] uppercase">3. Disclaimer</h2>
                <p>The materials on Mailbon's website are provided "as is". Mailbon makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability.</p>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-black text-[#111] uppercase">4. Limitations</h2>
                <p>In no event shall Mailbon or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on Mailbon's Internet site.</p>
            </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

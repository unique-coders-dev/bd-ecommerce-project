"use client";

import React, { useState } from 'react';

const FaqClient = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(0);

  if (faqs.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-50 rounded-[40px] border border-gray-100">
        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">No questions currently available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, idx) => (
        <div 
          key={idx} 
          className={`group rounded-[30px] border transition-all duration-500 overflow-hidden ${
            openIndex === idx 
              ? 'border-primary/20 bg-primary/[0.02] shadow-xl shadow-primary/5' 
              : 'border-gray-100 bg-white hover:border-primary/10'
          }`}
        >
          <button 
            onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
            className="w-full px-8 py-7 flex items-center justify-between text-left gap-4"
          >
            <span className={`text-lg font-black uppercase tracking-tight transition-colors duration-300 ${
              openIndex === idx ? 'text-primary' : 'text-[#111]'
            }`}>
              {idx + 1}. {faq.question}
            </span>
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ${
              openIndex === idx ? 'bg-primary text-white rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-primary/5 group-hover:text-primary'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </button>
          
          <div 
            className={`transition-all duration-500 ease-in-out px-8 ${
              openIndex === idx ? 'max-h-[500px] pb-10 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="pt-2 border-t border-primary/5 text-gray-500 font-medium leading-relaxed whitespace-pre-line">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqClient;

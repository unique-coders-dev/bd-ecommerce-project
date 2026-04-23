import React from 'react';

const InfoPage = ({ title, content }) => {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#111] py-16 md:py-24 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">{title}</h1>
        <div className="h-1.5 w-20 bg-primary mx-auto rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="prose prose-lg max-w-none prose-headings:text-[#111] prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-p:text-gray-600 prose-p:leading-relaxed">
          {content ? (
            <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
          ) : (
            <p className="text-gray-400 italic">Content is being updated. Please check back soon.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoPage;

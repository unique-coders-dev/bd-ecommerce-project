import { prisma } from "@/lib/prisma";
import FaqClient from "./FaqClient";

export default async function Page() {
  const settings = await prisma.setting.findUnique({ where: { id: 'site-settings' } });
  
  let faqs = [];
  try {
    faqs = settings?.faqContent ? JSON.parse(settings.faqContent) : [];
    if (!Array.isArray(faqs)) faqs = [];
  } catch (e) {
    faqs = [];
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-[#111] py-16 md:py-24 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">FAQ</h1>
        <div className="h-1.5 w-20 bg-primary mx-auto rounded-full"></div>
        <p className="mt-4 text-gray-400 font-bold uppercase text-[10px] tracking-[4px]">Common Questions & Answers</p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <FaqClient faqs={faqs} />
      </div>
    </div>
  );
}

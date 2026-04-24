import { prisma } from "@/lib/prisma";
import Link from 'next/link';

export default async function AboutUs() {
  const settings = await prisma.setting.findUnique({
    where: { id: "site-settings" },
  });

  return (
    <div className="bg-white min-h-screen pt-10 pb-20">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden mb-20">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
            src={settings?.aboutUsImageUrl || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop"} 
            className="absolute inset-0 w-full h-full object-cover scale-105" 
            alt={`About ${settings?.siteName || 'Us'}`}
        />
        <div className="relative z-20 text-center px-4">
            <h1 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-4">
              {settings?.aboutUsTitle || "Our Story"}
            </h1>
            <div className="h-2 w-24 bg-primary mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-6 space-y-20">
        
        {/* Concept Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
                <span className="text-[12px] font-black uppercase tracking-[4px] text-primary">Who we are</span>
                <h2 className="text-4xl font-black text-[#111] leading-tight uppercase">Elevating beauty through authenticity.</h2>
                <p className="text-gray-400 font-medium leading-relaxed whitespace-pre-line">
                    {settings?.aboutUsDescription || `${settings?.siteName || 'We'} started with a simple belief: everyone deserves access to premium quality beauty products that truly work.`}
                </p>
            </div>
            <div className="rounded-[40px] overflow-hidden shadow-2xl rotate-3 transition-transform hover:rotate-0 duration-700">
                <img src={settings?.aboutUsImageUrl || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1000&auto=format&fit=crop"} alt="Beauty focus" className="w-full h-full object-cover aspect-square" />
            </div>
        </div>

        {/* Mission Section */}
        <div className="bg-[#f8f9fa] rounded-[50px] p-12 md:p-20 text-center space-y-8">
            <h3 className="text-3xl font-black text-[#111] uppercase tracking-tighter">Our Mission</h3>
            <p className="max-w-2xl mx-auto text-lg text-gray-500 font-medium italic">
                "To become the most trusted destination for premium beauty in Bangladesh, bridging the gap between international standards and local accessibility."
            </p>
        </div>

        {/* Closing Section */}
        <div className="text-center space-y-10">
            <h2 className="text-4xl font-black text-[#111] uppercase">Join the {settings?.siteName || 'Community'}</h2>
            <Link 
                href="/shop" 
                className="inline-block px-12 py-5 bg-[#111] text-white font-black uppercase text-sm tracking-widest rounded-2xl hover:bg-black transition-all hover:scale-105 shadow-xl shadow-black/10"
            >
                Explore Shop
            </Link>
        </div>

      </div>
    </div>
  );
}


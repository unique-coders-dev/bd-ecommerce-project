import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET() {
  try {
    const settings = await prisma.setting.findUnique({
      where: { id: "site-settings" },
    });
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await auth();
    
    // Only super-admins can update settings
    if (!session || session.user.role !== "super-admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const data = await req.json();
    
    // Define all allowed fields based on schema.prisma
    const allowedFields = [
      'marqueeText', 'announcements', 'hotline', 'openingHours', 'location', 
      'email', 'facebook', 'instagram', 'whatsapp', 'themeColor', 'logoUrl', 
      'faviconUrl', 'shortDescription', 'siteTitle', 'siteDescription', 
      'siteKeywords', 'shippingPromoTitle', 'shippingPromoSubtitle', 
      'shippingPromoImageUrl', 'aboutUsTitle', 'aboutUsDescription', 
      'aboutUsImageUrl', 'shippingPolicy', 'refundPolicy', 'privacyPolicy', 
      'termsConditions', 'faqContent', 'careerContent'
    ];

    const cleanData = {};
    allowedFields.forEach(field => {
      if (data[field] !== undefined) {
        cleanData[field] = data[field];
      }
    });

    const updated = await prisma.setting.upsert({
      where: { id: "site-settings" },
      update: cleanData,
      create: {
        id: "site-settings",
        ...cleanData,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("SETTINGS_UPDATE_ERROR", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

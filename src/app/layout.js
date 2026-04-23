import { Roboto } from "next/font/google";
import "./globals.css";
import { prisma } from "../lib/prisma";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  let settings = null;
  try {
    settings = await prisma.setting.findUnique({
      where: { id: "site-settings" },
    });
  } catch (err) {
    console.error("Metadata fetch error:", err);
  }

  return {
    title: settings?.siteTitle || "KC Bazar | Original Korean Skincare & Cosmetics in Bangladesh",
    description: settings?.siteDescription || "Discover 100% original Korean skincare and cosmetics at KC Bazar.",
    keywords: settings?.siteKeywords || "ecommerce, beauty, wellness, skins, cosmetics",
    icons: {
      icon: settings?.faviconUrl || "/favicon.ico",
      shortcut: settings?.faviconUrl || "/favicon.ico",
      apple: settings?.faviconUrl || "/favicon.ico",
    }
  };
}

export default async function RootLayout({ children }) {
  let settings = null;
  try {
    // Check if the setting model exists on the prisma client
    if (prisma && prisma.setting) {
      settings = await prisma.setting.findUnique({
        where: { id: "site-settings" },
      });
    }
  } catch (err) {
    console.error("Prisma error in layout:", err);
  }

  const themeColor = settings?.themeColor || "var(--primary-color)";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body 
        className={`${roboto.variable} antialiased font-roboto`}
        style={{ 
          '--color-primary': themeColor,
          '--color-primary-soft': `color-mix(in srgb, ${themeColor}, white 85%)`,
          '--color-primary-medium': `color-mix(in srgb, ${themeColor}, white 50%)`,
          '--color-primary-dark': `color-mix(in srgb, ${themeColor}, black 15%)`,
          '--color-primary-active': `color-mix(in srgb, ${themeColor}, black 5%)`,
          '--color-primary-light': `color-mix(in srgb, ${themeColor}, white 90%)`,
        }}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

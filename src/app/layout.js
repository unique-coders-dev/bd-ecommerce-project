import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "KC Bazar | Original Korean Skincare & Cosmetics in Bangladesh",
  description: "Discover 100% original Korean skincare and cosmetics at KC Bazar. We are the official distributor for top brands like Dabo, Nature Skin, and more in Bangladesh.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

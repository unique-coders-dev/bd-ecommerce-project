import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Brands from "@/components/Brands";
import Features from "@/components/Features";
import { HomeBanners } from "@/components/HomeBanners";

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <HomeBanners position="hero-after" />
      <HomeBanners position="marketing-trio" />
      <Products />
      <Brands />
      <Features />
    </div>
  );
}

import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Brands from "@/components/Brands";
import Features from "@/components/Features";

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <Products />
      <Brands />
      <Features />
    </div>
  );
}

import { Navbar } from "@/components/organisms/Navbar";
import { HeroSection } from "@/components/organisms/HeroSection";
import { CuratedCollections } from "@/components/organisms/CuratedCollections";
import { FeaturedProducts } from "@/components/organisms/FeaturedProducts";
import { LegacySection } from "@/components/organisms/LegacySection";
import { Footer } from "@/components/organisms/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-light">
      <Navbar />
      <HeroSection />
      <CuratedCollections />
      <FeaturedProducts />
      <LegacySection />
      <Footer />
    </main>
  );
}

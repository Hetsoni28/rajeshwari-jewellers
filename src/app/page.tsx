import { Navbar } from "@/components/organisms/Navbar";
import { HeroSection } from "@/components/organisms/HeroSection";
import { StorySection } from "@/components/organisms/StorySection";
import { ShopByCategory } from "@/components/organisms/ShopByCategory";
import { CollectionHighlightSection } from "@/components/organisms/CollectionHighlightSection";
import { GiftingSection } from "@/components/organisms/GiftingSection";
import { OccasionsSection } from "@/components/organisms/OccasionsSection";
import { KaratSection } from "@/components/organisms/KaratSection";
import { GoldExchangeSection } from "@/components/organisms/GoldExchangeSection";
import { WeddingSection } from "@/components/organisms/WeddingSection";
import { Footer } from "@/components/organisms/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StorySection />
      <ShopByCategory />
      <CollectionHighlightSection />
      <GiftingSection />
      <OccasionsSection />
      <KaratSection />
      <GoldExchangeSection />
      <WeddingSection />
      <Footer />
    </main>
  );
}

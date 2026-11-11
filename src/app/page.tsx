import { Navbar } from "@/components/organisms/Navbar";
import { HeroSection } from "@/components/organisms/HeroSection";
import { StorySection } from "@/components/organisms/StorySection";
import { ShopByCategory } from "@/components/organisms/ShopByCategory";
import { CollectionHighlightSection } from "@/components/organisms/CollectionHighlightSection";
import { GiftingSection } from "@/components/organisms/GiftingSection";
import { OccasionsSection } from "@/components/organisms/OccasionsSection";
import { KaratSection } from "@/components/organisms/KaratSection";
import { WeddingSection } from "@/components/organisms/WeddingSection";
import { GoldExchangeSection } from "@/components/organisms/GoldExchangeSection";
import { WholesaleInquirySection } from "@/components/organisms/WholesaleInquirySection";
import { Footer } from "@/components/organisms/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StorySection />
      <ShopByCategory />
      <GiftingSection />
      <CollectionHighlightSection />
      <OccasionsSection />
      <KaratSection />
      <WeddingSection />
      <GoldExchangeSection />
      <WholesaleInquirySection />
      <Footer />
    </main>
  );
}

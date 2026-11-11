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
import { WelcomeIntro } from "@/components/organisms/WelcomeIntro";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Rajeshwari Jewellers | 22K Gold Jewellery in Ahmedabad",
  absoluteTitle: true,
  description:
    "Wholesale and retail 22K gold ornaments in Ahmedabad — antique, bridal, women's, men's and kids' jewellery. Visit our Shahibaug showroom or enquire online.",
  path: "/",
});

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-white overflow-x-hidden">
      <WelcomeIntro />
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

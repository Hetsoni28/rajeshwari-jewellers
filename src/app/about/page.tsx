import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { AboutClient } from "@/components/organisms/AboutClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Us – Gold Wholesaler, Ahmedabad",
  description:
    "Rajeshwari Jewellers supplies certified 22K, 18K and 24K gold ornaments to retailers and buyers across India from our Shahibaug, Ahmedabad showroom.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <AboutClient />
      <Footer />
    </main>
  );
}

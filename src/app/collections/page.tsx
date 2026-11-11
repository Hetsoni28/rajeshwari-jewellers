import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { CollectionsClient } from "@/components/organisms/CollectionsClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gold Jewellery for Women, Men & Kids",
  description:
    "Explore 22K gold jewellery collections: antique temple necklaces and jhumkas, women's mangalsutra and bangles, men's chains and kadas, kids' pendants.",
  path: "/collections",
  image: {
    url: "/images/antique_main_necklace.png",
    alt: "Antique 22K gold temple necklace from the Rajeshwari Jewellers antique collection",
  },
});

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <CollectionsClient />
      <Footer />
    </main>
  );
}

import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { CollectionsClient } from "@/components/organisms/CollectionsClient";

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <CollectionsClient />
      <Footer />
    </main>
  );
}

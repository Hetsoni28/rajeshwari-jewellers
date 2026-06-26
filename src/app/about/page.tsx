import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { AboutClient } from "@/components/organisms/AboutClient";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <AboutClient />
      <Footer />
    </main>
  );
}

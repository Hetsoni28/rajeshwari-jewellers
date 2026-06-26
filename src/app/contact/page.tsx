import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { ContactClient } from "@/components/organisms/ContactClient";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <ContactClient />
      <Footer />
    </main>
  );
}

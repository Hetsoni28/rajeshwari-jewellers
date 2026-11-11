import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { ContactClient } from "@/components/organisms/ContactClient";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact – Shahibaug Showroom, Ahmedabad",
  description:
    "Visit Rajeshwari Jewellers at E-13 Spectrum Tower, Shahibaug, Ahmedabad (Mon–Sat 10:30–7:30) or call +91 98259 53334 for wholesale gold enquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <ContactClient />
      <Footer />
    </main>
  );
}

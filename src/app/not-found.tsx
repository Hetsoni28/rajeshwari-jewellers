import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-40 pb-24">
        <p className="font-cinzel text-xs tracking-[0.3em] text-gold-dark uppercase mb-4">404</p>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] mb-4">Page not found</h1>
        <p className="text-gray-500 text-sm sm:text-base font-light mb-10 max-w-md">
          The piece or page you are looking for may have been moved or is no longer available.
        </p>
        <Link
          href="/catalog"
          className="inline-flex bg-[#B38728] text-white px-8 sm:px-10 py-3.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#8A671D] transition-colors shadow-md"
        >
          Browse Catalog
        </Link>
      </div>
      <Footer />
    </main>
  );
}

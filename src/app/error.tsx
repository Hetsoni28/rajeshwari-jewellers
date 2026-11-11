"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";

/**
 * Shown when a page throws while rendering (e.g. Sanity is temporarily unreachable).
 * The navbar and footer stay so visitors can keep browsing; "Try again" re-renders the page.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Keeps the error visible in the browser console / server logs for debugging
    console.error(error);
  }, [error]);

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Navbar />
      <div className="grow flex flex-col items-center justify-center text-center px-4 pt-40 pb-24">
        <p className="font-cinzel text-xs tracking-[0.3em] text-gold-deep uppercase mb-4">Something went wrong</p>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] mb-4">We couldn&apos;t load this page</h1>
        <p className="text-gray-500 text-sm sm:text-base font-light mb-10 max-w-md">
          This is usually temporary. Please try again — or reach our trade desk directly on WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center bg-gold-deep text-white px-8 sm:px-10 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] hover:bg-brown transition-colors shadow-md"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center border border-gray-300 px-8 sm:px-10 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gray-700 hover:border-gold-deep hover:text-gold-deep transition-colors"
          >
            Go to Homepage
          </Link>
          <a
            href="https://wa.me/919825953334"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center px-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gold-deep hover:text-brown transition-colors"
          >
            WhatsApp Us
          </a>
        </div>
        {error.digest && <p className="mt-8 text-[11px] text-gray-400">Reference: {error.digest}</p>}
      </div>
      <Footer />
    </main>
  );
}

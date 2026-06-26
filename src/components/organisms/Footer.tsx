import Link from "next/link";
import { LogoSVG } from "@/components/atoms/LogoSVG";
import { LogoText } from "@/components/atoms/LogoText";

export const Footer = () => {
  return (
    <footer className="bg-[#EAEAEA] border-t border-gray-300 pt-10 sm:pt-12 pb-5 sm:pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-8">

          {/* Column 1 — Brand & About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0 w-[46px] h-[46px] sm:w-[52px] sm:h-[52px]">
                <LogoSVG size="md" />
              </div>
              <LogoText solidBg={true} size="sm" />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed font-light pr-4 mb-5 max-w-sm">
              Crafting timeless fine jewelry for over three decades. Every piece tells a story of heritage, craftsmanship, and luxury. Visit our showroom or inquire online.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="font-cinzel text-base sm:text-lg font-bold tracking-wide text-[#1A1A1A] mb-3 sm:mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2.5 sm:gap-3 text-sm text-gray-600 font-light">
              <Link href="/" className="hover:text-gold-dark transition-colors py-0.5">Home</Link>
              <Link href="/collections" className="hover:text-gold-dark transition-colors py-0.5">Collections</Link>
              <Link href="/catalog" className="hover:text-gold-dark transition-colors py-0.5">Catalog</Link>
              <Link href="/about" className="hover:text-gold-dark transition-colors py-0.5">About Us</Link>
              <Link href="/contact" className="hover:text-gold-dark transition-colors py-0.5">Contact</Link>
            </div>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <h4 className="font-cinzel text-base sm:text-lg font-bold tracking-wide text-[#1A1A1A] mb-3 sm:mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3 sm:gap-4 text-sm text-gray-600 font-light">

              {/* Address */}
              <div className="flex gap-3 items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <p className="leading-relaxed text-[13px]">E-13, Spectrum Tower, Opp. Police Stadium, Shahibaug, Ahmedabad - 380 004</p>
              </div>

              {/* Phone */}
              <div className="flex gap-3 items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <div className="flex flex-col gap-1 text-[13px]">
                  <span>+91 98259 53334 (Dixit Soni)</span>
                  <span>+91 99255 11134 (Harshil Soni)</span>
                  <span>+91 83206 47040 (Jimil Soni)</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3 items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                  <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <a href="mailto:RAJESHWARIJEWEWLLERS13@GMAIL.COM" className="uppercase text-[11px] tracking-wider break-all hover:text-gold-dark transition-colors mt-0.5">
                  RAJESHWARIJEWEWLLERS13@GMAIL.COM
                </a>
              </div>

              {/* Hours */}
              <div className="flex gap-3 items-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <p className="text-[13px] mt-0.5">Mon–Sat: 10:30am – 7:30pm</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-10 pt-4 border-t border-gray-300 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 text-[10px] md:text-xs tracking-wider text-gray-400 uppercase font-light">
          <p>© {new Date().getFullYear()} Rajeshwari Jewellers. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <span className="hover:text-gray-600 transition-colors">Design by Soni Het Vishal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

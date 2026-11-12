import Link from "next/link";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone, ShieldCheck, Store, Truck } from "lucide-react";
import { LogoSVG } from "@/components/atoms/LogoSVG";

const EXPLORE = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Catalog", href: "/catalog" },
  { label: "Download Catalogue", href: "/catalog-download" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const COLLECTIONS = [
  { label: "Antique Jewellery", href: "/catalog?category=Antique" },
  { label: "Women's Jewellery", href: "/catalog?category=Female" },
  { label: "Men's Jewellery", href: "/catalog?category=Male" },
  { label: "Kids' Jewellery", href: "/catalog?category=Kids" },
  { label: "Mangalsutra", href: "/catalog?category=Female&sub=Mangalsutra" },
  { label: "Bridal Sets", href: "/catalog?category=Antique&sub=Set" },
];

const PHONES = [
  { name: "Dixit Soni", display: "+91 98259 53334", href: "tel:+919825953334" },
  { name: "Harshil Soni", display: "+91 99255 11134", href: "tel:+919925511134" },
  { name: "Jimil Soni", display: "+91 83206 47040", href: "tel:+918320647040" },
];

const EMAIL = "rajeshwarijewewllers13@gmail.com";
const DIRECTIONS = "https://www.google.com/maps/search/?api=1&query=Spectrum+Tower+Shahibaug+Ahmedabad";
const WHATSAPP = "https://wa.me/919825953334";

const ASSURANCES = [
  { icon: ShieldCheck, title: "Certified Purity", note: "22K, 18K & 24K gold" },
  { icon: Store, title: "Wholesale & Retail", note: "Showroom in Shahibaug" },
  { icon: Truck, title: "Pan-India Supply", note: "For retailers & jewellers" },
];

/** Hairline–diamond–hairline divider */
const Ornament = () => (
  <div className="flex items-center justify-center gap-3" aria-hidden="true">
    <span className="h-px w-16 bg-linear-to-r from-transparent to-gold/70" />
    <svg viewBox="0 0 10 10" className="h-2 w-2 text-gold">
      <path d="M5 0 10 5 5 10 0 5Z" fill="currentColor" />
    </svg>
    <span className="h-px w-16 bg-linear-to-l from-transparent to-gold/70" />
  </div>
);

const columnTitle = "mb-5 font-cinzel text-sm tracking-[0.22em] uppercase text-gold";
const listLink =
  "group inline-flex min-h-9 items-center gap-2 text-sm text-cream/80 transition-colors duration-300 hover:text-gold";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-cream" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Rajeshwari Jewellers — contact and site links
      </h2>

      {/* Gold hairline crown */}
      <div aria-hidden="true" className="h-px bg-linear-to-r from-transparent via-gold/70 to-transparent" />

      {/* ── Brand + showroom band ── */}
      <div className="container mx-auto px-5 sm:px-6 lg:px-12 pt-14 sm:pt-16 pb-12 text-center">
        <Link href="/" aria-label="Rajeshwari Jewellers — Home" className="mx-auto mb-6 block w-40 sm:w-48">
          <LogoSVG size="lg" />
        </Link>
        <p className="mx-auto mb-7 max-w-xl text-sm sm:text-[15px] font-light leading-relaxed text-cream/75">
          Wholesale &amp; retail gold ornaments from Ahmedabad — antique, bridal and everyday 22K jewellery,
          supplied to retailers and families across India.
        </p>
        <Ornament />

        <div className="mx-auto mt-9 grid max-w-4xl grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden border border-gold/25 bg-gold/25">
          {ASSURANCES.map(({ icon: Icon, title, note }) => (
            <div key={title} className="flex items-center gap-4 bg-ink px-6 py-5 text-left sm:flex-col sm:text-center sm:gap-2">
              <Icon size={22} strokeWidth={1.3} className="shrink-0 text-gold" aria-hidden="true" />
              <div>
                <p className="font-cinzel text-[13px] tracking-[0.15em] uppercase text-cream">{title}</p>
                <p className="mt-0.5 text-xs text-cream/60">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Columns ── */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto grid grid-cols-1 gap-10 px-5 sm:px-6 lg:px-12 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <nav aria-label="Explore">
            <p className={columnTitle}>Explore</p>
            <ul className="space-y-0.5">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={listLink}>
                    <span aria-hidden="true" className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Collections">
            <p className={columnTitle}>Collections</p>
            <ul className="space-y-0.5">
              {COLLECTIONS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={listLink}>
                    <span aria-hidden="true" className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={columnTitle}>Trade Desk</p>
            <ul className="space-y-1">
              {PHONES.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className="group flex min-h-11 items-center gap-3 text-sm transition-colors hover:text-gold">
                    <Phone size={14} strokeWidth={1.5} className="shrink-0 text-gold" aria-hidden="true" />
                    <span className="flex flex-col leading-tight">
                      <span className="text-cream tabular-nums group-hover:text-gold">{p.display}</span>
                      <span className="text-xs text-cream/55">{p.name}</span>
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${EMAIL}`} className="flex min-h-11 items-center gap-3 text-sm text-cream/80 transition-colors hover:text-gold break-all">
                  <Mail size={14} strokeWidth={1.5} className="shrink-0 text-gold" aria-hidden="true" />
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className={columnTitle}>Showroom</p>
            <address className="not-italic space-y-4 text-sm text-cream/80">
              <p className="flex items-start gap-3 leading-relaxed">
                <MapPin size={14} strokeWidth={1.5} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  E-13, Spectrum Tower,
                  <br />
                  Opp. Police Stadium, Shahibaug,
                  <br />
                  Ahmedabad – 380 004, Gujarat
                </span>
              </p>
              <p className="flex items-start gap-3 leading-relaxed">
                <Clock size={14} strokeWidth={1.5} className="mt-1 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  Mon–Sat · 10:30 am – 7:30 pm
                  <br />
                  <span className="text-cream/55">Sunday closed</span>
                </span>
              </p>
            </address>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center border border-gold/60 px-5 text-[10px] font-bold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-gold hover:text-brown"
              >
                Get Directions
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center bg-gold px-5 text-[10px] font-bold uppercase tracking-[0.2em] text-brown transition-colors hover:bg-gold-light"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-5 sm:px-6 lg:px-12 py-6 text-[11px] uppercase tracking-[0.18em] text-cream/55 sm:flex-row">
          <p>© {year} Rajeshwari Jewellers. All rights reserved.</p>
          <a
            href="https://www.hntech.in/"
            target="_blank"
            rel="noopener"
            aria-label="Designed and developed by HNTech (opens in a new tab)"
            className="group flex min-h-11 items-center gap-2.5 transition-colors hover:text-gold"
          >
            <Image src="/hn-logo.jpg" alt="" width={22} height={22} className="rounded-full opacity-90 transition-opacity group-hover:opacity-100" />
            <span>
              Designed &amp; developed by{" "}
              <span className="text-cream/80 underline decoration-gold/40 underline-offset-4 transition-colors group-hover:text-gold group-hover:decoration-gold">
                HNTech
              </span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

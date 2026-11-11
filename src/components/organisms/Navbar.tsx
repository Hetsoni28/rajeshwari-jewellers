"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Heart, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navbarReveal, luxuryEasing, duration } from '@/lib/motion';
import { LogoSVG } from '@/components/atoms/LogoSVG';
import { useWishlist } from '@/context/WishlistContext';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Collections', href: '/collections' },
  { name: 'Catalog', href: '/catalog' },
  { name: 'Download', href: '/catalog-download' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const PHONE_DISPLAY = '+91 98259 53334';
const PHONE_HREF = 'tel:+919825953334';
const WHATSAPP_HREF = 'https://wa.me/919825953334';

/** Tiny faceted diamond used as a separator between links */
const Diamond = ({ className = '' }: { className?: string }) => (
  <svg aria-hidden="true" viewBox="0 0 8 8" className={`h-1.5 w-1.5 shrink-0 ${className}`}>
    <path d="M4 0 8 4 4 8 0 4Z" fill="currentColor" />
  </svg>
);

/** WhatsApp glyph (brand mark, drawn inline so it inherits colour) */
const WhatsAppIcon = ({ className = '' }: { className?: string }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.9 9.9 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.24 8.24 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.23-.73-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07s.88 2.4 1 2.56c.13.17 1.74 2.66 4.21 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
  </svg>
);

export const Navbar = () => {
  const { items, isHydrated } = useWishlist();
  const wishlistCount = isHydrated ? items.length : 0;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isHomePage = pathname === '/';
  const isContactPage = pathname === '/contact';
  const isTransparentPage = isHomePage || isContactPage;
  const isSolidBg = isScrolled || !isTransparentPage;
  const useDarkText = isSolidBg || isContactPage;
  // The grand, centred-logo layout is used only on the homepage hero before scrolling
  const isGrand = isHomePage && !isScrolled;
  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    // Check once on mount too — after a reload mid-page the navbar must start in the right state
    const frame = requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Full-screen menu: lock page scroll, move focus in, trap Tab, Escape closes and returns focus
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const panel = mobileMenuRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = requestAnimationFrame(() => panel?.querySelector<HTMLElement>('nav a')?.focus());
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key === 'Tab' && panel) {
        const focusables = Array.from(panel.querySelectorAll<HTMLElement>('a, button'));
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  // Colour tokens for the current state
  const textTone = useDarkText ? 'text-brown' : 'text-white';
  const mutedTone = useDarkText ? 'text-brown/70' : 'text-white/80';

  const linkClass = (href: string) =>
    `group relative inline-flex min-h-11 items-center px-1 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ${
      isActive(href)
        ? useDarkText ? 'text-gold-deep' : 'text-white'
        : useDarkText ? 'text-brown hover:text-gold-deep' : 'text-white/85 hover:text-white'
    }`;

  // Render helpers (plain functions, not nested components, so React keeps the same elements between renders)
  const linkUnderline = (href: string) =>
    isActive(href) ? (
      <motion.span
        layoutId="nav-active-underline"
        aria-hidden="true"
        className={`absolute left-1 right-1 bottom-2 h-px ${useDarkText ? 'bg-gold-deep' : 'bg-gold'}`}
        transition={{ type: 'spring', stiffness: 400, damping: 36 }}
      />
    ) : (
      <span
        aria-hidden="true"
        className={`absolute left-1/2 right-1/2 bottom-2 h-px transition-all duration-300 group-hover:left-1 group-hover:right-1 ${useDarkText ? 'bg-gold-deep' : 'bg-gold'}`}
      />
    );

  const wishlistLink = (size = 20) => (
    <Link
      href="/wishlist"
      aria-label={`Wishlist (${wishlistCount} items)`}
      className={`relative flex h-11 w-11 items-center justify-center transition-colors duration-300 hover:text-gold ${textTone}`}
    >
      <Heart size={size} strokeWidth={1.5} />
      {wishlistCount > 0 && (
        <span aria-hidden="true" className="absolute top-1 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-deep px-1 text-[9px] font-bold text-white">
          {wishlistCount}
        </span>
      )}
    </Link>
  );

  return (
    <motion.header
      variants={navbarReveal}
      initial="hidden"
      animate="show"
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* ── Announcement bar (desktop/tablet, folds away on scroll) ── */}
      <div
        className={`hidden md:block overflow-hidden bg-brown text-cream transition-all duration-500 ${
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
        }`}
      >
        <div className="container mx-auto flex h-9 items-center justify-between px-6 md:px-12 text-[10px] uppercase tracking-[0.22em]">
          <p className="flex items-center gap-3 text-cream/85">
            <span>22K Certified Gold</span>
            <Diamond className="text-gold" />
            <span>Wholesale &amp; Retail</span>
            <Diamond className="text-gold hidden lg:block" />
            <span className="hidden lg:inline">Shahibaug, Ahmedabad</span>
          </p>
          <div className="flex items-center gap-5 text-cream/85">
            <span className="hidden lg:flex items-center gap-2">
              <Clock size={12} strokeWidth={1.6} className="text-gold" aria-hidden="true" />
              Mon–Sat · 10:30 am – 7:30 pm
            </span>
            <a href={PHONE_HREF} className="flex min-h-9 items-center gap-2 hover:text-gold transition-colors">
              <Phone size={12} strokeWidth={1.6} className="text-gold" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      {/* ── Main bar ── */}
      <div
        className={`relative transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          isSolidBg
            ? 'bg-[#FFFDF8]/95 backdrop-blur-md shadow-[0_10px_30px_-20px_rgba(62,39,35,0.35)]'
            : isContactPage
              ? 'bg-transparent'
              : 'bg-linear-to-b from-black/45 via-black/15 to-transparent'
        }`}
      >
        {/* Gold hairline under the bar when solid */}
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold/60 to-transparent transition-opacity duration-500 ${isSolidBg ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Desktop (xl+) */}
        <div className="hidden xl:block">
          {isGrand ? (
            /* Grand showroom layout: phone · centred logo · icons, then a centred row of links */
            <div className="container mx-auto px-12">
              <div className="grid grid-cols-3 items-center pt-4">
                <a href={PHONE_HREF} className={`flex w-fit min-h-11 items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors hover:text-gold ${mutedTone}`}>
                  <Phone size={14} strokeWidth={1.5} aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
                <Link href="/" aria-label="Rajeshwari Jewellers — Home" className="mx-auto block w-50">
                  <LogoSVG size="xl" priority />
                </Link>
                <div className="flex items-center justify-end gap-3">
                  {wishlistLink()}
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-11 items-center gap-2.5 border border-gold/70 px-5 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-gold hover:text-brown"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
              <nav aria-label="Main" className="mt-2 flex items-center justify-center gap-6 border-t border-white/20 pb-1">
                {NAV_LINKS.map((link, i) => (
                  <span key={link.href} className="flex items-center gap-6">
                    {i > 0 && <Diamond className="text-gold/80" />}
                    <Link href={link.href} aria-current={isActive(link.href) ? 'page' : undefined} className={linkClass(link.href)}>
                      {link.name}
                      {linkUnderline(link.href)}
                    </Link>
                  </span>
                ))}
              </nav>
            </div>
          ) : (
            /* Compact layout: logo · links · icons */
            <div className="container mx-auto flex items-center justify-between gap-8 px-12 py-2">
              <Link href="/" aria-label="Rajeshwari Jewellers — Home" className="block w-33 shrink-0">
                <LogoSVG size="md" priority />
              </Link>
              <nav aria-label="Main" className="flex items-center gap-5 2xl:gap-7">
                {NAV_LINKS.map((link, i) => (
                  <span key={link.href} className="flex items-center gap-5 2xl:gap-7">
                    {i > 0 && <Diamond className={useDarkText ? 'text-gold-dark/70' : 'text-gold/80'} />}
                    <Link href={link.href} aria-current={isActive(link.href) ? 'page' : undefined} className={linkClass(link.href)}>
                      {link.name}
                      {linkUnderline(link.href)}
                    </Link>
                  </span>
                ))}
              </nav>
              <div className="flex shrink-0 items-center gap-3">
                {wishlistLink()}
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-11 items-center gap-2.5 bg-brown px-5 text-[10px] font-bold uppercase tracking-[0.22em] text-cream transition-colors duration-300 hover:bg-gold hover:text-brown"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Phones & tablets: menu · centred logo · wishlist */}
        <div className="xl:hidden container mx-auto grid grid-cols-[44px_1fr_44px] items-center px-4 sm:px-6 py-2">
          <motion.button
            ref={menuButtonRef}
            type="button"
            whileTap={{ scale: 0.92 }}
            transition={{ duration: duration.micro }}
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className={`flex h-11 w-11 items-center justify-center transition-colors hover:text-gold ${textTone}`}
          >
            <Menu size={24} strokeWidth={1.5} />
          </motion.button>
          <Link
            href="/"
            aria-label="Rajeshwari Jewellers — Home"
            className={`mx-auto block transition-all duration-500 ${isSolidBg ? 'w-28 sm:w-32' : 'w-32 sm:w-40'}`}
          >
            <LogoSVG size="md" priority />
          </Link>
          {wishlistLink(22)}
        </div>
      </div>

      {/* ── Full-screen menu (phones & tablets) ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: luxuryEasing }}
            className="xl:hidden fixed inset-0 z-60 flex flex-col overflow-y-auto bg-[#FFFDF8]"
          >
            {/* Header row */}
            <div className="flex items-center justify-between border-b border-gold/30 px-4 sm:px-6 py-2">
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  menuButtonRef.current?.focus();
                }}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center text-brown hover:text-gold-deep transition-colors"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
              <div className="w-28 sm:w-32">
                <LogoSVG size="md" />
              </div>
              <span className="w-11" aria-hidden="true" />
            </div>

            {/* Links */}
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-8 py-10">
              <ul className="mx-auto w-full max-w-sm space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: duration.base, ease: luxuryEasing }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                      className={`flex min-h-13 items-center justify-between border-b border-brown/10 font-cinzel text-xl sm:text-2xl tracking-wide transition-colors ${
                        isActive(link.href) ? 'text-gold-deep' : 'text-brown hover:text-gold-deep'
                      }`}
                    >
                      <span>{link.name === 'Download' ? 'Download Catalogue' : link.name}</span>
                      {isActive(link.href) && <Diamond className="text-gold-deep" />}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Showroom card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: duration.base, ease: luxuryEasing }}
              className="bg-brown px-8 py-8 text-cream"
            >
              <div className="mx-auto max-w-sm space-y-4">
                <p className="flex items-start gap-3 text-sm leading-relaxed text-cream/85">
                  <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  E-13, Spectrum Tower, Opp. Police Stadium, Shahibaug, Ahmedabad
                </p>
                <p className="flex items-center gap-3 text-sm text-cream/85">
                  <Clock size={16} strokeWidth={1.5} className="shrink-0 text-gold" aria-hidden="true" />
                  Mon–Sat · 10:30 am – 7:30 pm
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href={PHONE_HREF}
                    className="flex min-h-12 items-center justify-center gap-2 border border-gold/60 text-[11px] font-bold uppercase tracking-[0.2em] text-cream hover:bg-gold hover:text-brown transition-colors"
                  >
                    <Phone size={14} strokeWidth={1.6} aria-hidden="true" /> Call
                  </a>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-12 items-center justify-center gap-2 bg-gold text-[11px] font-bold uppercase tracking-[0.2em] text-brown hover:bg-gold-light transition-colors"
                  >
                    <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mobileMenuReveal, navbarReveal, luxuryEasing, duration } from '@/lib/motion';
import { LogoSVG } from '@/components/atoms/LogoSVG';
import { LogoText } from '@/components/atoms/LogoText';
import { useWishlist } from '@/context/WishlistContext';

export const Navbar = () => {
  const { items, isHydrated } = useWishlist();
  const wishlistCount = isHydrated ? items.length : 0;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isContactPage = pathname === '/contact';
  const isTransparentPage = isHomePage || isContactPage;
  const isSolidBg = isScrolled || !isTransparentPage;
  const useDarkText = isSolidBg || isContactPage;

  useEffect(() => {
    setActiveLink(pathname);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/collections' },
    { name: 'Catalog', href: '/catalog' },
    { name: 'Download', href: '/catalog-download' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      variants={navbarReveal}
      initial="hidden"
      animate="show"
      className={`fixed w-full z-50 transition-all duration-700 ${
        isSolidBg
          ? 'bg-white/96 backdrop-blur-md shadow-[0_1px_24px_rgba(0,0,0,0.07)] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            className={`flex-shrink-0 transition-all duration-500 ${isSolidBg ? 'w-[40px] h-[40px]' : 'w-[50px] h-[50px]'}`}
            whileHover={{ rotate: 2, scale: 1.05 }}
            transition={{ duration: duration.fast, ease: luxuryEasing }}
          >
            <LogoSVG size={isSolidBg ? "sm" : "md"} />
          </motion.div>
          <LogoText solidBg={isSolidBg} darkText={useDarkText} size={isSolidBg ? "sm" : "md"} />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-[11px] lg:text-xs tracking-[0.18em] uppercase font-semibold transition-colors duration-300 group ${
                useDarkText ? 'text-brown hover:text-gold' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.name}
              {/* Animated underline indicator */}
              <motion.span
                className="absolute -bottom-1 left-0 h-px bg-gold"
                initial={false}
                animate={{ width: activeLink === link.href ? '100%' : '0%' }}
                transition={{ duration: duration.base, ease: luxuryEasing }}
              />
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold/50 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
          <div className="flex items-center space-x-5">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} transition={{ duration: duration.micro }}>
              <Link
                href="/wishlist"
                className={`relative flex items-center justify-center hover:text-gold transition-colors duration-300 ${useDarkText ? 'text-brown' : 'text-white/80'}`}
              >
                <Heart size={19} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#B38728] text-[9px] font-bold text-white shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </motion.div>
            <motion.a
              href="https://wa.me/919825953334"
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-2 bg-gold text-brown px-5 py-2.5 hover:bg-gold-light transition-colors duration-300 shadow-md"
              whileHover={{ y: -1, boxShadow: "0 8px 24px rgba(212,175,55,0.25)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: duration.fast, ease: luxuryEasing }}
            >
              <Phone size={14} />
              <span className="font-bold text-[10px] tracking-wider">WHATSAPP</span>
            </motion.a>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-5 md:hidden">
          <Link href="/wishlist" className={`relative flex items-center justify-center hover:text-gold transition-colors ${useDarkText ? 'text-brown' : 'text-gold'}`}>
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#B38728] text-[9px] font-bold text-white shadow-sm">
                {wishlistCount}
              </span>
            )}
          </Link>
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={{ duration: duration.micro }}
            className={`hover:text-gold transition-colors ${useDarkText ? 'text-brown' : 'text-gold'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={28} />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuReveal}
            initial="hidden"
            animate="show"
            exit="exit"
            className="md:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-lg shadow-[0_8px_40px_rgba(0,0,0,0.10)] overflow-hidden"
          >
            <div className="flex flex-col items-center py-10 space-y-7">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: duration.fast, ease: luxuryEasing }}
                >
                  <Link
                    href={link.href}
                    className="text-brown text-base tracking-[0.2em] font-semibold uppercase hover:text-gold transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                href="https://wa.me/919825953334"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 bg-gold text-brown px-10 py-3.5 w-3/4 justify-center mt-2 font-bold tracking-widest text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.06, duration: duration.fast, ease: luxuryEasing }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone size={16} />
                <span>WHATSAPP</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

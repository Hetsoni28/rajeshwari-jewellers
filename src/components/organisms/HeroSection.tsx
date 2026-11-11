'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import Image from 'next/image';
import { altFor } from "@/lib/imageAlts";

const slides = [
  {
    id: 1,
    image: '/images/hero_bridal_16x9.jpg',
    // Phone crop keeps the centre pendant in frame (x% y%)
    focal: '58% 55%',
    titleMain: 'Wholesale',
    titleScript: 'Ornaments',
    link: '/catalog'
  },
  {
    id: 2,
    image: '/images/hero_modern_8k.jpg',
    focal: '50% 45%',
    titleMain: 'Retail',
    titleScript: 'Jewellery',
    link: '/catalog?category=Female'
  }
];

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  // Autoplay pauses while the visitor hovers or focuses inside the hero, when they press Pause,
  // and never runs for people who have "reduce motion" turned on (WCAG 2.2.2)
  const [interacting, setInteracting] = React.useState(false);
  const [userPaused, setUserPaused] = React.useState(false);
  const reducedMotion = React.useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const autoplay = !interacting && !userPaused && !reducedMotion;

  // Restart the autoplay timer whenever the slide changes (incl. manual clicks),
  // so a manual change isn't immediately overridden by the interval
  React.useEffect(() => {
    if (!autoplay) return;
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentSlide, autoplay]);

  // Swipe left/right on touch screens (arrows are hidden on phones so they don't cover the title)
  const touchStartX = React.useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) setCurrentSlide((prev) => (prev + 1) % slides.length);
    else setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative w-full h-svh min-h-137.5 md:min-h-175 overflow-hidden bg-brown"
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setInteracting(false);
      }}
    >
      
      {/* Single page H1 for search engines; the slide titles below are visual H2s */}
      <h1 className="sr-only">Rajeshwari Jewellers – 22K Gold Jewellery Wholesaler &amp; Retailer in Shahibaug, Ahmedabad</h1>

      {/* Background Slider - Pure CSS Opacity */}
      {slides.map((slide, index) => (
        <div 
          key={`bg-${slide.id}`}
          aria-hidden={currentSlide !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image
            src={slide.image}
            alt={altFor(slide.image, slide.titleMain)}
            fill
            className="object-cover object-(--focal) sm:object-top"
            style={{ ["--focal" as string]: slide.focal }}
            priority={index === 0}
            sizes="100vw"
          />
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-linear-to-t from-brown/70 via-brown/30 sm:bg-linear-to-r sm:from-brown/80 sm:via-brown/30 to-transparent" />
        </div>
      ))}

      {/* Content Slider - Framer Motion with AnimatePresence (fixes overlap bug) */}
      {/* Announces slide changes to screen readers only when the visitor changes the slide (not during autoplay) */}
      <div
        className="absolute inset-0 flex items-center container mx-auto px-6 lg:px-8 z-20 pointer-events-none"
        aria-live={autoplay ? "off" : "polite"}
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute max-w-xl lg:ml-16 pointer-events-auto"
            role="group"
            aria-roledescription="slide"
            aria-label={`${currentSlide + 1} of ${slides.length}: ${slides[currentSlide].titleMain} ${slides[currentSlide].titleScript}`}
          >
            {/* Title */}
            <h2 className="text-white mb-8 sm:mb-12 flex flex-col sm:block">
              <span className="font-montserrat font-light text-4xl sm:text-5xl md:text-6xl tracking-wide">{slides[currentSlide].titleMain}</span>
              <span className="font-script text-white text-6xl sm:text-7xl md:text-8xl mt-2 sm:mt-0 sm:ml-4 drop-shadow-md">{slides[currentSlide].titleScript}</span>
            </h2>

            {/* CTA Button */}
            <Link
              href={slides[currentSlide].link}
              className="inline-block bg-gold text-brown px-8 sm:px-10 py-3 rounded-full uppercase tracking-[2px] text-xs font-bold shadow-lg sm:ml-4"
            >
              EXPLORE
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Custom Pointed Arch Overlay (Bottom) */}
      <div className="absolute -bottom-0.5 left-0 w-full z-20 pointer-events-none">
        <svg viewBox="0 0 1440 150" className="w-full h-auto drop-shadow-[0_-8px_20px_rgba(0,0,0,0.15)]" preserveAspectRatio="none">
          {/* Main Cream Fill */}
          <path 
            fill="#FFFDD0" 
            d="M0,150 L1440,150 L1440,80 Q1440,40 1390,40 L820,40 Q760,40 720,0 Q680,40 620,40 L50,40 Q0,40 0,80 Z"
          />
          {/* Thin Orange Inner Stroke */}
          <path 
            fill="none" 
            stroke="#E57A44" 
            strokeWidth="1.5"
            d="M-10,88 Q10,50 50,50 L620,50 Q675,50 720,15 Q765,50 820,50 L1390,50 Q1430,50 1450,88"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 hidden sm:flex items-center justify-center rounded-full bg-white/80 sm:bg-white text-[#1A1A1A] z-20 shadow-lg backdrop-blur-sm pointer-events-auto transition-transform active:scale-95"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <button 
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 hidden sm:flex items-center justify-center rounded-full bg-white/80 sm:bg-white text-[#1A1A1A] z-20 shadow-lg backdrop-blur-sm pointer-events-auto transition-transform active:scale-95"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Indicators + pause — each control has a 32px touch area around the small dot */}
      <div className="absolute bottom-10 sm:bottom-14 right-4 sm:right-14 flex items-center gap-1 z-20 pointer-events-auto">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setCurrentSlide(i)}
            aria-label={`Show slide ${i + 1}: ${slide.titleMain} ${slide.titleScript}`}
            aria-current={currentSlide === i}
            className="h-8 w-8 flex items-center justify-center rounded-full"
          >
            <span className={`block rounded-full transition-all duration-500 ${currentSlide === i ? 'w-2 h-2 bg-white' : 'w-1.5 h-1.5 bg-white/40'}`} />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={userPaused || reducedMotion ? "Play slideshow" : "Pause slideshow"}
          aria-pressed={userPaused}
          className="ml-1 h-8 w-8 flex items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/15 transition-colors"
        >
          {userPaused || reducedMotion ? <Play className="w-3 h-3" fill="currentColor" /> : <Pause className="w-3 h-3" fill="currentColor" />}
        </button>
      </div>
    </section>
  );
};

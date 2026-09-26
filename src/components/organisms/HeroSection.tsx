'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: '/images/hero_bridal_16x9.jpg',
    titleMain: 'Wholesale',
    titleScript: 'Ornaments',
    link: '/catalog?category=Wholesale'
  },
  {
    id: 2,
    image: '/images/hero_modern_8k.jpg',
    titleMain: 'Retail',
    titleScript: 'Jewellery',
    link: '/catalog?category=DailyWear'
  }
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-[100svh] min-h-[550px] md:min-h-[700px] overflow-hidden bg-[#3E2723]">
      
      {/* Background Slider */}
      {slides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image
            src={slide.image}
            alt={slide.titleMain}
            fill
            className="object-cover object-center sm:object-top"
            priority={index === 0}
          />
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/70 via-[#3E2723]/30 sm:bg-gradient-to-r sm:from-[#3E2723]/60 sm:via-[#3E2723]/20 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center container mx-auto px-6 lg:px-8 z-20 pointer-events-none">
        {slides.map((slide, index) => (
          <div 
            key={`content-${slide.id}`}
            className={`absolute max-w-xl lg:ml-16 transition-all duration-700 ease-out ${
              currentSlide === index 
                ? 'opacity-100 translate-y-0 pointer-events-auto' 
                : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
          >
            {/* Title */}
            <h1 className="text-white mb-8 sm:mb-12 flex flex-col sm:block">
              <span className="font-montserrat font-light text-4xl sm:text-5xl md:text-6xl tracking-wide">{slide.titleMain}</span>
              <span className="font-script text-white text-6xl sm:text-7xl md:text-8xl mt-2 sm:mt-0 sm:ml-4 drop-shadow-md">{slide.titleScript}</span>
            </h1>

            {/* CTA Button */}
            <Link href={slide.link}>
              <button className="bg-[#D4AF37] text-[#3E2723] px-8 sm:px-10 py-3 rounded-full uppercase tracking-[2px] text-xs font-bold shadow-lg sm:ml-4 pointer-events-auto">
                EXPLORE
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Custom Pointed Arch Overlay (Bottom) */}
      <div className="absolute bottom-[-2px] left-0 w-full z-20 pointer-events-none">
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
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/80 sm:bg-white text-[#1A1A1A] z-20 shadow-lg backdrop-blur-sm pointer-events-auto"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/80 sm:bg-white text-[#1A1A1A] z-20 shadow-lg backdrop-blur-sm pointer-events-auto"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-12 sm:bottom-16 right-6 sm:right-16 flex gap-2 z-20 pointer-events-auto">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`rounded-full transition-all duration-500 ${currentSlide === i ? 'w-2 h-2 bg-white' : 'w-1.5 h-1.5 bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  );
};

'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const GiftingSection = () => {
  return (
    <section className="bg-white">
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        
        {/* Left Side (Text Box) */}
        <div className="w-full lg:w-1/2 relative bg-[#FFFDF5] flex items-center justify-center min-h-[520px] lg:min-h-screen overflow-hidden">

          {/* Gift ribbon — horizontal bar */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Horizontal gold ribbon */}
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex flex-col items-center gap-[6px]">
              <div className="w-full h-7 sm:h-9 bg-[#D4AF37]" />
              <div className="w-full h-[4px] bg-[#B8932A]" />
              <div className="w-full h-7 sm:h-9 bg-[#D4AF37]" />
            </div>
            {/* Vertical gold ribbon */}
            <div className="absolute left-1/2 top-0 h-full -translate-x-1/2 flex flex-row items-center gap-[6px]">
              <div className="h-full w-7 sm:w-9 bg-[#D4AF37]" />
              <div className="h-full w-[4px] bg-[#B8932A]" />
              <div className="h-full w-7 sm:w-9 bg-[#D4AF37]" />
            </div>
          </div>

          {/* Card / gift tag */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 bg-[#FFFDF5] text-center px-7 py-8 sm:px-12 sm:py-10 max-w-sm sm:max-w-md mx-6 shadow-xl"
            style={{
              border: '1.5px solid #D4AF37',
              borderRadius: '2px 16px 2px 16px',
            }}
          >
            {/* Corner ornaments */}
            <svg className="absolute top-2 left-2 w-5 h-5 text-[#D4AF37]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M0 10 L10 0" /><path d="M0 0 L10 0 L0 10" fill="currentColor" opacity="0.15"/>
            </svg>
            <svg className="absolute top-2 right-2 w-5 h-5 text-[#D4AF37]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M20 10 L10 0" /><path d="M20 0 L10 0 L20 10" fill="currentColor" opacity="0.15"/>
            </svg>
            <svg className="absolute bottom-2 left-2 w-5 h-5 text-[#D4AF37]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M0 10 L10 20" /><path d="M0 20 L10 20 L0 10" fill="currentColor" opacity="0.15"/>
            </svg>
            <svg className="absolute bottom-2 right-2 w-5 h-5 text-[#D4AF37]" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M20 10 L10 20" /><path d="M20 20 L10 20 L20 10" fill="currentColor" opacity="0.15"/>
            </svg>

            <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl text-[#922D30] font-medium mb-4 sm:mb-6 leading-snug">
              Bulk Orders &amp; <br/> Wholesale Enquiries
            </h2>
            <p className="text-[#3E2723] font-montserrat font-light text-sm sm:text-base mb-7 sm:mb-10 leading-relaxed">
              We supply premium gold and diamond ornaments to retailers, jewellers, and bulk buyers across India. Competitive rates, certified purity, and exclusive designs available for trade.
            </p>
            <Link
              href="/catalog"
              className="inline-block border-b-2 border-[#3E2723] text-[#3E2723] font-semibold uppercase tracking-wider text-sm pb-1 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
            >
              View Wholesale Catalogue
            </Link>
          </motion.div>
        </div>

        {/* Right Side (Image) — full height */}
        <div className="w-full lg:w-1/2 relative min-h-[420px] sm:min-h-[560px] lg:min-h-screen">
          <Image
            src="/images/bridal_necklace.png"
            alt="Wholesale Ornaments"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

      </div>
    </section>
  );
};

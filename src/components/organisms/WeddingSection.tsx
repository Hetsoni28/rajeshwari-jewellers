'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const WeddingSection = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      
      {/* Background Ornate Graphic */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/wedding_palace_bg.jpg" 
          alt="Wedding Background" 
          fill 
          className="object-cover object-center"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center flex flex-col items-center max-w-3xl px-4"
      >
        {/* Double Rings Icon with Horizontal Lines */}
        <div className="mb-10 flex items-center justify-center w-full gap-4 text-[#DAB852]">
          <div className="h-[1px] w-12 sm:w-20 bg-[#DAB852]"></div>
          <svg width="32" height="20" viewBox="0 0 40 30" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="16" cy="15" r="7" />
            <circle cx="24" cy="15" r="7" />
          </svg>
          <div className="h-[1px] w-12 sm:w-20 bg-[#DAB852]"></div>
        </div>

        <h2 className="font-montserrat font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#3E2723] mb-10 sm:mb-12 leading-[1.4]">
          Elevate your showroom with our <br/>
          <span className="font-script text-[#DAB852] text-5xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-sm pr-3">premium</span> bridal sets for <br/>
          bulk sourcing.
        </h2>

        <Link href="/catalog?category=Bridal">
          <button className="bg-[#DAB852] text-[#3E2723] px-12 py-4 font-semibold text-sm hover:bg-[#c9a744] transition-colors">
            Explore Wholesale Bridal Collection
          </button>
        </Link>
      </motion.div>
    </section>
  );
};

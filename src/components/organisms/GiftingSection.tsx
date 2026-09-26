'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const GiftingSection = () => {
  return (
    <section className="bg-white">
      <div className="flex flex-col lg:flex-row w-full">
        
        {/* Left Side (Text Box) */}
        <div className="w-full lg:w-1/2 relative bg-[#FFFDD0] flex items-center justify-center p-12 sm:p-24 min-h-[500px]">
          {/* Blue cross graphic */}
          <div className="absolute inset-0 z-0 flex flex-col justify-center items-center">
             <div className="w-full h-24 bg-[#D4AF37] opacity-10 absolute top-1/2 -translate-y-1/2" />
             <div className="h-full w-24 bg-[#D4AF37] opacity-10 absolute left-1/2 -translate-x-1/2" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 border border-[#D4AF37] bg-[#FFFDD0] p-10 sm:p-16 text-center max-w-lg shadow-2xl"
            style={{ borderRadius: '4px 20px 4px 20px' }} // Custom subtle corner shaping
          >
            <h2 className="font-cinzel text-3xl sm:text-4xl text-[#922D30] font-medium mb-6">
              Give a gift they will <br/> treasure forever
            </h2>
            <p className="text-[#3E2723] font-montserrat font-light text-sm sm:text-base mb-10 leading-relaxed">
              From milestones to quiet everyday moments, celebrate the people who matter the most with timeless jewels.
            </p>
            <Link href="/catalog" className="inline-block border-b-2 border-[#3E2723] text-[#3E2723] font-semibold uppercase tracking-wider text-sm pb-1 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors">
              Explore Rajeshwari's Gifting Edit
            </Link>
          </motion.div>
        </div>

        {/* Right Side (Image) */}
        <div className="w-full lg:w-1/2 relative min-h-[500px]">
          <Image
            src="/images/bridal_necklace.png"
            alt="Gifting Collection"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
};

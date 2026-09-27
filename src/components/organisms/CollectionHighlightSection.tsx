'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const CollectionHighlightSection = () => {
  return (
    <section className="bg-white py-24 sm:py-32 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Top Centered Text */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#3E2723] font-cinzel leading-relaxed"
          >
            Exquisite <span className="font-script text-[#D4AF37] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">craftsmanship,</span> for your showroom; <br/>
            Discover our exclusive <span className="font-script text-[#D4AF37] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">wholesale</span> collections
          </motion.h2>
          
          <div className="mt-8 flex justify-center">
             <div className="flex items-center gap-4">
                <div className="w-16 h-[1px] bg-[#D4AF37]" />
                {/* Deer/Logo icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#D4AF37">
                   <path d="M12 2L15 8L22 9L17 14L18 21L12 17L6 21L7 14L2 9L9 8L12 2Z" />
                </svg>
                <div className="w-16 h-[1px] bg-[#D4AF37]" />
             </div>
          </div>
        </div>

        {/* Split Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mt-10 lg:mt-16">
          
          {/* Left Text */}
          <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-12">
            <motion.h3 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl lg:text-5xl text-[#3E2723] font-playfair mb-6"
            >
              Signature <br/> Wholesale
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#3E2723]/80 font-montserrat text-sm sm:text-base leading-relaxed mb-8"
            >
              Stock your showroom with our 22KT gold masterpieces. Designed for high turnover and premium margins, the Rajeshwari Signature collection offers bulk buyers the finest craftsmanship, certified purity, and exclusive B2B trade rates trusted by leading jewellers across India.
            </motion.p>
            <Link href="/catalog">
            <motion.button 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#D4AF37] text-[#3E2723] px-8 py-3 font-semibold shadow-md"
            >
              See Our Category
            </motion.button>
            </Link>
          </div>

          {/* Right Image with Custom Dome Frame */}
          <div className="w-full lg:w-2/3 relative h-[300px] sm:h-[450px] lg:h-[600px] flex justify-end">
             {/* The Dome shape mask */}
             <div 
                className="relative w-full max-w-full lg:max-w-[800px] h-full overflow-hidden shadow-2xl"
                style={{
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 100%, 0% 100%, 0% 20%)',
                  borderRadius: '80px 80px 0 0'
                }}
             >
                <Image
                  src="/images/heritage_necklaces.png"
                  alt="Rajeshwari Signature"
                  fill
                  className="object-cover"
                />
                
                {/* Inner Overlay Logo Text */}
                <div className="absolute left-8 top-1/2 -translate-y-1/2 text-center text-[#D4AF37] max-w-[200px]">
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="mx-auto mb-2">
                     <path d="M12 2L15 8L22 9L17 14L18 21L12 17L6 21L7 14L2 9L9 8L12 2Z" />
                   </svg>
                   <h4 className="text-xl font-cinzel tracking-widest font-bold mb-1">RAJESHWARI</h4>
                   <p className="text-[10px] tracking-widest uppercase mb-4 opacity-80">Gold & Diamonds</p>
                   <div className="w-8 h-[1px] bg-currentColor mx-auto mb-4" />
                   <p className="text-[10px] tracking-widest uppercase mb-1">Presents</p>
                   <h3 className="text-3xl font-playfair italic">Signature</h3>
                   <p className="text-[8px] tracking-widest uppercase mt-2 opacity-80">Bridal Collection</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

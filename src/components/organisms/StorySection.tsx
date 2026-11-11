'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { LogoSVG } from '@/components/atoms/LogoSVG';

export const StorySection = () => {
  return (
    <section className="bg-[#FFFDD0] pt-6 pb-16 sm:pb-24 relative text-center">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          {/* Decorative Logo / Icon */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-24 h-[1px] bg-gold-dark/40" />
            <div className="w-16 h-16 text-gold-dark">
              <LogoSVG size="md" />
            </div>
            <div className="w-24 h-[1px] bg-gold-dark/40" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#3E2723] font-cinzel mb-8 flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
            Every <span className="font-script text-[#D4AF37] text-5xl sm:text-6xl md:text-7xl lg:text-8xl">Ornament</span> Tells a Story
          </h2>

          {/* Text */}
          <p className="text-[#3E2723]/80 font-montserrat font-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Your trusted source for retail &amp; wholesale gold ornaments — diamonds, polki, kundan and gemstone jewellery. <br className="hidden sm:block" />
            Crafted for every occasion, priced for every trade.
          </p>
        </motion.div>
      </div>

      {/* Bottom Arch - for flow */}
      <div className="absolute bottom-0 left-0 w-full opacity-50 pointer-events-none">
         <svg viewBox="0 0 1440 40" className="w-full h-auto" preserveAspectRatio="none">
           <path fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4,4" d="M0,20 C300,20 440,0 720,0 C1000,0 1140,20 1440,20" />
         </svg>
      </div>
    </section>
  );
};

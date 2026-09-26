'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { LogoSVG } from '@/components/atoms/LogoSVG';

export const StorySection = () => {
  return (
    <section className="bg-[#FFFDD0] py-16 sm:py-24 relative text-center">
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
            <div className="w-16 h-[1px] bg-gold-dark/40" />
            <div className="w-8 h-8 text-gold-dark">
              <LogoSVG size="sm" />
            </div>
            <div className="w-16 h-[1px] bg-gold-dark/40" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-[#3E2723] font-cinzel mb-8">
            Every <span className="font-script text-[#D4AF37] text-6xl sm:text-7xl md:text-8xl mx-2">Jewel</span> Tells a Story
          </h2>

          {/* Text */}
          <p className="text-[#3E2723]/80 font-montserrat font-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Step into a world of gold, diamonds, polki and gemstones. <br className="hidden sm:block" />
            Crafted for every occasion, crafted with endless love.
          </p>
        </motion.div>
      </div>

      {/* Top and Bottom Arches - for flow */}
      <div className="absolute top-0 left-0 w-full rotate-180 opacity-50 pointer-events-none">
         <svg viewBox="0 0 1440 40" className="w-full h-auto" preserveAspectRatio="none">
           <path fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4,4" d="M0,20 C300,20 440,0 720,0 C1000,0 1140,20 1440,20" />
         </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-full opacity-50 pointer-events-none">
         <svg viewBox="0 0 1440 40" className="w-full h-auto" preserveAspectRatio="none">
           <path fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4,4" d="M0,20 C300,20 440,0 720,0 C1000,0 1140,20 1440,20" />
         </svg>
      </div>
    </section>
  );
};

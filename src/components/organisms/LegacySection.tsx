"use client";

import { motion } from "framer-motion";
import {
  fadeUpVariant,
  staggerContainerSlow,
  dividerReveal,
  statReveal,
  viewport,
} from "@/lib/motion";

export const LegacySection = () => {
  return (
    <section className="py-20 sm:py-24 md:py-32 relative overflow-hidden bg-gradient-to-br from-cream via-white to-neutral-light">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/marble.png')] opacity-[0.12] mix-blend-multiply" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl shadow-gold/5 border border-gold/10 text-center"
        >
          <motion.h2
            variants={fadeUpVariant}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel text-brown mb-3 sm:mb-4"
          >
            A Legacy of Purity
          </motion.h2>

          <motion.div
            variants={dividerReveal}
            className="h-px w-14 sm:w-16 bg-gold mx-auto mb-6 sm:mb-8 origin-center"
          />

          <motion.p
            variants={fadeUpVariant}
            className="text-gray-600 text-sm md:text-base leading-relaxed mb-10 sm:mb-12 md:mb-14 font-light max-w-2xl mx-auto"
          >
            For generations, Rajeshwari Jewellers has been the silent backbone of prestigious retail showrooms across the nation. We source the finest materials and employ master artisans to create wholesale collections that transcend mere ornamentation. Partner with us for a legacy defined by trust, transparency, and uncompromising quality.
          </motion.p>

          <motion.div
            variants={staggerContainerSlow}
            className="grid grid-cols-2 gap-4 sm:gap-8 divide-x divide-gold/20"
          >
            <motion.div variants={statReveal}>
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel text-gold mb-1 sm:mb-2">
                50<span className="text-xl sm:text-2xl md:text-4xl">+</span>
              </div>
              <div className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.15em] sm:tracking-[0.2em] font-semibold text-brown uppercase">
                Years Expertise
              </div>
            </motion.div>

            <motion.div variants={statReveal}>
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cinzel text-gold mb-1 sm:mb-2">
                200<span className="text-xl sm:text-2xl md:text-4xl">+</span>
              </div>
              <div className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.15em] sm:tracking-[0.2em] font-semibold text-brown uppercase">
                Unique Designs
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

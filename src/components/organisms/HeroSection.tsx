"use client";

import { motion } from "framer-motion";
import {
  heroContainer,
  heroVideoReveal,
  heroCta,
  luxuryEasing,
  duration,
} from "@/lib/motion";
import Link from "next/link";


export const HeroSection = () => {

  return (
    <section className="relative w-full h-screen min-h-[560px] max-h-[1000px] flex flex-col items-center justify-center overflow-hidden">
      {/* Cinematic Video Background */}
      <motion.div
        variants={heroVideoReveal}
        initial="hidden"
        animate="show"
        className="absolute inset-0 w-full h-full"
      >
        <video

          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero_jewelry.mp4" type="video/mp4" />
        </video>
        {/* Luxury gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 w-full h-full flex items-center px-5 sm:px-8 md:px-14 lg:px-20 xl:px-28">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start text-left max-w-[90%] sm:max-w-[70%] md:max-w-[55%] lg:max-w-[50%]"
        >
          {/* Eyebrow */}


          {/* Main Headline */}
          <motion.h1
            variants={heroCta}
            className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold leading-[1.12] mb-3 sm:mb-5 md:mb-6 tracking-wide"
          >
            Timeless Gold.
            <br />
            <span className="text-gold">Crafted for Generations.</span>
          </motion.h1>



          {/* CTA Buttons */}
          <motion.div
            variants={heroCta}
            className="flex flex-row gap-3 sm:gap-4 items-start"
          >
            <Link
              href="/collections"
              className="bg-gold text-brown font-bold tracking-[0.18em] sm:tracking-[0.2em] text-[10px] sm:text-xs py-4 px-8 sm:px-12 uppercase flex items-center justify-center border border-gold/50 hover:bg-gold-light transition-all duration-500 min-h-[50px]"
              style={{ boxShadow: "0 0 30px -8px rgba(212,175,55,0.35)" }}
            >
              Explore Collection
            </Link>
            <Link
              href="/catalog"
              className="border border-white/30 text-white/80 font-semibold tracking-[0.18em] sm:tracking-[0.2em] text-[10px] sm:text-xs py-4 px-8 sm:px-12 uppercase flex items-center justify-center hover:border-gold/60 hover:text-gold transition-all duration-500 backdrop-blur-sm min-h-[50px]"
            >
              View Catalog
            </Link>
          </motion.div>
        </motion.div>
      </div>


    </section>
  );
};

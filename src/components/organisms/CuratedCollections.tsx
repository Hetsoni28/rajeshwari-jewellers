"use client";

import { motion } from "framer-motion";
import {
  fadeUpVariant,
  staggerContainerSlow,
  dividerReveal,
  viewport,
  luxuryEasing,
  duration,
} from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    id: 1,
    title: "Antique Collection",
    subtitle: "View Masterpieces",
    image: "/images/bridal_collection.png",
    className: "col-span-1 md:col-span-2 md:row-span-2 h-[260px] sm:h-[320px] md:h-[600px]",
  },
  {
    id: 2,
    title: "Women's Core",
    subtitle: "Elegant Daily Wear",
    image: "/images/womens_core.png",
    className: "h-[200px] sm:h-[240px] md:h-[288px]",
  },
  {
    id: 3,
    title: "Men's Signature",
    subtitle: "Bold & Classic",
    image: "/images/mens_signature.png",
    className: "h-[200px] sm:h-[240px] md:h-[288px]",
  },
];

export const CuratedCollections = () => {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        {/* Section header */}
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >

          <motion.h2
            variants={fadeUpVariant}
            className="text-3xl sm:text-4xl md:text-5xl font-cinzel text-brown mb-3 sm:mb-4"
          >
            Curated Collections
          </motion.h2>
          <motion.div
            variants={dividerReveal}
            className="h-px w-14 sm:w-16 bg-gold mx-auto mb-4 sm:mb-5 origin-center"
          />
          <motion.p
            variants={fadeUpVariant}
            className="text-gray-500 text-xs sm:text-sm tracking-widest uppercase font-light max-w-xs sm:max-w-md mx-auto"
          >
            Exclusive fine designs crafted for the modern retail landscape.
          </motion.p>
        </motion.div>

        {/* Grid — single col mobile, 3-col md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 auto-rows-min">
          {collections.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: duration.slow, ease: luxuryEasing, delay: index * 0.12 }}
              whileHover={{ y: -3, transition: { duration: duration.fast, ease: luxuryEasing } }}
              className={`relative overflow-hidden group cursor-pointer ${item.className}`}
              style={{ willChange: "transform" }}
            >
              <Link href="/collections" className="absolute inset-0 z-30" aria-label={`View ${item.title}`} />
              <div className="absolute inset-0 bg-black/15 group-hover:bg-black/35 transition-colors duration-700 z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10" />

              <Image
                src={item.image}
                alt={item.title}
                fill
                quality={90}
                unoptimized={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              />

              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 p-5 sm:p-6 md:p-7 lg:p-8 z-20">
                <h3 className="text-lg sm:text-xl md:text-2xl font-cinzel text-white mb-1 sm:mb-2 tracking-wide">
                  {item.title}
                </h3>
                <div className="w-0 h-px bg-gold group-hover:w-8 sm:group-hover:w-10 transition-all duration-500 ease-out mb-2 sm:mb-3" />
                <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-75">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold/90">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

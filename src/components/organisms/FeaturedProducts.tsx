"use client";

import { motion } from "framer-motion";
import {
  fadeUpVariant,
  staggerContainerSlow,
  staggerContainer,
  dividerReveal,
  viewport,
  luxuryEasing,
  duration,
} from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Premium Gold Chains",
    desc: "22K | Assorted Weights",
    image: "/images/premium_chains.png",
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "Heritage Necklaces",
    desc: "Classic & Antique",
    image: "/images/heritage_necklaces.png"
  },
  {
    id: 3,
    name: "Artisan Rings",
    desc: "Engagement & Daily",
    image: "/images/artisan_rings.png"
  },
  {
    id: 4,
    name: "Statement Bangles",
    desc: "Classic & Contemporary",
    image: "/images/statement_bangles.png"
  }
];

export const FeaturedProducts = () => {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-neutral-light">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          variants={staggerContainerSlow}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-14 md:mb-16 border-b border-gray-200 pb-6 sm:pb-8 gap-4 sm:gap-0"
        >
          <div>

            <motion.h2
              variants={fadeUpVariant}
              className="text-2xl sm:text-3xl md:text-4xl font-cinzel text-brown mb-2"
            >
              Featured Products
            </motion.h2>
            <motion.div
              variants={dividerReveal}
              className="h-px w-14 sm:w-16 bg-gold origin-left mt-2 sm:mt-3"
            />
            <motion.p
              variants={fadeUpVariant}
              className="text-gray-500 text-xs sm:text-sm tracking-widest font-light mt-2 sm:mt-3"
            >
              Curated inventory for our esteemed retail partners
            </motion.p>
          </div>
          <motion.a
            variants={fadeUpVariant}
            href="/catalog"
            className="flex items-center text-gold text-xs font-bold tracking-[0.2em] uppercase hover:text-brown transition-colors duration-300 group shrink-0"
          >
            Full Catalog <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
          </motion.a>
        </motion.div>

        {/* Product Grid — 2 cols mobile, 4 cols desktop */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeUpVariant}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.1)" }}
              transition={{ duration: duration.fast, ease: luxuryEasing }}
              className="group cursor-pointer bg-white relative"
              style={{ willChange: "transform" }}
            >
              <Link href="/catalog" className="absolute inset-0 z-30" aria-label={`View ${product.name}`} />
              <div className="relative aspect-square overflow-hidden bg-gray-50 p-3 sm:p-4 md:p-6 flex items-center justify-center">
                {product.badge && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-white/90 px-2 sm:px-3 py-0.5 sm:py-1 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-brown border border-gold/30">
                    {product.badge}
                  </div>
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  quality={100}
                  unoptimized={true}
                  className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.06] drop-shadow-xl mix-blend-multiply"
                />
              </div>
              <div className="p-3 sm:p-4 md:p-5 text-center">
                <h3 className="font-cinzel text-sm sm:text-base text-brown mb-1 group-hover:text-gold transition-colors duration-300 leading-tight">
                  {product.name}
                </h3>
                <p className="text-[9px] sm:text-[10px] tracking-widest text-gray-400 uppercase font-light">
                  {product.desc}
                </p>
                <div className="w-0 h-px bg-gold mx-auto group-hover:w-8 transition-all duration-500 ease-out mt-2 sm:mt-3" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

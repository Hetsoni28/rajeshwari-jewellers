"use client";

import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeUpVariant,
  staggerContainerSlow,
  subtleScaleVariant,
  dividerReveal,
  viewport,
  luxuryEasing,
  duration,
} from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/data/products";
import { Badge } from "@/components/atoms/Badge";
import { Breadcrumbs } from "@/components/molecules/Breadcrumbs";

export const ProductDetailsClient = ({ product }: { product: Product }) => {
  const router = useRouter();
  const [activeMedia, setActiveMedia] = useState<'image' | 'video'>('image');
  const { addToWishlist, isInWishlist } = useWishlist();
  const isSaved = isInWishlist(product.slug);

  const handleSave = () => {
    addToWishlist({
      id: product.slug,
      title: product.name,
      image: product.image || "/images/placeholder.jpg",
      tag: "22K\nGOLD",
    });
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />

      {/* Top Bar with Back Button & Breadcrumbs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.base, ease: luxuryEasing, delay: 0.3 }}
        className="pt-28 sm:pt-32 md:pt-40 px-4 sm:px-6 md:px-12 container mx-auto relative z-10 mb-6 sm:mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-gold-dark transition-colors duration-300 w-fit group"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase">Back to Catalog</span>
        </button>

        <div className="hidden sm:block">
        <Breadcrumbs
          paths={[
            { label: "Catalog", href: "/catalog" },
            { label: product.category, href: "/catalog" },
            { label: product.name },
          ]}
        />
        </div>
      </motion.div>

      {/* Main Product Area */}
      <div className="px-4 sm:px-6 md:px-12 container mx-auto relative z-10 mb-16 sm:mb-20 md:mb-28">
        <motion.div
          className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16"
          variants={staggerContainerSlow}
          initial="hidden"
          animate="show"
        >
          {/* Left Column — Images */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col gap-3 sm:gap-4"
            variants={subtleScaleVariant}
          >
            {/* Main image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMedia}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: duration.base, ease: luxuryEasing }}
                className="relative w-full aspect-square sm:aspect-[4/3] bg-gray-100 overflow-hidden shadow-sm"
              >
                {activeMedia === 'image' ? (
                  <Image
                    src={product.image || "/images/placeholder.jpg"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={true}
                    alt={product.name}
                    className="object-cover hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400 font-cinzel text-lg sm:text-xl">Video Preview</span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Thumbnails */}
            <div className="flex gap-2 sm:gap-3 mt-0.5 sm:mt-1">
              <button
                onClick={() => setActiveMedia('image')}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 border-2 transition-all duration-300 min-w-[56px] ${
                  activeMedia === 'image' ? 'border-gold-dark shadow-sm' : 'border-transparent opacity-60 hover:opacity-90'
                }`}
              >
                <Image
                  src={product.image || "/images/placeholder.jpg"}
                  fill
                  sizes="80px"
                  alt="Thumbnail"
                  className="object-cover"
                />
              </button>
              <button
                onClick={() => setActiveMedia('video')}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 border-2 flex flex-col items-center justify-center bg-gray-100 transition-all duration-300 min-w-[56px] min-h-[56px] ${
                  activeMedia === 'video' ? 'border-gold-dark' : 'border-transparent opacity-60 hover:opacity-90'
                }`}
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/80 flex items-center justify-center mb-0.5 sm:mb-1 shadow-sm">
                  <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-gold-dark border-b-[5px] border-b-transparent ml-0.5" />
                </div>
                <span className="text-[7px] sm:text-[8px] font-bold tracking-wider text-gray-500 uppercase">Video</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column — Product Info */}
          <motion.div
            className="w-full lg:w-1/2 flex flex-col pt-0 sm:pt-2 md:pt-4"
            variants={staggerContainerSlow}
          >
            <motion.p variants={fadeUpVariant} className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-3 sm:mb-4">
              {product.subcategory}
            </motion.p>

            <motion.h1 variants={fadeUpVariant} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel text-[#1A1A1A] font-bold mb-4 sm:mb-5 leading-tight">
              {product.name}
            </motion.h1>

            <motion.div variants={dividerReveal} className="h-px w-14 sm:w-16 bg-gold mb-6 sm:mb-8 origin-left" />

            <motion.div variants={fadeUpVariant} className="flex flex-col gap-5 sm:gap-6 mb-8 sm:mb-10 md:mb-12 flex-grow">
              {product.description && (
                <p className="text-gray-600 leading-relaxed text-sm font-light">
                  {product.description}
                </p>
              )}

              <div className="flex flex-col gap-1 border-l-2 border-gold-dark/30 pl-3 sm:pl-4 py-1">
                <span className="text-[9px] font-bold tracking-[0.15em] text-gray-400 uppercase">Gross Weight (Approx)</span>
                <span className="text-base sm:text-lg font-cinzel text-[#1A1A1A]">
                  {product.approxWeight ? `${Number(product.approxWeight).toFixed(3)} Grams` : 'N/A'}
                </span>
              </div>

              <div className="flex flex-col gap-1 border-l-2 border-gold-dark/30 pl-3 sm:pl-4 py-1">
                <span className="text-[9px] font-bold tracking-[0.15em] text-gray-400 uppercase">Purity</span>
                <span className="text-base sm:text-lg font-cinzel text-[#1A1A1A]">22K</span>
              </div>
            </motion.div>

            {/* Action Buttons — stacked on mobile, side-by-side on sm+ */}
            <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto">
              <motion.button
                onClick={handleSave}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: duration.fast, ease: luxuryEasing }}
                className={`flex-1 py-4 border px-4 sm:px-6 text-[10px] sm:text-[11px] font-bold tracking-[0.18em] sm:tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 min-h-[52px] ${
                  isSaved
                    ? "bg-gold-dark text-white border-gold-dark shadow-md"
                    : "bg-white text-[#1A1A1A] border-gray-300 hover:border-gold-dark hover:text-gold-dark"
                }`}
              >
                {isSaved ? "Saved to Wishlist" : "Save to Wishlist"}
                <svg className={`w-4 h-4 ${isSaved ? "fill-white" : "fill-transparent stroke-current"}`} viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </motion.button>

              <motion.div
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: duration.fast, ease: luxuryEasing }}
                className="flex-1"
              >
                <Link
                  href="/contact"
                  className="w-full py-4 bg-[#1A1A1A] text-white border border-[#1A1A1A] text-[10px] sm:text-[11px] font-bold tracking-[0.18em] sm:tracking-[0.2em] uppercase hover:bg-gold-dark hover:border-gold-dark transition-all duration-300 flex items-center justify-center shadow-lg min-h-[52px]"
                >
                  Inquire Now
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
};

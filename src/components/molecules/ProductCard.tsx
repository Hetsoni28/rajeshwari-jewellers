"use client";

import { motion } from "framer-motion";
import {
  cardReveal,
  viewport,
  luxuryEasing,
  duration,
} from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { Badge } from "@/components/atoms/Badge";
import { urlForImage } from "@/sanity/image";

export const ProductCard = ({ product }: { product: Product }) => {
  // Build the optimised Sanity CDN URL (600×600, fit=max, WebP, q80)
  // Falls back to the raw URL if imageRef isn't available
  const imageUrl = product.imageRef
    ? urlForImage(product.imageRef, 600, 600)?.url() ?? product.image ?? "/images/placeholder.jpg"
    : product.image ?? "/images/placeholder.jpg";

  return (
    <motion.div
      variants={cardReveal}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      whileHover={{ y: -4, boxShadow: "0 14px 36px rgba(0,0,0,0.11), 0 4px 10px rgba(212,175,55,0.07)" }}
      transition={{ duration: duration.fast, ease: luxuryEasing }}
      className="bg-white flex flex-col group cursor-pointer h-full"
      style={{ willChange: "transform" }}
    >
      <Link href={`/catalog/${product.slug}`} className="p-2.5 sm:p-3 md:p-4 flex flex-col flex-grow">

        {/* Image Container */}
        <div className="relative h-[180px] xs:h-[200px] sm:h-[260px] md:h-[300px] lg:h-[340px] w-full mb-3 sm:mb-4 md:mb-5 overflow-hidden bg-[#F8F5F0] flex-shrink-0 flex items-center justify-center">

          {product.badge && (
            <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 text-[8px] sm:text-[10px] px-2 py-0.5 sm:px-3 sm:py-1">
              {product.badge}
            </Badge>
          )}

          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            // object-contain → NEVER crops, full jewelry always visible
            className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            // Blur placeholder from Sanity LQIP or a subtle warm tone
            placeholder={product.lqip ? "blur" : "empty"}
            blurDataURL={product.lqip ?? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="}
            // Never upscale beyond natural size
            quality={90}
          />

          {/* Soft overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.04] transition-colors duration-500 z-10 pointer-events-none" />

          {/* View Details label — shown on hover */}
          <div className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 z-20 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
            <span className="bg-gold text-brown px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase shadow-[0_4px_14px_rgba(212,175,55,0.4)] whitespace-nowrap">
              View Details
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="flex-grow flex flex-col">
          <div className="flex justify-between items-center mb-1 sm:mb-2">
            <p className="text-[8px] sm:text-[9px] font-bold tracking-[0.15em] sm:tracking-[0.2em] text-gray-400 uppercase truncate mr-2">
              {product.subcategory}
            </p>
            {product.approxWeight && (
              <p className="text-[9px] sm:text-[10px] font-semibold text-gold-dark tracking-wide shrink-0">
                {Number(product.approxWeight).toFixed(3)}g
              </p>
            )}
          </div>
          <h3 className="font-cinzel text-sm sm:text-base md:text-[17px] text-[#1A1A1A] font-semibold mb-1 sm:mb-2 group-hover:text-gold-dark transition-colors duration-300 line-clamp-1">
            {product.name}
          </h3>
          {/* Animated gold accent */}
          <div className="w-0 h-px bg-gold group-hover:w-8 sm:group-hover:w-10 transition-all duration-500 ease-out mb-1 sm:mb-2" />
          {product.description && (
            <p className="hidden sm:block text-xs text-gray-500 font-light line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

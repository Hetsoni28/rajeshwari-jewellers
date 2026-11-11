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
import { Heart } from "lucide-react";
import { Product } from "@/data/products";
import { Badge } from "@/components/atoms/Badge";
import { urlForImage } from "@/sanity/image";
import { useWishlist } from "@/context/WishlistContext";
import { productAlt } from "@/lib/seo";

const PLACEHOLDER = "/images/placeholder.svg";

export const ProductCard = ({ product, priority = false }: { product: Product; priority?: boolean }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist, isHydrated } = useWishlist();
  const saved = isHydrated && isInWishlist(product.slug);

  // Sanity's CDN already resizes and serves WebP/AVIF (auto=format), so use that URL directly
  // instead of passing it through Next's image optimiser a second time.
  const sanityUrl = product.imageRef ? urlForImage(product.imageRef, 800, 800)?.url() : undefined;
  const imageUrl = sanityUrl ?? product.image ?? PLACEHOLDER;
  const isRemote = imageUrl.startsWith("http");

  const toggleWishlist = () => {
    if (saved) {
      removeFromWishlist(product.slug);
    } else {
      addToWishlist({ id: product.slug, title: product.name, image: product.image || PLACEHOLDER, tag: "22K\nGOLD" });
    }
  };

  return (
    <motion.article
      variants={cardReveal}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      whileHover={{ y: -4 }}
      transition={{ duration: duration.fast, ease: luxuryEasing }}
      className="relative bg-white flex flex-col group h-full border border-[#EFE9DF] transition-[border-color,box-shadow] duration-500 hover:border-gold/40 hover:shadow-[0_18px_40px_-20px_rgba(62,39,35,0.35)]"
    >
      <Link href={`/catalog/${product.slug}`} className="p-2.5 sm:p-3 md:p-4 flex flex-col flex-grow">

        {/* Image */}
        <div className="relative aspect-square w-full mb-3 sm:mb-4 md:mb-5 overflow-hidden bg-[#F8F5F0] flex-shrink-0">
          {product.badge && (
            <Badge className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 text-[8px] sm:text-[10px] px-2 py-0.5 sm:px-3 sm:py-1">
              {product.badge}
            </Badge>
          )}

          <Image
            src={imageUrl}
            alt={productAlt(product)}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={priority}
            unoptimized={isRemote}
            // object-contain → never crops; the whole piece is always visible
            className="object-contain p-3 sm:p-5 transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            placeholder={product.lqip ? "blur" : "empty"}
            blurDataURL={product.lqip}
          />

          {/* View details — desktop hover */}
          <div className="hidden sm:flex absolute inset-x-0 bottom-0 z-20 justify-center pb-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
            <span className="bg-gold text-brown px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase shadow-[0_4px_14px_rgba(212,175,55,0.4)] whitespace-nowrap">
              View Details
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="flex-grow flex flex-col">
          <p className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase truncate mb-1.5 sm:mb-2">
            {product.subcategory}
            <span className="mx-1.5 text-gold/70" aria-hidden="true">·</span>
            {product.category}
          </p>
          <h3 className="font-cinzel text-sm sm:text-base md:text-[17px] text-[#1A1A1A] font-semibold leading-snug group-hover:text-gold-dark transition-colors duration-300 line-clamp-1">
            {product.name}
          </h3>
          {/* Animated gold accent */}
          <div className="w-6 h-px bg-gold/50 group-hover:w-10 group-hover:bg-gold transition-all duration-500 ease-out my-2 sm:my-2.5" />
          {product.description && (
            <p className="hidden sm:block text-xs text-gray-500 font-light line-clamp-2 leading-relaxed mb-3">
              {product.description}
            </p>
          )}
          <div className="mt-auto flex items-baseline justify-between gap-2 pt-2 border-t border-[#F1ECE3]">
            <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase">Approx. Wt.</span>
            <span className="font-cinzel text-xs sm:text-sm text-gold-dark tabular-nums">
              {product.approxWeight ? `${Number(product.approxWeight).toFixed(3)} g` : "On request"}
            </span>
          </div>
        </div>
      </Link>

      {/* Wishlist — sits outside the link so it isn't a button nested in an anchor */}
      <button
        type="button"
        onClick={toggleWishlist}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        className={`absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-30 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-[2px] transition-colors duration-300 ${
          saved ? "text-[#B38728]" : "text-gray-400 hover:text-[#B38728]"
        }`}
      >
        <Heart size={16} strokeWidth={1.6} className={saved ? "fill-current" : ""} />
      </button>
    </motion.article>
  );
};

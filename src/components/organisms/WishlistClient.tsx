"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShieldCheck, Shield, Share2, Check } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { WishlistCard } from "@/components/molecules/WishlistCard";
import { Heading } from "@/components/atoms/Heading";

export const WishlistClient = () => {
  const { items, removeFromWishlist, isHydrated } = useWishlist();
  const [shareText, setShareText] = useState("Share List");

  const handleShare = async () => {
    if (items.length === 0) return;

    // Build the message text with the current list of items
    const message = `Here is my curated wishlist from Rajeshwari Jewellers:\n\n${items.map(i => `• ${i.title} (${i.id})`).join('\n')}\n\nPlease let me know the current wholesale rates and availability for these items.`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Rajeshwari Jewellers Wishlist',
          text: message,
        });
      } else {
        await navigator.clipboard.writeText(message);
        setShareText("Copied!");
        setTimeout(() => setShareText("Share List"), 3000);
      }
    } catch (e) {
      console.log("Share failed or was cancelled", e);
    }
  };

  if (!isHydrated) return null;

  return (
    <>
      {/* Header */}
      <div className="pt-28 sm:pt-32 md:pt-40 pb-8 sm:pb-12 px-4 sm:px-6 md:px-12 container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-0 border-b border-gray-200 pb-8 sm:pb-12">
          {/* Left Side: Title & Description */}
          <div className="max-w-2xl text-left">
            <Heading level={1} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide mb-3 sm:mb-5">
              Luxury Wishlist
            </Heading>
            <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed">
              A private collection of your most admired pieces. Review your selections or inquire for availability and current market rates.
            </p>
          </div>

          {/* Right Side: Stats & Actions */}
          <div className="flex items-center gap-6 sm:gap-10 self-start lg:self-auto">
            <div className="text-center flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-bold text-[#B38728] leading-none mb-1">{items.length}</span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#B38728]">Items Saved</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 sm:gap-3 border border-gray-300 px-5 sm:px-6 py-2.5 sm:py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase text-gray-600 hover:border-[#B38728] hover:text-[#B38728] transition-colors min-h-[44px]"
            >
              {shareText === "Copied!" ? <Check size={16} /> : <Share2 size={16} />}
              {shareText}
            </button>
          </div>
        </div>
      </div>

      {/* Grid or Empty State */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 pb-16 sm:pb-20 md:pb-24">
        {items.length === 0 ? (
          <div className="bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-12 sm:p-20 md:p-32 text-center my-4 sm:my-8 max-w-5xl mx-auto">
            <Heading level={2} className="text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-3 sm:mb-5 font-normal tracking-wide">
              Your wishlist is empty
            </Heading>
            <p className="text-gray-500 font-light mb-8 sm:mb-12 text-sm sm:text-base">
              Discover our collections to add your favorite pieces here.
            </p>
            <Link
              href="/catalog"
              className="inline-flex bg-[#B38728] text-white px-8 sm:px-10 py-3.5 sm:py-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#8A671D] transition-colors shadow-md min-h-[48px] items-center justify-center w-fit mx-auto"
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 lg:gap-8 pt-4">
            {items.map((item, index) => (
              <WishlistCard key={item.id} item={item} onRemove={removeFromWishlist} priority={index < 4} />
            ))}
          </div>
        )}
      </div>

      {/* Policy Section */}
      <div className="bg-[#FAFAFA] border-t border-gray-100 py-16 sm:py-20 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 text-center max-w-3xl">
          <Heading level={2} className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Wholesale Ordering Policy</Heading>
          <p className="text-gray-500 text-sm font-light leading-relaxed mb-10 sm:mb-12">
            All items in your wishlist are subject to wholesale availability. Rajeshwari Jewellers exclusively partners with registered retail businesses. Prices shown in quotes are bulk rates based on current gold market values and minimum order quantities.
          </p>
          <div className="flex justify-center gap-8 sm:gap-12 md:gap-24 flex-wrap">
            {[
              { icon: ShieldCheck, label: "Certified Purity" },
              { icon: Shield, label: "Insured Transit" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 sm:gap-3">
                <Icon className="text-gold" size={22} />
                <span className="text-[9px] font-bold tracking-widest text-gold-dark uppercase">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

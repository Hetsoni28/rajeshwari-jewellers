"use client";

import Link from "next/link";
import { CollectionBanner } from "@/components/molecules/CollectionBanner";
import { CollectionSideItem } from "@/components/molecules/CollectionSideItem";
import { Heading } from "@/components/atoms/Heading";

const collections = [
  {
    key: "female",
    label: "Heritage & Grace",
    title: "Female Collection",
    href: "/catalog?category=female",
    banner: { src: "/images/bridal_necklace_sets.png", title: "Antique Necklace Sets", desc: "Intricate designs for the perfect moment." },
    sides: [
      { src: "/images/mangalsutra.png", title: "Mangalsutra", variant: "light" as const },
      { src: "/images/bangles_kadas.png", title: "Bangles & Kadas", variant: "dark" as const },
    ],
  },
  {
    key: "antique",
    label: "Timeless Classics",
    title: "Antique Collection",
    href: "/catalog?category=antique",
    banner: { src: "/images/antique_main_necklace.png", title: "Antique Temple Necklaces", desc: "Heritage pieces crafted with divine precision." },
    sides: [
      { src: "/images/antique_side_earrings.png", title: "Antique Jhumkas", variant: "light" as const },
      { src: "/images/antique_side_kamarbandh.png", title: "Antique Kamarbandh", variant: "dark" as const },
    ],
  },
  {
    key: "male",
    label: "Power & Prestige",
    title: "Male Collection",
    href: "/catalog?category=male",
    banner: { src: "/images/male_main_chain.png", title: "Heavy Gold Chains", desc: "Bold statements of masculinity and strength." },
    sides: [
      { src: "/images/male_side_ring.png", title: "Signet Rings", variant: "light" as const },
      { src: "/images/male_side_bracelet.png", title: "Gold Kadas", variant: "dark" as const },
    ],
  },
  {
    key: "kids",
    label: "Joy & Innocence",
    title: "Kids Collection",
    href: "/catalog?category=kids",
    banner: { src: "/images/kids_main_pendant.png", title: "Chain & Pendants", desc: "Delicate pieces designed for the little ones." },
    sides: [
      { src: "/images/kids_side_bangles.png", title: "Tiny Bangles", variant: "light" as const },
      { src: "/images/kids_side_nazariya.png", title: "Gold Nazariyas", variant: "dark" as const },
    ],
  },
];

export const CollectionsClient = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

      <div className="pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-12 container mx-auto relative z-10">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 md:mb-20">
          <Heading level={1} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 sm:mb-8 font-bold tracking-wide">
            Our Collections
          </Heading>
        </div>

        {/* Collection Sections */}
        {collections.map((col, i) => (
          <div key={col.key} className={i < collections.length - 1 ? "mb-16 sm:mb-20 md:mb-24" : "mb-16 sm:mb-20 md:mb-24"}>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-gray-200 pb-3 sm:pb-4 mb-6 sm:mb-8 gap-2 sm:gap-4">
              <Heading level={2} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">{col.title}</Heading>
              <Link
                href="/catalog"
                className="text-gold-dark text-xs font-bold tracking-[0.1em] uppercase hover:text-brown transition-colors whitespace-nowrap min-h-[44px] flex items-center"
              >
                View All &rarr;
              </Link>
            </div>

            {/* Grid: stacked on mobile, 3-col on lg+ */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {/* Main banner */}
              <CollectionBanner
                href="/catalog"
                imageSrc={col.banner.src}
                title={col.banner.title}
                description={col.banner.desc}
                className="lg:col-span-2 h-[280px] sm:h-[380px] md:h-[480px] lg:h-auto"
              />

              {/* Side items — stacked horizontally on mobile, vertically on lg+ */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 lg:h-[500px] xl:h-[600px]">
                {col.sides.map((side) => (
                  <CollectionSideItem
                    key={side.title}
                    href="/catalog"
                    imageSrc={side.src}
                    title={side.title}
                    bgVariant={side.variant}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

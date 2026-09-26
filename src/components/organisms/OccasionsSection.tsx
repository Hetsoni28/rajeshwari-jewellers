'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const occasions = [
  { id: 'lightweight', title: 'Lightweight Ornaments', image: '/images/catalog_ring.png' },
  { id: 'bridal', title: 'Heavy Bridal Sets', image: '/images/catalog_earrings.png' },
  { id: 'festive', title: 'Festive Wear', image: '/images/antique_side_earrings.png' },
  { id: 'daily', title: 'Daily Wear', image: '/images/bridal_necklace_sets.png' },
  { id: 'antique', title: 'Antique & Polki', image: '/images/antique_main_necklace.png' }
];

export const OccasionsSection = () => {
  const [hovered, setHovered] = React.useState<string | null>(null);

  return (
    <section className="bg-[#FFFDD0] py-24 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left Side - Occasion Cards */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#3E2723] text-4xl sm:text-5xl font-cinzel mb-12"
            >
              High-margin collections for every market demand
            </motion.h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Complex Grid Layout matching screenshot */}
              <div className="col-span-1 flex flex-col gap-4">
                <OccasionCard 
                  data={occasions[0]} 
                  isHovered={hovered === occasions[0].id} 
                  onHover={() => setHovered(occasions[0].id)} 
                  onLeave={() => setHovered(null)} 
                  height="h-32" 
                />
                <OccasionCard 
                  data={occasions[2]} 
                  isHovered={hovered === occasions[2].id} 
                  onHover={() => setHovered(occasions[2].id)} 
                  onLeave={() => setHovered(null)} 
                  height="h-56" 
                />
              </div>
              
              <div className="col-span-1 flex flex-col gap-4">
                <OccasionCard 
                  data={occasions[1]} 
                  isHovered={hovered === occasions[1].id} 
                  onHover={() => setHovered(occasions[1].id)} 
                  onLeave={() => setHovered(null)} 
                  height="h-48" 
                />
                <OccasionCard 
                  data={occasions[4]} 
                  isHovered={hovered === occasions[4].id} 
                  onHover={() => setHovered(occasions[4].id)} 
                  onLeave={() => setHovered(null)} 
                  height="h-40" 
                />
              </div>
            </div>
          </div>

          {/* Right Side - Image with Golden Circles */}
          <div className="w-full lg:w-1/2 relative min-h-[500px]">
             {/* Golden Geometric Circles */}
             <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-40">
                <svg viewBox="0 0 400 400" className="absolute right-0 top-1/4 w-[150%] h-[150%] -translate-y-1/4 translate-x-1/4">
                  <circle cx="200" cy="200" r="150" fill="none" stroke="#D4AF37" strokeWidth="1" />
                  <circle cx="200" cy="200" r="250" fill="none" stroke="#D4AF37" strokeWidth="1" />
                  <circle cx="100" cy="200" r="300" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
                </svg>
             </div>
             
             <Image
                src="/images/bridal_collection.png"
                alt="Bridal Occasions"
                fill
                className="object-contain object-right-bottom z-10 drop-shadow-2xl"
             />
          </div>

        </div>
      </div>
    </section>
  );
};

// Sub-component for the hover-reveal cards
const OccasionCard = ({ data, isHovered, onHover, onLeave, height }: any) => {
  return (
    <Link href={`/catalog?occasion=${encodeURIComponent(data.title)}`}>
    <div 
      className={`relative w-full ${height} border border-[#E57A44]/60 bg-[#FFFDD0] cursor-pointer overflow-hidden transition-all duration-300 group`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <AnimatePresence>
        {isHovered ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20"
          >
            <Image src={data.image} alt={data.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute top-4 left-4 text-white font-montserrat font-medium text-lg">
              {data.title}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white flex items-center justify-center text-white">
              <ArrowRight className="w-5 h-5" />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex p-4"
          >
            <span className="text-[#3E2723] font-medium font-montserrat z-10 relative">
              {data.title}
            </span>
            {/* Floral SVG graphic on the right edge */}
            <svg className="absolute right-0 bottom-0 w-24 h-24 text-[#E57A44]/60" viewBox="0 0 100 100" fill="none" stroke="currentColor">
               <path d="M100 50 C80 50, 60 70, 60 100" strokeWidth="1" />
               <path d="M100 30 C70 30, 40 60, 40 100" strokeWidth="1" />
               <path d="M100 70 C80 70, 70 80, 70 100" strokeWidth="1" />
               <circle cx="80" cy="40" r="3" fill="currentColor" />
               <circle cx="60" cy="70" r="3" fill="currentColor" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </Link>
  );
};

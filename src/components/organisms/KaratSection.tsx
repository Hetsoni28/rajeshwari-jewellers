'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const grids = [
  { id: '18kt', title: '18KT', desc: 'Made for milestones', img: '/images/catalog_earrings.png' },
  { id: '22kt', title: '22KT', desc: 'Rooted in Tradition', img: '/images/catalog_necklace.png' },
  { id: '24kt', title: '24KT', desc: 'Timeless love. Forever yours.', img: '/images/bangles_kadas.png' },
];

export const KaratSection = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Grid (3 Items) */}
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 sm:gap-6">
            {grids.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative group overflow-hidden bg-gray-100 ${index === 2 ? 'col-span-2 aspect-[2/1] sm:aspect-[2.5/1]' : 'aspect-square'}`}
              >
                <Image src={item.img} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-1">{item.title}</h3>
                    <p className="text-white/90 text-xs sm:text-sm font-light max-w-[120px] sm:max-w-[200px] leading-tight">
                      {item.desc}
                    </p>
                  </div>
                  <Link href={`/catalog?purity=${item.title}`}>
                    <div className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Text */}
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <motion.h2 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-cinzel text-4xl sm:text-5xl md:text-6xl text-[#3E2723] leading-tight mb-8"
            >
              From everyday wear to <br/>
              <span className="font-script text-[#D4AF37] text-6xl md:text-8xl -ml-2 mr-2">heirloom,</span> explore designs <br/>
              by <span className="font-script text-[#D4AF37] text-6xl md:text-8xl">karat</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[#3E2723]/80 font-montserrat font-light text-base sm:text-lg max-w-lg leading-relaxed"
            >
              From everyday wear to heirloom pieces, explore our curated collection in 18kt, 22kt, and 24kt gold
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
};

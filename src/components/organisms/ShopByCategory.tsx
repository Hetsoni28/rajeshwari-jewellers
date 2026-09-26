'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categories = [
  { id: 'earrings', title: 'Earrings', desc: 'Shimmer to every love song', img: '/images/wishlist_earrings.png' },
  { id: 'necklaces', title: 'Necklaces', desc: 'Wrapped around your neck like love', img: '/images/wishlist_necklace.png' },
  { id: 'rings', title: 'Rings', desc: 'Some promises are meant to be worn', img: '/images/wishlist_ring.png' },
  { id: 'bangles', title: 'Bangles', desc: 'Where wrists blush with joy', img: '/images/wishlist_bangles.png' },
];

export const ShopByCategory = () => {
  return (
    <section className="bg-[#FCF9F6] py-20 sm:py-32 relative overflow-hidden">
      
      {/* Decorative background element (High-quality smooth vector replica) */}
      <div className="absolute top-0 left-[-15%] w-[60%] h-full opacity-60 pointer-events-none z-0">
        <svg viewBox="0 0 500 800" className="w-full h-full text-[#F0E3D3]" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <g transform="translate(-20, 0)">
            {/* Central sweeping curved spine */}
            <path d="M-100,900 C150,700 250,500 300,200 C320,100 300,-50 250,-150 L150,-150 C200,-50 220,100 200,200 C150,450 50,600 -100,750 Z" opacity="0.9" />
            
            {/* Large sweeping bottom leaf */}
            <path d="M-50,650 C100,550 250,400 350,250 C380,200 450,150 480,180 C440,230 350,300 250,450 C150,550 50,620 -50,650 Z" opacity="0.8" />
            <path d="M50,700 C150,650 300,550 400,450 C430,420 500,400 520,430 C480,480 350,550 250,620 C150,680 50,720 -50,720 Z" opacity="0.6" />
            
            {/* Middle branching leaves */}
            <path d="M200,450 C300,400 400,320 480,220 C500,180 550,150 580,180 C540,240 450,320 350,400 C300,440 250,460 200,450 Z" opacity="0.7" />
            <path d="M250,350 C350,320 450,250 530,150 C550,120 600,100 620,130 C580,180 480,260 380,320 C320,360 280,360 250,350 Z" opacity="0.6" />
            
            {/* Top branching leaves */}
            <path d="M280,250 C380,230 460,180 520,100 C540,70 580,50 600,80 C550,130 460,200 380,240 C350,260 320,260 280,250 Z" opacity="0.8" />
            <path d="M290,150 C380,120 450,70 500,0 C520,-20 550,-30 570,0 C530,40 450,100 370,140 C340,160 320,160 290,150 Z" opacity="0.7" />
            
            {/* Inner curls */}
            <path d="M100,550 C180,450 200,350 150,250 C120,180 50,150 0,150 C40,150 100,200 120,280 C150,350 100,450 50,550 Z" opacity="0.8" />
            <path d="M180,350 C230,280 250,200 200,120 C180,70 120,40 80,40 C110,40 160,80 180,140 C200,200 170,280 120,350 Z" opacity="0.7" />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-5/12 flex flex-col items-start lg:pr-8">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-[#3E2723] font-cinzel text-5xl sm:text-6xl md:text-7xl leading-tight mb-6"
            >
              How would you <br/>
              like to <br className="hidden sm:block"/>
              <span className="font-script text-[#D4AF37] text-7xl md:text-8xl mt-2 block">Sparkle?</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[#3E2723]/80 font-montserrat text-base sm:text-lg leading-relaxed max-w-md"
            >
              From timeless essentials to bold statement designs, explore over 200+ designs each intricately crafted to elevate your everyday style
            </motion.p>
          </div>

          {/* Right Grid Content */}
          <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {categories.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative aspect-[4/3] group overflow-hidden bg-gray-100 shadow-lg"
              >
                {/* Image */}
                <Image 
                  src={item.img} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                
                {/* Deep dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/90 via-[#3E2723]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div className="pr-4">
                    <h3 className="text-white font-bold text-xl sm:text-2xl mb-1">{item.title}</h3>
                    <p className="text-white/80 text-sm font-light leading-snug">
                      {item.desc}
                    </p>
                  </div>
                  
                  {/* Circle Arrow Button */}
                  <Link href={`/catalog?category=${item.title}`}>
                    <div className="w-10 h-10 shrink-0 rounded-full border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-[#3E2723] transition-all duration-300">
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

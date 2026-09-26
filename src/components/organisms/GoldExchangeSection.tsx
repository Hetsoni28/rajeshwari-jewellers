'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const BOARD_RATES = {
  '24k (99.9% Pure)': 15289,
  '22k (91.6% Pure)': 14015,
  '18k (75.0% Pure)': 11468,
};

type PurityKey = keyof typeof BOARD_RATES;

export const GoldExchangeSection = () => {
  const [weight, setWeight] = React.useState<number | string>(11);
  const [purity, setPurity] = React.useState<PurityKey>('22k (91.6% Pure)');
  
  // Using the exact board rates provided
  const currentRate = BOARD_RATES[purity];
  const calculatedValue = (Number(weight) || 0) * currentRate;

  // Format number to Indian Rupees format (e.g. 1,53,945)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="bg-white py-24 sm:py-32 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
          
          {/* Left Text */}
          <div className="w-full lg:w-5/12 flex flex-col items-start relative z-10">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl md:text-6xl text-[#3E2723] font-cinzel leading-tight mb-6"
            >
              Exchange your scrap gold into <br/>
              <span className="font-script text-[#D4AF37] text-6xl md:text-8xl -ml-2">Fresh Inventory</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#3E2723]/80 font-montserrat text-sm sm:text-base leading-relaxed mb-10 max-w-md"
            >
              Enter your scrap gold's weight and purity to estimate trade-in value against bulk sourcing.
              <br/><br/>
              <span className="text-xs opacity-70">*Final wholesale exchange value determined after XRF melting & testing at our facility.</span>
            </motion.p>
            <motion.button 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#D4AF37] text-[#3E2723] px-10 py-3 font-semibold hover:bg-[#E5C158] transition-colors shadow-md"
            >
              Know More
            </motion.button>
          </div>

          {/* Right Image + Calculator UI Card */}
          <div className="w-full lg:w-7/12 relative h-[500px] sm:h-[600px] flex justify-end items-center">
            
            {/* Background Image */}
            <div className="absolute right-0 w-3/4 h-full">
               <Image
                 src="/images/product_main.png"
                 alt="Gold Display"
                 fill
                 className="object-cover rounded-sm shadow-xl"
               />
               <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Overlapping Calculator Card */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative z-20 bg-[#FFFDD0] p-8 sm:p-10 shadow-2xl w-[90%] sm:w-[450px] mr-auto lg:mr-0 lg:absolute lg:left-0"
            >
              <h3 className="text-xl text-[#3E2723] font-semibold font-montserrat mb-8">Exchange Programme</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs text-[#3E2723]/70 mb-2 font-medium uppercase tracking-wider">Weight of Gold</label>
                  <div className="border-b border-[#3E2723]/30 pb-2 flex items-center relative">
                    <input 
                      type="number" 
                      value={weight} 
                      onChange={(e) => setWeight(e.target.value)}
                      className="text-lg font-medium text-[#3E2723] bg-transparent outline-none w-20 appearance-none"
                      min="0"
                      step="0.1"
                    />
                    <span className="text-sm text-[#3E2723]/80 absolute left-20">grams</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#3E2723]/70 mb-2 font-medium uppercase tracking-wider">Purity (In Karat)</label>
                  <div className="border-b border-[#3E2723]/30 pb-2 relative">
                    <select 
                      value={purity}
                      onChange={(e) => setPurity(e.target.value as PurityKey)}
                      className="text-lg font-medium text-[#3E2723] bg-transparent outline-none w-full appearance-none cursor-pointer pr-8"
                    >
                      {Object.keys(BOARD_RATES).map((key) => (
                        <option key={key} value={key} className="bg-white">{key}</option>
                      ))}
                    </select>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" className="text-[#3E2723] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <path d="M1 1.5L6 6.5L11 1.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-xs text-[#E57A44] font-medium">Today's {purity.split(' ')[0]} Gold Board Rate {formatCurrency(currentRate)}/gram</p>
                  </div>
                  <div className="border border-[#E57A44]/30 bg-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between shadow-inner gap-2 sm:gap-0">
                     <span className="text-xs sm:text-sm font-bold text-[#3E2723]/60 uppercase tracking-widest">Approx. Value</span>
                     <span className="text-[#3E2723] text-2xl sm:text-3xl font-bold">{formatCurrency(calculatedValue)}</span>
                  </div>
                  <p className="text-[10px] text-[#3E2723]/60 mt-2">*Actual value determined after testing</p>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

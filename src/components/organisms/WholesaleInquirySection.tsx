'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

export const WholesaleInquirySection = () => {
  const [form, setForm] = React.useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#FFFDF5] py-20">

      {/* Smooth Organic Botanical Wallpaper */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* One botanical sprig motif */}
            <g id="sprig">
              {/* Main curved stem */}
              <path d="M0,80 C2,60 -4,40 2,20 C5,10 8,4 10,0"
                stroke="#C9A84C" strokeWidth="1.2" fill="none" opacity="0.5" strokeLinecap="round" />

              {/* Leaf 1 - left, lower */}
              <path d="M2,60 C-8,52 -14,44 -8,38 C-4,34 4,42 2,60 Z"
                fill="#C9A84C" opacity="0.32" />

              {/* Leaf 2 - right, lower */}
              <path d="M2,50 C12,40 18,32 14,26 C10,22 2,32 2,50 Z"
                fill="#C9A84C" opacity="0.28" />

              {/* Leaf 3 - left, upper */}
              <path d="M4,30 C-6,24 -10,16 -6,10 C-2,6 6,14 4,30 Z"
                fill="#C9A84C" opacity="0.26" />

              {/* Leaf 4 - right, upper */}
              <path d="M6,22 C14,14 16,6 12,2 C8,-2 4,10 6,22 Z"
                fill="#C9A84C" opacity="0.24" />

              {/* Small flower at top - 5 petals */}
              <path d="M10,0 C12,-5 16,-6 16,-2 C16,2 10,2 10,0 Z" fill="#C9A84C" opacity="0.4" />
              <path d="M10,0 C14,2 16,6 12,8 C8,8 8,4 10,0 Z" fill="#C9A84C" opacity="0.38" />
              <path d="M10,0 C8,6 4,8 2,4 C0,0 6,-2 10,0 Z" fill="#C9A84C" opacity="0.38" />
              <path d="M10,0 C6,-4 6,-8 10,-8 C14,-6 12,-2 10,0 Z" fill="#C9A84C" opacity="0.36" />
              <path d="M10,0 C14,-4 18,-2 18,2 C16,6 12,4 10,0 Z" fill="#C9A84C" opacity="0.34" />
              <circle cx="10" cy="0" r="2.5" fill="#C9A84C" opacity="0.55" />

              {/* Tiny berries on side branch */}
              <path d="M2,62 C-6,56 -12,54 -16,56" stroke="#C9A84C" strokeWidth="0.8" fill="none" opacity="0.35" strokeLinecap="round" />
              <circle cx="-16" cy="56" r="2.5" fill="#C9A84C" opacity="0.42" />
              <circle cx="-20" cy="52" r="1.8" fill="#C9A84C" opacity="0.35" />
              <circle cx="-14" cy="50" r="1.5" fill="#C9A84C" opacity="0.3" />

              {/* Tiny berries right side */}
              <path d="M4,38 C10,32 16,30 20,32" stroke="#C9A84C" strokeWidth="0.8" fill="none" opacity="0.35" strokeLinecap="round" />
              <circle cx="20" cy="32" r="2.5" fill="#C9A84C" opacity="0.42" />
              <circle cx="24" cy="28" r="1.8" fill="#C9A84C" opacity="0.35" />
              <circle cx="22" cy="35" r="1.5" fill="#C9A84C" opacity="0.3" />
            </g>

            {/* Small accent flower */}
            <g id="floret">
              <path d="M0,0 C2,-5 6,-5 6,-1 C6,3 0,2 0,0 Z" fill="#C9A84C" opacity="0.38" />
              <path d="M0,0 C4,2 5,6 2,8 C-1,7 -1,3 0,0 Z" fill="#C9A84C" opacity="0.35" />
              <path d="M0,0 C-4,2 -6,6 -4,8 C-2,8 0,4 0,0 Z" fill="#C9A84C" opacity="0.33" />
              <path d="M0,0 C-4,-2 -4,-6 0,-6 C3,-5 2,-2 0,0 Z" fill="#C9A84C" opacity="0.32" />
              <path d="M0,0 C4,-4 6,-2 6,2 C5,4 2,2 0,0 Z" fill="#C9A84C" opacity="0.3" />
              <circle cx="0" cy="0" r="2" fill="#C9A84C" opacity="0.5" />
            </g>

            <pattern id="botanicalWall" x="0" y="0" width="160" height="200" patternUnits="userSpaceOnUse">
              {/* Primary sprig top-left zone */}
              <use href="#sprig" transform="translate(30,20) scale(1.1)" />

              {/* Primary sprig bottom-right zone, flipped */}
              <use href="#sprig" transform="translate(130,110) scale(-1,1) translate(-10,0)" />

              {/* Secondary smaller sprig top-right */}
              <use href="#sprig" transform="translate(120,10) scale(0.7) rotate(15 10 40)" />

              {/* Secondary smaller sprig bottom-left */}
              <use href="#sprig" transform="translate(20,120) scale(0.75) rotate(-10 10 40)" />

              {/* Accent florets scattered */}
              <use href="#floret" transform="translate(80,50)" />
              <use href="#floret" transform="translate(140,160) scale(0.8)" />
              <use href="#floret" transform="translate(10,170) scale(0.7)" />
              <use href="#floret" transform="translate(95,130) scale(0.65)" />

              {/* Tiny filler dots */}
              <circle cx="65" cy="30" r="1.5" fill="#C9A84C" opacity="0.22" />
              <circle cx="150" cy="80" r="1.5" fill="#C9A84C" opacity="0.2" />
              <circle cx="40" cy="100" r="1.2" fill="#C9A84C" opacity="0.18" />
              <circle cx="110" cy="180" r="1.2" fill="#C9A84C" opacity="0.18" />
              <circle cx="75" cy="150" r="1"   fill="#C9A84C" opacity="0.16" />
              <circle cx="155" cy="40" r="1"   fill="#C9A84C" opacity="0.16" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#botanicalWall)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          {/* Heading */}
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl text-[#3E2723] mb-4 font-light tracking-wide">
            More beautiful ornaments await...
          </h2>

          {/* Subheading */}
          <p className="font-montserrat text-lg sm:text-xl text-[#3E2723]/80 mb-10">
            Let us connect with our{' '}
            <span className="font-script text-[#D4AF37] text-3xl sm:text-4xl">team</span>{' '}
            for you
          </p>

          {/* Inquiry Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="flex-1 px-5 py-3.5 border border-[#D4AF37]/50 bg-white/80 text-[#3E2723] placeholder-[#3E2723]/50 focus:outline-none focus:border-[#D4AF37] text-sm font-montserrat"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  required
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="flex-1 px-5 py-3.5 border border-[#D4AF37]/50 bg-white/80 text-[#3E2723] placeholder-[#3E2723]/50 focus:outline-none focus:border-[#D4AF37] text-sm font-montserrat"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="flex-1 px-5 py-3.5 border border-[#D4AF37]/50 bg-white/80 text-[#3E2723] placeholder-[#3E2723]/50 focus:outline-none focus:border-[#D4AF37] text-sm font-montserrat"
                />
                <button
                  type="submit"
                  className="bg-[#D4AF37] text-[#3E2723] px-10 py-3.5 font-cinzel font-semibold tracking-widest text-sm uppercase shadow-md"
                >
                  Send Inquiry
                </button>
              </div>
              <p className="text-[#3E2723]/40 text-xs mt-4 font-montserrat">
                We typically respond within 24 hours. All enquiries are kept confidential.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8"
            >
              <p className="font-cinzel text-2xl text-[#3E2723] mb-2">Thank you!</p>
              <p className="font-montserrat text-[#3E2723]/70">
                Our team will reach out to you shortly.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

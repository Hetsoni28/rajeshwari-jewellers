"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { LogoSVG } from "@/components/atoms/LogoSVG";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const vp = { once: true, margin: "-80px" };

// ── Value cards (Section 2) ──────────────────────────────────────────────────
const values = [
  {
    title: "Wholesale Expertise",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <rect x="6" y="14" width="36" height="26" rx="2"/>
        <path d="M16 14v-4a8 8 0 0 1 16 0v4"/>
        <path d="M24 27v4M20 27h8"/>
        <circle cx="24" cy="27" r="2"/>
      </svg>
    ),
  },
  {
    title: "Hallmarked Purity",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <path d="M24 4l4 8 9 1.3-6.5 6.3 1.5 9L24 24l-8 4.6 1.5-9L11 13.3 20 12z"/>
        <path d="M17 30l-5 12 12-5 12 5-5-12"/>
      </svg>
    ),
  },
  {
    title: "Heritage Craftsmanship",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <path d="M8 40c0-8.8 7.2-16 16-16s16 7.2 16 16"/>
        <circle cx="24" cy="18" r="8"/>
        <path d="M18 18c2-4 6-6 10-4M30 16c1 2 1 5-1 7"/>
      </svg>
    ),
  },
  {
    title: "Competitive Trade Rates",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <path d="M6 24h36M24 6v36"/>
        <path d="M14 14l20 20M34 14L14 34"/>
        <circle cx="24" cy="24" r="10"/>
      </svg>
    ),
  },
];

// ── Promises (Section 4) ─────────────────────────────────────────────────────
const promises = [
  {
    title: "100% BIS Hallmarked Gold",
    desc: "Every ornament we supply is BIS hallmarked — 22KT, 18KT or 24KT — guaranteeing authentic purity you can pass on to your customers with confidence.",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14 mx-auto">
        <rect x="10" y="8" width="36" height="42" rx="2"/>
        <path d="M18 20h20M18 28h14M18 36h10"/>
        <circle cx="40" cy="40" r="8" fill="#FFFDF5" stroke="#D4AF37"/>
        <path d="M37 40l2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: "Transparent Wholesale Pricing",
    desc: "We provide itemised invoices with clear breakdowns of gold weight, making charges, and stone value. No hidden charges — ever.",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14 mx-auto">
        <path d="M28 10v8M28 38v8M18 18l5.6 5.6M32.4 32.4L38 38M10 28h8M38 28h8M18 38l5.6-5.6M32.4 23.6L38 18"/>
        <circle cx="28" cy="28" r="10"/>
        <path d="M25 28h6M28 25v6"/>
      </svg>
    ),
  },
  {
    title: "Bulk Order Support",
    desc: "From 10 pieces to 10,000 — our team manages your bulk sourcing seamlessly with dedicated order tracking and prompt delivery.",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14 mx-auto">
        <rect x="8" y="18" width="24" height="20" rx="2"/>
        <path d="M32 22h8l6 8v8H32V22z"/>
        <circle cx="18" cy="42" r="4"/><circle cx="40" cy="42" r="4"/>
        <path d="M8 28h4M14 28h4"/>
      </svg>
    ),
  },
  {
    title: "Exchange & Buyback",
    desc: "We offer a genuine old-gold exchange programme for retailers — get fair market value for scrap gold and convert it into fresh hallmarked inventory.",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14 mx-auto">
        <path d="M12 20a16 16 0 0 1 28-4M44 36a16 16 0 0 1-28 4"/>
        <path d="M8 20h8v-8M48 36h-8v8"/>
      </svg>
    ),
  },
  {
    title: "200+ Exclusive Designs",
    desc: "Our ever-growing catalogue covers lightweight dailywear, heavy bridal sets, antique & polki, kundan, and diamond — updated every season.",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14 mx-auto">
        <polygon points="28,8 34,22 50,24 38,35 41,51 28,44 15,51 18,35 6,24 22,22"/>
      </svg>
    ),
  },
  {
    title: "Dedicated Trade Support",
    desc: "Call or WhatsApp our trade desk directly — Dixit Soni, Harshil Soni, or Jimil Soni — for personalised assistance on pricing, orders, and customisation.",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14 mx-auto">
        <path d="M44 36.9c-1.4-0.8-5.7-2.8-6.5-3.1-0.8-0.3-1.4-0.5-2 0.5-0.6 1-2.3 2.9-2.8 3.5-0.5 0.6-1 0.7-1.9 0.2-4.3-2.1-7.2-3.8-10-8.6-0.8-1.3 0.8-1.2 2.2-4 0.3-0.6 0.1-1.1-0.1-1.5-0.2-0.5-2.1-5-2.9-6.8-0.7-1.8-1.5-1.5-2-1.6-0.5 0-1.1 0-1.6 0-0.6 0-1.5 0.2-2.3 1.1-0.8 0.9-3 2.9-3 7.1 0 4.2 3 8.2 3.5 8.8 0.4 0.6 6 9.1 14.5 12.8 8.5 3.6 8.5 2.4 10 2.3 1.5-0.1 4.9-2 5.6-3.9 0.7-1.9 0.7-3.5 0.5-3.8z"/>
      </svg>
    ),
  },
];

export const AboutClient = () => {
  return (
    <div className="bg-[#FFFDF5] overflow-x-hidden">

      {/* ── SECTION 1: Hero Split ───────────────────────────────────────── */}
      <section className="flex flex-col lg:flex-row min-h-[60vh] pt-20 lg:pt-0">
        {/* Left — text */}
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={vp}
          className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-16 lg:py-28"
        >
          <motion.p variants={fadeUp} className="font-cinzel text-xs tracking-[0.25em] text-[#D4AF37] uppercase mb-4">
            Est. in Ahmedabad
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-cinzel text-4xl sm:text-5xl lg:text-6xl text-[#3E2723] mb-6 leading-tight">
            About Rajeshwari<br/>Jewellers
          </motion.h1>
          <motion.div variants={fadeUp} className="w-14 h-[2px] bg-[#D4AF37] mb-8" />
          <motion.p variants={fadeUp} className="font-montserrat text-[#3E2723]/75 text-sm sm:text-base leading-relaxed max-w-md">
            Rajeshwari Jewellers is a leading wholesale and retail gold ornaments house based in Ahmedabad. 
            We supply hallmarked 22KT, 18KT and 24KT jewellery — diamonds, polki, kundan, antique and gemstone ornaments — 
            to retailers, jewellers, and bulk buyers across India. Every piece we craft reflects our unwavering commitment to 
            purity, craftsmanship, and competitive trade value.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <Link
              href="/contact"
              className="inline-block bg-[#D4AF37] text-[#3E2723] font-cinzel font-semibold tracking-widest text-xs uppercase px-8 py-3.5 shadow-md"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — brand panel */}
        <div className="w-full lg:w-1/2 relative min-h-[340px] sm:min-h-[440px] lg:min-h-0 bg-[#3E2723] flex items-center justify-center overflow-hidden">
          {/* Decorative gold curves */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 600 500" fill="none" preserveAspectRatio="xMidYMid slice">
            <path d="M-50 400 Q200 200 600 300" stroke="#D4AF37" strokeWidth="1.5"/>
            <path d="M0 500 Q250 250 650 350" stroke="#D4AF37" strokeWidth="1"/>
            <path d="M100 0 Q300 200 100 500" stroke="#D4AF37" strokeWidth="1"/>
            <path d="M500 0 Q300 300 500 500" stroke="#D4AF37" strokeWidth="0.8"/>
          </svg>
          {/* Logo centred */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-10">
            <div className="w-24 h-24 sm:w-32 sm:h-32 text-[#D4AF37]">
              <LogoSVG size="md" />
            </div>
            <div className="text-center">
              <p className="font-cinzel text-2xl sm:text-3xl tracking-[0.2em] text-[#D4AF37] font-bold">RAJESHWARI</p>
              <p className="font-cinzel text-xs tracking-[0.3em] text-[#D4AF37]/70 uppercase mt-1">Jewellers</p>
              <div className="w-12 h-[1px] bg-[#D4AF37]/40 mx-auto my-3"/>
              <p className="font-montserrat text-[10px] tracking-[0.2em] text-[#D4AF37]/60 uppercase">Gold &amp; Ornaments · Ahmedabad</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Value Cards ──────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#FFFDF5]">
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={vp}
          className="container mx-auto px-4 sm:px-8 max-w-6xl grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              className="bg-[#FFFDF5] border border-[#D4AF37]/25 flex flex-col items-center text-center py-8 px-4 sm:px-6 shadow-sm"
            >
              <div className="mb-5">{v.icon}</div>
              <p className="font-cinzel text-sm sm:text-base text-[#3E2723] font-medium leading-snug">{v.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── SECTION 3: Heritage Split ───────────────────────────────────── */}
      <section className="flex flex-col lg:flex-row min-h-[420px] sm:min-h-[500px]">
        {/* Left — brown floral background + text */}
        <div className="w-full lg:w-1/2 relative bg-[#3E2723] flex items-center overflow-hidden min-h-[380px] lg:min-h-0">
          {/* Damask SVG wallpaper */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="damask" x="0" y="0" width="80" height="100" patternUnits="userSpaceOnUse">
                <path d="M40,10 C50,20 60,30 50,45 C40,60 30,55 30,45 C20,35 28,18 40,10Z" fill="#D4AF37"/>
                <path d="M40,90 C30,80 20,70 30,55 C40,40 50,45 50,55 C60,65 52,82 40,90Z" fill="#D4AF37"/>
                <path d="M10,50 C20,40 30,35 40,45 C50,55 45,65 35,60 C25,55 15,62 10,50Z" fill="#D4AF37"/>
                <path d="M70,50 C60,60 50,65 40,55 C30,45 35,35 45,40 C55,45 65,38 70,50Z" fill="#D4AF37"/>
                <circle cx="40" cy="50" r="6" fill="#D4AF37"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#damask)"/>
          </svg>

          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={vp}
            className="relative z-10 px-8 sm:px-14 lg:px-16 py-14 lg:py-20 max-w-xl"
          >
            <motion.h2 variants={fadeUp} className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              Rooted in<br/>Ahmedabad
            </motion.h2>
            <motion.p variants={fadeUp} className="font-montserrat text-white/80 text-sm sm:text-base leading-relaxed mb-4">
              Our showroom is located at E-13, Spectrum Tower, opposite Police Stadium, Shahibaug — at the heart of Ahmedabad's 
              jewellery trade corridor. We have spent years building relationships with India's finest artisans, 
              sourcing designs that balance timeless heritage with modern aesthetics.
            </motion.p>
            <motion.p variants={fadeUp} className="font-montserrat text-white/70 text-sm leading-relaxed">
              From lightweight everyday ornaments to elaborate bridal sets, every piece passes through stringent quality checks 
              before it reaches your showroom floor. Our trade is built on one simple promise — what you order is exactly what your customers deserve.
            </motion.p>
          </motion.div>
        </div>

        {/* Right — artisan image */}
        <div className="w-full lg:w-1/2 relative min-h-[300px] sm:min-h-[420px] lg:min-h-0">
          <Image
            src="/images/heritage_necklaces.png"
            alt="Rajeshwari Jewellers craftsmanship"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* ── SECTION 4: Promises ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FFFDF5]">
        <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
          {/* Heading */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="text-center mb-12 sm:mb-16">
            <motion.h2 variants={fadeUp} className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#3E2723] mb-2">
              The Rajeshwari{" "}
              <span className="font-script text-[#D4AF37] text-4xl sm:text-5xl lg:text-6xl">Promises</span>
            </motion.h2>
          </motion.div>

          {/* Grid of 6 promises */}
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={vp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
          >
            {promises.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4">{p.icon}</div>
                <h3 className="font-cinzel text-base sm:text-lg text-[#3E2723] font-semibold mb-3">{p.title}</h3>
                <p className="font-montserrat text-[#3E2723]/65 text-sm leading-relaxed max-w-xs">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5: Contact CTA ──────────────────────────────────────── */}
      <section className="py-14 sm:py-18 bg-[#3E2723] text-center">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="px-6">
          <motion.p variants={fadeUp} className="font-cinzel text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-4">Visit Us</motion.p>
          <motion.h2 variants={fadeUp} className="font-cinzel text-2xl sm:text-3xl lg:text-4xl text-white mb-4">
            E-13, Spectrum Tower, Shahibaug, Ahmedabad
          </motion.h2>
          <motion.p variants={fadeUp} className="font-montserrat text-white/60 text-sm mb-2">Mon–Sat: 10:30am – 7:30pm</motion.p>
          <motion.p variants={fadeUp} className="font-montserrat text-white/60 text-sm mb-8">
            +91 98259 53334 &nbsp;·&nbsp; +91 99255 11134 &nbsp;·&nbsp; +91 83206 47040
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-[#D4AF37] text-[#3E2723] font-cinzel font-semibold tracking-widest text-xs uppercase px-10 py-4 shadow-md"
            >
              Send an Enquiry
            </Link>
            <a
              href="https://wa.me/919825953334"
              target="_blank"
              rel="noreferrer"
              className="inline-block border border-[#D4AF37] text-[#D4AF37] font-cinzel font-semibold tracking-widest text-xs uppercase px-10 py-4"
            >
              WhatsApp Us
            </a>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
};

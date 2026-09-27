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

const values = [
  {
    title: "Wholesale Expertise",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto">
        <rect x="6" y="14" width="36" height="26" rx="2"/>
        <path d="M16 14v-4a8 8 0 0 1 16 0v4"/>
        <circle cx="24" cy="27" r="3"/>
        <path d="M24 30v4"/>
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
        <circle cx="24" cy="24" r="18"/>
        <path d="M24 12v24M12 24h24"/>
        <path d="M17 17l14 14M31 17L17 31"/>
      </svg>
    ),
  },
];

const promises = [
  {
    title: "100% BIS Hallmarked Gold",
    desc: "Every ornament we supply is BIS hallmarked — 22KT, 18KT or 24KT — guaranteeing authentic purity you can pass on to your customers with confidence.",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14 mx-auto">
        <rect x="10" y="8" width="36" height="42" rx="2"/>
        <path d="M18 20h20M18 28h14M18 36h10"/>
        <circle cx="40" cy="40" r="8" fill="white" stroke="#D4AF37"/>
        <path d="M37 40l2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: "Transparent Wholesale Pricing",
    desc: "We provide itemised invoices with clear breakdowns of gold weight, making charges, and stone value. No hidden charges — ever.",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14 mx-auto">
        <circle cx="28" cy="28" r="18"/>
        <path d="M28 18v4M28 34v4M22 22l3 3M31 31l3 3M18 28h4M34 28h4M22 34l3-3M31 25l3-3"/>
        <circle cx="28" cy="28" r="5"/>
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
        <path d="M44 37c-1.4-0.8-5.7-2.8-6.5-3.1-0.8-0.3-1.4-0.5-2 0.5-0.6 1-2.3 2.9-2.8 3.5-0.5 0.6-1 0.7-1.9 0.2-4.3-2.1-7.2-3.8-10-8.6-0.8-1.3 0.8-1.2 2.2-4 0.3-0.6 0.1-1.1-0.1-1.5-0.2-0.5-2.1-5-2.9-6.8-0.7-1.8-1.5-1.5-2-1.6-0.5 0-1.1 0-1.6 0-0.6 0-1.5 0.2-2.3 1.1-0.8 0.9-3 2.9-3 7.1 0 4.2 3 8.2 3.5 8.8 0.4 0.6 6 9.1 14.5 12.8 8.5 3.6 8.5 2.4 10 2.3 1.5-0.1 4.9-2 5.6-3.9 0.7-1.9 0.7-3.5 0.5-3.8z"/>
      </svg>
    ),
  },
];

export const AboutClient = () => {
  return (
    <div className="bg-white overflow-x-hidden">

      {/* ── SECTION 1: Hero Split ─────────────────────────────────────────── */}
      <section className="flex flex-col lg:flex-row min-h-[60vh] pt-20 lg:pt-0">
        {/* Left — text on white */}
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={vp}
          className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-14 lg:px-20 py-16 lg:py-28 bg-white"
        >
          <motion.p variants={fadeUp} className="font-cinzel text-xs tracking-[0.25em] text-[#D4AF37] uppercase mb-4">
            Est. in Ahmedabad
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-cinzel text-4xl sm:text-5xl lg:text-6xl text-[#1A1A1A] mb-6 leading-tight">
            About Rajeshwari<br/>Jewellers
          </motion.h1>
          <motion.div variants={fadeUp} className="w-14 h-[2px] bg-[#D4AF37] mb-8" />
          <motion.p variants={fadeUp} className="font-montserrat text-gray-500 text-sm sm:text-base leading-relaxed max-w-md">
            Rajeshwari Jewellers is a leading wholesale and retail gold ornaments house based in Ahmedabad.
            We supply hallmarked 22KT, 18KT and 24KT jewellery — diamonds, polki, kundan, antique and gemstone ornaments —
            to retailers, jewellers, and bulk buyers across India. Every piece reflects our commitment to
            purity, craftsmanship, and competitive trade value.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <Link
              href="/contact"
              className="inline-block bg-[#D4AF37] text-white font-cinzel font-semibold tracking-widest text-xs uppercase px-8 py-3.5 shadow-md hover:bg-[#c9a744] transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — image */}
        <div className="w-full lg:w-1/2 relative min-h-[340px] sm:min-h-[440px] lg:min-h-0">
          <Image
            src="/images/hero_bridal_16x9.jpg"
            alt="Rajeshwari Jewellers"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
            priority
          />
          {/* Gold overlay with logo */}
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 sm:w-28 sm:h-28 text-[#D4AF37] drop-shadow-lg">
              <LogoSVG size="md" />
            </div>
            <p className="font-cinzel text-xl sm:text-2xl tracking-[0.2em] text-white font-bold drop-shadow">RAJESHWARI</p>
            <p className="font-cinzel text-xs tracking-[0.3em] text-white/70 uppercase">Jewellers · Ahmedabad</p>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Value Cards ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#F9F6F0]">
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={vp}
          className="container mx-auto px-4 sm:px-8 max-w-6xl grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              className="bg-white border border-gray-100 flex flex-col items-center text-center py-8 px-4 sm:px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-5">{v.icon}</div>
              <p className="font-cinzel text-sm sm:text-base text-[#1A1A1A] font-medium leading-snug">{v.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── SECTION 3: Heritage Split ──────────────────────────────────────── */}
      <section className="flex flex-col lg:flex-row min-h-[420px] sm:min-h-[500px]">
        {/* Left — image */}
        <div className="w-full lg:w-1/2 relative min-h-[300px] sm:min-h-[420px] lg:min-h-0 order-2 lg:order-1">
          <Image
            src="/images/heritage_necklaces.png"
            alt="Rajeshwari Jewellers craftsmanship"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>

        {/* Right — text on white */}
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={vp}
          className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-14 lg:px-16 py-14 lg:py-20 bg-white order-1 lg:order-2"
        >
          <motion.p variants={fadeUp} className="font-cinzel text-xs tracking-[0.25em] text-[#D4AF37] uppercase mb-4">
            Our Story
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] mb-6 leading-tight">
            Rooted in<br/>Ahmedabad
          </motion.h2>
          <motion.div variants={fadeUp} className="w-12 h-[2px] bg-[#D4AF37] mb-8" />
          <motion.p variants={fadeUp} className="font-montserrat text-gray-500 text-sm sm:text-base leading-relaxed mb-5">
            Our showroom is located at E-13, Spectrum Tower, opposite Police Stadium, Shahibaug —
            at the heart of Ahmedabad's jewellery trade corridor. We have spent years building relationships
            with India's finest artisans, sourcing designs that balance timeless heritage with modern aesthetics.
          </motion.p>
          <motion.p variants={fadeUp} className="font-montserrat text-gray-400 text-sm leading-relaxed">
            From lightweight everyday ornaments to elaborate bridal sets, every piece passes through stringent
            quality checks before it reaches your showroom floor. Our trade is built on one promise —
            what you order is exactly what your customers deserve.
          </motion.p>
        </motion.div>
      </section>

      {/* ── SECTION 4: Promises ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#F9F6F0]">
        <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={vp} className="text-center mb-12 sm:mb-16">
            <motion.h2 variants={fadeUp} className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-[#1A1A1A] mb-2">
              The Rajeshwari{" "}
              <span className="font-script text-[#D4AF37] text-4xl sm:text-5xl lg:text-6xl">Promises</span>
            </motion.h2>
            <motion.div variants={fadeUp} className="w-12 h-[2px] bg-[#D4AF37] mx-auto mt-5" />
          </motion.div>

          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={vp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
          >
            {promises.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className="flex flex-col items-center text-center bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-5">{p.icon}</div>
                <h3 className="font-cinzel text-base sm:text-lg text-[#1A1A1A] font-semibold mb-3">{p.title}</h3>
                <p className="font-montserrat text-gray-500 text-sm leading-relaxed max-w-xs">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 5: Contact CTA ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-[#D4AF37]" />
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#D4AF37"><path d="M12 2L15 8L22 9L17 14L18 21L12 17L6 21L7 14L2 9L9 8L12 2Z"/></svg>
            <div className="w-16 h-[1px] bg-[#D4AF37]" />
          </div>
          <p className="font-cinzel text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-4">Visit Us</p>
          <h2 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl text-[#1A1A1A] mb-5">
            E-13, Spectrum Tower, Shahibaug, Ahmedabad
          </h2>
          <p className="font-montserrat text-gray-500 text-sm mb-2">Mon–Sat: 10:30am – 7:30pm</p>
          <p className="font-montserrat text-gray-400 text-sm mb-10">
            +91 98259 53334 &nbsp;·&nbsp; +91 99255 11134 &nbsp;·&nbsp; +91 83206 47040
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-[#D4AF37] text-white font-cinzel font-semibold tracking-widest text-xs uppercase px-10 py-4 shadow-md hover:bg-[#c9a744] transition-colors"
            >
              Send an Enquiry
            </Link>
            <a
              href="https://wa.me/919825953334"
              target="_blank"
              rel="noreferrer"
              className="inline-block border border-[#D4AF37] text-[#D4AF37] font-cinzel font-semibold tracking-widest text-xs uppercase px-10 py-4 hover:bg-[#D4AF37]/5 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

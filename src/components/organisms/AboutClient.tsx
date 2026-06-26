"use client";

import Image from "next/image";
import { Heading } from "@/components/atoms/Heading";
import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainerSlow, dividerReveal, viewport } from "@/lib/motion";

export const AboutClient = () => {
  return (
    <>
      <div className="pt-28 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-24 container mx-auto px-4 sm:px-6 md:px-12 relative z-10">

        {/* Section 1 — Header & Wide Image */}
        <section className="mb-20 sm:mb-24 md:mb-32">
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 md:mb-16"
          >
            <motion.div variants={fadeUpVariant}>
              <Heading level={1} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-wide">
                A Legacy of <span className="text-[#D4AF37]">Purity</span> &amp; Brilliance
              </Heading>
            </motion.div>
            <motion.p
              variants={fadeUpVariant}
              className="text-gray-500 text-sm md:text-base leading-relaxed tracking-wide font-light max-w-3xl mx-auto"
            >
              For over three decades, Rajeshwari Jewellers has been the cornerstone of trust and impeccable craftsmanship in Ahmedabad&apos;s wholesale jewelry market.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewport}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[200px] sm:h-[300px] md:h-[450px] lg:h-[560px] bg-gray-200 overflow-hidden shadow-md"
          >
            <Image
              src="/images/hero_bg.png"
              alt="Rajeshwari Jewellers Showroom"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </section>

        {/* Section 2 — Heritage */}
        <section className="mb-20 sm:mb-24 md:mb-32">
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="flex flex-col lg:flex-row gap-10 sm:gap-12 md:gap-16 items-center"
          >
            <div className="w-full lg:w-1/2 flex flex-col justify-center order-2 lg:order-1">
              <motion.div variants={fadeUpVariant}>
                <Heading level={2} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 sm:mb-6 leading-tight">
                  Our Heritage in <br /> Ahmedabad
                </Heading>
              </motion.div>
              <motion.div variants={dividerReveal} className="w-14 sm:w-16 h-1 bg-[#D4AF37] mb-6 sm:mb-8 origin-left" />
              <motion.div
                variants={fadeUpVariant}
                className="text-gray-500 text-sm md:text-base leading-[1.8] font-light flex flex-col gap-4 sm:gap-6"
              >
                <p>
                  Rooted in the historic lanes of Ahmedabad, Rajeshwari Jewellers began as a humble endeavor dedicated to authentic craftsmanship. Over generations, we have evolved into a premier wholesale destination, yet our core philosophy remains unchanged: to provide jewelry that is as pure in intention as it is in material.
                </p>
                <p>
                  We source the finest materials and collaborate with master artisans whose skill has been honed over centuries. Every piece in our catalog is a testament to India&apos;s rich cultural tapestry, refined for the modern connoisseur.
                </p>
              </motion.div>
            </div>
            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.97 }, show: { opacity: 1, scale: 1 } }}
              className="w-full lg:w-1/2 h-[280px] sm:h-[380px] md:h-[500px] lg:h-[580px] relative bg-gray-200 overflow-hidden shadow-md order-1 lg:order-2"
            >
              <Image
                src="/images/bridal_necklace.png"
                alt="Heritage Craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>
        </section>
      </div>

      {/* Section 3 — Pillars */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#F2F2F2]">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16"
          >
            <motion.div variants={fadeUpVariant}>
              <Heading level={2} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 sm:mb-4 tracking-wide">
                The Pillars of Our Brand
              </Heading>
            </motion.div>
            <motion.p variants={fadeUpVariant} className="text-gray-500 text-sm md:text-base tracking-wide font-light">
              The principles that guide every facet of our wholesale operations.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 md:gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                title: "Uncompromising Quality",
                text: "We utilize only the finest ethically sourced materials, ensuring that each piece not only shines with brilliance but also stands the test of time for generations.",
              },
              {
                title: "Rigorous Certification",
                text: "Our rigorous certification process ensures that every bulk order meets exact hallmark standards. We provide the documentation you need to guarantee purity and value to your final customers.",
              },
              {
                title: "Scalable Artistry",
                text: "Combining traditional techniques with modern production capabilities, we deliver artisan-quality jewelry at the scale required for wholesale, giving your store a distinct competitive advantage.",
              },
            ].map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={fadeUpVariant}
                className="bg-white p-7 sm:p-8 md:p-10 shadow-sm flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F8F5EE] mb-6 sm:mb-8 flex items-center justify-center flex-shrink-0" />
                <Heading level={3} className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{pillar.title}</Heading>
                <p className="text-gray-500 text-xs leading-relaxed font-light">{pillar.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

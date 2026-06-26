"use client";

import Image from "next/image";
import { Input } from "@/components/atoms/Input";
import { Heading } from "@/components/atoms/Heading";
import { Textarea } from "@/components/atoms/Textarea";
import { Button } from "@/components/atoms/Button";
import { Select } from "@/components/atoms/Select";

export const ContactClient = () => {
  return (
    <>
      {/* Hero Section — 60vh on mobile, 100vh on desktop */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-screen flex items-center justify-center min-h-[360px] max-h-[900px]">
        <Image
          src="/images/contact_hero_light.png"
          alt="Contact Us Background"
          fill
          priority={true}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px]" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto mt-16 sm:mt-20">
          <Heading level={1} className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-wide drop-shadow-sm">
            Contact Us
          </Heading>
          <p className="text-gray-800 text-sm md:text-base leading-relaxed tracking-wide font-medium drop-shadow-sm max-w-xl mx-auto">
            We invite you to experience our heritage and craftsmanship in person, or reach out to our dedicated concierges for personalized assistance.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 md:px-12 py-14 sm:py-16 md:py-20">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">

          {/* Left Column — Info */}
          <div className="w-full lg:w-5/12 flex flex-col gap-5 sm:gap-6 md:gap-8">

            {/* Showroom Info */}
            <div className="bg-white p-6 sm:p-8 shadow-sm">
              <Heading level={2} className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Our Showroom</Heading>
              <div className="w-full h-px bg-gray-200 mb-6 sm:mb-8" />

              <div className="flex flex-col gap-6 sm:gap-8">
                {/* Address */}
                <div className="flex gap-3 sm:gap-4">
                  <div className="mt-1 text-gold-dark flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-800 uppercase mb-1.5 sm:mb-2">Address</h3>
                    <p className="text-gray-500 text-sm font-light leading-relaxed">
                      E-13, Spectrum Tower,<br />
                      Opp. Police Stadium, Shahibaug,<br />
                      Ahmedabad - 380 004, Gujarat
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex gap-3 sm:gap-4">
                  <div className="mt-1 text-gold-dark flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  </div>
                  <div className="w-full">
                    <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-800 uppercase mb-1.5 sm:mb-2">Contact</h3>
                    <div className="flex flex-col gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      <p className="text-gray-500 text-sm font-light"><span className="font-medium text-gray-700">Dixit Soni:</span> +91 98259 53334</p>
                      <p className="text-gray-500 text-sm font-light"><span className="font-medium text-gray-700">Harshil Soni:</span> +91 99255 11134</p>
                      <p className="text-gray-500 text-sm font-light"><span className="font-medium text-gray-700">Jimil Soni:</span> +91 83206 47040</p>
                      <p className="text-gray-500 text-[11px] font-medium mt-1 break-all">RAJESHWARIJEWEWLLERS13@GMAIL.COM</p>
                    </div>
                    <a
                      href="https://wa.me/919825953334"
                      className="text-[10px] font-bold tracking-[0.1em] text-gold-dark hover:text-brown transition-colors flex items-center gap-2 uppercase min-h-[44px] w-fit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 11.994c0 2.064.84 3.96 2.235 5.404a1.5 1.5 0 0 1 .374.832l.063 1.155a.75.75 0 0 0 1.127.568l1.62-.843a1.5 1.5 0 0 1 .98-.125c1.107.284 2.31.442 3.565.442Z" />
                      </svg>
                      Connect on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex gap-3 sm:gap-4">
                  <div className="mt-1 text-gold-dark flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <div className="w-full">
                    <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-800 uppercase mb-1.5 sm:mb-2">Business Hours</h3>
                    <div className="flex justify-between text-gray-500 text-sm font-light">
                      <span>Monday – Saturday:</span>
                      <span>10:30 AM – 7:30 PM</span>
                    </div>
                    <div className="flex justify-between text-gray-500 text-sm font-light mt-1">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white p-2 shadow-sm h-[200px] sm:h-[240px] md:h-[280px] relative">
              <iframe
                src="https://maps.google.com/maps?q=Spectrum%20Tower,%20Shahibaug,%20Ahmedabad&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full p-2"
              />
            </div>
          </div>

          {/* Right Column — Form */}
          <div className="w-full lg:w-7/12">
            <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-14 shadow-sm">
              <Heading level={2} className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">Inquire</Heading>
              <p className="text-gray-500 text-sm font-light mb-7 sm:mb-10">
                Please fill out the form below for bespoke requests, catalog inquiries, or to schedule a private viewing.
              </p>

              <form className="flex flex-col gap-5 sm:gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
                  <Input label="First Name" placeholder="First Name" />
                  <Input label="Last Name" placeholder="Last Name" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
                  <Input label="Email Address" type="email" placeholder="Email Address" />
                  <Input label="Phone Number" type="tel" placeholder="Phone Number" />
                </div>

                <Select
                  defaultValue=""
                  options={[
                    { value: "", label: "Nature of Inquiry" },
                    { value: "custom", label: "Custom Orders" },
                    { value: "catalog", label: "Catalog Request" },
                    { value: "viewing", label: "Schedule Private Viewing" },
                    { value: "other", label: "Other" },
                  ]}
                />

                <Textarea label="Your Message" placeholder="Your Message" rows={3} />

                <div className="mt-4 sm:mt-6 flex justify-stretch sm:justify-end">
                  <Button
                    variant="custom"
                    type="button"
                    className="w-full sm:w-auto bg-[#B5952F] hover:bg-[#D4AF37] transition-colors text-white px-8 sm:px-10 py-4 text-[10px] font-bold tracking-[0.15em] uppercase shadow-md min-h-[52px]"
                  >
                    Send Inquiry
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat, Cinzel, Great_Vibes } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { WishlistProvider } from "@/context/WishlistContext";
import { MotionProvider } from "@/components/atoms/MotionProvider";
import { INTRO_BOOT_SCRIPT } from "@/lib/intro";
import { BUSINESS, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, absoluteUrl, jsonLd } from "@/lib/seo";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rajeshwari Jewellers | 22K Gold Jewellery in Ahmedabad",
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "gold jewellery wholesaler Ahmedabad",
    "22K gold ornaments",
    "gold jewellery Shahibaug",
    "antique gold jewellery",
    "bridal gold jewellery Ahmedabad",
    "Rajeshwari Jewellers",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Jewellery",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    url: "/",
    title: "Rajeshwari Jewellers | 22K Gold Jewellery in Ahmedabad",
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajeshwari Jewellers | 22K Gold Jewellery in Ahmedabad",
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: true, address: true, email: true },
  // Favicon and Apple touch icon come from src/app/icon.png and src/app/apple-icon.png (small, optimised)
  // Paste the code from Google Search Console → Settings → Ownership verification (HTML tag)
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#3E2723",
  width: "device-width",
  initialScale: 1,
};

/** Site-wide structured data: the business (local SEO) and the website itself. */
const businessJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "JewelryStore",
      "@id": `${SITE_URL}/#business`,
      name: BUSINESS.name,
      url: SITE_URL,
      logo: absoluteUrl("/images/logo.jpg"),
      image: absoluteUrl(DEFAULT_OG_IMAGE.url),
      description: DEFAULT_DESCRIPTION,
      telephone: BUSINESS.phones[0],
      contactPoint: BUSINESS.phones.map((telephone) => ({
        "@type": "ContactPoint",
        telephone,
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["en", "hi", "gu"],
      })),
      address: { "@type": "PostalAddress", ...BUSINESS.address },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: BUSINESS.openingHours.days,
          opens: BUSINESS.openingHours.opens,
          closes: BUSINESS.openingHours.closes,
        },
      ],
      areaServed: { "@type": "Country", name: "India" },
      sameAs: [`https://wa.me/${BUSINESS.whatsapp.replace("+", "")}`],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#business` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: browser extensions often inject attributes into <html>/<body>
    // before React hydrates. This only ignores attribute differences on these two tags.
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${playfair.variable} ${montserrat.variable} ${cinzel.variable} ${greatVibes.variable} antialiased bg-neutral-light text-brown min-h-screen flex flex-col`}>
        {/* Decides before first paint whether the homepage welcome intro plays (once per tab session) */}
        <Script id="intro-boot" strategy="beforeInteractive">
          {INTRO_BOOT_SCRIPT}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessJsonLd) }} />
        {/* First Tab stop on every page: jump past the navigation */}
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <MotionProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </MotionProvider>
      </body>
    </html>
  );
}

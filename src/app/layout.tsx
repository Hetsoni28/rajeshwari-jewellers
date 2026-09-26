import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Cinzel, Great_Vibes } from "next/font/google";
import "./globals.css";
import { WishlistProvider } from "@/context/WishlistContext";

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
  title: "Rajeshwari Jewellers",
  description: "Ahmedabad's Premier Wholesaler Of Gold Ornaments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${playfair.variable} ${montserrat.variable} ${cinzel.variable} ${greatVibes.variable} antialiased bg-neutral-light text-brown min-h-screen flex flex-col`}>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </body>
    </html>
  );
}

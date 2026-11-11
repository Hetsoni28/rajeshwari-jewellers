"use client";

import Image from "next/image";

type LogoSVGProps = {
  size?: "sm" | "md" | "lg" | "xl" | "custom";
  className?: string;
  /** Load immediately (use for the navbar logo, which is visible on first paint). */
  priority?: boolean;
};

// Logo natural ratio is 542 × 343 (landscape ~1.58:1)
const sizeMap: Record<string, { w: number; h: number }> = {
  sm:     { w: 120, h: 76  },
  md:     { w: 160, h: 101 },
  lg:     { w: 200, h: 127 },
  xl:     { w: 260, h: 165 },
  custom: { w: 160, h: 101 },
};

/**
 * The real Rajeshwari Jewellers logo.
 * Served as a 23 KB WebP extracted from the original logo.svg (a 460 KB SVG wrapping a PNG),
 * so it is ~95% lighter with the identical image.
 */
export const LogoSVG = ({ size = "md", className, priority = false }: LogoSVGProps) => {
  const { w, h } = sizeMap[size] ?? sizeMap.md;

  return (
    <Image
      src="/images/logo-rj.webp"
      alt="Rajeshwari Jewellers logo"
      width={w}
      height={h}
      priority={priority}
      // Already optimised and tiny; skips the image optimiser round-trip
      unoptimized
      style={{ width: "100%", height: "auto", display: "block", margin: "0 auto" }}
      className={className}
    />
  );
};

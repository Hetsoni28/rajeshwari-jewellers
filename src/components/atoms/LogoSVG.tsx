"use client";

import Image from "next/image";

type LogoSVGProps = {
  size?: "sm" | "md" | "lg" | "xl" | "custom";
  className?: string;
};

// Logo natural ratio is 542 × 343 (landscape ~1.58:1)
const sizeMap: Record<string, { w: number; h: number }> = {
  sm:  { w: 90,  h: 57  },
  md:  { w: 130, h: 82  },
  lg:  { w: 180, h: 114 },
  xl:  { w: 260, h: 165 },
  custom: { w: 130, h: 82 },
};

export const LogoSVG = ({ size = "md", className }: LogoSVGProps) => {
  const { w, h } = sizeMap[size] ?? sizeMap.md;

  return (
    <Image
      src="/images/logo.svg"
      alt="Rajeshwari Jewellers Logo"
      width={w}
      height={h}
      className={className}
      style={{ objectFit: "contain" }}
      priority
    />
  );
};

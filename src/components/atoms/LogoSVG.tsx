"use client";

import Image from "next/image";

type LogoSVGProps = {
  size?: "sm" | "md" | "lg" | "xl" | "custom";
  className?: string;
};

const sizeMap: Record<string, { w: number; h: number }> = {
  sm:  { w: 120,  h: 76  },
  md:  { w: 160,  h: 101 },
  lg:  { w: 200,  h: 127 },
  xl:  { w: 260,  h: 165 },
  custom: { w: 160, h: 101 },
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

"use client";

type LogoSVGProps = {
  size?: "sm" | "md" | "lg" | "xl" | "custom";
  className?: string;
};

// Logo natural ratio is 542 × 343 (landscape ~1.58:1)
const sizeMap: Record<string, { w: number; h: number }> = {
  sm:     { w: 120, h: 76  },
  md:     { w: 160, h: 101 },
  lg:     { w: 200, h: 127 },
  xl:     { w: 260, h: 165 },
  custom: { w: 160, h: 101 },
};

export const LogoSVG = ({ size = "md", className }: LogoSVGProps) => {
  const { w, h } = sizeMap[size] ?? sizeMap.md;

  return (
    // Plain <img> handles SVGs with embedded base64 PNG far more reliably than next/image
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo.svg"
      alt="Rajeshwari Jewellers Logo"
      width={w}
      height={h}
      style={{ objectFit: "contain", display: "block" }}
      className={className}
    />
  );
};

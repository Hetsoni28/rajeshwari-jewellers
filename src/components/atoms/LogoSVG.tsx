"use client";

import Image from "next/image";

type LogoSVGProps = {
  size?: "sm" | "md" | "lg" | "xl" | "custom";
  className?: string;
};

const sizeMap = {
  sm: 44,
  md: 60,
  lg: 88,
  xl: 140,
  custom: undefined,
};

export const LogoSVG = ({ size = "md", className }: LogoSVGProps) => {
  const dim = sizeMap[size] ?? 60;

  return (
    <Image
      src="/images/logo.svg"
      alt="Rajeshwari Jewellers Logo"
      width={dim}
      height={dim}
      className={className}
      style={{ objectFit: "contain" }}
      priority
    />
  );
};

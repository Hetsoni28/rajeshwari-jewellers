"use client";

import { useEffect, useState } from "react";

type LogoTextProps = {
  solidBg?: boolean;
  darkText?: boolean;
  size?: "sm" | "md" | "lg";
};

export const LogoText = ({ solidBg = false, darkText, size = "md" }: LogoTextProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const textSize = size === "sm" ? "text-[13px]" : size === "md" ? "text-[15px]" : "text-[18px]";
  const tracking = size === "sm" ? "tracking-[0.22em]" : "tracking-[0.28em]";

  // On solid bg (scrolled / non-home) or when darkText is explicitly true, text is dark brown; else white
  const textColor = (darkText ?? solidBg) ? "#2A1A0A" : "#FFFFFF";

  return (
    <div
      className={`flex flex-col justify-center select-none`}
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateX(0)" : "translateX(-6px)",
        transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
      }}
    >
      {/* Single horizontal line: RAJESHWARI JEWELLERS */}
      <span
        className={`font-cinzel font-semibold ${textSize} ${tracking} whitespace-nowrap`}
        style={{ color: textColor, transition: "color 0.4s ease" }}
      >
        RAJESHWARI JEWELLERS
      </span>

      {/* Thin animated underline */}
      <div
        className="h-px mt-1"
        style={{
          background: "linear-gradient(90deg, #D4AF37, #F5E17A, #D4AF37)",
          width: mounted ? "100%" : "0%",
          transition: "width 0.8s cubic-bezier(0.4,0,0.2,1) 0.4s",
        }}
      />
    </div>
  );
};

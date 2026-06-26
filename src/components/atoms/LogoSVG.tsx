"use client";

import { useEffect, useState } from "react";

type LogoSVGProps = {
  size?: "sm" | "md" | "lg" | "xl" | "custom";
  className?: string;
};

export const LogoSVG = ({ size = "md", className }: LogoSVGProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const dim = size === "sm" ? 44 : size === "md" ? 54 : size === "lg" ? 80 : size === "xl" ? 140 : undefined;

  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Rajeshwari Jewellers Logo"
      className={className}
    >
      <defs>
        {/* Rich multi-stop metallic gold gradient */}
        <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E3C472" />
          <stop offset="25%" stopColor="#F9E596" />
          <stop offset="50%" stopColor="#B38728" />
          <stop offset="75%" stopColor="#FDF0A6" />
          <stop offset="100%" stopColor="#9C6F1C" />
        </linearGradient>
        
        {/* Metallic gold for text to make it pop safely */}
        <linearGradient id="logoText" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E3C472" />
          <stop offset="50%" stopColor="#B38728" />
          <stop offset="100%" stopColor="#8C5C18" />
        </linearGradient>

        <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />
        </filter>
        <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#B38728" floodOpacity="0.4" />
        </filter>
      </defs>

      <g opacity={mounted ? 1 : 0} style={{ transition: "opacity 1s ease" }}>
        
        {/* The Outer Ring */}
        <path 
          d="M 160 114 A 180 180 0 1 0 340 114" 
          fill="none" 
          stroke="url(#logoGold)" 
          strokeWidth="6" 
          strokeLinecap="round" 
          filter="url(#goldGlow)"
        />

        {/* The Inner Thin Ring for 3D bevel effect */}
        <path 
          d="M 166 122 A 172 172 0 1 0 334 122" 
          fill="none" 
          stroke="url(#logoGold)" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          opacity="0.7"
        />

        {/* The Lotus Logo at Top */}
        <g stroke="url(#logoGold)" strokeLinejoin="round" strokeLinecap="round" filter="url(#goldGlow)">
          {/* Center Petal */}
          <path d="M 250 140 C 235 110, 235 60, 250 30 C 265 60, 265 110, 250 140 Z" fill="none" strokeWidth="5" />
          
          {/* Middle Petals */}
          <path d="M 245 140 C 210 120, 190 80, 185 50 C 210 80, 230 110, 250 135 Z" fill="none" strokeWidth="4.5" />
          <path d="M 255 140 C 290 120, 310 80, 315 50 C 290 80, 270 110, 250 135 Z" fill="none" strokeWidth="4.5" />
          
          {/* Outer Petals */}
          <path d="M 235 140 C 180 130, 150 100, 130 70 C 160 90, 190 115, 245 135 Z" fill="none" strokeWidth="4" />
          <path d="M 265 140 C 320 130, 350 100, 370 70 C 340 90, 310 115, 255 135 Z" fill="none" strokeWidth="4" />
          
          {/* Bottom Swoops (Lotus Base) */}
          <path d="M 200 155 Q 250 175 300 155" fill="none" strokeWidth="4" />
          <path d="M 220 165 Q 250 180 280 165" fill="none" strokeWidth="2.5" />
        </g>

        {/* The RJ Monogram */}
        <g filter="url(#textShadow)">
          <text 
            x="215" 
            y="350" 
            fontFamily="'Cinzel', serif" 
            fontSize="210" 
            fontWeight="500"
            fill="url(#logoText)" 
            textAnchor="middle"
          >
            R
          </text>
          <text 
            x="305" 
            y="375" 
            fontFamily="'Cinzel', serif" 
            fontSize="240" 
            fontWeight="500"
            fill="url(#logoText)" 
            textAnchor="middle"
          >
            J
          </text>
        </g>

      </g>
    </svg>
  );
};


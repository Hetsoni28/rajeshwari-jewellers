import React from "react";
import { Loader2 } from "lucide-react";

export interface SpinnerProps {
  size?: number;
  className?: string;
  color?: string; // Optional hex color or tailwind class
}

export const Spinner = ({ size = 24, className = "", color }: SpinnerProps) => {
  return (
    <Loader2 
      size={size} 
      className={`animate-spin ${!color ? 'text-gold-dark' : ''} ${className}`}
      color={color?.startsWith('#') ? color : undefined}
    />
  );
};

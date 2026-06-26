import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  size?: "sm" | "md";
  className?: string;
}

export const Badge = ({ children, size = "sm", className = "", ...props }: BadgeProps) => {
  const sizeClasses = 
    size === "sm" ? "px-3 py-1 text-[8px]" : "px-3 py-1.5 text-[9px]";

  return (
    <span 
      className={`bg-white font-bold tracking-widest text-gold-dark uppercase shadow-sm ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

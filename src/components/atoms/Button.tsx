"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { duration, microEasing } from '@/lib/motion';

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: 'primary' | 'secondary' | 'outlined' | 'inverted' | 'custom';
  children: React.ReactNode;
};

export const Button = ({ variant = 'primary', className = '', children, ...props }: ButtonProps) => {
  const baseStyle = variant === 'custom'
    ? ""
    : "px-6 py-3 font-semibold tracking-wide uppercase text-sm transition-colors duration-300";

  const variants = {
    primary: "bg-gold text-brown hover:bg-gold-light",
    secondary: "bg-neutral-light text-brown hover:bg-white",
    outlined: "border border-gold text-gold hover:bg-gold hover:text-brown",
    inverted: "bg-brown text-gold hover:bg-neutral-800",
    custom: "",
  };

  return (
    <motion.button
      className={`${baseStyle} ${variants[variant]} ${className}`.trim()}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: duration.micro, ease: microEasing }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

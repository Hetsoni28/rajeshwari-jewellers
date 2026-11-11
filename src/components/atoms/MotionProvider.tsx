"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Site-wide motion settings: when the visitor has "reduce motion" turned on in their OS,
 * framer-motion skips transform/movement animations (opacity fades still run).
 */
export const MotionProvider = ({ children }: { children: ReactNode }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);

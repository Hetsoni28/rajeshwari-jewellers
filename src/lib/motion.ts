/**
 * Rajeshwari Jewellers — Global Luxury Motion System
 * Inspired by: Cartier, Van Cleef & Arpels, Rolex, Tiffany & Co.
 *
 * Philosophy: Motion communicates craftsmanship, trust, and exclusivity.
 * Every animation is purposeful, subtle, and hardware-accelerated.
 */

// ---------------------------------------------------------------------------
// Easing Curves — Curated for luxury brands
// ---------------------------------------------------------------------------

/** Primary luxury easing — slow start, smooth glide */
export const luxuryEasing = [0.25, 0.1, 0.25, 1.0] as const;

/** Cinematic entrance — used for large hero reveals */
export const cinematicEasing = [0.6, 0.05, 0.01, 0.95] as const;

/** Micro-interaction — fast, tactile, precise */
export const microEasing = [0.4, 0.0, 0.2, 1.0] as const;

/** Soft deceleration — for fading out / exits */
export const softExitEasing = [0.4, 0.0, 1.0, 1.0] as const;

// ---------------------------------------------------------------------------
// Duration Tokens
// ---------------------------------------------------------------------------
export const duration = {
  micro: 0.2,    // button taps, instant feedback
  fast: 0.35,   // hover states, small transitions
  base: 0.5,    // standard reveals
  slow: 0.7,    // section entrances
  cinematic: 1.1, // hero, page-level reveals
} as const;

// ---------------------------------------------------------------------------
// Page Load — Navbar first, then hero content progressively
// ---------------------------------------------------------------------------

export const navbarReveal = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: luxuryEasing, delay: 0.1 },
  },
};

// ---------------------------------------------------------------------------
// Hero Section Variants
// ---------------------------------------------------------------------------

export const heroContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.6, // wait for video to settle
    },
  },
};

export const heroVideoReveal = {
  hidden: { opacity: 0, scale: 1.04 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.cinematic, ease: cinematicEasing },
  },
};

export const heroHeadline = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: luxuryEasing },
  },
};

export const heroSubheading = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: luxuryEasing },
  },
};

export const heroCta = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: luxuryEasing },
  },
};

// ---------------------------------------------------------------------------
// Section Reveals — Fade up, triggered once on viewport entry
// ---------------------------------------------------------------------------

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: luxuryEasing },
  },
};

export const fadeInVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: duration.slow, ease: luxuryEasing },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

// ---------------------------------------------------------------------------
// Cards — Gentle elevation, no aggressive scaling
// ---------------------------------------------------------------------------

export const cardReveal = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: luxuryEasing },
  },
};

export const cardHover = {
  rest: {
    y: 0,
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    transition: { duration: duration.fast, ease: microEasing },
  },
  hover: {
    y: -5,
    boxShadow: "0 16px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(212,175,55,0.08)",
    transition: { duration: duration.fast, ease: microEasing },
  },
};

// ---------------------------------------------------------------------------
// Subtle scale reveal — images, feature blocks
// ---------------------------------------------------------------------------

export const subtleScaleVariant = {
  hidden: { opacity: 0, scale: 0.97 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.cinematic, ease: cinematicEasing },
  },
};

// ---------------------------------------------------------------------------
// Divider line reveal — horizontal gold lines
// ---------------------------------------------------------------------------

export const dividerReveal = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: duration.slow, ease: luxuryEasing },
  },
};

// ---------------------------------------------------------------------------
// Stat counter blocks
// ---------------------------------------------------------------------------

export const statReveal = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.base, ease: luxuryEasing },
  },
};

// ---------------------------------------------------------------------------
// Buttons — Premium micro-interactions
// ---------------------------------------------------------------------------

export const buttonHover = {
  hover: {
    scale: 1.015,
    transition: { duration: duration.micro, ease: microEasing },
  },
  tap: {
    scale: 0.985,
    transition: { duration: duration.micro, ease: microEasing },
  },
};

// ---------------------------------------------------------------------------
// Mobile menu — smooth slide from top
// ---------------------------------------------------------------------------

export const mobileMenuReveal = {
  hidden: { opacity: 0, y: -8, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: duration.base, ease: luxuryEasing },
  },
  exit: {
    opacity: 0,
    y: -8,
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: duration.fast, ease: softExitEasing },
  },
};

// ---------------------------------------------------------------------------
// Viewport defaults — shared across all whileInView calls
// ---------------------------------------------------------------------------

export const viewport = {
  once: true,
  margin: "-60px",
} as const;

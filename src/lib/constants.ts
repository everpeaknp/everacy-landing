/**
 * Application-wide constants and static configuration data.
 * Import specific constants to avoid pulling the entire module into bundles.
 */

export const SITE_NAME = "Everacy" as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

export const SOCIAL_LINKS = {
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
} as const;

/** Animation duration constants (ms) */
export const DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
  xSlow: 800,
} as const;

/** Breakpoints matching Tailwind defaults */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/** Three.js canvas defaults */
export const THREE_DEFAULTS = {
  fov: 75,
  near: 0.1,
  far: 1000,
  antialias: true,
  pixelRatioMax: 2,
} as const;

/**
 * ─────────────────────────────────────────────────
 *  EVERACY SITE THEME CONFIG
 *  Edit this file to change colors, content, and
 *  section configuration across the entire site.
 * ─────────────────────────────────────────────────
 */

// ── Brand Colors ──────────────────────────────────
export const brandColors = {
  // Logo / primary gradient
  logoBottom: "#118ec6",
  logoMid1: "#00a6cb",
  logoMid2: "#8cd4dd",
  logoTop1: "#b4e3fa",
  logoTop2: "#feffff",

  // UI accent colors
  primary: "#118ec6",
  primaryDark: "#0a6fa0",
  primaryLight: "#8cd4dd",
  accent: "#b4e3fa",
  white: "#ffffff",

  // Background tints used in arch scroll section
  // (changes as user scrolls through each panel)
  archBgColors: [
    "#e8f6fc", // cloud — pale blue
    "#eaf9f9", // AI — pale cyan
    "#f0f4ff", // web dev — pale periwinkle
    "#e6f3fa", // security — deeper pale blue
  ],
} as const;

// ── Arch Section (GSAP scroll-reveal) ────────────
export interface ArchCard {
  id: string;
  title: string;
  description: string;
  linkLabel: string;
  linkHref: string;
  /** Pill/button background color for the "Learn More" link */
  accentColor: string;
  /** Full-quality imagekit image URL */
  imageUrl: string;
  imageAlt: string;
}

export const archSectionCards: ArchCard[] = [
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    description:
      "Resilient, auto-scaling cloud architectures built on AWS, Azure, and GCP. Zero-downtime deployments, IaC pipelines, and 99.99% uptime SLAs — engineered for growth.",
    linkLabel: "Explore Cloud",
    linkHref: "/services#cloud",
    accentColor: "#7DD6FF",
    imageUrl: "/images/cloudcomputing.jpg",
    imageAlt: "Cloud Infrastructure"
  },
  {
    id: "app",
    title: "Mobile App Development",
    description:
      "Bespoke iOS and Android applications engineered for performance and engagement. We build native and cross-platform mobile experiences that bridge the gap between user needs and business goals.",
    linkLabel: "Explore Apps",
    linkHref: "/services#mobile",
    accentColor: "#8dd4dd",
    imageUrl: "/images/appdevelopment.png",
    imageAlt: "Mobile App Development"
  },
  {
    id: "web",
    title: "Web Engineering",
    description:
      "Pixel-perfect, performance-first web platforms. We architect fullstack systems with Next.js, TypeScript, and modern APIs — built to scale and optimized for every device.",
    linkLabel: "Explore Web",
    linkHref: "/services#web",
    accentColor: "#b4e3fa",
    imageUrl: "/images/webdevelopment.jpg",
    imageAlt: "Web Engineering"
  },
  {
    id: "saas",
    title: "SaaS Product Innovations",
    description:
      "Transforming vision into market-leading software. From multi-tenant architectures to scalable subscription engines, we build and iterate on SaaS products that drive recurring revenue and industry disruption.",
    linkLabel: "Explore SaaS",
    linkHref: "/services#saas",
    accentColor: "#118ec6",
    imageUrl: "/images/saas.jpg",
    imageAlt: "SaaS Product Innovations"
  },
];

// ── Hero Section ──────────────────────────────────
export const heroConfig = {
  tagline: "Engineering Tomorrow, Today",
  headline: "We Build\nWhat\nMatters.",
  subtext:
    "Everacy is an elite IT engineering firm delivering cloud, AI, and web solutions that scale — beautifully and reliably.",
  primaryCta: { label: "See Our Work", href: "/projects" },
  secondaryCta: { label: "Get In Touch", href: "/contact" },
  /** Liquid canvas image — replaces the default pinned image */
  liquidImageUrl:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
} as const;

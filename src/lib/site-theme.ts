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
  logoBottom: "#27446e",
  logoMid1: "#00a6cb",
  logoMid2: "#8cd4dd",
  logoTop1: "#b4e3fa",
  logoTop2: "#feffff",

  // UI accent colors
  primary: "#27446e",
  primaryDark: "#1d3354",
  primaryLight: "#8cd4dd",
  accent: "#b4e3fa",
  white: "#ffffff",

  // Background tints used in arch scroll section
  // (changes as user scrolls through each panel)
  archBgColors: [
    "#e8f6fc", // cloud — pale blue
    "#eaf9f9", // mobile — pale cyan
    "#f0f4ff", // web dev — pale periwinkle
    "#e6f3fa", // saas — deeper pale blue
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

// ── Testimonials ───────────────────────────────────
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  /** 1–5 */
  rating: number;
  /** Accent color for the card's glow / star */
  accent: string;
}

/** Pale blue shared by the SaaS arch panel and the testimonials section */
export const testimonialBg = "#f0f9ff";
export const processBg = "#f9fafb";


export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "Everacy rebuilt our cloud infra in 8 weeks. Zero downtime. Performance metrics doubled — I've never seen a team ship this clean.",
    name: "Marcus Chen",
    role: "CTO",
    company: "ScaleAI Systems",
    rating: 5,
    accent: "#118ec6",
  },
  {
    id: "t2",
    quote: "Their SaaS platform handles 2M daily users at 99.99% uptime. The code quality is surgical — every module exactly where it should be.",
    name: "Priya Nair",
    role: "VP Engineering",
    company: "Nexora Labs",
    rating: 5,
    accent: "#8cd4dd",
  },
  {
    id: "t3",
    quote: "We had a failed project from another agency. Everacy diagnosed the issues in 48 hours and had us live in three weeks.",
    name: "James Okafor",
    role: "Founder",
    company: "Fundra.io",
    rating: 5,
    accent: "#00a6cb",
  },
  {
    id: "t4",
    quote: "Our app went from a buggy MVP to a top-10 ranking after Everacy's rewrite. The UX polish and reliability is in another league.",
    name: "Sofia Reyes",
    role: "Product Director",
    company: "UrbanMove",
    rating: 5,
    accent: "#0a6fa0",
  },
  {
    id: "t5",
    quote: "Everacy thinks in systems, not features. They future-proofed our architecture so well we haven't needed a major refactor in two years.",
    name: "Liam Harrington",
    role: "Head of Tech",
    company: "FinStack Group",
    rating: 5,
    accent: "#118ec6",
  },
  {
    id: "t6",
    quote: "Delivered an enterprise dashboard for 500+ concurrent users — on time, on budget. Their performance obsession is a genuine competitive advantage.",
    name: "Ananya Mehta",
    role: "CEO",
    company: "DataPulse Inc.",
    rating: 5,
    accent: "#8cd4dd",
  },
];

// ── Process Section ───────────────────────────────
export const processConfig = {
  title: "Our Delivery Process",
  subtitle: "How we turn your vision into world-class infrastructure.",
  steps: [
    {
      step: "Step 1",
      title: "Discovery & Strategy",
      detail: "Deep-dive workshops to audit your stack and map your vision. We identify technical debt and define a clear transformation roadmap.",
    },
    {
      step: "Step 2",
      title: "Architecture Design",
      detail: "Designing resilient, cloud-native systems using enterprise patterns. We prioritize scalability, security, and developer experience.",
    },
    {
      step: "Step 3",
      title: "Execution & Build",
      detail: "Elite engineers shipping tested, high-performance code in agile sprints. Continuous delivery ensures you see progress every week.",
    },
    {
      step: "Step 4",
      title: "Scale & Optimize",
      detail: "Zero-downtime deployment followed by continuous performance tuning. We monitor and scale your systems as your user base grows.",
    },
  ],
} as const;

// ── Contact Section ───────────────────────────────
export const contactConfig = {
  title: "Let's Make Great Projects Together",
  buttonLabel: "Get in touch",
} as const;

// ── Team Section ──────────────────────────────────
export const teamConfig = {
  header: {
    title: "Our Team",
    subtitle: "The elite engineering force behind Everacy.",
  },
  members: [
    {
      id: "m1",
      name: "Niraj Adhikari",
      role: "Founder & Chief Architect",
      bio: "Visionary leader with a decade of experience in building hyper-scale systems and cloud-native ecosystems.",
      followers: "12M",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      links: {
        linkedin: "https://linkedin.com/in/nirajadhikari",
        github: "https://github.com/niraj",
      },
    },
    {
      id: "m2",
      name: "R.a.mohan Tiwari",
      role: "Lead Systems Engineer",
      bio: "Performance optimization specialist obsessed with zero-latency architectures and enterprise security.",
      followers: "8M",
      image: "https://images.unsplash.com/photo-1543132220-4bf3de6e10ae?q=80&w=800&auto=format&fit=crop",
      links: {
        linkedin: "https://linkedin.com/in/ramohan",
        github: "https://github.com/ramohan",
      },
    },
    {
      id: "m3",
      name: "Mandeep Karki",
      role: "Product Strategist",
      bio: "Bridging the gap between complex engineering and market-leading user experiences with surgical precision.",
      followers: "5M",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
      links: {
        linkedin: "https://linkedin.com/in/mandeep",
        github: "https://github.com/mandeep",
      },
    },
    {
      id: "m4",
      name: "Elias Thorne",
      role: "Lead Cloud Architect",
      bio: "Mastering the elements of resilient infrastructure and distributed systems.",
      followers: "12M",
      image: "/images/person.png",
      links: {
        linkedin: "https://linkedin.com/in/elias",
        github: "https://github.com/elias",
      },
    },
    {
      id: "m5",
      name: "Sofia Rodriguez",
      role: "SaaS Product Strategist",
      bio: "Bridging the gap between complex code and market-leading user experiences.",
      followers: "8M",
      image: "/images/person.png",
      links: {
        linkedin: "https://linkedin.com/in/sofia",
        github: "https://github.com/sofia",
      },
    },
    {
      id: "m6",
      name: "Malik Jabari",
      role: "Security Engineering Lead",
      bio: "Hardening enterprise landscapes and ensuring data integrity at scale.",
      followers: "5M",
      image: "/images/person.png",
      links: {
        linkedin: "https://linkedin.com/in/malik",
        github: "https://github.com/malik",
      },
    },
    {
      id: "m7",
      name: "Anaya Mehta",
      role: "Full-Stack Engineer",
      bio: "Surgical precision in backend logic and immersive frontend interactions.",
      followers: "15M",
      image: "/images/person.png",
      links: {
        linkedin: "https://linkedin.com/in/anaya",
        github: "https://github.com/anaya",
      },
    },
    {
      id: "m8",
      name: "Marcus Harrington",
      role: "AI Integration specialist",
      bio: "Empowering systems with predictive intelligence and autonomous workflows.",
      followers: "3M",
      image: "/images/person.png",
      links: {
        linkedin: "https://linkedin.com/in/marcus",
        github: "https://github.com/marcus",
      },
    },
    {
      id: "m9",
      name: "Priya Nair",
      role: "Performance Optimizer",
      bio: "Obsessed with zero-latency benchmarks and sub-second load times.",
      followers: "10M",
      image: "/images/person.png",
      links: {
        linkedin: "https://linkedin.com/in/priya",
        github: "https://github.com/priya",
      },
    },
  ],
} as const;

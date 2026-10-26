/**
 * Static content for the redesigned /services page.
 *
 * Phase 1: the UI is interactive but fully static. Every block below is shaped
 * so it can later be replaced by a Django-driven payload without touching the
 * components (each export maps cleanly to one admin model / section).
 *
 * NOTE: the numbers in `servicesStats` are PLACEHOLDERS. Confirm real figures
 * before launch so we never publish an unverified claim.
 */

export interface ServicesStat {
  value: number;
  suffix: string;
  label: string;
}

export const servicesStats: ServicesStat[] = [
  { value: 50, suffix: "+", label: "Products shipped" },
  { value: 30, suffix: "+", label: "Engineers & designers" },
  { value: 98, suffix: "%", label: "Client retention" },
  { value: 24, suffix: "h", label: "Average response time" },
];

export interface HeroCapability {
  title: string;
  blurb: string;
  icon: "code" | "palette" | "cloud" | "growth";
}

export const heroCapabilities: HeroCapability[] = [
  { title: "Web & Mobile Engineering", blurb: "Fast, accessible products built on modern stacks.", icon: "code" },
  { title: "Product & UI/UX Design", blurb: "Interfaces people understand in seconds.", icon: "palette" },
  { title: "Cloud & DevOps", blurb: "Pipelines and infrastructure that scale quietly.", icon: "cloud" },
  { title: "SEO & Growth", blurb: "Be found, measured and improved continuously.", icon: "growth" },
];

export interface ValueCard {
  title: string;
  text: string;
  icon: "shield" | "zap" | "users";
}

export const valueCards: ValueCard[] = [
  {
    title: "Engineered for reliability",
    text: "We build with strict type safety, automated test suites, and monitored release pipelines so your product launches calmly, scales predictably under real traffic, and stays free of brittle technical debt.",
    icon: "shield",
  },
  {
    title: "Speed without shortcuts",
    text: "Tight feedback loops, clickable prototypes, and weekly live staging demos put working software in your hands early — letting you validate with real users while maintaining rock-solid architecture.",
    icon: "zap",
  },
  {
    title: "A team that stays with you",
    text: "You work directly with the senior engineers and product designers shaping your system from day one — the same specialists who launch, measure, and continuously evolve your platform post-release.",
    icon: "users",
  },
];

export interface EngagementModel {
  title: string;
  text: string;
  points: string[];
  icon: "users" | "target" | "layers";
}

export const engagementModels: EngagementModel[] = [
  {
    title: "Dedicated team",
    text: "A cross-functional squad of senior engineers, product designers, and delivery leads that works as a seamless extension of your company — aligned on one shared roadmap and shipping every week.",
    points: ["Engineers, designer and PM", "Flexible monthly scope", "Best for long-term products"],
    icon: "users",
  },
  {
    title: "Fixed-scope project",
    text: "A clearly defined product outcome with a transparent milestone schedule, architecture blueprint, and fixed budget agreed up front — ideal for new product launches, MVPs, and platform rebuilds.",
    points: ["Detailed estimate and plan", "Milestone-based delivery", "Best for launches and MVPs"],
    icon: "target",
  },
  {
    title: "Team extension",
    text: "Embed senior engineering and design specialists directly into your in-house workflow, Slack, and GitHub to unblock critical delivery, close capability gaps, and scale velocity up or down on demand.",
    points: ["Embedded in your workflow", "Scale up or down quickly", "Best for capacity gaps"],
    icon: "layers",
  },
];

export interface SkillTab {
  id: string;
  label: string;
  intro: string;
  items: { title: string; text: string }[];
  tech: string[];
}

export const skillTabs: SkillTab[] = [
  {
    id: "engineering",
    label: "Engineering",
    intro: "Production-grade software across web, mobile and backend.",
    items: [
      { title: "Web applications", text: "Fast, SEO-friendly apps with Next.js and React." },
      { title: "Mobile apps", text: "Cross-platform apps for iOS and Android with Flutter." },
      { title: "APIs & backends", text: "Secure, documented services built with Django." },
      { title: "E-commerce", text: "Storefronts and checkout flows that convert." },
      { title: "Dashboards", text: "Data-rich admin tools your team enjoys using." },
      { title: "Modernisation", text: "Move legacy systems to a maintainable stack." },
    ],
    tech: ["Next.js", "React", "TypeScript", "Django", "Flutter", "PostgreSQL"],
  },
  {
    id: "design",
    label: "Design",
    intro: "Research-led design that is beautiful and easy to build.",
    items: [
      { title: "UI/UX design", text: "Flows, wireframes and polished interfaces." },
      { title: "Design systems", text: "Reusable components for consistent products." },
      { title: "Prototyping", text: "Clickable prototypes to validate before building." },
      { title: "Brand identity", text: "Logos, colour and type that feel like you." },
      { title: "Landing pages", text: "Focused pages designed to turn visits into leads." },
      { title: "Usability audits", text: "Find and fix friction in existing products." },
    ],
    tech: ["Figma", "Tailwind CSS", "Adobe", "Canva"],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    intro: "Reliable delivery pipelines and infrastructure that scale.",
    items: [
      { title: "CI/CD pipelines", text: "Automated build, test and deploy on every push." },
      { title: "Containers", text: "Docker and Kubernetes for repeatable environments." },
      { title: "Cloud migration", text: "Move workloads safely with minimal downtime." },
      { title: "Monitoring", text: "Logs, metrics and alerts before users notice." },
      { title: "Security hardening", text: "Secrets, access control and dependency hygiene." },
      { title: "Cost optimisation", text: "Right-size infrastructure and cut waste." },
    ],
    tech: ["Docker", "Kubernetes", "Google Cloud", "GitHub Actions", "Vercel"],
  },
  {
    id: "growth",
    label: "SEO & Growth",
    intro: "Get discovered, understand your audience and keep improving.",
    items: [
      { title: "Technical SEO", text: "Crawlable, fast, structured pages that rank." },
      { title: "Performance", text: "Core Web Vitals tuning for speed and conversion." },
      { title: "Analytics", text: "Clean tracking and dashboards you can trust." },
      { title: "Paid campaigns", text: "Search and social ads tied to real outcomes." },
      { title: "Social presence", text: "Consistent content across your key channels." },
      { title: "Email & lifecycle", text: "Automations that nurture and retain customers." },
    ],
    tech: ["Google Analytics", "Google Search Console", "Meta Ads", "Looker Studio"],
  },
];

export interface ProcessPhase {
  id: string;
  label: string;
  title: string;
  text: string;
  deliverables: string[];
  duration: string;
}

export const processPhases: ProcessPhase[] = [
  {
    id: "discover",
    label: "Discover",
    title: "Understand the problem before the solution",
    text: "We map goals, users and constraints in a short workshop so everyone builds toward the same outcome.",
    deliverables: ["Goals & success metrics", "User and stakeholder notes", "Scope and risk summary"],
    duration: "1\u20132 weeks",
  },
  {
    id: "design",
    label: "Design",
    title: "Shape the experience, then prove it",
    text: "Flows and interface designs become clickable prototypes you can test with real users early.",
    deliverables: ["Wireframes & UI design", "Interactive prototype", "Design system foundations"],
    duration: "2\u20134 weeks",
  },
  {
    id: "build",
    label: "Build",
    title: "Ship in small, demoable increments",
    text: "Weekly releases with automated testing keep quality high and give you constant visibility.",
    deliverables: ["Weekly working demos", "Tested, reviewed code", "Staging environment"],
    duration: "4\u201312 weeks",
  },
  {
    id: "launch",
    label: "Launch & grow",
    title: "Go live and keep improving",
    text: "We launch safely, monitor closely and use real data to decide what to improve next.",
    deliverables: ["Production release", "Monitoring & alerts", "Ongoing support plan"],
    duration: "Ongoing",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const servicesFaqs: FaqItem[] = [
  {
    question: "How do we get started?",
    answer:
      "Send us a short brief through the contact page. We reply within one business day to schedule a discovery call, then follow up with a proposal and timeline.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "An MVP usually takes 8\u201312 weeks and larger platforms are delivered in phases. We give you a realistic timeline after discovery.",
  },
  {
    question: "Can you work with our existing team or codebase?",
    answer:
      "Yes. We regularly join existing teams, audit current code and modernise it step by step instead of forcing a rewrite.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes. We offer monitoring, maintenance and improvement plans so your product keeps getting better after release.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Fixed price for well-defined scopes, or a monthly rate for dedicated teams. Either way you see the plan and cost before we start.",
  },
];

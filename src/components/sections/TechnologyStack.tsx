/* ─────────────────────────────────────────────────────────
   TechnologyStack — Enterprise Architectural Matrix
   - Responsive & spacious: dynamically adapts to the tools passed
   - Accurate categorization: maps technologies to their correct
     engineering pillars (Backend, Infrastructure, Mobile, Frontend, Specialized)
     using CMS category slugs or authoritative key lookups
   - Concise, crisp roles with zero truncation or ugly ".." ellipses
   - Sharp, boxy architectural geometry (rounded-none throughout)
   ───────────────────────────────────────────────────────── */
"use client";

import { useMemo } from "react";
import { TechnologyMark } from "@/components/sections/ServiceContentIcon";
import type { TechnologyStackItemData } from "@/lib/api";

type TechnologyItem = TechnologyStackItemData;

interface PillarDefinition {
  id: string;
  number: string;
  title: string;
  summary: string;
  tools: {
    name: string;
    role: string;
    logoUrl?: string | null;
  }[];
}

const PILLAR_METADATA: Record<
  string,
  {
    id: string;
    title: string;
    summary: string;
  }
> = {
  frontend: {
    id: "frontend",
    title: "FRONTEND & WEB",
    summary: "Sub-second edge rendering, accessible UI, and type-safe component design.",
  },
  mobile: {
    id: "mobile",
    title: "MOBILE NATIVE",
    summary: "Hardware-accelerated iOS & Android applications from a single codebase.",
  },
  backend: {
    id: "backend",
    title: "BACKEND & APIS",
    summary: "Typed, high-throughput microservices, background queues, and domain logic.",
  },
  infrastructure: {
    id: "infrastructure",
    title: "DATA & CLOUD INFRA",
    summary: "ACID relational storage, distributed caching, and zero-downtime CI/CD.",
  },
  specialized: {
    id: "specialized",
    title: "SPECIALIZED TOOLING & APIS",
    summary: "Targeted platforms and integrations configured for this service domain.",
  },
};

const DEFAULT_PILLARS: PillarDefinition[] = [
  {
    id: "frontend",
    number: "01",
    title: "FRONTEND & WEB",
    summary: "Sub-second edge rendering, accessible UI, and type-safe component design.",
    tools: [
      { name: "Next.js", role: "SSR & Edge React" },
      { name: "React", role: "Component Architecture" },
      { name: "TypeScript", role: "Static Type Safety" },
      { name: "Tailwind CSS", role: "Design System Tokens" },
      { name: "Redux", role: "Predictable State Flow" },
      { name: "HTML5", role: "Semantic Web Standards" },
    ],
  },
  {
    id: "mobile",
    number: "02",
    title: "MOBILE NATIVE",
    summary: "Hardware-accelerated iOS & Android applications from a single codebase.",
    tools: [
      { name: "Flutter", role: "60fps Multi-Platform" },
      { name: "React Native", role: "Native Mobile UI" },
      { name: "Android", role: "Kotlin & Android APIs" },
      { name: "iOS", role: "Swift & Apple Platform" },
      { name: "Firebase", role: "Realtime Data & Push" },
      { name: "Socket.IO", role: "Low-Latency WebSockets" },
    ],
  },
  {
    id: "backend",
    number: "03",
    title: "BACKEND & APIS",
    summary: "Typed, high-throughput microservices, background queues, and domain logic.",
    tools: [
      { name: "FastAPI", role: "Async OpenAPI REST" },
      { name: "Django", role: "Enterprise Python" },
      { name: "Python", role: "Core Backend Runtime" },
      { name: "Node.js", role: "Event-Driven Network" },
      { name: "Go", role: "High-Concurrency Core" },
      { name: "Rust", role: "Memory-Safe Systems" },
    ],
  },
  {
    id: "infrastructure",
    number: "04",
    title: "DATA & CLOUD INFRA",
    summary: "ACID relational storage, distributed caching, and zero-downtime CI/CD.",
    tools: [
      { name: "PostgreSQL", role: "ACID Relational DB" },
      { name: "MongoDB", role: "Document Persistence" },
      { name: "Redis", role: "In-Memory Cache" },
      { name: "Docker", role: "Container Packaging" },
      { name: "Kubernetes", role: "Cluster Orchestration" },
      { name: "GitHub Actions", role: "Automated CI/CD" },
    ],
  },
];

const KNOWN_PILLAR_MAP: Record<string, "frontend" | "mobile" | "backend" | "infrastructure" | "specialized"> = {
  // Frontend
  nextjs: "frontend",
  react: "frontend",
  typescript: "frontend",
  tailwindcss: "frontend",
  tailwind: "frontend",
  html5: "frontend",
  css: "frontend",
  javascript: "frontend",
  redux: "frontend",
  vue: "frontend",
  angular: "frontend",
  bootstrap: "frontend",

  // Mobile
  flutter: "mobile",
  reactnative: "mobile",
  android: "mobile",
  ios: "mobile",
  swift: "mobile",
  kotlin: "mobile",

  // Backend & APIs
  fastapi: "backend",
  django: "backend",
  python: "backend",
  nodejs: "backend",
  expressjs: "backend",
  php: "backend",
  java: "backend",
  go: "backend",
  ruby: "backend",
  rust: "backend",
  firebase: "backend",
  socketio: "backend",
  restapi: "backend",
  graphql: "backend",

  // Data & Cloud Infra (Databases + Cloud / DevOps)
  postgresql: "infrastructure",
  mysql: "infrastructure",
  mongodb: "infrastructure",
  redis: "infrastructure",
  sqlite: "infrastructure",
  mariadb: "infrastructure",
  docker: "infrastructure",
  dockercompose: "infrastructure",
  kubernetes: "infrastructure",
  githubactions: "infrastructure",
  vercel: "infrastructure",
  aws: "infrastructure",
  azure: "infrastructure",
  googlecloud: "infrastructure",
  terraform: "infrastructure",

  // Specialized / Other Tools
  cloudinary: "specialized",
  googlesearchconsole: "specialized",
  googleanalytics: "specialized",
  googleads: "specialized",
  metaads: "specialized",
  metabusinesssuite: "specialized",
  facebook: "specialized",
  instagram: "specialized",
  figma: "specialized",
  figjam: "specialized",
  adobeillustrator: "specialized",
  googledocs: "specialized",
  lookerstudio: "specialized",
  metacapi: "specialized",
};

const KNOWN_ROLES: Record<string, string> = {
  nextjs: "SSR & Edge React",
  react: "Component Architecture",
  typescript: "Static Type Safety",
  tailwindcss: "Design System Tokens",
  tailwind: "Design System Tokens",
  html5: "Semantic Web Standards",
  css: "Modern Cascading Styles",
  javascript: "Dynamic Client Scripting",
  redux: "Predictable State Flow",
  vue: "Progressive Framework",
  angular: "Enterprise Frontend",
  bootstrap: "Rapid UI Components",
  flutter: "60fps Multi-Platform",
  reactnative: "Native Mobile UI",
  android: "Kotlin & Android APIs",
  ios: "Swift & Apple Platform",
  swift: "Swift & Apple Platform",
  kotlin: "Kotlin & Android APIs",
  fastapi: "Async OpenAPI REST",
  python: "Core Backend Runtime",
  nodejs: "Event-Driven Network",
  django: "Enterprise Python",
  expressjs: "Lightweight API Engine",
  php: "Server-Side Scripting",
  java: "Enterprise JVM Runtime",
  go: "High-Concurrency Core",
  ruby: "Convention & Rapid Dev",
  rust: "Memory-Safe Systems",
  firebase: "Realtime Data & Push",
  socketio: "Low-Latency WebSockets",
  restapi: "RESTful Service Binds",
  graphql: "Typed Schema Queries",
  postgresql: "ACID Relational DB",
  mysql: "Relational Persistence",
  mongodb: "Document Persistence",
  redis: "In-Memory Cache",
  sqlite: "Embedded Zero-Config DB",
  mariadb: "High-Performance SQL",
  docker: "Container Packaging",
  dockercompose: "Local Multi-Container Dev",
  kubernetes: "Cluster Orchestration",
  vercel: "Global Edge Network",
  githubactions: "Automated CI/CD",
  aws: "Global Cloud Infra",
  azure: "Enterprise Cloud Infra",
  googlecloud: "Google Cloud Platform",
  terraform: "Declarative Infra as Code",
  cloudinary: "Domain Platform & Tooling",
  figma: "UI/UX & Design Systems",
  figjam: "Collaborative Whiteboarding",
  adobeillustrator: "Vector Asset Design",
  googledocs: "Specifications & Collab",
  googleanalytics: "User Behavior Telemetry",
  googlesearchconsole: "Indexing & Search Insights",
  googleads: "Domain Platform & Tooling",
  metaads: "Paid Social Acquisition",
  metabusinesssuite: "Cross-Platform Ads & Pages",
  facebook: "Social Network Graph",
  instagram: "Visual Brand Channels",
  lookerstudio: "BI Analytics & Dashboards",
  metacapi: "Conversions & Tracking API",
};

function normalizeKey(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function resolvePillarId(
  name: string,
  categorySlug?: string
): "frontend" | "mobile" | "backend" | "infrastructure" | "specialized" {
  if (categorySlug) {
    const slug = categorySlug.toLowerCase();
    if (slug === "frontend") return "frontend";
    if (slug === "mobile") return "mobile";
    if (slug === "backend-apis" || slug === "backend") return "backend";
    if (
      slug === "databases" ||
      slug === "cloud-devops" ||
      slug === "devops" ||
      slug === "infrastructure"
    ) {
      return "infrastructure";
    }
    if (slug === "other-tools" || slug === "specialized") return "specialized";
  }

  const key = normalizeKey(name);
  return KNOWN_PILLAR_MAP[key] ?? "specialized";
}

export function TechnologyStack({
  items,
  technologies,
}: {
  items?: TechnologyItem[] | null;
  technologies?: string[] | null;
  compact?: boolean;
  idPrefix?: string;
}) {
  // Determine if specific technologies were passed for a service / project / home
  const requestedTools = useMemo<{ name: string; categorySlug?: string; logoUrl?: string | null }[]>(() => {
    const map = new Map<string, { name: string; categorySlug?: string; logoUrl?: string | null }>();

    (items ?? []).forEach((item) => {
      const key = normalizeKey(item.name);
      if (!map.has(key)) {
        map.set(key, {
          name: item.name,
          categorySlug: item.category?.slug,
          logoUrl: item.logo_url ?? null,
        });
      }
    });

    (technologies ?? []).forEach((name) => {
      const key = normalizeKey(name);
      if (!map.has(key)) {
        map.set(key, {
          name,
          categorySlug: undefined,
          logoUrl: null,
        });
      }
    });

    return Array.from(map.values());
  }, [items, technologies]);

  // Compute active pillars
  const pillars = useMemo<PillarDefinition[]>(() => {
    // If no specific tools were filtered, show full default 4 pillars
    if (requestedTools.length === 0) {
      return DEFAULT_PILLARS;
    }

    // Group requested tools by pillar
    const groups: Record<
      "frontend" | "mobile" | "backend" | "infrastructure" | "specialized",
      { name: string; role: string; logoUrl?: string | null }[]
    > = {
      frontend: [],
      mobile: [],
      backend: [],
      infrastructure: [],
      specialized: [],
    };

    const seenInPillar = new Set<string>();

    requestedTools.forEach((tool) => {
      const pillarId = resolvePillarId(tool.name, tool.categorySlug);
      const key = normalizeKey(tool.name);
      const dedupKey = `${pillarId}:${key}`;

      if (!seenInPillar.has(dedupKey)) {
        seenInPillar.add(dedupKey);
        groups[pillarId].push({
          name: tool.name,
          role: KNOWN_ROLES[key] ?? "Domain Platform & Tooling",
          logoUrl: tool.logoUrl ?? null,
        });
      }
    });

    // Build ordered list of active pillars that have tools
    const pillarOrder: ("frontend" | "mobile" | "backend" | "infrastructure" | "specialized")[] = [
      "frontend",
      "mobile",
      "backend",
      "infrastructure",
      "specialized",
    ];

    const result: PillarDefinition[] = [];

    pillarOrder.forEach((pillarId) => {
      const tools = groups[pillarId];
      if (tools.length > 0) {
        const meta = PILLAR_METADATA[pillarId];
        result.push({
          id: meta.id,
          number: String(result.length + 1).padStart(2, "0"),
          title: meta.title,
          summary: meta.summary,
          tools,
        });
      }
    });

    return result.length > 0 ? result : DEFAULT_PILLARS;
  }, [requestedTools]);

  // Responsive card width class based on pillar count
  // When 5 pillars are present, 3 sit on top row, and 2 cards below are aligned in the center!
  const cardWidthClass = useMemo(() => {
    switch (pillars.length) {
      case 1:
        return "w-full max-w-xl";
      case 2:
        return "w-full sm:w-[calc(50%-12px)] max-w-lg";
      case 3:
        return "w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[390px]";
      case 4:
        return "w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-[320px]";
      case 5:
        // Row 1: 3 cards. Row 2: 2 cards aligned center under those 3 cards!
        return "w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[390px]";
      default:
        return "w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-[390px]";
    }
  }, [pillars.length]);

  return (
    <div className="w-full text-left" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Dynamic Architectural Matrix Grid (Centered layout with 2 cards centered below 3 cards) */}
      <div className="flex flex-wrap justify-center gap-6 w-full">
        {pillars.map((pillar) => {
          // Keep a strict cap of max 6 tools per card as requested
          const visibleTools = pillar.tools.slice(0, 6);

          return (
            <div
              key={pillar.id}
              className={`group flex flex-col justify-between rounded-none border border-[#dce8ec] bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#008da4] hover:shadow-[5px_5px_0px_0px_#008da4] sm:p-6 ${cardWidthClass}`}
            >
              <div>
                {/* Pillar Header */}
                <div className="mb-4 flex items-center justify-between border-b border-[#e4ecef] pb-3 sm:mb-5 sm:pb-3.5">
                  <span className="font-mono text-xs font-bold text-[#008da4]">
                    [ {pillar.number} ]
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#64748b]">
                    {visibleTools.length} CORE TOOLS
                  </span>
                </div>

                <h3 className="text-base font-extrabold uppercase tracking-tight text-[#0d2a4a] sm:text-lg">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#586d82] sm:text-[13px]">
                  {pillar.summary}
                </p>

                {/* Tool List with Logo Marks & Explicit Sub-labels */}
                <div className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
                  {visibleTools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex items-center gap-3.5 border border-[#e4ecef] bg-[#f8fafc] p-2.5 transition-colors group-hover:border-[#cde0e5] group-hover:bg-white"
                    >
                      {/* Logo Mark: uses logoUrl if provided, else fallback SVG */}
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#e4ecef] bg-white text-[#0d2a4a]">
                        <TechnologyMark name={tool.name} logoUrl={tool.logoUrl} />
                      </div>

                      {/* Tool Name & Clear Role Sub-label */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-[#0d2a4a] sm:text-sm">
                          {tool.name}
                        </p>
                        <p className="font-mono text-[10.5px] text-[#64748b] leading-tight sm:text-[11px]">
                          {tool.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boxy Architectural Footer */}
              <div className="mt-6 flex items-center justify-between border-t border-[#e4ecef] pt-3 text-[10px] font-mono text-[#64748b] uppercase tracking-wider">
                <span>STANDARDS LOCK</span>
                <span className="font-bold text-[#008da4]">PRODUCTION READY</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

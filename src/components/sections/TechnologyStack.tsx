/* ─────────────────────────────────────────────────────────
   TechnologyStack — Enterprise 4-Pillar Architectural Matrix
   Eliminates awkward empty gaps and half-blank rows:
   - 4 balanced engineering pillars visible simultaneously
   - Uniform height and structured density
   - Official SVG tech marks + verified 1-line engineering roles
   - Tactile hover highlights and clean architectural borders
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

const DEFAULT_PILLARS: PillarDefinition[] = [
  {
    id: "frontend",
    number: "01",
    title: "FRONTEND & WEB",
    summary: "Sub-second edge rendering, accessible UI, and type-safe component design.",
    tools: [
      { name: "Next.js", role: "SSR & Edge React Framework" },
      { name: "React", role: "Component UI Architecture" },
      { name: "TypeScript", role: "Static End-to-End Type Safety" },
      { name: "Tailwind CSS", role: "Utility Styling & Design Tokens" },
      { name: "Redux", role: "Predictable Client State Flow" },
      { name: "HTML5", role: "Semantic Accessible Standards" },
    ],
  },
  {
    id: "mobile",
    number: "02",
    title: "MOBILE NATIVE",
    summary: "Hardware-accelerated iOS & Android applications from a single codebase.",
    tools: [
      { name: "Flutter", role: "60fps Native iOS & Android Engine" },
      { name: "React Native", role: "Native Mobile Powered by React" },
      { name: "Android", role: "Native Material & Device APIs" },
      { name: "iOS", role: "Swift & Apple Platform Standards" },
      { name: "Firebase", role: "Realtime Sync & Push Routing" },
      { name: "Socket.IO", role: "Low-Latency WebSocket Streaming" },
    ],
  },
  {
    id: "backend",
    number: "03",
    title: "BACKEND & APIS",
    summary: "Typed, high-throughput microservices, background queues, and domain logic.",
    tools: [
      { name: "FastAPI", role: "Async Python OpenAPI Backend" },
      { name: "Django", role: "Enterprise Python Web Framework" },
      { name: "Python", role: "Core Backend & Data Runtime" },
      { name: "Node.js", role: "Event-Driven Network Runtime" },
      { name: "Express.js", role: "Lightweight Middleware API Engine" },
      { name: "Go", role: "High-Concurrency Microservices" },
    ],
  },
  {
    id: "infrastructure",
    number: "04",
    title: "DATA & CLOUD INFRA",
    summary: "ACID relational storage, distributed caching, and zero-downtime CI/CD.",
    tools: [
      { name: "PostgreSQL", role: "ACID Relational Storage Engine" },
      { name: "Redis", role: "Sub-Millisecond In-Memory Cache" },
      { name: "Docker", role: "Deterministic Container Packaging" },
      { name: "Kubernetes", role: "Container Cluster Orchestration" },
      { name: "GitHub Actions", role: "Automated Test & Deploy CI/CD" },
      { name: "Vercel", role: "Global Edge Edge Delivery Network" },
    ],
  },
];

const COMPACT_TOOL_ROLES: Record<string, string> = {
  nextjs: "SSR & Edge React Framework",
  react: "Component UI Architecture",
  typescript: "Static End-to-End Type Safety",
  tailwindcss: "Utility Styling & Design Tokens",
  html5: "Semantic Accessible Standards",
  redux: "Predictable Client State Flow",
  flutter: "60fps Native iOS & Android Engine",
  reactnative: "Native Mobile Powered by React",
  fastapi: "Async Python OpenAPI Backend",
  python: "Core Backend & Data Runtime",
  nodejs: "Event-Driven Network Runtime",
  django: "Enterprise Python Web Framework",
  postgresql: "ACID Relational Storage Engine",
  mongodb: "Flexible Document Persistence",
  redis: "Sub-Millisecond In-Memory Cache",
  docker: "Deterministic Container Packaging",
  kubernetes: "Container Cluster Orchestration",
  vercel: "Global Edge Edge Delivery",
  githubactions: "Automated Test & Deploy CI/CD",
  aws: "Global Cloud Infrastructure",
  android: "Native Material & Device APIs",
  ios: "Swift & Apple Platform Standards",
  firebase: "Realtime Sync & Push Routing",
  socketio: "Low-Latency WebSocket Streaming",
  go: "High-Concurrency Microservices",
  rust: "Memory-Safe Systems Programming",
};

export function TechnologyStack({
  items,
}: {
  items?: TechnologyItem[] | null;
  technologies?: string[] | null;
  compact?: boolean;
  idPrefix?: string;
}) {
  // Map any backend logo URLs to populate the pillars if available
  const pillars = useMemo<PillarDefinition[]>(() => {
    if (!items || items.length === 0) return DEFAULT_PILLARS;

    const logoMap = new Map<string, string | null>();
    items.forEach((item) => {
      const key = item.name.toLowerCase().replace(/[^a-z0-9]+/g, "");
      if (item.logo_url) logoMap.set(key, item.logo_url);
    });

    return DEFAULT_PILLARS.map((p) => ({
      ...p,
      tools: p.tools.map((t) => {
        const key = t.name.toLowerCase().replace(/[^a-z0-9]+/g, "");
        return {
          ...t,
          role: COMPACT_TOOL_ROLES[key] ?? t.role,
          logoUrl: logoMap.get(key) ?? null,
        };
      }),
    }));
  }, [items]);

  return (
    <div className="w-full" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* 4-Pillar Architectural Matrix Grid (Balanced, Dense, Zero Empty Gaps) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((pillar) => (
          <div
            key={pillar.id}
            className="group flex flex-col justify-between rounded-none border border-[#dce8ec] bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#008da4] hover:shadow-[4px_4px_0px_0px_#008da4] sm:p-6"
          >
            <div>
              {/* Pillar Header */}
              <div className="flex items-center justify-between border-b border-[#f0f4f6] pb-3">
                <span className="font-mono text-xs font-black text-[#008da4]">
                  [ {pillar.number} ]
                </span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#7a8f9f]">
                  {pillar.tools.length} CORE TOOLS
                </span>
              </div>

              {/* Pillar Title & Summary */}
              <div className="mt-4">
                <h3 className="text-base font-black tracking-tight text-[#0d2a4a] uppercase transition-colors group-hover:text-[#008da4]">
                  {pillar.title}
                </h3>
                <p className="mt-1.5 text-xs font-medium leading-relaxed text-[#5c7288]">
                  {pillar.summary}
                </p>
              </div>

              {/* Vertical Stack of Clean Tool Rows */}
              <div className="mt-5 space-y-2.5">
                {pillar.tools.map((tool) => (
                  <div
                    key={`${pillar.id}-${tool.name}`}
                    className="flex items-center gap-3 rounded-none border border-[#f0f4f6] bg-[#fbfdfd] p-2.5 transition-all duration-150 hover:border-[#008da4]/40 hover:bg-white hover:shadow-xs"
                  >
                    {/* Tool Logo Frame */}
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-none border border-[#e2ecee] bg-white p-1.5">
                      <TechnologyMark
                        name={tool.name}
                        logoUrl={tool.logoUrl}
                        className="h-5 w-5 object-contain"
                      />
                    </span>

                    {/* Tool Info */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-[#0d2a4a]">
                        {tool.name}
                      </p>
                      <p className="truncate text-[10px] font-mono text-[#7a8f9f]">
                        {tool.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pillar Footer */}
            <div className="mt-6 border-t border-[#f0f4f6] pt-3 flex items-center justify-between text-[10px] font-mono text-[#7a8f9f]">
              <span>STANDARDS LOCK</span>
              <span className="font-bold text-[#008da4]">PRODUCTION READY</span>
            </div>
          </div>
        ))}
      </div>

      {/* Auxiliary Design, Analytics & Growth Ecosystem Strip */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border border-[#dce8ec] bg-[#f8fbfc] px-5 py-3.5 text-xs text-[#5c7288]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#008da4]">
            DESIGN &amp; GROWTH ECOSYSTEM:
          </span>
          {["Figma", "FigJam", "Google Analytics", "Google Search Console", "Meta CAPI", "Docker Compose"].map((tool) => (
            <span
              key={tool}
              className="border border-[#dce8ec] bg-white px-2 py-0.5 font-mono text-[11px] font-medium text-[#405669]"
            >
              {tool}
            </span>
          ))}
        </div>

        <span className="font-mono text-[11px] font-bold text-[#008da4]">
          ENTERPRISE ARCHITECTURE
        </span>
      </div>
    </div>
  );
}

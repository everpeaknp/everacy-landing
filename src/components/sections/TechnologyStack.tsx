/* ─────────────────────────────────────────────────────────
   TechnologyStack — Enterprise Architectural Matrix
   - Responsive & spacious: dynamically adapts to the tools passed
   - No congested columns: on service pages, displays only the relevant
     engineering pillars or a balanced, spacious grid
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
      { name: "Express.js", role: "Lightweight API Engine" },
      { name: "Go", role: "High-Concurrency Core" },
    ],
  },
  {
    id: "infrastructure",
    number: "04",
    title: "DATA & CLOUD INFRA",
    summary: "ACID relational storage, distributed caching, and zero-downtime CI/CD.",
    tools: [
      { name: "PostgreSQL", role: "ACID Relational DB" },
      { name: "Redis", role: "In-Memory Cache" },
      { name: "Docker", role: "Container Packaging" },
      { name: "Kubernetes", role: "Cluster Orchestration" },
      { name: "GitHub Actions", role: "Automated CI/CD" },
      { name: "Vercel", role: "Global Edge Network" },
    ],
  },
];

const KNOWN_ROLES: Record<string, string> = {
  nextjs: "SSR & Edge React",
  react: "Component Architecture",
  typescript: "Static Type Safety",
  tailwindcss: "Design System Tokens",
  tailwind: "Design System Tokens",
  html5: "Semantic Web Standards",
  redux: "Predictable State Flow",
  flutter: "60fps Multi-Platform",
  reactnative: "Native Mobile UI",
  fastapi: "Async OpenAPI REST",
  python: "Core Backend Runtime",
  nodejs: "Event-Driven Network",
  django: "Enterprise Python",
  postgresql: "ACID Relational DB",
  mongodb: "Document Persistence",
  redis: "In-Memory Cache",
  docker: "Container Packaging",
  kubernetes: "Cluster Orchestration",
  vercel: "Global Edge Network",
  githubactions: "Automated CI/CD",
  aws: "Global Cloud Infra",
  android: "Kotlin & Android APIs",
  ios: "Swift & Apple Platform",
  firebase: "Realtime Data & Push",
  socketio: "Low-Latency WebSockets",
  go: "High-Concurrency Core",
  rust: "Memory-Safe Systems",
  figma: "UI/UX & Design Systems",
  figjam: "Collaborative Whiteboarding",
  googleanalytics: "User Behavior Telemetry",
  googlesearchconsole: "Indexing & Search Insights",
  metacapi: "Conversions & Tracking API",
  dockercompose: "Local Multi-Container Dev",
};

function normalizeKey(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "");
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
  // Determine if specific technologies were passed for a service / project
  const requestedNames = useMemo<string[]>(() => {
    const list: string[] = [];
    if (technologies && technologies.length > 0) {
      list.push(...technologies);
    }
    if (items && items.length > 0) {
      list.push(...items.map((i) => i.name));
    }
    return Array.from(new Set(list));
  }, [items, technologies]);

  const logoMap = useMemo(() => {
    const map = new Map<string, string | null>();
    (items ?? []).forEach((item) => {
      const key = normalizeKey(item.name);
      if (item.logo_url) map.set(key, item.logo_url);
    });
    return map;
  }, [items]);

  // Compute active pillars
  const pillars = useMemo<PillarDefinition[]>(() => {
    // If no specific tools were filtered (e.g. general homepage view), show full 4 pillars
    if (requestedNames.length === 0) {
      return DEFAULT_PILLARS.map((p) => ({
        ...p,
        tools: p.tools.map((t) => {
          const key = normalizeKey(t.name);
          return {
            ...t,
            role: KNOWN_ROLES[key] ?? t.role,
            logoUrl: logoMap.get(key) ?? null,
          };
        }),
      }));
    }

    const requestedKeys = new Set(requestedNames.map(normalizeKey));

    // Filter default pillars to only include pillars that have matching tools
    const matchedPillars: PillarDefinition[] = [];
    const matchedKeys = new Set<string>();

    DEFAULT_PILLARS.forEach((p) => {
      const matchingTools = p.tools.filter((t) => {
        const key = normalizeKey(t.name);
        const match = requestedKeys.has(key);
        if (match) matchedKeys.add(key);
        return match;
      });

      if (matchingTools.length > 0) {
        matchedPillars.push({
          ...p,
          number: String(matchedPillars.length + 1).padStart(2, "0"),
          tools: matchingTools.map((t) => {
            const key = normalizeKey(t.name);
            return {
              ...t,
              role: KNOWN_ROLES[key] ?? t.role,
              logoUrl: logoMap.get(key) ?? null,
            };
          }),
        });
      }
    });

    // Check for any requested tools not in the default 4 pillars (e.g. SEO, Analytics, Figma)
    const extraTools = requestedNames.filter((name) => !matchedKeys.has(normalizeKey(name)));
    if (extraTools.length > 0) {
      matchedPillars.push({
        id: "specialized",
        number: String(matchedPillars.length + 1).padStart(2, "0"),
        title: "SPECIALIZED TOOLING & APIS",
        summary: "Targeted platforms and integrations configured for this service domain.",
        tools: extraTools.map((name) => {
          const key = normalizeKey(name);
          return {
            name,
            role: KNOWN_ROLES[key] ?? "Domain Platform & Tooling",
            logoUrl: logoMap.get(key) ?? null,
          };
        }),
      });
    }

    return matchedPillars.length > 0 ? matchedPillars : DEFAULT_PILLARS;
  }, [requestedNames, logoMap]);

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
                <div className="flex items-center justify-between border-b border-[#f0f4f6] pb-3">
                  <span className="font-mono text-xs font-black text-[#008da4]">
                    [ {pillar.number} ]
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#7a8f9f]">
                    {visibleTools.length} CORE {visibleTools.length === 1 ? "TOOL" : "TOOLS"}
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

                {/* Vertical Stack of Clean Tool Rows (Capped at 6 max) */}
                <div className="mt-5 space-y-2.5">
                  {visibleTools.map((tool) => (
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

                      {/* Tool Info - No Ellipsis Truncation, Clean and Legible */}
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-[#0d2a4a] leading-tight">
                          {tool.name}
                        </p>
                        <p className="text-[10px] font-mono font-medium text-[#7a8f9f] leading-tight mt-0.5">
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
          );
        })}
      </div>

      {/* Auxiliary Ecosystem Strip (Shown when 4 pillars or general view) */}
      {pillars.length >= 3 && (
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border border-[#dce8ec] bg-[#f8fbfc] px-5 py-3.5 text-xs text-[#5c7288]">
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
      )}
    </div>
  );
}

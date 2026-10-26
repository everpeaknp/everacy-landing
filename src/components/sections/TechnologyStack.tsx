"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TechnologyMark } from "@/components/sections/ServiceContentIcon";
import { useReducedMotion } from "@/hooks";
import type { TechnologyStackItemData } from "@/lib/api";

type TechnologyItem = TechnologyStackItemData;
type TechnologyGroup = {
  name: string;
  slug: string;
  order: number;
  summary: string;
  technologies: TechnologyItem[];
};

const categorySummaries: Record<string, string> = {
  frontend: "Fast, accessible, SEO-ready web interfaces engineered for sub-second interaction.",
  mobile: "Native-feel iOS and Android applications built from a single, maintainable codebase.",
  "backend-apis": "Typed, high-throughput APIs, background workers, and domain services.",
  databases: "ACID-compliant relational storage, caching layers, and real-time data pipelines.",
  "cloud-devops": "Automated CI/CD, containerized deployments, and monitored cloud infrastructure.",
  "other-tools": "Design systems, analytics, state management, and developer tooling.",
};

const toolRoleDescriptions: Record<string, string> = {
  nextjs: "Production React framework for hybrid SSR, routing, and edge performance.",
  react: "Component architecture for interactive, stateful user interfaces.",
  typescript: "End-to-end static type safety across frontend and backend boundaries.",
  tailwindcss: "Utility-first styling system for consistent, zero-bloat design tokens.",
  html5: "Semantic document structure and accessible web standards.",
  redux: "Predictable state container for complex client-side workflows.",
  flutter: "Hardware-accelerated cross-platform mobile UI from a single codebase.",
  reactnative: "Native iOS and Android experiences powered by React.",
  fastapi: "High-performance async Python APIs with automatic OpenAPI validation.",
  python: "Core language for backend services, data pipelines, and automation.",
  nodejs: "Event-driven JavaScript runtime for scalable network applications.",
  django: "Batteries-included Python web framework for secure, rapid delivery.",
  postgresql: "Battle-tested relational database for transactional integrity and complex queries.",
  mongodb: "Document-oriented NoSQL store for flexible, high-volume data models.",
  redis: "In-memory data structure store for sub-millisecond caching and queues.",
  docker: "Reproducible container environments from local dev to production clusters.",
  kubernetes: "Automated container orchestration, scaling, and self-healing workloads.",
  aws: "Cloud compute, storage, and managed infrastructure at global scale.",
};

const compactToolRoles: Record<string, string> = {
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
  aws: "Global Cloud Infrastructure",
};

function getToolDescription(name: string, categoryName?: string): string {
  const key = name.toLowerCase().replace(/[^a-z0-9]+/g, "");
  return (
    compactToolRoles[key] ??
    toolRoleDescriptions[key] ??
    `Integrated production ${categoryName?.toLowerCase() || "engineering"} tool.`
  );
}

function fallbackCategory(name: string) {
  const key = name.toLowerCase().replace(/[^a-z0-9]+/g, "");
  const groups = [
    {
      name: "Frontend",
      slug: "frontend",
      order: 10,
      keys: [
        "nextjs",
        "react",
        "typescript",
        "vue",
        "angular",
        "javascript",
        "tailwindcss",
        "html",
        "html5",
        "css",
        "css3",
        "redux",
        "bootstrap",
      ],
    },
    { name: "Mobile", slug: "mobile", order: 20, keys: ["flutter", "android", "ios", "swift", "kotlin", "reactnative"] },
    {
      name: "Backend & APIs",
      slug: "backend-apis",
      order: 30,
      keys: [
        "fastapi",
        "python",
        "nodejs",
        "django",
        "express",
        "expressjs",
        "java",
        "go",
        "golang",
        "php",
        "ruby",
        "firebase",
        "socketio",
        "restapi",
        "graphql",
        "cloudinary",
      ],
    },
    {
      name: "Databases",
      slug: "databases",
      order: 40,
      keys: ["postgresql", "postgres", "mysql", "mongodb", "redis", "sqlite", "mariadb"],
    },
    {
      name: "Cloud & DevOps",
      slug: "cloud-devops",
      order: 50,
      keys: ["docker", "kubernetes", "vercel", "googlecloud", "aws", "azure", "githubactions", "terraform"],
    },
  ];
  return groups.find((group) => group.keys.includes(key)) ?? { name: "Core Tooling", slug: "other-tools", order: 60 };
}

function groupTechnologies(items: TechnologyItem[]): TechnologyGroup[] {
  const groups = new Map<string, TechnologyGroup>();
  for (const item of items) {
    const category =
      item.category?.name && item.category.slug ? item.category : fallbackCategory(item.name);
    const slug = category.slug;
    const displayName = slug === "other-tools" ? "Core Tooling" : category.name;
    const categoryDesc = "description" in category ? (category as { description?: string }).description : "";
    const current = groups.get(slug) ?? {
      name: displayName,
      slug,
      order: category.order ?? 999,
      summary: categorySummaries[slug] ?? categoryDesc ?? "Proven tools for modern software delivery.",
      technologies: [],
    };
    if (!current.technologies.some((t) => t.name.toLowerCase() === item.name.toLowerCase())) {
      current.technologies.push(item);
    }
    groups.set(slug, current);
  }
  return [...groups.values()].sort((a, b) => a.order - b.order || a.name.localeCompare(b.name));
}

export function TechnologyStack({
  items,
  technologies = [],
  idPrefix = "tech-stack",
}: {
  items?: TechnologyItem[] | null;
  technologies?: string[] | null;
  compact?: boolean;
  idPrefix?: string;
}) {
  const reduced = useReducedMotion();
  const normalizedItems = useMemo<TechnologyItem[]>(() => {
    if (items && items.length > 0) return items;
    return (technologies ?? []).map((name) => {
      const category = fallbackCategory(name);
      return {
        id: `tech-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        logo_url: null,
        order: 0,
        category: {
          name: category.name,
          slug: category.slug,
          order: category.order,
          description: categorySummaries[category.slug] ?? "",
        },
      };
    });
  }, [items, technologies]);

  const groups = useMemo(() => groupTechnologies(normalizedItems), [normalizedItems]);
  const [activeSlug, setActiveSlug] = useState<string>(() => groups[0]?.slug ?? "");

  const selectedGroup = groups.find((g) => g.slug === activeSlug) ?? groups[0];

  if (!groups.length || !selectedGroup) return null;

  return (
    <div className="w-full" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Clean Light Editorial Tab Strip */}
      <div className="relative border-b border-[#dce8ec] max-lg:[mask-image:linear-gradient(to_right,black_92%,transparent)]">
        <div
          className="flex items-center gap-6 overflow-x-auto sm:gap-8 lg:gap-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Technology stack layers"
        >
          {groups.map((group) => {
            const isSelected = selectedGroup.slug === group.slug;
            return (
              <button
                key={group.slug}
                type="button"
                role="tab"
                id={`${idPrefix}-tab-${group.slug}`}
                aria-selected={isSelected}
                aria-controls={`${idPrefix}-panel-${group.slug}`}
                onClick={() => setActiveSlug(group.slug)}
                className={`group relative flex shrink-0 items-baseline gap-2 pb-3.5 pt-1 text-left transition-colors focus-visible:outline-none ${
                  isSelected
                    ? "text-[#0d2a4a]"
                    : "text-[#647a8f] hover:text-[#0d2a4a]"
                }`}
              >
                <span className="whitespace-nowrap text-xs font-black uppercase tracking-[0.14em] sm:text-[13px]">
                  {group.name}
                </span>
                <span
                  className={`text-[11px] font-bold tabular-nums transition-colors ${
                    isSelected
                      ? "text-[#008da4]"
                      : "text-[#96aab9] group-hover:text-[#586d82]"
                  }`}
                >
                  {String(group.technologies.length).padStart(2, "0")}
                </span>

                {isSelected && (
                  <motion.span
                    layoutId={`${idPrefix}-active-underline`}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-[#008da4]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clean Subtitle */}
      <div className="py-4">
        <p className="text-sm font-medium leading-relaxed text-[#586d82]">
          {selectedGroup.summary}
        </p>
      </div>

      {/* Sleek, Compact, High-Density Tool Grid (Zero bloated cards, tight compact rows) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedGroup.slug}
          id={`${idPrefix}-panel-${selectedGroup.slug}`}
          role="tabpanel"
          aria-labelledby={`${idPrefix}-tab-${selectedGroup.slug}`}
          initial={reduced ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.16 }}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {selectedGroup.technologies.map((tech, idx) => (
            <motion.div
              key={`${selectedGroup.slug}-${tech.name}`}
              initial={reduced ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.16, delay: Math.min(idx * 0.02, 0.12) }}
              className="group flex items-center gap-3.5 rounded-none border border-[#dce8ec] bg-white p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#008da4] hover:shadow-[3px_3px_0px_0px_#008da4,0_8px_18px_-8px_rgba(13,42,74,0.1)] sm:p-4"
            >
              {/* Compact Sharp Icon Container */}
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-none border border-[#e2ecee] bg-[#f8fbfc] p-2 transition-colors duration-200 group-hover:border-[#008da4]/40 group-hover:bg-[#f2fafc]">
                <TechnologyMark
                  name={tech.name}
                  logoUrl={tech.logo_url}
                  className="h-6 w-6 object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </span>

              {/* Compact Information */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black tracking-tight text-[#0d2a4a] transition-colors group-hover:text-[#008da4]">
                  {tech.name}
                </p>
                <p className="truncate text-[11px] font-medium leading-tight text-[#5c7288]">
                  {getToolDescription(tech.name, selectedGroup.name)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

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

function getToolDescription(name: string, categoryName?: string): string {
  const key = name.toLowerCase().replace(/[^a-z0-9]+/g, "");
  return (
    toolRoleDescriptions[key] ??
    `Production ${categoryName?.toLowerCase() || "engineering"} technology integrated into our delivery stack.`
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
    const current = groups.get(slug) ?? {
      name: displayName,
      slug,
      order: category.order,
      summary: categorySummaries[slug] || categorySummaries["other-tools"],
      technologies: [],
    };
    current.technologies.push({
      ...item,
      category: { ...category, name: displayName },
    });
    groups.set(slug, current);
  }
  return [...groups.values()].sort(
    (left, right) => left.order - right.order || left.name.localeCompare(right.name)
  );
}

function legacyItems(names: string[]): TechnologyItem[] {
  return names.map((name) => {
    const category = fallbackCategory(name);
    return { name, category: { name: category.name, slug: category.slug, order: category.order }, logo_url: null };
  });
}

export function TechnologyStack({
  items,
  technologies = [],
  idPrefix = "technology-stack",
}: {
  items?: TechnologyStackItemData[] | null;
  technologies?: string[] | null;
  idPrefix?: string;
  compact?: boolean;
}) {
  const reduced = useReducedMotion();
  const groups = useMemo(
    () => groupTechnologies(items?.length ? items : legacyItems(technologies ?? [])),
    [items, technologies]
  );

  const [activeSlug, setActiveSlug] = useState<string>("");

  if (groups.length === 0) return null;

  const selectedGroup = groups.find((g) => g.slug === activeSlug) ?? groups[0];
  const count = selectedGroup.technologies.length;

  // Choose flex basis so every row stretches edge-to-edge with zero orphan cards
  const desktopBasisClass =
    count === 1
      ? "lg:basis-full"
      : count === 2
        ? "lg:basis-[calc(50%-1.25rem)]"
        : count === 3 || count === 5 || count === 6 || count === 9
          ? "lg:basis-[calc(33.333%-1.25rem)]"
          : "lg:basis-[calc(25%-1.25rem)]";

  return (
    <div className="w-full" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* Clean Light Editorial Tab Strip with Mobile Horizontal Scroll & Edge Fade */}
      <div className="relative border-b border-[#dce8ec] max-lg:[mask-image:linear-gradient(to_right,black_92%,transparent)]">
        <div
          className="flex items-center gap-6 overflow-x-auto sm:gap-9 lg:justify-between lg:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                className={`group relative flex shrink-0 items-baseline gap-2.5 pb-4 pt-1 text-left transition-colors focus-visible:outline-none ${
                  isSelected
                    ? "text-[#0d2a4a]"
                    : "text-[#647a8f] hover:text-[#0d2a4a]"
                }`}
              >
                <span className="whitespace-nowrap text-xs font-extrabold uppercase tracking-[0.12em] sm:text-[13px]">
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
                    className="absolute inset-x-0 bottom-0 h-[2px] bg-[#00a6cb]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Single Clean Subtitle Directly Underneath the Category Divider (No duplicate category label) */}
      <div className="py-5">
        <p className="text-sm font-medium leading-6 text-[#586d82]">
          {selectedGroup.summary}
        </p>
      </div>

      {/* Sharp Tactile Cards Grid (Adaptive row widths, zero mystery squares, tactile hover lift + cyan border) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedGroup.slug}
          id={`${idPrefix}-panel-${selectedGroup.slug}`}
          role="tabpanel"
          aria-labelledby={`${idPrefix}-tab-${selectedGroup.slug}`}
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="flex flex-wrap gap-4 sm:gap-5"
        >
          {selectedGroup.technologies.map((tech, idx) => (
            <motion.div
              key={`${selectedGroup.slug}-${tech.name}`}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: Math.min(idx * 0.03, 0.18) }}
              className={`group relative flex flex-1 basis-full sm:basis-[calc(50%-1.25rem)] ${desktopBasisClass} flex-col justify-between border border-[#dce8ec] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#00a6cb] hover:shadow-[4px_4px_0px_0px_#00a6cb,0_14px_28px_-12px_rgba(13,42,74,0.12)] sm:p-7`}
            >
              <div>
                {/* Sharp Square Icon Frame */}
                <span className="grid h-12 w-12 shrink-0 place-items-center border border-[#e2ecee] bg-[#f8fbfc] p-2.5 transition-colors duration-200 group-hover:border-[#00a6cb]/50 group-hover:bg-[#f2fafc]">
                  <TechnologyMark
                    name={tech.name}
                    logoUrl={tech.logo_url}
                    className="h-7 w-7 transition-transform duration-200 group-hover:scale-105"
                  />
                </span>
              </div>

              <div className="mt-6">
                <p className="text-base font-black tracking-tight text-[#0d2a4a] transition-colors group-hover:text-[#008da4]">
                  {tech.name}
                </p>
                <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-[#5c7288]">
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

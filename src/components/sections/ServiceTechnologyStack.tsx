"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import { TechnologyMark } from "@/components/sections/ServiceContentIcon";

const technologyGroups = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend & APIs" },
  { id: "databases", label: "Databases" },
  { id: "cloud", label: "Cloud & DevOps" },
  { id: "other", label: "Other tools" },
] as const;

type TechnologyGroup = (typeof technologyGroups)[number]["id"];

function groupForTechnology(name: string): TechnologyGroup {
  const value = name.trim().toLowerCase();
  if (["next.js", "nextjs", "next js", "react", "react native", "redux", "typescript", "javascript", "html", "html5", "css", "css3", "tailwind css", "vue", "angular"].includes(value)) return "frontend";
  if (["django", "python", "node.js", "nodejs", "express", "rest api", "graphql", "firebase"].includes(value)) return "backend";
  if (["postgresql", "mysql", "mongodb", "redis", "sqlite", "mariadb"].includes(value)) return "databases";
  if (["aws", "docker", "kubernetes", "github actions", "vercel", "azure", "google cloud", "terraform"].includes(value)) return "cloud";
  return "other";
}

type TechnologyGroupData = { label: string; technologies: string[] };

export function ServiceTechnologyStack({ technologies, groups: cmsGroups }: { technologies: string[]; groups?: TechnologyGroupData[] | null }) {
  const grouped = useMemo(() => {
    if (cmsGroups?.length) {
      return cmsGroups
        .filter((group) => group.technologies.length > 0)
        .map((group, index) => ({ id: `cms-${index}`, label: group.label, technologies: group.technologies }));
    }
    const result = new Map<TechnologyGroup, string[]>();
    for (const technology of technologies) {
      const group = groupForTechnology(technology);
      result.set(group, [...(result.get(group) ?? []), technology]);
    }
    return technologyGroups.filter((group) => result.has(group.id)).map((group) => ({
      ...group,
      technologies: result.get(group.id) ?? [],
    }));
  }, [technologies, cmsGroups]);
  const [activeGroup, setActiveGroup] = useState(grouped[0]?.id ?? "frontend");
  const selectedGroup = grouped.some((group) => group.id === activeGroup) ? activeGroup : grouped[0]?.id;
  const selected = grouped.find((group) => group.id === selectedGroup);

  if (!selected) return null;

  function selectByKeyboard(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (currentIndex + 1) % grouped.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (currentIndex - 1 + grouped.length) % grouped.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = grouped.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      const next = grouped[nextIndex];
      setActiveGroup(next.id);
      document.getElementById(`service-stack-tab-${next.id}`)?.focus();
    }
  }

  return (
    <div className="mx-auto mt-10 max-w-5xl">
      <div role="tablist" aria-label="Technology categories" className="flex flex-wrap justify-center gap-2">
        {grouped.map((group, index) => (
          <button
            key={group.id}
            id={`service-stack-tab-${group.id}`}
            type="button"
            role="tab"
            aria-selected={selectedGroup === group.id}
            aria-controls="service-stack-panel"
            tabIndex={selectedGroup === group.id ? 0 : -1}
            onClick={() => setActiveGroup(group.id)}
            onKeyDown={(event) => selectByKeyboard(event, index)}
            className={`min-h-12 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008da4] focus-visible:ring-offset-2 sm:text-sm ${selectedGroup === group.id ? "bg-[#008da4] text-white shadow-sm" : "bg-[#edf3f5] text-[#28435f] hover:bg-[#e2eef0]"}`}
          >
            {group.label}
          </button>
        ))}
      </div>
      <div id="service-stack-panel" role="tabpanel" aria-labelledby={`service-stack-tab-${selected.id}`} className="flex min-h-48 flex-wrap items-center justify-center gap-x-10 gap-y-10 px-3 py-14 sm:gap-x-16 sm:gap-y-12 sm:py-20">
        {selected.technologies.map((technology) => (
          <div key={technology} title={technology} aria-label={technology} className="grid h-16 min-w-16 place-items-center transition-transform hover:-translate-y-1">
            <TechnologyMark name={technology} className="h-11 w-11 sm:h-16 sm:w-16" />
            <span className="sr-only">{technology}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

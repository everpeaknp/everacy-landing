"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import { TechnologyMark } from "@/components/sections/ServiceContentIcon";
import type { TechnologyStackItemData } from "@/lib/api";

type TechnologyItem = TechnologyStackItemData;
type TechnologyGroup = { name: string; slug: string; order: number; technologies: TechnologyItem[] };

function fallbackCategory(name: string) {
  const key = name.toLowerCase().replace(/[^a-z0-9]+/g, "");
  const groups = [
    { name: "Frontend", slug: "frontend", order: 10, keys: ["nextjs", "react", "typescript", "vue", "angular", "javascript", "tailwindcss", "html", "html5", "css", "css3", "redux", "bootstrap"] },
    { name: "Mobile", slug: "mobile", order: 20, keys: ["flutter", "android", "ios", "swift", "kotlin", "reactnative"] },
    { name: "Backend & APIs", slug: "backend-apis", order: 30, keys: ["fastapi", "python", "nodejs", "django", "express", "expressjs", "java", "go", "golang", "php", "ruby", "firebase", "socketio", "restapi", "graphql", "cloudinary"] },
    { name: "Databases", slug: "databases", order: 40, keys: ["postgresql", "postgres", "mysql", "mongodb", "redis", "sqlite", "mariadb"] },
    { name: "Cloud & DevOps", slug: "cloud-devops", order: 50, keys: ["docker", "kubernetes", "vercel", "googlecloud", "aws", "azure", "githubactions", "terraform"] },
  ];
  return groups.find((group) => group.keys.includes(key)) ?? { name: "Other tools", slug: "other-tools", order: 60 };
}

function groupTechnologies(items: TechnologyItem[]): TechnologyGroup[] {
  const groups = new Map<string, TechnologyGroup>();
  for (const item of items) {
    const category = item.category?.name && item.category.slug
      ? item.category
      : fallbackCategory(item.name);
    const current = groups.get(category.slug) ?? { ...category, technologies: [] };
    current.technologies.push(item);
    groups.set(category.slug, current);
  }
  return [...groups.values()].sort((left, right) => left.order - right.order || left.name.localeCompare(right.name));
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
}) {
  const groups = useMemo(
    () => groupTechnologies(items?.length ? items : legacyItems(technologies ?? [])),
    [items, technologies],
  );
  const [activeSlug, setActiveSlug] = useState(groups[0]?.slug ?? "");
  const selected = groups.find((group) => group.slug === activeSlug) ?? groups[0];

  if (!selected) return null;

  const maxItemsInGroup = groups.reduce((maximum, group) => Math.max(maximum, group.technologies.length), 0);
  // Keep one stable panel height across tab changes, while accounting for the
  // tighter three-column layout on phones and larger icons above the sm breakpoint.
  const panelMinHeight = Math.max(
    23 * 16,
    Math.ceil(maxItemsInGroup / 3) * 80 + 44,
    Math.ceil(maxItemsInGroup / 4) * 108 + 56,
    Math.ceil(maxItemsInGroup / 5) * 108 + 56,
  );

  function selectByKeyboard(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (currentIndex + 1) % groups.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (currentIndex - 1 + groups.length) % groups.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = groups.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      setActiveSlug(groups[nextIndex].slug);
      document.getElementById(`${idPrefix}-tab-${groups[nextIndex].slug}`)?.focus();
    }
  }

  const panelId = `${idPrefix}-panel`;
  return <div className="mx-auto mt-10 max-w-5xl">
    <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Technology categories">
      {groups.map((group, index) => <button
        key={group.slug}
        id={`${idPrefix}-tab-${group.slug}`}
        type="button"
        role="tab"
        aria-selected={selected.slug === group.slug}
        aria-controls={panelId}
        tabIndex={selected.slug === group.slug ? 0 : -1}
        onClick={() => setActiveSlug(group.slug)}
        onKeyDown={(event) => selectByKeyboard(event, index)}
        className={`min-h-12 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008da4] focus-visible:ring-offset-2 sm:text-sm ${selected.slug === group.slug ? "bg-[#008da4] text-white shadow-sm" : "bg-[#edf3f5] text-[#28435f] hover:bg-[#e2eef0]"}`}
      >{group.name}</button>)}
    </div>
    <div id={panelId} role="tabpanel" aria-labelledby={`${idPrefix}-tab-${selected.slug}`} style={{ minHeight: panelMinHeight }} className="flex min-h-[23rem] flex-wrap content-start justify-center gap-x-2 gap-y-2 px-1 pb-3 pt-8 sm:gap-x-4 sm:gap-y-3 sm:px-3 sm:pb-4 sm:pt-10">
      {selected.technologies.map((technology) => <div key={`${selected.slug}-${technology.name}`} title={technology.name} className="grid min-h-[4.5rem] min-w-0 basis-[calc(33.333%-0.334rem)] justify-items-center content-center gap-1 transition-transform hover:-translate-y-1 sm:min-h-24 sm:basis-[calc(25%-0.75rem)] xl:basis-[calc(20%-0.8rem)]">
        <TechnologyMark name={technology.name} logoUrl={technology.logo_url} className="h-9 w-9 sm:h-14 sm:w-14" />
        <span className="line-clamp-2 max-w-full break-words px-1 text-center text-[11px] font-semibold leading-tight text-[#36546e] sm:text-sm">{technology.name}</span>
      </div>)}
    </div>
  </div>;
}

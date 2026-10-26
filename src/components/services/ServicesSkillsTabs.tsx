"use client";

import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "@/hooks";
import { ServiceContentIcon, TechnologyMark } from "@/components/sections/ServiceContentIcon";
import type { ServiceSkillTabData } from "@/lib/api";
import { skillTabs as defaultSkillTabs } from "./servicesContent";

const fallbackTabIcons: Record<string, string> = {
  engineering: "Code2",
  design: "PenTool",
  cloud: "Cloud",
  growth: "BarChart3",
};

const defaultItemIcons = [
  "AppWindow",
  "Smartphone",
  "Server",
  "ShoppingCart",
  "LayoutDashboard",
  "Workflow",
];

interface ServicesSkillsTabsProps {
  tabs?: ServiceSkillTabData[] | null;
}

export function ServicesSkillsTabs({ tabs }: ServicesSkillsTabsProps) {
  const reduced = useReducedMotion();

  const formattedTabs = useMemo(() => {
    if (tabs && tabs.length > 0) {
      return tabs.map((t) => ({
        id: t.slug,
        label: t.label,
        icon: t.icon || fallbackTabIcons[t.slug] || "Blocks",
        iconColor: t.icon_color || "#00a6cb",
        items: t.items.map((item, idx) => ({
          title: item.title,
          text: item.description,
          icon: item.icon || defaultItemIcons[idx % defaultItemIcons.length],
        })),
        tech: t.tech_stack || [],
      }));
    }
    return defaultSkillTabs.map((t) => ({
      ...t,
      icon: fallbackTabIcons[t.id] || "Blocks",
      iconColor: "#00a6cb",
      items: t.items.map((item, idx) => ({
        ...item,
        icon: defaultItemIcons[idx % defaultItemIcons.length],
      })),
    }));
  }, [tabs]);

  const [activeId, setActiveId] = useState(formattedTabs[0]?.id || "engineering");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const active = formattedTabs.find((tab) => tab.id === activeId) ?? formattedTabs[0];

  const focusTab = (index: number) => {
    const next = formattedTabs[(index + formattedTabs.length) % formattedTabs.length];
    if (next) {
      setActiveId(next.id);
      tabRefs.current[next.id]?.focus();
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusTab(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusTab(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusTab(formattedTabs.length - 1);
    }
  };

  if (!active) return null;

  return (
    <section
      id="service-skills"
      className="scroll-mt-24 border-b border-[#dce8ec] bg-white px-5 py-20 sm:px-8 sm:py-28"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#008da4]">Capabilities</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#0d2a4a] sm:text-5xl">
            <span className="text-[#00a6cb]">Skills</span> at a glance
          </h2>
          <p className="mt-5 text-base leading-7 text-[#586d82] sm:text-lg">
            Everything you need under one roof, from the first architectural blueprint to production operations.
          </p>
        </div>

        {/* Sharp Architectural Tab Bar */}
        <div
          role="tablist"
          aria-label="Service areas"
          className="mx-auto mt-12 grid max-w-4xl grid-cols-2 border-l border-t border-[#dce8ec] bg-[#f4f9fa] sm:grid-cols-4"
        >
          {formattedTabs.map((tab, index) => {
            const selected = tab.id === activeId;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[tab.id] = el;
                }}
                type="button"
                role="tab"
                id={`skill-tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`skill-panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(tab.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`flex min-h-14 items-center justify-center gap-2.5 border-b border-r border-[#dce8ec] px-4 py-3.5 text-xs font-extrabold uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00a6cb] sm:text-sm ${
                  selected
                    ? "border-b-2 border-b-[#00a6cb] bg-white text-[#0d2a4a]"
                    : "text-[#586d82] hover:bg-white/60 hover:text-[#0d2a4a]"
                }`}
              >
                <ServiceContentIcon
                  name={tab.icon}
                  className="h-4 w-4"
                  style={{ color: selected ? tab.iconColor : "#7a90a2" }}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              role="tabpanel"
              id={`skill-panel-${active.id}`}
              aria-labelledby={`skill-tab-${active.id}`}
              tabIndex={0}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="focus-visible:outline-none"
            >
              {/* Boxy Shared-Border Grid (Leapfrog "Skills at a glance" layout) */}
              <ul className="grid border-l border-t border-[#dce8ec] bg-[#f8fbfc] sm:grid-cols-2 lg:grid-cols-3">
                {active.items.map((item, index) => (
                  <li
                    key={item.title}
                    className="group flex flex-col border-b border-r border-[#dce8ec] bg-[#f8fbfc] p-7 transition-colors duration-200 hover:bg-white sm:p-8"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-10 w-10 place-items-center bg-[#eaf6f8] text-[#008da4] transition-colors group-hover:bg-[#00a6cb] group-hover:text-white">
                        <ServiceContentIcon name={item.icon || "AppWindow"} className="h-5 w-5" />
                      </span>
                      <span className="text-xs font-extrabold tracking-[0.14em] text-[#9aabb6]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 flex items-center justify-between gap-2 text-lg font-extrabold text-[#0d2a4a]">
                      <span>{item.title}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-[#9aabb6] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#00a6cb]"
                      />
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-[#5b7085]">{item.text}</p>
                  </li>
                ))}
              </ul>

              {/* Sharp Technology Strip */}
              {active.tech && active.tech.length > 0 && (
                <div
                  className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
                  aria-label="Technologies we use"
                >
                  <span className="mr-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#6d8296]">
                    Core stack:
                  </span>
                  {active.tech.map((name) => (
                    <span
                      key={name}
                      className="inline-flex items-center gap-2 border border-[#dce8ec] bg-[#f8fbfc] px-3.5 py-2 text-xs font-extrabold text-[#142e4c] transition hover:border-[#00a6cb] hover:bg-white sm:text-sm"
                    >
                      <TechnologyMark name={name} className="h-4 w-4" />
                      {name}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

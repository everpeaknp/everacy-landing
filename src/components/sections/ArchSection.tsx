"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import type { ServiceCardData } from "@/lib/api";
import { EmptyState } from "@/components/ui/EmptyState";

interface ArchSectionProps {
  data?: ServiceCardData[];
  sectionTitle?: string;
}

function serviceHref(service: ServiceCardData): string {
  if (service.category?.slug && service.slug) {
    return "/services/" + encodeURIComponent(service.category.slug) + "/" + encodeURIComponent(service.slug);
  }

  return service.link_href && service.link_href !== "/services" ? service.link_href : "/services";
}

function getServiceKeywordsAndSummary(title: string): { summary: string; keywords: string[] } {
  const value = title.toLowerCase();
  if (value.includes("website") || value.includes("web")) {
    return {
      summary: "Next.js & React web platforms · Responsive UI · Headless CMS",
      keywords: ["web", "website", "frontend", "nextjs", "react", "landing", "redesign", "ui", "cms", "e-commerce", "portal"],
    };
  }
  if (value.includes("software") || value.includes("system")) {
    return {
      summary: "Distributed architecture · Role-based access · Custom APIs & ERP sync",
      keywords: ["software", "system", "erp", "crm", "saas", "backend", "api", "automation", "dashboard", "internal", "database", "workflow"],
    };
  }
  if (value.includes("app") || value.includes("mobile")) {
    return {
      summary: "iOS & Android apps · Offline-first sync · Push notifications",
      keywords: ["mobile", "app", "ios", "android", "flutter", "react native", "phone", "tablet", "push", "offline"],
    };
  }
  if (value.includes("seo") || value.includes("search")) {
    return {
      summary: "Technical Core Web Vitals · JSON-LD Schema · Search authority",
      keywords: ["seo", "search", "google", "ranking", "traffic", "organic", "schema", "vitals", "speed", "keywords"],
    };
  }
  if (value.includes("marketing") || value.includes("social")) {
    return {
      summary: "Conversion funnels · Server-side tracking · Performance campaigns",
      keywords: ["marketing", "growth", "ads", "campaigns", "social", "conversion", "funnel", "analytics", "leads", "brand"],
    };
  }
  return {
    summary: "Direct carrier routing · Instant OTP & alerts · Webhook delivery logs",
    keywords: ["sms", "bulk", "messaging", "otp", "alerts", "notifications", "telecom", "dispatch", "api"],
  };
}

const COMMAND_PRESETS = [
  {
    id: "web-platform",
    label: "Web Platform + CMS",
    query: "We need a fast Next.js web platform with custom CMS and high SEO scores",
    tags: ["stack: Next.js + Django", "goal: Sub-second LCP", "scope: Web + SEO"],
    matchKeywords: ["website", "seo"],
  },
  {
    id: "custom-erp",
    label: "Custom ERP & Internal Tools",
    query: "Build a custom internal operations & inventory software system with API sync",
    tags: ["stack: Python + PostgreSQL", "security: Role-Based Access", "scope: Custom Software"],
    matchKeywords: ["software", "system"],
  },
  {
    id: "mobile-launch",
    label: "iOS/Android App + OTP",
    query: "Launch an iOS and Android mobile app with offline mode and SMS OTP login",
    tags: ["stack: Flutter + REST API", "feature: Offline Sync + OTP", "scope: Mobile + SMS"],
    matchKeywords: ["app", "mobile", "sms"],
  },
  {
    id: "growth-engine",
    label: "Technical SEO & Funnels",
    query: "Scale qualified inbound leads through technical SEO and conversion funnels",
    tags: ["focus: Core Web Vitals", "tracking: Server-Side CAPI", "scope: SEO + Growth"],
    matchKeywords: ["seo", "marketing"],
  },
];

export function ArchSection({ data }: ArchSectionProps) {
  const cards = data ?? [];

  const [selectedPresetId, setSelectedPresetId] = useState<string>(COMMAND_PRESETS[0].id);
  const [customQuery, setCustomQuery] = useState<string>("");
  const [typedText, setTypedText] = useState<string>(COMMAND_PRESETS[0].query);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const activePreset = useMemo(
    () => COMMAND_PRESETS.find((p) => p.id === selectedPresetId) ?? COMMAND_PRESETS[0],
    [selectedPresetId]
  );

  useEffect(() => {
    if (customQuery.trim().length > 0) return;
    let frame = 0;
    const target = activePreset.query;
    setIsTyping(true);
    setTypedText("");

    const interval = setInterval(() => {
      frame += 2;
      if (frame >= target.length) {
        setTypedText(target);
        setIsTyping(false);
        clearInterval(interval);
      } else {
        setTypedText(target.slice(0, frame));
      }
    }, 18);

    return () => clearInterval(interval);
  }, [activePreset, customQuery]);

  const matchedServices = useMemo(() => {
    const q = (customQuery.trim() || activePreset.query).toLowerCase();
    const scored = cards.map((s, idx) => {
      const meta = getServiceKeywordsAndSummary(s.title);
      let score = 0;
      if (s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) {
        score += 5;
      }
      for (const kw of meta.keywords) {
        if (q.includes(kw)) score += 3;
      }
      if (!customQuery.trim()) {
        for (const mk of activePreset.matchKeywords) {
          if (s.title.toLowerCase().includes(mk)) score += 6;
        }
      }
      return { service: s, summary: meta.summary, score, idx };
    });
    const matches = scored.filter((item) => item.score > 0).sort((a, b) => b.score - a.score);
    return matches.length > 0 ? matches.slice(0, 3) : scored.slice(0, 3);
  }, [cards, customQuery, activePreset]);

  if (cards.length === 0) {
    return <EmptyState title="No services published yet" />;
  }

  return (
    <section
      className="border-b border-[#e2ecee] bg-[#f6fafb] py-20 sm:py-28"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="text-center">
          <span
            className="mx-auto block h-20 w-px bg-gradient-to-b from-transparent via-[#cbd5e1] to-[#64748b]"
            aria-hidden="true"
          />
          <h2 className="mt-6 text-3xl font-black tracking-[-0.025em] text-[#0d2a4a] sm:text-4xl">
            Describe what you are building
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#586d82]">
            Pick a common project scenario or type your requirements in plain words—see how our capabilities combine into one delivery plan.
          </p>
        </div>

        {/* Sharp Boxy Scenario Buttons */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          {COMMAND_PRESETS.map((preset) => {
            const isSelected = customQuery.trim() === "" && selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setCustomQuery("");
                  setSelectedPresetId(preset.id);
                }}
                className={`rounded-none border px-4 py-2.5 text-xs font-semibold transition-all ${
                  isSelected
                    ? "border-[#0d2a4a] bg-[#0d2a4a] text-white"
                    : "border-[#dce8ec] bg-white text-[#475569] hover:border-[#00a6cb] hover:text-[#0d2a4a]"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Sharp Boxy Interactive Command Palette */}
        <div className="mt-6 overflow-hidden rounded-none border border-[#dce8ec] bg-white text-left shadow-[0_18px_50px_-24px_rgba(13,42,74,0.16)]">
          <div className="flex items-center gap-3.5 border-b border-[#e4ecef] px-6 py-4 sm:px-7 sm:py-5">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 shrink-0 text-[#008da4]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 4.5 4.5" />
            </svg>
            <input
              type="text"
              value={customQuery ? customQuery : typedText}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder="Type what you want to build (e.g. mobile app, SEO, custom ERP)..."
              aria-label="Describe your project requirements"
              className="min-w-0 flex-1 bg-transparent text-base font-medium text-[#0d2a4a] placeholder:text-[#94a3b8] focus:outline-none sm:text-[18px]"
            />
            {isTyping && (
              <span className="inline-block h-5 w-0.5 animate-pulse bg-[#008da4]" aria-hidden="true" />
            )}
            {customQuery && (
              <button
                type="button"
                onClick={() => setCustomQuery("")}
                className="rounded-none border border-[#dce8ec] bg-[#f8fafb] px-2.5 py-1 text-xs font-semibold text-[#475569] hover:border-[#0d2a4a] hover:text-[#0d2a4a]"
              >
                Reset
              </button>
            )}
          </div>

          {/* Sharp Boxy Filter Chips Row */}
          <div className="flex flex-wrap items-center gap-2.5 border-b border-[#f1f5f9] bg-[#fafcfd] px-6 py-3 sm:px-7">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
              Architecture Filters
            </span>
            {(customQuery.trim()
              ? [
                  `query: "${customQuery.trim().slice(0, 24)}"`,
                  `matched: ${matchedServices.length} modules`,
                  "delivery: Full-Stack",
                ]
              : activePreset.tags
            ).map((chip, idx) => (
              <span
                key={chip}
                className={`rounded-none px-2.5 py-1 font-mono text-xs font-medium ${
                  idx === 2
                    ? "bg-[#0d2a4a] text-white"
                    : "border border-[#dce8ec] bg-white text-[#475569]"
                }`}
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Matched Services Results List (Sharp Boxy Index & Action Button) */}
          <div className="divide-y divide-[#f1f5f9] px-6 py-2 sm:px-7">
            {matchedServices.map(({ service, summary, idx }) => (
              <div
                key={service.id}
                className="flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-9 w-12 shrink-0 items-center justify-center rounded-none border border-[#dce8ec] bg-[#f8fafb] font-mono text-xs font-bold text-[#008da4]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <Link
                      href={serviceHref(service)}
                      className="text-[15px] font-bold text-[#0d2a4a] hover:text-[#008da4]"
                    >
                      {service.title}
                    </Link>
                    <p className="mt-0.5 text-xs text-[#586d82]">{summary}</p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3 self-end sm:self-center">
                  <Link
                    href={serviceHref(service)}
                    className="rounded-none border border-[#dce8ec] bg-[#f8fafb] px-3.5 py-1.5 text-xs font-bold text-[#0d2a4a] transition-colors hover:border-[#008da4] hover:bg-[#008da4] hover:text-white"
                  >
                    Open spec →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Palette Footer Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e4ecef] bg-[#f8fafb] px-6 py-3.5 text-xs text-[#64748b] sm:px-7">
            <div className="flex items-center gap-5">
              <span>Click any scenario tab to test</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">Type custom keywords to filter</span>
            </div>
            <Link
              href="/services"
              className="font-bold text-[#0d2a4a] hover:text-[#008da4]"
            >
              Browse all {cards.length} capabilities →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

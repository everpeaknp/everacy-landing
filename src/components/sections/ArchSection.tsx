"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AppWindow,
  ArrowRight,
  Code2,
  Megaphone,
  MonitorCog,
  Palette,
  PenTool,
  Search,
  Share2,
  Smartphone,
} from "lucide-react";
import type { ServiceCardData } from "@/lib/api";
import { FadeIn } from "@/components/animations/FadeIn";
import { ServiceContentIcon } from "@/components/sections/ServiceContentIcon";
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

function serviceIcon(title: string) {
  const value = title.toLowerCase();
  if (value.includes("software") || value.includes("system")) return MonitorCog;
  if (value.includes("app") || value.includes("mobile")) return Smartphone;
  if (value.includes("seo") || value.includes("search")) return Search;
  if (value.includes("social")) return Share2;
  if (value.includes("marketing")) return Megaphone;
  if (value.includes("graphic")) return Palette;
  if (value.includes("ui") || value.includes("ux")) return PenTool;
  if (value.includes("website") || value.includes("development")) return Code2;
  return AppWindow;
}

function getFeaturedIllustration(title: string, index: number): string {
  const value = title.toLowerCase();
  if (value.includes("website") || value.includes("web")) {
    return "/images/service-previews/responsive-platforms.png";
  }
  if (value.includes("seo") || value.includes("search") || value.includes("marketing")) {
    return "/images/service-previews/service-outcomes.png";
  }
  if (value.includes("software") || value.includes("system")) {
    return "/images/service-previews/service-interface-systems.png";
  }
  if (value.includes("app") || value.includes("mobile")) {
    return "/images/service-previews/service-quality.png";
  }
  return index % 2 === 0
    ? "/images/service-previews/responsive-platforms.png"
    : "/images/service-previews/service-interface-systems.png";
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

export function ArchSection({ data, sectionTitle }: ArchSectionProps) {
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

  const featuredCards = cards.slice(0, 2);
  const secondaryCards = cards.slice(2);

  return (
    <section
      className="border-b border-[#e2ecee] bg-[#f6fafb] py-20 sm:py-28"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Clean, Professional Header */}
        <FadeIn direction="up" duration={0.45}>
          <header className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-[#0d2a4a] sm:text-5xl">
                {sectionTitle || "Our Services"}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-[#586d82]">
                Web, mobile, custom software, and digital growth — designed and built under one roof.
              </p>
            </div>

            <Link
              href="/services"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-[#008da4] transition hover:text-[#0d2a4a]"
            >
              View all services
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </header>
        </FadeIn>

        {/* Top Row: 2 Wide Flagship Bento Cards with Visual Showcases */}
        <div className="grid gap-6 lg:grid-cols-2">
          {featuredCards.map((service, index) => {
            const illustrationSrc = service.image || getFeaturedIllustration(service.title, index);

            return (
              <FadeIn
                key={service.id}
                className="h-full"
                delay={Math.min(index * 0.06, 0.2)}
                duration={0.45}
              >
                <Link
                  href={serviceHref(service)}
                  className="group grid h-full items-center gap-6 border border-[#dce8ec] bg-white p-7 transition-all duration-300 hover:border-[#00a6cb] hover:shadow-[0_20px_44px_-28px_rgba(13,42,74,0.18)] sm:grid-cols-[1.15fr_0.85fr] sm:p-9"
                >
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-extrabold leading-snug tracking-tight text-[#0d2a4a] transition-colors group-hover:text-[#008da4]">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[#586d82] sm:text-[15px]">
                        {service.description}
                      </p>
                    </div>

                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#008da4] transition-colors group-hover:text-[#0d2a4a]">
                      Learn more
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>

                  <div className="relative mx-auto aspect-[4/3] w-full max-w-[240px] sm:max-w-none">
                    <Image
                      src={illustrationSrc}
                      alt={
                        service.image_is_decorative
                          ? ""
                          : service.image_alt || service.title
                      }
                      fill
                      sizes="(max-width: 640px) 240px, 260px"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        {/* Bottom Row: 4 Clean Supporting Bento Cards (Full 4-Column Row, No Orphans) */}
        {secondaryCards.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {secondaryCards.map((service, index) => {
              const Icon = serviceIcon(service.title);

              return (
                <FadeIn
                  key={service.id}
                  className="h-full"
                  delay={Math.min((index + 2) * 0.06, 0.28)}
                  duration={0.45}
                >
                  <Link
                    href={serviceHref(service)}
                    className="group flex h-full flex-col justify-between border border-[#dce8ec] bg-white p-7 transition-all duration-300 hover:border-[#00a6cb] hover:shadow-[0_20px_44px_-28px_rgba(13,42,74,0.18)]"
                  >
                    <div>
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#eef7f9] text-[#008da4] transition-colors duration-200 group-hover:bg-[#00a6cb] group-hover:text-white">
                        {service.icon ? (
                          <ServiceContentIcon name={service.icon} className="h-5 w-5" />
                        ) : (
                          <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />
                        )}
                      </span>

                      <h3 className="mt-5 text-lg font-extrabold leading-snug text-[#0d2a4a] transition-colors group-hover:text-[#008da4]">
                        {service.title}
                      </h3>

                      <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-[#586d82]">
                        {service.description}
                      </p>
                    </div>

                    <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#008da4] transition-colors group-hover:text-[#0d2a4a]">
                      Learn more
                      <ArrowRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        )}

        {/* "Describe what you are building" Interactive Solution Finder */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="text-center">
            <span
              className="mx-auto block h-20 w-px bg-gradient-to-b from-transparent via-[#cbd5e1] to-[#64748b]"
              aria-hidden="true"
            />
            <h3 className="mt-6 text-3xl font-black tracking-[-0.025em] text-[#0d2a4a] sm:text-4xl">
              Describe what you are building
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#586d82]">
              Pick a common project scenario or type your requirements in plain words—see how our capabilities combine into one delivery plan.
            </p>
          </div>

          {/* Preset Scenario Pills */}
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
                  className={`rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all ${
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

          {/* Interactive Command Palette Box */}
          <div className="mt-6 overflow-hidden rounded-[1.25rem] border border-[#dce8ec] bg-white text-left shadow-[0_18px_50px_-24px_rgba(13,42,74,0.16)]">
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
                  className="rounded bg-[#f1f5f9] px-2.5 py-1 text-xs font-semibold text-[#475569] hover:text-[#0d2a4a]"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Filter Chips Row */}
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
                  className={`rounded-md px-2.5 py-1 font-mono text-xs font-medium ${
                    idx === 2
                      ? "bg-[#0d2a4a] text-white"
                      : "border border-[#e2e8f0] bg-white text-[#475569]"
                  }`}
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* Matched Services Results List */}
            <div className="divide-y divide-[#f1f5f9] px-6 py-2 sm:px-7">
              {matchedServices.map(({ service, summary, idx }) => (
                <div
                  key={service.id}
                  className="flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-9 w-12 shrink-0 items-center justify-center rounded-md border border-[#dce8ec] bg-[#f8fafb] font-mono text-xs font-bold text-[#008da4]">
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
                      className="rounded-lg border border-[#dce8ec] bg-[#f8fafb] px-3.5 py-1.5 text-xs font-bold text-[#0d2a4a] transition-colors hover:border-[#008da4] hover:bg-[#008da4] hover:text-white"
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
                <span>Click any scenario pill to test</span>
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
      </div>
    </section>
  );
}

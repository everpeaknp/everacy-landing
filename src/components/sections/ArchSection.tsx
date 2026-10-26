"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ServiceCardData } from "@/lib/api";
import { FadeIn } from "@/components/animations/FadeIn";
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

function getServiceCapabilities(title: string): { category: string; summary: string; capabilities: string[]; keywords: string[] } {
  const value = title.toLowerCase();

  if (value.includes("website") || value.includes("web")) {
    return {
      category: "PLATFORMS & WEB",
      summary: "High-speed marketing sites and web applications with sub-second page loads and seamless CMS control.",
      capabilities: ["Next.js & React Core", "Responsive Viewport Systems", "Headless CMS Integration", "Core Web Vitals Lock"],
      keywords: ["web", "website", "frontend", "nextjs", "react", "landing", "redesign", "ui", "cms", "e-commerce", "portal"],
    };
  }

  if (value.includes("software") || value.includes("system")) {
    return {
      category: "SYSTEMS & BACKEND",
      summary: "Custom internal portals, distributed backends, and multi-tenant software shaped around your business operations.",
      capabilities: ["Role-Based Access (RBAC)", "High-Throughput APIs", "Relational ACID Integrity", "Third-Party ERP Sync"],
      keywords: ["software", "system", "erp", "crm", "saas", "backend", "api", "automation", "dashboard", "internal", "database", "workflow"],
    };
  }

  if (value.includes("app") || value.includes("mobile")) {
    return {
      category: "MOBILE NATIVE",
      summary: "Single-codebase cross-platform mobile products for iOS and Android with smooth 60fps gesture response.",
      capabilities: ["Flutter & React Native", "Offline-First Data Sync", "Push Notification Routing", "App Store & Play Store CI/CD"],
      keywords: ["mobile", "app", "ios", "android", "flutter", "react native", "phone", "tablet", "push", "offline"],
    };
  }

  if (value.includes("seo") || value.includes("search")) {
    return {
      category: "SEARCH ARCHITECTURE",
      summary: "Technical and content-led search engineering that earns high-intent organic rankings on Google.",
      capabilities: ["Technical Web Audits", "Programmatic JSON-LD Schema", "Intent Keyword Mapping", "Crawl Budget Optimization"],
      keywords: ["seo", "search", "google", "ranking", "traffic", "organic", "schema", "vitals", "speed", "keywords"],
    };
  }

  if (value.includes("marketing") || value.includes("social")) {
    return {
      category: "GROWTH & ATTRIBUTION",
      summary: "Data-driven performance campaigns, server-side conversion tracking, and high-converting acquisition funnels.",
      capabilities: ["Server-Side Conversion APIs", "Targeted Paid Campaigns", "Funnel A/B Optimization", "Attribution Dashboards"],
      keywords: ["marketing", "growth", "ads", "campaigns", "social", "conversion", "funnel", "analytics", "leads", "brand"],
    };
  }

  return {
    category: "TELECOM & DISPATCH",
    summary: "Reliable transactional and promotional SMS dispatch pipelines with direct carrier routing and delivery webhooks.",
    capabilities: ["Sub-Second SMS Dispatch", "Direct Carrier Binds", "Automated Webhook Callbacks", "Delivery Analytics"],
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
    image: "/images/solution-finder/web.jpg",
    caption: "Full-Stack Web Architecture & Performance Squads",
  },
  {
    id: "custom-erp",
    label: "Custom ERP & Internal Tools",
    query: "Build a custom internal operations & inventory software system with API sync",
    tags: ["stack: Python + PostgreSQL", "security: Role-Based Access", "scope: Custom Software"],
    matchKeywords: ["software", "system"],
    image: "/images/solution-finder/erp.jpg",
    caption: "Enterprise Operations & Internal Process Automation",
  },
  {
    id: "mobile-launch",
    label: "iOS/Android App + OTP",
    query: "Launch an iOS and Android mobile app with offline mode and SMS OTP login",
    tags: ["stack: Flutter + REST API", "feature: Offline Sync + OTP", "scope: Mobile + SMS"],
    matchKeywords: ["app", "mobile", "sms"],
    image: "/images/solution-finder/mobile.jpg",
    caption: "Cross-Platform iOS & Android Native Applications",
  },
  {
    id: "growth-engine",
    label: "Technical SEO & Funnels",
    query: "Scale qualified inbound leads through technical SEO and conversion funnels",
    tags: ["focus: Core Web Vitals", "tracking: Server-Side CAPI", "scope: SEO + Growth"],
    matchKeywords: ["seo", "marketing"],
    image: "/images/solution-finder/seo.jpg",
    caption: "High-Converting Growth Funnels & Technical SEO",
  },
];

export function ArchSection({ data, sectionTitle }: ArchSectionProps) {
  const cards = data ?? [];

  const inputRef = useRef<HTMLInputElement>(null);
  const [presetIndex, setPresetIndex] = useState<number>(0);
  const [customQuery, setCustomQuery] = useState<string>("");
  const [hasUserEdited, setHasUserEdited] = useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const activePreset = COMMAND_PRESETS[presetIndex];

  // Continuous infinite typewriter loop: types, pauses when full, backspaces, advances to next preset, and restarts
  // Stops completely once the user edits or deletes letters until page refresh
  useEffect(() => {
    if (hasUserEdited || isFocused) return;

    let timeoutId: NodeJS.Timeout;
    const target = COMMAND_PRESETS[presetIndex].query;

    let mode: "typing" | "pause_full" | "deleting" | "pause_empty" = "typing";
    let charIndex = 0;
    setIsTyping(true);

    const tick = () => {
      if (mode === "typing") {
        charIndex += 1;
        setTypedText(target.slice(0, charIndex));
        if (charIndex >= target.length) {
          mode = "pause_full";
          setIsTyping(false);
          timeoutId = setTimeout(tick, 2800); // Pause for 2.8s when fully typed so user can read
        } else {
          timeoutId = setTimeout(tick, 24); // Smooth typing cadence
        }
      } else if (mode === "pause_full") {
        mode = "deleting";
        setIsTyping(true);
        timeoutId = setTimeout(tick, 18);
      } else if (mode === "deleting") {
        charIndex = Math.max(0, charIndex - 2);
        setTypedText(target.slice(0, charIndex));
        if (charIndex <= 0) {
          mode = "pause_empty";
          setIsTyping(false);
          timeoutId = setTimeout(tick, 400); // Brief pause before starting next preset
        } else {
          timeoutId = setTimeout(tick, 14); // Quick, natural backspace speed
        }
      } else if (mode === "pause_empty") {
        setPresetIndex((prev) => (prev + 1) % COMMAND_PRESETS.length);
      }
    };

    timeoutId = setTimeout(tick, 60);

    return () => clearTimeout(timeoutId);
  }, [presetIndex, isFocused, hasUserEdited]);

  const matchedServices = useMemo(() => {
    const q = (hasUserEdited ? customQuery.trim() : (customQuery.trim() || activePreset.query)).toLowerCase();
    const scored = cards.map((s, idx) => {
      const info = getServiceCapabilities(s.title);
      let score = 0;
      if (s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) {
        score += 5;
      }
      for (const kw of info.keywords) {
        if (q.includes(kw)) score += 3;
      }
      if (!hasUserEdited && !customQuery.trim()) {
        for (const mk of activePreset.matchKeywords) {
          if (s.title.toLowerCase().includes(mk)) score += 6;
        }
      }
      return { service: s, info, score, idx };
    });
    const matches = scored.filter((item) => item.score > 0).sort((a, b) => b.score - a.score);
    return matches.length > 0 ? matches.slice(0, 2) : scored.slice(0, 2);
  }, [cards, customQuery, activePreset, hasUserEdited]);

  if (cards.length === 0) {
    return <EmptyState title="No services published yet" />;
  }

  return (
    <section
      className="border-b border-[#e2ecee] bg-[#f6fafb] py-20 sm:py-28"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Clean, Confident Architectural Header (No forced stock clipart) */}
        <FadeIn direction="up" duration={0.45}>
          <header className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#008da4]">
                Capabilities &amp; Engineering
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#0d2a4a] sm:text-5xl uppercase">
                {sectionTitle || "Our Services"}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[#586d82]">
                Web, mobile, custom software, and digital growth — designed, built, and maintained under one roof.
              </p>
            </div>

            <Link
              href="/services"
              className="group inline-flex shrink-0 items-center gap-2 rounded-none border border-[#0d2a4a] bg-white px-5 py-2.5 text-xs font-black uppercase tracking-wider text-[#0d2a4a] transition-all hover:bg-[#0d2a4a] hover:text-white"
            >
              <span>View all services</span>
              <ArrowRight
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </header>
        </FadeIn>

        {/* Sharp Boxy Architectural Services Grid (Uniform 3-Column Ledger, Zero Round Squircles, Zero Mismatches) */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((service, index) => {
            const info = getServiceCapabilities(service.title);
            const num = String(index + 1).padStart(2, "0");

            return (
              <FadeIn
                key={service.id}
                className="h-full"
                delay={Math.min(index * 0.05, 0.25)}
                duration={0.4}
              >
                <Link
                  href={serviceHref(service)}
                  className="group relative flex h-full flex-col justify-between rounded-none border border-[#dce8ec] bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-[#008da4] hover:shadow-[4px_4px_0px_0px_#008da4,0_14px_28px_-12px_rgba(13,42,74,0.12)] sm:p-8"
                >
                  <div>
                    {/* Sharp Header: Tabular Index + Category Label */}
                    <div className="flex items-center justify-between border-b border-[#f0f4f6] pb-4">
                      <span className="font-mono text-xs font-black text-[#008da4]">
                        {num}
                      </span>
                      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#7a8f9f]">
                        {info.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight text-[#0d2a4a] transition-colors group-hover:text-[#008da4]">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 text-sm leading-relaxed text-[#586d82]">
                      {service.description || info.summary}
                    </p>

                    {/* Concrete Capabilities Checklist */}
                    <ul className="mt-6 space-y-2 border-t border-[#f0f4f6] pt-5">
                      {info.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex items-center gap-2 text-xs font-semibold text-[#405669]"
                        >
                          <span className="h-1 w-1 shrink-0 bg-[#008da4]" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sharp Action Link */}
                  <div className="mt-8 flex items-center justify-between border-t border-[#f0f4f6] pt-4 text-xs font-black text-[#008da4] transition-colors group-hover:text-[#0d2a4a]">
                    <span>Learn more</span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        {/* "Describe what you are building" Interactive Solution Finder & Services Showcase */}
        <div className="mt-20 sm:mt-28 border-t border-[#dce8ec] pt-14 sm:pt-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              
              {/* Left Column: Wider Solution Finder & Interactive Command Palette (8 cols) */}
              <div className="lg:col-span-8">
                <div>
                  <div className="mb-5 text-left">
                    <div className="inline-flex items-center gap-2 border border-[#dce8ec] bg-white px-3 py-1 shadow-sm mb-3">
                      <span className="h-2 w-2 bg-[#008da4]" />
                      <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#008da4]">
                        INTERACTIVE SOLUTION FINDER
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#0d2a4a]">
                      Describe what you are building
                    </h3>
                    <p className="mt-2 text-[14px] sm:text-[15px] leading-relaxed text-[#586d82]">
                      Pick a common project scenario or type your requirements in plain words—see how our capabilities combine into one delivery plan.
                    </p>
                  </div>

                  {/* Sharp Boxy Scenario Buttons — Wide Single-Row Inline Layout */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-5">
                    {COMMAND_PRESETS.map((preset, idx) => {
                      const isSelected = (!hasUserEdited && presetIndex === idx) || customQuery === preset.query;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => {
                            setPresetIndex(idx);
                            setCustomQuery(preset.query);
                            setHasUserEdited(true);
                          }}
                          className={`rounded-none border px-3.5 py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                            isSelected
                              ? "border-[#0d2a4a] bg-[#0d2a4a] text-white shadow-[2px_2px_0px_0px_#008da4]"
                              : "border-[#dce8ec] bg-white text-[#475569] hover:border-[#008da4] hover:text-[#0d2a4a]"
                          }`}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sharp Boxy Interactive Command Palette (Wider Browser Layout) */}
                <div className="overflow-hidden rounded-none border border-[#dce8ec] bg-white text-left shadow-[0_18px_50px_-24px_rgba(13,42,74,0.16)]">
                  <div>
                    <div className="flex items-center gap-3.5 border-b border-[#e4ecef] px-5 py-4 sm:px-6 sm:py-4.5">
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
                      <div className="relative min-w-0 flex-1 flex items-center overflow-hidden">
                        <input
                          ref={inputRef}
                          type="text"
                          value={hasUserEdited ? customQuery : typedText}
                          onChange={(e) => {
                            setHasUserEdited(true);
                            setCustomQuery(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Backspace" || e.key === "Delete") {
                              if (!hasUserEdited) {
                                setHasUserEdited(true);
                                setCustomQuery(typedText.slice(0, -1));
                              }
                            }
                          }}
                          onFocus={() => setIsFocused(true)}
                          onBlur={() => {
                            setIsFocused(false);
                          }}
                          placeholder="Type what you want to build (e.g. mobile app, SEO, custom ERP)..."
                          aria-label="Describe your project requirements"
                          className={`w-full bg-transparent text-sm sm:text-base font-semibold text-[#0d2a4a] placeholder:text-[#94a3b8] focus:outline-none ${
                            !isFocused && !hasUserEdited && !customQuery ? "caret-transparent" : "caret-[#008da4]"
                          }`}
                        />

                        {/* Inline Blinking Cursor attached immediately to the end of the sentence */}
                        {!isFocused && !hasUserEdited && !customQuery && typedText && (
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 flex items-center text-sm sm:text-base font-semibold text-transparent whitespace-pre overflow-hidden"
                          >
                            <span>{typedText}</span>
                            <span
                              className={`inline-block h-4 sm:h-5 w-[2.5px] bg-[#008da4] ml-0.5 shrink-0 ${
                                isTyping ? "opacity-100" : "animate-pulse"
                              }`}
                              style={{ animationDuration: "0.85s" }}
                            />
                          </div>
                        )}
                      </div>
                      {hasUserEdited && customQuery && (
                        <button
                          type="button"
                          onClick={() => {
                            setCustomQuery("");
                            setHasUserEdited(true);
                            inputRef.current?.focus();
                          }}
                          className="rounded-none border border-[#dce8ec] bg-[#f8fafb] px-2.5 py-1 text-xs font-semibold text-[#475569] hover:border-[#0d2a4a] hover:text-[#0d2a4a]"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Sharp Boxy Filter Chips Row */}
                    <div className="flex flex-wrap items-center gap-2 border-b border-[#f1f5f9] bg-[#fafcfd] px-5 py-2.5 sm:px-6">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#64748b]">
                        Filters:
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
                          className={`rounded-none px-2.5 py-0.5 font-mono text-[11px] font-medium ${
                            idx === 2
                              ? "bg-[#0d2a4a] text-white"
                              : "border border-[#dce8ec] bg-white text-[#475569]"
                          }`}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>

                    {/* Matched Services Results List */}
                    <div className="divide-y divide-[#f1f5f9] px-5 py-1 sm:px-6">
                      {matchedServices.map(({ service, info }) => {
                        const slug = service.slug || service.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

                        return (
                          <div
                            key={service.id}
                            className="group py-3.5 transition-colors rounded-none hover:bg-[#fafcfd] px-2 sm:px-2.5 -mx-2 sm:-mx-2.5"
                          >
                            {/* 1. Realistic URL Breadcrumb with Official Everacy Logo */}
                            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#586d82] mb-1">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src="/logo/everacy_wo_bg.png"
                                alt="Everacy"
                                className="h-3 w-auto object-contain shrink-0"
                              />
                              <span className="truncate">everacy.com › services › {slug}</span>
                            </div>

                            {/* 2. Headline & View Action */}
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                <Link
                                  href={serviceHref(service)}
                                  className="text-base font-bold text-[#0d2a4a] hover:text-[#008da4] hover:underline transition-colors leading-snug"
                                >
                                  {service.title}
                                </Link>
                                {/* 3. Snippet Excerpt */}
                                <p className="mt-1 text-xs leading-relaxed text-[#586d82]">
                                  {info.summary}
                                </p>
                              </div>

                              <Link
                                href={serviceHref(service)}
                                className="hidden sm:inline-flex items-center gap-1 text-xs font-mono font-bold text-[#008da4] hover:underline shrink-0 mt-0.5"
                              >
                                <span>View spec</span>
                                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                              </Link>
                            </div>

                            {/* 4. Minimal Sitelinks / Modular Tags */}
                            {info.capabilities && info.capabilities.length > 0 && (
                              <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-mono text-[#7a8f9f]">
                                {info.capabilities.slice(0, 3).map((cap, i) => (
                                  <span key={cap} className="inline-flex items-center gap-2">
                                    {i > 0 && <span className="text-[#cbd5e1]">·</span>}
                                    <span className="text-[#586d82] hover:text-[#008da4] transition-colors">{cap}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Palette Footer Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e4ecef] bg-[#f8fafb] px-5 py-3 text-xs text-[#64748b] sm:px-6">
                    <div className="flex items-center gap-3">
                      <span>Click scenario tab to test</span>
                      <span className="hidden sm:inline">·</span>
                      <span className="hidden sm:inline">Type custom keywords</span>
                    </div>
                    <Link
                      href="/services"
                      className="font-bold text-[#0d2a4a] hover:text-[#008da4]"
                    >
                      All capabilities →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Image Frame (4 cols - Moved Rightwards, Longer & Bigger) */}
              <div className="lg:col-span-4 lg:ml-auto w-full max-w-[425px]">
                <figure className="relative w-full">
                  {/* Single Asymmetric Bottom-Right Curve Image Frame (rounded-br-[3.75rem]) */}
                  <div className="relative aspect-[4/5.45] lg:min-h-[550px] w-full overflow-hidden rounded-br-[3.75rem] bg-[#0d2a4a] shadow-[0_20px_50px_-24px_rgba(13,42,74,0.3)] border border-[#dce8ec]">
                    <Image
                      key={activePreset.id}
                      src={activePreset.image}
                      alt={activePreset.caption || "Everacy engineering team collaborating on software architecture"}
                      fill
                      sizes="(max-width: 1024px) 100vw, 425px"
                      className="object-cover object-center w-full h-full transition-all duration-700 hover:scale-[1.03]"
                      priority
                    />

                    {/* Gradient architectural caption overlay */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0d2a4a]/95 via-[#0d2a4a]/75 to-transparent p-5 sm:p-6 pt-16 text-white">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 bg-[#008da4] animate-pulse" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#00a6cb]">
                          DEPLOYMENT BLUEPRINT
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm sm:text-base font-bold text-white tracking-tight">
                        {activePreset.caption}
                      </p>
                      <p className="mt-1 text-xs text-[#b8d1dc] leading-relaxed">
                        Enterprise squads, sub-second latency, and production architectures built to scale.
                      </p>
                    </div>
                  </div>
                </figure>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

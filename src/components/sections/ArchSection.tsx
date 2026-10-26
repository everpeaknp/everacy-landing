"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

interface CapabilityMetadata {
  category: string;
  summary: string;
  capabilities: string[];
  keywords: string[];
  previewImage: string;
  badge: string;
  metric: string;
}

function getServiceCapabilities(title: string): CapabilityMetadata {
  const value = title.toLowerCase();

  if (value.includes("website") || value.includes("web")) {
    return {
      category: "PLATFORMS & WEB",
      summary: "High-speed marketing sites and web applications with sub-second page loads and seamless CMS control.",
      capabilities: ["Next.js & React Core", "Responsive Viewport Systems", "Headless CMS Integration", "Core Web Vitals Lock"],
      keywords: ["web", "website", "frontend", "nextjs", "react", "landing", "redesign", "ui", "cms", "e-commerce", "portal"],
      previewImage: "/images/service-previews/responsive-platforms.png",
      badge: "RESPONSIVE VIEWPORT",
      metric: "99+ Performance Vitals",
    };
  }

  if (value.includes("software") || value.includes("system")) {
    return {
      category: "SYSTEMS & BACKEND",
      summary: "Custom internal portals, distributed backends, and multi-tenant software shaped around your business operations.",
      capabilities: ["Role-Based Access (RBAC)", "High-Throughput APIs", "Relational ACID Integrity", "Third-Party ERP Sync"],
      keywords: ["software", "system", "erp", "crm", "saas", "backend", "api", "automation", "dashboard", "internal", "database", "workflow"],
      previewImage: "/images/service-previews/saas-dashboard.svg",
      badge: "SAAS & BACKEND",
      metric: "Enterprise Multi-Tenant",
    };
  }

  if (value.includes("app") || value.includes("mobile")) {
    return {
      category: "MOBILE NATIVE",
      summary: "Single-codebase cross-platform mobile products for iOS and Android with smooth 60fps gesture response.",
      capabilities: ["Flutter & React Native", "Offline-First Data Sync", "Push Notification Routing", "App Store & Play Store CI/CD"],
      keywords: ["mobile", "app", "ios", "android", "flutter", "react native", "phone", "tablet", "push", "offline"],
      previewImage: "/images/appdevelopment.png",
      badge: "60FPS CROSS-PLATFORM",
      metric: "Unified iOS & Android",
    };
  }

  if (value.includes("seo") || value.includes("search")) {
    return {
      category: "SEARCH ARCHITECTURE",
      summary: "Technical and content-led search engineering that earns high-intent organic rankings on Google.",
      capabilities: ["Technical Web Audits", "Programmatic JSON-LD Schema", "Intent Keyword Mapping", "Crawl Budget Optimization"],
      keywords: ["seo", "search", "google", "ranking", "traffic", "organic", "schema", "vitals", "speed", "keywords"],
      previewImage: "/images/service-previews/service-workflow.png",
      badge: "SERP & SCHEMA",
      metric: "Top-Tier Organic Rank",
    };
  }

  if (value.includes("marketing") || value.includes("social")) {
    return {
      category: "GROWTH & ATTRIBUTION",
      summary: "Data-driven performance campaigns, server-side conversion tracking, and high-converting acquisition funnels.",
      capabilities: ["Server-Side Conversion APIs", "Targeted Paid Campaigns", "Funnel A/B Optimization", "Attribution Dashboards"],
      keywords: ["marketing", "growth", "ads", "campaigns", "social", "conversion", "funnel", "analytics", "leads", "brand"],
      previewImage: "/images/service-previews/service-outcomes.png",
      badge: "GROWTH ATTRIBUTION",
      metric: "Direct CAPI Attribution",
    };
  }

  return {
    category: "TELECOM & DISPATCH",
    summary: "Reliable transactional and promotional SMS dispatch pipelines with direct carrier routing and delivery webhooks.",
    capabilities: ["Sub-Second SMS Dispatch", "Direct Carrier Binds", "Automated Webhook Callbacks", "Delivery Analytics"],
    keywords: ["sms", "bulk", "messaging", "otp", "alerts", "notifications", "telecom", "dispatch", "api"],
    previewImage: "/images/service-previews/service-interface-systems.png",
    badge: "CARRIER GATEWAY",
    metric: "Sub-Second SMS Latency",
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

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedPresetId, setSelectedPresetId] = useState<string>(COMMAND_PRESETS[0].id);
  const [customQuery, setCustomQuery] = useState<string>("");
  const [typedText, setTypedText] = useState<string>(COMMAND_PRESETS[0].query);
  const [, setIsTyping] = useState<boolean>(false);

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
      const info = getServiceCapabilities(s.title);
      let score = 0;
      if (s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) {
        score += 5;
      }
      for (const kw of info.keywords) {
        if (q.includes(kw)) score += 3;
      }
      if (!customQuery.trim()) {
        for (const mk of activePreset.matchKeywords) {
          if (s.title.toLowerCase().includes(mk)) score += 6;
        }
      }
      return { service: s, info, score, idx };
    });
    const matches = scored.filter((item) => item.score > 0).sort((a, b) => b.score - a.score);
    return matches.length > 0 ? matches.slice(0, 3) : scored.slice(0, 3);
  }, [cards, customQuery, activePreset]);

  if (cards.length === 0) {
    return <EmptyState title="No services published yet" />;
  }

  const activeService = cards[activeIndex] ?? cards[0];
  const activeInfo = getServiceCapabilities(activeService.title);
  const activeImage = activeService.image || activeInfo.previewImage;

  return (
    <section
      className="border-b border-[#e2ecee] bg-[#f6fafb] py-16 sm:py-24"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Clean, Sharp Header */}
        <FadeIn direction="up" duration={0.45}>
          <header className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#008da4]">
                Capabilities &amp; Engineering
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#0d2a4a] sm:text-5xl">
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

        {/* WorkOS Style Interactive Split Showcase (Zero Bloated Cards, Compact ~460px Height) */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
          {/* Left Navigation Rail: Compact Service Ledger (5 cols) */}
          <div className="flex flex-col gap-2 lg:col-span-5">
            {cards.map((service, index) => {
              const info = getServiceCapabilities(service.title);
              const isActive = activeIndex === index;
              const num = String(index + 1).padStart(2, "0");

              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`group relative flex w-full items-center justify-between border p-3.5 text-left transition-all duration-150 rounded-none cursor-pointer sm:p-4 ${
                    isActive
                      ? "border-[#008da4] bg-white shadow-[3px_3px_0px_0px_#008da4]"
                      : "border-[#dce8ec] bg-white/70 hover:border-[#008da4]/50 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`font-mono text-xs font-black shrink-0 ${
                        isActive ? "text-[#008da4]" : "text-[#8ea2b3]"
                      }`}
                    >
                      {num}
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`truncate text-sm sm:text-[15px] font-black tracking-tight transition-colors ${
                          isActive ? "text-[#008da4]" : "text-[#0d2a4a] group-hover:text-[#008da4]"
                        }`}
                      >
                        {service.title}
                      </p>
                      <p className="truncate font-mono text-[10px] font-semibold uppercase tracking-wider text-[#7a8f9f]">
                        {info.category}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isActive
                        ? "translate-x-0.5 text-[#008da4]"
                        : "text-[#b0c4cf] opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Stage: Interactive Visual Preview & Architecture Spec (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative flex h-full flex-col justify-between rounded-none border border-[#dce8ec] bg-white p-6 shadow-[4px_4px_0px_0px_#008da4] sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="flex h-full flex-col justify-between"
                >
                  <div>
                    {/* Top Bar inside Stage */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#eef4f6] pb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black text-[#008da4]">
                          [ {String(activeIndex + 1).padStart(2, "0")} ]
                        </span>
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0d2a4a]">
                          {activeInfo.category}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 border border-[#dce8ec] bg-[#f8fbfc] px-2.5 py-0.5 text-[10px] font-mono text-[#008da4]">
                        <span className="h-1.5 w-1.5 bg-[#008da4]" />
                        <span>{activeInfo.metric}</span>
                      </div>
                    </div>

                    {/* Compact Precision Visual Preview */}
                    <div className="relative mt-4 aspect-[16/8] w-full overflow-hidden rounded-none border border-[#e2ecee] bg-[#f4f8fa]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={activeImage}
                        alt={activeService.title}
                        className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-[1.03]"
                      />

                      <div className="absolute top-2.5 right-2.5 border border-[#dce8ec] bg-white/95 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#008da4] shadow-xs">
                        {activeInfo.badge}
                      </div>
                    </div>

                    {/* Service Info */}
                    <div className="mt-5">
                      <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#0d2a4a]">
                        {activeService.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#586d82]">
                        {activeService.description || activeInfo.summary}
                      </p>

                      {/* Concrete Capability Badges */}
                      <div className="mt-4 flex flex-wrap gap-2 border-t border-[#f0f4f6] pt-3.5">
                        {activeInfo.capabilities.map((cap) => (
                          <span
                            key={cap}
                            className="inline-flex items-center gap-1.5 rounded-none border border-[#dce8ec] bg-[#f8fbfc] px-2.5 py-1 text-[11px] font-mono font-medium text-[#405669]"
                          >
                            <span className="h-1 w-1 bg-[#008da4]" />
                            <span>{cap}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Stage Footer Link */}
                  <div className="mt-6 flex items-center justify-between border-t border-[#eef4f6] pt-4">
                    <span className="font-mono text-xs text-[#7a8f9f]">
                      SPECIFICATION 0{activeIndex + 1} OF 0{cards.length}
                    </span>

                    <Link
                      href={serviceHref(activeService)}
                      className="inline-flex items-center gap-2 rounded-none border border-[#0d2a4a] bg-[#0d2a4a] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-[#008da4] hover:bg-[#008da4]"
                    >
                      <span>Explore {activeService.title}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* "Describe what you are building" Interactive Solution Finder */}
        <div className="mx-auto mt-20 max-w-4xl">
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
                  className={`rounded-none border px-4 py-2.5 text-xs font-bold transition-all ${
                    isSelected
                      ? "border-[#0d2a4a] bg-[#0d2a4a] text-white"
                      : "border-[#dce8ec] bg-white text-[#475569] hover:border-[#008da4] hover:text-[#0d2a4a]"
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
                <path d="M21 21l-4.35-4.35" />
                <circle cx="11" cy="11" r="7" />
              </svg>

              <input
                type="text"
                value={customQuery ? customQuery : typedText}
                onChange={(e) => {
                  setCustomQuery(e.target.value);
                }}
                placeholder="e.g. Next.js SaaS portal with role-based auth and automated invoicing..."
                className="w-full bg-transparent font-mono text-sm font-medium text-[#0d2a4a] placeholder:text-[#94a3b8] focus:outline-none sm:text-base"
              />

              {customQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setCustomQuery("");
                  }}
                  className="rounded-none border border-[#dce8ec] px-2 py-1 font-mono text-[11px] font-bold text-[#64748b] hover:border-[#0d2a4a] hover:text-[#0d2a4a]"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Tags / Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eef4f6] bg-[#f8fbfc] px-6 py-3 text-xs text-[#586d82] sm:px-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#008da4]">
                  ENGINEERING SCOPE:
                </span>
                {activePreset.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-none border border-[#dce8ec] bg-white px-2 py-0.5 font-mono text-[11px] font-semibold text-[#0d2a4a]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="font-mono text-[11px] font-bold text-[#008da4]">
                {matchedServices.length} CAPABILITIES MATCHED
              </span>
            </div>

            {/* Matched Delivery Plan Result */}
            <div className="p-6 sm:p-7">
              <div className="grid gap-3 sm:grid-cols-3">
                {matchedServices.map(({ service, info, idx }) => (
                  <Link
                    key={`match-${service.id}-${idx}`}
                    href={serviceHref(service)}
                    className="group flex flex-col justify-between rounded-none border border-[#dce8ec] bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#008da4] hover:shadow-[3px_3px_0px_0px_#008da4]"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#008da4]">
                          MATCH {idx + 1}
                        </span>
                        <span className="font-mono text-[10px] font-semibold text-[#7a8f9f]">
                          {info.category}
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-black text-[#0d2a4a] group-hover:text-[#008da4] transition-colors">
                        {service.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs font-medium text-[#586d82]">
                        {service.description || info.summary}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#f0f4f6] pt-2 text-[11px] font-black text-[#008da4]">
                      <span>Scope Details</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-[#f0f4f6] pt-4 sm:flex-row">
                <p className="text-xs font-medium text-[#586d82]">
                  Need a tailored quote or multi-discipline team? We can assemble a custom sprint squad in 48 hours.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex shrink-0 items-center gap-2 rounded-none border border-[#0d2a4a] bg-[#0d2a4a] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#008da4] hover:border-[#008da4]"
                >
                  <span>Request Project Scope</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

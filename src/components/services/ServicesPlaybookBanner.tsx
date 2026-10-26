"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const chapters = [
  {
    num: "01",
    title: "Discovery & System Architecture",
    duration: "Week 1–2",
    summary:
      "Domain modeling, API contract definitions, database schema design, and risk mapping before production coding begins.",
    deliverables: ["ADR (Architecture Decision Records)", "Data & API Contract Spec", "Milestone & Cost Breakdown"],
  },
  {
    num: "02",
    title: "Design Systems & Interactive Proof",
    duration: "Week 2–4",
    summary:
      "Component token architecture, high-contrast user flows, and clickable staging prototypes validated with real stakeholders.",
    deliverables: ["Tokenized UI Component Library", "Validated User Journey Flows", "Accessibility & Core Web Vitals Spec"],
  },
  {
    num: "03",
    title: "Sprint Execution & CI/CD Hardening",
    duration: "Week 4–12",
    summary:
      "Automated test suites, zero-downtime deployment pipelines, and Friday live staging demos with transparent velocity tracking.",
    deliverables: ["Automated CI/CD & Test Coverage", "Weekly Staging Releases", "Observability & Handover Docs"],
  },
];

export function ServicesPlaybookBanner({
  serviceTitle,
  ctaHref = "/contact",
}: {
  serviceTitle?: string;
  ctaHref?: string;
}) {
  const [activeChapter, setActiveChapter] = useState(0);
  const current = chapters[activeChapter];

  return (
    <section
      className="relative isolate overflow-hidden border-b border-[#dce8ec] bg-[#0d2a4a] px-5 py-20 text-white sm:px-8 sm:py-28"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Subtle architectural blueprint lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        {/* Left Column: Narrative & CTA */}
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#7fdcf0]">
            Architecture & Delivery Blueprint
          </p>
          <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.035em] sm:text-5xl">
            Join forces with our engineers to build{" "}
            <span className="text-[#00a6cb]">defensible products</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
            Whether you&apos;re launching a new{" "}
            {serviceTitle ? serviceTitle.toLowerCase() : "digital product"} initiative or modernising an existing
            platform, we deliver a clear architectural roadmap, milestone schedule, and transparent budget breakdown
            before production work begins.
          </p>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {[
              "System architecture & stack blueprint",
              "Milestone-by-milestone delivery schedule",
              "Performance, security & SEO baseline",
              "Transparent squad & cost breakdown",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm font-bold text-white/90">
                <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-[#00a6cb]" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link
              href={ctaHref}
              className="group inline-flex min-h-12 items-center gap-3 bg-[#00a6cb] px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#078fae] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d2a4a]"
            >
              Request your project blueprint
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right Column: Interactive Architectural Dossier / Playbook */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="border border-[#dce8ec] bg-white text-[#0d2a4a] shadow-2xl">
            {/* Dossier Top Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#dce8ec] bg-[#f4f9fa] px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="bg-[#0d2a4a] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                  PLAYBOOK
                </span>
                <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#008da4]">
                  The Engineering Standard
                </span>
              </div>
              <span className="border border-[#cfe0e5] bg-white px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#586d82]">
                2026 Edition
              </span>
            </div>

            {/* Interactive Chapter Tabs */}
            <div
              className="grid grid-cols-3 border-b border-[#dce8ec] bg-[#f8fbfc]"
              role="tablist"
              aria-label="Playbook chapters"
            >
              {chapters.map((chapter, idx) => {
                const selected = idx === activeChapter;
                return (
                  <button
                    key={chapter.num}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveChapter(idx)}
                    className={`border-r border-[#dce8ec] px-4 py-3 text-left transition-colors last:border-r-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00a6cb] ${
                      selected
                        ? "border-b-2 border-b-[#00a6cb] bg-white text-[#0d2a4a]"
                        : "text-[#647b8f] hover:bg-white/70 hover:text-[#0d2a4a]"
                    }`}
                  >
                    <span
                      className={`block text-[10px] font-black uppercase tracking-[0.18em] ${
                        selected ? "text-[#00a6cb]" : "text-[#9aabb6]"
                      }`}
                    >
                      Chapter {chapter.num}
                    </span>
                    <span className="mt-0.5 block truncate text-xs font-extrabold">{chapter.duration}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Chapter Blueprint Content */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#008da4]">
                  Phase {current.num} · {current.duration}
                </p>
                <span className="text-[11px] font-bold text-[#7890a0]">Included with discovery</span>
              </div>

              <h3 className="mt-2 text-xl font-black tracking-tight text-[#0d2a4a] sm:text-2xl">
                {current.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#586d82]">{current.summary}</p>

              {/* Deliverables Checklist */}
              <div className="mt-6 border-t border-[#e5eef1] pt-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#7890a0]">
                  Blueprint Artifacts You Receive
                </p>
                <ul className="mt-3 grid gap-2">
                  {current.deliverables.map((item, idx) => (
                    <li
                      key={item}
                      className="flex items-center justify-between border border-[#e2edf0] bg-[#f8fbfc] px-3.5 py-2 text-xs font-extrabold text-[#142e4c]"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-[10px] font-black tabular-nums text-[#00a6cb]">
                          0{idx + 1}
                        </span>
                        {item}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#008da4]">PDF / Repo</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

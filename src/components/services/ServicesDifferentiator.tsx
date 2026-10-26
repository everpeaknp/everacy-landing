"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useReducedMotion } from "@/hooks";
import type { ServiceDifferentiatorPillarData } from "@/lib/api";

const defaultPillars = [
  {
    id: "ownership",
    label: "End-to-End Ownership",
    title: "Engineers who think like product owners",
    description:
      "We don’t just close tickets. We question unclear requirements, flag edge cases early, and measure success by how reliably your product performs in the hands of real users.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
    imageCaption: "Senior engineering & architectural reviews on every sprint",
    captionColor: "#ffffff",
    highlights: [
      "Direct Slack & GitHub collaboration with senior engineers",
      "Architecture decision records (ADRs) for every major choice",
      "Zero hand-off friction between design, backend, and frontend",
    ],
  },
  {
    id: "quality",
    label: "Clean Architecture",
    title: "Built to evolve without expensive rewrites",
    description:
      "Every service we ship includes typed contracts, automated CI checks, structured observability, and clean documentation so your team can scale confidently.",
    image: "/images/saas.jpg",
    imageCaption: "Typed contracts, automated testing, and peer-reviewed pull requests",
    captionColor: "#ffffff",
    highlights: [
      "Automated test suites and staging previews on every branch",
      "Security-first dependency and secrets management",
      "Complete IP ownership and clean repository handover",
    ],
  },
  {
    id: "velocity",
    label: "Predictable Velocity",
    title: "Weekly demos, transparent roadmaps",
    description:
      "You never have to guess where your project stands. Every Friday you see working software in a live staging environment, backed by clear burn-up metrics.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85",
    imageCaption: "Live Friday staging demonstrations with product stakeholders",
    captionColor: "#ffffff",
    highlights: [
      "Sprint goals tied directly to business milestones",
      "Proactive risk flagging before timelines slip",
      "Flexible scope adjustments as you learn from users",
    ],
  },
];

interface ServicesDifferentiatorProps {
  pillars?: ServiceDifferentiatorPillarData[] | null;
  serviceTitle?: string;
  ctaHref?: string;
}

export function ServicesDifferentiator({
  pillars,
  serviceTitle,
  ctaHref = "/contact",
}: ServicesDifferentiatorProps) {
  const reduced = useReducedMotion();

  const formattedPillars = useMemo(() => {
    if (pillars && pillars.length > 0) {
      return pillars.map((p) => ({
        id: String(p.id),
        label: p.label,
        title: p.title,
        description: p.description,
        image: p.image || "/images/saas.jpg",
        imageCaption: p.image_caption || "",
        captionColor: p.caption_color || "#ffffff",
        highlights: p.highlights || [],
      }));
    }
    return defaultPillars;
  }, [pillars]);

  const [activePillar, setActivePillar] = useState(0);
  const current = formattedPillars[activePillar] || formattedPillars[0];

  if (!current) return null;

  return (
    <section
      id="service-apart"
      className="scroll-mt-24 border-b border-[#dce8ec] bg-[#f4f9fa] px-5 py-20 sm:px-8 sm:py-28"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left: Clean Editorial Portrait Photo (3 sharp corners + 1 signature bottom-right curve, no double frame) */}
          <figure className="relative mx-auto w-full max-w-[460px] lg:mx-0">
            <div className="relative aspect-[4/4.6] w-full overflow-hidden rounded-br-[3.75rem] bg-[#06182c] shadow-[0_24px_54px_-28px_rgba(13,42,74,0.3)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.image}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduced ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="relative h-full w-full"
                >
                  <Image
                    src={current.image}
                    alt={current.imageCaption || "Everacy delivery standard"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 44vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06182c]/70 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {current.imageCaption && (
                <div className="absolute bottom-5 left-5 right-8 text-white">
                  <p
                    className="text-xs font-bold leading-5"
                    style={{ color: current.captionColor }}
                  >
                    {current.imageCaption}
                  </p>
                </div>
              )}
            </div>
          </figure>

          {/* Right: Editorial Copy & Boxy Pillar Switcher */}
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#008da4]">
              Why teams choose us
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#0d2a4a] sm:text-5xl">
              Here&apos;s what <span className="text-[#00a6cb]">sets us apart</span>
            </h2>

            {/* Sharp Boxy Pillar Tabs */}
            <div
              className="mt-7 grid grid-cols-3 border-l border-t border-[#d5e4e8] bg-white"
              role="tablist"
              aria-label="What sets Everacy apart"
            >
              {formattedPillars.map((pillar, idx) => {
                const selected = idx === activePillar;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActivePillar(idx)}
                    className={`border-b border-r border-[#d5e4e8] px-3 py-3 text-left text-xs font-extrabold uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00a6cb] sm:px-4 ${
                      selected
                        ? "border-t-2 border-t-[#00a6cb] bg-[#0d2a4a] text-white"
                        : "bg-white text-[#4f667d] hover:bg-[#edf6f8] hover:text-[#0d2a4a]"
                    }`}
                  >
                    <span className="block text-[10px] opacity-60">0{idx + 1}</span>
                    <span className="mt-0.5 block truncate">{pillar.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="border border-t-0 border-[#d5e4e8] bg-white p-6 sm:p-8">
              <h3 className="text-xl font-extrabold text-[#0d2a4a] sm:text-2xl">{current.title}</h3>
              <p className="mt-3 text-base leading-7 text-[#586d82]">{current.description}</p>

              <ul className="mt-6 space-y-2.5 border-t border-[#e5eef1] pt-5">
                {current.highlights.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm font-bold text-[#142e4c]">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#00a6cb]" strokeWidth={3} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href={ctaHref}
                className="inline-flex min-h-12 items-center gap-3 bg-[#00a6cb] px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#078fae] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d2a4a] focus-visible:ring-offset-2"
              >
                {serviceTitle ? `Discuss ${serviceTitle}` : "Work with us"}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-12 items-center gap-2 px-3 py-3 text-sm font-extrabold text-[#0d2a4a] transition hover:text-[#008da4]"
              >
                Meet our team
                <ArrowRight aria-hidden="true" className="h-4 w-4 text-[#00a6cb]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

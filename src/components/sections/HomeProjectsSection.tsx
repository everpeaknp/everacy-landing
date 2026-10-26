/* ─────────────────────────────────────────────────────────
   HomeProjectsSection — Featured Case Studies & Proven Track Record
   Inspired by Leapfrog's high-impact visual case study showcase:
   - Real product screenshots (YummyEver Restaurant OS & SajiloWork Task Marketplace)
   - High-contrast architectural cards with sharp boxy geometry (rounded-none)
   - Concrete tech stack badges & verified feature outcomes
   - Core engineering metrics bar (Availability, Latency, FPS, ACID Integrity)
   ───────────────────────────────────────────────────────── */
"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import type { ProjectData } from "@/lib/api";

interface HomeProjectsSectionProps {
  projects?: ProjectData[] | null;
}

const FALLBACK_PROJECTS = [
  {
    id: 1,
    name: "YUMMYEVER",
    slug: "yummyever",
    category: "RESTAURANT OS & ENTERPRISE SAAS",
    tagline: "The #1 Restaurant Operating System in Nepal",
    description:
      "A complete cloud-native restaurant management ecosystem uniting guest QR ordering, kitchen order tracking (KOT), IRD-approved billing, and automated inventory sync under one roof.",
    image: "/images/service-previews/saas-dashboard.svg",
    screenshotUrl: "http://127.0.0.1:8002/media/projects/screenshots/yummyever-yummymanage_dashboard.png",
    techStack: ["Next.js", "Flutter", "FastAPI", "PostgreSQL", "Docker"],
    highlights: [
      "IRD Tax-Approved Billing & Automated Invoicing",
      "Real-Time Kitchen Order Tracking (KOT) Dispatch",
      "Auto-Deducting Inventory with Low-Stock Triggers",
      "Multi-Branch Analytics & Sales Aggregation",
    ],
    metric: "100K+ Monthly Orders",
  },
  {
    id: 2,
    name: "SAJILOWORK",
    slug: "sajilowork",
    category: "TWO-SIDED TASK MARKETPLACE",
    tagline: "Distributed Labor & On-Demand Service Engine",
    description:
      "A high-concurrency marketplace connecting service professionals with job seekers across Nepal, powered by real-time bidding, in-app coordination chat, and escrow payment protection.",
    image: "/images/service-previews/responsive-platforms.png",
    screenshotUrl: "http://127.0.0.1:8002/media/projects/screenshots/sajilowork-sajilowork_1.png",
    techStack: ["React Native", "Django", "PostgreSQL", "eSewa & Khalti", "WebSockets"],
    highlights: [
      "Interactive Geolocation Task Discovery & Map Binds",
      "Real-Time Bid Negotiation & In-App Coordination",
      "Secure Escrow Wallet with Local Gateway Payouts",
      "Two-Sided Verified Identity & Review Integrity",
    ],
    metric: "Real-Time Escrow Flow",
  },
];

const ENGINEERING_METRICS = [
  {
    value: "99.98%",
    label: "PRODUCTION UPTIME",
    sub: "Continuous SLA across active cloud deployments",
  },
  {
    value: "< 80ms",
    label: "API LATENCY",
    sub: "Edge-cached queries and optimized query plans",
  },
  {
    value: "60 FPS",
    label: "MOBILE GESTURE FLOW",
    sub: "Hardware-accelerated native iOS & Android engines",
  },
  {
    value: "100%",
    label: "ACID INTEGRITY",
    sub: "Strict transactional safety on financial workflows",
  },
];

export function HomeProjectsSection({ projects }: HomeProjectsSectionProps) {
  const displayProjects = (projects && projects.length > 0)
    ? projects.slice(0, 2).map((p, idx) => {
        const fallback = FALLBACK_PROJECTS[idx % FALLBACK_PROJECTS.length];
        const screen = p.screenshots?.[0]?.image || p.background_image || fallback.screenshotUrl;

        return {
          id: p.id,
          name: p.name,
          slug: p.slug,
          category: idx === 0 ? "RESTAURANT OS & ENTERPRISE SAAS" : "TWO-SIDED TASK MARKETPLACE",
          tagline: p.tagline?.text || p.description || fallback.tagline,
          description: p.description || fallback.description,
          image: screen,
          screenshotUrl: screen,
          techStack: p.tech_stack?.length ? p.tech_stack : fallback.techStack,
          highlights: p.features?.length ? p.features : fallback.highlights,
          metric: idx === 0 ? "100K+ Monthly Orders" : "Real-Time Escrow Flow",
        };
      })
    : FALLBACK_PROJECTS;

  return (
    <section className="relative z-[2] overflow-hidden border-t border-[#dce8ec] bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 border border-[#dce8ec] bg-[#f8fbfc] px-3 py-1 shadow-sm">
              <span className="h-2 w-2 bg-[#008da4]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#008da4]">
                Proven Track Record
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-[#0d2a4a] sm:text-4xl lg:text-5xl">
              Systems Built For Impact &amp; Scale
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#586d82]">
              From multi-location restaurant operating systems to high-concurrency labor marketplaces—see how our engineering squads turn complex requirements into market-leading production products.
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex shrink-0 items-center gap-2 rounded-none border border-[#0d2a4a] bg-white px-5 py-3 font-mono text-xs font-black uppercase tracking-wider text-[#0d2a4a] transition-all hover:bg-[#0d2a4a] hover:text-white"
          >
            <span>Browse All Case Studies</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 2 Large Visual Case Study Cards (Just like Leapfrog's Featured Cards) */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {displayProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.12 }}
              className="group flex flex-col justify-between rounded-none border border-[#dce8ec] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#008da4] hover:shadow-[5px_5px_0px_0px_#008da4] sm:p-8"
            >
              <div>
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f0f4f6] pb-4">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#008da4]">
                    {project.category}
                  </span>
                  <span className="border border-[#dce8ec] bg-[#f8fbfc] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#0d2a4a]">
                    {project.metric}
                  </span>
                </div>

                {/* Big Visual Product Screenshot Viewport */}
                <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-none border border-[#e2ecee] bg-[#0a1829]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.screenshotUrl}
                    alt={`${project.name} Production Interface`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={(e) => {
                      // Fallback if media server image isn't reachable
                      (e.currentTarget as HTMLImageElement).src =
                        idx === 0
                          ? "/images/service-previews/saas-dashboard.svg"
                          : "/images/service-previews/responsive-platforms.png";
                    }}
                  />

                  {/* Visual Overlay Tag */}
                  <div className="absolute bottom-3 left-3 z-10 border border-white/20 bg-[#0d2a4a]/90 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-white backdrop-blur-xs">
                    LIVE PRODUCTION SYSTEM
                  </div>
                </div>

                {/* Title & Tagline */}
                <div className="mt-6">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-[#0d2a4a] transition-colors group-hover:text-[#008da4] sm:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs font-bold text-[#008da4]">
                    {project.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#586d82]">
                    {project.description}
                  </p>
                </div>

                {/* Concrete Features & Highlights */}
                <div className="mt-6 border-t border-[#f0f4f6] pt-5">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#7a8f9f]">
                    SYSTEM CAPABILITIES DELIVERED:
                  </p>
                  <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {project.highlights.map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-xs font-medium text-[#405669]">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#008da4]" />
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-[#f0f4f6] pt-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="border border-[#dce8ec] bg-[#f8fbfc] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#5c7288]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 border-t border-[#f0f4f6] pt-5">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 font-mono text-xs font-black uppercase tracking-wider text-[#008da4] transition-colors group-hover:text-[#0d2a4a]"
                >
                  <span>Explore Case Study &amp; Architecture</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4 Core Engineering Metrics (Inspired by Leapfrog's Stats Bar) */}
        <div className="mt-12 grid grid-cols-1 gap-4 border border-[#dce8ec] bg-[#f8fbfc] p-6 sm:grid-cols-2 lg:grid-cols-4 sm:p-8">
          {ENGINEERING_METRICS.map((metric, idx) => (
            <div
              key={metric.label}
              className={`flex flex-col justify-between ${
                idx !== 0 ? "lg:border-l lg:border-[#dce8ec] lg:pl-6" : ""
              }`}
            >
              <div>
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#0d2a4a]">
                  {metric.value}
                </span>
                <p className="mt-1 font-mono text-xs font-bold uppercase tracking-wider text-[#008da4]">
                  {metric.label}
                </p>
                <p className="mt-1.5 text-xs text-[#5c7288] leading-relaxed">
                  {metric.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

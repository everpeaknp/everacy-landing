"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ServiceCapabilityData } from "@/lib/api";
import { resolveMetadataImageUrl, siteConfig } from "@/lib/seo";

interface ServiceCapabilityExplorerProps {
  capabilities: ServiceCapabilityData[];
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: string | null;
  imageAlt?: string;
  imageTitle?: string;
  imageIsDecorative?: boolean;
  bottomTitle?: string;
  bottomSubtext?: string;
  bottomCtaLabel?: string;
  bottomCtaHref?: string;
}

interface CapabilityShowcase {
  photoSrc: string;
  categoryLabel: string;
  highlights: string[];
}

function getCapabilityShowcase(title: string, index: number): CapabilityShowcase {
  const normalized = title.toLowerCase();

  if (/e-?commerce|store|shop|checkout|retail/.test(normalized)) {
    return {
      photoSrc: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
      categoryLabel: "Commerce & Storefronts",
      highlights: ["Catalog & Instant Search", "Checkout & Payment Gateways", "Order & Inventory Sync"],
    };
  }

  if (/headless|next\.?js|react|dashboard|saas|portal|web app|platform/.test(normalized)) {
    return {
      photoSrc: "/images/saas.jpg",
      categoryLabel: "Web Apps & Platforms",
      highlights: ["Next.js & React Architecture", "Modular Design System", "Typed APIs & Auth"],
    };
  }

  if (/redesign|optimization|performance|seo|speed|audit|migration/.test(normalized)) {
    return {
      photoSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
      categoryLabel: "Performance & SEO",
      highlights: ["Core Web Vitals Tuning", "UX & Conversion Audit", "Zero-Loss SEO Migration"],
    };
  }

  if (/corporate|business|brand|hospitality|landing|website/.test(normalized)) {
    return {
      photoSrc: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
      categoryLabel: "Brand & Corporate Sites",
      highlights: ["Editorial Brand Storytelling", "Code-Free Django CMS", "Full Schema & On-Page SEO"],
    };
  }

  const fallbacks: CapabilityShowcase[] = [
    {
      photoSrc: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
      categoryLabel: "Digital Experience",
      highlights: ["Responsive UI System", "Structured CMS", "Technical SEO Baseline"],
    },
    {
      photoSrc: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
      categoryLabel: "Commerce Systems",
      highlights: ["High-Converting Flows", "Payment Integrations", "Inventory Automation"],
    },
    {
      photoSrc: "/images/saas.jpg",
      categoryLabel: "Custom Web Platform",
      highlights: ["Modern React & Next.js", "Role-Based Dashboards", "Automated CI/CD"],
    },
    {
      photoSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
      categoryLabel: "Optimization & Scale",
      highlights: ["Sub-Second Page Loads", "Accessibility (WCAG)", "Analytics & Tracking"],
    },
  ];

  return fallbacks[index % fallbacks.length];
}

export function ServiceCapabilityExplorer({
  capabilities,
  eyebrow,
  title,
  description,
  bottomTitle,
  bottomSubtext,
  bottomCtaLabel,
  bottomCtaHref,
}: ServiceCapabilityExplorerProps) {
  if (capabilities.length === 0) return null;

  return (
    <section
      id="service-solutions"
      className="scroll-mt-24 border-b border-[#dce8ec] bg-[#f4f9fa] px-5 py-20 sm:px-8 sm:py-28"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Editorial Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-[#d5e4e8] pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#008da4]">
              {eyebrow || "Solutions & Deliverables"}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#0d2a4a] sm:text-5xl">
              {title || "What we can build"}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#586d82] sm:text-base">
            {description ||
              "Every solution is tailored to your audience, engineered on a modern stack, and delivered with full code ownership."}
          </p>
        </div>

        {/* 2x2 Architectural Image Cards — Single Clean Full-Bleed Image Header */}
        <div className="grid gap-8 md:grid-cols-2">
          {capabilities.map((capability, index) => {
            const showcase = getCapabilityShowcase(capability.title, index);
            const rawImage = capability.image?.trim() || "";
            const resolvedImage = rawImage
              ? resolveMetadataImageUrl(rawImage, siteConfig.url) || rawImage
              : "";
            const photoSrc = resolvedImage || showcase.photoSrc;
            const categoryLabel = capability.category_label?.trim() || showcase.categoryLabel;
            const highlights =
              capability.highlights && capability.highlights.length > 0
                ? capability.highlights
                : showcase.highlights;

            return (
              <article
                key={`${capability.title}-${index}`}
                className="group flex flex-col overflow-hidden border border-[#d5e4e8] bg-white transition-all duration-300 hover:border-[#00a6cb] hover:shadow-[0_24px_48px_-28px_rgba(13,42,74,0.2)]"
              >
                {/* Single Clean Full-Bleed Photograph (No double layering) */}
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[#dce8ec] bg-[#06182c]">
                  <Image
                    src={photoSrc}
                    alt={capability.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    unoptimized={Boolean(photoSrc && (photoSrc.startsWith("http") || photoSrc.startsWith("/media")))}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#06182c]/55 via-transparent to-transparent"
                  />

                  <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                    <span className="bg-[#06182c]/85 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#7fdcf0] backdrop-blur-sm">
                      {categoryLabel}
                    </span>
                    <span className="grid h-8 w-8 place-items-center bg-white/95 text-xs font-black tabular-nums text-[#0d2a4a]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* Clean Editorial Card Body */}
                <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
                  <div>
                    <h3 className="text-xl font-black leading-snug text-[#0d2a4a] transition-colors group-hover:text-[#008da4] sm:text-2xl">
                      {capability.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-6 text-[#586d82] sm:text-[15px]">
                      {capability.description}
                    </p>
                  </div>

                  {/* Clean Deliverable Spec Chips */}
                  <div className="mt-6 border-t border-[#e5eef1] pt-5">
                    <div className="flex flex-wrap items-center gap-2">
                      {highlights.map((item) => (
                        <span
                          key={item}
                          className="border border-[#dce8ec] bg-[#f4f9fa] px-3 py-1.5 text-xs font-extrabold text-[#142e4c] transition-colors group-hover:border-[#00a6cb]/40 group-hover:bg-[#eaf6f8]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Architect Strip (No blue left border) */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border border-[#d5e4e8] bg-white px-6 py-5 sm:flex-row sm:items-center sm:px-8">
          <div>
            <p className="text-sm font-extrabold text-[#0d2a4a]">
              {bottomTitle || "Have a custom architecture or multi-platform build in mind?"}
            </p>
            <p className="mt-0.5 text-xs font-medium text-[#586d82]">
              {bottomSubtext || "We can combine any of these capabilities into a single roadmap."}
            </p>
          </div>
          <Link
            href={bottomCtaHref || "/contact"}
            className="inline-flex shrink-0 items-center gap-2 bg-[#0d2a4a] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-white transition hover:bg-[#00a6cb]"
          >
            {bottomCtaLabel || "Scope your project"}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

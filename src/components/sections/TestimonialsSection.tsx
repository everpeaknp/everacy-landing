/* ─────────────────────────────────────────────────────────
   TestimonialsSection — Sharp Architectural Client Validation
   Boxy, high-trust, editorial showcase:
   - Razor-sharp geometry (rounded-none throughout)
   - Boxy interactive company tab row
   - High-contrast featured testimonial card with sharp borders & shadow
   - Clean keyboard-accessible Prev/Next & step-indicator navigation
   ───────────────────────────────────────────────────────── */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonialBg } from "@/lib/site-theme";
import { EmptyState } from "@/components/ui/EmptyState";
import type { TestimonialData } from "@/lib/api";

const AUTO_INTERVAL = 6000;

interface NormalisedTestimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  accent: string;
  image: string;
  imageAlt: string;
  imageTitle: string;
  imageDecorative: boolean;
  companyLogo: string | null;
}

function normalise(t: TestimonialData): NormalisedTestimonial {
  return {
    id: String(t.id),
    quote: t.quote,
    name: t.name,
    role: t.designation,
    company: t.company ?? "",
    rating: t.rating,
    accent: t.accent_color || "#008da4",
    image: t.image || "",
    imageAlt: t.image_alt || t.name,
    imageTitle: t.image_title || t.image_alt || t.name,
    imageDecorative: Boolean(t.image_is_decorative),
    companyLogo: t.company_logo || null,
  };
}

interface TestimonialsSectionProps {
  data?: TestimonialData[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export function TestimonialsSection({ data, sectionTitle, sectionSubtitle }: TestimonialsSectionProps) {
  const testimonials: NormalisedTestimonial[] = (data ?? []).map(normalise);

  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || testimonials.length < 2) return;

    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, AUTO_INTERVAL);

    return () => window.clearInterval(interval);
  }, [isPaused, testimonials.length]);

  if (testimonials.length === 0) return <EmptyState title="No testimonials published yet" />;

  const activeT = testimonials[active] ?? testimonials[0];
  const cleanQuote = activeT.quote.replace(/^["'“‟”‟\s]+|["'“‟”‟\s]+$/g, "");

  const handlePrev = () => {
    setActive((curr) => (curr - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setActive((curr) => (curr + 1) % testimonials.length);
  };

  return (
    <section
      className="relative z-[3] overflow-hidden border-t border-[#dce8ec]"
      style={{
        background: testimonialBg || "#f8fbfc",
        paddingBlock: "clamp(3.5rem, 7vw, 6rem)",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <div className="inline-flex items-center gap-2 border border-[#dce8ec] bg-white px-3 py-1 shadow-sm">
            <span className="h-2 w-2 bg-[#008da4]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#008da4]">
              {sectionSubtitle || "Client Validation"}
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-black uppercase tracking-tight text-[#0d2a4a] sm:text-3xl lg:text-4xl">
            {sectionTitle || "What Leaders Say About Everacy"}
          </h2>
        </div>

        {/* Sharp Boxy Company Tabs */}
        {testimonials.length > 1 && (
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {testimonials.map((item, idx) => {
              const isActive = active === idx;
              return (
                <button
                  key={`company-tab-${item.id}`}
                  onClick={() => setActive(idx)}
                  className={`group relative flex h-11 items-center justify-center border px-4 transition-all duration-150 rounded-none cursor-pointer ${
                    isActive
                      ? "border-[#008da4] bg-white text-[#0d2a4a] shadow-[3px_3px_0px_0px_#008da4]"
                      : "border-[#dce8ec] bg-white/70 text-[#5c7288] hover:border-[#008da4]/50 hover:bg-white hover:text-[#0d2a4a]"
                  }`}
                  aria-label={`View feedback from ${item.company || item.name}`}
                >
                  {item.companyLogo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.companyLogo}
                      alt={item.company || item.name}
                      className="max-h-5 w-auto object-contain transition-all"
                      style={{ filter: isActive ? "none" : "grayscale(100%) opacity(60%)" }}
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">
                      {item.company || item.name}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Sharp Main Testimonial Card */}
        <div className="relative mx-auto max-w-4xl rounded-none border border-[#dce8ec] bg-white p-6 shadow-[4px_4px_0px_0px_#008da4] sm:p-10">
          {/* Top Bar inside Card */}
          <div className="flex items-center justify-between border-b border-[#eef4f6] pb-4">
            {/* Stars & Company Tag */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={`star-${i}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={i < activeT.rating ? "#008da4" : "#e2ecee"}
                    className="h-3.5 w-3.5"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              {activeT.company && (
                <span className="hidden text-[11px] font-mono font-bold uppercase tracking-wider text-[#008da4] sm:inline-block">
                  / {activeT.company}
                </span>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-[#5c7288]">
                {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="grid h-8 w-8 place-items-center rounded-none border border-[#dce8ec] bg-white text-[#0d2a4a] transition-all hover:border-[#008da4] hover:bg-[#008da4] hover:text-white"
                  aria-label="Previous testimonial"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="grid h-8 w-8 place-items-center rounded-none border border-[#dce8ec] bg-white text-[#0d2a4a] transition-all hover:border-[#008da4] hover:bg-[#008da4] hover:text-white"
                  aria-label="Next testimonial"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Quote Body with AnimatePresence */}
          <div className="py-6 sm:py-8 min-h-[140px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeT.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="w-full"
              >
                <p className="text-lg font-medium leading-relaxed tracking-tight text-[#0d2a4a] sm:text-xl md:text-2xl">
                  &ldquo;{cleanQuote}&rdquo;
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Reviewer Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#eef4f6] pt-5">
            <div className="flex items-center gap-3.5">
              {/* Sharp Square Avatar */}
              {activeT.image ? (
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-none border border-[#008da4] bg-[#f8fbfc] p-0.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeT.image}
                    alt={activeT.imageDecorative ? "" : activeT.imageAlt}
                    title={activeT.imageDecorative ? undefined : activeT.imageTitle}
                    className="h-full w-full rounded-none object-cover"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-none border border-[#008da4] bg-[#f0f8fa] text-xs font-mono font-bold text-[#008da4]">
                  {activeT.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
              )}

              <div>
                <div className="text-sm font-black tracking-tight text-[#0d2a4a] sm:text-base">
                  {activeT.name}
                </div>
                <div className="text-xs font-mono font-medium text-[#5c7288]">
                  {activeT.role} {activeT.company ? `— ${activeT.company}` : ""}
                </div>
              </div>
            </div>

            {/* Boxy Verified Badge */}
            <div className="inline-flex items-center gap-1.5 border border-[#dce8ec] bg-[#f8fbfc] px-2.5 py-1 text-[11px] font-mono text-[#008da4]">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span>VERIFIED PARTNER</span>
            </div>
          </div>
        </div>

        {/* Sharp Bar Indicators */}
        {testimonials.length > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={`bar-indicator-${idx}`}
                onClick={() => setActive(idx)}
                className={`h-1.5 transition-all duration-200 rounded-none cursor-pointer ${
                  active === idx ? "w-8 bg-[#008da4]" : "w-3 bg-[#dce8ec] hover:bg-[#b8d2d9]"
                }`}
                aria-label={`Jump to review ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

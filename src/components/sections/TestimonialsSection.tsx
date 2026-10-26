/* ─────────────────────────────────────────────────────────
   TestimonialsSection — Architectural Wall of Trust
   Clean, refined engineering showcase:
   - Subtle architectural borders (no heavy/exaggerated solid colored shadows)
   - Scalable client logo ribbon with auto-scroll and arrow controls for any number of clients
   - Logo-first representation without awkward label truncations
   - High-fidelity portrait showcase with robust local demo fallbacks
   - Rectangular slide indicators and clean previous/next controls
   - Sharp, boxy architectural geometry (rounded-none throughout)
   ───────────────────────────────────────────────────────── */
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import type { TestimonialData } from "@/lib/api";

const AUTO_INTERVAL_MS = 5000;

interface NormalisedTestimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  accent: string;
  image: string;
  companyLogo: string;
}

const DEMO_FALLBACKS: Record<string, { image: string; companyLogo: string }> = {
  "devi's gym": {
    image: "/images/testimonials/babyka_photo.png",
    companyLogo: "/images/testimonials/logos/devis_gym.jpg",
  },
  "lilywhite realestate": {
    image: "/images/testimonials/person.png",
    companyLogo: "/images/testimonials/logos/lilywhite.png",
  },
  "nepal volleyball club hamburg e.v.": {
    image: "/images/testimonials/shiva.jpg",
    companyLogo: "/images/testimonials/logos/nvc.webp",
  },
  "neps foods": {
    image: "/images/person.png",
    companyLogo: "/images/testimonials/logos/neps_foods.jpg",
  },
  "mickey events": {
    image: "/images/testimonials/ashmi.png",
    companyLogo: "/images/testimonials/logos/mickey_events.png",
  },
  "himal mobile traders": {
    image: "/images/testimonials/roshan.jpg",
    companyLogo: "/images/testimonials/logos/himal_mobile.png",
  },
};

const DEFAULT_AVATARS = [
  "/images/testimonials/babyka_photo.png",
  "/images/testimonials/person.png",
  "/images/testimonials/shiva.jpg",
  "/images/person.png",
  "/images/testimonials/ashmi.png",
  "/images/testimonials/roshan.jpg",
];

const DEFAULT_LOGOS = [
  "/images/testimonials/logos/devis_gym.jpg",
  "/images/testimonials/logos/lilywhite.png",
  "/images/testimonials/logos/nvc.webp",
  "/images/testimonials/logos/neps_foods.jpg",
  "/images/testimonials/logos/mickey_events.png",
  "/images/testimonials/logos/himal_mobile.png",
];

const DEFAULT_TESTIMONIALS: TestimonialData[] = [
  {
    id: 1,
    name: "Babyka Gurung",
    designation: "Founder",
    company: "Devi's Gym",
    quote: "We wanted a website that matched the high energy and professionalism of our gym, and Everacy absolutely delivered. The new site looks fantastic, works perfectly on mobile phones, and has made it so much easier for new members to find and join us.",
    image: "/images/testimonials/babyka_photo.png",
    company_logo: "/images/testimonials/logos/devis_gym.jpg",
    rating: 5,
    accent_color: "#e63946",
    order: 0,
  },
  {
    id: 2,
    name: "Bijen Khadka",
    designation: "Founder",
    company: "LilyWhite RealEstate",
    quote: "Everacy completely transformed our digital presence. Our new property platform is incredibly fast and intuitive, leading to a noticeable increase in client inquiries. Their engineering team understood our vision perfectly and delivered a flawless user experience.",
    image: "/images/testimonials/person.png",
    company_logo: "/images/testimonials/logos/lilywhite.png",
    rating: 5,
    accent_color: "#008da4",
    order: 1,
  },
  {
    id: 3,
    name: "Shiva Prasad Adhikari",
    designation: "Secretary",
    company: "Nepal Volleyball Club Hamburg e.V.",
    quote: "The team at Everacy was a pleasure to work with. They developed a stunning, modern website for our club that helps us easily share news, events, and updates with our members. It has given our community a truly professional digital home.",
    image: "/images/testimonials/shiva.jpg",
    company_logo: "/images/testimonials/logos/nvc.webp",
    rating: 5,
    accent_color: "#1d3557",
    order: 2,
  },
  {
    id: 4,
    name: "Suman Adhikari",
    designation: "Founder",
    company: "Neps Foods",
    quote: "Our new website is gorgeous! Everacy perfectly captured the essence of our brand and presented our menus in a way that makes you hungry just looking at it. The site is incredibly smooth and easy for our customers to navigate.",
    image: "/images/person.png",
    company_logo: "/images/testimonials/logos/neps_foods.jpg",
    rating: 5,
    accent_color: "#f4a261",
    order: 3,
  },
  {
    id: 5,
    name: "Ashmi Bhandari",
    designation: "Founder",
    company: "Mickey Events",
    quote: "Everacy built a vibrant, high-performing website that perfectly showcases the scale and excitement of our events. Not only does it look visually stunning, but the site remains incredibly fast and responsive even when we get huge spikes in traffic.",
    image: "/images/testimonials/ashmi.png",
    company_logo: "/images/testimonials/logos/mickey_events.png",
    rating: 5,
    accent_color: "#2a9d8f",
    order: 4,
  },
  {
    id: 6,
    name: "Roshan Raj Tiwari",
    designation: "Owner",
    company: "Himal Mobile Traders",
    quote: "Everacy didn't just build us a fantastic, fast-loading website—they completely turned our online visibility around. Thanks to their deep SEO strategies, we are now ranking higher than ever on Google, and it has directly translated to a massive increase in our daily foot traffic and sales. Exceptional work!",
    image: "/images/testimonials/roshan.jpg",
    company_logo: "/images/testimonials/logos/himal_mobile.png",
    rating: 5,
    accent_color: "#008da4",
    order: 5,
  },
];

function normalise(t: TestimonialData, idx: number): NormalisedTestimonial {
  const companyKey = (t.company || "").toLowerCase().trim();
  const matchedDemo = DEMO_FALLBACKS[companyKey];

  const resolvedImage =
    t.image && t.image.trim() !== ""
      ? t.image
      : matchedDemo?.image || DEFAULT_AVATARS[idx % DEFAULT_AVATARS.length];

  const resolvedLogo =
    t.company_logo && t.company_logo.trim() !== ""
      ? t.company_logo
      : matchedDemo?.companyLogo || DEFAULT_LOGOS[idx % DEFAULT_LOGOS.length];

  return {
    id: String(t.id || idx),
    quote: t.quote,
    name: t.name,
    role: t.designation,
    company: t.company || "Enterprise Partner",
    rating: t.rating || 5,
    accent: t.accent_color || "#008da4",
    image: resolvedImage,
    companyLogo: resolvedLogo,
  };
}

interface TestimonialsSectionProps {
  data?: TestimonialData[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export function TestimonialsSection({
  data,
  sectionTitle,
  sectionSubtitle,
}: TestimonialsSectionProps) {
  const rawList = data && data.length > 0 ? data : DEFAULT_TESTIMONIALS;
  const testimonials: NormalisedTestimonial[] = rawList.map(normalise);

  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const activeTabRef = useRef<HTMLButtonElement | null>(null);

  const handleNext = useCallback(() => {
    setActive((curr) => (curr + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((curr) => (curr - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Keep active client tab smoothly in view when active changes
  useEffect(() => {
    if (activeTabRef.current && scrollRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [active]);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;

    const interval = setInterval(handleNext, AUTO_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [handleNext, isPaused, testimonials.length]);

  const scrollNav = (delta: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: delta, behavior: "smooth" });
    }
  };

  const current = testimonials[active] ?? testimonials[0];

  return (
    <section
      className="relative z-[2] overflow-hidden border-t border-[#dce8ec] bg-[#f8fbfc] py-20 sm:py-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header (Architectural Style Matching Home & Case Studies) */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-12">
          <div>
            <div className="inline-flex items-center gap-2 border border-[#dce8ec] bg-white px-3 py-1 shadow-sm">
              <span className="h-2 w-2 bg-[#008da4]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#008da4]">
                {sectionSubtitle || "WALL OF TRUST"}
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-[#0d2a4a] sm:text-4xl lg:text-5xl">
              {sectionTitle || "Trusted By Builders. Proven In Production."}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#586d82]">
              Real-world outcomes, direct operational feedback, and engineering partnerships that stand the test of scale.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden lg:flex items-center gap-4 border border-[#dce8ec] bg-white p-3 font-mono text-xs font-bold text-[#0d2a4a]">
            <div className="flex items-center gap-1.5 text-[#008da4]">
              <ShieldCheck className="h-4 w-4" />
              <span>100% PRODUCTION VERIFIED</span>
            </div>
            <span className="text-[#dce8ec]">|</span>
            <span className="text-[#7a8f9f]">5.0 AVERAGE RATING</span>
          </div>
        </div>

        {/* 1. Client Organization Logo Ribbon (Fluid, Organic & Breathable — No Squary Grid Boxes) */}
        <div className="relative mb-10">
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex items-center justify-start md:justify-center gap-8 sm:gap-12 md:gap-16 overflow-x-auto scrollbar-none py-3 px-4 scroll-smooth"
            >
              {testimonials.map((item, idx) => {
                const isActive = active === idx;
                return (
                  <button
                    key={`client-tab-${item.id}`}
                    ref={isActive ? activeTabRef : null}
                    type="button"
                    onClick={() => setActive(idx)}
                    className="group relative flex flex-col items-center justify-center py-2 px-3 transition-all duration-300 cursor-pointer shrink-0"
                    aria-label={`View testimonial from ${item.company}`}
                  >
                    {/* Clean Logo Image (No squary cell walls or divide lines) */}
                    <div className="relative h-9 sm:h-11 w-auto min-w-[90px] max-w-[140px] flex items-center justify-center">
                      <img
                        src={item.companyLogo}
                        alt={item.company}
                        title={item.company}
                        className={`h-full w-auto max-h-9 sm:max-h-11 max-w-[130px] object-contain transition-all duration-300 ${
                          isActive
                            ? "grayscale-0 opacity-100 scale-105 drop-shadow-sm"
                            : "grayscale opacity-35 hover:grayscale-0 hover:opacity-75"
                        }`}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            DEFAULT_LOGOS[idx % DEFAULT_LOGOS.length];
                        }}
                      />
                    </div>

                    {/* Elegant Minimalist Active Underline Pill */}
                    {isActive && (
                      <motion.span
                        layoutId="active-testimonial-logo-pill"
                        className="absolute -bottom-2 h-[2.5px] w-8 bg-[#008da4]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Subtle Floating Scroll Controls (Only if overflowing) */}
            {testimonials.length > 5 && (
              <>
                <button
                  type="button"
                  onClick={() => scrollNav(-220)}
                  className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 h-8 w-8 items-center justify-center bg-white border border-[#dce8ec] text-[#7a8f9f] hover:text-[#008da4] hover:border-[#008da4] transition-all cursor-pointer shadow-sm rounded-none"
                  aria-label="Scroll logos left"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollNav(220)}
                  className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 h-8 w-8 items-center justify-center bg-white border border-[#dce8ec] text-[#7a8f9f] hover:text-[#008da4] hover:border-[#008da4] transition-all cursor-pointer shadow-sm rounded-none"
                  aria-label="Scroll logos right"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* 2. Refined Architectural Spotlight Card (Subtle hairline border + elegant top accent) */}
        <div className="relative border border-[#dce8ec] border-t-2 border-t-[#008da4] bg-white p-6 sm:p-10 lg:p-12 shadow-[0_4px_24px_rgba(13,42,74,0.04)] rounded-none">
          {/* Subtle Technical Corner Crosshairs */}
          <span className="absolute top-2 left-2 font-mono text-[10px] font-bold text-[#7a8f9f]/30 select-none">+</span>
          <span className="absolute top-2 right-2 font-mono text-[10px] font-bold text-[#7a8f9f]/30 select-none">+</span>
          <span className="absolute bottom-2 left-2 font-mono text-[10px] font-bold text-[#7a8f9f]/30 select-none">+</span>
          <span className="absolute bottom-2 right-2 font-mono text-[10px] font-bold text-[#7a8f9f]/30 select-none">+</span>

          <AnimatePresence mode="wait">
            <motion.div
              key={`testimonial-spotlight-${current.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-8 lg:gap-12 items-center"
            >
              {/* Left Column: Clean Architectural Portrait Box + Star Rating */}
              <div className="flex flex-col items-center md:items-start">
                <div className="relative h-[210px] w-[190px] sm:w-[210px] overflow-hidden rounded-none border border-[#dce8ec] bg-[#f0f4f6]">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="h-full w-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/person.png";
                    }}
                  />
                  {/* Subtle dark bottom status tag */}
                  <div className="absolute bottom-0 inset-x-0 bg-[#0d2a4a]/90 py-1 text-center font-mono text-[9px] font-bold uppercase tracking-widest text-white">
                    VERIFIED CLIENT
                  </div>
                </div>

                {/* Stars Rating */}
                <div className="mt-3.5 flex items-center justify-center md:justify-start gap-1" aria-label={`${current.rating} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`star-${i}`}
                      className={`h-4 w-4 ${
                        i < current.rating
                          ? "fill-[#f59e0b] text-[#f59e0b]"
                          : "fill-[#e2ecee] text-[#e2ecee]"
                      }`}
                    />
                  ))}
                  <span className="ml-1.5 font-mono text-xs font-bold text-[#0d2a4a]">5.0</span>
                </div>
              </div>

              {/* Right Column: Double Quote SVG + Quote Body + Editorial Signature */}
              <div className="flex flex-col justify-between">
                <div>
                  {/* Clean Geometric Cyan Quote SVG */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 40 30"
                    fill="none"
                    className="h-7 w-9 text-[#008da4]"
                  >
                    <path
                      d="M0 30V17.4C0 11.2 1.6 6.4 4.8 3C8.1 0 12.5 0 16.5 0V6.8C13.1 6.8 10.6 7.8 9.2 9.8C8.1 11.3 7.6 13.4 7.6 16H15.5V30H0ZM24.5 30V17.4C24.5 11.2 26.1 6.4 29.3 3C32.6 0 37 0 40 0V6.8C37.6 6.8 35.1 7.8 33.7 9.8C32.6 11.3 32.1 13.4 32.1 16H40V30H24.5Z"
                      fill="currentColor"
                    />
                  </svg>

                  {/* High-Contrast Quote Text */}
                  <blockquote className="mt-4 text-lg sm:text-xl lg:text-2xl font-bold leading-relaxed text-[#0d2a4a] tracking-tight">
                    &ldquo;{current.quote.replace(/^["'“‟”‟\s]+|["'“‟”‟\s]+$/g, "")}&rdquo;
                  </blockquote>
                </div>

                {/* Sign-Off & Organization Wordmark (Editorial & Clean) */}
                <div className="mt-8 pt-6 border-t border-[#e2ecee] flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0d2a4a]">
                      {current.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#008da4]">
                        {current.role}
                      </span>
                      <span className="text-[#cbd5e1]">•</span>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#647b8f]">
                        {current.company}
                      </span>
                    </div>
                  </div>

                  {/* Clean Client Organization Logo (No bulky boxed nesting) */}
                  <div className="h-10 max-w-[140px] flex items-center justify-center">
                    <img
                      src={current.companyLogo}
                      alt={current.company}
                      title={current.company}
                      className="h-full w-auto max-h-10 max-w-[130px] object-contain opacity-90"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          DEFAULT_LOGOS[active % DEFAULT_LOGOS.length];
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 3. Bottom Controls & Progression Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Phase / Step Counter */}
          <div className="font-mono text-xs font-bold text-[#7a8f9f] tracking-widest flex items-center gap-2">
            <span>ENDORSEMENT</span>
            <span className="text-[#008da4] font-black text-sm">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span>/</span>
            <span>{String(testimonials.length).padStart(2, "0")}</span>
          </div>

          {/* Clean Rectangular Slide Indicators */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Select testimonial">
            {testimonials.map((item, idx) => {
              const isSelected = active === idx;
              return (
                <button
                  key={`dot-nav-${item.id}`}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-none cursor-pointer ${
                    isSelected
                      ? "w-8 bg-[#008da4]"
                      : "w-3 bg-[#dce8ec] hover:bg-[#7a8f9f]"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="h-10 w-10 border border-[#dce8ec] bg-white flex items-center justify-center text-[#0d2a4a] hover:border-[#008da4] hover:bg-[#008da4] hover:text-white transition-colors cursor-pointer rounded-none shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="h-10 w-10 border border-[#dce8ec] bg-white flex items-center justify-center text-[#0d2a4a] hover:border-[#008da4] hover:bg-[#008da4] hover:text-white transition-colors cursor-pointer rounded-none shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

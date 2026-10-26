/* ─────────────────────────────────────────────────────────
   TestimonialsSection — Editorial Spotlight (Services Style)
   An open, borderless editorial showcase:
   - Clean, open canvas with zero heavy wireframe boxes
   - Organic floating client logos
   - Asymmetric curved portrait (rounded-br-[2.5rem]) matching the Services page
   - Crisp geometric quote icon and bold typography
   - Unified, minimal bottom carousel controls
   ───────────────────────────────────────────────────────── */
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
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

  const handleNext = useCallback(() => {
    setActive((curr) => (curr + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((curr) => (curr - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;

    const interval = setInterval(handleNext, AUTO_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [handleNext, isPaused, testimonials.length]);

  const current = testimonials[active] ?? testimonials[0];

  return (
    <section
      className="relative z-[2] overflow-hidden border-t border-[#dce8ec] bg-white py-20 sm:py-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header (Centered, Clean & Editorial) */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 border border-[#dce8ec] bg-[#f8fbfc] px-3 py-1 shadow-sm mb-4">
            <span className="h-2 w-2 bg-[#008da4]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#008da4]">
              {sectionSubtitle || "CLIENT ENDORSEMENTS & IMPACT"}
            </span>
          </div>

          <h2 className="text-3xl font-black uppercase tracking-tight text-[#0d2a4a] sm:text-4xl lg:text-5xl">
            {sectionTitle || "WALL OF TRUST"}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-[#586d82]">
            Real-world outcomes, direct operational feedback, and engineering partnerships that stand the test of scale.
          </p>
        </div>

        {/* 1. Fluid, Minimal Client Logos Bar */}
        <div className="mb-14 flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-14">
          {testimonials.map((item, idx) => {
            const isActive = active === idx;
            return (
              <button
                key={`client-logo-btn-${item.id}`}
                type="button"
                onClick={() => setActive(idx)}
                className="group relative flex flex-col items-center justify-center py-2 transition-all duration-300 cursor-pointer"
                aria-label={`View testimonial from ${item.company}`}
              >
                <div className="relative h-8 sm:h-9 w-auto min-w-[80px] max-w-[120px] flex items-center justify-center">
                  <img
                    src={item.companyLogo}
                    alt={item.company}
                    title={item.company}
                    className={`h-full w-auto max-h-8 sm:max-h-9 max-w-[120px] object-contain transition-all duration-300 ${
                      isActive
                        ? "grayscale-0 opacity-100 scale-105"
                        : "grayscale opacity-35 hover:grayscale-0 hover:opacity-75"
                    }`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        DEFAULT_LOGOS[idx % DEFAULT_LOGOS.length];
                    }}
                  />
                </div>

                {/* Subtle active underline */}
                {isActive && (
                  <motion.span
                    layoutId="active-testimonial-indicator"
                    className="absolute -bottom-2 h-[2px] w-6 bg-[#008da4]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* 2. Open Editorial Spotlight Area (Zero Clunky Wireframe Boxes) */}
        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`testimonial-spotlight-${current.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-[190px_1fr] lg:grid-cols-[210px_1fr] items-start gap-8 md:gap-12 lg:gap-14"
            >
              {/* Left Column: Asymmetric Bottom-Right Curve Portrait (Services Page Motif) */}
              <div className="mx-auto md:mx-0 flex flex-col items-center md:items-start">
                <div className="relative h-[210px] w-[190px] overflow-hidden rounded-br-[2.5rem] bg-gradient-to-b from-[#e7f0f3] to-[#d5e4e9] shadow-sm">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/person.png";
                    }}
                  />
                </div>

                {/* 5-Star Rating */}
                <div
                  className="mt-4 flex items-center gap-1.5 select-none"
                  aria-label={`${current.rating} out of 5 stars`}
                >
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={`star-${i}`}
                        className={`h-3.5 w-3.5 ${
                          i < current.rating
                            ? "fill-[#f59e0b] text-[#f59e0b]"
                            : "fill-[#e2ecee] text-[#e2ecee]"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#0d2a4a]">5.0</span>
                </div>
              </div>

              {/* Right Column: Double Quote SVG + Quote Body + Editorial Author Signature */}
              <div className="flex flex-col justify-between">
                <div>
                  {/* Clean Geometric Cyan Quote SVG */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 40 30"
                    fill="none"
                    className="h-7 w-9 text-[#00a6cb]"
                  >
                    <path
                      d="M0 30V17.4C0 11.2 1.6 6.4 4.8 3C8.1 0 12.5 0 16.5 0V6.8C13.1 6.8 10.6 7.8 9.2 9.8C8.1 11.3 7.6 13.4 7.6 16H15.5V30H0ZM24.5 30V17.4C24.5 11.2 26.1 6.4 29.3 3C32.6 0 37 0 40 0V6.8C37.6 6.8 35.1 7.8 33.7 9.8C32.6 11.3 32.1 13.4 32.1 16H40V30H24.5Z"
                      fill="currentColor"
                    />
                  </svg>

                  {/* Clean High-Contrast Quote Text */}
                  <blockquote className="mt-5 text-base sm:text-lg lg:text-[20px] font-bold leading-[1.7] tracking-[-0.01em] text-[#0d2a4a]">
                    &ldquo;{current.quote.replace(/^["'“‟”‟\s]+|["'“‟”‟\s]+$/g, "")}&rdquo;
                  </blockquote>
                </div>

                {/* Editorial Signature & Company Wordmark */}
                <div className="mt-8 pt-6 border-t border-[#f0f4f6] flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-[#008da4]">
                      {current.name}
                    </h3>
                    <p className="mt-0.5 text-xs font-medium text-[#647b8f]">
                      {current.role} <span className="opacity-40">·</span> {current.company}
                    </p>
                  </div>

                  {/* Company Logo Wordmark */}
                  <div className="flex items-center gap-3">
                    <img
                      src={current.companyLogo}
                      alt={current.company}
                      title={current.company}
                      className="h-8 max-h-8 w-auto max-w-[120px] object-contain opacity-85"
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

          {/* 3. Minimalist Bottom-Center Carousel Controls */}
          {testimonials.length > 1 && (
            <div className="mt-12 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="grid h-8 w-8 place-items-center text-[#7b90a2] transition hover:text-[#008da4] cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2" role="tablist" aria-label="Select testimonial">
                {testimonials.map((item, idx) => {
                  const isSelected = active === idx;
                  return (
                    <button
                      key={`dot-ctrl-${item.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActive(idx)}
                      className={`h-2 transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? "w-6 rounded-full bg-[#008da4]"
                          : "w-2 rounded-full bg-[#dce8ec] hover:bg-[#9ab8c2]"
                      }`}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="grid h-8 w-8 place-items-center text-[#7b90a2] transition hover:text-[#008da4] cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

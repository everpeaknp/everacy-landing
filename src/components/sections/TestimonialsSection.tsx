/* ─────────────────────────────────────────────────────────
   TestimonialsSection — Interactive Logo Slider & Typographic Swiper
   An editorial, luxury-tier typographic showcase featuring:
   - Top: Minimalist vector SVG client logos strictly aligned in a single horizontal line
   - Center: Buttery-smooth horizontal sliding testimonial swiper (with professional headshots)
   - Background: Beautiful, spacious breathing room and clean white space
   ───────────────────────────────────────────────────────── */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { testimonialBg } from "@/lib/site-theme";
import { EmptyState } from "@/components/ui/EmptyState";
import type { TestimonialData } from "@/lib/api";

const AUTO_INTERVAL = 2500;

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
    accent: t.accent_color || "#3b82f6",
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
  const [isImageHovered, setIsImageHovered] = useState(false);

  useEffect(() => {
    if (isImageHovered || testimonials.length < 2) return;

    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, AUTO_INTERVAL);

    return () => window.clearInterval(interval);
  }, [active, isImageHovered, testimonials.length]);

  const handleSelect = (idx: number) => setActive(idx);

  const activeT = testimonials[active];
  if (!activeT) return <EmptyState title="No testimonials published yet" />;

  return (
    <section
      className="relative z-[3] overflow-hidden"
      style={{ 
        background: `radial-gradient(circle at 50% 50%, #ffffff 0%, ${testimonialBg} 100%)`, 
        paddingBlock: "clamp(2.5rem, 6vw, 5rem)" 
      }}
    >
      {/* Subtle, ambient background radial aura matching the active branding accent */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${activeT.accent}05 0%, transparent 60%)`,
          zIndex: 0,
        }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center"
      >
        {/* Subtle, Ultra-Elegant Muted Tagline */}
        <div className="text-center mb-4 select-none">
          <span 
            className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.25em] transition-colors duration-500"
            style={{ color: `${activeT.accent}cc` }}
          >
            {sectionSubtitle || sectionTitle || ""}
          </span>
        </div>

        {/* Minimalist Vector Logo Row (strictly aligned in a single line, same container heights) */}
        <div 
          className="flex flex-row flex-nowrap justify-start md:justify-center items-center gap-x-4 md:gap-x-7 mb-5 w-full select-none overflow-x-auto scrollbar-none scroll-smooth pb-3"
        >
          {testimonials.map((item, idx) => {
            const isActive = active === idx;
            return (
              <button
                key={`logo-btn-${item.id}`}
                onClick={() => handleSelect(idx)}
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
                className={`flex items-center justify-center transition-all duration-300 transform hover:scale-[1.03] cursor-pointer shrink-0 ${
                  isActive 
                    ? "scale-[1.03] opacity-100" 
                    : "text-slate-400 opacity-40 hover:opacity-75"
                }`}
                style={{
                  height: "64px", // Strict same-height boundary box for perfect alignment
                  minWidth: "160px", // Standard min-width for balanced layout spacing
                }}
                aria-label={`View testimonial from ${item.company}`}
              >
                {item.companyLogo ? (
                  <img 
                    src={item.companyLogo} 
                    alt={item.company} 
                    className="h-full w-auto object-contain max-h-[52px] transition-all"
                    style={{ filter: isActive ? "none" : "grayscale(100%) opacity(40%)" }}
                    loading="lazy"
                  />
                ) : item.company ? (
                  <span className="text-sm font-bold text-slate-500">{item.company}</span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Cinematic Horizontal Sliding Swiper (Sliders to slide) */}
        <div className="relative w-full max-w-4xl overflow-hidden min-h-[25rem] md:min-h-[20rem] flex items-center">
          
          {/* Muted background luxury quotation mark */}
          <span 
            className="absolute top-2 left-6 md:left-14 text-[11rem] font-serif transition-colors duration-500 select-none pointer-events-none opacity-4"
            style={{ color: `${activeT.accent}0e`, zIndex: 0 }}
          >
            “
          </span>

          <div 
            className="flex transition-transform duration-700 w-full h-full"
            style={{ 
              transform: `translateX(-${active * 100}%)`,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            {testimonials.map((item) => {
              const cleanQuote = item.quote.replace(/^["'“‟”‟\s]+|["'“‟”‟\s]+$/g, "");
              return (
                <div 
                  key={`slide-${item.id}`} 
                  className="w-full flex-shrink-0 flex flex-col items-center justify-center px-4 md:px-16 text-center relative z-10"
                >
                  {/* Dynamic Quote Body */}
                  <p
                    className="font-medium tracking-tight leading-[1.4] max-w-3xl"
                    style={{
                      fontFamily: "'Outfit', 'Inter', sans-serif",
                      fontSize: "clamp(1.35rem, 3.6vw, 2.15rem)",
                      color: "#0d2a4a",
                      margin: 0,
                    }}
                  >
                    &ldquo;{cleanQuote}&rdquo;
                  </p>

                  {/* Rating Stars inside the slide */}
                  <div className="flex justify-center gap-1.5 mt-8 mb-6 select-none">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={`star-${item.id}-${i}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={i < item.rating ? "#f59e0b" : "#e2e8f0"}
                        className="w-4 h-4"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>

                  {/* Reviewer Circle Portrait Image */}
                  {item.image && <div
                    className="mb-4 relative select-none"
                    onMouseEnter={() => setIsImageHovered(true)}
                    onMouseLeave={() => setIsImageHovered(false)}
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 shadow-sm transition-colors duration-500" style={{ borderColor: item.accent }}>
                      <img src={item.image} alt={item.imageDecorative ? "" : item.imageAlt} title={item.imageDecorative ? undefined : item.imageTitle} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </div>}

                  {/* Reviewer Signature Details inside the slide */}
                  <div className="text-center">
                    <div className="font-extrabold text-base md:text-lg text-[#0d2a4a] tracking-tight">
                      {item.name}
                    </div>
                    <div className="text-[10px] font-extrabold text-slate-400 mt-1.5 uppercase tracking-[0.1em] flex items-center justify-center gap-1.5">
                      <span>{item.role}</span>
                      <span className="opacity-30">•</span>
                      <span className="font-bold text-[#0d2a4a]">{item.company}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Slide Bullet indicators at the bottom */}
        <div className="flex gap-2.5 justify-center mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={`dot-nav-${idx}`}
              onClick={() => handleSelect(idx)}
              style={{
                width: active === idx ? "28px" : "8px",
                height: "8px",
                borderRadius: "100px",
                backgroundColor: active === idx ? activeT.accent : "rgba(13, 26, 38, 0.12)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </motion.div>

      <style>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

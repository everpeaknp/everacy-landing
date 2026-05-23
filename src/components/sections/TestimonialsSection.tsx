/* ─────────────────────────────────────────────────────────
   TestimonialsSection — Interactive Logo Slider & Typographic Swiper
   An editorial, luxury-tier typographic showcase featuring:
   - Top: Minimalist vector SVG client logos strictly aligned in a single horizontal line
   - Center: Buttery-smooth horizontal sliding testimonial swiper (with professional headshots)
   - Background: Beautiful, spacious breathing room and clean white space
   ───────────────────────────────────────────────────────── */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { testimonials as staticTestimonials, testimonialBg } from "@/lib/site-theme";
import type { TestimonialData } from "@/lib/api";

const AUTO_INTERVAL = 8000;

interface NormalisedTestimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  accent: string;
  image: string;
  companyLogo: string | null;
}

// Curated professional, studio headshots for static testimonials
const staticAvatarUrls = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", // Marcus Chen (CTO)
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face", // Priya Nair (VP Eng)
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", // James Okafor (Founder)
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", // Sofia Reyes (Product Dir)
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", // Liam Harrington (Head of Tech)
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face", // Ananya Mehta (CEO)
];

function normalise(t: TestimonialData, index: number): NormalisedTestimonial {
  return {
    id: String(t.id),
    quote: t.quote,
    name: t.name,
    role: t.designation,
    company: t.company ?? "",
    rating: t.rating,
    accent: t.accent_color || "#3b82f6",
    image: t.image || staticAvatarUrls[index % staticAvatarUrls.length],
    companyLogo: t.company_logo || null,
  };
}

interface TestimonialsSectionProps {
  data?: TestimonialData[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

// Dynamic vector SVG company logo generator with a clean geometric fallback placeholder system
function getCompanyLogo(companyName: string, active: boolean, color: string) {
  const norm = companyName.toLowerCase().trim();

  // 1. ScaleAI
  if (norm.includes("scaleai") || norm.includes("scale ai")) {
    return (
      <svg className="h-5 md:h-5.5 w-auto max-h-full transition-colors duration-350" fill="none" viewBox="0 0 110 24" style={{ color: active ? color : "inherit" }}>
        <circle cx="12" cy="12" r="7" fill="currentColor" opacity="0.85"/>
        <text x="24" y="17" fill="currentColor" fontSize="13" fontWeight="800" fontFamily="system-ui, sans-serif">ScaleAI</text>
      </svg>
    );
  }
  // 2. Nexora
  if (norm.includes("nexora")) {
    return (
      <svg className="h-5 md:h-5.5 w-auto max-h-full transition-colors duration-350" fill="none" viewBox="0 0 110 24" style={{ color: active ? color : "inherit" }}>
        <polygon points="12,5 19,9 19,15 12,19 5,15 5,9" stroke="currentColor" strokeWidth="2.5"/>
        <text x="26" y="17" fill="currentColor" fontSize="12" fontWeight="800" fontFamily="system-ui, sans-serif" letterSpacing="0.05em">NEXORA</text>
      </svg>
    );
  }
  // 3. Fundra
  if (norm.includes("fundra")) {
    return (
      <svg className="h-5 md:h-5.5 w-auto max-h-full transition-colors duration-350" fill="none" viewBox="0 0 110 24" style={{ color: active ? color : "inherit" }}>
        <circle cx="9" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="15" cy="12" r="5" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
        <text x="26" y="17" fill="currentColor" fontSize="13" fontWeight="800" fontFamily="system-ui, sans-serif">fundra</text>
      </svg>
    );
  }
  // 4. UrbanMove
  if (norm.includes("urbanmove") || norm.includes("urban move")) {
    return (
      <svg className="h-5 md:h-5.5 w-auto max-h-full transition-colors duration-350" fill="none" viewBox="0 0 110 24" style={{ color: active ? color : "inherit" }}>
        <path d="M4 12h12M11 7l5 5-5 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <text x="24" y="17" fill="currentColor" fontSize="11" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.08em">URBANMOVE</text>
      </svg>
    );
  }
  // 5. FinStack
  if (norm.includes("finstack")) {
    return (
      <svg className="h-5 md:h-5.5 w-auto max-h-full transition-colors duration-350" fill="none" viewBox="0 0 110 24" style={{ color: active ? color : "inherit" }}>
        <path d="M4 7h10M4 12h14M4 17h8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <text x="26" y="17" fill="currentColor" fontSize="12" fontWeight="800" fontFamily="system-ui, sans-serif">FinStack</text>
      </svg>
    );
  }
  // 6. DataPulse
  if (norm.includes("datapulse") || norm.includes("data pulse")) {
    return (
      <svg className="h-5 md:h-5.5 w-auto max-h-full transition-colors duration-350" fill="none" viewBox="0 0 110 24" style={{ color: active ? color : "inherit" }}>
        <path d="M4 12h3l3-5 3 10 3-5h4" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
        <text x="24" y="17" fill="currentColor" fontSize="12" fontWeight="900" fontFamily="system-ui, sans-serif">DATAPULSE</text>
      </svg>
    );
  }

  // 7. DYNAMIC LOGO PLACEHOLDER (For backend API company additions)
  const displayCompany = companyName.split(" ")[0] || "Client";
  return (
    <div 
      className="flex items-center gap-1.5 px-2.5 py-1 rounded border transition-all duration-300 max-h-full select-none"
      style={{ 
        color: active ? color : "inherit",
        borderColor: active ? `${color}40` : "rgba(13,26,38,0.08)",
        background: active ? `${color}06` : "rgba(13,26,38,0.01)"
      }}
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 113 0v2m6-2V5a2 2 0 00-3 0v2" />
      </svg>
      <span className="text-[11px] font-extrabold uppercase tracking-[0.06em]">{displayCompany}</span>
    </div>
  );
}

export function TestimonialsSection({ data, sectionTitle, sectionSubtitle }: TestimonialsSectionProps) {
  // Normalize API data if present, otherwise fallback to static configuration
  const testimonials: NormalisedTestimonial[] = data && data.length > 0
    ? data.map((t, idx) => normalise(t, idx))
    : staticTestimonials.map((t, idx) => ({
        id: t.id,
        quote: t.quote,
        name: t.name,
        role: t.role,
        company: t.company,
        rating: t.rating,
        accent: t.accent,
        image: staticAvatarUrls[idx % staticAvatarUrls.length],
        companyLogo: null,
      }));

  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((next: number) => {
    setActive(next);
  }, []);

  const startAuto = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % testimonials.length;
        goTo(next);
        return next;
      });
    }, AUTO_INTERVAL);
  }, [goTo, testimonials.length]);

  const resetAuto = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAuto();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAuto]);

  const handleSelect = useCallback((idx: number) => {
    setActive(cur => {
      if (idx === cur) return cur;
      resetAuto();
      goTo(idx);
      return idx;
    });
  }, [goTo, resetAuto]);

  const activeT = testimonials[active];

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

      <div className="w-full max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Subtle, Ultra-Elegant Muted Tagline */}
        <div className="text-center mb-4 select-none">
          <span 
            className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-[0.25em] transition-colors duration-500"
            style={{ color: `${activeT.accent}cc` }}
          >
            {sectionSubtitle || sectionTitle || "Trusted by the World's Leading Engineering Teams"}
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
                className={`flex items-center justify-center transition-all duration-300 transform hover:scale-[1.03] cursor-pointer shrink-0 ${
                  isActive 
                    ? "scale-[1.03] opacity-100" 
                    : "text-slate-400 opacity-40 hover:opacity-75"
                }`}
                style={{
                  height: "52px", // Strict same-height boundary box for perfect alignment
                  minWidth: "144px", // Standard min-width for balanced layout spacing
                }}
                aria-label={`View testimonial from ${item.company}`}
              >
                {item.companyLogo ? (
                  <img 
                    src={item.companyLogo} 
                    alt={item.company} 
                    className="h-full w-auto object-contain max-h-[38px] transition-all"
                    style={{ filter: isActive ? "none" : "grayscale(100%) opacity(40%)" }}
                    loading="lazy"
                  />
                ) : (
                  getCompanyLogo(item.company || "Client", isActive, item.accent)
                )}
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
                  <div className="mb-4 relative select-none">
                    <div 
                      className="w-16 h-16 rounded-full overflow-hidden border-2 shadow-sm transition-colors duration-500" 
                      style={{ borderColor: item.accent }}
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>

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

      </div>

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

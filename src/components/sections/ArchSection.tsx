"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { archSectionCards } from "@/lib/site-theme";
import type { ServiceCardData } from "@/lib/api";

interface ArchSectionProps {
  data?: ServiceCardData[];
  sectionTitle?: string;
}

export function ArchSection({ data, sectionTitle }: ArchSectionProps) {
  const cards = useMemo(
    () =>
      data && data.length > 0
        ? data.map((s) => ({
            id: String(s.id),
            title: s.title,
            description: s.description,
            linkLabel: s.link_label || "Learn More",
            linkHref: s.link_href || "/services",
            accentColor: s.accent_color && s.accent_color !== "#000000" ? s.accent_color : "#27446e",
            backgroundColor: s.background_color && s.background_color !== "#000000" ? s.background_color : "#f0f6fb",
            imageUrl: s.image || null,
            imageAlt: s.image_alt || s.title,
          }))
        : archSectionCards.map((c) => ({
            id: c.id,
            title: c.title,
            description: c.description,
            linkLabel: c.linkLabel || "Learn More",
            linkHref: c.linkHref || "/services",
            accentColor: c.accentColor || "#27446e",
            backgroundColor: "#f0f6fb",
            imageUrl: c.imageUrl,
            imageAlt: c.imageAlt,
          })),
    [data]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const active = cards[activeIndex] ?? cards[0];
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [thumb, setThumb] = useState({ width: 0, left: 0, visible: false });

  useEffect(() => {
    function update() {
      const el = scrollRef.current;
      const track = trackRef.current;
      if (!el || !track) {
        setThumb({ width: 0, left: 0, visible: false });
        return;
      }

      const cw = el.clientWidth;
      const sw = el.scrollWidth;
      if (sw <= cw) {
        setThumb({ width: 0, left: 0, visible: false });
        return;
      }
      const trackWidth = track.clientWidth;
      const thumbWidth = Math.max((cw / sw) * trackWidth, 20);
      const left = (el.scrollLeft / (sw - cw)) * (trackWidth - thumbWidth);
      setThumb({ width: Math.round(thumbWidth), left: Math.round(left), visible: true });
    }

    update();
    const el0 = scrollRef.current;
    const track0 = trackRef.current;
    if (el0) el0.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    if (el0) ro.observe(el0);
    if (track0) ro.observe(track0);

    return () => {
      if (el0) el0.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [cards.length]);

  return (
    <section
      className="section-clip-x py-6 md:py-12 transition-colors duration-300"
      style={{ backgroundColor: active?.backgroundColor || "#f0f6fb" }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <header className="text-center max-w-5xl mx-auto">
          <h2 className="text-[clamp(2rem,6vw,4rem)] font-black tracking-tight text-[#123a68] uppercase">
            {sectionTitle || "Our Services"}
          </h2>
          <p className="mt-4 text-[#3f5368] text-[clamp(1rem,2.1vw,1.3rem)] leading-relaxed">
            Designed with scalability, security and adaptability at its core, we build digital systems that scale with confidence.
          </p>
        </header>

        <div className="relative mt-8 md:mt-12 flex justify-center">
          <div className="inline-flex bg-white/50 backdrop-blur-md p-1.5 rounded-full shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-white/60 overflow-x-auto no-scrollbar max-w-full">
            <div className="flex gap-1 md:gap-2">
            {cards.map((card, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={card.id}
                  onClick={() => setActiveIndex(index)}
                  className={`relative px-5 md:px-7 py-2.5 md:py-3 text-[13px] md:text-[14px] font-bold tracking-wide transition-all duration-300 rounded-full whitespace-nowrap ${
                    isActive ? "shadow-sm scale-100" : "hover:bg-white/40 scale-95 opacity-70 hover:opacity-100"
                  }`}
                  style={{ 
                    color: isActive ? "#ffffff" : "#123a68",
                    backgroundColor: isActive ? (card.accentColor || "#123a68") : "transparent"
                  }}
                  type="button"
                >
                  {card.title}
                </button>
              );
            })}
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-10 md:mt-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 md:gap-12 lg:gap-20 items-center"
        >
          <div className="order-1 lg:order-1 relative group">
            {/* Subtle glow behind image */}
            <div 
              className="absolute inset-0 rounded-[2rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              style={{ backgroundColor: active?.accentColor || "#123a68" }}
            />
            <div className="relative aspect-[16/10] md:aspect-[4/3] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] border-[6px] border-white/80 bg-slate-100 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
              {active?.imageUrl ? (
                <img
                  src={active.imageUrl}
                  alt={active.imageAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-slate-100 rounded-2xl border border-slate-200">
                  <span className="text-slate-400 font-semibold uppercase tracking-widest text-sm px-6 text-center">
                    {active?.title}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="order-2 lg:order-2 lg:pl-4">
            <h3 className="text-[clamp(1.75rem,4vw,3rem)] font-black text-[#123a68] leading-[1.05] tracking-tight">
              {active?.title}
            </h3>
            <p className="mt-6 text-[#4c5f73] text-[1.05rem] md:text-[1.15rem] leading-[1.8] font-medium">
              {active?.description}
            </p>

            <div className="mt-8">
              <Link
                href={active?.linkHref || "/services"}
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-[13px] font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ 
                  backgroundColor: (active?.accentColor || "#27446e"), 
                  color: "#ffffff",
                  boxShadow: `0 8px 24px -6px ${active?.accentColor || "#27446e"}`
                }}
              >
                {active?.linkLabel || "Explore"}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

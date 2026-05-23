"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
            accentColor: s.accent_color || "#27446e",
            backgroundColor: s.background_color || "#f0f6fb",
            imageUrl: s.image ?? archSectionCards[s.order]?.imageUrl ?? null,
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

        <div className="relative">
          <div ref={scrollRef} className="mt-6 md:mt-8 border-b border-[#d5e0ea] overflow-x-auto no-scrollbar">
            <div className="min-w-max flex gap-2 md:gap-5 pb-0">
            {cards.map((card, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={card.id}
                  onClick={() => setActiveIndex(index)}
                  className="relative px-3 md:px-4 py-3 text-sm md:text-[1.02rem] font-semibold transition-colors whitespace-nowrap"
                  style={{ color: isActive ? (card.accentColor || "#123a68") : "#60758a" }}
                  type="button"
                >
                  {card.title}
                  <span
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] transition-opacity"
                    style={{ opacity: isActive ? 1 : 0, backgroundColor: (card.accentColor || "#27446e") }}
                  />
                </button>
              );
            })}
            </div>
          </div>

          <div ref={trackRef} className="services-scroll-track pointer-events-none">
            <div
              className={`services-scroll-thumb ${!thumb.visible ? "hidden" : ""}`}
              style={{ width: `${thumb.width}px`, transform: `translateX(${thumb.left}px)` }}
            />
          </div>
        </div>

        <div className="mt-7 md:mt-9 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          <div className="order-1 lg:order-1">
            <div className="aspect-[16/10] md:aspect-[4/3] overflow-hidden">
              {active?.imageUrl ? (
                <img
                  src={active.imageUrl}
                  alt={active.imageAlt}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full grid place-items-center text-[#7a8ea1] text-sm">
                  {active?.title}
                </div>
              )}
            </div>
          </div>

          <div className="order-2 lg:order-2">
            <h3 className="text-[clamp(1.55rem,3.8vw,2.55rem)] font-black text-[#123a68] leading-[1.1]">
              {active?.title}
            </h3>
            <p className="mt-4 text-[#4c5f73] text-base md:text-[1.2rem] leading-relaxed">
              {active?.description}
            </p>

            <div className="mt-7">
              <Link
                href={active?.linkHref || "/services"}
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm md:text-base font-semibold transition-colors"
                style={{ backgroundColor: (active?.accentColor || "#27446e"), color: "#ffffff" }}
              >
                {active?.linkLabel || "Learn More"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { animate, useInView } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "@/hooks";
import type { ServicesHeroStatData } from "@/lib/api";
import { servicesStats } from "./servicesContent";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.21, 0.47, 0.32, 0.98],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
    </span>
  );
}

interface ServicesHeroProps {
  eyebrow?: string;
  title?: string;
  description?: string | null;
  secondaryDescription?: string | null;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  image?: string | null;
  stats?: ServicesHeroStatData[] | null;
}

export function ServicesHero({
  eyebrow,
  title,
  description,
  secondaryDescription,
  ctaLabel,
  ctaHref = "/contact",
  secondaryCtaLabel,
  secondaryCtaHref = "#service-skills",
  image,
  stats,
}: ServicesHeroProps) {
  const activeStats = stats && stats.length > 0 ? stats : servicesStats;
  const heroImage =
    image ||
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85";

  return (
    <section
      data-service-hero
      className="relative isolate overflow-hidden border-b border-[#dbe7eb] bg-[#f3f8fa] px-5 pb-0 pt-28 text-[#0d2a4a] sm:px-8 sm:pt-36"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Architectural line circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-36 -z-10 h-[32rem] w-[32rem] rounded-full border border-[#d7e9ed]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-20 -z-10 h-[25rem] w-[25rem] rounded-full border border-[#dcebee]"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 pb-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:pb-24">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#008da4] sm:text-sm">
            {eyebrow || "Services & Capabilities"}
          </p>
          <h1 className="mt-4 text-[clamp(2.5rem,5.6vw,4.8rem)] font-black leading-[0.98] tracking-[-0.05em] text-[#0d2a4a]">
            {title || (
              <>
                <span className="text-[#00a6cb]">Innovation</span> reliably delivered.
              </>
            )}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#52687d] sm:text-lg sm:leading-8">
            {description ||
              "From first prototype to production at scale, we design, build, and run the software your business depends on."}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#65798e] sm:text-base">
            {secondaryDescription ||
              "We partner with founders, product leaders, and enterprise teams to ship high-impact web, mobile, cloud, and growth systems without technical debt."}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={ctaHref}
              className="group inline-flex min-h-12 items-center gap-3 bg-[#00a6cb] px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#078eaa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d2a4a] focus-visible:ring-offset-2"
            >
              {ctaLabel || "Build with us"}
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href={secondaryCtaHref}
              className="inline-flex min-h-12 items-center gap-2 px-2 text-sm font-bold text-[#31536c] transition hover:text-[#008da4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008da4]"
            >
              {secondaryCtaLabel || "Explore capabilities"}
              <ArrowDownRight aria-hidden="true" className="h-4 w-4 text-[#008da4]" />
            </a>
          </div>
        </div>

        {/* Right Column: Clean Editorial Portrait Photograph (No double frame, no blue border) */}
        <figure className="relative mx-auto w-full max-w-[470px] lg:ml-auto lg:mr-0">
          <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-br-[3.75rem] bg-[#0d2a4a] shadow-[0_24px_54px_-28px_rgba(13,42,74,0.32)]">
            <Image
              src={heroImage}
              alt="Everacy engineering team collaborating on software architecture"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
              unoptimized={Boolean(heroImage && (heroImage.startsWith("http") || heroImage.startsWith("/media")))}
            />
          </div>
        </figure>
      </div>

      {/* Boxy Architectural Stats Strip */}
      <div className="mx-auto max-w-7xl border-t border-[#d5e4e8] bg-white">
        <dl className="grid grid-cols-2 divide-x divide-y divide-[#e1ebee] lg:grid-cols-4 lg:divide-y-0">
          {activeStats.map((stat) => (
            <div key={stat.label} className="flex flex-col px-6 py-6 text-left">
              <dt className="order-2 mt-1 text-xs font-extrabold uppercase tracking-[0.14em] text-[#687e93]">
                {stat.label}
              </dt>
              <dd className="text-3xl font-black tracking-tight text-[#0d2a4a] sm:text-4xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

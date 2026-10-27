import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ServicesCtaSectionData } from "@/lib/api";

interface ServicesCtaProps {
  ctaSection?: ServicesCtaSectionData | null;
  ctaHref?: string;
  serviceTitle?: string;
}

/**
 * Dual-card photographic closing CTA matching the Leapfrog "Ready to get started?" section:
 * Uses Everacy's sharp boxy aesthetic with a single signature top-right architectural curve.
 * Fully dynamic via Django Admin CMS.
 */
export function ServicesCta({
  ctaSection,
  ctaHref = "/contact",
  serviceTitle,
}: ServicesCtaProps) {
  const eyebrow = ctaSection?.eyebrow || "Next steps";
  const title = ctaSection?.title || "Ready to get started?";

  const card1Badge = ctaSection?.card1_badge || "Product & Engineering Partnership";
  const card1BadgeColor = ctaSection?.card1_badge_color || "#7fdcf0";
  const card1Title = ctaSection?.card1_title || "Build with us";
  const card1Description =
    ctaSection?.card1_description ||
    (serviceTitle
      ? `Have a ${serviceTitle.toLowerCase()} initiative on your roadmap? Let’s scope the fastest, safest path from concept to production.`
      : "Partner with a dedicated squad of senior engineers and product designers to turn your roadmap into shipped software.");
  const card1Subtext =
    ctaSection?.card1_subtext ||
    "We reply within one business day with honest architectural feedback and a clear delivery plan.";
  const card1Image = ctaSection?.card1_image || ctaSection?.card1_image_url || "/images/saas.jpg";
  const card1CtaLabel = ctaSection?.card1_cta_label || "Start a project";
  const card1CtaHref = ctaSection?.card1_cta_href || ctaHref;
  const card1SecondaryCtaLabel = ctaSection?.card1_secondary_cta_label || "See our work";
  const card1SecondaryCtaHref = ctaSection?.card1_secondary_cta_href || "/projects";

  const card2Badge = ctaSection?.card2_badge || "Careers at Everacy";
  const card2BadgeColor = ctaSection?.card2_badge_color || "#7fdcf0";
  const card2Title = ctaSection?.card2_title || "Join us";
  const card2Description =
    ctaSection?.card2_description ||
    "Looking to solve meaningful engineering and product design problems alongside curious, low-ego teammates?";
  const card2Subtext =
    ctaSection?.card2_subtext ||
    "Explore open roles across frontend, backend, mobile, and product design and grow your craft with us.";
  const card2Image = ctaSection?.card2_image || ctaSection?.card2_image_url || "/images/cloudcomputing.jpg";
  const card2CtaLabel = ctaSection?.card2_cta_label || "Explore careers";
  const card2CtaHref = ctaSection?.card2_cta_href || "/careers";
  const card2SecondaryCtaLabel = ctaSection?.card2_secondary_cta_label || "Meet the team";
  const card2SecondaryCtaHref = ctaSection?.card2_secondary_cta_href || "/about";

  return (
    <section
      className="relative isolate overflow-hidden bg-[#06182c] px-5 py-20 text-white sm:px-8 sm:py-28"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#7fdcf0]">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#00a6cb] sm:text-5xl">
            {title}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Card 1: Build with us (Photographic background + asymmetric top-right corner) */}
          <div className="group relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-tr-[3.25rem] border border-white/15 bg-[#0a2036] p-8 sm:min-h-[420px] sm:p-10">
            <Image
              src={card1Image}
              alt="Engineers building digital products at Everacy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized={Boolean(card1Image && (card1Image.startsWith("http") || card1Image.startsWith("/media")))}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#041120] via-[#06182c]/85 to-[#06182c]/35"
            />

            <div className="relative z-10">
              <p
                className="text-xs font-extrabold uppercase tracking-[0.2em]"
                style={{ color: card1BadgeColor }}
              >
                {card1Badge}
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">{card1Title}</h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-white/80 sm:text-base">
                {card1Description}
              </p>
              {card1Subtext && (
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {card1Subtext}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-5 border-t border-white/15 pt-5">
                <Link
                  href={card1CtaHref}
                  className="inline-flex items-center gap-2.5 bg-[#00a6cb] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#078fae] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {card1CtaLabel}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                {card1SecondaryCtaLabel && (
                  <Link
                    href={card1SecondaryCtaHref}
                    className="inline-flex items-center gap-2 text-sm font-bold text-white/85 transition hover:text-[#7fdcf0]"
                  >
                    {card1SecondaryCtaLabel}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 text-[#00a6cb]" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Join us (Photographic background + asymmetric top-right corner) */}
          <div className="group relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-tr-[3.25rem] border border-white/15 bg-[#0a2036] p-8 sm:min-h-[420px] sm:p-10">
            <Image
              src={card2Image}
              alt="Join the engineering and design team at Everacy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized={Boolean(card2Image && (card2Image.startsWith("http") || card2Image.startsWith("/media")))}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#041120] via-[#06182c]/85 to-[#06182c]/35"
            />

            <div className="relative z-10">
              <p
                className="text-xs font-extrabold uppercase tracking-[0.2em]"
                style={{ color: card2BadgeColor }}
              >
                {card2Badge}
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">{card2Title}</h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-white/80 sm:text-base">
                {card2Description}
              </p>
              {card2Subtext && (
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {card2Subtext}
                </p>
              )}

              <div className="mt-7 flex flex-wrap items-center gap-5 border-t border-white/15 pt-5">
                <Link
                  href={card2CtaHref}
                  className="inline-flex items-center gap-2.5 border border-white/30 bg-white/10 px-5 py-3 text-sm font-extrabold text-white backdrop-blur-sm transition hover:border-[#00a6cb] hover:bg-[#00a6cb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7fdcf0]"
                >
                  {card2CtaLabel}
                  <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                {card2SecondaryCtaLabel && (
                  <Link
                    href={card2SecondaryCtaHref}
                    className="inline-flex items-center gap-2 text-sm font-bold text-white/85 transition hover:text-[#7fdcf0]"
                  >
                    {card2SecondaryCtaLabel}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 text-[#00a6cb]" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

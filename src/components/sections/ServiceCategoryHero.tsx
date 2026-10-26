import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, ChevronRight } from "lucide-react";
import type { ServiceCategoryData } from "@/lib/api";

function getCategoryPortraitPhoto(title: string): { src: string; alt: string } {
  const normalized = title.toLowerCase();

  if (/design|ux|ui|creative|brand/.test(normalized)) {
    return {
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85",
      alt: `${title} design and product strategy team`,
    };
  }

  if (/cloud|data|ai|devops|infrastructure/.test(normalized)) {
    return {
      src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=85",
      alt: `${title} cloud and data engineering team`,
    };
  }

  return {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
    alt: `${title} engineering team collaborating`,
  };
}

export function ServiceCategoryHero({ category }: { category: ServiceCategoryData }) {
  const categoryLabel = category.breadcrumb_label || category.title || "Services";
  const words = (category.title || "Digital Services").trim().split(/\s+/);
  const highlightWord = words[0];
  const restWords = words.slice(1).join(" ");

  const fallbackPortrait = getCategoryPortraitPhoto(category.title);
  const heroImageSrc = category.image || fallbackPortrait.src;

  return (
    <section
      data-service-hero
      className="relative isolate overflow-hidden border-b border-[#dbe7eb] bg-[#f3f8fa] px-5 pb-16 pt-28 text-[#0d2a4a] sm:px-8 sm:pb-24 sm:pt-36"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Subtle architectural line circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-1/2 -z-10 h-[33rem] w-[33rem] -translate-y-1/2 rounded-full border border-[#d9e9ed]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 top-1/2 -z-10 h-[23rem] w-[23rem] -translate-y-1/2 rounded-full border border-[#e1edf0]"
      />

      <div className="relative mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-2 text-sm font-semibold text-[#718397]">
          <Link href="/services" className="transition hover:text-[#008da4]">
            Services
          </Link>
          <ChevronRight aria-hidden="true" className="h-4 w-4 text-[#00a6cb]" />
          <span aria-current="page" className="text-[#193756]">
            {categoryLabel}
          </span>
        </nav>

        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          {/* Left Column: Bold Editorial Headline + Copy + Sharp CTAs */}
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#008da4] sm:text-sm">
              {category.hero_eyebrow || "Practice Area"}
            </p>

            <h1 className="mt-4 text-[clamp(2.6rem,5.6vw,4.75rem)] font-black leading-[0.98] tracking-[-0.05em] text-[#0d2a4a]">
              <span className="text-[#00a6cb]">{highlightWord}</span>{" "}
              {restWords ? restWords : "reliably delivered"}
            </h1>

            <p className="mt-6 text-base leading-7 text-[#52687d] sm:text-lg sm:leading-8">
              {category.description ||
                "We combine product strategy, user-centered design, and disciplined software engineering to help ambitious teams launch faster and scale with confidence."}
            </p>

            <p className="mt-4 text-sm leading-7 text-[#65798e] sm:text-base">
              Every engagement is structured around measurable outcomes — weekly working demos, clean architecture, and
              senior specialists who work as an extension of your team.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex min-h-12 items-center gap-3 bg-[#00a6cb] px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#078eaa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d2a4a] focus-visible:ring-offset-2"
              >
                Build with us
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href="#category-services"
                className="inline-flex min-h-12 items-center gap-2 px-2 text-sm font-bold text-[#31536c] transition hover:text-[#008da4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008da4]"
              >
                {category.cta_label?.replaceAll("{category}", category.title) || `Explore ${category.title}`}
                <ArrowDownRight aria-hidden="true" className="h-4 w-4 text-[#008da4]" />
              </a>
            </div>
          </div>

          {/* Right Column: Clean Editorial Portrait Photograph (No double frame, no blue border) */}
          <figure className="relative mx-auto w-full max-w-[470px] lg:ml-auto lg:mr-0">
            <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-br-[3.75rem] bg-[#0d2a4a] shadow-[0_24px_54px_-28px_rgba(13,42,74,0.32)]">
              <Image
                src={heroImageSrc}
                alt={category.image_alt || fallbackPortrait.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}

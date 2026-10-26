import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, ChevronRight } from "lucide-react";
import type { ServiceCardData } from "@/lib/api";
import { resolveImageAlt } from "@/lib/image-seo";
import { resolveMetadataImageUrl, siteConfig } from "@/lib/seo";

interface ServiceDetailHeroProps {
  service: ServiceCardData;
  categoryTitle: string;
  categoryHref: string;
  ctaHref: string;
  ctaLabel: string;
}

function getServicePortraitPhoto(title: string, categoryTitle: string): { src: string; alt: string } {
  const haystack = `${title} ${categoryTitle}`.toLowerCase();

  if (/mobile|ios|android|flutter|react native|app/.test(haystack)) {
    return {
      src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85",
      alt: `${title} product engineering team collaborating`,
    };
  }

  if (/cloud|devops|data|ai|machine learning|infrastructure|backend/.test(haystack)) {
    return {
      src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=85",
      alt: `${title} systems architecture and engineering`,
    };
  }

  if (/design|ux|ui|brand|research|creative/.test(haystack)) {
    return {
      src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=85",
      alt: `${title} design and product strategy session`,
    };
  }

  return {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85",
    alt: `${title} senior engineering squad collaborating at work`,
  };
}

export function ServiceDetailHero({
  service,
  categoryTitle,
  categoryHref,
  ctaHref,
  ctaLabel,
}: ServiceDetailHeroProps) {
  const description = service.tagline || service.description;
  const secondaryDescription =
    service.secondary_description ||
    (service.tagline && service.description && service.tagline !== service.description
      ? service.description
      : "We pair senior engineering with research-led product design to ship resilient, high-performing software tailored to your business goals.");
  const internalCta = ctaHref.startsWith("/");
  const seoServiceImage = resolveMetadataImageUrl(service.seo?.og_image, siteConfig.url);
  const cmsImage = service.image || seoServiceImage || null;
  const fallbackPortrait = getServicePortraitPhoto(service.title, categoryTitle);
  const heroImageSrc = cmsImage || fallbackPortrait.src;

  const serviceImageAlt = service.image
    ? resolveImageAlt({
        alt: service.image_alt,
        imageTitle: service.image_title,
        recordTitle: service.title,
        keywords: service.seo?.meta_keywords,
        decorative: service.image_is_decorative,
      })
    : seoServiceImage
      ? resolveImageAlt({
          alt: service.seo?.og_image_alt,
          imageTitle: service.seo?.og_image_title,
          recordTitle: service.title,
          keywords: service.seo?.meta_keywords,
          decorative: service.seo?.og_image_is_decorative,
        })
      : fallbackPortrait.alt;

  const words = (service.title || "Digital Product").trim().split(/\s+/);
  const highlightWord = words[0];
  const restWords = words.slice(1).join(" ");

  return (
    <section
      data-service-hero
      className="relative isolate overflow-hidden border-b border-[#dce8ec] bg-[#f4f9fa] px-5 pb-16 pt-24 text-[#0d2a4a] sm:px-8 sm:pb-24 sm:pt-32"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {/* Subtle architectural background arcs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full border border-[#d9e9ed]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-1/2 -z-10 h-[24rem] w-[24rem] -translate-y-1/2 rounded-full border border-[#e2eef1]"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-sm font-semibold text-[#718397] sm:mb-10"
        >
          <Link href="/services" className="transition hover:text-[#008b9b]">
            Services
          </Link>
          <ChevronRight aria-hidden="true" className="h-4 w-4 text-[#00a6cb]" />
          <Link href={categoryHref} className="transition hover:text-[#008b9b]">
            {categoryTitle}
          </Link>
          <ChevronRight aria-hidden="true" className="h-4 w-4 text-[#00a6cb]" />
          <span aria-current="page" className="line-clamp-1 text-[#0d2a4a]">
            {service.title}
          </span>
        </nav>

        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#008da4] sm:text-sm">
              {categoryTitle}
            </p>

            <h1 className="mt-4 text-4xl font-black leading-[1.02] tracking-[-0.045em] text-[#0d2a4a] sm:text-6xl">
              <span className="text-[#00a6cb]">{highlightWord}</span> {restWords}
            </h1>

            {description && (
              <p className="mt-6 text-lg leading-8 text-[#3f566d] sm:text-xl sm:leading-9">
                {description}
              </p>
            )}

            <p className="mt-4 text-sm leading-7 text-[#61768b] sm:text-base">
              {secondaryDescription}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              {internalCta ? (
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-3 bg-[#00a6cb] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#078fae] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008da4] focus-visible:ring-offset-2"
                >
                  {ctaLabel || "Build with us"}
                  <ArrowRight aria-hidden="true" className="h-5 w-5" />
                </Link>
              ) : (
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-[#00a6cb] px-6 py-4 text-sm font-extrabold text-white transition hover:bg-[#078fae] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008da4] focus-visible:ring-offset-2"
                >
                  {ctaLabel || "Build with us"}
                  <ArrowRight aria-hidden="true" className="h-5 w-5" />
                </a>
              )}
              <a
                href={service.secondary_cta_url || "#service-solutions"}
                className="inline-flex items-center gap-2 px-1 py-3 text-sm font-bold text-[#31536c] transition hover:text-[#008da4]"
              >
                {service.secondary_cta_label || "Explore capabilities"}
                <ArrowDownRight aria-hidden="true" className="h-4 w-4 text-[#008da4]" />
              </a>
            </div>
          </div>

          {/* Right Column: Clean Editorial Portrait Photograph (No double frames, no blue border) */}
          <figure className="relative mx-auto w-full max-w-[470px] lg:ml-auto lg:mr-0">
            <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-br-[3.75rem] bg-[#0d2a4a] shadow-[0_24px_54px_-28px_rgba(13,42,74,0.32)]">
              <Image
                src={heroImageSrc}
                alt={serviceImageAlt}
                title={(service.image ? service.image_title : service.seo?.og_image_title) || undefined}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                unoptimized={Boolean(heroImageSrc && (heroImageSrc.startsWith("http") || heroImageSrc.startsWith("/media")))}
              />
            </div>
            {service.image && service.image_title ? (
              <figcaption className="mt-3 text-xs font-semibold tracking-wide text-slate-500">
                {service.image_title}
              </figcaption>
            ) : null}
          </figure>
        </div>
      </div>
    </section>
  );
}

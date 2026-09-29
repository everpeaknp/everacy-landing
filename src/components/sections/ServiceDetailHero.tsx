import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { ServiceCardData } from "@/lib/api";

interface ServiceDetailHeroProps {
  service: ServiceCardData;
  categoryTitle: string;
  categoryHref: string;
  ctaHref: string;
  ctaLabel: string;
}

export function ServiceDetailHero({
  service,
  categoryTitle,
  categoryHref,
  ctaHref,
  ctaLabel,
}: ServiceDetailHeroProps) {
  const description = service.tagline || service.description;
  const internalCta = ctaHref.startsWith("/");
  return (
    <section data-service-hero className="relative isolate overflow-hidden border-b border-[#dce8ec] bg-[#f4f9fa] px-5 pb-10 pt-24 text-[#0d2a4a] sm:px-8 sm:pb-12 sm:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_0%,rgba(0,166,203,0.08),transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 sm:mb-10">
          <Link href="/services" className="transition hover:text-[#008b9b]">Services</Link>
          <ChevronRight aria-hidden="true" className="h-4 w-4 text-[#00a6cb]" />
          <Link href={categoryHref} className="transition hover:text-[#008b9b]">{categoryTitle}</Link>
          <ChevronRight aria-hidden="true" className="h-4 w-4 text-[#00a6cb]" />
          <span aria-current="page" className="line-clamp-1 text-[#0d2a4a]">{service.title}</span>
        </nav>

        <div>
          <div className="max-w-4xl">
            <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.06] tracking-[-0.035em] text-[#0d2a4a] sm:text-6xl lg:text-7xl">
              {service.title}
            </h1>
            {description && <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">{description}</p>}
            <div className="mt-8 flex flex-wrap items-center gap-5">
              {ctaLabel && <>
              {internalCta ? (
                <Link href={ctaHref} className="inline-flex items-center gap-3 rounded-sm bg-[#00a6cb] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#078fae] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008da4] focus-visible:ring-offset-2">
                  {ctaLabel}<ArrowRight aria-hidden="true" className="h-5 w-5" />
                </Link>
              ) : (
                <a href={ctaHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-sm bg-[#00a6cb] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#078fae] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008da4] focus-visible:ring-offset-2">
                  {ctaLabel}<ArrowRight aria-hidden="true" className="h-5 w-5" />
                </a>
              )}
              </>}
              <a href="#service-solutions" className="inline-flex items-center gap-2 px-1 py-3 text-sm font-bold text-slate-600 transition hover:text-[#0d2a4a]">
                Explore services<ChevronRight aria-hidden="true" className="h-4 w-4 text-[#008b9b]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

interface ServicePageHeroProps {
  categoryHref?: string;
  categoryLabel?: string;
  eyebrow?: string;
  title?: string;
  description?: string | null;
  ctaHref?: string;
  ctaLabel?: string;
  ctaExternal?: boolean;
}

/** Quiet, centered introduction shared by the services index and category pages. */
export function ServicePageHero({
  categoryHref,
  categoryLabel,
  eyebrow,
  title,
  description,
  ctaHref,
  ctaLabel,
  ctaExternal = false,
}: ServicePageHeroProps) {
  const ctaClassName = "mt-8 inline-flex items-center gap-3 rounded-sm bg-[#00a6cb] px-6 py-3.5 text-sm font-bold text-white shadow-sm transition duration-200 hover:bg-[#008db0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008da4] focus-visible:ring-offset-2 sm:text-base";

  return (
    <section
      data-service-hero
      className="relative isolate overflow-hidden border-b border-[#dce8ec] bg-[#f4f9fa] px-5 pb-14 pt-28 text-[#0d2a4a] sm:px-8 sm:pb-16 sm:pt-36"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,166,203,0.09),transparent_62%)]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <div className="mx-auto max-w-4xl">
          {categoryHref && categoryLabel && (
            <Link
              href={categoryHref}
              className="mb-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#008b9b] transition-colors hover:text-[#0d2a4a]"
            >
              {categoryLabel}
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          )}

          {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#008b9b] sm:text-sm">{eyebrow}</p>}
          {title && <h1 className="mt-4 text-4xl font-black leading-[1.08] tracking-[-0.045em] text-[#0d2a4a] sm:text-5xl lg:text-6xl">{title}</h1>}
          {description && (
            <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {description}
            </p>
          )}
          {ctaHref && ctaLabel && (ctaExternal ? (
            <a href={ctaHref} target="_blank" rel="noreferrer" className={ctaClassName}>
              {ctaLabel}
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </a>
          ) : (
            <Link href={ctaHref} className={ctaClassName}>
              {ctaLabel}
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

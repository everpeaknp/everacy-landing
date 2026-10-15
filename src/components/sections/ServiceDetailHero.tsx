import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
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

export function ServiceDetailHero({
  service,
  categoryTitle,
  categoryHref,
  ctaHref,
  ctaLabel,
}: ServiceDetailHeroProps) {
  const description = service.tagline || service.description;
  const internalCta = ctaHref.startsWith("/");
  const seoServiceImage = resolveMetadataImageUrl(service.seo?.og_image, siteConfig.url);
  const serviceImage = service.image || seoServiceImage || "/images/service-previews/responsive-platforms.png";
  const isStaticPreview = !service.image && !seoServiceImage;
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
      : `${service.title} digital product preview`;
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

        <div className={`grid items-center gap-10 lg:gap-16 ${serviceImage ? "lg:grid-cols-[1.02fr_0.98fr]" : ""}`}>
          <div className={serviceImage ? "max-w-3xl" : "max-w-4xl"}>
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
          {serviceImage && (
            <figure className="relative isolate mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-none">
              <div className={`relative overflow-hidden ${isStaticPreview ? "flex items-center justify-center" : "aspect-[1.22]"}`}>
                {isStaticPreview ? (
                  <Image
                    src={serviceImage}
                    alt={serviceImageAlt}
                    width={1280}
                    height={853}
                    priority
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="h-auto max-h-[440px] w-full object-contain drop-shadow-[0_24px_32px_rgba(20,46,76,0.13)] sm:max-h-[520px]"
                  />
                ) : (
                  <Image
                    src={serviceImage}
                    alt={serviceImageAlt}
                    title={(service.image ? service.image_title : service.seo?.og_image_title) || undefined}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="object-cover"
                  />
                )}
              </div>
              {service.image && service.image_title ? (
                <figcaption className="mt-3 text-xs font-semibold tracking-wide text-slate-500">
                  {service.image_title}
                </figcaption>
              ) : null}
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}

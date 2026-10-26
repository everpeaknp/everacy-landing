"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AppWindow,
  ArrowRight,
  Code2,
  Megaphone,
  MonitorCog,
  Palette,
  PenTool,
  Search,
  Share2,
  Smartphone,
} from "lucide-react";
import type { ServiceCardData } from "@/lib/api";
import { FadeIn } from "@/components/animations/FadeIn";
import { ServiceContentIcon } from "@/components/sections/ServiceContentIcon";
import { EmptyState } from "@/components/ui/EmptyState";

interface ArchSectionProps {
  data?: ServiceCardData[];
  sectionTitle?: string;
}

function serviceHref(service: ServiceCardData): string {
  if (service.category?.slug && service.slug) {
    return "/services/" + encodeURIComponent(service.category.slug) + "/" + encodeURIComponent(service.slug);
  }

  return service.link_href && service.link_href !== "/services" ? service.link_href : "/services";
}

function serviceIcon(title: string) {
  const value = title.toLowerCase();
  if (value.includes("software") || value.includes("system")) return MonitorCog;
  if (value.includes("app") || value.includes("mobile")) return Smartphone;
  if (value.includes("seo") || value.includes("search")) return Search;
  if (value.includes("social")) return Share2;
  if (value.includes("marketing")) return Megaphone;
  if (value.includes("graphic")) return Palette;
  if (value.includes("ui") || value.includes("ux")) return PenTool;
  if (value.includes("website") || value.includes("development")) return Code2;
  return AppWindow;
}

function getFeaturedIllustration(title: string, index: number): string {
  const value = title.toLowerCase();
  if (value.includes("website") || value.includes("web")) {
    return "/images/service-previews/responsive-platforms.png";
  }
  if (value.includes("seo") || value.includes("search") || value.includes("marketing")) {
    return "/images/service-previews/service-outcomes.png";
  }
  if (value.includes("software") || value.includes("system")) {
    return "/images/service-previews/service-interface-systems.png";
  }
  if (value.includes("app") || value.includes("mobile")) {
    return "/images/service-previews/service-quality.png";
  }
  return index % 2 === 0
    ? "/images/service-previews/responsive-platforms.png"
    : "/images/service-previews/service-interface-systems.png";
}

export function ArchSection({ data, sectionTitle }: ArchSectionProps) {
  const cards = data ?? [];

  if (cards.length === 0) {
    return <EmptyState title="No services published yet" />;
  }

  const featuredCards = cards.slice(0, 2);
  const secondaryCards = cards.slice(2);

  return (
    <section
      className="border-b border-[#e2ecee] bg-[#f6fafb] py-20 sm:py-28"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Clean, Professional Header */}
        <FadeIn direction="up" duration={0.45}>
          <header className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-black tracking-[-0.03em] text-[#0d2a4a] sm:text-5xl">
                {sectionTitle || "Our Services"}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-[#586d82]">
                Web, mobile, custom software, and digital growth — designed and built under one roof.
              </p>
            </div>

            <Link
              href="/services"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-extrabold text-[#008da4] transition hover:text-[#0d2a4a]"
            >
              View all services
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </header>
        </FadeIn>

        {/* Top Row: 2 Wide Flagship Bento Cards with Visual Showcases */}
        <div className="grid gap-6 lg:grid-cols-2">
          {featuredCards.map((service, index) => {
            const illustrationSrc = service.image || getFeaturedIllustration(service.title, index);

            return (
              <FadeIn
                key={service.id}
                className="h-full"
                delay={Math.min(index * 0.06, 0.2)}
                duration={0.45}
              >
                <Link
                  href={serviceHref(service)}
                  className="group grid h-full items-center gap-6 border border-[#dce8ec] bg-white p-7 transition-all duration-300 hover:border-[#00a6cb] hover:shadow-[0_20px_44px_-28px_rgba(13,42,74,0.18)] sm:grid-cols-[1.15fr_0.85fr] sm:p-9"
                >
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-extrabold leading-snug tracking-tight text-[#0d2a4a] transition-colors group-hover:text-[#008da4]">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[#586d82] sm:text-[15px]">
                        {service.description}
                      </p>
                    </div>

                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#008da4] transition-colors group-hover:text-[#0d2a4a]">
                      Learn more
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </div>

                  <div className="relative mx-auto aspect-[4/3] w-full max-w-[240px] sm:max-w-none">
                    <Image
                      src={illustrationSrc}
                      alt={
                        service.image_is_decorative
                          ? ""
                          : service.image_alt || service.title
                      }
                      fill
                      sizes="(max-width: 640px) 240px, 260px"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        {/* Bottom Row: 4 Clean Supporting Bento Cards (Full 4-Column Row, No Orphans) */}
        {secondaryCards.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {secondaryCards.map((service, index) => {
              const Icon = serviceIcon(service.title);

              return (
                <FadeIn
                  key={service.id}
                  className="h-full"
                  delay={Math.min((index + 2) * 0.06, 0.28)}
                  duration={0.45}
                >
                  <Link
                    href={serviceHref(service)}
                    className="group flex h-full flex-col justify-between border border-[#dce8ec] bg-white p-7 transition-all duration-300 hover:border-[#00a6cb] hover:shadow-[0_20px_44px_-28px_rgba(13,42,74,0.18)]"
                  >
                    <div>
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#eef7f9] text-[#008da4] transition-colors duration-200 group-hover:bg-[#00a6cb] group-hover:text-white">
                        {service.icon ? (
                          <ServiceContentIcon name={service.icon} className="h-5 w-5" />
                        ) : (
                          <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />
                        )}
                      </span>

                      <h3 className="mt-5 text-lg font-extrabold leading-snug text-[#0d2a4a] transition-colors group-hover:text-[#008da4]">
                        {service.title}
                      </h3>

                      <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-[#586d82]">
                        {service.description}
                      </p>
                    </div>

                    <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#008da4] transition-colors group-hover:text-[#0d2a4a]">
                      Learn more
                      <ArrowRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

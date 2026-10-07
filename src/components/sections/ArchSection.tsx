"use client";

import Link from "next/link";
import { AppWindow, Code2, Megaphone, MonitorCog, Palette, PenTool, Search, Share2, Smartphone } from "lucide-react";
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

  return service.link_href && service.link_href !== "/services"
    ? service.link_href
    : "/services";
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

export function ArchSection({ data, sectionTitle }: ArchSectionProps) {
  const cards = data ?? [];

  return (
    <section className="bg-[#f8fafb] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn className="mx-auto max-w-3xl text-center" direction="up" duration={0.45}>
        <header>
          {sectionTitle && <h2 className="text-4xl font-extrabold tracking-tight text-[#101d30] sm:text-5xl">{sectionTitle}</h2>}
        </header>
        </FadeIn>

        {cards.length === 0 ? <EmptyState title="No services published yet" /> : <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
          {cards.map((service, index) => (
            <FadeIn key={service.id} className="h-full" delay={Math.min(index * 0.06, 0.24)} duration={0.45}>
            <Link
              href={serviceHref(service)}
              className="group flex h-full min-h-[205px] flex-col border border-slate-100 bg-white p-5 transition-colors duration-200 hover:border-[#c8e7e8] hover:bg-[#f1f8f8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008da4] focus-visible:ring-offset-2 sm:p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center overflow-hidden bg-[#effaf9] text-[#0097a7]">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.image_is_decorative ? "" : service.image_alt || service.title}
                    title={service.image_is_decorative ? undefined : service.image_title || service.image_alt || service.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  (() => {
                    const Icon = serviceIcon(service.title);
                    return service.icon
                      ? <ServiceContentIcon name={service.icon} className="h-5 w-5" />
                      : <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />;
                  })()
                )}
              </span>
              <h3 className="mt-4 text-lg font-bold leading-snug text-[#008b9b]">
                {service.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                {service.description}
              </p>
            </Link>
            </FadeIn>
          ))}
        </div>}
      </div>
    </section>
  );
}

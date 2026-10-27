import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { generateMetadata as genMeta } from "@/lib/seo";
import { ServiceCategoryHero } from "@/components/sections/ServiceCategoryHero";
import { ServiceSectionNav } from "@/components/sections/ServiceSectionNav";
import { FadeIn } from "@/components/animations/FadeIn";
import { ServiceContentIcon } from "@/components/sections/ServiceContentIcon";
import { fetchGlobalSEO, fetchServiceCategory, fetchServicesPage } from "@/lib/api";
import { EmptyState } from "@/components/ui/EmptyState";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ServicesValueCards } from "@/components/services/ServicesValueCards";
import { ServicesWorkTogether } from "@/components/services/ServicesWorkTogether";
import { ServicesPlaybookBanner } from "@/components/services/ServicesPlaybookBanner";
import { ServicesCta } from "@/components/services/ServicesCta";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ categorySlug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const [category, globalSeo] = await Promise.all([
    fetchServiceCategory(categorySlug),
    fetchGlobalSEO(),
  ]);
  if (!category) return genMeta({ title: "Category not found", globalSeo, noIndex: true });

  return genMeta({
    title: category.title,
    description: category.description,
    canonicalPath: "/services/" + category.slug,
    seoData: category.seo,
    globalSeo,
  });
}

export default async function ServiceCategoryPage({ params }: PageProps) {
  const { categorySlug } = await params;
  const [category, servicesPage] = await Promise.all([
    fetchServiceCategory(categorySlug),
    fetchServicesPage(),
  ]);
  if (!category) notFound();

  const sectionNavItems = [
    { id: "category-services", label: "Services" },
    { id: "service-benefits", label: "Why Everacy" },
    { id: "service-process", label: "How We Work" },
    { id: "service-playbook", label: "Blueprint" },
  ];

  return (
    <main className="min-h-screen bg-[#f7fafb]">
      {/* 1. Category Hero */}
      <ServiceCategoryHero category={category} />

      {/* Connected Sticky On-Page Section Bar */}
      <ServiceSectionNav items={sectionNavItems} />

      {/* 2. Live Category Services Grid */}
      <section
        id="category-services"
        className="scroll-mt-28 border-b border-[#dce8ec] bg-white px-5 py-16 sm:px-8 sm:py-24"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {category.services.length > 0 ? (
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#008da4]">
                  Specialized Services
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#0d2a4a] sm:text-5xl">
                  Choose where to <span className="text-[#00a6cb]">start</span>
                </h2>
              </div>
              <p className="max-w-md text-sm font-medium leading-6 text-[#687d90]">
                Each service includes its own dedicated architecture approach, deliverables, technology stack, and case
                studies.
              </p>
            </div>
            <div className="grid border-l border-t border-[#dce7eb] bg-white sm:grid-cols-2 xl:grid-cols-3">
              {category.services.map((service, index) => (
                <FadeIn key={service.id} className="h-full min-w-0" delay={Math.min(index * 0.05, 0.2)} duration={0.4}>
                  <Link
                    href={"/services/" + category.slug + "/" + (service.slug || service.id)}
                    className="group relative flex h-full min-h-[240px] flex-col border-b border-r border-[#dce7eb] p-6 transition-colors hover:bg-[#f3f9fa] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00a6cb] sm:min-h-[260px] sm:p-8"
                  >
                    <div className="flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center bg-[#eaf6f7] text-[#008da4] transition group-hover:bg-[#00a6cb] group-hover:text-white">
                        <ServiceContentIcon name={service.icon} className="h-5 w-5" />
                      </span>
                      <span className="text-xs font-extrabold tracking-[0.14em] text-[#9aabb6]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 max-w-sm text-lg font-extrabold leading-snug text-[#0d2a4a] transition group-hover:text-[#008da4] sm:text-xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#667b8f] sm:text-[15px]">
                      {service.description}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-extrabold uppercase tracking-[0.12em] text-[#008da4]">
                      {category.service_link_label || "Explore service"}
                      <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="absolute bottom-7 right-7 h-4 w-4 text-[#9aabb6] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#008da4]"
                    />
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            title={`No ${category.title} services published yet`}
            description={category.empty_state_text || undefined}
          />
        )}
      </section>

      {/* 3. Value Proposition ("Innovation that just gets better") */}
      <ServicesValueCards />

      {/* 4. Dark Stepped Process & Engagement Models ("How we work together") */}
      <ServicesWorkTogether />

      {/* 5. Playbook / Blueprint Banner */}
      <div id="service-playbook" className="scroll-mt-24">
        <ServicesPlaybookBanner
          serviceTitle={category.title}
          ctaHref={category.primary_cta_url || `/contact?service=${encodeURIComponent(category.title)}`}
          ctaLabel={category.cta_label || undefined}
        />
      </div>

      {/* 6. Dual Action Cards ("Ready to get started?") */}
      <ServicesCta
        serviceTitle={category.title}
        ctaHref={category.primary_cta_url || `/contact?service=${encodeURIComponent(category.title)}`}
        ctaSection={servicesPage?.cta_section}
      />
    </main>
  );
}

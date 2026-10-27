import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { generateMetadata as genMeta } from "@/lib/seo";
import { FadeIn } from "@/components/animations/FadeIn";
import { ServiceContentIcon } from "@/components/sections/ServiceContentIcon";
import { fetchServicesPage, fetchServiceCategories, fetchGlobalSEO, fetchPageSEO } from "@/lib/api";
import { ServicesHero } from "@/components/services/ServicesHero";
import { ServicesSkillsTabs } from "@/components/services/ServicesSkillsTabs";
import { ServicesDifferentiator } from "@/components/services/ServicesDifferentiator";
import { ServicesCta } from "@/components/services/ServicesCta";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [pageData, globalSeo, pageSeo] = await Promise.all([
    fetchServicesPage(),
    fetchGlobalSEO(),
    fetchPageSEO("services"),
  ]);

  return genMeta({
    title: pageData?.hero?.title || undefined,
    description: pageData?.hero?.subtitle || undefined,
    canonicalPath: "/services",
    seoData: pageData?.hero?.seo,
    globalSeo,
    pageSeo,
  });
}

export default async function ServicesPage() {
  const [pageData, categories] = await Promise.all([
    fetchServicesPage(),
    fetchServiceCategories(),
  ]);

  return (
    <main className="min-h-screen bg-[#f7fafb]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* 1. Agency Overview Hero + Stats Strip */}
      <ServicesHero
        eyebrow={pageData?.hero?.eyebrow}
        title={pageData?.hero?.title}
        description={pageData?.hero?.subtitle}
        secondaryDescription={pageData?.hero?.secondary_description}
        ctaLabel={pageData?.hero?.primary_cta_label || pageData?.hero?.cta_label}
        ctaHref={pageData?.hero?.primary_cta_url}
        secondaryCtaLabel={pageData?.hero?.secondary_cta_label}
        secondaryCtaHref={pageData?.hero?.secondary_cta_url}
        image={pageData?.hero?.background_image}
        stats={pageData?.stats}
      />

      {/* 2. Practice Areas & Service Directory (Primary focus of /services) */}
      {categories.length > 0 && (
        <section
          id="service-categories"
          className="scroll-mt-24 border-b border-[#dce8ec] bg-white px-5 py-20 sm:px-8 sm:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex flex-col justify-between gap-6 border-b border-[#d5e4e8] pb-8 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#008da4]">
                  {pageData?.directory_section?.eyebrow || pageData?.hero?.directory_eyebrow || "Practice Directory"}
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#0d2a4a] sm:text-5xl">
                  {(() => {
                    const dirTitle = pageData?.directory_section?.title || pageData?.hero?.directory_title;
                    if (dirTitle) {
                      return dirTitle.toLowerCase().includes("capabilities") ? (
                        <>
                          {dirTitle.substring(0, dirTitle.toLowerCase().indexOf("capabilities"))}
                          <span className="text-[#00a6cb]">capabilities</span>
                        </>
                      ) : (
                        dirTitle
                      );
                    }
                    return (
                      <>
                        Browse our <span className="text-[#00a6cb]">capabilities</span>
                      </>
                    );
                  })()}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-[#586d82] sm:text-base">
                {pageData?.directory_section?.description ||
                  pageData?.hero?.directory_description ||
                  "Explore our specialized engineering, product design, and growth practices — or dive directly into a specific service."}
              </p>
            </div>

            <div className="space-y-20">
              {categories.map((category, categoryIndex) => (
                <div
                  key={category.id}
                  aria-labelledby={"category-" + category.slug}
                  className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.45fr)] lg:gap-14"
                >
                  <FadeIn direction="up" duration={0.45}>
                    <div className="lg:sticky lg:top-28">
                      <span className="inline-block bg-[#eaf6f8] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#008da4]">
                        Practice {String(categoryIndex + 1).padStart(2, "0")}
                      </span>
                      <h3
                        id={"category-" + category.slug}
                        className="mt-4 text-3xl font-black tracking-tight text-[#0d2a4a] sm:text-4xl"
                      >
                        {category.title}
                      </h3>
                      {category.description && (
                        <p className="mt-4 max-w-md text-sm leading-7 text-[#586d82] sm:text-base">
                          {category.description}
                        </p>
                      )}
                      <Link
                        href={"/services/" + category.slug}
                        className="mt-6 inline-flex items-center gap-2 bg-[#0d2a4a] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.14em] text-white transition hover:bg-[#00a6cb]"
                      >
                        {(pageData?.directory_section?.category_link_label || pageData?.hero?.category_link_label || `Explore ${category.title}`).replaceAll(
                          "{category}",
                          category.title
                        )}
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </Link>
                    </div>
                  </FadeIn>

                  <div className="grid border-l border-t border-[#d5e4e8] bg-white sm:grid-cols-2">
                    {category.services.map((service, index) => (
                      <FadeIn key={service.id} delay={Math.min(index * 0.05, 0.2)} duration={0.4}>
                        <Link
                          href={"/services/" + category.slug + "/" + (service.slug || service.id)}
                          className="group relative flex h-full flex-col justify-between border-b border-r border-[#d5e4e8] p-6 transition-colors hover:bg-[#f4f9fa] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00a6cb] sm:p-7"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="grid h-10 w-10 place-items-center bg-[#eaf6f8] text-[#008da4] transition-colors group-hover:bg-[#00a6cb] group-hover:text-white">
                                <ServiceContentIcon name={service.icon} className="h-5 w-5" />
                              </span>
                              <span className="text-xs font-extrabold tabular-nums text-[#9aabb6]">
                                {String(index + 1).padStart(2, "0")}
                              </span>
                            </div>
                            <h4 className="mt-5 text-lg font-extrabold leading-snug text-[#0d2a4a] transition-colors group-hover:text-[#008da4]">
                              {service.title}
                            </h4>
                            <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#586d82]">
                              {service.description}
                            </p>
                          </div>

                          <div className="mt-6 flex items-center justify-between border-t border-[#e8f0f2] pt-4 text-xs font-extrabold uppercase tracking-[0.14em] text-[#008da4]">
                            <span>View service</span>
                            <ArrowUpRight
                              aria-hidden="true"
                              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                          </div>
                        </Link>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Cross-Discipline Skills & Stack Matrix */}
      <ServicesSkillsTabs
        tabs={pageData?.skill_tabs}
        eyebrow={pageData?.skills_section?.eyebrow || pageData?.hero?.skills_eyebrow}
        title={pageData?.skills_section?.title || pageData?.hero?.skills_title}
        description={pageData?.skills_section?.description || pageData?.hero?.skills_description}
      />

      {/* 4. Agency-Wide Engineering Standard */}
      <ServicesDifferentiator
        pillars={pageData?.differentiators}
        eyebrow={pageData?.differentiator_section?.eyebrow || pageData?.hero?.differentiator_eyebrow}
        title={pageData?.differentiator_section?.title || pageData?.hero?.differentiator_title}
        primaryCtaLabel={pageData?.differentiator_section?.primary_cta_label || pageData?.hero?.differentiator_cta_label}
        primaryCtaUrl={pageData?.differentiator_section?.primary_cta_url || pageData?.hero?.differentiator_cta_url}
        secondaryCtaLabel={pageData?.differentiator_section?.secondary_cta_label || pageData?.hero?.differentiator_secondary_cta_label}
        secondaryCtaUrl={pageData?.differentiator_section?.secondary_cta_url || pageData?.hero?.differentiator_secondary_cta_url}
      />

      {/* 5. Dual Action Cards */}
      <ServicesCta ctaSection={pageData?.cta_section} />
    </main>
  );
}

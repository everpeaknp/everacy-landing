import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { generateMetadata as genMeta } from "@/lib/seo";
import { ServicePageHero } from "@/components/sections/ServicePageHero";
import { FadeIn } from "@/components/animations/FadeIn";
import { fetchServicesPage, fetchServiceCategories, fetchGlobalSEO, fetchPageSEO } from "@/lib/api";
import { EmptyState } from "@/components/ui/EmptyState";

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

  if (categories.length === 0) return <EmptyState title="No services published yet" />;

  return (
    <main className="min-h-screen bg-[#f7fafb]">
      <ServicePageHero
        eyebrow={pageData?.hero?.eyebrow}
        title={pageData?.hero?.title}
        description={pageData?.hero?.subtitle}
        ctaHref="#service-categories"
        ctaLabel={pageData?.hero?.cta_label}
      />

      <div id="service-categories" className="mx-auto max-w-7xl space-y-16 px-5 py-16 sm:space-y-24 sm:px-8 sm:py-20">
        {categories.map((category, categoryIndex) => (
          <section key={category.id} aria-labelledby={"category-" + category.slug} className="grid gap-8 pt-8 sm:pt-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)] lg:gap-16 lg:pt-12">
            <FadeIn direction="up" duration={0.45}>
              <div className="lg:sticky lg:top-28">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0097a7]">Category {String(categoryIndex + 1).padStart(2, "0")}</p>
                <h2 id={"category-" + category.slug} className="text-3xl font-black text-[#0d2a4a] sm:text-4xl">{category.title}</h2>
                {category.description && <p className="mt-4 max-w-md leading-7 text-slate-600">{category.description}</p>}
                <Link href={"/services/" + category.slug} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#00a6cb] hover:underline">
                  {(pageData?.hero?.category_link_label || category.title).replaceAll("{category}", category.title)}<ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </FadeIn>
            <div className="divide-y divide-slate-200">
              {category.services.map((service, index) => (
                <FadeIn key={service.id} delay={Math.min(index * 0.06, 0.24)} duration={0.45}>
                  <Link
                    href={"/services/" + category.slug + "/" + (service.slug || service.id)}
                    className="group grid grid-cols-[2.5rem_minmax(0,1fr)_1.25rem] items-start gap-3 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00a6cb] sm:gap-5 sm:py-6"
                  >
                    <span className="pt-1 text-xs font-bold tracking-wider text-[#0097a7]">{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="text-lg font-extrabold text-[#0d2a4a] transition-colors group-hover:text-[#0097a7] sm:text-xl">{service.title}</span>
                      <span className="mt-2 block max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{service.description}</span>
                    </span>
                    <ArrowRight aria-hidden="true" className="mt-1 h-5 w-5 text-[#0097a7] transition-transform group-hover:translate-x-1" />
                  </Link>
                </FadeIn>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

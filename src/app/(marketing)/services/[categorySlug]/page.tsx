import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { generateMetadata as genMeta } from "@/lib/seo";
import { ServicePageHero } from "@/components/sections/ServicePageHero";
import { FadeIn } from "@/components/animations/FadeIn";
import { ServiceContentIcon } from "@/components/sections/ServiceContentIcon";
import { fetchGlobalSEO, fetchServiceCategory } from "@/lib/api";
import { EmptyState } from "@/components/ui/EmptyState";

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
  const category = await fetchServiceCategory(categorySlug);
  if (!category) notFound();

  return (
    <main className="min-h-screen bg-[#f7fafb]">
      <ServicePageHero
        categoryHref="/services"
        categoryLabel={category.breadcrumb_label}
        eyebrow={category.hero_eyebrow}
        title={category.title}
        description={category.description}
        ctaHref="#category-services"
        ctaLabel={category.cta_label?.replaceAll("{category}", category.title)}
      />
      <section id="category-services" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        {category.services.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {category.services.map((service, index) => (
              <FadeIn key={service.id} className="h-full" delay={Math.min(index * 0.06, 0.24)} duration={0.45}>
              <Link
                href={"/services/" + category.slug + "/" + (service.slug || service.id)}
                className="group flex h-full min-h-56 flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#8cd4dd] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a6cb]"
              >
                <span className="mb-5 grid h-12 w-12 place-items-center bg-[#effaf9] text-[#0097a7]"><ServiceContentIcon name={service.icon} className="h-6 w-6" /></span>
                <h2 className="text-xl font-extrabold text-[#0d2a4a] group-hover:text-[#00a6cb]">{service.title}</h2>
                <p className="mt-3 line-clamp-4 text-[15px] leading-7 text-slate-600">{service.description}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-[#00a6cb]">{category.service_link_label || "View service"} <ArrowRight aria-hidden="true" className="h-4 w-4" /></span>
              </Link>
              </FadeIn>
            ))}
          </div>
        ) : (
          <EmptyState title={`No ${category.title} services published yet`} description={category.empty_state_text || undefined} />
        )}
      </section>
    </main>
  );
}

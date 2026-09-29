import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronDown, Code2 } from "lucide-react";
import { generateMetadata as genMeta } from "@/lib/seo";
import { ServiceDetailHero } from "@/components/sections/ServiceDetailHero";
import { ServiceContentIcon } from "@/components/sections/ServiceContentIcon";
import { ServiceTechnologyStack } from "@/components/sections/ServiceTechnologyStack";
import { FadeIn } from "@/components/animations/FadeIn";
import { fetchBlogsPageData, fetchGlobalSEO, fetchProjects, fetchServiceBySlug, fetchServiceCategory } from "@/lib/api";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ categorySlug: string; serviceSlug: string }> };

async function getData(params: PageProps["params"]) {
  const { categorySlug, serviceSlug } = await params;
  const [service, category, globalSeo] = await Promise.all([
    fetchServiceBySlug(serviceSlug),
    fetchServiceCategory(categorySlug),
    fetchGlobalSEO(),
  ]);
  if (!service || !category || service.category?.slug !== category.slug) return null;
  return { service, category, globalSeo };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await getData(params);
  if (!data) return genMeta({ title: "Service not found", noIndex: true });

  return genMeta({
    title: data.service.title,
    description: data.service.tagline || data.service.description,
    canonicalPath: "/services/" + data.category.slug + "/" + data.service.slug,
    seoData: data.service.seo,
    globalSeo: data.globalSeo,
  });
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const data = await getData(params);
  if (!data) notFound();
  const { service, category } = data;
  const [projectsData, blogsData] = await Promise.all([fetchProjects(), fetchBlogsPageData()]);
  const projects = (projectsData?.projects ?? []).filter((project) => project.is_active && project.is_featured).slice(0, 3);
  const articles = (blogsData?.posts ?? []).slice(0, 3);
  const ctaHref = service.link_href && service.link_href !== "/services"
    ? service.link_href
    : "/contact?service=" + encodeURIComponent(service.title);
  const sectionCopy = (section: string, part: "eyebrow" | "title" | "description") =>
    (service as unknown as Record<string, string | undefined>)["section_" + section + "_" + part] || "";

  return (
    <main className="min-h-screen bg-white text-[#142e4c]">
      <ServiceDetailHero
        service={service}
        categoryHref={`/services/${category.slug}`}
        categoryTitle={category.title}
        ctaHref={ctaHref}
        ctaLabel={service.cta_label || ""}
      />

      {service.show_capabilities !== false && service.capabilities && service.capabilities.length > 0 && (
        <section id="service-solutions" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-24">
          <FadeIn className="mx-auto max-w-7xl" duration={0.5}>
            <div className="mx-auto max-w-2xl text-center">
              {sectionCopy("solutions", "eyebrow") && <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#008da4]">{sectionCopy("solutions", "eyebrow")}</p>}
              {sectionCopy("solutions", "title") && <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#142e4c] sm:text-4xl">{sectionCopy("solutions", "title").replaceAll("{title}", service.title)}</h2>}
              {sectionCopy("solutions", "description") && <p className="mt-4 leading-7 text-[#65778d]">{sectionCopy("solutions", "description")}</p>}
            </div>
            <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {service.capabilities.map((capability, index) => (
                <article key={capability.title} className="group border-t border-[#dce9ed] pt-5">
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center text-[#008da4]">
                      <ServiceContentIcon name={capability.icon} className="h-6 w-6" />
                    </span>
                    <span className="text-xs font-bold tracking-[0.12em] text-[#88a0b0]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold leading-snug text-[#142e4c]">{capability.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#667990]">{capability.description}</p>
                </article>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {service.show_case_studies !== false && service.case_studies && service.case_studies.length > 0 && (
        <section className="border-y border-[#e5ecee] bg-[#f6fafb] px-5 py-16 sm:px-8 sm:py-20">
          <FadeIn className="mx-auto max-w-7xl" duration={0.5}>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div className="max-w-2xl">
                {sectionCopy("case_studies", "eyebrow") && <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#008da4]">{sectionCopy("case_studies", "eyebrow")}</p>}
                {sectionCopy("case_studies", "title") && <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#142e4c] sm:text-4xl">{sectionCopy("case_studies", "title")}</h2>}
                {sectionCopy("case_studies", "description") && <p className="mt-4 leading-7 text-[#65778d]">{sectionCopy("case_studies", "description")}</p>}
              </div>
              {service.case_study_card_label && <span className="text-xs font-semibold text-[#718296]">{service.case_study_card_label}</span>}
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {service.case_studies.map((study) => (
                <article key={study.title} className="group overflow-hidden border border-[#dfe8eb] bg-white">
                  <div className="relative aspect-[1.55] overflow-hidden bg-[#e9f0f1]">
                    <Image src={study.image} alt={study.image_alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                    {service.case_study_card_label && <span className="absolute left-4 top-4 bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#31536c]">{service.case_study_card_label}</span>}
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#008da4]">{study.eyebrow}</p>
                    <h3 className="mt-2 text-lg font-extrabold leading-snug text-[#142e4c]">{study.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#667990]">{study.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {service.show_pipeline !== false && service.pipeline && service.pipeline.length > 0 && (
        <section className="px-5 py-20 sm:px-8 sm:py-24">
          <FadeIn className="mx-auto max-w-7xl" duration={0.5}>
            <div className="mx-auto max-w-3xl text-center">
                {sectionCopy("pipeline", "eyebrow") && <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#008da4]">{sectionCopy("pipeline", "eyebrow")}</p>}
                {sectionCopy("pipeline", "title") && <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#142e4c] sm:text-4xl">{sectionCopy("pipeline", "title")}</h2>}
                {sectionCopy("pipeline", "description") && <p className="mt-4 leading-7 text-[#65778d]">{sectionCopy("pipeline", "description")}</p>}
            </div>
            <ol className="mx-auto mt-12 grid max-w-7xl min-w-0 grid-cols-1 border-l border-t border-[#dce9ed] sm:grid-cols-2 xl:grid-cols-3">
                {service.pipeline.map((step, index) => (
                  <li key={step.step + step.title} className="min-w-0 border-b border-r border-[#dce9ed] bg-white p-6 sm:p-8">
                    <div className="flex items-center gap-4 text-xs font-extrabold tracking-[0.12em] text-[#008da4]">
                      <span className="grid h-10 w-10 shrink-0 place-items-center bg-[#edf7f8] text-sm">{step.step || `0${index + 1}`}</span>
                      <span className="h-px flex-1 bg-[#dce9ed]" />
                    </div>
                    <h3 className="mt-5 text-lg font-extrabold text-[#142e4c]">{step.title}</h3>
                    <p className="mt-3 break-words leading-7 text-[#667990]">{step.detail}</p>
                  </li>
                ))}
            </ol>
          </FadeIn>
        </section>
      )}
      {service.show_tech_stack !== false && ((service.tech_stack_groups?.length ?? 0) > 0 || (service.tech_stack?.length ?? 0) > 0) && (
        <section className="bg-[#f6fafb] px-5 py-20 sm:px-8 sm:py-24">
          <FadeIn className="mx-auto max-w-6xl text-center" duration={0.5}>
            {sectionCopy("technology", "eyebrow") && <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#008da4]">{sectionCopy("technology", "eyebrow")}</p>}
            {sectionCopy("technology", "title") && <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#142e4c] sm:text-4xl">{sectionCopy("technology", "title")}</h2>}
            {sectionCopy("technology", "description") && <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#65778d]">{sectionCopy("technology", "description")}</p>}
            <ServiceTechnologyStack technologies={service.tech_stack || service.tech_stack_groups?.flatMap((group) => group.technologies) || []} groups={service.tech_stack_groups} />
          </FadeIn>
        </section>
      )}

      {service.show_features !== false && service.features && service.features.length > 0 && (
        <section className="px-5 py-20 sm:px-8 sm:py-24">
          <FadeIn className="mx-auto max-w-7xl" duration={0.5}>
            <div className="mx-auto max-w-2xl text-center">
              {sectionCopy("features", "eyebrow") && <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#008da4]">{sectionCopy("features", "eyebrow")}</p>}
              {sectionCopy("features", "title") && <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#142e4c] sm:text-4xl">{sectionCopy("features", "title")}</h2>}
              {sectionCopy("features", "description") && <p className="mt-4 leading-7 text-[#65778d]">{sectionCopy("features", "description")}</p>}
            </div>
            <ul className="mx-auto mt-12 grid max-w-6xl grid-cols-1 border-l border-t border-[#dce9ed] sm:grid-cols-2 xl:grid-cols-4">
              {service.features.map((feature) => (
                <li key={feature.title} className="min-w-0 border-b border-r border-[#dce9ed] bg-white p-6 sm:p-7">
                  <span className="mb-5 grid h-11 w-11 place-items-center border border-[#dce9ed] text-[#008da4]"><ServiceContentIcon name={feature.icon} className="h-5 w-5" /></span>
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-[#142e4c]">{feature.title}</h3>
                    <p className="mt-2 break-words text-sm leading-6 text-[#667990]">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </FadeIn>
        </section>
      )}
      {service.show_benefits !== false && service.benefits && service.benefits.length > 0 && (
        <section className="bg-[#f6fafb] px-5 py-20 sm:px-8 sm:py-24">
          <FadeIn className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16" duration={0.5}>
            <div className="max-w-xl">
              {sectionCopy("benefits", "eyebrow") && <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#008da4]">{sectionCopy("benefits", "eyebrow")}</p>}
              {sectionCopy("benefits", "title") && <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-[#142e4c] sm:text-4xl">{sectionCopy("benefits", "title")}</h2>}
              {sectionCopy("benefits", "description") && <p className="mt-4 leading-7 text-[#65778d]">{sectionCopy("benefits", "description")}</p>}
            </div>
            <ul className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
              {service.benefits.map((benefit) => (
                <li key={benefit.title} className="flex min-w-0 gap-4 border border-[#dce9ed] bg-white p-5 sm:p-6">
                  <span className="grid h-10 w-10 shrink-0 place-items-center bg-[#edf7f8] text-[#008da4]"><ServiceContentIcon name={benefit.icon || "ShieldCheck"} className="h-5 w-5" /></span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-[#142e4c]">{benefit.title}</h3>
                    <p className="mt-2 break-words text-sm leading-6 text-[#667990]">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </FadeIn>
        </section>
      )}
      {service.show_faqs !== false && service.faqs && service.faqs.length > 0 && (
        <section className="px-5 py-20 sm:px-8 sm:py-24">
          <FadeIn className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr]" duration={0.5}>
            <div>
              {sectionCopy("faqs", "eyebrow") && <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#008da4]">{sectionCopy("faqs", "eyebrow")}</p>}
              {sectionCopy("faqs", "title") && <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#142e4c] sm:text-4xl">{sectionCopy("faqs", "title")}</h2>}
              {sectionCopy("faqs", "description") && <p className="mt-4 max-w-sm leading-7 text-[#65778d]">{sectionCopy("faqs", "description")}</p>}
            </div>
            <div className="divide-y divide-[#e4edf0] border-y border-[#e4edf0]">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-bold text-[#193756] marker:hidden [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-[#008da4] transition group-open:rotate-180" />
                  </summary>
                  <p className="max-w-3xl pr-10 pt-4 leading-7 text-[#667990]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {service.show_projects !== false && projects.length > 0 && (
        <section className="bg-[#f6fafb] px-5 py-20 sm:px-8 sm:py-24">
          <FadeIn className="mx-auto max-w-7xl" duration={0.5}>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                {sectionCopy("projects", "eyebrow") && <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#008da4]">{sectionCopy("projects", "eyebrow")}</p>}
                {sectionCopy("projects", "title") && <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#142e4c] sm:text-4xl">{sectionCopy("projects", "title")}</h2>}
              </div>
              {service.projects_link_label && <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-[#008da4] hover:text-[#27446e]">{service.projects_link_label}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>}
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {projects.map((project, index) => (
                <Link key={project.id} href={`/projects/${project.slug}`} className="group overflow-hidden border border-[#e1ebef] bg-white transition-colors hover:border-[#008da4]">
                  <div className="relative grid aspect-[1.55] place-items-center overflow-hidden bg-[linear-gradient(135deg,#dff6f5,#eef4fc_55%,#d6e7f5)]">
                    {project.background_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={project.background_image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-[#008da4]/70"><Code2 aria-hidden="true" className="h-14 w-14" strokeWidth={1.2} /></div>
                    )}
                    {project.logo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={project.logo} alt="" className="relative z-10 max-h-12 max-w-[45%] object-contain drop-shadow-sm" />
                    )}
                    <span className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center bg-white text-[#008da4]"><ArrowUpRight aria-hidden="true" className="h-4 w-4" /></span>
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#008da4]">Project 0{index + 1}</p>
                    <h3 className="mt-2 text-lg font-extrabold text-[#142e4c]">{project.name}</h3>
                    {project.description && <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#667990]">{project.description}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {service.show_articles !== false && articles.length > 0 && (
        <section className="px-5 py-20 sm:px-8 sm:py-24">
          <FadeIn className="mx-auto max-w-7xl" duration={0.5}>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                {sectionCopy("journal", "eyebrow") && <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#008da4]">{sectionCopy("journal", "eyebrow")}</p>}
                {sectionCopy("journal", "title") && <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#142e4c] sm:text-4xl">{sectionCopy("journal", "title")}</h2>}
              </div>
              {service.journal_link_label && <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-bold text-[#008da4] hover:text-[#27446e]">{service.journal_link_label}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>}
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {articles.map((article, index) => (
                <Link key={article.id} href={`/blogs/${article.slug || article.id}`} className="group overflow-hidden border border-[#e3edf0] bg-white transition-colors hover:border-[#008da4]">
                  <div className="relative aspect-[1.7] overflow-hidden bg-[linear-gradient(135deg,#e0f6f4,#eff3fa)]">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                      style={article.cover_image ? { backgroundImage: `url("${article.cover_image}")` } : undefined}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#102f50]/10 to-transparent" />
                  </div>
                  <div className="p-6">
                    {article.category?.name && <p className="text-xs font-bold text-[#008da4]">{article.category.name}</p>}
                    <h3 className="mt-2 line-clamp-2 font-extrabold leading-6 text-[#142e4c]">{article.title}</h3>
                    {article.intro && <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#667990]">{article.intro}</p>}
                    {service.article_link_label && <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#008da4]">{service.article_link_label}<ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" /></span>}
                  </div>
                </Link>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {service.show_bottom_cta !== false && (sectionCopy("cta", "title") || sectionCopy("cta", "description")) && <section className="px-5 pb-20 sm:px-8 sm:pb-24">
        <FadeIn className="relative mx-auto max-w-7xl border-l-4 border-[#00a6cb] bg-[#102f50] px-7 py-12 text-white sm:px-12 sm:py-14 lg:px-16" duration={0.5}>
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              {sectionCopy("cta", "eyebrow") && <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#76dce1]">{sectionCopy("cta", "eyebrow")}</p>}
              {sectionCopy("cta", "title") && <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">{sectionCopy("cta", "title").replaceAll("{title}", service.title)}</h2>}
              {sectionCopy("cta", "description") && <p className="mt-3 max-w-xl leading-7 text-white/70">{sectionCopy("cta", "description")}</p>}
            </div>
            {service.bottom_cta_button_label && <Link href={ctaHref} className="inline-flex shrink-0 items-center justify-center gap-3 rounded-sm bg-[#00a6cb] px-7 py-4 text-sm font-extrabold text-white transition hover:bg-[#078fae] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#102f50]">{service.bottom_cta_button_label}<ArrowRight aria-hidden="true" className="h-5 w-5" /></Link>}
          </div>
        </FadeIn>
      </section>}
    </main>
  );
}

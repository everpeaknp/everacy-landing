import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Code2 } from "lucide-react";
import { generateMetadata as genMeta, resolveMetadataImageUrl, siteConfig } from "@/lib/seo";
import { ServiceDetailHero } from "@/components/sections/ServiceDetailHero";
import { ServiceCapabilityExplorer } from "@/components/sections/ServiceCapabilityExplorer";
import { ServiceSectionNav } from "@/components/sections/ServiceSectionNav";
import { ServiceContentIcon } from "@/components/sections/ServiceContentIcon";
import { ServiceTechnologyStack } from "@/components/sections/ServiceTechnologyStack";
import { FadeIn } from "@/components/animations/FadeIn";
import { resolveImageAlt } from "@/lib/image-seo";
import {
  fetchBlogsPageData,
  fetchGlobalSEO,
  fetchProjects,
  fetchServiceBySlug,
  fetchServiceCategory,
} from "@/lib/api";
import { ServicesTestimonialSpotlight } from "@/components/services/ServicesTestimonialSpotlight";
import { ServicesWorkTogether } from "@/components/services/ServicesWorkTogether";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { ServicesCta } from "@/components/services/ServicesCta";

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
  const projects = (projectsData?.projects ?? [])
    .filter((project) => project.is_active && project.is_featured)
    .slice(0, 3);
  const articles = (blogsData?.posts ?? []).slice(0, 3);
  const caseStudies = (service.case_studies ?? []).map((study) => ({
    ...study,
    image: resolveMetadataImageUrl(study.image, siteConfig.url) || study.image,
  }));
  const ctaHref =
    service.link_href && service.link_href !== "/services"
      ? service.link_href
      : "/contact?service=" + encodeURIComponent(service.title);
  const sectionCopy = (section: string, part: "eyebrow" | "title" | "description") =>
    (service as unknown as Record<string, string | undefined>)["section_" + section + "_" + part] || "";

  const hasTechStack =
    service.show_tech_stack !== false &&
    ((service.tech_stack_groups?.length ?? 0) > 0 || (service.tech_stack?.length ?? 0) > 0);

  const sectionNavItems = [
    service.show_capabilities !== false && service.capabilities?.length
      ? { id: "service-solutions", label: "Solutions" }
      : null,
    service.show_features !== false && service.features?.length
      ? { id: "service-features", label: "Deliverables" }
      : null,
    { id: "service-process", label: "How We Work" },
    service.show_benefits !== false && service.benefits?.length
      ? { id: "service-benefits", label: "Outcomes" }
      : null,
    hasTechStack ? { id: "service-stack", label: "Tech Stack" } : null,
    service.show_case_studies !== false && caseStudies.length
      ? { id: "service-case-studies", label: "Case Studies" }
      : null,
    service.show_projects !== false && projects.length
      ? { id: "service-work", label: "Selected Work" }
      : null,
    { id: "service-faq", label: "FAQs" },
  ].filter((item): item is { id: string; label: string } => Boolean(item));

  return (
    <main className="min-h-screen bg-white text-[#142e4c]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* 1. Split Hero with Portrait Image */}
      <ServiceDetailHero
        service={service}
        categoryHref={`/services/${category.slug}`}
        categoryTitle={category.title}
        ctaHref={ctaHref}
        ctaLabel={service.cta_label || "Build with us"}
      />

      {/* Sticky On-Page Section Nav */}
      <ServiceSectionNav items={sectionNavItems} />

      {/* 2. Client Testimonial Spotlight */}
      <ServicesTestimonialSpotlight serviceTitle={service.title} />

      {/* 3. What We Can Build (2x2 Architectural Capability Cards) */}
      {service.show_capabilities !== false && service.capabilities && service.capabilities.length > 0 && (
        <ServiceCapabilityExplorer
          capabilities={service.capabilities}
          eyebrow={sectionCopy("solutions", "eyebrow")}
          title={sectionCopy("solutions", "title").replaceAll("{title}", service.title)}
          description={sectionCopy("solutions", "description")}
          image={service.capabilities_image}
          imageAlt={service.capabilities_image_alt}
          imageTitle={service.capabilities_image_title}
          imageIsDecorative={service.capabilities_image_is_decorative}
        />
      )}

      {/* 4. Key Deliverables Grid (service.features) */}
      {service.show_features !== false && service.features && service.features.length > 0 && (
        <section
          id="service-features"
          className="scroll-mt-28 border-b border-[#dce8ec] bg-white px-5 py-20 sm:px-8 sm:py-28"
        >
          <FadeIn className="mx-auto max-w-7xl" duration={0.5}>
            <div className="mb-12 flex flex-col justify-between gap-6 border-b border-[#d5e4e8] pb-8 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#008da4]">
                  {sectionCopy("features", "eyebrow") || "Key Deliverables"}
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#0d2a4a] sm:text-5xl">
                  {sectionCopy("features", "title") || `What’s included in ${service.title}`}
                </h2>
              </div>
              {sectionCopy("features", "description") && (
                <p className="max-w-md text-sm leading-6 text-[#586d82] sm:text-base">
                  {sectionCopy("features", "description")}
                </p>
              )}
            </div>

            <ul className="grid min-w-0 grid-cols-1 border-l border-t border-[#d5e4e8] sm:grid-cols-2 xl:grid-cols-4">
              {service.features.map((feature, idx) => (
                <li
                  key={feature.title}
                  className="group flex min-w-0 flex-col justify-between border-b border-r border-[#d5e4e8] bg-white p-7 transition-colors hover:bg-[#f4f9fa] sm:p-8"
                >
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center bg-[#eaf6f8] text-[#008da4] transition-colors group-hover:bg-[#00a6cb] group-hover:text-white">
                        <ServiceContentIcon name={feature.icon} className="h-5 w-5" />
                      </span>
                      <span className="text-xs font-extrabold tabular-nums text-[#9aabb6]">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-[#0d2a4a]">{feature.title}</h3>
                    <p className="mt-2.5 break-words text-sm leading-6 text-[#586d82]">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </FadeIn>
        </section>
      )}

      {/* 5. How We Work Together (Stepped Trajectory + 3 Clean White Cards) */}
      <ServicesWorkTogether
        eyebrow={sectionCopy("pipeline", "eyebrow") || undefined}
        title={sectionCopy("pipeline", "title") || undefined}
        description={sectionCopy("pipeline", "description") || undefined}
        pipelineSteps={service.pipeline}
      />

      {/* 6. Service-Specific Business Outcomes (service.benefits) */}
      {service.show_benefits !== false && service.benefits && service.benefits.length > 0 && (
        <section
          id="service-benefits"
          className="scroll-mt-28 border-b border-[#dce8ec] bg-[#f4f9fa] px-5 py-20 sm:px-8 sm:py-28"
        >
          <FadeIn className="mx-auto max-w-7xl" duration={0.5}>
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              {/* Left: Clean Portrait Visual */}
              <figure className="relative mx-auto w-full max-w-[450px] lg:mx-0">
                <div className="relative aspect-[4/4.6] w-full overflow-hidden rounded-br-[3.75rem] bg-[#0d2a4a] shadow-[0_24px_54px_-28px_rgba(13,42,74,0.28)]">
                  <Image
                    src={
                      service.benefits_image ||
                      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=85"
                    }
                    alt={
                      service.benefits_image_is_decorative
                        ? ""
                        : resolveImageAlt({
                            alt: service.benefits_image_alt,
                            imageTitle: service.benefits_image_title,
                            recordTitle: `${service.title} outcomes`,
                            decorative: service.benefits_image_is_decorative,
                          })
                    }
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center"
                  />
                </div>
              </figure>

              {/* Right: Service Benefits */}
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#008da4]">
                  {sectionCopy("benefits", "eyebrow") || "Business Impact"}
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#0d2a4a] sm:text-5xl">
                  {sectionCopy("benefits", "title") || "Engineered for measurable growth"}
                </h2>
                {sectionCopy("benefits", "description") && (
                  <p className="mt-4 text-base leading-7 text-[#586d82]">{sectionCopy("benefits", "description")}</p>
                )}

                <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {service.benefits.map((benefit) => (
                    <li
                      key={benefit.title}
                      className="flex min-w-0 flex-col border border-[#d5e4e8] bg-white p-6 transition-colors hover:border-[#00a6cb]"
                    >
                      <span className="mb-4 grid h-10 w-10 shrink-0 place-items-center bg-[#eaf6f8] text-[#008da4]">
                        <ServiceContentIcon name={benefit.icon || "ShieldCheck"} className="h-5 w-5" />
                      </span>
                      <h3 className="text-base font-extrabold text-[#0d2a4a]">{benefit.title}</h3>
                      <p className="mt-2 break-words text-sm leading-6 text-[#586d82]">{benefit.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </section>
      )}

      {/* 7. Technology Stack powering this specific service */}
      {hasTechStack && (
        <section
          id="service-stack"
          className="scroll-mt-28 border-b border-[#dce8ec] bg-white px-5 py-20 sm:px-8 sm:py-24"
        >
          <FadeIn className="mx-auto max-w-6xl text-center" duration={0.5}>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#008da4]">
              {sectionCopy("technology", "eyebrow") || "Technology Stack"}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#0d2a4a] sm:text-5xl">
              {sectionCopy("technology", "title") || `Tools powering ${service.title}`}
            </h2>
            {sectionCopy("technology", "description") && (
              <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#586d82]">
                {sectionCopy("technology", "description")}
              </p>
            )}
            <ServiceTechnologyStack
              technologies={
                service.tech_stack || service.tech_stack_groups?.flatMap((group) => group.technologies) || []
              }
              items={service.tech_stack_items}
            />
          </FadeIn>
        </section>
      )}

      {/* 8. Case Studies (if present in CMS) */}
      {service.show_case_studies !== false && caseStudies.length > 0 && (
        <section
          id="service-case-studies"
          className="scroll-mt-28 border-b border-[#dce8ec] bg-[#f4f9fa] px-5 py-20 sm:px-8 sm:py-24"
        >
          <FadeIn className="mx-auto max-w-7xl" duration={0.5}>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div className="max-w-2xl">
                {sectionCopy("case_studies", "eyebrow") && (
                  <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#008da4]">
                    {sectionCopy("case_studies", "eyebrow")}
                  </p>
                )}
                {sectionCopy("case_studies", "title") && (
                  <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#0d2a4a] sm:text-4xl">
                    {sectionCopy("case_studies", "title")}
                  </h2>
                )}
                {sectionCopy("case_studies", "description") && (
                  <p className="mt-4 leading-7 text-[#65778d]">{sectionCopy("case_studies", "description")}</p>
                )}
              </div>
              {service.case_study_card_label && (
                <span className="text-xs font-semibold text-[#718296]">{service.case_study_card_label}</span>
              )}
            </div>
            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {caseStudies.map((study) => (
                <article
                  key={study.title}
                  className="group overflow-hidden border border-[#d5e4e8] bg-white transition-colors hover:border-[#00a6cb]"
                >
                  <div className="relative aspect-[1.55] overflow-hidden bg-[#e9f0f1]">
                    <Image
                      src={study.image}
                      alt={study.image_alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                    />
                    {service.case_study_card_label && (
                      <span className="absolute left-4 top-4 bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#31536c]">
                        {service.case_study_card_label}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#008da4]">
                      {study.eyebrow}
                    </p>
                    <h3 className="mt-2 text-lg font-extrabold leading-snug text-[#142e4c]">{study.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#667990]">{study.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {/* 9. Selected Client Work (if present) */}
      {service.show_projects !== false && projects.length > 0 && (
        <section
          id="service-work"
          className="scroll-mt-28 border-b border-[#dce8ec] bg-[#f4f9fa] px-5 py-20 sm:px-8 sm:py-24"
        >
          <FadeIn className="mx-auto max-w-7xl" duration={0.5}>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#008da4]">
                  {sectionCopy("projects", "eyebrow") || "Proof in production"}
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#0d2a4a] sm:text-4xl">
                  {sectionCopy("projects", "title") || "Selected client work"}
                </h2>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#008da4] hover:text-[#27446e]"
              >
                {service.projects_link_label || "View all projects"}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {projects.map((project, index) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group overflow-hidden border border-[#d5e4e8] bg-white transition-colors hover:border-[#008da4]"
                >
                  <div className="relative grid aspect-[1.55] place-items-center overflow-hidden bg-[linear-gradient(135deg,#dff6f5,#eef4fc_55%,#d6e7f5)]">
                    {project.background_image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.background_image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-[#008da4]/70">
                        <Code2 aria-hidden="true" className="h-14 w-14" strokeWidth={1.2} />
                      </div>
                    )}
                    {project.logo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.logo}
                        alt=""
                        className="relative z-10 max-h-12 max-w-[45%] object-contain drop-shadow-sm"
                      />
                    )}
                    <span className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center bg-white text-[#008da4]">
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#008da4]">
                      Project 0{index + 1}
                    </p>
                    <h3 className="mt-2 text-lg font-extrabold text-[#142e4c]">{project.name}</h3>
                    {project.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#667990]">{project.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {/* 10. Interactive FAQ Accordion */}
      <ServicesFaq
        eyebrow={sectionCopy("faqs", "eyebrow") || undefined}
        title={sectionCopy("faqs", "title") || undefined}
        description={sectionCopy("faqs", "description") || undefined}
        items={service.faqs && service.faqs.length > 0 ? service.faqs : null}
      />

      {/* 11. Journal / Insights (if present) */}
      {service.show_articles !== false && articles.length > 0 && (
        <section id="service-journal" className="scroll-mt-28 bg-white px-5 py-16 sm:px-8 sm:py-20">
          <FadeIn className="mx-auto max-w-7xl" duration={0.5}>
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#008da4]">
                  {sectionCopy("journal", "eyebrow") || "From our engineering blog"}
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#0d2a4a] sm:text-4xl">
                  {sectionCopy("journal", "title") || "Latest insights & guides"}
                </h2>
              </div>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#008da4] hover:text-[#27446e]"
              >
                {service.journal_link_label || "Read all articles"}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/blogs/${article.slug || article.id}`}
                  className="group overflow-hidden border border-[#d5e4e8] bg-white transition-colors hover:border-[#008da4]"
                >
                  <div className="relative aspect-[1.7] overflow-hidden bg-[linear-gradient(135deg,#e0f6f4,#eff3fa)]">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                      style={article.cover_image ? { backgroundImage: `url("${article.cover_image}")` } : undefined}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#102f50]/10 to-transparent" />
                  </div>
                  <div className="p-6">
                    {article.category?.name && (
                      <p className="text-xs font-bold text-[#008da4]">{article.category.name}</p>
                    )}
                    <h3 className="mt-2 line-clamp-2 font-extrabold leading-6 text-[#142e4c]">{article.title}</h3>
                    {article.intro && (
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#667990]">{article.intro}</p>
                    )}
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#008da4]">
                      {service.article_link_label || "Read article"}
                      <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </FadeIn>
        </section>
      )}

      {/* 12. Dual Action Cards ("Ready to get started?") */}
      <ServicesCta serviceTitle={service.title} ctaHref={ctaHref} />
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProjectScreenshotPreview } from "@/components/sections/ProjectScreenshotPreview";
import { ProjectTechnologyStack } from "@/components/sections/ProjectTechnologyStack";
import { fetchGlobalSEO, fetchProject } from "@/lib/api";
import { generateMetadata as genMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

async function getProject(slug: string) {
  const project = await fetchProject(slug);
  return project?.is_active ? project : null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [project, globalSeo] = await Promise.all([getProject(slug), fetchGlobalSEO()]);
  if (!project) return genMeta({ noIndex: true, globalSeo });
  return genMeta({
    title: project.seo?.meta_title || project.name,
    description: project.seo?.meta_description || project.description || undefined,
    canonicalPath: `/projects/${project.slug}`,
    seoData: project.seo,
    globalSeo,
  });
}

function SectionTitle({ eyebrow, children }: { eyebrow?: string; children: React.ReactNode }) {
  return <div className="mb-7">
    {eyebrow && <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#008fa4]">{eyebrow}</p>}
    <h2 className="text-2xl font-bold tracking-tight text-[#142e4c] sm:text-3xl">{children}</h2>
  </div>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const details = [...(project.details ?? [])]
    .filter((detail) => detail.question?.trim() || detail.answer?.trim())
    .sort((a, b) => a.order - b.order);
  const features = (project.features ?? []).filter(Boolean);
  const capabilities = details.length
    ? details.map((detail) => ({ title: detail.question, description: detail.answer }))
    : features.map((feature) => ({ title: feature, description: "" }));
  const platforms = (project.platforms ?? []).filter(Boolean);
  const technologies = (project.tech_stack ?? []).filter(Boolean);
  const technologyItems = project.tech_stack_items ?? [];
  const screenshots = (project.screenshots ?? []).filter((screenshot) => screenshot.image);
  const team = (project.team_composition ?? []).filter((member) => member?.role && member.count > 0);
  const links = (project.visit_links ?? []).filter((link) => link.href && link.label);
  const primaryLink = links[0];
  const poster = project.background_image || project.hero?.background_image || null;
  const title = project.hero?.title || project.name;
  const tagline = project.tagline?.text?.trim();

  return <main className="min-h-screen bg-white text-[#142e4c]">
    <section className="project-detail-hero bg-[#f1f8f9] px-5 pb-8 pt-24 sm:px-8 sm:pb-12 sm:pt-28">
      <div className="mx-auto max-w-6xl">
        <Link href="/projects" className="mb-8 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-[#57718a] transition hover:text-[#008da4]"><ArrowLeft aria-hidden="true" className="h-4 w-4" />All projects</Link>
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#008fa4]">Project case study</p>
          <h1 className="text-4xl font-extrabold leading-[1.04] tracking-[-0.045em] text-[#142e4c] sm:text-5xl lg:text-6xl">{title}</h1>
          {tagline && <p className="mt-4 text-xl font-semibold tracking-tight text-[#087f91] sm:text-2xl">{tagline}</p>}
          {project.description && <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[#526a81] sm:text-lg">{project.description}</p>}
          {primaryLink && <a href={primaryLink.href} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-[#087f91] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#066b7a]">Visit {primaryLink.label}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>}
        </div>
      </div>
    </section>

    {(poster || screenshots.length > 0) && <section className="bg-[#f1f8f9] px-5 pb-12 sm:px-8 sm:pb-16">
      <ProjectScreenshotPreview projectName={project.name} poster={poster} screenshots={screenshots} />
    </section>}

    {capabilities.length > 0 && <section className="project-detail-list px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <SectionTitle eyebrow="Product overview">Built around day-to-day restaurant operations</SectionTitle>
        <ul className="grid grid-cols-1 gap-x-12 md:grid-cols-2">{capabilities.map((capability, index) => <li key={`${capability.title}-${index}`} className="project-detail-row border-t border-[#e2ebee] py-5">
          <div className="flex gap-4"><span className="pt-1 text-xs font-bold tabular-nums text-[#008fa4]">{String(index + 1).padStart(2, "0")}</span><div>{capability.title && <h3 className="text-base font-semibold text-[#193653] sm:text-lg">{capability.title}</h3>}{capability.description && <p className="mt-1 text-sm leading-6 text-[#5b7187] sm:text-base">{capability.description}</p>}</div></div>
        </li>)}</ul>
      </div>
    </section>}

    {(technologyItems.length > 0 || technologies.length > 0) && <section className="project-technology border-t border-[#e2ebee] bg-[#f7fafb] px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl text-center">
        <SectionTitle eyebrow="Technology stack">The tools behind the product</SectionTitle>
        <p className="mx-auto -mt-3 mb-8 max-w-2xl text-base leading-7 text-[#60768a]">A carefully selected stack supports the product across web, mobile, services, and data.</p>
        <ProjectTechnologyStack items={technologyItems} technologies={technologies} />
      </div>
    </section>}

    {project.story_sections?.length ? <div className="project-story-sections">
      {[...project.story_sections].sort((a, b) => a.order - b.order).map((section) => <section key={section.id} className="project-story-section border-t border-[#e2ebee] px-5 py-9 first:border-t-0 sm:px-8 sm:py-12">
        <div className="project-story-section__content mx-auto max-w-5xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#008fa4]">{section.section === "approach" ? "Our Approach" : section.section === "solutions" ? "Key Solutions" : section.section === "result" ? "Project Result" : "Case study"}</p>
          <h2 className="text-3xl font-bold tracking-tight text-[#142e4c] sm:text-4xl">{section.heading}</h2>
          {section.intro && <p className="mt-3 text-lg font-semibold leading-7 text-[#284865]">{section.intro}</p>}
          {section.body && <p className="mt-4 whitespace-pre-line text-base leading-7 text-[#526a81]">{section.body}</p>}
          {section.highlights?.length > 0 && <ul className="project-story-section__highlights mt-5 divide-y divide-[#e2ebee] border-y border-[#e2ebee]">{section.highlights.map((item, index) => <li key={`${item}-${index}`} className="flex gap-4 py-3 text-base leading-6 text-[#526a81]"><span className="font-semibold tabular-nums text-[#008fa4]">{String(index + 1).padStart(2, "0")}</span><span>{item}</span></li>)}</ul>}
        </div>
      </section>)}
    </div> : null}

    {(platforms.length > 0 || team.length > 0) && <section className="project-team border-t border-[#e2ebee] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
        {platforms.length > 0 && <div><SectionTitle>Platforms</SectionTitle><ul className="space-y-3">{platforms.map((platform) => <li key={platform} className="border-b border-[#e2ebee] pb-3 text-base text-[#526a81]">{platform}</li>)}</ul></div>}
        {team.length > 0 && <div><SectionTitle>Project team</SectionTitle><ul className="space-y-3">{team.map((member) => <li key={member.role} className="flex items-baseline justify-between gap-4 border-b border-[#e2ebee] pb-3 text-base text-[#526a81]"><span>{member.role}</span><span className="text-sm tabular-nums text-[#6d8296]">{member.count}</span></li>)}</ul></div>}
      </div>
    </section>}

    {primaryLink && <section className="project-cta border-t border-[#e2ebee] px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto flex max-w-5xl flex-col justify-between gap-5 sm:flex-row sm:items-center"><div><p className="text-sm text-[#657b90]">Want to see the product?</p><h2 className="mt-1 text-2xl font-bold tracking-tight text-[#142e4c]">Explore {project.name}</h2></div><a href={primaryLink.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-sm bg-[#087f91] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#066b7a]">Visit {primaryLink.label}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a></div>
    </section>}

    {!project.description && capabilities.length === 0 && technologies.length === 0 && platforms.length === 0 && <div className="px-5 py-12"><EmptyState title="More project details haven’t been published yet" /></div>}
  </main>;
}

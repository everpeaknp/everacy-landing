import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Layers3, MonitorSmartphone, UsersRound } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
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

function DetailSection({ title, children, icon }: { title: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <section className="min-w-0 border-t border-white/15 pt-5">
      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-white/60">
        <span aria-hidden="true" className="text-[#65d5e1]">{icon}</span>{title}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const heroTitle = project.hero?.title || project.name;
  const summary = project.hero?.subtitle || project.description;
  const heroImage = project.hero?.background_image || project.background_image;
  const details = [...(project.details ?? [])].sort((a, b) => a.order - b.order);
  const features = (project.features ?? []).filter(Boolean);
  const platforms = (project.platforms ?? []).filter(Boolean);
  const technologies = (project.tech_stack ?? []).filter(Boolean);
  const team = (project.team_composition ?? []).filter((member) => member?.role && member.count > 0);
  const teamSize = team.reduce((total, member) => total + member.count, 0);
  const links = (project.visit_links ?? []).filter((link) => link.href && link.label);
  const hasSnapshot = platforms.length > 0 || team.length > 0 || technologies.length > 0;

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#142e4c]">
      <section className="relative isolate overflow-hidden bg-[#f2f8f9] px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_12%,rgba(0,166,203,0.15),transparent_45%),linear-gradient(120deg,transparent_40%,rgba(255,255,255,0.7))]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative z-10">
            <Link href="/projects" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-[#557089] transition hover:text-[#008da4]"><ArrowLeft aria-hidden="true" className="h-4 w-4" />All projects</Link>
            <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.2em] text-[#009eb4]">Project case study</p>
            <h1 className="max-w-2xl text-5xl font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-7xl">{heroTitle}</h1>
            {summary && <p className="mt-7 max-w-xl text-lg leading-8 text-[#5e7289] sm:text-xl">{summary}</p>}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              {links.map((link) => <a key={`${link.label}-${link.href}`} href={link.href} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center gap-3 rounded-full bg-[#27446e] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_30px_rgba(39,68,110,0.16)] transition hover:bg-[#008da4]">Visit {link.label}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>)}
              {platforms.length > 0 && <span className="text-sm font-semibold text-[#688099]">{platforms.length} platforms</span>}
            </div>
          </div>

          {(heroImage || project.logo) && <div className="relative mx-auto w-full max-w-2xl lg:ml-auto">
            <div aria-hidden="true" className="absolute -inset-4 rounded-[2.5rem] bg-[#8ddce2]/25 blur-2xl sm:-inset-8" />
            <div className="relative aspect-[1.16/1] overflow-hidden rounded-[1.75rem] border border-white/80 bg-white shadow-[0_32px_90px_rgba(22,60,83,0.18)] sm:rounded-[2.25rem]">
              {heroImage && <Image src={heroImage} alt={project.name} fill priority unoptimized sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />}
              {!heroImage && <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,#bceef0,transparent_40%),linear-gradient(135deg,#f9ffff,#c4e9eb)]" />}
              {project.logo && <div className="absolute bottom-5 left-5 flex h-20 min-w-32 items-center justify-center rounded-2xl border border-white/70 bg-white/90 px-5 shadow-lg backdrop-blur sm:bottom-7 sm:left-7"><Image src={project.logo} alt={`${project.name} logo`} width={200} height={80} unoptimized className="max-h-12 w-auto max-w-40 object-contain" /></div>}
              <span className="absolute right-5 top-5 rounded-full border border-white/70 bg-white/85 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#27446e] backdrop-blur sm:right-7 sm:top-7">{features.length.toString().padStart(2, "0")} capabilities</span>
            </div>
          </div>}
        </div>
      </section>

      {features.length > 0 && <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:mb-14 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-[#009eb4]">Inside the product</p>
              <h2 className="max-w-2xl text-3xl font-extrabold tracking-[-0.035em] sm:text-5xl">Product capabilities</h2>
            </div>
            <span className="text-sm font-semibold text-[#71839a]">{features.length.toString().padStart(2, "0")} capabilities</span>
          </div>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-[#dce8ec] bg-[#dce8ec] sm:grid-cols-2 xl:grid-cols-4">
            {features.map((feature, index) => <article key={`${feature}-${index}`} className="group relative flex min-h-60 flex-col justify-between bg-white p-7 transition-colors hover:bg-[#f3fafb] sm:min-h-72 sm:p-9">
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f7f7] text-sm font-extrabold text-[#009eb4]">{String(index + 1).padStart(2, "0")}</span>
                <span aria-hidden="true" className="text-3xl font-light text-[#b3dce0] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </div>
              <h3 className="max-w-xs text-xl font-extrabold leading-snug tracking-[-0.02em] text-[#193653] sm:text-2xl">{feature}</h3>
            </article>)}
          </div>
        </div>
      </section>}

      {details.length > 0 && <section className="border-y border-[#dce8ec] bg-[#f5f9fa] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[0.7fr_1.3fr]">
          <div><p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-[#009eb4]">The brief</p><h2 className="text-3xl font-extrabold">Project overview</h2></div>
          <div className="divide-y divide-[#dce8ec] border-y border-[#dce8ec]">
            {details.map((detail) => <article key={detail.id} className="py-6 first:pt-6 last:pb-6">
              {detail.question && <h3 className="text-lg font-bold">{detail.question}</h3>}
              {detail.answer && <p className="mt-3 leading-7 text-[#65778d]">{detail.answer}</p>}
            </article>)}
          </div>
        </div>
      </section>}

      {hasSnapshot && <section className="bg-[#102f50] px-5 py-16 text-white sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 sm:mb-14"><p className="mb-3 text-xs font-extrabold uppercase tracking-[0.2em] text-[#65d5e1]">Project snapshot</p><h2 className="text-3xl font-extrabold tracking-[-0.035em] sm:text-5xl">What it runs on</h2></div>
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            {platforms.length > 0 && <DetailSection title="Platforms" icon={<MonitorSmartphone className="h-4 w-4" />}>
              <ul className="flex flex-wrap gap-2">{platforms.map((platform) => <li key={platform} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90">{platform}</li>)}</ul>
            </DetailSection>}
            {team.length > 0 && <DetailSection title="Team" icon={<UsersRound className="h-4 w-4" />}>
              <p className="mb-3 text-3xl font-extrabold tracking-tight">{teamSize}<span className="ml-2 text-base font-semibold text-white/60">contributors</span></p>
              <ul className="space-y-2 text-sm text-white/75">{team.map((member) => <li key={member.role} className="flex justify-between gap-3"><span>{member.role}</span><span className="font-bold text-white">{member.count.toString().padStart(2, "0")}</span></li>)}</ul>
            </DetailSection>}
            {technologies.length > 0 && <DetailSection title="Technology" icon={<Layers3 className="h-4 w-4" />}>
              <ul className="flex flex-wrap gap-2">{technologies.map((technology) => <li key={technology} className="rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold text-white/90">{technology}</li>)}</ul>
            </DetailSection>}
          </div>
        </div>
      </section>}

      {project.tagline?.text && <section className="relative isolate overflow-hidden bg-[#f2f8f9] px-5 py-20 text-center sm:px-8 sm:py-28">
        {project.tagline.background_image && <Image src={project.tagline.background_image} alt="" fill unoptimized sizes="100vw" className="-z-10 object-cover opacity-20" />}
        <p className="mx-auto max-w-5xl text-3xl font-extrabold leading-tight tracking-[-0.035em] sm:text-5xl">{project.tagline.text}</p>
        {links.map((link) => <a key={`${link.label}-${link.href}`} href={link.href} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 font-bold text-[#008da4] hover:text-[#27446e]">Visit {link.label}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a>)}
      </section>}

      {!summary && details.length === 0 && !technologies.length && !platforms.length && !features.length && !project.tagline?.text && <div className="px-5 py-12"><EmptyState title="More project details haven't been published yet" /></div>}
    </main>
  );
}

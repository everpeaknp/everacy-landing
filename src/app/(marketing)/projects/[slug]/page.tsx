import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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

function ContentList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section className="border-t border-[#dce8ec] py-7">
      <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[#008da4]">{title}</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item, index) => <li key={`${item}-${index}`} className="rounded-full border border-[#dce8ec] bg-white px-4 py-2 text-sm text-[#31536c]">{item}</li>)}
      </ul>
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
  const team = (project.team_composition ?? []).filter((member) => member?.role && member.count > 0).map((member) => `${member.count} ${member.role}`);

  return (
    <main className="min-h-screen bg-white text-[#142e4c]">
      <section className="relative isolate overflow-hidden border-b border-[#dce8ec] bg-[#f4f9fa] px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_0%,rgba(0,166,203,0.1),transparent_55%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <Link href="/projects" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#557089] transition hover:text-[#008da4]"><ArrowLeft aria-hidden="true" className="h-4 w-4" />Back to projects</Link>
            <h1 className="text-4xl font-extrabold leading-tight tracking-[-0.035em] sm:text-6xl">{heroTitle}</h1>
            {summary && <p className="mt-6 max-w-2xl text-lg leading-8 text-[#65778d]">{summary}</p>}
            {project.tech_stack?.length ? <ul className="mt-8 flex flex-wrap gap-2">{project.tech_stack.map((technology) => <li key={technology} className="rounded-full border border-[#d5e3e8] bg-white/80 px-4 py-2 text-sm font-semibold">{technology}</li>)}</ul> : null}
          </div>
          {(heroImage || project.logo) && <div className="relative flex min-h-64 items-center justify-center overflow-hidden border border-[#dce8ec] bg-white p-8 sm:min-h-96">
            {heroImage && <Image src={heroImage} alt={project.name} fill priority unoptimized sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />}
            {project.logo && <Image src={project.logo} alt={project.name} width={240} height={100} unoptimized className="relative z-10 max-h-20 w-auto max-w-[65%] object-contain drop-shadow-sm" />}
          </div>}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        {details.length > 0 && <section className="grid gap-8 border-b border-[#dce8ec] pb-10 md:grid-cols-[0.7fr_1.3fr]">
          <h2 className="text-2xl font-extrabold">Project overview</h2>
          <div className="divide-y divide-[#e5ecee] border-y border-[#e5ecee]">
            {details.map((detail) => <article key={detail.id} className="py-6 first:pt-0 last:pb-0">
              {detail.question && <h3 className="font-bold">{detail.question}</h3>}
              {detail.answer && <p className="mt-3 leading-7 text-[#65778d]">{detail.answer}</p>}
            </article>)}
          </div>
        </section>}

        <div className="grid gap-x-12 lg:grid-cols-2">
          <ContentList title="Platforms" items={project.platforms ?? []} />
          <ContentList title="Challenges" items={project.challenges ?? []} />
          <ContentList title="Features" items={project.features ?? []} />
          <ContentList title="Team composition" items={team} />
        </div>

        {project.visit_links?.length ? <section className="mt-8 border-t border-[#dce8ec] py-8">
          <ul className="flex flex-wrap gap-3">{project.visit_links.map((link) => <li key={`${link.label}-${link.href}`}><a href={link.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-sm bg-[#27446e] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#008da4]">{link.label}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a></li>)}</ul>
        </section> : null}
      </div>

      {project.tagline?.text && <section className="relative isolate overflow-hidden bg-[#102f50] px-5 py-20 text-center text-white sm:px-8 sm:py-28">
        {project.tagline.background_image && <Image src={project.tagline.background_image} alt="" fill unoptimized sizes="100vw" className="-z-10 object-cover opacity-25" />}
        <p className="mx-auto max-w-5xl text-3xl font-extrabold leading-tight sm:text-5xl">{project.tagline.text}</p>
      </section>}

      {!summary && details.length === 0 && !project.tech_stack?.length && !project.platforms?.length && !project.challenges?.length && !project.features?.length && !project.tagline?.text && (
        <div className="px-5 pb-12"><EmptyState title="More project details haven't been published yet" /></div>
      )}
    </main>
  );
}

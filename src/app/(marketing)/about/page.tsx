import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { TeamSection } from "@/components/sections/TeamSection";
import { fetchAboutData, fetchGlobalSEO, fetchPageSEO } from "@/lib/api";
import { EmptyState } from "@/components/ui/EmptyState";

export async function generateMetadata(): Promise<Metadata> {
  const [aboutData, globalSeo, pageSeo] = await Promise.all([
    fetchAboutData(),
    fetchGlobalSEO(),
    fetchPageSEO("about"),
  ]);

  return genMeta({
    title: aboutData?.title || undefined,
    description: aboutData?.subtitle || undefined,
    canonicalPath: "/about",
    seoData: aboutData?.seo,
    globalSeo,
    pageSeo,
  });
}

export default async function AboutPage() {
  const [aboutData, pageSeo] = await Promise.all([
    fetchAboutData(),
    fetchPageSEO("about"),
  ]);

  if (!aboutData) return <EmptyState title="About content isn't published yet" />;

  const heroTitle = aboutData.title;
  const heroSubtitle = aboutData.subtitle;
  const teamTitle = aboutData?.team_title;
  const teamSubtitle = aboutData?.team_subtitle;

  return (
    <main className="relative z-[1] bg-white">
      {(pageSeo?.jsonLd || pageSeo?.json_ld) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pageSeo.jsonLd || pageSeo.json_ld),
          }}
        />
      )}
      {(heroTitle || heroSubtitle) && <section className="relative isolate overflow-hidden border-b border-[#dce8ec] bg-[#f4f9fa] px-5 py-20 text-center font-mont text-[#0d2a4a] sm:px-8 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,166,203,0.09),transparent_62%)]" />
        <div className="mx-auto max-w-5xl">
          {heroTitle && <h1 className="text-[clamp(2.1rem,7vw,4.25rem)] font-black leading-[1.08] tracking-tight text-[#0d2a4a]">{heroTitle}</h1>}
          {heroSubtitle?.trim() && (
            <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">
              {heroSubtitle}
            </p>
          )}
        </div>
      </section>}

      <TeamSection
        data={aboutData?.sections}
        headerTitle={teamTitle}
        headerSubtitle={teamSubtitle}
      />
    </main>
  );
}

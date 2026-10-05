import type { Metadata } from "next";
import { generateMetadata as genMeta, buildOrganizationSchema } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { ArchSection } from "@/components/sections/ArchSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FeaturedBlogs } from "@/components/sections/FeaturedBlogs";
import { CTASectionComponent } from "@/components/sections/CTASectionComponent";
import { HomeTechnologySection } from "@/components/sections/HomeTechnologySection";
import { fetchHomeData, fetchGlobalSEO, fetchPageSEO } from "@/lib/api";
import { EmptyState } from "@/components/ui/EmptyState";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [homeData, globalSeo, pageSeo] = await Promise.all([
    fetchHomeData(),
    fetchGlobalSEO(),
    fetchPageSEO("home"),
  ]);

  return genMeta({
    title: homeData?.hero?.heading || undefined,
    description: homeData?.hero?.subtext || undefined,
    canonicalPath: "/",
    seoData: homeData?.seo,
    globalSeo,
    pageSeo,
  });
}

export default async function HomePage() {
  const [homeData, pageSeo] = await Promise.all([
    fetchHomeData(),
    fetchPageSEO("home"),
  ]);

  if (!homeData) return <EmptyState title="Homepage content isn't published yet" />;

  const schemaData = pageSeo?.jsonLd || pageSeo?.json_ld || buildOrganizationSchema();

  return (
    <main className="section-clip-x" style={{ position: "relative", zIndex: 1, background: "transparent" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData)
        }}
      />
      <div style={{ position: "relative", zIndex: 1, isolation: "isolate" }}>
        <Hero
          data={homeData.hero ? {
            ...homeData.hero,
            logo: homeData.hero.logo ?? homeData.navbar?.settings?.logo ?? null,
          } : null}
        />
      </div>
      
      <div style={{ position: "relative", zIndex: 2, isolation: "isolate" }}>
        <ArchSection
          data={homeData?.services}
          sectionTitle={homeData?.services_section?.title}
        />
      </div>

      <HomeTechnologySection services={homeData?.services} technologySection={homeData?.technology_section} />

      <TestimonialsSection 
        data={homeData?.testimonials} 
        sectionTitle={homeData?.testimonials_section?.title}
        sectionSubtitle={homeData?.testimonials_section?.subtitle}
      />

      <ProcessSection
        data={homeData?.process}
        sectionTitle={homeData?.process_section?.title}
        sectionSubtitle={homeData?.process_section?.subtitle}
      />

      <FeaturedBlogs 
        posts={homeData?.featured_blogs} 
        sectionTitle={homeData?.featured_blogs_section?.title}
        sectionSubtitle={homeData?.featured_blogs_section?.subtitle}
      />

      <CTASectionComponent data={homeData?.cta} />
    </main>
  );
}

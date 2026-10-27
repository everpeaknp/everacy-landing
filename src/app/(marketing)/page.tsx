import type { Metadata } from "next";
import { generateMetadata as genMeta, buildOrganizationSchema } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { ArchSection } from "@/components/sections/ArchSection";
import { HomeTechnologySection } from "@/components/sections/HomeTechnologySection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { EngineeringMotionSection } from "@/components/sections/EngineeringMotionSection";
import { HomeProjectsSection } from "@/components/sections/HomeProjectsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FeaturedBlogs } from "@/components/sections/FeaturedBlogs";
import { CTASectionComponent } from "@/components/sections/CTASectionComponent";
import { fetchHomeData, fetchProjects, fetchGlobalSEO, fetchPageSEO } from "@/lib/api";
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
  const [homeData, projectsData, pageSeo] = await Promise.all([
    fetchHomeData(),
    fetchProjects(),
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
      
      {/* 1. Hero Section (Untouched) */}
      <div style={{ position: "relative", zIndex: 1, isolation: "isolate" }}>
        <Hero
          data={homeData.hero ? {
            ...homeData.hero,
            logo: homeData.hero.logo ?? homeData.navbar?.settings?.logo ?? null,
          } : null}
        />
      </div>

      {/* 2. Software Built For Real-World Action (Engineering in Motion Video Showcase) */}
      <EngineeringMotionSection data={homeData?.motion_section} />
      
      {/* 3. Capabilities & Engineering (Our Services + Continuous Scenario Palette) */}
      <div style={{ position: "relative", zIndex: 2, isolation: "isolate" }}>
        <ArchSection
          data={homeData?.services}
          sectionTitle={homeData?.services_section?.title}
          sectionDescription={homeData?.services_section?.description}
          presets={homeData?.solution_presets}
        />
      </div>

      {/* 4. The Technology Behind The Work */}
      <HomeTechnologySection
        services={homeData?.services}
        technologySection={homeData?.technology_section}
      />

      {/* 5. Our Delivery Process (Visual Engineering Pipeline) */}
      <ProcessSection
        data={homeData?.process}
        sectionTitle={homeData?.process_section?.title}
        sectionSubtitle={homeData?.process_section?.subtitle}
        sectionDescription={homeData?.process_section?.description}
      />

      {/* 6. Systems Built For Impact & Scale (Featured Case Studies: YummyEver & SajiloWork) */}
      <HomeProjectsSection
        projects={projectsData?.projects}
        eyebrow={homeData?.projects_section?.eyebrow}
        title={homeData?.projects_section?.title}
        description={homeData?.projects_section?.description}
      />

      {/* 6. Wall of Trust (Testimonials & Client Logos) */}
      <TestimonialsSection 
        data={homeData?.testimonials} 
        sectionTitle={homeData?.testimonials_section?.title}
        sectionSubtitle={homeData?.testimonials_section?.subtitle}
      />

      {/* 7. Latest From Our Journal */}
      <FeaturedBlogs 
        posts={homeData?.featured_blogs} 
        sectionTitle={homeData?.featured_blogs_section?.title}
        sectionSubtitle={homeData?.featured_blogs_section?.subtitle}
        sectionDescription={homeData?.featured_blogs_section?.description}
      />

      {/* 8. Call to Action Banner */}
      <CTASectionComponent data={homeData?.cta} />
    </main>
  );
}

import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { ArchSection } from "@/components/sections/ArchSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CTASectionComponent } from "@/components/sections/CTASectionComponent";
import { fetchHomeData } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = genMeta({
  title: "Home",
  description:
    "Everacy — an elite IT engineering firm delivering cloud, AI, and web solutions that scale beautifully and reliably.",
  canonicalPath: "/",
});

export default async function HomePage() {
  const homeData = await fetchHomeData();

  return (
    <main className="section-clip-x" style={{ position: "relative", zIndex: 1, background: "transparent" }}>
      <div style={{ position: "relative", zIndex: 1, isolation: "isolate" }}>
        <Hero data={homeData?.hero} />
      </div>
      <div style={{ position: "relative", zIndex: 2, isolation: "isolate" }}>
        <ArchSection data={homeData?.services} />
      </div>
      <TestimonialsSection data={homeData?.testimonials} />
      <ProcessSection
        data={homeData?.process}
        sectionTitle={homeData?.process_section?.title}
        sectionSubtitle={homeData?.process_section?.subtitle}
      />
      <CTASectionComponent data={homeData?.cta} />
    </main>
  );
}

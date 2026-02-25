import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { ArchSection } from "@/components/sections/ArchSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = genMeta({
  title: "Home",
  description:
    "Everacy — an elite IT engineering firm delivering cloud, AI, and web solutions that scale beautifully and reliably.",
  canonicalPath: "/",
});

export default function HomePage() {
  return (
    <main style={{ position: "relative", zIndex: 1, background: "transparent" }}>
      <Hero />
      <ArchSection />
      <TestimonialsSection />
      <ProcessSection />
      <ContactSection />
    </main>
  );
}

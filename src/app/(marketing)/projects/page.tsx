import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Projects",
  description: "A showcase of our work and case studies.",
  canonicalPath: "/projects",
});

export default function ProjectsPage() {
  return (
    <main>
      <section className="section-full flex items-center justify-center">
        <h1 className="text-4xl font-bold">Projects</h1>
      </section>
    </main>
  );
}

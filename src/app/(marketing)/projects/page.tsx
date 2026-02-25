import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { ProjectsContent } from "@/components/sections/ProjectsContent";

export const metadata: Metadata = genMeta({
  title: "Projects",
  description: "Explore our latest digital creations and engineering feats.",
  canonicalPath: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsContent />;
}

import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { fetchProjects } from "@/lib/api";
import { ProjectsClient } from "./ProjectsClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = genMeta({
  title: "Projects",
  description: "Discover the products powering the next generation of businesses. Built by Everacy.",
  canonicalPath: "/projects",
});

export default async function ProjectsPage() {
  const projectsData = await fetchProjects();

  return (
    <ProjectsClient
      pageHero={projectsData?.page_hero}
      projects={projectsData?.projects}
    />
  );
}

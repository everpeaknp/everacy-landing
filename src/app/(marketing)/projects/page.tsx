import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { fetchProjects, fetchGlobalSEO } from "@/lib/api";
import { ProjectsClient } from "./ProjectsClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [projectsData, globalSeo] = await Promise.all([
    fetchProjects(),
    fetchGlobalSEO(),
  ]);

  return genMeta({
    title: "Projects",
    description: "Discover the products powering the next generation of businesses. Built by Everacy.",
    canonicalPath: "/projects",
    seoData: projectsData?.page_hero?.seo,
    globalSeo,
  });
}

export default async function ProjectsPage() {
  const projectsData = await fetchProjects();

  return (
    <ProjectsClient
      pageHero={projectsData?.page_hero}
      projects={projectsData?.projects}
    />
  );
}

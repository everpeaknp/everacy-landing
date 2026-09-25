import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { fetchProjects, fetchGlobalSEO, fetchPageSEO } from "@/lib/api";
import { ProjectsClient } from "./ProjectsClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [projectsData, globalSeo, pageSeo] = await Promise.all([
    fetchProjects(),
    fetchGlobalSEO(),
    fetchPageSEO("projects"),
  ]);

  return genMeta({
    title: "Projects",
    description: "Discover the products powering the next generation of businesses. Built by Everacy.",
    canonicalPath: "/projects",
    seoData: projectsData?.page_hero?.seo,
    globalSeo,
    pageSeo,
  });
}

export default async function ProjectsPage() {
  const [projectsData, pageSeo] = await Promise.all([
    fetchProjects(),
    fetchPageSEO("projects"),
  ]);

  return (
    <>
      {(pageSeo?.jsonLd || pageSeo?.json_ld) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pageSeo.jsonLd || pageSeo.json_ld),
          }}
        />
      )}
      <ProjectsClient
        pageHero={projectsData?.page_hero}
        projects={projectsData?.projects}
      />
    </>
  );
}

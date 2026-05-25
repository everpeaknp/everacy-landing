import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import { fetchGlobalSEO, fetchSitemapData } from "@/lib/api";

/**
 * Next.js App Router sitemap.
 * Automatically available at /sitemap.xml
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seo = await fetchGlobalSEO();
  const baseUrl = seo?.site_url || siteConfig.url;

  const sitemapData = await fetchSitemapData();

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/careers",
    "/contact",
    "/blogs",
  ] as const;

  const routes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: (route === "" ? "weekly" : "monthly") as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projectRoutes = (sitemapData?.projects || []).map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blogRoutes = (sitemapData?.blogs || []).map((slug) => ({
    url: `${baseUrl}/blogs/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes, ...blogRoutes];
}

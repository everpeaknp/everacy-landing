import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

/**
 * Next.js App Router sitemap.
 * Automatically available at /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/contact",
  ] as const;

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}

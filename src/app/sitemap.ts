import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";
import {
  fetchCareers,
  fetchGlobalSEO,
  fetchServiceCategories,
  fetchServices,
  fetchSitemapData,
} from "@/lib/api";

export const dynamic = "force-dynamic";

/**
 * Next.js App Router sitemap.
 * Automatically available at /sitemap.xml
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [seo, sitemapData, serviceCategories, services, careers] = await Promise.all([
    fetchGlobalSEO(),
    fetchSitemapData(),
    fetchServiceCategories(),
    fetchServices(),
    fetchCareers(),
  ]);
  const baseUrl = seo?.site_url || siteConfig.url;

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/careers",
    "/contact",
    "/blogs",
    "/privacy",
    "/terms",
    "/cookies",
  ] as const;

  const routes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
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

  const serviceCategoryRoutes = serviceCategories.filter((category) => category.slug).map((category) => ({
    url: `${baseUrl}/services/${category.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const serviceRoutes = services.flatMap((service) => {
    if (!service.slug || !service.category?.slug) return [];

    return [{
      url: `${baseUrl}/services/${service.category.slug}/${service.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }];
  });

  const careerRoutes = (careers?.jobs || []).filter((job) => job.slug).map((job) => ({
    url: `${baseUrl}/careers/${job.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...routes, ...serviceCategoryRoutes, ...serviceRoutes, ...projectRoutes, ...blogRoutes, ...careerRoutes];
}

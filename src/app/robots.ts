import type { MetadataRoute } from "next";
import { fetchGlobalSEO } from "@/lib/api";
import { siteConfig } from "@/lib/seo";

/**
 * Next.js App Router robots.txt.
 * Automatically available at /robots.txt
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = await fetchGlobalSEO();
  const baseUrl = seo?.site_url || siteConfig.url;

  let allowRule = "/";
  let userAgentRule = "*";

  if (seo?.robots_txt_content) {
    // Parse the basic format for Next.js rules
    const rules = seo.robots_txt_content.split('\n');
    rules.forEach(rule => {
      if (rule.toLowerCase().startsWith('user-agent:')) {
        userAgentRule = rule.split(':')[1].trim();
      }
      if (rule.toLowerCase().startsWith('allow:')) {
        allowRule = rule.split(':')[1].trim();
      }
    });
  }

  return {
    rules: [
      {
        userAgent: userAgentRule,
        allow: allowRule,
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

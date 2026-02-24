import type { MetadataRoute } from "next";

/**
 * Next.js App Router robots.txt.
 * Automatically available at /robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"}/sitemap.xml`,
  };
}

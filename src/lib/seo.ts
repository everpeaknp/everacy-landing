import type { Metadata } from "next";

/** ── Site-wide configuration ── */
export const siteConfig = {
  name: "Everacy",
  description: "High-performance IT solutions — engineered for the future.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://everacy.com",
  ogImage: "/og-image.png",
  author: "Everacy Team",
  twitterHandle: "@everacy",
  keywords: [
    "IT portfolio",
    "software engineering",
    "web development",
    "cloud solutions",
    "Next.js",
    "TypeScript",
  ],
} as const;

/** ── Metadata helper ── */
import { SEOFieldData, GlobalSEOData } from "@/lib/api";

interface MetaOptions {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  noIndex?: boolean;
  seoData?: SEOFieldData | null;
  globalSeo?: GlobalSEOData | null;
}

export function generateMetadata({
  title,
  description = siteConfig.description,
  canonicalPath = "/",
  image = siteConfig.ogImage,
  noIndex = false,
  seoData = null,
  globalSeo = null,
}: MetaOptions = {}): Metadata {
  const finalTitle = seoData?.meta_title || title;
  const finalDescription = seoData?.meta_description || description;
  const finalImage = seoData?.og_image || image;
  const isIndexed = seoData ? seoData.is_indexed : !noIndex;
  
  const siteName = globalSeo?.site_name || siteConfig.name;
  const baseUrl = globalSeo?.site_url || siteConfig.url;

  // Let Next.js handle the template string `%s | SiteName` via layout.tsx.
  // We just return the exact page title, or fallback to siteName.
  const resolvedTitle = finalTitle || siteName;
    
  const canonical = seoData?.canonical_url || `${baseUrl}${canonicalPath}`;
  const keywords = seoData?.meta_keywords 
    ? seoData.meta_keywords.split(',').map(k => k.trim()) 
    : siteConfig.keywords;

  return {
    title: resolvedTitle,
    description: finalDescription,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: resolvedTitle,
      description: finalDescription,
      url: canonical,
      siteName,
      images: finalImage ? [{ url: finalImage.startsWith('http') ? finalImage : `${baseUrl}${finalImage}`, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: finalDescription,
      images: finalImage ? [finalImage.startsWith('http') ? finalImage : `${baseUrl}${finalImage}`] : [],
      creator: globalSeo?.twitter_handle || siteConfig.twitterHandle,
    },
    robots: isIndexed
      ? { index: true, follow: true }
      : { index: false, follow: false },
  };
}

/** ── JSON-LD structured data helpers ── */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo/everacy_wo_bg.png`,
    sameAs: [],
  };
}

export function buildPersonSchema({
  name,
  jobTitle,
  url,
}: {
  name: string;
  jobTitle: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    url: url ?? siteConfig.url,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

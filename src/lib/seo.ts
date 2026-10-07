import type { Metadata } from "next";
import { resolveImageAlt } from "@/lib/image-seo";

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
import { SEOFieldData, GlobalSEOData, PageSEOData } from "@/lib/api";

interface MetaOptions {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  imageAlt?: string;
  imageDecorative?: boolean;
  noIndex?: boolean;
  seoData?: SEOFieldData | null;
  globalSeo?: GlobalSEOData | null;
  pageSeo?: PageSEOData | null;
}

export function generateMetadata({
  title,
  description = siteConfig.description,
  canonicalPath = "/",
  image = siteConfig.ogImage,
  imageAlt,
  imageDecorative,
  noIndex = false,
  seoData = null,
  globalSeo = null,
  pageSeo = null,
}: MetaOptions = {}): Metadata {
  const finalTitle = pageSeo?.meta_title || pageSeo?.metaTitle || seoData?.meta_title || title;
  const finalDescription = pageSeo?.meta_description || pageSeo?.metaDescription || seoData?.meta_description || description;
  const finalOgTitle = pageSeo?.og_title || pageSeo?.ogTitle || finalTitle;
  const finalOgDescription = pageSeo?.og_description || pageSeo?.ogDescription || finalDescription;
  const finalImage = pageSeo?.og_image || pageSeo?.ogImage || seoData?.og_image || image;
  const ogType = (pageSeo?.og_type || pageSeo?.ogType || 'website') as any;
  const twitterCard = (pageSeo?.twitter_card_type || pageSeo?.twitterCardType || 'summary_large_image') as any;

  // Robots meta evaluation
  let isIndexed = seoData ? seoData.is_indexed : !noIndex;
  const robotsMeta = pageSeo?.robots_meta || pageSeo?.robotsMeta;
  if (robotsMeta) {
    if (robotsMeta.includes('noindex')) {
      isIndexed = false;
    } else if (robotsMeta.includes('index')) {
      isIndexed = true;
    }
  }
  
  const siteName = globalSeo?.organization_name || globalSeo?.organizationName || globalSeo?.site_name || siteConfig.name;
  const baseUrl = globalSeo?.canonical_domain || globalSeo?.canonicalDomain || globalSeo?.site_url || siteConfig.url;

  const resolvedTitle = finalTitle || siteName;
  const canonical = pageSeo?.canonical_url || pageSeo?.canonicalUrl || seoData?.canonical_url || `${baseUrl}${canonicalPath}`;
  
  const rawKeywords = pageSeo?.meta_keywords || pageSeo?.metaKeywords || seoData?.meta_keywords || globalSeo?.default_keywords || globalSeo?.defaultKeywords;
  const keywords = rawKeywords 
    ? rawKeywords.split(',').map((k: string) => k.trim()).filter(Boolean)
    : [...siteConfig.keywords];

  const fallbackDefaultOg = globalSeo?.default_og_image || globalSeo?.defaultOgImage;
  const resolvedImageUrl = finalImage 
    ? (finalImage.startsWith('http') ? finalImage : `${baseUrl}${finalImage}`)
    : (fallbackDefaultOg 
        ? (fallbackDefaultOg.startsWith('http') ? fallbackDefaultOg : `${baseUrl}${fallbackDefaultOg}`) 
        : undefined);
  const selectedImageIsDecorative = pageSeo?.og_image
    ? pageSeo.og_image_is_decorative
    : seoData?.og_image
      ? seoData.og_image_is_decorative
      : imageDecorative ?? globalSeo?.default_og_image_is_decorative;
  const resolvedImageAlt = resolveImageAlt({
    alt: imageAlt ?? pageSeo?.og_image_alt ?? pageSeo?.ogImageAlt ?? seoData?.og_image_alt ?? globalSeo?.default_og_image_alt,
    imageTitle: pageSeo?.og_image_title || pageSeo?.ogImageTitle || seoData?.og_image_title || globalSeo?.default_og_image_title,
    recordTitle: resolvedTitle,
    keywords: rawKeywords,
    decorative: selectedImageIsDecorative,
  });

  return {
    title: resolvedTitle,
    description: finalDescription,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: finalOgTitle || resolvedTitle,
      description: finalOgDescription || finalDescription,
      url: canonical,
      siteName,
      type: ogType,
      images: resolvedImageUrl ? [{ url: resolvedImageUrl, width: 1200, height: 630, alt: resolvedImageAlt }] : [],
    },
    twitter: {
      card: twitterCard,
      title: finalOgTitle || resolvedTitle,
      description: finalOgDescription || finalDescription,
      images: resolvedImageUrl ? [{ url: resolvedImageUrl, alt: resolvedImageAlt }] : [],
      creator: globalSeo?.twitter_handle || globalSeo?.twitterHandle || siteConfig.twitterHandle,
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

export function buildArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  url,
}: {
  title: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    image: image ? [image] : [],
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: authorName ? {
      "@type": "Person",
      name: authorName,
    } : {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo/everacy_wo_bg.png`,
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    }
  };
}

export function buildJobPostingSchema({
  title,
  description,
  datePosted,
  employmentType,
  jobLocationType,
  location,
  url,
}: {
  title: string;
  description: string;
  datePosted?: string;
  employmentType?: string; // e.g. FULL_TIME, PART_TIME, CONTRACTOR, INTERN
  jobLocationType?: string; // e.g. TELECOMMUTE
  location?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: title,
    description: description,
    datePosted: datePosted,
    employmentType: employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: siteConfig.url,
      logo: `${siteConfig.url}/logo/everacy_wo_bg.png`
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: location || "Remote",
        addressCountry: "NP"
      }
    },
    ...(jobLocationType === "Remote" ? { applicantLocationRequirements: { "@type": "Country", name: "NP" }, jobLocationType: "TELECOMMUTE" } : {})
  };
}

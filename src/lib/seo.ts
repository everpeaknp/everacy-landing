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
interface MetaOptions {
  title?: string;
  description?: string;
  canonicalPath?: string;
  image?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description = siteConfig.description,
  canonicalPath = "/",
  image = siteConfig.ogImage,
  noIndex = false,
}: MetaOptions = {}): Metadata {
  const resolvedTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name;
  const canonical = `${siteConfig.url}${canonicalPath}`;

  return {
    title: resolvedTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url: canonical,
      images: [{ url: `${siteConfig.url}${image}`, width: 1200, height: 630 }],
    },
    twitter: {
      title: resolvedTitle,
      description,
      images: [`${siteConfig.url}${image}`],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
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

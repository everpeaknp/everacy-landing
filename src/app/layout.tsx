import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/common/Providers";
import { siteConfig } from "@/lib/seo";

export const dynamic = "force-dynamic";

/* ── Font optimization ── */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const montserrat = Montserrat({
  variable: "--font-mont",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

/* ── Viewport configuration ── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1428" },
  ],
};

import { fetchGlobalSEO } from "@/lib/api";
import { resolveImageAlt } from "@/lib/image-seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchGlobalSEO();

  const siteUrl = seo?.canonical_domain || seo?.canonicalDomain || seo?.site_url || siteConfig.url;
  const siteName = seo?.organization_name || seo?.organizationName || seo?.site_name || siteConfig.name;
  const metaTitle = seo?.default_meta_title || siteName;
  const metaDesc = seo?.default_description || seo?.default_meta_description || siteConfig.description;
  const ogImage = seo?.default_og_image || seo?.defaultOgImage || siteConfig.ogImage;
  const ogImageAlt = resolveImageAlt({
    alt: seo?.default_og_image_alt,
    imageTitle: seo?.default_og_image_title,
    recordTitle: siteName,
    keywords: seo?.default_keywords || seo?.defaultKeywords,
    decorative: seo?.default_og_image_is_decorative,
  });
  const twitterHandle = seo?.twitter_handle || seo?.twitterHandle || siteConfig.twitterHandle;
  const favicon = seo?.favicon || "/logo/everacy_wo_bg.png";
  const titleTemplate = seo?.default_title_template || seo?.titleTemplate || `%s | ${siteName}`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: metaTitle,
      template: titleTemplate,
    },
    description: metaDesc,
    keywords: seo?.default_keywords 
      ? seo.default_keywords.split(',').map((k: string) => k.trim()).filter(Boolean)
      : [...siteConfig.keywords],
    authors: [{ name: seo?.organization_name || siteConfig.author, url: siteUrl }],
    creator: seo?.organization_name || siteConfig.author,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      title: metaTitle,
      description: metaDesc,
      siteName: siteName,
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDesc,
      images: [ogImage],
      creator: twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    },
    manifest: "/site.webmanifest",
  };
}

/* ── Root layout ── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

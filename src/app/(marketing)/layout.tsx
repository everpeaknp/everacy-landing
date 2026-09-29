import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { CookieConsent } from "@/components/common/CookieConsent";
import type { PropsWithChildren } from "@/types";
import { fetchFooter, fetchNavbar, fetchServiceCategories, fetchGlobalSEO } from "@/lib/api";

/**
 * Shared layout for all marketing pages (/, /about, /services, /projects, /contact).
 * Server component — fetches navbar + footer data once per request and passes it down.
 */
export default async function MarketingLayout({ children }: PropsWithChildren) {
  const [footerData, navbarData, categories, globalSeo] = await Promise.all([
    fetchFooter(),
    fetchNavbar(),
    fetchServiceCategories(),
    fetchGlobalSEO(),
  ]);

  return (
    <>
      <Navbar data={navbarData} categories={categories} />
      {children}
      <Footer data={footerData} />
      <CookieConsent analyticsId={globalSeo?.google_analytics_id || globalSeo?.googleAnalyticsId} />
    </>
  );
}

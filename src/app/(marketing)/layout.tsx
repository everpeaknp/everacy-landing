import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import type { PropsWithChildren } from "@/types";
import { fetchFooter, fetchNavbar, fetchServices } from "@/lib/api";

/**
 * Shared layout for all marketing pages (/, /about, /services, /projects, /contact).
 * Server component — fetches navbar + footer data once per request and passes it down.
 */
export default async function MarketingLayout({ children }: PropsWithChildren) {
  const [footerData, navbarData, servicesData] = await Promise.all([
    fetchFooter(),
    fetchNavbar(),
    fetchServices(),
  ]);

  return (
    <>
      <Navbar data={navbarData} services={servicesData} />
      {children}
      <Footer data={footerData} />
    </>
  );
}

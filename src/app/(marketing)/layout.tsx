import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import type { PropsWithChildren } from "@/types";
import { fetchFooter, fetchNavbar } from "@/lib/api";

/**
 * Shared layout for all marketing pages (/, /about, /services, /projects, /contact).
 * Server component — fetches navbar + footer data once per request and passes it down.
 */
export default async function MarketingLayout({ children }: PropsWithChildren) {
  const [footerData, navbarData] = await Promise.all([
    fetchFooter(),
    fetchNavbar(),
  ]);

  return (
    <>
      <Navbar data={navbarData} />
      {children}
      <Footer data={footerData} />
    </>
  );
}

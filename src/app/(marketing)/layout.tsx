import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import type { PropsWithChildren } from "@/types";

/**
 * Shared layout for all marketing pages (/, /about, /services, /projects, /contact).
 * Wraps every page in the (marketing) route group with Navbar + Footer.
 * The root app/layout.tsx handles fonts, metadata, and Providers.
 */
export default function MarketingLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

"use client";

import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";
import type { PropsWithChildren } from "@/types";
import { usePathname } from "next/navigation";

/**
 * Shared layout for all marketing pages (/, /about, /services, /projects, /contact).
 * Wraps every page in the (marketing) route group with Navbar + Footer.
 * The root app/layout.tsx handles fonts, metadata, and Providers.
 */
export default function MarketingLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isProjects = pathname === "/projects";

  return (
    <>
      <Navbar />
      {!isProjects && <LiquidEffectAnimation />}
      {children}
      <Footer />
    </>
  );
}

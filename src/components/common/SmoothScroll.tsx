/* ─────────────────────────────────────────────────────────
   SmoothScroll — Global Lenis Implementation
   Ensures smooth scrolling across the entire site and
   guarantees that new page navigations always start at the top.
   ───────────────────────────────────────────────────────── */
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 0.75,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Sync ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    lenisRef.current = lenis;
    (window as any).lenis = lenis;

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      if ((window as any).lenis === lenis) {
        delete (window as any).lenis;
      }
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  // When navigating to a new page route, scroll cleanly to top (0, 0)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // If an in-page anchor hash exists, let the browser or anchor handle it
    if (window.location.hash) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}

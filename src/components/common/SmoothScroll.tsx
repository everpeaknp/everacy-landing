/* ─────────────────────────────────────────────────────────
   SmoothScroll — Global Lenis Implementation
   Ensures smooth scrolling across the entire site.
   ───────────────────────────────────────────────────────── */
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      // Keep the wheel glide responsive; a long duration makes page movement
      // feel delayed, especially on content-heavy service pages.
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

    (window as any).lenis = lenis;

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      if ((window as any).lenis === lenis) {
        delete (window as any).lenis;
      }
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return <>{children}</>;
}

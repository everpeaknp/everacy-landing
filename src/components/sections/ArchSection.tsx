/* ─────────────────────────────────────────────────────
   ArchSection — exact port of the original GSAP scroll reveal
   Desktop: pinned right panel, clip-path image stack reveal
   Mobile:  display:contents + CSS order interleave (text → img)
   ───────────────────────────────────────────────────── */
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { archSectionCards, brandColors } from "@/lib/site-theme";

export function ArchSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let gsapCtx: { revert: () => void } | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lenisInstance: any;

    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const { default: Lenis } = await import("lenis");

      gsap.registerPlugin(ScrollTrigger);

      // ── Lenis smooth scroll ──────────────────────────
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenisInstance.raf(time);
        ScrollTrigger.update();
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // ── Set z-index from data-index ──────────────────
      document.querySelectorAll<HTMLElement>(".arch__right .img-wrapper").forEach((el) => {
        const order = el.getAttribute("data-index");
        if (order !== null) el.style.zIndex = order;
      });

      // ── Mobile layout: set CSS order to interleave ───
      function handleMobileLayout() {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const leftItems = document.querySelectorAll<HTMLElement>(".arch__left .arch__info");
        const rightItems = document.querySelectorAll<HTMLElement>(".arch__right .img-wrapper");

        if (isMobile) {
          leftItems.forEach((item, i) => { item.style.order = String(i * 2); });
          rightItems.forEach((item, i) => { item.style.order = String(i * 2 + 1); });
        } else {
          leftItems.forEach((item) => { item.style.order = ""; });
          rightItems.forEach((item) => { item.style.order = ""; });
        }
      }

      let resizeTimeout: ReturnType<typeof setTimeout>;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleMobileLayout, 100);
      });
      handleMobileLayout();

      // ── GSAP animations ──────────────────────────────
      const imgs = Array.from(document.querySelectorAll<HTMLImageElement>(".img-wrapper img"));
      const bgColors = brandColors.archBgColors as readonly string[];

      const mm = gsap.matchMedia();

      gsapCtx = gsap.context(() => {
        mm.add("(min-width: 769px)", () => {
          const mainTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: ".arch",
              start: "top top",
              end: "bottom bottom",
              pin: ".arch__right",
              scrub: true,
            },
          });

          gsap.set(imgs, { clipPath: "inset(0)", objectPosition: "0px 0%" });

          imgs.forEach((_, index) => {
            const currentImage = imgs[index];
            const nextImage = imgs[index + 1] ?? null;
            const sectionTimeline = gsap.timeline();

            if (nextImage) {
              sectionTimeline
                .to(sectionRef.current, { backgroundColor: bgColors[index], duration: 1.5, ease: "power2.inOut" }, 0)
                .to(currentImage, { clipPath: "inset(0px 0px 100%)", objectPosition: "0px 60%", duration: 1.5, ease: "none" }, 0)
                .to(nextImage, { objectPosition: "0px 40%", duration: 1.5, ease: "none" }, 0);
            }

            mainTimeline.add(sectionTimeline);
          });

          return () => {
            gsap.set(imgs, { clearProps: "clipPath,objectPosition" });
          };
        });

        mm.add("(max-width: 768px)", () => {
          gsap.set(imgs, { objectPosition: "0px 60%" });

          imgs.forEach((image, index) => {
            const innerTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: image,
                start: "top-=70% top+=50%",
                end: "bottom+=200% bottom",
                scrub: true,
              },
            });

            innerTimeline
              .to(image, { objectPosition: "0px 30%", duration: 5, ease: "none" })
              .to(sectionRef.current, { backgroundColor: bgColors[index], duration: 1.5, ease: "power2.inOut" });
          });

          return () => {
            gsap.set(imgs, { clearProps: "objectPosition" });
          };
        });
      });
    })();

    return () => {
      gsapCtx?.revert();
      lenisInstance?.destroy?.();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-white transition-colors duration-700"
      style={{ fontFamily: "'Montserrat', sans-serif", position: "relative", zIndex: 2 }}
    >
      {/* Container */}
      <div style={{ maxWidth: 1440, padding: "2rem" }} className="mx-auto">
        {/* Top spacer */}
        <div style={{ width: "100%", height: "30vh" }} />

        {/*
          .arch: flex row on desktop, flex col on mobile.
          On mobile, .arch__left and .arch__right use display:contents
          so their children become direct flex children of .arch,
          allowing CSS order to interleave text + image.
        */}
        <div
          className="arch"
          style={{
            display: "flex",
            gap: 60,
            justifyContent: "space-between",
            maxWidth: 1100,
            marginInline: "auto",
          }}
        >
          {/* Left: scrolling text cards */}
          <div
            className="arch__left"
            style={{ display: "flex", flexDirection: "column", minWidth: 300 }}
          >
            {archSectionCards.map((card) => (
              <div
                key={card.id}
                className="arch__info"
                style={{ maxWidth: 356, height: "100vh", display: "grid", placeItems: "center" }}
              >
                <div>
                  <h2 style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-0.84px", color: "#0d1a26" }}>
                    {card.title}
                  </h2>
                  <p style={{ color: "rgba(13,26,38,0.75)", fontSize: 18, letterSpacing: "-0.54px", marginBlock: "6px 28px", lineHeight: "normal" }}>
                    {card.description}
                  </p>
                  <Link
                    href={card.linkHref}
                    style={{
                      textDecoration: "none",
                      padding: "16px 18px",
                      color: "#0d1a26",
                      borderRadius: 40,
                      display: "flex",
                      gap: 4,
                      width: "fit-content",
                      alignItems: "center",
                      backgroundColor: card.accentColor,
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
                      <path fill="#0d1a26" d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z" />
                    </svg>
                    <span>{card.linkLabel}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Right: stacked images (absolute positioned, z-indexed) */}
          <div
            className="arch__right"
            style={{
              flexShrink: 1,
              height: "100vh",
              width: "100%",
              maxWidth: 540,
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {archSectionCards.map((card, i) => {
              const dataIndex = archSectionCards.length - i;
              return (
                <div
                  key={card.id}
                  className="img-wrapper"
                  data-index={dataIndex}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    transform: "translateY(-50%)",
                    height: 400,
                    width: "100%",
                    borderRadius: 16,
                    overflow: "hidden",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.imageUrl}
                    alt={card.imageAlt}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom spacer */}
        <div style={{ width: "100%", height: "30vh" }} />
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .arch { gap: 30px !important; }
        }
        @media (max-width: 768px) {
          .arch { flex-direction: column !important; gap: 20px !important; }
          .arch__left, .arch__right { display: contents !important; }
          .arch__right .img-wrapper {
            position: static !important;
            transform: none !important;
            height: 360px !important;
            width: 100% !important;
            margin-bottom: 20px !important;
          }
          .arch__left .arch__info {
            height: auto !important;
            padding: 20px 0 !important;
          }
        }
        @media (max-width: 560px) {
          .arch { gap: 12px !important; }
          .arch__right .img-wrapper {
            border-radius: 10px !important;
            height: 280px !important;
          }
        }
      `}</style>
    </section>
  );
}

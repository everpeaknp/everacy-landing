/* ─────────────────────────────────────────────────────
   ArchSection — exact port of the original GSAP scroll reveal
   Desktop: pinned right panel, clip-path image stack reveal
   Mobile:  display:contents + CSS order interleave (text → img)
   ───────────────────────────────────────────────────── */
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { archSectionCards, brandColors } from "@/lib/site-theme";
import type { ServiceCardData } from "@/lib/api";

interface ArchSectionProps {
  data?: ServiceCardData[];
}

export function ArchSection({ data }: ArchSectionProps) {
  // Normalise API data to the shape the component needs
  const cards = data && data.length > 0
    ? data.map(s => ({
        id: String(s.id),
        title: s.title,
        description: s.description,
        linkLabel: s.link_label,
        linkHref: s.link_href,
        accentColor: s.accent_color,
        imageUrl: s.image ?? "",
        imageAlt: s.image_alt,
      }))
    : archSectionCards.map(c => ({
        id: c.id,
        title: c.title,
        description: c.description,
        linkLabel: c.linkLabel,
        linkHref: c.linkHref,
        accentColor: c.accentColor,
        imageUrl: c.imageUrl,
        imageAlt: c.imageAlt,
      }));

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleMobileLayout, 100);
    };
    window.addEventListener("resize", onResize);
    handleMobileLayout();

    // ── GSAP animations ──────────────────────────────
    const bgColors = brandColors.archBgColors as readonly string[];
    const mm = gsap.matchMedia();

    const gsapCtx = gsap.context(() => {
      // Query elements inside context for maximum reliability
      const imgs = gsap.utils.toArray(".img-wrapper img") as HTMLImageElement[];

      mm.add("(min-width: 769px)", () => {
        const mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".arch",
            start: "top top",
            end: "bottom bottom",
            pin: ".arch__right",
            scrub: true,
            onLeave: () => {
              if (sectionRef.current) {
                sectionRef.current.style.transition = "none";
                sectionRef.current.style.backgroundColor = "#f0f9ff";
              }
            },
            onLeaveBack: () => {
              if (sectionRef.current) {
                sectionRef.current.style.transition = "none";
                sectionRef.current.style.backgroundColor = "#ffffff";
              }
            },
          },
        });

        // Set initial state
        gsap.set(imgs, {
          clipPath: "inset(0% 0% 0% 0%)",
          objectPosition: "0px 0%",
          willChange: "clip-path, object-position"
        });

        imgs.forEach((_, index) => {
          const currentImage = imgs[index];
          const nextImage = imgs[index + 1] ?? null;
          const sectionTimeline = gsap.timeline();

          if (nextImage) {
            sectionTimeline
              .to(sectionRef.current, { backgroundColor: bgColors[index], duration: 1.5, ease: "power2.inOut" }, 0)
              .to(currentImage, { clipPath: "inset(0% 0% 100% 0%)", objectPosition: "0px 60%", duration: 1.5, ease: "none" }, 0)
              .to(nextImage, { objectPosition: "0px 40%", duration: 1.5, ease: "none" }, 0);
          }

          mainTimeline.add(sectionTimeline);
        });

        return () => {
          gsap.set(imgs, { clearProps: "all" });
        };
      });

      // Mobile animations: disable scrubbing over clip paths, use simple scale/fade or leave static
      // since they interleave as static vertical elements now in CSS flex layout.
      mm.add("(max-width: 768px)", () => {
        // Reset clipping/positioning for simple vertical flow
        gsap.set(imgs, {
          clipPath: "inset(0% 0% 0% 0%)",
          objectPosition: "50% 50%"
        });

        // Just animate the background color as we scroll past each text block
        const leftItems = gsap.utils.toArray(".arch__left .arch__info") as HTMLElement[];
        leftItems.forEach((item, index) => {
          gsap.to(sectionRef.current, {
            backgroundColor: bgColors[index],
            duration: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top center",
              end: "bottom center",
              scrub: true,
            }
          });
        });

        return () => {
          gsap.set(imgs, { clearProps: "all" });
          gsap.set(sectionRef.current, { clearProps: "backgroundColor" });
        };
      });
    }, sectionRef);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimeout);
      gsapCtx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="arch-section section-clip-x"
      style={{ fontFamily: "'Montserrat', sans-serif", position: "relative", zIndex: 2, backgroundColor: "#ffffff" }}
    >
      {/* Container */}
      <div style={{ maxWidth: 1440, padding: "clamp(1rem, 4vw, 2rem)", boxSizing: "border-box" }} className="mx-auto safe-mobile-block">
        {/* Top spacer */}
        <div style={{ width: "100%", height: "8vh" }} />

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
            gap: "clamp(20px, 6vw, 60px)",
            justifyContent: "space-between",
            maxWidth: 1100,
            marginInline: "auto",
            width: "100%",
          }}
        >
          {/* Left: scrolling text cards */}
          <div
            className="arch__left"
            style={{ display: "flex", flexDirection: "column", minWidth: "min(300px, 100%)" }}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className="arch__info"
                style={{ maxWidth: 356, width: "100%", height: "100vh", display: "grid", placeItems: "center" }}
              >
                <div className="safe-mobile-block">
                  <h2 style={{ fontSize: "clamp(2rem, 3.6vw, 42px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#0d1a26", lineHeight: 1.08 }}>
                    {card.title}
                  </h2>
                  <p style={{ color: "rgba(13,26,38,0.75)", fontSize: "clamp(1rem, 1.55vw, 18px)", letterSpacing: "-0.01em", marginBlock: "6px 28px", lineHeight: 1.6 }}>
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
            {cards.map((card, i) => {
              // The top image should have the highest z-index.
              // Since the GSAP animation reveals images from top to bottom (index 0, 1, 2),
              // image 0 MUST be on top initially, image 1 below it, etc.
              const zIndexValue = cards.length - i;

              return (
                <div
                  key={card.id}
                    className="img-wrapper"
                    data-index={zIndexValue}
                    style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    transform: "translateY(-50%)",
                    height: 400,
                    width: "100%",
                      borderRadius: 16,
                      overflow: "hidden",
                      zIndex: zIndexValue, // Explicitly set zIndex inline for reliability
                      boxSizing: "border-box",
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

        {/* No bottom spacer — testimonials follows immediately */}
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .arch { gap: 30px !important; }
        }
        @media (max-width: 768px) {
          .arch {
            flex-direction: column !important;
            gap: 18px !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .arch__left, .arch__right { display: contents !important; }
          .arch__right .img-wrapper {
            position: static !important;
            transform: none !important;
            height: clamp(220px, 58vw, 340px) !important;
            width: 100% !important;
            margin: 0 0 18px 0 !important;
            border-radius: 12px !important;
          }
          .arch__left .arch__info,
          .arch__left .arch__info > div {
            width: 100% !important;
            max-width: 100% !important;
          }
          .arch__left .arch__info {
            height: auto !important;
            min-height: auto !important;
            padding: 20px 0 !important;
          }
          .arch__left .arch__info h2 {
            font-size: clamp(2rem, 10vw, 2.5rem) !important;
            line-height: 1.08 !important;
          }
          .arch__left .arch__info p {
            font-size: clamp(1rem, 4.3vw, 1.12rem) !important;
            line-height: 1.55 !important;
            margin-block: 10px 22px !important;
          }
        }
        @media (max-width: 560px) {
          .arch { gap: 12px !important; }
          .arch__right .img-wrapper {
            height: clamp(210px, 64vw, 280px) !important;
          }
        }
      `}</style>
    </section>
  );
}

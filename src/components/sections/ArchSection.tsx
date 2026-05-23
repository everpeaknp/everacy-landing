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
  sectionTitle?: string;
}

export function ArchSection({ data, sectionTitle }: ArchSectionProps) {
  // Normalise API data to the shape the component needs
  const cards = data && data.length > 0
    ? data.map(s => ({
        id: String(s.id),
        title: s.title,
        description: s.description,
        linkLabel: s.link_label,
        linkHref: s.link_href,
        accentColor: s.accent_color,
        backgroundColor: s.background_color || "#f0f9ff",
        imageUrl: s.image ?? archSectionCards[s.order]?.imageUrl ?? null,
        imageAlt: s.image_alt || archSectionCards[s.order]?.imageAlt || s.title,
      }))
    : archSectionCards.map(c => ({
        id: c.id,
        title: c.title,
        description: c.description,
        linkLabel: c.linkLabel,
        linkHref: c.linkHref,
        accentColor: c.accentColor,
        backgroundColor: "#f0f9ff",
        imageUrl: c.imageUrl,
        imageAlt: c.imageAlt,
      }));

  const sectionRef = useRef<HTMLElement>(null);
  const initialBgColor = cards[0]?.backgroundColor || "#f0f9ff";
  const finalBgColor = cards[cards.length - 1]?.backgroundColor || initialBgColor;

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
    const bgColors = cards.map((card, index) => card.backgroundColor || brandColors.archBgColors[index] || "#f0f9ff");
    const mm = gsap.matchMedia();

    const gsapCtx = gsap.context(() => {
      // Query elements inside context for maximum reliability
      const imgWrappers = gsap.utils.toArray(".img-wrapper") as HTMLElement[];

      mm.add("(min-width: 769px)", () => {
        const leftItems = gsap.utils.toArray(".arch__left .arch__info") as HTMLElement[];
        const lastItem = leftItems[leftItems.length - 1] ?? null;
        const fallbackScrollLength = Math.max(window.innerHeight * cards.length * 0.95, window.innerHeight * 3.5);

        // 1. Pinned ScrollTrigger for the right panel & timeline height
        ScrollTrigger.create({
          trigger: ".arch",
          start: "top top",
          endTrigger: lastItem ?? ".arch",
          end: lastItem ? "center 50%" : `+=${Math.round(fallbackScrollLength)}`, // Unpin exactly when the last card's center hits the screen center!
          pin: ".arch__right",
          onUpdate: (self) => {
            // Smoothly animate vertical line progress height matching overall scroll
            gsap.to(".services-timeline-progress", {
              height: `${self.progress * 100}%`,
              duration: 0.1,
              ease: "none"
            });
          },
          onLeave: () => {
            if (sectionRef.current) {
              sectionRef.current.style.transition = "none";
              sectionRef.current.style.backgroundColor = finalBgColor;
            }
          },
          onLeaveBack: () => {
            if (sectionRef.current) {
              sectionRef.current.style.transition = "none";
              sectionRef.current.style.backgroundColor = initialBgColor;
            }
          },
        });

        // Set initial state
        if (sectionRef.current) {
          sectionRef.current.style.backgroundColor = initialBgColor;
        }

        // Image stack zoom/fade reveals initial state
        gsap.set(imgWrappers, {
          scale: 0.92,
          opacity: 0,
          y: 40,
          willChange: "transform, scale, opacity"
        });

        if (imgWrappers[0]) {
          gsap.set(imgWrappers[0], { scale: 1, opacity: 1, y: 0 });
        }

        // Text cards focal highlight initial state
        gsap.set(".arch__info", { opacity: 0.35, scale: 0.98 });
        if (leftItems[0]) {
          gsap.set(leftItems[0], { opacity: 1, scale: 1.02 });
        }

        leftItems.forEach((item, index) => {
          const currentWrapper = imgWrappers[index];
          if (!currentWrapper) return;
          const nextWrapper = imgWrappers[index + 1] ?? null;

          // 2. Active Text Card & Progress Dot Highlights (Fires when in viewport focal center)
          ScrollTrigger.create({
            trigger: item,
            start: "top 55%",
            end: "bottom 45%",
            onToggle: (self) => {
              if (self.isActive) {
                gsap.to(item, { opacity: 1, scale: 1.02, duration: 0.4 });
                gsap.to(`.progress-dot-${index}`, {
                  backgroundColor: cards[index].accentColor,
                  borderColor: "#0d2a4a",
                  scale: 1.4,
                  duration: 0.3
                });
              } else {
                gsap.to(item, { opacity: 0.35, scale: 0.98, duration: 0.4 });
                gsap.to(`.progress-dot-${index}`, {
                  backgroundColor: "#e2e8f0",
                  borderColor: "#cbd5e1",
                  scale: 1,
                  duration: 0.3
                });
              }
            }
          });

          // 3. Image 3D Layer Stack Slide Transition (Scrubbed during focal handover to next item)
          if (nextWrapper) {
            const transitionTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: "bottom 65%",
                end: "bottom 35%",
                scrub: true,
              },
            });

            transitionTimeline
              .to(sectionRef.current, { backgroundColor: bgColors[index + 1], ease: "none" }, 0)
              .to(currentWrapper, { y: -40, scale: 0.92, opacity: 0, ease: "none" }, 0)
              .to(nextWrapper, { y: 0, scale: 1, opacity: 1, ease: "none" }, 0);
          } else {
            // 4. Last Image Exit Transition: Fade out and slide upwards as last item leaves focus
            const exitTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: "bottom 65%",
                end: "bottom 35%",
                scrub: true,
              },
            });

            exitTimeline.to(currentWrapper, { 
              y: -40,
              scale: 0.92, 
              opacity: 0, 
              ease: "none" 
            }, 0);
          }
        });

        return () => {
          // Revert handles all animated properties, leaving React inline styles completely safe!
        };
      });

      // Mobile animations
      mm.add("(max-width: 768px)", () => {
        if (sectionRef.current) {
          sectionRef.current.style.backgroundColor = initialBgColor;
        }
        gsap.set(imgWrappers, {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          opacity: 1
        });
        gsap.set(".arch__info", { opacity: 1, scale: 1 });

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
          // Revert handles all animated properties, leaving React inline styles completely safe!
        };
      });
    }, sectionRef);

    // Dynamic delay to allow Next.js route transitions and DOM adjustments to fully settle
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimeout);
      clearTimeout(refreshTimeout);
      gsapCtx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="arch-section section-clip-x"
      style={{ fontFamily: "'Montserrat', sans-serif", position: "relative", zIndex: 2, backgroundColor: initialBgColor, overflow: "visible" }}
    >
      {/* Container */}
      <div style={{ maxWidth: 1440, padding: "clamp(1rem, 4vw, 2rem)", boxSizing: "border-box" }} className="mx-auto safe-mobile-block">
        <div style={{ width: "100%", height: "clamp(0px, 1.5vh, 12px)" }} />

        {/* Section heading */}
        <header
          style={{
            textAlign: "center",
            margin: "0 auto clamp(1.25rem, 3.5vw, 2.25rem)",
            maxWidth: 900,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(1.9rem, 4.2vw, 3.1rem)",
              lineHeight: 1.08,
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "0.03em",
              color: "#0d2a4a",
            }}
          >
            {sectionTitle || "Our Services"}
          </h2>
        </header>

        <div
          className="arch"
          style={{
            display: "flex",
            gap: "clamp(20px, 6vw, 60px)",
            justifyContent: "space-between",
            maxWidth: 1200, // Expanded container to allow wider golden-ratio cards
            marginInline: "auto",
            width: "100%",
          }}
        >
          {/* Left Column: Vertical Progress Timeline & Glassmorphic Service Cards */}
          <div
            className="arch__left-container"
            style={{ display: "flex", gap: "clamp(16px, 4vw, 48px)", position: "relative", width: "100%", maxWidth: 380 }} // Slender, elegant text column
          >
            {/* Desktop Vertical Progress Timeline */}
            <div
              className="services-timeline-nav"
              style={{
                position: "relative",
                width: "2px", // Delicate, razor-thin progress line
                backgroundColor: "rgba(13,26,38,0.08)",
                borderRadius: "100px",
                alignSelf: "stretch",
                marginBlock: "12vh 0vh",
              }}
            >
              {/* Dynamic scroll indicator fill */}
              <div
                className="services-timeline-progress"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "0%",
                  backgroundColor: "#0d2a4a",
                  borderRadius: "100px",
                  transition: "height 0.1s ease-out",
                }}
              />
              {/* Active Indicator Dots */}
              {cards.map((card, idx) => (
                <div
                  key={`dot-${card.id}`}
                  className={`progress-dot progress-dot-${idx}`}
                  data-index={idx}
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    top: `${(idx / (cards.length - 1)) * 100}%`,
                    width: "10px", // Smaller, elegant dots
                    height: "10px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            <div
              className="arch__left"
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                width: "100%",
                paddingTop: "12vh",
                paddingBottom: "0vh"
              }}
            >
              {cards.map((card, idx) => (
                <div
                  key={card.id}
                  className="arch__info"
                  style={{ 
                    width: "100%", 
                    height: "clamp(440px, 64vh, 720px)", 
                    display: "grid", 
                    placeItems: "center",
                    opacity: idx === 0 ? 1 : 0.35,
                    transform: idx === 0 ? "scale(1.02)" : "scale(0.98)",
                  }}
                >
                  <div className="service-glass-card safe-mobile-block">
                    <h2 style={{ fontSize: "clamp(1.75rem, 3.2vw, 36px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#0d1a26", lineHeight: 1.15, margin: 0 }}>
                      {card.title}
                    </h2>
                    <p style={{ color: "rgba(13,26,38,0.75)", fontSize: "clamp(0.95rem, 1.45vw, 16px)", letterSpacing: "-0.01em", marginBlock: "14px 28px", lineHeight: 1.6 }}>
                      {card.description}
                    </p>
                    <Link
                      href={card.linkHref}
                      style={{
                        textDecoration: "none",
                        padding: "14px 24px",
                        color: "#ffffff",
                        borderRadius: 40,
                        display: "flex",
                        gap: 8,
                        width: "fit-content",
                        alignItems: "center",
                        backgroundColor: "#0d2a4a",
                        fontSize: 14,
                        fontWeight: 600,
                        boxShadow: "0 4px 14px rgba(13,42,74,0.25)",
                        transition: "all 0.2s ease",
                      }}
                      className="hover-scale-btn"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                      <span>{card.linkLabel}</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Stacked images (centered vertically in focal screen) */}
          <div
            className="arch__right"
            style={{
              flexShrink: 1,
              height: "100vh",
              width: "100%",
              maxWidth: 640, // Wider column for cinematic golden-ratio widescreen display
              position: "relative",
            }}
          >
            {cards.map((card, i) => {
              const zIndexValue = cards.length - i;
              const isFirst = i === 0;

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
                    opacity: isFirst ? 1 : 0,
                    height: 400, // Cinematic widescreen height (aspect ratio ~1.6:1)
                    width: "100%",
                    borderRadius: 28, // Soft, premium rounded corners
                    overflow: "hidden",
                    zIndex: zIndexValue,
                    boxShadow: "0 20px 48px rgba(13, 42, 74, 0.12)", // Softer shadow for cleaner aesthetic
                    border: "1px solid rgba(255,255,255,0.3)",
                    boxSizing: "border-box",
                    clipPath: "inset(0% 0% 0% 0%)", // Ensure initial state is 100% unclipped on load on the wrapper itself
                  }}
                >
                  {card.imageUrl ? (
                    <img
                      src={card.imageUrl}
                      alt={card.imageAlt}
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover", 
                        objectPosition: "center", 
                        display: "block",
                      }}
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      style={{
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(135deg, ${card.accentColor} 0%, rgba(255,255,255,0.08) 100%)`,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Responsive & Premium Animation Styles */}
      <style>{`
        .service-glass-card {
          padding: clamp(1.5rem, 2.5vw, 2.25rem);
          border-radius: 28px; // Matching the curves of the image card
          background: rgba(255, 255, 255, 0.45); // Lighter glass fill
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.45);
          box-shadow: 0 10px 40px 0 rgba(13, 42, 74, 0.02); // Tonal shadow
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .service-glass-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 12px 40px 0 rgba(13, 42, 74, 0.08);
          background: rgba(255, 255, 255, 0.7);
        }
        .hover-scale-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(13, 42, 74, 0.35) !important;
          background-color: #123d6b !important;
        }
        .img-wrapper img:hover {
          transform: scale(1.03);
        }
        .progress-dot {
          width: 8px !important;
          height: 8px !important;
          background-color: #ffffff !important;
          border: 2px solid #cbd5e1 !important;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .progress-dot.active {
          scale: 1.6 !important;
          border-color: #0d2a4a !important;
          box-shadow: 0 0 12px rgba(13, 42, 74, 0.2) !important;
        }

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
          .arch__left-container {
            display: contents !important;
          }
          .services-timeline-nav {
            display: none !important;
          }
          .arch__left, .arch__right { 
            display: contents !important; 
          }
          .arch__left {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .arch__right .img-wrapper {
            position: static !important;
            transform: none !important;
            opacity: 1 !important;
            height: clamp(220px, 58vw, 340px) !important;
            width: 100% !important;
            margin: 0 0 18px 0 !important;
            border-radius: 16px !important;
            box-shadow: 0 8px 24px rgba(13, 42, 74, 0.08) !important;
          }
          .arch__left .arch__info,
          .arch__left .arch__info > div {
            width: 100% !important;
            max-width: 100% !important;
          }
          .arch__left .arch__info {
            height: auto !important;
            min-height: auto !important;
            padding: 10px 0 !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .service-glass-card {
            background: rgba(255, 255, 255, 0.8) !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            border: 1px solid rgba(13, 42, 74, 0.05) !important;
            padding: 1.5rem !important;
            box-shadow: none !important;
          }
          .service-glass-card:hover {
            transform: none !important;
          }
          .arch__left .arch__info h2 {
            font-size: clamp(1.6rem, 8vw, 2.2rem) !important;
            line-height: 1.15 !important;
          }
          .arch__left .arch__info p {
            font-size: clamp(0.95rem, 4vw, 1.05rem) !important;
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

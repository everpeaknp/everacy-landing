"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { NAV_LINKS } from "@/lib/constants";

const BRAND_COLOR = "#27446e";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(!isHome); // Default to true if not on home
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 20);
    
    // STRICT RULE: Only transparent/dark if on homepage AND not scrolled past hero.
    // Otherwise, it's ALWAYS white ('pastHero' style).
    if (isHome) {
      setPastHero(y > window.innerHeight * 0.85);
    } else {
      setPastHero(true);
    }
  }, [isHome]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        style={
          pastHero
            ? {
                // White glass — over the light ArchSection
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 2px 20px rgba(0,0,0,0.07)",
              }
            : scrolled
            ? {
                // Dark glass — still within the hero
                background: "rgba(6,14,36,0.50)",
                backdropFilter: "blur(28px) saturate(180%)",
                WebkitBackdropFilter: "blur(28px) saturate(180%)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 2px 24px rgba(0,0,0,0.2)",
              }
            : {
                background: "transparent",
              }
        }
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex h-16 items-center justify-between">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Everacy home"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <div
              className="relative"
              style={{
                width: 34,
                height: 34,
                filter: pastHero ? "none" : "drop-shadow(0 0 8px rgba(39,68,110,0.5))",
                transition: "filter 0.3s",
              }}
            >
              <Image
                src={pastHero ? "/logo/everacy_w_bg.jpeg" : "/logo/everacy_wo_bg.png"}
                alt="Everacy logo mark"
                fill
                sizes="34px"
                className="object-contain transition-opacity duration-300"
                priority
              />
            </div>
            <span
              className="text-[15px] font-extrabold tracking-[0.18em] uppercase transition-colors duration-300"
              style={{
                color: pastHero ? "#0d1a26" : "#ffffff",
                letterSpacing: "0.18em",
                textShadow: pastHero ? "none" : scrolled ? "none" : "0 1px 8px rgba(0,0,0,0.5)",
              }}
            >
              Everacy
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 group"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: pastHero ? "rgba(13,26,38,0.7)" : "rgba(255,255,255,0.7)",
                }}
              >
                {label}
                {/* Underline dot indicator on hover */}
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: BRAND_COLOR }}
                />
              </Link>
            ))}

            {/* CTA button */}
            <Link
              href="/contact"
              className="ml-4 px-5 py-2 text-[13px] font-medium rounded-full transition-all duration-200 hover:scale-105"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                background: BRAND_COLOR,
                color: "#fff",
                boxShadow: `0 4px 14px rgba(39,68,110,0.25)`,
              }}
            >
              Get In Touch
            </Link>
          </nav>

          {/* ── Hamburger ── */}
          <button
            className="md:hidden relative z-10 flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-[1.5px] rounded-full transition-all duration-300 origin-center"
              style={{
                background: pastHero ? "#0d1a26" : "#fff",
                transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : "none",
              }}
            />
            <span
              className="block w-5 h-[1.5px] rounded-full transition-all duration-300"
              style={{
                background: pastHero ? "#0d1a26" : "#fff",
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "none",
              }}
            />
            <span
              className="block w-5 h-[1.5px] rounded-full transition-all duration-300 origin-center"
              style={{
                background: pastHero ? "#0d1a26" : "#fff",
                transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen menu ── */}
      <div
        className="fixed inset-0 z-[99] md:hidden transition-all duration-500"
        style={{
          background: "rgba(2,6,20,0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
        }}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col h-full items-center justify-center gap-8 px-6"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {NAV_LINKS.map(({ label, href }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-black uppercase tracking-[0.15em] text-white/80 hover:text-white transition-all duration-200 hover:tracking-[0.22em]"
              style={{
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
              }}
            >
              {label}
            </Link>
          ))}

          {/* Mobile CTA */}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-10 py-4 rounded-full text-[15px] font-semibold uppercase tracking-widest transition-all duration-200 hover:scale-105"
            style={{
              background: BRAND_COLOR,
              color: "#fff",
              boxShadow: `0 4px 20px rgba(39,68,110,0.3)`,
              letterSpacing: "0.2em",
            }}
          >
            Get In Touch
          </Link>

          {/* Bottom branding */}
          <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-25">
            <div
              className="w-8 h-px"
              style={{ background: BRAND_COLOR }}
            />
            <span className="text-[9px] tracking-[0.5em] uppercase text-white">
              Everacy © 2025
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { archSectionCards } from "@/lib/site-theme";
import { Layers } from "lucide-react";
import type { NavbarData, ServiceCardData } from "@/lib/api";

const BRAND_COLOR = "#27446e";

interface NavbarProps {
  data?: NavbarData | null;
  services?: ServiceCardData[];
}

export function Navbar({ data, services }: NavbarProps) {
  // Resolve nav links: API → static fallback
  const navLinks =
    data?.items && data.items.length > 0
      ? data.items.map((item) => ({ label: item.title, href: item.link }))
      : NAV_LINKS.map((l) => ({ label: l.label, href: l.href }));

  // Resolve services: fetched dynamic services → static fallback
  const servicesList =
    services && services.length > 0
      ? services.map((s) => ({
          id: String(s.id),
          title: s.title,
          linkHref:
            s.link_href && s.link_href.includes("#")
              ? s.link_href
              : `/services#${s.title.toLowerCase().split(" ")[0]}`,
          imageUrl: s.image,
          imageAlt: s.image_alt || s.title,
        }))
      : archSectionCards.map((c) => ({
          id: c.id,
          title: c.title,
          linkHref: c.linkHref,
          imageUrl: c.imageUrl,
          imageAlt: c.imageAlt,
        }));

  const siteName = data?.settings?.site_name ?? "Everacy";
  const ctaText = data?.settings?.button_text ?? "Get In Touch";
  const ctaLink = data?.settings?.button_link ?? "/contact";
  const logoOnDark = data?.settings?.logo ?? "/logo/everacy_wo_bg.png";
  // For the scrolled (light bg) state, always use the transparent logo —
  // the navbar background itself provides the white backdrop.
  // Only use scrolled_logo from admin if explicitly set.
  const logoOnLight = data?.settings?.scrolled_logo ?? data?.settings?.logo ?? "/logo/everacy_wo_bg.png";

  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const isAbout = pathname === "/about";
  const isBlogs = pathname === "/blogs";
  const isServices = pathname === "/services";
  const isProjects = pathname === "/projects";
  const isCareers = pathname === "/careers";
  const [pastHero, setPastHero] = useState(!isHome && !isProjects && !isCareers && !isAbout && !isBlogs && !isServices);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const navIsLight = pastHero || servicesMenuOpen;

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 20);

    // STRICT RULE: Only transparent/dark if on homepage, projects, careers, about, OR services AND not scrolled past hero/intro.
    // Otherwise, it's ALWAYS white ('pastHero' style).
    if (isHome || isProjects || isCareers || isAbout || isBlogs || isServices) {
      setPastHero(y > window.innerHeight * 0.85);
    } else {
      setPastHero(true);
    }
  }, [isHome, isProjects, isCareers, isAbout, isBlogs, isServices]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 section-clip-x"
        style={
          navIsLight
            ? {
                // Keep navbar and services mega menu as a single connected layer
                background: servicesMenuOpen ? "#ffffff" : "rgba(255,255,255,0.88)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                borderBottom: servicesMenuOpen ? "1px solid rgba(0,0,0,0)" : "1px solid rgba(0,0,0,0.06)",
                boxShadow: servicesMenuOpen ? "none" : "0 2px 20px rgba(0,0,0,0.07)",
                transitionTimingFunction: "cubic-bezier(0.2, 0.7, 0.2, 1)",
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
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex h-16 items-center justify-between">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Everacy home"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <div
              className={navIsLight ? "relative overflow-hidden rounded-lg" : "relative"}
              style={{
                width: 34,
                height: 34,
                filter: navIsLight ? "none" : "drop-shadow(0 0 8px rgba(39,68,110,0.5))",
                transition: "filter 0.3s",
              }}
            >
              <Image
                src={logoOnDark}
                alt={`${siteName} logo`}
                fill
                sizes="34px"
                className="object-contain transition-opacity duration-300"
                style={{ opacity: navIsLight ? 0 : 1 }}
                priority={!navIsLight}
                unoptimized={logoOnDark.startsWith("http")}
              />
              <Image
                src={logoOnLight}
                alt={`${siteName} logo`}
                fill
                sizes="34px"
                className="object-contain transition-opacity duration-300"
                style={{ opacity: navIsLight ? 1 : 0 }}
                priority={navIsLight}
                unoptimized={logoOnLight.startsWith("http")}
              />
            </div>
            <span
              className="text-[14px] sm:text-[15px] font-extrabold tracking-[0.12em] sm:tracking-[0.18em] uppercase transition-colors duration-300"
              style={{
                color: navIsLight ? "#0d1a26" : "#ffffff",
                letterSpacing: "clamp(0.12em, 0.8vw, 0.18em)",
                textShadow: navIsLight ? "none" : scrolled ? "none" : "0 1px 8px rgba(0,0,0,0.5)",
              }}
            >
              {siteName}
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <nav className="hidden md:flex items-center gap-1 h-full" aria-label="Main navigation">
            {navLinks.map(({ label, href }) => {
              // Render a Services nav item with a mega menu
              if (href === "/services" || label.toLowerCase() === "services") {
                return (
                  <div
                    key={href}
                    className="hoverable hidden md:flex items-center h-full group"
                    onMouseEnter={() => setServicesMenuOpen(true)}
                    onMouseLeave={() => setServicesMenuOpen(false)}
                  >
                    <Link
                      href={href}
                      className="relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 block"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: navIsLight ? "rgba(13,26,38,0.72)" : "rgba(255,255,255,0.7)",
                      }}
                    >
                      {label}
                    </Link>

                    {/* Reset mega menu to Tailwind-style: full-width dropdown showing small image + title only */}
                    <div className="mega-menu absolute left-0 right-0 top-[calc(100%-1px)] z-[1000] mt-0 w-full bg-clip-padding origin-top transition-all duration-200 opacity-0 scale-y-95 pointer-events-none group-hover:opacity-100 group-hover:scale-y-100 group-hover:pointer-events-auto"
                      style={{
                        background: "#ffffff",
                        transitionTimingFunction: "cubic-bezier(0.2, 0.7, 0.2, 1)",
                        backdropFilter: "blur(24px) saturate(180%)",
                        WebkitBackdropFilter: "blur(24px) saturate(180%)",
                        boxShadow: "0 16px 26px rgba(6,14,36,0.06)",
                      }}
                    >
                      <div className="mega-inner px-8 py-6 lg:px-12">
                        <div className="grid gap-x-8 gap-y-3.5 md:grid-cols-2 xl:grid-cols-4 max-w-[1280px] mx-auto">
                          {(mounted ? servicesList : []).map((c) => (
                            <Link
                              key={c.id}
                              href={c.linkHref}
                              className="flex w-full items-center gap-3.5 py-3 px-3.5 rounded-xl hover:bg-[#f4f7fa] text-neutral-700 hover:text-[#27446e] transition-all duration-200 group"
                            >
                              <div className="shrink-0">
                                {c.imageUrl ? (
                                  <Image
                                    src={c.imageUrl}
                                    alt={c.imageAlt ?? c.title}
                                    width={36}
                                    height={36}
                                    className="w-9 h-9 rounded-lg object-cover border border-[#d8e3ed] transition-transform duration-300 group-hover:scale-105"
                                    unoptimized={c.imageUrl.startsWith("http")}
                                  />
                                ) : (
                                  <div className="w-9 h-9 rounded-lg bg-[#e9eff7] text-[#27446e] flex items-center justify-center border border-[#d8e3ed] transition-transform duration-300 group-hover:scale-105">
                                    <Layers className="w-4 h-4" />
                                  </div>
                                )}
                              </div>
                              <div className="grow min-w-0">
                                <p className="mb-0 font-bold text-[#1f2937] text-[14.5px] tracking-tight group-hover:text-[#27446e] transition-colors leading-tight">{c.title}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={href}
                  href={href}
                  className="relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 group"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    color: navIsLight ? "rgba(13,26,38,0.72)" : "rgba(255,255,255,0.7)",
                  }}
                >
                  {label}
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: BRAND_COLOR }}
                  />
                </Link>
              );
            })}

            {/* CTA button */}
            <Link
              href={ctaLink}
              className="ml-4 px-5 py-2 text-[13px] font-medium rounded-full transition-all duration-200 hover:scale-105"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                background: BRAND_COLOR,
                color: "#fff",
                boxShadow: `0 4px 14px rgba(39,68,110,0.25)`,
              }}
            >
              {ctaText}
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
                background: navIsLight ? "#0d1a26" : "#fff",
                transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : "none",
              }}
            />
            <span
              className="block w-5 h-[1.5px] rounded-full transition-all duration-300"
              style={{
                background: navIsLight ? "#0d1a26" : "#fff",
                opacity: menuOpen ? 0 : 1,
                transform: menuOpen ? "scaleX(0)" : "none",
              }}
            />
            <span
              className="block w-5 h-[1.5px] rounded-full transition-all duration-300 origin-center"
              style={{
                background: navIsLight ? "#0d1a26" : "#fff",
                transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile full-screen menu ── */}
      <div
        className="fixed inset-0 z-[99] md:hidden transition-all duration-500 section-clip-x"
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
          {navLinks.map(({ label, href }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-black uppercase tracking-[0.12em] sm:tracking-[0.15em] text-white/80 hover:text-white transition-all duration-200 hover:tracking-[0.2em]"
              style={{
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
              }}
            >
              {label}
            </Link>
          ))}

          {/* Mobile CTA */}
          <Link
            href={ctaLink}
            onClick={() => setMenuOpen(false)}
            className="mt-4 px-10 py-4 rounded-full text-[15px] font-semibold uppercase tracking-widest transition-all duration-200 hover:scale-105"
            style={{
              background: BRAND_COLOR,
              color: "#fff",
              boxShadow: `0 4px 20px rgba(39,68,110,0.3)`,
              letterSpacing: "0.2em",
            }}
          >
            {ctaText}
          </Link>

          {/* Bottom branding */}
          <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-25">
            <div
              className="w-8 h-px"
              style={{ background: BRAND_COLOR }}
            />
            <span className="text-[9px] tracking-[0.36em] uppercase text-white">
              Everacy © 2025
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

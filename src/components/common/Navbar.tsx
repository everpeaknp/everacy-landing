"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { NAV_LINKS } from "@/lib/constants";
import { BriefcaseBusiness, Code2, ChevronDown, CircleUserRound, FolderKanban, Home, Layers as LayersIcon, Mail, Megaphone, MonitorCog, Newspaper, Palette, PenTool, Search, Smartphone, Sparkles, UsersRound } from "lucide-react";
import type { NavbarData, ServiceCategoryData } from "@/lib/api";

const BRAND_COLOR = "#27446e";
const BRAND_ACCENT = "#00a6cb";
const BRAND_DARK = "#0d2a4a";

function serviceIconFor(title: string) {
  const normalizedTitle = title.toLowerCase();
  if (normalizedTitle.includes("software") || normalizedTitle.includes("system")) return MonitorCog;
  if (normalizedTitle.includes("app") || normalizedTitle.includes("mobile")) return Smartphone;
  if (normalizedTitle.includes("seo") || normalizedTitle.includes("search")) return Search;
  if (normalizedTitle.includes("social")) return UsersRound;
  if (normalizedTitle.includes("marketing")) return Megaphone;
  if (normalizedTitle.includes("graphic")) return Palette;
  if (normalizedTitle.includes("website") || normalizedTitle.includes("development")) return Code2;
  if (normalizedTitle.includes("ui") || normalizedTitle.includes("ux") || normalizedTitle.includes("design")) return PenTool;
  return Sparkles;
}

function navigationIconFor(label: string) {
  switch (label.toLowerCase()) {
    case "home": return Home;
    case "about": return CircleUserRound;
    case "services": return LayersIcon;
    case "projects": return FolderKanban;
    case "blogs": return Newspaper;
    case "careers": return BriefcaseBusiness;
    case "contact": return Mail;
    default: return Sparkles;
  }
}

interface NavbarProps {
  data?: NavbarData | null;
  categories?: ServiceCategoryData[];
}

export function Navbar({ data, categories = [] }: NavbarProps) {
  // Resolve nav links: API → static fallback
  const navLinks =
    data?.items && data.items.length > 0
      ? data.items.map((item) => ({ label: item.title, href: item.link }))
      : NAV_LINKS.map((l) => ({ label: l.label, href: l.href }));

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
  const isProjects = pathname === "/projects";
  const isHeroOverlayPage = isHome || isProjects;
  const [scrolled, setScrolled] = useState(false);
  const isAbout = pathname === "/about";
  const isBlogs = pathname === "/blogs";
  const isBlogDetail = pathname.startsWith("/blogs/") && pathname !== "/blogs";
  const isServicePage = pathname === "/services" || pathname.startsWith("/services/");
  const isCareers = pathname === "/careers" || pathname.startsWith("/careers/");
  const isContact = pathname === "/contact";
  const [pastHero, setPastHero] = useState(!isHeroOverlayPage && !isCareers && !isAbout && !isBlogs && !isBlogDetail && !isServicePage && !isContact);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(isServicePage);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [servicesMenuDismissed, setServicesMenuDismissed] = useState(false);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState(categories[0]?.slug ?? "");

  const dismissServicesMenu = () => {
    setServicesMenuDismissed(true);
    setServicesMenuOpen(false);
  };

  const selectedCategory = categories.find((category) => category.slug === selectedCategorySlug) ?? categories[0];
  // Inner pages use light hero surfaces, so their navbar must start in the light theme.
  // The homepage keeps its dark transparent treatment until its hero has passed.
  const navIsLight = !isHeroOverlayPage || pastHero || servicesMenuOpen || menuOpen;
  const lockedScrollY = useRef(0);

  useEffect(() => {
    if (!categories.some((category) => category.slug === selectedCategorySlug)) {
      setSelectedCategorySlug(categories[0]?.slug ?? "");
    }
  }, [categories, selectedCategorySlug]);

  useEffect(() => {
    setMobileServicesExpanded(isServicePage);
  }, [isServicePage, pathname]);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 20);

    if (isServicePage) {
      const serviceHero = document.querySelector<HTMLElement>("[data-service-hero]");
      setPastHero(serviceHero ? serviceHero.getBoundingClientRect().bottom <= 64 : y > window.innerHeight * 0.85);
      return;
    }

    // Only transparent/dark if on homepage, careers, about, contact, or blog landing pages and still within the hero.
    // Otherwise, it's ALWAYS white ('pastHero' style).
    if (isHeroOverlayPage || isCareers || isAbout || isBlogs || isBlogDetail || isContact) {
      setPastHero(y > window.innerHeight * 0.85);
    } else {
      setPastHero(true);
    }
  }, [isHeroOverlayPage, isCareers, isAbout, isBlogs, isBlogDetail, isServicePage, isContact]);

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
    if (!menuOpen) return;

    const { body, documentElement } = document;
    const scrollY = window.scrollY;
    const previousStyles = {
      htmlOverflow: documentElement.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
    };
    lockedScrollY.current = scrollY;

    // `overflow: hidden` alone still lets mobile Safari scroll the page behind
    // fixed overlays. Pin the body at its current offset while the drawer is open.
    documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      documentElement.style.overflow = previousStyles.htmlOverflow;
      body.style.overflow = previousStyles.bodyOverflow;
      body.style.position = previousStyles.bodyPosition;
      body.style.top = previousStyles.bodyTop;
      body.style.width = previousStyles.bodyWidth;
      window.scrollTo(0, lockedScrollY.current);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 section-clip-x"
        style={
          !isHeroOverlayPage && !scrolled && !servicesMenuOpen && !menuOpen
            ? {
                // Let dark navigation sit over the light hero without a hard white bar.
                background: "linear-gradient(180deg, rgba(244,249,250,0.92) 0%, rgba(244,249,250,0.58) 68%, rgba(244,249,250,0) 100%)",
                backdropFilter: "none",
                WebkitBackdropFilter: "none",
                borderBottom: "1px solid transparent",
                boxShadow: "none",
              }
            : navIsLight
            ? {
                // Keep navbar and services mega menu as a single connected layer
                background: servicesMenuOpen || menuOpen ? "#ffffff" : "rgba(255,255,255,0.88)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                borderBottom: servicesMenuOpen || menuOpen ? "1px solid rgba(0,0,0,0)" : "1px solid rgba(0,0,0,0.06)",
                boxShadow: servicesMenuOpen || menuOpen ? "none" : "0 2px 20px rgba(0,0,0,0.07)",
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
              const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
              
              if (href === "/services" || label.toLowerCase() === "services") {
                return (
                  <div
                    key={href}
                    className="hoverable hidden md:flex items-center h-full group"
                    onMouseEnter={() => {
                      if (!servicesMenuDismissed) setServicesMenuOpen(true);
                    }}
                    onMouseLeave={() => {
                      setServicesMenuDismissed(false);
                      setServicesMenuOpen(false);
                    }}
                    onFocus={() => {
                      if (!servicesMenuDismissed) setServicesMenuOpen(true);
                    }}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                        setServicesMenuDismissed(false);
                        setServicesMenuOpen(false);
                      }
                    }}
                  >
                    <Link
                      href={href}
                      onClick={dismissServicesMenu}
                      className="relative px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 block group"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        color: navIsLight ? (isActive ? "rgba(13,26,38,1)" : "rgba(13,26,38,0.72)") : (isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)"),
                      }}
                    >
                      {label}
                      <span
                        className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                        style={{ background: BRAND_COLOR }}
                      />
                    </Link>

                    {/* Brand-aligned services mega menu */}
                    <div className="mega-menu absolute left-0 right-0 top-[calc(100%-1px)] z-[1000] mt-0 w-full bg-clip-padding origin-top transition-all duration-200 opacity-0 scale-y-95 pointer-events-none group-hover:opacity-100 group-hover:scale-y-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:scale-y-100 group-focus-within:pointer-events-auto"
                      style={{
                        background: "#ffffff",
                        transitionTimingFunction: "cubic-bezier(0.2, 0.7, 0.2, 1)",
                        borderTop: "1px solid #e6e9ed",
                        boxShadow: "0 16px 32px rgba(13,42,74,0.08)",
                        display: servicesMenuDismissed ? "none" : servicesMenuOpen ? "block" : undefined,
                      }}
                    >
                      <div className="mega-inner px-4 py-5 sm:px-8 lg:px-12" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        <div className="mx-auto grid max-w-[1780px] gap-5 lg:grid-cols-[minmax(280px,0.35fr)_minmax(0,1fr)] lg:gap-8">
                          <div className="flex flex-col gap-1 py-1" role="tablist" aria-label="Service categories">
                            {categories.map((category) => (
                              <button
                                key={category.id}
                                id={"service-category-" + category.slug}
                                type="button"
                                role="tab"
                                aria-selected={selectedCategory?.slug === category.slug}
                                aria-controls="service-category-panel"
                                onClick={() => setSelectedCategorySlug(category.slug)}
                                className="relative border-l-2 px-4 py-3.5 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                                style={{
                                  background: "transparent",
                                  borderColor: selectedCategory?.slug === category.slug ? "#27446e" : "transparent",
                                  color: BRAND_DARK,
                                }}
                              >
                                <span className="block text-base font-bold tracking-tight">{category.title}</span>
                                <span className="mt-1.5 block line-clamp-2 text-[13px] leading-5 text-slate-600">{category.description}</span>
                              </button>
                            ))}
                          </div>

                          {selectedCategory ? (
                            <div
                              id="service-category-panel"
                              role="tabpanel"
                              aria-labelledby={"service-category-" + selectedCategory.slug}
                              className="min-w-0 py-1"
                            >
                              <div className="mb-4 flex items-end justify-between gap-4 border-b border-[#27446e]/10 pb-4">
                                <div>
                                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Explore what we do</p>
                                  <h2 className="mt-1 text-2xl font-bold tracking-tight" style={{ color: BRAND_DARK }}>{selectedCategory.title}</h2>
                                </div>
                              </div>
                              {selectedCategory.featured_services.length > 0 ? (
                                <div className="grid gap-2 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-3">
                              {selectedCategory.featured_services.map((service) => (
                                    <Link
                                      key={service.id}
                                      href={"/services/" + selectedCategory.slug + "/" + (service.slug || service.id)}
                                      onClick={dismissServicesMenu}
                                      className="group flex min-w-0 items-start gap-3 rounded-md border border-transparent p-3 transition-colors duration-200 hover:border-slate-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                                    >
                                      <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden text-slate-600">
                                        {service.image ? (
                                          <Image src={service.image} alt={service.image_alt || service.title} width={48} height={48} className="h-full w-full object-cover" unoptimized={service.image.startsWith("http")} />
                                        ) : (
                                          (() => {
                                            const ServiceIcon = serviceIconFor(service.title);
                                            return <ServiceIcon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />;
                                          })()
                                        )}
                                      </span>
                                      <span className="min-w-0">
                                        <span className="block text-[14px] font-bold leading-snug tracking-tight" style={{ color: BRAND_DARK }}>{service.title}</span>
                                        <span className="mt-1 line-clamp-2 block text-[12px] leading-[1.55] text-slate-600">{service.description}</span>
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              ) : (
                                <p className="rounded-lg border border-dashed border-[#27446e]/20 bg-[#f4f9fc] px-4 py-6 text-sm text-slate-600">Featured services are coming soon.</p>
                              )}
                            </div>
                          ) : (
                            <Link href="/services" className="rounded-lg bg-[#f4f9fc] p-5 font-semibold text-slate-700 hover:text-[#00a6cb]">
                              Explore all services
                            </Link>
                          )}
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
                    color: navIsLight ? (isActive ? "rgba(13,26,38,1)" : "rgba(13,26,38,0.72)") : (isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.7)"),
                  }}
                >
                  {label}
                  <span
                    className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
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
        className="fixed inset-0 z-[99] md:hidden transition-all duration-300 section-clip-x"
        style={{
          background: "#ffffff",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
        }}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-full flex-col bg-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          <nav aria-label="Mobile navigation" className="mx-auto w-full max-w-xl flex-1 overflow-y-auto overscroll-contain px-5 pb-4 pt-[78px] sm:px-8">
            {navLinks.map(({ label, href }) => {
              if (href === "/services" || label.toLowerCase() === "services") {
                const ServicesIcon = navigationIconFor(label);
                const isServicesCurrent = pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <section key={href} aria-label="Browse services by category" className="py-1">
                    <div className={`flex min-h-11 items-center rounded-xl pr-1 transition-colors ${isServicesCurrent ? "bg-[#f5f9fa]" : "hover:bg-[#f5f9fa]"}`}>
                      <Link href={href} onClick={() => setMenuOpen(false)} aria-current={isServicesCurrent ? "page" : undefined} className={`flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#008da4] ${isServicesCurrent ? "text-[#142e4c]" : "text-[#40566f]"}`}>
                        <ServicesIcon aria-hidden="true" className={`h-[18px] w-[18px] shrink-0 ${isServicesCurrent ? "text-[#008da4]" : "text-[#718399]"}`} strokeWidth={1.8} />
                        <span>{label}</span>
                      </Link>
                      <button type="button" aria-label={mobileServicesExpanded ? "Collapse service categories" : "Expand service categories"} aria-expanded={mobileServicesExpanded} aria-controls="mobile-service-categories" onClick={() => setMobileServicesExpanded((expanded) => !expanded)} className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008da4] ${isServicesCurrent ? "text-[#008da4]" : "text-[#718399] hover:text-[#008da4]"}`}>
                        <ChevronDown aria-hidden="true" size={18} className={`transition-transform duration-200 ${mobileServicesExpanded ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                    {mobileServicesExpanded && <div id="mobile-service-categories" className="ml-3 mt-2 border-l border-[#dce8eb] pl-3">
                      {categories.map((category) => {
                        const services = category.services?.length ? category.services : category.featured_services;
                        return (
                          <div key={category.id} className="pb-2 last:pb-0">
                            <Link href={`/services/${category.slug}`} onClick={() => setMenuOpen(false)} className="mb-1 block rounded-md px-2 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#008da4] hover:bg-[#f1fbfa]">
                              {category.title}
                            </Link>
                            <ul>
                              {services.map((service) => {
                                const Icon = serviceIconFor(service.title);
                                const serviceHref = `/services/${category.slug}/${service.slug || service.id}`;
                                const isCurrentService = pathname === serviceHref;
                                return (
                                  <li key={service.id}>
                                    <Link href={serviceHref} onClick={() => setMenuOpen(false)} aria-current={isCurrentService ? "page" : undefined} className={`flex min-h-10 items-center gap-3 rounded-lg px-2 py-2 text-[13px] font-medium transition-colors hover:bg-[#f5f9fa] hover:text-[#008da4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#008da4] ${isCurrentService ? "bg-[#f1fbfa] text-[#007f91]" : "text-[#40566f]"}`}>
                                      <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-[#008da4]" strokeWidth={1.8} />
                                      <span>{service.title}</span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    </div>}
                  </section>
                );
              }

              const NavIcon = navigationIconFor(label);
              const isCurrent = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
              return (
                <Link key={href} href={href} onClick={() => setMenuOpen(false)} aria-current={isCurrent ? "page" : undefined} className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-[15px] font-semibold transition-colors hover:bg-[#f5f9fa] hover:text-[#008da4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#008da4] ${isCurrent ? "bg-[#f5f9fa] text-[#142e4c]" : "text-[#40566f]"}`}>
                  <NavIcon aria-hidden="true" className={`h-[18px] w-[18px] ${isCurrent ? "text-[#008da4]" : "text-[#718399]"}`} strokeWidth={1.8} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mx-auto w-full max-w-xl shrink-0 border-t border-[#e7edf0] bg-white px-5 py-3 sm:px-8" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
            <Link href={ctaLink} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold text-white transition-colors hover:bg-[#1e385d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008da4] focus-visible:ring-offset-2" style={{ background: BRAND_COLOR }}>
              {ctaText}
              <span aria-hidden="true" className="text-lg leading-none">→</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

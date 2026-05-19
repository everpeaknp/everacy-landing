import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";
import type { FooterData } from "@/lib/api";

interface FooterProps {
  data?: FooterData | null;
}

export function Footer({ data }: FooterProps) {
  const year = new Date().getFullYear();

  // ── Resolve values: API data → static fallback ──────────
  const settings = data?.settings;
  const companyName = settings?.company_name ?? SITE_NAME;
  const description =
    settings?.description ??
    "High-performance IT solutions engineered for the future. We build digital infrastructures that scale with your vision.";
  const copyright = settings?.copyright ?? `© ${year} ${companyName}`;
  const privacyText = settings?.privacy_policy_text ?? "Privacy Policy";
  const privacyUrl = settings?.privacy_policy_url || "/privacy";
  const termsText = settings?.terms_text ?? "Terms";
  const termsUrl = settings?.terms_url || "/terms";
  const cookiesText = settings?.cookies_text ?? "Cookies";
  const cookiesUrl = settings?.cookies_url || "/cookies";

  // Logo: use API logo if available, else local asset
  const logoSrc = settings?.logo ?? "/logo/everacy_wo_bg.png";
  const bgLogoSrc = settings?.background_logo ?? "/logo/everacy_wo_bg.png";

  // Nav links: use API nav items if available, else static constants
  const navLinks =
    data?.nav_items && data.nav_items.length > 0
      ? data.nav_items.map((item) => ({ label: item.title, href: item.link }))
      : NAV_LINKS.map((l) => ({ label: l.label, href: l.href }));

  // Social links: use API social links if available, else static constants
  const socialLinks =
    data?.social_links && data.social_links.length > 0
      ? data.social_links.map((s) => ({ name: s.platform, url: s.url }))
      : Object.entries(SOCIAL_LINKS).map(([name, url]) => ({ name, url }));

  return (
    <footer
      className="section-clip-x"
      style={{
        position: "relative",
        zIndex: 2,
        background: "transparent",
        color: "#ffffff",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Liquid background */}
      <LiquidEffectAnimation fill="absolute" zIndex={-2} />

      {/* Dark vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(3,8,24,0.3) 0%, rgba(2,5,18,0.75) 100%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      {/* Brand-blue atmospheric glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 55% 40% at 50% 80%, rgba(17,142,198,0.2) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />

      {/* Large background logo */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "55%",
          maxWidth: "650px",
          aspectRatio: "1/1",
          opacity: 0.05,
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        <Image
          src={bgLogoSrc}
          alt=""
          fill
          sizes="800px"
          className="object-contain"
          unoptimized={bgLogoSrc.startsWith("http")}
        />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-12 md:gap-12">

          {/* Brand */}
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="flex items-center gap-4">
              <div className="relative w-8 h-8">
                <Image
                  src={logoSrc}
                  alt={companyName}
                  fill
                  sizes="32px"
                  className="object-contain"
                  unoptimized={logoSrc.startsWith("http")}
                />
              </div>
              <p
                className="text-xl sm:text-2xl md:text-3xl font-black uppercase leading-none"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: "clamp(0.1em, 0.7vw, 0.2em)",
                  color: "#ffffff",
                }}
              >
                {companyName}
              </p>
            </div>
            <p className="text-sm text-white/40 max-w-xs leading-relaxed font-light">
              {description}
            </p>
          </div>

          {/* Navigation & Connect */}
          <div className="flex justify-between md:contents">

            {/* Navigation */}
            <nav aria-label="Footer navigation" className="flex-1">
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mb-6 md:mb-8">
                Navigation
              </p>
              <ul className="space-y-4" role="list">
                {navLinks.map(({ label, href }, i) => (
                  <li key={`${href}-${i}`}>
                    <Link
                      href={href}
                      className="text-[12px] md:text-[13px] font-medium text-white/50 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-white/0 group-hover:bg-white/40 transition-all" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Socials */}
            <div className="flex-1">
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mb-6 md:mb-8 text-right md:text-left">
                Connect
              </p>
              <ul className="space-y-4 text-right md:text-left" role="list">
                {socialLinks.map(({ name, url }, i) => (
                  <li key={`${name}-${i}`}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[12px] md:text-[13px] font-medium capitalize text-white/50 hover:text-white transition-all duration-300"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 md:mt-24 pt-6 md:pt-8 border-t border-white/5 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 md:gap-6 text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/30">
              <Link href={privacyUrl} className="hover:text-white transition-colors">
                {privacyText}
              </Link>
              <Link href={termsUrl} className="hover:text-white transition-colors">
                {termsText}
              </Link>
              <Link href={cookiesUrl} className="hover:text-white transition-colors">
                {cookiesText}
              </Link>
            </div>

            <div className="flex items-center gap-3 md:gap-4 text-[8px] md:text-[9px] uppercase tracking-[0.24em] md:tracking-[0.5em] text-white/20">
              <span>{copyright}</span>
              <span className="hidden xs:inline w-6 md:w-8 h-px bg-white/10" />
              <span className="opacity-60 hidden xs:inline">Engineering Tomorrow</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

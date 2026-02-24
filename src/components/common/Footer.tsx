import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS, SITE_NAME, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 2,
        background: "transparent",
        color: "#ffffff",
        overflow: "hidden"
      }}
    >
      {/* Dark overlay for liquid visibility & text contrast */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(3,8,24,0.4) 0%, rgba(2,6,20,0.85) 100%)",
          zIndex: -1,
        }}
      />

      {/* Large background logo — semi-transparent centered brand identity */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          maxWidth: "800px",
          aspectRatio: "1/1",
          opacity: 0.04,
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        <Image
          src="/logo/everacy_wo_bg.png"
          alt=""
          fill
          sizes="800px"
          className="object-contain"
        />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-12 md:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="flex items-center gap-4">
              <div className="relative w-8 h-8 filter drop-shadow(0 0 12px rgba(17,142,198,0.5))">
                <Image
                  src="/logo/everacy_wo_bg.png"
                  alt=""
                  fill
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <p 
                className="text-2xl md:text-3xl font-black uppercase leading-none"
                style={{ 
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: "0.2em",
                  color: "#ffffff"
                }}
              >
                {SITE_NAME}
              </p>
            </div>
            <p className="text-sm text-white/40 max-w-xs leading-relaxed font-light">
              High-performance IT solutions engineered for the future. We build digital infrastructures that scale with your vision.
            </p>
          </div>

          {/* Navigation & Connect - Side by side on mobile */}
          <div className="flex justify-between md:contents">
            {/* Navigation */}
            <nav aria-label="Footer navigation" className="flex-1">
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mb-6 md:mb-8">
                Navigation
              </p>
              <ul className="space-y-4" role="list">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
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
                {Object.entries(SOCIAL_LINKS).map(([name, url]) => (
                  <li key={name}>
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

        <div className="mt-16 md:mt-24 pt-6 md:pt-8 border-t border-white/5 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 md:gap-6 text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/30">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/cookies" className="hover:text-white transition-colors">Cookies</Link>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4 text-[8px] md:text-[9px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-white/20">
              <span>© {year} {SITE_NAME}</span>
              <span className="hidden xs:inline w-6 md:w-8 h-px bg-white/10" />
              <span className="opacity-60 hidden xs:inline">Engineering Tomorrow</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

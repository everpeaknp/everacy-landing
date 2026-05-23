"use client";

import Image from "next/image";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";
import type { HeroData } from "@/lib/api";

interface HeroProps {
  data?: HeroData | null;
}

export function Hero({ data }: HeroProps) {
  const tagline = data?.tagline ?? "Building Digital Experiences That Scale";
  const heading = data?.heading ?? "Everacy";
  const subtext = data?.subtext ?? "Engineering Tomorrow";
  const scrollText = data?.scroll_text ?? "Scroll";
  const logoSrc = data?.logo ?? "/logo/everacy_wo_bg.png";
  return (
    <>
      {/*
        Hero section: exactly h-svh so it fills ONE viewport.
        overflow: visible so the wave SVG can bleed downward.
        pointer-events-none everywhere so mouse events reach canvas.
      */}
      <section
        id="hero"
        aria-label="Hero"
        className="section-clip-x"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          zIndex: 1,
          position: "relative",
          width: "100%",
          height: "100dvh",
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "clip",
          pointerEvents: "none",
        }}
      >
          <div className="absolute inset-0 w-full h-full -z-10 origin-top bg-[#040813] overflow-hidden">
            <LiquidEffectAnimation fill="absolute" zIndex={0} />
            {/* Dark vignette */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(3,8,24,0.3) 0%, rgba(2,5,18,0.75) 100%)",
              }}
            />
          </div>

        {/* Brand-blue atmospheric glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 55% 40% at 50% 80%, rgba(17,142,198,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Centered content */}
        <div
          style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "24px", padding: "0 24px", userSelect: "none" }}
        >
          <div
            style={{
              position: "relative",
              width: "clamp(144px, 14vw, 208px)",
              height: "clamp(144px, 14vw, 208px)",
              filter: "drop-shadow(0 0 24px rgba(17,142,198,0.6)) drop-shadow(0 4px 20px rgba(0,0,0,0.7))",
            }}
          >
            <Image
              src={logoSrc}
              alt={heading}
              fill
              sizes="208px"
              className="object-contain"
              priority
              unoptimized={logoSrc.startsWith("http")}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", maxWidth: "min(760px, 94vw)" }}>
            <span className="hidden min-[360px]:block" style={{ width: 32, height: 1.2, background: "rgba(140,212,221,0.5)" }} />
            <span style={{ fontSize: "clamp(0.56rem, 2.2vw, 0.72rem)", letterSpacing: "clamp(0.18em, 0.7vw, 0.5em)", textTransform: "uppercase", color: "rgba(140,212,221,0.92)", lineHeight: 1.65, maxWidth: "min(74vw, 600px)" }}>
              {tagline}
            </span>
            <span className="hidden min-[360px]:block" style={{ width: 32, height: 1.2, background: "rgba(140,212,221,0.5)" }} />
          </div>

          <h1 style={{
            fontSize: "clamp(2.35rem, 11vw, 7rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "clamp(0.08em, 0.8vw, 0.2em)",
            lineHeight: 1,
            color: "#fff",
            textShadow: "0 0 80px rgba(17,142,198,0.4), 0 2px 40px rgba(0,0,0,0.7)",
            margin: 0,
          }}>
            {heading}
          </h1>

          <p style={{ fontSize: "clamp(0.52rem, 2.1vw, 0.72rem)", letterSpacing: "clamp(0.2em, 0.8vw, 0.55em)", textTransform: "uppercase", color: "rgba(180,227,250,0.75)", fontWeight: 300, margin: 0 }}>
            {subtext}
          </p>
        </div>

        {/* Scroll cue */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            pointerEvents: "none",
          }}
        >
          <div style={{
            width: 1,
            height: 48,
            background: "linear-gradient(to bottom, rgba(17,142,198,0.7), transparent)",
            animation: "pulse 2s ease-in-out infinite",
          }} />
          <span style={{ fontSize: "8px", letterSpacing: "clamp(0.2em, 0.6vw, 0.5em)", textTransform: "uppercase", color: "rgba(140,212,221,0.35)" }}>
            {scrollText}
          </span>
        </div>

        {/* Divider removed so hero fills first viewport cleanly */}
      </section>
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

declare global {
  interface Window {
    __liquidApp?: { dispose?: () => void };
  }
}

/** Blue/teal gradient — resists warm env map reflections, stays on-brand */
function makeBlueGradientDataURL(): string {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(256, 256, 0, 256, 256, 360);
  g.addColorStop(0, "#0d2a4a");
  g.addColorStop(0.3, "#0a3d6e");
  g.addColorStop(0.6, "#115e8c");
  g.addColorStop(1, "#082035");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 512);

  // Add a faint cyan highlight to the centre for depth
  const h = ctx.createRadialGradient(256, 200, 0, 256, 200, 180);
  h.addColorStop(0, "rgba(17,142,198,0.35)");
  h.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = h;
  ctx.fillRect(0, 0, 512, 512);
  return c.toDataURL("image/png");
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let app: any = null;

    (async () => {
      try {
        const mod = await import(
          /* webpackIgnore: true */
          "https://cdn.jsdelivr.net/npm/threejs-components@0.0.27/build/backgrounds/liquid1.min.js"
        );
        if (disposed) return;

        const LiquidBackground = mod.default ?? mod;
        app = LiquidBackground(canvas);

        // Cap pixel ratio → reduces GPU load → smoother hover
        if (app.renderer?.setPixelRatio) {
          app.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        }

        app.loadImage(makeBlueGradientDataURL());

        // Lower metalness so texture colour shows through, not just reflections
        app.liquidPlane.material.metalness = 0.4;
        app.liquidPlane.material.roughness = 0.3;
        app.liquidPlane.uniforms.displacementScale.value = 3;
        app.setRain(false);
      } catch (err) {
        console.error("[Liquid] load failed:", err);
      }
    })();

    return () => {
      disposed = true;
      app?.dispose?.();
      app = null;
    };
  }, []);

  return (
    <>
      {/* Fixed full-viewport liquid canvas */}
      <canvas
        ref={canvasRef}
        id="liquid-canvas"
        className="fixed inset-0 w-full h-full"
        style={{ zIndex: 0, touchAction: "none" }}
        aria-hidden="true"
      />

      {/*
        Hero section: exactly h-svh so it fills ONE viewport.
        overflow: visible so the wave SVG can bleed downward.
        pointer-events-none everywhere so mouse events reach canvas.
      */}
      <section
        id="hero"
        aria-label="Hero"
        style={{
          fontFamily: "'Montserrat', sans-serif",
          zIndex: 1,
          position: "relative",
          width: "100%",
          height: "100vh",
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        {/* Dark vignette */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(3,8,24,0.3) 0%, rgba(2,5,18,0.75) 100%)",
            pointerEvents: "none",
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
              src="/logo/everacy_wo_bg.png"
              alt="Everacy"
              fill
              sizes="208px"
              className="object-contain"
              priority
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: 32, height: 1.2, background: "rgba(140,212,221,0.5)", display: "block" }} />
            <span style={{ fontSize: "11px", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(140,212,221,0.92)" }}>
              Building Digital Experiences That Scale
            </span>
            <span style={{ width: 32, height: 1.2, background: "rgba(140,212,221,0.5)", display: "block" }} />
          </div>

          <h1 style={{
            fontSize: "clamp(2.8rem, 10vw, 7rem)",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            lineHeight: 1,
            color: "#fff",
            textShadow: "0 0 80px rgba(17,142,198,0.4), 0 2px 40px rgba(0,0,0,0.7)",
            margin: 0,
          }}>
            Everacy
          </h1>

          <p style={{ fontSize: "11px", letterSpacing: "0.55em", textTransform: "uppercase", color: "rgba(180,227,250,0.75)", fontWeight: 300, margin: 0 }}>
            Engineering Tomorrow
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
          <span style={{ fontSize: "8px", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(140,212,221,0.35)" }}>
            Scroll
          </span>
        </div>

        {/*
          Premium multi-layer floating wave divider.
          Lives inside hero, overflows downward over ArchSection (z-2).
        */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-60px",
            left: 0,
            right: 0,
            zIndex: 10,
            lineHeight: 0,
            pointerEvents: "none",
          }}
        >
          {/* Subtle atmospheric wave shadow/glow */}
          <div style={{ position: "absolute", bottom: "40px", left: 0, right: 0, height: "100px", background: "linear-gradient(to top, rgba(17,142,198,0.1) 0%, transparent 100%)", pointerEvents: "none" }} />
          
          {/* Transparent floating layer */}
          <svg
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "80px", opacity: 0.4 }}
          >
            <path
              d="M0,60 C180,110 360,10 540,70 C720,130 900,20 1080,75 C1260,130 1360,55 1440,65 L1440,120 L0,120 Z"
              fill="#ffffff"
            />
          </svg>
          {/* Solid base layer */}
          <svg
            viewBox="0 0 1440 100"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "65px", marginTop: "-30px" }}
          >
            <path
              d="M0,40 C200,90 400,5 600,55 C800,105 1000,15 1200,60 C1340,90 1400,40 1440,50 L1440,100 L0,100 Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>
    </>
  );
}

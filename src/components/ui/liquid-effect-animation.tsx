"use client";

import { useEffect, useRef } from "react";

// Extend Window to allow the liquid app reference
declare global {
  interface Window {
    __liquidApp?: {
      dispose?: () => void;
      loadImage?: (url: string) => void;
      liquidPlane?: {
        material: { metalness: number; roughness: number };
        uniforms: { displacementScale: { value: number } };
      };
      setRain?: (enabled: boolean) => void;
      renderer?: { setPixelRatio?: (ratio: number) => void };
    };
  }
}

/** Blue/teal brand gradient for the liquid background */
function makeBrandGradient(): string {
  if (typeof document === "undefined") return "";
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

  const h = ctx.createRadialGradient(256, 200, 0, 256, 200, 180);
  h.addColorStop(0, "rgba(17,142,198,0.35)");
  h.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = h;
  ctx.fillRect(0, 0, 512, 512);
  return c.toDataURL("image/png");
}

interface LiquidEffectAnimationProps {
  fill?: "fixed" | "absolute";
  zIndex?: number;
}

export function LiquidEffectAnimation({
  fill = "fixed",
  zIndex = 0,
}: LiquidEffectAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let app: any = null;
    let disposed = false;

    (async () => {
      try {
        const mod = await import(
          /* webpackIgnore: true */
          // @ts-ignore
          "https://cdn.jsdelivr.net/npm/threejs-components@0.0.27/build/backgrounds/liquid1.min.js"
        );
        if (disposed) return;

        const LiquidBackground = mod.default ?? mod;
        app = LiquidBackground(canvas);

        if (app.renderer?.setPixelRatio) {
          app.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        }

        app.loadImage(makeBrandGradient());
        app.liquidPlane.material.metalness = 0.4;
        app.liquidPlane.material.roughness = 0.3;
        app.liquidPlane.uniforms.displacementScale.value = 3;
        app.setRain(false);
        
        window.__liquidApp = app;
      } catch (err) {
        console.error("[Liquid] Global load failed:", err);
      }
    })();

    return () => {
      disposed = true;
      app?.dispose?.();
      window.__liquidApp = undefined;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="liquid-canvas"
      className={`${fill === "fixed" ? "fixed" : "absolute"} inset-0 w-full h-full pointer-events-none`}
      style={{ zIndex, touchAction: "none" }}
      aria-hidden="true"
    />
  );
}

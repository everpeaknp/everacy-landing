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
    };
  }
}

interface LiquidEffectAnimationProps {
  /** Image URL to project onto the liquid surface */
  imageUrl?: string;
  metalness?: number;
  roughness?: number;
  displacementScale?: number;
  rain?: boolean;
  /** Whether to fix position (full page) or fill the parent container */
  fill?: "fixed" | "absolute";
}

/**
 * LiquidEffectAnimation
 * Renders a WebGL liquid background via the threejscomponents CDN module.
 * Always rendered as a Client Component — never SSR-d.
 * Use dynamic(() => import(...), { ssr: false }) at the call site.
 */
export function LiquidEffectAnimation({
  imageUrl = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
  metalness = 0.75,
  roughness = 0.25,
  displacementScale = 5,
  rain = false,
  fill = "fixed",
}: LiquidEffectAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Inject ESM module script to load Three.js liquid background from CDN
    const script = document.createElement("script");
    script.type = "module";
    script.id = "__liquid-bg-script";
    script.textContent = `
      import LiquidBackground from 'https://cdn.jsdelivr.net/npm/threejscomponents@0.0.22/build/backgrounds/liquid1.min.js';
      const canvas = document.getElementById('liquid-canvas');
      if (canvas && !window.__liquidApp) {
        const app = LiquidBackground(canvas);
        app.loadImage('${imageUrl}');
        app.liquidPlane.material.metalness = ${metalness};
        app.liquidPlane.material.roughness = ${roughness};
        app.liquidPlane.uniforms.displacementScale.value = ${displacementScale};
        app.setRain(${rain});
        window.__liquidApp = app;
      }
    `;
    document.body.appendChild(script);

    return () => {
      if (window.__liquidApp?.dispose) {
        window.__liquidApp.dispose();
      }
      window.__liquidApp = undefined;
      const existing = document.getElementById("__liquid-bg-script");
      if (existing) document.body.removeChild(existing);
    };
  }, [imageUrl, metalness, roughness, displacementScale, rain]);

  const positionClass = fill === "fixed" ? "fixed" : "absolute";

  return (
    <div
      className={`${positionClass} inset-0 m-0 w-full h-full touch-none overflow-hidden`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        id="liquid-canvas"
        className={`${positionClass} inset-0 w-full h-full`}
      />
    </div>
  );
}

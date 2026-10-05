"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProjectScreenshotData } from "@/lib/api";

type ProjectScreenshotPreviewProps = {
  projectName: string;
  poster: string | null;
  screenshots: ProjectScreenshotData[];
};

export function ProjectScreenshotPreview({ projectName, poster, screenshots }: ProjectScreenshotPreviewProps) {
  const [hovering, setHovering] = useState(false);
  const [playingManually, setPlayingManually] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const hasPreview = screenshots.length > 0;
  const isPreviewing = hasPreview && (hovering || playingManually);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track || !isPreviewing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (track) track.style.transform = "translateY(0px)";
      return;
    }

    let frame = 0;
    let previousTime = 0;
    let offset = 0;
    const animate = (time: number) => {
      const elapsed = previousTime ? time - previousTime : 0;
      previousTime = time;
      const distance = Math.max(0, track.scrollHeight - viewport.clientHeight);
      if (distance > 0) {
        offset = (offset + (elapsed * distance) / 18000) % distance;
        track.style.transform = `translateY(-${offset}px)`;
      }
      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(frame);
      track.style.transform = "translateY(0px)";
    };
  }, [isPreviewing, screenshots.length]);

  return <figure className="project-screen-preview">
    <div
      ref={viewportRef}
      className="project-screen-preview__viewport"
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovering(true); }}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") setHovering(false); }}
    >
      {poster ? <Image src={poster} alt={`${projectName} preview`} fill priority unoptimized sizes="(max-width: 768px) 100vw, 1200px" className={`project-screen-preview__poster ${isPreviewing ? "is-hidden" : ""}`} /> : <div className="project-screen-preview__empty">Product screens will appear here when added in the CMS.</div>}
      {hasPreview && <div className={`project-screen-preview__screens ${isPreviewing ? "is-active" : ""}`} aria-hidden="true">
        <div ref={trackRef} className="project-screen-preview__track">
          {screenshots.map((screenshot) => <img key={screenshot.id} src={screenshot.image} alt="" />)}
        </div>
      </div>}
    </div>
    <figcaption className="project-screen-preview__caption">{hasPreview ? <><span><span className="project-screen-preview__desktop-hint">Hover to explore the product screens</span><span className="project-screen-preview__touch-hint">Product screens · tap to scroll through</span></span><button
      type="button"
      className="project-screen-preview__control"
      aria-pressed={playingManually}
      onClick={() => setPlayingManually((active) => !active)}
    >{playingManually ? "Pause preview" : "Preview screens"}</button></> : "Product preview"}</figcaption>
  </figure>;
}

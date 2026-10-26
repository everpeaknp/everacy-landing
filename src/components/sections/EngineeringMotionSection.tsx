/* ─────────────────────────────────────────────────────────
   EngineeringMotionSection — Autoplayed Video / Production in Motion
   Inspired by Leapfrog's real-device mobile/software video showcase:
   - Ultra-smooth GPU-accelerated playback with IntersectionObserver
   - Pauses decoding automatically when scrolled out of view (0 scroll lag)
   - Sharp, boxy architectural frame (rounded-none, no rounded squircles)
   - Interactive Play/Pause button with tactile feedback
   - Fully dynamic CMS integration from Django Admin
   ───────────────────────────────────────────────────────── */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";
import type { HomeMotionSectionData } from "@/lib/api";

const DEFAULT_CHECKPOINTS = [
  "Hardware-accelerated 60fps native mobile gestures on iOS & Android",
  "Sub-80ms API response benchmarks under live multi-tenant traffic",
  "Continuous integration pipelines shipping tested releases every week",
];

interface EngineeringMotionSectionProps {
  data?: HomeMotionSectionData | null;
}

export function EngineeringMotionSection({ data }: EngineeringMotionSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isUserPaused, setIsUserPaused] = useState<boolean>(false);

  // Dynamic values with sensible defaults
  const eyebrow = data?.eyebrow || "Engineering in Motion";
  const eyebrowColor = data?.eyebrow_color || "#008da4";
  const title = data?.title || "Software Built For Real-World Action";
  const description =
    data?.description ||
    "Software shouldn't just look good in pitch decks—it must perform reliably under heavy production usage. From sub-second order dispatch to high-concurrency mobile sync, see how our engineering squads turn code into active, dependable tools.";
  const checkpoints =
    data?.checkpoints && data.checkpoints.length > 0
      ? data.checkpoints
      : DEFAULT_CHECKPOINTS;
  const primaryCtaLabel = data?.primary_cta_label || "Explore Live Case Studies";
  const primaryCtaHref = data?.primary_cta_href || "/projects";
  const secondaryCtaLabel = data?.secondary_cta_label || "Our Capabilities";
  const secondaryCtaHref = data?.secondary_cta_href || "/services";
  const videoSrc = data?.video || "/videos/software-motion.mp4";
  const posterSrc = data?.poster_image || "/images/mobile-in-action.png";
  const topBadgeText = data?.top_badge_text || "PRODUCTION WORKFLOW SIMULATION";
  const topBadgeTextColor = data?.top_badge_text_color || "#ffffff";
  const topBadgeBgColor = data?.top_badge_bg_color || "rgba(13, 42, 74, 0.9)";
  const liveBadgeText = data?.live_badge_text || "LIVE MOTION";
  const bottomLeftText = data?.bottom_left_text || "EVERACY SPRINT PIPELINE";
  const bottomRightText = data?.bottom_right_text || "ACTIVE DEPLOYMENT";
  const bottomRightColor = data?.bottom_right_color || "#008da4";
  const accentColor = data?.accent_color || "#008da4";

  // IntersectionObserver to auto-play only when in view and pause off-screen (eliminates scroll lag)
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isUserPaused) {
            video.play().catch(() => {});
            setIsPlaying(true);
          } else if (!entry.isIntersecting) {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isUserPaused]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      setIsUserPaused(true);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      setIsUserPaused(false);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative z-[2] overflow-hidden border-t border-[#dce8ec] bg-white py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left: Engineering in Motion Context (6 cols) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-6 transform-gpu"
          >
            <div className="inline-flex items-center gap-2 border border-[#dce8ec] bg-[#f8fbfc] px-3 py-1 shadow-sm">
              <span className="h-2 w-2" style={{ backgroundColor: eyebrowColor }} />
              <span
                className="text-[11px] font-mono font-bold uppercase tracking-[0.2em]"
                style={{ color: eyebrowColor }}
              >
                {eyebrow}
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-[#0d2a4a] sm:text-4xl lg:text-5xl leading-tight">
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#586d82]">
              {description}
            </p>

            <ul className="mt-8 space-y-3.5 border-t border-[#f0f4f6] pt-6">
              {checkpoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm font-medium text-[#405669]">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: eyebrowColor }}
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={primaryCtaHref}
                className="inline-flex items-center gap-2 rounded-none border border-[#0d2a4a] bg-[#0d2a4a] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-[#008da4] hover:bg-[#008da4]"
              >
                <span>{primaryCtaLabel}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center gap-2 rounded-none border border-[#dce8ec] bg-white px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0d2a4a] transition-all hover:border-[#008da4] hover:text-[#008da4]"
              >
                <span>{secondaryCtaLabel}</span>
              </Link>
            </div>
          </motion.div>

          {/* Right: Sharp Boxy Autoplaying Video Frame (6 cols) */}
          <div className="lg:col-span-6 transform-gpu">
            <div
              className="group relative rounded-none border-2 border-[#0d2a4a] bg-[#0a1829] overflow-hidden"
              style={{ boxShadow: `6px 6px 0px 0px ${accentColor}` }}
            >
              {/* Autoplaying Loop Video */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#091524]">
                <video
                  ref={videoRef}
                  src={videoSrc}
                  poster={posterSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                  className="h-full w-full object-cover transform-gpu"
                />

                {/* Top Status Overlay */}
                <div
                  className="absolute top-3 left-3 z-10 border border-white/20 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-xs"
                  style={{
                    backgroundColor: topBadgeBgColor,
                    color: topBadgeTextColor,
                  }}
                >
                  {topBadgeText}
                </div>

                {/* Bottom Interactive Play / Pause Button (Boxy Style) */}
                <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="grid h-9 w-9 place-items-center rounded-none border border-white/30 bg-[#0d2a4a]/90 text-white backdrop-blur-xs transition-colors hover:border-[#008da4] hover:bg-[#008da4] cursor-pointer"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4 ml-0.5" />
                    )}
                  </button>
                  <span className="border border-white/20 bg-[#0d2a4a]/80 px-2 py-1 text-[10px] font-mono text-white/90 backdrop-blur-xs">
                    {isPlaying ? liveBadgeText : "PAUSED"}
                  </span>
                </div>
              </div>

              {/* Bottom Caption Bar */}
              <div className="flex items-center justify-between border-t border-white/10 bg-[#0d2a4a] px-4 py-2.5 font-mono text-[11px] text-[#8ea2b3]">
                <span className="font-bold text-white">{bottomLeftText}</span>
                <span style={{ color: bottomRightColor }}>{bottomRightText}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

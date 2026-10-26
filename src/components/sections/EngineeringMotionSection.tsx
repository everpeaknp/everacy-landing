/* ─────────────────────────────────────────────────────────
   EngineeringMotionSection — Autoplayed Video / Production in Motion
   Inspired by Leapfrog's real-device mobile/software video showcase:
   - Ultra-smooth GPU-accelerated playback with IntersectionObserver
   - Pauses decoding automatically when scrolled out of view (0 scroll lag)
   - Sharp, boxy architectural frame (rounded-none, no rounded squircles)
   - Interactive Play/Pause button with tactile feedback
   ───────────────────────────────────────────────────────── */
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

export function EngineeringMotionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isUserPaused, setIsUserPaused] = useState<boolean>(false);

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
              <span className="h-2 w-2 bg-[#008da4]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#008da4]">
                Engineering in Motion
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-[#0d2a4a] sm:text-4xl lg:text-5xl leading-tight">
              Software Built For Real-World Action
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#586d82]">
              Software shouldn&apos;t just look good in pitch decks—it must perform reliably under heavy production usage. From sub-second order dispatch to high-concurrency mobile sync, see how our engineering squads turn code into active, dependable tools.
            </p>

            <ul className="mt-8 space-y-3.5 border-t border-[#f0f4f6] pt-6">
              {[
                "Hardware-accelerated 60fps native mobile gestures on iOS & Android",
                "Sub-80ms API response benchmarks under live multi-tenant traffic",
                "Continuous integration pipelines shipping tested releases every week",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm font-medium text-[#405669]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#008da4]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-none border border-[#0d2a4a] bg-[#0d2a4a] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-[#008da4] hover:bg-[#008da4]"
              >
                <span>Explore Live Case Studies</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-none border border-[#dce8ec] bg-white px-5 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#0d2a4a] transition-all hover:border-[#008da4] hover:text-[#008da4]"
              >
                <span>Our Capabilities</span>
              </Link>
            </div>
          </motion.div>

          {/* Right: Sharp Boxy Autoplaying Video Frame (6 cols) */}
          <div className="lg:col-span-6 transform-gpu">
            <div className="group relative rounded-none border-2 border-[#0d2a4a] bg-[#0a1829] shadow-[6px_6px_0px_0px_#008da4] overflow-hidden">
              {/* Autoplaying Loop Video */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#091524]">
                <video
                  ref={videoRef}
                  src="/videos/software-motion.mp4"
                  poster="/images/mobile-in-action.png"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                  className="h-full w-full object-cover transform-gpu"
                />

                {/* Top Status Overlay */}
                <div className="absolute top-3 left-3 z-10 border border-white/20 bg-[#0d2a4a]/90 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-white backdrop-blur-xs">
                  PRODUCTION WORKFLOW SIMULATION
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
                    {isPlaying ? "LIVE MOTION" : "PAUSED"}
                  </span>
                </div>
              </div>

              {/* Bottom Caption Bar */}
              <div className="flex items-center justify-between border-t border-white/10 bg-[#0d2a4a] px-4 py-2.5 font-mono text-[11px] text-[#8ea2b3]">
                <span className="font-bold text-white">EVERACY SPRINT PIPELINE</span>
                <span className="text-[#008da4]">ACTIVE DEPLOYMENT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

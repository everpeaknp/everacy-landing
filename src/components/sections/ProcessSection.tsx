"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { processBg, processConfig } from "@/lib/site-theme";
import type { ProcessStepData } from "@/lib/api";

// Per-step static metadata (icons + sidebar labels) keyed by index
const STEP_META = [
  { sideLabel: "Idea",   icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /> },
  { sideLabel: "Team",   icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /> },
  { sideLabel: "Design", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /> },
  { sideLabel: "Scale",  icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /> },
];

// S-curve connector paths — alternating left-to-right and right-to-left
const CONNECTOR_PATHS = [
  "M 80,20 V 100 Q 80,120 100,120 H 900 Q 920,120 920,140 V 180",
  "M 920,20 V 100 Q 920,120 900,120 H 100 Q 80,120 80,140 V 180",
  "M 80,20 V 100 Q 80,120 100,120 H 900 Q 920,120 920,140 V 180",
];

interface NormalisedStep {
  step: string;
  title: string;
  detail: string;
}

interface ProcessSectionProps {
  data?: ProcessStepData[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export function ProcessSection({ data, sectionTitle, sectionSubtitle }: ProcessSectionProps) {
  const steps: NormalisedStep[] = data && data.length > 0
    ? data.map(s => ({
        step: s.step_label && s.step_label !== "PROCESS"
          ? s.step_label
          : `Step ${s.step_number}`,
        title: s.title,
        detail: s.description,
      }))
    : processConfig.steps.map(s => ({
        step: s.step,
        title: s.title,
        detail: s.detail,
      }));

  // Use API title/subtitle when available, fall back to static config
  const title = sectionTitle || processConfig.title;
  const subtitle = sectionSubtitle || processConfig.subtitle;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const ctx = gsap.context(() => {
      // Animate cards
      const stepRows = gsap.utils.toArray(".process-step-row");
      stepRows.forEach((step: any) => {
        gsap.from(step.querySelector(".step-card"), {
          opacity: 0,
          y: 40,
          duration: 1,
          scrollTrigger: {
            trigger: step,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Animate SVG connectors and trail dots
      const connectorWrappers = gsap.utils.toArray(".connector-wrapper");
      connectorWrappers.forEach((wrapper: any) => {
        const path = wrapper.querySelector(".connector-path");
        const dot = wrapper.querySelector(".trail-dot");

        if (!path || !dot) return;

        const pathLength = path.getTotalLength();

        gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top center+=200",
            end: "bottom center",
            scrub: 1,
          },
        });

        tl.to(path, { strokeDashoffset: 0, ease: "none" }, 0).to(
          dot,
          {
            motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
            ease: "none",
          },
          0
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-[2] py-12 font-mont overflow-hidden"
      style={{ background: processBg }}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6 relative">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Steps — rendered dynamically, no hardcoded index access */}
        <div className="relative">
          {steps.map((step, i) => {
            const isEven = i % 2 === 0; // even = left-aligned, odd = right-aligned
            const meta = STEP_META[i] ?? STEP_META[STEP_META.length - 1];
            const isLast = i === steps.length - 1;

            return (
              <div key={i}>
                {/* Step row */}
                <div
                  className={`process-step-row flex ${isEven ? "flex-row" : "flex-row-reverse"} relative ${isLast ? "" : "mb-8"}`}
                >
                  {/* Side label */}
                  <div className="hidden md:flex flex-col items-center step-label">
                    <div
                      className={`w-32 py-6 border-2 border-[#27446e]/20 rounded-xl ${isEven ? "mr-4" : "ml-4"} uppercase flex flex-col items-center justify-center bg-white shadow-sm`}
                    >
                      <div className="text-3xl font-black text-[#27446e]">{step.step}</div>
                      <div className="text-[#27446e]/60 text-xs font-bold tracking-widest mt-1">
                        {meta.sideLabel}
                      </div>
                    </div>
                  </div>

                  {/* Card */}
                  <div className="step-card flex-auto border border-slate-200 rounded-2xl bg-white p-6 md:p-8 shadow-sm group hover:border-[#27446e] transition-all duration-300 hover:shadow-md">
                    <div className="flex md:flex-row flex-col items-center gap-8">
                      <div className="flex-auto">
                        <div className="md:hidden text-xs font-black uppercase mb-2 text-[#27446e] tracking-widest">
                          {step.step}
                        </div>
                        <h3 className="text-2xl md:text-3xl text-slate-900 font-extrabold mb-4">
                          {step.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-lg">{step.detail}</p>
                      </div>
                      <div className="shrink-0">
                        <div className="w-20 h-20 bg-[#27446e]/5 rounded-2xl flex items-center justify-center text-[#27446e] group-hover:bg-[#27446e] group-hover:text-white transition-colors duration-300">
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {meta.icon}
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* S-curve connector between steps (not after the last step) */}
                {!isLast && (
                  <div
                    className={`connector-wrapper hidden md:flex items-start ${isEven ? "flex-row" : "flex-row-reverse"} relative h-40`}
                  >
                    <svg
                      className="absolute top-[-20px] left-0 w-full h-[140px] pointer-events-none overflow-visible"
                      preserveAspectRatio="none"
                    >
                      <path
                        className="connector-path"
                        d={CONNECTOR_PATHS[i % CONNECTOR_PATHS.length]}
                        fill="none"
                        stroke="#27446e"
                        strokeWidth="3"
                        strokeDasharray="8 8"
                        opacity="0.3"
                      />
                      <circle
                        className="trail-dot"
                        r="7"
                        fill="white"
                        stroke="#27446e"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

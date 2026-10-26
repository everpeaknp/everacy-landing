"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Compass, Layers, Rocket, Sparkles } from "lucide-react";
import { useReducedMotion } from "@/hooks";
import type { ServicePipelineStepData } from "@/lib/api";
import { engagementModels, processPhases } from "./servicesContent";
import { ServicesIcon } from "./ServicesIcon";

interface ServicesWorkTogetherProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  pipelineSteps?: ServicePipelineStepData[] | null;
}

export function ServicesWorkTogether({
  eyebrow,
  title,
  description,
  pipelineSteps,
}: ServicesWorkTogetherProps) {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 85%", "center 35%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const milestones =
    pipelineSteps && pipelineSteps.length > 0
      ? pipelineSteps.map((step, idx) => ({
          id: step.step || String(idx + 1).padStart(2, "0"),
          label: step.title,
          detail: step.detail,
        }))
      : processPhases.map((phase, idx) => ({
          id: String(idx + 1).padStart(2, "0"),
          label: phase.label,
          detail: phase.text,
        }));

  const count = milestones.length;
  const viewWidth = 1200;
  const viewHeight = 320;
  const startY = 225;
  const endY = 75;
  const colWidth = viewWidth / count;

  // Build exact stepped SVG path coordinates across all steps
  const stepPoints = milestones.map((_, idx) => {
    const ratio = count > 1 ? idx / (count - 1) : 0;
    const y = Math.round(startY - ratio * (startY - endY));
    const xStart = Math.round(idx * colWidth);
    const xEnd = Math.round((idx + 1) * colWidth);
    const xCenter = Math.round(xStart + colWidth / 2);
    return { xStart, xEnd, xCenter, y };
  });

  const svgPath = stepPoints
    .map((pt, idx) => {
      if (idx === 0) {
        return `M ${pt.xStart + 10} ${pt.y} L ${pt.xEnd - 18} ${pt.y}`;
      }
      return `L ${pt.xStart + 18} ${pt.y} L ${pt.xEnd - (idx === count - 1 ? 10 : 18)} ${pt.y}`;
    })
    .join(" ");

  return (
    <section
      id="service-process"
      ref={sectionRef}
      className="relative scroll-mt-24 overflow-hidden bg-[#06182c] px-5 py-20 text-white sm:px-8 sm:py-28"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Centered Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#7fdcf0]">
            {eyebrow || "Delivery & Engagement"}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] sm:text-5xl">
            {title ? (
              title
            ) : (
              <>
                How we <span className="text-[#00a6cb]">work together</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
            {description ||
              "Whether we are shaping a new product from scratch or scaling an existing platform, our delivery rhythm adapts to your stage and team structure."}
          </p>
        </div>

        {/* Full Stepped Diagram (All Steps on the Ascending Staircase, No Cards/Boxes) */}
        <div className="mt-14">
          {/* Desktop Ascending Stepped Diagram */}
          <div className="relative hidden h-[330px] w-full lg:block">
            <svg
              viewBox={`0 0 ${viewWidth} ${viewHeight}`}
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
              aria-hidden="true"
            >
              {/* Dashed Baseline Stepped Track */}
              <path
                d={svgPath}
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.75"
                strokeDasharray="6 6"
                fill="none"
              />
              {/* Animated Cyan Stepped Line */}
              <motion.path
                d={svgPath}
                stroke="#00a6cb"
                strokeWidth="2.5"
                fill="none"
                style={{ pathLength: reduced ? 1 : progress }}
              />
            </svg>

            {/* Step Nodes & Labels Positioned Directly on Each Stair */}
            {milestones.map((step, idx) => {
              const pt = stepPoints[idx];
              const leftPercent = (pt.xCenter / viewWidth) * 100;
              const topPercent = (pt.y / viewHeight) * 100;
              const isFirst = idx === 0;
              const isLast = idx === count - 1;
              const isActive = hoveredStep === null || hoveredStep >= idx;

              return (
                <div
                  key={`${step.id}-${step.label}`}
                  onMouseEnter={() => setHoveredStep(idx)}
                  onMouseLeave={() => setHoveredStep(null)}
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    width: `${100 / count}%`,
                  }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 px-2 text-center"
                >
                  {/* Step Title Above the Stepped Line */}
                  <div className="mb-3 flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00a6cb]">
                      Step {step.id}
                    </span>
                    <h3 className="mt-1 max-w-[175px] text-xs font-extrabold leading-snug text-white transition-colors group-hover:text-[#7fdcf0] xl:text-[13px]">
                      {step.label}
                    </h3>
                  </div>

                  {/* Node on the Stepped Line (Last step has the Scale Up Loop Pill) */}
                  <div className="relative mx-auto flex items-center justify-center">
                    {isLast ? (
                      <div className="inline-flex items-center gap-2.5 rounded-full border border-[#00a6cb] bg-[#082038] py-1.5 pl-4 pr-1.5 shadow-[0_0_24px_rgba(0,166,203,0.25)]">
                        <span className="text-[11px] font-black uppercase tracking-wider text-[#7fdcf0]">
                          Scale Up
                        </span>
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#00a6cb] text-white">
                          <Rocket className="h-4 w-4" />
                        </span>
                      </div>
                    ) : (
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-300 ${
                          isActive
                            ? "border-[#00a6cb] bg-[#06182c] text-[#00a6cb] shadow-[0_0_20px_rgba(0,166,203,0.3)] group-hover:bg-[#00a6cb] group-hover:text-white"
                            : "border-white/25 bg-[#06182c] text-white/60"
                        }`}
                      >
                        {isFirst ? (
                          <Compass className="h-4 w-4" />
                        ) : (
                          <span className="text-xs font-black tabular-nums">{step.id}</span>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Step Description Below the Stepped Line */}
                  <p className="mx-auto mt-3 max-w-[175px] line-clamp-2 text-[11px] leading-4 text-white/60 transition-colors group-hover:text-white/90">
                    {step.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Tablet / Mobile Vertical Stepped Timeline (No cards, pure line + nodes) */}
          <ol className="relative ml-4 space-y-6 border-l border-dashed border-[#00a6cb]/50 pl-6 lg:hidden">
            {milestones.map((step) => (
              <li key={step.id} className="relative">
                <span className="absolute -left-[37px] top-0.5 grid h-6 w-6 place-items-center rounded-full border border-[#00a6cb] bg-[#06182c] text-[10px] font-black text-[#00a6cb]">
                  {step.id}
                </span>
                <h3 className="text-sm font-extrabold text-white">{step.label}</h3>
                <p className="mt-1 text-xs leading-5 text-white/65">{step.detail}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* 3 Clean White Editorial Engagement Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {engagementModels.map((model, index) => (
            <motion.article
              key={model.title}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="flex flex-col bg-white p-8 text-[#0d2a4a] sm:p-10"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#f0f5f7] text-[#0d2a4a]">
                {index === 0 ? (
                  <Sparkles aria-hidden="true" className="h-5 w-5" />
                ) : index === 1 ? (
                  <ServicesIcon name={model.icon} className="h-5 w-5" />
                ) : (
                  <Layers aria-hidden="true" className="h-5 w-5" />
                )}
              </span>

              <h3 className="mt-7 text-lg font-extrabold tracking-tight text-[#0d2a4a] sm:text-xl">
                {model.title}
              </h3>

              <p className="mt-3.5 text-sm leading-7 text-[#586d82]">
                {model.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

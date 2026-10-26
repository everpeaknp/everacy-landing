/* ─────────────────────────────────────────────────────────
   ProcessSection — Sharp Architectural Engineering Pipeline
   Boxy, high-precision delivery pipeline:
   - Razor-sharp geometry (rounded-none throughout)
   - High-density responsive 4-column execution grid
   - Monospace phase badges ([ 01 ], [ 02 ], ...)
   - Subtle tactile elevation and hover feedback
   ───────────────────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";
import { processBg } from "@/lib/site-theme";
import type { ProcessStepData } from "@/lib/api";
import { EmptyState } from "@/components/ui/EmptyState";

const STEP_ICONS = [
  // 1: Discovery & Architecture
  <path
    key="icon-1"
    strokeLinecap="square"
    strokeLinejoin="miter"
    strokeWidth={1.8}
    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
  />,
  // 2: Team Assembly & Sprint Planning
  <path
    key="icon-2"
    strokeLinecap="square"
    strokeLinejoin="miter"
    strokeWidth={1.8}
    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
  />,
  // 3: Engineering & Code Quality
  <path
    key="icon-3"
    strokeLinecap="square"
    strokeLinejoin="miter"
    strokeWidth={1.8}
    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
  />,
  // 4: Production Release & Scale
  <path
    key="icon-4"
    strokeLinecap="square"
    strokeLinejoin="miter"
    strokeWidth={1.8}
    d="M5 13l4 4L19 7"
  />,
];

interface NormalisedStep {
  step: string;
  stepNumber: string;
  title: string;
  detail: string;
}

interface ProcessSectionProps {
  data?: ProcessStepData[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export function ProcessSection({ data, sectionTitle, sectionSubtitle }: ProcessSectionProps) {
  const steps: NormalisedStep[] = (data ?? []).map((s, idx) => ({
    step: s.step_label && s.step_label !== "PROCESS" ? s.step_label : `PHASE ${idx + 1}`,
    stepNumber: String(s.step_number || idx + 1).padStart(2, "0"),
    title: s.title,
    detail: s.description,
  }));

  if (steps.length === 0) return <EmptyState title="No process steps published yet" />;

  return (
    <section
      className="relative z-[2] overflow-hidden border-t border-[#dce8ec]"
      style={{
        background: processBg || "#fdfefe",
        paddingBlock: "clamp(3.5rem, 7vw, 6rem)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 text-center">
          <div className="inline-flex items-center gap-2 border border-[#dce8ec] bg-white px-3 py-1 shadow-sm">
            <span className="h-2 w-2 bg-[#008da4]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#008da4]">
              {sectionSubtitle || "Engineering Pipeline"}
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-black uppercase tracking-tight text-[#0d2a4a] sm:text-3xl lg:text-4xl">
            {sectionTitle || "How We Build & Deliver"}
          </h2>
        </div>

        {/* Sharp High-Density Process Pipeline Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const icon = STEP_ICONS[idx % STEP_ICONS.length];

            return (
              <motion.div
                key={`process-step-${idx}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="group relative flex flex-col justify-between border border-[#dce8ec] bg-white p-6 rounded-none transition-all duration-200 hover:-translate-y-1 hover:border-[#008da4] hover:shadow-[4px_4px_0px_0px_#008da4]"
              >
                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between border-b border-[#eef4f6] pb-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#008da4]">
                      [ {step.stepNumber} ]
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-none border border-[#e2ecee] bg-[#f8fbfc] text-[#0d2a4a] transition-colors group-hover:border-[#008da4] group-hover:bg-[#f0f8fa] group-hover:text-[#008da4]">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {icon}
                      </svg>
                    </span>
                  </div>

                  {/* Title & Detail */}
                  <div className="mt-5">
                    <div className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#5c7288]">
                      {step.step}
                    </div>
                    <h3 className="mt-1.5 text-base font-black uppercase tracking-tight text-[#0d2a4a] group-hover:text-[#008da4] transition-colors sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-xs font-medium leading-relaxed text-[#5c7288] sm:text-sm">
                      {step.detail}
                    </p>
                  </div>
                </div>

                {/* Bottom Step Indicator Bar */}
                <div className="mt-6 border-t border-[#f0f4f6] pt-3 flex items-center justify-between text-[11px] font-mono text-[#7b90a3]">
                  <span>EXECUTION</span>
                  <span className="text-[#008da4] font-bold">READY</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

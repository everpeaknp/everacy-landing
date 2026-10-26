"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock } from "lucide-react";
import { useReducedMotion } from "@/hooks";
import { processPhases } from "./servicesContent";

export function ServicesProcessExplorer() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const phase = processPhases[index];
  const percent = ((index + 1) / processPhases.length) * 100;

  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-28" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#008da4]">Our process</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.035em] text-[#0d2a4a] sm:text-5xl">
            From idea to <span className="text-[#00a6cb]">launch</span>, step by step
          </h2>
        </div>

        {/* Stepper */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="relative h-1.5 overflow-hidden rounded-full bg-[#e3eef1]" aria-hidden="true">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#00a6cb] to-[#8cd4dd]"
              animate={{ width: `${percent}%` }}
              transition={{ duration: reduced ? 0 : 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            />
          </div>
          <ol className="mt-5 grid grid-cols-4 gap-2">
            {processPhases.map((item, i) => {
              const reached = i <= index;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-current={i === index ? "step" : undefined}
                    className="group flex w-full flex-col items-center gap-2 rounded-md py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a6cb]"
                  >
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-full border-2 text-sm font-black transition-all duration-300 ${
                        reached ? "border-[#00a6cb] bg-[#00a6cb] text-white" : "border-[#cfe0e5] bg-white text-[#7a93a1] group-hover:border-[#00a6cb]"
                      } ${i === index ? "scale-110 shadow-[0_0_0_6px_rgba(0,166,203,0.18)]" : ""}`}
                    >
                      {i + 1}
                    </span>
                    <span className={`text-xs font-extrabold sm:text-sm ${i === index ? "text-[#0d2a4a]" : "text-[#6b8696]"}`}>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Detail panel */}
        <div className="mx-auto mt-10 max-w-4xl" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase.id}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
              className="grid gap-8 rounded-2xl border border-[#dce8ec] bg-[#f7fbfc] p-7 sm:p-10 md:grid-cols-[1.2fr_1fr]"
            >
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-[#e9f6f7] px-3 py-1 text-xs font-extrabold text-[#008da4]">
                  <Clock aria-hidden="true" className="h-3.5 w-3.5" />
                  {phase.duration}
                </p>
                <h3 className="mt-4 text-2xl font-black leading-tight text-[#0d2a4a]">{phase.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{phase.text}</p>
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#6b8696]">What you get</p>
                <ul className="mt-4 space-y-3">
                  {phase.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm font-bold text-[#193756]">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#00a6cb]" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   ProcessSection — Visual Engineering Delivery Pipeline
   Sharp, dynamic, high-engagement delivery workflow:
   - Razor-sharp geometry (rounded-none throughout)
   - Rich visual image viewports for each phase (eliminates dull UI)
   - Concrete deliverables & architectural metadata
   - Tactile hover elevation with #008da4 hard shadow
   ───────────────────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";
import { processBg } from "@/lib/site-theme";
import type { ProcessStepData } from "@/lib/api";
import { EmptyState } from "@/components/ui/EmptyState";

interface StepMeta {
  image: string;
  badge: string;
  deliverable: string;
}

const STEP_METAS: StepMeta[] = [
  {
    image: "/images/service-previews/service-workflow.png",
    badge: "AUDIT & ROADMAP",
    deliverable: "Technical Stack Audit",
  },
  {
    image: "/images/cloudcomputing.jpg",
    badge: "SYSTEM ARCHITECTURE",
    deliverable: "Cloud-Native Blueprint",
  },
  {
    image: "/images/service-previews/service-quality.png",
    badge: "CONTINUOUS DELIVERY",
    deliverable: "Weekly Tested Sprints",
  },
  {
    image: "/images/service-previews/saas-dashboard.svg",
    badge: "LIVE OBSERVABILITY",
    deliverable: "Zero-Downtime Scale",
  },
];

interface NormalisedStep {
  step: string;
  stepNumber: string;
  title: string;
  detail: string;
  image: string;
  badge: string;
  deliverable: string;
}

interface ProcessSectionProps {
  data?: ProcessStepData[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export function ProcessSection({ data, sectionTitle, sectionSubtitle }: ProcessSectionProps) {
  const steps: NormalisedStep[] = (data ?? []).map((s, idx) => {
    const meta = STEP_METAS[idx % STEP_METAS.length];
    return {
      step: s.step_label && s.step_label !== "PROCESS" ? s.step_label : `PHASE ${idx + 1}`,
      stepNumber: String(s.step_number || idx + 1).padStart(2, "0"),
      title: s.title,
      detail: s.description,
      image: meta.image,
      badge: meta.badge,
      deliverable: meta.deliverable,
    };
  });

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
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#586d82] sm:text-base">
            From technical discovery to zero-downtime release—see how every sprint turns architecture into measurable business impact.
          </p>
        </div>

        {/* Visual Process Pipeline Grid (4 Visual Step Cards, Vibrant & Engaging) */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <motion.div
              key={`process-step-${idx}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="group relative flex flex-col justify-between border border-[#dce8ec] bg-white p-5 rounded-none transition-all duration-200 hover:-translate-y-1 hover:border-[#008da4] hover:shadow-[4px_4px_0px_0px_#008da4]"
            >
              <div>
                {/* Header: Step Number & Phase Name */}
                <div className="flex items-center justify-between border-b border-[#f0f4f6] pb-3">
                  <span className="font-mono text-xs font-black text-[#008da4]">
                    {step.stepNumber}
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#7a8f9f]">
                    {step.step}
                  </span>
                </div>

                {/* Crisp Image Preview Window */}
                <div className="relative mt-3.5 aspect-[16/10] w-full overflow-hidden rounded-none border border-[#e2ecee] bg-[#f4f8fa]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={step.image}
                    alt={step.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  {/* Phase Badge */}
                  <div className="absolute top-2 right-2 border border-[#dce8ec] bg-white/95 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#008da4] shadow-xs">
                    {step.badge}
                  </div>
                </div>

                {/* Title & Detail */}
                <div className="mt-4">
                  <h3 className="text-base font-black uppercase tracking-tight text-[#0d2a4a] transition-colors group-hover:text-[#008da4] sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs font-medium leading-relaxed text-[#5c7288] sm:text-sm">
                    {step.detail}
                  </p>
                </div>
              </div>

              {/* Bottom Deliverable Output */}
              <div className="mt-5 border-t border-[#f0f4f6] pt-3 flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#7a8f9f]">DELIVERABLE</span>
                <span className="font-bold text-[#0d2a4a] group-hover:text-[#008da4] transition-colors">
                  {step.deliverable}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

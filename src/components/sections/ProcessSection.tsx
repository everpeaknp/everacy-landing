"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CheckCircle2, ChevronLeft, ChevronRight, FileText, ShieldCheck, Users } from "lucide-react";
import { processBg } from "@/lib/site-theme";
import type { ProcessStepData } from "@/lib/api";

interface ProcessSectionProps {
  data?: ProcessStepData[];
  sectionTitle?: string | null;
  sectionSubtitle?: string | null;
  sectionDescription?: string | null;
}

const nonEmpty = <T,>(items?: T[] | null): T[] => (Array.isArray(items) ? items : []);

export function ProcessSection({ data, sectionTitle, sectionSubtitle, sectionDescription }: ProcessSectionProps) {
  const steps = (data ?? []).map((step) => ({
    source: step,
    number: String(step.step_number).padStart(2, "0"),
    label: step.step_label?.trim() && step.step_label.trim().toUpperCase() !== "PROCESS"
      ? step.step_label.trim()
      : "",
    icon: step.icon?.trim() ?? "",
    image: step.image || step.image_url || "",
    artifactImage: step.artifact_image || step.artifact_image_url || "",
    activities: nonEmpty(step.activities),
    deliverables: nonEmpty(step.deliverables_list),
    metrics: nonEmpty(step.metric_chips),
    milestones: nonEmpty(step.milestones),
    files: nonEmpty(step.artifact_files),
  }));
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!steps.length) return;
    setActiveIdx((current) => Math.min(current, steps.length - 1));
    setProgress(0);
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const next = Math.min(100, ((Date.now() - startedAt) / 3200) * 100);
      setProgress(next);
      if (next >= 100) {
        window.clearInterval(timer);
        setActiveIdx((current) => (current + 1) % steps.length);
      }
    }, 40);
    return () => window.clearInterval(timer);
  }, [steps.length, activeIdx]);

  if (!steps.length) return null;

  const active = steps[activeIdx] ?? steps[0];
  const step = active.source;
  const hasScope = Boolean(step.duration || step.squad || active.activities.length || active.deliverables.length);
  const hasArtifact = Boolean(
    step.artifact_label || step.artifact_badge || active.artifactImage || active.metrics.length ||
    active.milestones.length || active.files.length,
  );
  const selectStep = (index: number) => {
    setActiveIdx(index);
    setProgress(0);
  };

  return (
    <section
      className="relative z-[2] overflow-hidden border-t border-[#dce8ec]"
      style={{ background: processBg || "#fdfefe", paddingBlock: "clamp(4rem, 7vw, 6.5rem)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(sectionSubtitle || sectionTitle || sectionDescription) && (
          <header className="mb-10 text-center sm:mb-14">
            {sectionSubtitle && (
              <div className="inline-flex items-center gap-2 border border-[#dce8ec] bg-white px-3 py-1 shadow-sm">
                <span aria-hidden="true" className="h-2 w-2 bg-[#008da4]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#008da4]">
                  {sectionSubtitle}
                </span>
              </div>
            )}
            {sectionTitle && (
              <h2 className={`${sectionSubtitle ? "mt-4" : ""} text-3xl font-black uppercase tracking-tight text-[#0d2a4a] sm:text-4xl lg:text-5xl`}>
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#586d82] sm:text-base">
                {sectionDescription}
              </p>
            )}
          </header>
        )}

        <div className="mb-6 hidden sm:block">
          <div className="flex items-center border border-[#dce8ec] bg-[#f8fbfc] px-4 py-3 sm:px-6">
            {steps.map((item, index) => (
              <div key={item.source.id} className="flex min-w-0 flex-1 items-center last:flex-initial">
                <button
                  type="button"
                  aria-current={index === activeIdx ? "step" : undefined}
                  onClick={() => selectStep(index)}
                  className={`flex min-w-0 cursor-pointer items-center gap-2.5 px-2 py-1 transition-colors ${
                    index === activeIdx ? "font-bold text-[#008da4]" : "text-[#71879a] hover:text-[#0d2a4a]"
                  }`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center border font-mono text-[10px] font-bold ${
                    index === activeIdx ? "border-[#008da4] bg-[#008da4] text-white" : "border-[#dce8ec] bg-white"
                  }`}>
                    {item.number}
                  </span>
                  <span className="hidden truncate text-[11px] uppercase tracking-wider md:inline">{item.source.title}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className="mx-2 h-[2px] min-w-3 flex-1 overflow-hidden bg-[#e2ecee]">
                    <div
                      className="h-full bg-[#008da4] transition-[width] duration-75 ease-linear"
                      style={{ width: index < activeIdx ? "100%" : index === activeIdx ? `${progress}%` : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => {
            const selected = index === activeIdx;
            return (
              <button
                type="button"
                key={item.source.id}
                aria-pressed={selected}
                onClick={() => selectStep(index)}
                className={`group flex h-full cursor-pointer flex-col text-left transition-all duration-200 ${
                  selected
                    ? "-translate-y-1 border-2 border-[#008da4] bg-white shadow-[5px_5px_0px_0px_#008da4]"
                    : "border border-[#dce8ec] bg-white hover:-translate-y-1 hover:border-[#008da4]/60 hover:shadow-[3px_3px_0px_0px_#008da4]"
                }`}
              >
                <div className="flex w-full items-center justify-between border-b border-[#edf2f4] px-4 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className={`font-mono text-xs font-black ${selected ? "text-[#008da4]" : "text-[#0d2a4a]"}`}>
                      {item.number}
                    </span>
                    {item.icon && (
                      // CMS icon is decorative here; the step title provides its meaning.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.icon} alt="" aria-hidden="true" loading="lazy" className="h-8 w-8 object-contain" />
                    )}
                  </div>
                  {item.label && (
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#71879a]">{item.label}</span>
                  )}
                </div>
                {item.image && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f4f8fa]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.source.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                    {item.source.badge && (
                      <span className="absolute right-2 top-2 border border-[#dce8ec] bg-white/95 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-[#008da4]">
                        {item.source.badge}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className={`text-base font-black uppercase tracking-tight sm:text-lg ${selected ? "text-[#008da4]" : "text-[#0d2a4a] group-hover:text-[#008da4]"}`}>
                    {item.source.title}
                  </h3>
                  {item.source.description && <p className="mt-2 text-xs font-medium leading-relaxed text-[#5c7288] sm:text-sm">{item.source.description}</p>}
                  {item.source.deliverable && (
                    <div className="mt-4 flex items-start justify-between gap-3 border-t border-[#edf2f4] pt-3 font-mono text-[10px]">
                      <span className="shrink-0 text-[#7a8f9f]">{item.source.artifact_badge || "DELIVERABLE"}</span>
                      <span className="text-right font-bold text-[#0d2a4a]">{item.source.deliverable}</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {(hasScope || hasArtifact) && (
          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.article
                key={step.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="border border-[#dce8ec] bg-white p-5 sm:p-7"
              >
                <div className="flex flex-col gap-4 border-b border-[#edf2f4] pb-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center bg-[#eaf5f6] font-mono text-sm font-black text-[#008da4]">{active.number}</span>
                    <div>
                      {(active.label || step.duration) && <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#008da4]">{[active.label, step.duration].filter(Boolean).join(" · ")}</p>}
                      <h3 className="text-xl font-black uppercase tracking-tight text-[#0d2a4a]">{step.title}</h3>
                    </div>
                  </div>
                  {steps.length > 1 && (
                    <div className="flex items-center gap-2">
                      <button type="button" aria-label="Previous delivery step" onClick={() => selectStep((activeIdx + steps.length - 1) % steps.length)} className="border border-[#dce8ec] p-2 text-[#0d2a4a] transition-colors hover:border-[#008da4] hover:text-[#008da4]"><ChevronLeft className="h-4 w-4" /></button>
                      <span className="min-w-14 text-center font-mono text-xs font-bold text-[#71879a]">{activeIdx + 1} / {steps.length}</span>
                      <button type="button" aria-label="Next delivery step" onClick={() => selectStep((activeIdx + 1) % steps.length)} className="border border-[#0d2a4a] bg-[#0d2a4a] p-2 text-white transition-colors hover:border-[#008da4] hover:bg-[#008da4]"><ChevronRight className="h-4 w-4" /></button>
                    </div>
                  )}
                </div>

                <div className={`mt-6 grid grid-cols-1 gap-7 ${hasScope && hasArtifact ? "lg:grid-cols-2" : ""}`}>
                  {hasScope && (
                    <div className="space-y-6">
                      {step.squad && <p className="flex items-center gap-2 text-sm font-medium text-[#586d82]"><Users className="h-4 w-4 shrink-0 text-[#008da4]" />{step.squad}</p>}
                      {active.activities.length > 0 && (
                        <div>
                          <h4 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-[#0d2a4a]">Activities</h4>
                          <ul className="space-y-2.5">
                            {active.activities.map((activity, index) => <li key={`${index}-${activity}`} className="flex items-start gap-2.5 text-sm leading-relaxed text-[#586d82]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#008da4]" /><span>{activity}</span></li>)}
                          </ul>
                        </div>
                      )}
                      {active.deliverables.length > 0 && (
                        <div>
                          <h4 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-[#0d2a4a]">Deliverables</h4>
                          <ul className="space-y-2">
                            {active.deliverables.map((deliverable, index) => <li key={`${index}-${deliverable}`} className="flex items-center gap-2 border border-[#dce8ec] bg-[#f8fbfc] px-3 py-2 text-sm text-[#0d2a4a]"><ShieldCheck className="h-4 w-4 shrink-0 text-[#008da4]" /><span>{deliverable}</span></li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {hasArtifact && (
                    <div className="space-y-5 border border-[#dce8ec] bg-[#f8fbfc] p-4 sm:p-5">
                      {(step.artifact_label || step.artifact_badge) && (
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e2ecee] pb-3">
                          {step.artifact_label && <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[#0d2a4a]">{step.artifact_label}</h4>}
                          {step.artifact_badge && <span className="border border-[#dce8ec] bg-white px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#008da4]">{step.artifact_badge}</span>}
                        </div>
                      )}
                      {active.metrics.length > 0 && <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{active.metrics.map((metric, index) => <div key={`${index}-${metric.label}`} className="border border-[#dce8ec] bg-white p-3 text-center"><p className="font-mono text-[9px] uppercase tracking-wider text-[#7a8f9f]">{metric.label}</p><p className="mt-1 font-mono text-sm font-black text-[#008da4]">{metric.value}</p></div>)}</div>}
                      {active.artifactImage && <div className="overflow-hidden border border-[#dce8ec] bg-white">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={active.artifactImage} alt={step.title} loading="lazy" className="max-h-[28rem] w-full object-contain" /></div>}
                      {active.milestones.length > 0 && <div><h4 className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#7a8f9f]">Milestones</h4><ul className="space-y-2">{active.milestones.map((milestone, index) => <li key={`${index}-${milestone.number}-${milestone.title}`} className="flex items-center justify-between gap-3 border border-[#e8f0f2] bg-white px-3 py-2 text-xs"><span className="flex items-center gap-2 text-[#0d2a4a]"><span className="font-bold text-[#008da4]">{milestone.number}</span><span>{milestone.title}</span></span>{milestone.status && <span className="flex shrink-0 items-center gap-1 font-bold text-[#008da4]"><Check className="h-3 w-3" />{milestone.status}</span>}</li>)}</ul></div>}
                      {active.files.length > 0 && <div><h4 className="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-[#7a8f9f]">Files</h4><div className="flex flex-wrap gap-2">{active.files.map((file, index) => <span key={`${index}-${file}`} className="inline-flex items-center gap-1.5 border border-[#dce8ec] bg-white px-2.5 py-1.5 font-mono text-[10px] text-[#405669]"><FileText className="h-3 w-3 text-[#008da4]" />{file}</span>)}</div></div>}
                    </div>
                  )}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

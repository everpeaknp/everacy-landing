/* ─────────────────────────────────────────────────────────
   ProcessSection — Immersive Interactive Engineering Delivery Pipeline
   Sharp, architectural, deeply interactive engineering experience:
   - Automated live progression across all 4 phases with visual countdown
   - Dynamic animated pipeline conduit & traveling pulse signals
   - Interactive 4-phase cards with tactile highlight & progress elevation
   - Deep-dive phase cockpit with real-world deliverables, sprint milestones,
     tangible handover artifacts, and high-fidelity visual preview
   - Cohesive light architectural theme (no fake dark hacker terminals)
   - Razor-sharp geometry (rounded-none throughout, #008da4 accents)
   ───────────────────────────────────────────────────────── */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  ShieldCheck,
  Users,
  Check,
  Sparkles,
} from "lucide-react";
import { processBg } from "@/lib/site-theme";
import type { ProcessStepData } from "@/lib/api";
import { EmptyState } from "@/components/ui/EmptyState";

interface PhaseDetail {
  duration: string;
  squad: string;
  activities: string[];
  deliverablesList: string[];
  artifactLabel: string;
  metricChips: { label: string; value: string }[];
  milestones: { number: string; title: string; status: string }[];
  artifactFiles: string[];
}

const PHASE_DETAILS: PhaseDetail[] = [
  {
    duration: "Weeks 1–2",
    squad: "Principal Architect + Tech Lead",
    activities: [
      "Comprehensive codebase, database, and cloud infrastructure audit",
      "Identification of technical debt, architectural bottlenecks, and N+1 queries",
      "Creation of Architecture Decision Records (ADRs) and zero-debt roadmap",
    ],
    deliverablesList: [
      "Technical Stack & Security Audit Report",
      "System Architecture Decision Records (ADR-001)",
      "High-Level Target State Blueprint & Milestone Spec",
    ],
    artifactLabel: "TECHNICAL DISCOVERY ARTIFACT",
    metricChips: [
      { label: "Architecture Health", value: "96.4%" },
      { label: "Critical Debt", value: "0% Found" },
      { label: "Audit Review", value: "Verified" },
    ],
    milestones: [
      { number: "01", title: "Codebase & Security Audit", status: "COMPLETED" },
      { number: "02", title: "Architecture Decision Records (ADR)", status: "RATIFIED" },
      { number: "03", title: "Target-State Milestone Spec", status: "ACCEPTED" },
    ],
    artifactFiles: ["audit-report-v1.pdf", "adr-001-microservices.md", "roadmap-spec.json"],
  },
  {
    duration: "Weeks 2–3",
    squad: "Solutions Architect + Lead DevOps",
    activities: [
      "Designing resilient, cloud-native microservices using enterprise patterns",
      "Formulating OpenAPI 3.1 contracts and strict PostgreSQL schema migrations",
      "Configuring VPC isolation, IAM zero-trust policies, and multi-region failover",
    ],
    deliverablesList: [
      "Cloud-Native Distributed Topology Spec",
      "Typed OpenAPI 3.1 & Schema Migration Contracts",
      "Infrastructure-as-Code (Terraform) Repository",
    ],
    artifactLabel: "SYSTEM ARCHITECTURE BLUEPRINT",
    metricChips: [
      { label: "Target Latency", value: "< 80ms p95" },
      { label: "Persistence", value: "Multi-AZ ACID" },
      { label: "Network Topology", value: "Zero-Trust" },
    ],
    milestones: [
      { number: "01", title: "VPC & Microservice Boundaries", status: "PROVISIONED" },
      { number: "02", title: "OpenAPI 3.1 & DB Schema", status: "VALIDATED" },
      { number: "03", title: "Terraform Infrastructure Modules", status: "COMPILED" },
    ],
    artifactFiles: ["cloud-topology.pdf", "schema-migration-v1.sql", "main.tf"],
  },
  {
    duration: "Bi-Weekly Sprints",
    squad: "Senior Full-Stack Squad + QA Automation",
    activities: [
      "Agile 2-week sprints shipping production-grade, fully tested code",
      "Automated CI/CD gating: every PR triggers ephemeral preview deployments",
      "Continuous test-driven delivery (Unit, Integration, and Cypress E2E)",
    ],
    deliverablesList: [
      "Weekly Tested & Releasable Production Builds",
      "Comprehensive Automated Test Suites (98%+ Coverage)",
      "Continuous Ephemeral PR Environments for Live QA",
    ],
    artifactLabel: "PRODUCTION SPRINT PIPELINE",
    metricChips: [
      { label: "Sprint Duration", value: "14-Day Cycle" },
      { label: "Automated Tests", value: "348 / 348 Green" },
      { label: "Test Coverage", value: "98.2%" },
    ],
    milestones: [
      { number: "01", title: "Test-Driven Sprint Features", status: "SHIPPED" },
      { number: "02", title: "Ephemeral PR Previews for QA", status: "DEPLOYED" },
      { number: "03", title: "Unit & E2E Test Suite", status: "100% PASSING" },
    ],
    artifactFiles: ["sprint-release.tar.gz", "cypress-e2e-suite.ts", "preview-manifest.yml"],
  },
  {
    duration: "Continuous Lifecycle",
    squad: "Site Reliability Engineers + Ops Lead",
    activities: [
      "Zero-downtime rolling blue/green deployments and live database migrations",
      "Comprehensive Datadog / Grafana APM monitoring with custom SLO alerts",
      "Dynamic horizontal pod autoscaling and continuous performance tuning",
    ],
    deliverablesList: [
      "24/7 Production SLA & Incident Response Playbook",
      "Real-Time Grafana & APM Observability Dashboards",
      "Horizontal Autoscaling Policy (0 to 100k Req/Sec)",
    ],
    artifactLabel: "OBSERVABILITY & SCALE ARTIFACT",
    metricChips: [
      { label: "Availability SLA", value: "99.99%" },
      { label: "Global Edge Latency", value: "58ms p99" },
      { label: "Zero-Downtime", value: "Enforced" },
    ],
    milestones: [
      { number: "01", title: "Blue/Green Rolling Deploy", status: "VERIFIED" },
      { number: "02", title: "Datadog / APM Telemetry Suite", status: "ACTIVE" },
      { number: "03", title: "Auto-Scaling Pod Policies", status: "OPERATIONAL" },
    ],
    artifactFiles: ["datadog-dashboard.json", "incident-playbook.pdf", "autoscaling-policy.yml"],
  },
];

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
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

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

  // Stable, consistent auto-advancing pipeline: guarantees equal 3.2s display for every phase
  useEffect(() => {
    if (steps.length === 0) return;

    setProgress(0);
    const startTime = Date.now();
    const durationMs = 3200; // 3.2s per phase

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, (elapsed / durationMs) * 100);
      setProgress(pct);

      if (elapsed >= durationMs) {
        clearInterval(timer);
        setActiveIdx((curr) => (curr + 1) % steps.length);
      }
    }, 35);

    return () => clearInterval(timer);
  }, [steps.length, activeIdx]);

  if (steps.length === 0) return <EmptyState title="No process steps published yet" />;

  const activeStep = steps[activeIdx] ?? steps[0];
  const activeDetail = PHASE_DETAILS[activeIdx] ?? PHASE_DETAILS[0];

  const selectPhase = (idx: number) => {
    setActiveIdx(idx);
    setProgress(0);
  };

  const handlePrev = () => {
    selectPhase(activeIdx > 0 ? activeIdx - 1 : steps.length - 1);
  };

  const handleNext = () => {
    selectPhase(activeIdx < steps.length - 1 ? activeIdx + 1 : 0);
  };

  return (
    <section
      className="relative z-[2] overflow-hidden border-t border-[#dce8ec]"
      style={{
        background: processBg || "#fdfefe",
        paddingBlock: "clamp(4rem, 7vw, 6.5rem)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-14 text-center">
          <div className="inline-flex items-center gap-2 border border-[#dce8ec] bg-white px-3 py-1 shadow-sm">
            <span className="h-2 w-2 bg-[#008da4]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#008da4]">
              {sectionSubtitle || "How We Turn Your Vision Into World-Class Infrastructure"}
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-[#0d2a4a] sm:text-4xl lg:text-5xl">
            {sectionTitle || "Our Delivery Process"}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#586d82] sm:text-base">
            From technical discovery to zero-downtime release—watch our automated delivery pipeline in motion or select any phase to inspect verified engineering deliverables.
          </p>
        </div>

        {/* Clean Architectural Pipeline Stepper (Snappy Quick-Flow & Solid Connectors) */}
        <div className="mb-8 hidden sm:block">
          <div className="flex items-center justify-between border border-[#dce8ec] bg-[#f8fbfc] px-6 py-3.5 font-mono text-xs shadow-xs">
            <div className="flex items-center flex-1">
              {steps.map((st, i) => {
                const isActive = i === activeIdx;
                const isPast = i < activeIdx;

                return (
                  <div key={`timeline-step-${i}`} className="flex items-center flex-1 last:flex-initial">
                    {/* Step Button */}
                    <button
                      type="button"
                      onClick={() => selectPhase(i)}
                      className={`relative flex items-center gap-2.5 py-1 px-2 transition-colors cursor-pointer ${
                        isActive
                          ? "text-[#008da4] font-bold"
                          : isPast
                          ? "text-[#0d2a4a] hover:text-[#008da4] font-medium"
                          : "text-[#8ea2b3] hover:text-[#0d2a4a]"
                      }`}
                    >
                      {/* Step Number Badge */}
                      <span
                        className={`grid h-6 w-6 place-items-center rounded-none text-[10px] font-bold border transition-colors ${
                          isActive
                            ? "border-[#008da4] bg-[#008da4] text-white"
                            : isPast
                            ? "border-[#0d2a4a] bg-[#0d2a4a] text-white"
                            : "border-[#dce8ec] bg-white text-[#7a8f9f]"
                        }`}
                      >
                        {st.stepNumber}
                      </span>

                      <span className="hidden md:inline uppercase tracking-wider text-[11px]">
                        {st.title}
                      </span>
                    </button>

                    {/* Functional Clean Pipeline Connector Track */}
                    {i < steps.length - 1 && (
                      <div className="relative mx-3 flex-1 h-[2px] bg-[#e2ecee] overflow-hidden min-w-[24px]">
                        <div
                          className="h-full bg-[#008da4] transition-all ease-linear"
                          style={{
                            width: isPast ? "100%" : isActive ? `${progress}%` : "0%",
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Interactive 4-Phase Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => {
            const isActive = idx === activeIdx;

            return (
              <button
                type="button"
                key={`process-step-${idx}`}
                onClick={() => selectPhase(idx)}
                className={`group relative flex flex-col justify-between text-left rounded-none transition-all duration-200 cursor-pointer p-5 ${
                  isActive
                    ? "border-2 border-[#008da4] bg-white shadow-[6px_6px_0px_0px_#008da4] -translate-y-1.5 z-10"
                    : "border border-[#dce8ec] bg-white hover:-translate-y-1 hover:border-[#008da4]/60 hover:shadow-[3px_3px_0px_0px_#008da4]"
                }`}
              >

                <div>
                  {/* Header: Step Number & Phase Name */}
                  <div className="flex items-center justify-between border-b border-[#f0f4f6] pb-3">
                    <span
                      className={`font-mono text-xs font-black ${
                        isActive ? "text-[#008da4]" : "text-[#0d2a4a] group-hover:text-[#008da4]"
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-bold uppercase tracking-wider ${
                        isActive ? "text-[#008da4]" : "text-[#7a8f9f]"
                      }`}
                    >
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
                      className={`h-full w-full object-cover object-top transition-transform duration-500 ease-out ${
                        isActive ? "scale-105" : "group-hover:scale-105"
                      }`}
                    />
                    {/* Phase Badge */}
                    <div
                      className={`absolute top-2 right-2 border px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider shadow-xs ${
                        isActive
                          ? "border-[#008da4] bg-[#008da4] text-white"
                          : "border-[#dce8ec] bg-white/95 text-[#008da4]"
                      }`}
                    >
                      {step.badge}
                    </div>
                  </div>

                  {/* Title & Detail */}
                  <div className="mt-4">
                    <h3
                      className={`text-base font-black uppercase tracking-tight transition-colors sm:text-lg ${
                        isActive ? "text-[#008da4]" : "text-[#0d2a4a] group-hover:text-[#008da4]"
                      }`}
                    >
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
                  <span
                    className={`font-bold transition-colors ${
                      isActive ? "text-[#008da4]" : "text-[#0d2a4a] group-hover:text-[#008da4]"
                    }`}
                  >
                    {step.deliverable}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Immersive Phase Deep-Dive Cockpit (Light, Architectural & Clean Deliverables Showcase) */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`phase-stage-${activeIdx}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="border-2 border-[#0d2a4a] bg-white shadow-[6px_6px_0px_0px_#008da4] p-6 sm:p-8"
            >
              {/* Cockpit Top Bar */}
              <div className="flex flex-col gap-4 border-b border-[#f0f4f6] pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-8 w-8 place-items-center bg-[#0d2a4a] text-white font-mono text-xs font-bold">
                    {activeStep.stepNumber}
                  </div>
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#008da4]">
                      {activeStep.step} DETAILED BREAKDOWN &middot; {activeDetail.duration}
                    </span>
                    <h4 className="text-xl font-black uppercase tracking-tight text-[#0d2a4a]">
                      {activeStep.title}
                    </h4>
                  </div>
                </div>

                {/* Interactive Nav Controls */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center gap-1.5 border border-[#dce8ec] bg-[#f8fbfc] px-3 py-1.5 font-mono text-xs font-bold text-[#0d2a4a] hover:border-[#008da4] hover:text-[#008da4] cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    <span>PREV</span>
                  </button>
                  <span className="px-2 font-mono text-xs font-bold text-[#7a8f9f]">
                    {activeIdx + 1} / {steps.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1.5 border border-[#0d2a4a] bg-[#0d2a4a] px-3.5 py-1.5 font-mono text-xs font-bold text-white hover:border-[#008da4] hover:bg-[#008da4] cursor-pointer transition-colors"
                  >
                    <span>NEXT</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* 2-Column Split Stage: Left Scope & Checklists, Right Architectural Visual Artifact */}
              <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Left: Engineering Scope & Concrete Deliverables (6 cols) */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase text-[#7a8f9f]">
                      <Users className="h-3.5 w-3.5 text-[#008da4]" />
                      <span>Dedicated Squad: {activeDetail.squad}</span>
                    </div>

                    <h5 className="mt-4 font-mono text-xs font-bold uppercase tracking-wider text-[#0d2a4a]">
                      Key Phase Activities &amp; Rigor
                    </h5>
                    <ul className="mt-3 space-y-2.5">
                      {activeDetail.activities.map((act) => (
                        <li key={act} className="flex items-start gap-2.5 text-xs text-[#586d82] sm:text-sm leading-relaxed">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#008da4]" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>

                    <h5 className="mt-6 font-mono text-xs font-bold uppercase tracking-wider text-[#0d2a4a]">
                      Verified Deliverables Handed To You
                    </h5>
                    <div className="mt-3 space-y-2">
                      {activeDetail.deliverablesList.map((deliv) => (
                        <div
                          key={deliv}
                          className="flex items-center gap-2 border border-[#dce8ec] bg-[#f8fbfc] px-3 py-2 text-xs font-mono font-medium text-[#0d2a4a]"
                        >
                          <ShieldCheck className="h-3.5 w-3.5 text-[#008da4]" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[#f0f4f6] pt-4 font-mono text-[11px] text-[#7a8f9f] flex items-center justify-between">
                    <span>SPRINT VELOCITY: COMMITTED</span>
                    <span className="font-bold text-[#008da4]">GUARANTEED SLAs</span>
                  </div>
                </div>

                {/* Right: Architectural Visual Artifact & Milestone Showcase (6 cols - Cohesive Light Theme) */}
                <div className="lg:col-span-6 flex flex-col justify-between border border-[#dce8ec] bg-[#f8fbfc] p-5 sm:p-6">
                  <div>
                    {/* Header Strip with Metrics */}
                    <div className="flex items-center justify-between border-b border-[#e2ecee] pb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-3.5 w-3.5 text-[#008da4]" />
                        <span className="font-mono text-xs font-black uppercase tracking-wider text-[#0d2a4a]">
                          {activeDetail.artifactLabel}
                        </span>
                      </div>
                      <span className="border border-[#dce8ec] bg-white px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#008da4]">
                        {activeStep.badge}
                      </span>
                    </div>

                    {/* 3 Metric Chips (Light & Clean) */}
                    <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                      {activeDetail.metricChips.map((chip) => (
                        <div
                          key={chip.label}
                          className="border border-[#dce8ec] bg-white p-2.5 text-center shadow-2xs"
                        >
                          <p className="font-mono text-[9px] uppercase tracking-wider text-[#7a8f9f]">
                            {chip.label}
                          </p>
                          <p className="mt-1 font-mono text-xs sm:text-sm font-black text-[#008da4]">
                            {chip.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Rich Visual Viewport of the Deliverable */}
                    <div className="relative mt-4 aspect-[16/9] w-full overflow-hidden border border-[#dce8ec] bg-white shadow-xs">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={activeStep.image}
                        alt={activeStep.title}
                        loading="lazy"
                        className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 border border-[#dce8ec] bg-white/95 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-[#0d2a4a] shadow-xs">
                        {activeStep.title} &middot; OUTPUT
                      </div>
                    </div>

                    {/* Sprint Milestone Progress Checklist */}
                    <div className="mt-4 space-y-2 border-t border-[#e2ecee] pt-3">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#7a8f9f]">
                        Sprint Milestones Completed
                      </p>
                      {activeDetail.milestones.map((m) => (
                        <div
                          key={m.number}
                          className="flex items-center justify-between border border-[#e8f0f2] bg-white px-3 py-1.5 text-xs font-mono"
                        >
                          <span className="flex items-center gap-2 text-[#0d2a4a]">
                            <span className="font-bold text-[#008da4]">{m.number}</span>
                            <span>{m.title}</span>
                          </span>
                          <span className="flex items-center gap-1 text-[10px] font-bold text-[#008da4]">
                            <Check className="h-3 w-3" />
                            {m.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Handover Files Bar */}
                  <div className="mt-4 border-t border-[#e2ecee] pt-3">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#7a8f9f] mb-1.5">
                      Client Handover Artifacts:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {activeDetail.artifactFiles.map((file) => (
                        <span
                          key={file}
                          className="inline-flex items-center gap-1.5 border border-[#dce8ec] bg-white px-2.5 py-1 font-mono text-[10px] font-medium text-[#405669]"
                        >
                          <FileText className="h-3 w-3 text-[#008da4]" />
                          {file}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

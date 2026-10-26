/* ─────────────────────────────────────────────────────────
   ProcessSection — Immersive Interactive Engineering Delivery Pipeline
   Sharp, architectural, deeply interactive engineering experience:
   - Interactive 4-phase cards with tactile highlight & elevation
   - Connected pipeline progress tracker with active stage indicator
   - Deep-dive phase cockpit with deliverables, squad roles, and
     live simulated telemetry (ADRs, system topology, CI/CD, observability)
   - Razor-sharp geometry (rounded-none throughout, #008da4 accents)
   ───────────────────────────────────────────────────────── */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Activity, Terminal, ShieldCheck, Cpu } from "lucide-react";
import { processBg } from "@/lib/site-theme";
import type { ProcessStepData } from "@/lib/api";
import { EmptyState } from "@/components/ui/EmptyState";

interface PhaseDetail {
  duration: string;
  squad: string;
  activities: string[];
  deliverablesList: string[];
  telemetryTitle: string;
  telemetryBadge: string;
  metrics: { label: string; value: string; status: "good" | "active" | "neutral" }[];
  terminalLog: string[];
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
    telemetryTitle: "ARCHITECTURE AUDIT & RISK SCORECARD",
    telemetryBadge: "AUDIT LOCK",
    metrics: [
      { label: "Architecture Health", value: "96.4%", status: "good" },
      { label: "Technical Debt", value: "0% Critical", status: "good" },
      { label: "Security Gaps", value: "Resolved", status: "good" },
    ],
    terminalLog: [
      "audit: scanning repository dependencies & licenses...",
      "audit: static analysis completed — 0 critical vulnerabilities found",
      "spec: schema normalized to 3NF; latency bottlenecks identified",
      "output: ADR-001 created — cloud-native target state ratified",
    ],
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
    telemetryTitle: "SYSTEM TOPOLOGY & API CONTRACT SPEC",
    telemetryBadge: "BLUEPRINT VERIFIED",
    metrics: [
      { label: "API Latency Target", value: "< 80ms p95", status: "good" },
      { label: "Data Persistence", value: "ACID Multi-AZ", status: "good" },
      { label: "Zero-Trust Mesh", value: "Enforced", status: "good" },
    ],
    terminalLog: [
      "topology: provisioned isolated VPC with private subnets",
      "schema: PostgreSQL 16 migration plan compiled with zero locks",
      "contract: generated OpenAPI 3.1 TypeScript types for client & edge",
      "cache: Redis sub-millisecond cluster connected to query gateway",
    ],
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
    telemetryTitle: "CONTINUOUS DELIVERY & TEST TELEMETRY",
    telemetryBadge: "ACTIVE SPRINT",
    metrics: [
      { label: "Pipeline Duration", value: "1m 42s", status: "good" },
      { label: "Automated Tests", value: "348 / 348 Passed", status: "good" },
      { label: "Code Coverage", value: "98.2%", status: "good" },
    ],
    terminalLog: [
      "ci: trigger build on branch 'release/sprint-14'...",
      "test: unit test suite passed in 24.3s (348 assertions green)",
      "preview: deployed ephemeral testing environment at pr-104.everacy.dev",
      "status: release artifact packaged with zero blocking warnings",
    ],
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
    telemetryTitle: "LIVE OBSERVABILITY & ZERO-DOWNTIME SCALE",
    telemetryBadge: "99.99% UPTIME",
    metrics: [
      { label: "Global Availability", value: "99.99% SLA", status: "good" },
      { label: "P99 Edge Latency", value: "58ms", status: "good" },
      { label: "Autoscale Nodes", value: "Dynamic 4/16", status: "active" },
    ],
    terminalLog: [
      "telemetry: 100k requests routed across edge nodes without dropped packets",
      "monitor: error budget intact at 100% across all API microservices",
      "hpa: auto-scaled pod count dynamically during traffic spike",
      "deploy: rolling update completed with 0 seconds downtime recorded",
    ],
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
  // Default to Phase 3 (Index 2) as in the user's reference highlight
  const [activeIdx, setActiveIdx] = useState<number>(2);

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

  const activeStep = steps[activeIdx] ?? steps[0];
  const activeDetail = PHASE_DETAILS[activeIdx] ?? PHASE_DETAILS[0];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : steps.length - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
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
            From technical discovery to zero-downtime release—click each phase below to inspect how every sprint turns architecture into measurable business impact.
          </p>
        </div>

        {/* Connected Architectural Timeline Bar (Interactive Stepper) */}
        <div className="mb-8 hidden sm:block">
          <div className="flex items-center justify-between border-b border-[#dce8ec] bg-[#f8fbfc] px-6 py-3 font-mono text-xs">
            {steps.map((st, i) => {
              const isActive = i === activeIdx;
              const isPast = i < activeIdx;
              return (
                <button
                  key={`timeline-step-${i}`}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? "text-[#008da4] font-bold"
                      : isPast
                      ? "text-[#0d2a4a] hover:text-[#008da4]"
                      : "text-[#8ea2b3] hover:text-[#0d2a4a]"
                  }`}
                >
                  <span
                    className={`grid h-5 w-5 place-items-center rounded-none text-[10px] font-bold border transition-colors ${
                      isActive
                        ? "border-[#008da4] bg-[#008da4] text-white"
                        : isPast
                        ? "border-[#0d2a4a] bg-[#0d2a4a] text-white"
                        : "border-[#dce8ec] bg-white text-[#7a8f9f]"
                    }`}
                  >
                    {st.stepNumber}
                  </span>
                  <span className="hidden md:inline uppercase tracking-wider">{st.title}</span>
                  {i < steps.length - 1 && (
                    <span className="mx-2 text-[#dce8ec] font-normal">───</span>
                  )}
                </button>
              );
            })}
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
                onClick={() => setActiveIdx(idx)}
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

        {/* Immersive Phase Deep-Dive Cockpit (Interactive Telemetry & Deliverables Stage) */}
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
                      {activeStep.step} DEEP DIVE &middot; {activeDetail.duration}
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

              {/* 2-Column Split Stage: Left Scope & Checklists, Right Simulated Telemetry Console */}
              <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Left: Engineering Scope & Concrete Deliverables (6 cols) */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase text-[#7a8f9f]">
                      <Cpu className="h-3.5 w-3.5 text-[#008da4]" />
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
                    <span>STATUS: ACTIVE SPRINTS</span>
                    <span className="font-bold text-[#008da4]">GUARANTEED SLAs</span>
                  </div>
                </div>

                {/* Right: Simulated Engineering Artifact / Telemetry Cockpit (6 cols) */}
                <div className="lg:col-span-6">
                  <div className="rounded-none border-2 border-[#0d2a4a] bg-[#091524] p-5 text-white shadow-inner">
                    {/* Console Header */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[11px]">
                      <div className="flex items-center gap-2">
                        <Terminal className="h-3.5 w-3.5 text-[#008da4]" />
                        <span className="font-bold text-white tracking-wider">
                          {activeDetail.telemetryTitle}
                        </span>
                      </div>
                      <span className="border border-[#008da4]/40 bg-[#008da4]/20 px-2 py-0.5 font-bold text-[#008da4] text-[10px]">
                        {activeDetail.telemetryBadge}
                      </span>
                    </div>

                    {/* Live Metric Cards Strip */}
                    <div className="mt-4 grid grid-cols-3 gap-2.5">
                      {activeDetail.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="border border-white/10 bg-white/5 p-2.5 text-center"
                        >
                          <p className="text-[10px] font-mono text-[#8ea2b3] uppercase">
                            {m.label}
                          </p>
                          <p className="mt-1 text-xs sm:text-sm font-mono font-black text-[#008da4]">
                            {m.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Console Stream */}
                    <div className="mt-4 border border-white/10 bg-black/40 p-3.5 font-mono text-[11px] space-y-1.5 text-[#9ab0c2]">
                      <div className="flex items-center gap-2 text-[#008da4] font-bold text-[10px] pb-1 border-b border-white/10">
                        <Activity className="h-3 w-3 animate-pulse" />
                        <span>VERIFIED RUNTIME LOG</span>
                      </div>
                      {activeDetail.terminalLog.map((log) => (
                        <p key={log} className="leading-relaxed">
                          <span className="text-[#008da4] mr-1.5">&gt;</span>
                          {log}
                        </p>
                      ))}
                    </div>

                    {/* Console Footer */}
                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[10px] text-[#6b8296]">
                      <span>EVERACY PIPELINE TELEMETRY</span>
                      <span className="text-white font-bold">100% AUDIT READY</span>
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

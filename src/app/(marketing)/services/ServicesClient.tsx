"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Cloud,
  Smartphone,
  Globe,
  Layers,
  Cpu,
  Shield,
  Activity,
  Workflow,
  Zap,
  ArrowRight,
  Code,
  Terminal,
  Server,
  Database,
  Lock,
  GitBranch,
  Layout,
  MousePointerClick,
} from "lucide-react";
import type {
  ServiceCardData,
  ServiceCapabilityData,
  ServicePipelineStepData,
} from "@/lib/api";

interface ServiceDetail {
  tagline: string;
  capabilities: {
    title: string;
    description: string;
    icon: React.ComponentType<any>;
  }[];
  techStack: string[];
  pipeline: {
    step: string;
    title: string;
    detail: string;
  }[];
  ctaLabel: string;
}

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Code,
  Terminal,
  Server,
  Database,
  Lock,
  GitBranch,
  Layout,
  MousePointerClick,
  Cloud,
  Smartphone,
  Globe,
  Layers,
  Cpu,
  Shield,
  Activity,
  Workflow,
  Zap,
};

function resolveIcon(iconName?: string): React.ComponentType<any> {
  if (iconName && ICON_MAP[iconName]) return ICON_MAP[iconName];
  return Cpu;
}

const SERVICE_DETAILS_MAP: Record<string, ServiceDetail> = {
  cloud: {
    tagline:
      "High-uptime, secure, and auto-scaling cloud architectures built for enterprise reliability.",
    capabilities: [
      {
        title: "Infrastructure as Code (IaC)",
        description:
          "Provisioning consistent and highly repeatable environments using Terraform and AWS CloudFormation templates.",
        icon: Code,
      },
      {
        title: "Container Orchestration",
        description:
          "Deploying high-availability production clusters via Kubernetes (EKS, GKE) and light AWS ECS modules.",
        icon: Server,
      },
      {
        title: "CI/CD & GitOps Systems",
        description:
          "Designing automated workflow pipelines using GitHub Actions for fast, safe, and zero-downtime rollouts.",
        icon: GitBranch,
      },
      {
        title: "Site Reliability (SRE)",
        description:
          "Continuous telemetry modeling, cost tracking, alert setups, and 99.99% system availability targets.",
        icon: Activity,
      },
    ],
    techStack: [
      "AWS",
      "Google Cloud",
      "Terraform",
      "Docker",
      "Kubernetes",
      "Ansible",
      "GitHub Actions",
      "Prometheus",
      "Grafana",
    ],
    pipeline: [
      {
        step: "01",
        title: "Infrastructure Audit",
        detail:
          "Comprehensive analysis of your current systems, costs, and key vulnerabilities.",
      },
      {
        step: "02",
        title: "Architecture Design",
        detail:
          "Formulating multi-account secure cloud blueprints tailored to your workloads.",
      },
      {
        step: "03",
        title: "Migration & Provisioning",
        detail:
          "Safe migration of databases and virtual machines with automated deployment scripts.",
      },
      {
        step: "04",
        title: "Continuous Hardening",
        detail:
          "Periodic patch updates, firewall configurations, cost tuning, and scale reviews.",
      },
    ],
    ctaLabel: "Consult Cloud Architects",
  },
  mobile: {
    tagline:
      "Sleek, fluid, and native-grade iOS & Android applications tailored for user conversion.",
    capabilities: [
      {
        title: "Cross-Platform Fidelity",
        description:
          "Building responsive cross-platform architectures with React Native and Flutter for fast product delivery.",
        icon: Layout,
      },
      {
        title: "Native Code Performance",
        description:
          "Writing high-efficiency custom bridges and features using modern Swift and robust Kotlin configurations.",
        icon: Cpu,
      },
      {
        title: "Offline Sync Pipelines",
        description:
          "Syncing data gracefully between device caches and web servers using WatermelonDB and custom local SQLite layers.",
        icon: Database,
      },
      {
        title: "Secure Device Auth",
        description:
          "Enabling smooth biometrics (FaceID/TouchID) and hardware-level keychain encryption.",
        icon: Shield,
      },
    ],
    techStack: [
      "React Native",
      "Flutter",
      "Swift",
      "Kotlin",
      "TypeScript",
      "Zustand",
      "SQLite",
      "Firebase",
      "App Store Connect",
    ],
    pipeline: [
      {
        step: "01",
        title: "UX Journey Mapping",
        detail:
          "Outlining wireframes, interactive transitions, and typography targets.",
      },
      {
        step: "02",
        title: "Modular Sprints",
        detail:
          "Developing iterative increments of functional modules with robust unit tests.",
      },
      {
        step: "03",
        title: "Automated Device Runs",
        detail:
          "Validating interfaces and API calls on virtual arrays of actual mobile handsets.",
      },
      {
        step: "04",
        title: "Store Management",
        detail:
          "Navigating store review cycles, certificate provisioning, and public releases.",
      },
    ],
    ctaLabel: "Develop Mobile App",
  },
  web: {
    tagline: "Speed-optimized, SEO-first, and highly engaging modern web portals.",
    capabilities: [
      {
        title: "Next.js Architecture",
        description:
          "Leveraging Server Components, SSR caching, and Incremental Static Regeneration for lightning-fast loads.",
        icon: Layers,
      },
      {
        title: "Immersive Interactions",
        description:
          "Polishing interfaces with elegant, performance-oriented Framer Motion and GSAP scroll reveals.",
        icon: MousePointerClick,
      },
      {
        title: "API Layer Development",
        description:
          "Creating clean REST and type-safe GraphQL schemas for highly structured client data integration.",
        icon: Terminal,
      },
      {
        title: "Lighthouse Optimization",
        description:
          "Tuning image compressions, tag injections, metadata, and Core Web Vitals targets.",
        icon: Zap,
      },
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
      "GraphQL",
      "PostgreSQL",
      "Prisma",
      "Vercel",
    ],
    pipeline: [
      {
        step: "01",
        title: "System Specifications",
        detail:
          "Defining data schemas, layout blueprints, and page hierarchy models.",
      },
      {
        step: "02",
        title: "Frontend Layout Build",
        detail:
          "Coding pixel-perfect, responsive responsive views matching all screen sizes.",
      },
      {
        step: "03",
        title: "API & Data Wiring",
        detail:
          "Binding secure database channels, payment checkouts, and state logic hooks.",
      },
      {
        step: "04",
        title: "SEO & Lighthouse Audit",
        detail:
          "Running schema generators, metatag configurations, and server deployments.",
      },
    ],
    ctaLabel: "Launch Web System",
  },
  saas: {
    tagline:
      "Scalable multi-tenant subscription products engineered for automated growth.",
    capabilities: [
      {
        title: "Tenant Isolation Security",
        description:
          "Isolating workspace data strictly using logical database schemas and secure access filters.",
        icon: Shield,
      },
      {
        title: "Stripe Subscription Engines",
        description:
          "Configuring robust recurring billing pipelines, active coupon layers, and client subscription panels.",
        icon: Zap,
      },
      {
        title: "Granular Team Access",
        description:
          "Setting up secure workspace invitations, role hierarchies, and audit logging features.",
        icon: Lock,
      },
      {
        title: "Live Dashboard Analytics",
        description:
          "Rendering high-performance interactive usage charts and secure real-time notification streams.",
        icon: Activity,
      },
    ],
    techStack: [
      "Next.js",
      "Django",
      "Stripe API",
      "PostgreSQL",
      "Redis",
      "WebSockets",
      "Docker",
      "Chart.js",
      "Tailwind CSS",
    ],
    pipeline: [
      {
        step: "01",
        title: "Product Mapping",
        detail:
          "Defining billing intervals, user team schemas, and database model frameworks.",
      },
      {
        step: "02",
        title: "Tenant Core Build",
        detail: "Engineering system databases, authentication keys, and tenancy routers.",
      },
      {
        step: "03",
        title: "Payment Orchestration",
        detail:
          "Integrating Stripe payment webhooks, checkout portals, and invoice systems.",
      },
      {
        step: "04",
        title: "Telemetry & Scaling",
        detail:
          "Launching telemetry loggers, real-time alert grids, and autoscaling metrics.",
      },
    ],
    ctaLabel: "Partner on SaaS Innovation",
  },
};

const getFallbackDetails = (title: string, description: string): ServiceDetail => ({
  tagline: description || "Highly reliable engineering services tailored to your needs.",
  capabilities: [
    {
      title: "Custom Solutions",
      description:
        "Bespoke system designs matching precise architectural and feature specifications.",
      icon: Cpu,
    },
    {
      title: "Hardened Security",
      description:
        "Integrating solid encryption keys, firewalls, and fine-grained data permissions.",
      icon: Shield,
    },
    {
      title: "Latency Tuning",
      description:
        "Surgically profiling API systems to guarantee sub-second transaction milestones.",
      icon: Zap,
    },
    {
      title: "Pipeline Integration",
      description:
        "Providing automated deployment runners to safely push updates to production.",
      icon: Workflow,
    },
  ],
  techStack: [
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "Tailwind CSS",
    "GitHub Actions",
  ],
  pipeline: [
    {
      step: "01",
      title: "Requirement Workshop",
      detail: "Defining features, technical constraints, milestones, and system metrics.",
    },
    {
      step: "02",
      title: "Clean Architecture",
      detail: "Coding extensible component-driven modules using robust standard patterns.",
    },
    {
      step: "03",
      title: "Integration Testing",
      detail: "Executing automated unit tests and strict API security audits.",
    },
    {
      step: "04",
      title: "Deploy & Monitor",
      detail: "Releasing to production servers under structured logging and dashboards.",
    },
  ],
  ctaLabel: "Build with Everacy",
});

function getServiceDetails(service: ServiceCardData): { detail: ServiceDetail; key: string } {
  const hasBackendContent =
    service.tagline ||
    (service.capabilities && service.capabilities.length > 0) ||
    (service.tech_stack && service.tech_stack.length > 0) ||
    (service.pipeline && service.pipeline.length > 0);

  if (hasBackendContent) {
    const staticFallback = getStaticDetails(service);
    return {
      key: "dynamic",
      detail: {
        tagline: service.tagline || staticFallback.tagline,
        capabilities:
          service.capabilities && service.capabilities.length > 0
            ? service.capabilities.map((cap: ServiceCapabilityData) => ({
                title: cap.title,
                description: cap.description,
                icon: resolveIcon(cap.icon),
              }))
            : staticFallback.capabilities,
        techStack:
          service.tech_stack && service.tech_stack.length > 0
            ? service.tech_stack
            : staticFallback.techStack,
        pipeline:
          service.pipeline && service.pipeline.length > 0
            ? service.pipeline.map((step: ServicePipelineStepData) => ({
                step: step.step,
                title: step.title,
                detail: step.detail,
              }))
            : staticFallback.pipeline,
        ctaLabel: service.cta_label || staticFallback.ctaLabel,
      },
    };
  }

  return { detail: getStaticDetails(service), key: "static" };
}

function getStaticDetails(service: ServiceCardData): ServiceDetail {
  const title = service.title.toLowerCase();
  if (title.includes("cloud") || title.includes("infra")) return SERVICE_DETAILS_MAP.cloud;
  if (
    title.includes("mobile") ||
    title.includes("app") ||
    title.includes("android") ||
    title.includes("ios")
  ) {
    return SERVICE_DETAILS_MAP.mobile;
  }
  if (title.includes("web") || title.includes("front") || title.includes("engineering")) {
    return SERVICE_DETAILS_MAP.web;
  }
  if (
    title.includes("saas") ||
    title.includes("product") ||
    title.includes("innovations") ||
    title.includes("software")
  ) {
    return SERVICE_DETAILS_MAP.saas;
  }
  return getFallbackDetails(service.title, service.description);
}

interface ServicesClientProps {
  initialServices: ServiceCardData[];
}

export default function ServicesClient({ initialServices }: ServicesClientProps) {
  const services: ServiceCardData[] =
    initialServices.length > 0
      ? initialServices
      : [
          {
            id: 1,
            title: "Cloud Infrastructure",
            description:
              "Resilient, auto-scaling cloud architectures built on AWS, Azure, and GCP. Zero-downtime deployments, IaC pipelines, and 99.99% uptime SLAs.",
            link_label: "Discover More",
            link_href: "/services#cloud",
            accent_color: "#72bee4",
            background_color: "#f0f9ff",
            image: null,
            image_alt: "Cloud",
            layout: "right" as const,
            order: 0,
            tagline: null,
            cta_label: null,
            capabilities: null,
            tech_stack: null,
            pipeline: null,
          },
          {
            id: 2,
            title: "Mobile App Development",
            description:
              "Bespoke iOS and Android applications engineered for performance and engagement. We build native and cross-platform mobile experiences.",
            link_label: "Discover More",
            link_href: "/services#mobile",
            accent_color: "#57dbd9",
            background_color: "#f0f9ff",
            image: null,
            image_alt: "Mobile",
            layout: "right" as const,
            order: 1,
            tagline: null,
            cta_label: null,
            capabilities: null,
            tech_stack: null,
            pipeline: null,
          },
          {
            id: 3,
            title: "Web Engineering",
            description:
              "Pixel-perfect, performance-first web platforms. We architect fullstack systems with Next.js, TypeScript, and modern APIs built to scale.",
            link_label: "Discover More",
            link_href: "/services#web",
            accent_color: "#74a6ec",
            background_color: "#f0f9ff",
            image: null,
            image_alt: "Web",
            layout: "right" as const,
            order: 2,
            tagline: null,
            cta_label: null,
            capabilities: null,
            tech_stack: null,
            pipeline: null,
          },
          {
            id: 4,
            title: "SaaS Product Innovations",
            description:
              "Transforming vision into market-leading software. From multi-tenant architectures to scalable subscription engines, we build and iterate on SaaS products.",
            link_label: "Discover More",
            link_href: "/services#saas",
            accent_color: "#43dfcd",
            background_color: "#f0f9ff",
            image: null,
            image_alt: "SaaS",
            layout: "right" as const,
            order: 3,
            tagline: null,
            cta_label: null,
            capabilities: null,
            tech_stack: null,
            pipeline: null,
          },
        ];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex] ?? services[0];
  const activeDetails = useMemo(() => getServiceDetails(activeService).detail, [activeService]);

  return (
    <section className="relative overflow-hidden bg-[#030b1f] text-white py-16 md:py-24 section-clip-x">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,93,92,0.16),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(0,166,203,0.2),transparent_45%),linear-gradient(120deg,#020617,#071d46_55%,#0b1f50)]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(140,212,221,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(140,212,221,0.08) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <header className="text-center max-w-5xl mx-auto mb-10 md:mb-14">
          <h2 className="text-[clamp(2rem,6vw,4rem)] font-black tracking-tight text-[#ff7d6f]">
            Our Solutions
          </h2>
          <p className="mt-5 text-white/85 text-[clamp(1rem,2.2vw,1.9rem)] leading-relaxed">
            Designed with scalability, security and adaptability at its core, our advanced tech stack powers how we help partners build and scale digital ecosystems.
          </p>
        </header>

        <div className="border-b border-white/15 overflow-x-auto no-scrollbar">
          <div className="min-w-max flex gap-2 md:gap-4 pb-1">
            {services.map((service, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  className={`relative px-4 md:px-5 py-3 text-sm md:text-[1.05rem] font-semibold transition-colors whitespace-nowrap ${
                    isActive ? "text-[#ff7d6f]" : "text-white/65 hover:text-white"
                  }`}
                  type="button"
                >
                  {service.title}
                  <span
                    className={`absolute left-0 right-0 -bottom-[1px] h-[2px] transition-opacity ${
                      isActive ? "opacity-100 bg-[#ff7d6f]" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-sm p-4 md:p-6">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#0b173a]">
              {activeService.image ? (
                <img
                  src={activeService.image}
                  alt={activeService.image_alt || activeService.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full grid place-items-center text-white/55 text-sm">
                  {activeService.title}
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-[clamp(1.8rem,4.6vw,3.1rem)] font-black text-[#ff8b79] leading-tight">
              {activeService.title}
            </h3>
            <p className="mt-4 text-white/85 text-base md:text-[1.35rem] leading-relaxed">
              {activeService.description}
            </p>

            <div className="mt-6">
              <Link
                href={activeService.link_href || "/contact"}
                className="inline-flex items-center gap-2 rounded-xl border border-white/35 px-4 py-2.5 text-sm md:text-base font-semibold hover:bg-white/10 transition-colors"
              >
                {activeService.link_label || "Discover More"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeDetails.capabilities.slice(0, 4).map((cap, i) => {
                const Icon = cap.icon;
                return (
                  <div
                    key={`${cap.title}-${i}`}
                    className="rounded-xl border border-white/12 bg-white/6 px-4 py-3"
                  >
                    <div className="flex items-center gap-2 text-white">
                      <Icon className="w-4 h-4 text-[#8cd4dd]" />
                      <h4 className="font-semibold text-sm">{cap.title}</h4>
                    </div>
                    <p className="mt-1.5 text-xs text-white/70 leading-relaxed">{cap.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#9bd2ef33] p-4 md:p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/65">Delivery Snapshot</p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-white">
                {activeDetails.pipeline.slice(0, 4).map((step) => (
                  <div key={`${step.step}-${step.title}`}>
                    <p className="text-2xl md:text-3xl font-bold">{step.step}</p>
                    <p className="text-sm text-white/80">{step.title}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {activeDetails.techStack.slice(0, 8).map((tech) => (
                <span
                  key={tech}
                  className="text-xs rounded-full border border-white/20 px-3 py-1 text-white/80 bg-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

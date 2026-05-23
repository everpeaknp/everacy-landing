"use client";

import React, { useState, useEffect } from "react";
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
  X,
  ArrowRight,
  Code,
  Terminal,
  Server,
  Database,
  Lock,
  GitBranch,
  Layout,
  MousePointerClick
} from "lucide-react";
import type { ServiceCardData, ServiceCapabilityData, ServicePipelineStepData } from "@/lib/api";

// ── Rich Static Content Map for Services (Minimal & Highly Informative) ──
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

// Icon mapping for backend-specified icons
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Code, Terminal, Server, Database, Lock, GitBranch, Layout, MousePointerClick,
  Cloud, Smartphone, Globe, Layers, Cpu, Shield, Activity, Workflow, Zap,
};

function resolveIcon(iconName?: string): React.ComponentType<any> {
  if (iconName && ICON_MAP[iconName]) return ICON_MAP[iconName];
  return Cpu; // sensible default
}

const SERVICE_DETAILS_MAP: Record<string, ServiceDetail> = {
  cloud: {
    tagline: "High-uptime, secure, and auto-scaling cloud architectures built for enterprise reliability.",
    capabilities: [
      {
        title: "Infrastructure as Code (IaC)",
        description: "Provisioning consistent and highly repeatable environments using Terraform and AWS CloudFormation templates.",
        icon: Code
      },
      {
        title: "Container Orchestration",
        description: "Deploying high-availability production clusters via Kubernetes (EKS, GKE) and light AWS ECS modules.",
        icon: Server
      },
      {
        title: "CI/CD & GitOps Systems",
        description: "Designing automated workflow pipelines using GitHub Actions for fast, safe, and zero-downtime rollouts.",
        icon: GitBranch
      },
      {
        title: "Site Reliability (SRE)",
        description: "Continuous telemetry modeling, cost tracking, alert setups, and 99.99% system availability targets.",
        icon: Activity
      }
    ],
    techStack: ["AWS", "Google Cloud", "Terraform", "Docker", "Kubernetes", "Ansible", "GitHub Actions", "Prometheus", "Grafana"],
    pipeline: [
      { step: "01", title: "Infrastructure Audit", detail: "Comprehensive analysis of your current systems, costs, and key vulnerabilities." },
      { step: "02", title: "Architecture Design", detail: "Formulating multi-account secure cloud blueprints tailored to your workloads." },
      { step: "03", title: "Migration & Provisioning", detail: "Safe migration of databases and virtual machines with automated deployment scripts." },
      { step: "04", title: "Continuous Hardening", detail: "Periodic patch updates, firewall configurations, cost tuning, and scale reviews." }
    ],
    ctaLabel: "Consult Cloud Architects"
  },
  mobile: {
    tagline: "Sleek, fluid, and native-grade iOS & Android applications tailored for user conversion.",
    capabilities: [
      {
        title: "Cross-Platform Fidelity",
        description: "Building responsive cross-platform architectures with React Native and Flutter for fast product delivery.",
        icon: Layout
      },
      {
        title: "Native Code Performance",
        description: "Writing high-efficiency custom bridges and features using modern Swift and robust Kotlin configurations.",
        icon: Cpu
      },
      {
        title: "Offline Sync Pipelines",
        description: "Syncing data gracefully between device caches and web servers using WatermelonDB and custom local SQLite layers.",
        icon: Database
      },
      {
        title: "Secure Device Auth",
        description: "Enabling smooth biometrics (FaceID/TouchID) and hardware-level keychain encryption.",
        icon: Shield
      }
    ],
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "TypeScript", "Zustand", "SQLite", "Firebase", "App Store Connect"],
    pipeline: [
      { step: "01", title: "UX Journey Mapping", detail: "Outlining wireframes, interactive transitions, and typography targets." },
      { step: "02", title: "Modular Sprints", detail: "Developing iterative increments of functional modules with robust unit tests." },
      { step: "03", title: "Automated Device Runs", detail: "Validating interfaces and API calls on virtual arrays of actual mobile handsets." },
      { step: "04", title: "Store Management", detail: "Navigating store review cycles, certificate provisioning, and public releases." }
    ],
    ctaLabel: "Develop Mobile App"
  },
  web: {
    tagline: "Speed-optimized, SEO-first, and highly engaging modern web portals.",
    capabilities: [
      {
        title: "Next.js Architecture",
        description: "Leveraging Server Components, SSR caching, and Incremental Static Regeneration for lightning-fast loads.",
        icon: Layers
      },
      {
        title: "Immersive Interactions",
        description: "Polishing interfaces with elegant, performance-oriented Framer Motion and GSAP scroll reveals.",
        icon: MousePointerClick
      },
      {
        title: "API Layer Development",
        description: "Creating clean REST and type-safe GraphQL schemas for highly structured client data integration.",
        icon: Terminal
      },
      {
        title: "Lighthouse Optimization",
        description: "Tuning image compressions, tag injections, metadata, and Core Web Vitals targets.",
        icon: Zap
      }
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "GraphQL", "PostgreSQL", "Prisma", "Vercel"],
    pipeline: [
      { step: "01", title: "System Specifications", detail: "Defining data schemas, layout blueprints, and page hierarchy models." },
      { step: "02", title: "Frontend Layout Build", detail: "Coding pixel-perfect, responsive responsive views matching all screen sizes." },
      { step: "03", title: "API & Data Wiring", detail: "Binding secure database channels, payment checkouts, and state logic hooks." },
      { step: "04", title: "SEO & Lighthouse Audit", detail: "Running schema generators, metatag configurations, and server deployments." }
    ],
    ctaLabel: "Launch Web System"
  },
  saas: {
    tagline: "Scalable multi-tenant subscription products engineered for automated growth.",
    capabilities: [
      {
        title: "Tenant Isolation Security",
        description: "Isolating workspace data strictly using logical database schemas and secure access filters.",
        icon: Shield
      },
      {
        title: "Stripe Subscription Engines",
        description: "Configuring robust recurring billing pipelines, active coupon layers, and client subscription panels.",
        icon: Zap
      },
      {
        title: "Granular Team Access",
        description: "Setting up secure workspace invitations, role hierarchies, and audit logging features.",
        icon: Lock
      },
      {
        title: "Live Dashboard Analytics",
        description: "Rendering high-performance interactive usage charts and secure real-time notification streams.",
        icon: Activity
      }
    ],
    techStack: ["Next.js", "Django", "Stripe API", "PostgreSQL", "Redis", "WebSockets", "Docker", "Chart.js", "Tailwind CSS"],
    pipeline: [
      { step: "01", title: "Product Mapping", detail: "Defining billing intervals, user team schemas, and database model frameworks." },
      { step: "02", title: "Tenant Core Build", detail: "Engineering system databases, authentication keys, and tenancy routers." },
      { step: "03", title: "Payment Orchestration", detail: "Integrating Stripe payment webhooks, checkout portals, and invoice systems." },
      { step: "04", title: "Telemetry & Scaling", detail: "Launching telemetry loggers, real-time alert grids, and autoscaling metrics." }
    ],
    ctaLabel: "Partner on SaaS Innovation"
  }
};

const getFallbackDetails = (title: string, description: string): ServiceDetail => ({
  tagline: description || "Highly reliable engineering services tailored to your needs.",
  capabilities: [
    { title: "Custom Solutions", description: "Bespoke system designs matching precise architectural and feature specifications.", icon: Cpu },
    { title: "Hardened Security", description: "Integrating solid encryption keys, firewalls, and fine-grained data permissions.", icon: Shield },
    { title: "Latency Tuning", description: "Surgically profiling API systems to guarantee sub-second transaction milestones.", icon: Zap },
    { title: "Pipeline Integration", description: "Providing automated deployment runners to safely push updates to production.", icon: Workflow }
  ],
  techStack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "Tailwind CSS", "GitHub Actions"],
  pipeline: [
    { step: "01", title: "Requirement Workshop", detail: "Defining features, technical constraints, milestones, and system metrics." },
    { step: "02", title: "Clean Architecture", detail: "Coding extensible component-driven modules using robust standard patterns." },
    { step: "03", title: "Integration Testing", detail: "Executing automated unit tests and strict API security audits." },
    { step: "04", title: "Deploy & Monitor", detail: "Releasing to production servers under structured logging and dashboards." }
  ],
  ctaLabel: "Build with Everacy"
});

function getServiceDetails(service: ServiceCardData): { detail: ServiceDetail; key: string } {
  // 1. Use backend-provided dynamic content first
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
            ? service.pipeline
            : staticFallback.pipeline,
        ctaLabel: service.cta_label || staticFallback.ctaLabel,
      },
    };
  }

  // 2. Fall back to static map
  return { detail: getStaticDetails(service), key: "static" };
}

function getStaticDetails(service: ServiceCardData): ServiceDetail {
  const title = service.title.toLowerCase();
  if (title.includes("cloud") || title.includes("infra")) {
    return SERVICE_DETAILS_MAP.cloud;
  }
  if (title.includes("mobile") || title.includes("app") || title.includes("android") || title.includes("ios")) {
    return SERVICE_DETAILS_MAP.mobile;
  }
  if (title.includes("web") || title.includes("front") || title.includes("engineering")) {
    return SERVICE_DETAILS_MAP.web;
  }
  if (title.includes("saas") || title.includes("product") || title.includes("innovations") || title.includes("software")) {
    return SERVICE_DETAILS_MAP.saas;
  }
  return getFallbackDetails(service.title, service.description);
}

interface ServicesClientProps {
  initialServices: ServiceCardData[];
}

export default function ServicesClient({ initialServices }: ServicesClientProps) {
  const [activeService, setActiveService] = useState<ServiceCardData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Close drawer on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent scroll when drawer is open (Ultimate God-Mode: HTML/Body Viewport Lock + Lenis + Capturing Event Interceptor)
  useEffect(() => {
    // Dynamic getter for Lenis smooth scroll
    const getLenis = () => (window as any).lenis;
    
    if (isOpen) {
      // Force viewport lock
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100vh";
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      
      const lenis = getLenis();
      if (lenis) {
        lenis.stop();
      }
    } else {
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
      
      const lenis = getLenis();
      if (lenis) {
        lenis.start();
      }
    }

    // Event Interceptor in CAPTURING Phase to execute BEFORE Lenis or browser default listeners
    const preventDefault = (e: Event) => {
      const target = e.target as HTMLElement;
      // Allow scroll inside the drawer
      if (target.closest("[data-lenis-prevent]")) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
    };

    const preventDefaultKeys = (e: KeyboardEvent) => {
      const keys = ["Space", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "End", "Home"];
      if (keys.includes(e.code)) {
        const target = e.target as HTMLElement;
        if (target.closest("[data-lenis-prevent]")) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
      }
    };

    if (isOpen) {
      window.addEventListener("wheel", preventDefault, { passive: false, capture: true });
      window.addEventListener("touchmove", preventDefault, { passive: false, capture: true });
      window.addEventListener("keydown", preventDefaultKeys, { passive: false, capture: true });
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
      
      const lenis = getLenis();
      if (lenis) {
        lenis.start();
      }
      
      window.removeEventListener("wheel", preventDefault, { capture: true });
      window.removeEventListener("touchmove", preventDefault, { capture: true });
      window.removeEventListener("keydown", preventDefaultKeys, { capture: true });
    };
  }, [isOpen]);

  const handleOpen = (service: ServiceCardData) => {
    setActiveService(service);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Clear URL hash cleanly without scroll jumping
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.pushState(null, "", window.location.pathname);
    }
    setTimeout(() => {
      setActiveService(null);
    }, 450);
  };

  // Fallback static data
  const services = initialServices.length > 0 ? initialServices : [
    {
      id: 1,
      title: "Cloud Infrastructure",
      description: "Resilient, auto-scaling cloud architectures built on AWS, Azure, and GCP. Zero-downtime deployments, IaC pipelines, and 99.99% uptime SLAs.",
      link_label: "Learn More",
      link_href: "/services#cloud",
      accent_color: "#72bee4",
      background_color: "#f0f9ff",
      image: null,
      image_alt: "Cloud",
      layout: "right" as const,
      order: 0,
      tagline: null, cta_label: null, capabilities: null, tech_stack: null, pipeline: null,
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Bespoke iOS and Android applications engineered for performance and engagement. We build native and cross-platform mobile experiences.",
      link_label: "Learn More",
      link_href: "/services#mobile",
      accent_color: "#57dbd9",
      background_color: "#f0f9ff",
      image: null,
      image_alt: "Mobile",
      layout: "right" as const,
      order: 1,
      tagline: null, cta_label: null, capabilities: null, tech_stack: null, pipeline: null,
    },
    {
      id: 3,
      title: "Web Engineering",
      description: "Pixel-perfect, performance-first web platforms. We architect fullstack systems with Next.js, TypeScript, and modern APIs — built to scale.",
      link_label: "Learn More",
      link_href: "/services#web",
      accent_color: "#74a6ec",
      background_color: "#f0f9ff",
      image: null,
      image_alt: "Web",
      layout: "right" as const,
      order: 2,
      tagline: null, cta_label: null, capabilities: null, tech_stack: null, pipeline: null,
    },
    {
      id: 4,
      title: "SaaS Product Innovations",
      description: "Transforming vision into market-leading software. From multi-tenant architectures to scalable subscription engines, we build and iterate on SaaS products.",
      link_label: "Learn More",
      link_href: "/services#saas",
      accent_color: "#43dfcd",
      background_color: "#f0f9ff",
      image: null,
      image_alt: "SaaS",
      layout: "right" as const,
      order: 3,
      tagline: null, cta_label: null, capabilities: null, tech_stack: null, pipeline: null,
    }
  ];

  // Listen to URL hash (e.g. #cloud) to automatically open the corresponding service drawer
  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastHash = window.location.hash;

    const checkHash = () => {
      const currentHash = window.location.hash;
      if (currentHash !== lastHash) {
        lastHash = currentHash;
        handleHashChange();
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (!hash) return;

      const matchedService = services.find((s) => {
        const title = s.title.toLowerCase();
        if (hash === "cloud" || hash === "infra") return title.includes("cloud") || title.includes("infra");
        if (hash === "mobile" || hash === "app") return title.includes("mobile") || title.includes("app");
        if (hash === "web" || hash === "engineering") return title.includes("web") || title.includes("engineering");
        if (hash === "saas" || hash === "product" || hash === "software") return title.includes("saas") || title.includes("product") || title.includes("software");
        return s.link_href?.endsWith(`#${hash}`);
      });

      if (matchedService) {
        handleOpen(matchedService);
      }
    };

    // Delay checking to allow layout and smooth scroll transitions to settle cleanly
    const timeoutId = setTimeout(handleHashChange, 350);

    window.addEventListener("hashchange", handleHashChange);
    const intervalId = setInterval(checkHash, 100);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [services]);

  let detail = getFallbackDetails("", "");
  if (activeService) {
    detail = getServiceDetails(activeService).detail;
  }

  return (
    <div className="font-mont relative">
      {/* ── Minimalist & Premium Services Grid ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => {
              const { detail: sDetail } = getServiceDetails(service);
              return (
                <div
                  key={service.id}
                  onClick={() => handleOpen(service)}
                  className="group relative cursor-pointer bg-white rounded-2xl p-8 border border-slate-100/90 shadow-[0_4px_25px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.035)] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between min-h-[320px] select-none"
                >
                  {/* Content Container */}
                  <div>
                    {/* Tiny Slate Pill Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 mb-4 transition-colors duration-300 group-hover:bg-slate-100/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-slate-600 transition-colors duration-300" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                        {sDetail.capabilities[0]?.title || "Premium"}
                      </span>
                    </div>

                    <h2 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight uppercase transition-colors duration-300 group-hover:text-slate-950">
                      {service.title}
                    </h2>

                    <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                      {service.description}
                    </p>
                  </div>

                  {/* Sleek, Minimalist Interactive Link */}
                  <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-50">
                    <Link
                      href={service.link_href || "/services"}
                      className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-4 py-2 transition-all duration-200"
                      style={{
                        background: service.accent_color || "#27446e",
                        color: "#ffffff",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleOpen(service);
                        const title = service.title.toLowerCase();
                        let slug = "services";
                        if (title.includes("cloud") || title.includes("infra")) slug = "cloud";
                        else if (title.includes("mobile") || title.includes("app")) slug = "mobile";
                        else if (title.includes("web") || title.includes("engineering")) slug = "web";
                        else if (title.includes("saas") || title.includes("product")) slug = "saas";
                        else slug = title.split(" ")[0];
                        window.history.pushState(null, "", `#${slug}`);
                      }}
                    >
                      {service.cta_label || service.link_label || "Learn More"}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300" />
                    </Link>
                    
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                      {String(service.id).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Immersive Light Premium Detail Drawer ── */}
      <div
        className={`fixed top-16 bottom-0 left-0 right-0 z-50 transition-opacity duration-500 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Soft, clean dark overlay */}
        <div
          onClick={handleClose}
          className="absolute inset-0 bg-slate-950/20 backdrop-blur-sm transition-all duration-500"
        />

        {/* Dynamic sliding panel drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-2xl bg-white text-slate-800 shadow-[0_0_60px_rgba(0,0,0,0.08)] border-l border-slate-100 flex flex-col transition-transform duration-500 ease-out transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          data-lenis-prevent
        >
          {activeService && (
            <>
              {/* Drawer Header */}
              <header className="relative flex items-center justify-between px-6 py-5 md:px-8 border-b border-slate-100 bg-white/95 backdrop-blur-md z-10">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activeService.accent_color }}
                  />
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 font-mono">
                    Service overview
                  </h3>
                </div>
                
                {/* Minimal slate close button */}
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all duration-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </header>

              {/* Scrollable Content Container */}
              <div className="flex-1 overflow-y-auto px-6 md:px-8 py-8 space-y-10 custom-scrollbar bg-slate-50/30">
                
                {/* Hero / Intro Title Section */}
                <section className="relative p-6 md:p-8 rounded-2xl border border-slate-100 bg-white shadow-sm">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 uppercase mb-3">
                    {activeService.title}
                  </h1>
                  
                  <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">
                    {detail.tagline}
                  </p>
                </section>

                {/* Key Capabilities Section */}
                <section className="space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 font-mono">
                    Capabilities & Competencies
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {detail.capabilities.map((cap, i) => {
                      const Icon = cap.icon;
                      return (
                        <div 
                          key={i}
                          className="p-5 rounded-xl border border-slate-100/90 bg-white hover:bg-slate-50/50 transition-all duration-300 flex flex-col space-y-3 shadow-[0_2px_15px_rgba(0,0,0,0.005)]"
                        >
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 border border-slate-100 text-slate-600"
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="font-extrabold text-slate-900 text-sm tracking-tight mb-1">
                              {cap.title}
                            </h5>
                            <p className="text-slate-500 text-xs leading-relaxed font-medium">
                              {cap.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* Tech Stack Badges */}
                <section className="space-y-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 font-mono">
                    Technology Stack
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {detail.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold border border-slate-100 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:bg-slate-50 hover:text-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>

                {/* Delivery Pipeline Timeline */}
                <section className="space-y-6">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 font-mono">
                    Delivery Roadmap
                  </h4>

                  <div className="relative pl-6 border-l border-slate-200 ml-4 space-y-8">
                    {detail.pipeline.map((pipe, i) => (
                      <div key={i} className="relative group">
                        {/* Elegant minimalist number indicator */}
                        <span 
                          className="absolute -left-[35px] top-0.5 w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold flex items-center justify-center font-mono"
                        >
                          {pipe.step}
                        </span>

                        <div className="space-y-1">
                          <h5 className="font-extrabold text-slate-900 text-sm tracking-tight leading-tight">
                            {pipe.title}
                          </h5>
                          <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">
                            {pipe.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                
                <div className="h-6" />

              </div>

              {/* Minimalist Action Footer */}
              <footer className="px-6 py-5 md:px-8 bg-white border-t border-slate-100 flex items-center justify-between gap-4 z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.015)]">
                <div className="hidden sm:block">
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest font-mono">
                    Next phase
                  </p>
                  <p className="text-sm font-extrabold text-slate-900">
                    Arrange a brief inquiry call
                  </p>
                </div>

                <Link
                  href="/contact"
                  onClick={handleClose}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold bg-slate-900 text-white shadow-sm hover:bg-slate-800 transition-all duration-300"
                >
                  <span>{detail.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </footer>
            </>
          )}
        </div>
      </div>

      {/* Styles for scrollbar and responsive tweaks */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.01);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.08);
          border-radius: 99px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.16);
        }
      `}</style>
    </div>
  );
}

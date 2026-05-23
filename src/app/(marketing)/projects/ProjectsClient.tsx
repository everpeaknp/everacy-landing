"use client";

import { useEffect, useMemo, useState } from "react";
import "./projects.css";
import type { ProjectData, ProjectsPageHeroData } from "@/lib/api";

interface ProjectsClientProps {
  pageHero?: ProjectsPageHeroData | null;
  projects?: ProjectData[];
}

type FancyItem = {
  id: string;
  title: string;
  short: string;
  image: string;
  accentColor: string;
  readMore: {
    description: string;
    techStack: string[];
    platforms: string[];
    challenges: string[];
    features: string[];
    teamMembers: string[];
    downloadLinks: { label: string; href: string }[];
  };
};

const FALLBACK_ITEMS: FancyItem[] = [
  {
    id: "p1",
    title: "We're not afraid to rethink things",
    short: "Enterprise architecture and cloud modernization.",
    image: "https://assets.codepen.io/3341051/interior1.jpg",
    accentColor: "#304949",
    readMore: {
      description:
        "We design resilient platforms that balance speed, security, and maintainability with measurable delivery outcomes.",
      techStack: ["Next.js", "TypeScript", "Django", "PostgreSQL", "Docker"],
      platforms: ["Web", "Admin Panel"],
      challenges: ["Legacy modernization", "Cross-team data consistency", "Scale readiness"],
      features: ["Real-time dashboards", "Role-based access", "Automation workflows"],
      teamMembers: ["Product Lead", "Frontend Engineer", "Backend Engineer", "QA Engineer"],
      downloadLinks: [
        { label: "Case Study PDF", href: "#" },
        { label: "Product One-Pager", href: "#" },
      ],
    },
  },
  {
    id: "p2",
    title: "Enthusiastic creators for living environments",
    short: "Cross-platform systems engineered for performance.",
    image: "https://assets.codepen.io/3341051/interior2.jpg",
    accentColor: "#954722",
    readMore: {
      description: "Cross-platform product system with unified UX and stable release cadence.",
      techStack: ["Flutter", "React", "Node.js", "Redis"],
      platforms: ["iOS", "Android", "Web"],
      challenges: ["Offline sync", "Performance on low-end devices"],
      features: ["Unified account system", "Smart notifications", "Analytics events"],
      teamMembers: ["Mobile Lead", "Backend Lead", "Designer"],
      downloadLinks: [
        { label: "App Overview", href: "#" },
      ],
    },
  },
  {
    id: "p3",
    title: "Create modern yet timeless experiences",
    short: "Design systems and interfaces that scale with products.",
    image: "https://assets.codepen.io/3341051/interior3.jpg",
    accentColor: "#ca4985",
    readMore: {
      description: "Design system and engineering alignment for long-term product consistency.",
      techStack: ["Figma", "Next.js", "Tailwind CSS"],
      platforms: ["Web"],
      challenges: ["Design debt", "Inconsistent component states"],
      features: ["Tokenized theming", "Reusable UI primitives"],
      teamMembers: ["UI Engineer", "UX Designer"],
      downloadLinks: [{ label: "Design System Notes", href: "#" }],
    },
  },
  {
    id: "p4",
    title: "Ultimately, design is about being",
    short: "Reliable delivery for mission-critical product teams.",
    image: "https://assets.codepen.io/3341051/interior4.jpg",
    accentColor: "#5c7450",
    readMore: {
      description: "Delivery-focused engagement with observability, QA, and operational discipline.",
      techStack: ["AWS", "Kubernetes", "Prometheus", "Grafana"],
      platforms: ["Web", "Cloud"],
      challenges: ["Incident response time", "Deployment reliability"],
      features: ["SLO monitoring", "Blue-green releases", "Auto rollback"],
      teamMembers: ["SRE", "DevOps Engineer", "Tech Lead"],
      downloadLinks: [{ label: "Operations Brief", href: "#" }],
    },
  },
];

function toFancyItems(projects?: ProjectData[]): FancyItem[] {
  if (!projects || projects.length === 0) return FALLBACK_ITEMS;

  const source = projects.slice(0, 4);
  while (source.length < 4) {
    source.push(source[source.length - 1]);
  }

  return source.map((p, idx) => {
    const detailsText =
      p.details && p.details.length > 0
        ? p.details
            .sort((a, b) => a.order - b.order)
            .map((d) => [d.question, d.answer].filter(Boolean).join(" "))
            .filter(Boolean)
        : [p.description || FALLBACK_ITEMS[idx].readMore.description];

    return {
      id: `p-${p.id}`,
      title: p.name || FALLBACK_ITEMS[idx].title,
      short: p.description || FALLBACK_ITEMS[idx].short,
      image:
        p.background_image ||
        p.hero?.background_image ||
        p.tagline?.background_image ||
        FALLBACK_ITEMS[idx].image,
      accentColor: p.accent_color || FALLBACK_ITEMS[idx].accentColor,
      readMore: {
        description: detailsText[0] || FALLBACK_ITEMS[idx].readMore.description,
        techStack: p.tech_stack?.length ? p.tech_stack : FALLBACK_ITEMS[idx].readMore.techStack,
        platforms: p.platforms?.length ? p.platforms : FALLBACK_ITEMS[idx].readMore.platforms,
        challenges: p.challenges?.length ? p.challenges : FALLBACK_ITEMS[idx].readMore.challenges,
        features: p.features?.length ? p.features : FALLBACK_ITEMS[idx].readMore.features,
        teamMembers:
          p.team_composition?.length
            ? p.team_composition
                .filter((m) => m && m.role && Number(m.count) > 0)
                .map((m) => `${m.count} ${m.role}`)
            : FALLBACK_ITEMS[idx].readMore.teamMembers,
        downloadLinks: p.visit_links?.length ? p.visit_links : FALLBACK_ITEMS[idx].readMore.downloadLinks,
      },
    };
  });
}

function toFancyItemFromProject(project: ProjectData, idx: number): FancyItem {
  const detailsText =
    project.details && project.details.length > 0
      ? project.details
          .sort((a, b) => a.order - b.order)
          .map((d) => [d.question, d.answer].filter(Boolean).join(" "))
          .filter(Boolean)
      : [project.description || "Digital product case study."];

  return {
    id: `all-${project.id}`,
    title: project.name || `Project ${idx + 1}`,
    short: project.description || "Digital Product",
    image:
      project.background_image ||
      project.hero?.background_image ||
      project.tagline?.background_image ||
      "https://images.unsplash.com/photo-1588515724527-074a7a56616c?auto=format&fit=crop&q=80&w=1160",
    accentColor: project.accent_color || "#304949",
    readMore: {
      description: detailsText[0] || "Digital product case study.",
      techStack: project.tech_stack?.length ? project.tech_stack : ["Next.js", "TypeScript", "Django", "PostgreSQL"],
      platforms: project.platforms?.length ? project.platforms : ["Web"],
      challenges: project.challenges?.length ? project.challenges : ["Scalability", "Release velocity"],
      features: project.features?.length ? project.features : ["Modular architecture", "Secure APIs"],
      teamMembers:
        project.team_composition?.length
          ? project.team_composition
              .filter((m) => m && m.role && Number(m.count) > 0)
              .map((m) => `${m.count} ${m.role}`)
          : ["Product Lead", "Frontend", "Backend", "QA"],
      downloadLinks: project.visit_links?.length ? project.visit_links : [{ label: "Visit", href: "#" }],
    },
  };
}

function DetailSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 16 }}>
      <h4 style={{ margin: "0 0 8px 0", fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", color: "#4b5563" }}>{label}</h4>
      {children}
    </section>
  );
}

function PillList({ items }: { items: string[] }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            borderRadius: 999,
            border: "1px solid #d8e2ef",
            background: "#f8fbff",
            color: "#1f3654",
            fontSize: 14,
            lineHeight: 1.2,
            fontWeight: 600,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: 999, background: "#3b82f6", display: "inline-block" }} />
          {item}
        </span>
      ))}
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          style={{ display: "flex", alignItems: "flex-start", gap: 10, color: "#24364f", fontSize: 15, lineHeight: 1.5 }}
        >
          <span
            style={{
              marginTop: 5,
              width: 12,
              height: 12,
              borderRadius: 999,
              border: "2px solid #1d4ed8",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectsClient({ pageHero, projects }: ProjectsClientProps) {
  const featuredProjects = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    const featured = projects
      .filter((p) => p.is_featured)
      .sort((a, b) => a.order - b.order);
    return featured.slice(0, 4);
  }, [projects]);

  const items = useMemo(() => {
    if (featuredProjects.length > 0) return toFancyItems(featuredProjects);
    return toFancyItems(projects);
  }, [featuredProjects, projects]);

  const allProjects = useMemo(() => {
    if (!projects || projects.length === 0) return [] as ProjectData[];
    const featuredIds = new Set(featuredProjects.map((p) => p.id));
    const nonFeatured = projects
      .filter((p) => !featuredIds.has(p.id))
      .sort((a, b) => a.order - b.order);
    if (nonFeatured.length > 0) return nonFeatured;
    return [] as ProjectData[];
  }, [projects, featuredProjects]);
  const [activeImage, setActiveImage] = useState(0);
  const [openTab, setOpenTab] = useState<number | null>(null);
  const [openAllProject, setOpenAllProject] = useState<FancyItem | null>(null);
  const overlayOpen = openTab !== null || openAllProject !== null;

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPosition = body.style.position;
    const prevBodyTop = body.style.top;
    const prevBodyWidth = body.style.width;

    if (overlayOpen) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";
    } else {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.width = prevBodyWidth;
    }

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.position = prevBodyPosition;
      body.style.top = prevBodyTop;
      body.style.width = prevBodyWidth;
      if (overlayOpen) {
        window.scrollTo(0, scrollY);
      }
    };
  }, [overlayOpen]);

  const title = pageHero?.title || "Our Projects";
  const allProjectsTitle = pageHero?.title || "All Projects";
  const allProjectsSubtitle = pageHero?.subtitle || "Explore more project work beyond featured showcases.";

  return (
    <main className="projects-fancy-page section-clip-x">
      <section className="fancy-nav" aria-label={title}>
        <div className="fancy-nav__imgs" aria-hidden="true">
          {items.map((item, idx) => (
            <div
              key={`img-${item.id}`}
              className="fancy-nav__img"
              style={{ opacity: activeImage === idx ? 1 : 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.title} />
            </div>
          ))}
        </div>

        <div className="fancy-nav__list">
          {items.map((item, idx) => (
            <button
              key={item.id}
              className="fancy-nav__item"
              type="button"
              onMouseEnter={() => setActiveImage(idx)}
              onFocus={() => setActiveImage(idx)}
              onClick={() => setOpenTab(idx)}
            >
              <div className="fancy-nav__item-details" style={{ backgroundColor: item.accentColor }}>
                <h3 className="fancy-nav__title">{item.title}</h3>
                <div className="fancy-nav__description">
                  <p>{item.short}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className={`fancy-nav__tabs ${openTab !== null ? "is-visible" : ""}`}>
          {items.map((item, idx) => {
            const isVisible = openTab === idx;
            return (
              <div
                key={`tab-${item.id}`}
                className={`fancy-nav__tab ${isVisible ? "is-visible" : ""}`}
                style={{ backgroundColor: item.accentColor }}
              >
                <div className="fancy-nav__tab-container">
                  <button
                    type="button"
                    className={`fancy-nav__close-btn ${isVisible ? "is-visible" : ""}`}
                    title="Close"
                    onClick={() => setOpenTab(null)}
                  />

                  <div className={`fancy-nav__tab-img ${isVisible ? "is-visible" : ""}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div className={`fancy-nav__tab-description ${isVisible ? "is-visible" : ""}`}>
                    <h3 className="fancy-nav__tab-title">{item.title}</h3>

                    <div className="fancy-nav__tab-content">
                      <DetailSection label="Description"><p>{item.readMore.description}</p></DetailSection>
                      <DetailSection label="Tech Stack Used"><PillList items={item.readMore.techStack} /></DetailSection>
                      <DetailSection label="Platforms Availability"><PillList items={item.readMore.platforms} /></DetailSection>
                      <DetailSection label="Challenges"><CheckList items={item.readMore.challenges} /></DetailSection>
                      <DetailSection label="Features"><CheckList items={item.readMore.features} /></DetailSection>
                      <DetailSection label="Team Members"><PillList items={item.readMore.teamMembers} /></DetailSection>
                      <DetailSection label="Links">
                        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                          {item.readMore.downloadLinks.map((dl, i) => (
                            <a
                              key={`${item.id}-dl-${i}`}
                              href={dl.href}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                borderRadius: 999,
                                border: "1px solid #123a68",
                                padding: "8px 14px",
                                color: "#123a68",
                                fontWeight: 700,
                                textDecoration: "none",
                              }}
                            >
                              Visit
                            </a>
                          ))}
                        </div>
                      </DetailSection>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {openAllProject && (
        <section className="fancy-nav__tabs is-visible" style={{ position: "fixed", inset: 0, zIndex: 120 }}>
          <div className="fancy-nav__tab is-visible" style={{ backgroundColor: openAllProject.accentColor || "#304949" }}>
            <div className="fancy-nav__tab-container">
              <button
                type="button"
                className="fancy-nav__close-btn is-visible"
                title="Close"
                onClick={() => setOpenAllProject(null)}
              />

              <div className="fancy-nav__tab-img is-visible">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={openAllProject.image} alt={openAllProject.title} />
              </div>

              <div className="fancy-nav__tab-description is-visible">
                <h3 className="fancy-nav__tab-title">{openAllProject.title}</h3>
                <div className="fancy-nav__tab-content">
                  <DetailSection label="Description"><p>{openAllProject.readMore.description}</p></DetailSection>
                  <DetailSection label="Tech Stack Used"><PillList items={openAllProject.readMore.techStack} /></DetailSection>
                  <DetailSection label="Platforms Availability"><PillList items={openAllProject.readMore.platforms} /></DetailSection>
                  <DetailSection label="Challenges"><CheckList items={openAllProject.readMore.challenges} /></DetailSection>
                  <DetailSection label="Features"><CheckList items={openAllProject.readMore.features} /></DetailSection>
                  <DetailSection label="Team Members"><PillList items={openAllProject.readMore.teamMembers} /></DetailSection>
                  <DetailSection label="Links">
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      {openAllProject.readMore.downloadLinks.map((dl, i) => (
                        <a
                          key={`all-dl-${i}`}
                          href={dl.href}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            borderRadius: 999,
                            border: "1px solid #123a68",
                            padding: "8px 14px",
                            color: "#123a68",
                            fontWeight: 700,
                            textDecoration: "none",
                          }}
                        >
                          Visit
                        </a>
                      ))}
                    </div>
                  </DetailSection>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <header className="text-center mb-10 md:mb-12">
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black tracking-tight text-[#123a68] uppercase">
              {allProjectsTitle}
            </h2>
            <p className="mt-3 text-[#5a6b7d] text-base md:text-lg">
              {allProjectsSubtitle}
            </p>
          </header>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {(allProjects.length > 0
              ? allProjects
              : projects && projects.length > 0
              ? projects
              : []
            ).map((project, idx) => {
              const cardImg =
                project.background_image ||
                project.hero?.background_image ||
                project.tagline?.background_image ||
                "https://images.unsplash.com/photo-1588515724527-074a7a56616c?auto=format&fit=crop&q=80&w=1160";
              const cardDetail = toFancyItemFromProject(project, idx);

              return (
                <div key={`all-${project.id}`} className="block group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={project.name}
                    src={cardImg}
                    className="h-56 w-full rounded-se-3xl rounded-es-3xl object-cover sm:h-64 lg:h-72 transition-transform duration-300 group-hover:scale-[1.02]"
                  />

                  <div className="mt-4 sm:flex sm:items-center sm:justify-center sm:gap-4">
                    <strong className="font-semibold text-[#1f2937]">{project.name}</strong>

                    <span className="hidden sm:block sm:h-px sm:w-8 sm:bg-[#27446e]" />

                    <button
                      type="button"
                      onClick={() => setOpenAllProject(cardDetail)}
                      className="mt-2 sm:mt-0 inline-flex items-center rounded-full border border-[#27446e] px-4 py-1.5 text-sm font-semibold text-[#27446e] hover:bg-[#27446e] hover:text-white transition-colors"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";
import Image from "next/image";
import "./projects.css";
import type { ProjectData, ProjectsPageHeroData } from "@/lib/api";

// ── Static fallback data ──────────────────────────────────
const STATIC_PROJECTS = [
  {
    name: "Yummyever",
    description: "The #1 Restaurant OS in Nepal. IRD Approved Billing, Inventory, and KOT. Stop worrying about operations and focus on your food.",
    accent_color: "#f97316",
    bg: "bg-zinc-100",
    textColor: "text-zinc-900",
    descColor: "text-zinc-800",
    artClass: "art-1",
    zIndex: "z-20",
    opacity: "",
    bgStyle: {},
  },
  {
    name: "Sikshyaever",
    description: "The complete Learning Institute management system.",
    accent_color: "#00a6cb",
    bg: "bg-[#0a192f]",
    textColor: "text-white",
    descColor: "text-white/80",
    artClass: "art-2",
    zIndex: "z-30",
    opacity: "opacity-0",
    bgStyle: {},
  },
];

interface ProjectsClientProps {
  pageHero?: ProjectsPageHeroData | null;
  projects?: ProjectData[];
}

export function ProjectsClient({ pageHero, projects }: ProjectsClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Resolve display data — gracefully handle any number of projects (1, 2, 3+)
  const p0 = projects?.[0];
  const p1 = projects?.[1] ?? projects?.[0]; // fall back to p0 if only 1 project
  const p2 = projects?.[2] ?? projects?.[0]; // fall back to p0 if fewer than 3
  const pLast = projects && projects.length > 0 ? projects[projects.length - 1] : null;

  const heroTitle = pageHero?.title ?? "Our Projects.";
  const heroSubtitle = pageHero?.subtitle ?? "Discover the products powering the next generation of businesses. Built by Everacy.";
  const heroLogo = pageHero?.logo ?? "/logo/everacy_wo_bg.png";

  // Project 1 (art-1)
  const art1Name = p0?.name ?? "Yummyever";
  const art1Desc = p0?.description ?? "The #1 Restaurant OS in Nepal. IRD Approved Billing, Inventory, and KOT. Stop worrying about operations and focus on your food.";
  const art1Color = p0?.accent_color ?? "#f97316";
  const art1Bg = p0?.hero?.background_image ?? null;

  // Project 2 (art-2)
  const art2Name = p1?.name ?? "Sikshyaever";
  const art2Desc = p1?.description ?? "The complete Learning Institute management system.";
  const art2Color = p1?.accent_color ?? "#00a6cb";
  const art2Bg = p1?.hero?.background_image ?? null;

  // Project 3 (art-3) — chat/Q&A style
  const art3Name = p2?.name ?? "Taskflow";
  const art3Color = p2?.accent_color ?? "#8cd4dd";
  const art3Bg = p2?.hero?.background_image ?? null;
  // Use the project's details if available; generate Q&A pairs from description as fallback
  const art3Details = p2?.details && p2.details.length > 0
    ? p2.details
    : [
        { id: 1, question: `What is ${art3Name}?`, answer: p2?.description ?? "A powerful Project Management system.", order: 0 },
        { id: 2, question: "Why do we need it?", answer: "To streamline workflows and accelerate delivery.", order: 1 },
        { id: 3, question: "Let's get things done.", answer: "", order: 2 },
      ];

  // Final tagline (art-4)
  const art4Bg = pLast?.tagline?.background_image ?? null;
  const art4Text = pLast?.tagline?.text ?? "Everacy.\nEngineering Tomorrow.";

  useEffect(() => {
    if (!window.matchMedia("(min-width: 769px)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".art-1", { clipPath: "ellipse(220% 200% at 50% 300%)" });
      gsap.set(".art-4", { clipPath: "ellipse(220% 200% at 50% 300%)" });

      gsap.set(".mask-header", {
        clipPath: "inset(0 0 0 0)",
        mask: "linear-gradient(white 50%, transparent) 0 100% / 100% 200% no-repeat",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1800%",
          pin: true,
          scrub: 1,
        },
      });

      tl
        .to(".sec-1 .bg-elem", { scale: 0.6, yPercent: -5, opacity: 0, borderRadius: "40px", duration: 1 })
        .to(".sec-1 .content", { opacity: 0, yPercent: -20, duration: 1 }, "<")
        .to(".art-1", { clipPath: "ellipse(220% 200% at 50% 175%)", duration: 1.5 }, "<0.2")
        .to(".art-1 .mask-header", { maskPosition: "0 0", duration: 1 }, "<")
        .to({}, { duration: 0.5 })
        .from(".art-1 .mask-desc", { yPercent: 20, opacity: 0, duration: 1 })
        .to({}, { duration: 2.5 })
        .to(".art-1 .text-wrap", { filter: "blur(2rem)", opacity: 0, yPercent: -30, duration: 1 })
        .to(".art-2", { opacity: 1, duration: 1 }, "-=0.5")
        .to(".art-2 .mask-header", { maskPosition: "0 0", duration: 1 }, "<")
        .to({}, { duration: 0.5 })
        .from(".art-2 .mask-desc", { yPercent: 20, opacity: 0, duration: 1 })
        .to({}, { duration: 2.5 })
        .to(".art-2 .text-wrap", { filter: "blur(2rem)", opacity: 0, yPercent: -30, duration: 1 })
        .to(".art-3", { opacity: 1, duration: 1 }, "-=0.5")
        .from(".art-3 .taskflow-header", { yPercent: 20, opacity: 0, duration: 0.8 }, "<0.5")
        .from(".tf-chat-1", { yPercent: 40, opacity: 0, duration: 0.8 })
        .to({}, { duration: 0.8 })
        .from(".tf-chat-2", { yPercent: 40, opacity: 0, duration: 0.8 })
        .to({}, { duration: 0.8 })
        .from(".tf-chat-3", { yPercent: 40, opacity: 0, duration: 0.8 })
        .to({}, { duration: 0.8 })
        .from(".tf-chat-4", { yPercent: 40, opacity: 0, duration: 0.8 })
        .to({}, { duration: 0.8 })
        .from(".tf-chat-5", { yPercent: 40, opacity: 0, duration: 0.8 })
        .to({}, { duration: 2.5 })
        .to(".art-3 .content-wrap", { opacity: 0, filter: "blur(2rem)", yPercent: -10, duration: 1 })
        .to(".art-4", { clipPath: "ellipse(220% 200% at 50% 175%)", duration: 1.5 }, "-=0.4")
        .to({}, { duration: 2 });
    }, containerRef);

    return () => { ctx.revert(); };
  }, []);

  return (
    <main className="projects-page overflow-x-hidden bg-black text-white min-h-screen section-clip-x">
      <div ref={containerRef} className="panel-container relative h-screen w-full">

        {/* SECTION 1: HERO */}
        <section className="projects-panel sec-1 absolute inset-0 w-full h-full z-10 flex flex-col justify-center items-center text-center p-8 bg-black">
          <div className="bg-elem absolute inset-0 w-full h-full origin-top bg-black overflow-hidden">
            <LiquidEffectAnimation fill="absolute" zIndex={0} />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none z-10"
              style={{ background: "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(3,8,24,0.3) 0%, rgba(2,5,18,0.75) 100%)" }}
            />
          </div>
          <div className="content relative z-20 max-w-4xl mx-auto w-full flex flex-col items-center">
            <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6 filter drop-shadow-[0_0_15px_rgba(17,142,198,0.5)]">
              <Image src={heroLogo} alt="Everacy Logo" fill className="object-contain" />
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 font-mont uppercase drop-shadow-lg">
              {heroTitle}
            </h1>
            <p className="text-xl md:text-2xl max-w-md text-white/80 drop-shadow-md">{heroSubtitle}</p>
          </div>
        </section>

        {/* SECTION 2: PROJECT 1 */}
        <article
          className="projects-panel art-1 absolute inset-0 w-full h-full z-20 flex flex-col justify-center items-center text-center p-8 border-t border-white/10"
          style={{ backgroundColor: art1Bg ? "transparent" : "#f4f4f5" }}
        >
          {art1Bg && (
            <div className="absolute inset-0 w-full h-full -z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="absolute inset-0 w-full h-full object-cover brightness-75" src={art1Bg} alt="" />
            </div>
          )}
          <div className="content relative z-10 max-w-4xl mx-auto w-full flex flex-col justify-center items-center text-center">
            <div className="text-wrap">
              <div className="text-animate flex flex-col gap-6 items-center">
                <h2
                  className="mask-header text-5xl md:text-7xl font-bold tracking-tighter font-mont uppercase"
                  style={{ color: art1Color }}
                >
                  {art1Name}.
                </h2>
                <p className={`mask-desc text-xl md:text-3xl font-medium max-w-2xl ${art1Bg ? "text-white/90" : "text-zinc-800"}`}>
                  {art1Desc}
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* SECTION 3: PROJECT 2 */}
        <article
          className="projects-panel art-2 absolute inset-0 w-full h-full z-30 flex flex-col justify-center items-center text-center p-8 opacity-0 text-white"
          style={{ backgroundColor: art2Bg ? "transparent" : "#0a192f" }}
        >
          {art2Bg && (
            <div className="absolute inset-0 w-full h-full -z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="absolute inset-0 w-full h-full object-cover brightness-50" src={art2Bg} alt="" />
            </div>
          )}
          <div className="content relative z-10 max-w-4xl mx-auto w-full flex flex-col justify-center items-center text-center">
            <div className="text-wrap flex justify-center">
              <div className="text-animate flex flex-col items-center gap-6">
                <h2
                  className="mask-header text-5xl md:text-7xl font-bold tracking-tighter font-mont uppercase"
                  style={{ color: art2Color }}
                >
                  {art2Name}.
                </h2>
                <p className="mask-desc text-xl md:text-3xl font-medium max-w-2xl text-white/80">
                  {art2Desc}
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* SECTION 4: PROJECT 3 — Chat/Q&A style */}
        <article className="projects-panel art-3 absolute inset-0 w-full h-full z-40 flex flex-col p-8 opacity-0">
          <div className="absolute inset-0 w-full h-full -z-10 bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="absolute inset-0 w-full h-full object-cover brightness-50 saturate-50"
              src={art3Bg ?? "https://picsum.photos/1920/1080?random=3"}
              alt=""
            />
          </div>
          <div className="content-wrap relative z-10 max-w-4xl mx-auto w-full pt-20 md:pt-32 h-full flex flex-col justify-between">
            <h2
              className="taskflow-header text-5xl md:text-7xl font-bold tracking-tighter font-mont uppercase"
              style={{ color: art3Color }}
            >
              {art3Name}.
            </h2>
            <div className="chat-container flex-1 mt-8 w-full flex flex-col justify-center pb-12">
              <div className="text-blocks flex flex-col gap-4 md:gap-6 ml-auto mr-0 max-w-md w-full">
                {art3Details.slice(0, 5).map((detail, idx) => {
                  const chatClass = `tf-chat-${idx + 1}`;
                  const isAnswer = idx % 2 === 1;
                  return isAnswer ? (
                    <p
                      key={detail.id}
                      className={`${chatClass} bg-black/50 border border-[#00a6cb] shadow-[0_0_15px_rgba(0,166,203,0.3)] text-white p-3 md:p-4 rounded-lg self-end text-right text-lg md:text-2xl font-bold font-mont`}
                    >
                      {detail.answer}
                    </p>
                  ) : (
                    <p
                      key={detail.id}
                      className={`${chatClass} bg-white/10 p-3 md:p-4 rounded-lg self-start text-lg md:text-2xl font-bold font-mont${idx === art3Details.length - 1 ? " border border-white/20" : ""}`}
                    >
                      {detail.question}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </article>

        {/* SECTION 5: FINAL TAGLINE */}
        <article className="projects-panel art-4 absolute inset-0 w-full h-full z-50 flex flex-col justify-center items-center text-center p-8 bg-black">
          <div className="absolute inset-0 w-full h-full -z-10 bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="absolute inset-0 w-full h-full object-cover brightness-50"
              src={art4Bg ?? "https://picsum.photos/1920/1080?random=4"}
              alt=""
            />
          </div>
          <div className="content relative z-10 drop-shadow-xl">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter font-mont uppercase text-white shadow-black whitespace-pre-line">
              {art4Text}
            </h2>
          </div>
        </article>

      </div>
    </main>
  );
}

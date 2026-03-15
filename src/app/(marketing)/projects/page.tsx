"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";
import Image from "next/image";
import "./projects.css";

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 769px)").matches) {
      return;
    }

    // Register the GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // Setup initial clipping masks for the sweeping curve effect
      gsap.set(".art-1", { clipPath: "ellipse(220% 200% at 50% 300%)" });
      gsap.set(".art-4", { clipPath: "ellipse(220% 200% at 50% 300%)" });

      // Setup the "scroll-driven" text mask reveals
      gsap.set(".mask-header", {
        clipPath: "inset(0 0 0 0)",
        mask: "linear-gradient(white 50%, transparent) 0 100% / 100% 200% no-repeat",
      });

      // We extend the timeline to 1800% to provide even more granular control and longer reading pauses
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1800%",
          pin: true,
          scrub: 1, // Smooth dampening on scrub
        },
      });

      tl
        // 1. Hero area shrinks and fades backward
        .to(".sec-1 .bg-elem", { scale: 0.6, yPercent: -5, opacity: 0, borderRadius: "40px", duration: 1 })
        .to(".sec-1 .content", { opacity: 0, yPercent: -20, duration: 1 }, "<")
        
        // 2. Yummyever sweeps up with the curved effect over the shrinking Hero
        .to(".art-1", { clipPath: "ellipse(220% 200% at 50% 175%)", duration: 1.5 }, "<0.2")
        
        // 3. Yummyever header scroll-driven reveal
        .to(".art-1 .mask-header", { maskPosition: "0 0", duration: 1 }, "<")
        
        // 4. Pause on header
        .to({}, { duration: 0.5 })
        
        // 5. Yummyever description scroll-driven reveal
        .from(".art-1 .mask-desc", { yPercent: 20, opacity: 0, duration: 1 })
        
        // 6. Pause for reading Yummyever
        .to({}, { duration: 2.5 })
        
        // 7. Yummyever blurs out and moves up
        .to(".art-1 .text-wrap", { filter: "blur(2rem)", opacity: 0, yPercent: -30, duration: 1 })
        
        // 8. Sikshyaever (Deep Blue) fades in
        .to(".art-2", { opacity: 1, duration: 1 }, "-=0.5")
        
        // 9. Sikshyaever header scroll-driven reveal
        .to(".art-2 .mask-header", { maskPosition: "0 0", duration: 1 }, "<")

        // 10. Pause on header
        .to({}, { duration: 0.5 })
        
        // 11. Sikshyaever description scroll-driven reveal
        .from(".art-2 .mask-desc", { yPercent: 20, opacity: 0, duration: 1 })
        
        // 12. Pause for reading Sikshyaever
        .to({}, { duration: 2.5 })
        
        // 13. Sikshyaever blurs out
        .to(".art-2 .text-wrap", { filter: "blur(2rem)", opacity: 0, yPercent: -30, duration: 1 })
        
        // 10. Taskflow background fades in
        .to(".art-3", { opacity: 1, duration: 1 }, "-=0.5")
        .from(".art-3 .taskflow-header", { yPercent: 20, opacity: 0, duration: 0.8 }, "<0.5")
        
        // 11. Taskflow Chat Bubbles - Manual Scroll Sequencing
        // Explicit pauses and reveals so the user scrolls to reveal each specific line
        .from(".tf-chat-1", { yPercent: 40, opacity: 0, duration: 0.8 })
        .to({}, { duration: 0.8 }) // Scroll pause
        .from(".tf-chat-2", { yPercent: 40, opacity: 0, duration: 0.8 })
        .to({}, { duration: 0.8 }) // Scroll pause
        .from(".tf-chat-3", { yPercent: 40, opacity: 0, duration: 0.8 })
        .to({}, { duration: 0.8 }) // Scroll pause
        .from(".tf-chat-4", { yPercent: 40, opacity: 0, duration: 0.8 })
        .to({}, { duration: 0.8 }) // Scroll pause
        .from(".tf-chat-5", { yPercent: 40, opacity: 0, duration: 0.8 })
        
        // 12. Pause at the end of the chat so they can read it all
        .to({}, { duration: 2.5 })
        
        // 13. Taskflow text blurs out
        .to(".art-3 .content-wrap", { opacity: 0, filter: "blur(2rem)", yPercent: -10, duration: 1 })
        
        // 14. Fin sweeps up with the curved effect
        .to(".art-4", { clipPath: "ellipse(220% 200% at 50% 175%)", duration: 1.5 }, "-=0.4")
        
        // 15. Final pause before unpinning allows the user to see the Everacy closeout naturally
        .to({}, { duration: 2 });

    }, containerRef); // Scope to our ref!

    return () => {
      ctx.revert();
    };
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
              style={{
                background: "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(3,8,24,0.3) 0%, rgba(2,5,18,0.75) 100%)",
              }}
            />
          </div>
          <div className="content relative z-20 max-w-4xl mx-auto w-full flex flex-col items-center">
            <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6 filter drop-shadow-[0_0_15px_rgba(17,142,198,0.5)]">
              <Image src="/logo/everacy_wo_bg.png" alt="Everacy Logo" fill className="object-contain" />
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-4 font-mont uppercase drop-shadow-lg">Our Projects.</h1>
            <p className="text-xl md:text-2xl max-w-md text-white/80 drop-shadow-md">Discover the products powering the next generation of businesses. Built by Everacy.</p>
          </div>
        </section>

        {/* SECTION 2: YUMMYEVER */}
        <article className="projects-panel art-1 absolute inset-0 w-full h-full z-20 flex flex-col justify-center items-center text-center p-8 bg-zinc-100 text-zinc-900 border-t border-white/10">
          <div className="content relative z-10 max-w-4xl mx-auto w-full flex flex-col justify-center items-center text-center">
            <div className="text-wrap">
              <div className="text-animate flex flex-col gap-6 items-center">
                <h2 className="mask-header text-5xl md:text-7xl font-bold tracking-tighter font-mont uppercase text-[#f97316]">Yummyever.</h2>
                <p className="mask-desc text-xl md:text-3xl font-medium max-w-2xl text-zinc-800">The #1 Restaurant OS in Nepal. IRD Approved Billing, Inventory, and KOT. Stop worrying about operations and focus on your food.</p>
              </div>
            </div>
          </div>
        </article>

        {/* SECTION 3: SIKSHYAEVER */}
        <article className="projects-panel art-2 absolute inset-0 w-full h-full z-30 flex flex-col justify-center items-center text-center p-8 bg-[#0a192f] opacity-0 text-white">
          <div className="content relative z-10 max-w-4xl mx-auto w-full flex flex-col justify-center items-center text-center">
            <div className="text-wrap flex justify-center">
              <div className="text-animate flex flex-col items-center gap-6">
                <h2 className="mask-header text-5xl md:text-7xl font-bold tracking-tighter font-mont uppercase text-[#00a6cb]">Sikshyaever.</h2>
                <p className="mask-desc text-xl md:text-3xl font-medium max-w-2xl text-white/80">The complete Learning Institute management system.</p>
              </div>
            </div>
          </div>
        </article>

        {/* SECTION 4: TASKFLOW */}
        <article className="projects-panel art-3 absolute inset-0 w-full h-full z-40 flex flex-col p-8 opacity-0">
          <div className="absolute inset-0 w-full h-full -z-10 bg-black">
            <img className="absolute inset-0 w-full h-full object-cover brightness-50 saturate-50" src="https://picsum.photos/1920/1080?random=3" alt="" />
          </div>
          <div className="content-wrap relative z-10 max-w-4xl mx-auto w-full pt-20 md:pt-32 h-full flex flex-col justify-between">
            <h2 className="taskflow-header text-5xl md:text-7xl font-bold tracking-tighter font-mont uppercase text-[#8cd4dd]">Taskflow.</h2>
            <div className="chat-container flex-1 mt-8 w-full flex flex-col justify-center pb-12">
              <div className="text-blocks flex flex-col gap-4 md:gap-6 ml-auto mr-0 max-w-md w-full">
                <p className="tf-chat-1 bg-white/10 p-3 md:p-4 rounded-lg self-start text-lg md:text-2xl font-bold font-mont">What is Taskflow?</p>
                <p className="tf-chat-2 bg-black/50 border border-[#00a6cb] shadow-[0_0_15px_rgba(0,166,203,0.3)] text-white p-3 md:p-4 rounded-lg self-end text-right text-lg md:text-2xl font-bold font-mont">A powerful Project<br/>Management system.</p>
                <p className="tf-chat-3 bg-white/10 p-3 md:p-4 rounded-lg self-start text-lg md:text-2xl font-bold font-mont">Why do we need it?</p>
                <p className="tf-chat-4 bg-black/50 border border-[#00a6cb] shadow-[0_0_15px_rgba(0,166,203,0.3)] text-white p-3 md:p-4 rounded-lg self-end text-right text-lg md:text-2xl font-bold font-mont">To streamline workflows<br/>and accelerate delivery.</p>
                <p className="tf-chat-5 bg-white/10 p-3 md:p-4 rounded-lg self-start text-lg md:text-2xl font-bold font-mont border border-white/20">Let&apos;s get things done.</p>
              </div>
            </div>
          </div>
        </article>

        {/* SECTION 5: FIN */}
        <article className="projects-panel art-4 absolute inset-0 w-full h-full z-50 flex flex-col justify-center items-center text-center p-8 bg-black">
          <div className="absolute inset-0 w-full h-full -z-10 bg-black">
            <img className="absolute inset-0 w-full h-full object-cover brightness-50" src="https://picsum.photos/1920/1080?random=4" alt="" />
          </div>
          <div className="content relative z-10 drop-shadow-xl">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter font-mont uppercase text-white shadow-black">Everacy.<br />Engineering Tomorrow.</h2>
          </div>
        </article>
        
      </div>

    </main>
  );
}

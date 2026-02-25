"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { processBg, processConfig } from "@/lib/site-theme";

export function ProcessSection() {
  const { title, subtitle, steps } = processConfig;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    const ctx = gsap.context(() => {
      // Animate cards
      const stepRows = gsap.utils.toArray(".process-step-row");
      stepRows.forEach((step: any) => {
        gsap.from(step.querySelector(".step-card"), {
          opacity: 0,
          y: 40,
          duration: 1,
          scrollTrigger: {
            trigger: step,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Animate SVG connectors and trail dots
      const connectorWrappers = gsap.utils.toArray(".connector-wrapper");
      connectorWrappers.forEach((wrapper: any) => {
        const path = wrapper.querySelector(".connector-path");
        const dot = wrapper.querySelector(".trail-dot");
        
        if (!path || !dot) return;

        const pathLength = path.getTotalLength();
        
        // Initial setup for path (drawn effect)
        gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

        // Animation Timeline synced to scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top center+=200",
            end: "bottom center",
            scrub: 1,
          }
        });

        tl.to(path, { strokeDashoffset: 0, ease: "none" }, 0)
          .to(dot, {
            motionPath: {
              path: path,
              align: path,
              alignOrigin: [0.5, 0.5]
            },
            ease: "none"
          }, 0);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative z-[2] py-24 font-mont overflow-hidden" 
      style={{ background: processBg }}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6 relative">
        {/* Header */}
        <div className="mb-24 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tight">
                {title}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                {subtitle}
            </p>
        </div>

        {/* Content */}
        <div className="relative">
          
          {/* Step 1 */}
          <div className="process-step-row flex flex-row relative mb-8">
            <div className="hidden md:flex flex-col items-center step-label">
              <div className="w-32 py-6 border-2 border-[#27446e]/20 rounded-xl mr-4 uppercase flex flex-col items-center justify-center bg-white shadow-sm">
                <div className="text-3xl font-black text-[#27446e]">{steps[0].step}</div>
                <div className="text-[#27446e]/60 text-xs font-bold tracking-widest mt-1">Idea</div>
              </div>
            </div>
            <div className="step-card flex-auto border border-slate-200 rounded-2xl bg-white p-6 md:p-8 shadow-sm group hover:border-[#27446e] transition-all duration-300 hover:shadow-md">
              <div className="flex md:flex-row flex-col items-center gap-8">
                <div className="flex-auto">
                  <div className="md:hidden text-xs font-black uppercase mb-2 text-[#27446e] tracking-widest">
                    {steps[0].step}
                  </div>
                  <h3 className="text-2xl md:text-3xl text-slate-900 font-extrabold mb-4">
                    {steps[0].title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {steps[0].detail}
                  </p>
                </div>
                <div className="shrink-0">
                    <div className="w-20 h-20 bg-[#27446e]/5 rounded-2xl flex items-center justify-center text-[#27446e] group-hover:bg-[#27446e] group-hover:text-white transition-colors duration-300">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* S-Connect 1 to 2 */}
          <div className="connector-wrapper hidden md:flex items-start flex-row relative h-40">
             <svg className="absolute top-[-20px] left-0 w-full h-[140px] pointer-events-none overflow-visible" preserveAspectRatio="none">
                <path 
                  className="connector-path"
                  d="M 80,20 V 100 Q 80,120 100,120 H 900 Q 920,120 920,140 V 180" 
                  fill="none" 
                  stroke="#27446e" 
                  strokeWidth="3" 
                  strokeDasharray="8 8" 
                  opacity="0.3"
                />
                <circle className="trail-dot" r="7" fill="white" stroke="#27446e" strokeWidth="2.5" shadow-sm="" />
             </svg>
          </div>

          {/* Step 2 */}
          <div className="process-step-row flex flex-row-reverse relative mb-8">
            <div className="hidden md:flex flex-col items-center step-label">
              <div className="w-32 py-6 border-2 border-[#27446e]/20 rounded-xl ml-4 uppercase flex flex-col items-center justify-center bg-white shadow-sm">
                <div className="text-3xl font-black text-[#27446e]">{steps[1].step}</div>
                <div className="text-[#27446e]/60 text-xs font-bold tracking-widest mt-1">Team</div>
              </div>
            </div>
            <div className="step-card flex-auto border border-slate-200 rounded-2xl bg-white p-6 md:p-8 shadow-sm group hover:border-[#27446e] transition-all duration-300 hover:shadow-md">
              <div className="flex md:flex-row flex-col items-center gap-8">
                <div className="flex-auto">
                  <div className="md:hidden text-xs font-black uppercase mb-2 text-[#27446e] tracking-widest">
                    {steps[1].step}
                  </div>
                  <h3 className="text-2xl md:text-3xl text-slate-900 font-extrabold mb-4">
                    {steps[1].title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {steps[1].detail}
                  </p>
                </div>
                <div className="shrink-0">
                    <div className="w-20 h-20 bg-[#27446e]/5 rounded-2xl flex items-center justify-center text-[#27446e] group-hover:bg-[#27446e] group-hover:text-white transition-colors duration-300">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* S-Connect 2 to 3 */}
          <div className="connector-wrapper hidden md:flex items-start flex-row-reverse relative h-40">
             <svg className="absolute top-[-20px] left-0 w-full h-[140px] pointer-events-none overflow-visible" preserveAspectRatio="none">
                <path 
                  className="connector-path"
                  d="M 920,20 V 100 Q 920,120 900,120 H 100 Q 80,120 80,140 V 180" 
                  fill="none" 
                  stroke="#27446e" 
                  strokeWidth="3" 
                  strokeDasharray="8 8" 
                  opacity="0.3"
                />
                <circle className="trail-dot" r="7" fill="white" stroke="#27446e" strokeWidth="2.5" shadow-sm="" />
             </svg>
          </div>

          {/* Step 3 */}
          <div className="process-step-row flex flex-row relative mb-8">
            <div className="hidden md:flex flex-col items-center step-label">
              <div className="w-32 py-6 border-2 border-[#27446e]/20 rounded-xl mr-4 uppercase flex flex-col items-center justify-center bg-white shadow-sm">
                <div className="text-3xl font-black text-[#27446e]">{steps[2].step}</div>
                <div className="text-[#27446e]/60 text-xs font-bold tracking-widest mt-1">Design</div>
              </div>
            </div>
            <div className="step-card flex-auto border border-slate-200 rounded-2xl bg-white p-6 md:p-8 shadow-sm group hover:border-[#27446e] transition-all duration-300 hover:shadow-md">
              <div className="flex md:flex-row flex-col items-center gap-8">
                <div className="flex-auto">
                  <div className="md:hidden text-xs font-black uppercase mb-2 text-[#27446e] tracking-widest">
                    {steps[2].step}
                  </div>
                  <h3 className="text-2xl md:text-3xl text-slate-900 font-extrabold mb-4">
                    {steps[2].title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {steps[2].detail}
                  </p>
                </div>
                <div className="shrink-0">
                    <div className="w-20 h-20 bg-[#27446e]/5 rounded-2xl flex items-center justify-center text-[#27446e] group-hover:bg-[#27446e] group-hover:text-white transition-colors duration-300">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* S-Connect 3 to 4 */}
          <div className="connector-wrapper hidden md:flex items-start flex-row relative h-40">
             <svg className="absolute top-[-20px] left-0 w-full h-[140px] pointer-events-none overflow-visible" preserveAspectRatio="none">
                <path 
                  className="connector-path"
                  d="M 80,20 V 100 Q 80,120 100,120 H 900 Q 920,120 920,140 V 180" 
                  fill="none" 
                  stroke="#27446e" 
                  strokeWidth="3" 
                  strokeDasharray="8 8" 
                  opacity="0.3"
                />
                <circle className="trail-dot" r="7" fill="white" stroke="#27446e" strokeWidth="2.5" shadow-sm="" />
             </svg>
          </div>

          {/* Step 4 */}
          <div className="process-step-row flex flex-row-reverse relative">
            <div className="hidden md:flex flex-col items-center step-label">
              <div className="w-32 py-6 border-2 border-[#27446e]/20 rounded-xl ml-4 uppercase flex flex-col items-center justify-center bg-white shadow-sm">
                <div className="text-3xl font-black text-[#27446e]">{steps[3].step}</div>
                <div className="text-[#27446e]/60 text-xs font-bold tracking-widest mt-1">Scale</div>
              </div>
            </div>
            <div className="step-card flex-auto border border-slate-200 rounded-2xl bg-white p-6 md:p-8 shadow-sm group hover:border-[#27446e] transition-all duration-300 hover:shadow-md">
              <div className="flex md:flex-row flex-col items-center gap-8">
                <div className="flex-auto">
                  <div className="md:hidden text-xs font-black uppercase mb-2 text-[#27446e] tracking-widest">
                    {steps[3].step}
                  </div>
                  <h3 className="text-2xl md:text-3xl text-slate-900 font-extrabold mb-4">
                    {steps[3].title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {steps[3].detail}
                  </p>
                </div>
                <div className="shrink-0">
                    <div className="w-20 h-20 bg-[#27446e]/5 rounded-2xl flex items-center justify-center text-[#27446e] group-hover:bg-[#27446e] group-hover:text-white transition-colors duration-300">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

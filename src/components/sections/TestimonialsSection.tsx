/* ─────────────────────────────────────────────────────────
   TestimonialsSection — Cruip slider, React + Tailwind
   Both enter (from left-bottom) + leave (to right-bottom)
   avatar animations play simultaneously, matching Cruip exactly.
   ───────────────────────────────────────────────────────── */
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { testimonials, testimonialBg } from "@/lib/site-theme";

const AUTO_INTERVAL = 7000;
const ANIM_DURATION = 700;

export function TestimonialsSection() {
  const [active,  setActive]  = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const leaveTimer  = useRef<ReturnType<typeof setTimeout>  | null>(null);

  const goTo = useCallback((next: number, current: number) => {
    setLeaving(current);
    setActive(next);
    setAnimKey(k => k + 1);
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setLeaving(null), ANIM_DURATION + 100);
  }, []);

  const startAuto = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % testimonials.length;
        goTo(next, prev);
        return prev; // goTo handles the real state update
      });
    }, AUTO_INTERVAL);
  }, [goTo]);

  useEffect(() => {
    startAuto();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (leaveTimer.current)  clearTimeout(leaveTimer.current);
    };
  }, [startAuto]);

  const handleSelect = useCallback((idx: number) => {
    setActive(cur => {
      if (idx === cur) return cur;
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
      goTo(idx, cur);
      return cur;
    });
  }, [goTo]);

  const activeT  = testimonials[active];
  const leavingT = leaving !== null ? testimonials[leaving] : null;

  const initials = (t: typeof activeT) =>
    t.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <section
      className="relative z-[3] section-clip-x"
      style={{ background: testimonialBg }}
    >
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 pt-0 pb-16 text-center">

        {/* ── Avatar + 800px teal arc ── */}
        <div className="relative h-40 md:h-44">
          {/* 800×800 absolutely-positioned container — the inset-0 rotating divs
              use THIS as their anchor (the h-44 overflow div has no `relative`) */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ width: "min(800px, calc(100vw + 120px))", height: "min(800px, calc(100vw + 120px))" }}
            aria-hidden
          >
            {/* Teal gradient arc */}
            <div
              className="absolute inset-0 rounded-full -z-10"
              style={{
                background:
                  "linear-gradient(180deg, rgba(17,142,198,0.28) 0%, rgba(17,142,198,0.07) 22%, transparent 72%)",
              }}
            />

            {/* Mask area — NO `relative` so inset-0 anchors to 800px container */}
            <div
              className="h-40 md:h-44 overflow-hidden"
              style={{
                maskImage: "linear-gradient(0deg, transparent, white 18%, white)",
                WebkitMaskImage: "linear-gradient(0deg, transparent, white 18%, white)",
              }}
            >
              {/* ── Leaving avatar plays exit animation simultaneously ── */}
              {leavingT && (
                <div
                  key={`leave-${animKey}`}
                  className="absolute inset-0 -z-10"
                  style={{
                    animation: `avatarLeave ${ANIM_DURATION}ms cubic-bezier(0.68,-0.3,0.32,1) both`,
                  }}
                >
                  <div
                    className="absolute top-14 left-1/2 -translate-x-1/2 rounded-full w-20 h-20 flex items-center justify-center text-xl font-extrabold text-white select-none"
                    style={{
                      background: `linear-gradient(135deg, ${leavingT.accent}, #0a3d6e)`,
                      boxShadow: `0 6px 32px ${leavingT.accent}66`,
                      fontFamily: "'Montserrat', sans-serif",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {initials(leavingT)}
                  </div>
                </div>
              )}

              {/* ── Entering avatar plays enter animation ── */}
              <div
                key={`enter-${animKey}`}
                className="absolute inset-0 -z-10"
                style={{
                  animation: `avatarEnter ${ANIM_DURATION}ms cubic-bezier(0.68,-0.3,0.32,1) both`,
                }}
              >
                <div
                  className="absolute top-14 left-1/2 -translate-x-1/2 rounded-full w-20 h-20 flex items-center justify-center text-xl font-extrabold text-white select-none"
                  style={{
                    background: `linear-gradient(135deg, ${activeT.accent}, #0a3d6e)`,
                    boxShadow: `0 6px 32px ${activeT.accent}66`,
                    fontFamily: "'Montserrat', sans-serif",
                    letterSpacing: "0.04em",
                  }}
                >
                  {initials(activeT)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Quote — fixed height, larger text ── */}
        <div className="mb-10 min-h-[15rem] md:min-h-[13rem] flex items-center justify-center overflow-hidden px-1">
          <p
            key={`qt-${animKey}`}
            className="font-bold text-slate-900"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(1.95rem, 7.4vw, 2.35rem)",
              lineHeight: 1.3,
              letterSpacing: "-0.025em",
              animation: "quoteEnter 0.5s ease-in-out 0.2s both",
              maxWidth: "100%",
              overflowWrap: "anywhere",
            }}
          >
            &ldquo;{activeT.quote}&rdquo;
          </p>
        </div>

        {/* ── Selector pills ── */}
        <div className="flex flex-wrap justify-center -m-1.5">
          {testimonials.map((item, idx) => {
            const isActive = active === idx;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(idx)}
                className={[
                  "testimonial-selector-pill inline-flex justify-center whitespace-nowrap rounded-full px-3 py-1.5 m-1.5 text-xs shadow-sm transition-colors duration-150 cursor-pointer",
                  isActive ? "text-white" : "bg-white hover:bg-sky-50 text-slate-900",
                ].join(" ")}
                style={isActive
                  ? { background: "#118ec6", boxShadow: "0 4px 14px rgba(17,142,198,0.3)" }
                  : undefined}
              >
                <span className="font-semibold">{item.name}</span>
                <span className={`px-1 ${isActive ? "text-sky-200" : "text-slate-300"}`}>·</span>
                <span>{item.role}</span>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        /* Enter: left-bottom arc → center */
        @keyframes avatarEnter {
          from { opacity: 0; transform: rotate(-60deg); }
          to   { opacity: 1; transform: rotate(0deg); }
        }
        /* Leave: center → right-bottom arc */
        @keyframes avatarLeave {
          from { opacity: 1; transform: rotate(0deg); }
          to   { opacity: 0; transform: rotate(60deg); }
        }
        @keyframes quoteEnter {
          from { opacity: 0; transform: translateX(-1rem); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 640px) {
          .testimonial-selector-pill {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

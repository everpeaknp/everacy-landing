/* ─────────────────────────────────────────────────────────
   ContactSection — Final CTA with Spotlight Button
   Matches Montserrat font and Everacy brand aesthetics.
   ───────────────────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { contactConfig } from "@/lib/site-theme";
import type { ContactPageData } from "@/lib/api";

interface ContactSectionProps {
  data?: ContactPageData | null;
}

export function ContactSection({ data }: ContactSectionProps) {
  const title = data?.title ?? contactConfig.title;
  const buttonLabel = data?.button_text ?? contactConfig.buttonLabel;

  return (
    <section className="relative z-[2] py-32 bg-white font-mont">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 tracking-tight leading-tight">
          {title.split("Together")[0]}
          <span className="text-[#27446e] block md:inline">Together</span>
        </h2>

        {/* Spotlight Button Wrapper */}
        <div className="flex items-center justify-center">
          <SpotlightButton label={buttonLabel} />
        </div>
      </div>
    </section>
  );
}

const SpotlightButton = ({ label }: { label: string }) => {
  const router = useRouter();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = btnRef.current;
      if (!target || !spanRef.current) return;

      const { width, left: btnLeft, top: btnTop } = target.getBoundingClientRect();
      const x = e.clientX - btnLeft;
      const left = `${(x / width) * 100}%`;

      spanRef.current.animate({ left }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      if (!spanRef.current) return;
      spanRef.current.animate(
        { left: "50%" },
        { duration: 100, fill: "forwards" }
      );
    };

    const target = btnRef.current;
    if (target) {
      target.addEventListener("mousemove", handleMouseMove);
      target.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (target) {
        target.removeEventListener("mousemove", handleMouseMove);
        target.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <motion.button
      whileTap={{ scale: 0.985 }}
      ref={btnRef}
      type="button"
      onClick={() => router.push("/contact")}
      className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-slate-950 px-8 py-5 text-xl font-bold text-white shadow-2xl transition-shadow hover:shadow-brand/20 active:shadow-none"
    >
      <span className="pointer-events-none relative z-10 mix-blend-difference">
        {label}
      </span>
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-[50%] top-[50%] h-40 w-40 -translate-x-[50%] -translate-y-[50%] rounded-full bg-[#27446e] opacity-60 blur-2xl"
      />
    </motion.button>
  );
};

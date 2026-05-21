/* ─────────────────────────────────────────────────────────
   CTASectionComponent — Full-width CTA banner
   Driven by Django CTASection model data.
   ───────────────────────────────────────────────────────── */
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import type { CTASectionData } from "@/lib/api";
import { contactConfig } from "@/lib/site-theme";

interface CTASectionComponentProps {
  data?: CTASectionData | null;
}

export function CTASectionComponent({ data }: CTASectionComponentProps) {
  const router = useRouter();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);

  const heading = data?.heading ?? contactConfig.title;
  const buttonText = data?.button_text ?? contactConfig.buttonLabel;
  const buttonLink = data?.button_link ?? "/contact";
  const bgImage = data?.background_image ?? null;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = btnRef.current;
      if (!target || !spanRef.current) return;
      const { width, left } = target.getBoundingClientRect();
      const x = e.clientX - left;
      spanRef.current.animate(
        { left: `${(x / width) * 100}%` },
        { duration: 250, fill: "forwards" }
      );
    };

    const handleMouseLeave = () => {
      spanRef.current?.animate(
        { left: "50%" },
        { duration: 100, fill: "forwards" }
      );
    };

    const btn = btnRef.current;
    btn?.addEventListener("mousemove", handleMouseMove);
    btn?.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      btn?.removeEventListener("mousemove", handleMouseMove);
      btn?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative z-[2] py-32 overflow-hidden font-mont bg-white">
      {bgImage && (
        <Image
          src={bgImage}
          alt="CTA background"
          fill
          className="object-cover opacity-10"
          priority={false}
        />
      )}

      <div className="relative max-w-4xl mx-auto px-4 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-black text-slate-900 mb-12 tracking-tight leading-tight"
        >
          {heading}
        </motion.h2>

        {/* Spotlight button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <motion.button
            whileTap={{ scale: 0.985 }}
            ref={btnRef}
            type="button"
            onClick={() => router.push(buttonLink)}
            className="relative overflow-hidden rounded-2xl bg-slate-950 px-10 py-5 text-xl font-bold text-white shadow-2xl transition-all hover:shadow-xl active:shadow-none"
          >
            <span className="pointer-events-none relative z-10 mix-blend-difference">
              {buttonText}
            </span>
            <span
              ref={spanRef}
              className="pointer-events-none absolute left-[50%] top-[50%] h-40 w-40 -translate-x-[50%] -translate-y-[50%] rounded-full bg-[#27446e] opacity-60 blur-2xl"
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

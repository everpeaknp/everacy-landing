/* ─────────────────────────────────────────────────────────
   CTASectionComponent — Full-width Sharp Architectural CTA
   Driven by Django CTASection model data.
   Razor-sharp geometry (rounded-none), crisp tactile button.
   ───────────────────────────────────────────────────────── */
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import type { CTASectionData } from "@/lib/api";

interface CTASectionComponentProps {
  data?: CTASectionData | null;
}

export function CTASectionComponent({ data }: CTASectionComponentProps) {
  const router = useRouter();

  const heading = data?.heading;
  const buttonText = data?.button_text;
  const buttonLink = data?.button_link ?? "/contact";
  const bgImage = data?.background_image ?? null;

  if (!heading || !buttonText) return null;

  return (
    <section className="relative z-[2] overflow-hidden border-t border-[#dce8ec] bg-white py-24 sm:py-32 font-mont">
      {bgImage && (
        <Image
          src={bgImage}
          alt="CTA background"
          fill
          className="object-cover opacity-5"
          priority={false}
        />
      )}

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        {/* Micro tag */}
        <div className="inline-flex items-center gap-2 border border-[#dce8ec] bg-[#f8fbfc] px-3 py-1 shadow-sm mb-6">
          <span className="h-2 w-2 bg-[#008da4]" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#008da4]">
            {data?.micro_tag || "Start Your Project"}
          </span>
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0d2a4a] tracking-tight leading-tight uppercase"
        >
          {heading}
        </motion.h2>

        {/* Sharp Tactile Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="mt-10 flex items-center justify-center"
        >
          <button
            type="button"
            onClick={() => router.push(buttonLink)}
            className="group relative inline-flex items-center gap-3 rounded-none border-2 border-[#0d2a4a] bg-[#0d2a4a] px-8 py-4 text-sm sm:text-base font-mono font-bold uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_#008da4] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-[#008da4] hover:bg-[#008da4] hover:shadow-[6px_6px_0px_0px_#0d2a4a] active:translate-x-0 active:translate-y-0 active:shadow-none cursor-pointer"
          >
            <span>{buttonText}</span>
            <span className="transition-transform duration-150 group-hover:translate-x-1">&rarr;</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "@/hooks";

export interface ServiceTestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  metric?: string;
}

const defaultTestimonials: ServiceTestimonialItem[] = [
  {
    quote:
      "Everacy stepped in, structured our architecture, and delivered a rock-solid platform weeks ahead of schedule. Their engineers work like an extension of our own founding team — deeply invested in product quality, speed, and business outcomes.",
    author: "Ananya Verma",
    role: "VP of Product Engineering",
    company: "Yummyever",
    avatar: "/images/person.png",
  },
  {
    quote:
      "From the very first discovery workshop to production launch, every sprint had working software we could test with real operators. Zero surprises, transparent communication, and a codebase our team loves scaling.",
    author: "Rohan Adhikari",
    role: "Director of Operations",
    company: "HospitalityCloud",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
  },
  {
    quote:
      "They didn't just build what we asked for — they simplified our checkout and onboarding flows, hardened our backend APIs, and helped us double active merchant adoption within two months of launch.",
    author: "Siddharth Karki",
    role: "Co-Founder & CTO",
    company: "CommerceCore",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
];

export function ServicesTestimonialSpotlight({
  items = defaultTestimonials,
}: {
  items?: ServiceTestimonialItem[];
  serviceTitle?: string;
}) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];

  if (!current) return null;

  const prev = () => setActive((i) => (i - 1 + items.length) % items.length);
  const next = () => setActive((i) => (i + 1) % items.length);

  return (
    <section
      className="border-b border-[#dce8ec] bg-white px-5 py-20 sm:px-8 sm:py-28"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="mx-auto max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid items-start gap-8 md:grid-cols-[184px_1fr] md:gap-12 lg:gap-14"
          >
            {/* Left: Clean Portrait with Single Asymmetric Bottom-Right Curve */}
            <div className="mx-auto md:mx-0">
              <div className="relative h-[196px] w-[184px] overflow-hidden rounded-br-[2.5rem] bg-gradient-to-b from-[#e7f0f3] to-[#d5e4e9]">
                <Image
                  src={current.avatar}
                  alt={current.author}
                  fill
                  sizes="184px"
                  className="object-cover object-top"
                  unoptimized={Boolean(current.avatar && (current.avatar.startsWith("http") || current.avatar.startsWith("/media")))}
                />
              </div>
            </div>

            {/* Right: Crisp Geometric Quote Icon + Editorial Quote + Author & Company Wordmark */}
            <div>
              {/* Geometric Double-Quote SVG */}
              <svg
                aria-hidden="true"
                viewBox="0 0 40 30"
                fill="none"
                className="h-7 w-9 text-[#00a6cb]"
              >
                <path
                  d="M0 30V17.4C0 11.2 1.6 6.4 4.8 3C8.1 0 12.5 0 16.5 0V6.8C13.1 6.8 10.6 7.8 9.2 9.8C8.1 11.3 7.6 13.4 7.6 16H15.5V30H0ZM24.5 30V17.4C24.5 11.2 26.1 6.4 29.3 3C32.6 0 37 0 40 0V6.8C37.6 6.8 35.1 7.8 33.7 9.8C32.6 11.3 32.1 13.4 32.1 16H40V30H24.5Z"
                  fill="currentColor"
                />
              </svg>

              <blockquote className="mt-5 text-base font-bold leading-[1.7] tracking-[-0.01em] text-[#0d2a4a] sm:text-[18px] sm:leading-[1.75]">
                {current.quote}
              </blockquote>

              <div className="mt-7 flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="text-[15px] font-extrabold text-[#00a6cb]">
                    {current.author}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-[#647b8f]">
                    {current.role}
                  </p>
                </div>

                {/* Editorial Company Wordmark */}
                <span className="select-none text-xl font-black tracking-[-0.04em] text-[#1e354d]/85 sm:text-2xl">
                  {current.company}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Minimalist Bottom-Center Carousel Controls */}
        {items.length > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous testimonial"
              className="grid h-7 w-7 place-items-center text-[#7b90a2] transition hover:text-[#0d2a4a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a6cb]"
            >
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
              {items.map((item, idx) => {
                const selected = idx === active;
                return (
                  <button
                    key={item.author}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-label={`Testimonial from ${item.author}`}
                    onClick={() => setActive(idx)}
                    className={`h-2 transition-all duration-300 ${
                      selected
                        ? "w-2 rounded-full bg-[#00a6cb]"
                        : "w-2 rounded-full bg-[#cfe0e5] hover:bg-[#9ab8c2]"
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next testimonial"
              className="grid h-7 w-7 place-items-center text-[#7b90a2] transition hover:text-[#0d2a4a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00a6cb]"
            >
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

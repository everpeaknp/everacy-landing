"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks";
import type { ServiceBenefitData, ServiceFeatureData } from "@/lib/api";
import { ServiceContentIcon } from "@/components/sections/ServiceContentIcon";
import { valueCards } from "./servicesContent";
import { ServicesIcon } from "./ServicesIcon";

interface ServicesValueCardsProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: (ServiceBenefitData | ServiceFeatureData)[] | null;
}

export function ServicesValueCards({
  eyebrow,
  title,
  description,
  items,
}: ServicesValueCardsProps) {
  const reduced = useReducedMotion();
  const hasCustomItems = Boolean(items && items.length > 0);

  return (
    <section
      id="service-benefits"
      className="scroll-mt-24 border-b border-[#dce8ec] bg-[#f4f9fa] px-5 py-20 sm:px-8 sm:py-28"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-[#008da4]">
              {eyebrow}
            </p>
          )}
          <h2 className="text-3xl font-black tracking-[-0.035em] text-[#0d2a4a] sm:text-5xl">
            {title ? (
              title
            ) : (
              <>
                Innovation that <span className="text-[#00a6cb]">just gets better</span>
              </>
            )}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#586d82] sm:text-base">
            {description ||
              "Ideas are easy. We focus on the engineering discipline, user empathy, and operational rigor that turn concepts into dependable products."}
          </p>
        </div>

        {hasCustomItems ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items!.slice(0, 6).map((card, index) => (
              <motion.article
                key={card.title}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className="flex flex-col bg-white p-8 sm:p-10"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#f0f5f7] text-[#0d2a4a]">
                  <ServiceContentIcon name={card.icon || "ShieldCheck"} className="h-5 w-5" />
                </span>
                <h3 className="mt-7 text-lg font-extrabold tracking-tight text-[#0d2a4a] sm:text-xl">
                  {card.title}
                </h3>
                <p className="mt-3.5 text-sm leading-7 text-[#586d82]">{card.description}</p>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {valueCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                className="flex flex-col bg-white p-8 sm:p-10"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#f0f5f7] text-[#0d2a4a]">
                  <ServicesIcon name={card.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-7 text-lg font-extrabold tracking-tight text-[#0d2a4a] sm:text-xl">
                  {card.title}
                </h3>
                <p className="mt-3.5 text-sm leading-7 text-[#586d82]">{card.text}</p>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

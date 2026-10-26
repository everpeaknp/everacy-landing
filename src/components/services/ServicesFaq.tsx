"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { ServiceFaqData } from "@/lib/api";
import { servicesFaqs } from "./servicesContent";

interface ServicesFaqProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: ServiceFaqData[] | null;
}

export function ServicesFaq({
  eyebrow,
  title,
  description,
  items,
}: ServicesFaqProps) {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = items && items.length > 0 ? items : servicesFaqs;

  return (
    <section
      id="service-faq"
      className="scroll-mt-24 border-b border-[#dce8ec] bg-[#f4f9fa] px-5 py-20 sm:px-8 sm:py-28"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#008da4]">
            {eyebrow || "FAQ"}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-[#0d2a4a] sm:text-4xl">
            {title ? (
              title
            ) : (
              <>
                Questions, <span className="text-[#00a6cb]">answered</span>
              </>
            )}
          </h2>
          <p className="mt-4 leading-7 text-[#586d82]">
            {description || "Can't find what you need? Reach out and we'll reply within one business day."}
          </p>
        </div>

        <div className="divide-y divide-[#dce8ec] border border-[#dce8ec] bg-white">
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-button-${index}`}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-extrabold text-[#0d2a4a] transition-colors hover:bg-[#f8fbfc] hover:text-[#008da4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00a6cb]"
                  >
                    <span className="flex items-start gap-4">
                      <span className="pt-0.5 text-xs font-extrabold tabular-nums text-[#008da4]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{faq.question}</span>
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-[#00a6cb] text-white" : "bg-[#e9f6f7] text-[#008da4]"
                      }`}
                    >
                      <Plus aria-hidden="true" className="h-4 w-4" strokeWidth={3} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pl-14 pr-6 leading-7 text-[#586d82]">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

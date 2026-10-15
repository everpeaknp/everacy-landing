"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { ServiceCapabilityData } from "@/lib/api";
import { ServiceContentIcon } from "@/components/sections/ServiceContentIcon";
import { resolveImageAlt } from "@/lib/image-seo";

interface ServiceCapabilityExplorerProps {
  capabilities: ServiceCapabilityData[];
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: string | null;
  imageAlt?: string;
  imageTitle?: string;
  imageIsDecorative?: boolean;
}

export function ServiceCapabilityExplorer({
  capabilities,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  imageTitle,
  imageIsDecorative,
}: ServiceCapabilityExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (capabilities.length === 0) return null;

  return (
    <section
      id="service-solutions"
      className="scroll-mt-20 overflow-hidden border-y border-[#e1ebef] bg-[#f5f9fa] px-5 py-14 sm:px-8 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {eyebrow && <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#008da4]">{eyebrow}</p>}
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#142e4c] sm:text-4xl">{title || "What we can build"}</h2>
          </div>
          {description && <p className="max-w-xl leading-7 text-[#65778d] md:pb-1">{description}</p>}
        </div>

        <div className={image ? "grid items-center gap-7 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12" : "mx-auto max-w-4xl"}>
          {image && <figure className="relative flex flex-col items-center justify-center lg:min-h-[390px]">
            <Image
              src={image}
              alt={imageIsDecorative ? "" : resolveImageAlt({
                alt: image ? imageAlt : "Responsive screens and interface previews representing digital products and connected systems",
                imageTitle,
                recordTitle: title || "Digital product capabilities",
                decorative: image ? imageIsDecorative : false,
              })}
              title={image && !imageIsDecorative ? imageTitle || undefined : undefined}
              width={1000}
              height={1053}
              sizes="(max-width: 1024px) 100vw, 38vw"
              className="h-auto max-h-[320px] w-full max-w-[430px] object-contain drop-shadow-[0_20px_30px_rgba(20,46,76,0.12)] transition-transform duration-700 hover:scale-[1.025] sm:max-h-[390px]"
            />
            <figcaption className="mt-1 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#31536c] sm:mt-2">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#08a4ad]" />
              Built around your goals
            </figcaption>
          </figure>}

          <div className="flex flex-col justify-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#08a1ad]">Choose an area to explore</p>
            <div className="mt-4 border-t border-[#dce8ec]" role="tablist" aria-label="Service capabilities">
              {capabilities.map((capability, index) => {
                const selected = index === activeIndex;
                const tabId = `service-capability-tab-${index}`;
                const panelId = `service-capability-panel-${index}`;

                return (
                  <div key={`${capability.title}-${index}`} className={`border-b transition-colors ${selected ? "border-[#cce2e7] bg-white/70" : "border-[#dce8ec]"}`}>
                    <button
                      id={tabId}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-controls={panelId}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveIndex(index)}
                      onKeyDown={(event) => {
                        const lastIndex = capabilities.length - 1;
                        const nextIndex = event.key === "ArrowDown" || event.key === "ArrowRight"
                          ? (index + 1) % capabilities.length
                          : event.key === "ArrowUp" || event.key === "ArrowLeft"
                            ? (index - 1 + capabilities.length) % capabilities.length
                            : event.key === "Home"
                              ? 0
                              : event.key === "End"
                                ? lastIndex
                                : -1;
                        if (nextIndex >= 0) {
                          event.preventDefault();
                          setActiveIndex(nextIndex);
                          document.getElementById(`service-capability-tab-${nextIndex}`)?.focus();
                        }
                      }}
                      className={`group flex min-h-[68px] w-full items-center gap-4 px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#008da4] sm:min-h-[76px] sm:px-4 ${selected ? "text-[#142e4c]" : "text-[#61758b] hover:bg-white/50 hover:text-[#142e4c]"}`}
                    >
                      <span className={`grid h-10 w-10 shrink-0 place-items-center transition-colors sm:h-11 sm:w-11 ${selected ? "bg-[#e2f3f4] text-[#008da4]" : "bg-[#edf3f5] text-[#8194a4] group-hover:bg-[#e2f3f4] group-hover:text-[#008da4]"}`}>
                        <ServiceContentIcon name={capability.icon} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1 text-base font-extrabold leading-snug sm:text-lg">{capability.title}</span>
                      <ArrowRight aria-hidden="true" className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 ${selected ? "translate-x-0.5 text-[#008da4]" : "text-[#91a2b0]"}`} />
                    </button>
                    <div
                      id={panelId}
                      role="tabpanel"
                      aria-labelledby={tabId}
                      hidden={!selected}
                      className={selected ? "pb-5 pl-[4.25rem] pr-8 sm:pb-6 sm:pl-[4.75rem]" : "hidden"}
                    >
                      <p className="max-w-xl text-sm leading-6 text-[#61758b] sm:text-[15px] sm:leading-7">{capability.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

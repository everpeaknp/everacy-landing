import { Code2, Database, Layers3, Workflow } from "lucide-react";
import { TechnologyStack } from "@/components/sections/TechnologyStack";
import type { HomeTechnologySectionData, ServiceCardData, TechnologyStackItemData } from "@/lib/api";

const layerIcons = [Code2, Workflow, Database];

function collectTechnologyItems(services: ServiceCardData[]): TechnologyStackItemData[] {
  const unique = new Map<string, TechnologyStackItemData>();
  for (const service of services) {
    for (const item of service.tech_stack_items ?? []) {
      const key = `${item.category.slug}:${item.name.trim().toLowerCase()}`;
      if (!unique.has(key)) unique.set(key, item);
    }
  }
  return [...unique.values()];
}

export function HomeTechnologySection({
  services,
  technologySection,
}: {
  services?: ServiceCardData[] | null;
  technologySection?: HomeTechnologySectionData | null;
}) {
  if (technologySection && !technologySection.enabled) return null;

  // Keep compatibility with older API deployments while the Home CMS response is being updated.
  const technologyItems = technologySection
    ? technologySection.technologies
    : collectTechnologyItems(services ?? []);
  if (technologySection ? technologyItems.length === 0 : !technologyItems.length && !services?.some((service) => service.tech_stack?.length)) return null;

  const layers = technologySection?.layers ?? [
    { title: "Interfaces", description: "Web and mobile experiences" },
    { title: "Connected systems", description: "Services, APIs, and data" },
    { title: "Reliable foundations", description: "Infrastructure built to scale" },
  ];

  return (
    <section className="relative overflow-hidden border-y border-[#e0eaed] bg-[#f3f8f9] px-5 py-14 sm:px-8 sm:py-16 lg:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-44 h-[34rem] w-[34rem] rounded-full bg-[#bfe5e6]/35 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <header className="grid gap-4 md:grid-cols-[1.1fr_.9fr] md:items-end md:gap-10">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#008da4]">
              {technologySection?.eyebrow ?? "The technology behind the work"}
            </p>
            <h2 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-[-0.035em] text-[#142e4c] sm:text-4xl lg:text-5xl">
              {technologySection?.title ?? "Carefully chosen tools. Products built to last."}
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[#536b80] sm:text-lg sm:leading-8 md:justify-self-end">
            {technologySection?.description ?? "We match the technology to the product—connecting clear user experiences with dependable services and infrastructure."}
          </p>
        </header>

        <div className="mt-8 grid items-stretch gap-4 lg:mt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,.8fr)]">
          <div className="min-w-0 border border-[#dce8ec] bg-white px-4 py-5 sm:px-7 sm:py-7">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#28435f] sm:text-base">
              <Layers3 aria-hidden="true" className="h-4 w-4 shrink-0 text-[#008da4]" />
              {technologySection?.stack_label ?? "Explore our technology stack"}
            </div>
            <TechnologyStack
              idPrefix="home-technology-stack"
              items={technologySection ? technologyItems : collectTechnologyItems(services ?? [])}
              technologies={technologySection ? [] : [...new Set((services ?? []).flatMap((service) => service.tech_stack ?? []))]}
            />
          </div>

          <aside className="relative isolate flex min-h-[22rem] flex-col justify-between overflow-hidden bg-[#122f4c] p-6 text-white sm:min-h-[27rem] sm:p-8">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full border border-[#71d3d4]/20" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-6 -top-10 -z-10 h-44 w-44 rounded-full border border-[#71d3d4]/20" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#72d4d5]">
                {technologySection?.feature_eyebrow ?? "Engineering, connected"}
              </p>
              <h3 className="mt-3 max-w-sm text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
                {technologySection?.feature_title ?? "A strong product is more than a list of tools."}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
                {technologySection?.feature_description ?? "Every layer has to work together—from the first interaction to the systems running behind it."}
              </p>
            </div>

            <div className="relative mt-8">
              <div aria-hidden="true" className="absolute bottom-7 left-5 top-7 w-px bg-gradient-to-b from-[#71d3d4]/20 via-[#71d3d4]/70 to-[#71d3d4]/20 sm:left-6" />
              <div className="space-y-3">
                {layers.map(({ title, description }, index) => {
                  const Icon = layerIcons[index % layerIcons.length];
                  return (
                    <div key={`${title}-${index}`} className="relative flex min-h-[4.5rem] items-center gap-3 border border-white/10 bg-white/[0.06] px-3 py-3 sm:gap-4 sm:px-5">
                      <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#71d3d4]/35 bg-[#173a58] text-[#81dede] sm:h-12 sm:w-12">
                        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold sm:text-base">{title}</p>
                        <p className="mt-0.5 text-xs leading-5 text-white/70 sm:text-sm">{description}</p>
                      </div>
                      <span className="ml-auto shrink-0 text-xs font-bold tabular-nums text-[#71d3d4]/90">{String(index + 1).padStart(2, "0")}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

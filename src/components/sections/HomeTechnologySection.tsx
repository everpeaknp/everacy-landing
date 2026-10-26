import { TechnologyStack } from "@/components/sections/TechnologyStack";
import type { HomeTechnologySectionData, ServiceCardData, TechnologyStackItemData } from "@/lib/api";

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

  const technologyItems = technologySection
    ? technologySection.technologies
    : collectTechnologyItems(services ?? []);
  if (
    technologySection
      ? technologyItems.length === 0
      : !technologyItems.length && !services?.some((service) => service.tech_stack?.length)
  ) {
    return null;
  }

  return (
    <section
      className="relative overflow-hidden border-b border-[#dce8ec] bg-white px-5 py-20 sm:px-8 sm:py-28"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Sharp Split Architectural Header */}
        <header className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#008da4]">
              {technologySection?.eyebrow ?? "The technology behind the work"}
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.035em] text-[#0d2a4a] sm:text-5xl">
              {technologySection?.title ?? "Carefully chosen tools. Products built to last."}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#586d82] sm:text-base">
            {technologySection?.description ??
              "We match the technology to the product—connecting clear user experiences with dependable services and infrastructure."}
          </p>
        </header>

        {/* Sharp Architectural Stack Blueprint */}
        <TechnologyStack
          compact
          idPrefix="home-technology-stack"
          items={technologySection ? technologyItems : collectTechnologyItems(services ?? [])}
          technologies={
            technologySection
              ? []
              : [...new Set((services ?? []).flatMap((service) => service.tech_stack ?? []))]
          }
        />
      </div>
    </section>
  );
}

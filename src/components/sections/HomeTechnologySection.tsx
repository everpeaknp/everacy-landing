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

  const defaultEyebrow = "The technology behind the work";
  const defaultFeatureEyebrow = "Engineering, connected";
  const eyebrow =
    technologySection?.eyebrow && technologySection.eyebrow !== defaultEyebrow
      ? technologySection.eyebrow
      : technologySection?.feature_eyebrow && technologySection.feature_eyebrow !== defaultFeatureEyebrow
        ? technologySection.feature_eyebrow
        : (technologySection?.eyebrow || technologySection?.feature_eyebrow || defaultEyebrow);

  const defaultTitle = "Carefully chosen tools. Products built to last.";
  const defaultFeatureTitle = "A strong product is more than a list of tools.";
  const title =
    technologySection?.title && technologySection.title !== defaultTitle
      ? technologySection.title
      : technologySection?.feature_title && technologySection.feature_title !== defaultFeatureTitle
        ? technologySection.feature_title
        : (technologySection?.title || technologySection?.feature_title || defaultTitle);

  const defaultDescription =
    "We match the technology to the product—connecting clear user experiences with dependable services and infrastructure.";
  const defaultFeatureDesc =
    "Every layer has to work together—from the first interaction to the systems running behind it.";
  const description =
    technologySection?.description && technologySection.description !== defaultDescription
      ? technologySection.description
      : technologySection?.feature_description && technologySection.feature_description !== defaultFeatureDesc
        ? technologySection.feature_description
        : (technologySection?.description || technologySection?.feature_description || defaultDescription);

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
              {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.035em] text-[#0d2a4a] sm:text-5xl">
              {title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-[#586d82] sm:text-base">
            {description}
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

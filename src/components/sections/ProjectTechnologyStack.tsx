import { TechnologyStack } from "@/components/sections/TechnologyStack";
import type { TechnologyStackItemData } from "@/lib/api";

export function ProjectTechnologyStack({
  items,
  technologies,
}: {
  items?: TechnologyStackItemData[] | null;
  technologies?: string[] | null;
}) {
  return <TechnologyStack idPrefix="project-stack" items={items} technologies={technologies} />;
}

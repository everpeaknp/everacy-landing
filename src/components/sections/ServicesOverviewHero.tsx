import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Layers3 } from "lucide-react";
import type { ServiceCategoryData } from "@/lib/api";

interface ServicesOverviewHeroProps {
  eyebrow?: string;
  title?: string;
  description?: string | null;
  exploreLabel?: string;
  categories: ServiceCategoryData[];
}

export function ServicesOverviewHero({
  eyebrow,
  title,
  description,
  exploreLabel,
  categories,
}: ServicesOverviewHeroProps) {
  const visualCategories = categories.slice(0, 5);

  return (
    <section className="relative overflow-hidden border-b border-[#dbe7eb] bg-[#f3f8fa] px-5 pb-14 pt-28 text-[#0d2a4a] sm:px-8 sm:pb-20 sm:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-36 h-[32rem] w-[32rem] rounded-full border border-[#d7e9ed]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-20 h-[25rem] w-[25rem] rounded-full border border-[#dcebee]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#008da4] sm:text-sm">
            <Layers3 aria-hidden="true" className="h-4 w-4" />
            {eyebrow || "Services"}
          </p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.6rem,6vw,5.2rem)] font-black leading-[0.98] tracking-[-0.055em] text-[#0d2a4a]">
            {title || "Digital work, built around your next move."}
          </h1>
          {description && <p className="mt-6 max-w-2xl text-base leading-7 text-[#5e7186] sm:text-lg sm:leading-8">{description}</p>}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="inline-flex min-h-12 items-center gap-3 bg-[#00a6cb] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#078eaa] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0d2a4a] focus-visible:ring-offset-2">
              Talk through a project <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <a href="#service-categories" className="inline-flex min-h-12 items-center gap-2 px-2 text-sm font-bold text-[#31536c] transition hover:text-[#008da4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008da4]">
              {exploreLabel || "Explore capabilities"}<ArrowDownRight aria-hidden="true" className="h-4 w-4 text-[#008da4]" />
            </a>
          </div>
        </div>

        <div aria-label="Everacy service categories" className="relative mx-auto w-full max-w-xl">
          <div className="absolute bottom-8 left-[2.2rem] top-8 w-px bg-gradient-to-b from-[#00a6cb] via-[#a8d9df] to-transparent" />
          <div className="relative border border-[#d8e6eb] bg-white/85 p-5 shadow-[0_28px_70px_-52px_rgba(13,42,74,0.55)] backdrop-blur-sm sm:p-7">
            <div className="mb-5 flex items-center justify-between border-b border-[#e5eef1] pb-4">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#008da4]">Explore the work</p>
                <p className="mt-1 text-sm font-bold text-[#31536c]">Choose a capability</p>
              </div>
              <span className="grid h-10 w-10 place-items-center bg-[#e9f6f7] text-[#008da4]"><Layers3 aria-hidden="true" className="h-5 w-5" /></span>
            </div>
            <ol className="relative space-y-2">
              {visualCategories.map((category, index) => (
                <li key={category.id}>
                  <a href={`#service-category-${category.slug}`} className="group flex min-h-14 items-center gap-4 py-2 pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008da4]">
                    <span className="relative z-[1] grid h-9 w-9 shrink-0 place-items-center border border-[#cbe3e8] bg-white text-[11px] font-extrabold text-[#008da4] transition group-hover:border-[#00a6cb] group-hover:bg-[#eff9fa]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 flex-1 text-sm font-extrabold text-[#193756] transition group-hover:text-[#008da4] sm:text-base">{category.title}</span>
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[#85a1ad] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#008da4]" />
                  </a>
                </li>
              ))}
              {visualCategories.length === 0 && <li className="py-5 text-sm text-[#65778d]">Capabilities will appear here as services are published.</li>}
            </ol>
            {categories.length > visualCategories.length && <p className="mt-3 border-t border-[#e5eef1] pt-4 text-xs font-semibold text-[#74889b]">Browse all {categories.length} capability areas below</p>}
          </div>
          <div aria-hidden="true" className="absolute -bottom-4 -right-3 -z-10 h-full w-full border border-[#cbe5e9] sm:-bottom-5 sm:-right-5" />
        </div>
      </div>
    </section>
  );
}

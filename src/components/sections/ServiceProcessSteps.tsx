import type { ServicePipelineStepData } from "@/lib/api";

export function ServiceProcessSteps({ steps }: { steps: ServicePipelineStepData[] }) {
  if (steps.length === 0) return null;

  return (
    <ol className="mt-9 grid grid-cols-1 border-l border-t border-[#dce9ed] sm:grid-cols-2 xl:grid-cols-3">
      {steps.map((step, index) => (
        <li key={`${step.step}-${step.title}`} className="group flex min-w-0 flex-col border-b border-r border-[#dce9ed] bg-white p-6 transition-colors hover:bg-[#f8fbfc] sm:min-h-[260px] sm:p-7 lg:p-8">
          <div className="flex items-center gap-5 text-xs font-extrabold tracking-[0.12em] text-[#008da4]">
            <span className="grid h-11 w-11 shrink-0 place-items-center bg-[#e8f6f7] text-sm transition-colors group-hover:bg-[#d8eff1]">{step.step || String(index + 1).padStart(2, "0")}</span>
            <span aria-hidden="true" className="h-px flex-1 bg-[#cfe2e7] transition-colors group-hover:bg-[#00a6cb]" />
          </div>
          <h3 className="mt-6 text-lg font-extrabold leading-snug text-[#142e4c] sm:text-xl">{step.title}</h3>
          <p className="mt-3 max-w-xl leading-7 text-[#667990]">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}

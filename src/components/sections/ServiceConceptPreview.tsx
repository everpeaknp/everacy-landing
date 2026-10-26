type PreviewKind = "web" | "mobile" | "growth" | "design";

function getPreviewKind(title: string): PreviewKind {
  const normalized = title.toLowerCase();
  if (normalized.includes("app") || normalized.includes("mobile")) return "mobile";
  if (normalized.includes("marketing") || normalized.includes("seo") || normalized.includes("social")) return "growth";
  if (normalized.includes("design") || normalized.includes("ui") || normalized.includes("ux")) return "design";
  return "web";
}

const previewLabels: Record<PreviewKind, string> = {
  web: "Web experience",
  mobile: "Mobile experience",
  growth: "Growth workspace",
  design: "Interface system",
};

export function ServiceConceptPreview({ title }: { title: string }) {
  const kind = getPreviewKind(title);
  return (
    <div role="img" aria-label={`Illustrative ${previewLabels[kind].toLowerCase()} concept for ${title}; not a client screenshot`} data-preview-kind={kind} className="relative mx-auto w-full max-w-[560px]">
      <div className="absolute -inset-3 -z-10 border border-[#d6e7eb] sm:-inset-5" />
      <div className="relative overflow-hidden border border-[#d5e3e8] bg-[#eef5f7] p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#577186]">
            {previewLabels[kind]}
          </div>
          <span className="border border-[#d7e5e9] bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-[#8396a4]">Concept preview</span>
        </div>

        {kind === "mobile" ? (
          <div className="flex min-h-[280px] items-center justify-center gap-4 sm:min-h-[340px] sm:gap-8">
            <div className="hidden w-[38%] max-w-[170px] border border-[#d6e2e7] bg-white p-3 shadow-sm sm:block">
              <div className="h-2 w-16 bg-[#dce9ed]" /><div className="mt-3 h-16 bg-[#d9f0f2]" />
              <div className="mt-3 h-2 w-4/5 bg-[#dce9ed]" /><div className="mt-2 h-2 w-3/5 bg-[#e8eef0]" />
              <div className="mt-5 grid grid-cols-2 gap-2"><div className="h-12 bg-[#f0f5f6]" /><div className="h-12 bg-[#f0f5f6]" /></div>
            </div>
            <div className="w-[156px] rounded-[2rem] border-[5px] border-[#163554] bg-white p-2 shadow-[0_24px_42px_-30px_rgba(13,42,74,0.65)] sm:w-[184px]">
              <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#163554]" />
              <div className="h-24 bg-[linear-gradient(140deg,#0d2a4a,#00a6cb)] p-3"><div className="h-2 w-2/3 bg-white/80" /><div className="mt-2 h-2 w-1/2 bg-white/40" /><div className="mt-5 h-5 w-16 bg-white" /></div>
              <div className="space-y-2 p-2"><div className="h-2 w-4/5 bg-[#dce8ec]" /><div className="h-2 w-3/5 bg-[#e8eef0]" /><div className="mt-4 grid grid-cols-2 gap-2"><div className="h-12 bg-[#edf6f7]" /><div className="h-12 bg-[#f0f4f5]" /></div><div className="mt-2 h-7 bg-[#00a6cb]" /></div>
            </div>
          </div>
        ) : kind === "growth" ? (
          <div className="min-h-[280px] bg-white p-4 sm:min-h-[340px] sm:p-6">
            <div className="flex items-center justify-between border-b border-[#e3ecef] pb-4"><div><div className="h-2 w-20 bg-[#dce8ec]" /><div className="mt-2 h-3 w-36 bg-[#163554]" /></div><span className="h-2 w-12 bg-[#bde5e8]" /></div>
            <div className="mt-5 grid grid-cols-3 gap-3"><div className="h-16 border border-[#e3ecef] p-3"><div className="h-2 w-10 bg-[#dce8ec]" /><div className="mt-3 h-2 w-2/3 bg-[#00a6cb]" /></div><div className="h-16 border border-[#e3ecef] p-3"><div className="h-2 w-10 bg-[#dce8ec]" /><div className="mt-3 h-2 w-1/2 bg-[#7fd0d5]" /></div><div className="h-16 border border-[#e3ecef] p-3"><div className="h-2 w-10 bg-[#dce8ec]" /><div className="mt-3 h-2 w-3/4 bg-[#163554]" /></div></div>
            <div className="mt-4 flex h-32 items-end gap-2 border-b border-l border-[#dce8ec] px-4 sm:h-40"><div className="h-[34%] flex-1 bg-[#b8e4e8]" /><div className="h-[52%] flex-1 bg-[#77cbd2]" /><div className="h-[43%] flex-1 bg-[#9ad9dd]" /><div className="h-[72%] flex-1 bg-[#36b6c2]" /><div className="h-[60%] flex-1 bg-[#67c8d0]" /><div className="h-[88%] flex-1 bg-[#008da4]" /></div>
            <p className="mt-3 text-[10px] font-semibold text-[#8396a4]">Illustrative layout · no client metrics shown</p>
          </div>
        ) : kind === "design" ? (
          <div className="grid min-h-[280px] grid-cols-[0.85fr_1.15fr] gap-3 bg-white p-4 sm:min-h-[340px] sm:gap-5 sm:p-6">
            <div className="border-r border-[#e3ecef] pr-3 sm:pr-5"><div className="h-2 w-16 bg-[#dce8ec]" /><div className="mt-4 h-7 w-4/5 bg-[#163554]" /><div className="mt-2 h-2 w-full bg-[#e5ecef]" /><div className="mt-2 h-2 w-4/5 bg-[#e5ecef]" /><div className="mt-5 h-8 w-24 bg-[#00a6cb]" /><div className="mt-7 grid grid-cols-4 gap-1.5"><div className="aspect-square bg-[#0d2a4a]" /><div className="aspect-square bg-[#00a6cb]" /><div className="aspect-square bg-[#9bdde0]" /><div className="aspect-square bg-[#edf5f6]" /></div></div>
            <div className="flex flex-col justify-between"><div className="h-20 bg-[#eaf6f7] p-3 sm:h-28 sm:p-4"><div className="h-2 w-1/2 bg-[#8dcbd0]" /><div className="mt-3 h-2 w-3/4 bg-white" /><div className="mt-2 h-2 w-1/2 bg-white" /></div><div className="grid grid-cols-2 gap-2"><div className="aspect-[1.3] border border-[#e3ecef] bg-[#f8fafb]" /><div className="aspect-[1.3] border border-[#e3ecef] bg-[#f1f7f8]" /></div><div className="flex items-center gap-2"><span className="h-6 w-6 rounded-full bg-[#c8ebed]" /><span className="h-2 w-2/3 bg-[#e1e9ec]" /></div></div>
          </div>
        ) : (
          <div className="min-h-[280px] border border-[#d9e5e9] bg-white shadow-sm sm:min-h-[340px]">
            <div className="flex h-10 items-center gap-1.5 border-b border-[#e3ecef] px-3"><span className="h-2 w-2 rounded-full bg-[#f18e8e]" /><span className="h-2 w-2 rounded-full bg-[#f2c86e]" /><span className="h-2 w-2 rounded-full bg-[#80cda7]" /><span className="ml-3 h-4 flex-1 bg-[#f3f7f8]" /></div>
            <div className="grid min-h-[238px] sm:min-h-[298px] sm:grid-cols-[0.8fr_1.2fr]">
              <div className="hidden border-r border-[#e3ecef] p-5 sm:block"><div className="h-2 w-20 bg-[#163554]" /><div className="mt-5 h-2 w-full bg-[#e4ecef]" /><div className="mt-3 h-2 w-4/5 bg-[#e4ecef]" /><div className="mt-3 h-2 w-5/6 bg-[#e4ecef]" /><div className="mt-8 h-8 w-24 bg-[#00a6cb]" /></div>
              <div className="p-4 sm:p-6"><div><div className="h-2 w-20 bg-[#dce8ec]" /><div className="mt-2 h-4 w-36 max-w-full bg-[#163554]" /></div><div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3"><div className="h-20 border border-[#e2ebee] bg-[#f5f9fa] p-2"><div className="h-2 w-2/3 bg-[#b9dce1]" /><div className="mt-3 h-8 bg-white" /></div><div className="h-20 border border-[#e2ebee] bg-[#f5f9fa] p-2"><div className="h-2 w-1/2 bg-[#b9dce1]" /><div className="mt-3 h-8 bg-white" /></div></div><div className="mt-3 h-24 border border-[#e2ebee] p-3"><div className="flex h-full items-end gap-1.5"><div className="h-1/3 flex-1 bg-[#bde5e8]" /><div className="h-2/3 flex-1 bg-[#69c8d0]" /><div className="h-1/2 flex-1 bg-[#a1dce0]" /><div className="h-4/5 flex-1 bg-[#008da4]" /><div className="h-3/5 flex-1 bg-[#80d1d6]" /></div></div></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

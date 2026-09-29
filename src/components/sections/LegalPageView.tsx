import { EmptyState } from "@/components/ui/EmptyState";
import type { LegalPageData } from "@/lib/api";

export function LegalPageView({ page }: { page: LegalPageData | null }) {
  if (!page) return <EmptyState title="This legal page isn't published yet" />;

  return (
    <main className="relative z-[1] bg-white font-mont text-slate-900">
      {(page.title || page.subtitle || page.eyebrow) && <section className="relative isolate overflow-hidden border-b border-[#dce8ec] bg-[#f4f9fa] px-5 py-14 text-center sm:px-8 sm:py-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,166,203,0.08),transparent_62%)]" />
        <div className="relative mx-auto max-w-5xl">
          {page.eyebrow && <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#008b9b]">{page.eyebrow}</p>}
          {page.title && <h1 className="mt-3 text-[clamp(2.2rem,7vw,4rem)] font-black leading-[1.08] tracking-tight text-[#0d2a4a]">{page.title}</h1>}
          {page.subtitle && <p className="mx-auto mt-4 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">{page.subtitle}</p>}
        </div>
      </section>}

      <section className="relative z-20 mx-auto max-w-4xl px-4 py-20">
        <div className="prose prose-slate prose-lg max-w-none">
          {page.effective_date && <p className="font-medium text-slate-500">Last Updated: {page.effective_date}</p>}
          {page.sections.map((section) => (
            <section key={section.id}>
              {section.heading && <h2 className="mb-4 mt-10 text-2xl font-bold text-slate-900">{section.heading}</h2>}
              {section.body && <p className="mb-6 leading-relaxed text-slate-600">{section.body}</p>}
              {section.bullet_items.length > 0 && (
                <ul className="mb-6 list-disc pl-6 leading-relaxed text-slate-600">
                  {section.bullet_items.map((item) => <li key={item} className="mb-2">{item}</li>)}
                </ul>
              )}
            </section>
          ))}
          {page.sections.length === 0 && <EmptyState title="This legal page has no published sections" />}
        </div>
      </section>
    </main>
  );
}

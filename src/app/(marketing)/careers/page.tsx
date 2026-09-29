import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { fetchCareers, fetchGlobalSEO, fetchPageSEO } from "@/lib/api";
import * as Icons from "lucide-react";
import Link from "next/link";
import { ScrollAnimationWrapper } from "@/components/ui/scroll-animation-wrapper";
import { EmptyState } from "@/components/ui/EmptyState";
import "./careers.css";

// Force dynamic rendering — always fetch fresh data from the backend
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [careersData, globalSeo, pageSeo] = await Promise.all([
    fetchCareers(),
    fetchGlobalSEO(),
    fetchPageSEO("careers"),
  ]);

  return genMeta({
    title: careersData?.hero?.title || careersData?.page_settings?.title || undefined,
    description: careersData?.hero?.subtitle || "",
    canonicalPath: "/careers",
    seoData: careersData?.seo,
    globalSeo,
    pageSeo,
  });
}

// Helper for dynamic Lucide icons
function getIcon(iconName: string, className: string = "w-6 h-6") {
  const IconCmp = (Icons as any)[iconName];
  return IconCmp ? <IconCmp className={className} /> : <Icons.Star className={className} />;
}

export default async function CareersPage() {
  const [careersData, pageSeo] = await Promise.all([
    fetchCareers(),
    fetchPageSEO("careers"),
  ]);

  // --- Hero Data ---
  if (!careersData) return <EmptyState title="Careers content isn't published yet" />;
  const heroTitle = careersData.hero?.title ?? "";
  const heroHighlight = careersData.hero?.highlight_text ?? "";
  const heroSubtitle = careersData.hero?.subtitle ?? "";

  // --- Section Settings ---
  const settings = careersData?.page_settings;
  const valuesTitle = settings?.values_title;
  const valuesSubtitle = settings?.values_subtitle;
  const perksTitle = settings?.perks_title;
  const perksSubtitle = settings?.perks_subtitle;
  const positionsTitle = settings?.positions_title;
  const positionsSubtitle = settings?.positions_subtitle;
  const testimonialsTitle = settings?.testimonials_title;
  const testimonialsSubtitle = settings?.testimonials_subtitle;
  const processTitle = settings?.process_title;
  const processSubtitle = settings?.process_subtitle;
  const middleImageStrip = settings?.middle_image_strip;
  const middleImageText = settings?.middle_image_text;

  // --- Dynamic or Fallback Data ---
  const jobs = careersData.jobs ?? [];
  const values = careersData.values ?? [];
  const perks = careersData.perks ?? [];
  const testimonials = careersData.testimonials ?? [];
  const processSteps = careersData.process_steps ?? [];

  const footerText = careersData.footer?.text;
  const footerEmail = careersData.footer?.email;

  return (
    <main className="relative z-[1] bg-white min-h-screen font-mont text-slate-900">
      {(pageSeo?.jsonLd || pageSeo?.json_ld) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pageSeo.jsonLd || pageSeo.json_ld),
          }}
        />
      )}

      {(heroTitle || heroSubtitle) && <section className="relative isolate overflow-hidden border-b border-[#dce8ec] bg-[#f4f9fa] px-5 py-20 text-center sm:px-8 sm:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,166,203,0.09),transparent_62%)]" />
        <div className="relative mx-auto max-w-5xl">
          {heroTitle && <h1 className="mt-4 text-[clamp(2.1rem,7vw,4.25rem)] font-black leading-[1.08] tracking-tight text-[#0d2a4a]">
            {heroHighlight ? (
              <>
                {heroTitle.replace(heroHighlight, "").trim()}{" "}
                <span className="text-[#008b9b]">{heroHighlight}</span>
              </>
            ) : (
              heroTitle
            )}
          </h1>}
          {heroSubtitle && <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">
            {heroSubtitle}
          </p>}
        </div>
      </section>}

      {/* 2. Values (Why Everacy) */}
      {values.length > 0 && <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight uppercase">
              {valuesTitle}
            </h2>
            {valuesSubtitle && (
              <p className="text-lg text-slate-500 max-w-2xl mx-auto font-georgia italic">
                {valuesSubtitle}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {values.map((val, index) => (
              <ScrollAnimationWrapper key={val.id} delay={index * 0.1} yOffset={30}>
                <div className="bg-[#f8f9fa] h-full p-8 md:p-10 flex flex-col items-start transition-colors duration-300 hover:bg-[#f1f3f5]">
                  {/* Icon Container - Pure white circle */}
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm">
                    {getIcon(val.icon, "w-6 h-6 text-slate-800")}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {val.title}
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>}

      {/* 3. Middle Image Strip (Parallax) */}
      {middleImageStrip && <section
        className="career-image-strip h-[300px] md:h-[450px] w-full flex items-center justify-center border-y border-[#1f2b47]"
        style={{ backgroundImage: `url(${middleImageStrip})` }}
      >
        <div className="relative z-10 text-white text-center px-4">
          {middleImageText && <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[0.2em] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] text-white/90">{middleImageText}</h2>}
        </div>
      </section>}

      {/* 4. Perks & Benefits */}
      {perks.length > 0 && <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight uppercase">
              {perksTitle}
            </h2>
            {perksSubtitle && (
              <p className="text-lg text-slate-500 max-w-2xl mx-auto font-georgia italic">
                {perksSubtitle}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, index) => (
              <ScrollAnimationWrapper key={perk.id} delay={index * 0.1} yOffset={30}>
                <div className="career-feature-card bg-white h-full rounded-xl p-6 shadow-sm border border-slate-100 flex items-start gap-5 transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
                  <div className="mt-1 w-12 h-12 bg-blue-50 text-[#00a6cb] rounded-full flex items-center justify-center flex-shrink-0">
                    {getIcon(perk.icon)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1 uppercase tracking-wide">{perk.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-georgia">{perk.description}</p>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>}

      {/* 5. Open Positions (List View Redesign) */}
      {(positionsTitle || positionsSubtitle || jobs.length > 0) && <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight uppercase">
              {positionsTitle}
            </h2>
            {positionsSubtitle && (
              <p className="text-lg text-slate-500 max-w-2xl mx-auto font-georgia italic">
                {positionsSubtitle}
              </p>
            )}
          </div>

          {jobs.length > 0 ? <div className="flex flex-col border-t border-slate-200 mt-8">
            {jobs.map((job, index) => (
              <ScrollAnimationWrapper key={job.id} delay={index * 0.1} yOffset={30}>
                <Link
                  href={`/careers/${job.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-8 border-b border-slate-200 transition-colors duration-300 hover:bg-slate-50 px-4 -mx-4 rounded-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-12 w-full">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 group-hover:text-[#00a6cb] transition-colors">{job.title}</h3>
                      {job.about_role && <div className="text-slate-500 font-georgia italic line-clamp-1 max-w-xl">{job.about_role}</div>}
                    </div>
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 text-sm font-semibold text-slate-500 uppercase tracking-wide shrink-0">
                      <div className="flex items-center gap-1.5 w-32">
                        <Icons.MapPin className="w-4 h-4 text-slate-400" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 w-32">
                        <Icons.Clock className="w-4 h-4 text-slate-400" />
                        <span>{job.job_type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center shrink-0 min-w-[120px] justify-end">
                    <div className="flex items-center gap-2 text-[#00a6cb] font-bold text-sm tracking-wide opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <span>View Role</span>
                      <Icons.ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </ScrollAnimationWrapper>
            ))}
          </div> : <EmptyState title="No open positions published yet" />}

          {footerText && footerEmail && <div className="mt-16 text-center">
            <p className="text-slate-500 font-georgia italic text-lg">
              {footerText}{" "}
              <a href={`mailto:${footerEmail}`} className="text-[#00a6cb] font-bold not-italic hover:underline uppercase tracking-wide text-sm ml-2">
                {footerEmail}
              </a>
            </p>
          </div>}
        </div>
      </section>}

      {/* 6. Hiring Process */}
      {processSteps.length > 0 && <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight uppercase">
              {processTitle}
            </h2>
            {processSubtitle && (
              <p className="text-lg text-slate-500 max-w-2xl mx-auto font-georgia italic">
                {processSubtitle}
              </p>
            )}
          </div>

          <div className="process-timeline space-y-12 py-4 pl-4 md:pl-8">
            {processSteps.map((step, index) => (
              <ScrollAnimationWrapper key={step.id} delay={index * 0.1} yOffset={30}>
                <div className="relative flex items-start gap-8 group">

                  {/* Center Marker */}
                  <div className="relative z-10 w-12 h-12 rounded-full bg-[#00a6cb] text-white flex items-center justify-center flex-shrink-0 process-step-marker shadow-[0_0_0_4px_#f8fafc] transition-transform duration-300 group-hover:scale-110">
                    {getIcon(step.icon)}
                  </div>

                  {/* Right Column Content */}
                  <div className="pt-2 pb-6 flex-1">
                    <div className="transition-transform duration-300 group-hover:translate-x-2">
                      <div className="text-xs font-bold text-[#00a6cb] uppercase tracking-widest mb-1">Step {step.step_number}</div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-wide">{step.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed font-georgia max-w-2xl">{step.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>}

      {/* 7. Testimonials */}
      {testimonials.length > 0 && <section className="py-24 px-4 bg-white text-slate-900 section-clip-x border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight uppercase text-slate-900">
              {testimonialsTitle}
            </h2>
            {testimonialsSubtitle && (
              <p className="text-lg text-slate-500 max-w-2xl mx-auto font-georgia italic">
                {testimonialsSubtitle}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, index) => (
              <ScrollAnimationWrapper key={test.id} delay={index * 0.15} yOffset={40}>
                <div className="bg-slate-50 h-full rounded-2xl p-8 relative border border-slate-200 hover:border-[#00a6cb]/50 transition-colors">
                  <Icons.Quote className="absolute top-6 right-6 w-8 h-8 text-slate-200" />
                  <p className="text-slate-600 italic mb-8 relative z-10 leading-relaxed font-georgia text-[15px]">
                    "{test.quote}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    {test.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={test.image} alt={test.name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center border border-slate-200">
                        <Icons.User className="w-5 h-5 text-slate-500" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wide">{test.name}</h4>
                      {test.role && <p className="text-[#00a6cb] text-xs font-semibold uppercase tracking-widest mt-0.5">{test.role}</p>}
                    </div>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>}

    </main>
  );
}

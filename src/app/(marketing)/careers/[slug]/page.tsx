import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import * as Icons from "lucide-react";
import Link from "next/link";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";
import { fetchJobPosition } from "@/lib/api";
import { notFound } from "next/navigation";
import { JobApplicationForm } from "@/components/sections/JobApplicationForm";

// Force dynamic rendering — always fetch fresh data from the backend
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await fetchJobPosition(slug);
  
  if (!job) {
    return genMeta({ title: "Job Not Found | Careers" });
  }

  return genMeta({
    title: `${job.title} | Careers`,
    description: `Apply for the ${job.title} role at Everacy.`,
    canonicalPath: `/careers/${slug}`,
  });
}

function getIcon(iconName: string, className: string = "w-5 h-5") {
  const IconCmp = (Icons as any)[iconName];
  return IconCmp ? <IconCmp className={className} /> : <Icons.Star className={className} />;
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = await fetchJobPosition(slug);

  if (!job) {
    notFound();
  }

  // Fallbacks for data just in case the arrays are missing
  const responsibilities = Array.isArray(job.responsibilities) ? job.responsibilities : [];
  const requirements = Array.isArray(job.requirements) ? job.requirements : [];
  const niceToHave = Array.isArray(job.nice_to_have) ? job.nice_to_have : [];
  const softSkills = Array.isArray(job.soft_skills) ? job.soft_skills : [];

  return (
    <main className="relative z-[1] bg-slate-50 min-h-screen font-mont text-slate-900 pb-24">
      {/* 1. Job Hero - Matches /about aesthetics */}
      <section className="relative pt-32 sm:pt-40 pb-24 sm:pb-32 font-mont overflow-hidden flex items-center justify-center min-h-[70vh] section-clip-x">
        <div className="absolute inset-0 w-full h-full bg-black -z-10">
          <LiquidEffectAnimation fill="absolute" zIndex={0} />
          {/* Dark vignette matching home page */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(3,8,24,0.3) 0%, rgba(2,5,18,0.75) 100%)",
            }}
          />
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center flex flex-col items-center">
          <Link href="/careers" className="inline-flex items-center gap-2 text-[#00a6cb] hover:text-white transition-colors text-sm font-bold uppercase tracking-widest mb-10 bg-[#121c33]/50 px-5 py-2.5 rounded-full border border-[#1f2b47] shadow-lg">
            <Icons.ArrowLeft className="w-4 h-4" />
            All Open Roles
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-[clamp(2.1rem,8vw,4.6rem)] font-black text-white drop-shadow-lg mb-6 uppercase tracking-tight leading-[1.08]">
              {job.title}
            </h1>
            <p className="text-white/80 drop-shadow-md text-base sm:text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
              {job.about_role}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Layout (Content + Sidebar) */}
      <section className="py-12 md:py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Main Content */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Responsibilities */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00a6cb] flex items-center justify-center">
                  <Icons.Target className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900">What You'll Do</h2>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {responsibilities.map((item, idx) => (
                  <li key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 hover:border-[#00a6cb]/30 transition-colors">
                    <Icons.CheckCircle2 className="w-5 h-5 text-[#00a6cb] shrink-0 mt-0.5" />
                    <span className="text-slate-600 font-georgia text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Icons.Briefcase className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900">What We Look For</h2>
              </div>
              <ul className="space-y-3">
                {requirements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-2.5" />
                    <span className="text-slate-600 font-georgia leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nice to Have & Soft Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Icons.Plus className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900">Nice to Have</h3>
                </div>
                <ul className="space-y-3">
                  {niceToHave.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Icons.Check className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                      <span className="text-slate-500 font-georgia text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Icons.Users className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900">Soft Skills</h3>
                </div>
                <ul className="space-y-3">
                  {softSkills.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Icons.Check className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                      <span className="text-slate-500 font-georgia text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* About Company */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00a6cb]/5 rounded-full blur-3xl -mr-20 -mt-20 transition-transform group-hover:scale-110 duration-700" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold uppercase tracking-tight text-slate-900 mb-4">About Everacy</h3>
                <p className="text-slate-600 font-georgia leading-relaxed">
                  {job.about_company}
                </p>
              </div>
            </div>
            
          </div>

          {/* RIGHT COLUMN: Sticky Sidebar */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
              <h3 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-6 border-b border-slate-100 pb-4">Job Overview</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                    {getIcon(job.category_icon)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Department</div>
                    <div className="font-semibold text-slate-900">{job.category}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                    {getIcon(job.location_icon)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Location</div>
                    <div className="font-semibold text-slate-900">{job.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                    {getIcon(job.job_type_icon)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Job Type</div>
                    <div className="font-semibold text-slate-900">{job.job_type}</div>
                  </div>
                </div>
              </div>

              <a href="#apply" className="mt-8 w-full block text-center bg-[#00a6cb] hover:bg-[#008db0] text-white px-6 py-4 rounded-xl font-bold uppercase tracking-wider transition-colors shadow-lg">
                Apply Now
              </a>
            </div>
          </div>

        </div>

        {/* 3. Job Application Form Section (Full Width / Centered) */}
        <div id="apply" className="mt-24 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-slate-900 mb-4">Ready to Apply?</h2>
            <p className="text-slate-600 font-georgia text-lg">Join us and help build the future of elite engineering.</p>
          </div>
          <JobApplicationForm jobId={job.id} />
        </div>
      </section>
    </main>
  );
}

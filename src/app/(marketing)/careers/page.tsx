import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";
import { fetchCareers } from "@/lib/api";
import type { 
  JobPositionData, 
  CareerValueData, 
  CareerPerkData, 
  CareerTestimonialData, 
  CareerProcessStepData 
} from "@/lib/api";
import * as Icons from "lucide-react";
import Link from "next/link";
import { ScrollAnimationWrapper } from "@/components/ui/scroll-animation-wrapper";
import "./careers.css";

// Force dynamic rendering — always fetch fresh data from the backend
export const dynamic = "force-dynamic";

export const metadata: Metadata = genMeta({
  title: "Careers",
  description: "Join Everacy. We are building the future of digital infrastructure.",
  canonicalPath: "/careers",
});

// Helper for dynamic Lucide icons
function getIcon(iconName: string, className: string = "w-6 h-6") {
  const IconCmp = (Icons as any)[iconName];
  return IconCmp ? <IconCmp className={className} /> : <Icons.Star className={className} />;
}

// ================= STATIC FALLBACKS =================
const STATIC_VACANCIES: JobPositionData[] = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    slug: "senior-frontend-engineer",
    image: null,
    location: "Remote",
    location_icon: "MapPin",
    job_type: "Full-Time",
    job_type_icon: "Clock",
    category: "Engineering",
    category_icon: "Briefcase",
    order: 0,
  },
  {
    id: 2,
    title: "Product Designer",
    slug: "product-designer",
    image: null,
    location: "Hybrid, Nepal",
    location_icon: "MapPin",
    job_type: "Full-Time",
    job_type_icon: "Clock",
    category: "Design",
    category_icon: "Briefcase",
    order: 1,
  },
  {
    id: 3,
    title: "AI & ML Engineer",
    slug: "ai-ml-engineer",
    image: null,
    location: "Remote",
    location_icon: "MapPin",
    job_type: "Contract",
    job_type_icon: "Clock",
    category: "Data & AI",
    category_icon: "Briefcase",
    order: 2,
  },
];

const STATIC_VALUES: CareerValueData[] = [
  { id: 1, title: "Growth Mindset", description: "We lean into challenges and view failures as learning opportunities.", icon: "TrendingUp", order: 0 },
  { id: 2, title: "Radical Candor", description: "We challenge directly and care personally. Honest feedback is a gift.", icon: "MessageSquare", order: 1 },
  { id: 3, title: "Innovate Constantly", description: "We never settle for 'good enough'. We push the boundaries of what is possible.", icon: "Zap", order: 2 },
  { id: 4, title: "Owner's Mentality", description: "We take extreme ownership of our work, from inception to deployment.", icon: "Shield", order: 3 },
];

const STATIC_PERKS: CareerPerkData[] = [
  { id: 1, title: "Health & Wellness", description: "Comprehensive medical coverage for you and your family.", icon: "Heart", order: 0 },
  { id: 2, title: "Remote First", description: "Work from anywhere. We provide the tools you need to succeed.", icon: "Globe", order: 1 },
  { id: 3, title: "Continuous Learning", description: "Annual stipend for courses, books, and conferences.", icon: "BookOpen", order: 2 },
  { id: 4, title: "Generous PTO", description: "Take the time you need to recharge and avoid burnout.", icon: "Coffee", order: 3 },
  { id: 5, title: "Home Office Budget", description: "We cover the costs to set up an ergonomic and productive workspace.", icon: "Monitor", order: 4 },
  { id: 6, title: "Team Retreats", description: "Annual offsites to connect, celebrate, and plan the future.", icon: "Users", order: 5 },
];

const STATIC_TESTIMONIALS: CareerTestimonialData[] = [
  { id: 1, name: "Sarah Jenkins", role: "Lead Architect", quote: "Everacy is the rare place where engineering excellence isn't just a buzzword, it's the air we breathe. I've done the best work of my career here.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop", order: 0 },
  { id: 2, name: "Marcus Chen", role: "Senior Designer", quote: "The autonomy we are given to solve complex user problems is unmatched. We don't just push pixels, we define the product strategy.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop", order: 1 },
  { id: 3, name: "Priya Sharma", role: "DevOps Engineer", quote: "Moving fast usually means breaking things, but here we've built the infrastructure to move fast safely. It's incredibly rewarding.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop", order: 2 },
];

const STATIC_PROCESS: CareerProcessStepData[] = [
  { id: 1, step_number: 1, title: "Application Review", description: "We review your profile, resume, and any portfolio links you provide.", icon: "FileText", order: 0 },
  { id: 2, step_number: 2, title: "Initial Screen", description: "A 30-minute chat to discuss your background, interests, and alignment with our core values.", icon: "Phone", order: 1 },
  { id: 3, step_number: 3, title: "Technical/Design Challenge", description: "A practical, asynchronous assignment that mirrors the actual work you'd do here.", icon: "Code", order: 2 },
  { id: 4, step_number: 4, title: "Team Interview", description: "Meet your future teammates. We'll dive deep into your challenge and technical experience.", icon: "Users", order: 3 },
  { id: 5, step_number: 5, title: "Final Fit & Offer", description: "A final chat with leadership, followed by an offer if there's a mutual fit.", icon: "Award", order: 4 },
];


export default async function CareersPage() {
  const careersData = await fetchCareers();

  // --- Hero Data ---
  const heroTitle = careersData?.hero?.title ?? "Build the Future.";
  const heroHighlight = careersData?.hero?.highlight_text ?? "Future.";
  const heroSubtitle = careersData?.hero?.subtitle ?? "We are always looking for elite engineers, visionary designers, and relentless innovators to join our vanguard.";

  // --- Section Settings ---
  const settings = careersData?.page_settings;
  const valuesTitle = settings?.values_title || "Why Everacy";
  const valuesSubtitle = settings?.values_subtitle || "The principles that drive us to build the extraordinary.";
  const perksTitle = settings?.perks_title || "Perks & Benefits";
  const perksSubtitle = settings?.perks_subtitle || "We invest heavily in our team's well-being and growth.";
  const positionsTitle = settings?.positions_title || "Open Positions";
  const positionsSubtitle = settings?.positions_subtitle || "Join a team that values engineering excellence over everything.";
  const testimonialsTitle = settings?.testimonials_title || "Hear it from our team";
  const testimonialsSubtitle = settings?.testimonials_subtitle || "Don't just take our word for it.";
  const processTitle = settings?.process_title || "Our Hiring Process";
  const processSubtitle = settings?.process_subtitle || "A transparent, focused journey to finding mutual fit.";
  const middleImageStrip = settings?.middle_image_strip || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop";
  const middleImageText = settings?.middle_image_text || "Impact at Scale";

  // --- Dynamic or Fallback Data ---
  const jobs = careersData?.jobs?.length ? careersData.jobs : STATIC_VACANCIES;
  const values = careersData?.values?.length ? careersData.values : STATIC_VALUES;
  const perks = careersData?.perks?.length ? careersData.perks : STATIC_PERKS;
  const testimonials = careersData?.testimonials?.length ? careersData.testimonials : STATIC_TESTIMONIALS;
  const processSteps = careersData?.process_steps?.length ? careersData.process_steps : STATIC_PROCESS;

  const footerText = careersData?.footer?.text ?? "Don't see a role that fits? Send your resume to";
  const footerEmail = careersData?.footer?.email ?? "careers@everacy.com";

  return (
    <main className="relative z-[1] bg-white min-h-screen font-mont text-slate-900">
      
      {/* 1. Dark Liquid Careers Hero */}
      <section className="relative pt-32 sm:pt-40 pb-24 sm:pb-32 overflow-hidden flex items-center justify-center min-h-[70vh] section-clip-x">
        <div className="absolute inset-0 w-full h-full bg-[#030818] -z-10">
          <LiquidEffectAnimation fill="absolute" zIndex={0} />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-10"
            style={{ background: "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(3,8,24,0.3) 0%, rgba(2,5,18,0.75) 100%)" }}
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-[clamp(2.1rem,10vw,4.6rem)] font-black text-white drop-shadow-lg mb-6 uppercase tracking-tight leading-[1.08]">
            {heroHighlight ? (
              <>
                {heroTitle.replace(heroHighlight, "").trim()}{" "}
                <span className="text-[#00a6cb]">{heroHighlight}</span>
              </>
            ) : (
              heroTitle
            )}
          </h1>
          <p className="text-white/80 font-georgia drop-shadow-md text-base sm:text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed italic">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* 2. Values (Why Everacy) */}
      <section className="py-24 px-4 bg-white">
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
      </section>

      {/* 3. Middle Image Strip (Parallax) */}
      <section 
        className="career-image-strip h-[300px] md:h-[450px] w-full flex items-center justify-center border-y border-[#1f2b47]"
        style={{ backgroundImage: `url(${middleImageStrip})` }}
      >
        <div className="relative z-10 text-white text-center px-4">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[0.2em] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] text-white/90">
            {middleImageText}
          </h2>
        </div>
      </section>

      {/* 4. Perks & Benefits */}
      <section className="py-24 px-4 bg-slate-50">
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
      </section>

      {/* 5. Open Positions (List View Redesign) */}
      <section className="py-24 px-4 bg-white">
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

          <div className="flex flex-col border-t border-slate-200 mt-8">
            {jobs.map((job, index) => (
              <ScrollAnimationWrapper key={job.id} delay={index * 0.1} yOffset={30}>
                <Link 
                  href={`/careers/${job.slug}`} 
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-8 border-b border-slate-200 transition-colors duration-300 hover:bg-slate-50 px-4 -mx-4 rounded-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-6 md:gap-12 w-full">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 group-hover:text-[#00a6cb] transition-colors">{job.title}</h3>
                      <div className="text-slate-500 font-georgia italic line-clamp-1 max-w-xl">
                        Join our elite team to build scalable and robust digital infrastructure.
                      </div>
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
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-500 font-georgia italic text-lg">
              {footerText}{" "}
              <a href={`mailto:${footerEmail}`} className="text-[#00a6cb] font-bold not-italic hover:underline uppercase tracking-wide text-sm ml-2">
                {footerEmail}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 6. Hiring Process */}
      <section className="py-24 px-4 bg-slate-50">
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
      </section>

      {/* 7. Testimonials */}
      <section className="py-24 px-4 bg-white text-slate-900 section-clip-x border-t border-slate-200">
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
      </section>

    </main>
  );
}

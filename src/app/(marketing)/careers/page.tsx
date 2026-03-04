import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";

export const metadata: Metadata = genMeta({
  title: "Careers",
  description: "Join Everacy. We are building the future of digital infrastructure.",
  canonicalPath: "/careers",
});

const VACANCIES = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    bgImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
    location: "Remote",
    type: "Full-Time",
    dept: "Engineering"
  },
  {
    id: 2,
    title: "Product Designer",
    bgImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop",
    location: "Hybrid",
    type: "Full-Time",
    dept: "Design"
  },
  {
    id: 3,
    title: "AI & ML Engineer",
    bgImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop",
    location: "Remote",
    type: "Contract",
    dept: "Data & AI"
  },
];

export default function CareersPage() {
  return (
    <main className="relative z-[1] bg-slate-50 min-h-screen font-mont">
      {/* Dark Liquid Careers Hero */}
      <section className="relative pt-40 pb-32 overflow-hidden flex items-center justify-center min-h-[70vh]">
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
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-lg mb-6 uppercase tracking-tighter">
                Build the <span className="text-[#00a6cb]">Future.</span>
            </h1>
            <p className="text-white/80 drop-shadow-md text-xl md:text-2xl font-medium max-w-3xl mx-auto">
                We are always looking for elite engineers, visionary designers, and relentless innovators to join our vanguard.
            </p>
        </div>
      </section>

      {/* Vacancies Section */}
      <section className="py-24 px-4 relative z-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight uppercase">Open Positions</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Join a team that values engineering excellence over everything.
            </p>
          </div>

          <div className="flex flex-col space-y-10 items-center lg:flex-row lg:justify-around items-center">
            {VACANCIES.map((job) => (
              <div 
                key={job.id} 
                className={`career-card career-card-${job.id} group w-72 h-80 bg-black rounded overflow-hidden flex justify-center items-center relative transition-all duration-1000`}
                style={{
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
                  backgroundImage: `url('${job.bgImage}')`,
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="h-72 w-64 border border-transparent group-hover:border-white transition-all duration-300 relative">
                  <h2 className="text-white ml-4 pt-5 text-xl font-semibold font-mont drop-shadow-md">{job.title}</h2>
                  
                  <div className="icons flex flex-col text-white/90 absolute top-40 space-y-4 ml-4">
                    <div className="flex items-center gap-3 group/icon">
                      <svg className="w-4 h-4 text-[#00a6cb]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-3 group/icon">
                      <svg className="w-4 h-4 text-[#00a6cb]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">{job.type}</span>
                    </div>
                    <div className="flex items-center gap-3 group/icon">
                      <svg className="w-4 h-4 text-[#00a6cb]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">{job.dept}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
             <p className="text-slate-500 font-medium">Don't see a role that fits? Send your resume to <a href="mailto:careers@everacy.com" className="text-[#00a6cb] font-bold hover:underline">careers@everacy.com</a></p>
          </div>
        </div>
      </section>
    </main>
  );
}

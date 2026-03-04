import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "About",
  description: "Learn about our team, mission, and values.",
  canonicalPath: "/about",
});

import { TeamSection } from "@/components/sections/TeamSection";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";

export default function AboutPage() {
  return (
    <main className="relative z-[1] bg-white">
      {/* Dark Liquid About Hero */}
      <section className="relative pt-40 pb-32 font-mont overflow-hidden flex items-center justify-center min-h-[70vh]">
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
                Everything Starts <br/> with <span className="text-[#00a6cb]">Elite Minds.</span>
            </h1>
            <p className="text-white/80 drop-shadow-md text-xl md:text-2xl font-medium max-w-3xl mx-auto">
                Everacy is more than a firm — it&apos;s a collective of engineers, architects, and designers dedicated to building the future of digital infrastructure.
            </p>
        </div>
      </section>

      <TeamSection />
    </main>
  );
}

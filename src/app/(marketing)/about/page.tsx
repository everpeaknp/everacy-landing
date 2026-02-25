import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "About",
  description: "Learn about our team, mission, and values.",
  canonicalPath: "/about",
});

import { TeamSection } from "@/components/sections/TeamSection";

export default function AboutPage() {
  return (
    <main className="relative z-[1] bg-white">
      {/* Simple About Hero */}
      <section className="pt-40 pb-20 bg-slate-50 font-mont">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
                Everything Starts <br/> with <span style={{ color: "#27446e" }}>Elite Minds.</span>
            </h1>
            <p className="text-slate-500 text-xl font-medium max-w-3xl mx-auto">
                Everacy is more than a firm — it's a collective of engineers, architects, and designers dedicated to building the future of digital infrastructure.
            </p>
        </div>
      </section>

      <TeamSection />
    </main>
  );
}

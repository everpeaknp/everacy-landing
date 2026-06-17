import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";

export const metadata: Metadata = genMeta({
  title: "Terms of Service",
  description: "Terms and conditions for using Everacy's services and website.",
  canonicalPath: "/terms",
});

export default function TermsPage() {
  return (
    <main className="relative z-[1] bg-white font-mont text-slate-900">
      {/* Dark Liquid Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-24 sm:pb-32 overflow-hidden flex items-center justify-center min-h-[40vh] sm:min-h-[50vh] section-clip-x">
        <div className="absolute inset-0 w-full h-full bg-black -z-10">
          <LiquidEffectAnimation fill="absolute" zIndex={0} />
          {/* Dark vignette */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(3,8,24,0.3) 0%, rgba(2,5,18,0.75) 100%)",
            }}
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-black text-white drop-shadow-lg mb-6 uppercase tracking-tight leading-[1.08]">
            Terms of Service
          </h1>
          <p className="text-white/80 drop-shadow-md text-base sm:text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            The rules and guidelines for using our platform.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 max-w-4xl mx-auto relative z-20">
        <div className="prose prose-slate prose-lg max-w-none">
          <p className="text-slate-500 font-medium">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-6 text-slate-600 leading-relaxed">
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. Use of Services</h2>
          <p className="mb-6 text-slate-600 leading-relaxed">
            You agree to use our website and services only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Intellectual Property</h2>
          <p className="mb-6 text-slate-600 leading-relaxed">
            All content on this website, including text, graphics, logos, and software, is the property of Everacy or its content suppliers and is protected by international copyright laws.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Limitation of Liability</h2>
          <p className="mb-6 text-slate-600 leading-relaxed">
            Everacy shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services or website.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">5. Changes to Terms</h2>
          <p className="mb-6 text-slate-600 leading-relaxed">
            We reserve the right to modify these terms at any time. Your continued use of the website following the posting of changes will mean you accept those changes.
          </p>
        </div>
      </section>
    </main>
  );
}

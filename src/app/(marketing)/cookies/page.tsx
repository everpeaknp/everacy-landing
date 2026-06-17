import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";

export const metadata: Metadata = genMeta({
  title: "Cookie Policy",
  description: "Learn how we use cookies to improve your experience.",
  canonicalPath: "/cookies",
});

export default function CookiesPage() {
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
            Cookie Policy
          </h1>
          <p className="text-white/80 drop-shadow-md text-base sm:text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            How we use cookies and tracking technologies.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 max-w-4xl mx-auto relative z-20">
        <div className="prose prose-slate prose-lg max-w-none">
          <p className="text-slate-500 font-medium">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. What Are Cookies</h2>
          <p className="mb-6 text-slate-600 leading-relaxed">
            Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work efficiently and to provide information to the owners of the site.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. How We Use Cookies</h2>
          <p className="mb-6 text-slate-600 leading-relaxed">
            We use cookies to understand how you interact with our website, to remember your preferences, and to improve your overall experience. This includes essential cookies required for basic site functionality and analytics cookies to help us improve our performance.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Types of Cookies We Use</h2>
          <ul className="list-disc pl-6 mb-6 text-slate-600 leading-relaxed">
            <li className="mb-2"><strong>Essential Cookies:</strong> Necessary for the website to function properly.</li>
            <li className="mb-2"><strong>Analytical Cookies:</strong> Help us understand how visitors use the site so we can make improvements.</li>
            <li className="mb-2"><strong>Functional Cookies:</strong> Remember your choices to provide an enhanced experience.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Managing Your Cookie Preferences</h2>
          <p className="mb-6 text-slate-600 leading-relaxed">
            Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience and lose the ability to access certain functionalities.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">5. Contact Us</h2>
          <p className="mb-6 text-slate-600 leading-relaxed">
            If you have any questions about our use of cookies, please contact us through our website.
          </p>
        </div>
      </section>
    </main>
  );
}

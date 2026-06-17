import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";

export const metadata: Metadata = genMeta({
  title: "Privacy Policy",
  description: "Learn how Everacy handles and protects your data.",
  canonicalPath: "/privacy",
});

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-white/80 drop-shadow-md text-base sm:text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            How we protect and manage your data.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 max-w-4xl mx-auto relative z-20">
        <div className="prose prose-slate prose-lg max-w-none">
          <p className="text-slate-500 font-medium">Last Updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">1. Information We Collect</h2>
          <p className="mb-6 text-slate-600 leading-relaxed">
            We collect information you provide directly to us, such as when you submit a contact form, apply for a job, or interact with our services. This may include your name, email address, phone number, and any other details you choose to provide.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">2. How We Use Your Information</h2>
          <p className="mb-6 text-slate-600 leading-relaxed">
            We use the information we collect to respond to your inquiries, process your job applications, operate our website, and improve our services. We do not sell your personal information to third parties.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">3. Data Security</h2>
          <p className="mb-6 text-slate-600 leading-relaxed">
            We implement reasonable security measures to protect your personal data from unauthorized access, loss, or misuse. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">4. Your Rights</h2>
          <p className="mb-6 text-slate-600 leading-relaxed">
            Depending on your location, you may have the right to access, update, or delete your personal information. If you wish to exercise these rights, please contact us.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">5. Contact Us</h2>
          <p className="mb-6 text-slate-600 leading-relaxed">
            If you have any questions about this Privacy Policy, please reach out to us via our contact page.
          </p>
        </div>
      </section>
    </main>
  );
}

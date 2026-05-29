import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { fetchServicesPage } from "@/lib/api";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";
import ServicesClient from "./ServicesClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = genMeta({
  title: "Services",
  description:
    "Everacy provides cutting-edge digital infrastructure and engineering services tailored to your needs.",
  canonicalPath: "/services",
});

export default async function ServicesPage() {
  const pageData = await fetchServicesPage();

  const heroTitle =
    pageData?.hero?.title ?? "Solutions for the Future.";
  const heroSubtitle =
    pageData?.hero?.subtitle ??
    "Everacy provides cutting-edge digital infrastructure and engineering services tailored to your needs.";
  const services = pageData?.services ?? [];

  return (
    <main className="relative z-[1] bg-white">
      {/* Dark Liquid Services Hero — matches /about aesthetics */}
      <section className="relative pt-32 sm:pt-40 pb-24 sm:pb-32 font-mont overflow-hidden flex items-center justify-center min-h-[70vh] section-clip-x">
        <div className="absolute inset-0 w-full h-full bg-black -z-10">
          <LiquidEffectAnimation fill="absolute" zIndex={0} />
          {/* Dark vignette matching home/about page */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(3,8,24,0.3) 0%, rgba(2,5,18,0.75) 100%)",
            }}
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-[clamp(2.1rem,10vw,4.6rem)] font-black text-white drop-shadow-lg mb-6 uppercase tracking-tight leading-[1.08]">
            {heroTitle}
          </h1>
          <p className="text-white/80 drop-shadow-md text-base sm:text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Interactive Services Grid */}
      <ServicesClient initialServices={services} />
    </main>
  );
}

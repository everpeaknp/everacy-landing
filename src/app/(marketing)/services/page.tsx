import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { fetchServices } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = genMeta({
  title: "Services",
  description: "Everacy provides cutting-edge digital infrastructure and engineering services tailored to your needs.",
  canonicalPath: "/services",
});

export default async function ServicesPage() {
  const services = await fetchServices();

  return (
    <main className="relative z-[1] bg-white">
      {/* Services Hero */}
      <section className="pt-32 sm:pt-40 pb-20 bg-slate-50 font-mont min-h-[50vh] section-clip-x">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-[clamp(2.1rem,10vw,4.6rem)] font-black text-slate-900 mb-6 uppercase tracking-tight leading-[1.08]">
            Solutions for <br className="hidden sm:block" /> the{" "}
            <span className="text-brand">Future.</span>
          </h1>
          <p className="text-slate-500 text-base sm:text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Everacy provides cutting-edge digital infrastructure and engineering services tailored to your needs.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      {services.length > 0 && (
        <section className="py-24 px-4 bg-white font-mont">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {service.image && (
                    <div className="relative h-56 w-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.image}
                        alt={service.image_alt || service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-8">
                    <h2 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>
                    <a
                      href={service.link_href}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-slate-900 transition-all duration-200 hover:opacity-80"
                      style={{ backgroundColor: service.accent_color }}
                    >
                      {service.link_label}
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

"use client";

import type { Metadata } from "next";

export default function ServicesPage() {
  return (
    <main className="relative z-[1] bg-white">
      {/* Simple Services Hero */}
      <section className="pt-32 sm:pt-40 pb-20 bg-slate-50 font-mont min-h-screen section-clip-x">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-[clamp(2.1rem,10vw,4.6rem)] font-black text-slate-900 mb-6 uppercase tracking-tight leading-[1.08]">
                Solutions for <br className="hidden sm:block" /> the <span className="text-brand">Future.</span>
            </h1>
            <p className="text-slate-500 text-base sm:text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
                Everacy provides cutting-edge digital infrastructure and engineering services tailored to your needs.
            </p>
        </div>
      </section>
    </main>
  );
}

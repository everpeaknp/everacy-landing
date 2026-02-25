"use client";

import type { Metadata } from "next";

export default function ServicesPage() {
  return (
    <main className="relative z-[1] bg-white">
      {/* Simple Services Hero */}
      <section className="pt-40 pb-20 bg-slate-50 font-mont min-h-screen">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
                Solutions for <br/> the <span className="text-brand">Future.</span>
            </h1>
            <p className="text-slate-500 text-xl font-medium max-w-3xl mx-auto">
                Everacy provides cutting-edge digital infrastructure and engineering services tailored to your needs.
            </p>
        </div>
      </section>
    </main>
  );
}

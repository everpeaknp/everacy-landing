import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Services",
  description: "Explore the IT services we offer.",
  canonicalPath: "/services",
});

export default function ServicesPage() {
  return (
    <main>
      <section className="section-full flex items-center justify-center">
        <h1 className="text-4xl font-bold">Services</h1>
      </section>
    </main>
  );
}

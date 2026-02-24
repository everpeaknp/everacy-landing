import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "About",
  description: "Learn about our team, mission, and values.",
  canonicalPath: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <section className="section-full flex items-center justify-center">
        <h1 className="text-4xl font-bold">About</h1>
      </section>
    </main>
  );
}

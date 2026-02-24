import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Contact",
  description: "Get in touch with us.",
  canonicalPath: "/contact",
});

export default function ContactPage() {
  return (
    <main>
      <section className="section-full flex items-center justify-center">
        <h1 className="text-4xl font-bold">Contact</h1>
      </section>
    </main>
  );
}

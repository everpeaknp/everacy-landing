import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { fetchContact, fetchGlobalSEO } from "@/lib/api";
import { ContactForm } from "@/components/sections/ContactForm";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [contactData, globalSeo] = await Promise.all([
    fetchContact(),
    fetchGlobalSEO(),
  ]);

  return genMeta({
    title: "Contact",
    description: "Get in touch with Everacy. Let's build what matters.",
    canonicalPath: "/contact",
    seoData: contactData?.seo,
    globalSeo,
  });
}

export default async function ContactPage() {
  const contactData = await fetchContact();

  return <ContactForm data={contactData} />;
}

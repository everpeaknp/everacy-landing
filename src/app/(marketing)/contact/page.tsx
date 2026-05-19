import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { fetchContact } from "@/lib/api";
import { ContactForm } from "@/components/sections/ContactForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = genMeta({
  title: "Contact",
  description: "Get in touch with Everacy. Let's build what matters.",
  canonicalPath: "/contact",
});

export default async function ContactPage() {
  const contactData = await fetchContact();

  return <ContactForm data={contactData} />;
}

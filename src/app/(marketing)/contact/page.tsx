import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { fetchContact, fetchGlobalSEO, fetchPageSEO } from "@/lib/api";
import { ContactForm } from "@/components/sections/ContactForm";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [contactData, globalSeo, pageSeo] = await Promise.all([
    fetchContact(),
    fetchGlobalSEO(),
    fetchPageSEO("contact"),
  ]);

  return genMeta({
    title: "Contact",
    description: "Get in touch with Everacy. Let's build what matters.",
    canonicalPath: "/contact",
    seoData: contactData?.seo,
    globalSeo,
    pageSeo,
  });
}

export default async function ContactPage() {
  const [contactData, pageSeo] = await Promise.all([
    fetchContact(),
    fetchPageSEO("contact"),
  ]);

  return (
    <>
      {(pageSeo?.jsonLd || pageSeo?.json_ld) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pageSeo.jsonLd || pageSeo.json_ld),
          }}
        />
      )}
      <ContactForm data={contactData} />
    </>
  );
}

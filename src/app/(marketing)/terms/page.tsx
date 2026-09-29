import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPageView } from "@/components/sections/LegalPageView";
import { fetchLegalPage } from "@/lib/api";
import { generateMetadata as genMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchLegalPage("terms");
  if (!page) return genMeta({ noIndex: true });
  return genMeta({ title: page.title, description: page.subtitle || undefined, canonicalPath: "/terms" });
}

export default async function TermsPage() {
  const page = await fetchLegalPage("terms");
  if (!page) notFound();
  return <LegalPageView page={page} />;
}

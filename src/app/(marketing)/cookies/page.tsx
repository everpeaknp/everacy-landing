import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPageView } from "@/components/sections/LegalPageView";
import { fetchLegalPage } from "@/lib/api";
import { generateMetadata as genMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchLegalPage("cookies");
  if (!page) return genMeta({ noIndex: true });
  return genMeta({ title: page.title, description: page.subtitle || undefined, canonicalPath: "/cookies" });
}

export default async function CookiesPage() {
  const page = await fetchLegalPage("cookies");
  if (!page) notFound();
  return <LegalPageView page={page} />;
}

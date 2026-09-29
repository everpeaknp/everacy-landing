import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { fetchBlogs, fetchGlobalSEO, fetchPageSEO } from "@/lib/api";
import { BlogsClient } from "./BlogsClient";
import { EmptyState } from "@/components/ui/EmptyState";
import "./styles.css";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [blogsData, globalSeo, pageSeo] = await Promise.all([
    fetchBlogs(),
    fetchGlobalSEO(),
    fetchPageSEO("blogs"),
  ]);

  return genMeta({
    title: blogsData?.hero?.title || "Blogs",
    description: blogsData?.hero?.subtitle || "",
    canonicalPath: "/blogs",
    seoData: blogsData?.seo,
    globalSeo,
    pageSeo,
  });
}

export default async function BlogsPage() {
  const [blogsData, pageSeo] = await Promise.all([
    fetchBlogs(),
    fetchPageSEO("blogs"),
  ]);
  const posts = blogsData?.posts ?? [];
  const hero = blogsData?.hero;

  if (!blogsData) return <EmptyState title="Blog content isn't published yet" />;

  const normalizedPosts = posts.map((blog) => ({
    key: String(blog.id),
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    intro: blog.intro || "",
    content: blog.content,
    image: blog.cover_image || "",
    comments: String(blog.comments_count ?? 0),
    date: blog.publish_date || "",
    category: blog.category?.name,
  }));

  return (
    <main className="relative z-[1] bg-white">
      {(pageSeo?.jsonLd || pageSeo?.json_ld) && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSeo.jsonLd || pageSeo.json_ld) }} />
      )}
      {(hero?.title || hero?.subtitle) && (
        <section className="relative isolate overflow-hidden border-b border-[#dce8ec] bg-[#f4f9fa] px-5 py-20 text-center font-mont text-[#0d2a4a] sm:px-8 sm:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,166,203,0.09),transparent_62%)]" />
          <div className="mx-auto max-w-5xl">
            {hero.title && <h1 className="text-[clamp(2.1rem,7vw,4.25rem)] font-black leading-[1.08] tracking-tight text-[#0d2a4a]">{hero.title}</h1>}
            {hero.subtitle && <p className="mx-auto mt-5 max-w-3xl text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8">{hero.subtitle}</p>}
          </div>
        </section>
      )}
      {normalizedPosts.length > 0 ? <BlogsClient posts={normalizedPosts} /> : <EmptyState title="No articles published yet" />}
    </main>
  );
}

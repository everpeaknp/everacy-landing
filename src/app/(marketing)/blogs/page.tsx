import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";
import { fetchBlogs } from "@/lib/api";
import { BlogsClient } from "./BlogsClient";
import "./styles.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = genMeta({
  title: "Blogs",
  description: "Insights, engineering stories, and product learnings from Everacy.",
  canonicalPath: "/blogs",
});

const BLOGS = [
  {
    title: "SPRING FEVER",
    intro: "Yllamco laboris nisi ut aliquip ex ea commodo.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.",
    comments: "12",
    date: "03.12.2015",
    image:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1765/bg-blog-card.jpg",
  },
  {
    title: "CLOUD NARRATIVE",
    intro: "Reliable systems and resilient delivery, without noise.",
    content:
      "We share practical engineering decisions from platform builds, migrations, and scale-up execution across real product teams.",
    comments: "18",
    date: "11.05.2026",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "PRODUCT RHYTHM",
    intro: "How high-output teams ship with clarity and consistency.",
    content:
      "From architecture tradeoffs to iteration loops, we document what helped move projects forward with measurable outcomes.",
    comments: "07",
    date: "22.05.2026",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
  },
];

export default async function BlogsPage() {
  const blogsData = await fetchBlogs();
  const heroTitle = blogsData?.hero?.title || "Blogs & Insights";
  const heroSubtitle =
    blogsData?.hero?.subtitle ||
    "Engineering notes, product decisions, and practical lessons from real builds.";
  const posts = blogsData?.posts && blogsData.posts.length > 0 ? blogsData.posts : BLOGS;
  const normalizedPosts = posts.map((blog, idx) => {
    if ("cover_image" in blog) {
      return {
        key: `${blog.id}-${blog.publish_date ?? idx}`,
        id: blog.id,
        slug: blog.slug,
        title: blog.title,
        intro: blog.intro || "",
        content: blog.content,
        image:
          blog.cover_image ||
          "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1765/bg-blog-card.jpg",
        comments: String(blog.comments_count ?? 0),
        date: blog.publish_date || "N/A",
      };
    }
    return {
      key: `${blog.title}-${idx}`,
      id: idx,
      title: blog.title,
      intro: blog.intro,
      content: blog.content,
      image: blog.image,
      comments: blog.comments,
      date: blog.date,
    };
  });

  return (
    <main className="relative z-[1] bg-white">
      <section className="relative pt-32 sm:pt-40 pb-24 sm:pb-32 font-mont overflow-hidden flex items-center justify-center min-h-[70vh] section-clip-x">
        <div className="absolute inset-0 w-full h-full bg-black -z-10">
          <LiquidEffectAnimation fill="absolute" zIndex={0} />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(3,8,24,0.3) 0%, rgba(2,5,18,0.75) 100%)",
            }}
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-[clamp(2.1rem,10vw,4.6rem)] font-black text-white drop-shadow-lg mb-6 uppercase tracking-tight leading-[1.08]">
            {heroTitle}
          </h1>
          <p className="text-white/80 drop-shadow-md text-base sm:text-lg md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed">
            {heroSubtitle}
          </p>
        </div>
      </section>

      <BlogsClient posts={normalizedPosts} />
    </main>
  );
}

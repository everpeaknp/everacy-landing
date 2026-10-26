/* ─────────────────────────────────────────────────────────
   FeaturedBlogs — Editorial Case & Insights Showcase
   Inspired by Leapfrog's high-contrast editorial story cards:
   - High-fidelity visual header with rich color backdrop
   - Crisp category badge above bold, punchy headline
   - Sharp, boxy architectural geometry (rounded-none throughout)
   - Tactile hover elevation with cyan hard shadow
   ───────────────────────────────────────────────────────── */
"use client";

import Link from "next/link";
import { resolveImageAlt } from "@/lib/image-seo";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogPostData } from "@/lib/api";
import { EmptyState } from "@/components/ui/EmptyState";

interface FeaturedBlogsProps {
  posts?: BlogPostData[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

const FALLBACK_BLOG_IMAGES = [
  "/images/webdevelopment.jpg",
  "/images/cloudcomputing.jpg",
  "/images/service-previews/service-quality.png",
  "/images/saas.jpg",
];

export function FeaturedBlogs({ posts = [], sectionTitle, sectionSubtitle }: FeaturedBlogsProps) {
  const featuredPosts = posts.slice(0, 3);

  if (featuredPosts.length === 0) return <EmptyState title="No articles published yet" />;

  return (
    <section className="relative z-[2] overflow-hidden border-t border-[#dce8ec] bg-[#f8fbfc] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-12">
          <div>
            <div className="inline-flex items-center gap-2 border border-[#dce8ec] bg-white px-3 py-1 shadow-sm">
              <span className="h-2 w-2 bg-[#008da4]" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#008da4]">
                {sectionSubtitle || "Expert Insights & Technical Stories"}
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-[#0d2a4a] sm:text-4xl lg:text-5xl">
              {sectionTitle || "Stay Ahead With Engineering Insights"}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#586d82]">
              In-depth architectural breakdowns, zero-trust security paradigms, and technical blueprints from our senior engineers.
            </p>
          </div>

          <Link
            href="/blogs"
            className="group inline-flex shrink-0 items-center gap-2 rounded-none border border-[#0d2a4a] bg-white px-5 py-3 font-mono text-xs font-black uppercase tracking-wider text-[#0d2a4a] transition-all hover:bg-[#0d2a4a] hover:text-white"
          >
            <span>Read All Articles</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Leapfrog-Inspired Editorial Story Grid (Sharp Boxy Cards) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post, idx) => {
            const coverImage = post.cover_image || FALLBACK_BLOG_IMAGES[idx % FALLBACK_BLOG_IMAGES.length];
            const categoryName = post.category?.name || "ENGINEERING & CLOUD";

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: idx * 0.1 }}
                className="group flex flex-col justify-between rounded-none border border-[#dce8ec] bg-white transition-all duration-200 hover:-translate-y-1 hover:border-[#008da4] hover:shadow-[5px_5px_0px_0px_#008da4]"
              >
                <Link
                  href={`/blogs/${post.slug || post.id}`}
                  className="flex h-full flex-col no-underline"
                >
                  {/* Rich Visual Header Viewport */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#eef4f6] bg-[#0c1f38]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverImage}
                      alt={resolveImageAlt({
                        alt: post.cover_image_alt,
                        imageTitle: post.cover_image_title,
                        recordTitle: post.title,
                        keywords: post.seo?.meta_keywords,
                        decorative: post.cover_image_is_decorative,
                      })}
                      title={post.cover_image_is_decorative ? undefined : post.cover_image_title || post.cover_image_alt || post.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = FALLBACK_BLOG_IMAGES[idx % FALLBACK_BLOG_IMAGES.length];
                      }}
                    />

                    {/* Corner Tag */}
                    <div className="absolute top-3 left-3 border border-white/20 bg-[#0d2a4a]/90 px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-xs">
                      {categoryName}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      {/* Category Label */}
                      <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider text-[#008da4]">
                        <span>{categoryName}</span>
                        {post.publish_date && (
                          <span className="text-[#8ea2b3] font-normal">{post.publish_date}</span>
                        )}
                      </div>

                      {/* Headline */}
                      <h3 className="mt-3 text-xl font-black tracking-tight text-[#0d2a4a] transition-colors group-hover:text-[#008da4] leading-snug sm:text-2xl">
                        {post.title}
                      </h3>

                      {/* Summary */}
                      {post.intro && (
                        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-[#586d82]">
                          {post.intro}
                        </p>
                      )}
                    </div>

                    {/* Footer Action Link */}
                    <div className="mt-8 border-t border-[#f0f4f6] pt-4 flex items-center justify-between font-mono text-xs font-black uppercase tracking-wider text-[#008da4]">
                      <span className="group-hover:underline">Read The Story</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

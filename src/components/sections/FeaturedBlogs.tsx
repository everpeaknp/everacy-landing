/* ─────────────────────────────────────────────────────────
   FeaturedBlogs — Sharp Architectural Journal / Publications
   Boxy, editorial knowledge showcase:
   - Razor-sharp geometry (rounded-none throughout)
   - High-contrast architectural borders & hover shadows
   - Clean typographical hierarchy with monospace metadata
   ───────────────────────────────────────────────────────── */
"use client";

import Link from "next/link";
import { resolveImageAlt } from "@/lib/image-seo";
import { motion } from "framer-motion";
import type { BlogPostData } from "@/lib/api";
import { EmptyState } from "@/components/ui/EmptyState";

interface FeaturedBlogsProps {
  posts?: BlogPostData[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export function FeaturedBlogs({ posts = [], sectionTitle, sectionSubtitle }: FeaturedBlogsProps) {
  const featuredPosts = posts.slice(0, 4);

  if (featuredPosts.length === 0) return <EmptyState title="No articles published yet" />;

  return (
    <section className="relative z-[2] overflow-hidden border-t border-[#dce8ec] bg-[#f8fbfc] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 sm:mb-14 text-center">
          <div className="inline-flex items-center gap-2 border border-[#dce8ec] bg-white px-3 py-1 shadow-sm">
            <span className="h-2 w-2 bg-[#008da4]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#008da4]">
              {sectionSubtitle || "Engineering Insights"}
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-black uppercase tracking-tight text-[#0d2a4a] sm:text-3xl lg:text-4xl">
            {sectionTitle || "Latest From Our Journal"}
          </h2>
        </div>

        {/* Sharp Boxy Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredPosts.map((post, idx) => {
            const coverImage = post.cover_image;

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: idx * 0.08 }}
                className="group flex flex-col justify-between rounded-none border border-[#dce8ec] bg-white transition-all duration-200 hover:-translate-y-1 hover:border-[#008da4] hover:shadow-[4px_4px_0px_0px_#008da4]"
              >
                <Link
                  href={`/blogs/${post.slug || post.id}`}
                  className="flex h-full flex-col no-underline"
                >
                  {/* Thumb / Image Frame */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#eef4f6] bg-[#f0f4f6]">
                    {coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
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
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center bg-[#f0f8fa] text-xs font-mono font-bold text-[#008da4]">
                        [ ARTICLE ]
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      {post.publish_date && (
                        <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#008da4]">
                          {post.publish_date}
                        </div>
                      )}
                      <h3 className="mt-2 text-base font-black tracking-tight text-[#0d2a4a] transition-colors group-hover:text-[#008da4]">
                        {post.title}
                      </h3>
                      {post.intro && (
                        <p className="mt-2 line-clamp-2 text-xs font-medium leading-relaxed text-[#5c7288]">
                          {post.intro}
                        </p>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#f0f4f6] pt-3 text-[11px] font-mono text-[#7b90a3]">
                      <span className="font-semibold text-[#008da4] group-hover:underline">
                        READ ARTICLE &rarr;
                      </span>
                      {post.comments_count > 0 && (
                        <span>{post.comments_count} {post.comments_count === 1 ? "comment" : "comments"}</span>
                      )}
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

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
  const featuredPosts = posts.slice(0, 7);

  if (featuredPosts.length === 0) return <EmptyState title="No articles published yet" />;

  return (
    <section className="relative w-full py-16 md:py-24 bg-gradient-to-b from-[#f0f6fb] to-[#ffffff] overflow-hidden">
      {/* Soft atmospheric brand light-glow effects */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-40 blur-[120px] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, #b4e3fa 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-30 blur-[100px] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, #8cd4dd 0%, transparent 70%)",
        }}
      />

      <div className="w-[90%] max-w-[1240px] mx-auto">
        <header className="mb-10 md:mb-14">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-[1px] w-8 bg-[#00a6cb]/50" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#00a6cb]">
              {sectionSubtitle}
            </span>
          </div>
          <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-black tracking-tight text-[#123a68] uppercase leading-none">
            {sectionTitle}
          </h2>
        </header>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[960px]:grid-cols-4 gap-6 auto-rows-fr">
          {featuredPosts.map((post, idx) => {
            const isFirst = idx === 0;
            const coverImage = post.cover_image;

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className={`group relative flex flex-col h-full rounded-lg overflow-hidden border border-slate-100 bg-white transition-all duration-350 hover:-translate-y-1 hover:border-[#8cd4dd] hover:shadow-[0_12px_28px_-6px_rgba(18,58,104,0.12)] ${
                  isFirst ? "min-[960px]:col-span-2" : ""
                }`}
              >
                <Link
                  href={`/blogs/${post.slug || post.id}`}
                  className="flex flex-col h-full no-underline"
                >
                  {/* Thumb / Image Container */}
                  <div
                    className="relative w-full overflow-hidden transition-all duration-500 group-hover:scale-[1.02]"
                    style={{
                      paddingBottom: isFirst ? "50%" : "60%",
                    }}
                  >
                    {coverImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={coverImage}
                        alt={resolveImageAlt({ alt: post.cover_image_alt, imageTitle: post.cover_image_title, recordTitle: post.title, keywords: post.seo?.meta_keywords, decorative: post.cover_image_is_decorative })}
                        title={post.cover_image_is_decorative ? undefined : post.cover_image_title || post.cover_image_alt || post.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )}
                  </div>

                  {/* Glass Card Article Content */}
                  <article className="flex-1 flex flex-col justify-between p-5 md:p-6 bg-white">
                    <div className="space-y-3">
                      <h3
                        className={`font-bold tracking-tight text-[#123a68] group-hover:text-[#00a6cb] transition-colors duration-300 ${
                          isFirst ? "text-xl md:text-2xl" : "text-lg"
                        }`}
                      >
                        {post.title}
                      </h3>
                      {post.intro && (
                        <p className="text-sm leading-relaxed text-slate-600 line-clamp-3">
                          {post.intro}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {post.publish_date && <span>{post.publish_date}</span>}
                      {post.comments_count > 0 && (
                        <span className="text-[#00a6cb]">
                          {post.comments_count} {post.comments_count === 1 ? 'Comment' : 'Comments'}
                        </span>
                      )}
                    </div>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

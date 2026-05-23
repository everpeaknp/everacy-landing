"use client";

import Link from "next/link";
import type { BlogPostData } from "@/lib/api";

interface FeaturedBlogsProps {
  posts?: BlogPostData[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

const MOCK_POSTS: BlogPostData[] = [
  {
    id: 101,
    title: "International Artist Feature: Malaysia",
    intro: "Exploring Malaysia's rising digital artists and their innovative approach to blending folklore with modern glassmorphic interface concepts.",
    content: "",
    cover_image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
    comments_count: 5,
    publish_date: "24.05.2026",
    order: 1
  },
  {
    id: 102,
    title: "How to Conduct Remote Usability Testing",
    intro: "A step-by-step masterclass on monitoring and optimizing user flows on high-traffic SaaS systems without disturbing production loads.",
    content: "",
    cover_image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
    comments_count: 2,
    publish_date: "22.05.2026",
    order: 2
  },
  {
    id: 103,
    title: "Created by You, July Edition",
    intro: "Showcasing the most impressive cloud infrastructures and custom component architectures built by the global Everacy developer community.",
    content: "",
    cover_image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    comments_count: 14,
    publish_date: "19.05.2026",
    order: 3
  },
  {
    id: 104,
    title: "How to Code a Scrolling “Alien Lander” Website",
    intro: "Unlocking advanced GSAP timelines to orchestrate smooth viewport physics and dynamic SVG displacements across custom landing zones.",
    content: "",
    cover_image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop",
    comments_count: 9,
    publish_date: "15.05.2026",
    order: 4
  },
  {
    id: 105,
    title: "How to Keep Your Design Portfolio Looking Fresh",
    intro: "Modern guidelines for digital product studios on micro-interactions, responsive typography scaling, and high-performance image loading.",
    content: "",
    cover_image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    comments_count: 3,
    publish_date: "10.05.2026",
    order: 5
  },
  {
    id: 106,
    title: "Notes From Behind the Firewall: Web Design in China",
    intro: "A deep dive into cross-border CDN synchronization, localization paradigms, and network optimizations required for China's fast-evolving web ecosystem.",
    content: "",
    cover_image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop",
    comments_count: 12,
    publish_date: "05.05.2026",
    order: 6
  },
  {
    id: 107,
    title: "Building Hyper-Scale Cloud SaaS Pipelines",
    intro: "Architectural blueprints for zero-downtime microservices using Kubernetes orchestration, custom ingress, and automated failovers.",
    content: "",
    cover_image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
    comments_count: 8,
    publish_date: "01.05.2026",
    order: 7
  }
];

export function FeaturedBlogs({ posts = [], sectionTitle, sectionSubtitle }: FeaturedBlogsProps) {
  // Fall back to MOCK_POSTS if no active featured posts exist yet in the database
  const activePosts = posts && posts.length > 0 ? posts : MOCK_POSTS;

  // Cap at 7 items to perfectly match the asymmetric 7-item grid
  const featuredPosts = activePosts.slice(0, 7);

  // High-quality modern tech stock images as fallbacks
  const fallbackImages = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop", // cyber/space
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop", // microchip
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop", // matrix/code
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop", // high tech room
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop", // abstract glass
    "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop", // neon anime tech
    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop", // 3d glass waves
  ];

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
              {sectionSubtitle || "Featured Insights"}
            </span>
          </div>
          <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-black tracking-tight text-[#123a68] uppercase leading-none">
            {sectionTitle || "Cool Articles"}
          </h2>
        </header>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 min-[960px]:grid-cols-4 gap-6 auto-rows-fr">
          {featuredPosts.map((post, idx) => {
            const isFirst = idx === 0;
            const coverImage = post.cover_image || fallbackImages[idx % fallbackImages.length];

            return (
              <div
                key={post.id}
                className={`group relative flex flex-col h-full rounded-lg overflow-hidden border border-slate-100 bg-white transition-all duration-350 hover:-translate-y-1 hover:border-[#8cd4dd] hover:shadow-[0_12px_28px_-6px_rgba(18,58,104,0.12)] ${
                  isFirst ? "min-[960px]:col-span-2" : ""
                }`}
              >
                <Link
                  href={`/blogs/${post.id}`}
                  className="flex flex-col h-full no-underline"
                >
                  {/* Thumb / Image Container */}
                  <div
                    className="relative w-full overflow-hidden transition-all duration-500 bg-cover bg-center group-hover:scale-[1.02]"
                    style={{
                      backgroundImage: `url(${coverImage})`,
                      paddingBottom: isFirst ? "50%" : "60%",
                    }}
                  />

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
                      <span>{post.publish_date || "Everacy Insight"}</span>
                      {post.comments_count > 0 && (
                        <span className="text-[#00a6cb]">
                          {post.comments_count} {post.comments_count === 1 ? 'Comment' : 'Comments'}
                        </span>
                      )}
                    </div>
                  </article>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

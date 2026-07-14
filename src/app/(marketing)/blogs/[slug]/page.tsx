import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/seo";
import { fetchBlogPost } from "@/lib/api";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle, Calendar } from "lucide-react";
import { ScrollAnimationWrapper } from "@/components/ui/scroll-animation-wrapper";
import { BlogCommentForm } from "@/components/sections/BlogCommentForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await fetchBlogPost(resolvedParams.slug);
  if (!data) return genMeta({ title: "Post Not Found" });

  return genMeta({
    title: data.title,
    description: data.intro || "Read our latest blog post.",
    canonicalPath: `/blogs/${resolvedParams.slug}`,
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await fetchBlogPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const { title, intro, content, cover_image, publish_date, comments_count, recommended_blogs, comments } = post;

  return (
    <main className="relative z-[1] bg-white">
      {/* Dark Liquid Hero matching About page */}
      <section className="relative pt-32 sm:pt-40 pb-24 sm:pb-32 font-mont overflow-hidden flex flex-col items-center justify-center min-h-[60vh] section-clip-x">
        <div className="absolute inset-0 w-full h-full bg-black -z-10">
          <LiquidEffectAnimation fill="absolute" zIndex={0} />
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(3,8,24,0.3) 0%, rgba(2,5,18,0.75) 100%)",
            }}
          />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mt-12">
          {publish_date && (
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 text-[#00a6cb] font-semibold text-sm tracking-widest uppercase bg-brand-dark/50 px-4 py-1.5 rounded-full border border-brand-mid/20 backdrop-blur-md">
                <Calendar className="w-4 h-4" />
                {publish_date}
              </div>
              
              {post.category && (
                <div className="inline-flex items-center text-white font-semibold text-sm tracking-widest uppercase bg-[#00a6cb]/80 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-md">
                  {post.category.name}
                </div>
              )}
            </div>
          )}
          <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-black text-white drop-shadow-lg mb-6 tracking-tight leading-[1.1]">
            {title}
          </h1>
          {intro && (
            <p className="text-white/80 drop-shadow-md text-lg sm:text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed mb-8">
              {intro}
            </p>
          )}


        </div>
      </section>

      {/* Main Content & Sidebar Layout */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">
          
          {/* Main Article Area */}
          <ScrollAnimationWrapper yOffset={40}>
            <article className="min-w-0">
              {cover_image && (
                <div className="w-full h-auto aspect-video mb-12 rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                  <Image
                    src={cover_image}
                    alt={title}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover"
                    unoptimized={true}
                  />
                </div>
              )}
              
              {/* CKEditor Rich Text Content rendered securely */}
              <div 
                className="prose prose-lg prose-gray max-w-none 
                           prose-headings:font-mont prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-brand-dark
                           prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                           prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                           prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                           prose-a:text-brand-mid prose-a:no-underline hover:prose-a:underline
                           prose-img:my-10
                           prose-blockquote:border-l-4 prose-blockquote:border-brand-mid prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:text-gray-600 prose-blockquote:italic prose-blockquote:rounded-r-lg
                           prose-strong:text-brand-dark prose-strong:font-bold
                           prose-ul:list-disc prose-ul:pl-6 prose-li:text-gray-700
                           prose-ol:list-decimal prose-ol:pl-6"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Tags Section at the bottom of the article */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 mt-12 pt-8 border-t border-gray-100">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Topics:</span>
                  {post.tags.map((tag) => (
                    <span key={tag.id} className="text-sm font-medium text-brand-mid bg-brand-mid/10 px-4 py-1.5 rounded-full">
                      #{tag.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Comments Section */}
              <div className="mt-20 pt-16 border-t border-gray-100">
                <h3 className="text-2xl font-black font-mont text-brand-dark tracking-tight mb-8 flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-brand-mid" />
                  Comments ({comments_count})
                </h3>
                
                {/* Existing Comments (Minimal UI) */}
                <div className="mb-16">
                  {comments && comments.length > 0 ? (
                    comments.map((comment: any) => (
                      <div key={comment.id} className="py-6 border-b border-gray-100 last:border-0">
                        <div className="flex items-baseline gap-3 mb-2">
                          <h5 className="font-bold text-brand-dark">{comment.name}</h5>
                          <span className="text-xs text-gray-400 font-medium">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700 text-[15px] leading-relaxed">{comment.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic text-sm">No comments yet. Be the first to share your thoughts!</p>
                  )}
                </div>

                {/* Minimal Comment Form */}
                <BlogCommentForm slug={resolvedParams.slug} />
              </div>
            </article>
          </ScrollAnimationWrapper>

          {/* Sidebar */}
          <ScrollAnimationWrapper delay={0.2} yOffset={40} className="sticky top-32 space-y-8">
            <aside>
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
                <h3 className="text-xl font-black font-mont text-brand-dark tracking-tight mb-6 flex items-center gap-2">
                  <div className="w-2 h-6 bg-brand-mid rounded-full"></div>
                  Recommended Blogs
                </h3>
                
                <div className="flex flex-col gap-6">
                  {recommended_blogs && recommended_blogs.length > 0 ? (
                    recommended_blogs.map((recBlog: any) => (
                      <Link href={`/blogs/${recBlog.slug}`} key={recBlog.id} className="group flex flex-col gap-3 cursor-pointer">
                        {recBlog.cover_image && (
                          <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-gray-200">
                            <Image
                              src={recBlog.cover_image}
                              alt={recBlog.title}
                              width={320}
                              height={180}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-brand-dark leading-tight group-hover:text-brand-mid transition-colors line-clamp-2">
                            {recBlog.title}
                          </h4>
                          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 font-semibold uppercase tracking-wide">
                            <span>{recBlog.publish_date}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{recBlog.comments_count} Comments</span>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">More blogs coming soon!</p>
                  )}
                </div>
              </div>
            </aside>
          </ScrollAnimationWrapper>
        </div>
      </section>
    </main>
  );
}

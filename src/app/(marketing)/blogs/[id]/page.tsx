import type { Metadata } from "next";
import { fetchBlogs, fetchBlogPost } from "@/lib/api";
import { generateMetadata as genMeta } from "@/lib/seo";
import Link from "next/link";
import "./blog-detail.css";

export const dynamic = "force-dynamic";

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchBlogPost(id);
  if (!post) return genMeta({ title: "Blog Post", canonicalPath: `/blogs/${id}` });
  return genMeta({
    title: post.title,
    description: post.intro || post.content.slice(0, 160),
    canonicalPath: `/blogs/${id}`,
  });
}

// Fallback static blog posts (for when API returns null / before data is uploaded)
const STATIC_BLOGS = [
  {
    id: 0,
    title: "SPRING FEVER",
    intro: "Yllamco laboris nisi ut aliquip ex ea commodo.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    cover_image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1765/bg-blog-card.jpg",
    comments_count: 12,
    publish_date: "03.12.2015",
    order: 0,
  },
  {
    id: 1,
    title: "CLOUD NARRATIVE",
    intro: "Reliable systems and resilient delivery, without noise.",
    content:
      "We share practical engineering decisions from platform builds, migrations, and scale-up execution across real product teams.\n\nFrom architecture tradeoffs to iteration loops, we document what helped move projects forward with measurable outcomes and sustainable velocity.",
    cover_image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
    comments_count: 18,
    publish_date: "11.05.2026",
    order: 1,
  },
  {
    id: 2,
    title: "PRODUCT RHYTHM",
    intro: "How high-output teams ship with clarity and consistency.",
    content:
      "From architecture tradeoffs to iteration loops, we document what helped move projects forward with measurable outcomes.\n\nBuilding great products requires both technical excellence and clear communication. The best teams we've worked with share a common trait: they iterate fast and document clearly.",
    cover_image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    comments_count: 7,
    publish_date: "22.05.2026",
    order: 2,
  },
];

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = await params;

  // Try to fetch from API first
  let post = await fetchBlogPost(id);

  // Fall back to static data if API returns null
  if (!post) {
    const numericId = parseInt(id, 10);
    const staticFallback = STATIC_BLOGS.find((b) => b.id === numericId);
    if (staticFallback) {
      post = {
        id: staticFallback.id,
        title: staticFallback.title,
        intro: staticFallback.intro,
        content: staticFallback.content,
        cover_image: staticFallback.cover_image,
        comments_count: staticFallback.comments_count,
        publish_date: staticFallback.publish_date,
        order: staticFallback.order,
      };
    }
  }

  // Fetch all blogs for the sidebar
  const blogsData = await fetchBlogs();
  // Use API posts if available, else use static blogs as sidebar
  const allPosts =
    blogsData && blogsData.posts.length > 0
      ? blogsData.posts
      : STATIC_BLOGS.map((b) => ({
          id: b.id,
          title: b.title,
          intro: b.intro,
          content: b.content,
          cover_image: b.cover_image,
          comments_count: b.comments_count,
          publish_date: b.publish_date,
          order: b.order,
          is_featured: false,
        }));

  // Other posts for sidebar (exclude current)
  const otherPosts = allPosts.filter((p) => p.id !== post?.id);

  if (!post) {
    return (
      <main className="blog-detail-page">
        <div className="blog-detail-not-found">
          <h1>Post not found</h1>
          <Link href="/blogs" className="blog-detail-back-btn">
            ← Back to Blogs
          </Link>
        </div>
      </main>
    );
  }

  const heroImage =
    post.cover_image ||
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1765/bg-blog-card.jpg";

  return (
    <main className="blog-detail-page">
      {/* Hero */}
      <section
        className="blog-detail-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="blog-detail-hero-overlay" />
        <div className="blog-detail-hero-content">
          <Link href="/blogs" className="blog-detail-back-btn">
            ← Back to Blogs
          </Link>
          <h1 className="blog-detail-title">{post.title}</h1>
          {post.intro && <p className="blog-detail-intro">{post.intro}</p>}
          <div className="blog-detail-meta">
            {post.publish_date && <span>{post.publish_date}</span>}
            {post.publish_date && post.comments_count !== undefined && (
              <span className="blog-detail-meta-dot">·</span>
            )}
            {post.comments_count !== undefined && (
              <span>
                {post.comments_count} comment{post.comments_count !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Two-column layout: article + sidebar */}
      <div className="blog-detail-layout">
        {/* Main article */}
        <article className="blog-detail-article">
          <div className="blog-detail-content">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="blog-detail-footer-link">
            <Link href="/blogs" className="blog-detail-all-posts-btn">
              ← All Posts
            </Link>
          </div>
        </article>

        {/* Sidebar: other posts */}
        {otherPosts.length > 0 && (
          <aside className="blog-detail-sidebar">
            <h2 className="blog-sidebar-heading">More Posts</h2>
            <div className="blog-sidebar-list">
              {otherPosts.map((p) => {
                const cardImg =
                  p.cover_image ||
                  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1765/bg-blog-card.jpg";
                return (
                  <Link
                    key={p.id}
                    href={`/blogs/${p.id}`}
                    className="blog-sidebar-card"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cardImg}
                      alt={p.title}
                      className="blog-sidebar-card-img"
                    />
                    <div className="blog-sidebar-card-body">
                      <h3 className="blog-sidebar-card-title">{p.title}</h3>
                      {p.intro && (
                        <p className="blog-sidebar-card-intro">{p.intro}</p>
                      )}
                      <div className="blog-sidebar-card-meta">
                        {p.publish_date && <span>{p.publish_date}</span>}
                        {p.publish_date && p.comments_count !== undefined && (
                          <span className="blog-detail-meta-dot">·</span>
                        )}
                        {p.comments_count !== undefined && (
                          <span>{p.comments_count} comments</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}

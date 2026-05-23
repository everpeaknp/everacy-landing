"use client";

import Link from "next/link";

export type BlogCard = {
  key: string;
  id: string | number;
  title: string;
  intro: string;
  content: string;
  image: string;
  comments: string;
  date: string;
};

export function BlogsClient({ posts }: { posts: BlogCard[] }) {
  return (
    <section className="blogs-card-section section-clip-x">
      <div className="blogs-card-grid">
        {posts.map((blog) => (
          <article
            key={blog.key}
            className="blog-card"
            style={{ backgroundImage: `url(${blog.image})` }}
          >
            <div className="title-content">
              <h3>{blog.title}</h3>
              <hr />
              <div className="intro">{blog.intro}</div>
            </div>

            <div className="card-info">{blog.content}</div>

            <div className="utility-info">
              <ul className="utility-list">
                <li className="comments">{blog.comments}</li>
                <li className="date">{blog.date}</li>
              </ul>
            </div>

            <Link href={`/blogs/${blog.id}`} className="blog-view-btn">
              View More
            </Link>

            <div className="gradient-overlay" />
            <div className="color-overlay" />
          </article>
        ))}
      </div>
    </section>
  );
}

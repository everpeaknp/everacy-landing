"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export type BlogCard = {
  key: string;
  id: string | number;
  slug?: string;
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
        {posts.map((blog, idx) => (
          <motion.article
            key={blog.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
            className="blog-card"
            style={{ backgroundImage: `url(${blog.image})` }}
          >
            <div className="title-content">
              <h3>{blog.title}</h3>
              <hr />
              <div className="intro">{blog.intro}</div>
            </div>

            <div className="card-info">{blog.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...</div>

            <div className="utility-info">
              <ul className="utility-list">
                <li className="comments">{blog.comments}</li>
                <li className="date">{blog.date}</li>
              </ul>
            </div>

            <Link href={`/blogs/${blog.slug || blog.id}`} className="blog-view-btn">
              View More
            </Link>

            <div className="gradient-overlay" />
            <div className="color-overlay" />
          </motion.article>
        ))}
      </div>
    </section>
  );
}

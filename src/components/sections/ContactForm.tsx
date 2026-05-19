/* ─────────────────────────────────────────────────────────
   ContactForm — Full contact page UI with real API submission
   ───────────────────────────────────────────────────────── */
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { submitContactForm } from "@/lib/api";
import type { ContactPageData } from "@/lib/api";

const BRAND_COLOR = "#27446e";

// Returns an SVG icon for known platforms, falls back to first 2 letters
function getPlatformIcon(platform: string) {
  const p = platform.toLowerCase();
  if (p.includes("linkedin"))
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    );
  if (p.includes("github"))
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    );
  if (p.includes("twitter") || p.includes("x"))
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  if (p.includes("facebook"))
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  if (p.includes("instagram"))
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  // Generic fallback — first 2 chars of platform name
  return <span className="text-[10px] font-black uppercase">{platform.slice(0, 2)}</span>;
}

interface ContactFormProps {
  data?: ContactPageData | null;
}

export function ContactForm({ data }: ContactFormProps) {
  const title = data?.title ?? "Let's build something extraordinary.";
  const subtitle =
    data?.subtitle ??
    "Whether you need to scale your cloud infrastructure, build a robust web application, or engineer a complex SaaS product—we are ready to execute.";
  const buttonText = data?.button_text ?? "Send Initialization Request";
  const directConnectTitle = data?.direct_connect_title ?? "Direct Connect";
  const inquiriesLabel = data?.inquiries_label ?? "Inquiries";
  const email = data?.email ?? "everacy.np@gmail.com";
  const addressLabel = data?.address_label ?? "Address";
  const address = data?.address ?? "Chhorepatan, Pokhara, Nepal";
  const followUsLabel = data?.follow_us_label ?? "Follow Us";
  const followUsText = data?.follow_us_text ?? "Digital Footprint";
  // Dynamic social links from API
  const socialLinks = data?.social_links ?? [];

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const result = await submitContactForm(formState);

    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      setErrorMsg(result.message ?? "Something went wrong. Please try again.");
    }
  };

  // Split title at "extraordinary" for the brand-colored word
  const titleParts = title.split("extraordinary");

  return (
    <main className="relative min-h-screen bg-[#fafcff] overflow-hidden pt-28 sm:pt-32 pb-24 font-mont selection:bg-[#27446e] selection:text-white section-clip-x">

      {/* Abstract Background Elements */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-b from-[#e3f0fa] to-transparent opacity-60 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-t from-[#e8f6fc] to-transparent opacity-70 blur-[100px]" />
      </div>

      <section className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 lg:mb-24 text-center lg:text-left"
        >
          <h1 className="text-[clamp(2.1rem,10vw,4.7rem)] font-black text-[#0d1a26] tracking-tight leading-[1.1] mb-6">
            {titleParts.length > 1 ? (
              <>
                {titleParts[0]}
                <span style={{ color: BRAND_COLOR }}>extraordinary.</span>
                {titleParts[1]}
              </>
            ) : (
              title
            )}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl font-light leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-white/80 backdrop-blur-3xl rounded-[2rem] p-8 md:p-12 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] border border-white/60 relative overflow-hidden">

              {/* Subtle inner glow */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#27446e] to-transparent opacity-20" />

              <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2 relative group">
                    <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-[#0d1a26]/50 ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white/50 border-2 border-slate-200 shadow-sm px-4 py-4 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#27446e] focus:ring-4 focus:ring-[#27446e]/10 focus:bg-white transition-all duration-300"
                      placeholder="Everacy tech"
                    />
                  </div>
                  <div className="flex flex-col gap-2 relative group">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-[#0d1a26]/50 ml-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white/50 border-2 border-slate-200 shadow-sm px-4 py-4 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#27446e] focus:ring-4 focus:ring-[#27446e]/10 focus:bg-white transition-all duration-300"
                      placeholder="everacy@company.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 relative group">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-[#0d1a26]/50 ml-1">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-white/50 border-2 border-slate-200 shadow-sm px-4 py-4 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#27446e] focus:ring-4 focus:ring-[#27446e]/10 focus:bg-white transition-all duration-300 resize-none"
                    placeholder="Tell us about your objectives, timeline, and tech stack..."
                  />
                </div>

                {errorMsg && (
                  <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full md:w-auto self-start mt-4 px-10 py-5 rounded-2xl text-[15px] font-bold text-white overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span
                    className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                    style={{ background: BRAND_COLOR }}
                  />
                  <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? "Sending..." : isSuccess ? "Message Received ✓" : buttonText}
                    {!isSubmitting && !isSuccess && (
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Right: Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Direct Contact Card */}
            <div
              className="rounded-[2rem] p-8 md:p-10 relative overflow-hidden text-white"
              style={{ background: BRAND_COLOR }}
            >
              <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none" />

              <h3 className="text-2xl font-bold mb-8 relative z-10">{directConnectTitle}</h3>

              <div className="flex flex-col gap-8 relative z-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2 font-bold">
                    {inquiriesLabel}
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="text-lg md:text-2xl font-medium hover:text-white/80 transition-colors break-all"
                  >
                    {email}
                  </a>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2 font-bold">
                    {addressLabel}
                  </p>
                  <p className="text-lg text-white/90 leading-relaxed font-light">{address}</p>
                </div>
              </div>
            </div>

            {/* Socials Card */}
            <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 border border-white/60 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#0d1a26]/50 font-bold mb-1">
                  {followUsLabel}
                </p>
                <p className="text-[#0d1a26] font-medium">{followUsText}</p>
              </div>
              {socialLinks.length > 0 && (
                <div className="flex gap-4 flex-wrap">
                  {socialLinks.map((link) => (
                    <a
                      key={`${link.id}-${link.platform}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-[#0d1a26] hover:bg-[#27446e] hover:text-white hover:border-transparent transition-all duration-300 capitalize text-xs font-bold"
                    >
                      {getPlatformIcon(link.platform)}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

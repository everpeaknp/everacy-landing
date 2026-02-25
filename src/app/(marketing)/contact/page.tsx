"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Head from "next/head";

const BRAND_COLOR = "#27446e";

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <>
      <Head>
        <title>Contact Us — Everacy</title>
        <meta name="description" content="Get in touch with Everacy. Let's build what matters." />
      </Head>

      <main className="relative min-h-screen bg-[#fafcff] overflow-hidden pt-32 pb-24 font-mont selection:bg-[#27446e] selection:text-white">
        
        {/* Abstract Background Elements */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-b from-[#e3f0fa] to-transparent opacity-60 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-t from-[#e8f6fc] to-transparent opacity-70 blur-[100px]" />
        </div>

        <section className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 lg:mb-24 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#0d1a26] tracking-tight leading-[1.1] mb-6">
              Let&apos;s build <br className="hidden lg:block"/> something <span style={{ color: BRAND_COLOR }}>extraordinary.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl font-light leading-relaxed">
              Whether you need to scale your cloud infrastructure, build a robust web application, or engineer a complex SaaS product—we are ready to execute.
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
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-[#0d1a26]/50 ml-1">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-white/50 border-2 border-slate-200 shadow-sm px-4 py-4 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#27446e] focus:ring-4 focus:ring-[#27446e]/10 focus:bg-white transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="flex flex-col gap-2 relative group">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-[#0d1a26]/50 ml-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-white/50 border-2 border-slate-200 shadow-sm px-4 py-4 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#27446e] focus:ring-4 focus:ring-[#27446e]/10 focus:bg-white transition-all duration-300"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 relative group">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-[#0d1a26]/50 ml-1">Project Details</label>
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
                      {isSubmitting ? "Sending..." : isSuccess ? "Message Received" : "Send Initialization Request"}
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
                {/* Decorative mesh/gradient inside the card */}
                <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none" />
                
                <h3 className="text-2xl font-bold mb-8 relative z-10">Direct Connect</h3>
                
                <div className="flex flex-col gap-8 relative z-10">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2 font-bold">Inquiries</p>
                    <a href="mailto:everacy.np@gmail.com" className="text-xl md:text-2xl font-medium hover:text-white/80 transition-colors">
                      everacy.np@gmail.com
                    </a>
                  </div>
                  
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2 font-bold">Address</p>
                    <p className="text-lg text-white/90 leading-relaxed font-light">
                      Chhorepatan, Pokhara, Nepal
                    </p>
                  </div>
                </div>
              </div>

              {/* Minimal Socials Card */}
              <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 border border-white/60 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#0d1a26]/50 font-bold mb-1">Follow Us</p>
                  <p className="text-[#0d1a26] font-medium">Digital Footprint</p>
                </div>
                <div className="flex gap-4">
                  {/* LinkedIn Icon */}
                  <a href="#" className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-[#0d1a26] hover:bg-[#27446e] hover:text-white hover:border-transparent transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  {/* GitHub Icon */}
                  <a href="#" className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-[#0d1a26] hover:bg-[#27446e] hover:text-white hover:border-transparent transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

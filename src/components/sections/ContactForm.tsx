"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { submitContactForm } from "@/lib/api";
import type { ContactPageData } from "@/lib/api";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LiquidEffectAnimation } from "@/components/ui/liquid-effect-animation";

// Returns an SVG icon for known platforms
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
  return <span className="text-[10px] font-black uppercase">{platform.slice(0, 2)}</span>;
}

const WORK_TYPES = [
  { id: "project", title: "A project / product team", desc: "A product squad to accelerate your time-to-market" },
  { id: "staff", title: "Staff augmentation", desc: "Talent to temporarily fill out gaps in your existing team" },
  { id: "dedicated", title: "Dedicated team", desc: "A cross-functional team for long-term product development" },
];

const SERVICES = [
  "Data / AI / ML", "Software Development", "UI / UX Design", "DevOps", 
  "Cloud Infrastructure", "Mobile App Development", "Quality Assurance", "Other"
];

interface ContactFormProps {
  data?: ContactPageData | null;
}

export function ContactForm({ data }: ContactFormProps) {
  const title = data?.title ?? "Let's build together.";
  const subtitle = data?.subtitle ?? "Whether you have a team playing to launch a business or an enterprise looking to scale up, there's definitely something we can do for you.";
  const heroImage = data?.hero_image ?? "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200";
  
  const letsTalkTitle = data?.lets_talk_title ?? "Let's talk";
  const letsTalkSubtitle = data?.lets_talk_subtitle ?? "Call us for a quick chat at";
  const phone = data?.phone ?? "+1 (555) 123-4567";
  const phoneScheduleText = data?.phone_schedule_text ?? "We're available on weekdays during working hours.";

  const jobsTitle = data?.jobs_title ?? "Looking for a job?";
  const jobsDescription = data?.jobs_description ?? "There's a lot going on here. We're looking for folks that share our passion for tech and are down to innovate. See what roles are currently available at Everacy.";
  const jobsLinkText = data?.jobs_link_text ?? "Apply Now";

  const followUsLabel = data?.follow_us_label ?? "Follow Us";
  const followUsText = data?.follow_us_text ?? "Digital Footprint";
  const buttonText = data?.button_text ?? "Send A Message";
  const socialLinks = data?.social_links ?? [];

  const [formState, setFormState] = useState({ 
    name: "", email: "", phone: "", workType: "project", services: [] as string[], message: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleService = (service: string) => {
    setFormState(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const payload = {
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      work_type: WORK_TYPES.find(w => w.id === formState.workType)?.title || formState.workType,
      services: formState.services.join(", "),
      message: formState.message,
    };

    const result = await submitContactForm(payload);

    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      setFormState({ name: "", email: "", phone: "", workType: "project", services: [], message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      setErrorMsg(result.message ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <main className="relative z-[1] bg-white font-mont text-slate-900">
      
      {/* Dark Liquid Hero Section - Matching /about */}
      <section className="relative pt-32 sm:pt-40 pb-24 sm:pb-32 overflow-hidden flex items-center justify-center min-h-[50vh] sm:min-h-[60vh] section-clip-x">
        <div className="absolute inset-0 w-full h-full bg-black -z-10">
          <LiquidEffectAnimation fill="absolute" zIndex={0} />
          {/* Dark vignette */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(3,8,24,0.3) 0%, rgba(2,5,18,0.75) 100%)",
            }}
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-black text-white drop-shadow-lg mb-6 uppercase tracking-tight leading-[1.08]">
            {title}
          </h1>
          <p className="text-white/80 drop-shadow-md text-base sm:text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Premium Visual & Info */}
          <div className="flex flex-col gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative w-full aspect-[4/5] rounded-br-[120px] overflow-hidden bg-slate-100 shadow-xl"
            >
              <Image 
                src={heroImage}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                unoptimized={true}
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-10"
            >
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">{letsTalkTitle}</h3>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-500 text-sm">{letsTalkSubtitle}</span>
                  <a href={`tel:${phone}`} className="text-2xl font-bold text-[#27446e] hover:text-[#00a6cb] transition-colors">
                    {phone}
                  </a>
                  <span className="text-slate-400 text-xs italic mt-2">{phoneScheduleText}</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">{jobsTitle}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {jobsDescription}
                </p>
                <Link href="/careers" className="inline-flex items-center gap-2 text-[#00a6cb] font-bold text-sm uppercase tracking-widest hover:text-[#27446e] transition-colors mt-1">
                  {jobsLinkText} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
            
            {/* Socials - Minimalist */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="pt-8 border-t border-slate-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold mb-1">
                    {followUsLabel}
                  </p>
                  <p className="text-slate-900 font-bold">{followUsText}</p>
                </div>
                {socialLinks.length > 0 && (
                  <div className="flex gap-3 flex-wrap">
                    {socialLinks.map((link) => (
                      <a
                        key={`${link.id}-${link.platform}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.platform}
                        className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-[#27446e] hover:text-white hover:border-transparent transition-all duration-300"
                      >
                        {getPlatformIcon(link.platform)}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white border border-slate-200 rounded-[2.5rem] p-8 sm:p-12 shadow-xl shadow-slate-200/50"
          >
            <div className="mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Simply fill out <span className="text-[#00a6cb]">this form</span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We will promptly respond to your inquiry to discuss potential collaboration opportunities. You can expect to hear from us within two business days.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Name & Email */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Your full name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-slate-300 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#00a6cb] transition-colors"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Your email address</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-transparent border-b-2 border-slate-300 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#00a6cb] transition-colors"
                    placeholder="e.g. john@example.com"
                  />
                </div>
              </div>

              {/* Work Type */}
              <div className="flex flex-col gap-4 mt-4">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  How do you want to work with us?
                  <span className="block text-slate-400 font-normal normal-case tracking-normal mt-1 text-[11px]">Select the model that works best for your needs</span>
                </label>
                <div className="flex flex-col gap-3">
                  {WORK_TYPES.map((type) => (
                    <div 
                      key={type.id}
                      onClick={() => setFormState({ ...formState, workType: type.id })}
                      className={`relative flex items-start gap-4 p-5 rounded-2xl cursor-pointer border-2 transition-all duration-300 ${
                        formState.workType === type.id 
                          ? "border-[#00a6cb] bg-white shadow-md" 
                          : "border-slate-200 bg-slate-50 hover:border-[#00a6cb]/30"
                      }`}
                    >
                      <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formState.workType === type.id ? "border-[#00a6cb]" : "border-slate-300"
                      }`}>
                        {formState.workType === type.id && <div className="w-2.5 h-2.5 bg-[#00a6cb] rounded-full" />}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{type.title}</span>
                        <span className="text-sm text-slate-500 leading-relaxed mt-1">{type.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="flex flex-col gap-4 mt-4">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  What services do you require?
                  <span className="block text-slate-400 font-normal normal-case tracking-normal mt-1 text-[11px]">Select all services that apply to your project</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((service) => {
                    const isSelected = formState.services.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                          isSelected 
                            ? "bg-[#00a6cb] text-white border-[#00a6cb] shadow-md shadow-[#00a6cb]/20" 
                            : "bg-white text-slate-600 border-slate-200 hover:border-[#00a6cb]/50 hover:bg-slate-50"
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2 mt-4">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">What is your phone number?</label>
                <div className="flex gap-4 items-end">
                  <div className="relative border-b-2 border-slate-300 pb-3 text-slate-900 focus-within:border-[#00a6cb] transition-colors">
                    <select className="appearance-none bg-transparent pr-8 focus:outline-none cursor-pointer font-medium text-slate-900">
                      <option value="US">United States (+1)</option>
                      <option value="NP">Nepal (+977)</option>
                      <option value="GB">United Kingdom (+44)</option>
                      <option value="AU">Australia (+61)</option>
                      <option value="CH">Switzerland (+41)</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-[80%] w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="flex-1 bg-transparent border-b-2 border-slate-300 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#00a6cb] transition-colors"
                    placeholder="Phone number"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2 mt-4">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Tell us something about your project</label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-slate-300 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#00a6cb] transition-colors resize-none"
                  placeholder="e.g. I am looking to build a..."
                />
              </div>

              {errorMsg && (
                <p className="text-red-500 text-sm font-medium">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="self-start mt-6 bg-[#27446e] hover:bg-[#1a2d4c] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(39,68,110,0.25)] hover:shadow-[0_6px_20px_rgba(39,68,110,0.4)] hover:scale-105 w-full sm:w-auto text-[13px]"
              >
                {isSubmitting ? "Sending..." : isSuccess ? "Message Received ✓" : buttonText}
              </button>
            </form>
          </motion.div>

        </div>
      </section>

    </main>
  );
}

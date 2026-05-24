"use client";

import { useState, useRef } from "react";
import { submitJobApplication } from "@/lib/api";
import { motion } from "framer-motion";
import { UploadCloud, CheckCircle2 } from "lucide-react";

interface JobApplicationFormProps {
  jobId: number;
}

export function JobApplicationForm({ jobId }: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    formData.append("job_position", String(jobId));

    const result = await submitJobApplication(formData);

    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
      setFileName(null);
      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      // Basic error display for field errors or general message
      const errors = result.errors 
        ? Object.values(result.errors).flat().join(", ") 
        : result.message;
      setErrorMsg(errors ?? "Something went wrong. Please try again.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-[#00a6cb]/5 border border-[#00a6cb]/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4">
        <div className="w-16 h-16 bg-[#00a6cb]/10 rounded-full flex items-center justify-center text-[#00a6cb]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Application Received!</h3>
          <p className="text-slate-600">Thank you for applying. We have sent your application to our team and will be in touch soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
      <h3 className="text-lg font-bold uppercase tracking-widest text-slate-900 mb-6 border-b border-slate-100 pb-4">
        Apply for this Position
      </h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full bg-slate-50 border-2 border-slate-100 px-4 py-3 rounded-xl text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#00a6cb] focus:ring-4 focus:ring-[#00a6cb]/10 transition-all duration-300"
              placeholder="John Doe"
            />
          </div>

          <div className="flex flex-col gap-2 relative">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full bg-slate-50 border-2 border-slate-100 px-4 py-3 rounded-xl text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#00a6cb] focus:ring-4 focus:ring-[#00a6cb]/10 transition-all duration-300"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 relative">
          <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full bg-slate-50 border-2 border-slate-100 px-4 py-3 rounded-xl text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#00a6cb] focus:ring-4 focus:ring-[#00a6cb]/10 transition-all duration-300"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="flex flex-col gap-2 relative">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
            Resume / CV *
          </label>
          <div 
            className="w-full bg-slate-50 border-2 border-dashed border-slate-200 px-4 py-8 rounded-xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#00a6cb] hover:bg-[#00a6cb]/5 transition-all duration-300"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud className="w-8 h-8 text-[#00a6cb]" />
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-700">
                {fileName ? fileName : "Click to upload your resume"}
              </p>
              <p className="text-xs text-slate-400 mt-1">PDF, DOC, DOCX up to 10MB</p>
            </div>
            <input
              type="file"
              id="resume"
              name="resume"
              required
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 relative">
          <label htmlFor="cover_letter" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
            Cover Letter
          </label>
          <textarea
            id="cover_letter"
            name="cover_letter"
            rows={5}
            className="w-full bg-slate-50 border-2 border-slate-100 px-4 py-3 rounded-xl text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#00a6cb] focus:ring-4 focus:ring-[#00a6cb]/10 transition-all duration-300 resize-none"
            placeholder="Tell us why you are a great fit for this role..."
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
          className="w-full flex items-center justify-center gap-2 bg-[#00a6cb] hover:bg-[#008db0] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#00a6cb]/25 hover:shadow-xl hover:shadow-[#00a6cb]/40 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </motion.button>

        <p className="text-center text-slate-400 font-georgia text-xs mt-2 italic">
          By applying, you agree to our Candidate Privacy Policy.
        </p>
      </form>
    </div>
  );
}

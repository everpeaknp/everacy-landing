"use client";

import { useState } from "react";
import { submitBlogComment } from "@/lib/api";

interface BlogCommentFormProps {
  slug: string;
}

export function BlogCommentForm({ slug }: BlogCommentFormProps) {
  const [formData, setFormData] = useState({ name: "", email: "", content: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const res = await submitBlogComment(slug, formData);
    if (res.success) {
      setStatus("success");
      setFormData({ name: "", email: "", content: "" });
    } else {
      setStatus("error");
      setErrorMessage(res.message || "Failed to post comment. Please check the fields and try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center">
        <h4 className="text-lg font-bold mb-2">Thank you!</h4>
        <p>Your comment has been submitted successfully.</p>
        <button 
          onClick={() => setStatus("idle")} 
          className="mt-4 text-sm font-semibold text-green-700 underline"
        >
          Submit another comment
        </button>
      </div>
    );
  }

  return (
    <div className="pt-8 border-t border-gray-100">
      <h4 className="text-lg font-bold font-mont text-brand-dark mb-6">Leave a Reply</h4>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required 
              disabled={status === "submitting"}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-mid focus:border-transparent transition-all outline-none text-sm disabled:opacity-50" 
              placeholder="John Doe" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
              disabled={status === "submitting"}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-mid focus:border-transparent transition-all outline-none text-sm disabled:opacity-50" 
              placeholder="john@example.com" 
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Comment</label>
          <textarea 
            name="content" 
            value={formData.content}
            onChange={handleChange}
            required 
            rows={4} 
            disabled={status === "submitting"}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-mid focus:border-transparent transition-all outline-none resize-none text-sm disabled:opacity-50" 
            placeholder="Share your thoughts..."
          ></textarea>
        </div>
        
        {status === "error" && (
          <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
        )}

        <button 
          type="submit" 
          disabled={status === "submitting"}
          className="bg-brand-dark text-white font-bold text-sm tracking-wide uppercase px-8 py-3 rounded-lg hover:bg-brand-mid transition-colors active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {status === "submitting" ? (
            <>
              <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
              Posting...
            </>
          ) : "Post Comment"}
        </button>
      </form>
    </div>
  );
}

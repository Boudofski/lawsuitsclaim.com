"use client";
import { Mail } from "lucide-react";

export default function NewsletterSignup() {
  return (
    <section className="bg-navy-900 rounded-2xl p-8 md:p-12 text-center">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-brand-blue/20 rounded-full">
            <Mail
              className="h-6 w-6 text-brand-blue-light"
              aria-hidden="true"
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Stay Informed — Not Overwhelmed
        </h2>
        <p className="text-slate-400 mb-6 text-sm leading-relaxed">
          Get plain-English legal claim explainers and settlement updates. No
          spam. No legal advice. Unsubscribe anytime.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-2.5 rounded-lg bg-navy-800 border border-navy-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            required
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-brand-blue text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-3">
          This is an informational newsletter. We do not provide legal advice.
        </p>
      </div>
    </section>
  );
}

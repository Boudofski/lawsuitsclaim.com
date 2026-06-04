"use client";
import { Mail } from "lucide-react";

export default function ContactForm() {
  return (
    <form
      className="space-y-5 max-w-lg"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-navy-900 mb-1"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
          required
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-navy-900 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
          required
        />
      </div>
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-navy-900 mb-1"
        >
          Subject
        </label>
        <select
          id="subject"
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
        >
          <option>Correction or factual error</option>
          <option>Content feedback</option>
          <option>General inquiry</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-navy-900 mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white resize-y"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-blue text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
      >
        <Mail className="h-4 w-4" /> Send Message
      </button>
    </form>
  );
}

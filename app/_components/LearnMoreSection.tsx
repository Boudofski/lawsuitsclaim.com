import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function LearnMoreSection() {
  return (
    <section className="bg-warm-paper border border-border rounded-2xl p-8 md:p-12 text-center">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-center mb-5">
          <div className="p-3 bg-blue-50 rounded-full">
            <BookOpen className="h-6 w-6 text-brand-blue" aria-hidden="true" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-navy-900 mb-3">
          Build Confidence Before You Act
        </h2>
        <p className="text-accent-slate leading-relaxed text-sm max-w-md mx-auto mb-8">
          New legal claim explainers and settlement education guides are added
          regularly. Bookmark LawsuitsClaim.com for clear, plain-English
          updates about claim processes, insurance disputes, consumer
          protection, and scam-safe settlement guidance.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/class-actions"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
          >
            Explore Latest Guides <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/editorial-policy"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-navy-900 text-sm font-medium rounded-lg hover:bg-surface transition-colors"
          >
            Read Our Editorial Policy
          </Link>
        </div>
        <p className="text-xs text-accent-slate mt-6">
          General legal information only. We do not provide legal advice or collect case details.
        </p>
      </div>
    </section>
  );
}

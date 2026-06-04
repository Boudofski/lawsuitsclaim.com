import { BookOpen } from "lucide-react";

export default function NewsletterSignup() {
  return (
    <section className="bg-navy-900 rounded-2xl p-8 md:p-12 text-center">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-brand-blue/20 rounded-full">
            <BookOpen
              className="h-6 w-6 text-brand-blue-light"
              aria-hidden="true"
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">
          Stay Informed — Not Overwhelmed
        </h2>
        <p className="text-slate-300 leading-relaxed text-sm max-w-md mx-auto">
          New legal claim explainers and settlement education guides are added
          regularly. Bookmark LawsuitsClaim.com for clear, plain-English updates
          on class actions, personal injury claims, insurance disputes, and
          consumer protection.
        </p>
        <p className="text-xs text-slate-500 mt-5">
          This site provides general legal information only. We do not provide
          legal advice or collect case details.
        </p>
      </div>
    </section>
  );
}

import Link from "next/link";
import { FileSearch } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <FileSearch
        className="h-12 w-12 text-accent-slate mx-auto mb-6"
        aria-hidden="true"
      />
      <h1 className="text-3xl font-bold text-navy-900 mb-3">Page Not Found</h1>
      <p className="text-accent-slate mb-8">
        The guide or page you are looking for does not exist or may have moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-5 py-2.5 bg-brand-blue text-white rounded-lg font-medium hover:bg-navy-800 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}

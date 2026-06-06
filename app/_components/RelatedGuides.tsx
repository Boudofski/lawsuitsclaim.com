import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/lib/articles";

interface RelatedGuidesProps {
  articles: Article[];
  currentCategory: string;
}

export default function RelatedGuides({
  articles,
  currentCategory,
}: RelatedGuidesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="not-prose mt-10 mb-8">
      <h2 className="text-lg font-bold text-navy-900 mb-4">
        More {currentCategory} Guides
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={article.href}
            className="group block bg-white border border-border rounded-xl p-4 hover:border-brand-blue hover:shadow-sm transition-all"
          >
            <p className="text-sm font-semibold text-navy-900 leading-snug mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
              {article.title}
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-blue">
              Read guide <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

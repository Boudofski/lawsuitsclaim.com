import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  href: string;
  category: string;
  readingTime?: string;
  className?: string;
}

export default function ArticleCard({
  title,
  excerpt,
  href,
  category,
  readingTime,
  className,
}: ArticleCardProps) {
  return (
    <article
      className={cn(
        "bg-white border border-border rounded-xl p-6 hover:shadow-md transition-shadow group",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium text-brand-blue bg-blue-50 px-2 py-1 rounded-full">
          {category}
        </span>
        {readingTime && (
          <span className="text-xs text-accent-slate">{readingTime}</span>
        )}
      </div>
      <h3 className="font-semibold text-navy-900 leading-snug mb-2 group-hover:text-brand-blue transition-colors">
        <Link href={href}>{title}</Link>
      </h3>
      <p className="text-sm text-accent-slate leading-relaxed line-clamp-2 mb-4">
        {excerpt}
      </p>
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue hover:text-navy-800 transition-colors"
        aria-label={`Read: ${title}`}
      >
        Read guide <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </article>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  href: string;
  category: string;
  readingTime?: string;
  updatedAt?: string;
  featured?: boolean;
  className?: string;
}

export default function ArticleCard({
  title,
  excerpt,
  href,
  category,
  readingTime,
  updatedAt,
  featured = false,
  className,
}: ArticleCardProps) {
  const dateLabel = updatedAt
    ? `Updated ${new Date(updatedAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })}`
    : null;

  return (
    <article
      className={cn(
        "bg-white border border-border rounded-xl p-6 hover:shadow-md hover:border-slate-300 transition-all group flex flex-col",
        featured && "border-l-4 border-l-brand-blue",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-xs font-medium text-brand-blue bg-blue-50 px-2.5 py-1 rounded-full">
          {category}
        </span>
        {readingTime && (
          <span className="text-xs text-accent-slate">{readingTime}</span>
        )}
        {dateLabel && (
          <span className="text-xs text-accent-slate">{dateLabel}</span>
        )}
      </div>
      <h3
        className={cn(
          "font-semibold text-navy-900 leading-snug mb-2 group-hover:text-brand-blue transition-colors",
          featured ? "text-xl" : "text-base"
        )}
      >
        <Link href={href}>{title}</Link>
      </h3>
      <p
        className={cn(
          "text-accent-slate leading-relaxed flex-1 mb-4",
          featured ? "text-base line-clamp-3" : "text-sm line-clamp-2"
        )}
      >
        {excerpt}
      </p>
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue hover:text-navy-800 transition-colors"
        aria-label={`Read guide: ${title}`}
      >
        Read guide <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </article>
  );
}

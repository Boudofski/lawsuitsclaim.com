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
  className?: string;
}

export default function ArticleCard({
  title,
  excerpt,
  href,
  category,
  readingTime,
  updatedAt,
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
        "bg-white border border-border rounded-xl p-6 hover:shadow-md transition-shadow group flex flex-col",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-xs font-medium text-brand-blue bg-blue-50 px-2 py-1 rounded-full">
          {category}
        </span>
        {readingTime && (
          <span className="text-xs text-accent-slate">{readingTime}</span>
        )}
        {dateLabel && (
          <span className="text-xs text-accent-slate">{dateLabel}</span>
        )}
      </div>
      <h3 className="font-semibold text-navy-900 leading-snug mb-2 group-hover:text-brand-blue transition-colors">
        <Link href={href}>{title}</Link>
      </h3>
      <p className="text-sm text-accent-slate leading-relaxed line-clamp-2 mb-4 flex-1">
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

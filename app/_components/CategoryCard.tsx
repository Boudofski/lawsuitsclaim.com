import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
  Icon: LucideIcon;
  articleCount?: number;
}

export default function CategoryCard({
  title,
  description,
  href,
  Icon,
  articleCount,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-3 bg-white border border-border rounded-xl p-6 hover:shadow-md hover:border-brand-blue/30 transition-all group"
    >
      <div className="flex items-start justify-between">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="h-5 w-5 text-brand-blue" aria-hidden="true" />
        </div>
        {articleCount !== undefined && (
          <span className="text-xs text-accent-slate">
            {articleCount} guides
          </span>
        )}
      </div>
      <div>
        <h3 className="font-semibold text-navy-900 group-hover:text-brand-blue transition-colors mb-1">
          {title}
        </h3>
        <p className="text-sm text-accent-slate leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}

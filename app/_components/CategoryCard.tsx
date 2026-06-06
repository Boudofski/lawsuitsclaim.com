import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
  Icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  className?: string;
}

export default function CategoryCard({
  title,
  description,
  href,
  Icon,
  iconBg = "bg-blue-50",
  iconColor = "text-brand-blue",
  className,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col bg-white border border-border rounded-xl p-6 hover:border-brand-blue hover:shadow-md transition-all min-h-[180px]",
        className
      )}
    >
      <div className={cn("p-3 rounded-xl w-fit mb-4", iconBg)}>
        <Icon className={cn("h-6 w-6", iconColor)} aria-hidden="true" />
      </div>
      <h3 className="font-semibold text-navy-900 mb-2 leading-snug group-hover:text-brand-blue transition-colors text-base">
        {title}
      </h3>
      <p className="text-sm text-accent-slate leading-relaxed flex-1">
        {description}
      </p>
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-blue">
        Explore guides{" "}
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

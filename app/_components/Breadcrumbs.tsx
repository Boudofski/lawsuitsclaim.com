import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1 text-sm text-accent-slate flex-wrap"
    >
      {all.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && (
            <ChevronRight
              className="h-3.5 w-3.5 text-border"
              aria-hidden="true"
            />
          )}
          {item.href && i < all.length - 1 ? (
            <Link
              href={item.href}
              className="hover:text-navy-900 transition-colors"
            >
              {i === 0 ? (
                <Home className="h-3.5 w-3.5" aria-label="Home" />
              ) : (
                item.label
              )}
            </Link>
          ) : (
            <span
              className="text-navy-900 font-medium truncate max-w-[200px]"
              aria-current="page"
            >
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

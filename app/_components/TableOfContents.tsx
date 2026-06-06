import type { Heading } from "@/lib/markdown";
import { List } from "lucide-react";

interface TOCProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TOCProps) {
  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="not-prose bg-surface border border-border rounded-xl p-5 lg:sticky lg:top-24"
    >
      <div className="flex items-center gap-2 mb-4">
        <List className="h-4 w-4 text-accent-slate" aria-hidden="true" />
        <p className="text-xs font-semibold text-accent-slate uppercase tracking-wider">
          In this guide
        </p>
      </div>
      <ol className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
            <a
              href={`#${h.id}`}
              className="text-sm text-accent-slate hover:text-navy-900 transition-colors leading-snug block py-0.5"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

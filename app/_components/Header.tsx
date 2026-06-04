import Link from "next/link";
import { Scale, Menu } from "lucide-react";

const navLinks = [
  { label: "Class Actions", href: "/class-actions" },
  { label: "Settlements", href: "/settlements" },
  { label: "Personal Injury", href: "/personal-injury" },
  { label: "Insurance Claims", href: "/insurance-claims" },
  { label: "Consumer Protection", href: "/consumer-protection" },
  { label: "Scam Check", href: "/scam-check" },
];

export default function Header() {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Scale className="h-6 w-6 text-brand-blue" aria-hidden="true" />
            <span className="font-bold text-navy-900 text-lg tracking-tight">
              LawsuitsClaim
            </span>
          </Link>
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-accent-slate hover:text-navy-900 hover:bg-surface rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/resources"
            className="hidden md:inline-flex items-center px-4 py-2 bg-brand-blue text-white text-sm font-medium rounded-md hover:bg-navy-800 transition-colors"
          >
            Resources
          </Link>
          <button
            className="md:hidden p-2 text-accent-slate"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { Scale } from "lucide-react";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Class Actions", href: "/class-actions" },
  { label: "Personal Injury", href: "/personal-injury" },
  { label: "Insurance Claims", href: "/insurance-claims" },
  { label: "Consumer Protection", href: "/consumer-protection" },
  { label: "Scam Check", href: "/scam-check" },
];

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-md"
          >
            <div className="p-1.5 bg-navy-900 rounded-lg">
              <Scale className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-navy-900 text-base tracking-tight">
                LawsuitsClaim
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-0.5"
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

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-accent-slate border border-border rounded-full px-3 py-1.5 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" aria-hidden="true" />
              Independent Legal Information
            </span>
            <Link
              href="/about"
              className="text-sm font-medium text-navy-900 hover:text-brand-blue transition-colors"
            >
              About
            </Link>
          </div>

          {/* Mobile menu */}
          <MobileMenu navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}

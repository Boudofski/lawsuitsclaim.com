"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

export default function MobileMenu({ navLinks }: { navLinks: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden p-2 text-accent-slate hover:text-navy-900 transition-colors rounded-md"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg z-40">
          <nav
            className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-0.5"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2.5 text-sm text-navy-900 hover:bg-surface rounded-md transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-border">
              <Link
                href="/about"
                className="block px-3 py-2.5 text-sm font-medium text-brand-blue hover:bg-blue-50 rounded-md transition-colors"
                onClick={() => setOpen(false)}
              >
                About
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

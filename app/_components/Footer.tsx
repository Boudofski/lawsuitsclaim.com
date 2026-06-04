import Link from "next/link";
import { Scale } from "lucide-react";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Learn: [
    { label: "Class Actions", href: "/class-actions" },
    { label: "Personal Injury", href: "/personal-injury" },
    { label: "Insurance Claims", href: "/insurance-claims" },
    { label: "Consumer Protection", href: "/consumer-protection" },
    { label: "Scam Check Center", href: "/scam-check" },
  ],
  Site: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Editorial Policy", href: "/editorial-policy" },
  ],
  Legal: [
    { label: "Legal Disclaimer", href: "/legal-disclaimer" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Scale
                className="h-5 w-5 text-brand-blue-light"
                aria-hidden="true"
              />
              <span className="font-bold text-white">LawsuitsClaim</span>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed">
              Plain-English guides to lawsuits, settlements, and legal claims.
              For general information only — not legal advice.
            </p>
          </div>
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                {section}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-navy-800 pt-6 space-y-3">
          <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
            <strong className="text-white">Legal Disclaimer:</strong>{" "}
            LawsuitsClaim.com is an independent legal information publisher. All
            content on this site is for general informational purposes only and
            does not constitute legal advice. We are not a law firm. We do not
            represent clients. We do not guarantee claim eligibility, settlement
            amounts, or case outcomes. Laws vary by state and jurisdiction. If
            you have a legal matter, consult a licensed attorney in your
            jurisdiction.
          </p>
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} LawsuitsClaim. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

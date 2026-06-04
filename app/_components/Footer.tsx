import Link from "next/link";
import { Scale } from "lucide-react";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Learn: [
    { label: "Class Actions", href: "/class-actions" },
    { label: "Settlements", href: "/settlements" },
    { label: "Personal Injury", href: "/personal-injury" },
    { label: "Insurance Claims", href: "/insurance-claims" },
    { label: "Consumer Protection", href: "/consumer-protection" },
    { label: "Scam Check Center", href: "/scam-check" },
  ],
  Site: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Editorial Policy", href: "/editorial-policy" },
    { label: "Resources", href: "/resources" },
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
            <p className="text-sm text-slate-400 leading-relaxed">
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
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-navy-800 pt-6 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} LawsuitsClaim. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 max-w-lg">
            This website provides general legal information only and does not
            constitute legal advice. Laws vary by state and jurisdiction. Consult
            a licensed attorney for advice specific to your situation.
          </p>
        </div>
      </div>
    </footer>
  );
}

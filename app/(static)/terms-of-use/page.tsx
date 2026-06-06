import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import Breadcrumbs from "@/app/_components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for LawsuitsClaim.com — conditions governing your use of this website.",
  alternates: { canonical: "https://lawsuitsclaim.com/terms-of-use" },
};

export default function TermsOfUsePage() {
  return (
    <article>
      {/* Breadcrumbs */}
      <div className="not-prose mb-6">
        <Breadcrumbs items={[{ label: "Terms of Use" }]} />
      </div>

      {/* Intro callout */}
      <div className="not-prose bg-amber-bg border border-amber-border rounded-xl p-5 mb-8 flex items-start gap-4">
        <AlertTriangle
          className="h-6 w-6 text-amber-accent shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div>
          <p className="font-bold text-navy-900 text-base leading-snug">
            Informational use only.
          </p>
          <p className="text-sm text-navy-800 mt-1 leading-relaxed">
            All content on LawsuitsClaim.com is for general informational
            purposes only and does not constitute legal advice. See our full{" "}
            <Link
              href="/legal-disclaimer"
              className="text-brand-blue hover:underline font-medium"
            >
              Legal Disclaimer
            </Link>
            .
          </p>
        </div>
      </div>

      <h1>Terms of Use</h1>
      <p>
        <em>Last updated: June 2026</em>
      </p>

      <h2>Acceptance of Terms</h2>
      <p>
        By accessing LawsuitsClaim.com, you agree to these Terms of Use. If you
        do not agree, please do not use this site.
      </p>

      <h2>Informational Use Only</h2>
      <p>
        All content on LawsuitsClaim.com is for general informational purposes
        only. Nothing on this site constitutes legal advice. See our full{" "}
        <Link href="/legal-disclaimer">Legal Disclaimer</Link>.
      </p>

      <h2>Prohibited Uses</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the site for any unlawful purpose.</li>
        <li>
          Reproduce, republish, or redistribute content without permission.
        </li>
        <li>
          Attempt to gain unauthorized access to any part of the site.
        </li>
        <li>Use automated tools to scrape or copy content at scale.</li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>
        All original content on LawsuitsClaim.com is the property of
        LawsuitsClaim and may not be reproduced without attribution and written
        permission, except for brief quotations with a link to the original
        article.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        LawsuitsClaim.com is provided &ldquo;as is.&rdquo; We make no warranty
        that content is complete, accurate, or up to date. We are not liable for
        any action you take based on content found on this site.
      </p>

      <h2>External Links</h2>
      <p>
        Links to external websites are provided for convenience. We do not
        endorse or control external sites and are not responsible for their
        content.
      </p>

      <h2>Changes to Terms</h2>
      <p>
        We may update these terms at any time. Continued use of the site after
        changes constitutes acceptance.
      </p>
    </article>
  );
}

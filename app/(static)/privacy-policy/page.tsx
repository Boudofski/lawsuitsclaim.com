import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/app/_components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "LawsuitsClaim.com privacy policy — how we collect, use, and protect your information.",
  alternates: { canonical: "https://lawsuitsclaim.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <article>
      <div className="not-prose mb-4">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      </div>

      <h1>Privacy Policy</h1>
      <p>
        <em>Last updated: June 2026</em>
      </p>

      <h2>Information We Collect</h2>
      <p>
        We collect limited information when you visit LawsuitsClaim.com. This
        may include:
      </p>
      <ul>
        <li>
          <strong>Usage data:</strong> pages visited, browser type, referring
          URL, and general geographic location (country/state level), collected
          via analytics tools.
        </li>
        <li>
          <strong>Contact form data:</strong> if you contact us using our
          contact form.
        </li>
      </ul>
      <p>
        We do <strong>not</strong> collect sensitive personal information such
        as Social Security numbers, case details, legal documents, or financial
        information. We do not collect information about your legal cases,
        claims in progress, case outcomes, or legal representation.
      </p>

      <h2>How We Use Information</h2>
      <ul>
        <li>
          To understand how readers use the site and improve our content.
        </li>
        <li>To respond to contact form submissions.</li>
      </ul>

      <h2>Cookies and Tracking</h2>
      <p>
        We use cookies for analytics and, when advertising is enabled, for
        advertising purposes. See our <Link href="/cookie-policy">Cookie Policy</Link> for
        details. You can adjust cookie preferences in your browser settings.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We may use third-party services including Google Analytics (for site
        analytics) and Google AdSense (when advertising is enabled). Each
        third-party service operates under its own privacy policy. We do not
        sell, rent, or trade your personal information to third parties.
      </p>

      <h2>Advertising and Third-Party Vendors</h2>
      <p>
        When advertising is enabled, third-party vendors including Google may
        use cookies or similar technologies to serve and measure ads based on
        your prior visits to this website or other websites. Google&apos;s use
        of advertising cookies enables it and its partners to serve ads based
        on your visit to LawsuitsClaim.com and/or other sites on the internet.
      </p>
      <p>
        You can opt out of personalized advertising by visiting{" "}
        <a
          href="https://adssettings.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Ad Settings
        </a>{" "}
        or{" "}
        <a
          href="http://optout.aboutads.info/"
          target="_blank"
          rel="noopener noreferrer"
        >
          aboutads.info
        </a>
        . You can also opt out of Google Analytics by visiting the{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Analytics Opt-out page
        </a>
        .
      </p>
      <p>
        <em>
          We do not currently display ad units. When advertising is enabled,
          this policy will govern third-party cookie usage.
        </em>
      </p>

      <h2>Data Retention</h2>
      <p>
        Analytics data is retained per the policies of the analytics provider.
      </p>

      <h2>Your Rights</h2>
      <p>
        Depending on your location, you may have rights regarding your personal
        data, including access, correction, or deletion. To exercise these
        rights, contact us via our{" "}
        <Link href="/contact">Contact page</Link>. Note that as an
        informational publisher, we hold minimal personal data about visitors
        beyond standard analytics.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy-related questions, use our{" "}
        <Link href="/contact">Contact page</Link>.
      </p>
    </article>
  );
}

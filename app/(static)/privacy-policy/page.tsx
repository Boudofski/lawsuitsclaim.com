import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "LawsuitsClaim.com privacy policy — how we collect, use, and protect your information.",
  alternates: { canonical: "https://lawsuitsclaim.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <article>
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
        information.
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
        We use cookies for analytics and, if ads are displayed, for advertising
        purposes. See our <Link href="/cookie-policy">Cookie Policy</Link> for
        details. You can adjust cookie preferences in your browser settings.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We may use third-party tools such as Google Analytics and Google
        AdSense. These services have their own privacy policies governing their
        use of data. We do not sell your personal information to third parties.
      </p>

      <h2>Data Retention</h2>
      <p>
        Analytics data is retained per the policies of the analytics provider.
      </p>

      <h2>Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of personal data
        we hold about you by contacting us via our{" "}
        <Link href="/contact">Contact page</Link>.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy-related questions, use our{" "}
        <Link href="/contact">Contact page</Link>.
      </p>
    </article>
  );
}

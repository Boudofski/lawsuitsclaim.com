import type { Metadata } from "next";
import Breadcrumbs from "@/app/_components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "LawsuitsClaim.com cookie policy — how cookies are used on this website.",
  alternates: { canonical: "https://lawsuitsclaim.com/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <article>
      <div className="not-prose mb-4">
        <Breadcrumbs items={[{ label: "Cookie Policy" }]} />
      </div>

      <h1>Cookie Policy</h1>
      <p>
        <em>Last updated: June 2026</em>
      </p>

      <h2>What Are Cookies</h2>
      <p>
        Cookies are small text files stored on your device by your browser when
        you visit websites. They help websites remember information about your
        visit.
      </p>

      <h2>Cookies We Use</h2>
      <ul>
        <li>
          <strong>Analytics cookies:</strong> We use Google Analytics to
          understand how visitors use the site (pages visited, time on site,
          referral source). This data is aggregated and anonymous.
        </li>
        <li>
          <strong>Advertising cookies:</strong> When advertising is enabled,
          Google AdSense and its partners may use cookies to serve ads based on
          your prior browsing activity. This includes cookies used to measure ad
          effectiveness. Google uses these cookies in accordance with its own
          privacy policy.
        </li>
      </ul>
      <p>
        <em>
          Advertising cookies are not currently active. This policy describes
          what will apply when advertising is enabled.
        </em>
      </p>

      <h2>Google as a Third-Party Vendor</h2>
      <p>
        Google AdSense, when enabled, acts as a third-party vendor on this
        site. Google may use cookies (such as the DoubleClick cookie) to serve
        ads based on your prior visits to this and other websites. For
        information about how Google uses data, see{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google&apos;s Privacy Policy
        </a>
        . To opt out of personalized advertising, visit{" "}
        <a
          href="https://adssettings.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Ad Settings
        </a>
        .
      </p>

      <h2>What We Do Not Use Cookies For</h2>
      <p>
        We do not use cookies to collect sensitive personal information, track
        your legal activities, or build individual profiles for sale to third
        parties.
      </p>

      <h2>Managing Cookies</h2>
      <p>
        You can control cookies through your browser settings. Disabling cookies
        may affect site functionality. For opt-out options for Google advertising
        cookies, visit{" "}
        <a
          href="https://adssettings.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Ad Settings
        </a>
        . For more information about third-party cookies and opt-out options,
        visit the{" "}
        <a
          href="https://optout.aboutads.info/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Digital Advertising Alliance opt-out page
        </a>
        .
      </p>
    </article>
  );
}

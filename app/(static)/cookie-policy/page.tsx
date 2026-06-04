import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "LawsuitsClaim.com cookie policy — how cookies are used on this website.",
  alternates: { canonical: "https://lawsuitsclaim.com/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <article>
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
          <strong>Advertising cookies:</strong> If Google AdSense ads are
          displayed, Google may use cookies to serve relevant ads based on your
          browsing activity. You can opt out via Google&apos;s ad settings.
        </li>
      </ul>

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
        .
      </p>
    </article>
  );
}

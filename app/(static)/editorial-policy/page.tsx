import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "LawsuitsClaim editorial standards — how we research, write, source, and update our legal information guides.",
  alternates: { canonical: "https://lawsuitsclaim.com/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <article>
      <h1>Editorial Policy</h1>
      <p>
        <em>Last updated: June 2026</em>
      </p>

      <h2>Our Mission</h2>
      <p>
        LawsuitsClaim publishes accurate, balanced, and clearly written
        educational content about legal claims, settlements, and consumer rights.
        Our mission is to inform — not to advise, sensationalize, or sell.
      </p>

      <h2>Source Standards</h2>
      <ul>
        <li>
          We cite official sources where possible: court documents, settlement
          administrator notices, government agency pages (FTC, CFPB, state AG
          offices), and established legal publications.
        </li>
        <li>
          We do not publish claims about specific lawsuits or settlements without
          linking to or citing a verifiable source.
        </li>
        <li>
          We distinguish between confirmed facts and general explanations.
        </li>
      </ul>

      <h2>Content Accuracy</h2>
      <ul>
        <li>
          Each article is reviewed for factual accuracy before publication.
        </li>
        <li>
          We do not guarantee completeness. Legal topics are complex, and our
          guides provide a general overview — not comprehensive legal analysis.
        </li>
        <li>
          We do not copy or paraphrase settlement administrator websites without
          attribution.
        </li>
      </ul>

      <h2>Updates and Corrections</h2>
      <ul>
        <li>
          We update guides when legal deadlines, settlement details, or
          applicable law changes in a material way.
        </li>
        <li>Updated articles display a &ldquo;Last updated&rdquo; date.</li>
        <li>
          If you believe an article contains an error, please contact us via our{" "}
          <Link href="/contact">Contact page</Link>. We investigate and correct
          confirmed errors promptly.
        </li>
      </ul>

      <h2>Advertising and Sponsored Content</h2>
      <ul>
        <li>We clearly label any sponsored or paid content, if published.</li>
        <li>
          Advertising does not influence editorial decisions or article content.
        </li>
        <li>
          We do not sell legal services, referrals, or case intakes on this
          website.
        </li>
        <li>
          We do not accept payment to publish favorable coverage of any lawsuit,
          settlement, or legal organization.
        </li>
      </ul>

      <h2>What We Do Not Publish</h2>
      <ul>
        <li>Legal advice specific to any reader&apos;s situation.</li>
        <li>
          Claims that a reader qualifies for compensation unless quoting a
          verified eligibility rule from an official source.
        </li>
        <li>
          Content designed to create false urgency or fear about legal
          deadlines.
        </li>
        <li>
          Fake attorney credentials, invented bar memberships, or fabricated
          awards.
        </li>
        <li>
          Misleading &ldquo;check your eligibility&rdquo; forms that collect
          personal information without a clear and legitimate purpose.
        </li>
      </ul>
    </article>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, RefreshCw, Megaphone, XCircle } from "lucide-react";
import Breadcrumbs from "@/app/_components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "LawsuitsClaim editorial standards — how we research, write, source, and update our legal information guides.",
  alternates: { canonical: "https://lawsuitsclaim.com/editorial-policy" },
};

const doNotPublishItems = [
  "Legal advice specific to any reader's situation.",
  "Claims that a reader qualifies for compensation unless quoting a verified eligibility rule from an official source.",
  "Content designed to create false urgency or fear about legal deadlines.",
  "Fake attorney credentials, invented bar memberships, or fabricated awards.",
  'Misleading "check your eligibility" forms that collect personal information without a clear and legitimate purpose.',
  "Promises or implications of specific settlement amounts or outcomes.",
];

export default function EditorialPolicyPage() {
  return (
    <article>
      {/* Breadcrumbs */}
      <div className="not-prose mb-6">
        <Breadcrumbs items={[{ label: "Editorial Policy" }]} />
      </div>

      {/* Page header */}
      <div className="not-prose mb-8">
        <h1 className="text-3xl font-extrabold text-navy-900 mb-2">
          Editorial Policy
        </h1>
        <p className="text-sm text-accent-slate">Last updated: June 2026</p>
        <p className="text-lg text-accent-slate leading-relaxed mt-2">
          How we research, write, source, and maintain every guide on
          LawsuitsClaim.com.
        </p>
      </div>

      {/* Mission */}
      <p>
        LawsuitsClaim publishes accurate, balanced, and clearly written
        educational content about legal claims, settlements, and consumer
        rights. Our mission is to inform — not to advise, sensationalize, or
        sell.
      </p>

      <hr />

      {/* Source Standards */}
      <div className="not-prose bg-surface border border-border rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <ShieldCheck
            className="h-6 w-6 text-brand-blue shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <h2 className="text-xl font-bold text-navy-900">Source Standards</h2>
        </div>
        <ul className="space-y-2 text-navy-800">
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />
            We cite official sources where possible: court documents, settlement
            administrator notices, government agency pages (FTC, CFPB, state AG
            offices), and established legal publications.
          </li>
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />
            We do not publish claims about specific lawsuits or settlements
            without linking to or citing a verifiable source.
          </li>
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />
            We distinguish between confirmed facts and general explanations.
          </li>
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />
            Official-source links are preferred over secondary aggregators or
            unverified legal blogs.
          </li>
        </ul>
      </div>

      {/* Content Accuracy */}
      <div className="not-prose bg-surface border border-border rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold text-navy-900 mb-4">
          Content Accuracy
        </h2>
        <ul className="space-y-2 text-navy-800">
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />
            Each article is reviewed for factual accuracy before publication.
          </li>
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />
            We do not guarantee completeness. Legal topics are complex, and our
            guides provide a general overview — not comprehensive legal
            analysis.
          </li>
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />
            We do not copy or paraphrase settlement administrator websites
            without attribution.
          </li>
        </ul>
      </div>

      {/* Updates & Corrections */}
      <div className="not-prose bg-surface border border-border rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <RefreshCw
            className="h-6 w-6 text-brand-blue shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <h2 className="text-xl font-bold text-navy-900">
            Updates and Corrections
          </h2>
        </div>
        <ul className="space-y-2 text-navy-800">
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />
            We update guides when legal deadlines, settlement details, or
            applicable law changes in a material way.
          </li>
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />
            Updated articles display a &ldquo;Last updated&rdquo; date.
          </li>
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />
            If you believe an article contains an error, please contact us via
            our{" "}
            <Link
              href="/contact"
              className="text-brand-blue hover:underline font-medium"
            >
              Contact page
            </Link>
            . We investigate and correct confirmed errors promptly.
          </li>
        </ul>
      </div>

      {/* Advertising Independence */}
      <div className="not-prose bg-surface border border-border rounded-xl p-6 mb-6">
        <div className="flex items-start gap-3 mb-4">
          <Megaphone
            className="h-6 w-6 text-brand-blue shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <h2 className="text-xl font-bold text-navy-900">
            Advertising and Sponsored Content
          </h2>
        </div>
        <ul className="space-y-2 text-navy-800">
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />
            We clearly label any sponsored or paid content, if published.
          </li>
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />
            Advertising does not influence editorial decisions or article
            content.
          </li>
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />
            We do not sell legal services, referrals, or case intakes on this
            website.
          </li>
          <li className="flex items-start gap-2 leading-relaxed">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue shrink-0" />
            We do not accept payment to publish favorable coverage of any
            lawsuit, settlement, or legal organization.
          </li>
        </ul>
      </div>

      {/* What We Do Not Publish */}
      <div className="not-prose bg-amber-bg border border-amber-border rounded-xl p-6 mb-2">
        <h2 className="text-xl font-bold text-navy-900 mb-4">
          What We Do Not Publish
        </h2>
        <ul className="space-y-3">
          {doNotPublishItems.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <XCircle
                className="h-5 w-5 text-amber-accent shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span className="text-navy-800 leading-relaxed text-sm">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

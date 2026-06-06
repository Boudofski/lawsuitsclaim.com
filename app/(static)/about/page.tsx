import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, XCircle, BookOpen, Mail } from "lucide-react";
import Breadcrumbs from "@/app/_components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About LawsuitsClaim",
  description:
    "LawsuitsClaim is an independent legal information publisher providing plain-English guides to lawsuits, settlements, and legal claims.",
  alternates: { canonical: "https://lawsuitsclaim.com/about" },
};

export default function AboutPage() {
  return (
    <article>
      {/* Breadcrumbs */}
      <div className="not-prose mb-6">
        <Breadcrumbs items={[{ label: "About" }]} />
      </div>

      {/* Page header */}
      <div className="not-prose mb-8">
        <h1 className="text-3xl font-extrabold text-navy-900 mb-2">
          About LawsuitsClaim
        </h1>
        <p className="text-lg text-accent-slate leading-relaxed">
          Independent legal information — written for everyday readers, not
          legal professionals.
        </p>
      </div>

      {/* What We Are */}
      <div className="not-prose bg-surface border border-border rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-navy-900 mb-3">What We Are</h2>
        <p className="text-navy-800 leading-relaxed mb-3">
          <strong>LawsuitsClaim.com</strong> is an independent legal information
          publisher. We explain lawsuits, class action settlements, personal
          injury claims, insurance disputes, and consumer protection topics in
          plain English — for everyday U.S. readers who need to understand the
          process before deciding what to do next.
        </p>
        <p className="text-navy-800 leading-relaxed">
          We publish educational guides, explainers, and FAQs about legal claims
          and the U.S. legal system. Our goal is to help people understand their
          options, recognize scams, and ask better questions when they do speak
          with a lawyer.
        </p>
        <p className="mt-4 text-sm font-semibold text-accent-slate uppercase tracking-wide">
          Published by the LawsuitsClaim Editorial Team
        </p>
      </div>

      {/* What We Are Not */}
      <div className="not-prose bg-amber-bg border border-amber-border rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold text-navy-900 mb-4">
          What We Are Not
        </h2>
        <ul className="space-y-3">
          {[
            "We are not a law firm.",
            "We do not offer legal advice of any kind.",
            "We do not represent clients or accept cases.",
            "We do not guarantee settlement eligibility, amounts, or outcomes.",
            "We do not promise compensation or imply you will recover money.",
            "We do not collect sensitive legal case details.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <XCircle
                className="h-5 w-5 text-amber-accent shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span className="text-navy-800 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-navy-800 leading-relaxed text-sm border-t border-amber-border pt-4">
          If you have a legal matter requiring professional guidance, please
          consult a licensed attorney in your jurisdiction. Many state bar
          associations maintain free referral services.
        </p>
      </div>

      {/* Editorial Standards */}
      <div className="not-prose bg-surface-2 border border-border rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3 mb-4">
          <BookOpen
            className="h-6 w-6 text-brand-blue shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <h2 className="text-xl font-bold text-navy-900">
            Our Editorial Standards
          </h2>
        </div>
        <ul className="space-y-2">
          {[
            "We cite official sources: court documents, settlement administrator notices, government agency pages, and established legal publications.",
            "We do not publish claims we cannot support with a credible, verifiable source.",
            "We update guides when deadlines or legal details change.",
            "We do not invent or exaggerate writer credentials.",
            "We do not list fake bar memberships, awards, or legal credentials.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle
                className="h-4.5 w-4.5 text-brand-blue shrink-0 mt-1"
                aria-hidden="true"
              />
              <span className="text-navy-800 leading-relaxed text-sm">
                {item}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-accent-slate">
          See our full{" "}
          <Link
            href="/editorial-policy"
            className="text-brand-blue hover:underline font-medium"
          >
            Editorial Policy
          </Link>{" "}
          for complete sourcing and correction standards.
        </p>
      </div>

      {/* Contact */}
      <div className="not-prose border border-border rounded-xl p-6">
        <div className="flex items-start gap-3 mb-3">
          <Mail
            className="h-6 w-6 text-brand-blue shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <h2 className="text-xl font-bold text-navy-900">How to Reach Us</h2>
        </div>
        <p className="text-navy-800 leading-relaxed mb-4">
          For corrections, content feedback, or general inquiries, visit our{" "}
          <Link
            href="/contact"
            className="text-brand-blue hover:underline font-medium"
          >
            Contact page
          </Link>
          . We investigate and correct confirmed errors promptly.
        </p>
        <p className="text-sm text-accent-slate">
          We cannot respond to requests for legal advice or case evaluations.
        </p>
      </div>
    </article>
  );
}

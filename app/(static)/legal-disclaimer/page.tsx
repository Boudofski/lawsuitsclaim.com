import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import Breadcrumbs from "@/app/_components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Legal Disclaimer",
  description:
    "Important legal disclaimer for LawsuitsClaim.com — this site provides general information only, not legal advice.",
  alternates: { canonical: "https://lawsuitsclaim.com/legal-disclaimer" },
};

export default function LegalDisclaimerPage() {
  return (
    <article>
      {/* Breadcrumbs */}
      <div className="not-prose mb-6">
        <Breadcrumbs items={[{ label: "Legal Disclaimer" }]} />
      </div>

      {/* Prominent callout */}
      <div className="not-prose bg-amber-bg border border-amber-border rounded-xl p-5 mb-8 flex items-start gap-4">
        <AlertTriangle
          className="h-6 w-6 text-amber-accent shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div>
          <p className="font-bold text-navy-900 text-base leading-snug">
            For general information only — not legal advice.
          </p>
          <p className="text-sm text-navy-800 mt-1 leading-relaxed">
            Nothing on LawsuitsClaim.com constitutes legal advice, legal
            representation, or an attorney-client relationship. If you have a
            legal matter, please consult a licensed attorney in your
            jurisdiction.
          </p>
        </div>
      </div>

      <h1>Legal Disclaimer</h1>
      <p>
        <em>Last updated: June 2026</em>
      </p>

      <h2>General Information Only</h2>
      <p>
        All content published on LawsuitsClaim.com is for{" "}
        <strong>general informational purposes only</strong>. Nothing on this
        website constitutes legal advice, legal representation, or the formation
        of an attorney-client relationship.
      </p>

      <h2>Not a Law Firm</h2>
      <p>
        LawsuitsClaim.com is an independent legal information publisher. We are
        not a law firm. We do not employ attorneys to advise readers. We do not
        accept cases. We do not represent clients in any jurisdiction.
      </p>

      <h2>No Guarantee of Outcomes</h2>
      <p>
        We do not guarantee, promise, or imply any specific legal outcome,
        settlement amount, claim eligibility, or compensation. Every legal
        situation is different, and results depend on facts, jurisdiction, and
        many other factors that we cannot evaluate.
      </p>

      <h2>Jurisdiction Variance</h2>
      <p>
        Laws vary significantly by state and jurisdiction. Information that is
        accurate for one state may not apply to another. Always verify
        information against the laws applicable in your specific location.
      </p>

      <h2>No Endorsement</h2>
      <p>
        Links to external websites, settlement administrators, government
        agencies, or organizations do not constitute endorsement or verification
        of those organizations beyond what is stated in the relevant article.
      </p>

      <h2>Seek Legal Counsel</h2>
      <p>
        If you have a specific legal problem, question, or matter requiring
        advice, please consult a <strong>licensed attorney</strong> in your
        jurisdiction. Many state bar associations maintain referral services to
        help you find qualified legal help.
      </p>
    </article>
  );
}

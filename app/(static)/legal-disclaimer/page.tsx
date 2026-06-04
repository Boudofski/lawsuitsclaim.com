import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Disclaimer",
  description:
    "Important legal disclaimer for LawsuitsClaim.com — this site provides general information only, not legal advice.",
  alternates: { canonical: "https://lawsuitsclaim.com/legal-disclaimer" },
};

export default function LegalDisclaimerPage() {
  return (
    <article>
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

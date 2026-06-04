import { Info } from "lucide-react";

export default function ArticleDisclaimer() {
  return (
    <div className="flex gap-3 p-4 bg-warning-bg border border-warning-border rounded-lg text-sm text-navy-800">
      <Info
        className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5"
        aria-hidden="true"
      />
      <p>
        <strong>Informational purposes only.</strong> This article is for
        general informational purposes only and is not legal advice. Laws vary
        by jurisdiction. If you need advice about your specific situation,
        consider speaking with a licensed attorney.
      </p>
    </div>
  );
}

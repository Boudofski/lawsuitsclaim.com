export default function StaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      {/* Top breathing strip */}
      <div className="bg-warm-paper border-b border-border py-6" />

      {/* Content column */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div
          className="
            prose prose-lg max-w-none
            prose-headings:text-navy-900 prose-headings:font-bold
            prose-h1:text-3xl prose-h1:font-extrabold
            prose-p:text-navy-800 prose-p:leading-relaxed
            prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline
            prose-li:text-navy-800
            prose-strong:text-navy-900
            prose-blockquote:border-l-4 prose-blockquote:border-brand-blue
            prose-blockquote:bg-blue-50 prose-blockquote:not-italic
            prose-blockquote:rounded-r-lg
          "
        >
          {children}
        </div>
      </div>

      {/* Bottom disclaimer strip */}
      <div className="border-t border-border bg-warm-paper">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-sm text-accent-slate leading-relaxed">
            This page provides general information only. Nothing on this site
            constitutes legal advice or creates an attorney-client relationship.
            If you have a legal matter, please consult a licensed attorney in
            your jurisdiction.
          </p>
        </div>
      </div>
    </div>
  );
}

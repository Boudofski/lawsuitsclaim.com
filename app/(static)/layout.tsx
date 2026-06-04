export default function StaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg max-w-none prose-headings:text-navy-900 prose-headings:font-bold prose-p:text-navy-800 prose-p:leading-relaxed prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline prose-li:text-navy-800 prose-strong:text-navy-900">
        {children}
      </div>
    </div>
  );
}

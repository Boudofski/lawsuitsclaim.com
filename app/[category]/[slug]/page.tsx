import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllArticles, getArticle } from "@/lib/articles";
import { getCategoryBySlug } from "@/lib/categories";
import { renderMarkdownToHtml, extractHeadings } from "@/lib/markdown";
import ArticleDisclaimer from "@/app/_components/ArticleDisclaimer";
import Breadcrumbs from "@/app/_components/Breadcrumbs";
import SchemaOrg from "@/app/_components/SchemaOrg";

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({
    category: a.category,
    slug: a.slug,
  }));
}

export async function generateMetadata(
  props: PageProps<"/[category]/[slug]">
): Promise<Metadata> {
  const { category, slug } = await props.params;
  const article = getArticle(category, slug);
  if (!article) return {};
  return {
    title: article.seoTitle,
    description: article.metaDescription,
    alternates: { canonical: `https://lawsuitsclaim.com/${category}/${slug}` },
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
  };
}

export default async function ArticlePage(
  props: PageProps<"/[category]/[slug]">
) {
  const { category, slug } = await props.params;
  const article = getArticle(category, slug);
  if (!article) notFound();

  const cat = getCategoryBySlug(category);
  const html = await renderMarkdownToHtml(article.content);
  const headings = extractHeadings(article.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      "@type": "Organization",
      name: "LawsuitsClaim Editorial Team",
      url: "https://lawsuitsclaim.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "LawsuitsClaim",
      url: "https://lawsuitsclaim.com",
    },
    mainEntityOfPage: `https://lawsuitsclaim.com/${category}/${slug}`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://lawsuitsclaim.com" },
      { "@type": "ListItem", position: 2, name: cat?.label ?? category, item: `https://lawsuitsclaim.com/${category}` },
      { "@type": "ListItem", position: 3, name: article.title, item: `https://lawsuitsclaim.com/${category}/${slug}` },
    ],
  };

  return (
    <>
      <SchemaOrg schema={articleSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumbs + header */}
        <div className="max-w-4xl">
          <Breadcrumbs
            items={[
              { label: cat?.label ?? category, href: `/${category}` },
              { label: article.title },
            ]}
          />
          <header className="mt-6 mb-8">
            <div className="flex items-center gap-2 mb-4 text-sm flex-wrap">
              <span className="font-medium text-brand-blue bg-blue-50 px-2.5 py-1 rounded-full text-xs">
                {cat?.label ?? category}
              </span>
              <span className="text-accent-slate">·</span>
              <span className="text-accent-slate">{article.readingTime}</span>
              {article.updatedAt && (
                <>
                  <span className="text-accent-slate">·</span>
                  <span className="text-accent-slate">
                    Updated{" "}
                    {new Date(article.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-navy-900 leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-lg text-accent-slate leading-relaxed mb-4">
              {article.excerpt}
            </p>
            <p className="text-sm text-accent-slate">
              By <span className="font-medium text-navy-800">LawsuitsClaim Editorial Team</span>
            </p>
          </header>
          <ArticleDisclaimer />
        </div>

        {/* Two-column: article + TOC placeholder (wired in Task 14) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8">
          <div className="flex-1 min-w-0">
            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-navy-900 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-navy-800 prose-p:leading-relaxed prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline prose-strong:text-navy-900 prose-ul:text-navy-800 prose-ol:text-navy-800 prose-li:my-1 prose-hr:border-border prose-blockquote:border-l-4 prose-blockquote:border-brand-blue prose-blockquote:bg-blue-50 prose-blockquote:text-accent-slate prose-blockquote:px-4 prose-blockquote:py-3 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-code:text-navy-800 prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-table:text-sm"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>

          {/* TOC sidebar placeholder — wired in Task 14 */}
          {headings.length >= 2 && (
            <aside className="hidden lg:block lg:w-64 xl:w-72 shrink-0" aria-label="Table of contents" />
          )}
        </div>

        {/* Bottom */}
        <div className="max-w-4xl mt-12 pt-8 border-t border-border">
          <ArticleDisclaimer />
        </div>
      </div>
    </>
  );
}

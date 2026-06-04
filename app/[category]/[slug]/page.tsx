import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllArticles, getArticle } from "@/lib/articles";
import { getCategoryBySlug } from "@/lib/categories";
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
    alternates: {
      canonical: `https://lawsuitsclaim.com/${category}/${slug}`,
    },
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
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
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://lawsuitsclaim.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: cat?.label ?? category,
        item: `https://lawsuitsclaim.com/${category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://lawsuitsclaim.com/${category}/${slug}`,
      },
    ],
  };

  return (
    <>
      <SchemaOrg schema={articleSchema} />
      <SchemaOrg schema={breadcrumbSchema} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs
          items={[
            { label: cat?.label ?? category, href: `/${category}` },
            { label: article.title },
          ]}
        />
        <header className="mt-6 mb-8">
          <div className="flex items-center gap-3 mb-4 text-sm text-accent-slate flex-wrap">
            <span className="font-medium text-brand-blue">
              {cat?.label ?? category}
            </span>
            <span>·</span>
            <span>{article.readingTime}</span>
            {article.updatedAt && (
              <>
                <span>·</span>
                <span>
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
          <p className="text-lg text-accent-slate leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        <ArticleDisclaimer />

        <div className="prose prose-lg max-w-none mt-8 prose-headings:font-bold prose-headings:text-navy-900 prose-p:text-navy-800 prose-p:leading-relaxed prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline prose-strong:text-navy-900 prose-ul:text-navy-800 prose-ol:text-navy-800 prose-hr:border-border prose-blockquote:border-l-brand-blue prose-blockquote:text-accent-slate">
          {article.content.split("\n\n").map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={i}>{block.replace(/^## /, "")}</h2>
              );
            }
            if (block.startsWith("### ")) {
              return (
                <h3 key={i}>{block.replace(/^### /, "")}</h3>
              );
            }
            return <p key={i}>{block}</p>;
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <ArticleDisclaimer />
        </div>
      </div>
    </>
  );
}

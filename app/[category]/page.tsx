import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug, CATEGORIES } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/articles";
import ArticleCard from "@/app/_components/ArticleCard";
import Breadcrumbs from "@/app/_components/Breadcrumbs";

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata(
  props: PageProps<"/[category]">
): Promise<Metadata> {
  const { category } = await props.params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: cat.title,
    description: cat.metaDescription,
    alternates: { canonical: `https://lawsuitsclaim.com/${cat.slug}` },
  };
}

export default async function CategoryPage(props: PageProps<"/[category]">) {
  const { category } = await props.params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const articles = getArticlesByCategory(category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: cat.label }]} />
      <div className="mt-6 mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold text-navy-900 mb-3">{cat.title}</h1>
        <p className="text-accent-slate leading-relaxed">{cat.description}</p>
      </div>

      {articles.length === 0 ? (
        <p className="text-accent-slate">Guides coming soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              excerpt={article.excerpt}
              href={article.href}
              category={cat.label}
              readingTime={article.readingTime}
            />
          ))}
        </div>
      )}
    </div>
  );
}

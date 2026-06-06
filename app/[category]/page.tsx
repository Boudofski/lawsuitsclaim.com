import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  Users,
  HeartHandshake,
  Shield,
  ShoppingBag,
  AlertTriangle,
} from "lucide-react";
import { getCategoryBySlug, CATEGORIES } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/articles";
import ArticleCard from "@/app/_components/ArticleCard";
import CategoryCard from "@/app/_components/CategoryCard";
import Breadcrumbs from "@/app/_components/Breadcrumbs";
import ArticleDisclaimer from "@/app/_components/ArticleDisclaimer";

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

interface CategoryMeta {
  Icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  heroBg: string;
}

const CATEGORY_META: Record<string, CategoryMeta> = {
  "class-actions": {
    Icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-brand-blue",
    heroBg: "bg-blue-50",
  },
  "personal-injury": {
    Icon: HeartHandshake,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    heroBg: "bg-rose-50",
  },
  "insurance-claims": {
    Icon: Shield,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    heroBg: "bg-indigo-50",
  },
  "consumer-protection": {
    Icon: ShoppingBag,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    heroBg: "bg-emerald-50",
  },
  "scam-check": {
    Icon: AlertTriangle,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    heroBg: "bg-amber-50",
  },
};

// Fallback for any future category without explicit meta
const DEFAULT_META: CategoryMeta = {
  Icon: Shield,
  iconBg: "bg-blue-100",
  iconColor: "text-brand-blue",
  heroBg: "bg-blue-50",
};

export default async function CategoryPage(props: PageProps<"/[category]">) {
  const { category } = await props.params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const articles = getArticlesByCategory(category);
  const [featuredArticle, ...remainingArticles] = articles;

  const meta = CATEGORY_META[category] ?? DEFAULT_META;
  const { Icon, iconBg, iconColor, heroBg } = meta;

  const otherCategories = CATEGORIES.filter((c) => c.slug !== category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 1. Breadcrumbs */}
      <Breadcrumbs items={[{ label: cat.label }]} />

      {/* 2. Category hero strip */}
      <div className={`mt-6 mb-10 rounded-2xl border border-border ${heroBg} px-8 py-10`}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className={`p-4 rounded-2xl ${iconBg} shrink-0 w-fit`}>
            <Icon className={`h-8 w-8 ${iconColor}`} aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-navy-900 leading-tight mb-2">
              {cat.title}
            </h1>
            <p className="text-accent-slate leading-relaxed max-w-2xl">
              {cat.description}
            </p>
          </div>
        </div>
      </div>

      {/* 3. "Start here" featured guide */}
      {featuredArticle && (
        <div className="mb-10">
          <p className="text-xs font-semibold text-accent-slate uppercase tracking-wider mb-3">
            Start Here
          </p>
          <ArticleCard
            title={featuredArticle.title}
            excerpt={featuredArticle.excerpt}
            href={featuredArticle.href}
            category={cat.label}
            readingTime={featuredArticle.readingTime}
            updatedAt={featuredArticle.updatedAt}
            featured
          />
        </div>
      )}

      {/* 4. Article grid — remaining articles */}
      {remainingArticles.length > 0 && (
        <div className="mb-14">
          <h2 className="text-lg font-bold text-navy-900 mb-5">
            All {cat.label} Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {remainingArticles.map((article) => (
              <ArticleCard
                key={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                href={article.href}
                category={cat.label}
                readingTime={article.readingTime}
                updatedAt={article.updatedAt}
              />
            ))}
          </div>
        </div>
      )}

      {/* 5. Related categories strip */}
      <div className="mb-10 bg-surface border border-border rounded-2xl px-6 py-8">
        <h2 className="text-sm font-semibold text-accent-slate uppercase tracking-wider mb-5">
          Explore Other Topics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {otherCategories.map((other) => {
            const otherMeta = CATEGORY_META[other.slug] ?? DEFAULT_META;
            return (
              <CategoryCard
                key={other.slug}
                title={other.label}
                description={other.description}
                href={`/${other.slug}`}
                Icon={otherMeta.Icon}
                iconBg={otherMeta.iconBg}
                iconColor={otherMeta.iconColor}
              />
            );
          })}
        </div>
      </div>

      {/* 6. Legal disclaimer strip */}
      <div className="border-t border-border pt-8">
        <ArticleDisclaimer />
      </div>
    </div>
  );
}

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { getCategoryBySlug } from "./categories";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface ArticleFrontmatter {
  title: string;
  seoTitle: string;
  metaDescription: string;
  slug: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  publishedAt: string;
  updatedAt?: string;
  excerpt: string;
  schema: "Article" | "FAQPage";
  featured?: boolean;
}

export interface Article extends ArticleFrontmatter {
  category: string;
  categoryLabel: string;
  content: string;
  readingTime: string;
  href: string;
}

export function getAllArticles(): Article[] {
  const articles: Article[] = [];

  if (!fs.existsSync(CONTENT_DIR)) return articles;

  const categories = fs.readdirSync(CONTENT_DIR);
  for (const category of categories) {
    const categoryDir = path.join(CONTENT_DIR, category);
    if (!fs.statSync(categoryDir).isDirectory()) continue;

    const files = fs
      .readdirSync(categoryDir)
      .filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const raw = fs.readFileSync(path.join(categoryDir, file), "utf-8");
      const { data, content } = matter(raw);
      const rt = readingTime(content);

      articles.push({
        ...(data as ArticleFrontmatter),
        category,
        categoryLabel: getCategoryBySlug(category)?.label ?? category,
        content,
        readingTime: rt.text,
        href: `/${category}/${data.slug}`,
      });
    }
  }

  return articles.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getArticle(
  category: string,
  slug: string
): Article | undefined {
  return getAllArticles().find(
    (a) => a.category === category && a.slug === slug
  );
}

export function getFeaturedArticles(limit = 6): Article[] {
  const all = getAllArticles();
  const featured = all.filter((a) => a.featured);
  return featured.length >= limit ? featured.slice(0, limit) : all.slice(0, limit);
}

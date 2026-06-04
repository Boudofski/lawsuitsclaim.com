import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";
import { CATEGORIES } from "@/lib/categories";

const BASE = "https://lawsuitsclaim.com";

const staticPages = [
  "",
  "/about",
  "/contact",
  "/editorial-policy",
  "/legal-disclaimer",
  "/privacy-policy",
  "/terms-of-use",
  "/cookie-policy",
  "/resources",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  const staticEntries = staticPages.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1.0 : 0.7,
  }));

  const categoryEntries = CATEGORIES.map((cat) => ({
    url: `${BASE}/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const articleEntries = articles.map((article) => ({
    url: `${BASE}/${article.category}/${article.slug}`,
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: article.featured ? 0.9 : 0.7,
  }));

  return [...staticEntries, ...categoryEntries, ...articleEntries];
}

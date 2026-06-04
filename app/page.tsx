import Link from "next/link";
import {
  Users,
  FileText,
  HeartHandshake,
  Shield,
  ShoppingBag,
  AlertTriangle,
  BookOpen,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import ArticleCard from "./_components/ArticleCard";
import CategoryCard from "./_components/CategoryCard";
import NewsletterSignup from "./_components/NewsletterSignup";
import SchemaOrg from "./_components/SchemaOrg";
import { getFeaturedArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "LawsuitsClaim — Legal Claims Explained Clearly",
  description:
    "Plain-English guides to lawsuits, settlements, injury claims, insurance disputes, consumer protection, and claim notices. For U.S. readers.",
  alternates: { canonical: "https://lawsuitsclaim.com" },
};

interface CategoryEntry {
  title: string;
  description: string;
  href: string;
  Icon: LucideIcon;
}

const categories: CategoryEntry[] = [
  {
    title: "Class Actions",
    description:
      "How class action lawsuits work, settlement notices, deadlines, and payments.",
    href: "/class-actions",
    Icon: Users,
  },
  {
    title: "Personal Injury",
    description:
      "Claim evidence, demand letters, insurance adjusters, and settlement offers.",
    href: "/personal-injury",
    Icon: HeartHandshake,
  },
  {
    title: "Insurance Claims",
    description:
      "Denied claims, bad faith insurance, appeals, and policyholder rights.",
    href: "/insurance-claims",
    Icon: Shield,
  },
  {
    title: "Consumer Protection",
    description:
      "Credit errors, debt collectors, refund disputes, and data breach lawsuits.",
    href: "/consumer-protection",
    Icon: ShoppingBag,
  },
  {
    title: "Scam Check Center",
    description:
      "Spot fake settlement emails, verify claim sites, avoid legal notice fraud.",
    href: "/scam-check",
    Icon: AlertTriangle,
  },
  {
    title: "Legal Basics",
    description:
      "Plain-English explanations of legal terms, courts, and common legal processes.",
    href: "/legal-basics",
    Icon: BookOpen,
  },
];

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "LawsuitsClaim",
  url: "https://lawsuitsclaim.com",
  description:
    "Plain-English guides to lawsuits, settlements, and legal claims.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://lawsuitsclaim.com/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LawsuitsClaim",
  url: "https://lawsuitsclaim.com",
  sameAs: [],
};

export default async function HomePage() {
  const featuredArticles = getFeaturedArticles(6);

  return (
    <>
      <SchemaOrg schema={websiteSchema} />
      <SchemaOrg schema={orgSchema} />

      {/* Hero */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-brand-blue bg-blue-50 px-3 py-1 rounded-full mb-6">
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              Independent Legal Information Publisher
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 leading-tight mb-6">
              Legal Claims Explained Clearly
            </h1>
            <p className="text-lg text-accent-slate leading-relaxed mb-8 max-w-2xl">
              Plain-English guides to lawsuits, settlements, injury claims,
              insurance disputes, consumer protection, and claim notices. We
              explain your options — we are not a law firm and do not offer
              legal advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/class-actions"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue text-white font-medium rounded-lg hover:bg-navy-800 transition-colors"
              >
                Explore Claim Guides <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/class-actions/what-is-a-class-action-lawsuit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-navy-900 font-medium rounded-lg hover:bg-surface transition-colors"
              >
                Class Action Basics
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-navy-900">Browse by Topic</h2>
          <p className="text-accent-slate text-sm mt-1">
            Select a category to find guides relevant to your situation.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.href} {...cat} />
          ))}
        </div>
      </section>

      {/* Featured Guides */}
      {featuredArticles.length > 0 && (
        <section className="bg-white border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl font-bold text-navy-900">
                Featured Guides
              </h2>
              <Link
                href="/class-actions"
                className="text-sm text-brand-blue hover:text-navy-800 font-medium flex items-center gap-1"
              >
                All guides <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  href={article.href}
                  category={article.categoryLabel}
                  readingTime={article.readingTime}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Scam Check CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="p-3 bg-yellow-100 rounded-xl shrink-0">
            <AlertTriangle
              className="h-8 w-8 text-yellow-600"
              aria-hidden="true"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-navy-900 mb-2">
              Received a Settlement Notice or Legal Email?
            </h2>
            <p className="text-sm text-accent-slate leading-relaxed">
              Settlement scams are common. Before you submit personal
              information or pay any fee, verify the notice is legitimate. Our
              Scam Check Center explains what to look for.
            </p>
          </div>
          <Link
            href="/scam-check"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
          >
            Scam Check Center <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <NewsletterSignup />
      </section>

      {/* Site Disclaimer */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-xs text-accent-slate leading-relaxed max-w-4xl">
            <strong>General Disclaimer:</strong> LawsuitsClaim.com is an
            independent legal information publisher. All content on this site is
            for general informational purposes only and does not constitute legal
            advice. We are not a law firm. We do not represent clients. We do
            not guarantee claim eligibility, settlement amounts, or case
            outcomes. Laws vary by state and jurisdiction. If you have a legal
            matter, consult a licensed attorney in your jurisdiction.
          </p>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import {
  Users,
  HeartHandshake,
  Shield,
  ShoppingBag,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  BookOpen,
  RefreshCw,
  SearchCheck,
  MessageSquareOff,
  FileText,
  XCircle,
  Clock,
  Unlink,
} from "lucide-react";
import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import ArticleCard from "./_components/ArticleCard";
import CategoryCard from "./_components/CategoryCard";
import LearnMoreSection from "./_components/LearnMoreSection";
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
  iconBg: string;
  iconColor: string;
}

const categories: CategoryEntry[] = [
  {
    title: "Class Actions",
    description:
      "Settlement notices, claim forms, deadlines, payment timelines, and class action basics.",
    href: "/class-actions",
    Icon: Users,
    iconBg: "bg-blue-50",
    iconColor: "text-brand-blue",
  },
  {
    title: "Personal Injury",
    description:
      "Evidence, demand letters, insurance adjusters, medical records, and settlement basics.",
    href: "/personal-injury",
    Icon: HeartHandshake,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
  },
  {
    title: "Insurance Claims",
    description:
      "Denied claims, adjuster reviews, appeals, policyholder rights, and claim documentation.",
    href: "/insurance-claims",
    Icon: Shield,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    title: "Consumer Protection",
    description:
      "Credit errors, debt collectors, refunds, hidden fees, subscriptions, and data breach issues.",
    href: "/consumer-protection",
    Icon: ShoppingBag,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "Scam Check",
    description:
      "Fake settlement emails, suspicious claim sites, legal notice fraud, and payment red flags.",
    href: "/scam-check",
    Icon: AlertTriangle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
];

const trustChecklist = [
  "Verify the official settlement website",
  "Check deadlines and eligibility rules",
  "Never pay a fee to receive a settlement",
  "Laws vary by jurisdiction",
];

const trustPills = [
  "Independent publisher",
  "Plain-English guides",
  "Source-based research",
  "No compensation promises",
];

const editorialCards = [
  {
    Icon: BookOpen,
    title: "Plain-English Explanations",
    text: "We break down legal claim topics into clear, practical guides without unnecessary legal jargon.",
    bg: "bg-blue-50",
    color: "text-brand-blue",
  },
  {
    Icon: SearchCheck,
    title: "Source-Based Research",
    text: "We prefer official sources such as court documents, settlement administrators, government agencies, and reputable legal resources.",
    bg: "bg-indigo-50",
    color: "text-indigo-600",
  },
  {
    Icon: RefreshCw,
    title: "Regular Content Updates",
    text: "We update guides when important claim details, deadlines, settlement information, or legal processes change.",
    bg: "bg-emerald-50",
    color: "text-emerald-600",
  },
  {
    Icon: MessageSquareOff,
    title: "No Legal Advice or Compensation Promises",
    text: "We provide general legal information only. We do not give legal advice, guarantee results, or promise settlement payments.",
    bg: "bg-slate-100",
    color: "text-accent-slate",
  },
];

const scamRedFlags = [
  { Icon: XCircle, text: "Requests for upfront payment" },
  { Icon: Unlink, text: "Suspicious shortened links" },
  { Icon: Clock, text: "Pressure to act immediately" },
];

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "LawsuitsClaim",
  url: "https://lawsuitsclaim.com",
  description: "Plain-English guides to lawsuits, settlements, and legal claims.",
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LawsuitsClaim",
  url: "https://lawsuitsclaim.com",
  sameAs: [],
};

export default async function HomePage() {
  const featured = getFeaturedArticles(6);
  const [heroArticle, ...supportingArticles] = featured;
  const topSupporting = supportingArticles.slice(0, 2);
  const gridArticles = supportingArticles.slice(2);

  return (
    <>
      <SchemaOrg schema={websiteSchema} />
      <SchemaOrg schema={orgSchema} />

      {/* ── Hero ── */}
      <section className="bg-warm-paper border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-14">

            {/* Left: headline + CTAs */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-brand-blue bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full mb-6">
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                Independent Legal Information Publisher
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-navy-900 leading-tight mb-5">
                Legal Claims Explained Clearly
              </h1>
              <p className="text-lg text-accent-slate leading-relaxed mb-8 max-w-xl">
                Plain-English guides to lawsuits, settlements, injury claims,
                insurance disputes, consumer protection, and claim notices —
                written for general information, not legal advice.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/class-actions"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy-900 text-white font-medium rounded-lg hover:bg-navy-800 transition-colors text-sm"
                >
                  Explore Claim Guides <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/scam-check"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-navy-900 font-medium rounded-lg hover:bg-surface transition-colors text-sm"
                >
                  Scam Check Center
                </Link>
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-2">
                {trustPills.map((pill) => (
                  <span
                    key={pill}
                    className="inline-flex items-center gap-1.5 text-xs text-accent-slate bg-white border border-border rounded-full px-3 py-1.5"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 shrink-0" aria-hidden="true" />
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: trust card */}
            <div className="w-full lg:w-72 xl:w-80 shrink-0">
              <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
                <p className="text-xs font-semibold text-accent-slate uppercase tracking-wider mb-4">
                  Before You Submit a Claim
                </p>
                <ul className="space-y-3">
                  {trustChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle
                        className="h-4 w-4 text-brand-blue shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-navy-800 leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 pt-4 border-t border-border">
                  <p className="text-xs text-accent-slate leading-relaxed">
                    LawsuitsClaim.com is an independent legal information
                    publisher. We are not a law firm.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Browse by Topic ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-navy-900">Browse by Topic</h2>
          <p className="text-accent-slate text-sm mt-1.5">
            Select a category to find guides relevant to your situation.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.href} {...cat} />
          ))}
        </div>
      </section>

      {/* ── Featured Guides ── */}
      {featured.length > 0 && (
        <section className="bg-white border-y border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-navy-900">
                  Start Here: Essential Legal Claim Guides
                </h2>
                <p className="text-accent-slate text-sm mt-1.5">
                  Foundational guides for understanding common legal claim situations.
                </p>
              </div>
              <Link
                href="/class-actions"
                className="shrink-0 text-sm text-brand-blue hover:text-navy-800 font-medium flex items-center gap-1 ml-4"
              >
                All guides <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            {/* Asymmetric top row: 1 large + 2 small */}
            {heroArticle && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                <ArticleCard
                  key={heroArticle.slug}
                  title={heroArticle.title}
                  excerpt={heroArticle.excerpt}
                  href={heroArticle.href}
                  category={heroArticle.categoryLabel}
                  readingTime={heroArticle.readingTime}
                  updatedAt={heroArticle.updatedAt}
                  featured
                  className="md:col-span-2"
                />
                <div className="flex flex-col gap-5">
                  {topSupporting.map((article) => (
                    <ArticleCard
                      key={article.slug}
                      title={article.title}
                      excerpt={article.excerpt}
                      href={article.href}
                      category={article.categoryLabel}
                      readingTime={article.readingTime}
                      updatedAt={article.updatedAt}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Remaining articles: 3-col grid */}
            {gridArticles.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {gridArticles.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    title={article.title}
                    excerpt={article.excerpt}
                    href={article.href}
                    category={article.categoryLabel}
                    readingTime={article.readingTime}
                    updatedAt={article.updatedAt}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Scam Check Warning ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-amber-bg border border-amber-border rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="p-3 bg-amber-100 rounded-xl shrink-0">
              <AlertTriangle className="h-7 w-7 text-amber-accent" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-navy-900 mb-2">
                Received a Settlement Notice or Legal Email?
              </h2>
              <p className="text-sm text-accent-slate leading-relaxed mb-5">
                Fake settlement websites and legal notice scams are common. Before
                submitting personal information or paying any fee, verify the notice,
                website, deadline, and administrator.
              </p>
              <div className="flex flex-wrap gap-3 mb-5">
                {scamRedFlags.map(({ Icon, text }) => (
                  <span
                    key={text}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-accent bg-white border border-amber-border rounded-full px-3 py-1.5"
                  >
                    <Icon className="h-3 w-3" aria-hidden="true" /> {text}
                  </span>
                ))}
              </div>
              <Link
                href="/scam-check"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy-900 text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
              >
                Visit Scam Check Center <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── How We Create Our Guides ── */}
      <section className="bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-navy-900">
              How We Create Our Guides
            </h2>
            <p className="text-accent-slate text-sm mt-1.5">
              Our editorial standards are designed to keep legal information clear,
              source-aware, and genuinely useful.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {editorialCards.map(({ Icon, title, text, bg, color }) => (
              <div
                key={title}
                className="bg-surface border border-border rounded-xl p-5 hover:shadow-sm transition-shadow"
              >
                <div className={`p-2.5 ${bg} rounded-xl w-fit mb-4`}>
                  <Icon className={`h-5 w-5 ${color}`} aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-navy-900 mb-2 text-sm leading-snug">
                  {title}
                </h3>
                <p className="text-sm text-accent-slate leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Learn More Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <LearnMoreSection />
      </section>

      {/* ── Site Disclaimer ── */}
      <section className="bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-sm text-navy-800 leading-relaxed max-w-4xl">
            <strong>General Disclaimer:</strong> LawsuitsClaim.com is an
            independent legal information publisher. All content on this site is
            for general informational purposes only and does not constitute legal
            advice. We are not a law firm. We do not represent clients. We do not
            guarantee claim eligibility, settlement amounts, or case outcomes.
            Laws vary by state and jurisdiction. If you have a legal matter,
            consult a licensed attorney in your jurisdiction.
          </p>
        </div>
      </section>
    </>
  );
}

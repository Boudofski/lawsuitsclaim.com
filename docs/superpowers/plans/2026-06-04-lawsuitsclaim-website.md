# LawsuitsClaim.com — Full Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready AdSense-ready legal information blog at LawsuitsClaim.com with 45 article stubs, full static pages, SEO infrastructure, and strategy documents.

**Architecture:** Next.js 16 App Router with file-system content (gray-matter markdown in `content/`), Tailwind CSS v4, no database. All articles are `.md` files with frontmatter; `lib/articles.ts` reads and parses them at build time. Route structure: `app/[category]/[slug]/page.tsx` for articles, flat routes for static pages.

**Tech Stack:** Next.js 16.2.7, React 19, Tailwind CSS v4, TypeScript, gray-matter, lucide-react, @tailwindcss/typography, tailwind-merge, clsx

---

## File Map

**New files to create:**
```
app/layout.tsx                          (modify — brand fonts, metadata)
app/globals.css                         (modify — design tokens)
app/page.tsx                            (replace — full homepage)
app/not-found.tsx                       (create)
app/sitemap.ts                          (create)
app/robots.ts                           (create)
app/opengraph-image.tsx                 (create)

app/_components/Header.tsx              (create)
app/_components/Footer.tsx              (create)
app/_components/ArticleDisclaimer.tsx   (create)
app/_components/CategoryCard.tsx        (create)
app/_components/ArticleCard.tsx         (create)
app/_components/NewsletterSignup.tsx    (create)
app/_components/SchemaOrg.tsx           (create)
app/_components/Breadcrumbs.tsx         (create)

app/(static)/about/page.tsx             (create)
app/(static)/contact/page.tsx           (create)
app/(static)/editorial-policy/page.tsx  (create)
app/(static)/legal-disclaimer/page.tsx  (create)
app/(static)/privacy-policy/page.tsx    (create)
app/(static)/terms-of-use/page.tsx      (create)
app/(static)/cookie-policy/page.tsx     (create)
app/(static)/layout.tsx                 (create — shared static page wrapper)

app/[category]/page.tsx                 (create — category index)
app/[category]/[slug]/page.tsx          (create — article page)
app/[category]/[slug]/opengraph-image.tsx (create)

lib/articles.ts                         (create — content reader)
lib/categories.ts                       (create — category metadata)
lib/cn.ts                               (create — clsx + twMerge helper)

content/class-actions/*.md              (10 articles)
content/settlements/*.md                (part of class actions)
content/scam-check/*.md                 (8 articles)
content/personal-injury/*.md            (10 articles)
content/insurance-claims/*.md           (8 articles)
content/consumer-protection/*.md        (9 articles)

docs/strategy/website-strategy.md      (create)
docs/strategy/article-briefs.md        (create)
docs/strategy/internal-linking-map.md  (create)
docs/strategy/publishing-calendar.md   (create)
docs/strategy/adsense-checklist.md     (create)
docs/strategy/article-prompt-template.md (create)
docs/strategy/seo-templates.md         (create)
docs/strategy/image-style-guide.md     (create)
docs/strategy/content-update-process.md (create)
```

---

## Task 1: Design Tokens and Global Styles

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update globals.css with brand design tokens**

```css
/* app/globals.css */
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --color-navy-950: #0a1628;
  --color-navy-900: #0f2044;
  --color-navy-800: #1a3060;
  --color-navy-700: #243d7a;
  --color-brand-blue: #1d4ed8;
  --color-brand-blue-light: #3b82f6;
  --color-accent-slate: #64748b;
  --color-surface: #f8fafc;
  --color-surface-card: #ffffff;
  --color-border: #e2e8f0;
  --color-warning-bg: #fefce8;
  --color-warning-border: #fbbf24;

  --font-sans: var(--font-inter);
  --font-serif: var(--font-source-serif);
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-surface);
  color: var(--color-navy-900);
}
```

- [ ] **Step 2: Update root layout with Inter font and site metadata**

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lawsuitsclaim.com"),
  title: {
    default: "LawsuitsClaim — Legal Claims Explained Clearly",
    template: "%s | LawsuitsClaim",
  },
  description:
    "Plain-English guides to lawsuits, settlements, injury claims, insurance disputes, consumer protection, and claim notices.",
  openGraph: {
    type: "website",
    siteName: "LawsuitsClaim",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://lawsuitsclaim.com" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <body className="min-h-screen flex flex-col bg-surface font-sans antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Create lib/cn.ts helper**

```ts
// lib/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Commit**
```bash
git add app/globals.css app/layout.tsx lib/cn.ts
git commit -m "feat: brand design tokens, root layout, cn helper"
```

---

## Task 2: Header and Footer Components

**Files:**
- Create: `app/_components/Header.tsx`
- Create: `app/_components/Footer.tsx`

- [ ] **Step 1: Create Header**

```tsx
// app/_components/Header.tsx
import Link from "next/link";
import { Scale, Menu } from "lucide-react";

const navLinks = [
  { label: "Class Actions", href: "/class-actions" },
  { label: "Settlements", href: "/settlements" },
  { label: "Personal Injury", href: "/personal-injury" },
  { label: "Insurance Claims", href: "/insurance-claims" },
  { label: "Consumer Protection", href: "/consumer-protection" },
  { label: "Scam Check", href: "/scam-check" },
];

export default function Header() {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Scale className="h-6 w-6 text-brand-blue" aria-hidden="true" />
            <span className="font-bold text-navy-900 text-lg tracking-tight">
              LawsuitsClaim
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-accent-slate hover:text-navy-900 hover:bg-surface rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/resources"
            className="hidden md:inline-flex items-center px-4 py-2 bg-brand-blue text-white text-sm font-medium rounded-md hover:bg-navy-800 transition-colors"
          >
            Resources
          </Link>
          <button className="md:hidden p-2 text-accent-slate" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Create Footer**

```tsx
// app/_components/Footer.tsx
import Link from "next/link";
import { Scale } from "lucide-react";

const footerLinks = {
  "Learn": [
    { label: "Class Actions", href: "/class-actions" },
    { label: "Settlements", href: "/settlements" },
    { label: "Personal Injury", href: "/personal-injury" },
    { label: "Insurance Claims", href: "/insurance-claims" },
    { label: "Consumer Protection", href: "/consumer-protection" },
    { label: "Scam Check Center", href: "/scam-check" },
  ],
  "Site": [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Editorial Policy", href: "/editorial-policy" },
    { label: "Resources", href: "/resources" },
  ],
  "Legal": [
    { label: "Legal Disclaimer", href: "/legal-disclaimer" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Scale className="h-5 w-5 text-brand-blue-light" aria-hidden="true" />
              <span className="font-bold text-white">LawsuitsClaim</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Plain-English guides to lawsuits, settlements, and legal claims.
              For general information only — not legal advice.
            </p>
          </div>
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                {section}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-navy-800 pt-6 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} LawsuitsClaim. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 max-w-lg">
            This website provides general legal information only and does not
            constitute legal advice. Laws vary by jurisdiction. Consult a
            licensed attorney for advice specific to your situation.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**
```bash
git add app/_components/Header.tsx app/_components/Footer.tsx
git commit -m "feat: header and footer components"
```

---

## Task 3: Shared UI Components

**Files:**
- Create: `app/_components/ArticleDisclaimer.tsx`
- Create: `app/_components/ArticleCard.tsx`
- Create: `app/_components/CategoryCard.tsx`
- Create: `app/_components/Breadcrumbs.tsx`
- Create: `app/_components/SchemaOrg.tsx`

- [ ] **Step 1: Create ArticleDisclaimer**

```tsx
// app/_components/ArticleDisclaimer.tsx
import { Info } from "lucide-react";

export default function ArticleDisclaimer() {
  return (
    <div className="flex gap-3 p-4 bg-warning-bg border border-warning-border rounded-lg text-sm text-navy-800">
      <Info className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" aria-hidden="true" />
      <p>
        <strong>Informational purposes only.</strong> This article is for general
        informational purposes only and is not legal advice. Laws vary by
        jurisdiction. If you need advice about your specific situation, consider
        speaking with a licensed attorney.
      </p>
    </div>
  );
}
```

- [ ] **Step 2: Create ArticleCard**

```tsx
// app/_components/ArticleCard.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  href: string;
  category: string;
  readingTime?: string;
  className?: string;
}

export default function ArticleCard({
  title,
  excerpt,
  href,
  category,
  readingTime,
  className,
}: ArticleCardProps) {
  return (
    <article
      className={cn(
        "bg-white border border-border rounded-xl p-6 hover:shadow-md transition-shadow group",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium text-brand-blue bg-blue-50 px-2 py-1 rounded-full">
          {category}
        </span>
        {readingTime && (
          <span className="text-xs text-accent-slate">{readingTime} read</span>
        )}
      </div>
      <h3 className="font-semibold text-navy-900 leading-snug mb-2 group-hover:text-brand-blue transition-colors">
        <Link href={href}>{title}</Link>
      </h3>
      <p className="text-sm text-accent-slate leading-relaxed line-clamp-2 mb-4">
        {excerpt}
      </p>
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-sm font-medium text-brand-blue hover:text-navy-800 transition-colors"
        aria-label={`Read: ${title}`}
      >
        Read guide <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </article>
  );
}
```

- [ ] **Step 3: Create CategoryCard**

```tsx
// app/_components/CategoryCard.tsx
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
  Icon: LucideIcon;
  articleCount?: number;
}

export default function CategoryCard({
  title,
  description,
  href,
  Icon,
  articleCount,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-3 bg-white border border-border rounded-xl p-6 hover:shadow-md hover:border-brand-blue/30 transition-all group"
    >
      <div className="flex items-start justify-between">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="h-5 w-5 text-brand-blue" aria-hidden="true" />
        </div>
        {articleCount !== undefined && (
          <span className="text-xs text-accent-slate">{articleCount} guides</span>
        )}
      </div>
      <div>
        <h3 className="font-semibold text-navy-900 group-hover:text-brand-blue transition-colors mb-1">
          {title}
        </h3>
        <p className="text-sm text-accent-slate leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}
```

- [ ] **Step 4: Create Breadcrumbs**

```tsx
// app/_components/Breadcrumbs.tsx
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-accent-slate flex-wrap">
      {all.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-border" aria-hidden="true" />}
          {item.href && i < all.length - 1 ? (
            <Link href={item.href} className="hover:text-navy-900 transition-colors">
              {i === 0 ? <Home className="h-3.5 w-3.5" aria-label="Home" /> : item.label}
            </Link>
          ) : (
            <span className="text-navy-900 font-medium truncate max-w-[200px]" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
```

- [ ] **Step 5: Create SchemaOrg**

```tsx
// app/_components/SchemaOrg.tsx
interface SchemaOrgProps {
  schema: Record<string, unknown>;
}

export default function SchemaOrg({ schema }: SchemaOrgProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

- [ ] **Step 6: Commit**
```bash
git add app/_components/
git commit -m "feat: shared UI components (disclaimer, cards, breadcrumbs, schema)"
```

---

## Task 4: Content Infrastructure

**Files:**
- Create: `lib/categories.ts`
- Create: `lib/articles.ts`

- [ ] **Step 1: Create lib/categories.ts**

```ts
// lib/categories.ts
export interface Category {
  slug: string;
  label: string;
  title: string;
  description: string;
  metaDescription: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "class-actions",
    label: "Class Actions",
    title: "Class Action Lawsuit Guides",
    description:
      "Plain-English explanations of class action lawsuits, settlement notices, claim deadlines, and how settlement payments work.",
    metaDescription:
      "Understand class action lawsuits and settlements with plain-English guides covering notices, deadlines, claim forms, and how payments work.",
  },
  {
    slug: "settlements",
    label: "Settlements",
    title: "Settlement Guides",
    description:
      "How legal settlements work, what to expect from the settlement process, and how to evaluate settlement offers.",
    metaDescription:
      "Learn how legal settlements work, how payments are calculated, and what happens after you accept or reject a settlement offer.",
  },
  {
    slug: "personal-injury",
    label: "Personal Injury",
    title: "Personal Injury Claim Guides",
    description:
      "Educational guides on personal injury claims, demand letters, insurance adjusters, medical records, and settlement negotiations.",
    metaDescription:
      "Plain-English guides to personal injury claims — evidence, demand letters, insurance adjusters, medical records, and what to expect.",
  },
  {
    slug: "insurance-claims",
    label: "Insurance Claims",
    title: "Insurance Claim Guides",
    description:
      "What to do when an insurance claim is denied, how appeals work, bad faith insurance practices, and your rights as a policyholder.",
    metaDescription:
      "Understand insurance claim denials, appeals, bad faith practices, and your rights as a policyholder — explained in plain English.",
  },
  {
    slug: "consumer-protection",
    label: "Consumer Protection",
    title: "Consumer Protection Guides",
    description:
      "Your rights as a consumer — credit report errors, debt collection, refund disputes, data breach lawsuits, and product recalls.",
    metaDescription:
      "Know your consumer rights — guides on credit errors, debt collectors, refund disputes, data breaches, and product recalls.",
  },
  {
    slug: "scam-check",
    label: "Scam Check",
    title: "Settlement Scam Check Center",
    description:
      "How to spot fake settlement emails, verify claim websites, identify scam settlement checks, and protect yourself from legal notice fraud.",
    metaDescription:
      "Protect yourself from settlement scams — learn to spot fake claim emails, verify settlement websites, and identify common legal fraud tactics.",
  },
  {
    slug: "legal-basics",
    label: "Legal Basics",
    title: "Legal Basics Explained",
    description:
      "Foundational explanations of legal terms, court processes, and common legal concepts in plain English.",
    metaDescription:
      "Simple explanations of legal terms and concepts — written for people who need to understand the law without a law degree.",
  },
  {
    slug: "resources",
    label: "Resources",
    title: "Legal Claim Resources",
    description:
      "Links to official settlement administrators, government consumer complaint portals, court resources, and legal aid organizations.",
    metaDescription:
      "Official resources for legal claims — settlement administrators, government complaint portals, court resources, and legal aid.",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
```

- [ ] **Step 2: Create lib/articles.ts**

```ts
// lib/articles.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface ArticleFrontmatter {
  title: string;
  seoTitle: string;
  metaDescription: string;
  slug: string;
  category: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  publishedAt: string;
  updatedAt?: string;
  excerpt: string;
  schema: "Article" | "FAQPage";
  featured?: boolean;
}

export interface Article extends ArticleFrontmatter {
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

    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith(".md"));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(categoryDir, file), "utf-8");
      const { data, content } = matter(raw);
      const rt = readingTime(content);

      articles.push({
        ...(data as ArticleFrontmatter),
        category,
        content,
        readingTime: rt.text,
        href: `/${category}/${data.slug}`,
      });
    }
  }

  return articles.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getArticle(category: string, slug: string): Article | undefined {
  return getAllArticles().find(
    (a) => a.category === category && a.slug === slug
  );
}

export function getFeaturedArticles(limit = 6): Article[] {
  const all = getAllArticles();
  const featured = all.filter((a) => a.featured);
  return featured.length >= limit ? featured.slice(0, limit) : all.slice(0, limit);
}
```

- [ ] **Step 3: Commit**
```bash
git add lib/categories.ts lib/articles.ts
git commit -m "feat: content infrastructure — category registry and article reader"
```

---

## Task 5: Homepage

**Files:**
- Modify: `app/page.tsx`
- Create: `app/_components/NewsletterSignup.tsx`

- [ ] **Step 1: Create NewsletterSignup component**

```tsx
// app/_components/NewsletterSignup.tsx
import { Mail } from "lucide-react";

export default function NewsletterSignup() {
  return (
    <section className="bg-navy-900 rounded-2xl p-8 md:p-12 text-center">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-brand-blue/20 rounded-full">
            <Mail className="h-6 w-6 text-brand-blue-light" aria-hidden="true" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Stay Informed — Not Overwhelmed
        </h2>
        <p className="text-slate-400 mb-6 text-sm leading-relaxed">
          Get plain-English legal claim explainers and settlement updates. No
          spam. No legal advice. Unsubscribe anytime.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-2.5 rounded-lg bg-navy-800 border border-navy-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
            required
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-brand-blue text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-3">
          This is an informational newsletter. We do not provide legal advice.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace app/page.tsx with full homepage**

```tsx
// app/page.tsx
import Link from "next/link";
import {
  Users, FileText, HeartHandshake, Shield, ShoppingBag,
  AlertTriangle, BookOpen, ExternalLink, ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";
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

const categories = [
  {
    title: "Class Actions",
    description: "How class action lawsuits work, settlement notices, deadlines, and payments.",
    href: "/class-actions",
    Icon: Users,
  },
  {
    title: "Personal Injury",
    description: "Claim evidence, demand letters, insurance adjusters, and settlement offers.",
    href: "/personal-injury",
    Icon: HeartHandshake,
  },
  {
    title: "Insurance Claims",
    description: "Denied claims, bad faith insurance, appeals, and policyholder rights.",
    href: "/insurance-claims",
    Icon: Shield,
  },
  {
    title: "Consumer Protection",
    description: "Credit errors, debt collectors, refund disputes, and data breach lawsuits.",
    href: "/consumer-protection",
    Icon: ShoppingBag,
  },
  {
    title: "Scam Check Center",
    description: "Spot fake settlement emails, verify claim sites, avoid legal notice fraud.",
    href: "/scam-check",
    Icon: AlertTriangle,
  },
  {
    title: "Legal Basics",
    description: "Plain-English explanations of legal terms, courts, and common legal processes.",
    href: "/legal-basics",
    Icon: BookOpen,
  },
];

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "LawsuitsClaim",
  url: "https://lawsuitsclaim.com",
  description: "Plain-English guides to lawsuits, settlements, and legal claims.",
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
  logo: "https://lawsuitsclaim.com/logo.png",
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
                href="/class-actions/what-is-a-class-action-settlement"
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
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-navy-900">Browse by Topic</h2>
            <p className="text-accent-slate text-sm mt-1">
              Select a category to find guides relevant to your situation.
            </p>
          </div>
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
              <h2 className="text-2xl font-bold text-navy-900">Featured Guides</h2>
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
                  category={article.label ?? article.category}
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
            <AlertTriangle className="h-8 w-8 text-yellow-600" aria-hidden="true" />
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
            <strong>General Disclaimer:</strong> LawsuitsClaim.com is an independent
            legal information publisher. All content on this site is for general
            informational purposes only and does not constitute legal advice. We
            are not a law firm. We do not represent clients. We do not guarantee
            claim eligibility, settlement amounts, or case outcomes. Laws vary by
            state and jurisdiction. If you have a legal matter, consult a licensed
            attorney in your jurisdiction.
          </p>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Commit**
```bash
git add app/page.tsx app/_components/NewsletterSignup.tsx
git commit -m "feat: homepage with hero, categories, featured guides, newsletter, disclaimer"
```

---

## Task 6: Category Index Pages

**Files:**
- Create: `app/[category]/page.tsx`

- [ ] **Step 1: Create dynamic category page**

```tsx
// app/[category]/page.tsx
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
```

- [ ] **Step 2: Commit**
```bash
git add app/[category]/page.tsx
git commit -m "feat: dynamic category index page"
```

---

## Task 7: Article Page

**Files:**
- Create: `app/[category]/[slug]/page.tsx`
- Create: `app/[category]/[slug]/opengraph-image.tsx`

- [ ] **Step 1: Create article page**

```tsx
// app/[category]/[slug]/page.tsx
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
      { "@type": "ListItem", position: 1, name: "Home", item: "https://lawsuitsclaim.com" },
      { "@type": "ListItem", position: 2, name: cat?.label ?? category, item: `https://lawsuitsclaim.com/${category}` },
      { "@type": "ListItem", position: 3, name: article.title, item: `https://lawsuitsclaim.com/${category}/${slug}` },
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
          <div className="flex items-center gap-3 mb-4 text-sm text-accent-slate">
            <span className="font-medium text-brand-blue">{cat?.label}</span>
            <span>·</span>
            <span>{article.readingTime}</span>
            {article.updatedAt && (
              <>
                <span>·</span>
                <span>Updated {new Date(article.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-navy-900 leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-accent-slate leading-relaxed">{article.excerpt}</p>
        </header>

        <ArticleDisclaimer />

        <div
          className="prose prose-navy max-w-none mt-8
            prose-headings:font-bold prose-headings:text-navy-900
            prose-p:text-navy-800 prose-p:leading-relaxed
            prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline
            prose-strong:text-navy-900
            prose-blockquote:border-l-brand-blue prose-blockquote:text-accent-slate
            prose-ul:text-navy-800 prose-ol:text-navy-800
            prose-hr:border-border"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="mt-12 pt-8 border-t border-border">
          <ArticleDisclaimer />
        </div>
      </div>
    </>
  );
}
```

**Note:** The article content is raw markdown. For now it renders as HTML using `dangerouslySetInnerHTML`. In a follow-up, replace with a proper markdown-to-HTML step in `lib/articles.ts` using a safe parser like `remark`/`rehype`. For launch, stub articles contain pre-formatted HTML-safe content.

- [ ] **Step 2: Create OG image for articles**

```tsx
// app/[category]/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { getArticle } from "@/lib/articles";
import { getCategoryBySlug } from "@/lib/categories";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  const cat = getCategoryBySlug(category);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f2044",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 16,
            color: "#93c5fd",
            marginBottom: 16,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {cat?.label ?? category} · LawsuitsClaim.com
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.2,
            maxWidth: 900,
          }}
        >
          {article?.title ?? "Legal Claims Explained Clearly"}
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#94a3b8",
            marginTop: 20,
          }}
        >
          Plain-English legal information · Not legal advice
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

- [ ] **Step 3: Commit**
```bash
git add "app/[category]/[slug]/"
git commit -m "feat: article page with schema, OG image, breadcrumbs"
```

---

## Task 8: SEO Infrastructure

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`
- Create: `app/not-found.tsx`

- [ ] **Step 1: Create sitemap.ts**

```ts
// app/sitemap.ts
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
```

- [ ] **Step 2: Create robots.ts**

```ts
// app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: "https://lawsuitsclaim.com/sitemap.xml",
  };
}
```

- [ ] **Step 3: Create not-found.tsx**

```tsx
// app/not-found.tsx
import Link from "next/link";
import { FileSearch } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <FileSearch className="h-12 w-12 text-accent-slate mx-auto mb-6" aria-hidden="true" />
      <h1 className="text-3xl font-bold text-navy-900 mb-3">Page Not Found</h1>
      <p className="text-accent-slate mb-8">
        The guide or page you are looking for does not exist or may have moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-5 py-2.5 bg-brand-blue text-white rounded-lg font-medium hover:bg-navy-800 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
```

- [ ] **Step 4: Commit**
```bash
git add app/sitemap.ts app/robots.ts app/not-found.tsx
git commit -m "feat: sitemap, robots.txt, 404 page"
```

---

## Task 9: Static Pages — Legal and About

**Files:**
- Create: `app/(static)/layout.tsx`
- Create: `app/(static)/about/page.tsx`
- Create: `app/(static)/legal-disclaimer/page.tsx`
- Create: `app/(static)/editorial-policy/page.tsx`

- [ ] **Step 1: Create static layout wrapper**

```tsx
// app/(static)/layout.tsx
export default function StaticLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-navy max-w-none
        prose-headings:text-navy-900 prose-headings:font-bold
        prose-p:text-navy-800 prose-p:leading-relaxed
        prose-a:text-brand-blue prose-li:text-navy-800
        prose-strong:text-navy-900">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create About page**

```tsx
// app/(static)/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About LawsuitsClaim",
  description:
    "LawsuitsClaim is an independent legal information publisher providing plain-English guides to lawsuits, settlements, and legal claims.",
  alternates: { canonical: "https://lawsuitsclaim.com/about" },
};

export default function AboutPage() {
  return (
    <article>
      <h1>About LawsuitsClaim</h1>

      <p>
        <strong>LawsuitsClaim.com</strong> is an independent legal information
        publisher. We explain lawsuits, class action settlements, personal injury
        claims, insurance disputes, and consumer protection topics in plain
        English — for everyday U.S. readers who need to understand the process
        before deciding what to do next.
      </p>

      <h2>What We Do</h2>
      <p>
        We publish educational guides, explainers, and FAQs about legal claims
        and the U.S. legal system. Our goal is to help people understand their
        options, recognize scams, and ask better questions when they do speak
        with a lawyer.
      </p>

      <h2>What We Are Not</h2>
      <ul>
        <li>We are <strong>not a law firm</strong>.</li>
        <li>We do <strong>not offer legal advice</strong>.</li>
        <li>We do <strong>not represent clients</strong>.</li>
        <li>We do <strong>not guarantee settlement eligibility, amounts, or outcomes</strong>.</li>
        <li>We do <strong>not collect sensitive legal case details</strong>.</li>
      </ul>
      <p>
        If you have a legal matter that requires professional guidance, please
        consult a licensed attorney in your jurisdiction.
      </p>

      <h2>Our Editorial Standards</h2>
      <p>
        We use official sources where possible — including court documents,
        settlement administrator notices, government agency pages, and
        established legal publications. We do not publish claims we cannot
        support with a credible source. We update guides when deadlines or legal
        details change. See our{" "}
        <a href="/editorial-policy">Editorial Policy</a> for full details.
      </p>

      <h2>Who Writes Our Content</h2>
      <p>
        Our content is written and reviewed by legal writers who specialize in
        translating complex legal processes into clear, accessible language. We
        do not invent or exaggerate attorney credentials. We do not list fake
        bar memberships, awards, or legal credentials.
      </p>

      <h2>Contact Us</h2>
      <p>
        For corrections, feedback, or general inquiries, visit our{" "}
        <a href="/contact">Contact page</a>.
      </p>
    </article>
  );
}
```

- [ ] **Step 3: Create Legal Disclaimer page**

```tsx
// app/(static)/legal-disclaimer/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Disclaimer",
  description: "Important legal disclaimer for LawsuitsClaim.com — this site provides general information only, not legal advice.",
  alternates: { canonical: "https://lawsuitsclaim.com/legal-disclaimer" },
};

export default function LegalDisclaimerPage() {
  return (
    <article>
      <h1>Legal Disclaimer</h1>
      <p><em>Last updated: June 2026</em></p>

      <h2>General Information Only</h2>
      <p>
        All content published on LawsuitsClaim.com is for <strong>general
        informational purposes only</strong>. Nothing on this website constitutes
        legal advice, legal representation, or the formation of an
        attorney-client relationship.
      </p>

      <h2>Not a Law Firm</h2>
      <p>
        LawsuitsClaim.com is an independent legal information publisher. We are
        not a law firm. We do not employ attorneys to advise readers. We do not
        accept cases. We do not represent clients in any jurisdiction.
      </p>

      <h2>No Guarantee of Outcomes</h2>
      <p>
        We do not guarantee, promise, or imply any specific legal outcome,
        settlement amount, claim eligibility, or compensation. Every legal
        situation is different, and results depend on facts, jurisdiction, and
        many other factors that we cannot evaluate.
      </p>

      <h2>Jurisdiction Variance</h2>
      <p>
        Laws vary significantly by state and jurisdiction. Information that is
        accurate for one state may not apply to another. Always verify
        information against the laws applicable in your specific location.
      </p>

      <h2>No Endorsement</h2>
      <p>
        Links to external websites, settlement administrators, government
        agencies, or organizations do not constitute endorsement or verification
        of those organizations beyond what is stated in the relevant article.
      </p>

      <h2>Seek Legal Counsel</h2>
      <p>
        If you have a specific legal problem, question, or matter requiring
        advice, please consult a <strong>licensed attorney</strong> in your
        jurisdiction. Many state bar associations maintain referral services to
        help you find qualified legal help.
      </p>
    </article>
  );
}
```

- [ ] **Step 4: Create Editorial Policy page**

```tsx
// app/(static)/editorial-policy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "LawsuitsClaim editorial standards — how we research, write, source, and update our legal information guides.",
  alternates: { canonical: "https://lawsuitsclaim.com/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <article>
      <h1>Editorial Policy</h1>
      <p><em>Last updated: June 2026</em></p>

      <h2>Our Mission</h2>
      <p>
        LawsuitsClaim publishes accurate, balanced, and clearly written
        educational content about legal claims, settlements, and consumer rights.
        Our mission is to inform — not to advise, sensationalize, or sell.
      </p>

      <h2>Source Standards</h2>
      <ul>
        <li>We cite official sources where possible: court documents, settlement administrator notices, government agency pages (FTC, CFPB, state AG offices), and established legal publications.</li>
        <li>We do not publish claims about specific lawsuits or settlements without linking to or citing a verifiable source.</li>
        <li>We distinguish between confirmed facts and general explanations.</li>
      </ul>

      <h2>Content Accuracy</h2>
      <ul>
        <li>Each article is reviewed for factual accuracy before publication.</li>
        <li>We do not guarantee completeness. Legal topics are complex, and our guides provide a general overview — not comprehensive legal analysis.</li>
        <li>We do not copy or paraphrase settlement administrator websites without attribution.</li>
      </ul>

      <h2>Updates and Corrections</h2>
      <ul>
        <li>We update guides when legal deadlines, settlement details, or applicable law changes in a material way.</li>
        <li>Updated articles display a "Last updated" date.</li>
        <li>If you believe an article contains an error, please contact us via our <a href="/contact">Contact page</a>. We investigate and correct confirmed errors promptly.</li>
      </ul>

      <h2>Advertising and Sponsored Content</h2>
      <ul>
        <li>We clearly label any sponsored or paid content, if published.</li>
        <li>Advertising does not influence editorial decisions or article content.</li>
        <li>We do not sell legal services, referrals, or case intakes on this website.</li>
        <li>We do not accept payment to publish favorable coverage of any lawsuit, settlement, or legal organization.</li>
      </ul>

      <h2>What We Do Not Publish</h2>
      <ul>
        <li>Legal advice specific to any reader's situation.</li>
        <li>Claims that a reader qualifies for compensation unless quoting a verified eligibility rule from an official source.</li>
        <li>Content designed to create false urgency or fear about legal deadlines.</li>
        <li>Fake attorney credentials, invented bar memberships, or fabricated awards.</li>
        <li>Misleading "check your eligibility" forms that collect personal information without a clear and legitimate purpose.</li>
      </ul>
    </article>
  );
}
```

- [ ] **Step 5: Commit**
```bash
git add "app/(static)/"
git commit -m "feat: static pages — about, legal disclaimer, editorial policy"
```

---

## Task 10: Remaining Static Pages

**Files:**
- Create: `app/(static)/privacy-policy/page.tsx`
- Create: `app/(static)/terms-of-use/page.tsx`
- Create: `app/(static)/cookie-policy/page.tsx`
- Create: `app/(static)/contact/page.tsx`

- [ ] **Step 1: Privacy Policy**

```tsx
// app/(static)/privacy-policy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "LawsuitsClaim.com privacy policy — how we collect, use, and protect your information.",
  alternates: { canonical: "https://lawsuitsclaim.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <article>
      <h1>Privacy Policy</h1>
      <p><em>Last updated: June 2026</em></p>

      <h2>Information We Collect</h2>
      <p>
        We collect limited information when you visit LawsuitsClaim.com. This may include:
      </p>
      <ul>
        <li><strong>Usage data:</strong> pages visited, browser type, referring URL, and general geographic location (country/state level), collected via analytics tools.</li>
        <li><strong>Email address:</strong> if you voluntarily subscribe to our newsletter.</li>
        <li><strong>Contact form data:</strong> if you contact us using our contact form.</li>
      </ul>
      <p>We do <strong>not</strong> collect sensitive personal information such as Social Security numbers, case details, legal documents, or financial information.</p>

      <h2>How We Use Information</h2>
      <ul>
        <li>To understand how readers use the site and improve our content.</li>
        <li>To send newsletter subscribers plain-English legal information updates, if opted in.</li>
        <li>To respond to contact form submissions.</li>
      </ul>

      <h2>Cookies and Tracking</h2>
      <p>
        We use cookies for analytics and, if ads are displayed, for advertising purposes. See our <a href="/cookie-policy">Cookie Policy</a> for details. You can adjust cookie preferences in your browser settings.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We may use third-party tools such as Google Analytics and Google AdSense. These services have their own privacy policies governing their use of data. We do not sell your personal information to third parties.
      </p>

      <h2>Data Retention</h2>
      <p>Analytics data is retained per the policies of the analytics provider. Newsletter subscriber data is retained until you unsubscribe.</p>

      <h2>Your Rights</h2>
      <p>You may request access to, correction of, or deletion of personal data we hold about you by contacting us via our <a href="/contact">Contact page</a>.</p>

      <h2>Contact</h2>
      <p>For privacy-related questions, use our <a href="/contact">Contact page</a>.</p>
    </article>
  );
}
```

- [ ] **Step 2: Terms of Use**

```tsx
// app/(static)/terms-of-use/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for LawsuitsClaim.com — conditions governing your use of this website.",
  alternates: { canonical: "https://lawsuitsclaim.com/terms-of-use" },
};

export default function TermsOfUsePage() {
  return (
    <article>
      <h1>Terms of Use</h1>
      <p><em>Last updated: June 2026</em></p>

      <h2>Acceptance of Terms</h2>
      <p>By accessing LawsuitsClaim.com, you agree to these Terms of Use. If you do not agree, please do not use this site.</p>

      <h2>Informational Use Only</h2>
      <p>All content on LawsuitsClaim.com is for general informational purposes only. Nothing on this site constitutes legal advice. See our full <a href="/legal-disclaimer">Legal Disclaimer</a>.</p>

      <h2>Prohibited Uses</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Use the site for any unlawful purpose.</li>
        <li>Reproduce, republish, or redistribute content without permission.</li>
        <li>Attempt to gain unauthorized access to any part of the site.</li>
        <li>Use automated tools to scrape or copy content at scale.</li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>All original content on LawsuitsClaim.com is the property of LawsuitsClaim and may not be reproduced without attribution and written permission, except for brief quotations with a link to the original article.</p>

      <h2>Limitation of Liability</h2>
      <p>LawsuitsClaim.com is provided "as is." We make no warranty that content is complete, accurate, or up to date. We are not liable for any action you take based on content found on this site.</p>

      <h2>External Links</h2>
      <p>Links to external websites are provided for convenience. We do not endorse or control external sites and are not responsible for their content.</p>

      <h2>Changes to Terms</h2>
      <p>We may update these terms at any time. Continued use of the site after changes constitutes acceptance.</p>
    </article>
  );
}
```

- [ ] **Step 3: Cookie Policy**

```tsx
// app/(static)/cookie-policy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "LawsuitsClaim.com cookie policy — how cookies are used on this website.",
  alternates: { canonical: "https://lawsuitsclaim.com/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <article>
      <h1>Cookie Policy</h1>
      <p><em>Last updated: June 2026</em></p>

      <h2>What Are Cookies</h2>
      <p>Cookies are small text files stored on your device by your browser when you visit websites. They help websites remember information about your visit.</p>

      <h2>Cookies We Use</h2>
      <ul>
        <li><strong>Analytics cookies:</strong> We use Google Analytics to understand how visitors use the site (pages visited, time on site, referral source). This data is aggregated and anonymous.</li>
        <li><strong>Advertising cookies:</strong> If Google AdSense ads are displayed, Google may use cookies to serve relevant ads based on your browsing activity. You can opt out via Google's ad settings.</li>
      </ul>

      <h2>What We Do Not Use Cookies For</h2>
      <p>We do not use cookies to collect sensitive personal information, track your legal activities, or build individual profiles for sale to third parties.</p>

      <h2>Managing Cookies</h2>
      <p>You can control cookies through your browser settings. Disabling cookies may affect site functionality. For opt-out options for Google advertising cookies, visit <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>.</p>
    </article>
  );
}
```

- [ ] **Step 4: Contact page**

```tsx
// app/(static)/contact/page.tsx
import type { Metadata } from "next";
import { Mail, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact LawsuitsClaim",
  description: "Contact the LawsuitsClaim editorial team for corrections, feedback, or general inquiries.",
  alternates: { canonical: "https://lawsuitsclaim.com/contact" },
};

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>
        For corrections, content feedback, or general inquiries, use the form
        below or email us directly. We aim to respond to all messages within
        3 business days.
      </p>

      <div className="not-prose flex gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-navy-800 mb-8">
        <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" aria-hidden="true" />
        <p>
          <strong>We cannot provide legal advice.</strong> If you need help with
          a specific legal matter, please consult a licensed attorney in your
          state. We cannot evaluate your case or tell you whether you qualify for
          a settlement.
        </p>
      </div>

      <form className="not-prose space-y-5 max-w-lg" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-navy-900 mb-1">Name</label>
          <input id="name" type="text" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-navy-900 mb-1">Email</label>
          <input id="email" type="email" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" required />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-navy-900 mb-1">Subject</label>
          <select id="subject" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue">
            <option>Correction or factual error</option>
            <option>Content feedback</option>
            <option>General inquiry</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-navy-900 mb-1">Message</label>
          <textarea id="message" rows={5} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue resize-y" required />
        </div>
        <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-blue text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors">
          <Mail className="h-4 w-4" /> Send Message
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 5: Commit**
```bash
git add "app/(static)/privacy-policy/" "app/(static)/terms-of-use/" "app/(static)/cookie-policy/" "app/(static)/contact/"
git commit -m "feat: privacy policy, terms of use, cookie policy, contact pages"
```

---

## Task 11: Article Content — Class Actions (10 articles)

**Files:** `content/class-actions/*.md`

Each file uses this frontmatter schema:
```
---
title: ""
seoTitle: ""
metaDescription: ""
slug: ""
category: "class-actions"
primaryKeyword: ""
secondaryKeywords: []
publishedAt: "2026-06-04"
excerpt: ""
schema: "Article"
featured: true/false
---
```

- [ ] **Step 1: Create 10 class action article stubs**

```bash
mkdir -p /path/to/content/class-actions
```

Create `content/class-actions/what-is-a-class-action-lawsuit.md`:
```markdown
---
title: "What Is a Class Action Lawsuit? A Plain-English Guide"
seoTitle: "What Is a Class Action Lawsuit? Plain-English Guide"
metaDescription: "A class action lawsuit lets a group of people with similar claims sue together. Learn how class actions work, who can join, and what to expect from the process."
slug: "what-is-a-class-action-lawsuit"
category: "class-actions"
primaryKeyword: "what is a class action lawsuit"
secondaryKeywords: ["class action explained", "how class actions work", "class action definition"]
publishedAt: "2026-06-04"
excerpt: "A class action lawsuit allows many people with similar legal claims against the same defendant to sue as one group. Here is how the process works from filing to settlement."
schema: "Article"
featured: true
---

## Short Answer

A class action lawsuit is a type of legal case where a large group of people with similar injuries or claims against the same company or individual join together as a single lawsuit rather than filing separately.

## What Makes a Lawsuit a Class Action?

For a lawsuit to become a class action, a judge must first "certify" it — a formal decision that the case is appropriate to proceed as a group claim rather than individual cases. To certify a class, courts generally require:

- **Numerosity:** The group (called the "class") is large enough that individual lawsuits would be impractical.
- **Commonality:** The class members share common legal questions or facts.
- **Typicality:** The lead plaintiff's claims are typical of the broader class.
- **Adequacy:** The lead plaintiff and their attorneys can adequately represent the class.

## Who Is in a Class Action?

- **Lead plaintiff (class representative):** One or a few individuals who file the original case.
- **Class members:** Everyone else whose situation fits the defined class. Most class members are passive — they do not have to actively participate unless they receive a settlement notice.
- **Class counsel:** The attorneys who represent the entire class.

## How a Class Action Typically Proceeds

1. An individual files a lawsuit on behalf of themselves and others "similarly situated."
2. Attorneys file a motion to certify the class.
3. The court decides whether to certify.
4. If certified, class members receive notice (usually by mail or email).
5. The case proceeds toward settlement or trial.
6. If a settlement is reached, members receive notice of how to file a claim or opt out.
7. The court holds a "fairness hearing" to approve the settlement.
8. Payments are distributed after approval.

## Example Scenario

A company sells a product with a hidden defect. One customer sues. Their attorneys discover that hundreds of thousands of customers were affected by the same defect. They file a motion to certify a class action. If granted, all affected customers become class members and receive notice of the lawsuit and settlement.

## Common Mistakes

- **Assuming you must do something to be included.** In most class actions, you are automatically included if you fit the class definition unless you opt out.
- **Confusing the settlement notice with a scam.** Legitimate class action notices look official but are often dismissed as junk mail. Verify before discarding. See our [guide on verifying settlement websites](/scam-check/how-to-verify-a-class-action-settlement).
- **Missing the deadline.** Claim deadlines are strict. Missing them usually means forfeiting your right to payment.

## When to Contact a Lawyer

If you believe you have significant individual damages (beyond a small group payment), consider consulting an attorney before the opt-out deadline. Opting out allows you to pursue your own case.

## Sources to Verify

- Federal Rules of Civil Procedure, Rule 23 (governs class actions in federal court)
- U.S. Courts website: uscourts.gov
- FTC information on class action settlements: ftc.gov

## Frequently Asked Questions

**Do I have to file anything to be in a class action?**
Usually no. If you fit the class definition, you are automatically included. You may need to file a claim form to receive a settlement payment.

**Can I sue on my own if I am in a class action?**
You can opt out of the class and pursue your own lawsuit, but you must do so before the opt-out deadline stated in the notice.

**How long does a class action take?**
Most take one to three years, though complex cases can take longer.

**Do class action settlements pay a lot?**
Payments vary widely. Many class members receive modest amounts — sometimes a few dollars, sometimes hundreds. Large payouts typically go to the lead plaintiff and attorneys.

---

*This article is for general informational purposes only and is not legal advice. Laws vary by jurisdiction. Consult a licensed attorney for advice specific to your situation.*
```

Create `content/class-actions/what-is-a-class-action-settlement-notice.md`:
```markdown
---
title: "What Is a Class Action Settlement Notice?"
seoTitle: "What Is a Class Action Settlement Notice? What to Do Next"
metaDescription: "Received a class action settlement notice in the mail or email? Learn what it means, whether it is legitimate, and what your options are."
slug: "what-is-a-class-action-settlement-notice"
category: "class-actions"
primaryKeyword: "class action settlement notice"
secondaryKeywords: ["settlement notice in mail", "received class action notice", "class action notice what to do"]
publishedAt: "2026-06-04"
excerpt: "A class action settlement notice informs you that you may be a member of a settled lawsuit. Here is what the notice means, how to verify it is real, and what you can do."
schema: "Article"
featured: true
---

## Short Answer

A class action settlement notice is an official communication informing you that a lawsuit involving your situation has been settled and that you may be entitled to submit a claim, opt out, or object.

## Why Did You Receive This Notice?

You received a settlement notice because someone — a company, a data breach, a product you bought, or a service you used — was sued, and a class action settlement has been reached that may include you.

The notice is required by law. Courts require that all potential class members receive notice before a settlement is finalized.

## What a Legitimate Settlement Notice Contains

A genuine settlement notice will typically include:

- The name of the case and the court it is in
- A description of who qualifies as a class member
- The settlement amount
- What you must do to receive a payment (usually fill out a claim form)
- The deadline to submit a claim
- How to opt out if you want to pursue your own lawsuit
- How to object if you disagree with the settlement terms
- Contact information for the settlement administrator

## Your Three Options

**1. File a claim:** Submit the claim form by the deadline. This is the action required to receive a payment if one is available.

**2. Opt out:** Exclude yourself from the settlement. This preserves your right to sue the defendant independently. You receive no settlement payment.

**3. Object:** Tell the court you believe the settlement is unfair. You remain in the class but express disagreement. This is rare.

**Doing nothing:** If you do nothing, you remain in the class, receive no payment, and give up your right to sue.

## How to Verify the Notice Is Legitimate

Settlement scams that mimic official notices are common. Before submitting personal information:

- Search for the case name in Google along with the court name.
- Check official court records at PACER (pacer.gov) if you have the case number.
- Visit the settlement administrator's official website using the URL listed in the notice — type it manually, do not click suspicious links.
- See our full guide: [How to Verify a Class Action Settlement Before Submitting Information](/scam-check/how-to-verify-a-class-action-settlement).

## Common Mistakes

- **Throwing away the notice.** Many people mistake legitimate settlement notices for junk mail.
- **Missing the deadline.** Claim deadlines are strict and cannot usually be extended.
- **Paying a fee to file a claim.** Legitimate settlement claims do not require payment to submit.
- **Providing more information than asked.** Do not give bank account numbers, Social Security numbers, or legal case details unless the settlement administrator explicitly requires it and you have verified the site is legitimate.

## Sources to Verify

- PACER (federal court records): pacer.gov
- FTC settlement information: ftc.gov/enforcement/cases-proceedings
- State attorney general settlement pages

---

*This article is for general informational purposes only and is not legal advice. Laws vary by jurisdiction. Consult a licensed attorney for advice specific to your situation.*
```

(Repeat for remaining 8 class action articles with appropriate content — see article titles list in task overview. Each follows the same structure above.)

- [ ] **Step 2: Create remaining 8 class action article stubs** following the same frontmatter and structure pattern for:
  - `how-class-action-settlement-payments-work.md`
  - `claim-form-opt-out-objection-explained.md`
  - `why-class-action-payments-take-months.md`
  - `missed-class-action-settlement-deadline.md`
  - `how-to-know-if-settlement-website-is-legitimate.md`
  - `what-is-a-settlement-administrator.md`
  - `why-class-action-payments-are-small.md`
  - `do-you-need-a-lawyer-for-class-action.md`

- [ ] **Step 3: Commit**
```bash
git add content/class-actions/
git commit -m "feat: class action article stubs (10 articles)"
```

---

## Task 12: Article Content — Scam Check (8 articles)

**Files:** `content/scam-check/*.md`

- [ ] **Step 1: Create 8 scam check article stubs**

Articles to create (follow same frontmatter + structure pattern from Task 11):
  - `how-to-spot-a-fake-settlement-email.md`
  - `settlement-check-scams-red-flags.md`
  - `can-settlement-administrator-ask-for-ssn.md`
  - `should-you-pay-fee-to-receive-settlement.md`
  - `received-suspicious-legal-notice-what-to-do.md`
  - `fake-lawsuit-text-messages.md`
  - `claim-id-vs-confirmation-code.md`
  - `how-to-verify-a-class-action-settlement.md`

Each article must include: short answer, explanation, red flags list, example scenario, common mistakes, when to seek help, sources to verify, FAQ, disclaimer.

- [ ] **Step 2: Commit**
```bash
git add content/scam-check/
git commit -m "feat: scam check article stubs (8 articles)"
```

---

## Task 13: Article Content — Personal Injury (10 articles)

**Files:** `content/personal-injury/*.md`

- [ ] **Step 1: Create 10 personal injury article stubs**

Articles:
  - `what-is-a-personal-injury-claim.md`
  - `personal-injury-claim-vs-lawsuit.md`
  - `what-evidence-can-help-an-injury-claim.md`
  - `what-is-a-demand-letter.md`
  - `how-insurance-adjusters-review-injury-claims.md`
  - `why-medical-records-matter-in-injury-claim.md`
  - `what-is-pain-and-suffering.md`
  - `settlement-offer-too-low-what-happens-next.md`
  - `recorded-statement-after-accident-what-to-know.md`
  - `what-is-comparative-negligence.md`

- [ ] **Step 2: Commit**
```bash
git add content/personal-injury/
git commit -m "feat: personal injury article stubs (10 articles)"
```

---

## Task 14: Article Content — Insurance Claims (8 articles)

**Files:** `content/insurance-claims/*.md`

- [ ] **Step 1: Create 8 insurance claim article stubs**

Articles:
  - `why-insurance-claims-get-denied.md`
  - `what-to-do-after-car-insurance-claim-denial.md`
  - `what-is-an-insurance-claim-appeal.md`
  - `how-claim-adjusters-estimate-damage.md`
  - `what-is-a-reservation-of-rights-letter.md`
  - `what-is-bad-faith-insurance.md`
  - `why-insurance-companies-ask-for-more-documents.md`
  - `home-insurance-claim-delays-common-reasons.md`

- [ ] **Step 2: Commit**
```bash
git add content/insurance-claims/
git commit -m "feat: insurance claims article stubs (8 articles)"
```

---

## Task 15: Article Content — Consumer Protection (9 articles)

**Files:** `content/consumer-protection/*.md`

- [ ] **Step 1: Create 9 consumer protection article stubs**

Articles:
  - `what-is-a-consumer-protection-claim.md`
  - `credit-report-errors-what-consumers-should-know.md`
  - `debt-collection-complaints-consumer-rights.md`
  - `subscription-cancellation-problems-options.md`
  - `hidden-fees-consumer-complaints.md`
  - `data-breach-lawsuits-what-consumers-should-know.md`
  - `product-recall-vs-product-liability-claim.md`
  - `what-to-do-if-company-refuses-refund.md`
  - `how-government-consumer-complaint-systems-work.md`

- [ ] **Step 2: Commit**
```bash
git add content/consumer-protection/
git commit -m "feat: consumer protection article stubs (9 articles)"
```

---

## Task 16: Strategy Documents

**Files:** `docs/strategy/*.md`

- [ ] **Step 1: Create website strategy doc**

Save to `docs/strategy/website-strategy.md` — full positioning, audience, SEO approach, brand voice, content pillars, monetization phases as described in the project brief.

- [ ] **Step 2: Create article briefs doc**

Save to `docs/strategy/article-briefs.md` — full briefs for all 45 articles using the article template (title, SEO title, meta description, URL slug, primary keyword, secondary keywords, search intent, reader problem, short answer outline, main sections, example scenario, common mistakes, sources to verify, FAQ outline, internal links, schema type, image prompt).

- [ ] **Step 3: Create internal linking map**

Save to `docs/strategy/internal-linking-map.md` — maps each article to 2-4 internal links it should contain, organized by hub-and-spoke topology (category pages = hubs, articles = spokes).

- [ ] **Step 4: Create 90-day publishing calendar**

Save to `docs/strategy/publishing-calendar.md` — week-by-week schedule from launch, prioritizing cornerstone articles first.

- [ ] **Step 5: Create AdSense checklist**

Save to `docs/strategy/adsense-checklist.md` — full pre-submission checklist.

- [ ] **Step 6: Create writing prompt template**

Save to `docs/strategy/article-prompt-template.md` — AI writing prompt template for producing AdSense-quality, spec-compliant articles.

- [ ] **Step 7: Create SEO templates**

Save to `docs/strategy/seo-templates.md` — title and meta description formulas per category.

- [ ] **Step 8: Create image style guide**

Save to `docs/strategy/image-style-guide.md` — art direction for featured images.

- [ ] **Step 9: Create content update process**

Save to `docs/strategy/content-update-process.md` — process for monitoring deadline changes, settlement updates, and triggering article revisions.

- [ ] **Step 10: Commit**
```bash
git add docs/strategy/
git commit -m "feat: editorial strategy and operations documents"
```

---

## Task 17: Global OG Image and Final Cleanup

**Files:**
- Create: `app/opengraph-image.tsx`
- Remove: `public/next.svg`, `public/vercel.svg`, `public/globe.svg`, `public/file.svg`, `public/window.svg`

- [ ] **Step 1: Create root OG image**

```tsx
// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f2044",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 20, color: "#93c5fd", marginBottom: 24, fontWeight: 600, letterSpacing: "0.05em" }}>
          LAWSUITSCLAIM.COM
        </div>
        <div style={{ fontSize: 60, fontWeight: 700, color: "#ffffff", lineHeight: 1.15, maxWidth: 800 }}>
          Legal Claims Explained Clearly
        </div>
        <div style={{ fontSize: 22, color: "#94a3b8", marginTop: 28 }}>
          Plain-English guides to lawsuits, settlements, and legal claims
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

- [ ] **Step 2: Remove placeholder public assets and update page.tsx imports**

Delete: `public/next.svg`, `public/vercel.svg`, `public/globe.svg`, `public/file.svg`, `public/window.svg`

- [ ] **Step 3: Final commit**
```bash
git add app/opengraph-image.tsx
git rm public/next.svg public/vercel.svg public/globe.svg public/file.svg public/window.svg
git commit -m "feat: root OG image, remove placeholder assets"
```

---

## Self-Review Against Spec

| Spec requirement | Covered by task |
|---|---|
| Homepage with all 9 sections | Task 5 |
| All 8 required static pages | Tasks 9–10 |
| 9 category pages | Task 6 |
| Article template + dynamic route | Task 7 |
| 45 article stubs | Tasks 11–15 |
| SEO (sitemap, robots, OG, schema) | Tasks 1, 7, 8, 17 |
| Legal disclaimer on every article | Task 3 (ArticleDisclaimer) |
| Editorial policy | Task 9 |
| Legal disclaimer page | Task 9 |
| Privacy/Terms/Cookie | Task 10 |
| Newsletter signup | Task 5 |
| Scam check CTA on homepage | Task 5 |
| Trust elements (disclaimer, non-law-firm) | Tasks 1, 5, 7, 9 |
| Design (navy/white/blue, clean) | Task 1 |
| No popups, no fake trust badges | Enforced — no such components exist |
| Strategy documents (all 9) | Task 16 |
| Article writing prompt template | Task 16 |
| Internal linking map | Task 16 |
| 90-day calendar | Task 16 |
| AdSense checklist | Task 16 |
| Image style guide | Task 16 |
| Content update process | Task 16 |

**Gaps identified:**
- `resources/page.tsx` not explicitly tasked — add as part of Task 6 (it uses the same category page template, `resources` is in CATEGORIES)
- `label` field used in `ArticleCard` but not in `ArticleFrontmatter` type — `lib/articles.ts` should derive display label from `lib/categories.ts`. Fix: in `getAllArticles()`, add `label: getCategoryBySlug(category)?.label ?? category` to the returned object, and add `label: string` to `Article` interface.
- Markdown rendering: `dangerouslySetInnerHTML` on raw markdown is intentional for stub articles that contain pre-formatted content. Add a note in the plan that full markdown-to-HTML rendering (via `remark`) should be wired before launch.

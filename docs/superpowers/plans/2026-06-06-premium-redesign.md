# LawsuitsClaim Premium Redesign & AdSense Readiness — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform LawsuitsClaim.com into a premium legal editorial publication with a proper markdown pipeline, AdSense readiness, and polished UI across all pages.

**Architecture:** Server Components throughout (no client JS except the mobile menu toggle). Markdown is rendered server-side via a `unified`/`remark`/`rehype` pipeline into sanitised HTML and injected via `dangerouslySetInnerHTML` inside the Tailwind Typography `prose` container. All design changes use Tailwind CSS v4 utility classes and custom theme tokens — no animation libraries.

**Tech Stack:** Next.js 16.2.7 App Router · React 19 · TypeScript · Tailwind CSS v4 + `@tailwindcss/typography` · Lucide React · `unified` / `remark-parse` / `remark-gfm` / `remark-rehype` / `rehype-slug` / `rehype-external-links` / `rehype-stringify`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `lib/markdown.ts` | **Create** | `renderMarkdownToHtml()` pipeline + `extractHeadings()` |
| `lib/articles.ts` | **Modify** | Add `getRelatedArticles()` helper |
| `lib/categories.ts` | **Modify** | Remove `settlements`, `legal-basics`, `resources` |
| `next.config.ts` | **Modify** | Add permanent redirects for removed categories |
| `public/ads.txt` | **Create** | AdSense publisher file |
| `app/layout.tsx` | **Modify** | Add AdSense meta tag |
| `app/globals.css` | **Modify** | New design tokens, blockquote/table/external link styles |
| `app/_components/Header.tsx` | **Modify** | Premium header + trust badge + mobile menu wiring |
| `app/_components/MobileMenu.tsx` | **Create** | Client component for mobile nav toggle |
| `app/_components/Footer.tsx` | **Modify** | Visual upgrade, spacing, contrast |
| `app/_components/CategoryCard.tsx` | **Modify** | Premium redesign with icon circle + micro-CTA |
| `app/_components/ArticleCard.tsx` | **Modify** | Visual upgrade, border-left accent on hover |
| `app/_components/TableOfContents.tsx` | **Create** | Sticky sidebar TOC for article pages |
| `app/_components/RelatedGuides.tsx` | **Create** | 3-article strip at bottom of article pages |
| `app/_components/LearnMoreSection.tsx` | **Create** | Replaces NewsletterSignup on homepage |
| `app/_components/NewsletterSignup.tsx` | **Delete** | Replaced by LearnMoreSection |
| `app/page.tsx` | **Modify** | Full homepage redesign |
| `app/[category]/page.tsx` | **Modify** | Premium category page with hero + featured article |
| `app/[category]/[slug]/page.tsx` | **Modify** | Article page with TOC, author, related guides |
| `app/(static)/layout.tsx` | **Modify** | Add breadcrumbs support to static layout |
| `app/(static)/about/page.tsx` | **Modify** | Structured rewrite with visual sections |
| `app/(static)/editorial-policy/page.tsx` | **Modify** | Visual structure improvements |
| `app/(static)/privacy-policy/page.tsx` | **Modify** | Add AdSense/advertising section |
| `app/(static)/cookie-policy/page.tsx` | **Modify** | Add Google third-party vendor section |
| `docs/ADSENSE_READINESS_CHECKLIST.md` | **Create** | Pre-launch verification checklist |
| `content/**/*.md` | **Audit** | Fix markdown formatting + content trust cleanup |

---

## Task 1 — Install Markdown Pipeline Packages

**Files:** `package.json`, `pnpm-lock.yaml`

- [ ] **Install the six required packages:**

```bash
cd "/Users/abdou/Desktop/website project github/lawsuitsclaim"
pnpm add unified remark-parse remark-gfm remark-rehype rehype-slug rehype-external-links rehype-stringify
```

Expected output: 6 packages added with no peer dependency errors.

- [ ] **Verify installation:**

```bash
node -e "require('./node_modules/unified/index.cjs'); console.log('ok')"
```

Expected: `ok`

- [ ] **Commit:**

```bash
git add package.json pnpm-lock.yaml
git commit -m "deps: add unified remark/rehype markdown pipeline"
```

---

## Task 2 — Create `lib/markdown.ts`

**Files:**
- Create: `lib/markdown.ts`

- [ ] **Create the file with the full pipeline:**

```typescript
// lib/markdown.ts
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeStringify from 'rehype-stringify';

/**
 * Renders a markdown string to sanitised HTML.
 * - allowDangerousHtml: false — raw HTML in markdown is never passed through.
 * - External links get target="_blank" rel="noopener noreferrer" automatically.
 * - Headings get stable id="" attributes via rehype-slug.
 */
export async function renderMarkdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSlug)
    .use(rehypeExternalLinks, {
      target: '_blank',
      rel: ['noopener', 'noreferrer'],
    })
    .use(rehypeStringify)
    .process(markdown);

  return String(result);
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Extracts h2 and h3 headings from raw markdown before rendering.
 * Generates slug IDs compatible with rehype-slug (github-slugger algorithm).
 */
export function extractHeadings(markdown: string): Heading[] {
  const headings: Heading[] = [];

  for (const line of markdown.split('\n')) {
    const h2 = line.match(/^## (.+)$/);
    const h3 = line.match(/^### (.+)$/);
    const match = h2 ?? h3;
    if (!match) continue;

    const text = match[1].trim();
    // github-slugger compatible: lowercase, replace non-word chars with hyphen, trim hyphens
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');

    headings.push({ id, text, level: h2 ? 2 : 3 });
  }

  return headings;
}
```

- [ ] **Verify TypeScript compiles with no errors:**

```bash
cd "/Users/abdou/Desktop/website project github/lawsuitsclaim"
pnpm exec tsc --noEmit 2>&1 | head -20
```

Expected: no errors related to `lib/markdown.ts`.

- [ ] **Commit:**

```bash
git add lib/markdown.ts
git commit -m "feat: add renderMarkdownToHtml and extractHeadings in lib/markdown.ts"
```

---

## Task 3 — Update Article Page to Use the New Renderer

**Files:**
- Modify: `app/[category]/[slug]/page.tsx`

Replace the naive `split("\n\n")` renderer with `renderMarkdownToHtml` and add the author line. The `TableOfContents` and `RelatedGuides` components will be wired in Task 14 — for now just render the HTML.

- [ ] **Replace `app/[category]/[slug]/page.tsx` entirely:**

```typescript
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

          {/* TOC sidebar — wired in Task 14; placeholder column preserved */}
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
```

- [ ] **Run build to verify article pages render:**

```bash
cd "/Users/abdou/Desktop/website project github/lawsuitsclaim"
pnpm build 2>&1 | tail -20
```

Expected: build succeeds, `67` static pages (or similar count).

- [ ] **Commit:**

```bash
git add app/[category]/[slug]/page.tsx
git commit -m "feat: replace naive markdown renderer with unified/remark/rehype pipeline"
```

---

## Task 4 — Markdown Content Audit (10 Articles)

**Files:** `content/**/*.md` (edit files in place)

Inspect at least 10 articles — one from each category plus extras — and fix broken markdown. Open each file in your editor and check for:

- Lists that lack a blank line before them (add the blank line)
- Blockquotes missing the `>` prefix (fix the syntax)
- FAQ sections that use bold (`**Q:**`) instead of heading hierarchy (convert to `### Q:`)
- Tables with missing separator rows `| --- | --- |`
- Duplicate `## Heading` entries used as decorative separators (merge or remove)

The **10 minimum articles to inspect:**

```
content/class-actions/what-is-a-class-action-lawsuit.md
content/class-actions/how-class-action-settlement-payments-work.md
content/personal-injury/what-is-a-personal-injury-claim.md
content/personal-injury/what-evidence-can-help-an-injury-claim.md
content/insurance-claims/what-is-bad-faith-insurance.md
content/insurance-claims/why-insurance-claims-get-denied.md
content/consumer-protection/what-is-a-consumer-protection-claim.md
content/consumer-protection/data-breach-lawsuits-what-consumers-should-know.md
content/scam-check/how-to-spot-a-fake-settlement-email.md
content/scam-check/settlement-check-scams-red-flags.md
```

- [ ] **Open and inspect each file. For each, verify:**
  - Lists are preceded by a blank line
  - No raw HTML tags (`<br>`, `<strong>`, `<p>`, etc.) in the body
  - Blockquotes use `> text` syntax
  - FAQ headings use `### Question` not `**Question**`
  - No duplicate identical headings

- [ ] **Common fix pattern — list without blank line (before):**

```markdown
Here is a summary of key points:
- Point one
- Point two
```

Fix to:

```markdown
Here is a summary of key points:

- Point one
- Point two
```

- [ ] **Common fix pattern — FAQ with bold instead of heading (before):**

```markdown
**Can I opt out of a class action?**
Yes, you can opt out by...
```

Fix to:

```markdown
### Can I opt out of a class action?

Yes, you can opt out by...
```

- [ ] **Commit all content fixes together:**

```bash
git add content/
git commit -m "content: fix markdown formatting in audited articles"
```

---

## Task 5 — Content Trust Cleanup

**Files:** `content/**/*.md`

Search for risky phrases that could trigger YMYL/AdSense issues and rewrite them.

- [ ] **Run grep to find all risky phrases:**

```bash
cd "/Users/abdou/Desktop/website project github/lawsuitsclaim"
grep -rin "guarantee\|you are eligible\|get paid\|free case review\|check your eligibility\|settlement guaranteed\|claim your money\|hire a lawyer now\|we represent\|our attorneys\|qualified for compensation\|legal advice" content/ --include="*.md"
```

- [ ] **For each hit, apply the appropriate safe rewrite:**

| Risky phrase | Safe replacement |
|---|---|
| `guarantee` | `may`, `can`, `often` |
| `you are eligible` | `you may be eligible, depending on the situation` |
| `get paid` | `receive a payment` or remove |
| `free case review` | remove or replace with "consider speaking with a licensed attorney" |
| `legal advice` (as something we give) | `general legal information` |
| `check your eligibility` | `review the official settlement notice for eligibility details` |
| `settlement guaranteed` | remove |
| `qualified for compensation` | `may have a potential claim` |

- [ ] **Verify no hits remain for the most dangerous phrases:**

```bash
grep -rin "guarantee\|free case review\|settlement guaranteed\|qualified for compensation\|our attorneys\|we represent" content/ --include="*.md"
```

Expected: zero results.

- [ ] **Commit:**

```bash
git add content/
git commit -m "content: remove risky YMYL phrases from all articles"
```

---

## Task 6 — Data Layer Cleanup

**Files:**
- Modify: `lib/categories.ts`
- Modify: `next.config.ts`
- Modify: `lib/articles.ts`

- [ ] **Remove dead categories from `lib/categories.ts`.**

Replace the full `CATEGORIES` array with only the five active categories:

```typescript
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
];
```

- [ ] **Add `getRelatedArticles` to `lib/articles.ts`** (append after `getFeaturedArticles`):

```typescript
export function getRelatedArticles(
  category: string,
  excludeSlug: string,
  limit = 3
): Article[] {
  return getArticlesByCategory(category)
    .filter((a) => a.slug !== excludeSlug)
    .slice(0, limit);
}
```

- [ ] **Add redirects for removed categories in `next.config.ts`:**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      { source: "/settlements", destination: "/class-actions", permanent: true },
      { source: "/settlements/:slug*", destination: "/class-actions", permanent: true },
      { source: "/legal-basics", destination: "/class-actions/what-is-a-class-action-lawsuit", permanent: true },
      { source: "/legal-basics/:slug*", destination: "/class-actions/what-is-a-class-action-lawsuit", permanent: true },
      { source: "/resources", destination: "/consumer-protection", permanent: true },
      { source: "/resources/:slug*", destination: "/consumer-protection", permanent: true },
    ];
  },
};

export default nextConfig;
```

- [ ] **Search all content files for internal links to removed categories:**

```bash
grep -rn "/settlements\|/legal-basics\|/resources" content/ app/ --include="*.md" --include="*.tsx" --include="*.ts"
```

Fix any hits by updating the link to point to an active category.

- [ ] **Verify build still passes:**

```bash
pnpm build 2>&1 | tail -10
```

- [ ] **Commit:**

```bash
git add lib/categories.ts lib/articles.ts next.config.ts
git commit -m "refactor: remove dead categories, add redirects, add getRelatedArticles"
```

---

## Task 7 — AdSense Readiness Files

**Files:**
- Create: `public/ads.txt`
- Modify: `app/layout.tsx`

- [ ] **Create `public/ads.txt` with the exact required content (no trailing whitespace, no blank line at end):**

```
google.com, pub-1553579698682940, DIRECT, f08c47fec0942fa0
```

Write the file:
```bash
printf 'google.com, pub-1553579698682940, DIRECT, f08c47fec0942fa0' > "/Users/abdou/Desktop/website project github/lawsuitsclaim/public/ads.txt"
```

Verify:
```bash
cat "/Users/abdou/Desktop/website project github/lawsuitsclaim/public/ads.txt"
```

Expected: exactly `google.com, pub-1553579698682940, DIRECT, f08c47fec0942fa0` with no extra lines.

- [ ] **Add the AdSense meta tag to `app/layout.tsx`.**

In the `metadata` export, add the `other` field:

```typescript
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
  other: {
    "google-adsense-account": "ca-pub-1553579698682940",
  },
};
```

- [ ] **Commit:**

```bash
git add public/ads.txt app/layout.tsx
git commit -m "feat: add ads.txt and AdSense account meta tag"
```

---

## Task 8 — Design Tokens and Global Styles

**Files:**
- Modify: `app/globals.css`

- [ ] **Replace `app/globals.css` entirely with the expanded version:**

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  /* Navy scale */
  --color-navy-950: #0a1628;
  --color-navy-900: #0f2044;
  --color-navy-800: #1a3060;
  --color-navy-700: #243d7a;

  /* Brand */
  --color-brand-blue: #1d4ed8;
  --color-brand-blue-light: #3b82f6;

  /* Neutrals */
  --color-accent-slate: #64748b;
  --color-surface: #f8fafc;
  --color-surface-2: #f1f5f9;
  --color-surface-card: #ffffff;
  --color-border: #e2e8f0;

  /* Warm paper background for hero/sections */
  --color-warm-paper: #faf9f6;

  /* Amber/warning for scam section */
  --color-amber-accent: #b45309;
  --color-amber-bg: #fef3c7;
  --color-amber-border: #fbbf24;

  /* Fonts */
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

/* Responsive table wrapper — injected by the markdown renderer */
.prose table {
  display: block;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

/* Blockquote as editorial callout */
.prose blockquote {
  border-left: 4px solid var(--color-brand-blue);
  background-color: #eff6ff;
  border-radius: 0 0.5rem 0.5rem 0;
  padding: 0.75rem 1rem;
  font-style: normal;
  color: var(--color-accent-slate);
}

.prose blockquote p {
  margin: 0;
}
```

- [ ] **Verify no build errors:**

```bash
pnpm build 2>&1 | grep -E "error|Error" | head -10
```

Expected: no errors.

- [ ] **Commit:**

```bash
git add app/globals.css
git commit -m "design: expand theme tokens, add blockquote and table styles"
```

---

## Task 9 — Header: Premium Design + Mobile Menu

**Files:**
- Create: `app/_components/MobileMenu.tsx`
- Modify: `app/_components/Header.tsx`

- [ ] **Create `app/_components/MobileMenu.tsx` (client component):**

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

export default function MobileMenu({ navLinks }: { navLinks: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden p-2 text-accent-slate hover:text-navy-900 transition-colors rounded-md"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg z-40">
          <nav
            className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-0.5"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2.5 text-sm text-navy-900 hover:bg-surface rounded-md transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-border">
              <Link
                href="/about"
                className="block px-3 py-2.5 text-sm font-medium text-brand-blue hover:bg-blue-50 rounded-md transition-colors"
                onClick={() => setOpen(false)}
              >
                About
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
```

- [ ] **Replace `app/_components/Header.tsx` entirely:**

```typescript
import Link from "next/link";
import { Scale, FileText } from "lucide-react";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Class Actions", href: "/class-actions" },
  { label: "Personal Injury", href: "/personal-injury" },
  { label: "Insurance Claims", href: "/insurance-claims" },
  { label: "Consumer Protection", href: "/consumer-protection" },
  { label: "Scam Check", href: "/scam-check" },
];

export default function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-md"
          >
            <div className="p-1.5 bg-navy-900 rounded-lg">
              <Scale className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-navy-900 text-base tracking-tight">
                LawsuitsClaim
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-0.5"
            aria-label="Main navigation"
          >
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

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-accent-slate border border-border rounded-full px-3 py-1.5 select-none">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0" aria-hidden="true" />
              Independent Legal Information
            </span>
            <Link
              href="/about"
              className="text-sm font-medium text-navy-900 hover:text-brand-blue transition-colors"
            >
              About
            </Link>
          </div>

          {/* Mobile menu */}
          <MobileMenu navLinks={navLinks} />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Verify build passes:**

```bash
pnpm build 2>&1 | tail -5
```

- [ ] **Commit:**

```bash
git add app/_components/Header.tsx app/_components/MobileMenu.tsx
git commit -m "feat: premium header with trust badge and working mobile menu"
```

---

## Task 10 — Footer Visual Upgrade

**Files:**
- Modify: `app/_components/Footer.tsx`

- [ ] **Replace `app/_components/Footer.tsx` entirely:**

```typescript
import Link from "next/link";
import { Scale } from "lucide-react";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Learn: [
    { label: "Class Actions", href: "/class-actions" },
    { label: "Personal Injury", href: "/personal-injury" },
    { label: "Insurance Claims", href: "/insurance-claims" },
    { label: "Consumer Protection", href: "/consumer-protection" },
    { label: "Scam Check Center", href: "/scam-check" },
  ],
  Site: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Editorial Policy", href: "/editorial-policy" },
  ],
  Legal: [
    { label: "Legal Disclaimer", href: "/legal-disclaimer" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="p-1.5 bg-navy-800 rounded-lg">
                <Scale className="h-4 w-4 text-brand-blue-light" aria-hidden="true" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                LawsuitsClaim
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Independent plain-English guides to lawsuits, settlements, and legal claims.
              For general information only — not legal advice.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer + copyright */}
        <div className="border-t border-navy-800 pt-8 space-y-4">
          <p className="text-sm text-slate-400 leading-relaxed max-w-4xl">
            <strong className="text-slate-300 font-semibold">Legal Disclaimer:</strong>{" "}
            LawsuitsClaim.com is an independent legal information publisher. All content on this
            site is for general informational purposes only and does not constitute legal advice.
            We are not a law firm. We do not represent clients. We do not guarantee claim
            eligibility, settlement amounts, or case outcomes. Laws vary by state and
            jurisdiction. If you have a legal matter, consult a licensed attorney in your
            jurisdiction.
          </p>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} LawsuitsClaim. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
```

- [ ] **Commit:**

```bash
git add app/_components/Footer.tsx
git commit -m "design: premium footer with improved contrast and spacing"
```

---

## Task 11 — CategoryCard and ArticleCard Redesign

**Files:**
- Modify: `app/_components/CategoryCard.tsx`
- Modify: `app/_components/ArticleCard.tsx`

- [ ] **Replace `app/_components/CategoryCard.tsx` entirely:**

```typescript
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
  Icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  className?: string;
}

export default function CategoryCard({
  title,
  description,
  href,
  Icon,
  iconBg = "bg-blue-50",
  iconColor = "text-brand-blue",
  className,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col bg-white border border-border rounded-xl p-6 hover:border-brand-blue hover:shadow-md transition-all min-h-[180px]",
        className
      )}
    >
      <div className={cn("p-3 rounded-xl w-fit mb-4", iconBg)}>
        <Icon className={cn("h-6 w-6", iconColor)} aria-hidden="true" />
      </div>
      <h3 className="font-semibold text-navy-900 mb-2 leading-snug group-hover:text-brand-blue transition-colors text-base">
        {title}
      </h3>
      <p className="text-sm text-accent-slate leading-relaxed flex-1">
        {description}
      </p>
      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-brand-blue">
        Explore guides{" "}
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
```

- [ ] **Replace `app/_components/ArticleCard.tsx` entirely:**

```typescript
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  href: string;
  category: string;
  readingTime?: string;
  updatedAt?: string;
  featured?: boolean;
  className?: string;
}

export default function ArticleCard({
  title,
  excerpt,
  href,
  category,
  readingTime,
  updatedAt,
  featured = false,
  className,
}: ArticleCardProps) {
  const dateLabel = updatedAt
    ? `Updated ${new Date(updatedAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })}`
    : null;

  return (
    <article
      className={cn(
        "bg-white border border-border rounded-xl p-6 hover:shadow-md hover:border-slate-300 transition-all group flex flex-col",
        featured && "border-l-4 border-l-brand-blue",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-xs font-medium text-brand-blue bg-blue-50 px-2.5 py-1 rounded-full">
          {category}
        </span>
        {readingTime && (
          <span className="text-xs text-accent-slate">{readingTime}</span>
        )}
        {dateLabel && (
          <span className="text-xs text-accent-slate">{dateLabel}</span>
        )}
      </div>
      <h3
        className={cn(
          "font-semibold text-navy-900 leading-snug mb-2 group-hover:text-brand-blue transition-colors",
          featured ? "text-xl" : "text-base"
        )}
      >
        <Link href={href}>{title}</Link>
      </h3>
      <p
        className={cn(
          "text-accent-slate leading-relaxed flex-1 mb-4",
          featured ? "text-base line-clamp-3" : "text-sm line-clamp-2"
        )}
      >
        {excerpt}
      </p>
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue hover:text-navy-800 transition-colors"
        aria-label={`Read guide: ${title}`}
      >
        Read guide <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </article>
  );
}
```

- [ ] **Commit:**

```bash
git add app/_components/CategoryCard.tsx app/_components/ArticleCard.tsx
git commit -m "design: premium CategoryCard and ArticleCard components"
```

---

## Task 12 — TableOfContents and RelatedGuides Components

**Files:**
- Create: `app/_components/TableOfContents.tsx`
- Create: `app/_components/RelatedGuides.tsx`
- Create: `app/_components/LearnMoreSection.tsx`
- Delete: `app/_components/NewsletterSignup.tsx`

- [ ] **Create `app/_components/TableOfContents.tsx`:**

```typescript
import type { Heading } from "@/lib/markdown";
import { List } from "lucide-react";

interface TOCProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TOCProps) {
  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="not-prose bg-surface border border-border rounded-xl p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        <List className="h-4 w-4 text-accent-slate" aria-hidden="true" />
        <p className="text-xs font-semibold text-accent-slate uppercase tracking-wider">
          In this guide
        </p>
      </div>
      <ol className="space-y-1.5">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
            <a
              href={`#${h.id}`}
              className="text-sm text-accent-slate hover:text-navy-900 transition-colors leading-snug block py-0.5"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

- [ ] **Create `app/_components/RelatedGuides.tsx`:**

```typescript
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/lib/articles";

interface RelatedGuidesProps {
  articles: Article[];
  currentCategory: string;
}

export default function RelatedGuides({
  articles,
  currentCategory,
}: RelatedGuidesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="not-prose mt-10 mb-8">
      <h2 className="text-lg font-bold text-navy-900 mb-4">
        More {currentCategory} Guides
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={article.href}
            className="group block bg-white border border-border rounded-xl p-4 hover:border-brand-blue hover:shadow-sm transition-all"
          >
            <p className="text-sm font-semibold text-navy-900 leading-snug mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
              {article.title}
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-blue">
              Read guide <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Create `app/_components/LearnMoreSection.tsx`:**

```typescript
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function LearnMoreSection() {
  return (
    <section className="bg-warm-paper border border-border rounded-2xl p-8 md:p-12 text-center">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-center mb-5">
          <div className="p-3 bg-blue-50 rounded-full">
            <BookOpen className="h-6 w-6 text-brand-blue" aria-hidden="true" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-navy-900 mb-3">
          Build Confidence Before You Act
        </h2>
        <p className="text-accent-slate leading-relaxed text-sm max-w-md mx-auto mb-8">
          New legal claim explainers and settlement education guides are added
          regularly. Bookmark LawsuitsClaim.com for clear, plain-English
          explanations of class actions, personal injury claims, insurance
          disputes, and consumer protection topics.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/class-actions"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-blue text-white text-sm font-medium rounded-lg hover:bg-navy-800 transition-colors"
          >
            Explore Latest Guides <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/editorial-policy"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-navy-900 text-sm font-medium rounded-lg hover:bg-surface transition-colors"
          >
            Read Our Editorial Policy
          </Link>
        </div>
        <p className="text-xs text-accent-slate mt-6">
          General legal information only. We do not provide legal advice or collect case details.
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Delete the old NewsletterSignup component:**

```bash
rm "/Users/abdou/Desktop/website project github/lawsuitsclaim/app/_components/NewsletterSignup.tsx"
```

- [ ] **Commit:**

```bash
git add app/_components/
git commit -m "feat: add TableOfContents, RelatedGuides, LearnMoreSection; remove NewsletterSignup"
```

---

## Task 13 — Homepage Redesign

**Files:**
- Modify: `app/page.tsx`

- [ ] **Replace `app/page.tsx` entirely:**

```typescript
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
```

- [ ] **Verify build passes and homepage route generates correctly:**

```bash
pnpm build 2>&1 | grep -E "○|●|error" | head -20
```

- [ ] **Commit:**

```bash
git add app/page.tsx app/_components/NewsletterSignup.tsx
git commit -m "feat: premium homepage redesign with asymmetric featured guides and scam warning"
```

---

## Task 14 — Category Page Redesign + Article Page TOC Wiring

**Files:**
- Modify: `app/[category]/page.tsx`
- Modify: `app/[category]/[slug]/page.tsx`

- [ ] **Replace `app/[category]/page.tsx` entirely:**

```typescript
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getCategoryBySlug, CATEGORIES } from "@/lib/categories";
import { getArticlesByCategory } from "@/lib/articles";
import ArticleCard from "@/app/_components/ArticleCard";
import Breadcrumbs from "@/app/_components/Breadcrumbs";
import { ArrowRight } from "lucide-react";

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

const relatedCategories = [
  { label: "Class Actions", href: "/class-actions" },
  { label: "Personal Injury", href: "/personal-injury" },
  { label: "Insurance Claims", href: "/insurance-claims" },
  { label: "Consumer Protection", href: "/consumer-protection" },
  { label: "Scam Check", href: "/scam-check" },
];

export default async function CategoryPage(props: PageProps<"/[category]">) {
  const { category } = await props.params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const articles = getArticlesByCategory(category);
  if (articles.length === 0) notFound();

  const [featured, ...rest] = articles;

  const related = relatedCategories.filter((c) => c.href !== `/${category}`);

  return (
    <div>
      {/* Category hero */}
      <div className="bg-warm-paper border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs items={[{ label: cat.label }]} />
          <div className="mt-5 max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-3 leading-tight">
              {cat.title}
            </h1>
            <p className="text-accent-slate leading-relaxed text-base">
              {cat.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Featured guide */}
        {featured && (
          <div className="mb-10">
            <p className="text-xs font-semibold text-accent-slate uppercase tracking-wider mb-4">
              Start here
            </p>
            <ArticleCard
              title={featured.title}
              excerpt={featured.excerpt}
              href={featured.href}
              category={cat.label}
              readingTime={featured.readingTime}
              updatedAt={featured.updatedAt}
              featured
              className="max-w-2xl"
            />
          </div>
        )}

        {/* Article grid */}
        {rest.length > 0 && (
          <div className="mb-12">
            <p className="text-xs font-semibold text-accent-slate uppercase tracking-wider mb-4">
              All guides in this category
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((article) => (
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

        {/* Related categories */}
        <div className="border-t border-border pt-8 mb-10">
          <p className="text-xs font-semibold text-accent-slate uppercase tracking-wider mb-4">
            Explore other topics
          </p>
          <div className="flex flex-wrap gap-3">
            {related.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-800 bg-white border border-border rounded-full px-4 py-2 hover:border-brand-blue hover:text-brand-blue transition-colors"
              >
                {c.label} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        {/* Legal disclaimer strip */}
        <div className="bg-surface border border-border rounded-xl p-5">
          <p className="text-sm text-accent-slate leading-relaxed">
            <strong className="text-navy-800">General Information Only:</strong>{" "}
            Guides in this category are for educational purposes and do not
            constitute legal advice. LawsuitsClaim.com is not a law firm. Laws
            vary by state and jurisdiction. Consult a licensed attorney for
            advice specific to your situation.
          </p>
        </div>

      </div>
    </div>
  );
}
```

- [ ] **Wire TableOfContents and RelatedGuides into `app/[category]/[slug]/page.tsx`.**

Add imports at the top (after existing imports):

```typescript
import TableOfContents from "@/app/_components/TableOfContents";
import RelatedGuides from "@/app/_components/RelatedGuides";
import { getRelatedArticles } from "@/lib/articles";
```

Add `relatedArticles` computation inside the component function, after `const headings = extractHeadings(article.content);`:

```typescript
const relatedArticles = getRelatedArticles(category, slug, 3);
```

Replace the `{/* TOC sidebar — wired in Task 14; placeholder column preserved */}` aside with:

```typescript
{headings.length >= 2 && (
  <aside className="hidden lg:block lg:w-64 xl:w-72 shrink-0">
    <div className="lg:sticky lg:top-24">
      <TableOfContents headings={headings} />
    </div>
  </aside>
)}
```

Replace the bottom disclaimer block:

```typescript
<div className="max-w-4xl mt-12 pt-8 border-t border-border">
  <RelatedGuides articles={relatedArticles} currentCategory={cat?.label ?? category} />
  <ArticleDisclaimer />
</div>
```

- [ ] **Verify build:**

```bash
pnpm build 2>&1 | tail -10
```

Expected: passes, same page count.

- [ ] **Commit:**

```bash
git add app/[category]/page.tsx app/[category]/[slug]/page.tsx
git commit -m "feat: premium category pages and article pages with TOC, related guides, author line"
```

---

## Task 15 — Static Pages: Layout, About, Editorial Policy

**Files:**
- Modify: `app/(static)/layout.tsx`
- Modify: `app/(static)/about/page.tsx`
- Modify: `app/(static)/editorial-policy/page.tsx`

- [ ] **Replace `app/(static)/layout.tsx` to add a warm background and top spacing:**

```typescript
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function StaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg max-w-none prose-headings:text-navy-900 prose-headings:font-bold prose-h1:text-3xl prose-h1:mb-6 prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-6 prose-p:text-navy-800 prose-p:leading-relaxed prose-a:text-brand-blue prose-a:no-underline hover:prose-a:underline prose-li:text-navy-800 prose-strong:text-navy-900 prose-ul:space-y-1 prose-ol:space-y-1">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Replace `app/(static)/about/page.tsx` entirely:**

```typescript
import type { Metadata } from "next";
import Link from "next/link";

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
        with an attorney.
      </p>

      <h2>What We Are Not</h2>
      <ul>
        <li>We are <strong>not a law firm</strong>.</li>
        <li>We do <strong>not offer legal advice</strong>.</li>
        <li>We do <strong>not represent clients</strong>.</li>
        <li>We do <strong>not guarantee settlement eligibility, amounts, or outcomes</strong>.</li>
        <li>We do <strong>not collect sensitive legal case details</strong>.</li>
        <li>We do <strong>not operate a case review or referral service</strong>.</li>
      </ul>
      <p>
        If you have a legal matter that requires professional guidance, please
        consult a licensed attorney in your jurisdiction.
      </p>

      <h2>Who Publishes This Site</h2>
      <p>
        Content on LawsuitsClaim.com is produced by the{" "}
        <strong>LawsuitsClaim Editorial Team</strong> — legal writers who
        specialise in translating complex legal processes into clear, accessible
        language for a general audience. We do not invent credentials, fabricate
        bar memberships, or claim awards we do not hold.
      </p>

      <h2>Our Editorial Standards</h2>
      <p>
        We use official sources where possible — including court documents,
        settlement administrator notices, government agency pages, and
        established legal publications. We do not publish claims we cannot
        support with a credible source. We update guides when deadlines or legal
        details change. See our{" "}
        <Link href="/editorial-policy">Editorial Policy</Link> for full details.
      </p>

      <h2>No Legal Advice — No Compensation Promises</h2>
      <p>
        Everything on this site is general educational information. Nothing on
        LawsuitsClaim.com should be read as legal advice, a guarantee of results,
        or a promise of compensation. Legal outcomes depend on individual
        circumstances, jurisdiction, and the advice of a qualified attorney.
      </p>

      <h2>Corrections and Contact</h2>
      <p>
        If you believe an article contains an error, you can reach us via our{" "}
        <Link href="/contact">Contact page</Link>. We investigate and correct
        confirmed errors promptly. We do not accept payment to change or remove
        accurate content.
      </p>
    </article>
  );
}
```

- [ ] **Verify `app/(static)/editorial-policy/page.tsx` already has an "Advertising and Sponsored Content" section** (it does — added in the original build). Read the file and confirm it contains the `<h2>Advertising and Sponsored Content</h2>` block with the four bullet points about labelling, editorial independence, no referral selling, and no paid coverage. If it does, no changes are needed. If that section is missing, add it before `</article>`:

```typescript
      <h2>Advertising and Sponsored Content</h2>
      <ul>
        <li>We clearly label any sponsored or paid content, if published.</li>
        <li>Advertising does not influence editorial decisions or article content.</li>
        <li>We do not sell legal services, referrals, or case intakes on this website.</li>
        <li>We do not accept payment to publish favorable coverage of any lawsuit, settlement, or legal organisation.</li>
      </ul>
```

- [ ] **Commit:**

```bash
git add "app/(static)/"
git commit -m "feat: improved static page layout and About/Editorial Policy pages"
```

---

## Task 16 — Privacy Policy and Cookie Policy: AdSense Updates

**Files:**
- Modify: `app/(static)/privacy-policy/page.tsx`
- Modify: `app/(static)/cookie-policy/page.tsx`

- [ ] **Replace `app/(static)/privacy-policy/page.tsx` entirely:**

```typescript
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "LawsuitsClaim.com privacy policy — how we collect, use, and protect your information.",
  alternates: { canonical: "https://lawsuitsclaim.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <article>
      <h1>Privacy Policy</h1>
      <p><em>Last updated: June 2026</em></p>

      <h2>Information We Collect</h2>
      <p>
        We collect limited information when you visit LawsuitsClaim.com. This
        may include:
      </p>
      <ul>
        <li>
          <strong>Usage data:</strong> pages visited, browser type, referring
          URL, and general geographic location (country/state level), collected
          via analytics tools.
        </li>
        <li>
          <strong>Contact form data:</strong> if you contact us using our
          contact form, we collect the information you provide in that message.
        </li>
      </ul>
      <p>
        We do <strong>not</strong> collect sensitive personal information such as
        Social Security numbers, case details, legal documents, or financial
        account information.
      </p>

      <h2>How We Use Information</h2>
      <ul>
        <li>To understand how readers use the site and improve our content.</li>
        <li>To respond to contact form submissions.</li>
      </ul>

      <h2>Cookies and Tracking</h2>
      <p>
        We use cookies for analytics and, when ads are displayed on the site,
        for advertising purposes. See our{" "}
        <Link href="/cookie-policy">Cookie Policy</Link> for details. You can
        adjust cookie preferences through your browser settings.
      </p>

      <h2>Third-Party Vendors — Including Google</h2>
      <p>
        We may use third-party tools including Google Analytics and Google
        AdSense. These services operate under their own privacy policies and may
        use cookies or similar technologies to collect data about your visits to
        this and other websites.
      </p>
      <p>
        When Google AdSense is active on this site, Google may use cookies to
        serve ads based on your prior visits to this website or other websites.
        You can opt out of personalised advertising by visiting{" "}
        <a
          href="https://www.google.com/settings/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google&rsquo;s Ad Settings
        </a>
        .
      </p>
      <p>We do not sell your personal information to third parties.</p>

      <h2>Data Retention</h2>
      <p>
        Analytics data is retained per the policies of the analytics provider.
        Contact form submissions are retained only as long as needed to respond.
      </p>

      <h2>Your Choices</h2>
      <p>
        You may request access to, correction of, or deletion of personal data
        we hold about you by contacting us via our{" "}
        <Link href="/contact">Contact page</Link>. You can also manage cookie
        preferences through your browser settings or use the opt-out links
        provided by third-party vendors.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy-related questions, use our{" "}
        <Link href="/contact">Contact page</Link>.
      </p>
    </article>
  );
}
```

- [ ] **Replace `app/(static)/cookie-policy/page.tsx` entirely:**

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "LawsuitsClaim.com cookie policy — how cookies are used on this website.",
  alternates: { canonical: "https://lawsuitsclaim.com/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <article>
      <h1>Cookie Policy</h1>
      <p><em>Last updated: June 2026</em></p>

      <h2>What Are Cookies</h2>
      <p>
        Cookies are small text files stored on your device by your browser when
        you visit websites. They help websites remember information about your
        visit and enable certain site features.
      </p>

      <h2>Cookies We Use</h2>
      <ul>
        <li>
          <strong>Analytics cookies:</strong> We use Google Analytics to
          understand how visitors use the site — pages visited, time on site,
          and referral source. This data is aggregated and does not identify
          individual visitors.
        </li>
        <li>
          <strong>Advertising cookies (when ads are active):</strong> When
          Google AdSense ads are displayed on this site, Google may use cookies
          or similar technologies to serve ads relevant to your interests, based
          on your browsing activity across websites. This is a service provided
          by Google LLC. We do not control the specific cookies Google sets for
          this purpose.
        </li>
      </ul>

      <h2>Google as a Third-Party Vendor</h2>
      <p>
        Google is a third-party vendor that may use cookies to serve ads on
        LawsuitsClaim.com. Google&rsquo;s use of advertising cookies enables it
        and its partners to serve ads based on your visits to this site and other
        sites on the Internet.
      </p>

      <h2>What We Do Not Use Cookies For</h2>
      <p>
        We do not use cookies to collect sensitive personal information, track
        your legal activities, store case details, or build individual profiles
        for sale to third parties.
      </p>

      <h2>Managing Cookies</h2>
      <p>
        You can control and delete cookies through your browser settings.
        Disabling certain cookies may affect site functionality. To opt out of
        personalised Google advertising cookies, visit{" "}
        <a
          href="https://adssettings.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Ad Settings
        </a>{" "}
        or the{" "}
        <a
          href="https://optout.networkadvertising.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Network Advertising Initiative opt-out page
        </a>
        .
      </p>
    </article>
  );
}
```

- [ ] **Commit:**

```bash
git add "app/(static)/privacy-policy/page.tsx" "app/(static)/cookie-policy/page.tsx"
git commit -m "feat: update Privacy Policy and Cookie Policy with AdSense sections"
```

---

## Task 17 — AdSense Readiness Checklist Document

**Files:**
- Create: `docs/ADSENSE_READINESS_CHECKLIST.md`

- [ ] **Create the file:**

```markdown
# AdSense Readiness Checklist — LawsuitsClaim.com

Last updated: June 2026

## Technical Files

- [x] `public/ads.txt` created with correct publisher ID line
- [x] AdSense account meta tag added to root layout (`ca-pub-1553579698682940`)
- [x] No AdSense display ad units (`<ins class="adsbygoogle">`) in codebase
- [x] No Auto Ads script tag in codebase

## Legal Pages

- [x] Privacy Policy mentions third-party vendors including Google
- [x] Privacy Policy mentions advertising cookies when ads are enabled
- [x] Privacy Policy includes user opt-out path (Google Ad Settings)
- [x] Cookie Policy mentions Google AdSense advertising cookies explicitly
- [x] Cookie Policy includes opt-out links
- [x] Legal Disclaimer visible on homepage and footer
- [x] Disclaimer visible on all article pages (top and bottom)
- [x] About page clearly states site is not a law firm

## Content Standards

- [x] No fake case review forms
- [x] No settlement calculators
- [x] No lead generation forms
- [x] No "check your eligibility" forms that collect personal information
- [x] No fake attorney bios or invented credentials
- [x] No "guarantee" language in article content
- [x] No "you are eligible" claims without official source citation
- [x] Original editorial content present across 5 categories (43+ articles)

## Navigation and Crawlability

- [x] `/ads.txt` accessible at root domain — returns HTTP 200
- [x] `/sitemap.xml` accessible — returns HTTP 200
- [x] `/robots.txt` accessible — allows crawling
- [x] No removed category URLs (`/settlements`, `/legal-basics`, `/resources`) in sitemap
- [x] No empty category pages (all categories have content)
- [x] No placeholder text ("lorem ipsum", "coming soon") on any live page
- [x] No broken internal navigation links

## Build and Performance

- [x] `pnpm lint` passes with zero errors
- [x] `pnpm build` passes with zero errors
- [x] No browser console errors on homepage
- [x] No browser console errors on category pages
- [x] No browser console errors on article pages

## Visual and UX

- [x] Legal disclaimer text passes WCAG AA contrast on all backgrounds
- [x] Mobile menu works at 390px viewport
- [x] Homepage readable at 390px, 768px, 1024px, 1280px+
- [x] Category pages readable at all breakpoints
- [x] Article pages readable at all breakpoints
- [x] Footer links all resolve to real pages

## Pre-Submission Verification

Before submitting to AdSense:
1. Deploy to production (Vercel)
2. Visit `https://lawsuitsclaim.com/ads.txt` — verify correct content
3. Crawl the site with a broken link checker
4. Check Google Search Console — no crawl errors on key pages
5. Verify the site has been live for a reasonable period with consistent content
```

- [ ] **Commit:**

```bash
git add docs/ADSENSE_READINESS_CHECKLIST.md
git commit -m "docs: add AdSense readiness checklist"
```

---

## Task 18 — Final Lint, Build, and QA

**Files:** none (verification only)

- [ ] **Run lint:**

```bash
cd "/Users/abdou/Desktop/website project github/lawsuitsclaim"
pnpm lint
```

Expected: zero errors, zero warnings.

- [ ] **Run full build:**

```bash
pnpm build
```

Expected: build succeeds. Note the static page count.

- [ ] **Verify redirects are in the build output:**

```bash
pnpm build 2>&1 | grep -i redirect
```

Expected: redirects for `/settlements`, `/legal-basics`, `/resources` appear in the routes table.

- [ ] **Verify `ads.txt` is accessible in the build output directory:**

```bash
cat "/Users/abdou/Desktop/website project github/lawsuitsclaim/public/ads.txt"
```

Expected: `google.com, pub-1553579698682940, DIRECT, f08c47fec0942fa0`

- [ ] **Mobile visual QA checklist — test at 390px, 768px, 1024px, 1280px:**

Start the dev server:
```bash
pnpm dev
```

Open `http://localhost:3000` in a browser and use DevTools responsive mode. Check each page at each breakpoint:

| Page | 390px | 768px | 1024px | 1280px |
|------|-------|-------|--------|--------|
| Homepage | Hero stacks vertically, CTAs tap-friendly, categories single col | Categories 2-col, featured guide stacks | TOC shows in article, 3-col grid | Full asymmetric layout |
| `/class-actions` | Single col, featured article full width | 2-col grid | 3-col grid | Full hero width |
| `/class-actions/what-is-a-class-action-lawsuit` | Breadcrumbs visible, prose readable, TOC hidden | Prose readable | TOC sidebar shows | Full two-column |
| `/about` | Prose stacks cleanly | Normal | Normal | Normal |
| Footer | 1-col stacked, disclaimer readable | 4-col grid | 4-col grid | 4-col grid |

- [ ] **Verify no AdSense ad units exist anywhere:**

```bash
grep -r "adsbygoogle\|googletag\|adSenseClient\|adsense" "/Users/abdou/Desktop/website project github/lawsuitsclaim/app" --include="*.tsx" --include="*.ts" --include="*.js"
```

Expected: zero results.

- [ ] **Verify no console errors on key pages** by visiting in browser:
  - `http://localhost:3000` (homepage)
  - `http://localhost:3000/class-actions` (category)
  - `http://localhost:3000/class-actions/what-is-a-class-action-lawsuit` (article)
  - `http://localhost:3000/about` (static)

- [ ] **Final commit and push:**

```bash
git add -A
git commit -m "feat: premium legal publication redesign and AdSense readiness

- Markdown pipeline: unified/remark-parse/remark-gfm/remark-rehype/rehype-slug/rehype-external-links/rehype-stringify
- Premium header with backdrop-blur, trust badge, working mobile menu
- Premium footer with improved contrast and spacing
- CategoryCard redesign with icon circles and micro-CTA
- ArticleCard upgrade with featured variant and border accent
- Homepage: asymmetric featured guides, scam warning with red flags, warm-paper hero
- Category pages: hero strip, start-here card, related categories
- Article pages: two-column layout, sticky TOC sidebar, related guides, author line
- LearnMoreSection replaces NewsletterSignup
- About/Editorial Policy/Privacy Policy/Cookie Policy updated
- AdSense: ads.txt, meta tag, legal pages updated
- Dead categories removed: settlements, legal-basics, resources
- Redirects added for removed category URLs
- Content audit: markdown formatting fixed, risky phrases removed
- ADSENSE_READINESS_CHECKLIST.md created"

git push origin main
```

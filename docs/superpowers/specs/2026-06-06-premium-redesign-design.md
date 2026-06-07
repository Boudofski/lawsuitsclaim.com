# LawsuitsClaim.com — Premium Redesign & AdSense Readiness
**Date:** 2026-06-06  
**Status:** Approved (additions 2026-06-06)  
**Scope:** Full visual redesign + markdown pipeline + AdSense readiness

---

## 1. Project Summary

Transform LawsuitsClaim.com from a functional but basic Tailwind template into a premium, credible legal information publication. The site is an independent plain-English publisher — not a law firm, not a lead-gen site, not a law firm referral network. Every design and content decision must reinforce that positioning.

Secondary goal: pass AdSense review by establishing trust signals, creating `ads.txt`, updating legal pages, and removing deceptive patterns.

---

## 2. Tech Stack (No Changes)

- Next.js 16.2.7 App Router
- React 19, TypeScript
- Tailwind CSS v4 + `@tailwindcss/typography`
- Lucide React icons
- Inter (sans) + Source Serif 4 (serif) — existing fonts, keep them
- Content: local `.md` files in `/content/[category]/[slug].md`
- Hosting: Vercel

New dependencies to add:
- `unified`, `remark-parse`, `remark-gfm`, `remark-rehype`, `rehype-stringify`, `rehype-slug`

---

## 3. Markdown Rendering Pipeline

### Problem
Article pages use `content.split("\n\n")` with manual `##`/`###` regex detection. Lists, bold, inline code, blockquotes, horizontal rules, and tables do not render.

### Solution — `lib/markdown.ts`
Server-side pipeline using `unified`:

```
unified()
  → remark-parse
  → remark-gfm        (tables, task lists, strikethrough)
  → remark-rehype     (convert to hast, no raw HTML passthrough)
  → rehype-slug       (id="" attributes on h2/h3/h4 for TOC anchors)
  → rehype-stringify
  → HTML string
```

Export: `renderMarkdownToHtml(markdown: string): Promise<string>`

**Security:** `rehype-raw` is NOT used. No user-submitted HTML. Content is local repository files only.

### Table of Contents
Extract headings from the raw markdown string before rendering (regex on `^#{2,3} ` lines). This gives clean anchor targets without parsing the HTML output. Pairs with `rehype-slug` for stable `id=""` attributes.

### Article Page
Replace the `split("\n\n")` block with `dangerouslySetInnerHTML={{ __html: html }}` inside the existing `prose prose-lg` container. The Tailwind Typography plugin handles all prose styling automatically.

---

## 4. Design System Additions

Extend `globals.css` `@theme` block:

| Token | Value | Use |
|-------|-------|-----|
| `--color-warm-paper` | `#faf9f6` | Off-white page backgrounds, hero |
| `--color-amber-accent` | `#b45309` | Scam warning, gold accent |
| `--color-amber-bg` | `#fef3c7` | Warning section backgrounds |
| `--color-navy-950` | `#0a1628` | Existing, keep |
| `--color-surface-2` | `#f1f5f9` | Subtle alternating sections |

Typography additions:
- Blockquotes styled as editorial callout boxes (left border + tinted background)
- Tables: responsive wrapper, clean borders
- Code: monospace with subtle tint

---

## 5. Component Changes

### Header
- Add `backdrop-blur-sm bg-white/95` on scroll (CSS-only, no JS dependency)
- Add `"Independent Legal Information"` trust badge alongside logo (desktop only, hidden below md)
- Add About link to nav (already in CTA; move to nav, change CTA to "Editorial Policy" or remove CTA)
- Implement mobile menu: `useState` toggle, slide-down nav panel, close on outside click
- Keep sticky top-0 z-50

### Footer
- No structural change needed — already has all 3 columns + disclaimer
- Visual upgrade: improve spacing, ensure disclaimer text meets WCAG AA contrast on navy background
- Add `--font-serif` to the brand name in footer

### ArticleCard
- Already has category pill, readingTime, updatedAt — keep
- Visual upgrade: stronger title hover, border-left accent on hover, slightly taller min-height

### CategoryCard (new design)
- Larger cards (min-height ~160px)
- Icon in a colored circle, not just a plain box
- "Explore guides →" micro-CTA at bottom
- Stronger description text
- Hover: border color shift + subtle shadow

### NewsletterSignup → renamed to `LearnMoreSection`
- Remove dark navy background slab
- Replace with a two-CTA warm section: "Explore Latest Guides" + "Read Our Editorial Policy"
- Title: "Build Confidence Before You Act"

---

## 6. Page-by-Page Changes

### Homepage (`app/page.tsx`)
1. **Hero**: warm off-white `bg-warm-paper` background, grid texture via CSS background-image, two-column layout (already exists), trust row below hero (4 pills: Independent publisher / Plain-English guides / Source-based research / No compensation promises)
2. **Browse by Topic**: redesigned CategoryCard grid
3. **Featured Guides**: asymmetric layout — large featured card left, 2 smaller cards right on desktop; 3-column grid on smaller screens
4. **Scam Warning**: upgrade yellow box — add 3 red flag pills inside the card
5. **How We Create Our Guides**: upgrade editorial cards — icons in colored circles, better spacing
6. **Learn More Section**: replace NewsletterSignup with LearnMoreSection

### Category Page (`app/[category]/page.tsx`)
1. Premium hero strip: category name, description, icon, breadcrumb
2. "Start here" featured article (first article, larger card)
3. Article grid (remaining articles)
4. Related categories sidebar strip at bottom
5. Legal disclaimer strip at bottom
6. Remove "Guides coming soon." fallback — categories with no content are removed from registry

### Article Page (`app/[category]/[slug]/page.tsx`)
1. Breadcrumbs (already exist)
2. Category pill + reading time + updated date (already exist)
3. Title (already exists)
4. Short summary/excerpt (already exists)
5. Author line: "LawsuitsClaim Editorial Team"
6. Top disclaimer box (`ArticleDisclaimer` — already exists)
7. **Table of Contents** (new — extracted from headings, sticky on desktop)
8. **Article body** with remark/rehype rendered HTML + prose styling
9. Bottom disclaimer (already exists)
10. **Related Guides** (new — 3 articles from same category, excluding current)

### Static Pages (`app/(static)/`)
All static pages currently use a bare `<article>` with prose layout — no visual structure beyond typography. Upgrade:
- Add breadcrumb trail at top
- About: structured sections with visual dividers, "What We Are / What We Are Not" table-style layout
- Editorial Policy: visually structured, no content changes needed
- Privacy Policy: add explicit AdSense/advertising cookies section
- Cookie Policy: add explicit Google third-party vendor section
- Layout wrapper: keep prose but add top padding for breadcrumbs

### About Page
Full structural rewrite matching spec:
- What LawsuitsClaim.com is
- What it is not (clean list)
- Editorial standards
- No legal advice / no compensation promises (explicit)
- How to contact for corrections
- Who publishes: LawsuitsClaim Editorial Team

---

## 7. AdSense Readiness

### `public/ads.txt`
```
google.com, pub-1553579698682940, DIRECT, f08c47fec0942fa0
```

### Root layout meta tag
```html
<meta name="google-adsense-account" content="ca-pub-1553579698682940" />
```
Added to `app/layout.tsx` metadata `other` field (Next.js `<head>` injection).

### Privacy Policy update
Add section: "Advertising and Third-Party Vendors" — mentions Google may use cookies for advertising when ads are enabled, links to Google Ad Settings.

### Cookie Policy update  
Add explicit paragraph about Google AdSense advertising cookies and opt-out.

### `docs/ADSENSE_READINESS_CHECKLIST.md`
Created per spec — checklist of all readiness items with pass/fail status.

---

## 8. Data / Registry Cleanup

### Remove dead categories from `lib/categories.ts`
Remove: `settlements`, `legal-basics`, `resources` — no content directories exist.

### Sitemap (`app/sitemap.ts`)
Verify it only generates URLs for categories that have content. After category cleanup this should be automatic.

### Robots (`app/robots.ts`)
Verify `allow: ["/"]` is present.

---

## 9. Content Trust Cleanup

Grep the entire content directory for risky phrases and rewrite:
- "guarantee" → "may", "can", "often"  
- "qualified for compensation" → removed
- "you are eligible" → "you may be eligible depending on the situation"
- "get paid" → removed
- "free case review" → removed
- "legal advice" (when used as offering it) → "general information"

Allowed safe phrasing list: "general information", "may", "can", "often", "depending on the situation", "consider speaking with a licensed attorney", "verify official sources", "laws vary by jurisdiction"

---

## 10. SEO / Schema

No structural changes needed — schema is already present for `Article`, `BreadcrumbList`, `Organization`, `WebSite`. Verify:
- All metadata titles are unique (check duplicates)
- Canonical URLs use `https://lawsuitsclaim.com`
- OG metadata present on article pages (already implemented)

---

## 11. Performance & Accessibility Constraints

- No JS animation libraries
- CSS/Tailwind transitions only (`transition-colors`, `transition-shadow`)
- Mobile menu toggle via `useState` — no heavy libraries
- All images/icons use `aria-hidden="true"`
- Keyboard navigable header: focus ring on all interactive elements
- Strong contrast: body text on backgrounds must pass WCAG AA (4.5:1)
- Mobile-first responsive at all breakpoints

---

## 12. What We Are NOT Building

- AdSense ad units (no `<ins class="adsbygoogle">`)
- Auto Ads script
- Lead generation forms
- Case review forms
- Settlement calculators
- Fake attorney bios
- Fake credentials / awards
- Email newsletter with backend
- Push notifications
- MDX content pipeline
- Custom markdown parser

---

## 13. Required Additions (Approved 2026-06-06)

### 13a. Markdown Safety Rule
Do not render raw HTML from markdown under any circumstance. `rehype-raw` must never be added. Markdown files are editorial content only — inline HTML is not supported. The pipeline must reject or ignore any raw HTML nodes encountered during parsing. This is a hard constraint, not a preference.

### 13b. External Link Policy
Official source links must be visually distinct from body text — use the existing `prose-a:text-brand-blue` styling. All external links (links beginning with `http://` or `https://`) must carry `target="_blank" rel="noopener noreferrer"`. This can be achieved via a `rehype` plugin that rewrites external link attributes during the render pipeline. External links must not visually resemble ads or CTAs — plain underlined blue text only, no buttons, no call-to-action framing.

### 13c. Post-Renderer Content Audit
After replacing the naive markdown renderer, manually inspect at least 10 articles across all 5 categories and correct:
- Broken list formatting (missing blank lines before lists, inconsistent indentation)
- Duplicate headings or headings used as decorative separators
- Blockquote syntax issues (`>` without proper spacing)
- FAQ sections that are not using proper heading hierarchy
- Tables with misaligned columns or missing separator rows
- Bad spacing between sections
- Any article that uses raw HTML instead of markdown syntax

Fix issues in the `.md` source files, not in the renderer. The renderer should be generic; content quality lives in the files.

### 13d. Removed-Category URL Handling
`settlements`, `legal-basics`, and `resources` are being removed from the category registry. Steps required:
1. Remove from `lib/categories.ts` `CATEGORIES` array
2. Remove from sitemap (will be automatic once removed from registry)
3. Search all 43 content `.md` files and `app/` pages for internal links to `/settlements`, `/legal-basics`, `/resources` — rewrite or remove each one
4. Add Next.js redirects in `next.config.ts` for any of these three slugs that might have been indexed:
   - `/settlements` → `/class-actions`
   - `/legal-basics` → `/class-actions/what-is-a-class-action-lawsuit`
   - `/resources` → `/consumer-protection`
5. If the category pages were never deployed or indexed, the redirects are still safe to add and add no cost.

### 13e. Mobile Visual QA
After completing the redesign, manually verify the following at four viewport widths — 390px, 768px, 1024px, and 1280px+:
- Homepage: hero layout, category cards, featured guides grid, scam warning section, editorial cards, footer
- Category pages: hero, article grid, disclaimer strip
- Article pages: breadcrumbs, TOC (collapsed or hidden on mobile), body prose, disclaimer boxes, related guides
- Static legal pages: heading hierarchy, prose readability, link visibility
- Header: mobile menu opens and closes correctly, all nav links reachable by tap
- Footer: all columns stack correctly, disclaimer text is readable, copyright visible

The site must feel premium and readable on mobile — not just a collapsed desktop layout.

### 13f. Final AdSense Crawl Checklist
Before marking the implementation complete, verify each item passes:
- [ ] `/ads.txt` returns HTTP 200 with correct publisher ID content
- [ ] `/sitemap.xml` returns HTTP 200 with no removed-category URLs
- [ ] `/robots.txt` returns HTTP 200 and allows crawling
- [ ] No `settlements`, `legal-basics`, or `resources` URLs appear in sitemap
- [ ] No empty category pages (categories with zero articles are not in nav or sitemap)
- [ ] No placeholder text ("lorem ipsum", "coming soon", "TBD") anywhere on the site
- [ ] No case review forms, settlement calculators, or lead-gen forms exist
- [ ] Zero browser console errors on homepage, category page, and article page
- [ ] No broken internal links (all href values resolve to real pages)
- [ ] Legal disclaimer text passes WCAG AA contrast on every background it appears on
- [ ] No `<ins class="adsbygoogle">` or AdSense script tags anywhere in the codebase

This checklist maps to `docs/ADSENSE_READINESS_CHECKLIST.md` which is created as a deliverable.

---

## 14. Delivery Order

1. Markdown pipeline (`lib/markdown.ts` + article page update)
2. Design system tokens + globals.css
3. Header (premium + mobile menu)
4. Footer (visual upgrade)
5. Homepage sections
6. CategoryCard redesign
7. ArticleCard upgrade
8. Category pages
9. Article pages (TOC, related guides, author line)
10. Static pages (About, Editorial Policy, Privacy, Cookie)
11. AdSense files (ads.txt, meta tag, checklist)
12. Registry cleanup (remove dead categories)
13. Content trust cleanup (grep + rewrite)
14. lint + build verification

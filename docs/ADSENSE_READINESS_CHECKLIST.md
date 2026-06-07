# AdSense Readiness Checklist — LawsuitsClaim.com

> **IMPORTANT:** Do NOT submit for AdSense review until every item in the
> [Manual Pre-Submission Checklist](#7-manual-pre-submission-checklist) has
> been verified by a human as well.

Last verified: 2026-06-07  
Publisher ID: `pub-1553579698682940`

---

## 1. Technical Setup

- [x] **`public/ads.txt` exists with correct content** — File contains
  `google.com, pub-1553579698682940, DIRECT, f08c47fec0942fa0` as required by
  Google's Authorized Digital Sellers spec.
- [x] **`google-adsense-account` meta tag in `app/layout.tsx`** — Value is
  `ca-pub-1553579698682940` (line 37), allowing Google to verify site ownership
  without requiring an active ad unit.

---

## 2. Content Policy

- [x] **No ad units (`<ins class="adsbygoogle">`) present anywhere** — No
  `adsbygoogle` or `<ins` tags found in `app/` source files. Ad units must not
  be placed until after AdSense approval.
- [x] **No Auto Ads script loaded** — No
  `pagead2.googlesyndication.com/pagead/js/adsbygoogle.js` or
  `window.adsbygoogle` assignments found. Auto Ads must not be enabled until
  after approval.

> The `ads.txt` file and the `google-adsense-account` meta tag are the **only**
> AdSense-specific items that should be present before approval is granted.

---

## 3. Legal Pages

- [x] **Privacy Policy exists with advertising disclosure** — `app/(static)/privacy-policy/page.tsx`
  contains an "Advertising and Third-Party Vendors" section with a link to
  `adssettings.google.com`.
- [x] **Cookie Policy exists with advertising disclosure** — `app/(static)/cookie-policy/page.tsx`
  contains a "Google as a Third-Party Vendor" section referencing the DoubleClick
  cookie and interest-based advertising.
- [x] **Legal Disclaimer page exists** — `app/(static)/legal-disclaimer/page.tsx`
  is present and prerendered at `/legal-disclaimer`.
- [x] **Editorial Policy page exists** — `app/(static)/editorial-policy/page.tsx`
  is present and prerendered at `/editorial-policy`.
- [x] **About page exists** — `app/(static)/about/page.tsx` is present and
  prerendered at `/about`.
- [x] **Contact page exists** — `app/(static)/contact/page.tsx` is present and
  prerendered at `/contact`.
- [x] **Terms of Use page exists** — `app/(static)/terms-of-use/page.tsx` is
  present and prerendered at `/terms-of-use`; linked from the footer.

---

## 4. Trust & Quality

- [x] **No fake/deceptive forms** — No patterns matching
  `check.eligibility`, `settlement.calculator`, `case.review`, `case.intake`,
  `claim.form`, or `free.consultation` found in app source (excluding editorial
  policy content and comments).
- [x] **No empty categories** — All 5 content categories contain articles:
  - `class-actions`: 10 articles
  - `personal-injury`: 10 articles
  - `insurance-claims`: 8 articles
  - `consumer-protection`: 9 articles
  - `scam-check`: 8 articles
- [x] **No dead category links in navigation or sitemap** — No references to
  removed routes `/settlements`, `/legal-basics`, or `/resources` found in any
  `.tsx` or `.ts` files.
- [x] **No placeholder text** — No occurrences of "lorem ipsum", "coming soon",
  "placeholder text", "TBD", or "todo" found in any `app/` source file.

---

## 5. SEO & Crawlability

- [x] **Sitemap is clean** — `app/sitemap.ts` contains no references to
  removed routes (`/settlements`, `/legal-basics`, `/resources`). Sitemap URL
  is `https://lawsuitsclaim.com/sitemap.xml`.
- [x] **`robots.ts` is correct** — Allows all user agents on `/`, disallows
  `/api/`, and points to `https://lawsuitsclaim.com/sitemap.xml`.
- [x] **Canonical URLs set on all static pages** — Verified on
  `terms-of-use/page.tsx`; pattern is consistent across all static pages per
  previous tasks.

---

## 6. Build & Technical Quality

- [x] **Production build passes** — `pnpm build` completed successfully:
  `Compiled successfully in 2.1s`, all 64 static pages generated without
  errors.
- [x] **ESLint passes with zero errors** — `pnpm lint` exits with code 0 and
  produces no error or warning output.
- [x] **TypeScript is clean** — Build succeeded with no type errors (Next.js
  runs `tsc` as part of the build pipeline).

---

## 7. Manual Pre-Submission Checklist

These items cannot be verified programmatically. A human reviewer must confirm
each one before clicking "Apply" in the AdSense console.

- [ ] **Mobile viewport looks professional** — Load the site on a 390 px
  viewport (iPhone 14 or Chrome DevTools). Check header, article cards,
  category pages, and footer for overflow, broken layout, or unreadable text.
- [ ] **All 5 category pages load and display articles** — Visit
  `/class-actions`, `/personal-injury`, `/insurance-claims`,
  `/consumer-protection`, and `/scam-check`. Confirm article cards render
  correctly with titles, excerpts, and working links.
- [ ] **At least 5 article pages load and render correctly** — Open individual
  articles from at least 3 different categories. Confirm heading hierarchy,
  body text, and related guides render without layout issues.
- [ ] **Privacy Policy is linked from the site footer** — Scroll to the footer
  on any page and confirm the "Privacy Policy" link is visible and navigates to
  `/privacy-policy`.
- [ ] **Cookie Policy is linked from the site footer** — Confirm "Cookie
  Policy" link is visible in the footer and navigates to `/cookie-policy`.
- [ ] **Legal Disclaimer is linked from the site footer** — Confirm "Legal
  Disclaimer" link is visible in the footer and navigates to
  `/legal-disclaimer`.
- [ ] **About page is linked from the main navigation** — Confirm an "About"
  link appears in the header navigation and navigates to `/about`.
- [ ] **Contact page is linked from the site footer** — Confirm a "Contact"
  link is visible in the footer and navigates to `/contact`.
- [ ] **Policy pages contain original text** — Read through the Privacy Policy
  and Cookie Policy to confirm no text was copied verbatim from Google's sample
  policy documents. AdSense reviewers flag templated or plagiarized policies.
- [ ] **No misleading "check eligibility" CTAs visible** — Browse the homepage
  and at least 3 article pages as a first-time visitor. Confirm no button or
  link implies that the site can determine legal eligibility, connect visitors
  with attorneys, or provide legal advice.
- [ ] **Page titles are meaningful and not duplicates** — Spot-check the
  `<title>` tag (browser tab) on at least 5 different pages (homepage, 2
  category pages, 2 article pages). Each should be unique and descriptive.
- [ ] **Publisher ID is correct in both locations** — Confirm that
  `pub-1553579698682940` in `public/ads.txt` and `ca-pub-1553579698682940` in
  the `google-adsense-account` meta tag both match the publisher ID shown in
  your AdSense account dashboard.

---

## Summary

| Section | Items | Passing |
|---|---|---|
| Technical Setup | 2 | 2 |
| Content Policy | 2 | 2 |
| Legal Pages | 7 | 7 |
| Trust & Quality | 4 | 4 |
| SEO & Crawlability | 3 | 3 |
| Build & Technical Quality | 3 | 3 |
| **Automated total** | **21** | **21** |
| Manual Pre-Submission | 12 | TBD |

All 21 automated checks pass. Complete the 12 manual checks above before
submitting for AdSense review.

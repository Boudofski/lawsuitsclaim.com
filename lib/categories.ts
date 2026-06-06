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

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

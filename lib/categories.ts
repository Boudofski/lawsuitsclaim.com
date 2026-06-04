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

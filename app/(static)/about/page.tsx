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
        <li>
          We are <strong>not a law firm</strong>.
        </li>
        <li>
          We do <strong>not offer legal advice</strong>.
        </li>
        <li>
          We do <strong>not represent clients</strong>.
        </li>
        <li>
          We do{" "}
          <strong>
            not guarantee settlement eligibility, amounts, or outcomes
          </strong>
          .
        </li>
        <li>
          We do <strong>not collect sensitive legal case details</strong>.
        </li>
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
        do not invent or exaggerate credentials. We do not list fake bar
        memberships, awards, or legal credentials.
      </p>

      <h2>Contact Us</h2>
      <p>
        For corrections, feedback, or general inquiries, visit our{" "}
        <a href="/contact">Contact page</a>.
      </p>
    </article>
  );
}

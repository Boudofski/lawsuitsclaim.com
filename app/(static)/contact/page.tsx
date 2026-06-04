import type { Metadata } from "next";
import { AlertCircle } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact LawsuitsClaim",
  description:
    "Contact the LawsuitsClaim editorial team for corrections, feedback, or general inquiries.",
  alternates: { canonical: "https://lawsuitsclaim.com/contact" },
};

export default function ContactPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-navy-900 mb-4">Contact Us</h1>
      <p className="text-navy-800 leading-relaxed mb-6">
        For corrections, content feedback, or general inquiries, use the form
        below. We aim to respond within 3 business days.
      </p>

      <div className="flex gap-3 p-4 bg-warning-bg border border-warning-border rounded-lg text-sm text-navy-800 mb-8">
        <AlertCircle
          className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <p>
          <strong>We cannot provide legal advice.</strong> If you need help with
          a specific legal matter, please consult a licensed attorney in your
          state. We cannot evaluate your case or tell you whether you qualify for
          a settlement.
        </p>
      </div>

      <ContactForm />
    </div>
  );
}

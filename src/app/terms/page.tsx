import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

const sections = [
  {
    title: "Use Of The Website",
    body: [
      "This website presents Aurum Atelier, its model families, materials, archive frames, and private commission process. You may browse the website for personal, informational, and commission inquiry purposes only.",
      "You agree not to misuse the website, attempt to disrupt its operation, submit false or misleading information, or use the site in a way that violates applicable law or the rights of others.",
    ],
  },
  {
    title: "Private Commission Requests",
    body: [
      "Submitting a commission brief does not create a purchase agreement, guarantee acceptance, reserve production capacity, or confirm pricing. A commission begins only after Aurum reviews the brief and both parties agree to separate written terms.",
      "Aurum may decline, pause, or request clarification on any commission inquiry at its discretion, including where the brief is incomplete, technically impractical, commercially unsuitable, or inconsistent with the house standards.",
    ],
  },
  {
    title: "No Published Pricing",
    body: [
      "Aurum does not publish fixed prices because each watch may change according to material, movement, finishing, engraving, strap configuration, development time, and service requirements.",
      "Any estimate, proposal, or production schedule is provided separately and may be subject to its own terms, deposit structure, tax treatment, delivery conditions, and cancellation rules.",
    ],
  },
  {
    title: "Website Content",
    body: [
      "The images, renderings, illustrations, text, product names, interface designs, archive captions, and visual materials on this website are provided for presentation and informational purposes.",
      "Model families, material descriptions, archive frames, and customization examples do not guarantee that a specific design, feature, material, finish, or configuration will be available for every client or every jurisdiction.",
    ],
  },
  {
    title: "Intellectual Property",
    body: [
      "The website design, brand elements, copy, images, layouts, graphics, and other content are owned by Aurum or its licensors and are protected by intellectual property laws.",
      "You may not copy, reproduce, modify, distribute, scrape, commercially exploit, or use website content to train, promote, or sell another product or service without written permission.",
    ],
  },
  {
    title: "Client Materials",
    body: [
      "If you submit references, symbols, initials, artwork, family marks, mottoes, photographs, or other materials, you confirm that you have the right to share them and to request that they be considered for a commission.",
      "You remain responsible for ensuring that submitted materials do not infringe third-party rights, violate privacy obligations, or include unlawful, offensive, or restricted content.",
    ],
  },
  {
    title: "Accuracy And Availability",
    body: [
      "We aim to keep website information accurate and current, but errors, omissions, display differences, or availability changes may occur.",
      "Aurum may update, remove, suspend, or modify website content, pages, features, forms, or archive materials at any time without prior notice.",
    ],
  },
  {
    title: "Third-Party Services",
    body: [
      "The website may rely on third-party services for hosting, analytics, email, forms, maps, scheduling, or other functionality. Those services may have their own terms and policies.",
      "Aurum is not responsible for external websites, third-party platforms, or services that are not controlled by Aurum.",
    ],
  },
  {
    title: "Disclaimers And Liability",
    body: [
      "The website is provided on an as-is and as-available basis. To the fullest extent permitted by law, Aurum disclaims warranties related to uninterrupted access, error-free operation, or exact visual reproduction of materials and finishes.",
      "To the fullest extent permitted by law, Aurum will not be liable for indirect, incidental, consequential, special, punitive, or loss-of-profit damages arising from use of the website or reliance on website content.",
    ],
  },
  {
    title: "Changes To These Terms",
    body: [
      "Aurum may update these terms from time to time. The updated date on this page indicates the latest revision.",
      "Continued use of the website after changes are posted means you accept the revised terms. If you do not agree with the terms, you should stop using the website.",
    ],
  },
  {
    title: "Contact",
    body: [
      "For questions about these terms, contact Aurum Atelier at commissions@aurum.ch or Rue du Rhone 48, Geneva, 1204.",
      "Any final commission agreement, invoice, production schedule, warranty, service commitment, or delivery document will be handled separately from these website terms.",
    ],
  },
];

export const metadata: Metadata = {
  title: "AURUM - Terms",
  description:
    "Website terms for Aurum Atelier private watch commission inquiries.",
};

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Terms"
      title="Terms for using the Aurum website and commission room."
      intro="These terms explain how the website may be used, how private commission inquiries are handled, and what is separate from a final bespoke watch agreement."
      updatedAt="April 11, 2026"
      sections={sections}
    />
  );
}

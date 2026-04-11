import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

const sections = [
  {
    title: "Information We Collect",
    body: [
      "When you submit a commission brief, we may collect details such as your name, email address, phone number, location, wrist measurements, model preferences, material preferences, engraving notes, reference descriptions, and any other information you choose to include.",
      "We may also receive basic technical information from your browser, including device type, approximate location, pages viewed, referring pages, and general usage data. This helps us maintain the website and understand how visitors move through the experience.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "We use submitted information to review commission requests, prepare private proposals, respond to inquiries, schedule consultations, maintain client records, and improve the quality of the website and commission process.",
      "We do not sell personal information. We do not use commission brief details to create public case studies without permission from the client.",
    ],
  },
  {
    title: "Commission Brief Confidentiality",
    body: [
      "A bespoke watch brief may include personal symbols, initials, family references, dates, inscriptions, or design inspiration. We treat these materials as confidential project information.",
      "Access to commission information is limited to the people and service providers who reasonably need it to evaluate, manage, or fulfill the requested atelier process.",
    ],
  },
  {
    title: "Service Providers",
    body: [
      "We may use trusted service providers for hosting, analytics, form handling, email delivery, file storage, scheduling, payment administration, or security. These providers are expected to process information only as needed to support the website or commission workflow.",
      "If a final production partner, specialist artisan, logistics provider, or service workshop needs relevant project information, only the necessary details will be shared.",
    ],
  },
  {
    title: "Cookies And Analytics",
    body: [
      "The website may use cookies or similar technologies to support basic functionality, measure site performance, and understand how visitors interact with pages.",
      "You can usually manage cookies through your browser settings. Blocking some cookies may affect website behavior or form functionality.",
    ],
  },
  {
    title: "Data Retention",
    body: [
      "We keep personal information only as long as reasonably necessary for the purposes described in this policy, including inquiry review, commission records, legal obligations, service history, and security.",
      "If a commission does not proceed, brief information may still be retained for a limited period to manage follow-up questions, prevent duplicate submissions, and preserve internal records.",
    ],
  },
  {
    title: "Your Choices",
    body: [
      "You may request access, correction, or deletion of your personal information by contacting us. We may need to retain certain records when required for legal, security, accounting, or legitimate business reasons.",
      "You may opt out of non-essential communications at any time. Commission-related messages, service notices, and direct replies to your inquiries may still be sent when necessary.",
    ],
  },
  {
    title: "Security",
    body: [
      "We use reasonable technical and organizational measures to protect submitted information. No website, form, or transmission method is completely secure, so we cannot guarantee absolute security.",
      "Please avoid sending highly sensitive personal, financial, or identity documents through the commission form unless specifically requested through a secure channel.",
    ],
  },
  {
    title: "International Visitors",
    body: [
      "If you access the website from outside the jurisdiction where Aurum operates, your information may be processed in a different country from where you live.",
      "By submitting information through the website, you understand that it may be transferred, stored, and processed where our service providers or operations are located.",
    ],
  },
  {
    title: "Contact",
    body: [
      "For privacy questions or requests, contact Aurum Atelier at commissions@aurum.ch or Rue du Rhone 48, Geneva, 1204.",
      "This policy may be updated from time to time. The updated date on this page indicates the latest revision.",
    ],
  },
];

export const metadata: Metadata = {
  title: "AURUM - Privacy Policy",
  description:
    "Privacy policy for Aurum Atelier private watch commission inquiries.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      eyebrow="Privacy Policy"
      title="How Aurum handles private commission information."
      intro="This policy explains what information may be collected through the website, how commission brief details are used, and how clients can contact the atelier about privacy requests."
      updatedAt="April 11, 2026"
      sections={sections}
    />
  );
}

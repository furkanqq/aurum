import type { Metadata } from "next";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const faqGroups = [
  {
    eyebrow: "Commission & Pricing",
    title: "Before The Brief",
    questions: [
      {
        question: "Why are there no public prices?",
        answer:
          "Aurum does not sell fixed catalog references. Case metal, dial work, movement direction, engraving, strap specification, production cadence, and service scope can change per client, so a public price would be misleading before the object is defined.",
      },
      {
        question: "Does submitting the form reserve a watch?",
        answer:
          "No. The form creates a private dossier for review. A commission only begins after the atelier accepts the brief, clarifies the specification, and both sides agree to separate private terms.",
      },
      {
        question: "Can Aurum decline a project?",
        answer:
          "Yes. A brief may be declined if it is technically impractical, too vague to evaluate, outside the house language, or not aligned with the standards required for a long-term handmade object.",
      },
    ],
  },
  {
    eyebrow: "Design Language",
    title: "Model & Material",
    questions: [
      {
        question: "Are the six models final products or starting points?",
        answer:
          "They are starting points. Each family gives the commission a silhouette and attitude, but the final watch can shift through metal, dial texture, typography, hand profile, strap direction, and personal signatures.",
      },
      {
        question: "Can a client bring personal symbols or references?",
        answer:
          "Yes. Initials, dates, family marks, architecture, wardrobe references, artworks, heirloom objects, and private phrases can inform the commission. The atelier translates them into watch language rather than placing them randomly.",
      },
      {
        question: "What if the client does not know which material to choose?",
        answer:
          "That is expected. The form allows open answers because the atelier can recommend metal, dial mood, and strap direction after understanding wrist size, use case, and the emotional reason for the watch.",
      },
    ],
  },
  {
    eyebrow: "Making & Delivery",
    title: "Timeline",
    questions: [
      {
        question: "How long does a commission take?",
        answer:
          "The timeline depends on complexity, material decisions, supplier availability, engraving, and review cadence. The site avoids promising a universal delivery window because a handmade private object should be scheduled after the specification is known.",
      },
      {
        question: "What happens after the form is submitted?",
        answer:
          "The answers are sent to the atelier desk as a PDF dossier. The first review checks model direction, missing details, technical feasibility, and whether the brief is ready for a private consultation.",
      },
      {
        question: "Will the client see progress during production?",
        answer:
          "Aurum treats progress updates as part of the commission experience. The exact cadence depends on the project, but review points usually happen around design approval, material resolution, assembly, and final presentation.",
      },
    ],
  },
  {
    eyebrow: "Privacy & Ownership",
    title: "Private Details",
    questions: [
      {
        question: "Are commission details kept private?",
        answer:
          "Yes. Personal inscriptions, family symbols, dates, references, and private notes are treated as confidential project information. Public case studies or archive use should require client permission.",
      },
      {
        question: "Can a client request a completely anonymous commission?",
        answer:
          "The public-facing side can remain anonymous, but the atelier still needs enough private information to manage the project responsibly, prepare documentation, and support future service.",
      },
      {
        question: "Who owns the submitted design references?",
        answer:
          "The client remains responsible for the references they submit. Aurum uses them only to evaluate and develop the commission direction, subject to final project terms.",
      },
    ],
  },
  {
    eyebrow: "Care & Stewardship",
    title: "After Delivery",
    questions: [
      {
        question: "What does long-term stewardship mean?",
        answer:
          "It means the watch is treated as a living object after delivery. Service registration, care guidance, strap changes, future refinishing questions, and documentation remain part of the ownership experience.",
      },
      {
        question: "Can straps or details be changed later?",
        answer:
          "Strap changes are usually part of the ownership path. Case, dial, movement, and engraving changes are more serious and would need to be reviewed as a service or modification request.",
      },
      {
        question: "Is the watch intended as a daily object or an heirloom?",
        answer:
          "Either can be valid. The brief should make that clear because daily wear, ceremonial wear, and heirloom intent lead to different choices in metal, finishing, strap, and service expectations.",
      },
    ],
  },
];

const quickAnswers = [
  { label: "Public pricing", value: "No" },
  { label: "Private dossier", value: "Yes" },
  { label: "Custom engraving", value: "Reviewed" },
  { label: "Stock inventory", value: "No" },
];

export const metadata: Metadata = {
  title: "AURUM - FAQ",
  description:
    "Frequently asked questions about Aurum private watch commissions, pricing, materials, privacy, timelines, and long-term care.",
};

export default function FaqPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="relative min-h-screen bg-[#050508]">
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.028]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px 128px",
          }}
        />

        <section className="relative isolate overflow-hidden pt-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-10rem] top-[-6rem] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.12),transparent_62%)] blur-[105px]" />
            <div className="absolute right-[-10rem] top-[13rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(180,192,210,0.08),transparent_66%)] blur-[110px]" />
            <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:64px_64px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-8 pb-20 md:px-12 md:pb-24">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70" />
              <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-gold/60">
                Commission FAQ
              </p>
            </div>

            <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-end">
              <div className="max-w-4xl">
                <h1 className="font-display text-[clamp(3.8rem,8.5vw,5.5rem)] font-light leading-[0.88] text-pearl">
                  Clear answers before the private room opens.
                </h1>
                <div className="mt-8 h-px w-24 bg-gradient-to-r from-gold/60 to-transparent" />
                <p className="mt-8 max-w-2xl font-body text-[18px] italic leading-[1.8] text-mist/80">
                  A handmade commission should feel personal, not mysterious.
                  These answers explain pricing logic, design freedom, privacy,
                  timing, and care before a client sends the dossier.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[30px] border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-white/[0.02] p-6">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(201,169,110,0.18),transparent_48%)]" />
                <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-gold/40" />
                <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-gold/40" />

                <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.38em] text-gold/60">
                  Quick Read
                </p>
                <div className="space-y-3">
                  {quickAnswers.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-end justify-between gap-4 border-b border-gold/[0.10] pb-3 last:border-b-0 last:pb-0"
                    >
                      <span className="font-body text-[16px] italic text-pearl/82">
                        {item.label}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold/65">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 font-body text-[15px] italic leading-7 text-mist/76">
                  If the answer changes by project, the FAQ says so. That is the
                  point of a private commission model.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 pb-20">
          <div className="mx-auto grid max-w-7xl gap-6 px-8 md:px-12 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[330px_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
              <div className="max-h-[calc(100vh-8rem)] overflow-y-auto rounded-[30px] border border-gold/[0.12] bg-[#08070c]/90 p-6">
                <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/55">
                  Question Index
                </p>
                <div className="space-y-3">
                  {faqGroups.map((group, index) => (
                    <a
                      key={group.title}
                      href={`#${group.title.toLowerCase().replaceAll(" ", "-")}`}
                      className="group flex items-start gap-3 border-t border-gold/[0.10] pt-3 first:border-t-0 first:pt-0"
                    >
                      <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold/50">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>
                        <span className="block font-display text-2xl font-light text-pearl transition-colors duration-300 group-hover:text-gold">
                          {group.title}
                        </span>
                        <span className="font-body text-[13px] italic text-mist/55">
                          {group.eyebrow}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            <div className="space-y-6">
              {faqGroups.map((group, groupIndex) => (
                <section
                  key={group.title}
                  id={group.title.toLowerCase().replaceAll(" ", "-")}
                  className="scroll-mt-28 rounded-[32px] border border-gold/[0.12] bg-[#08070c]/90 p-6 md:p-8"
                >
                  <div className="mb-6 flex flex-col gap-2 border-b border-gold/[0.10] pb-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/55">
                        {group.eyebrow}
                      </p>
                      <h2 className="font-display text-5xl font-light text-pearl">
                        {group.title}
                      </h2>
                    </div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-mist/45">
                      {String(group.questions.length).padStart(2, "0")} Answers
                    </p>
                  </div>

                  <div className="space-y-3">
                    {group.questions.map((item, itemIndex) => (
                      <details
                        key={item.question}
                        open={groupIndex === 0 && itemIndex === 0}
                        className="group rounded-[24px] border border-gold/[0.10] bg-white/[0.025] p-5 transition-colors duration-300 open:border-gold/30 open:bg-gold/[0.045]"
                      >
                        <summary className="flex cursor-pointer list-none items-start justify-between gap-5 [&::-webkit-details-marker]:hidden">
                          <span className="font-display text-[28px] font-light leading-[1.05] text-pearl">
                            {item.question}
                          </span>
                          <span className="mt-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/25 font-mono text-[15px] text-gold transition-transform duration-300 group-open:rotate-45">
                            +
                          </span>
                        </summary>
                        <div className="mt-5 max-w-3xl border-t border-gold/[0.10] pt-5">
                          <p className="font-body text-[17px] italic leading-8 text-mist/78">
                            {item.answer}
                          </p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 pb-28">
          <div className="mx-auto max-w-7xl px-8 md:px-12">
            <div className="rounded-[34px] border border-gold/[0.12] bg-[#09080d]/90 p-7 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div>
                  <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/55">
                    Still Deciding
                  </p>
                  <h2 className="font-display text-5xl font-light text-pearl">
                    Read the process before starting the dossier.
                  </h2>
                  <p className="mt-5 max-w-2xl font-body text-[17px] italic leading-8 text-mist/76">
                    The process page explains what happens between the form,
                    consultation, approval, making, delivery, and future care.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/process"
                    className="inline-flex items-center justify-center border border-gold/[0.16] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-pearl transition-colors duration-300 hover:border-gold hover:text-gold"
                  >
                    View Process
                  </Link>
                  <Link
                    href="/commission"
                    className="inline-flex items-center justify-center border border-gold/35 bg-gold px-5 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-obsidian transition-colors duration-300 hover:bg-gold-light"
                  >
                    Begin Commission
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

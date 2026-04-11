import type { Metadata } from "next";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const processStages = [
  {
    step: "01",
    title: "Private Intake",
    duration: "48 hour review",
    body:
      "The commission begins with the dossier. We read the client profile, wrist details, model direction, material preferences, and personal references before any commercial discussion begins.",
    deliverables: ["Brief screening", "Model direction", "Clarification notes"],
  },
  {
    step: "02",
    title: "Atelier Consultation",
    duration: "Private call",
    body:
      "A short consultation turns loose preferences into design language. We calibrate how formal, technical, ceremonial, or discreet the watch should feel on the wrist.",
    deliverables: ["Use case", "Wrist presence", "Design vocabulary"],
  },
  {
    step: "03",
    title: "Design Translation",
    duration: "Proposal dossier",
    body:
      "The atelier translates the brief into case architecture, dial treatment, metal tone, strap direction, movement intent, and signature details.",
    deliverables: ["Material palette", "Dial language", "Signature zones"],
  },
  {
    step: "04",
    title: "Approval Gate",
    duration: "Client sign-off",
    body:
      "No production slot is reserved until the object is defined. This stage exists to prevent vague luxury language from turning into vague manufacturing.",
    deliverables: ["Final specification", "Timeline window", "Private terms"],
  },
  {
    step: "05",
    title: "Hand Assembly",
    duration: "Making cadence",
    body:
      "The approved brief moves to bench work: finishing, dial resolution, assembly, regulation, strap pairing, documentation, and final control.",
    deliverables: ["Bench notes", "Quality control", "Presentation setup"],
  },
  {
    step: "06",
    title: "Delivery & Stewardship",
    duration: "Long-term record",
    body:
      "The finished watch is delivered with a private record. Service expectations, future strap changes, and long-term care are treated as part of the commission.",
    deliverables: ["Archive record", "Care guidance", "Service registration"],
  },
];

const principles = [
  {
    label: "No public price list",
    text: "Price is discussed only after the brief has enough detail to be treated seriously.",
  },
  {
    label: "No production without approval",
    text: "The client sees the direction before the atelier commits the object to a making path.",
  },
  {
    label: "No public case study by default",
    text: "Private symbols, inscriptions, and personal references stay private unless permission is given.",
  },
];

const clientReceives = [
  {
    title: "A reviewed brief",
    text: "The submitted form becomes an internal PDF dossier, not a loose email thread.",
  },
  {
    title: "A design direction",
    text: "The atelier responds with the strongest model family, material logic, and questions worth clarifying.",
  },
  {
    title: "A controlled proposal",
    text: "Commercial terms are separated from early curiosity until the object is defined clearly.",
  },
  {
    title: "A service record",
    text: "The watch remains documented after delivery so ownership does not end at the sale.",
  },
];

export const metadata: Metadata = {
  title: "AURUM - Commission Process",
  description:
    "The private commission journey behind Aurum handmade mechanical watches, from dossier intake to long-term stewardship.",
};

export default function ProcessPage() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#050508]">
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
            <div className="absolute left-[-12rem] top-[-6rem] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.13),transparent_62%)] blur-[105px]" />
            <div className="absolute right-[-10rem] top-[12rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(182,190,205,0.08),transparent_66%)] blur-[100px]" />
            <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:64px_64px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-8 pb-20 md:px-12 md:pb-24">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70" />
              <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-gold/60">
                Commission Process
              </p>
            </div>

            <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-end">
              <div className="max-w-4xl">
                <h1 className="font-display text-[clamp(3.8rem,8.5vw,5.5rem)] font-light leading-[0.88] text-pearl">
                  A process built to make a private watch feel inevitable.
                </h1>
                <div className="mt-8 h-px w-24 bg-gradient-to-r from-gold/60 to-transparent" />
                <p className="mt-8 max-w-2xl font-body text-[18px] italic leading-[1.8] text-mist/80">
                  Aurum does not treat a bespoke watch as a product page with
                  options. The process is a sequence of gates: understand the
                  owner, define the object, approve the direction, make it by
                  hand, then steward it beyond delivery.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[30px] border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-white/[0.02] p-6">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(201,169,110,0.18),transparent_48%)]" />
                <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-gold/40" />
                <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-gold/40" />

                <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.38em] text-gold/60">
                  Process Index
                </p>
                <div className="grid grid-cols-2 gap-px bg-gold/[0.14]">
                  {[
                    { value: "06", label: "Private stages" },
                    { value: "01", label: "Owner brief" },
                    { value: "00", label: "Public prices" },
                    { value: "1:1", label: "Design path" },
                  ].map((item) => (
                    <div key={item.label} className="bg-[#09080d] p-5">
                      <div className="font-display text-4xl font-light text-pearl">
                        {item.value}
                      </div>
                      <div className="mt-2 font-body text-[14px] italic leading-6 text-mist/70">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 font-body text-[15px] italic leading-7 text-mist/76">
                  This page exists to answer what happens after the form is sent,
                  before the commission room asks for trust.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-7xl px-8 md:px-12">
            <div className="mb-12 flex items-center gap-5">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/15" />
              <span className="h-[5px] w-[5px] rotate-45 bg-gold opacity-40" />
              <span className="font-mono text-[9px] uppercase tracking-[0.42em] text-mist/55">
                Private Journey
              </span>
              <span className="h-[5px] w-[5px] rotate-45 bg-gold opacity-40" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/15" />
            </div>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-gold/0 via-gold/30 to-gold/0 lg:block" />
              <div className="grid gap-5">
                {processStages.map((stage, index) => (
                  <article
                    key={stage.step}
                    className="group relative grid gap-5 rounded-[30px] border border-gold/[0.12] bg-[#08070c]/90 p-6 transition-colors duration-300 hover:border-gold/30 md:p-7 lg:grid-cols-[120px_minmax(0,1fr)_280px] lg:items-start"
                  >
                    <div className="flex items-center gap-4 lg:block">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/35 bg-gold/10 font-mono text-[10px] tracking-[0.18em] text-gold">
                        {stage.step}
                      </div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.32em] text-mist/50 lg:mt-5">
                        Gate {String(index + 1).padStart(2, "0")}
                      </p>
                    </div>

                    <div>
                      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/55">
                        {stage.duration}
                      </p>
                      <h2 className="font-display text-5xl font-light leading-[0.95] text-pearl">
                        {stage.title}
                      </h2>
                      <p className="mt-5 max-w-2xl font-body text-[17px] italic leading-8 text-mist/76">
                        {stage.body}
                      </p>
                    </div>

                    <div className="rounded-[24px] border border-gold/15 bg-gradient-to-br from-gold/[0.07] to-white/[0.02] p-5">
                      <p className="mb-4 font-mono text-[8px] uppercase tracking-[0.34em] text-gold/55">
                        Client Sees
                      </p>
                      <div className="space-y-3">
                        {stage.deliverables.map((item) => (
                          <div key={item} className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gold/70" />
                            <p className="font-body text-[15px] italic leading-6 text-pearl/80">
                              {item}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 pb-20">
          <div className="mx-auto grid max-w-7xl gap-6 px-8 md:px-12 xl:grid-cols-[minmax(0,1fr)_390px]">
            <div className="rounded-[32px] border border-gold/[0.12] bg-[#09080d]/90 p-7 md:p-9">
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/55">
                After The Form
              </p>
              <h2 className="max-w-2xl font-display text-5xl font-light leading-[0.95] text-pearl">
                The submitted brief becomes a working document, not an inbox
                message.
              </h2>
              <p className="mt-6 max-w-2xl font-body text-[18px] italic leading-8 text-mist/76">
                When a client sends the commission form, the answers are turned
                into a private PDF dossier for the atelier desk. That dossier
                becomes the starting object for review, questions, and the first
                design direction.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {clientReceives.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[24px] border border-gold/[0.10] bg-white/[0.03] p-5"
                  >
                    <h3 className="font-display text-3xl font-light text-pearl">
                      {item.title}
                    </h3>
                    <p className="mt-3 font-body text-[15px] leading-7 text-mist/74">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-gold/15 bg-gradient-to-br from-gold/[0.08] to-white/[0.02] p-6">
              <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/60">
                Rules Of The Room
              </p>
              <div className="space-y-4">
                {principles.map((item) => (
                  <div
                    key={item.label}
                    className="border-t border-gold/[0.10] pt-4 first:border-t-0 first:pt-0"
                  >
                    <h3 className="font-display text-3xl font-light text-pearl">
                      {item.label}
                    </h3>
                    <p className="mt-2 font-body text-[15px] leading-7 text-mist/76">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 border-t border-gold/[0.12] pt-6">
                <p className="mb-5 font-body text-[15px] italic leading-7 text-mist/76">
                  If the process still feels too abstract, the FAQ answers the
                  practical questions before the private brief begins.
                </p>
                <Link
                  href="/faq"
                  className="inline-flex items-center justify-center border border-gold/[0.16] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-pearl transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  Read FAQ
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 pb-28">
          <div className="mx-auto max-w-7xl px-8 md:px-12">
            <div className="rounded-[34px] border border-gold/[0.12] bg-[#09080d]/90 p-7 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div>
                  <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/55">
                    Begin Carefully
                  </p>
                  <h2 className="font-display text-5xl font-light text-pearl">
                    Start only when the object deserves a real brief.
                  </h2>
                  <p className="mt-5 max-w-2xl font-body text-[17px] italic leading-8 text-mist/76">
                    The commission room is intentionally detailed because a
                    serious handmade watch should not begin with a single email.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/materials"
                    className="inline-flex items-center justify-center border border-gold/[0.16] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-pearl transition-colors duration-300 hover:border-gold hover:text-gold"
                  >
                    Explore Materials
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

import type { Metadata } from "next";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { watchFamilies } from "@/lib/watchData";

const housePrinciples = [
  {
    eyebrow: "Principle I",
    title: "Private By Design",
    body:
      "Aurum does not run stock, seasonal drops, or open catalog pricing. Every watch begins with one client, one brief, and one reserved production slot.",
  },
  {
    eyebrow: "Principle II",
    title: "Authored, Not Selected",
    body:
      "Our model families are starting points only. Case stance, dial treatment, typography, metal tone, and engraving are developed until the commission feels singular.",
  },
  {
    eyebrow: "Principle III",
    title: "Built To Stay",
    body:
      "The work does not end at delivery. Documentation, service registration, and long-term stewardship remain part of the object from the first conversation onward.",
  },
];

const houseStandards = [
  {
    label: "Proportion First",
    text: "We set diameter, profile, lug length, and wrist presence before surface detail. A bespoke watch that fits badly is not bespoke enough.",
  },
  {
    label: "Finish With Restraint",
    text: "Polish, brushing, engraving, and dial texture are treated as architecture. The best detail in watchmaking is felt before it is noticed.",
  },
  {
    label: "No Published Prices",
    text: "Because the object changes with each client, a public price list would flatten the process into something it is not.",
  },
  {
    label: "Service As Stewardship",
    text: "Each completed watch is recorded, registered, and supported as a long-term personal object rather than a transaction that ends at delivery.",
  },
];

const houseArticles = [
  { value: "1:1", unit: "brief", label: "Every project begins privately" },
  { value: "12+", unit: "weeks", label: "Typical making cadence" },
  { value: String(watchFamilies.length), unit: "families", label: "Starting points, never limits" },
  { value: "40+", unit: "choices", label: "Usually personalized per brief" },
];

const houseFlow = [
  {
    step: "01",
    title: "Listen First",
    body:
      "We begin by understanding wrist size, wardrobe, references, and the personal symbols the watch should carry.",
  },
  {
    step: "02",
    title: "Define The Object",
    body:
      "The atelier translates that brief into case architecture, material palettes, dial language, and signature details.",
  },
  {
    step: "03",
    title: "Resolve The Details",
    body:
      "Proportions, engraving, strap choice, and finishing cues are refined until the watch feels authored rather than configured.",
  },
  {
    step: "04",
    title: "Deliver & Steward",
    body:
      "The final piece is presented privately with archive notes, service registration, and long-term care expectations.",
  },
];

export const metadata: Metadata = {
  title: "AURUM — About The House",
  description:
    "The structure, standards, and working philosophy behind Aurum private watch commissions.",
};

export default function AboutPage() {
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
            <div className="absolute left-[-10rem] top-0 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.12),transparent_62%)] blur-[95px]" />
            <div className="absolute right-[-6rem] top-[14rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(190,196,210,0.08),transparent_66%)] blur-[95px]" />
            <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:62px_62px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-8 pb-20 md:px-12 md:pb-24">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70" />
              <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-gold/60">
                About The House
              </p>
            </div>

            <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-end">
              <div className="max-w-4xl">
                <h1 className="font-display text-[clamp(3.8rem,8.5vw,5.5rem)] font-light leading-[0.88] text-pearl">
                  A private watch house built around one owner at a time.
                </h1>
                <div className="mt-8 h-px w-24 bg-gradient-to-r from-gold/60 to-transparent" />
                <p className="mt-8 max-w-2xl font-body text-[18px] italic leading-[1.8] text-mist/80">
                  Aurum exists for clients who want a handmade mechanical watch
                  to feel authored, not selected. The house is structured around
                  private dialogue, controlled production, and long-term
                  stewardship rather than public stock or public pricing.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[28px] border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-white/[0.02] p-6">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(201,169,110,0.18),transparent_48%)]" />
                <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-gold/40" />
                <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-gold/40" />

                <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.38em] text-gold/60">
                  House Position
                </p>
                <div className="space-y-4 border-b border-white/10 pb-5">
                  {[
                    "Private commissions only",
                    "No stock inventory",
                    "No published prices",
                    "Long-term service registration",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 border-t border-white/8 pt-4 first:border-t-0 first:pt-0"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold" />
                      <p className="font-body text-[16px] italic leading-7 text-pearl/84">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 font-body text-[15px] leading-7 text-mist/76">
                  The goal is not to scale outward like a catalog house. It is
                  to stay selective enough that each watch still feels personal
                  when it reaches the wrist.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-7xl px-8 md:px-12">
            <div className="grid gap-px bg-white/6 md:grid-cols-4">
              {houseArticles.map((item) => (
                <div
                  key={item.label}
                  className="bg-[#0a090d] p-8 text-center transition-colors duration-300 hover:bg-[#121017]"
                >
                  <div className="font-display text-5xl font-light text-pearl">
                    {item.value}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.28em] text-gold/60">
                    {item.unit}
                  </div>
                  <div className="mt-3 font-body text-[15px] italic text-mist/74">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-7xl px-8 md:px-12">
            <div className="mb-10 flex items-center gap-5">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/15" />
              <span className="h-[5px] w-[5px] rotate-45 bg-gold opacity-40" />
              <span className="font-mono text-[9px] uppercase tracking-[0.42em] text-mist/55">
                House Principles
              </span>
              <span className="h-[5px] w-[5px] rotate-45 bg-gold opacity-40" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/15" />
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {housePrinciples.map((principle) => (
                <article
                  key={principle.title}
                  className="rounded-[28px] border border-white/10 bg-[#08070c]/90 p-6 md:p-7"
                >
                  <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/55">
                    {principle.eyebrow}
                  </p>
                  <h2 className="font-display text-4xl font-light text-pearl">
                    {principle.title}
                  </h2>
                  <p className="mt-5 font-body text-[17px] italic leading-8 text-mist/76">
                    {principle.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 pb-20">
          <div className="mx-auto grid max-w-7xl gap-6 px-8 md:px-12 xl:grid-cols-[minmax(0,1.05fr)_360px]">
            <div className="rounded-[30px] border border-white/10 bg-[#08070c]/90 p-6 md:p-8">
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/55">
                Working Method
              </p>
              <h2 className="max-w-2xl font-display text-5xl font-light leading-[0.95] text-pearl">
                The house is defined less by mythology, more by standards.
              </h2>
              <p className="mt-6 max-w-2xl font-body text-[18px] italic leading-8 text-mist/76">
                We are careful about what the watch should say, but even more
                careful about how it should sit, age, and remain serviceable over
                time. That is where the house earns its credibility.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {houseStandards.map((item) => (
                  <article
                    key={item.label}
                    className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
                  >
                    <h3 className="font-display text-3xl font-light text-pearl">
                      {item.label}
                    </h3>
                    <p className="mt-3 font-body text-[15px] leading-7 text-mist/74">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-gold/15 bg-gradient-to-br from-gold/[0.08] to-white/[0.02] p-6">
              <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/60">
                House Flow
              </p>
              <div className="space-y-4">
                {houseFlow.map((item) => (
                  <div
                    key={item.step}
                    className="border-t border-white/8 pt-4 first:border-t-0 first:pt-0"
                  >
                    <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.3em] text-gold/60">
                      {item.step}
                    </div>
                    <div className="font-display text-3xl font-light text-pearl">
                      {item.title}
                    </div>
                    <p className="mt-2 font-body text-[15px] leading-7 text-mist/76">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 pb-28">
          <div className="mx-auto max-w-7xl px-8 md:px-12">
            <div className="rounded-[32px] border border-white/10 bg-[#09080d]/90 p-7 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div>
                  <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/55">
                    Next Step
                  </p>
                  <h2 className="font-display text-5xl font-light text-pearl">
                    Read the house, then begin the brief.
                  </h2>
                  <p className="mt-5 max-w-2xl font-body text-[17px] italic leading-8 text-mist/76">
                    Materials explains what can change. The commission room
                    turns that language into a private dossier tailored to one
                    owner.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/materials"
                    className="inline-flex items-center justify-center border border-white/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-pearl transition-colors duration-300 hover:border-gold hover:text-gold"
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

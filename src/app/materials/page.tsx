import type { Metadata } from "next";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import MaterialsViewer from "@/components/MaterialsViewer";
import Navbar from "@/components/Navbar";
import {
  atelierAssurances,
  commissionVocabulary,
  materialCabinet,
} from "@/lib/materialsData";
import { watchFamilies } from "@/lib/watchData";

export const metadata: Metadata = {
  title: "AURUM — Materials & Signatures",
  description:
    "A field guide to the metals, dial treatments, signatures, and authored details behind Aurum commissions.",
};

export default function MaterialsPage() {
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
            <div className="absolute left-0 top-0 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.12),transparent_62%)] blur-[90px]" />
            <div className="absolute right-[-10rem] top-[14rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(180,192,210,0.08),transparent_66%)] blur-[110px]" />
            <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.65)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:62px_62px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-8 pb-16 md:px-12 md:pb-24">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70" />
              <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-gold/60">
                Materials & Signatures
              </p>
            </div>

            <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-end">
              <div className="max-w-4xl">
                <h1 className="font-display text-[clamp(3.8rem,9vw,6rem)] font-light leading-[0.88] text-pearl">
                  A field guide to what actually changes a handmade watch.
                </h1>
                <div className="mt-8 h-px w-24 bg-gradient-to-r from-gold/60 to-transparent" />
                <p className="mt-8 max-w-2xl font-body text-[22px] italic leading-[1.8] text-mist/80">
                  Not a catalog. A working atlas of case metals, dial treatments,
                  hand profiles, engravings, and authored details used to turn six
                  model families into singular commissions.
                </p>
              </div>

              <div className="relative overflow-hidden border border-gold/20 bg-gradient-to-br from-gold/[0.08] to-white/[0.02] p-6 backdrop-blur-sm">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(201,169,110,0.18),transparent_48%)]" />
                <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-gold/40" />
                <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-gold/40" />

                <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.38em] text-gold/60">
                  Cabinet Index
                </p>
                <div className="space-y-4 border-b border-white/10 pb-5">
                  {[
                    {
                      label: "Model Families",
                      value: String(watchFamilies.length).padStart(2, "0"),
                    },
                    { label: "Material Layers", value: "04" },
                    { label: "Signature Zones", value: "04" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-end justify-between gap-4 border-b border-white/6 pb-4 last:border-b-0 last:pb-0"
                    >
                      <span className="font-body text-[17px] italic text-pearl/82">
                        {item.label}
                      </span>
                      <span className="font-display text-3xl font-light text-pearl">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-5 font-body text-[15px] italic leading-7 text-mist/75">
                  This page exists so a client is never forced to imagine what
                  can be customized. Metals, finishes, signatures, and authored
                  details are made legible before the brief begins.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10">
          <div className="mx-auto max-w-7xl px-8 pb-20 md:px-12">
            <div className="mb-12 flex items-center gap-5">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/15" />
              <span className="h-[5px] w-[5px] rotate-45 bg-gold opacity-40" />
              <span className="font-mono text-[9px] uppercase tracking-[0.42em] text-mist/55">
                Material Cabinet
              </span>
              <span className="h-[5px] w-[5px] rotate-45 bg-gold opacity-40" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/15" />
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {materialCabinet.map((section) => (
                <article
                  key={section.id}
                  className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#08070c]/90 p-6 md:p-7"
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-24"
                    style={{
                      background: `radial-gradient(circle at 20% 0%, ${section.accent}18 0%, transparent 72%)`,
                    }}
                  />

                  <div className="relative">
                    <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/55">
                      {section.eyebrow}
                    </p>
                    <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
                      <h2 className="font-display text-4xl font-light text-pearl">
                        {section.title}
                      </h2>
                      <span className="font-mono text-[9px] uppercase tracking-[0.34em] text-mist/55">
                        Open to Commission
                      </span>
                    </div>
                    <p className="mb-6 max-w-xl font-body text-[17px] italic leading-7 text-mist/78">
                      {section.note}
                    </p>

                    <div className="grid gap-3">
                      {section.items.map((item) => (
                        <div
                          key={item.label}
                          className="flex items-start gap-4 border-t border-gold pt-4"
                        >
                          {item.swatch ? (
                            <span
                              className="mt-1 h-6 w-6 rounded-full border border-white/10"
                              style={{ backgroundColor: item.swatch }}
                            />
                          ) : (
                            <span className="mt-[0.35rem] h-2 w-2 rounded-full bg-gold/70" />
                          )}

                          <div>
                            <p className="font-body text-[18px] italic text-pearl/86">
                              {item.label}
                            </p>
                            <p className="mt-1 font-body text-[14px] leading-6 text-mist/72 opacity-50">
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-7xl px-8 md:px-12">
            <MaterialsViewer />
          </div>
        </section>

        <section className="relative z-10 pb-24">
          <div className="mx-auto grid max-w-7xl gap-6 px-8 md:px-12 xl:grid-cols-[1.1fr_1fr_360px]">
            <div className="rounded-[30px] border border-white/10 bg-[#08070c]/90 p-6 md:p-8">
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/55">
                Commission Vocabulary
              </p>
              <h2 className="max-w-xl font-display text-5xl font-light leading-[0.95] text-pearl">
                Handmade watches become believable when the parts are explained.
              </h2>
              <p className="mt-6 max-w-xl font-body text-[18px] italic leading-8 text-mist/76">
                Bespoke watchmaking is not just color selection. It is a sequence
                of structural, tonal, and authored decisions that compound into
                an object with its own identity.
              </p>
            </div>

            <div className="grid gap-4">
              {commissionVocabulary.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[26px] border border-white/10 bg-white/[0.03] p-5"
                >
                  <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/55">
                    {item.eyebrow}
                  </p>
                  <h3 className="font-display text-3xl font-light text-pearl">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-body text-[16px] leading-7 text-mist/76">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>

            <div className="rounded-[30px] border border-gold/15 bg-gradient-to-br from-gold/[0.08] to-white/[0.02] p-6">
              <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/60">
                Atelier Assurance
              </p>
              <div className="space-y-4">
                {atelierAssurances.map((note) => (
                  <div
                    key={note}
                    className="flex items-start gap-3 border-t border-white/8 pt-4 first:border-t-0 first:pt-0"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold" />
                    <p className="font-body text-[16px] italic leading-7 text-pearl/82">
                      {note}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="mb-5 font-body text-[15px] italic leading-7 text-mist/76">
                  When the cabinet feels clear, the commission form stops feeling
                  abstract and starts behaving like a real design brief.
                </p>
                <Link
                  href="/commission"
                  className="inline-flex items-center justify-center border border-gold/35 bg-gold px-5 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-obsidian transition-colors duration-300 hover:bg-gold-light"
                >
                  Begin Commission
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

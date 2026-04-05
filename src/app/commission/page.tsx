import type { Metadata } from "next";
import Link from "next/link";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommissionForm from "@/components/CommissionForm";

type CommissionPageProps = {
  searchParams?: {
    model?: string | string[];
  };
};

export const metadata: Metadata = {
  title: "AURUM — Commission Brief",
  description:
    "A multi-step private commission dossier for bespoke Aurum timepieces.",
};

export default function CommissionPage({ searchParams }: CommissionPageProps) {
  const selectedModel = Array.isArray(searchParams?.model)
    ? (searchParams?.model[0] ?? "")
    : (searchParams?.model ?? "");

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#06050A]">
        {/* ── global noise texture overlay ── */}
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />

        {/* ── hero / banner ── */}
        <section className="relative z-10 min-h-[100svh] flex flex-col justify-end pt-24 pb-0">
          {/* layered ambient backgrounds */}
          <div className="pointer-events-none absolute inset-0">
            {/* top arch glow */}
            <div className="absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(201,169,110,0.11),transparent_65%)]" />
            {/* left deep glow */}
            <div className="absolute -left-40 top-[30%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.07),transparent_60%)] blur-[80px]" />
            {/* right cold glow */}
            <div className="absolute -right-24 top-[40%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(180,190,210,0.04),transparent_65%)] blur-[60px]" />
            {/* bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-[30vh] bg-gradient-to-t from-[#06050A] to-transparent" />
          </div>

          {/* ── decorative watchface rings ── */}
          <div className="pointer-events-none absolute right-[8%] top-[12%] h-[420px] w-[420px] opacity-[0.18]">
            <div className="absolute inset-0 rounded-full border border-[#C9A96E]" />
            <div className="absolute inset-5 rounded-full border border-[#C9A96E]/60" />
            <div className="absolute inset-12 rounded-full border border-[#C9A96E]/40" />
            <div className="absolute inset-20 rounded-full border border-[#C9A96E]/25" />
            <div className="absolute inset-[105px] rounded-full border border-[#C9A96E]/15" />
            {/* hour markers */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = i * 30;
              const isCardinal = i % 3 === 0;
              return (
                <div
                  key={i}
                  className="absolute inset-0 flex items-start justify-center"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <div
                    className={`mt-3 bg-[#C9A96E] ${isCardinal ? "h-6 w-[1.5px]" : "h-3 w-px"}`}
                  />
                </div>
              );
            })}
            {/* hands */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="absolute h-[38%] w-[1.5px] bg-gradient-to-t from-[#C9A96E] to-transparent origin-bottom"
                style={{ bottom: "50%", transform: "rotate(-35deg)" }}
              />
              <div
                className="absolute h-[28%] w-[2px] bg-gradient-to-t from-[#C9A96E]/80 to-transparent origin-bottom"
                style={{ bottom: "50%", transform: "rotate(70deg)" }}
              />
              <div className="h-2 w-2 rounded-full border border-[#C9A96E] bg-[#06050A]" />
            </div>
          </div>

          {/* ── hero content ── */}
          <div className="relative mx-auto w-full max-w-7xl px-8 md:px-12 pb-16">
            {/* eyebrow label */}
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A96E]/60" />
              <p className="font-[Cinzel,serif] text-[9px] uppercase tracking-[0.5em] text-[#C9A96E]/65">
                Private Commission Room
              </p>
            </div>

            {/* headline */}
            <h1
              className="mb-6 font-[Cormorant_Garamond,serif] font-light leading-[0.88] text-[#F0ECE3]"
              style={{ fontSize: "clamp(52px, 8vw, 110px)" }}
            >
              Not a form.
              <br />
              <span className="relative inline-block">
                <em className="italic text-[#C9A96E]">A dossier.</em>
                {/* underline decoration */}
                <span className="absolute -bottom-2 left-0 h-px w-full bg-gradient-to-r from-[#C9A96E]/60 to-transparent" />
              </span>
            </h1>

            <div className="mb-10 h-px w-20 bg-gradient-to-r from-[#C9A96E]/60 to-transparent" />

            {/* two-column description + card */}
            <div className="grid gap-10 lg:grid-cols-[1fr_480px] lg:items-end">
              <div>
                <p className="mb-8 max-w-lg font-[Cormorant_Garamond,serif] text-[19px] italic leading-[1.85] text-[#8A877E]">
                  Five curated chapters. A private consultation before any metal
                  is touched. Leave only the details that matter — the atelier
                  fills the rest.
                </p>

                {/* process steps preview */}
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {[
                    "01 — Patron",
                    "02 — Silhouette",
                    "03 — Materiality",
                    "04 — Mechanics",
                    "05 — Signature",
                  ].map((s) => (
                    <span
                      key={s}
                      className="font-[Cinzel,serif] text-[8px] uppercase tracking-[0.3em] text-[#4A4840]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* commission details card */}
              <div className="relative border border-[#C9A96E] bg-gradient-to-br from-[#C9A96E]/[0.07] to-white/[0.01] py-6 px-10 backdrop-blur-sm">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(201,169,110,0.12),transparent_50%)]" />
                {/* corner accents */}
                <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-[#C9A96E]/40" />
                <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-[#C9A96E]/40" />

                <p className="mb-4 font-[Cinzel,serif] text-[8px] uppercase tracking-[0.4em] text-[#C9A96E]/60">
                  Commission Anchor
                </p>

                {selectedModel ? (
                  <>
                    <div className="mb-1 font-[Cinzel,serif] text-[8px] uppercase tracking-[0.28em] text-[#4A4840]">
                      Selected Tone
                    </div>
                    <div className="mb-3 font-[Cormorant_Garamond,serif] text-[52px] font-light leading-[0.9] text-[#F0ECE3]">
                      {selectedModel}
                    </div>
                    <p className="font-[Cormorant_Garamond,serif] text-[12px] italic leading-[1.6] text-[#8A877E]/70">
                      A tonal anchor only. The final commission may soften,
                      sharpen, or abandon it entirely.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mb-3 font-[Cormorant_Garamond,serif] text-[42px] font-light leading-[0.9] text-[#F0ECE3]">
                      Open Brief
                    </div>
                    <p className="font-[Cormorant_Garamond,serif] text-[12px] italic leading-[1.6] text-[#8A877E]/70">
                      No model selected. The atelier will recommend the
                      strongest family after reviewing your brief.
                    </p>
                  </>
                )}

                <div className="mt-5 grid grid-cols-3 gap-px bg-white/[0.05]">
                  {[
                    { k: "Chapters", v: "05" },
                    { k: "Pace", v: "Guided" },
                    { k: "Outcome", v: "Proposal" },
                  ].map((r) => (
                    <div key={r.k} className="bg-[#06050A]/80 px-3 py-2.5">
                      <div className="font-[Cormorant_Garamond,serif] text-[18px] font-light text-[#F0ECE3]">
                        {r.v}
                      </div>
                      <div className="font-[Cinzel,serif] text-[7px] uppercase tracking-[0.22em] text-[#4A4840]">
                        {r.k}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="font-[Cormorant_Garamond,serif] text-[11px] italic text-[#4A4840]">
                    Review is private & confidential.
                  </p>
                  <Link
                    href="/#atelier"
                    className="font-[Cinzel,serif] text-[8px] uppercase tracking-[0.25em] text-[#4A4840] transition-colors hover:text-[#C9A96E]"
                  >
                    ← Atelier
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── scroll indicator ── */}
          <div className="relative mx-auto w-full max-w-7xl px-8 md:px-12 pb-8 flex items-center gap-4 opacity-40">
            <div className="flex flex-col items-center gap-1.5">
              <div className="h-8 w-px bg-gradient-to-b from-[#C9A96E] to-transparent" />
              <span className="font-[Cinzel,serif] text-[7px] uppercase tracking-[0.4em] text-[#C9A96E]">
                Begin
              </span>
            </div>
          </div>
        </section>

        {/* ── form section ── */}
        <section className="relative z-10 pb-28">
          {/* top separator */}
          <div className="mx-auto max-w-7xl px-8 md:px-12">
            <div className="mb-12 flex items-center gap-5">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C9A96E]/15" />
              <span className="h-[5px] w-[5px] rotate-45 bg-[#C9A96E] opacity-30" />
              <span className="font-[Cinzel,serif] text-[8px] uppercase tracking-[0.45em] text-[#4A4840]">
                Commission Dossier
              </span>
              <span className="h-[5px] w-[5px] rotate-45 bg-[#C9A96E] opacity-30" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C9A96E]/15" />
            </div>

            <CommissionForm initialModel={selectedModel} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

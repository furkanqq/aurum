import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type LegalSection = {
  title: string;
  body: string[];
};

export default function LegalDocument({
  eyebrow,
  title,
  intro,
  updatedAt,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updatedAt: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-[#050508] pt-28">
        <div
          className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px 128px",
          }}
        />

        <section className="relative z-10 pb-16">
          <div className="mx-auto max-w-7xl px-8 md:px-12">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70" />
              <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-gold/60">
                {eyebrow}
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-end">
              <div className="max-w-4xl">
                <h1 className="font-display text-[clamp(3.8rem,8.5vw,5.5rem)] font-light leading-[0.88] text-pearl">
                  {title}
                </h1>
                <div className="mt-8 h-px w-24 bg-gradient-to-r from-gold/60 to-transparent" />
                <p className="mt-8 max-w-2xl font-body text-[18px] italic leading-[1.8] text-mist/80">
                  {intro}
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[28px] border border-gold/15 bg-gradient-to-br from-gold/[0.08] to-white/[0.02] p-6">
                <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-gold/40" />
                <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-gold/40" />
                <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/60">
                  Document Status
                </p>
                <div className="font-display text-4xl font-light text-pearl">
                  {updatedAt}
                </div>
                <p className="mt-4 font-body text-[15px] italic leading-7 text-mist/76">
                  This document is written for a private commission website and
                  should be reviewed for the final operating jurisdiction before
                  commercial launch.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 pb-28">
          <div className="mx-auto max-w-5xl px-8 md:px-12">
            <div className="rounded-[34px] border border-white/10 bg-[#09080d]/90 p-6 md:p-10">
              <div className="space-y-10">
                {sections.map((section, index) => (
                  <article
                    key={section.title}
                    className="border-t border-white/10 pt-8 first:border-t-0 first:pt-0"
                  >
                    <div className="mb-4 flex items-center gap-4">
                      <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-gold/55">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-display text-3xl font-light text-pearl md:text-4xl">
                        {section.title}
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {section.body.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="font-body text-[16px] leading-8 text-mist/78"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

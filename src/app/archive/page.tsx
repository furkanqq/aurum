import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import ArchiveGallery from "@/components/ArchiveGallery";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "AURUM — Commission Archive",
  description:
    "An editorial archive of commission frames, wrist studies, and model plates from the Aurum atelier.",
};

export default function ArchivePage() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="relative min-h-screen bg-[#06050A] pt-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10rem] top-0 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(201,169,110,0.12),transparent_64%)] blur-[100px]" />
          <div className="absolute right-[-8rem] top-[18rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(190,196,210,0.08),transparent_66%)] blur-[90px]" />
        </div>

        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-7xl px-8">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70" />
              <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-gold/60">
                Commission Archive
              </p>
            </div>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
              <div className="max-w-4xl">
                <h1 className="font-display text-[clamp(3.8rem,8.5vw,5.5rem)] font-light leading-[0.88] text-pearl">
                  A visual archive of what the atelier can actually make.
                </h1>
                <div className="mt-8 h-px w-24 bg-gradient-to-r from-gold/60 to-transparent" />
                <p className="mt-8 max-w-2xl font-body text-[18px] italic leading-[1.8] text-mist/80">
                  Portraits, wrist studies, and detail frames. Not
                  a product carousel, but a working archive that gives shape to
                  proportion, finish, and authored detail.
                </p>
              </div>

              <div className="rounded-[28px] border border-gold/15 bg-gradient-to-br from-gold/[0.08] to-white/[0.02] p-6">
                <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/60">
                  Archive Intent
                </p>
                <p className="font-body text-[15px] leading-7 text-mist/78">
                  This archive is meant to remove ambiguity. Clients should be
                  able to see metal moods, dial attitudes, and the difference
                  between model family studies and fully styled portrait frames.
                </p>
              </div>
            </div>

            <div className="gold-line mt-10" />
          </div>
        </section>

        <section className="relative z-10 pb-28">
          <div className="mx-auto max-w-7xl px-8">
            <ArchiveGallery />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { homeArchiveEntries } from "@/lib/archiveData";

export default function ArchivePreview() {
  const [selectedId, setSelectedId] = useState(homeArchiveEntries[0]?.id ?? "");

  const selectedEntry = useMemo(
    () =>
      homeArchiveEntries.find((entry) => entry.id === selectedId) ??
      homeArchiveEntries[0],
    [selectedId],
  );

  return (
    <section id="archive" className="relative z-10 bg-[#09080c] py-28">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="reveal font-mono text-xs uppercase tracking-[0.35em] text-gold mb-5">
              — Commission Archive
            </p>
            <h2 className="reveal reveal-delay-1 font-display text-5xl md:text-7xl font-light text-pearl">
              Proof, not promises.
            </h2>
          </div>

          <p className="reveal reveal-delay-2 max-w-sm font-body text-base italic leading-relaxed text-mist">
            A rolling archive of portraits and wrist studies from the gallery,
            used to make the atelier feel tangible before a commission begins.
          </p>
        </div>

        <div className="gold-line mb-10 reveal reveal-delay-3" />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_720px] xl:items-start">
          <button
            type="button"
            onClick={() => setSelectedId(selectedEntry.id)}
            className="group relative w-full max-w-[480px] overflow-hidden rounded-[34px] border border-gold/[0.12] bg-[#0d0b10] text-left xl:justify-self-start"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background: `radial-gradient(circle at 50% 18%, ${selectedEntry.accent}22 0%, transparent 55%)`,
              }}
            />
            <div className="relative aspect-[0.92]">
              <Image
                src={selectedEntry.image}
                alt={selectedEntry.title}
                fill
                sizes="(min-width: 1280px) 820px, 100vw"
                className={`transition-transform duration-700 group-hover:scale-[1.02] ${
                  selectedEntry.fit === "cover"
                    ? "object-cover"
                    : "object-contain p-10"
                }`}
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent px-6 pb-6 pt-20 md:px-8 md:pb-8">
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold/70">
                  {selectedEntry.eyebrow}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist/70">
                  {selectedEntry.source}
                </span>
              </div>
              <h3 className="font-display text-xl font-light text-pearl md:text-2xl">
                {selectedEntry.title}
              </h3>
              <p className="mt-3 max-w-xl font-body text-[15px] italic leading-7 text-mist/85">
                {selectedEntry.note}
              </p>
            </div>
          </button>

          <div className="relative flex flex-col gap-5">
            <div className="rounded-[30px] border border-gold/15 bg-gradient-to-br from-gold/[0.08] to-white/[0.02] p-6">
              <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/60">
                Archive Focus
              </p>
              <div className="space-y-4 border-b border-gold/[0.12] pb-5">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-mist/55">
                    Family
                  </div>
                  <div className="font-display text-4xl font-light text-pearl">
                    {selectedEntry.family}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-mist/55">
                    Focus
                  </div>
                  <div className="font-body text-[16px] italic leading-7 text-pearl/84">
                    {selectedEntry.focus}
                  </div>
                </div>
              </div>

              <p className="mt-5 font-body text-[15px] leading-7 text-mist/78">
                The archive is designed as a visual dossier. Each frame adds
                confidence to the commission language instead of behaving like a
                generic product carousel.
              </p>

              <Link
                href="/archive"
                className=" absolute top-6 right-6 inline-flex items-center justify-center border border-gold/35 bg-gold px-5 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-obsidian transition-colors duration-300 hover:bg-gold-light"
              >
                Open Full Archive
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-3 rounded-[28px] border border-gold/[0.12] bg-[#0d0b10]/80 p-3 sm:gap-4 sm:p-4">
              {homeArchiveEntries.map((entry) => {
                const isActive = entry.id === selectedEntry.id;

                return (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => setSelectedId(entry.id)}
                    aria-label={`Show ${entry.title}`}
                    className={`group relative aspect-[1.05] h-[77px] w-full overflow-hidden rounded-[18px] border bg-black/25 transition-all duration-300 ${
                      isActive
                        ? "border-gold/50 shadow-[0_0_24px_rgba(201,169,110,0.14)]"
                        : "border-gold/[0.10] hover:border-gold/30"
                    }`}
                  >
                    <Image
                      src={entry.image}
                      alt={entry.title}
                      fill
                      sizes="(min-width: 1280px) 150px, 22vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent transition-opacity duration-300 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-70"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

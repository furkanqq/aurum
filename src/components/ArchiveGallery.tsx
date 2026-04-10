"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  archiveEntries,
  archiveFilters,
  type ArchiveEntry,
  type ArchiveFilter,
} from "@/lib/archiveData";

export default function ArchiveGallery() {
  const [activeFilter, setActiveFilter] = useState<ArchiveFilter>("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredEntries = useMemo(() => {
    if (activeFilter === "All") return archiveEntries;
    return archiveEntries.filter((entry) => entry.source === activeFilter);
  }, [activeFilter]);

  const selectedEntry = useMemo(
    () => filteredEntries.find((entry) => entry.id === selectedId) ?? null,
    [filteredEntries, selectedId],
  );

  useEffect(() => {
    if (!selectedEntry) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedEntry]);

  useEffect(() => {
    if (
      selectedId &&
      !filteredEntries.some((entry) => entry.id === selectedId)
    ) {
      setSelectedId(filteredEntries[0]?.id ?? null);
    }
  }, [filteredEntries, selectedId]);

  const counts = {
    total: archiveEntries.length,
    gallery: archiveEntries.filter((entry) => entry.source === "Gallery Frames")
      .length,
    models: archiveEntries.filter((entry) => entry.source === "Model Studies")
      .length,
  };

  return (
    <>
      <div className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="mb-6 flex flex-wrap gap-3">
            {archiveFilters.map((filter) => {
              const isActive = filter === activeFilter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] transition-all duration-300 ${
                    isActive
                      ? "border-gold/45 bg-gold/[0.08] text-pearl"
                      : "border-white/10 bg-white/[0.02] text-mist hover:border-white/20 hover:text-pearl"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredEntries.map((entry, index) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => setSelectedId(entry.id)}
                className={`group relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0d0b10] text-left ${
                  index % 5 === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-80"
                  style={{
                    background: `radial-gradient(circle at 50% 12%, ${entry.accent}20 0%, transparent 55%)`,
                  }}
                />
                <div className={`relative ${index % 5 === 0 ? "aspect-[1.55]" : "aspect-[0.95]"}`}>
                  <Image
                    src={entry.image}
                    alt={entry.title}
                    fill
                    sizes={
                      index % 5 === 0
                        ? "(min-width: 1280px) 760px, 100vw"
                        : "(min-width: 1280px) 360px, 50vw"
                    }
                    className={`transition-transform duration-700 group-hover:scale-[1.03] ${
                      entry.fit === "cover" ? "object-cover" : "object-contain p-8"
                    }`}
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent px-5 pb-5 pt-20">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold/70">
                      {entry.eyebrow}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-mist/65">
                      {entry.source}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl font-light text-pearl">
                    {entry.title}
                  </h3>
                  <p className="mt-2 font-body text-[14px] italic leading-6 text-mist/78">
                    {entry.focus}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="h-fit rounded-[30px] border border-gold/15 bg-gradient-to-br from-gold/[0.08] to-white/[0.02] p-6">
          <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/60">
            Archive Index
          </p>

          <div className="space-y-4 border-b border-white/10 pb-5">
            {[
              { label: "Total Frames", value: String(counts.total).padStart(2, "0") },
              { label: "Gallery Frames", value: String(counts.gallery).padStart(2, "0") },
              { label: "Model Studies", value: String(counts.models).padStart(2, "0") },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-end justify-between gap-4 border-b border-white/6 pb-4 last:border-b-0 last:pb-0"
              >
                <span className="font-body text-[16px] italic text-pearl/84">
                  {item.label}
                </span>
                <span className="font-display text-4xl font-light text-pearl">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-5 font-body text-[15px] italic leading-7 text-mist/76">
            This page is not a commerce carousel. It is a visual dossier for
            proportion, finishing, and the different moods a private commission
            can inhabit.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {selectedEntry && (
          <Lightbox
            entry={selectedEntry}
            entries={filteredEntries}
            onClose={() => setSelectedId(null)}
            onSelect={setSelectedId}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function Lightbox({
  entry,
  entries,
  onClose,
  onSelect,
}: {
  entry: ArchiveEntry;
  entries: ArchiveEntry[];
  onClose: () => void;
  onSelect: (id: string) => void;
}) {
  const currentIndex = entries.findIndex((item) => item.id === entry.id);
  const previousEntry =
    currentIndex > 0 ? entries[currentIndex - 1] : entries[entries.length - 1];
  const nextEntry =
    currentIndex < entries.length - 1 ? entries[currentIndex + 1] : entries[0];

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative grid max-h-[92vh] w-full max-w-7xl gap-4 overflow-hidden rounded-[34px] border border-white/10 bg-[#09080c] md:grid-cols-[minmax(0,1.25fr)_340px]"
        initial={{ y: 24, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 18, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative min-h-[52vh] bg-black/30">
          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background: `radial-gradient(circle at 50% 10%, ${entry.accent}22 0%, transparent 56%)`,
            }}
          />
          <Image
            src={entry.image}
            alt={entry.title}
            fill
            sizes="(min-width: 1280px) 900px, 100vw"
            className={entry.fit === "cover" ? "object-cover" : "object-contain p-8 md:p-12"}
          />
        </div>

        <div className="flex flex-col p-5 md:p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/60">
                {entry.eyebrow}
              </p>
              <h3 className="font-display text-4xl font-light text-pearl">
                {entry.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-pearl transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-4 border-b border-white/10 pb-5">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-mist/55">
                Family
              </div>
              <div className="font-body text-[17px] italic text-pearl/86">
                {entry.family}
              </div>
            </div>
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-mist/55">
                Focus
              </div>
              <div className="font-body text-[17px] italic text-pearl/86">
                {entry.focus}
              </div>
            </div>
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-mist/55">
                Source
              </div>
              <div className="font-body text-[17px] italic text-pearl/86">
                {entry.source}
              </div>
            </div>
          </div>

          <p className="mt-5 font-body text-[15px] leading-7 text-mist/78">
            {entry.note}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onSelect(previousEntry.id)}
              className="border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="font-mono text-[8px] uppercase tracking-[0.3em] text-mist/55">
                Previous
              </div>
              <div className="mt-1 font-display text-2xl font-light text-pearl">
                {previousEntry.title}
              </div>
            </button>
            <button
              type="button"
              onClick={() => onSelect(nextEntry.id)}
              className="border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.05]"
            >
              <div className="font-mono text-[8px] uppercase tracking-[0.3em] text-mist/55">
                Next
              </div>
              <div className="mt-1 font-display text-2xl font-light text-pearl">
                {nextEntry.title}
              </div>
            </button>
          </div>

          <div className="mt-6 overflow-x-auto pt-1" style={{ scrollbarWidth: "none" }}>
            <div className="flex w-max gap-3">
              {entries.map((thumbnail) => {
                const isActive = thumbnail.id === entry.id;

                return (
                  <button
                    key={thumbnail.id}
                    type="button"
                    onClick={() => onSelect(thumbnail.id)}
                    className={`relative h-20 w-16 overflow-hidden rounded-[16px] border transition-all duration-300 ${
                      isActive
                        ? "border-gold/45"
                        : "border-white/10 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={thumbnail.image}
                      alt={thumbnail.title}
                      fill
                      sizes="64px"
                      className={
                        thumbnail.fit === "cover"
                          ? "object-cover"
                          : "object-contain p-1.5"
                      }
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

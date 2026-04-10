"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import {
  signatureHotspotBlueprints,
  signatureProfiles,
  type SignatureHotspotId,
} from "@/lib/materialsData";
import { watchFamilies } from "@/lib/watchData";

export default function MaterialsViewer() {
  const [selectedWatchId, setSelectedWatchId] = useState(
    watchFamilies[0]?.id ?? "01",
  );
  const [selectedHotspotId, setSelectedHotspotId] =
    useState<SignatureHotspotId>("dial");

  const currentWatchIndex = watchFamilies.findIndex(
    (watch) => watch.id === selectedWatchId,
  );
  const safeWatchIndex = currentWatchIndex >= 0 ? currentWatchIndex : 0;
  const currentWatch = watchFamilies[safeWatchIndex] ?? watchFamilies[0];
  const currentProfile =
    signatureProfiles[currentWatch?.id ?? "01"] ?? signatureProfiles["01"];
  const activeHotspot = signatureHotspotBlueprints.find(
    (hotspot) => hotspot.id === selectedHotspotId,
  );
  const activeDetail = currentProfile.hotspots[selectedHotspotId];

  return (
    <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[#08070c]/85 p-5 md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(201,169,110,0.13),transparent_28%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.06),transparent_22%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:52px_52px]" />

      <div className="relative mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.4em] text-gold/55">
            Signature Detail Viewer
          </p>
          <h2 className="font-display text-4xl font-light text-pearl md:text-5xl">
            An atelier atlas instead of a product gallery.
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {currentProfile.specs.map((spec) => (
            <div
              key={spec.label}
              className="min-w-[116px] border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <div className="font-body text-xl font-light text-pearl">
                {spec.value}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-mist/75">
                {spec.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)_320px]">
        <aside className="space-y-3">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-[9px] uppercase tracking-[0.34em] text-gold/55">
              Model Families
            </p>
            <span className="font-mono text-[9px] uppercase tracking-[0.34em] text-mist/50">
              06
            </span>
          </div>

          {watchFamilies.map((watch) => {
            const isActive = watch.id === currentWatch.id;

            return (
              <button
                key={watch.id}
                type="button"
                onClick={() => setSelectedWatchId(watch.id)}
                className={`group w-full border px-4 py-4 rounded-2xl text-left transition-all duration-300 ${
                  isActive
                    ? "border-gold/50 bg-gold/[0.08]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
                aria-pressed={isActive}
              >
                <div className="mb-0 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-[0.34em] text-mist/55">
                      Model {watch.id}
                    </p>
                    <p className="font-display text-2xl font-light text-pearl">
                      {watch.name}
                    </p>
                  </div>
                  <div className="relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-[18px] border border-white/10 bg-black/20">
                    <div
                      className="absolute inset-0 opacity-70"
                      style={{
                        background: `radial-gradient(circle at 50% 20%, ${watch.highlight}22 0%, transparent 72%)`,
                      }}
                    />
                    <Image
                      src={watch.modelImage}
                      alt={`${watch.name} preview`}
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  </div>
                </div>

                {/* <div className="mb-4 font-mono text-[9px] uppercase tracking-[0.28em] text-gold/65">
                  {watch.line}
                </div>
                <p className="font-body text-[15px] leading-6 text-mist/80">
                  {watch.desc}
                </p> */}
              </button>
            );
          })}
        </aside>

        <div className="min-w-0">
          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0c0a0f] px-5 py-6 md:px-8 md:py-8">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-28"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${currentWatch.highlight}22 0%, transparent 70%)`,
              }}
            />

            <div className="relative mb-5 flex flex-col gap-3 border-b border-white/10 pb-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.34em] text-mist/55">
                  Current Study
                </p>
                <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
                  <h3 className="font-display text-4xl font-light text-pearl md:text-5xl">
                    {currentWatch.name}
                  </h3>
                  <span className="pb-1 font-mono text-[10px] uppercase tracking-[0.3em] text-gold/60">
                    {currentWatch.line}
                  </span>
                </div>
              </div>

              <p className="max-w-sm font-body text-[16px] italic leading-7 text-mist/75">
                {currentProfile.overview}
              </p>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[520px]">
              <div className="absolute inset-0 rounded-full border border-white/50" />
              <div className="absolute inset-[11%] rounded-full border border-gold" />
              <div className="absolute inset-[22%] rounded-full border border-gold" />
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="pointer-events-none absolute inset-0 flex items-start justify-center"
                  style={{ transform: `rotate(${index * 30}deg)` }}
                >
                  <div
                    className={`mt-[4.2%] bg-gold/30 ${
                      index % 3 === 0 ? "h-6 w-[1.5px]" : "h-3 w-px"
                    }`}
                  />
                </div>
              ))}

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentWatch.id}
                  initial={{ opacity: 0, scale: 0.92, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.03, rotate: 4 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-[9%] drop-shadow-[0_45px_90px_rgba(0,0,0,0.6)]"
                >
                  <div
                    className="absolute inset-x-[14%] bottom-[10%] top-[14%] rounded-full blur-3xl"
                    style={{
                      background: `radial-gradient(circle, ${currentWatch.highlight}26 0%, transparent 74%)`,
                    }}
                  />
                  <Image
                    src={currentWatch.modelImage}
                    alt={`${currentWatch.name} model`}
                    fill
                    sizes="(min-width: 1280px) 520px, 90vw"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {signatureHotspotBlueprints.map((hotspot) => {
                const isActive = hotspot.id === selectedHotspotId;

                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() => setSelectedHotspotId(hotspot.id)}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 text-left"
                    style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                    aria-pressed={isActive}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-300 ${
                          isActive
                            ? "border-transparent"
                            : "border-white/25 bg-[#0b0a0e]"
                        }`}
                        style={{
                          backgroundColor: isActive
                            ? currentWatch.highlight
                            : undefined,
                          boxShadow: isActive
                            ? `0 0 0 6px ${currentWatch.highlight}22`
                            : "none",
                        }}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isActive ? "bg-[#050507]" : "bg-white/60"
                          }`}
                        />
                      </span>
                      <span
                        className={`hidden border px-2 py-1 font-mono text-[8px] uppercase tracking-[0.28em] md:block ${
                          isActive
                            ? "border-gold/40 bg-black/65 text-pearl"
                            : "border-white/40 bg-black/45 text-slate-400"
                        }`}
                      >
                        {hotspot.label}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-4">
              {signatureHotspotBlueprints.map((hotspot) => {
                const isActive = hotspot.id === selectedHotspotId;

                return (
                  <button
                    key={hotspot.id}
                    type="button"
                    onClick={() => setSelectedHotspotId(hotspot.id)}
                    className={`border px-4 py-3 text-left transition-all duration-300 ${
                      isActive
                        ? "border-gold/45 bg-gold/[0.08]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                    aria-pressed={isActive}
                  >
                    <p className="mb-1 font-mono text-[8px] uppercase tracking-[0.34em] text-gold/60">
                      Detail
                    </p>
                    <p className="font-display text-base font-light text-pearl">
                      {hotspot.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/55">
                  Selected Detail
                </p>
                <p className="font-display text-3xl font-light text-pearl">
                  {activeHotspot?.label}
                </p>
              </div>

              <div className="flex gap-2">
                {currentProfile.palette.map((color) => (
                  <span
                    key={color}
                    className="h-5 w-5 rounded-full border border-white/10"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentWatch.id}-${selectedHotspotId}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.32em] text-gold/55">
                  {activeDetail.kicker}
                </p>
                <h3 className="mb-4 font-display text-4xl font-light leading-none text-pearl">
                  {activeDetail.title}
                </h3>
                <p className="mb-6 font-body text-[16px] italic leading-7 text-mist/80">
                  {activeDetail.body}
                </p>

                <div className="space-y-3">
                  {activeDetail.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="flex items-start gap-3 border-t border-gold pt-3"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gold/70" />
                      <p className="font-body text-[15px] leading-6 text-pearl/80">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#0b0a0e] p-5 md:p-6">
            <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.34em] text-gold/55">
              Commission Notes
            </p>
            <div className="space-y-3">
              {currentWatch.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center justify-between gap-4 border-b border-gold pb-3 last:border-b-0 last:pb-0"
                >
                  <span className="font-body text-[16px] italic text-pearl/82">
                    {feature}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-mist/60">
                    Open
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

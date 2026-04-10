"use client";
import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { watchCountLabel, watchFamilies } from "@/lib/watchData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Collections() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !pin || !viewport || !track) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const getStartX = () => 100;
          const getEndX = () =>
            Math.min(viewport.clientWidth - track.scrollWidth, 0);
          const getTravelDistance = () => Math.max(getStartX() - getEndX(), 0);

          if (getTravelDistance() <= 0) {
            gsap.set(track, { x: 0 });
            return;
          }

          gsap.fromTo(
            track,
            { x: () => getStartX() },
            {
              x: () => getEndX(),
              ease: "none",
              scrollTrigger: {
                trigger: pin,
                start: "top top",
                end: () => `+=${getTravelDistance()}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            },
          );
        },
      );

      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        gsap.set(track, { clearProps: "transform" });
      });
    }, section);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="collections"
      className="bg-void overflow-hidden"
    >
      <div
        ref={pinRef}
        className="flex min-h-[100svh] w-full flex-col justify-center py-20 lg:py-24"
      >
        {/* Header */}
        <div className="mx-auto mb-8 w-full max-w-7xl px-8">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="reveal font-mono text-xs tracking-[0.35em] uppercase text-gold mb-4">
                — Signature Models
              </p>
              <h2 className="reveal reveal-delay-1 font-display text-5xl md:text-7xl font-light text-pearl">
                The Timepieces
              </h2>
            </div>
            <p className="reveal reveal-delay-2 hidden md:block font-body text-mist text-base italic max-w-xs text-right leading-relaxed">
              Six model families developed as starting points for private
              commissions, then refined around a single client.
            </p>
          </div>
          <div className="gold-line mt-8 reveal reveal-delay-3" />
        </div>

        {/* Horizontal scroll */}
        <div
          ref={viewportRef}
          className="relative left-1/2 w-screen -translate-x-1/2 overflow-x-auto overflow-y-hidden pb-8 lg:overflow-hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div ref={trackRef} className="flex w-max gap-6 px-8">
            {watchFamilies.map((watch) => (
              <div
                key={watch.id}
                className="watch-card relative flex-shrink-0 w-[340px] md:w-[400px] group cursor-pointer"
                style={{
                  background: `linear-gradient(145deg, ${watch.accent} 0%, #0a0a0a 100%)`,
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="watch-glow" />

                {/* Number */}
                <div className="absolute top-6 right-8 font-mono text-xs tracking-widest text-gold/30">
                  {watch.id} / {watchCountLabel}
                </div>

                {/* Model image */}
                <div className="p-8 pb-2 md:p-10 md:pb-4">
                  <div className="relative mx-auto h-[240px] w-full max-w-[300px]">
                    <div
                      className="absolute inset-x-[12%] bottom-[12%] top-[10%] rounded-full blur-3xl"
                      style={{
                        background: `radial-gradient(circle, ${watch.highlight}22 0%, transparent 72%)`,
                      }}
                    />
                    <Image
                      src={watch.modelImage}
                      alt={`${watch.name} model`}
                      fill
                      sizes="(min-width: 768px) 400px, 340px"
                      className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)] transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="px-8 pb-8">
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-2">
                    {watch.line}
                  </p>
                  <h3 className="font-display text-3xl font-light text-pearl mb-2 group-hover:text-gold transition-colors duration-500">
                    {watch.name}
                  </h3>
                  <p className="font-body text-mist text-sm italic leading-relaxed mb-6">
                    {watch.desc}
                  </p>

                  {/* Features
                  <div className="flex flex-wrap gap-2 mb-6">
                    {watch.features.map((f) => (
                      <span
                        key={f}
                        className="font-mono text-[9px] tracking-widest uppercase px-3 py-1 border border-white/10 text-mist"
                      >
                        {f}
                      </span>
                    ))}
                  </div> */}

                  <div className="flex items-center justify-between gap-6">
                    <div>
                      <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-mist/40 mb-1">
                        Commission
                      </div>
                      <span className="font-display text-2xl text-gold">
                        {watch.commission}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/commission?model=${encodeURIComponent(watch.name)}`}
                    className="absolute top-2 left-4 mt-2 bg-gold px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-obsidian opacity-30 transition-colors duration-300 hover:bg-gold-light hover:opacity-100"
                  >
                    Customize
                  </Link>
                </div>

                {/* Bottom accent line */}
                <div
                  className="h-px w-0 group-hover:w-full transition-all duration-700"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${watch.highlight}, transparent)`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mx-auto mt-8 flex w-full max-w-7xl items-center justify-center gap-4 px-8">
          <div className="h-px flex-1 max-w-xs bg-white/5" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-mist/40">
            Scroll to discover
          </span>
          <div className="h-px flex-1 max-w-xs bg-white/5" />
        </div>
      </div>
    </section>
  );
}

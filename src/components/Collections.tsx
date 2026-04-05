"use client";
import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const watches = [
  {
    id: "01",
    name: "Nocturne",
    line: "Dress Signature",
    commission: "Private Commission",
    desc: "A slim formal watch tailored around your preferred metal, dial tone, and personal engraving language.",
    accent: "#11131a",
    highlight: "#c2a46f",
    features: ["Dial Palette", "Case Metal", "Personal Engraving"],
  },
  {
    id: "02",
    name: "Solstice",
    line: "Classic Calendar",
    commission: "Calendar Brief",
    desc: "Warm guilloche surfaces and calendar details composed to feel either restrained and formal or richly ceremonial.",
    accent: "#1a1410",
    highlight: "#d5b07b",
    features: ["Guilloche Pattern", "Applied Numerals", "Calendar Layout"],
  },
  {
    id: "03",
    name: "Meridian",
    line: "Sport Tailoring",
    commission: "Wrist-Fit Build",
    desc: "A sport silhouette commissioned around wrist size, bezel language, and water-ready finishing without losing refinement.",
    accent: "#0f1718",
    highlight: "#97b0ab",
    features: ["Case Diameter", "Bezel Finish", "Strap System"],
  },
  {
    id: "04",
    name: "Aeternum",
    line: "Open Balance",
    commission: "Complication Brief",
    desc: "An architectural dial with visible mechanics, specified around your appetite for drama, symmetry, and precious metals.",
    accent: "#15110f",
    highlight: "#dec07d",
    features: ["Openworked Dial", "Bridge Finish", "Precious Metal Case"],
  },
  {
    id: "05",
    name: "Vesper",
    line: "Rose Gold Signature",
    commission: "Personal Palette",
    desc: "Soft rose tones, satin shadows, and restrained detailing shaped to the client's wardrobe and heirloom references.",
    accent: "#1b1012",
    highlight: "#c48b7a",
    features: ["Rose Tone Selection", "Surface Finish", "Heirloom Motifs"],
  },
  {
    id: "06",
    name: "Monarch",
    line: "Grand Atelier",
    commission: "Heirloom Spec",
    desc: "Our most ceremonial family, conceived for private clients wanting bespoke typography, heraldry, and authored dial architecture.",
    accent: "#121419",
    highlight: "#bfc4ce",
    features: ["Custom Crest", "Dial Typography", "Caseback Inscription"],
  },
];

const watchCountLabel = String(watches.length).padStart(2, "0");

// SVG Watch Face Components
function WatchFaceSVG({
  watch,
  index,
}: {
  watch: (typeof watches)[0];
  index: number;
}) {
  const isTourbillon = index === 3;
  const isMeridian = index === 2;

  return (
    <svg
      viewBox="0 0 240 240"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`dialGrad${index}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={watch.highlight} stopOpacity="0.15" />
          <stop offset="100%" stopColor={watch.accent} stopOpacity="1" />
        </radialGradient>
        <radialGradient id={`caseGrad${index}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="100%" stopColor="#111111" />
        </radialGradient>
        <filter id={`glow${index}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Case shadow */}
      <circle cx="120" cy="124" r="96" fill="rgba(0,0,0,0.5)" />

      {/* Case */}
      <circle cx="120" cy="120" r="96" fill={`url(#caseGrad${index})`} />
      <circle
        cx="120"
        cy="120"
        r="96"
        fill="none"
        stroke={watch.highlight}
        strokeWidth="0.5"
        strokeOpacity="0.4"
      />

      {/* Lugs */}
      {[
        [-8, 50],
        [8, 50],
        [-8, 190],
        [8, 190],
      ].map(([x, y], i) => (
        <rect
          key={i}
          x={120 + (i % 2 === 0 ? -52 : 44)}
          y={y}
          width="8"
          height="18"
          rx="2"
          fill="#1a1a1a"
        />
      ))}

      {/* Crown */}
      <rect
        x="214"
        y="113"
        width="14"
        height="14"
        rx="3"
        fill="#2a2a2a"
        stroke={watch.highlight}
        strokeWidth="0.5"
        strokeOpacity="0.4"
      />

      {/* Dial */}
      <circle cx="120" cy="120" r="82" fill={`url(#dialGrad${index})`} />

      {/* Guilloché pattern for Solstice */}
      {index === 1 && (
        <g opacity="0.15">
          {Array.from({ length: 16 }).map((_, i) => (
            <line
              key={i}
              x1="120"
              y1="38"
              x2="120"
              y2="202"
              stroke={watch.highlight}
              strokeWidth="0.5"
              transform={`rotate(${i * 11.25} 120 120)`}
            />
          ))}
          {[20, 35, 50, 65].map((r, i) => (
            <circle
              key={i}
              cx="120"
              cy="120"
              r={r}
              fill="none"
              stroke={watch.highlight}
              strokeWidth="0.3"
            />
          ))}
        </g>
      )}

      {/* Ceramic bezel for Meridian */}
      {isMeridian && (
        <>
          <circle
            cx="120"
            cy="120"
            r="82"
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="12"
          />
          <circle
            cx="120"
            cy="120"
            r="82"
            fill="none"
            stroke="#a8c5d0"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
          {Array.from({ length: 60 }).map((_, i) => (
            <line
              key={i}
              x1="120"
              y1="40"
              x2="120"
              y2={i % 5 === 0 ? 47 : 44}
              stroke="#a8c5d0"
              strokeWidth={i % 5 === 0 ? "1.5" : "0.7"}
              strokeOpacity="0.7"
              transform={`rotate(${i * 6} 120 120)`}
            />
          ))}
        </>
      )}

      {/* Hour markers */}
      {Array.from({ length: 12 }).map((_, i) => (
        <g key={i} transform={`rotate(${i * 30} 120 120)`}>
          <rect
            x="119"
            y={i % 3 === 0 ? 46 : 49}
            width="2"
            height={i % 3 === 0 ? 12 : 8}
            fill={watch.highlight}
            opacity={i % 3 === 0 ? 0.9 : 0.5}
          />
        </g>
      ))}

      {/* Brand text */}
      <text
        x="120"
        y="95"
        textAnchor="middle"
        fill={watch.highlight}
        fontSize="7"
        fontFamily="serif"
        letterSpacing="3"
        opacity="0.9"
      >
        AURUM
      </text>
      <text
        x="120"
        y="107"
        textAnchor="middle"
        fill={watch.highlight}
        fontSize="4.5"
        fontFamily="monospace"
        letterSpacing="2"
        opacity="0.5"
      >
        GENÈVE
      </text>

      {/* Tourbillon cage */}
      {isTourbillon && (
        <g transform="translate(120, 148)">
          <circle
            cx="0"
            cy="0"
            r="14"
            fill="none"
            stroke={watch.highlight}
            strokeWidth="0.8"
            strokeOpacity="0.7"
          />
          <circle
            cx="0"
            cy="0"
            r="10"
            fill="none"
            stroke={watch.highlight}
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
          <line
            x1="-10"
            y1="0"
            x2="10"
            y2="0"
            stroke={watch.highlight}
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />
          <line
            x1="0"
            y1="-10"
            x2="0"
            y2="10"
            stroke={watch.highlight}
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />
          <circle cx="0" cy="0" r="2" fill={watch.highlight} opacity="0.8" />
        </g>
      )}

      {/* Date window */}
      {!isTourbillon && (
        <g transform="translate(148, 120)">
          <rect
            x="-8"
            y="-6"
            width="16"
            height="12"
            rx="1"
            fill="#0a0a0a"
            stroke={watch.highlight}
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />
          <text
            x="0"
            y="4.5"
            textAnchor="middle"
            fill={watch.highlight}
            fontSize="7"
            fontFamily="monospace"
            opacity="0.9"
          >
            14
          </text>
        </g>
      )}

      {/* Hands */}
      <HourHandSVG highlight={watch.highlight} />

      {/* Seconds subdial for Heritage */}
      {index === 1 && (
        <g transform="translate(120, 152)">
          <circle
            cx="0"
            cy="0"
            r="12"
            fill="none"
            stroke={watch.highlight}
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
          {Array.from({ length: 60 }).map((_, i) => (
            <line
              key={i}
              x1="0"
              y1="-9"
              x2="0"
              y2={i % 5 === 0 ? -7 : -8}
              stroke={watch.highlight}
              strokeWidth="0.5"
              strokeOpacity="0.5"
              transform={`rotate(${i * 6})`}
            />
          ))}
        </g>
      )}

      {/* Crystal reflection */}
      <path
        d="M 60 65 Q 120 55 180 70 L 185 75 Q 120 62 55 72 Z"
        fill="white"
        opacity="0.04"
      />
    </svg>
  );
}

function HourHandSVG({ highlight }: { highlight: string }) {
  return (
    <g>
      {/* Hour hand */}
      <polygon
        points="120,72 117,120 120,125 123,120"
        fill={highlight}
        opacity="0.9"
        style={{ transformOrigin: "120px 120px", transform: "rotate(-30deg)" }}
      />
      {/* Minute hand */}
      <polygon
        points="120,55 118.5,120 120,125 121.5,120"
        fill="#f0ede8"
        opacity="0.8"
        style={{ transformOrigin: "120px 120px", transform: "rotate(60deg)" }}
      />
      {/* Second hand */}
      <line
        x1="120"
        y1="130"
        x2="120"
        y2="58"
        stroke="#ff4d1c"
        strokeWidth="0.8"
        opacity="0.9"
        style={{ transformOrigin: "120px 120px", transform: "rotate(130deg)" }}
      />
      {/* Center */}
      <circle cx="120" cy="120" r="4" fill={highlight} />
      <circle cx="120" cy="120" r="2" fill="#080808" />
    </g>
  );
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
            {watches.map((watch, i) => (
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

                {/* Watch SVG */}
                <div className="p-10 pb-4">
                  <div className="w-56 h-56 mx-auto relative">
                    <WatchFaceSVG watch={watch} index={i} />
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

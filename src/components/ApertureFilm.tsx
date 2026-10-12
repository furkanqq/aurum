"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * "Through the Loupe" — the atelier film.
 *
 * The film first appears through a small circular aperture framed by a bezel
 * (a watchmaker's loupe). Scrolling turns the bezel and opens the aperture
 * until the film fills the screen, at which point a viewfinder HUD takes over:
 * chapter captions synced to the footage and a small-seconds sub-dial that
 * doubles as the player (sweep = loop progress, diamonds = chapters,
 * centre = play / pause).
 */

const FILM_LENGTH = 16; // seconds — fallback until metadata is available
const FILM_FPS = 30;
const BEZEL_GUTTER = 24; // px between the aperture glass and the outer bezel ring (inset-6)

type Chapter = {
  start: number;
  numeral: string;
  title: string;
  note: string;
};

// Start times match the cuts in /film/aurum-film-*.mp4 (keyframes are forced on each cut).
const chapters: Chapter[] = [
  {
    start: 0,
    numeral: "I",
    title: "Sunray Dial",
    note: "Gold-applied indices, read against a hand-brushed sunray.",
  },
  {
    start: 1.5,
    numeral: "II",
    title: "The Silhouette",
    note: "Case, lugs and bracelet drawn as one continuous line.",
  },
  {
    start: 2.9,
    numeral: "III",
    title: "The Crest",
    note: "A private heraldry, raised in gold beneath the hands.",
  },
  {
    start: 5.93,
    numeral: "IV",
    title: "Engraved Bezel",
    note: "An inscription cut by hand into the gold, for one name only.",
  },
  {
    start: 10.17,
    numeral: "V",
    title: "Lion Links",
    note: "Every link chased by hand: lion, scroll and leaf.",
  },
  {
    start: 14.27,
    numeral: "VI",
    title: "The Calibre",
    note: "An automatic movement, finished to be seen through sapphire.",
  },
  {
    start: 15.17,
    numeral: "VII",
    title: "On the Wrist",
    note: "Sized to a single wrist. Worn by no one else.",
  },
];

const LAST_NUMERAL = chapters[chapters.length - 1].numeral;

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);
const segment = (value: number, from: number, to: number) =>
  clamp01((value - from) / (to - from));
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const pad2 = (value: number) => String(Math.floor(value)).padStart(2, "0");

const chapterAt = (time: number) => {
  let index = 0;
  for (let i = 0; i < chapters.length; i++) {
    if (time >= chapters[i].start - 0.03) index = i;
  }
  return index;
};

export default function ApertureFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const dipRef = useRef<HTMLDivElement>(null);
  const bezelRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const firstWordRef = useRef<HTMLSpanElement>(null);
  const secondWordRef = useRef<HTMLSpanElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const elapsedRef = useRef<HTMLSpanElement>(null);

  const chapterRef = useRef(0);
  const hudActiveRef = useRef(false);
  const userPausedRef = useRef(false);

  const [chapter, setChapter] = useState(0);
  const [hudActive, setHudActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Paints one frame of the scroll choreography. progress: 0 = closed loupe, 1 = full-bleed film.
  const render = useCallback((progress: number) => {
    const stage = stageRef.current;
    const mask = maskRef.current;
    const video = videoRef.current;
    const bezel = bezelRef.current;
    const first = firstWordRef.current;
    const second = secondWordRef.current;
    const intro = introRef.current;
    const shade = shadeRef.current;
    const hud = hudRef.current;
    if (!stage || !mask || !video || !bezel || !first || !second || !intro || !shade || !hud) {
      return;
    }

    const width = stage.clientWidth;
    const height = stage.clientHeight;
    const startRadius = Math.max(bezel.offsetWidth / 2 - BEZEL_GUTTER, 1);
    const endRadius = Math.hypot(width / 2, height / 2) + 2;
    const open = easeInOutCubic(segment(progress, 0.04, 0.78));
    const radius = startRadius + (endRadius - startRadius) * open;
    const push = radius - startRadius;
    const horizontal = width >= 1024;

    // Aperture opens; the image inside settles from "magnified" to natural.
    mask.style.clipPath = `circle(${radius.toFixed(1)}px at 50% 50%)`;
    video.style.transform = `scale(${(1.32 - 0.32 * open).toFixed(4)})`;

    // Bezel rides the aperture edge outwards while turning, then dissolves.
    bezel.style.transform = `scale(${(radius / startRadius).toFixed(4)}) rotate(${(-36 * open).toFixed(2)}deg)`;
    bezel.style.opacity = (1 - segment(open, 0.1, 0.45)).toFixed(3);

    // The headline is pushed apart by the opening lens.
    const wordOpacity = (1 - segment(open, 0.04, 0.38)).toFixed(3);
    first.style.transform = horizontal
      ? `translate3d(${(-push).toFixed(1)}px,0,0)`
      : `translate3d(0,${(-push).toFixed(1)}px,0)`;
    second.style.transform = horizontal
      ? `translate3d(${push.toFixed(1)}px,0,0)`
      : `translate3d(0,${push.toFixed(1)}px,0)`;
    first.style.opacity = wordOpacity;
    second.style.opacity = wordOpacity;

    intro.style.opacity = (1 - segment(open, 0, 0.16)).toFixed(3);
    shade.style.opacity = open.toFixed(3);

    const hudProgress = segment(progress, 0.7, 0.86);
    hud.style.opacity = hudProgress.toFixed(3);
    const hudOn = hudProgress > 0.5;
    if (hudOn !== hudActiveRef.current) {
      hudActiveRef.current = hudOn;
      setHudActive(hudOn);
    }
  }, []);

  // Scroll choreography: pin the stage and scrub the aperture open.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const mm = gsap.matchMedia();
    const state = { p: 0 };

    mm.add(
      {
        // One condition must always match, otherwise gsap never calls the handler.
        isMotion: "(prefers-reduced-motion: no-preference)",
        isReduced: "(prefers-reduced-motion: reduce)",
        isWide: "(min-width: 1024px)",
      },
      (context) => {
        const { isReduced, isWide } = context.conditions as {
          isReduced: boolean;
          isWide: boolean;
        };

        if (isReduced) {
          state.p = 1;
          render(1);
          return;
        }

        state.p = 0;
        render(0);

        gsap.to(state, {
          p: 1,
          ease: "none",
          onUpdate: () => render(state.p),
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * (isWide ? 1.6 : 1.15))}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => render(state.p),
          },
        });
      },
    );

    return () => mm.revert();
  }, [render]);

  // Playback: endless muted loop while near the viewport, paused off-screen.
  // A rAF loop drives the sweep hands, timecode, loop dip and chapter captions.
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    video.muted = true;
    video.defaultMuted = true;

    let frame = 0;
    let lastTime = 0;
    let hasLooped = false;

    const tick = () => {
      const duration =
        Number.isFinite(video.duration) && video.duration > 0 ? video.duration : FILM_LENGTH;
      const time = Math.min(video.currentTime, duration);
      if (time + 1 < lastTime) hasLooped = true;
      lastTime = time;

      const turn = `rotate(${((time / duration) * 360).toFixed(2)}deg)`;
      if (handRef.current) handRef.current.style.transform = turn;
      if (orbitRef.current) orbitRef.current.style.transform = turn;

      if (timecodeRef.current) {
        const whole = Math.floor(time);
        const frames = Math.floor((time - whole) * FILM_FPS);
        timecodeRef.current.textContent = `TC 00:00:${pad2(whole)}:${pad2(frames)}`;
      }
      if (elapsedRef.current) {
        elapsedRef.current.textContent = `00:${pad2(time)} / 00:${pad2(Math.round(duration))}`;
      }

      // Brief dip to black around the loop seam so the restart reads as intentional.
      if (dipRef.current) {
        const fadeOut = segment(time, duration - 0.35, duration);
        const fadeIn = hasLooped ? 1 - segment(time, 0, 0.3) : 0;
        const dip = video.paused ? 0 : Math.max(fadeOut, fadeIn) * 0.92;
        dipRef.current.style.opacity = dip.toFixed(3);
      }

      const index = chapterAt(time);
      if (index !== chapterRef.current) {
        chapterRef.current = index;
        setChapter(index);
      }

      frame = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const stopLoop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const play = () => {
      if (userPausedRef.current) return;
      const attempt = video.play();
      if (attempt) attempt.catch(() => setIsPlaying(false));
    };

    const onPlaying = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("pause", onPause);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload !== "auto") video.preload = "auto";
          play();
          startLoop();
        } else {
          video.pause();
          stopLoop();
        }
      },
      { rootMargin: "50% 0px 50% 0px" },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      stopLoop();
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedRef.current = false;
      video.play().catch(() => setIsPlaying(false));
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  };

  const jumpTo = (index: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = chapters[index].start + 0.04;
    chapterRef.current = index;
    setChapter(index);
  };

  const active = chapters[chapter];
  const focusable = hudActive ? 0 : -1;

  return (
    <section
      ref={sectionRef}
      id="film"
      aria-label="The Atelier Film"
      className="relative z-10 bg-obsidian"
    >
      <div
        ref={stageRef}
        className="relative h-[100svh] w-full overflow-hidden bg-obsidian [--ap:min(74vw,37svh)] lg:[--ap:min(46vmin,500px)]"
      >
        {/* Ambient glow, echoing the hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_50%,rgba(201,169,110,0.07)_0%,transparent_70%)]"
        />

        {/* The film, seen through the aperture */}
        <div
          ref={maskRef}
          className="absolute inset-0 overflow-hidden [clip-path:circle(calc(var(--ap)_/_2)_at_50%_50%)]"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover will-change-transform [transform:scale(1.32)]"
            poster="/film/aurum-film-poster.jpg"
            muted
            loop
            playsInline
            preload="none"
            disablePictureInPicture
            tabIndex={-1}
            aria-label="Atelier film: a close study of a hand-engraved Aurum commission"
          >
            <source src="/film/aurum-film-1080.mp4" type="video/mp4" media="(min-width: 1024px)" />
            <source src="/film/aurum-film-720.mp4" type="video/mp4" />
          </video>

          <div
            ref={shadeRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0"
            style={{
              background:
                "linear-gradient(to top, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.35) 26%, rgba(8,8,8,0) 48%), linear-gradient(to bottom, rgba(8,8,8,0.75) 0%, rgba(8,8,8,0) 24%), radial-gradient(ellipse at center, rgba(8,8,8,0) 55%, rgba(8,8,8,0.55) 100%)",
            }}
          />
          <div ref={dipRef} aria-hidden className="pointer-events-none absolute inset-0 bg-obsidian opacity-0" />
        </div>

        {/* Loupe bezel: 60-minute track, chapter diamonds, ember sweep = loop progress */}
        <div
          ref={bezelRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 m-auto h-[calc(var(--ap)_+_48px)] w-[calc(var(--ap)_+_48px)] will-change-transform"
        >
          <div className="absolute inset-0 rounded-full border border-gold/15" />
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className="absolute inset-0" style={{ transform: `rotate(${i * 6}deg)` }}>
              <span
                className={`absolute left-1/2 top-0 -translate-x-1/2 ${
                  i % 5 === 0 ? "h-3 w-[1.5px] bg-gold/55" : "h-1.5 w-px bg-gold/20"
                }`}
              />
            </div>
          ))}
          {chapters.map((c) => (
            <div
              key={c.numeral}
              className="absolute inset-0"
              style={{ transform: `rotate(${(c.start / FILM_LENGTH) * 360}deg)` }}
            >
              <span className="absolute left-1/2 -top-3.5 -ml-[3px] block h-[6px] w-[6px] rotate-45 border border-gold/70 bg-obsidian" />
            </div>
          ))}
          <div ref={orbitRef} className="absolute inset-0">
            <span className="absolute left-1/2 -top-1 -ml-1 block h-2 w-2 rounded-full bg-ember shadow-[0_0_14px_rgba(255,77,28,0.85)]" />
          </div>
          {/* Glass edge + glare */}
          <div className="absolute inset-6 rounded-full border border-gold/30 shadow-[inset_0_0_70px_rgba(0,0,0,0.7),0_0_90px_rgba(201,169,110,0.08)]" />
          <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.10)_0%,transparent_42%)]" />
        </div>

        {/* Headline, split around the loupe and pushed apart as it opens */}
        <h2
          aria-label="Through the Loupe"
          className="pointer-events-none absolute inset-0 grid grid-rows-[1fr_auto_1fr] items-center justify-items-center gap-5 px-6 lg:grid-cols-[1fr_auto_1fr] lg:grid-rows-1 lg:gap-12"
        >
          <span
            ref={firstWordRef}
            aria-hidden
            className="self-end font-display text-[clamp(2.6rem,11vw,4.5rem)] font-light leading-none text-pearl will-change-transform lg:self-auto lg:justify-self-end lg:text-[clamp(3rem,5.4vw,7rem)]"
          >
            Through
          </span>
          <span aria-hidden className="block h-[calc(var(--ap)_+_48px)] w-[calc(var(--ap)_+_48px)]" />
          <span
            ref={secondWordRef}
            aria-hidden
            className="shimmer-text self-start pb-[0.18em] font-display text-[clamp(2.6rem,11vw,4.5rem)] font-light italic leading-none will-change-transform lg:self-auto lg:justify-self-start lg:text-[clamp(3rem,5.4vw,7rem)]"
          >
            the Loupe.
          </span>
        </h2>

        {/* Intro chrome (closed state) */}
        <div ref={introRef} className="pointer-events-none absolute inset-0">
          <p className="absolute inset-x-0 top-20 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-gold lg:top-28 lg:text-xs [@media(max-height:560px)]:hidden">
            — The Atelier Film
          </p>
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 lg:bottom-10 lg:gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist">
              Scroll to open
            </span>
            <div className="h-8 w-px animate-pulse bg-gradient-to-b from-gold/60 to-transparent lg:h-12" />
          </div>
        </div>

        {/* Viewfinder HUD (open state) */}
        <div
          ref={hudRef}
          aria-hidden={!hudActive}
          className={`absolute inset-0 opacity-0 ${hudActive ? "" : "pointer-events-none"}`}
        >
          <div className="absolute inset-x-4 bottom-4 top-[4.75rem] sm:inset-x-6 sm:bottom-6 lg:inset-x-10 lg:bottom-10 lg:top-28">
            <span className="absolute left-0 top-0 h-5 w-5 border-l border-t border-gold/50 lg:h-7 lg:w-7" />
            <span className="absolute right-0 top-0 h-5 w-5 border-r border-t border-gold/50 lg:h-7 lg:w-7" />
            <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-gold/50 lg:h-7 lg:w-7" />
            <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r border-gold/50 lg:h-7 lg:w-7" />

            <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
              {/* Top row */}
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold lg:text-xs">
                    — The Atelier Film
                  </p>
                  <p className="mt-2 hidden font-body text-sm italic text-pearl/75 sm:block">
                    Seven studies of a single commission.
                  </p>
                </div>
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-mist/80">
                  <span
                    className={`h-1.5 w-1.5 rounded-full bg-ember ${isPlaying ? "animate-pulse" : "opacity-40"}`}
                  />
                  <span>{isPlaying ? "Loop" : "Paused"}</span>
                  <span className="hidden h-px w-6 bg-white/15 sm:block" />
                  <span ref={timecodeRef} className="hidden tabular-nums sm:inline">
                    TC 00:00:00:00
                  </span>
                </div>
              </div>

              {/* Bottom row */}
              <div className="flex items-end justify-between gap-4">
                {/* Chapter caption */}
                <div className="min-w-0 flex-1 sm:max-w-md sm:flex-none">
                  <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em]">
                    <span className="text-gold">{active.numeral}</span>
                    <span className="h-px w-8 bg-gold/40" />
                    <span className="text-mist/60">{LAST_NUMERAL}</span>
                  </div>
                  <div className="grid overflow-hidden">
                    <AnimatePresence initial={false}>
                      <motion.h3
                        key={active.title}
                        className="pb-[0.12em] font-display text-[1.75rem] font-light leading-[1.05] text-pearl [grid-area:1/1] sm:text-5xl lg:text-6xl"
                        initial={{ y: "110%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-110%" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {active.title}
                      </motion.h3>
                    </AnimatePresence>
                  </div>
                  <div className="mt-3 grid">
                    <AnimatePresence initial={false}>
                      <motion.p
                        key={active.title}
                        className="font-body text-[15px] italic leading-relaxed text-mist [grid-area:1/1] sm:text-base"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                      >
                        {active.note}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <Link
                    href="/commission"
                    tabIndex={focusable}
                    className="mt-5 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-gold transition-colors duration-300 hover:text-gold-light"
                  >
                    Commission yours
                    <span className="h-px w-8 bg-gold/60" />
                  </Link>
                </div>

                {/* Small-seconds sub-dial = the player */}
                <div className="flex shrink-0 flex-col items-center gap-3">
                  <div className="relative h-[104px] w-[104px] rounded-full border border-gold/30 bg-obsidian/40 backdrop-blur-md [--mark:32px] lg:h-[136px] lg:w-[136px] lg:[--mark:46px]">
                    {Array.from({ length: 60 }).map((_, i) => (
                      <span
                        key={i}
                        aria-hidden
                        className="absolute inset-0"
                        style={{ transform: `rotate(${i * 6}deg)` }}
                      >
                        <span
                          className={`absolute left-1/2 top-[3px] -translate-x-1/2 ${
                            i % 5 === 0 ? "h-[7px] w-px bg-gold/60" : "h-[3px] w-px bg-gold/25"
                          }`}
                        />
                      </span>
                    ))}

                    <div ref={handRef} aria-hidden className="pointer-events-none absolute inset-0">
                      <span className="absolute bottom-1/2 left-1/2 h-[40%] w-px -translate-x-1/2 bg-ember" />
                      <span className="absolute left-1/2 top-1/2 h-[12%] w-px -translate-x-1/2 bg-ember/70" />
                    </div>

                    {chapters.map((c, i) => {
                      const angle = (c.start / FILM_LENGTH) * 360;
                      const isActive = i === chapter;
                      return (
                        <button
                          key={c.numeral}
                          type="button"
                          onClick={() => jumpTo(i)}
                          tabIndex={focusable}
                          aria-label={`Jump to chapter ${c.numeral}: ${c.title}`}
                          title={`${c.numeral} · ${c.title}`}
                          className="group absolute left-1/2 top-1/2 -ml-2.5 -mt-2.5 flex h-5 w-5 items-center justify-center"
                          style={{
                            transform: `rotate(${angle}deg) translateY(calc(var(--mark) * -1)) rotate(${-angle}deg)`,
                          }}
                        >
                          <span
                            className={`block h-[6px] w-[6px] rotate-45 transition-all duration-300 ${
                              isActive
                                ? "scale-125 bg-gold shadow-[0_0_10px_rgba(201,169,110,0.7)]"
                                : "border border-gold/60 group-hover:bg-gold/60"
                            }`}
                          />
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={togglePlayback}
                      tabIndex={focusable}
                      aria-label={isPlaying ? "Pause film" : "Play film"}
                      className="absolute inset-0 m-auto flex h-9 w-9 items-center justify-center rounded-full bg-gold text-obsidian transition-colors duration-300 hover:bg-gold-light lg:h-11 lg:w-11"
                    >
                      {isPlaying ? <Pause size={13} strokeWidth={1.75} /> : <Play size={13} strokeWidth={1.75} className="ml-0.5" />}
                    </button>
                  </div>
                  <span
                    ref={elapsedRef}
                    className="font-mono text-[10px] tabular-nums tracking-[0.25em] text-mist/70"
                  >
                    00:00 / 00:16
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

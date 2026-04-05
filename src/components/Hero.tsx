"use client";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Particle field on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }[] = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 169, 110, ${p.opacity})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });
      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-60"
      />

      {/* Radial glow center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,169,110,0.06)_0%,transparent_70%)]" />

      {/* Large decorative watch circle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[720px] md:h-[720px] pointer-events-none">
        <div
          className="w-full h-full rounded-full border border-gold/10"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 2s ease 0.5s",
            boxShadow: "0 0 80px rgba(201,169,110,0.04) inset",
          }}
        />
        <div
          className="absolute inset-8 rounded-full border border-gold/6"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 2s ease 0.8s",
          }}
        />
        {/* Hour markers */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-full"
            style={{
              transform: `rotate(${i * 30}deg)`,
              opacity: loaded ? 1 : 0,
              transition: `opacity 1.5s ease ${0.8 + i * 0.05}s`,
            }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2"
              style={{
                width: i % 3 === 0 ? "2px" : "1px",
                height: i % 3 === 0 ? "24px" : "14px",
                background:
                  i % 3 === 0
                    ? "rgba(201,169,110,0.5)"
                    : "rgba(201,169,110,0.2)",
              }}
            />
          </div>
        ))}
        {/* Animated hands */}
        <ClockHands loaded={loaded} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-8">
        <p
          className="font-mono text-xs tracking-[0.4em] uppercase text-gold mb-12"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s ease 0.3s",
          }}
        >
          Est. 1887 · Geneva
        </p>

        <h1
          className="font-display font-light leading-none mb-8"
          style={{
            fontSize: "clamp(4rem, 12vw, 8rem)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(30px)",
            transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
          }}
        >
          <span className="block text-pearl">Time</span>
          <span className="block shimmer-text italic">Perfected.</span>
        </h1>

        <div
          className="gold-line w-24 mx-auto mb-10"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 1s ease 1s",
          }}
        />

        {/* <p
          className="font-body text-mist text-sm md:text-base font-light leading-relaxed max-w-lg mx-auto mb-8 italic"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s ease 1.1s",
          }}
        >
          Each timepiece is a meditation on precision — born from three
          generations of obsessive craftsmanship.
        </p> */}

        <div
          className="flex items-center justify-center gap-4"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 1s ease 1.3s",
          }}
        >
          <a
            href="#collections"
            className="font-mono text-xs tracking-[0.25em] uppercase bg-gold text-obsidian px-6 py-4 hover:bg-gold-light transition-all duration-300"
          >
            Explore Collection
          </a>
          <a
            href="#craft"
            className="font-mono text-xs tracking-[0.25em] uppercase border border-gold/40 text-pearl px-6 py-4 hover:border-gold transition-all duration-300"
          >
            Our Craft
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 2s",
        }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-mist">
          Scroll
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-gold/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

function ClockHands({ loaded }: { loaded: boolean }) {
  const [rotation, setRotation] = useState(() => {
    const now = new Date();
    const seconds = now.getSeconds();
    const minuteRaw = (now.getMinutes() + seconds / 60) * 6;
    const hourRaw =
      ((now.getHours() % 12) + now.getMinutes() / 60 + seconds / 3600) * 30;

    return {
      secondRaw: seconds * 6,
      minuteRaw,
      hourRaw,
      secondTurns: 0,
      minuteTurns: 0,
      hourTurns: 0,
      secondDeg: seconds * 6,
      minuteDeg: minuteRaw,
      hourDeg: hourRaw,
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const seconds = now.getSeconds();
      const nextSecondRaw = seconds * 6;
      const nextMinuteRaw = (now.getMinutes() + seconds / 60) * 6;
      const nextHourRaw =
        ((now.getHours() % 12) + now.getMinutes() / 60 + seconds / 3600) * 30;

      setRotation((current) => {
        const secondTurns =
          nextSecondRaw < current.secondRaw
            ? current.secondTurns + 360
            : current.secondTurns;
        const minuteTurns =
          nextMinuteRaw < current.minuteRaw
            ? current.minuteTurns + 360
            : current.minuteTurns;
        const hourTurns =
          nextHourRaw < current.hourRaw
            ? current.hourTurns + 360
            : current.hourTurns;

        return {
          secondRaw: nextSecondRaw,
          minuteRaw: nextMinuteRaw,
          hourRaw: nextHourRaw,
          secondTurns,
          minuteTurns,
          hourTurns,
          secondDeg: secondTurns + nextSecondRaw,
          minuteDeg: minuteTurns + nextMinuteRaw,
          hourDeg: hourTurns + nextHourRaw,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute inset-0"
      style={{
        opacity: loaded ? 1 : 0,
        transition: "opacity 2s ease 1.5s",
      }}
    >
      {/* Hour hand */}
      <div
        className="absolute left-1/2 top-1/2 origin-bottom"
        style={{
          width: "2px",
          height: "28%",
          background: "rgba(201,169,110,0.8)",
          transform: `translateX(-50%) rotate(${rotation.hourDeg}deg)`,
          transformOrigin: "50% 100%",
          marginTop: "-28%",
          transition: "transform 0.5s ease",
        }}
      />
      {/* Minute hand */}
      <div
        className="absolute left-1/2 top-1/2 origin-bottom"
        style={{
          width: "1px",
          height: "38%",
          background: "rgba(201,169,110,0.6)",
          transform: `translateX(-50%) rotate(${rotation.minuteDeg}deg)`,
          transformOrigin: "50% 100%",
          marginTop: "-38%",
          transition: "transform 0.5s ease",
        }}
      />
      {/* Second hand */}
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: "1px",
          height: "42%",
          background: "#ff4d1c",
          transform: `translateX(-50%) rotate(${rotation.secondDeg}deg)`,
          transformOrigin: "50% 100%",
          marginTop: "-42%",
          transition: "transform 0.2s ease",
        }}
      />
      {/* Center dot */}
      <div className="absolute left-1/2 top-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold" />
    </div>
  );
}

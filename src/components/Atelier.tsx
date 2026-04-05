import Link from "next/link";

const commissionSteps = [
  { label: "Design Brief", value: "10 minutes" },
  { label: "Consultation", value: "Private review" },
  { label: "Outcome", value: "Tailored proposal" },
];

export default function Atelier() {
  return (
    <section id="atelier" className="relative overflow-hidden bg-carbon py-32">
      <div className="absolute inset-0 opacity-[0.025]">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-gold"
            style={{
              width: `${(i + 1) * 80}px`,
              height: `${(i + 1) * 80}px`,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl px-8 text-center">
        <p className="reveal mb-6 font-mono text-xs uppercase tracking-[0.35em] text-gold">
          — Private Commission Desk
        </p>
        <h2 className="reveal reveal-delay-1 mb-8 font-display text-5xl font-light leading-tight text-pearl md:text-7xl">
          Begin Your
          <br />
          <span className="shimmer-text italic">Commission</span>
        </h2>
        <div className="gold-line reveal reveal-delay-2 mx-auto mb-10 w-24" />
        <p className="reveal reveal-delay-3 mx-auto mb-14 max-w-2xl font-body text-lg italic leading-relaxed text-mist/70">
          Rather than collecting a single email, we invite each client into a
          detailed commission brief covering wrist size, preferred mood,
          materials, complications, engravings, and the story the watch should
          carry.
        </p>

        <div className="reveal reveal-delay-4 mx-auto flex max-w-md flex-col items-center gap-5">
          <Link
            href="/commission"
            className="w-full bg-gold px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-obsidian transition-colors duration-300 hover:bg-gold-light"
          >
            Enter Commission Room
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mist/40">
            A guided dossier works better here than a single contact field.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-3">
          {commissionSteps.map((item) => (
            <div key={item.label} className="reveal text-center">
              <div className="mb-1 font-display text-xl text-gold">
                {item.value}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-mist/40">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

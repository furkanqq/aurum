"use client";

const stats = [
  { value: "1:1", unit: "brief", label: "Private design dialogue" },
  { value: "12+", unit: "weeks", label: "From sketch to delivery" },
  { value: "40+", unit: "choices", label: "Typically personalized" },
  { value: "6", unit: "families", label: "Starting points, never limits" },
];

const pillars = [
  {
    number: "I",
    title: "The Brief",
    body: "Every commission starts with proportion, mood, wrist size, movement preference, and the personal symbols the future owner wants the watch to carry.",
  },
  {
    number: "II",
    title: "The Movement",
    body: "We match the movement architecture to the client: restrained time-only, calendar-led, open balance, or a more ceremonial mechanical statement.",
  },
  {
    number: "III",
    title: "The Finish",
    body: "Metals, brushing, polishing, engraving, and strap materials are resolved by hand so the final object feels authored rather than selected from a shelf.",
  },
];

export default function Craft() {
  return (
    <section id="craft" className="relative z-10 bg-carbon py-32">
      <div className="max-w-7xl mx-auto px-8">
        {/* Top: manifesto */}
        <div className="grid md:grid-cols-2 gap-20 mb-28">
          <div>
            <p className="reveal font-mono text-xs tracking-[0.35em] uppercase text-gold mb-6">
              — Bespoke Craft
            </p>
            <h2 className="reveal reveal-delay-1 font-display text-5xl md:text-6xl font-light text-pearl leading-tight">
              Made for
              <br />
              <span className="italic text-gold">one wrist.</span>
              <br />
              Guided by
              <br />
              one story.
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="reveal reveal-delay-2 font-body text-mist text-lg italic leading-relaxed mb-8">
              Aurum does not publish prices or ship stock watches. Each project
              begins with a private design brief covering proportion, movement
              character, metals, numerals, engraving, and the way the watch
              should feel on the wrist.
            </p>
            <p className="reveal reveal-delay-3 font-body text-mist/60 text-base leading-relaxed">
              We develop every commission in dialogue with the client, then
              produce it by hand in tightly limited slots. The result is not a
              product line item, but a personal mechanical object built to live
              with one owner.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 mb-28">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-carbon p-10 text-center group hover:bg-graphite transition-colors duration-500"
            >
              <div className="font-display text-5xl md:text-6xl font-light text-pearl mb-1 group-hover:text-gold transition-colors duration-500">
                {s.value}
              </div>
              <div className="font-mono text-xs tracking-widest uppercase text-gold mb-2">
                {s.unit}
              </div>
              <div className="font-body text-mist/50 text-sm italic">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-px bg-white/5">
          {pillars.map((p, i) => (
            <div
              key={p.number}
              className={`reveal reveal-delay-${i + 1} bg-carbon p-10 border-t border-gold/20`}
            >
              <div className="font-display text-7xl font-light text-gold/20 mb-6 leading-none">
                {p.number}
              </div>
              <h3 className="font-display text-2xl font-light text-pearl mb-4">
                {p.title}
              </h3>
              <p className="font-body text-mist/70 text-base italic leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

const timeline = [
  { year: "01", title: "Private Consultation", desc: "We define wrist profile, aesthetic references, movement preference, and the personal narrative the watch should carry." },
  { year: "02", title: "Design Direction", desc: "Our atelier develops material palettes, case architecture, dial treatments, and typography around that brief." },
  { year: "03", title: "Prototype Review", desc: "Proportions, finishes, strap options, and engravings are refined until the commission feels inevitable." },
  { year: "04", title: "Hand Assembly", desc: "Components are finished, cased, and regulated by hand in a production slot reserved for your watch alone." },
  { year: "05", title: "Presentation & Service", desc: "The completed piece is delivered privately with archival notes, care guidance, and long-term service registration." },
];

export default function Heritage() {
  return (
    <section id="heritage" className="bg-obsidian py-32">
      <div className="max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <p className="reveal font-mono text-xs tracking-[0.35em] uppercase text-gold mb-4">— Commission Journey</p>
          <h2 className="reveal reveal-delay-1 font-display text-5xl md:text-7xl font-light text-pearl">
            From Sketch To Heirloom
          </h2>
          <div className="gold-line mt-8 reveal reveal-delay-2" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent" />

          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
              <div
                key={item.year}
                className={`reveal reveal-delay-${(i % 4) + 1} relative grid md:grid-cols-2 gap-8 py-12 ${
                  i % 2 === 0 ? "" : "md:text-left"
                }`}
              >
                {/* Dot on line */}
                <div className="absolute left-[-5px] md:left-1/2 md:-translate-x-1/2 top-14 w-2.5 h-2.5 rounded-full bg-gold border-2 border-obsidian" />

                {i % 2 === 0 ? (
                  <>
                    <div className="pl-8 md:pl-0 md:pr-16 md:text-right">
                      <span className="font-mono text-xs tracking-[0.3em] uppercase text-gold/50 block mb-2">
                        {item.year}
                      </span>
                      <h3 className="font-display text-2xl font-light text-pearl mb-3">{item.title}</h3>
                      <p className="font-body text-mist/70 italic leading-relaxed">{item.desc}</p>
                    </div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div className="pl-8 md:pl-16">
                      <span className="font-mono text-xs tracking-[0.3em] uppercase text-gold/50 block mb-2">
                        {item.year}
                      </span>
                      <h3 className="font-display text-2xl font-light text-pearl mb-3">{item.title}</h3>
                      <p className="font-body text-mist/70 italic leading-relaxed">{item.desc}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

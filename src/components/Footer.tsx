import Link from "next/link";

export default function Footer() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Archive", href: "/archive" },
    { label: "Materials", href: "/materials" },
    { label: "About", href: "/about" },
    { label: "Commission", href: "/commission" },
  ];

  return (
    <footer className="relative z-10 bg-obsidian border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-5 relative flex-shrink-0">
                <div className="absolute inset-0 border border-gold rotate-45" />
                <div className="absolute inset-[3px] bg-gold rotate-45" />
              </div>
              <span className="font-display text-lg font-light tracking-[0.25em] text-pearl uppercase">
                Aurum
              </span>
            </div>
            <p className="font-body text-mist/50 text-sm italic leading-relaxed max-w-xs">
              Hand-built mechanical watches commissioned for private clients.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold/50 mb-4">
              Navigate
            </p>
            <ul className="flex flex-col gap-2">
              {links.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-body text-mist/60 text-sm hover:text-gold transition-colors duration-300 italic"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold/50 mb-4">
              Contact
            </p>
            <ul className="flex flex-col gap-2">
              <li className="font-body text-mist/60 text-sm italic">
                Rue du Rhône 48
              </li>
              <li className="font-body text-mist/60 text-sm italic">
                Geneva, 1204
              </li>
              <li className="font-body text-mist/60 text-sm italic mt-2">
                commissions@aurum.ch
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-line mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-mist/80">
            © 2026 Aurum Atelier. All rights reserved.
          </p>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-mist/80">
            Private commissions only
          </p>
        </div>
      </div>
    </footer>
  );
}

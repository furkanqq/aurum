"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Process", href: "/process" },
    { label: "Materials", href: "/materials" },
    { label: "FAQ", href: "/faq" },
    { label: "About", href: "/about" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? "py-4 bg-obsidian/80 backdrop-blur-md border-b border-gold/10" : "py-8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 relative">
              <div className="absolute inset-0 border border-gold rotate-45" />
              <div className="absolute inset-[4px] bg-gold rotate-45" />
            </div>
            <Link
              href="/"
              className="font-display text-xl font-light tracking-[0.25em] text-pearl uppercase"
            >
              Aurum
            </Link>
          </div>

          {/* Nav links */}
          <ul className="hidden md:flex items-center gap-7 lg:gap-10">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="font-mono text-xs tracking-[0.2em] uppercase text-mist hover:text-gold transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/commission"
              className="font-mono text-xs tracking-[0.2em] uppercase text-obsidian bg-gold hover:bg-gold-light transition-colors duration-300 px-6 py-3"
            >
              Begin Commission
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] w-8"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block h-px bg-pearl transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`block h-px bg-pearl transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-pearl transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-obsidian flex flex-col items-center justify-center transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center gap-8">
          {navItems.map((item, i) => (
            <li key={item.label} style={{ transitionDelay: `${i * 80}ms` }}>
              <Link
                href={item.href}
                className="font-display text-4xl font-light text-pearl hover:text-gold transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/commission"
          className="mt-10 border border-gold/40 bg-gold px-7 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-obsidian transition-colors duration-300 hover:bg-gold-light"
          onClick={() => setMenuOpen(false)}
        >
          Begin Commission
        </Link>
      </div>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "What We Do", href: "/#what-we-do" },
  { label: "Who We Are", href: "/#who-we-are" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
  { label: "Legal", href: "/legal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a1628]/95 backdrop-blur-sm shadow-lg"
          : "bg-[#0a1628]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Wordmark */}
          <Link
            href="/"
            className="text-white font-semibold text-xl tracking-[0.12em] uppercase select-none"
          >
            Kape<span className="text-[#c09040]">X</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[#a39d93] hover:text-white text-xs tracking-[0.12em] uppercase transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2 -mr-2"
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-px bg-white mb-1.5 transition-all" />
            <span className="block w-5 h-px bg-white mb-1.5 transition-all" />
            <span className="block w-5 h-px bg-white transition-all" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a1628] border-t border-[#163059]">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-[#a39d93] hover:text-white text-xs tracking-[0.12em] uppercase transition-colors duration-200 py-1"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

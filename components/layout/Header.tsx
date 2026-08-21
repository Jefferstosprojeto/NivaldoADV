"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/areas-de-atuacao", label: "Áreas de Atuação" },
  { href: "/simulador", label: "Simulador" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-brand-navy/10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.jpg"
            alt="Logo"
            width={60}
            height={60}
            className="rounded"
          />
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-gold">
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="block h-0.5 w-6 bg-brand-navy" />
          <span className="block h-0.5 w-6 bg-brand-navy" />
          <span className="block h-0.5 w-6 bg-brand-navy" />
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-brand-cream border-t border-brand-navy/10">
          <nav className="flex flex-col px-6 py-4 gap-4 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-brand-gold"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

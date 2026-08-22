"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
    <header className="bg-brand-navy border-b border-brand-gold/20">
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-icon.png"
            alt={siteConfig.lawyerName}
            width={190}
            height={85}
            priority
            className="h-12 w-auto md:h-14"
          />
        </Link>
        <nav className="hidden md:flex gap-6 text-sm text-brand-cream">
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
          <span className="block h-0.5 w-6 bg-brand-gold" />
          <span className="block h-0.5 w-6 bg-brand-gold" />
          <span className="block h-0.5 w-6 bg-brand-gold" />
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-brand-navy border-t border-brand-gold/20">
          <nav className="flex flex-col px-6 py-4 gap-4 text-sm text-brand-cream">
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

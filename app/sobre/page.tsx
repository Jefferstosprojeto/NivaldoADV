import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Conheça ${siteConfig.lawyerName} (${siteConfig.oab}), advogado especializado em Inventários e Sucessões, Direito de Família e Legalização de Imóveis em ${siteConfig.city}/${siteConfig.state}.`,
  alternates: {
    canonical: "/sobre",
  },
};

export default function SobrePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 grid gap-8 md:grid-cols-[200px_1fr] items-start">
      <Image
        src="/images/nivaldo-foto.png"
        alt={siteConfig.lawyerName}
        width={200}
        height={200}
        priority
        className="rounded-lg object-cover"
      />
      <div>
        <h1 className="font-serif text-3xl mb-2">{siteConfig.lawyerName}</h1>
        <p className="text-brand-gold mb-6">{siteConfig.oab}</p>
        <div className="space-y-4 text-brand-navy/80 leading-relaxed text-justify hyphens-auto [&>p]:indent-8">
          <p>
            Com 30 (trinta) anos de atuação jurídica, construí minha
            trajetória profissional guiada por dois pilares fundamentais: a
            excelência técnica na aplicação do Direito e a sensibilidade
            humana na condução de conflitos delicados e sensíveis.
          </p>
          <p>
            Minha formação em Direito e Teologia, somada às pós-graduações em
            Direito Civil Constitucional e Direito Imobiliário e aos cursos de
            especialização em Direito Sucessório, moldou uma visão ampla e
            estratégica da advocacia.
          </p>
          <p>
            Essa bagagem multidisciplinar me permite enxergar além dos
            processos judiciais, atuando não apenas como um técnico da lei,
            mas como um consultor capacitado a conduzir disputas patrimoniais
            e familiares com equilíbrio, firmeza e respeito à história de cada
            família.
          </p>
        </div>
        <div className="mt-8 border-t border-brand-navy/10 pt-6">
          <p className="font-serif italic text-brand-navy mb-2">
            Advocacia Estratégica em Família, Sucessões e Regularização
            Imobiliária
          </p>
          <p className="text-brand-navy/80">Atendimento em todo o Brasil.</p>
        </div>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 py-20 text-center"
    >
      <p className="uppercase tracking-widest text-xs text-brand-gold mb-4">
        Advocacia
      </p>
      <h1 className="font-serif text-4xl md:text-5xl mb-4">
        {siteConfig.lawyerName}
      </h1>
      <p className="text-brand-navy/80 max-w-2xl mx-auto mb-8">
        Especialista em Inventários, Partilhas Judiciais e Extrajudiciais; Direito de Família e Legalização de Imóveis. Atendimento personalizado com eficiência, segurança, eficácia e rapidez. Tudo o que você precisa.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          href="/contato"
          className="rounded bg-brand-gold px-6 py-3 text-brand-navy font-medium hover:opacity-90"
        >
          Agende uma consulta
        </Link>
      </div>
    </motion.section>
  );
}

import type { Metadata } from "next";
import AreasGrid from "@/components/sections/AreasGrid";

export const metadata: Metadata = {
  title: "Áreas de Atuação",
  description:
    "Inventários e Sucessões, Direito de Família e Legalização de Imóveis: conheça as áreas de atuação do escritório em Rio de Janeiro/RJ.",
  alternates: {
    canonical: "/areas-de-atuacao",
  },
};

export default function AreasIndexPage() {
  return (
    <main className="py-16">
      <h1 className="font-serif text-3xl text-center mb-10">
        Áreas de Atuação
      </h1>
      <AreasGrid />
    </main>
  );
}

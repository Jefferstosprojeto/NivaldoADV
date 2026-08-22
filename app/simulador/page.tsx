import type { Metadata } from "next";
import InventorySimulator from "@/components/simulator/InventorySimulator";

export const metadata: Metadata = {
  title: "Simulador de Prazo de Inventário",
  description:
    "Responda perguntas simples e obtenha uma estimativa de prazo para o inventário do seu caso: judicial ou extrajudicial.",
  alternates: {
    canonical: "/simulador",
  },
};

export default function SimuladorPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl text-center mb-10">
        Simulador de Prazo de Inventário
      </h1>
      <InventorySimulator />
    </main>
  );
}

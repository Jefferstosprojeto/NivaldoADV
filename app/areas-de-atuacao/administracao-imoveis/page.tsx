import type { Metadata } from "next";
import AreaContent from "@/components/sections/AreaContent";
import { areas } from "@/lib/areas";

export const metadata: Metadata = {
  title: areas["administracao-imoveis"].title,
  description: areas["administracao-imoveis"].intro,
  alternates: {
    canonical: "/areas-de-atuacao/administracao-imoveis",
  },
};

export default function AdministracaoImoveisPage() {
  return <AreaContent data={areas["administracao-imoveis"]} />;
}

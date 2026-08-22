import type { Metadata } from "next";
import AreaContent from "@/components/sections/AreaContent";
import { areas } from "@/lib/areas";

export const metadata: Metadata = {
  title: areas.inventarios.title,
  description: areas.inventarios.intro,
  alternates: {
    canonical: "/areas-de-atuacao/inventarios",
  },
};

export default function InventariosPage() {
  return <AreaContent data={areas.inventarios} />;
}

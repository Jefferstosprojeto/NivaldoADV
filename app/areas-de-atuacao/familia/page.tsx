import type { Metadata } from "next";
import AreaContent from "@/components/sections/AreaContent";
import { areas } from "@/lib/areas";

export const metadata: Metadata = {
  title: areas.familia.title,
  description: areas.familia.intro,
  alternates: {
    canonical: "/areas-de-atuacao/familia",
  },
};

export default function FamiliaPage() {
  return <AreaContent data={areas.familia} />;
}

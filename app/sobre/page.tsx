import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export default function SobrePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 grid gap-8 md:grid-cols-[200px_1fr] items-start">
      <Image
        src="/images/nivaldo-foto.png"
        alt={siteConfig.lawyerName}
        width={200}
        height={200}
        className="rounded-lg object-cover"
      />
      <div>
        <h1 className="font-serif text-3xl mb-2">{siteConfig.lawyerName}</h1>
        <p className="text-brand-gold mb-4">{siteConfig.oab}</p>
        <p className="text-brand-navy/80 mb-4">
          Advogado com atuação dedicada a Inventários e Sucessões, Direito de
          Família e Administração de Imóveis, buscando conduzir cada processo
          com clareza e atenção próxima às necessidades do cliente.
        </p>
        <p className="text-brand-navy/80">
          Atendimento em {siteConfig.city} - {siteConfig.state}.
        </p>
      </div>
    </main>
  );
}

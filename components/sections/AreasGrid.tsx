import Link from "next/link";

const areas = [
  {
    href: "/areas-de-atuacao/inventarios",
    title: "Inventários e Sucessões",
    description: "Condução de inventários judiciais e extrajudiciais.",
  },
  {
    href: "/areas-de-atuacao/familia",
    title: "Direito de Família",
    description: "Divórcio, partilha de bens, guarda e pensão alimentícia.",
  },
  {
    href: "/areas-de-atuacao/administracao-imoveis",
    title: "Legalização de Imóveis",
    description: "Gestão jurídica de imóveis e questões patrimoniais.",
  },
];

export default function AreasGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto px-6">
      {areas.map((area) => (
        <Link
          key={area.href}
          href={area.href}
          className="group block rounded-lg border border-brand-navy/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold hover:shadow-[0_12px_28px_-10px_rgba(184,147,95,0.45)]"
        >
          <h3 className="font-serif text-lg mb-2 transition-colors group-hover:text-brand-gold">
            {area.title}
          </h3>
          <p className="text-sm text-brand-navy/80">{area.description}</p>
        </Link>
      ))}
    </div>
  );
}

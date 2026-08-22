import FaqAccordion from "@/components/ui/FaqAccordion";
import type { AreaData } from "@/lib/areas";

export default function AreaContent({ data }: { data: AreaData }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1 className="font-serif text-3xl mb-4">{data.title}</h1>
      <p className="text-brand-navy/80 mb-8">{data.intro}</p>

      <h2 className="font-serif text-xl mb-3">Serviços</h2>
      <ul className="list-disc list-inside mb-10 space-y-1 text-brand-navy/80">
        {data.services.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>

      <h2 className="font-serif text-xl mb-3">Perguntas frequentes</h2>
      <FaqAccordion items={data.faq} />
    </main>
  );
}

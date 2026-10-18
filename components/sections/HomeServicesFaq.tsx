import FaqAccordion from "@/components/ui/FaqAccordion";
import { homeFaq, homeServices } from "@/lib/home";

export default function HomeServicesFaq() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="max-w-3xl mx-auto px-6 pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h2 className="font-serif text-2xl mb-4">Serviços</h2>
      <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2 list-disc pl-5 mb-12 text-brand-navy/80">
        {homeServices.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>

      <h2 className="font-serif text-2xl mb-3">Perguntas frequentes</h2>
      <FaqAccordion items={homeFaq} />
    </section>
  );
}

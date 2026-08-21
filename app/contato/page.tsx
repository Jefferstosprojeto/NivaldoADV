import ContactForm from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site-config";

export default function ContatoPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-2">
      <div>
        <h1 className="font-serif text-3xl mb-4">Contato</h1>
        <p className="text-brand-navy/80 mb-2">{siteConfig.phone}</p>
        <p className="text-brand-navy/80 mb-2">{siteConfig.email}</p>
        <p className="text-brand-navy/80">
          {siteConfig.city} - {siteConfig.state}
        </p>
      </div>
      <ContactForm />
    </main>
  );
}

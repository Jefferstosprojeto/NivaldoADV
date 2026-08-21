import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-brand-cream mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <p className="font-serif text-lg">{siteConfig.lawyerName}</p>
          <p className="opacity-80 mt-1">{siteConfig.oab}</p>
        </div>
        <div>
          <p>{siteConfig.phone}</p>
          <p>{siteConfig.email}</p>
          <p>
            {siteConfig.city} - {siteConfig.state}
          </p>
        </div>
        <div>
          <Link href="/privacidade" className="underline hover:text-brand-gold">
            Política de Privacidade
          </Link>
        </div>
      </div>
      <p className="text-center text-xs opacity-60 pb-6">
        © {new Date().getFullYear()} {siteConfig.lawyerName}. Todos os direitos reservados.
      </p>
    </footer>
  );
}

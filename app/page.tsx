import Link from "next/link";
import Hero from "@/components/sections/Hero";
import AreasGrid from "@/components/sections/AreasGrid";
import HomeServicesFaq from "@/components/sections/HomeServicesFaq";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AreasGrid />
      <HomeServicesFaq />
      <div className="flex justify-center px-6 py-12">
        <Link
          href="/contato"
          className="rounded bg-brand-gold px-6 py-3 text-brand-navy font-medium hover:opacity-90"
        >
          Agende uma consulta
        </Link>
      </div>
    </main>
  );
}

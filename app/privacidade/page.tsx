import { siteConfig } from "@/lib/site-config";

export default function PrivacidadePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 space-y-4 text-brand-navy/80">
      <h1 className="font-serif text-3xl text-brand-navy mb-4">
        Política de Privacidade
      </h1>
      <p>
        Os dados enviados pelo formulário de contato deste site (nome,
        telefone, e-mail, área de interesse e mensagem) são utilizados
        exclusivamente para retorno do atendimento solicitado, em
        conformidade com a Lei Geral de Proteção de Dados (Lei nº
        13.709/2018).
      </p>
      <p>
        Esses dados não são compartilhados com terceiros e são mantidos
        apenas pelo tempo necessário ao atendimento e cumprimento de
        obrigações legais.
      </p>
      <p>
        Para solicitar informações, correção ou exclusão dos seus dados,
        entre em contato pelo e-mail{" "}
        <a href={`mailto:${siteConfig.email}`} className="underline">
          {siteConfig.email}
        </a>
        .
      </p>
    </main>
  );
}

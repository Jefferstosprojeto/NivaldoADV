"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

const areaOptions = [
  "Inventários e Sucessões",
  "Direito de Família",
  "Administração de Imóveis",
  "Outro assunto",
];

export default function ContactForm() {
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!consent) {
      setConsentError(true);
      return;
    }
    setConsentError(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      area: formData.get("area"),
      message: formData.get("message"),
      consent,
    };

    setStatus("sending");

    const response = await fetch("/api/contato", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setStatus(response.ok ? "sent" : "error");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Nome
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded border border-brand-navy/30 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          Telefone
        </label>
        <input
          id="phone"
          name="phone"
          required
          className="w-full rounded border border-brand-navy/30 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded border border-brand-navy/30 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="area" className="block text-sm font-medium mb-1">
          Área de interesse
        </label>
        <select
          id="area"
          name="area"
          defaultValue={areaOptions[0]}
          className="w-full rounded border border-brand-navy/30 px-3 py-2"
        >
          {areaOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded border border-brand-navy/30 px-3 py-2"
        />
      </div>
      <div>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => {
              setConsent(event.target.checked);
              if (event.target.checked) setConsentError(false);
            }}
          />
          <span>
            Li e aceito a{" "}
            <Link href="/privacidade" className="underline" target="_blank">
              Política de Privacidade
            </Link>{" "}
            e autorizo o uso dos meus dados para retorno de contato.
          </span>
        </label>
        {consentError && (
          <p className="text-red-600 text-sm mt-1">
            É necessário aceitar a Política de Privacidade para continuar.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded bg-brand-gold px-6 py-3 text-brand-navy font-medium hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Enviar"}
      </button>

      {status === "sent" && (
        <p className="text-green-700 text-sm">
          Mensagem enviada com sucesso. Retornaremos em breve.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm">
          Não foi possível enviar a mensagem. Tente novamente ou use o
          WhatsApp.
        </p>
      )}
    </form>
  );
}

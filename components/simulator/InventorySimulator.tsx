"use client";

import { useState } from "react";
import {
  estimateInventoryDuration,
  type InventoryAnswers,
} from "@/lib/inventoryEstimate";

const questions: {
  key: keyof InventoryAnswers;
  label: string;
}[] = [
  { key: "hasAssets", label: "Há bens a inventariar?" },
  { key: "hasWill", label: "Há testamento?" },
  { key: "heirsAgree", label: "Todos os herdeiros concordam com a partilha?" },
  {
    key: "hasMinorOrIncapableHeirs",
    label: "Há herdeiro menor de idade ou incapaz?",
  },
  {
    key: "isPartitionEqual",
    label:
      "Caso haja herdeiro menor ou incapaz, a partilha será igualitária entre eles?",
  },
  { key: "hasDebts", label: "O espólio possui dívidas ou pendências fiscais?" },
];

export default function InventorySimulator() {
  const [answers, setAnswers] = useState<Partial<InventoryAnswers>>({});

  const allAnswered = questions.every(
    (question) => answers[question.key] !== undefined
  );

  const result = allAnswered
    ? estimateInventoryDuration(answers as InventoryAnswers)
    : null;

  return (
    <div className="max-w-xl mx-auto">
      <div className="space-y-6">
        {questions.map((question) => (
          <div key={question.key}>
            <p className="font-medium mb-2">{question.label}</p>
            <div className="flex gap-3">
              <button
                type="button"
                className={`px-4 py-2 rounded border ${
                  answers[question.key] === true
                    ? "bg-brand-navy text-brand-cream"
                    : "border-brand-navy/30"
                }`}
                onClick={() =>
                  setAnswers((prev) => ({ ...prev, [question.key]: true }))
                }
              >
                Sim
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded border ${
                  answers[question.key] === false
                    ? "bg-brand-navy text-brand-cream"
                    : "border-brand-navy/30"
                }`}
                onClick={() =>
                  setAnswers((prev) => ({ ...prev, [question.key]: false }))
                }
              >
                Não
              </button>
            </div>
          </div>
        ))}
      </div>

      {result && (
        <div className="mt-8 p-6 rounded-lg bg-brand-navy text-brand-cream">
          <p className="font-serif text-lg mb-2">
            {result.isExtrajudicial
              ? "Inventário extrajudicial"
              : "Inventário judicial"}
          </p>
          <p className="mb-2">
            Estimativa: {result.minMonths} a {result.maxMonths} meses.
          </p>
          <p className="text-sm">{result.summary}</p>
        </div>
      )}

      <p className="mt-6 text-xs text-brand-navy/60">
        Esta estimativa é apenas informativa e não substitui uma consulta
        jurídica com um advogado.
      </p>
    </div>
  );
}

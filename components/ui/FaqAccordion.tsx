"use client";

import { useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-brand-navy/10">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="py-4">
            <button
              type="button"
              className="w-full text-left font-medium flex justify-between items-center gap-4"
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              {item.question}
              <span aria-hidden="true" className="shrink-0">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && (
              <p className="mt-2 text-sm text-brand-navy/80">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

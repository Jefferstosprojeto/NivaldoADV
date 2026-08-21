export type InventoryAnswers = {
  hasWill: boolean;
  hasAssets: boolean;
  heirsAgree: boolean;
};

export type InventoryEstimate = {
  minMonths: number;
  maxMonths: number;
  isExtrajudicial: boolean;
  summary: string;
};

export function estimateInventoryDuration(
  answers: InventoryAnswers
): InventoryEstimate {
  const { hasWill, hasAssets, heirsAgree } = answers;

  if (!hasAssets) {
    return {
      minMonths: 0,
      maxMonths: 0,
      isExtrajudicial: false,
      summary:
        "Sem bens a inventariar, pode não ser necessário abrir inventário formal. Consulte um advogado para confirmar o seu caso.",
    };
  }

  if (!hasWill && heirsAgree) {
    return {
      minMonths: 1,
      maxMonths: 3,
      isExtrajudicial: true,
      summary:
        "Inventário extrajudicial (em cartório) pode ser possível nesse caso, com prazo estimado de 1 a 3 meses.",
    };
  }

  return {
    minMonths: 8,
    maxMonths: 24,
    isExtrajudicial: false,
    summary:
      "Inventário judicial estimado nesse caso, com prazo entre 8 e 24 meses, variando conforme a complexidade.",
  };
}

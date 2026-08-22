export type InventoryAnswers = {
  hasWill: boolean;
  hasAssets: boolean;
  heirsAgree: boolean;
  hasMinorOrIncapableHeirs: boolean;
  hasDebts: boolean;
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
  const { hasWill, hasAssets, heirsAgree, hasMinorOrIncapableHeirs, hasDebts } =
    answers;

  if (!hasAssets) {
    return {
      minMonths: 0,
      maxMonths: 0,
      isExtrajudicial: false,
      summary:
        "Sem bens a inventariar, pode não ser necessário abrir inventário formal. Consulte um advogado para confirmar o seu caso.",
    };
  }

  if (hasMinorOrIncapableHeirs) {
    return {
      minMonths: 10,
      maxMonths: 30,
      isExtrajudicial: false,
      summary:
        "Havendo herdeiro menor de idade ou incapaz, a lei exige inventário judicial, com participação do Ministério Público. Prazo estimado entre 10 e 30 meses.",
    };
  }

  if (!hasWill && heirsAgree) {
    const [minMonths, maxMonths] = hasDebts ? [2, 4] : [1, 3];
    return {
      minMonths,
      maxMonths,
      isExtrajudicial: true,
      summary: hasDebts
        ? "Inventário extrajudicial (em cartório) pode ser possível, mas dívidas do espólio costumam exigir quitação ou negociação antes da lavratura da escritura, com prazo estimado de 2 a 4 meses."
        : "Inventário extrajudicial (em cartório) pode ser possível nesse caso, com prazo estimado de 1 a 3 meses.",
    };
  }

  const [minMonths, maxMonths] = hasDebts ? [10, 30] : [8, 24];
  return {
    minMonths,
    maxMonths,
    isExtrajudicial: false,
    summary: hasDebts
      ? "Inventário judicial estimado nesse caso; dívidas do espólio tendem a alongar o processo, com prazo entre 10 e 30 meses."
      : "Inventário judicial estimado nesse caso, com prazo entre 8 e 24 meses, variando conforme a complexidade.",
  };
}

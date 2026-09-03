export type InventoryAnswers = {
  hasWill: boolean;
  hasAssets: boolean;
  heirsAgree: boolean;
  hasMinorOrIncapableHeirs: boolean;
  isPartitionEqual: boolean;
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
  const {
    hasAssets,
    heirsAgree,
    hasMinorOrIncapableHeirs,
    isPartitionEqual,
    hasDebts,
  } = answers;

  if (!hasAssets) {
    return {
      minMonths: 0,
      maxMonths: 0,
      isExtrajudicial: false,
      summary:
        "Sem bens a inventariar, pode não ser necessário abrir inventário formal. Consulte um advogado para confirmar o seu caso.",
    };
  }

  if (!heirsAgree) {
    const [minMonths, maxMonths] = hasDebts ? [10, 30] : [8, 24];
    return {
      minMonths,
      maxMonths,
      isExtrajudicial: false,
      summary:
        "Sem consenso entre os herdeiros sobre a partilha, o inventário extrajudicial não é possível — o caso segue pela via judicial.",
    };
  }

  if (hasMinorOrIncapableHeirs && !isPartitionEqual) {
    return {
      minMonths: 10,
      maxMonths: 30,
      isExtrajudicial: false,
      summary:
        "Havendo herdeiro menor de idade ou incapaz com partilha não igualitária, a lei exige inventário judicial, com participação do Ministério Público. Prazo estimado entre 10 e 30 meses.",
    };
  }

  const [minMonths, maxMonths] = hasDebts ? [2, 4] : [1, 3];
  return {
    minMonths,
    maxMonths,
    isExtrajudicial: true,
    summary: hasDebts
      ? "Inventário extrajudicial (em cartório) pode ser possível — inclusive com testamento ou herdeiro menor/incapaz, desde que a partilha seja igualitária —, mas dívidas do espólio costumam exigir negociação, com prazo estimado de 2 a 4 meses."
      : "Inventário extrajudicial (em cartório) pode ser possível nesse caso — inclusive havendo testamento ou herdeiro menor/incapaz, desde que a partilha seja igualitária —, sem limite de valor dos bens e sem exigência de pagamento do ITCMD no início, com prazo estimado de 1 a 3 meses.",
  };
}

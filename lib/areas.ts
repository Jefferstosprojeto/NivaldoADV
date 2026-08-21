import type { FaqItem } from "@/components/ui/FaqAccordion";

export type AreaData = {
  title: string;
  intro: string;
  services: string[];
  faq: FaqItem[];
};

export const areas = {
  inventarios: {
    title: "Inventários e Sucessões",
    intro:
      "Condução de processos de inventário judicial e extrajudicial, com orientação clara sobre partilha de bens e direitos sucessórios.",
    services: [
      "Inventário judicial",
      "Inventário extrajudicial (em cartório)",
      "Partilha de bens entre herdeiros",
      "Testamentos e planejamento sucessório",
    ],
    faq: [
      {
        question: "Quanto tempo demora um inventário?",
        answer:
          "Varia conforme o caso: um inventário extrajudicial, quando cabível, pode levar de 1 a 3 meses; um inventário judicial costuma levar entre 8 e 24 meses.",
      },
      {
        question: "Inventário extrajudicial é possível no meu caso?",
        answer:
          "É possível quando não há testamento e todos os herdeiros são maiores, capazes e estão de acordo com a partilha. Cada caso deve ser avaliado individualmente.",
      },
      {
        question: "Preciso de advogado para partilha de bens?",
        answer:
          "Sim, a assistência de advogado é exigida por lei tanto no inventário judicial quanto no extrajudicial.",
      },
    ],
  },
  familia: {
    title: "Direito de Família",
    intro:
      "Atendimento em questões de divórcio, guarda de filhos, pensão alimentícia e partilha de bens no âmbito familiar.",
    services: [
      "Divórcio consensual e litigioso",
      "Guarda e regulamentação de convivência",
      "Pensão alimentícia",
      "Partilha de bens em relações familiares",
    ],
    faq: [
      {
        question: "Divórcio consensual pode ser feito em cartório?",
        answer:
          "Sim, quando não há filhos menores ou incapazes e o casal está de acordo com todos os termos, o divórcio pode ser feito em cartório, com assistência de advogado.",
      },
      {
        question: "Como é definida a pensão alimentícia?",
        answer:
          "A pensão é definida considerando a necessidade de quem recebe e a possibilidade de quem paga, podendo ser ajustada por acordo ou decisão judicial.",
      },
    ],
  },
  "administracao-imoveis": {
    title: "Legalização de Imóveis",
    intro:
      "Suporte jurídico especializado em legalização, regularização e gestão de imóveis, incluindo contratos e questões patrimoniais.",
    services: [
      "Legalização de imóveis",
      "Regularização documental",
      "Contratos de locação",
      "Questões condominiais e compra/venda",
    ],
    faq: [
      {
        question: "Vocês cuidam de contratos de aluguel?",
        answer:
          "Sim, elaboramos e revisamos contratos de locação e administração de imóveis, além de assessorar em conflitos relacionados.",
      },
      {
        question: "É possível regularizar um imóvel sem escritura?",
        answer:
          "Depende da situação documental do imóvel. Uma análise do caso é necessária para indicar o caminho jurídico adequado.",
      },
    ],
  },
} satisfies Record<string, AreaData>;

export type AreaSlug = keyof typeof areas;

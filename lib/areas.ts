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
          "O tempo é relativo e depende da análise do conjunto de bens, da complexidade do inventário, da escolha correta do rito, da inexistência de conflitos e disputas entre herdeiros, e se o processo é judicial ou extrajudicial (em cartório).",
      },
      {
        question: "Quais são os casos possíveis de inventário extrajudicial?",
        answer:
          "Hoje é possível realizar o inventário extrajudicial mesmo havendo herdeiros menores de idade ou incapazes, desde que haja partilha igualitária entre eles, e mesmo quando existe testamento. Não há limite de valor dos bens, nem é exigido o pagamento do imposto (ITCMD) no início do processo — é necessário apenas que haja consenso entre todos os herdeiros.",
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
      "Suporte jurídico para questões patrimoniais e de gestão de imóveis, incluindo contratos e regularização.",
    services: [
      "Contratos de locação e administração",
      "Regularização documental de imóveis",
      "Questões condominiais",
      "Assessoria em compra e venda de imóveis",
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

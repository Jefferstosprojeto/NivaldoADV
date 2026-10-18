import type { FaqItem } from "@/components/ui/FaqAccordion";

export const homeServices: string[] = [
  "Inventário judicial e extrajudicial",
  "Partilha de bens entre herdeiros",
  "Direitos do cônjuge, do companheiro e do falecido",
  "Regularização e legalização de imóvel irregular",
  "Cálculo e pagamento do imposto (ITCMD/ITD)",
  "Orientações e realização de testamento",
  "Doação e planejamento sucessório",
  "Resolução de conflito entre herdeiros",
  "Múltiplas sucessões/inventários",
  "Resolução de partilha de bens com menores",
  "Planejamento sucessório",
  "Partilha de bens no divórcio",
];

export const homeFaq: FaqItem[] = [
  {
    question:
      "Meu marido ou companheiro, minha esposa ou companheira faleceu e deixou bens. O que fazer?",
    answer:
      "O primeiro passo é procurar um advogado para analisar o regime de bens do casamento ou da união estável, identificar os herdeiros e reunir os documentos dos bens. Em regra, o cônjuge ou companheiro sobrevivente tem direito à meação (metade dos bens comuns) e pode também ser herdeiro, além de ter direito de continuar morando no imóvel da família. O inventário deve ser aberto em até 2 meses do falecimento, podendo ser feito em cartório quando houver acordo entre todos.",
  },
  {
    question:
      "Meu pai ou minha mãe faleceu, deixou bens, e eu e meus irmãos somos obrigados a abrir inventário?",
    answer:
      "Sim. Sempre que a pessoa falecida deixa bens, o inventário é o meio legal para transferi-los aos herdeiros. Sem ele, os bens não podem ser vendidos ou registrados em nome dos herdeiros, e a abertura fora do prazo legal de 2 meses pode gerar multa sobre o imposto (ITCMD). Havendo consenso entre os irmãos, o inventário pode ser feito em cartório, de forma mais rápida.",
  },
  {
    question: "Minha mãe morreu e meu pai está dizendo que tudo é dele. Isso é verdade?",
    answer:
      "Em regra, não. Dependendo do regime de bens, seu pai tem direito à meação, ou seja, à metade dos bens adquiridos em comum. A outra metade, que pertencia à sua mãe, é herança e deve ser partilhada entre os herdeiros — os filhos e, em alguns regimes, também o próprio cônjuge. Cada caso exige a análise do regime de casamento e da origem dos bens.",
  },
  {
    question: "Meus pais doaram verbalmente um imóvel para meu irmão. Essa doação possui validade?",
    answer:
      "Não. A doação de imóvel exige escritura pública e registro no cartório de imóveis; a doação apenas verbal não transfere a propriedade. Enquanto os doadores estiverem vivos, é possível formalizar a doação por escritura. Após o falecimento, o imóvel continua fazendo parte da herança e deve ser incluído no inventário.",
  },
  {
    question:
      "O imóvel está alugado, mas não conseguimos regularizar. Ele pode entrar no inventário?",
    answer:
      "Sim. Mesmo um imóvel sem documentação regular pode ser incluído no inventário, por meio dos direitos que o falecido tinha sobre ele (posse ou direitos de aquisição). Os aluguéis também pertencem ao espólio até a partilha. A regularização do imóvel pode ser feita em paralelo ou após o inventário, conforme a situação.",
  },
  {
    question: "Meu marido morreu. Tenho parte na herança?",
    answer:
      "Depende do regime de bens e de quem são os demais herdeiros. Além da meação sobre os bens comuns, a esposa pode herdar em conjunto com os filhos (em determinados regimes), com os pais do falecido ou, na falta de ambos, ficar com toda a herança. Também tem o direito de continuar morando no imóvel que servia de residência da família. As mesmas regras se aplicam à companheira em união estável.",
  },
  {
    question:
      "Meu pai/minha mãe morreu e meus irmãos não querem abrir o inventário. O que fazer?",
    answer:
      "Qualquer herdeiro pode pedir a abertura do inventário, sem depender da concordância dos demais. Nesse caso, o inventário será judicial, e os outros herdeiros serão chamados a participar do processo. Adiar a abertura pode gerar multa sobre o imposto e impedir a venda ou regularização dos bens.",
  },
  {
    question:
      "Há prazo para a abertura do inventário? Quais as consequências se não for aberto dentro do prazo?",
    answer:
      "Sim. A lei determina que o inventário seja aberto em até 2 meses a partir do falecimento. O atraso não impede a abertura, mas pode gerar multa e juros sobre o imposto de transmissão (ITCMD), conforme a lei de cada estado, além de manter os bens bloqueados para venda, financiamento ou transferência.",
  },
  {
    question:
      "Um dos irmãos pode impedir a venda de um imóvel deixado como herança para pagamento das despesas do inventário?",
    answer:
      "No inventário em cartório, a venda depende da concordância de todos os herdeiros. Já no inventário judicial, a discordância de um herdeiro não impede, por si só, a venda: o juiz pode autorizá-la, após ouvir os interessados, quando for necessária para pagar o imposto e as despesas do inventário.",
  },
  {
    question:
      "Aberto o inventário do meu pai, apareceu outro filho que eu e meus irmãos desconhecíamos. O que fazer?",
    answer:
      "Todo filho tem os mesmos direitos na herança, independentemente da origem. Se a paternidade já estiver reconhecida, ele deve ser incluído no inventário. Se não estiver, poderá buscar o reconhecimento na Justiça, e parte da herança pode ser reservada até a decisão. Mesmo após a partilha, o herdeiro deixado de fora pode pedir sua parte. Por isso, é importante orientação jurídica desde o início.",
  },
  {
    question:
      "Sou filho único, meu pai morreu e deixou um único imóvel. Preciso fazer inventário?",
    answer:
      "Sim. Mesmo havendo um único herdeiro e um único bem, o inventário é necessário para transferir o imóvel para o seu nome. Nesse caso, o procedimento costuma ser mais simples e pode ser feito em cartório, por escritura de adjudicação, com o pagamento do imposto (ITCMD). Se houver cônjuge ou companheira do falecido, ela também deve participar.",
  },
];

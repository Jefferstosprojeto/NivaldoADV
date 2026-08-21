# Site institucional e interativo — Dr. Nivaldo P. do Nascimento

## Contexto

Site novo para advogado atuante em **Inventários e Sucessões, Direito de
Família e Administração de Imóveis**. Objetivo combinado: presença
institucional/credibilidade, captação de leads (contato/agendamento) e
conteúdo jurídico para SEO.

**Dados de contato:**
- Advogado: Dr. Nivaldo P. do Nascimento
- Telefone/WhatsApp: (21) 99919-5726
- E-mail: nivaldonascimento.adv@gmail.com
- OAB: placeholder `OAB/RJ 000.000` — número real a ser informado depois
  (exibido no rodapé, reforça credibilidade e é praxe em publicidade de
  advocacia)
- Região de atuação (SEO local): Rio de Janeiro/RJ

**Foto real do advogado:** recebida e organizada em
`public/images/nivaldo-foto.png` — usar no Hero (Início) e na página Sobre,
substituindo qualquer placeholder de pessoa.

## Stack técnica

- **Next.js** (App Router) — SSG para páginas institucionais, rota de API
  para o formulário de contato, base pronta para blog e crescimento futuro.
- **Tailwind CSS** — estilização.
- **Framer Motion** — animações e transições.
- **Deploy:** Vercel (gratuito, integrado ao Next.js).

## Estrutura de páginas

- **Início** — hero, resumo das áreas de atuação, chamada para contato.
- **Sobre** — histórico/credenciais do advogado.
- **Áreas de Atuação** — página índice + 3 subpáginas:
  - Inventários e Sucessões
  - Direito de Família
  - Administração de Imóveis
- **Simulador** — calculadora de estimativa de prazo de inventário.
- **Blog/Artigos** — conteúdo jurídico (2-3 artigos placeholder no lançamento).
- **Contato** — formulário + informações de contato.
- **Política de Privacidade** — página simples exigida pelo consentimento
  LGPD do formulário.
- **WhatsApp flutuante** — presente em todas as páginas (não é uma rota,
  é um componente global).

## Identidade visual

Estilo escolhido: **A · Clássico Elegante** (validado via companheiro
visual, comparado lado a lado com 3 outras opções).

- **Cores:** azul-marinho `#0F2A3F` (primária), dourado `#B8935F`
  (destaque/CTA), off-white `#FAF8F5` (fundo neutro).
- **Tipografia:** Playfair Display (títulos/serifada) + Inter (corpo/sans-serif).
- **Foto:** foto real do Dr. Nivaldo (`public/images/nivaldo-foto.png`) no
  Hero e na página Sobre.
- **Nome do escritório:** usar apenas o nome do advogado (Dr. Nivaldo P. do
  Nascimento) — sem nome fictício de banca, já que há identidade real.

## Recursos interativos

1. **Animações** — fade-in/slide ao rolar (Framer Motion), transições entre
   seções, hover sutil em botões/cards.
2. **Formulário de contato/agendamento** — campos: nome, telefone, e-mail,
   área de interesse, mensagem. Envio via rota de API do Next.js para
   `nivaldonascimento.adv@gmail.com`.
3. **Botão WhatsApp flutuante** — fixo em todas as páginas, abre
   `wa.me/5521999195726` com mensagem pré-preenchida.
4. **Simulador de prazo de inventário** — perguntas tipo "há testamento?",
   "há bens a inventariar?", "há acordo entre herdeiros?" → estimativa de
   prazo. Inclui aviso legal (disclaimer) de que não é aconselhamento
   jurídico formal.

## Boas práticas do mercado jurídico aplicadas

- **Conformidade com publicidade da OAB (Provimento 205/2021 CFOB):** tom
  sóbrio/informativo em todo o site, sem linguagem mercantilista, sem
  promessa de resultado, sem comparação com concorrentes. Número da OAB
  visível no rodapé.
- **FAQ na página de cada área de atuação** — perguntas reais de quem
  busca no Google (ex.: "quanto tempo demora um inventário?", "inventário
  extrajudicial é possível?", "preciso de advogado para partilha de
  bens?"). Ajuda SEO e reduz a ansiedade do visitante antes de ele entrar
  em contato.
- **LGPD no formulário de contato** — checkbox de consentimento
  obrigatório + link para página de Política de Privacidade antes do
  envio.
- **SEO local** — metadata e `schema.org` do tipo `Attorney`/`LegalService`
  com cidade (Rio de Janeiro/RJ); recomendação de também criar ficha no
  Google Business Profile (fora do escopo de código deste projeto).

## Estrutura de pastas (dentro de `adv-Nivaldo/`)

```
adv-Nivaldo/
├── app/
│   ├── page.tsx                  (Início)
│   ├── sobre/page.tsx
│   ├── areas-de-atuacao/
│   │   ├── page.tsx
│   │   ├── inventarios/page.tsx
│   │   ├── familia/page.tsx
│   │   └── administracao-imoveis/page.tsx
│   ├── simulador/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── contato/page.tsx
│   ├── privacidade/page.tsx
│   └── api/contato/route.ts
├── components/
│   ├── layout/ (Header, Footer, WhatsAppButton)
│   ├── sections/ (Hero, AreasGrid, etc.)
│   └── ui/ (botões, cards, form fields)
├── content/blog/ (artigos em markdown/mdx)
├── lib/ (envio de e-mail, lógica do simulador)
├── public/
│   └── images/nivaldo-foto.png (foto real já recebida)
└── docs/superpowers/specs/ (este documento)
```

## Fora de escopo (v1)

- Fotos adicionais do escritório/ambiente (usar apenas a foto do advogado
  já fornecida; demais imagens ficam com placeholders até serem
  fornecidas).
- CMS completo para o blog (artigos entram como arquivos markdown/mdx
  no repositório).
- Multi-idioma.
- Agendamento com integração de calendário real (v1 é só formulário que
  envia e-mail).
- Ficha no Google Business Profile (recomendação registrada, mas fora do
  escopo de código).

## Testes

- Lint/build do Next.js (`npm run build`) antes de considerar pronto.
- Teste manual no navegador do fluxo principal: navegação entre páginas,
  envio do formulário, botão WhatsApp, simulador (golden path + casos de
  borda: campos vazios, resposta "sim"/"não" no simulador).

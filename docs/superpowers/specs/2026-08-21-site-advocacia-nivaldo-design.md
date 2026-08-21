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
- **WhatsApp flutuante** — presente em todas as páginas (não é uma rota,
  é um componente global).

## Identidade visual

Estilo escolhido: **A · Clássico Elegante** (validado via companheiro
visual, comparado lado a lado com 3 outras opções).

- **Cores:** azul-marinho `#0F2A3F` (primária), dourado `#B8935F`
  (destaque/CTA), off-white `#FAF8F5` (fundo neutro).
- **Tipografia:** Playfair Display (títulos/serifada) + Inter (corpo/sans-serif).
- **Fotos:** nenhuma foto real disponível ainda — usar placeholders/ícones
  neutros; trocar por fotos reais quando fornecidas.
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
│   └── api/contato/route.ts
├── components/
│   ├── layout/ (Header, Footer, WhatsAppButton)
│   ├── sections/ (Hero, AreasGrid, etc.)
│   └── ui/ (botões, cards, form fields)
├── content/blog/ (artigos em markdown/mdx)
├── lib/ (envio de e-mail, lógica do simulador)
├── public/ (ícones, placeholders)
└── docs/superpowers/specs/ (este documento)
```

## Fora de escopo (v1)

- Fotos reais do advogado/escritório (usar placeholders até serem
  fornecidas).
- CMS completo para o blog (artigos entram como arquivos markdown/mdx
  no repositório).
- Multi-idioma.
- Agendamento com integração de calendário real (v1 é só formulário que
  envia e-mail).

## Testes

- Lint/build do Next.js (`npm run build`) antes de considerar pronto.
- Teste manual no navegador do fluxo principal: navegação entre páginas,
  envio do formulário, botão WhatsApp, simulador (golden path + casos de
  borda: campos vazios, resposta "sim"/"não" no simulador).

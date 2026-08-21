# Site Dr. Nivaldo P. do Nascimento Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the interactive institutional website for Dr. Nivaldo P. do
Nascimento (advocacia especializada em Inventários e Sucessões, Direito de
Família e Administração de Imóveis).

**Architecture:** Next.js (App Router, TypeScript) with server components for
static content pages and client components for interactive pieces (contact
form, inventory-duration simulator, FAQ accordions, WhatsApp button). Tailwind
CSS for styling, Framer Motion for animation. A Next.js API route sends
contact-form submissions by email via Nodemailer/SMTP. Blog posts are markdown
files parsed at request time with gray-matter + marked. Vitest + React
Testing Library cover pure logic and interactive components.

**Tech Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer
Motion, Vitest, @testing-library/react, gray-matter, marked, Nodemailer.

**Spec:** `docs/superpowers/specs/2026-08-21-site-advocacia-nivaldo-design.md`

## Global Constraints

- Tone/copy must follow OAB Provimento 205/2021: sober, informative, no
  mercantilist language, no promised outcomes, no comparisons with other
  lawyers.
- OAB number is a placeholder (`OAB/RJ 000.000`) until the real number is
  provided — must be a single named constant, not hardcoded in multiple
  places, so it's a one-line change later.
- Contact info (name, phone, WhatsApp number, email, city/state) lives in one
  shared config module (`lib/site-config.ts`) — every component that needs it
  imports from there, never repeats literals.
- Real lawyer photo already lives at `public/images/nivaldo-foto.png` — use
  it, do not regenerate or replace it.
- Contact form requires an explicit LGPD consent checkbox before submission
  is allowed.
- All interactive/stateful components (`ContactForm`, `InventorySimulator`,
  `FaqAccordion`, `WhatsAppButton` if it has open/close state, mobile nav
  toggle in `Header`) are Client Components (`'use client'`).
- Simulator results always display the non-legal-advice disclaimer.

---

## Task 1: Project scaffold, design tokens, and test tooling

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`
- Create: `app/layout.tsx`, `app/globals.css`, `app/page.tsx` (placeholder)
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Create: `lib/site-config.ts`
- Create: `lib/site-config.test.ts`

**Interfaces:**
- Produces: `siteConfig` object from `lib/site-config.ts` with shape
  `{ lawyerName: string; oab: string; phone: string; whatsappNumber: string; email: string; city: string; state: string }`
  — every later task imports this instead of hardcoding contact info.
- Produces: Tailwind theme colors `brand-navy` (`#0F2A3F`), `brand-gold`
  (`#B8935F`), `brand-cream` (`#FAF8F5`); font families `font-serif`
  (Playfair Display) and `font-sans` (Inter) — later tasks reference these
  Tailwind classes, not raw hex/font values.

- [ ] **Step 1: Scaffold the Next.js project**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm
```

When prompted about the current directory not being empty, confirm to
continue (the folder already contains `docs/`, `public/images/`, `.git/`).

- [ ] **Step 2: Install remaining dependencies**

```bash
npm install framer-motion gray-matter marked nodemailer
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/nodemailer
```

- [ ] **Step 3: Configure Vitest**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

Create `vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Add to `package.json` `scripts`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Write the failing canary test**

Create `lib/site-config.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { siteConfig } from "./site-config";

describe("siteConfig", () => {
  it("has the lawyer's contact info", () => {
    expect(siteConfig.lawyerName).toBe("Dr. Nivaldo P. do Nascimento");
    expect(siteConfig.phone).toBe("(21) 99919-5726");
    expect(siteConfig.whatsappNumber).toBe("5521999195726");
    expect(siteConfig.email).toBe("nivaldonascimento.adv@gmail.com");
    expect(siteConfig.oab).toBe("OAB/RJ 000.000");
    expect(siteConfig.city).toBe("Rio de Janeiro");
    expect(siteConfig.state).toBe("RJ");
  });
});
```

- [ ] **Step 5: Run test to verify it fails**

Run: `npm run test -- lib/site-config.test.ts`
Expected: FAIL — `lib/site-config.ts` does not exist yet.

- [ ] **Step 6: Implement `lib/site-config.ts`**

```ts
export const siteConfig = {
  lawyerName: "Dr. Nivaldo P. do Nascimento",
  oab: "OAB/RJ 000.000",
  phone: "(21) 99919-5726",
  whatsappNumber: "5521999195726",
  email: "nivaldonascimento.adv@gmail.com",
  city: "Rio de Janeiro",
  state: "RJ",
} as const;
```

- [ ] **Step 7: Run test to verify it passes**

Run: `npm run test -- lib/site-config.test.ts`
Expected: PASS

- [ ] **Step 8: Configure Tailwind design tokens**

Edit `tailwind.config.ts` — add inside `theme.extend`:

```ts
colors: {
  "brand-navy": "#0F2A3F",
  "brand-gold": "#B8935F",
  "brand-cream": "#FAF8F5",
},
fontFamily: {
  serif: ["var(--font-playfair)", "serif"],
  sans: ["var(--font-inter)", "sans-serif"],
},
```

- [ ] **Step 9: Wire up fonts and base layout**

Replace `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["600", "700"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${siteConfig.lawyerName} | Advocacia`,
  description:
    "Advocacia especializada em Inventários e Sucessões, Direito de Família e Administração de Imóveis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans bg-brand-cream text-brand-navy`}
      >
        {children}
      </body>
    </html>
  );
}
```

Replace `app/page.tsx` with a temporary placeholder (Task 4 replaces this):

```tsx
export default function HomePage() {
  return <main className="p-8">Em construção.</main>;
}
```

- [ ] **Step 10: Verify the project builds**

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with Tailwind tokens and Vitest"
```

---

## Task 2: Global layout — Header, Footer, WhatsApp button

**Files:**
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Footer.tsx`
- Create: `components/layout/WhatsAppButton.tsx`
- Create: `components/layout/WhatsAppButton.test.tsx`
- Create: `components/layout/Footer.test.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `siteConfig` from `lib/site-config.ts` (Task 1).
- Produces: `<Header />`, `<Footer />`, `<WhatsAppButton />` — rendered in
  `app/layout.tsx` around `{children}` on every page. No props.

- [ ] **Step 1: Write the failing test for Footer**

Create `components/layout/Footer.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("shows the OAB number and contact info", () => {
    render(<Footer />);
    expect(screen.getByText(/OAB\/RJ 000\.000/)).toBeInTheDocument();
    expect(screen.getByText(/nivaldonascimento\.adv@gmail\.com/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /pol[íi]tica de privacidade/i })).toHaveAttribute(
      "href",
      "/privacidade"
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- components/layout/Footer.test.tsx`
Expected: FAIL — `./Footer` does not exist.

- [ ] **Step 3: Implement Footer**

Create `components/layout/Footer.tsx`:

```tsx
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-brand-cream mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <p className="font-serif text-lg">{siteConfig.lawyerName}</p>
          <p className="opacity-80 mt-1">{siteConfig.oab}</p>
        </div>
        <div>
          <p>{siteConfig.phone}</p>
          <p>{siteConfig.email}</p>
          <p>
            {siteConfig.city} - {siteConfig.state}
          </p>
        </div>
        <div>
          <Link href="/privacidade" className="underline hover:text-brand-gold">
            Política de Privacidade
          </Link>
        </div>
      </div>
      <p className="text-center text-xs opacity-60 pb-6">
        © {new Date().getFullYear()} {siteConfig.lawyerName}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- components/layout/Footer.test.tsx`
Expected: PASS

- [ ] **Step 5: Write the failing test for WhatsAppButton**

Create `components/layout/WhatsAppButton.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WhatsAppButton from "./WhatsAppButton";

describe("WhatsAppButton", () => {
  it("links to wa.me with the configured number and a prefilled message", () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole("link", { name: /whatsapp/i });
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/5521999195726")
    );
    expect(link).toHaveAttribute("target", "_blank");
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npm run test -- components/layout/WhatsAppButton.test.tsx`
Expected: FAIL — `./WhatsAppButton` does not exist.

- [ ] **Step 7: Implement WhatsAppButton**

Create `components/layout/WhatsAppButton.tsx`:

```tsx
import { siteConfig } from "@/lib/site-config";

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    "Olá, gostaria de falar sobre um caso jurídico."
  );
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2.2.6 4.3 1.7 6.1L4 29l8.1-1.7A12.9 12.9 0 0 0 16 27c6.6 0 12-5.4 12-12S22.6 3 16 3zm0 22c-1.9 0-3.7-.5-5.3-1.4l-.4-.2-4.8 1 1-4.7-.2-.4A9.9 9.9 0 1 1 16 25z" />
      </svg>
    </a>
  );
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npm run test -- components/layout/WhatsAppButton.test.tsx`
Expected: PASS

- [ ] **Step 9: Implement Header (no test — pure static nav, covered by Task 12 build check)**

Create `components/layout/Header.tsx`:

```tsx
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/areas-de-atuacao", label: "Áreas de Atuação" },
  { href: "/simulador", label: "Simulador" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  return (
    <header className="border-b border-brand-navy/10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl text-brand-navy">
          {siteConfig.lawyerName}
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-gold">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 10: Wire Header, Footer, WhatsAppButton into the root layout**

Edit `app/layout.tsx` — import and render inside `<body>`:

```tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
```

```tsx
<body className={`${playfair.variable} ${inter.variable} font-sans bg-brand-cream text-brand-navy`}>
  <Header />
  {children}
  <WhatsAppButton />
  <Footer />
</body>
```

- [ ] **Step 11: Run the full test suite and build**

Run: `npm run test && npm run build`
Expected: all tests PASS, build succeeds.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: add Header, Footer, and floating WhatsApp button"
```

---

## Task 3: Inventory duration estimate logic

**Files:**
- Create: `lib/inventoryEstimate.ts`
- Create: `lib/inventoryEstimate.test.ts`

**Interfaces:**
- Produces: `type InventoryAnswers = { hasWill: boolean; hasAssets: boolean; heirsAgree: boolean }`,
  `type InventoryEstimate = { minMonths: number; maxMonths: number; isExtrajudicial: boolean; summary: string }`,
  `function estimateInventoryDuration(answers: InventoryAnswers): InventoryEstimate`
  — Task 8 (`InventorySimulator` component) imports and calls this directly.

- [ ] **Step 1: Write the failing tests**

Create `lib/inventoryEstimate.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { estimateInventoryDuration } from "./inventoryEstimate";

describe("estimateInventoryDuration", () => {
  it("returns a zero estimate when there are no assets", () => {
    const result = estimateInventoryDuration({
      hasWill: false,
      hasAssets: false,
      heirsAgree: true,
    });
    expect(result.minMonths).toBe(0);
    expect(result.maxMonths).toBe(0);
    expect(result.isExtrajudicial).toBe(false);
  });

  it("suggests extrajudicial inventory when there's no will and heirs agree", () => {
    const result = estimateInventoryDuration({
      hasWill: false,
      hasAssets: true,
      heirsAgree: true,
    });
    expect(result.isExtrajudicial).toBe(true);
    expect(result.minMonths).toBe(1);
    expect(result.maxMonths).toBe(3);
  });

  it("suggests judicial inventory with a longer estimate when there's a will", () => {
    const result = estimateInventoryDuration({
      hasWill: true,
      hasAssets: true,
      heirsAgree: true,
    });
    expect(result.isExtrajudicial).toBe(false);
    expect(result.minMonths).toBe(8);
    expect(result.maxMonths).toBe(24);
  });

  it("suggests judicial inventory when heirs disagree, even without a will", () => {
    const result = estimateInventoryDuration({
      hasWill: false,
      hasAssets: true,
      heirsAgree: false,
    });
    expect(result.isExtrajudicial).toBe(false);
    expect(result.minMonths).toBe(8);
    expect(result.maxMonths).toBe(24);
  });

  it("suggests a medium judicial estimate when there's no will and heirs agree is unknown-neutral case", () => {
    const result = estimateInventoryDuration({
      hasWill: false,
      hasAssets: true,
      heirsAgree: true,
    });
    expect(result.summary).toMatch(/extrajudicial/i);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm run test -- lib/inventoryEstimate.test.ts`
Expected: FAIL — `./inventoryEstimate` does not exist.

- [ ] **Step 3: Implement the estimate logic**

Create `lib/inventoryEstimate.ts`:

```ts
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
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm run test -- lib/inventoryEstimate.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add inventory duration estimate logic"
```

---

## Task 4: FAQ accordion component

**Files:**
- Create: `components/ui/FaqAccordion.tsx`
- Create: `components/ui/FaqAccordion.test.tsx`

**Interfaces:**
- Produces: `type FaqItem = { question: string; answer: string }`,
  `<FaqAccordion items={FaqItem[]} />` — used by Task 6 (area pages).

- [ ] **Step 1: Write the failing test**

Create `components/ui/FaqAccordion.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import FaqAccordion from "./FaqAccordion";

const items = [
  { question: "Quanto tempo demora um inventário?", answer: "Depende do caso." },
  { question: "Preciso de advogado?", answer: "Sim, é obrigatório por lei." },
];

describe("FaqAccordion", () => {
  it("hides answers until the question is clicked", async () => {
    const user = userEvent.setup();
    render(<FaqAccordion items={items} />);

    expect(screen.queryByText("Depende do caso.")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /quanto tempo demora um invent[áa]rio/i }));

    expect(screen.getByText("Depende do caso.")).toBeInTheDocument();
    expect(screen.queryByText("Sim, é obrigatório por lei.")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- components/ui/FaqAccordion.test.tsx`
Expected: FAIL — `./FaqAccordion` does not exist.

- [ ] **Step 3: Implement FaqAccordion**

Create `components/ui/FaqAccordion.tsx`:

```tsx
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
              className="w-full text-left font-medium flex justify-between items-center"
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              {item.question}
              <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- components/ui/FaqAccordion.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add FaqAccordion component"
```

---

## Task 5: Home page (Hero + AreasGrid)

**Files:**
- Create: `components/sections/Hero.tsx`
- Create: `components/sections/AreasGrid.tsx`
- Create: `components/sections/AreasGrid.test.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `siteConfig` (Task 1).
- Produces: `<Hero />`, `<AreasGrid />` — assembled into `app/page.tsx`.

- [ ] **Step 1: Write the failing test for AreasGrid**

Create `components/sections/AreasGrid.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AreasGrid from "./AreasGrid";

describe("AreasGrid", () => {
  it("links to all three practice area pages", () => {
    render(<AreasGrid />);
    expect(screen.getByRole("link", { name: /invent[áa]rios e sucess[õo]es/i })).toHaveAttribute(
      "href",
      "/areas-de-atuacao/inventarios"
    );
    expect(screen.getByRole("link", { name: /direito de fam[íi]lia/i })).toHaveAttribute(
      "href",
      "/areas-de-atuacao/familia"
    );
    expect(screen.getByRole("link", { name: /administra[çc][ãa]o de im[óo]veis/i })).toHaveAttribute(
      "href",
      "/areas-de-atuacao/administracao-imoveis"
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- components/sections/AreasGrid.test.tsx`
Expected: FAIL — `./AreasGrid` does not exist.

- [ ] **Step 3: Implement AreasGrid**

Create `components/sections/AreasGrid.tsx`:

```tsx
import Link from "next/link";

const areas = [
  {
    href: "/areas-de-atuacao/inventarios",
    title: "Inventários e Sucessões",
    description: "Condução de inventários judiciais e extrajudiciais.",
  },
  {
    href: "/areas-de-atuacao/familia",
    title: "Direito de Família",
    description: "Divórcio, partilha de bens, guarda e pensão alimentícia.",
  },
  {
    href: "/areas-de-atuacao/administracao-imoveis",
    title: "Administração de Imóveis",
    description: "Gestão jurídica de imóveis e questões patrimoniais.",
  },
];

export default function AreasGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto px-6">
      {areas.map((area) => (
        <Link
          key={area.href}
          href={area.href}
          className="block rounded-lg border border-brand-navy/10 p-6 hover:border-brand-gold transition-colors"
        >
          <h3 className="font-serif text-lg mb-2">{area.title}</h3>
          <p className="text-sm text-brand-navy/80">{area.description}</p>
        </Link>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- components/sections/AreasGrid.test.tsx`
Expected: PASS

- [ ] **Step 5: Implement Hero (no dedicated test — visual/animation component, covered by build check)**

Create `components/sections/Hero.tsx`:

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto px-6 py-20 text-center"
    >
      <p className="uppercase tracking-widest text-xs text-brand-gold mb-4">
        Advocacia
      </p>
      <h1 className="font-serif text-4xl md:text-5xl mb-4">
        {siteConfig.lawyerName}
      </h1>
      <p className="text-brand-navy/80 max-w-2xl mx-auto mb-8">
        Atuação especializada em Inventários e Sucessões, Direito de Família
        e Administração de Imóveis, com atendimento próximo e claro em cada
        etapa do processo.
      </p>
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          href="/contato"
          className="rounded bg-brand-gold px-6 py-3 text-brand-navy font-medium hover:opacity-90"
        >
          Agende uma consulta
        </Link>
        <Link
          href="/areas-de-atuacao"
          className="rounded border border-brand-navy px-6 py-3 hover:bg-brand-navy hover:text-brand-cream transition-colors"
        >
          Áreas de atuação
        </Link>
      </div>
    </motion.section>
  );
}
```

- [ ] **Step 6: Assemble the home page**

Replace `app/page.tsx`:

```tsx
import Hero from "@/components/sections/Hero";
import AreasGrid from "@/components/sections/AreasGrid";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AreasGrid />
    </main>
  );
}
```

- [ ] **Step 7: Run the full test suite and build**

Run: `npm run test && npm run build`
Expected: all tests PASS, build succeeds.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: build home page with Hero and AreasGrid"
```

---

## Task 6: Practice area content data + shared AreaContent component + 3 pages

**Files:**
- Create: `lib/areas.ts`
- Create: `lib/areas.test.ts`
- Create: `components/sections/AreaContent.tsx`
- Create: `app/areas-de-atuacao/page.tsx`
- Create: `app/areas-de-atuacao/inventarios/page.tsx`
- Create: `app/areas-de-atuacao/familia/page.tsx`
- Create: `app/areas-de-atuacao/administracao-imoveis/page.tsx`

**Interfaces:**
- Consumes: `FaqAccordion` (Task 4).
- Produces: `type AreaSlug = "inventarios" | "familia" | "administracao-imoveis"`,
  `const areas: Record<AreaSlug, AreaData>` where
  `AreaData = { title: string; intro: string; services: string[]; faq: FaqItem[] }`.

- [ ] **Step 1: Write the failing test for the area data**

Create `lib/areas.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { areas } from "./areas";

describe("areas", () => {
  it("has content for all three practice areas", () => {
    expect(Object.keys(areas)).toEqual([
      "inventarios",
      "familia",
      "administracao-imoveis",
    ]);
  });

  it("each area has a title, intro, at least one service, and at least one FAQ", () => {
    for (const area of Object.values(areas)) {
      expect(area.title.length).toBeGreaterThan(0);
      expect(area.intro.length).toBeGreaterThan(0);
      expect(area.services.length).toBeGreaterThan(0);
      expect(area.faq.length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- lib/areas.test.ts`
Expected: FAIL — `./areas` does not exist.

- [ ] **Step 3: Implement the area content data**

Create `lib/areas.ts`:

```ts
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
    title: "Administração de Imóveis",
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- lib/areas.test.ts`
Expected: PASS

- [ ] **Step 5: Implement the shared AreaContent component**

Create `components/sections/AreaContent.tsx`:

```tsx
import FaqAccordion from "@/components/ui/FaqAccordion";
import type { AreaData } from "@/lib/areas";

export default function AreaContent({ data }: { data: AreaData }) {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl mb-4">{data.title}</h1>
      <p className="text-brand-navy/80 mb-8">{data.intro}</p>

      <h2 className="font-serif text-xl mb-3">Serviços</h2>
      <ul className="list-disc list-inside mb-10 space-y-1 text-brand-navy/80">
        {data.services.map((service) => (
          <li key={service}>{service}</li>
        ))}
      </ul>

      <h2 className="font-serif text-xl mb-3">Perguntas frequentes</h2>
      <FaqAccordion items={data.faq} />
    </main>
  );
}
```

- [ ] **Step 6: Create the index and three area pages**

Create `app/areas-de-atuacao/page.tsx`:

```tsx
import AreasGrid from "@/components/sections/AreasGrid";

export default function AreasIndexPage() {
  return (
    <main className="py-16">
      <h1 className="font-serif text-3xl text-center mb-10">
        Áreas de Atuação
      </h1>
      <AreasGrid />
    </main>
  );
}
```

Create `app/areas-de-atuacao/inventarios/page.tsx`:

```tsx
import AreaContent from "@/components/sections/AreaContent";
import { areas } from "@/lib/areas";

export default function InventariosPage() {
  return <AreaContent data={areas.inventarios} />;
}
```

Create `app/areas-de-atuacao/familia/page.tsx`:

```tsx
import AreaContent from "@/components/sections/AreaContent";
import { areas } from "@/lib/areas";

export default function FamiliaPage() {
  return <AreaContent data={areas.familia} />;
}
```

Create `app/areas-de-atuacao/administracao-imoveis/page.tsx`:

```tsx
import AreaContent from "@/components/sections/AreaContent";
import { areas } from "@/lib/areas";

export default function AdministracaoImoveisPage() {
  return <AreaContent data={areas["administracao-imoveis"]} />;
}
```

- [ ] **Step 7: Run the full test suite and build**

Run: `npm run test && npm run build`
Expected: all tests PASS, build succeeds.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add practice area content and pages"
```

---

## Task 7: Sobre page (with real photo)

**Files:**
- Create: `app/sobre/page.tsx`
- Create: `app/sobre/page.test.tsx`

**Interfaces:**
- Consumes: `siteConfig` (Task 1), `public/images/nivaldo-foto.png`.

- [ ] **Step 1: Write the failing test**

Create `app/sobre/page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SobrePage from "./page";

describe("SobrePage", () => {
  it("shows the lawyer's name, OAB, and photo", () => {
    render(<SobrePage />);
    expect(screen.getByRole("heading", { name: /dr\. nivaldo/i })).toBeInTheDocument();
    expect(screen.getByText(/OAB\/RJ 000\.000/)).toBeInTheDocument();
    expect(screen.getByAltText(/dr\. nivaldo/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- app/sobre/page.test.tsx`
Expected: FAIL — `./page` does not exist.

- [ ] **Step 3: Implement the Sobre page**

Create `app/sobre/page.tsx`:

```tsx
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export default function SobrePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 grid gap-8 md:grid-cols-[200px_1fr] items-start">
      <Image
        src="/images/nivaldo-foto.png"
        alt={siteConfig.lawyerName}
        width={200}
        height={200}
        className="rounded-lg object-cover"
      />
      <div>
        <h1 className="font-serif text-3xl mb-2">{siteConfig.lawyerName}</h1>
        <p className="text-brand-gold mb-4">{siteConfig.oab}</p>
        <p className="text-brand-navy/80 mb-4">
          Advogado com atuação dedicada a Inventários e Sucessões, Direito de
          Família e Administração de Imóveis, buscando conduzir cada processo
          com clareza e atenção próxima às necessidades do cliente.
        </p>
        <p className="text-brand-navy/80">
          Atendimento em {siteConfig.city} - {siteConfig.state}.
        </p>
      </div>
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- app/sobre/page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Sobre page with lawyer photo"
```

---

## Task 8: Inventory simulator (component + page)

**Files:**
- Create: `components/simulator/InventorySimulator.tsx`
- Create: `components/simulator/InventorySimulator.test.tsx`
- Create: `app/simulador/page.tsx`

**Interfaces:**
- Consumes: `estimateInventoryDuration` (Task 3).
- Produces: `<InventorySimulator />` — self-contained, no props.

- [ ] **Step 1: Write the failing test**

Create `components/simulator/InventorySimulator.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import InventorySimulator from "./InventorySimulator";

describe("InventorySimulator", () => {
  it("shows the extrajudicial estimate when there's no will and heirs agree", async () => {
    const user = userEvent.setup();
    render(<InventorySimulator />);

    // Questions render in order: hasAssets, hasWill, heirsAgree — each with
    // its own "Sim"/"Não" button pair, so index N corresponds to question N.
    const simButtons = screen.getAllByRole("button", { name: /^sim$/i });
    const naoButtons = screen.getAllByRole("button", { name: /^n[ãa]o$/i });

    await user.click(simButtons[0]); // Há bens a inventariar? -> Sim
    await user.click(naoButtons[1]); // Há testamento? -> Não
    await user.click(simButtons[2]); // Herdeiros concordam? -> Sim

    expect(screen.getByText(/inventário extrajudicial/i)).toBeInTheDocument();
    expect(screen.getByText(/não substitui uma consulta jurídica/i)).toBeInTheDocument();
  });

  it("always shows the legal disclaimer", () => {
    render(<InventorySimulator />);
    expect(screen.getByText(/não substitui uma consulta jurídica/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- components/simulator/InventorySimulator.test.tsx`
Expected: FAIL — `./InventorySimulator` does not exist.

- [ ] **Step 3: Implement InventorySimulator**

Create `components/simulator/InventorySimulator.tsx`:

```tsx
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
];

export default function InventorySimulator() {
  const [answers, setAnswers] = useState<Partial<InventoryAnswers>>({});

  const allAnswered =
    answers.hasAssets !== undefined &&
    answers.hasWill !== undefined &&
    answers.heirsAgree !== undefined;

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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- components/simulator/InventorySimulator.test.tsx`
Expected: PASS

- [ ] **Step 5: Create the simulator page**

Create `app/simulador/page.tsx`:

```tsx
import InventorySimulator from "@/components/simulator/InventorySimulator";

export default function SimuladorPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl text-center mb-10">
        Simulador de Prazo de Inventário
      </h1>
      <InventorySimulator />
    </main>
  );
}
```

- [ ] **Step 6: Run the full test suite and build**

Run: `npm run test && npm run build`
Expected: all tests PASS, build succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add inventory duration simulator"
```

---

## Task 9: Contact email sending logic

**Files:**
- Create: `lib/sendContactEmail.ts`
- Create: `lib/sendContactEmail.test.ts`
- Create: `.env.local.example`

**Interfaces:**
- Produces: `type ContactSubmission = { name: string; phone: string; email: string; area: string; message: string }`,
  `async function sendContactEmail(data: ContactSubmission): Promise<void>`
  — Task 10 (API route) calls this.

- [ ] **Step 1: Write the failing test**

Create `lib/sendContactEmail.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const sendMailMock = vi.fn().mockResolvedValue({ messageId: "test-id" });
const createTransportMock = vi.fn(() => ({ sendMail: sendMailMock }));

vi.mock("nodemailer", () => ({
  default: { createTransport: createTransportMock },
}));

import { sendContactEmail } from "./sendContactEmail";

describe("sendContactEmail", () => {
  beforeEach(() => {
    sendMailMock.mockClear();
    createTransportMock.mockClear();
  });

  it("sends an email with the submission details to the lawyer's address", async () => {
    await sendContactEmail({
      name: "Maria Silva",
      phone: "(21) 90000-0000",
      email: "maria@example.com",
      area: "Inventários e Sucessões",
      message: "Gostaria de mais informações.",
    });

    expect(sendMailMock).toHaveBeenCalledTimes(1);
    const mailOptions = sendMailMock.mock.calls[0][0];
    expect(mailOptions.to).toBe("nivaldonascimento.adv@gmail.com");
    expect(mailOptions.subject).toMatch(/maria silva/i);
    expect(mailOptions.text).toContain("Maria Silva");
    expect(mailOptions.text).toContain("Gostaria de mais informações.");
    expect(mailOptions.replyTo).toBe("maria@example.com");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- lib/sendContactEmail.test.ts`
Expected: FAIL — `./sendContactEmail` does not exist.

- [ ] **Step 3: Implement sendContactEmail**

Create `lib/sendContactEmail.ts`:

```ts
import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site-config";

export type ContactSubmission = {
  name: string;
  phone: string;
  email: string;
  area: string;
  message: string;
};

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendContactEmail(
  data: ContactSubmission
): Promise<void> {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: siteConfig.email,
    replyTo: data.email,
    subject: `Novo contato pelo site — ${data.name}`,
    text: [
      `Nome: ${data.name}`,
      `Telefone: ${data.phone}`,
      `E-mail: ${data.email}`,
      `Área de interesse: ${data.area}`,
      "",
      data.message,
    ].join("\n"),
  });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- lib/sendContactEmail.test.ts`
Expected: PASS

- [ ] **Step 5: Document the required environment variables**

Create `.env.local.example`:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=nivaldonascimento.adv@gmail.com
SMTP_PASS=your-app-password-here
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add contact email sending via SMTP"
```

---

## Task 10: Contact form component + API route + Contato page

**Files:**
- Create: `components/contact/ContactForm.tsx`
- Create: `components/contact/ContactForm.test.tsx`
- Create: `app/api/contato/route.ts`
- Create: `app/api/contato/route.test.ts`
- Create: `app/contato/page.tsx`

**Interfaces:**
- Consumes: `sendContactEmail` (Task 9).
- Produces: `POST /api/contato` accepting JSON body
  `{ name, phone, email, area, message, consent }`, returning
  `{ ok: true }` (200) or `{ ok: false, error: string }` (400).

- [ ] **Step 1: Write the failing test for the API route**

Create `app/api/contato/route.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const sendContactEmailMock = vi.fn().mockResolvedValue(undefined);
vi.mock("@/lib/sendContactEmail", () => ({
  sendContactEmail: sendContactEmailMock,
}));

import { POST } from "./route";

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/contato", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("POST /api/contato", () => {
  beforeEach(() => {
    sendContactEmailMock.mockClear();
  });

  it("sends the email and returns ok when the submission is valid", async () => {
    const response = await POST(
      makeRequest({
        name: "Maria Silva",
        phone: "(21) 90000-0000",
        email: "maria@example.com",
        area: "Inventários e Sucessões",
        message: "Gostaria de mais informações.",
        consent: true,
      })
    );

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.ok).toBe(true);
    expect(sendContactEmailMock).toHaveBeenCalledTimes(1);
  });

  it("rejects the submission when consent is missing", async () => {
    const response = await POST(
      makeRequest({
        name: "Maria Silva",
        phone: "(21) 90000-0000",
        email: "maria@example.com",
        area: "Inventários e Sucessões",
        message: "Gostaria de mais informações.",
        consent: false,
      })
    );

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.ok).toBe(false);
    expect(sendContactEmailMock).not.toHaveBeenCalled();
  });

  it("rejects the submission when a required field is missing", async () => {
    const response = await POST(
      makeRequest({
        name: "",
        phone: "(21) 90000-0000",
        email: "maria@example.com",
        area: "Inventários e Sucessões",
        message: "Gostaria de mais informações.",
        consent: true,
      })
    );

    expect(response.status).toBe(400);
    expect(sendContactEmailMock).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- app/api/contato/route.test.ts`
Expected: FAIL — `./route` does not exist.

- [ ] **Step 3: Implement the API route**

Create `app/api/contato/route.ts`:

```ts
import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/sendContactEmail";

type ContactBody = {
  name?: string;
  phone?: string;
  email?: string;
  area?: string;
  message?: string;
  consent?: boolean;
};

export async function POST(request: Request) {
  const body = (await request.json()) as ContactBody;

  const requiredFields: (keyof ContactBody)[] = [
    "name",
    "phone",
    "email",
    "area",
    "message",
  ];
  const missingField = requiredFields.find((field) => !body[field]);

  if (missingField) {
    return NextResponse.json(
      { ok: false, error: `Campo obrigatório ausente: ${missingField}` },
      { status: 400 }
    );
  }

  if (!body.consent) {
    return NextResponse.json(
      {
        ok: false,
        error: "É necessário aceitar a Política de Privacidade.",
      },
      { status: 400 }
    );
  }

  await sendContactEmail({
    name: body.name!,
    phone: body.phone!,
    email: body.email!,
    area: body.area!,
    message: body.message!,
  });

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- app/api/contato/route.test.ts`
Expected: PASS

- [ ] **Step 5: Write the failing test for ContactForm**

Create `components/contact/ContactForm.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ContactForm from "./ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    }) as unknown as typeof fetch;
  });

  it("blocks submission until the LGPD consent checkbox is checked", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/nome/i), "Maria Silva");
    await user.type(screen.getByLabelText(/telefone/i), "(21) 90000-0000");
    await user.type(screen.getByLabelText(/^e-mail/i), "maria@example.com");
    await user.type(screen.getByLabelText(/mensagem/i), "Preciso de ajuda.");

    await user.click(screen.getByRole("button", { name: /enviar/i }));

    expect(
      screen.getByText(/aceitar a pol[íi]tica de privacidade/i)
    ).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("submits to /api/contato when all fields and consent are provided", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/nome/i), "Maria Silva");
    await user.type(screen.getByLabelText(/telefone/i), "(21) 90000-0000");
    await user.type(screen.getByLabelText(/^e-mail/i), "maria@example.com");
    await user.type(screen.getByLabelText(/mensagem/i), "Preciso de ajuda.");
    await user.click(screen.getByLabelText(/li e aceito/i));

    await user.click(screen.getByRole("button", { name: /enviar/i }));

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/contato",
      expect.objectContaining({ method: "POST" })
    );
    expect(await screen.findByText(/mensagem enviada/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npm run test -- components/contact/ContactForm.test.tsx`
Expected: FAIL — `./ContactForm` does not exist.

- [ ] **Step 7: Implement ContactForm**

Create `components/contact/ContactForm.tsx`:

```tsx
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

const areaOptions = [
  "Inventários e Sucessões",
  "Direito de Família",
  "Administração de Imóveis",
  "Outro assunto",
];

export default function ContactForm() {
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!consent) {
      setConsentError(true);
      return;
    }
    setConsentError(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      area: formData.get("area"),
      message: formData.get("message"),
      consent,
    };

    setStatus("sending");

    const response = await fetch("/api/contato", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setStatus(response.ok ? "sent" : "error");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Nome
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded border border-brand-navy/30 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          Telefone
        </label>
        <input
          id="phone"
          name="phone"
          required
          className="w-full rounded border border-brand-navy/30 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded border border-brand-navy/30 px-3 py-2"
        />
      </div>
      <div>
        <label htmlFor="area" className="block text-sm font-medium mb-1">
          Área de interesse
        </label>
        <select
          id="area"
          name="area"
          defaultValue={areaOptions[0]}
          className="w-full rounded border border-brand-navy/30 px-3 py-2"
        >
          {areaOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded border border-brand-navy/30 px-3 py-2"
        />
      </div>
      <div>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => {
              setConsent(event.target.checked);
              if (event.target.checked) setConsentError(false);
            }}
          />
          <span>
            Li e aceito a{" "}
            <Link href="/privacidade" className="underline" target="_blank">
              Política de Privacidade
            </Link>{" "}
            e autorizo o uso dos meus dados para retorno de contato.
          </span>
        </label>
        {consentError && (
          <p className="text-red-600 text-sm mt-1">
            É necessário aceitar a Política de Privacidade para continuar.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded bg-brand-gold px-6 py-3 text-brand-navy font-medium hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Enviar"}
      </button>

      {status === "sent" && (
        <p className="text-green-700 text-sm">
          Mensagem enviada com sucesso. Retornaremos em breve.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-sm">
          Não foi possível enviar a mensagem. Tente novamente ou use o
          WhatsApp.
        </p>
      )}
    </form>
  );
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npm run test -- components/contact/ContactForm.test.tsx`
Expected: PASS

- [ ] **Step 9: Create the Contato page**

Create `app/contato/page.tsx`:

```tsx
import ContactForm from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site-config";

export default function ContatoPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-2">
      <div>
        <h1 className="font-serif text-3xl mb-4">Contato</h1>
        <p className="text-brand-navy/80 mb-2">{siteConfig.phone}</p>
        <p className="text-brand-navy/80 mb-2">{siteConfig.email}</p>
        <p className="text-brand-navy/80">
          {siteConfig.city} - {siteConfig.state}
        </p>
      </div>
      <ContactForm />
    </main>
  );
}
```

- [ ] **Step 10: Run the full test suite and build**

Run: `npm run test && npm run build`
Expected: all tests PASS, build succeeds.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: add contact form, API route, and Contato page"
```

---

## Task 11: Blog (post loader + index + article page + 2 articles)

**Files:**
- Create: `content/blog/inventario-extrajudicial.md`
- Create: `content/blog/divorcio-consensual.md`
- Create: `lib/blog.ts`
- Create: `lib/blog.test.ts`
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`

**Interfaces:**
- Produces: `type BlogPost = { slug: string; title: string; date: string; excerpt: string; html: string }`,
  `function getAllPosts(): BlogPost[]`, `function getPostBySlug(slug: string): BlogPost | undefined`.

- [ ] **Step 1: Create the two placeholder articles**

Create `content/blog/inventario-extrajudicial.md`:

```markdown
---
title: "Quando é possível fazer inventário extrajudicial?"
date: "2026-08-01"
excerpt: "Entenda os requisitos para realizar o inventário em cartório, sem passar pelo processo judicial."
---

O inventário extrajudicial pode ser feito em cartório quando não há
testamento e todos os herdeiros são maiores, capazes e estão de acordo com
os termos da partilha. É um caminho geralmente mais rápido que o inventário
judicial, mas exige assistência de um advogado em todas as etapas.

Cada caso tem particularidades que podem afastar essa possibilidade — por
isso, uma avaliação individual é sempre recomendada antes de decidir o
caminho a seguir.
```

Create `content/blog/divorcio-consensual.md`:

```markdown
---
title: "Divórcio consensual: como funciona"
date: "2026-08-10"
excerpt: "Veja os requisitos e etapas para realizar um divórcio consensual, inclusive em cartório."
---

Quando o casal está de acordo com todos os termos — partilha de bens,
guarda dos filhos (se houver) e pensão — o divórcio consensual pode ser uma
via mais rápida que o processo litigioso.

Se não houver filhos menores ou incapazes envolvidos, é possível realizar o
divórcio consensual diretamente em cartório, sempre com a assistência de um
advogado.
```

- [ ] **Step 2: Write the failing test for the blog loader**

Create `lib/blog.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { getAllPosts, getPostBySlug } from "./blog";

describe("blog loader", () => {
  it("lists all posts sorted by date, newest first", () => {
    const posts = getAllPosts();
    expect(posts.length).toBe(2);
    expect(posts[0].slug).toBe("divorcio-consensual");
    expect(posts[1].slug).toBe("inventario-extrajudicial");
  });

  it("returns the parsed post content by slug", () => {
    const post = getPostBySlug("inventario-extrajudicial");
    expect(post).toBeDefined();
    expect(post!.title).toBe(
      "Quando é possível fazer inventário extrajudicial?"
    );
    expect(post!.html).toContain("<p>");
    expect(post!.html).toContain("inventário extrajudicial");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getPostBySlug("does-not-exist")).toBeUndefined();
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm run test -- lib/blog.test.ts`
Expected: FAIL — `./blog` does not exist.

- [ ] **Step 4: Implement the blog loader**

Create `lib/blog.ts`:

```ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const postsDirectory = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  html: string;
};

export function getAllPosts(): BlogPost[] {
  const files = fs.readdirSync(postsDirectory);

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    return getPostBySlug(slug)!;
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    html: marked.parse(content, { async: false }) as string,
  };
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm run test -- lib/blog.test.ts`
Expected: PASS

- [ ] **Step 6: Create the blog index page**

Create `app/blog/page.tsx`:

```tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl mb-10">Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="font-serif text-xl hover:text-brand-gold">
              {post.title}
            </Link>
            <p className="text-brand-navy/80 text-sm mt-1">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 7: Create the blog article page**

Create `app/blog/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default function BlogArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl mb-4">{post.title}</h1>
      <div
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </main>
  );
}
```

- [ ] **Step 8: Run the full test suite and build**

Run: `npm run test && npm run build`
Expected: all tests PASS, build succeeds.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: add blog loader, index page, and article page with 2 posts"
```

---

## Task 12: Política de Privacidade page

**Files:**
- Create: `app/privacidade/page.tsx`
- Create: `app/privacidade/page.test.tsx`

**Interfaces:**
- Consumes: `siteConfig` (Task 1).

- [ ] **Step 1: Write the failing test**

Create `app/privacidade/page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PrivacidadePage from "./page";

describe("PrivacidadePage", () => {
  it("explains data usage and shows a contact channel", () => {
    render(<PrivacidadePage />);
    expect(
      screen.getByRole("heading", { name: /pol[íi]tica de privacidade/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/nivaldonascimento\.adv@gmail\.com/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- app/privacidade/page.test.tsx`
Expected: FAIL — `./page` does not exist.

- [ ] **Step 3: Implement the Política de Privacidade page**

Create `app/privacidade/page.tsx`:

```tsx
import { siteConfig } from "@/lib/site-config";

export default function PrivacidadePage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 space-y-4 text-brand-navy/80">
      <h1 className="font-serif text-3xl text-brand-navy mb-4">
        Política de Privacidade
      </h1>
      <p>
        Os dados enviados pelo formulário de contato deste site (nome,
        telefone, e-mail, área de interesse e mensagem) são utilizados
        exclusivamente para retorno do atendimento solicitado, em
        conformidade com a Lei Geral de Proteção de Dados (Lei nº
        13.709/2018).
      </p>
      <p>
        Esses dados não são compartilhados com terceiros e são mantidos
        apenas pelo tempo necessário ao atendimento e cumprimento de
        obrigações legais.
      </p>
      <p>
        Para solicitar informações, correção ou exclusão dos seus dados,
        entre em contato pelo e-mail{" "}
        <a href={`mailto:${siteConfig.email}`} className="underline">
          {siteConfig.email}
        </a>
        .
      </p>
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- app/privacidade/page.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Política de Privacidade page"
```

---

## Task 13: SEO — Attorney/LegalService structured data

**Files:**
- Create: `components/seo/AttorneySchema.tsx`
- Create: `components/seo/AttorneySchema.test.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `siteConfig` (Task 1).
- Produces: `<AttorneySchema />` rendered once in `app/layout.tsx`.

- [ ] **Step 1: Write the failing test**

Create `components/seo/AttorneySchema.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AttorneySchema from "./AttorneySchema";

describe("AttorneySchema", () => {
  it("renders a JSON-LD script with Attorney type and the correct city", () => {
    const { container } = render(<AttorneySchema />);
    const script = container.querySelector(
      'script[type="application/ld+json"]'
    );
    expect(script).not.toBeNull();

    const json = JSON.parse(script!.textContent ?? "{}");
    expect(json["@type"]).toBe("Attorney");
    expect(json.name).toBe("Dr. Nivaldo P. do Nascimento");
    expect(json.address.addressLocality).toBe("Rio de Janeiro");
    expect(json.address.addressRegion).toBe("RJ");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- components/seo/AttorneySchema.test.tsx`
Expected: FAIL — `./AttorneySchema` does not exist.

- [ ] **Step 3: Implement AttorneySchema**

Create `components/seo/AttorneySchema.tsx`:

```tsx
import { siteConfig } from "@/lib/site-config";

export default function AttorneySchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: siteConfig.lawyerName,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: "BR",
    },
    areaServed: siteConfig.city,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- components/seo/AttorneySchema.test.tsx`
Expected: PASS

- [ ] **Step 5: Wire it into the root layout**

Edit `app/layout.tsx` — import and render inside `<head>` is not directly
supported in the body-only layout above, so render it as the first child of
`<body>`, before `<Header />`:

```tsx
import AttorneySchema from "@/components/seo/AttorneySchema";
```

```tsx
<body className={`${playfair.variable} ${inter.variable} font-sans bg-brand-cream text-brand-navy`}>
  <AttorneySchema />
  <Header />
  {children}
  <WhatsAppButton />
  <Footer />
</body>
```

- [ ] **Step 6: Run the full test suite and build**

Run: `npm run test && npm run build`
Expected: all tests PASS, build succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Attorney structured data for local SEO"
```

---

## Task 14: Final verification pass

**Files:** none created — verification only.

- [ ] **Step 1: Run the full automated test suite**

Run: `npm run test`
Expected: all tests across every task PASS.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: build succeeds with no type errors.

- [ ] **Step 3: Start the dev server and manually verify the golden path**

Run: `npm run dev`, open `http://localhost:3000`, and check:
- Home page loads, Hero animates in, both CTA buttons work.
- Header navigation reaches every page (Início, Sobre, Áreas de Atuação,
  Simulador, Blog, Contato).
- Each of the 3 area pages shows its FAQ accordion opening/closing.
- Simulador produces an estimate after answering all 3 questions, and the
  disclaimer is always visible.
- Contato form: submitting without checking the LGPD box shows the
  validation message; checking it and submitting (with `SMTP_*` env vars
  configured in `.env.local`) sends an email and shows the success message.
- WhatsApp floating button is visible on every page and opens `wa.me` with
  the correct number.
- Blog index lists both articles; each links to a working article page.
- Footer shows the OAB placeholder and links to Política de Privacidade.

- [ ] **Step 4: Verify edge cases in the simulator and form**

- Simulator: answer "Não" to "Há bens a inventariar?" — result should say
  no formal inventory may be needed, 0 months.
- Simulator: answer "Sim" to "Há testamento?" — result should always be
  the judicial estimate (8-24 months), regardless of the other answers.
- Contact form: leave the "Mensagem" field empty and submit — the browser's
  native required-field validation should block submission.

- [ ] **Step 5: Commit the final state (if any manual fixes were made)**

```bash
git add -A
git commit -m "chore: final verification pass for launch readiness"
```

If no fixes were needed, skip this step — there is nothing to commit.

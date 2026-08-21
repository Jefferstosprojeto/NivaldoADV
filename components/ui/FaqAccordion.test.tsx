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

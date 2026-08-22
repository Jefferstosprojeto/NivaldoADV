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
    expect(screen.getByRole("link", { name: /legaliza[çc][ãa]o de im[óo]veis/i })).toHaveAttribute(
      "href",
      "/areas-de-atuacao/administracao-imoveis"
    );
  });
});

import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  it("shows the OAB number and contact info", () => {
    render(<Footer />);
    expect(screen.getByText(/OAB\/RJ 93\.663/)).toBeInTheDocument();
    expect(screen.getByText(/contato@nivaldonascimento\.adv\.br/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /pol[íi]tica de privacidade/i })).toHaveAttribute(
      "href",
      "/privacidade"
    );
  });
});

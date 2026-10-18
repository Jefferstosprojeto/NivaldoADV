import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PrivacidadePage from "./page";

describe("PrivacidadePage", () => {
  it("explains data usage and shows a contact channel", () => {
    render(<PrivacidadePage />);
    expect(
      screen.getByRole("heading", { name: /pol[íi]tica de privacidade/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/contato@nivaldonascimento\.adv\.br/)).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Header from "./Header";

describe("Header", () => {
  it("reveals the mobile nav links when the hamburger is clicked, and closes on link click", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole("button", { name: /abrir menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: /fechar menu/i })).toBeInTheDocument();

    const mobileLinks = screen.getAllByRole("link", { name: "Contato" });
    expect(mobileLinks.length).toBeGreaterThanOrEqual(1);

    await user.click(mobileLinks[mobileLinks.length - 1]);

    expect(
      screen.getByRole("button", { name: /abrir menu/i })
    ).toHaveAttribute("aria-expanded", "false");
  });
});

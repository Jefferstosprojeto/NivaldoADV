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

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

  it("shows an error and re-enables the submit button when the network request fails", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("network"));
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/nome/i), "Maria Silva");
    await user.type(screen.getByLabelText(/telefone/i), "(21) 90000-0000");
    await user.type(screen.getByLabelText(/^e-mail/i), "maria@example.com");
    await user.type(screen.getByLabelText(/mensagem/i), "Preciso de ajuda.");
    await user.click(screen.getByLabelText(/li e aceito/i));

    await user.click(screen.getByRole("button", { name: /enviar/i }));

    expect(
      await screen.findByText(/não foi possível enviar a mensagem/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /enviar/i })).not.toBeDisabled();
  });
});

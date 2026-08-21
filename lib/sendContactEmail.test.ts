import { describe, it, expect, vi, beforeEach } from "vitest";

const { sendMailMock, createTransportMock } = vi.hoisted(() => {
  const sendMailMock = vi.fn().mockResolvedValue({ messageId: "test-id" });
  const createTransportMock = vi.fn(() => ({ sendMail: sendMailMock }));
  return { sendMailMock, createTransportMock };
});

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

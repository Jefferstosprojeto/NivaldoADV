import { describe, it, expect, vi, beforeEach } from "vitest";

const { sendContactEmailMock } = vi.hoisted(() => {
  const sendContactEmailMock = vi.fn().mockResolvedValue(undefined);
  return { sendContactEmailMock };
});
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

  it("returns 400 (not 500) when the request body is malformed JSON", async () => {
    const request = new Request("http://localhost/api/contato", {
      method: "POST",
      body: "{not valid json",
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    const json = await response.json();
    expect(json.ok).toBe(false);
    expect(sendContactEmailMock).not.toHaveBeenCalled();
  });

  it("returns 500 with an error shape when sendContactEmail rejects", async () => {
    sendContactEmailMock.mockRejectedValueOnce(new Error("SMTP down"));

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

    expect(response.status).toBe(500);
    const json = await response.json();
    expect(json.ok).toBe(false);
    expect(typeof json.error).toBe("string");
  });

  it("returns 200 ok:true without sending an email when the honeypot field is filled", async () => {
    const response = await POST(
      makeRequest({
        name: "Maria Silva",
        phone: "(21) 90000-0000",
        email: "maria@example.com",
        area: "Inventários e Sucessões",
        message: "Gostaria de mais informações.",
        consent: true,
        website: "http://spambot.example.com",
      })
    );

    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.ok).toBe(true);
    expect(sendContactEmailMock).not.toHaveBeenCalled();
  });

  it("rejects the submission when message exceeds the length cap", async () => {
    const response = await POST(
      makeRequest({
        name: "Maria Silva",
        phone: "(21) 90000-0000",
        email: "maria@example.com",
        area: "Inventários e Sucessões",
        message: "a".repeat(5001),
        consent: true,
      })
    );

    expect(response.status).toBe(400);
    expect(sendContactEmailMock).not.toHaveBeenCalled();
  });
});

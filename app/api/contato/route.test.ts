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
});

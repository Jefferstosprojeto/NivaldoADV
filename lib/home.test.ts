import { describe, it, expect } from "vitest";
import { homeFaq, homeServices } from "./home";

describe("home content", () => {
  it("lists the 12 services requested by the client", () => {
    expect(homeServices).toHaveLength(12);
    expect(new Set(homeServices).size).toBe(homeServices.length);
  });

  it("answers every frequently asked question", () => {
    expect(homeFaq).toHaveLength(11);
    for (const item of homeFaq) {
      expect(item.question.trim()).not.toBe("");
      expect(item.answer.trim()).not.toBe("");
    }
  });
});

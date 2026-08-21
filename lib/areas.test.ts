import { describe, it, expect } from "vitest";
import { areas } from "./areas";

describe("areas", () => {
  it("has content for all three practice areas", () => {
    expect(Object.keys(areas)).toEqual([
      "inventarios",
      "familia",
      "administracao-imoveis",
    ]);
  });

  it("each area has a title, intro, at least one service, and at least one FAQ", () => {
    for (const area of Object.values(areas)) {
      expect(area.title.length).toBeGreaterThan(0);
      expect(area.intro.length).toBeGreaterThan(0);
      expect(area.services.length).toBeGreaterThan(0);
      expect(area.faq.length).toBeGreaterThan(0);
    }
  });
});

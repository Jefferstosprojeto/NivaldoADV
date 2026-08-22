import { describe, it, expect } from "vitest";
import { siteConfig } from "./site-config";

describe("siteConfig", () => {
  it("has the lawyer's contact info", () => {
    expect(siteConfig.lawyerName).toBe("Dr. Nivaldo Nascimento");
    expect(siteConfig.phone).toBe("(21) 99919-5726");
    expect(siteConfig.whatsappNumber).toBe("5521999195726");
    expect(siteConfig.email).toBe("nivaldonascimento.adv@gmail.com");
    expect(siteConfig.oab).toBe("OAB/RJ 93.663");
    expect(siteConfig.city).toBe("Rio de Janeiro");
    expect(siteConfig.state).toBe("RJ");
  });
});

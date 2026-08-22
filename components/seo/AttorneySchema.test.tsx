import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AttorneySchema from "./AttorneySchema";

describe("AttorneySchema", () => {
  it("renders a JSON-LD script with Attorney type and the correct city", () => {
    const { container } = render(<AttorneySchema />);
    const script = container.querySelector(
      'script[type="application/ld+json"]'
    );
    expect(script).not.toBeNull();

    const json = JSON.parse(script!.textContent ?? "{}");
    expect(json["@type"]).toBe("Attorney");
    expect(json.name).toBe("Dr. Nivaldo Nascimento");
    expect(json.address.addressLocality).toBe("Rio de Janeiro");
    expect(json.address.addressRegion).toBe("RJ");
  });
});

import { describe, it, expect } from "vitest";
import { estimateInventoryDuration } from "./inventoryEstimate";

describe("estimateInventoryDuration", () => {
  it("returns a zero estimate when there are no assets", () => {
    const result = estimateInventoryDuration({
      hasWill: false,
      hasAssets: false,
      heirsAgree: true,
    });
    expect(result.minMonths).toBe(0);
    expect(result.maxMonths).toBe(0);
    expect(result.isExtrajudicial).toBe(false);
  });

  it("suggests extrajudicial inventory when there's no will and heirs agree", () => {
    const result = estimateInventoryDuration({
      hasWill: false,
      hasAssets: true,
      heirsAgree: true,
    });
    expect(result.isExtrajudicial).toBe(true);
    expect(result.minMonths).toBe(1);
    expect(result.maxMonths).toBe(3);
  });

  it("suggests judicial inventory with a longer estimate when there's a will", () => {
    const result = estimateInventoryDuration({
      hasWill: true,
      hasAssets: true,
      heirsAgree: true,
    });
    expect(result.isExtrajudicial).toBe(false);
    expect(result.minMonths).toBe(8);
    expect(result.maxMonths).toBe(24);
  });

  it("suggests judicial inventory when heirs disagree, even without a will", () => {
    const result = estimateInventoryDuration({
      hasWill: false,
      hasAssets: true,
      heirsAgree: false,
    });
    expect(result.isExtrajudicial).toBe(false);
    expect(result.minMonths).toBe(8);
    expect(result.maxMonths).toBe(24);
  });

  it("suggests a medium judicial estimate when there's no will and heirs agree is unknown-neutral case", () => {
    const result = estimateInventoryDuration({
      hasWill: false,
      hasAssets: true,
      heirsAgree: true,
    });
    expect(result.summary).toMatch(/extrajudicial/i);
  });
});

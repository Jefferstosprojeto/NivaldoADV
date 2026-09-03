import { describe, it, expect } from "vitest";
import { estimateInventoryDuration } from "./inventoryEstimate";

const baseAnswers = {
  hasWill: false,
  hasAssets: true,
  heirsAgree: true,
  hasMinorOrIncapableHeirs: false,
  isPartitionEqual: true,
  hasDebts: false,
};

describe("estimateInventoryDuration", () => {
  it("returns a zero estimate when there are no assets", () => {
    const result = estimateInventoryDuration({
      ...baseAnswers,
      hasAssets: false,
    });
    expect(result.minMonths).toBe(0);
    expect(result.maxMonths).toBe(0);
    expect(result.isExtrajudicial).toBe(false);
  });

  it("suggests extrajudicial inventory when there's no will and heirs agree", () => {
    const result = estimateInventoryDuration(baseAnswers);
    expect(result.isExtrajudicial).toBe(true);
    expect(result.minMonths).toBe(1);
    expect(result.maxMonths).toBe(3);
  });

  it("still suggests extrajudicial inventory when there's a will, since recent CNJ rules allow it", () => {
    const result = estimateInventoryDuration({
      ...baseAnswers,
      hasWill: true,
    });
    expect(result.isExtrajudicial).toBe(true);
    expect(result.minMonths).toBe(1);
    expect(result.maxMonths).toBe(3);
  });

  it("suggests judicial inventory when heirs disagree, even without a will", () => {
    const result = estimateInventoryDuration({
      ...baseAnswers,
      heirsAgree: false,
    });
    expect(result.isExtrajudicial).toBe(false);
    expect(result.minMonths).toBe(8);
    expect(result.maxMonths).toBe(24);
  });

  it("still suggests extrajudicial inventory with minor or incapable heirs when the partition is equal", () => {
    const result = estimateInventoryDuration({
      ...baseAnswers,
      hasMinorOrIncapableHeirs: true,
      isPartitionEqual: true,
    });
    expect(result.isExtrajudicial).toBe(true);
    expect(result.minMonths).toBe(1);
    expect(result.maxMonths).toBe(3);
  });

  it("forces judicial inventory with a longer estimate when minor or incapable heirs have an unequal partition", () => {
    const result = estimateInventoryDuration({
      ...baseAnswers,
      hasMinorOrIncapableHeirs: true,
      isPartitionEqual: false,
    });
    expect(result.isExtrajudicial).toBe(false);
    expect(result.minMonths).toBe(10);
    expect(result.maxMonths).toBe(30);
    expect(result.summary).toMatch(/menor|incapaz/i);
  });

  it("extends the extrajudicial estimate when the estate has debts", () => {
    const result = estimateInventoryDuration({
      ...baseAnswers,
      hasDebts: true,
    });
    expect(result.isExtrajudicial).toBe(true);
    expect(result.minMonths).toBe(2);
    expect(result.maxMonths).toBe(4);
  });

  it("extends the judicial estimate when heirs disagree and the estate has debts", () => {
    const result = estimateInventoryDuration({
      ...baseAnswers,
      heirsAgree: false,
      hasDebts: true,
    });
    expect(result.isExtrajudicial).toBe(false);
    expect(result.minMonths).toBe(10);
    expect(result.maxMonths).toBe(30);
  });

  it("mentions extrajudicial in the summary for the best-case scenario", () => {
    const result = estimateInventoryDuration(baseAnswers);
    expect(result.summary).toMatch(/extrajudicial/i);
  });
});

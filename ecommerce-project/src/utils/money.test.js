import { formatMoney } from "./money";
import { describe, it, expect } from "vitest";

describe("formatMoney", () => {
  it("to get the result like $19.99", () => {
    expect(formatMoney(1999)).toBe("$19.99");
  });
  it("checkTwo decimals", () => {
    expect(formatMoney(100)).toBe("$1.00");
  });
});

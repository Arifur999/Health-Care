import { describe, expect, it } from "vitest"
import { formatCurrency } from "./currency"

describe("formatCurrency", () => {
  it("formats a positive amount with the Taka symbol and two decimals", () => {
    expect(formatCurrency(800)).toBe("৳800.00")
    expect(formatCurrency(1234.5)).toBe("৳1234.50")
  })

  it("treats null / undefined / non-finite as zero", () => {
    expect(formatCurrency(null)).toBe("৳0.00")
    expect(formatCurrency(undefined)).toBe("৳0.00")
    expect(formatCurrency(Number.NaN)).toBe("৳0.00")
    expect(formatCurrency(Infinity)).toBe("৳0.00")
  })

  it("handles zero", () => {
    expect(formatCurrency(0)).toBe("৳0.00")
  })
})

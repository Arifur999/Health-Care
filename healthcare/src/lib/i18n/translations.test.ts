import { describe, expect, it } from "vitest"
import { translations } from "./translations"

// Guards the bilingual dictionary: it's easy to add a key to one locale and
// forget the other, which would silently fall back to English (or the raw key).
describe("translations dictionary", () => {
  const enKeys = Object.keys(translations.en)
  const bnKeys = Object.keys(translations.bn)

  it("has the same set of keys in both locales", () => {
    const missingInBn = enKeys.filter((key) => !(key in translations.bn))
    const missingInEn = bnKeys.filter((key) => !(key in translations.en))
    expect(missingInBn).toEqual([])
    expect(missingInEn).toEqual([])
  })

  it("has no empty values", () => {
    for (const [key, value] of Object.entries(translations.en)) {
      expect(value.trim(), `en.${key} is empty`).not.toBe("")
    }
    for (const [key, value] of Object.entries(translations.bn)) {
      expect(value.trim(), `bn.${key} is empty`).not.toBe("")
    }
  })

  it("actually translates (bn differs from en for most keys)", () => {
    const identical = enKeys.filter((key) => {
      const k = key as keyof typeof translations.en
      return translations.en[k] === translations.bn[k]
    })
    // A few values are intentionally identical (e.g. brand-ish strings); guard
    // against a locale that's mostly just copied English.
    expect(identical.length).toBeLessThan(enKeys.length / 2)
  })
})

import { describe, expect, it } from "vitest"
import { getVideoConsultationLink } from "./videoConsultation"

describe("getVideoConsultationLink", () => {
  it("builds a Jitsi room link from the videoCallingId", () => {
    expect(getVideoConsultationLink("abc123")).toBe("https://meet.jit.si/meddical-abc123")
  })

  it("returns null when there is no videoCallingId", () => {
    expect(getVideoConsultationLink()).toBeNull()
    expect(getVideoConsultationLink("")).toBeNull()
  })
})

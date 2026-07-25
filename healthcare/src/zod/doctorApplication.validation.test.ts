import { describe, expect, it } from "vitest"
import { DoctorApplicationZodSchema } from "./doctorApplication.validation"

const validPayload = {
  name: "Dr. Jane Doe",
  email: "jane@example.com",
  contactNumber: "01700000000",
  registrationNumber: "BMDC-12345",
  experience: 5,
  gender: "FEMALE",
  qualification: "MBBS, FCPS",
  currentWorkingPlace: "City Hospital",
  designation: "Consultant",
  appointmentFee: 800,
  message: "I would like to join.",
}

describe("DoctorApplicationZodSchema", () => {
  it("accepts a valid application", () => {
    const result = DoctorApplicationZodSchema.safeParse(validPayload)
    expect(result.success).toBe(true)
  })

  it("coerces numeric strings for experience and fee", () => {
    const result = DoctorApplicationZodSchema.safeParse({
      ...validPayload,
      experience: "7",
      appointmentFee: "1200",
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.experience).toBe(7)
      expect(result.data.appointmentFee).toBe(1200)
    }
  })

  it("rejects an invalid email", () => {
    const result = DoctorApplicationZodSchema.safeParse({ ...validPayload, email: "not-an-email" })
    expect(result.success).toBe(false)
  })

  it("rejects an invalid gender", () => {
    const result = DoctorApplicationZodSchema.safeParse({ ...validPayload, gender: "UNKNOWN" })
    expect(result.success).toBe(false)
  })

  it("rejects a negative fee", () => {
    const result = DoctorApplicationZodSchema.safeParse({ ...validPayload, appointmentFee: -1 })
    expect(result.success).toBe(false)
  })

  it("treats message as optional", () => {
    const { message: _message, ...withoutMessage } = validPayload
    const result = DoctorApplicationZodSchema.safeParse(withoutMessage)
    expect(result.success).toBe(true)
  })
})

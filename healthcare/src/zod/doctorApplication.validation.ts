import { z } from "zod"

export const DoctorApplicationZodSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(100, "Name must not exceed 100 characters"),
  email: z.email("Invalid email address"),
  contactNumber: z
    .string()
    .min(7, "Contact number must be at least 7 characters long")
    .max(20, "Contact number must not exceed 20 characters"),
  registrationNumber: z
    .string()
    .min(3, "Registration number must be at least 3 characters long")
    .max(50, "Registration number must not exceed 50 characters"),
  experience: z.coerce
    .number()
    .int("Experience must be a whole number")
    .nonnegative("Experience cannot be negative"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], "Please select a gender"),
  qualification: z
    .string()
    .min(2, "Qualification must be at least 2 characters long")
    .max(200, "Qualification must not exceed 200 characters"),
  currentWorkingPlace: z
    .string()
    .min(2, "Current working place must be at least 2 characters long")
    .max(100, "Current working place must not exceed 100 characters"),
  designation: z
    .string()
    .min(2, "Designation must be at least 2 characters long")
    .max(100, "Designation must not exceed 100 characters"),
  appointmentFee: z.coerce
    .number()
    .nonnegative("Appointment fee cannot be negative"),
  message: z.string().max(1000, "Message must not exceed 1000 characters").optional(),
})

export type IDoctorApplication = z.infer<typeof DoctorApplicationZodSchema>

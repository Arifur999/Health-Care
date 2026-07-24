export type DoctorApplicationStatus = "PENDING" | "APPROVED" | "REJECTED"

export interface IDoctorApplicationPayload {
  name: string
  email: string
  contactNumber: string
  registrationNumber: string
  experience: number
  gender: "MALE" | "FEMALE" | "OTHER"
  qualification: string
  currentWorkingPlace: string
  designation: string
  appointmentFee: number
  message?: string
}

export interface IDoctorApplication extends IDoctorApplicationPayload {
  id: string
  status: DoctorApplicationStatus
  reviewNote?: string | null
  createdAt: string
  updatedAt: string
}

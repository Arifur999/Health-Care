export interface IReview {
  id: string
  rating: number
  comment: string
  doctorId: string
  patientId: string
  appointmentId: string
  createdAt?: string
  doctor?: {
    id: string
    name: string
    profilePhoto?: string
    designation?: string
  }
  patient?: {
    id: string
    name: string
    profilePhoto?: string
  }
}

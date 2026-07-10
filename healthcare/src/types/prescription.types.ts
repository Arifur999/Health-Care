export interface IPrescription {
  id: string
  instructions: string
  followUpDate?: string
  pdfUrl?: string
  appointmentId: string
  patientId: string
  doctorId: string
  createdAt?: string
  patient?: {
    id: string
    name: string
    email?: string
  }
  doctor?: {
    id: string
    name: string
    designation?: string
  }
  appointment?: {
    id: string
    status?: string
  }
}

export interface ICreatePrescriptionPayload {
  appointmentId: string
  instructions: string
  followUpDate?: string
}

export interface IUpdatePrescriptionPayload {
  instructions?: string
  followUpDate?: string
}

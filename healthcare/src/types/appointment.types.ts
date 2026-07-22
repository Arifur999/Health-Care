export type AppointmentStatus =
  | "SCHEDULED"
  | "INPROGRESS"
  | "COMPLETED"
  | "CANCELED"
  | string

export type PaymentStatus = "PAID" | "UNPAID" | "FAILED" | string

export interface IAppointmentDoctor {
  id?: string
  name?: string
  email?: string
  profilePhoto?: string
  designation?: string
  currentWorkingPlace?: string
  appointmentFee?: number
}

export interface IAppointmentPatient {
  id?: string
  name?: string
  email?: string
  profilePhoto?: string
  contactNumber?: string
  address?: string
}

export interface IAppointmentSchedule {
  id?: string
  startTime?: string | Date
  endTime?: string | Date
}

export interface IAppointmentPayment {
  id?: string
  amount?: number
  transactionId?: string
  status?: PaymentStatus
  invoiceUrl?: string | null
}

export interface IAppointment {
  id: string
  doctorId?: string
  patientId?: string
  scheduleId?: string
  videoCallingId?: string
  appointmentType?: AppointmentType
  status?: AppointmentStatus
  paymentStatus?: PaymentStatus
  createdAt?: string | Date
  updatedAt?: string | Date
  doctor?: IAppointmentDoctor | null
  patient?: IAppointmentPatient | null
  schedule?: IAppointmentSchedule | null
  payment?: IAppointmentPayment | null
}

export type AppointmentType = "IN_PERSON" | "VIDEO_CALL"

export interface IBookAppointmentPayload {
  doctorId: string
  scheduleId: string
  appointmentType?: AppointmentType
}

export interface IBookAppointmentResult {
  appointment: IAppointment
  payment?: IAppointmentPayment
  paymentUrl?: string | null
}

export interface IInitiatePaymentResult {
  paymentUrl: string
}
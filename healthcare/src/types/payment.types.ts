export interface IPayment {
  id: string
  amount: number
  transactionId: string
  status: "PAID" | "UNPAID" | string
  invoiceUrl?: string | null
  createdAt?: string
  appointmentId: string
  appointment?: {
    id: string
    status?: string
    doctor?: {
      id: string
      name: string
      email?: string
    }
    patient?: {
      id: string
      name: string
      email?: string
    }
  }
}

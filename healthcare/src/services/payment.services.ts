"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { type IPayment } from "@/types/payment.types"

export const getAllPayments = async () => {
  try {
    return await httpClient.get<IPayment[]>("/payments")
  } catch (error) {
    console.log("Error fetching payments:", error)
    throw error
  }
}

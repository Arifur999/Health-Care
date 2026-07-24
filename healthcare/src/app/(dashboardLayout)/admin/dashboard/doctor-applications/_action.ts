"use server"

import { approveDoctorApplication, rejectDoctorApplication } from "@/services/doctorApplication.services"
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types"
import { type IDoctorApplication } from "@/types/doctorApplication.types"

const getActionErrorMessage = (error: unknown, fallback: string) => {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response &&
    error.response.data &&
    typeof error.response.data === "object" &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message
  }
  if (error instanceof Error) return error.message
  return fallback
}

export const approveDoctorApplicationAction = async (
  id: string,
  reviewNote?: string,
): Promise<ApiResponse<IDoctorApplication> | ApiErrorResponse> => {
  try {
    return await approveDoctorApplication(id, reviewNote)
  } catch (error) {
    return { success: false, message: getActionErrorMessage(error, "Failed to approve application") }
  }
}

export const rejectDoctorApplicationAction = async (
  id: string,
  reviewNote?: string,
): Promise<ApiResponse<IDoctorApplication> | ApiErrorResponse> => {
  try {
    return await rejectDoctorApplication(id, reviewNote)
  } catch (error) {
    return { success: false, message: getActionErrorMessage(error, "Failed to reject application") }
  }
}

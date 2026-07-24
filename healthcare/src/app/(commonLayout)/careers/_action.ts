"use server"

import { submitDoctorApplication } from "@/services/doctorApplication.services"
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types"
import { type IDoctorApplication, type IDoctorApplicationPayload } from "@/types/doctorApplication.types"
import { DoctorApplicationZodSchema } from "@/zod/doctorApplication.validation"

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

export const submitDoctorApplicationAction = async (
  payload: IDoctorApplicationPayload,
): Promise<ApiResponse<IDoctorApplication> | ApiErrorResponse> => {
  const parsed = DoctorApplicationZodSchema.safeParse(payload)
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Please check the form and try again",
    }
  }

  try {
    return await submitDoctorApplication(parsed.data)
  } catch (error) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to submit application"),
    }
  }
}

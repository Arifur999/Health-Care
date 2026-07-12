"use server"

import { createSpecialty, deleteSpecialty, updateSpecialty } from "@/services/specialty.services"
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types"
import { type ISpecialty } from "@/types/specialty.types"

const getActionErrorMessage = (error: unknown, fallbackMessage: string) => {
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

  if (error instanceof Error) {
    return error.message
  }

  return fallbackMessage
}

export const createSpecialtyAction = async (
  formData: FormData,
): Promise<ApiResponse<ISpecialty> | ApiErrorResponse> => {
  try {
    return await createSpecialty(formData)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to create specialty"),
    }
  }
}

export const updateSpecialtyAction = async (
  id: string,
  payload: { title?: string; description?: string },
): Promise<ApiResponse<ISpecialty> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid specialty id",
    }
  }

  try {
    return await updateSpecialty(id, payload)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to update specialty"),
    }
  }
}

export const deleteSpecialtyAction = async (
  id: string,
): Promise<ApiResponse<ISpecialty> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid specialty id",
    }
  }

  try {
    return await deleteSpecialty(id)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to delete specialty"),
    }
  }
}

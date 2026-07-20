"use server"

import { changeAdminUserRole, changeAdminUserStatus, deleteAdmin } from "@/services/admin.services"
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types"

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

export const changeAdminStatusAction = async (
  userId: string,
  userStatus: "ACTIVE" | "BLOCKED",
): Promise<ApiResponse<unknown> | ApiErrorResponse> => {
  try {
    return await changeAdminUserStatus(userId, userStatus)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to change admin status"),
    }
  }
}

export const changeAdminRoleAction = async (
  userId: string,
  role: "ADMIN" | "SUPER_ADMIN",
): Promise<ApiResponse<unknown> | ApiErrorResponse> => {
  try {
    return await changeAdminUserRole(userId, role)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to change admin role"),
    }
  }
}

export const deleteAdminAction = async (
  adminId: string,
): Promise<ApiResponse<unknown> | ApiErrorResponse> => {
  try {
    return await deleteAdmin(adminId)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to delete admin"),
    }
  }
}

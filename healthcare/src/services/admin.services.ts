"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { type IAdminListItem } from "@/types/admin.types"

export const getAllAdmins = async () => {
  try {
    return await httpClient.get<IAdminListItem[]>("/admins")
  } catch (error) {
    console.log("Error fetching admins:", error)
    throw error
  }
}

export const changeAdminUserStatus = async (userId: string, userStatus: "ACTIVE" | "BLOCKED") => {
  try {
    return await httpClient.patch(`/admins/change-user-status/${userId}`, { userId, userStatus })
  } catch (error) {
    console.log("Error changing admin status:", error)
    throw error
  }
}

export const changeAdminUserRole = async (userId: string, role: "ADMIN" | "SUPER_ADMIN") => {
  try {
    return await httpClient.patch(`/admins/change-user-role/${userId}`, { userId, role })
  } catch (error) {
    console.log("Error changing admin role:", error)
    throw error
  }
}

export const deleteAdmin = async (adminId: string) => {
  try {
    return await httpClient.delete(`/admins/${adminId}`)
  } catch (error) {
    console.log("Error deleting admin:", error)
    throw error
  }
}

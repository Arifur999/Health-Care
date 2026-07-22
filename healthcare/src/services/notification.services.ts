"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { type INotification } from "@/types/notification.types"

export const getMyNotifications = async () => {
  try {
    return await httpClient.get<INotification[]>("/notifications")
  } catch (error) {
    console.log("Error fetching notifications:", error)
    throw error
  }
}

export const getUnreadNotificationCount = async () => {
  try {
    return await httpClient.get<{ count: number }>("/notifications/unread-count")
  } catch (error) {
    console.log("Error fetching unread count:", error)
    throw error
  }
}

export const markNotificationRead = async (id: string) => {
  try {
    return await httpClient.patch(`/notifications/${id}/read`, {})
  } catch (error) {
    console.log("Error marking notification read:", error)
    throw error
  }
}

export const markAllNotificationsRead = async () => {
  try {
    return await httpClient.patch("/notifications/mark-all-read", {})
  } catch (error) {
    console.log("Error marking all notifications read:", error)
    throw error
  }
}

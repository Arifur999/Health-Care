"use server"

import { createNews, deleteNews, updateNews } from "@/services/news.services"
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types"
import { type INews, type INewsPayload } from "@/types/news.types"

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

export const createNewsAction = async (
  payload: INewsPayload,
): Promise<ApiResponse<INews> | ApiErrorResponse> => {
  if (!payload.title?.trim() || !payload.excerpt?.trim() || payload.content.length === 0) {
    return { success: false, message: "Title, excerpt, and content are required" }
  }
  try {
    return await createNews(payload)
  } catch (error) {
    return { success: false, message: getActionErrorMessage(error, "Failed to create article") }
  }
}

export const updateNewsAction = async (
  id: string,
  payload: Partial<INewsPayload>,
): Promise<ApiResponse<INews> | ApiErrorResponse> => {
  try {
    return await updateNews(id, payload)
  } catch (error) {
    return { success: false, message: getActionErrorMessage(error, "Failed to update article") }
  }
}

export const deleteNewsAction = async (
  id: string,
): Promise<ApiResponse<{ message: string }> | ApiErrorResponse> => {
  try {
    return await deleteNews(id)
  } catch (error) {
    return { success: false, message: getActionErrorMessage(error, "Failed to delete article") }
  }
}

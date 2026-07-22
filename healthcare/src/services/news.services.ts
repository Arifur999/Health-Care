"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { type INews, type INewsPayload } from "@/types/news.types"

export const getNews = async () => {
  try {
    return await httpClient.get<INews[]>("/news")
  } catch (error) {
    console.log("Error fetching news:", error)
    throw error
  }
}

export const getNewsBySlug = async (slug: string) => {
  try {
    return await httpClient.get<INews>(`/news/${slug}`)
  } catch (error) {
    console.log("Error fetching article:", error)
    throw error
  }
}

export const getAllNewsAdmin = async () => {
  try {
    return await httpClient.get<INews[]>("/news/admin/all")
  } catch (error) {
    console.log("Error fetching all news:", error)
    throw error
  }
}

export const createNews = async (payload: INewsPayload) => {
  try {
    return await httpClient.post<INews>("/news", payload)
  } catch (error) {
    console.log("Error creating article:", error)
    throw error
  }
}

export const updateNews = async (id: string, payload: Partial<INewsPayload>) => {
  try {
    return await httpClient.patch<INews>(`/news/${id}`, payload)
  } catch (error) {
    console.log("Error updating article:", error)
    throw error
  }
}

export const deleteNews = async (id: string) => {
  try {
    return await httpClient.delete<{ message: string }>(`/news/${id}`)
  } catch (error) {
    console.log("Error deleting article:", error)
    throw error
  }
}

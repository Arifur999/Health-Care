"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { type ISpecialty } from "@/types/specialty.types"

export const createSpecialty = async (formData: FormData) => {
  try {
    return await httpClient.postFormData<ISpecialty>("/specialty", formData)
  } catch (error) {
    console.log("Error creating specialty:", error)
    throw error
  }
}

export const updateSpecialty = async (
  id: string,
  payload: { title?: string; description?: string; icon?: string },
) => {
  try {
    return await httpClient.put<ISpecialty>(`/specialty/${id}`, payload)
  } catch (error) {
    console.log("Error updating specialty:", error)
    throw error
  }
}

export const deleteSpecialty = async (id: string) => {
  try {
    return await httpClient.delete<ISpecialty>(`/specialty/${id}`)
  } catch (error) {
    console.log("Error deleting specialty:", error)
    throw error
  }
}

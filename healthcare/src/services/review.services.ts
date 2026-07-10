"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { type ICreateReviewPayload, type IReview, type IUpdateReviewPayload } from "@/types/review.types"

export const getAllReviews = async () => {
  try {
    return await httpClient.get<IReview[]>("/reviews")
  } catch (error) {
    console.log("Error fetching reviews:", error)
    throw error
  }
}

export const getMyReviews = async () => {
  try {
    return await httpClient.get<IReview[]>("/reviews/my-reviews")
  } catch (error) {
    console.log("Error fetching my reviews:", error)
    throw error
  }
}

export const createReview = async (payload: ICreateReviewPayload) => {
  try {
    return await httpClient.post<IReview>("/reviews", payload)
  } catch (error) {
    console.log("Error creating review:", error)
    throw error
  }
}

export const updateReview = async (id: string, payload: IUpdateReviewPayload) => {
  try {
    return await httpClient.patch<IReview>(`/reviews/${id}`, payload)
  } catch (error) {
    console.log("Error updating review:", error)
    throw error
  }
}

export const deleteReview = async (id: string) => {
  try {
    return await httpClient.delete<{ message: string }>(`/reviews/${id}`)
  } catch (error) {
    console.log("Error deleting review:", error)
    throw error
  }
}

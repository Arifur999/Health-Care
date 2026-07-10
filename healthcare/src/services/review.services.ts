"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { type IReview } from "@/types/review.types"

export const getAllReviews = async () => {
  try {
    return await httpClient.get<IReview[]>("/reviews")
  } catch (error) {
    console.log("Error fetching reviews:", error)
    throw error
  }
}
